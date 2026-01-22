// GET /api/mock/portal/org/[orgId]

import { NextResponse } from 'next/server';
import { listOrgPortals } from '@/lib/portal/mockStore';

type Props = {
  params: Promise<{ orgId: string }>;
};

export async function GET(_: Request, { params }: Props) {
  try {
    const { orgId } = await params;
    return NextResponse.json({ portals: listOrgPortals(orgId) });
  } catch (error) {
    console.error('Error fetching org portals:', error);
    return NextResponse.json({ portals: [] }, { status: 500 });
  }
}

