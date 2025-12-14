"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";

export default function AdminUsersPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Clients" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-semibold">Clients</div>
        <div className="mt-2 text-sm text-zinc-600">
          Week 1: placeholder. Next we'll add search + client detail drawer.
        </div>
      </div>
    </PortalShell>
  );
}
