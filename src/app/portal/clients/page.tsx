"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import ClientsTable from "./ClientsTable";

export default function ClientsPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Clients" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-sm text-zinc-600">
            A simple list of clients generated from orders (Week 1).
          </p>
        </div>

        <ClientsTable />
      </div>
    </PortalShell>
  );
}

