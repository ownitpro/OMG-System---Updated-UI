// src/app/api/demo/business/metrics/route.ts
// Business demo metrics API

import { NextResponse } from "next/server";
import { metrics } from "@/lib/demo/business/mockClient";

export function GET() {
  return NextResponse.json(metrics);
}

