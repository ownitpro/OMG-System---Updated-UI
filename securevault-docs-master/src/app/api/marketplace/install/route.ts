import { NextResponse } from 'next/server';
import { mockStore, isTestMode } from '@/lib/marketplace/mockStore';
import type { InstallRequest, InstallResult } from '@/types/marketplace';

export async function POST(req: Request) {
  const body = (await req.json()) as InstallRequest;
  const tpl = mockStore.templates.find(t => t.id === body.templateId);
  if (!tpl) return NextResponse.json({ ok:false, message:'Template not found' }, { status: 404 });

  const result: InstallResult = {
    ok: true,
    mode: 'install',
    template: tpl,
    appliedChanges: [
      { kind:'folders.add', path:'Vault/Receipts' },
      { kind:'folders.add', path:'Vault/Bills/2025' },
      { kind:'labels.add', path:'Labels: ["Invoice","Receipt","KYC","Contract"]' },
      { kind:'quickActions.add', path:'/overview', note:'Add "Browse marketplace" if missing' },
      { kind:'checklist.merge', path:'/overview/checklist', note:'Add starter checklist items' }
    ],
    message: isTestMode()
      ? 'Simulated install (test-mode). UI updated in-memory only.'
      : 'Template installed.'
  };

  // Persist to in-memory log in both modes (for demo lists)
  mockStore.installs.push({ at: Date.now(), target: body.target, templateId: tpl.id });

  return NextResponse.json(result);
}

