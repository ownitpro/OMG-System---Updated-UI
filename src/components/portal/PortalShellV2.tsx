"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { CommandSearch } from "@/components/CommandSearch";
import type { CommandItem } from "@/components/CommandSearch";
import { DevToolsPill } from "@/components/DevToolsPill";
import { usePageTracking } from "@/hooks/usePageTracking";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export type NavItem =
  | { label: string; href: string; icon?: React.ElementType; comingSoon?: boolean; kind?: "internal" }
  | { label: string; externalUrl: string; icon?: React.ElementType; comingSoon?: boolean; kind: "external" };

export type NavGroup = { title: string; items: NavItem[] };

function NavList({
  nav,
  roleHome,
  onNavigate,
  currentPath,
}: {
  nav: NavGroup[];
  roleHome: string;
  onNavigate?: () => void;
  currentPath: string;
}) {
  return (
    <nav className="flex flex-col gap-6 overflow-auto px-3 pb-8">
      {nav.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/40 px-3">
            {group.title}
          </div>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => {
              const isExternal = "kind" in item && item.kind === "external";
              const Icon = item.icon;

              if (isExternal) {
                const ext = item as Extract<NavItem, { kind: "external" }>;
                const disabled = ext.comingSoon === true;

                return (
                  <button
                    key={ext.label}
                    disabled={disabled}
                    onClick={() => {
                      if (!disabled) {
                        window.location.href = ext.externalUrl;
                      }
                      onNavigate?.();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 group"
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5 text-white/50 group-hover:text-[#47BD79] transition-colors" />}
                      <span>{ext.label}</span>
                    </div>
                    {ext.comingSoon && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
                        Soon
                      </span>
                    )}
                  </button>
                );
              }

              const internal = item as Extract<NavItem, { href: string }>;
              const isActive = currentPath === internal.href || currentPath.startsWith(internal.href + "/");

              return (
                <Link
                  key={internal.href + internal.label}
                  href={internal.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-300 group ${
                    isActive
                      ? "bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30 shadow-[0_0_15px_rgba(71,189,121,0.2)]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive ? "text-[#47BD79]" : "text-white/50 group-hover:text-[#47BD79]"
                        }`}
                      />
                    )}
                    <span>{internal.label}</span>
                  </div>
                  {internal.comingSoon ? (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
                      Soon
                    </span>
                  ) : isActive ? (
                    <ChevronRightIcon className="w-4 h-4 text-[#47BD79]" />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function PortalShellV2({
  role,
  title,
  nav,
  children,
  commandItems,
  lockedCount,
  upgradeHref,
}: {
  role: "client" | "admin";
  title: string;
  nav: NavGroup[];
  children: React.ReactNode;
  commandItems?: CommandItem[];
  lockedCount?: number;
  upgradeHref?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Track page views for client portal analytics
  usePageTracking();

  const roleHome = useMemo(
    () => (role === "admin" ? "/portal/admin" : "/portal/client"),
    [role]
  );

  const roleColor = role === "admin" ? "#A855F7" : "#47BD79";
  const roleLabel = role === "admin" ? "Admin" : "Client";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-72 md:flex-col md:gap-6 md:border-r md:border-white/10 md:bg-black/50 md:backdrop-blur-xl md:px-4 md:py-6 md:fixed md:h-screen md:left-0 md:top-0 md:z-40">
          {/* Logo & Role Badge */}
          <div className="flex items-center justify-between px-3">
            <Link href={roleHome} className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center shadow-lg shadow-[#47BD79]/30 group-hover:shadow-[#47BD79]/50 transition-shadow">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">OMG Systems</div>
                <div className="text-xs text-white/50">Portal</div>
              </div>
            </Link>
          </div>

          {/* Role Badge */}
          <div className="px-3">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border"
              style={{
                backgroundColor: `${roleColor}20`,
                borderColor: `${roleColor}40`,
                color: roleColor,
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: roleColor }}
              />
              {roleLabel} Portal
            </div>
          </div>

          {/* Navigation */}
          <NavList nav={nav} roleHome={roleHome} currentPath={pathname} />

          {/* Upgrade CTA in sidebar */}
          {typeof lockedCount === "number" && lockedCount > 0 && (
            <div className="mt-auto px-3 pb-4">
              <div className="rounded-2xl border border-[#47BD79]/30 bg-[#47BD79]/10 p-4">
                <div className="text-sm font-semibold text-white mb-1">
                  Unlock Full Access
                </div>
                <div className="text-xs text-white/60 mb-3">
                  {lockedCount} tools waiting to be unlocked
                </div>
                <Link
                  href={upgradeHref || "/products/plans"}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72">
          {/* Top bar */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                {/* Mobile hamburger */}
                <button
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 p-2 hover:bg-white/10 md:hidden transition-colors"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Bars3Icon className="w-5 h-5 text-white" />
                </button>

                {/* Page Title */}
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{roleLabel} Portal</div>
                  <div className="text-xl font-bold text-white">{title}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DevToolsPill />

                {/* Search Button */}
                <button
                  className="hidden sm:flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  onClick={() => document.dispatchEvent(new CustomEvent("open-command"))}
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span>Search</span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/50">⌘K</span>
                </button>

                {/* Notifications */}
                <button className="rounded-xl border border-white/20 bg-white/5 p-2 hover:bg-white/10 transition-colors relative">
                  <BellIcon className="w-5 h-5 text-white/70" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[#47BD79] rounded-full" />
                </button>

                {/* Account */}
                <button className="rounded-xl border border-white/20 bg-white/5 p-2 hover:bg-white/10 transition-colors">
                  <UserCircleIcon className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Drawer */}
          {mobileOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Overlay */}
              <button
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-label="Close menu overlay"
                onClick={() => setMobileOpen(false)}
              />

              {/* Drawer */}
              <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-black/95 backdrop-blur-xl border-r border-white/10 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                  <Link href={roleHome} onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#47BD79] to-[#3da86a] flex items-center justify-center">
                      <SparklesIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-lg font-bold text-white">OMG Systems</div>
                  </Link>

                  <button
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 p-2 hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="px-2 py-4">
                  <div className="mb-4 px-3">
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border"
                      style={{
                        backgroundColor: `${roleColor}20`,
                        borderColor: `${roleColor}40`,
                        color: roleColor,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: roleColor }}
                      />
                      {roleLabel} Portal
                    </div>
                  </div>

                  <NavList
                    nav={nav}
                    roleHome={roleHome}
                    currentPath={pathname}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {commandItems && <CommandSearch items={commandItems} />}

          {/* Page Content */}
          <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
