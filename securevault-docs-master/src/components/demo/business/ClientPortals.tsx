// src/components/demo/business/ClientPortals.tsx
// Client Portals section with create portal functionality

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export function ClientPortals() {
  const [portals, setPortals] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ clientName: "", clientEmail: "" });
  const orgId = "demo-org"; // Fixed for demo

  async function refresh() {
    const res = await fetch(`/api/mock/portal/org/${orgId}`);
    const data = await res.json();
    setPortals(data.portals || []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function createPortal() {
    if (!form.clientName || !form.clientEmail) {
      alert("Please enter both client name and email");
      return;
    }

    const res = await fetch(`/api/mock/portal/business/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orgId, clientName: form.clientName, clientEmail: form.clientEmail, authMode: 'pin' }),
    });
    const data = await res.json();
    
    if (data.ok) {
      const portal = data.portal;
      
      // Add portal to list immediately
      setPortals(prev => [portal, ...prev]);
      
      setOpen(false);
      setForm({ clientName: '', clientEmail: '' });
      
      // Refresh to ensure sync
      await refresh();
      
      alert(`Portal created!\n\nClient: ${portal.clientName}\nEmail: ${portal.clientEmail}\nPIN: ${portal.pin}\n\nClick "Open Client Portal" to view it!`);
    } else {
      alert("Failed to create portal. Please try again.");
    }
  }

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">Client Portals</h3>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-4 py-2 text-sm font-semibold transition"
        >
          Create Portal
        </button>
      </div>

      {open && (
        <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">Create New Portal</h4>
            <button
              onClick={() => {
                setOpen(false);
                setForm({ clientName: '', clientEmail: '' });
              }}
              className="text-zinc-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              className="rounded-xl p-2 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              placeholder="Client name"
              value={form.clientName}
              onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
            />
            <input
              className="rounded-xl p-2 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              placeholder="Client email"
              type="email"
              value={form.clientEmail}
              onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))}
            />
            <button
              className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-4 py-2 text-sm font-semibold transition"
              onClick={createPortal}
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {portals.length === 0 && (
          <div className="p-4 text-sm text-zinc-400 text-center rounded-xl bg-zinc-950/50 border border-zinc-800">
            No portals yet. Create one to get started.
          </div>
        )}
        {portals.map((p: any) => (
          <div key={p.id} className="rounded-xl p-3 bg-zinc-950/60 border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition">
            <div>
              <div className="text-sm font-medium text-white">{p.title || p.clientName}</div>
              <div className="text-xs text-zinc-400">
                {p.clientName} • {p.clientEmail || 'no email'} •{' '}
                {new Date(p.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/portal/login?email=${encodeURIComponent(p.clientEmail || '')}`}
                target="_blank"
                className="text-xs text-[#3b82f6] hover:underline font-medium px-3 py-1.5 rounded-lg bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 transition"
              >
                Open Client Portal
              </Link>
              <button
                className="text-xs text-zinc-400 hover:text-zinc-300 underline px-2 py-1"
                onClick={() => {
                  const loginUrl = `${window.location.origin}/portal/login?email=${encodeURIComponent(p.clientEmail || '')}`;
                  navigator.clipboard.writeText(loginUrl);
                  alert('Portal login link copied to clipboard!');
                }}
              >
                Copy Link
              </button>
              {p.pin && (
                <button
                  className="text-xs text-zinc-400 hover:text-zinc-300 underline px-2 py-1"
                  onClick={() => {
                    navigator.clipboard.writeText(p.pin);
                    alert(`PIN copied: ${p.pin}`);
                  }}
                >
                  Copy PIN
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

