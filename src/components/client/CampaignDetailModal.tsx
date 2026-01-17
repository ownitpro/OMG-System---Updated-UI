"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { AdCampaign, UpdateCampaignInput } from "@/hooks/useAdsCampaigns";
import { formatCurrency, formatDateRange, CAMPAIGN_STATUS } from "@/lib/client/formatters";

interface CampaignDetailModalProps {
  campaign: AdCampaign | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: UpdateCampaignInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const PLATFORMS = [
  "Facebook",
  "Google Ads",
  "LinkedIn",
  "Instagram",
  "TikTok",
  "Twitter",
  "YouTube",
  "Other",
];

export function CampaignDetailModal({
  campaign,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: CampaignDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateCampaignInput>({});

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setShowDeleteConfirm(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen || !campaign) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: campaign.name,
      description: campaign.description || "",
      platform: campaign.platform,
      budget: campaign.budget,
      status: campaign.status,
      targetAudience: campaign.targetAudience || "",
    });
  };

  const handleSave = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      await onUpdate(campaign.id, formData);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onDelete(campaign.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete campaign");
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

  const budgetPercentage = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;
  const statusConfig = CAMPAIGN_STATUS[campaign.status];

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <div
          className="relative w-full max-w-4xl bg-gradient-to-br from-[#1a1a1a] to-[#2B2A2A] border border-white/10 rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden"
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          {/* Gradient overlay for visual interest */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#A855F7]/5 pointer-events-none" />

          {/* Header */}
          <div className="relative sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 px-8 py-5 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
                {isEditing ? (
                  <PencilIcon className="w-6 h-6 text-white" />
                ) : (
                  <CheckIcon className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? "Edit Campaign" : campaign.name}
                </h2>
                <p className="text-sm text-white/50 mt-0.5">
                  {isEditing ? "Update campaign details" : "Campaign Performance"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex rounded-full px-4 py-1.5 text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.bgColor.replace('/10', '/30')}`}>
                {statusConfig.label}
              </span>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 group"
              >
                <XMarkIcon className="w-5 h-5 text-white/60 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-88px)]">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm flex items-start gap-3 animate-slide-in-down">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 text-xs">!</span>
                </div>
                <div className="flex-1">{error}</div>
              </div>
            )}

            {/* View Mode */}
            {!isEditing ? (
              <div className="space-y-8">
                {/* Campaign Info Card */}
                <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl space-y-4">
                  {campaign.description && (
                    <div>
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Description</label>
                      <p className="text-white/90 mt-2 leading-relaxed">{campaign.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Platform</label>
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30">
                          {campaign.platform}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Date Range</label>
                      <p className="text-white/90 mt-2 font-medium">
                        {formatDateRange(campaign.startDate, campaign.endDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Budget Progress Card */}
                <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Budget Progress</label>
                      <p className="text-2xl font-bold text-white mt-2">
                        {formatCurrency(campaign.spent, campaign.currency)}
                      </p>
                    </div>
                    <div className="text-right">
                      <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Total Budget</label>
                      <p className="text-lg font-semibold text-white/70 mt-2">
                        {formatCurrency(campaign.budget, campaign.currency)}
                      </p>
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        budgetPercentage > 100
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : budgetPercentage > 80
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                          : 'bg-gradient-to-r from-[#47BD79] to-emerald-500'
                      }`}
                      style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-white/40">{budgetPercentage.toFixed(1)}% spent</span>
                    <span className={`text-xs font-semibold ${
                      budgetPercentage > 100 ? 'text-red-400' : budgetPercentage > 80 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {budgetPercentage > 100 ? 'Over budget!' : budgetPercentage > 80 ? 'Almost there' : 'On track'}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-all duration-200 group">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Impressions</div>
                    <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
                      {campaign.impressions.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-all duration-200 group">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Clicks</div>
                    <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
                      {campaign.clicks.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-all duration-200 group">
                    <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Conversions</div>
                    <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-200">
                      {campaign.conversions}
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-[#3B82F6]/10 to-[#3B82F6]/5 backdrop-blur-xl border border-[#3B82F6]/30 rounded-2xl hover:from-[#3B82F6]/15 hover:to-[#3B82F6]/10 transition-all duration-200 group">
                    <div className="text-xs font-medium text-[#3B82F6]/80 uppercase tracking-wider mb-3">CTR</div>
                    <div className="text-3xl font-bold text-[#3B82F6] group-hover:scale-105 transition-transform duration-200">
                      {campaign.ctr ? campaign.ctr.toFixed(2) : '0.00'}%
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-[#47BD79]/10 to-[#47BD79]/5 backdrop-blur-xl border border-[#47BD79]/30 rounded-2xl hover:from-[#47BD79]/15 hover:to-[#47BD79]/10 transition-all duration-200 group">
                    <div className="text-xs font-medium text-[#47BD79]/80 uppercase tracking-wider mb-3">CPC</div>
                    <div className="text-3xl font-bold text-[#47BD79] group-hover:scale-105 transition-transform duration-200">
                      {campaign.cpc ? formatCurrency(campaign.cpc, campaign.currency) : formatCurrency(0, campaign.currency)}
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-br from-[#A855F7]/10 to-[#A855F7]/5 backdrop-blur-xl border border-[#A855F7]/30 rounded-2xl hover:from-[#A855F7]/15 hover:to-[#A855F7]/10 transition-all duration-200 group">
                    <div className="text-xs font-medium text-[#A855F7]/80 uppercase tracking-wider mb-3">Conv. Rate</div>
                    <div className="text-3xl font-bold text-[#A855F7] group-hover:scale-105 transition-transform duration-200">
                      {campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1) : '0.0'}%
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(campaign.targetAudience || campaign.landingPageUrl) && (
                  <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl space-y-4">
                    {campaign.targetAudience && (
                      <div>
                        <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Target Audience</label>
                        <p className="text-white/90 mt-2 leading-relaxed">{campaign.targetAudience}</p>
                      </div>
                    )}
                    {campaign.landingPageUrl && (
                      <div>
                        <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Landing Page</label>
                        <a
                          href={campaign.landingPageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#3B82F6] hover:text-[#2563EB] mt-2 block truncate font-medium transition-colors duration-200"
                        >
                          {campaign.landingPageUrl}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200 flex items-center gap-2 font-semibold group"
                  >
                    <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    Delete Campaign
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1D4ED8] transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg shadow-[#3B82F6]/25 group"
                  >
                    <PencilIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    Edit Campaign
                  </button>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Campaign Name *</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 transition-all duration-200"
                      placeholder="e.g., Summer Sale 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 resize-none transition-all duration-200"
                      placeholder="Brief description of campaign goals..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Platform *</label>
                      <select
                        value={formData.platform || campaign.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 transition-all duration-200"
                      >
                        {PLATFORMS.map((platform) => (
                          <option key={platform} value={platform} className="bg-[#1a1a1a]">
                            {platform}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Status *</label>
                      <select
                        value={formData.status || campaign.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 transition-all duration-200"
                      >
                        <option value="DRAFT" className="bg-[#1a1a1a]">Draft</option>
                        <option value="ACTIVE" className="bg-[#1a1a1a]">Active</option>
                        <option value="PAUSED" className="bg-[#1a1a1a]">Paused</option>
                        <option value="COMPLETED" className="bg-[#1a1a1a]">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Budget (CAD) *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.budget ?? campaign.budget}
                        onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 transition-all duration-200"
                        placeholder="1000.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Target Audience</label>
                    <input
                      type="text"
                      value={formData.targetAudience || ""}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 transition-all duration-200"
                      placeholder="e.g., Age 25-45, interested in tech"
                    />
                  </div>
                </div>

                {/* Edit Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setError(null);
                    }}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSubmitting || !formData.name}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1D4ED8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-[#3B82F6]/25 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckIcon className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2B2A2A] border border-red-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in"
            style={{ boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.3)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <TrashIcon className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 text-center">Delete Campaign?</h3>
            <p className="text-white/60 text-center mb-8 leading-relaxed">
              This will permanently delete <span className="font-semibold text-white">"{campaign.name}"</span> and all its data. This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setError(null);
                }}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Campaign"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
