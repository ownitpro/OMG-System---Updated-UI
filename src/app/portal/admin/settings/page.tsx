"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import SettingsPanel from "./SettingsPanel";
import { CogIcon } from "@heroicons/react/24/outline";

export default function AdminSettingsPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Settings" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <CogIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Settings</h1>
            <p className="text-sm text-white/60">
              Admin preferences for the portal shell (Week 1 local-only).
            </p>
          </div>
        </div>

        <SettingsPanel />
      </div>
    </PortalShellV2>
  );
}
