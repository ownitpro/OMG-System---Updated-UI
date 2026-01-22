// Personal Portal Setup page

'use client';

import * as React from 'react';
import Link from 'next/link';

export default function PersonalPortalSetup() {
  const [title, setTitle] = React.useState('My Family Portal');
  const [seats, setSeats] = React.useState(3);
  const [bizA, setBizA] = React.useState('Maple Homes');
  const [bizB, setBizB] = React.useState('Acme Side LLC');
  const [creating, setCreating] = React.useState(false);

  async function create() {
    setCreating(true);
    const r = await fetch('/api/mock/portal/personal/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerUserId: 'me',
        title,
        seatsAllowed: seats,
        linkedBusinesses: [
          { id: 'b1', name: bizA },
          { id: 'b2', name: bizB },
        ],
      }),
    });
    const j = await r.json();
    setCreating(false);
    if (j.ok) {
      alert(
        `Portal created (ID: ${j.portal.id}). Use /portal/login → enter ID + PIN to sign in.`
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation */}
      <header className="border-b border-gray-200 bg-white backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Logo + SecureVault Docs */}
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>

          {/* Right: Navigation - Leave blank as requested */}
          <div className="flex items-center gap-3">
          </div>
        </div>
      </header>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 -z-10"></div>

      <div className="relative max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Personal Portal</h1>
          <p className="text-lg text-gray-600">
            Create your personal portal with PIN protection and linked businesses.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Portal title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Seats (max 3)"
              type="number"
              value={seats}
              onChange={e => setSeats(parseInt(e.target.value || '3', 10))}
            />
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Linked business A"
              value={bizA}
              onChange={e => setBizA(e.target.value)}
            />
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Linked business B"
              value={bizB}
              onChange={e => setBizB(e.target.value)}
            />
          </div>
          <button
            className="w-full rounded-xl px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            onClick={create}
            disabled={creating}
          >
            {creating ? 'Creating…' : 'Create Portal'}
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          Mock only; no AWS/Stripe. Powered by OMGsystems • 2025
        </p>
      </div>
    </div>
  );
}

