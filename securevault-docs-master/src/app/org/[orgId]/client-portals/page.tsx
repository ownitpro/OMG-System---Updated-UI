// app/org/[orgId]/client-portals/page.tsx (Org-side list + Create Portal modal)

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  params: Promise<{ orgId: string }>;
};

export default function OrgClientPortalsPage({ params }: Props) {
  const [orgId, setOrgId] = useState<string>("");
  const [portals, setPortals] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ clientName: "", clientEmail: "" });

  useEffect(() => {
    params.then(p => setOrgId(p.orgId));
  }, [params]);

  async function refresh() {
    if (!orgId) return;
    const res = await fetch(`/api/mock/portal/org/${orgId}`);
    const data = await res.json();
    setPortals(data.portals || []);
  }

  useEffect(() => {
    if (orgId) refresh();
  }, [orgId]);

  async function createPortal() {
    const res = await fetch(`/api/mock/portal/business/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orgId, clientName: form.clientName, clientEmail: form.clientEmail, authMode: 'pin' }),
    });
    const data = await res.json();
    setOpen(false);
    setForm({ clientName: '', clientEmail: '' });
    await refresh();
    if (data.ok) {
      alert(`Portal created (ID: ${data.portal.id}). Use /portal/login → enter ID + PIN to sign in.`);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Client Portals</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-primary text-primary-foreground px-4 py-2"
        >
          Create Portal
        </button>
      </div>

      <ul className="space-y-2">
        {portals.length === 0 && (
          <li className="p-4 text-sm text-muted-foreground">No portals yet.</li>
        )}
        {portals.map((p: any) => (
          <li key={p.id} className="rounded-2xl p-3 bg-muted/60 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{p.title}</div>
              <div className="text-xs text-muted-foreground">
                {p.clientName} • {p.clientEmail || 'no email'} •{' '}
                {new Date(p.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                className="text-xs underline"
                href={`/portal/login?portalId=${p.id}`}
              >
                Copy Portal ID / Open
              </a>
              <button
                className="text-xs underline opacity-70"
                onClick={() => navigator.clipboard.writeText(p.id)}
              >
                Copy ID
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center text-xs opacity-70">Powered by OMGsystems • 2025</div>

      {open && (
        <div className="rounded-2xl p-4 border bg-background">
          <div className="grid md:grid-cols-3 gap-2">
            <input
              className="rounded-xl p-2 bg-muted"
              placeholder="Client name"
              value={form.clientName}
              onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
            />
            <input
              className="rounded-xl p-2 bg-muted"
              placeholder="Client email"
              value={form.clientEmail}
              onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))}
            />
            <button
              className="rounded-xl bg-primary text-primary-foreground"
              onClick={createPortal}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

