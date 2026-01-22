// src/app/api/shares/[token]/download/route.ts

import { NextResponse } from "next/server";
import { presignGetObject } from "@/lib/aws/s3";

type Params = { params: Promise<{ token: string }> };

export async function GET(req: Request, { params }: Params) {
  const { query, queryOne } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');

  const { token } = await params;

  const url = new URL(req.url);
  const pin = url.searchParams.get("pin");
  const docId = url.searchParams.get("doc") ?? "";

  // Fetch share link from database
  const shareLinks = await query<{
    id: string;
    token: string;
    pin: string | null;
    expiresAt: string | null;
  }>(
    `SELECT * FROM ${getTableName('ShareLink')} WHERE token = $1 OR token LIKE $2`,
    [token, `${token}_%`]
  );

  if (!shareLinks || shareLinks.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const firstShare = shareLinks[0];

  // Check PIN
  if (firstShare.pin && firstShare.pin !== pin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check expiration
  if (firstShare.expiresAt && Date.now() > Date.parse(firstShare.expiresAt)) {
    return NextResponse.json({ error: "Link expired" }, { status: 403 });
  }

  // Get the document
  const document = await queryOne<{ s3Key: string; name: string; s3Bucket: string }>(
    `SELECT "s3Key", name, "s3Bucket" FROM ${getTableName('Document')} WHERE id = $1`,
    [docId]
  );

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  // Generate presigned download URL
  const downloadUrl = await presignGetObject(document.s3Key, 3600);

  // Redirect to the presigned URL
  return NextResponse.redirect(downloadUrl);
}
