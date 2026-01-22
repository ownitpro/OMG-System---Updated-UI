// API route to store file data in mock mode (for development without S3)
import { NextRequest, NextResponse } from 'next/server';
import { db, MockFile, now } from '@/lib/portal-db';
import { requirePortalAuth } from '@/lib/portalAuth';

async function handler(req: NextRequest, session: any, portalId: string) {
  try {
    const { fileKey, fileName, fileData, contentType, size } = await req.json();

    if (!fileKey || !fileData) {
      return NextResponse.json(
        { error: 'fileKey and fileData are required' },
        { status: 400 }
      );
    }

    // Store the file in mock storage
    const mockFile: MockFile = {
      key: fileKey,
      data: fileData, // base64 encoded
      contentType: contentType || 'application/octet-stream',
      size: size || 0,
      fileName: fileName || 'unknown',
      uploadedAt: now(),
    };

    db.mockFiles.set(fileKey, mockFile);
    console.log('[MOCK-UPLOAD] Stored file:', fileKey, 'size:', size);
    console.log('[MOCK-UPLOAD] Total mock files:', db.mockFiles.size);

    return NextResponse.json({ ok: true, key: fileKey });
  } catch (error) {
    console.error('Error storing mock file:', error);
    return NextResponse.json(
      { error: 'Failed to store file' },
      { status: 500 }
    );
  }
}

export const POST = requirePortalAuth(handler);
