// POST /api/mock/portal/auth/start

import { NextResponse } from 'next/server';
import { getPortal, putSession } from '@/lib/portal/mockStore';

export async function POST(req: Request) {
  const { portalId, credential } = await req.json();
  const portal = getPortal(portalId);
  if (!portal)
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });

  // mock-accept any credential for testing
  const tok = Math.random().toString(36).slice(2);
  putSession(tok, { portalId, ts: Date.now() });
  return NextResponse.json({ ok: true, token: tok });
}

