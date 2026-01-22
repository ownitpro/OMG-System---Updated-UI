// src/app/api/demo/business/settings/route.ts
// Business demo settings API

import { NextResponse } from "next/server";
import { settings } from "@/lib/demo/business/mockClient";

export function GET() {
  return NextResponse.json(settings);
}
