import { NextRequest, NextResponse } from 'next/server';
import { db, PortalRequest, cuid, now } from '@/lib/portal-db';

type Props = {
  params: Promise<{ portalId: string }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { portalId } = await params;
    const { items } = await req.json();
    
    // delete existing
    for (const [id, r] of db.requests) {
      if (r.portalId === portalId) {
        db.requests.delete(id);
      }
    }
    
    // insert
    for (const item of items || []) {
      const r: PortalRequest = {
        id: cuid('r_'),
        portalId,
        label: item.label,
        required: !!item.required,
        notes: item.notes,
        createdAt: now()
      };
      db.requests.set(r.id, r);
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error updating portal requests:', error);
    return NextResponse.json({ ok: false, error: 'Failed to update requests' }, { status: 500 });
  }
}

