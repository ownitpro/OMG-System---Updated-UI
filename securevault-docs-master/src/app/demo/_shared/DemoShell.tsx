'use client';

import * as React from 'react';
import Link from 'next/link';

type ShellProps = { title: string; children: React.ReactNode; kind: 'business'|'personal' };

export default function DemoShell({ title, children, kind }: ShellProps){
  return (
    <div className="min-h-screen bg-[rgb(8,10,12)] text-white">
      <header className="border-b border-white/10 sticky top-0 bg-[rgb(8,10,12)]/70 backdrop-blur z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2 font-semibold">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/pricing" className="hover:text-blue-300">Pricing</Link>
            <Link href="/install" className="hover:text-blue-300">Install</Link>
            <Link href="/faq" className="hover:text-blue-300">FAQ</Link>
            <Link href="/login" className="px-3 py-1 rounded-xl border border-blue-500/50 text-blue-300 hover:bg-blue-500/10">Login</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="text-xs uppercase tracking-wide text-white/60">Demo: {kind}</div>
        </div>
        {children}
      </main>
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-white/60">Powered by OMGsystems • 2025</div>
      </footer>
    </div>
  );
}

