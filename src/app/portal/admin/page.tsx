"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { useEntitlements } from "@/hooks/useEntitlements";
import { getAdminNavV2 } from "@/config/portalNav";
import AdminOverviewCardsV2 from "./AdminOverviewCardsV2";
import AdminHealthCardV2 from "./AdminHealthCardV2";
import {
  ShoppingCartIcon,
  UsersIcon,
  CubeIcon,
  CheckCircleIcon,
  LockClosedIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function AdminPortalHome() {
  const entitlements = useEntitlements();

  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;
  const activeCount = Object.values(entitlements).filter((s) => s === "active" || s === "trial").length;

  const nav = getAdminNavV2();

  return (
    <PortalShellV2
      role="admin"
      title="Dashboard"
      nav={nav}
      lockedCount={lockedCount}
      upgradeHref="/products/plans"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/30 bg-gradient-to-br from-[#A855F7]/10 via-transparent to-[#3B82F6]/10 p-6 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-5 h-5 text-[#A855F7]" />
              <span className="text-sm font-medium text-[#A855F7]">Admin Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, Admin
            </h1>
            <p className="text-white/60 max-w-2xl">
              Quick view of what's happening across the portal. Monitor orders, manage clients, and keep track of system health.
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <AdminOverviewCardsV2 />

        {/* System Health */}
        <AdminHealthCardV2 />

        {/* Quick Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Portal Status</h2>

          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-4 py-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
              <span className="text-[#47BD79]">Active: {activeCount}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm">
              <LockClosedIcon className="w-4 h-4 text-white/60" />
              <span className="text-white/60">Locked: {lockedCount}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/30 px-4 py-2 text-sm">
              <WrenchScrewdriverIcon className="w-4 h-4 text-[#A855F7]" />
              <span className="text-[#A855F7]">Dev Tools Enabled</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {/* Orders Card */}
            <Link
              href="/portal/admin/orders"
              className="group rounded-2xl border border-[#47BD79]/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.15)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                  <ShoppingCartIcon className="w-6 h-6 text-[#47BD79]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Orders</h3>
                  <p className="mt-1 text-sm text-white/60">
                    View checkouts and payment status
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white group-hover:bg-[#3da86a] transition-all">
                Open Orders
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Clients Card */}
            <Link
              href="/portal/admin/users"
              className="group rounded-2xl border border-[#A855F7]/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.15)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-[#A855F7]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Clients</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Search clients and manage access
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all">
                Open Clients
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Products Card */}
            <Link
              href="/portal/admin/products"
              className="group rounded-2xl border border-[#3B82F6]/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 hover:scale-[1.01] transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.15)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                  <CubeIcon className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Products</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Manage product catalog & pricing
                  </p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all">
                Open Products
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Testing Shortcuts */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <BeakerIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Testing Shortcuts</h2>
              <p className="text-sm text-white/60">Use these to simulate purchases quickly</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/checkout/success?product=omg-crm"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/30"
            >
              Simulate CRM Purchase
            </Link>
            <Link
              href="/checkout/success?product=securevault-docs"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              Simulate SVD Purchase
            </Link>
            <Link
              href="/checkout/cancel?product=omg-crm"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              Simulate Cancel
            </Link>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
