import { NextRequest, NextResponse } from "next/server";
import { rollback } from "@/lib/templates/mockStore";

export async function POST(req: NextRequest) {
  const enabled = process.env.SVD_MARKETPLACE_ENABLED === 'true';
  if (!enabled) return NextResponse.json({ error: "disabled" }, { status: 403 });

  const { installId } = await req.json();
  try {
    const res = rollback(installId);
    return NextResponse.json({ ok: true, ...res });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "rollback_failed" }, { status: 400 });
  }
}

