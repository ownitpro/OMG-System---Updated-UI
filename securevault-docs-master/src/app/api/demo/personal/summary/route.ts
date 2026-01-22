import { NextResponse } from 'next/server';

export async function GET(){
  const body = {
    org: { orgId: 'demo_personal', orgName: 'SVD Demo – Personal', plan: 'starter', trialEnds: null, health: { av:'ok', ocr:'ok', queues:'ok', waf: 0, api5xx: 0 } },
    kpis: { workspaceUsage: { used: 3, cap: 20 }, clientPortals: { count: 0 }, openRequests: 1, approvalsPending: 0 },
    quick: [
      { id:'upload', title:'Upload', action:'/demo/personal/upload' },
      { id:'new_share', title:'New share link', action:'/demo/personal/shares/new' },
      { id:'request_files', title:'Request files', action:'/demo/personal/requests/new' },
      { id:'install_app', title:'Install App', action:'/demo/personal/install' },
      { id:'try_ocr_review', title:'Try OCR Review', action:'/demo/personal/ocr' },
    ],
    activity: [ { id:'pa1', ts:new Date().toISOString(), actor:'you', summary:'Scanned Hydro bill (Nov)' } ]
  };
  return NextResponse.json(body);
}
