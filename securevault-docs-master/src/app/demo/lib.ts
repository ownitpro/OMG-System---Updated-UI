import { getAbsoluteUrl } from '@/lib/utils/url';

// Fallback data for error cases
const fallbackSummary = {
  org: { orgId: 'demo', orgName: 'Demo', plan: 'starter' as const, trialEnds: null, health: { av:'ok' as const, ocr:'ok' as const, queues:'ok' as const, waf: 0, api5xx: 0 } },
  kpis: { workspaceUsage: { used: 0, cap: 100 }, clientPortals: { count: 0 }, openRequests: 0, approvalsPending: 0 },
  quick: [],
  activity: []
};

const fallbackAnalytics = {
  uploadsPerDay: [0,0,0,0,0,0,0],
  ocrPagesPerDay: [0,0,0,0,0,0,0],
  egressGbPerDay: [0,0,0,0,0,0,0]
};

export async function getSummary(kind: 'business'|'personal'){
  try {
    const url = getAbsoluteUrl(`/api/demo/${kind}/summary`);
    const r = await fetch(url, { cache:'no-store' });
    
    if (!r.ok) {
      console.warn(`[demo] getSummary failed: ${r.status} ${r.statusText}`);
      return fallbackSummary;
    }
    
    const contentType = r.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`[demo] getSummary returned non-JSON: ${contentType}`);
      return fallbackSummary;
    }
    
    return await r.json();
  } catch (error) {
    console.error(`[demo] getSummary error:`, error);
    return fallbackSummary;
  }
}

export async function getAnalytics(kind: 'business'|'personal'){
  try {
    const url = getAbsoluteUrl(`/api/demo/${kind}/analytics`);
    const r = await fetch(url, { cache:'no-store' });
    
    if (!r.ok) {
      console.warn(`[demo] getAnalytics failed: ${r.status} ${r.statusText}`);
      return fallbackAnalytics;
    }
    
    const contentType = r.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`[demo] getAnalytics returned non-JSON: ${contentType}`);
      return fallbackAnalytics;
    }
    
    return await r.json();
  } catch (error) {
    console.error(`[demo] getAnalytics error:`, error);
    return fallbackAnalytics;
  }
}

