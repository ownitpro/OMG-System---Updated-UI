// src/app/api/personal/upload/presign/route.ts

import { NextResponse } from "next/server";
import { presignUpload, presignPutObject, generateS3Key } from "@/lib/aws/s3";

export async function POST(req: Request) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { name, type, size, userId } = await req.json();

    if (!name || !type) {
      return NextResponse.json(
        { error: "Missing required fields: name, type" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - userId required' }, { status: 401 });
    }

    // Validate UUID format to prevent database errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      console.warn('[presign] Invalid user ID format:', userId)
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Verify user exists using PostgreSQL
    const user = await queryOne(
      `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    );

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - user not found' }, { status: 401 });
    }

    // Generate S3 key with personal vault prefix
    const key = generateS3Key(`personal/${userId}`, name);

    // Generate presigned URL for upload
    const presignResult = await presignPutObject(key, type, 900);

    return NextResponse.json({
      url: presignResult.url,
      key,
      headers: presignResult.headers,
      mock: presignResult.mock || false,
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
