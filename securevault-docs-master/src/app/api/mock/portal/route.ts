// app/api/mock/portal/route.ts (GET list, POST create)

import { NextRequest, NextResponse } from "next/server";
import { createMockPortal, listMockPortals } from "@/lib/mockPortalDb";

export async function GET(req: NextRequest) {
  const orgId = req.nextUrl.searchParams.get("orgId") || "demo-org";
  const items = listMockPortals(orgId);
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orgId = "demo-org", clientName, clientEmail } = body || {};
  const { portal, token } = createMockPortal({ orgId, clientName, clientEmail });
  return NextResponse.json({ ok: true, portalId: portal.id, token });
}

