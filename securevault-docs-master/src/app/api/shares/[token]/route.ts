// src/app/api/shares/[token]/route.ts

import { NextResponse } from "next/server";

type Params = { params: Promise<{ token: string }> };

export async function GET(req: Request, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');

  const { token } = await params;

  // Fetch share links from database with document details
  const shareLinks = await query<{
    id: string;
    token: string;
    pin: string | null;
    expiresAt: string | null;
    maxDownloads: number | null;
    downloadCount: number;
    documentId: string;
    documentName: string;
    documentSizeBytes: number;
    organizationId: string | null;
    personalVaultId: string | null;
  }>(
    `SELECT sl.id, sl.token, sl.pin, sl."expiresAt", sl."maxDownloads", sl."downloadCount",
            d.id as "documentId", d.name as "documentName", d."sizeBytes" as "documentSizeBytes",
            d."organizationId", d."personalVaultId"
     FROM ${getTableName('ShareLink')} sl
     JOIN ${getTableName('Document')} d ON sl."documentId" = d.id
     WHERE sl.token = $1 OR sl.token LIKE $2`,
    [token, `${token}_%`]
  );

  if (!shareLinks || shareLinks.length === 0) {
    return NextResponse.json(
      { error: "Link not found" },
      { status: 404 }
    );
  }

  const url = new URL(req.url);
  const pinParam = url.searchParams.get("pin");

  // Use the first share link for validation (they all share same token/pin/expiry)
  const firstShare = shareLinks[0];

  // Check expiration
  if (firstShare.expiresAt && Date.now() > Date.parse(firstShare.expiresAt)) {
    return NextResponse.json(
      { error: "Link expired" },
      { status: 403 }
    );
  }

  // Check PIN
  if (firstShare.pin && firstShare.pin !== pinParam) {
    return NextResponse.json(
      { error: "PIN required or incorrect" },
      { status: 401 }
    );
  }

  // Transform to mockDb format for compatibility
  const orgId = firstShare.organizationId || firstShare.personalVaultId;
  const share = {
    token,
    orgId,
    label: shareLinks.length === 1 ? firstShare.documentName : `${shareLinks.length} documents`,
    allowDownload: true,
    pin: firstShare.pin,
    expiresAt: firstShare.expiresAt,
    docs: shareLinks.map((link) => ({
      id: link.documentId,
      name: link.documentName,
      sizeKB: Math.round(link.documentSizeBytes / 1024),
    })),
  };

  return NextResponse.json(share);
}
