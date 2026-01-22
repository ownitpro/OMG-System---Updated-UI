// Admin API endpoint for managing client portal submissions
// Allows admins to view and manage uploaded files from client portals

import { NextRequest, NextResponse } from 'next/server';

interface SubmissionWithPortal {
  id: string;
  portalId: string;
  requestId: string | null;
  fileKey: string;
  fileName: string;
  bytes: number;
  ocrStatus: string;
  status: string;
  createdAt: string;
  reviewedAt: string | null;
  reviewedById: string | null;
  portalName: string;
  clientName: string;
  clientEmail: string;
  organizationId: string;
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export async function GET(request: NextRequest) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // Get authenticated user from headers
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const portalId = searchParams.get('portalId');
    const clientName = searchParams.get('clientName');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const organizationId = searchParams.get('organizationId');
    const personalVaultId = searchParams.get('personalVaultId');

    // Base WHERE clause for organization access
    let baseWhereClause = '';
    const baseParams: any[] = [];
    let baseParamIndex = 1;

    if (organizationId) {
      baseWhereClause = `p."organizationId" = $${baseParamIndex++}`;
      baseParams.push(organizationId);
    } else if (personalVaultId) {
      baseWhereClause = `p."createdById" = $${baseParamIndex++}`;
      baseParams.push(userId);
    } else {
      baseWhereClause = `(p."createdById" = $${baseParamIndex++} OR p."organizationId" IN (
        SELECT "organizationId" FROM ${getTableName('OrganizationMember')} WHERE "userId" = $${baseParamIndex++}
      ))`;
      baseParams.push(userId, userId);
    }

    // Get unique clients for filter dropdown
    const clientsQuery = `
      SELECT DISTINCT p."clientName", p."clientEmail", COUNT(*) as count
      FROM ${getTableName('PortalSubmission')} ps
      INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
      INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
      WHERE ${baseWhereClause}
      GROUP BY p."clientName", p."clientEmail"
      ORDER BY p."clientName"
    `;
    const clientsResult = await query<{ clientName: string; clientEmail: string; count: string }>(clientsQuery, baseParams);
    const clients: FilterOption[] = clientsResult.map(c => ({
      value: c.clientName || c.clientEmail || 'Unknown',
      label: c.clientName || c.clientEmail || 'Unknown Client',
      count: parseInt(c.count, 10)
    }));

    // Get unique portals for filter dropdown
    const portalsQuery = `
      SELECT DISTINCT p.id, p.name, COUNT(*) as count
      FROM ${getTableName('PortalSubmission')} ps
      INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
      INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
      WHERE ${baseWhereClause}
      GROUP BY p.id, p.name
      ORDER BY p.name
    `;
    const portalsResult = await query<{ id: string; name: string; count: string }>(portalsQuery, baseParams);
    const portals: FilterOption[] = portalsResult.map(p => ({
      value: p.id,
      label: p.name || 'Unnamed Portal',
      count: parseInt(p.count, 10)
    }));

    // Build the main query to fetch submissions
    let sql = `
      SELECT
        ps.id,
        pr."portalId",
        ps."portalRequestId" as "requestId",
        ps."documentId" as "fileKey",
        pr.title as "fileName",
        0 as bytes,
        'pending' as "ocrStatus",
        COALESCE(ps.status, 'pending') as status,
        pr."createdAt",
        NULL as "reviewedAt",
        NULL as "reviewedById",
        p.name as "portalName",
        p."clientName",
        p."clientEmail",
        p."organizationId"
      FROM ${getTableName('PortalSubmission')} ps
      INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
      INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
      WHERE ${baseWhereClause}
    `;

    const params: any[] = [...baseParams];
    let paramIndex = baseParamIndex;

    // Filter by specific portal
    if (portalId) {
      sql += ` AND pr."portalId" = $${paramIndex++}`;
      params.push(portalId);
    }

    // Filter by client name
    if (clientName) {
      sql += ` AND (p."clientName" = $${paramIndex} OR p."clientEmail" = $${paramIndex})`;
      paramIndex++;
      params.push(clientName);
    }

    // Filter by date range
    if (dateFrom) {
      sql += ` AND pr."createdAt" >= $${paramIndex++}`;
      params.push(dateFrom);
    }
    if (dateTo) {
      sql += ` AND pr."createdAt" <= $${paramIndex++}`;
      params.push(dateTo + 'T23:59:59.999Z');
    }

    // Search filter (filename, client name, portal name)
    if (search) {
      sql += ` AND (
        LOWER(pr.title) LIKE $${paramIndex} OR
        LOWER(p."clientName") LIKE $${paramIndex} OR
        LOWER(p."clientEmail") LIKE $${paramIndex} OR
        LOWER(p.name) LIKE $${paramIndex}
      )`;
      paramIndex++;
      params.push(`%${search.toLowerCase()}%`);
    }

    // Get total count
    const countSql = sql.replace(
      /SELECT[\s\S]*?FROM/,
      'SELECT COUNT(*) as total FROM'
    );
    const countResult = await query(countSql, params);
    const total = parseInt(countResult[0]?.total || '0', 10);

    // Add ordering and pagination
    sql += ` ORDER BY pr."createdAt" DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);

    const submissions = await query<SubmissionWithPortal>(sql, params);

    // Format bytes for display
    const formattedSubmissions = submissions.map((sub) => ({
      ...sub,
      bytes: typeof sub.bytes === 'string' ? parseInt(sub.bytes, 10) : sub.bytes,
      formattedSize: formatBytes(
        typeof sub.bytes === 'string' ? parseInt(sub.bytes, 10) : sub.bytes
      ),
    }));

    return NextResponse.json({
      submissions: formattedSubmissions,
      total,
      limit,
      offset,
      filters: {
        clients,
        portals
      }
    });
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // Get authenticated user from headers
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { submissionId, status, targetFolderId } = body;

    if (!submissionId || !status) {
      return NextResponse.json(
        { error: 'submissionId and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Get the submission and verify user has access
    // Join through PortalRequest to get to Portal
    const submission = await queryOne<SubmissionWithPortal>(`
      SELECT
        ps.*,
        pr."portalId",
        p."organizationId",
        p."createdById"
      FROM ${getTableName('PortalSubmission')} ps
      INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
      INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
      WHERE ps.id = $1
    `, [submissionId]);

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Verify user has access (is the creator or org member)
    const hasAccess = await queryOne(`
      SELECT 1 FROM ${getTableName('Portal')} p
      LEFT JOIN ${getTableName('OrganizationMember')} om ON p."organizationId" = om."organizationId"
      WHERE p.id = $1 AND (p."createdById" = $2 OR om."userId" = $2)
    `, [submission.portalId, userId]);

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Update the submission status
    // First check if the status column exists
    try {
      const updated = await queryOne(`
        UPDATE ${getTableName('PortalSubmission')}
        SET status = $1, "reviewedAt" = NOW(), "reviewedById" = $2
        WHERE id = $3
        RETURNING *
      `, [status, userId, submissionId]);

      return NextResponse.json({ submission: updated });
    } catch (updateError: any) {
      // If column doesn't exist, just return success (status tracking not enabled)
      if (updateError.message?.includes('column') || updateError.code === '42703') {
        console.log('Status column not found in PortalSubmission table - skipping status update');
        return NextResponse.json({
          submission: { ...submission, status },
          note: 'Status tracking columns not yet added to database'
        });
      }
      throw updateError;
    }
  } catch (error: any) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // Get authenticated user from headers
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const submissionId = searchParams.get('id');

    if (!submissionId) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
    }

    // Get the submission and verify user has access
    // Join through PortalRequest to get to Portal
    const submission = await queryOne(`
      SELECT ps.*, pr."portalId", p."organizationId", p."createdById"
      FROM ${getTableName('PortalSubmission')} ps
      INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
      INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
      WHERE ps.id = $1
    `, [submissionId]);

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Verify user has access
    const hasAccess = await queryOne(`
      SELECT 1 FROM ${getTableName('Portal')} p
      LEFT JOIN ${getTableName('OrganizationMember')} om ON p."organizationId" = om."organizationId"
      WHERE p.id = $1 AND (p."createdById" = $2 OR om."userId" = $2)
    `, [submission.portalId, userId]);

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Delete the submission
    await query(`DELETE FROM ${getTableName('PortalSubmission')} WHERE id = $1`, [submissionId]);

    // TODO: Also delete the file from S3 if needed

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete submission' },
      { status: 500 }
    );
  }
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0 || isNaN(bytes)) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
