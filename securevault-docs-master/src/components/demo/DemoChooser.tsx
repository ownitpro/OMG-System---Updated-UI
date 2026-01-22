// src/components/demo/DemoChooser.tsx
// Neutral demo chooser (Business/Personal tracks)

'use client';

import React from 'react';
import Link from 'next/link';
import { flags } from '@/lib/flags';

type Props = {
  tracks?: ('business' | 'personal')[];
  requireForm?: boolean;
};

export function DemoChooser({ tracks = ['business', 'personal'], requireForm = false }: Props) {
  const [selectedTrack, setSelectedTrack] = React.useState<'business' | 'personal'>(tracks[0] || 'business');
  const [tab, setTab] = React.useState<'interactive' | 'live'>('interactive');

  if (!flags.demoEnabled) {
    return (
      <div className="text-center py-10">
        <p className="text-white/70">Demo is currently disabled.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold">Try SecureVault Docs</h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Explore SecureVault Docs with sample data. Choose between Business or Personal workflows.
        </p>
      </header>

      <div className="flex gap-3">
        {tracks.includes('business') && (
          <button
            onClick={() => setSelectedTrack('business')}
            className={`px-3 py-1 rounded-xl transition ${
              selectedTrack === 'business' ? 'bg-[#3b82f6] text-black' : 'bg-white/10 text-white/70'
            }`}
          >
            Business
          </button>
        )}
        {tracks.includes('personal') && (
          <button
            onClick={() => setSelectedTrack('personal')}
            className={`px-3 py-1 rounded-xl transition ${
              selectedTrack === 'personal' ? 'bg-[#3b82f6] text-black' : 'bg-white/10 text-white/70'
            }`}
          >
            Personal
          </button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setTab('interactive')}
            className={`px-3 py-1 rounded-xl transition ${
              tab === 'interactive' ? 'bg-white/10' : 'opacity-70'
            }`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => setTab('live')}
            className={`px-3 py-1 rounded-xl transition ${
              tab === 'live' ? 'bg-white/10' : 'opacity-70'
            }`}
          >
            Try the Actual Demo
          </button>
        </div>
      </div>

      {tab === 'interactive' ? (
        <div className="rounded-2xl border border-white/10 p-8 bg-white/5">
          <h2 className="text-xl font-semibold mb-4">Interactive Demo — {selectedTrack}</h2>
          <p className="text-white/70 mb-4">
            Click through a safe, guided version of the product. No login required.
          </p>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
            <div className="text-center text-white/70">
              <p className="text-sm">Interactive Demo for {selectedTrack}</p>
              <p className="text-xs mt-2 opacity-70">Guided tour coming soon</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Try the Actual Demo — {selectedTrack}</h2>
          <p className="text-white/70">
            This jumps into a live demo org. In dev, we bypass gating. In staging/prod, you can require a short form.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedTrack === 'business' ? (
              <form action="/api/auth/demo-login" method="POST" className="rounded-2xl border border-white/10 p-4 space-y-2 bg-white/5">
                <input type="hidden" name="orgId" value="demo-business-001" />
                <input type="hidden" name="redirect" value="/org/demo-business-001/overview" />
                <div className="text-sm font-medium">Acme Demo (Business)</div>
                <div className="text-xs text-white/70">Preloaded documents, OCR, client portals</div>
                <button
                  type="submit"
                  className="mt-2 rounded-xl px-4 py-2 bg-[#3b82f6] text-black w-full font-semibold hover:opacity-90 transition"
                >
                  Enter Demo
                </button>
              </form>
            ) : (
              <form action="/api/auth/demo-login" method="POST" className="rounded-2xl border border-white/10 p-4 space-y-2 bg-white/5">
                <input type="hidden" name="orgId" value="demo-personal-001" />
                <input type="hidden" name="redirect" value="/personal/overview" />
                <div className="text-sm font-medium">Jane Demo (Personal)</div>
                <div className="text-xs text-white/70">Personal vault with sample documents</div>
                <button
                  type="submit"
                  className="mt-2 rounded-xl px-4 py-2 bg-[#3b82f6] text-black w-full font-semibold hover:opacity-90 transition"
                >
                  Enter Demo
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

