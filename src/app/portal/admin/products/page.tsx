"use client";

import { PortalShell } from "@/components/PortalShell";
import Link from "next/link";
import { getAdminNav } from "@/config/portalNav";

export default function AdminProductsPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Products" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-semibold">Products</div>
        <div className="mt-2 text-sm text-zinc-600">
          Week 1: manage links + copy. Stripe pricing management comes next.
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/products"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            View Public Products Hub
          </Link>
          <Link
            href="/products/plans"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            View Plans Page
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}

