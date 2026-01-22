// API route to download a portal upload file (admin only)
import { NextRequest, NextResponse } from 'next/server';
import { downloadFile } from '@/lib/aws/s3';
import { db } from '@/lib/portal-db';

// This endpoint is for admin users to download client uploads
// It requires the x-user-id header (admin auth)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ portalId: string }> }
) {
  try {
    const { portalId } = await params;
    const userId = request.headers.get('x-user-id');
    const requestId = request.nextUrl.searchParams.get('requestId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
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

    // Find the submission by requestId
    const submission = db.submissions.get(requestId);
    if (!submission) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Verify the submission belongs to this portal
    if (submission.portalId !== portalId) {
      return NextResponse.json(
        { error: 'File does not belong to this portal' },
        { status: 403 }
      );
    }

    const storageKey = submission.fileKey;
    const fileName = submission.fileName;

    // Check if this is a mock file stored in memory
    const mockFile = db.mockFiles.get(storageKey);
    if (mockFile) {
      // Convert base64 to binary for download
      let base64Data = mockFile.data;

      // Remove data URL prefix if present
      if (base64Data.includes(',')) {
        base64Data = base64Data.split(',')[1];
      }

      const binaryData = Buffer.from(base64Data, 'base64');

      console.log('[DOWNLOAD] Serving mock file:', storageKey);
      return new NextResponse(binaryData, {
        status: 200,
        headers: {
          'Content-Type': mockFile.contentType || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
          'Content-Length': binaryData.length.toString(),
        },
      });
    }

    // Check if this is a mock storage key but file data wasn't stored
    const isMockKey = storageKey.startsWith('mock/') || storageKey.startsWith(`portals/${portalId}/`);
    const USE_MOCK_S3 = process.env.USE_MOCK_S3 === 'true' || process.env.MOCK_UPLOADS === '1';

    if (isMockKey && USE_MOCK_S3) {
      console.log('[DOWNLOAD] Mock file not found in storage:', storageKey);
      return NextResponse.json(
        { error: 'File data not available. This file was uploaded before mock storage was enabled. Please re-upload the file.' },
        { status: 404 }
      );
    }

    // For real S3 files, download from S3
    try {
      const fileBuffer = await downloadFile(storageKey);

      // Detect content type from filename
      const ext = fileName.toLowerCase().split('.').pop();
      const mimeTypes: Record<string, string> = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        txt: 'text/plain',
        csv: 'text/csv',
      };
      const contentType = mimeTypes[ext || ''] || 'application/octet-stream';

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    } catch (s3Error) {
      console.error('Error downloading from S3:', s3Error);
      return NextResponse.json(
        { error: 'File not found in storage' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
