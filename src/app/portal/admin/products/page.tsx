"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { getAdminNavV2 } from "@/config/portalNav";
import { CubeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function AdminProductsPage() {
  const nav = getAdminNavV2();

  return (
    <PortalShellV2 role="admin" title="Products" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.1)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
            <CubeIcon className="w-5 h-5 text-[#47BD79]" />
          </div>
          <div>
            <div className="text-xl font-semibold text-white">Products</div>
            <div className="text-sm text-white/60">
              Week 1: manage links + copy. Stripe pricing management comes next.
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50"
          >
            View Public Products Hub
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
          <Link
            href="/products/plans"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
          >
            View Plans Page
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PortalShellV2>
  );
}
