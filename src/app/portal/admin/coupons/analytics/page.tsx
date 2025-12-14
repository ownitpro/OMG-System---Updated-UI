"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import CouponsAnalyticsPanel from "./CouponsAnalyticsPanel";

export default function CouponsAnalyticsPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Coupons Analytics" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Coupons Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Funnel and performance metrics (Week 1 local analytics).
          </p>
        </div>

        <CouponsAnalyticsPanel />
      </div>
    </PortalShell>
  );
}

