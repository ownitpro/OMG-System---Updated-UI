"use client";

import { PortalShell } from "@/components/PortalShell";
import Link from "next/link";
import { useEntitlements } from "@/hooks/useEntitlements";
import { getAdminNav } from "@/config/portalNav";
import AdminOverviewCards from "./AdminOverviewCards";
import AdminHealthCard from "./AdminHealthCard";

export default function AdminPortalHome() {
  const entitlements = useEntitlements();

  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;
  const activeCount = Object.values(entitlements).filter((s) => s === "active" || s === "trial").length;

  const nav = getAdminNav();

  return (
    <PortalShell
      role="admin"
      title="Admin Home"
      nav={nav}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-zinc-600">
            Quick view of what's happening across the portal.
          </p>
        </div>

        <AdminOverviewCards />

        <AdminHealthCard />

        {/* Summary */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-2xl font-semibold">Admin Overview</div>
          <div className="mt-1 text-sm text-zinc-600">
            Quick access to products, clients, and purchases.
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              ✅ Active entitlements (test): {activeCount}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              🔒 Locked entitlements (test): {lockedCount}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              ⚙ Dev Tools in top bar
            </span>
          </div>
        </div>

        {/* Admin Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">Orders</div>
          <div className="mt-1 text-sm text-zinc-600">
            View checkouts and payment status (mock now, Stripe later).
          </div>
          <div className="mt-4">
            <Link
              href="/portal/admin/orders"
              className="inline-flex rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Open Orders
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">Clients</div>
          <div className="mt-1 text-sm text-zinc-600">
            Search clients and manage access (Phase 2).
          </div>
          <div className="mt-4">
            <Link
              href="/portal/admin/users"
              className="inline-flex rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Open Clients
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">Products</div>
          <div className="mt-1 text-sm text-zinc-600">
            Manage product catalog + pricing (copy now, Stripe later).
          </div>
          <div className="mt-4">
            <Link
              href="/portal/admin/products"
              className="inline-flex rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
            >
              Open Products
            </Link>
          </div>
        </div>
      </div>

      {/* Testing shortcuts */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="text-lg font-semibold">Testing Shortcuts</div>
        <div className="mt-1 text-sm text-zinc-600">
          Use these to simulate "purchases" quickly.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/checkout/success?product=omg-crm"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Simulate CRM Purchase
          </Link>
          <Link
            href="/checkout/success?product=securevault-docs"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Simulate SVD Purchase
          </Link>
          <Link
            href="/checkout/cancel?product=omg-crm"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Simulate Cancel
          </Link>
        </div>
      </div>
      </div>
    </PortalShell>
  );
}
