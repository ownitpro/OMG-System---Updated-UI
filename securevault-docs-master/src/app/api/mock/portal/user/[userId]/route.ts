// GET /api/mock/portal/user/[userId]

import { NextResponse } from 'next/server';
import { listUserPortals } from '@/lib/portal/mockStore';

type Props = {
  params: Promise<{ userId: string }>;
};

export async function GET(_: Request, { params }: Props) {
  try {
    const { userId } = await params;
    return NextResponse.json({ portals: listUserPortals(userId) });
  } catch (error) {
    console.error('Error fetching user portals:', error);
    return NextResponse.json({ portals: [] }, { status: 500 });
  }
}

