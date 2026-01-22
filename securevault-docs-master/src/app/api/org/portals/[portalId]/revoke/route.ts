import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/portal-db';

type Props = {
  params: Promise<{ portalId: string }>;
};

export async function POST(_: NextRequest, { params }: Props) {
  try {
    const { portalId } = await params;
    const p = db.portals.get(portalId);
    if (p) {
      p.status = 'closed';
      p.updatedAt = new Date().toISOString();
      db.portals.set(p.id, p);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error revoking portal:', error);
    return NextResponse.json({ ok: false, error: 'Failed to revoke portal' }, { status: 500 });
  }
}

