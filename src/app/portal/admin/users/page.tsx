"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function AdminUsersPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Clients" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
            <UsersIcon className="w-5 h-5 text-[#A855F7]" />
          </div>
          <div>
            <div className="text-xl font-semibold text-white">Clients</div>
            <div className="text-sm text-white/60">
              Week 1: placeholder. Next we'll add search + client detail drawer.
            </div>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
