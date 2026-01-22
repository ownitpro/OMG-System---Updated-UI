// src/app/api/portals/[portalId]/requests/route.ts

import { NextResponse } from "next/server";

type Params = { params: Promise<{ portalId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { portalId } = await params;
  
  // Mock request data
  const requests = [
    {
      id: 'req_1',
      portalId,
      label: 'W-9 Form',
      required: true,
      notes: 'Please complete and upload W-9 form',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'req_2',
      portalId,
      label: 'Invoice',
      required: true,
      notes: 'Latest invoice for verification',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];
  
  return NextResponse.json({ requests });
}

