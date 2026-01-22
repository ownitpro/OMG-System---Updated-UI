// src/app/api/org/requests/route.ts
// Fetch portal requests by portalId (no orgId required)

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');

  const searchParams = request.nextUrl.searchParams;
  const portalId = searchParams.get('portalId');

  if (!portalId) {
    return NextResponse.json({ error: 'portalId is required' }, { status: 400 });
  }

  try {
    // Fetch portal requests for the given portalId
    const requests = await query(
      `SELECT pr.*, p.id as "portalId", p."organizationId", p."clientName", p."clientEmail"
       FROM ${getTableName('PortalRequest')} pr
       INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
       WHERE pr."portalId" = $1
       ORDER BY pr."order" ASC, pr."createdAt" DESC`,
      [portalId]
    );

    // Also fetch submissions to check which items are uploaded
    const submissions = await query(
      `SELECT ps."portalRequestId" as "requestId", ps.id 
       FROM ${getTableName('PortalSubmission')} ps
       INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
       WHERE pr."portalId" = $1`,
      [portalId]
    );

    const uploadedRequestIds = new Set((submissions || []).map((s: any) => s.requestId));

    // Group requests by portalId and create mockDb-compatible format
    const groupedRequests: Record<string, any> = {};
    const requestIdSet = new Set<string>();

    (requests || []).forEach((req: any) => {
      // Group by a unique key (could be template or just group all)
      const key = portalId;

      if (!groupedRequests[key]) {
        groupedRequests[key] = {
          id: portalId, // Use portalId as the group ID
          portalId: req.portalId,
          templateKey: 'custom',
          items: [],
          dueAt: null,
          status: 'open',
          createdAt: req.createdAt,
          title: 'Document Request',
          clientName: req.clientName || req.clientEmail,
        };
      }

      // Only add unique request items
      if (!requestIdSet.has(req.id)) {
        requestIdSet.add(req.id);
        groupedRequests[key].items.push({
          key: req.id,
          label: req.title,
          required: req.required,
          uploaded: uploadedRequestIds.has(req.id),
        });
      }
    });

    const enhancedRequests = Object.values(groupedRequests);

    return NextResponse.json({ requests: enhancedRequests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
