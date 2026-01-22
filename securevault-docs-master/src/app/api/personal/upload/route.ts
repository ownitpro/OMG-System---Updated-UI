// src/app/api/personal/upload/route.ts
// Proxy upload route - uploads file through server to S3
// This bypasses CORS issues with direct browser-to-S3 uploads

import { NextRequest, NextResponse } from "next/server";
import { uploadFile, generateS3Key } from "@/lib/aws/s3";
import { mockStorage } from "@/lib/mockStorage";

// Check if mock storage is enabled
const USE_MOCK_STORAGE = process.env.NEXT_PUBLIC_USE_MOCK_STORAGE === 'true';

// Next.js App Router config - allow larger file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds for upload

// Simple in-memory lock to prevent concurrent uploads from racing
let uploadLock: Promise<void> = Promise.resolve();

async function withUploadLock<T>(fn: () => Promise<T>): Promise<T> {
  // Wait for any previous upload to complete
  await uploadLock;

  let resolve: () => void;
  uploadLock = new Promise(r => { resolve = r; });

  try {
    return await fn();
  } finally {
    resolve!();
  }
}

export async function POST(req: NextRequest) {
  // Use lock to serialize uploads and prevent Turbopack race conditions
  return withUploadLock(async () => {
    try {
      const { queryOne } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      // Get form data with proper error handling for body consumption issues
      let formData: FormData;
      try {
        formData = await req.formData();
      } catch (formError: any) {
        // Check if this is a "body already consumed" error - tell client to retry
        if (formError?.message?.includes('disturbed') || formError?.message?.includes('locked')) {
          console.error('[upload] Request body was already consumed. This is a Turbopack race condition.');
          return NextResponse.json({
            error: 'Server busy processing another upload. Please retry.',
            code: 'BODY_CONSUMED',
            retryable: true
          }, { status: 503 }); // 503 Service Unavailable - indicates retry is appropriate
        }
        console.error('[upload] Error parsing form data:', formError);
        return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
      }

    const file = formData.get('file') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - userId required' }, { status: 401 });
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      console.warn('[upload] Invalid user ID format:', userId);
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Verify user exists
    const user = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    );

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - user not found' }, { status: 401 });
    }

    // Generate S3 key
    const key = generateS3Key(`personal/${userId}`, file.name);

    // MOCK STORAGE MODE - Store file in memory
    if (USE_MOCK_STORAGE) {
      console.log(`[upload] MOCK MODE - Storing ${file.name} in memory with key: ${key}`);

      const uploadResult = await mockStorage.uploadFile(file, `personal/${userId}`);

      console.log(`[upload] MOCK MODE - Successfully stored: ${uploadResult.key}`);

      return NextResponse.json({
        key: uploadResult.key,
        url: uploadResult.url,
        bucket: 'mock-bucket',
        mock: true,
      });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[upload] Uploading ${file.name} (${buffer.length} bytes) to S3 key: ${key}`);

    // Upload to S3
    const result = await uploadFile(buffer, key, file.type || 'application/octet-stream');

    console.log(`[upload] Successfully uploaded to S3: ${result.key}`);

    return NextResponse.json({
      key: result.key,
      url: result.url,
      bucket: result.bucket,
    });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to upload file' },
        { status: 500 }
      );
    }
  });
}
