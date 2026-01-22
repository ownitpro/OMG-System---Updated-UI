// POST /api/mock/portal/business/create

import { NextResponse } from 'next/server';
import { savePortal } from '@/lib/portal/mockStore';
import { PortalStore } from '@/lib/mock/portalStore';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json();
  const { orgId, clientName, clientEmail, authMode } = body;
  
  const portalId = randomUUID();
  
  // Create portal record
  const p = savePortal({
    id: portalId,
    type: 'business',
    orgId,
    title: `${clientName} Portal`,
    clientName,
    clientEmail,
    authMode: authMode || 'pin',
    uploads: [],
    createdAt: new Date().toISOString(),
  });
  
  // Create invite with email and PIN
  const invite = PortalStore.createInvite(clientName, clientEmail, orgId, portalId);
  
  return NextResponse.json({ 
    ok: true, 
    portal: {
      ...p,
      pin: invite.pin,
      token: invite.token,
    }
  });
}

