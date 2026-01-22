export type DemoOrgSummary = {
  orgId: string;
  orgName: string;
  plan: 'starter' | 'growth' | 'pro';
  trialEnds?: string | null;
  health: { av: 'ok' | 'warn'; ocr: 'ok' | 'warn'; queues: 'ok' | 'warn'; waf: number; api5xx: number };
};

export type DemoKpis = {
  workspaceUsage: { used: number; cap: number };
  clientPortals: { count: number; cap?: number };
  openRequests: number;
  approvalsPending: number;
};

export type DemoActivity = { id: string; ts: string; actor: string; summary: string };

export type DemoQuickAction = {
  id: 'upload' | 'new_share' | 'request_files' | 'install_app' | 'try_ocr_review' | 'create_client_portal' | 'send_request_docs';
  title: string;
  action: string; // "/demo/*" route or "POST:/api/demo/*"
};

