"use client";

import { useState } from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useAdsCampaigns } from "@/hooks/useAdsCampaigns";
import type { AdCampaign } from "@/hooks/useAdsCampaigns";
import { CreateCampaignModal } from "@/components/client/CreateCampaignModal";
import { CampaignDetailModal } from "@/components/client/CampaignDetailModal";
import {
  MegaphoneIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon as ViewIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, formatCompactNumber, formatDateRange, CAMPAIGN_STATUS } from "@/lib/client/formatters";

export default function AdsManagementPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const {
    campaigns,
    isLoading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  } = useAdsCampaigns();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<AdCampaign | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0.0";
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateCampaign = async (data: any) => {
    try {
      await createCampaign(data);
      showToast('Campaign created successfully!');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to create campaign', 'error');
      throw err;
    }
  };

  const handleUpdateCampaign = async (id: string, updates: any) => {
    try {
      await updateCampaign(id, updates);
      showToast('Campaign updated successfully!');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update campaign', 'error');
      throw err;
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      await deleteCampaign(id);
      showToast('Campaign deleted successfully!');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete campaign', 'error');
      throw err;
    }
  };

  const handleExportReport = () => {
    const csv = generateCSV(campaigns);
    downloadFile(csv, `ad-campaigns-report-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Report exported successfully!');
  };

  const generateCSV = (data: AdCampaign[]) => {
    const headers = ['Name', 'Platform', 'Status', 'Budget', 'Spent', 'Impressions', 'Clicks', 'Conversions', 'CTR', 'CPC', 'Start Date', 'End Date'];
    const rows = data.map(c => [
      c.name,
      c.platform,
      c.status,
      c.budget,
      c.spent,
      c.impressions,
      c.clicks,
      c.conversions,
      c.ctr || 0,
      c.cpc || 0,
      c.startDate,
      c.endDate || 'Ongoing',
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PortalShellV2 role="client" title="Ads Management" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } animate-slide-in-right`}
          >
            {toast.message}
          </div>
        )}

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

          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Campaign
          </button>
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
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{formatCurrency(totalSpend, "CAD")}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <EyeIcon className="w-4 h-4" />
              Impressions
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{formatCompactNumber(totalImpressions)}</div>
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
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">{avgCTR}%</div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
            <p className="font-semibold">Error loading campaigns</p>
            <p className="text-sm mt-1">Please try refreshing the page.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && campaigns.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
            <MegaphoneIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No campaigns yet</h3>
            <p className="text-white/60 mb-6">Create your first ad campaign to start tracking performance.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Create Your First Campaign
            </button>
          </div>
        )}

        {/* Campaigns Table */}
        {!isLoading && !error && campaigns.length > 0 && (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Budget / Spend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Impressions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">CTR / CPC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {campaigns.map((campaign) => {
                    const statusConfig = CAMPAIGN_STATUS[campaign.status];
                    return (
                      <tr key={campaign.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{campaign.name}</div>
                          <div className="text-xs text-white/50 mt-1">{formatDateRange(campaign.startDate, campaign.endDate)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                            style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}
                          >
                            {campaign.platform}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white">{formatCurrency(campaign.spent, campaign.currency)}</div>
                          <div className="text-xs text-white/50">of {formatCurrency(campaign.budget, campaign.currency)}</div>
                        </td>
                        <td className="px-6 py-4 text-white/80">{formatCompactNumber(campaign.impressions)}</td>
                        <td className="px-6 py-4">
                          <div className="text-white/80">{campaign.ctr ? campaign.ctr.toFixed(1) : '0.0'}%</div>
                          <div className="text-xs text-white/50">{campaign.cpc ? formatCurrency(campaign.cpc, campaign.currency) : formatCurrency(0, campaign.currency)} CPC</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedCampaign(campaign)}
                              className="p-2 rounded-lg hover:bg-[#3B82F6]/20 text-[#3B82F6] transition-colors"
                              title="View Details"
                            >
                              <ViewIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {!isLoading && !error && campaigns.length > 0 && (
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => showToast('Analytics dashboard coming soon!', 'success')}
                className="rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
              >
                View Analytics
              </button>
              <button
                onClick={handleExportReport}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Export Report
              </button>
              <button
                onClick={() => showToast('Strategy call booking coming soon!', 'success')}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Request Strategy Call
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <CreateCampaignModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCampaign}
        />

        <CampaignDetailModal
          campaign={selectedCampaign}
          isOpen={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onUpdate={handleUpdateCampaign}
          onDelete={handleDeleteCampaign}
        />
      </div>
    </PortalShellV2>
  );
}
