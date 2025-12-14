"use client";

import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import SettingsPanel from "./SettingsPanel";

export default function AdminSettingsPage() {
  const nav = getAdminNav();

  return (
    <PortalShell role="admin" title="Settings" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-zinc-600">
            Admin preferences for the portal shell (Week 1 local-only).
          </p>
        </div>

        <SettingsPanel />
      </div>
    </PortalShell>
  );
}

