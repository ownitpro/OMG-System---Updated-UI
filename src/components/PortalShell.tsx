"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { CommandSearch } from "@/components/CommandSearch";
import type { CommandItem } from "@/components/CommandSearch";
import { DevToolsPill } from "@/components/DevToolsPill";

export type NavItem =
  | { label: string; href: string; comingSoon?: boolean; kind?: "internal" }
  | { label: string; externalUrl: string; comingSoon?: boolean; kind: "external" };

export type NavGroup = { title: string; items: NavItem[] };

function NavList({
  nav,
  roleHome,
  onNavigate,
}: {
  nav: NavGroup[];
  roleHome: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-6 overflow-auto px-2 pb-8">
      {nav.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {group.title}
          </div>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => {
              // Type guard to check if item is external
              const isExternal = "kind" in item && item.kind === "external";

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
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-zinc-800 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{ext.label}</span>
                    {ext.comingSoon ? (
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                        Coming soon
                      </span>
                    ) : null}
                  </button>
                );
              }

              // Internal navigation item
              const internal = item as Extract<NavItem, { href: string }>;
              return (
                <Link
                  key={internal.href + internal.label}
                  href={internal.href}
                  onClick={onNavigate}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-100"
                >
                  <span>{internal.label}</span>
                  {internal.comingSoon ? (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                      Coming soon
                    </span>
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

function HamburgerIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PortalShell({
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

  const roleHome = useMemo(
    () => (role === "admin" ? "/portal/admin" : "/portal/client"),
    [role]
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-72 md:flex-col md:gap-6 md:border-r md:border-zinc-200 md:bg-white md:px-4 md:py-4">
          <div className="flex items-center justify-between px-2">
            <Link href={roleHome}>
              <div className="text-lg font-semibold">OMG Systems</div>
            </Link>
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
              {role.toUpperCase()}
            </span>
          </div>

          <NavList nav={nav} roleHome={roleHome} />
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Mobile hamburger */}
                <button
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 hover:bg-zinc-50 md:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <HamburgerIcon />
                </button>

                <div className="flex flex-col">
                  <div className="text-sm text-zinc-500">Portal</div>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DevToolsPill />

                <button
                  className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
                  onClick={() => (document.dispatchEvent(new CustomEvent("open-command")))}
                >
                  Search
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">⌘K</span>
                </button>
                <button className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
                  Billing
                </button>
                <button className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50">
                  Account
                </button>
              </div>
            </div>
          </header>

          {/* Upgrade Strip */}
          {typeof lockedCount === "number" && lockedCount > 0 ? (
            <div className="sticky top-[57px] z-20 border-b border-zinc-200 bg-white">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
                <div className="text-sm text-zinc-700">
                  <span className="font-semibold">You have locked tools.</span>{" "}
                  Unlock them to get the full platform.
                </div>
                <a
                  href={upgradeHref || "/products/plans"}
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Upgrade
                </a>
              </div>
            </div>
          ) : null}

          {/* Mobile Drawer */}
          {mobileOpen ? (
            <div className="fixed inset-0 z-40 md:hidden">
              {/* Overlay */}
              <button
                className="absolute inset-0 bg-black/30"
                aria-label="Close menu overlay"
                onClick={() => setMobileOpen(false)}
              />

              {/* Drawer */}
              <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
                  <Link href={roleHome} onClick={() => setMobileOpen(false)}>
                    <div className="text-lg font-semibold">OMG Systems</div>
                  </Link>

                  <button
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 hover:bg-zinc-50"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="px-2 py-3">
                  <div className="mb-3 px-2">
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
                      {role.toUpperCase()}
                    </span>
                  </div>

                  <NavList
                    nav={nav}
                    roleHome={roleHome}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {commandItems ? <CommandSearch items={commandItems} /> : null}

          <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
