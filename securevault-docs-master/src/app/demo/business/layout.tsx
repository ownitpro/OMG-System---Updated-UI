// src/app/demo/business/layout.tsx
// Business demo layout with topbar and navigation

import type { ReactNode } from "react";
import Link from "next/link";

export default function BusinessDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>
          <nav className="flex items-center gap-4 text-sm -ml-2">
            <Link href="/demo/business/overview" className="text-gray-600 hover:text-blue-600">Overview</Link>
            <Link href="/demo/business/documents" className="text-gray-600 hover:text-blue-600">Documents</Link>
            <Link href="/demo/business/portals" className="text-gray-600 hover:text-blue-600">Client Portals</Link>
            <Link href="/demo/business/requests" className="text-gray-600 hover:text-blue-600">Requests</Link>
            <Link href="/demo/business/shares" className="text-gray-600 hover:text-blue-600">Shares</Link>
            <Link href="/demo/business/analytics" className="text-gray-600 hover:text-blue-600">Analytics</Link>
            <Link href="/demo/business/billing" className="text-gray-600 hover:text-blue-600">Billing</Link>
            <Link href="/demo/business/templates" className="text-gray-600 hover:text-blue-600">Templates</Link>
            <Link href="/demo/business/settings" className="text-gray-600 hover:text-blue-600">Settings</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">{children}</main>
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        Powered by OMGsystems · 2025
      </footer>
    </div>
  );
}

