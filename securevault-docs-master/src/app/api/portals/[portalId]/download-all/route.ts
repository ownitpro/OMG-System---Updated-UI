import { NextRequest, NextResponse } from 'next/server';
import { getPortalById, listRequestsForPortal } from '@/lib/mockDb';
import JSZip from 'jszip';

interface Params {
  params: Promise<{ portalId: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { portalId } = await params;

  // Verify portal exists
  const portal = getPortalById(portalId);
  if (!portal) {
    return NextResponse.json(
      { error: 'Portal not found' },
      { status: 404 }
    );
  }

  // Get all requests for this portal
  const requests = listRequestsForPortal(portalId);

  // Collect all uploaded documents
  const documents: Array<{
    fileName: string;
    folderPath: string;
    content: string; // Mock content
  }> = [];

  requests.forEach(request => {
    request.items.forEach(item => {
      if (item.uploaded && item.folderId) {
        // In production, fetch actual file from S3
        // For now, create mock document
        const fileName = item.fileName || `${item.label}.pdf`;
        const folderPath = request.templateKey || 'General';

        documents.push({
          fileName,
          folderPath,
          content: `Mock content for ${fileName} uploaded to ${portal.clientName}'s portal`
        });
      }
    });
  });

  if (documents.length === 0) {
    return NextResponse.json(
      { error: 'No documents found in this portal' },
      { status: 404 }
    );
  }

  try {
    // Create ZIP archive
    const zip = new JSZip();

    // Group documents by folder
    const folderGroups: Record<string, typeof documents> = {};
    documents.forEach(doc => {
      if (!folderGroups[doc.folderPath]) {
        folderGroups[doc.folderPath] = [];
      }
      folderGroups[doc.folderPath].push(doc);
    });

    // Add files to ZIP with folder structure
    Object.entries(folderGroups).forEach(([folderPath, docs]) => {
      const folder = zip.folder(folderPath);

      docs.forEach(doc => {
        // In production, stream file from S3
        // For mock, add text content
        folder?.file(doc.fileName, doc.content);
      });
    });

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    // Return ZIP file
    const fileName = `${portal.clientName.replace(/[^a-zA-Z0-9]/g, '_')}_documents.zip`;

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error creating ZIP:', error);
    return NextResponse.json(
      { error: 'Failed to create archive' },
      { status: 500 }
    );
  }
}

// Production version using S3 (commented out for reference)
/*
async function downloadAllFromS3(portalId: string) {
  const s3 = new S3Client({ region: process.env.AWS_REGION });
  const zip = new JSZip();

  // List all objects in portal folder
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET,
    Prefix: `portals/${portalId}/`,
  });

  const { Contents } = await s3.send(listCommand);

  if (!Contents || Contents.length === 0) {
    throw new Error('No documents found');
  }

  // Download each file and add to ZIP
  await Promise.all(
    Contents.map(async (object) => {
      if (!object.Key) return;

      const getCommand = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: object.Key,
      });

      const { Body } = await s3.send(getCommand);
      const buffer = await streamToBuffer(Body);

      // Extract relative path (remove portalId prefix)
      const relativePath = object.Key.replace(`portals/${portalId}/`, '');
      zip.file(relativePath, buffer);
    })
  );

  return await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });
}

async function streamToBuffer(stream: any): Promise<Buffer> {
  const chunks: any[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
*/
