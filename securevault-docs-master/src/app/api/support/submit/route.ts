// app/api/support/submit/route.ts
// Mock support ticket submission endpoint (safe for testing)

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Swallow payload during testing; return OK
  try {
    await req.formData(); // read to avoid body stream warnings
  } catch (e) {
    // Ignore parsing errors in test mode
  }
  
  return NextResponse.json({ 
    ok: true, 
    ticketId: "demo-" + Date.now() 
  });
}

