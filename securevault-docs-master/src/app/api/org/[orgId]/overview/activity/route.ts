// src/app/api/org/[orgId]/overview/activity/route.ts
// Activity API route for demo orgs

import { NextResponse } from "next/server";
import { businessActivity } from "@/demo/business";
import { personalActivity } from "@/demo/personal";

type Params = { params: Promise<{ orgId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { orgId } = await params;

  if (String(orgId).startsWith("demo_business") || String(orgId) === "demo_business_org") {
    return NextResponse.json(businessActivity);
  }
  if (String(orgId).startsWith("demo_personal") || String(orgId) === "demo_personal_org") {
    return NextResponse.json(personalActivity);
  }
  return NextResponse.json(businessActivity);
}

