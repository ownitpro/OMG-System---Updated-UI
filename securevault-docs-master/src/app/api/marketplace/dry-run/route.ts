import { NextResponse } from 'next/server';
import { mockStore, isTestMode } from '@/lib/marketplace/mockStore';
import type { InstallRequest, InstallResult } from '@/types/marketplace';

export async function POST(req: Request) {
  const body = (await req.json()) as InstallRequest;
  const tpl = mockStore.templates.find(t => t.id === body.templateId);
  if (!tpl) return NextResponse.json({ ok:false, message:'Template not found' }, { status: 404 });

  const result: InstallResult = {
    ok: true,
    mode: 'dry-run',
    template: tpl,
    appliedChanges: [
      { kind:'folders.add', path:'Vault/Receipts', note:'Create folder structure' },
      { kind:'labels.add', path:'Labels: ["Invoice","Receipt","KYC"]' },
      { kind:'requests.template', path:'/requests/templates', note:'Seed 3 request templates' }
    ],
    message: isTestMode() ? 'Simulated dry-run (test-mode). No changes persisted.' : 'Dry-run preview generated.'
  };

  return NextResponse.json(result);
}

