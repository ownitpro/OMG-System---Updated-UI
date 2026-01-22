// src/app/api/org/[orgId]/overview/checklist/route.ts
// Checklist API route for demo orgs

import { NextResponse } from "next/server";
import { businessChecklist } from "@/demo/business";
import { personalChecklist } from "@/demo/personal";

type Params = { params: Promise<{ orgId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { orgId } = await params;

  if (String(orgId).startsWith("demo_business") || String(orgId) === "demo_business_org") {
    return NextResponse.json(businessChecklist);
  }
  if (String(orgId).startsWith("demo_personal") || String(orgId) === "demo_personal_org") {
    return NextResponse.json(personalChecklist);
  }
  return NextResponse.json(businessChecklist);
}

