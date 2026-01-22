// API route to get document requests for a portal
import { NextRequest, NextResponse } from 'next/server';
import { requirePortalAuth } from '@/lib/portalAuth';

type Props = {
  params: Promise<{ portalId: string }>;
};

interface PortalRequest {
  id: string;
  portalId: string;
  title: string;
  description: string | null;
  required: boolean;
  order: number;
  createdAt: string;
}

interface PortalSubmission {
  portalRequestId: string;
  status: string;
}

async function handler(req: NextRequest, session: any, portalId: string) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // Get requests for this portal from database
    const requests = await query<PortalRequest>(
      `SELECT * FROM ${getTableName('PortalRequest')} WHERE "portalId" = $1 ORDER BY "order" ASC`,
      [portalId]
    );

    if (!requests) {
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }

    // Check for submissions
    const requestIds = requests.map(r => r.id);
    let submissions: PortalSubmission[] = [];

    console.log('[REQUESTS] Looking for submissions for request IDs:', requestIds);

    if (requestIds.length > 0) {
      const placeholders = requestIds.map((_, i) => `$${i + 1}`).join(', ');
      submissions = await query<PortalSubmission>(
        `SELECT "portalRequestId", status FROM ${getTableName('PortalSubmission')} WHERE "portalRequestId" IN (${placeholders})`,
        requestIds
      ) || [];
      console.log('[REQUESTS] Found submissions:', submissions);
    }

    // Format requests to match expected structure
    const submissionMap = new Map(submissions.map(s => [s.portalRequestId, s.status]));
    console.log('[REQUESTS] Submission map:', Array.from(submissionMap.entries()));

    const formattedRequests = requests.map((request) => ({
      id: request.id,
      portalId: request.portalId,
      templateKey: 'custom',
      items: [{
        key: request.id,
        label: request.title,
        required: request.required,
        uploaded: submissionMap.has(request.id),
      }],
      dueAt: null,
      status: submissionMap.has(request.id) ? 'complete' : 'open',
      createdAt: request.createdAt,
      title: request.title,
      description: request.description || '',
    }));

    return NextResponse.json({ requests: formattedRequests });
  } catch (error) {
    console.error('Error fetching portal requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export const GET = requirePortalAuth(handler);
