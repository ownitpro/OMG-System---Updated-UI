// POST /api/mock/portal/upload

import { NextResponse } from 'next/server';
import { getPortal, savePortal } from '@/lib/portal/mockStore';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  const { token, portalId, name, size, label } = await req.json();
  const p = getPortal(portalId);
  if (!p) return NextResponse.json({ ok: false }, { status: 404 });

  p.uploads.push({
    id: randomUUID(),
    name,
    size,
    label,
    ts: new Date().toISOString(),
  });
  savePortal(p);
  return NextResponse.json({ ok: true, uploads: p.uploads });
}

