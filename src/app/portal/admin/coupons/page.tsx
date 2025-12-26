"use client";

import { Suspense } from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import CouponsTable from "./CouponsTable";
import { TagIcon } from "@heroicons/react/24/outline";

export default function AdminCouponsPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Coupons" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
            <TagIcon className="w-5 h-5 text-[#47BD79]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Coupons</h1>
            <p className="text-sm text-white/60">
              Create discount codes for promos and partnerships. (Finally, a button that makes people happy.)
            </p>
          </div>
        </div>

        <Suspense fallback={
          <div className="rounded-xl border border-white/10 bg-white/5 p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-10 w-full bg-white/10 rounded-lg"></div>
              <div className="h-64 w-full bg-white/5 rounded-lg"></div>
            </div>
          </div>
        }>
          <CouponsTable />
        </Suspense>
      </div>
    </PortalShellV2>
  );
}
