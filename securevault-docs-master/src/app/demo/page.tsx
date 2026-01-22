// src/app/demo/page.tsx
// Demo hub page with Interactive + Launch demo

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InteractiveTourScreenshot } from '@/components/demo/InteractiveTourScreenshot';

function PrimaryButton({ onClick, children, disabled }: { onClick?: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-2xl font-medium shadow bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {children}
    </button>
  );
}

function GhostButton({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-2xl font-medium border border-gray-300 text-gray-900 hover:bg-gray-50 transition"
    >
      {children}
    </button>
  );
}

export default function DemoHub() {
  const r = useRouter();
  const [busy, setBusy] = React.useState<string | null>(null);

  function launch(kind: 'business' | 'personal') {
    setBusy(kind);
    // Direct navigation - no API calls needed
    if (kind === 'business') {
      r.push('/demo/business/overview');
    } else {
      r.push('/demo/personal');
    }
    // Reset busy state after a short delay
    setTimeout(() => setBusy(null), 500);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Marketing Header */}
      <header className="border-b border-gray-200 bg-white backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-medium rounded-full transition text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-10 max-w-7xl">
        {/* Title */}
        <section className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Try a Live Demo</h1>
          <p className="text-gray-600">Explore SecureVault Docs in two ways: a guided interactive tour, or a fully clickable demo org.</p>
        </section>

        {/* Interactive Tour */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Interactive Tour</h2>
            <p className="text-sm text-gray-600">
              Click through common tasks—upload a file, create a share link with PIN/expiry, request documents, and preview OCR—without signing in.
            </p>
            <div className="flex gap-3">
              <PrimaryButton onClick={() => r.push('/demo/interactive')}>Start Interactive Demo</PrimaryButton>
              <GhostButton onClick={() => r.push('/')}>Back to Home</GhostButton>
            </div>
          </div>
          <InteractiveTourScreenshot />
        </section>

        {/* Launch actual demo orgs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Launch a Live Demo</h2>
          <p className="text-sm text-gray-600">Jump straight into a seeded demo organization with mock data.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-900">Business Demo</h3>
              <p className="text-sm text-gray-600">See the full workspace with Quick Actions, KPIs, requests, shares, and more.</p>
              <div className="mt-3">
                <PrimaryButton onClick={() => launch('business')} disabled={busy === 'business'}>
                  {busy === 'business' ? 'Launching…' : 'Launch Business Demo'}
                </PrimaryButton>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-900">Personal Demo</h3>
              <p className="text-sm text-gray-600">Lightweight private vault with uploads, shares, and OCR preview.</p>
              <div className="mt-3">
                <PrimaryButton onClick={() => r.push('/demo/personal')}>
                  Launch Personal Demo
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
