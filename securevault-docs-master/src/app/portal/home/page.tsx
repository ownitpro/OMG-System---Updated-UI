// Portal Home page

'use client';

import * as React from 'react';
import Link from 'next/link';

export default function PortalHome() {
  const [portalId, setPortalId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [uploads, setUploads] = React.useState<any[]>([]);
  const [name, setName] = React.useState('');
  const [size, setSize] = React.useState<number>(123456);
  const [label, setLabel] = React.useState('General');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const pid = localStorage.getItem('svd_portal_id');
      const tok = localStorage.getItem('svd_portal_token');
      if (pid) setPortalId(pid);
      if (tok) setToken(tok);
    }
  }, []);

  async function upload() {
    const r = await fetch('/api/mock/portal/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        portalId,
        name: name || 'sample.pdf',
        size,
        label,
      }),
    });
    const j = await r.json();
    if (j.ok) setUploads(j.uploads);
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

          {/* Right: Navigation */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 -z-10"></div>

      <div className="relative max-w-3xl mx-auto px-4 py-20 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Your Portal</h1>
          <p className="text-lg text-gray-600">
            Upload and manage your documents securely.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="grid md:grid-cols-4 gap-3">
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="File name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Size (bytes)"
              type="number"
              value={size}
              onChange={e => setSize(parseInt(e.target.value || '0', 10))}
            />
            <input
              className="rounded-xl p-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Label (optional)"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
            <button
              className="rounded-xl px-4 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={upload}
            >
              Mock Upload
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Uploads</h3>
          <ul className="space-y-3">
            {uploads.length === 0 ? (
              <li className="text-center text-gray-500 py-8">No uploads yet</li>
            ) : (
              uploads.map(u => (
                <li
                  key={u.id}
                  className="rounded-xl p-4 bg-gray-50 border border-gray-200 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {u.label || '—'} • {new Date(u.ts).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-700">
                    {Math.round((u.size || 0) / 1024)} KB
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="mt-8 text-center text-xs text-gray-600">
          Powered by OMGsystems • 2025
        </div>
      </div>
    </div>
  );
}

