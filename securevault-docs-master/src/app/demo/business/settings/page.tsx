// src/app/demo/business/settings/page.tsx
// Settings page with localStorage integrations

'use client';

import * as React from 'react';

const ORG_KEY = 'svd_demo_org_settings_v1';

function loadOrg() {
  if (typeof window === 'undefined') return { name: 'Acme Demo Org', region: 'Canada (ca-central-1)', logo: '' };
  return JSON.parse(localStorage.getItem(ORG_KEY) || '{"name":"Acme Demo Org","region":"Canada (ca-central-1)","logo":""}');
}

function saveOrg(v: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORG_KEY, JSON.stringify(v));
}

const INTEGRATIONS_KEY = 'svd_demo_integrations_v1';

function loadInt() {
  if (typeof window === 'undefined')
    return {
      qbo: false,
      gdrive: true,
      onedrive: false,
      dropbox: false,
      box: false,
      emailToVault: true,
      esign: false,
      slack: false,
    };
  return JSON.parse(
    localStorage.getItem(INTEGRATIONS_KEY) ||
      '{"qbo":false,"gdrive":true,"onedrive":false,"dropbox":false,"box":false,"emailToVault":true,"esign":false,"slack":false}'
  );
}

function saveInt(v: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(v));
}

export default function SettingsPage() {
  const [org, setOrg] = React.useState<any>(loadOrg());
  const [ints, setInts] = React.useState<any>(loadInt());

  function toggle(k: string) {
    const v = { ...ints, [k]: !ints[k] };
    setInts(v);
    saveInt(v);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Settings</h1>
        <p className="text-sm text-zinc-400">Mock settings to preview configuration flows.</p>
      </div>
      <section className="rounded-2xl border border-zinc-800 p-4 space-y-3 bg-zinc-900">
        <div className="text-sm font-medium text-zinc-100">Organization</div>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Organization name"
            value={org.name}
            onChange={(e) => setOrg({ ...org, name: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Region"
            value={org.region}
            onChange={(e) => setOrg({ ...org, region: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Logo URL (mock)"
            value={org.logo}
            onChange={(e) => setOrg({ ...org, logo: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => saveOrg(org)} className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
          <span className="text-xs text-zinc-400 self-center">(persists in localStorage)</span>
        </div>
      </section>
      <section className="rounded-2xl border border-zinc-800 p-4 space-y-3 bg-zinc-900">
        <div className="text-sm font-medium text-zinc-100">Integrations (mock)</div>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { k: 'qbo', label: 'QuickBooks Online' },
            { k: 'gdrive', label: 'Google Drive' },
            { k: 'onedrive', label: 'OneDrive' },
            { k: 'dropbox', label: 'Dropbox' },
            { k: 'box', label: 'Box' },
            { k: 'emailToVault', label: 'Email → Vault' },
            { k: 'esign', label: 'E‑Sign handoff' },
            { k: 'slack', label: 'Slack (channel handoff)' },
          ].map((it) => (
            <label key={it.k} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 px-3 py-2 bg-zinc-950">
              <span className="text-zinc-100">{it.label}</span>
              <input type="checkbox" checked={!!ints[it.k]} onChange={() => toggle(it.k)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-zinc-800 p-4 space-y-2 bg-zinc-900" id="install">
        <div className="text-sm font-medium text-zinc-100">Install App (mock)</div>
        <p className="text-sm text-zinc-400">
          Install from <strong className="text-zinc-200">securevaultdocs.com</strong>. Desktop: Windows/Mac/Linux. Mobile: use PWA (Add to Home Screen).
        </p>
        <div className="text-xs text-zinc-500">Troubleshooting: enable "Install app" in your browser, clear any previous PWA, and retry.</div>
      </section>
      <section className="rounded-2xl border border-zinc-800 p-4 space-y-2 bg-zinc-900">
        <div className="text-sm font-medium text-zinc-100">Marketplace</div>
        <p className="text-sm text-zinc-400">
          Browse and install ready-made vault templates, request templates, and workflows from the marketplace.
        </p>
        <div className="mt-3">
          <a 
            href="/marketplace" 
            className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Browse Marketplace
          </a>
        </div>
      </section>
    </div>
  );
}
