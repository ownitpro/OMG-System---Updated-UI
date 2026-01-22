// src/app/api/personal/meters/route.ts
// Mock meters API for personal plan usage

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    plan: "personal_pro",
    usage: {
      storageGB: { used: 18.2, cap: 200 },
      ocrPages: { used: 480, cap: 2000 },
      shares: { used: 22, cap: "unlimited" },
      seats: { used: 2, cap: 3 },
      businessVaults: { used: 1, cap: 2 },
    },
    trial: { active: true, endsAt: "2025-12-01T00:00:00Z" },
  });
}

