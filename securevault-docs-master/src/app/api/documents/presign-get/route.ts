// src/app/api/documents/presign-get/route.ts

import { NextResponse } from "next/server";
import { presignGetObject } from "@/lib/aws/s3";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json(
        { error: "Missing required field: key" },
        { status: 400 }
      );
    }

    // Generate presigned URL for download/preview
    const url = await presignGetObject(key, 3600); // 1 hour expiry

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error generating presigned GET URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate preview URL' },
      { status: 500 }
    );
  }
}
