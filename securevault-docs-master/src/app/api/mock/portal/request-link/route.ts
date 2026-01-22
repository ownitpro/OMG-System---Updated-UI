// app/api/mock/portal/request-link/route.ts (POST)

import { NextRequest, NextResponse } from "next/server";
import { issueMockTokenForEmail } from "@/lib/mockPortalDb";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const token = issueMockTokenForEmail(email);
  // In real app, email this; here we just return it for demo
  return NextResponse.json({ ok: true, token, message: "Magic link issued (mock)." });
}

