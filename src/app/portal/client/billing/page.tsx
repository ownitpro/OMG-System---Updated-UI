import { PortalShell } from "@/components/PortalShell";
import Link from "next/link";
import { getClientNav } from "@/config/portalNav";
import { CLIENT_COMMAND_ITEMS } from "@/config/commandItems";
import { MOCK_ENTITLEMENTS } from "@/mock/entitlements";

export default function BillingPage() {
  const nav = getClientNav();
  const entitlements = MOCK_ENTITLEMENTS;
  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  return (
    <PortalShell
      role="client"
      title="Billing"
      nav={nav}
      commandItems={CLIENT_COMMAND_ITEMS}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
    >
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-2xl font-semibold">Billing</div>
        <div className="mt-2 text-sm text-zinc-600">
          Manage your plan and upgrades.
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/products/plans"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            View Plans
          </Link>

          <button
            disabled
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-400"
          >
            Manage in Stripe (Coming soon)
          </button>
        </div>

        <div className="mt-4 text-sm text-zinc-600">
          Week 1: Plans are handled on the public Plans page. Stripe management is
          next.
        </div>
      </div>
    </PortalShell>
  );
}
