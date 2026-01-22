// src/app/demo/personal/layout.tsx
// Personal demo layout with topbar and navigation

import React from "react";
import Link from "next/link";

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center py-2">
            <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
          </Link>
          <nav className="hidden md:flex items-center gap-4 -ml-4">
            <Link href="/demo/personal" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Overview
            </Link>
            <Link href="/demo/personal/vault" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Vault
            </Link>
            <Link href="/demo/personal/upload" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Upload
            </Link>
            <Link href="/demo/personal/shares" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Shares
            </Link>
            <Link href="/demo/personal/analytics" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Analytics
            </Link>
            <Link href="/demo/personal/billing" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Billing
            </Link>
            <Link href="/demo/personal/templates" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Templates
            </Link>
            <Link href="/demo/personal/settings" className="text-base font-medium text-gray-600 hover:text-blue-600 transition px-2">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>

      <footer className="border-t border-gray-200 mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs text-gray-500 flex items-center justify-between">
          <span>Demo mode · Personal</span>
          <span>Powered by OMGsystems · 2025</span>
        </div>
      </footer>
    </div>
  );
}

