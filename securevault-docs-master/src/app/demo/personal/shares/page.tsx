// src/app/demo/personal/shares/page.tsx
// Personal shares page (create/revoke, mocked)

"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { getShares, addShare, removeShare } from "@/lib/demo/personal/mockClient";

type Share = {
  id: string;
  name: string;
  url: string;
  pin?: string;
  expiry?: string;
  created: string;
};

export default function SharesPage() {
  const [items, setItems] = useState<Share[]>([]);
  const [busy, setBusy] = useState(false);
  const mountedRef = useRef(true);

  const load = useCallback(() => {
    if (mountedRef.current) {
      setItems(getShares());
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);


  const revoke = (id: string) => {
    if (!mountedRef.current) return;
    try {
      removeShare(id);
      load();
    } catch (err) {
      console.error("Failed to revoke share:", err);
    }
  };

  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    client: "",
    pin: "",
    expiryDays: 7,
  });

  const handleCreateShare = () => {
    if (!formData.name) {
      alert("Please enter a name for the share link");
      return;
    }
    if (!mountedRef.current) return;
    setBusy(true);
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + formData.expiryDays);
      const newShare = {
        id: `s${Date.now()}`,
        name: formData.name,
        url: `/viewer/demo/${Date.now()}`,
        pin: formData.pin || undefined,
        expiry: expiryDate.toISOString(),
        created: new Date().toISOString(),
      };
      addShare(newShare);
      load();
      setShowForm(false);
      setFormData({ name: "", client: "", pin: "", expiryDays: 7 });
      alert("Share link created successfully!");
    } catch (err) {
      console.error("Failed to create share:", err);
    } finally {
      if (mountedRef.current) {
        setBusy(false);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Share Links</h1>
          <p className="text-base text-white/60 mt-1">Manage secure share links with PIN and expiry</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-6 py-3 text-base font-semibold transition"
          >
            New share link
          </button>
        </div>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Create New Share Link</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                placeholder="Share link name"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Client (optional)</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">PIN (optional)</label>
              <input
                type="text"
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                placeholder="4-digit PIN"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Expiry (days)</label>
              <input
                type="number"
                min="1"
                value={formData.expiryDays}
                onChange={(e) => setFormData({ ...formData, expiryDays: parseInt(e.target.value) || 7 })}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreateShare}
              disabled={busy}
              className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black px-6 py-3 text-base font-semibold transition"
            >
              {busy ? "Creating..." : "Create Share Link"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setFormData({ name: "", client: "", pin: "", expiryDays: 7 });
              }}
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-3 text-base font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <table className="w-full text-base">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="text-left p-4 text-white/70 font-semibold">Name</th>
              <th className="text-left p-4 text-white/70 font-semibold">URL</th>
              <th className="text-left p-4 text-white/70 font-semibold">PIN</th>
              <th className="text-left p-4 text-white/70 font-semibold">Expiry</th>
              <th className="text-left p-4 text-white/70 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/60 text-base">
                  No share links yet. Create one to get started.
                </td>
              </tr>
            ) : (
              items.map((s) => (
                <tr key={s.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="p-4 text-white font-medium">{s.name}</td>
                  <td className="p-4">
                    <a href={s.url} className="text-[#3b82f6] hover:underline font-medium">
                      Open
                    </a>
                  </td>
                  <td className="p-4 text-white/70">{s.pin || "—"}</td>
                  <td className="p-4 text-white/60">
                    {s.expiry ? new Date(s.expiry).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to revoke this share link?")) {
                          revoke(s.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 hover:underline text-base font-medium"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

