// src/app/api/portals/[portalId]/presign/route.ts

import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { presignPutObject } from "@/lib/aws/s3";

type Params = { params: Promise<{ portalId: string }> };

export async function POST(req: Request, { params }: Params) {
  const { portalId } = await params;
  const MOCK_UPLOADS = process.env.MOCK_UPLOADS === "1";
  const body = await req.json().catch(() => ({} as any));
  const { name, type } = body as { name?: string; type?: string };

  if (MOCK_UPLOADS) {
    return NextResponse.json({ mock: true, portalId });
  }

  const safeName = String(name || "file").replace(
    /[^a-zA-Z0-9_.-]/g,
    "_"
  );
  const key = `org-uploads/portal/${portalId}/${randomUUID()}__${safeName}`;
  const res = await presignPutObject(key, type);
  return NextResponse.json(res);
}

