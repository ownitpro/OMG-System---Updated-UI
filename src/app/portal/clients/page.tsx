"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import ClientsTable from "./ClientsTable";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function ClientsPage() {
  const nav = getAdminNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  return (
    <PortalShellV2 role="admin" title="Clients" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-[#A855F7]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Clients</h1>
            <p className="text-sm text-white/60">
              Manage your client base, track activity, and monitor engagement.
            </p>
          </div>
        </div>

        <ClientsTable />
      </div>
    </PortalShellV2>
  );
}

