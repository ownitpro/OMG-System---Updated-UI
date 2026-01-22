// src/app/api/demo/business/kpis/route.ts
// Business demo KPIs API

import { NextResponse } from "next/server";
import { summary } from "@/lib/demo/business/mockClient";

export function GET() {
  return NextResponse.json(summary.kpis);
}
