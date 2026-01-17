"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { ProductCardV2 } from "@/components/portal/PortalCard";
import { PRODUCT_CATALOG } from "@/config/productCatalog";
import { CLIENT_COMMAND_ITEMS } from "@/config/commandItems";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { getCardStatus } from "@/utils/productStatus";
import { DevToolsResetEntitlements } from "@/components/DevToolsResetEntitlements";
import AssignedCouponBanner from "@/components/client/AssignedCouponBanner";
import Link from "next/link";
import {
  SparklesIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ClockIcon,
  DocumentArrowUpIcon,
  UserPlusIcon,
  CubeIcon,
  CalendarIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BoltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

// Map product keys to icons
const productIcons: Record<string, React.ElementType> = {
  omg_crm: UserGroupIcon,
  securevault_docs: ShieldCheckIcon,
  omg_leads: RocketLaunchIcon,
  omg_iq: ChartBarIcon,
  omg_ai_mastery: AcademicCapIcon,
  timeguard_ai: ClockIcon,
  omg_build: CubeIcon,
};

// Map product keys to accents
const productAccents: Record<string, "emerald" | "purple" | "blue" | "amber" | "teal" | "sky"> = {
  omg_crm: "sky",                 // Light blue for OMG-CRM
  securevault_docs: "teal",       // Teal for SecureVault Docs
  omg_leads: "blue",              // Dark blue for OMG-Leads
  omg_iq: "purple",               // Purple for OMG-IQ
  omg_ai_mastery: "amber",        // Yellow/Amber for OMG AI Mastery
  timeguard_ai: "blue",
  omg_build: "emerald",
};

// Thank you banner component that uses useSearchParams
function ThankYouBanner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchasedProduct = searchParams.get("purchased");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (purchasedProduct) {
      const dismissedKey = `omg_thankyou_dismissed_${purchasedProduct}`;
      const wasDismissed = localStorage.getItem(dismissedKey);
      if (!wasDismissed) {
        setShowThankYou(true);
      }
    }
  }, [purchasedProduct]);

  const dismissThankYou = () => {
    if (purchasedProduct) {
      localStorage.setItem(`omg_thankyou_dismissed_${purchasedProduct}`, "true");
    }
    setShowThankYou(false);
    router.replace("/portal/client", { scroll: false });
  };

  if (!showThankYou || !purchasedProduct) return null;

  return (
    <div className="relative rounded-xl border border-[#47BD79]/30 bg-gradient-to-r from-[#47BD79]/20 to-[#47BD79]/10 p-4 backdrop-blur-xl">
      <button
        onClick={dismissThankYou}
        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <XMarkIcon className="w-5 h-5 text-white/60 hover:text-white" />
      </button>
      <div className="flex items-center gap-3 pr-8">
        <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center flex-shrink-0">
          <CheckCircleSolid className="w-6 h-6 text-[#47BD79]" />
        </div>
        <div>
          <p className="font-semibold text-white">
            Thank you for purchasing {purchasedProduct}!
          </p>
          <p className="text-sm text-white/60">
            Your product is now active and ready to use.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ClientPortalHome() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();

  const topProducts = PRODUCT_CATALOG.filter((p) => p.group === "top");

  const activeCount = Object.values(entitlements).filter(
    (s) => s === "active" || s === "trial"
  ).length;
  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  return (
    <PortalShellV2
      role="client"
      title="Dashboard"
      nav={nav}
      commandItems={CLIENT_COMMAND_ITEMS}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
      entitlements={entitlements}
    >
      <div className="space-y-8">
        {/* Thank You Banner - wrapped in Suspense for useSearchParams */}
        <Suspense fallback={null}>
          <ThankYouBanner />
        </Suspense>

        {/* Assigned Coupon Banner - shows coupons assigned to this user */}
        <AssignedCouponBanner />

        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl border border-[#47BD79]/30 bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 p-6 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#47BD79]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-5 h-5 text-[#47BD79]" />
              <span className="text-sm font-medium text-[#47BD79]">Client Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-white/60 max-w-2xl">
              Here's what's ready in your account. Launch your tools, track your progress, and unlock new capabilities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-4 py-2 text-sm">
                <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                <span className="text-[#47BD79]">Active: {activeCount}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm">
                <LockClosedIcon className="w-4 h-4 text-white/60" />
                <span className="text-white/60">Locked: {lockedCount}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-sm">
                <ClockIcon className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400">Coming Soon: OMG Build</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Your Products</h2>
              <p className="mt-1 text-sm text-white/60">Launch what you have. Unlock what you want.</p>
            </div>
            <Link
              href="/products/plans"
              className="text-sm font-medium text-[#47BD79] hover:text-[#5fcd8f] transition-colors flex items-center gap-1 group"
            >
              View all products
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {topProducts.map((p) => {
              const status = getCardStatus(p.key, entitlements, p.comingSoon);
              const Icon = productIcons[p.key] || CubeIcon;
              const accent = productAccents[p.key] || "emerald";

              return (
                <ProductCardV2
                  key={p.key}
                  name={p.name}
                  description={p.description}
                  status={status}
                  icon={Icon}
                  accent={accent}
                  launchUrl={p.launchUrl}
                  unlockUrl={p.unlockUrl}
                  productKey={p.key}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <BoltIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
              <p className="text-sm text-white/60">Fast moves. No digging around.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href={
                PRODUCT_CATALOG.find((p) => p.key === "securevault_docs")
                  ?.launchUrl || "#"
              }
              className="flex items-center gap-3 rounded-xl bg-[#47BD79] px-4 py-3 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[#47BD79]/50 group"
            >
              <DocumentArrowUpIcon className="w-5 h-5" />
              <span>Upload Document</span>
              <ArrowRightIcon className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={
                PRODUCT_CATALOG.find((p) => p.key === "omg_leads")?.launchUrl ||
                "#"
              }
              className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all group"
            >
              <UserPlusIcon className="w-5 h-5 text-white/70" />
              <span>Add Lead</span>
              <ArrowRightIcon className="w-4 h-4 ml-auto text-white/50 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              disabled
              className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-semibold text-white/40 cursor-not-allowed"
            >
              <CubeIcon className="w-5 h-5" />
              <span>Start a Build</span>
              <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full">Soon</span>
            </button>

            <Link
              href="/products/strategy-session"
              className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all group"
            >
              <CalendarIcon className="w-5 h-5 text-white/70" />
              <span>Book Session</span>
              <ArrowRightIcon className="w-4 h-4 ml-auto text-white/50 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Dev Tools Reset (if in development) */}
        <DevToolsResetEntitlements />
      </div>
    </PortalShellV2>
  );
}
