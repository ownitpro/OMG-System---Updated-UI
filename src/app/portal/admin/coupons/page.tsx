"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import CouponsTable from "./CouponsTable";

export default function AdminCouponsPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Coupons" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Coupons</h1>
          <p className="text-sm text-muted-foreground">
            Create discount codes for promos and partnerships. (Finally, a button that makes people happy.)
          </p>
        </div>

        <CouponsTable />
      </div>
    </PortalShell>
  );
}

