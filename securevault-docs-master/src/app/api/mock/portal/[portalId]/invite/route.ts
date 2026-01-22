// app/api/mock/portal/[portalId]/invite/route.ts (POST new token)

import { NextRequest, NextResponse } from "next/server";
import { issueMockTokenForPortal } from "@/lib/mockPortalDb";

type Props = {
  params: Promise<{ portalId: string }>;
};

export async function POST(_req: NextRequest, { params }: Props) {
  const { portalId } = await params;
  const token = issueMockTokenForPortal(portalId);
  return NextResponse.json({ ok: true, token });
}

