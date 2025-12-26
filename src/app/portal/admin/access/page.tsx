"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import AccessTable from "./AccessTable";
import { KeyIcon } from "@heroicons/react/24/outline";

export default function AdminAccessPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Access Control" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
            <KeyIcon className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Access Control</h1>
            <p className="text-sm text-white/60">
              Grant or revoke product access. (Because "I swear I paid" is a classic.)
            </p>
          </div>
        </div>

        <AccessTable />
      </div>
    </PortalShellV2>
  );
}
