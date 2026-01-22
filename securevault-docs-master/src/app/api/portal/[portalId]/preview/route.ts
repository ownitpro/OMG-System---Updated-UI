// API route to get preview URL for a portal upload (admin only)
import { NextRequest, NextResponse } from 'next/server';
import { presignGetObject } from '@/lib/aws/s3';
import { db } from '@/lib/portal-db';

// This endpoint is for admin users to preview client uploads
// It requires the x-user-id header (admin auth)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ portalId: string }> }
) {
  try {
    const { portalId } = await params;
    const userId = request.headers.get('x-user-id');
    const storageKey = request.nextUrl.searchParams.get('storageKey');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!storageKey) {
      return NextResponse.json(
        { error: 'Storage key is required' },
        { status: 400 }
      );
    }

    const { queryOne } = await import('@/lib/db');
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

    // Validate that the storage key belongs to this portal
    // It should start with 'portals/{portalId}/' or 'mock/{portalId}/'
    const validKeyPattern = storageKey.startsWith(`portals/${portalId}/`) ||
                           storageKey.startsWith(`mock/${portalId}/`);

    if (!validKeyPattern) {
      return NextResponse.json(
        { error: 'Invalid storage key for this portal' },
        { status: 403 }
      );
    }

    // Debug: Log mock files state
    console.log('[PREVIEW] Looking for storageKey:', storageKey);
    console.log('[PREVIEW] mockFiles size:', db.mockFiles.size);
    console.log('[PREVIEW] mockFiles keys:', Array.from(db.mockFiles.keys()));

    // Check if this is a mock file stored in memory
    const mockFile = db.mockFiles.get(storageKey);
    if (mockFile) {
      // Return the base64 data URL directly for mock files
      const dataUrl = mockFile.data.startsWith('data:')
        ? mockFile.data
        : `data:${mockFile.contentType};base64,${mockFile.data}`;

      console.log('[PREVIEW] Serving mock file:', storageKey);
      return NextResponse.json({
        url: dataUrl,
        storageKey,
        mock: true
      });
    }

    // Check if this is a mock storage key but file data wasn't stored
    // (happens for files uploaded before mock storage was implemented)
    const isMockKey = storageKey.startsWith('mock/') || storageKey.startsWith(`portals/${portalId}/`);
    const USE_MOCK_S3 = process.env.USE_MOCK_S3 === 'true' || process.env.MOCK_UPLOADS === '1';

    if (isMockKey && USE_MOCK_S3) {
      console.log('[PREVIEW] Mock file not found in storage:', storageKey);
      return NextResponse.json(
        { error: 'File data not available. This file was uploaded before mock storage was enabled. Please re-upload the file.' },
        { status: 404 }
      );
    }

    // For real S3 files, generate presigned URL
    const previewUrl = await presignGetObject(storageKey, 3600); // 1 hour expiry

    return NextResponse.json({
      url: previewUrl,
      storageKey
    });
  } catch (error) {
    console.error('Error generating preview URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview URL' },
      { status: 500 }
    );
  }
}
