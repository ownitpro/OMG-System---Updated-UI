"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import AccessTable from "./AccessTable";

export default function AdminAccessPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Access" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Access</h1>
          <p className="text-sm text-muted-foreground">
            Grant or revoke product access. (Because "I swear I paid" is a classic.)
          </p>
        </div>

        <AccessTable />
      </div>
    </PortalShell>
  );
}

