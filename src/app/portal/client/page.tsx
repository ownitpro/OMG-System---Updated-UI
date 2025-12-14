"use client";

import { PortalShell } from "@/components/PortalShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_CATALOG } from "@/config/productCatalog";
import { CLIENT_COMMAND_ITEMS } from "@/config/commandItems";
import { getClientNav } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { getCardStatus } from "@/utils/productStatus";
import { DevToolsResetEntitlements } from "@/components/DevToolsResetEntitlements";

export default function ClientPortalHome() {
  const nav = getClientNav();

  const entitlements = useEntitlements();

  const topProducts = PRODUCT_CATALOG.filter((p) => p.group === "top");

  const activeCount = Object.values(entitlements).filter(
    (s) => s === "active" || s === "trial"
  ).length;
  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  return (
    <PortalShell
      role="client"
      title="Client Home"
      nav={nav}
      commandItems={CLIENT_COMMAND_ITEMS}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
    >
      {/* Welcome */}
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="text-2xl font-semibold">Welcome back.</div>
        <div className="mt-1 text-sm text-zinc-600">
          Here's what's ready in your account.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
            ✅ Active: {activeCount}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
            🔒 Locked: {lockedCount}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
            ⏳ Coming soon: OMG Build
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="mb-3">
        <div className="text-xl font-semibold">Your Products</div>
        <div className="text-sm text-zinc-600">
          Launch what you have. Unlock what you want.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topProducts.map((p) => {
          const status = getCardStatus(p.key, entitlements, p.comingSoon);

          const primaryLabel =
            status === "active"
              ? "Launch"
              : status === "locked"
              ? "Unlock"
              : "Coming Soon";

          const href =
            status === "active"
              ? p.launchUrl
              : status === "locked"
              ? p.unlockUrl
              : undefined;

          return (
            <ProductCard
              key={p.key}
              name={p.name}
              description={p.description}
              status={status}
              primaryLabel={primaryLabel}
              href={href}
            />
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="text-lg font-semibold">Quick Actions</div>
        <div className="mt-1 text-sm text-zinc-600">
          Fast moves. No digging around.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={
              PRODUCT_CATALOG.find((p) => p.key === "securevault_docs")
                ?.launchUrl || "#"
            }
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Upload Document
          </a>

          <a
            href={
              PRODUCT_CATALOG.find((p) => p.key === "omg_leads")?.launchUrl ||
              "#"
            }
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Add Lead
          </a>

          <button
            disabled
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-400"
          >
            Start a Build (Coming soon)
          </button>

          <a
            href="/products/strategy-session"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
          >
            Book Strategy Session
          </a>
        </div>
      </div>

      <div className="mt-6">
        <DevToolsResetEntitlements />
      </div>
    </PortalShell>
  );
}
