// src/app/api/demo/personal/settings/limits/route.ts
// Personal demo settings limits API (in-memory store)

import { NextResponse } from "next/server";

let state = { storage: 500, ocr: 150 };

export async function GET() {
  return NextResponse.json(state);
}

export async function POST(req: Request) {
  const body = await req.json();
  state = { ...state, ...body };
  return NextResponse.json(state);
}

