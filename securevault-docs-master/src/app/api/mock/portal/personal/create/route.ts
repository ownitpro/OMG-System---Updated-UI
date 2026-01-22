// POST /api/mock/portal/personal/create

import { NextResponse } from 'next/server';
import { savePortal } from '@/lib/portal/mockStore';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json();
  const { ownerUserId, title, authMode, linkedBusinesses, seatsAllowed } = body;
  const p = savePortal({
    id: randomUUID(),
    type: 'personal',
    ownerUserId,
    title: title || 'My Family Portal',
    clientName: ownerUserId || 'User',
    authMode: authMode || 'pin',
    linkedBusinesses: linkedBusinesses || [],
    seatsAllowed: seatsAllowed || 3,
    uploads: [],
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true, portal: p });
}

