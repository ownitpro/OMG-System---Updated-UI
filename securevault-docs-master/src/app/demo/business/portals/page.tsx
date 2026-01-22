// src/app/demo/business/portals/page.tsx
// Interactive client portals page with sessionStorage

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Mail } from 'lucide-react';

// In-memory mock (persists per tab). In real app, swap to API.
const KEY = 'svd_demo_client_portals_v1';

function load() {
  if (typeof window === 'undefined') return [];
  return JSON.parse(sessionStorage.getItem(KEY) || '[]');
}

function save(v: any[]) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(KEY, JSON.stringify(v));
}

export default function ClientPortalsPage() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [showNew, setShowNew] = React.useState(false);
  const [form, setForm] = React.useState({ company: '', contact: '', email: '', notes: '' });
  const router = useRouter();

  React.useEffect(() => {
    setRows(load());
  }, []);

  function addPortal() {
    const id = 'cp_' + Math.random().toString(36).slice(2);
    const now = new Date().toISOString();
    const rec = { id, createdAt: now, ...form, invites: [], status: 'Active' };
    const next = [rec, ...rows];
    setRows(next);
    save(next);
    setShowNew(false);
    setForm({ company: '', contact: '', email: '', notes: '' });
  }

  function invite(id: string) {
    const name = prompt('Invite name');
    const email = prompt('Invite email');
    if (!email) return;
    const next = rows.map((r) =>
      r.id === id
        ? {
            ...r,
            invites: [...(r.invites || []), { id: 'inv_' + Date.now(), name, email, ts: new Date().toISOString(), status: 'Sent' }],
          }
        : r
    );
    setRows(next);
    save(next);
    alert('Mock invite sent. (No email was actually sent)');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-100">Client Portals</h1>
        <button
          onClick={() => setShowNew((s) => !s)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create client portal
        </button>
      </div>
      {showNew && (
        <div className="rounded-2xl border p-4 grid md:grid-cols-2 gap-3 bg-muted/40">
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Company / Client name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Primary contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Contact email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="rounded-xl px-3 py-2 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <div className="col-span-full flex gap-2">
            <button onClick={addPortal} className="px-4 py-2 rounded-xl bg-blue-600 text-white">
              Save
            </button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-zinc-800 divide-y divide-zinc-800">
        <div className="grid grid-cols-5 gap-2 px-4 py-2 text-xs text-zinc-400">
          <div>Client</div>
          <div>Contact</div>
          <div>Email</div>
          <div>Invites</div>
          <div className="text-right">Actions</div>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-5 gap-2 px-4 py-3 items-center">
            <div className="font-medium text-zinc-100">{r.company}</div>
            <div className="text-zinc-200">{r.contact}</div>
            <div className="truncate text-zinc-200">{r.email}</div>
            <div className="text-sm text-zinc-400">{(r.invites || []).length}</div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => invite(r.id)}
                className="px-3 py-1 rounded-xl bg-zinc-800 text-zinc-100 inline-flex items-center gap-1 hover:bg-zinc-700"
              >
                <Mail className="h-4 w-4" />
                Invite
              </button>
              <button
                onClick={() => router.push(`/demo/business/requests?for=${r.id}`)}
                className="px-3 py-1 rounded-xl bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
              >
                Request files
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="px-4 py-8 text-sm text-zinc-400">No client portals yet. Click "Create client portal".</div>
        )}
      </div>
    </div>
  );
}
