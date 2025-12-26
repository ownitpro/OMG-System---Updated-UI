"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { getClientNavV2 } from "@/config/portalNav";
import { MOCK_ENTITLEMENTS } from "@/mock/entitlements";
import { CreditCardIcon } from "@heroicons/react/24/outline";

export default function BillingPage() {
  const nav = getClientNavV2();
  const entitlements = MOCK_ENTITLEMENTS;
  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  return (
    <PortalShellV2
      role="client"
      title="Billing"
      nav={nav}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
            <CreditCardIcon className="w-5 h-5 text-[#47BD79]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Billing</h1>
            <p className="text-sm text-white/60">
              Manage your plan and upgrades.
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="text-xl font-semibold text-white">Plan Management</div>
          <div className="mt-2 text-sm text-white/60">
            View available plans and manage your subscription.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products/plans"
              className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              View Plans
            </Link>

            <button
              disabled
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/40 cursor-not-allowed"
            >
              Manage in Stripe (Coming soon)
            </button>
          </div>

          <div className="mt-4 text-sm text-white/50">
            Plans are handled on the public Plans page. Stripe management coming soon.
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
