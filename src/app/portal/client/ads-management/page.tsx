"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import Link from "next/link";
import {
  MegaphoneIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const SAMPLE_CAMPAIGNS = [
  {
    id: "1",
    name: "Summer Sale Campaign",
    platform: "Facebook",
    status: "active",
    spend: "$450",
    impressions: "12,500",
    clicks: 342,
    ctr: "2.7%",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Brand Awareness",
    platform: "Google Ads",
    status: "active",
    spend: "$280",
    impressions: "8,200",
    clicks: 198,
    ctr: "2.4%",
    color: "#47BD79",
  },
  {
    id: "3",
    name: "Lead Generation",
    platform: "LinkedIn",
    status: "paused",
    spend: "$320",
    impressions: "4,100",
    clicks: 156,
    ctr: "3.8%",
    color: "#A855F7",
  },
];

export default function AdsManagementPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();

  const totalSpend = SAMPLE_CAMPAIGNS.reduce((sum, c) => sum + parseFloat(c.spend.replace("$", "")), 0);
  const totalClicks = SAMPLE_CAMPAIGNS.reduce((sum, c) => sum + c.clicks, 0);
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  return (
    <PortalShellV2 role="client" title="Ads Management" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
              <MegaphoneIcon className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Ads Management</h1>
              <p className="text-sm text-white/60">
                Track and optimize your advertising campaigns.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=ads"
            className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Campaign
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CurrencyDollarIcon className="w-4 h-4" />
              Total Spend
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">${totalSpend}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <EyeIcon className="w-4 h-4" />
              Impressions
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">24.8K</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ChartBarIcon className="w-4 h-4" />
              Total Clicks
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">{totalClicks}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              Avg CTR
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">2.9%</div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Active Campaigns</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Spend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Impressions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {SAMPLE_CAMPAIGNS.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{campaign.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${campaign.color}20`, color: campaign.color }}
                      >
                        {campaign.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        campaign.status === "active"
                          ? "bg-[#47BD79]/20 text-[#47BD79]"
                          : "bg-[#F59E0B]/20 text-[#F59E0B]"
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{campaign.spend}</td>
                    <td className="px-6 py-4 text-white/80">{campaign.impressions}</td>
                    <td className="px-6 py-4 text-white/80">{campaign.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors">
              View Analytics
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Export Report
            </button>
            <Link
              href="/contact?solution=ads"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Request Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
