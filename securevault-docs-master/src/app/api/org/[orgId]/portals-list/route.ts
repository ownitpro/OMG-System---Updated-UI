// src/app/api/org/[orgId]/portals-list/route.ts

import { NextResponse } from "next/server";

type Params = { params: Promise<{ orgId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId } = await params;

  try {
    const portals = await query(
      `SELECT id, name, "clientEmail", "clientName", status, "createdAt"
       FROM ${getTableName('Portal')}
       WHERE "organizationId" = $1
       ORDER BY "createdAt" DESC`,
      [orgId]
    );

    // Map to expected format for the request form
    const formattedPortals = (portals || []).map((portal: any) => ({
      id: portal.id,
      title: portal.name,
      client: {
        name: portal.clientName,
        email: portal.clientEmail,
      }
    }));

    return NextResponse.json({ portals: formattedPortals });
  } catch (error) {
    console.error('Error fetching portals:', error);
    return NextResponse.json({ error: 'Failed to fetch portals' }, { status: 500 });
  }
}
