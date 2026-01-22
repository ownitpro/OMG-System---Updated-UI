// API route to get documents uploaded by clients for a portal
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/portal-db';

interface DocumentRow {
  id: string;
  name: string;
  sizeBytes: string | number;
  createdAt: string;
  s3Key: string;
}

// This endpoint is for admin users to view client uploads
// It requires the x-user-id header (admin auth)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ portalId: string }> }
) {
  try {
    const { portalId } = await params;
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // Verify the portal exists and user has access
    const portal = await queryOne<{ id: string; organizationId: string | null; createdById: string }>(
      `SELECT id, "organizationId", "createdById" FROM ${getTableName('Portal')} WHERE id = $1`,
      [portalId]
    );

    if (!portal) {
      return NextResponse.json(
        { error: 'Portal not found' },
        { status: 404 }
      );
    }

    // Check user access - must be creator or org member
    let hasAccess = portal.createdById === userId;

    if (!hasAccess && portal.organizationId) {
      const membership = await queryOne<{ userId: string }>(
        `SELECT "userId" FROM ${getTableName('OrganizationMember')}
         WHERE "organizationId" = $1 AND "userId" = $2`,
        [portal.organizationId, userId]
      );
      hasAccess = !!membership;
    }

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get uploads from in-memory db (submissions)
    const submissions = Array.from(db.submissions.values())
      .filter((s) => s.portalId === portalId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Also check for documents in the database that were uploaded via this portal
    // These are stored with a URL pattern like "portals/{portalId}/*" or "mock/{portalId}/*"
    let dbDocuments: DocumentRow[] = [];
    if (portal.organizationId) {
      try {
        dbDocuments = await query<DocumentRow>(
          `SELECT id, name, "sizeBytes", "createdAt", "s3Key"
           FROM ${getTableName('Document')}
           WHERE "organizationId" = $1
           AND ("s3Key" LIKE $2 OR "s3Key" LIKE $3)
           ORDER BY "createdAt" DESC`,
          [portal.organizationId, `portals/${portalId}/%`, `mock/${portalId}/%`]
        ) || [];
      } catch (dbErr) {
        console.error('Error fetching documents from database:', dbErr);
      }
    }

    // Combine in-memory submissions and database documents
    // De-duplicate by fileKey/url
    const seenKeys = new Set<string>();
    const uploads: Array<{
      id: string;
      portalId: string;
      fileName: string;
      fileSize: number;
      uploadedAt: string;
      status: 'open' | 'partial' | 'complete' | 'closed';
      storageKey?: string;
      folderPath?: string[];
    }> = [];

    // Add in-memory submissions (includes folderPath)
    for (const s of submissions) {
      if (!seenKeys.has(s.fileKey)) {
        seenKeys.add(s.fileKey);
        uploads.push({
          id: s.id,
          portalId: s.portalId,
          fileName: s.fileName,
          fileSize: s.bytes,
          uploadedAt: s.createdAt,
          status: 'complete',
          storageKey: s.fileKey,
          folderPath: s.folderPath || ['Uploads', new Date(s.createdAt).getFullYear().toString()],
        });
      }
    }

    // Add database documents (default folder path)
    for (const doc of dbDocuments) {
      if (!seenKeys.has(doc.s3Key)) {
        seenKeys.add(doc.s3Key);
        const sizeBytes = typeof doc.sizeBytes === 'string' ? parseInt(doc.sizeBytes, 10) : doc.sizeBytes;
        uploads.push({
          id: doc.id,
          portalId: portalId,
          fileName: doc.name,
          fileSize: sizeBytes || 0,
          uploadedAt: doc.createdAt,
          status: 'complete',
          storageKey: doc.s3Key,
          folderPath: ['Uploads', new Date(doc.createdAt).getFullYear().toString()],
        });
      }
    }

    // Return in the expected format
    return NextResponse.json({ requests: uploads });
  } catch (error) {
    console.error('Error fetching portal uploads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch uploads' },
      { status: 500 }
    );
  }
}
