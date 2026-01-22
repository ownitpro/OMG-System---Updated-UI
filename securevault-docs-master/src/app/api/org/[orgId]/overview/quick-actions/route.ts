// src/app/api/org/[orgId]/overview/quick-actions/route.ts
// Quick actions API route for demo orgs

import { NextResponse } from "next/server";
import { businessQuickActions } from "@/demo/business";
import { personalQuickActions } from "@/demo/personal";

type Params = { params: Promise<{ orgId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { orgId } = await params;

  if (String(orgId).startsWith("demo_business") || String(orgId) === "demo_business_org") {
    return NextResponse.json({ items: businessQuickActions });
  }
  if (String(orgId).startsWith("demo_personal") || String(orgId) === "demo_personal_org") {
    return NextResponse.json({ items: personalQuickActions });
  }
  return NextResponse.json({ items: businessQuickActions });
}

