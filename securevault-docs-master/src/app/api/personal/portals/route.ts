import { NextRequest, NextResponse } from 'next/server';
import { db, Portal, cuid, now } from '@/lib/portal-db';

export async function GET() {
  // Return mock data if db is empty
  const dbItems = [...db.portals.values()].filter(p => p.personalId === 'personal_demo');
  
  if (dbItems.length === 0) {
    // Mock portal data
    const items = [
      {
        id: 'p_personal_1',
        personalId: 'personal_demo',
        externalName: 'My Personal Portal',
        email: 'me@example.com',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    return NextResponse.json({ items });
  }
  
  return NextResponse.json({ items: dbItems });
}

export async function POST(req: NextRequest) {
  const { externalName, email, pin, expiresInDays } = await req.json();
  
  const p: Portal = {
    id: cuid('p_'),
    personalId: 'personal_demo',
    externalName,
    email,
    pinHash: pin ? `hash:${pin}` : null,
    expiresAt: expiresInDays ? new Date(Date.now() + expiresInDays * 86400000).toISOString() : null,
    status: 'active',
    createdAt: now(),
    updatedAt: now()
  };
  
  db.portals.set(p.id, p);
  
  const t = {
    id: cuid('t_'),
    portalId: p.id,
    token: cuid('tok_'),
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    usedAt: null
  };
  
  db.tokens.set(t.token, t);
  
  return NextResponse.json({ ok: true, portal: p, token: t.token });
}

