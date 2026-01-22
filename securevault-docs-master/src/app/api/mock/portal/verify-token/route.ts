// app/api/mock/portal/verify-token/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyMockToken } from "@/lib/mockPortalDb";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const portalId = verifyMockToken(token);
  if (!portalId) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true, portalId });
}

