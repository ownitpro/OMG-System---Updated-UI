"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Users, Inbox, Link as LinkIcon, BarChart3, CreditCard, Settings, Menu, X } from "lucide-react";

const nav = (orgId: string) => [
  { href: `/org/${orgId}/overview`, label: "Overview", icon: FolderOpen },
  { href: `/org/${orgId}/docs`, label: "Documents", icon: FolderOpen },
  { href: `/org/${orgId}/portals`, label: "Client Portals", icon: Users },
  { href: `/org/${orgId}/requests`, label: "Requests", icon: Inbox },
  { href: `/org/${orgId}/shares`, label: "Shares", icon: LinkIcon },
  { href: `/org/${orgId}/analytics`, label: "Analytics", icon: BarChart3 },
  { href: `/org/${orgId}/billing`, label: "Billing", icon: CreditCard },
  { href: `/org/${orgId}/admin`, label: "Settings", icon: Settings },
];

export function OrgSidebar({ orgId }: { orgId: string }) {
  const pathname = usePathname();
  const items = nav(orgId);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close drawer when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const NavContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="p-3 space-y-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname?.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-3 py-3 min-h-[48px] rounded-lg text-sm transition ${
              active
                ? "bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Toggle Button - shown on small screens */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-4 left-4 z-30 p-3 min-w-[56px] min-h-[56px] bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-white/10 bg-black/20 flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-slate-900 border-r border-white/10 shadow-2xl`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="text-lg font-semibold text-white">Navigation</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Content */}
        <NavContent onItemClick={() => setIsMobileOpen(false)} />
      </div>
    </>
  );
}

