// src/app/api/demo/personal/kpis/route.ts
// Personal demo KPIs API

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    docs: 42,
    storage: 320,
    shares: 5,
    sharesActive: 2,
    uploads30d: 18,
    ocr30d: 65,
  });
}

