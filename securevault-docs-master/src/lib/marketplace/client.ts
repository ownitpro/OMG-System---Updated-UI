import type { InstallRequest, InstallResult } from '@/types/marketplace';

export async function listTemplates() {
  const r = await fetch('/api/marketplace/templates', { cache: 'no-store' });
  return r.json() as Promise<{ items: any[] }>;
}

export async function dryRunInstall(templateId: string, target: 'business'|'personal') {
  const r = await fetch('/api/marketplace/dry-run', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ templateId, target, mode:'dry-run' } satisfies InstallRequest)
  });
  return r.json() as Promise<InstallResult>;
}

export async function doInstall(templateId: string, target: 'business'|'personal') {
  const r = await fetch('/api/marketplace/install', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ templateId, target, mode:'install' } as InstallRequest)
  });
  return r.json() as Promise<InstallResult>;
}

