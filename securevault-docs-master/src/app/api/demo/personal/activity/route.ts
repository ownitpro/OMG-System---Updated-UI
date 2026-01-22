// src/app/api/demo/personal/activity/route.ts
// Personal demo activity API

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    events: [
      { id: "1", ts: new Date().toISOString(), summary: "Uploaded 3 receipts" },
      { id: "2", ts: new Date(Date.now() - 3600e3).toISOString(), summary: "Created share link for 'Tax Pack'" },
      { id: "3", ts: new Date(Date.now() - 7200e3).toISOString(), summary: "Tagged 'Insurance' on 2 files" },
    ],
  });
}

