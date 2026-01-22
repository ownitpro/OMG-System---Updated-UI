// src/app/demo/business/shares/page.tsx
// Interactive shares page with PIN/expiry

'use client';

import * as React from 'react';
import { Link2, ShieldCheck } from 'lucide-react';

const KEY = 'svd_demo_shares_v1';

function load() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(sessionStorage.getItem(KEY) || '[]');
}

function save(v: any[]) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(v));
}

export default function SharesPage() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [showNew, setShowNew] = React.useState(false);
  const [form, setForm] = React.useState({ forClient: '', label: '', pin: '', expiryDays: 7 });
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setRows(load());
  }, []);

  function createShare() {
    const id = 'shr_' + Math.random().toString(36).slice(2);
    const url = (typeof window !== 'undefined' ? window.location.origin : '') + `/demo/share/${id}`; // mock, non-functional
    const rec = { id, url, ...form, createdAt: new Date().toISOString(), status: 'Active' };
    const next = [rec, ...rows];
    setRows(next);
    save(next);
    setShowNew(false);
    setForm({ forClient: '', label: '', pin: '', expiryDays: 7 });
    alert('Mock share link created. Copy the URL from the table.');
  }

  function revokeSelected() {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (ids.length === 0) return;
    const next = rows.map((r) => (ids.includes(r.id) ? { ...r, status: 'Revoked' } : r));
    setRows(next);
    save(next);
    setSelected({});
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-100">Shares</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNew((s) => !s)}
            className="px-4 py-2 rounded-2xl bg-blue-600 text-white inline-flex items-center gap-2"
          >
            <Link2 className="h-4 w-4" />
            Create share
          </button>
          <button
            onClick={revokeSelected}
            className="px-3 py-2 rounded-2xl bg-zinc-800 text-zinc-100 inline-flex items-center gap-2 hover:bg-zinc-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Revoke selected
          </button>
        </div>
      </div>
      {showNew && (
        <div className="rounded-2xl border p-4 grid md:grid-cols-2 gap-3 bg-muted/40">
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="For client (portal id or name)"
            value={form.forClient}
            onChange={(e) => setForm({ ...form, forClient: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Label (e.g., Mortgage, KYC)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="PIN (optional)"
            value={form.pin}
            onChange={(e) => setForm({ ...form, pin: e.target.value })}
          />
          <input
            type="number"
            min={1}
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Expiry days"
            value={form.expiryDays}
            onChange={(e) => setForm({ ...form, expiryDays: Number(e.target.value) })}
          />
          <div className="col-span-full flex gap-2">
            <button onClick={createShare} className="px-4 py-2 rounded-xl bg-blue-600 text-white">
              Create
            </button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-zinc-800 divide-y divide-zinc-800">
        <div className="grid grid-cols-6 gap-2 px-4 py-2 text-xs text-zinc-400">
          <div></div>
          <div>For</div>
          <div>Label</div>
          <div>URL</div>
          <div>Created</div>
          <div className="text-right">Status</div>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-6 gap-2 px-4 py-3 items-center">
            <div>
              <input
                type="checkbox"
                checked={!!selected[r.id]}
                onChange={(e) => setSelected({ ...selected, [r.id]: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="text-zinc-200">{r.forClient}</div>
            <div className="text-zinc-200">{r.label}</div>
            <div className="truncate text-xs">
              <a
                className="underline text-blue-400 hover:text-blue-300"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(r.url);
                    alert('Copied share URL');
                  }
                }}
              >
                {r.url}
              </a>
            </div>
            <div className="text-xs text-zinc-400">{new Date(r.createdAt).toLocaleString()}</div>
            <div className="text-right text-sm text-zinc-200">{r.status}</div>
          </div>
        ))}
        {rows.length === 0 && <div className="px-4 py-8 text-sm text-zinc-400">No shares yet. Click "Create share".</div>}
      </div>
    </div>
  );
}
