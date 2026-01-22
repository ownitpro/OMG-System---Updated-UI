// app/api/mock/portal/[portalId]/route.ts (GET portal profile)

import { NextRequest, NextResponse } from "next/server";
import { getMockPortal } from "@/lib/mockPortalDb";

type Props = {
  params: Promise<{ portalId: string }>;
};

export async function GET(_req: NextRequest, { params }: Props) {
  const { portalId } = await params;
  const portal = getMockPortal(portalId);
  if (!portal) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json(portal);
}

