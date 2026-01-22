import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getTableName } from '@/lib/db-utils';

type Params = { params: Promise<{ orgId: string }> };

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  userType: string;
  userEmail: string | null;
  resourceType: string;
  resourceId: string;
  portalId: string | null;
  clientName: string | null;
  success: boolean;
  ipAddress: string | null;
  details: Record<string, any>;
}

// GET /api/org/[orgId]/audit-logs
// Fetch audit logs for an organization - includes all activity types
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { orgId } = await params;
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    console.log('[AUDIT-LOGS] Fetching logs for org:', orgId, 'range:', range);

    // Calculate date cutoff based on range
    const now = new Date();
    let cutoff: Date;
    switch (range) {
      case '24h':
        cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
      default:
        cutoff = new Date(0);
        break;
    }

    const logs: AuditLogEntry[] = [];

    // Table names
    const documentTable = getTableName('Document');
    const folderTable = getTableName('Folder');
    const portalTable = getTableName('Portal');
    const portalRequestTable = getTableName('PortalRequest');
    const portalSubmissionTable = getTableName('PortalSubmission');
    const orgMemberTable = getTableName('OrganizationMember');
    const userTable = getTableName('User');
    const auditLogTable = getTableName('AuditLog');

    // 1. Try to get logs from AuditLog table first (if it has data)
    try {
      const rawLogs = await query<{
        id: string;
        action: string;
        entityType: string;
        entityId: string;
        userId: string | null;
        previousData: any;
        newData: any;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: string;
        userEmail?: string;
        userName?: string;
      }>(
        `SELECT al.*, u.email as "userEmail", u.name as "userName"
         FROM ${auditLogTable} al
         LEFT JOIN ${userTable} u ON al."userId" = u.id
         WHERE (
           al."entityId" = $1
           OR (al."newData"->>'organizationId' = $1)
         )
         AND al."createdAt" >= $2
         ORDER BY al."createdAt" DESC
         LIMIT 200`,
        [orgId, cutoff.toISOString()]
      );

      if (rawLogs && rawLogs.length > 0) {
        for (const log of rawLogs) {
          logs.push({
            id: log.id,
            timestamp: log.createdAt,
            action: log.action,
            userType: log.userId ? 'admin' : 'guest',
            userEmail: log.userEmail || null,
            resourceType: log.entityType,
            resourceId: log.entityId,
            portalId: log.newData?.portalId || null,
            clientName: log.newData?.clientName || null,
            success: !log.action.includes('failed') && !log.action.includes('error'),
            ipAddress: log.ipAddress,
            details: {
              ...log.newData,
              previousData: log.previousData,
              userAgent: log.userAgent,
            },
          });
        }
      }
    } catch (auditError) {
      console.log('[AUDIT-LOGS] AuditLog table query skipped:', auditError);
    }

    // 2. Get document activity (uploads)
    try {
      const documents = await query<{
        id: string;
        name: string;
        createdAt: string;
        sizeBytes: number;
        type: string;
        uploadStatus: string;
      }>(
        `SELECT id, name, "createdAt", "sizeBytes", type, "uploadStatus"
         FROM ${documentTable}
         WHERE "organizationId" = $1
         AND "createdAt" >= $2
         ORDER BY "createdAt" DESC
         LIMIT 100`,
        [orgId, cutoff.toISOString()]
      );

      for (const doc of documents || []) {
        logs.push({
          id: `doc-${doc.id}`,
          timestamp: doc.createdAt,
          action: doc.uploadStatus === 'confirmed' ? 'document.uploaded' : 'document.pending',
          userType: 'admin',
          userEmail: null,
          resourceType: 'document',
          resourceId: doc.id,
          portalId: null,
          clientName: null,
          success: true,
          ipAddress: null,
          details: {
            fileName: doc.name,
            fileSize: doc.sizeBytes,
            fileType: doc.type,
            status: doc.uploadStatus,
          },
        });
      }
      console.log('[AUDIT-LOGS] Found', documents?.length || 0, 'document events');
    } catch (docError) {
      console.log('[AUDIT-LOGS] Document query error:', docError);
    }

    // 3. Get folder activity
    try {
      const folders = await query<{
        id: string;
        name: string;
        createdAt: string;
        parentId: string | null;
      }>(
        `SELECT id, name, "createdAt", "parentId"
         FROM ${folderTable}
         WHERE "organizationId" = $1
         AND "createdAt" >= $2
         ORDER BY "createdAt" DESC
         LIMIT 50`,
        [orgId, cutoff.toISOString()]
      );

      for (const folder of folders || []) {
        logs.push({
          id: `folder-${folder.id}`,
          timestamp: folder.createdAt,
          action: 'folder.created',
          userType: 'admin',
          userEmail: null,
          resourceType: 'folder',
          resourceId: folder.id,
          portalId: null,
          clientName: null,
          success: true,
          ipAddress: null,
          details: {
            folderName: folder.name,
            hasParent: !!folder.parentId,
          },
        });
      }
      console.log('[AUDIT-LOGS] Found', folders?.length || 0, 'folder events');
    } catch (folderError) {
      console.log('[AUDIT-LOGS] Folder query error:', folderError);
    }

    // 4. Get portal activity
    try {
      const portals = await query<{
        id: string;
        name: string;
        clientName: string;
        clientEmail: string;
        createdAt: string;
      }>(
        `SELECT id, name, "clientName", "clientEmail", "createdAt"
         FROM ${portalTable}
         WHERE "organizationId" = $1
         AND "createdAt" >= $2
         ORDER BY "createdAt" DESC
         LIMIT 50`,
        [orgId, cutoff.toISOString()]
      );

      const portalIds = (portals || []).map(p => p.id);
      const portalMap = new Map((portals || []).map(p => [p.id, p]));

      for (const portal of portals || []) {
        logs.push({
          id: `portal-${portal.id}`,
          timestamp: portal.createdAt,
          action: 'portal.created',
          userType: 'admin',
          userEmail: null,
          resourceType: 'portal',
          resourceId: portal.id,
          portalId: portal.id,
          clientName: portal.clientName,
          success: true,
          ipAddress: null,
          details: {
            portalName: portal.name,
            clientName: portal.clientName,
            clientEmail: portal.clientEmail,
          },
        });
      }
      console.log('[AUDIT-LOGS] Found', portals?.length || 0, 'portal events');

      // 5. Get portal request activity
      if (portalIds.length > 0) {
        try {
          const requests = await query<{
            id: string;
            portalId: string;
            label: string;
            createdAt: string;
          }>(
            `SELECT id, "portalId", label, "createdAt"
             FROM ${portalRequestTable}
             WHERE "portalId" = ANY($1::text[])
             AND "createdAt" >= $2
             ORDER BY "createdAt" DESC
             LIMIT 100`,
            [portalIds, cutoff.toISOString()]
          );

          for (const req of requests || []) {
            const portal = portalMap.get(req.portalId);
            logs.push({
              id: `req-${req.id}`,
              timestamp: req.createdAt,
              action: 'request.created',
              userType: 'admin',
              userEmail: null,
              resourceType: 'request',
              resourceId: req.id,
              portalId: req.portalId,
              clientName: portal?.clientName || null,
              success: true,
              ipAddress: null,
              details: {
                label: req.label,
                portalName: portal?.name,
              },
            });
          }
          console.log('[AUDIT-LOGS] Found', requests?.length || 0, 'request events');
        } catch (reqError) {
          console.log('[AUDIT-LOGS] Request query error:', reqError);
        }

        // 6. Get submission activity (client uploads)
        try {
          const submissions = await query<{
            id: string;
            portalRequestId: string;
            createdAt: string;
            status: string;
            portalId: string;
          }>(
            `SELECT ps.id, ps."portalRequestId", ps."createdAt", ps.status, pr."portalId"
             FROM ${portalSubmissionTable} ps
             INNER JOIN ${portalRequestTable} pr ON ps."portalRequestId" = pr.id
             WHERE pr."portalId" = ANY($1::text[])
             AND ps."createdAt" >= $2
             ORDER BY ps."createdAt" DESC
             LIMIT 100`,
            [portalIds, cutoff.toISOString()]
          );

          for (const sub of submissions || []) {
            const portal = portalMap.get(sub.portalId);
            logs.push({
              id: `sub-${sub.id}`,
              timestamp: sub.createdAt,
              action: 'document.client_uploaded',
              userType: 'guest',
              userEmail: null,
              resourceType: 'submission',
              resourceId: sub.id,
              portalId: sub.portalId,
              clientName: portal?.clientName || null,
              success: true,
              ipAddress: null,
              details: {
                status: sub.status,
                requestId: sub.portalRequestId,
                portalName: portal?.name,
              },
            });
          }
          console.log('[AUDIT-LOGS] Found', submissions?.length || 0, 'submission events');
        } catch (subError) {
          console.log('[AUDIT-LOGS] Submission query error:', subError);
        }
      }
    } catch (portalError) {
      console.log('[AUDIT-LOGS] Portal query error:', portalError);
    }

    // 7. Get organization member activity
    try {
      const members = await query<{
        id: string;
        userId: string;
        role: string;
        createdAt: string;
        userEmail: string;
        userName: string;
      }>(
        `SELECT om.id, om."userId", om.role, om."createdAt", u.email as "userEmail", u.name as "userName"
         FROM ${orgMemberTable} om
         INNER JOIN ${userTable} u ON om."userId" = u.id
         WHERE om."organizationId" = $1
         AND om."createdAt" >= $2
         ORDER BY om."createdAt" DESC
         LIMIT 50`,
        [orgId, cutoff.toISOString()]
      );

      for (const member of members || []) {
        logs.push({
          id: `member-${member.id}`,
          timestamp: member.createdAt,
          action: 'member.joined',
          userType: 'admin',
          userEmail: member.userEmail,
          resourceType: 'member',
          resourceId: member.userId,
          portalId: null,
          clientName: null,
          success: true,
          ipAddress: null,
          details: {
            memberName: member.userName,
            memberEmail: member.userEmail,
            role: member.role,
          },
        });
      }
      console.log('[AUDIT-LOGS] Found', members?.length || 0, 'member events');
    } catch (memberError) {
      console.log('[AUDIT-LOGS] Member query error:', memberError);
    }

    // Sort all logs by timestamp (newest first)
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Deduplicate logs by id
    const uniqueLogs = Array.from(new Map(logs.map(log => [log.id, log])).values());

    console.log('[AUDIT-LOGS] Total logs:', uniqueLogs.length);

    return NextResponse.json({ logs: uniqueLogs });
  } catch (error: any) {
    console.error('[AUDIT-LOGS] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch audit logs', logs: [] },
      { status: 500 }
    );
  }
}
