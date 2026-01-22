// src/app/api/demo/business/activity/route.ts
// Business demo activity API

import { NextResponse } from "next/server";
import { activity } from "@/lib/demo/business/mockClient";

export function GET() {
  return NextResponse.json(activity);
}
