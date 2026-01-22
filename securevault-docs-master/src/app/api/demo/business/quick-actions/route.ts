// src/app/api/demo/business/quick-actions/route.ts
// Business demo quick actions API

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ ok: true });
}
