import { NextResponse } from 'next/server';

export async function GET(){
  const body = {
    org: { orgId: 'demo_business', orgName: 'SVD Demo – Business', plan: 'growth', trialEnds: null, health: { av:'ok', ocr:'ok', queues:'ok', waf: 2, api5xx: 0 } },
    kpis: { workspaceUsage: { used: 18, cap: 100 }, clientPortals: { count: 2 }, openRequests: 4, approvalsPending: 1 },
    quick: [
      { id:'upload', title:'Upload', action:'/demo/business/upload' },
      { id:'new_share', title:'New share link', action:'/demo/business/shares/new' },
      { id:'request_files', title:'Request files', action:'/demo/business/requests/new' },
      { id:'create_client_portal', title:'Create Client Portal', action:'/demo/business/portals/new' },
      { id:'send_request_docs', title:'Send Request for Docs', action:'/demo/business/requests/new' },
      { id:'install_app', title:'Install App', action:'/demo/business/install' },
      { id:'try_ocr_review', title:'Try OCR Review', action:'/demo/business/ocr' },
    ],
    activity: [
      { id:'a1', ts:new Date().toISOString(), actor:'demo@svd', summary:'Uploaded 3 receipts' },
      { id:'a2', ts:new Date(Date.now()-3600_000).toISOString(), actor:'ops@svd', summary:'Created client portal: Acme Co.' },
      { id:'a3', ts:new Date(Date.now()-7200_000).toISOString(), actor:'ops@svd', summary:'Shared KYC request link' },
    ]
  };
  return NextResponse.json(body);
}
