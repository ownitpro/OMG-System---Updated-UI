// src/app/api/demo/business/documents/route.ts
// Business demo documents API

import { NextResponse } from "next/server";
import { documents } from "@/lib/demo/business/mockClient";

export function GET() {
  return NextResponse.json(documents);
}
