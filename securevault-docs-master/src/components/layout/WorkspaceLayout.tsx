// src/components/layout/WorkspaceLayout.tsx
// Workspace layout with sidebar navigation and header

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type WorkspaceLayoutProps = {
  orgId: string;
  orgName: string;
  children: ReactNode;
  vertical?: string;
};

const SIDEBAR_NAV = [
  { href: (id: string) => `/org/${id}/overview`, label: "Overview", icon: "📊" },
  { href: (id: string) => `/org/${id}/docs`, label: "Documents", icon: "📄" },
  { href: (id: string) => `/org/${id}/portals`, label: "Client Portals", icon: "👥" },
  { href: (id: string) => `/org/${id}/requests`, label: "Requests", icon: "📋" },
  { href: (id: string) => `/org/${id}/shares`, label: "Shares", icon: "🔗" },
  { href: (id: string) => `/org/${id}/analytics`, label: "Analytics", icon: "📈" },
  { href: (id: string) => `/org/${id}/billing`, label: "Billing", icon: "💳" },
  { href: (id: string) => `/org/${id}/admin`, label: "Settings", icon: "⚙️" },
];

export function WorkspaceLayout({ orgId, orgName, children, vertical = "business" }: WorkspaceLayoutProps) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-200 bg-white flex-shrink-0 hidden lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {/* Logo/Org Name */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center mb-4 py-2">
              <img src="/logo.png" alt="SecureVault Docs" className="h-20" />
            </Link>
            <div className="text-sm font-semibold text-gray-900 truncate">{orgName}</div>
            <div className="text-xs text-gray-500 mt-1">{vertical === "personal" ? "Personal Vault" : "Business Workspace"}</div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {SIDEBAR_NAV.map((item) => {
              const href = item.href(orgId);
              const isActive = pathname === href || pathname?.startsWith(href + "/");
              return (
                <Link
                  key={item.label}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Links */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <Link href="/demo" className="text-xs text-gray-500 hover:text-blue-600 transition">
              ← Back to Demo
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Workspace Header */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
          <div className="px-4 md:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="text-sm font-semibold text-gray-900 truncate">{orgName}</div>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
              <Link href="/pricing" className="hidden sm:block text-sm text-gray-600 hover:text-blue-600 transition px-2 py-1">
                Pricing
              </Link>
              <Link href="/demo" className="hidden sm:block text-sm text-gray-600 hover:text-blue-600 transition px-2 py-1">
                Demo
              </Link>
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition px-2 py-1 min-h-[44px] flex items-center">
                Home
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 shadow-2xl`}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" className="flex items-center py-1" onClick={() => setIsMobileSidebarOpen(false)}>
            <img src="/logo.png" alt="SecureVault Docs" className="h-12" />
          </Link>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Org Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-900 truncate">{orgName}</div>
          <div className="text-xs text-gray-500 mt-1">{vertical === "personal" ? "Personal Vault" : "Business Workspace"}</div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
          {SIDEBAR_NAV.map((item) => {
            const href = item.href(orgId);
            const isActive = pathname === href || pathname?.startsWith(href + "/");
            return (
              <Link
                key={item.label}
                href={href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 min-h-[48px] rounded-lg text-sm transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer Links */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <Link
            href="/demo"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="text-sm text-gray-500 hover:text-blue-600 transition"
          >
            ← Back to Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

