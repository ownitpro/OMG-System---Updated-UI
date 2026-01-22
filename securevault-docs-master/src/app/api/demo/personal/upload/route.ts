// src/app/api/demo/personal/upload/route.ts
// Personal demo upload API (mocked)

import { NextResponse } from "next/server";

export async function POST() {
  // pretend upload + AV + OCR queued
  await new Promise((r) => setTimeout(r, 400));
  return NextResponse.json({ ok: true, id: "up_mock" });
}

