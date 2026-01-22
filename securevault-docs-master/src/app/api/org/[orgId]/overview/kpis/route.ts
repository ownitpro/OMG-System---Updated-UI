// src/app/api/org/[orgId]/overview/kpis/route.ts
// KPIs API route for demo orgs

import { NextResponse } from "next/server";
import { businessKpis } from "@/demo/business";
import { personalKpis } from "@/demo/personal";

type Params = { params: Promise<{ orgId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { orgId } = await params;

  if (String(orgId).startsWith("demo_business") || String(orgId) === "demo_business_org") {
    return NextResponse.json(businessKpis);
  }
  if (String(orgId).startsWith("demo_personal") || String(orgId) === "demo_personal_org") {
    return NextResponse.json(personalKpis);
  }
  return NextResponse.json(businessKpis);
}

