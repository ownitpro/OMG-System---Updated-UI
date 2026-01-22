import { NextRequest, NextResponse } from 'next/server';
import { db as mockDb } from '@/lib/portal-db';

interface Params {
  params: Promise<{ orgId: string }>;
}

interface PortalData {
  id: string;
  clientName: string;
  clientEmail: string;
  expiresAt: string | null;
  createdAt: string;
}

interface RequestItem {
  id: string;
  portalId: string;
  title: string;
  required: boolean;
  createdAt: string;
}

interface Submission {
  id: string;
  portalId: string;
  requestId: string | null;
  fileName: string;
  createdAt: string;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');

  const { orgId } = await params;
  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range') || '30d';

  console.log('[ANALYTICS] Loading analytics for org:', orgId, 'range:', range);

  // Calculate date range
  const now = new Date();
  let startDate = new Date();

  switch (range) {
    case '7d':
      startDate.setDate(now.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(now.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(now.getDate() - 90);
      break;
    case 'all':
      startDate = new Date('2020-01-01');
      break;
  }

  try {
    // ========== GET PORTALS ==========
    // Query SQL database
    let sqlPortals: PortalData[] = [];
    try {
      sqlPortals = await query<PortalData>(
        `SELECT id, "clientName", "clientEmail", "expiresAt", "createdAt"
         FROM ${getTableName('Portal')}
         WHERE "organizationId" = $1`,
        [orgId]
      ) || [];
      console.log('[ANALYTICS] SQL portals found:', sqlPortals.length);
    } catch (err) {
      console.log('[ANALYTICS] Error querying SQL portals:', err);
    }

    // Also check mock database (for development)
    const mockPortals = [...mockDb.portals.values()].filter(p => p.orgId === orgId);
    console.log('[ANALYTICS] Mock portals found:', mockPortals.length);

    // Combine - prefer SQL data, add mock portals not in SQL
    const sqlPortalIds = new Set(sqlPortals.map(p => p.id));
    const combinedPortals: PortalData[] = [
      ...sqlPortals,
      ...mockPortals
        .filter(p => !sqlPortalIds.has(p.id))
        .map(p => ({
          id: p.id,
          clientName: p.externalName || '',
          clientEmail: p.email || '',
          expiresAt: p.expiresAt || null,
          createdAt: p.createdAt,
        }))
    ];

    // Calculate portal metrics
    const totalPortals = combinedPortals.length;
    const activePortals = combinedPortals.filter(p =>
      !p.expiresAt || new Date(p.expiresAt) > now
    ).length;
    const expiredPortals = combinedPortals.filter(p =>
      p.expiresAt && new Date(p.expiresAt) <= now
    ).length;

    console.log('[ANALYTICS] Portal metrics:', { totalPortals, activePortals, expiredPortals });

    // ========== GET REQUESTS ==========
    const portalIds = combinedPortals.map(p => p.id);
    let sqlRequests: RequestItem[] = [];
    let mockRequests: RequestItem[] = [];

    if (portalIds.length > 0) {
      // SQL requests
      try {
        sqlRequests = await query<RequestItem>(
          `SELECT id, "portalId", title, required, "createdAt"
           FROM ${getTableName('PortalRequest')}
           WHERE "portalId" = ANY($1)
           ORDER BY "createdAt" DESC`,
          [portalIds]
        ) || [];
      } catch (err) {
        console.log('[ANALYTICS] Error querying SQL requests:', err);
      }
    }

    // Mock requests
    mockRequests = [...mockDb.requests.values()]
      .filter(r => portalIds.includes(r.portalId))
      .map(r => ({
        id: r.id,
        portalId: r.portalId,
        title: r.label || 'Untitled',
        required: r.required,
        createdAt: r.createdAt,
      }));

    // Combine requests
    const sqlRequestIds = new Set(sqlRequests.map(r => r.id));
    const requestItems = [
      ...sqlRequests,
      ...mockRequests.filter(r => !sqlRequestIds.has(r.id))
    ];

    console.log('[ANALYTICS] Total requests:', requestItems.length);

    // ========== GET SUBMISSIONS ==========
    let sqlSubmissions: Submission[] = [];
    let mockSubmissions: Submission[] = [];

    const requestIds = requestItems.map(r => r.id);
    if (requestIds.length > 0) {
      // Get request creation dates for calculating submission time
      const requestCreatedMap = new Map<string, string>();
      requestItems.forEach(r => requestCreatedMap.set(r.id, r.createdAt));

      try {
        // Try query with createdAt first (newer submissions have this)
        const submissionResults = await query<{
          id: string;
          portalRequestId: string;
          portalId: string;
          createdAt: string | null;
        }>(
          `SELECT ps.id, ps."portalRequestId", pr."portalId", ps."createdAt"
           FROM ${getTableName('PortalSubmission')} ps
           INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
           WHERE ps."portalRequestId" = ANY($1)`,
          [requestIds]
        );

        sqlSubmissions = (submissionResults || []).map(s => ({
          id: s.id,
          portalId: s.portalId,
          requestId: s.portalRequestId,
          fileName: '',
          createdAt: s.createdAt || requestCreatedMap.get(s.portalRequestId) || new Date().toISOString(),
        }));
        console.log('[ANALYTICS] SQL submissions found:', sqlSubmissions.length);
      } catch (err) {
        // Fallback: query without createdAt if column doesn't exist
        console.log('[ANALYTICS] Trying fallback query without createdAt:', err);
        try {
          const submissionResults = await query<{
            id: string;
            portalRequestId: string;
            portalId: string;
          }>(
            `SELECT ps.id, ps."portalRequestId", pr."portalId"
             FROM ${getTableName('PortalSubmission')} ps
             INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
             WHERE ps."portalRequestId" = ANY($1)`,
            [requestIds]
          );

          sqlSubmissions = (submissionResults || []).map(s => ({
            id: s.id,
            portalId: s.portalId,
            requestId: s.portalRequestId,
            fileName: '',
            createdAt: requestCreatedMap.get(s.portalRequestId) || new Date().toISOString(),
          }));
          console.log('[ANALYTICS] SQL submissions found (fallback):', sqlSubmissions.length);
        } catch (fallbackErr) {
          console.log('[ANALYTICS] Error querying SQL submissions (fallback):', fallbackErr);
        }
      }
    }

    // Mock submissions - filter by portal
    mockSubmissions = [...mockDb.submissions.values()]
      .filter(s => portalIds.includes(s.portalId))
      .map(s => ({
        id: s.id,
        portalId: s.portalId,
        requestId: s.requestId || null,
        fileName: s.fileName,
        createdAt: s.createdAt,
      }));

    // Combine submissions
    const sqlSubmissionIds = new Set(sqlSubmissions.map(s => s.id));
    const submissions = [
      ...sqlSubmissions,
      ...mockSubmissions.filter(s => !sqlSubmissionIds.has(s.id))
    ];

    console.log('[ANALYTICS] Total submissions:', submissions.length);

    // ========== CALCULATE METRICS ==========
    const uploadedRequestIds = new Set(submissions.map(s => s.requestId).filter(Boolean));

    // Group requests by portal
    const portalRequestsMap = new Map<string, (RequestItem & { uploaded: boolean })[]>();
    requestItems.forEach(item => {
      if (!portalRequestsMap.has(item.portalId)) {
        portalRequestsMap.set(item.portalId, []);
      }
      portalRequestsMap.get(item.portalId)!.push({
        ...item,
        uploaded: uploadedRequestIds.has(item.id)
      });
    });

    // Filter by date range
    const itemsInRange = requestItems.filter(item => {
      const createdAt = new Date(item.createdAt);
      return createdAt >= startDate && createdAt <= now;
    });

    // Request completion metrics
    const uniquePortalsWithRequests = new Set(itemsInRange.map(i => i.portalId));
    const totalRequests = requestItems.length; // Total individual document requests

    let completedRequests = 0;
    let pendingRequests = 0;
    uniquePortalsWithRequests.forEach(portalId => {
      const portalItems = itemsInRange.filter(i => i.portalId === portalId);
      const allUploaded = portalItems.every(i => uploadedRequestIds.has(i.id));
      if (allUploaded && portalItems.length > 0) {
        completedRequests += portalItems.filter(i => uploadedRequestIds.has(i.id)).length;
      }
      pendingRequests += portalItems.filter(i => !uploadedRequestIds.has(i.id)).length;
    });

    // Upload metrics
    const totalUploads = submissions.length;

    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const uploadsThisMonth = submissions.filter(s => {
      const createdAt = new Date(s.createdAt);
      return createdAt >= thisMonthStart && createdAt <= now;
    }).length;

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const uploadsLastMonth = submissions.filter(s => {
      const createdAt = new Date(s.createdAt);
      return createdAt >= lastMonthStart && createdAt <= lastMonthEnd;
    }).length;

    // Average completion time
    let avgCompletionTime = 0;
    const completionTimes = submissions
      .map(s => {
        const request = requestItems.find(r => r.id === s.requestId);
        if (request) {
          const requestDate = new Date(request.createdAt);
          const submitDate = new Date(s.createdAt);
          const days = (submitDate.getTime() - requestDate.getTime()) / (1000 * 60 * 60 * 24);
          return days > 0 ? days : 0;
        }
        return 0;
      })
      .filter(d => d > 0);

    if (completionTimes.length > 0) {
      avgCompletionTime = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length;
    }

    // Top document types
    const documentTypeCounts: Record<string, number> = {};
    itemsInRange.forEach(item => {
      const type = item.title || 'Other';
      documentTypeCounts[type] = (documentTypeCounts[type] || 0) + 1;
    });

    const topDocumentTypes = Object.entries(documentTypeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Uploads by date
    const daysToShow = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 30;
    const uploadsByDate: { date: string; count: number }[] = [];

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const uploadsOnDate = submissions.filter(s => {
        const createdAt = new Date(s.createdAt);
        return createdAt.toISOString().split('T')[0] === dateStr;
      }).length;

      uploadsByDate.push({ date: dateStr, count: uploadsOnDate });
    }

    // Portal performance
    const portalPerformance = combinedPortals.map(portal => {
      const portalItems = portalRequestsMap.get(portal.id) || [];
      const totalReqs = portalItems.length;
      const completedReqs = portalItems.filter(i => i.uploaded).length;
      const completionRate = totalReqs > 0 ? Math.round((completedReqs / totalReqs) * 100) : 0;

      // Average response time in hours
      let avgResponseHours = 0;
      const portalSubmissions = submissions.filter(s =>
        s.portalId === portal.id || portalItems.some(pi => pi.id === s.requestId)
      );

      if (portalSubmissions.length > 0) {
        const totalHours = portalSubmissions.reduce((sum, s) => {
          const request = portalItems.find(pi => pi.id === s.requestId);
          if (request) {
            const requestDate = new Date(request.createdAt);
            const submitDate = new Date(s.createdAt);
            const hours = (submitDate.getTime() - requestDate.getTime()) / (1000 * 60 * 60);
            return sum + (hours > 0 ? hours : 0);
          }
          return sum;
        }, 0);
        avgResponseHours = totalHours / portalSubmissions.length;
      }

      return {
        portalId: portal.id,
        clientName: portal.clientName || portal.clientEmail?.split('@')[0] || 'Unknown Client',
        totalRequests: totalReqs,
        completedRequests: completedReqs,
        completionRate,
        avgResponseTime: avgResponseHours
      };
    }).sort((a, b) => b.totalRequests - a.totalRequests);

    console.log('[ANALYTICS] Final metrics:', {
      totalPortals,
      activePortals,
      totalUploads,
      totalRequests,
      completedRequests,
      pendingRequests,
    });

    return NextResponse.json({
      totalPortals,
      activePortals,
      expiredPortals,
      totalUploads,
      uploadsThisMonth,
      uploadsLastMonth,
      totalRequests,
      completedRequests,
      pendingRequests,
      avgCompletionTime,
      topDocumentTypes,
      uploadsByDate,
      portalPerformance
    });
  } catch (error) {
    console.error('[ANALYTICS] Error:', error);
    return NextResponse.json({
      totalPortals: 0,
      activePortals: 0,
      expiredPortals: 0,
      totalUploads: 0,
      uploadsThisMonth: 0,
      uploadsLastMonth: 0,
      totalRequests: 0,
      completedRequests: 0,
      pendingRequests: 0,
      avgCompletionTime: 0,
      topDocumentTypes: [],
      uploadsByDate: [],
      portalPerformance: []
    });
  }
}
