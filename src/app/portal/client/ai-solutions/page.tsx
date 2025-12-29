"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { CLIENT_COMMAND_ITEMS } from "@/config/commandItems";
import { useEntitlements } from "@/hooks/useEntitlements";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function AISolutionsPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();

  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  return (
    <PortalShellV2
      role="client"
      title="AI Solutions"
      nav={nav}
      commandItems={CLIENT_COMMAND_ITEMS}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
      entitlements={entitlements}
    >
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Solutions</h1>
              <p className="text-white/60">Custom AI-powered solutions for your business</p>
            </div>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
