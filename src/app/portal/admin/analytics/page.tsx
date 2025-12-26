"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import { AnalyticsDashboard } from "./AnalyticsDashboard";

export default function AnalyticsPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Client Analytics" nav={nav}>
      <AnalyticsDashboard />
    </PortalShellV2>
  );
}
