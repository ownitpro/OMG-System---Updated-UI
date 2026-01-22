// src/app/api/demo/business/billing/route.ts
// Business demo billing API

import { NextResponse } from "next/server";
import { billing } from "@/lib/demo/business/mockClient";

export function GET() {
  return NextResponse.json(billing);
}
