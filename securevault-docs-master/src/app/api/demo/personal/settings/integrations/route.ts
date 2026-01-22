// src/app/api/demo/personal/settings/integrations/route.ts
// Personal demo settings integrations API (in-memory store)

import { NextResponse } from "next/server";

let integ = { emailToVault: true, drive: false };

export async function GET() {
  return NextResponse.json(integ);
}

export async function POST(req: Request) {
  const body = await req.json();
  integ = { ...integ, ...body };
  return NextResponse.json(integ);
}

