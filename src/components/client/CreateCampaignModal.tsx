"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { CreateCampaignInput } from "@/hooks/useAdsCampaigns";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCampaignInput) => Promise<void>;
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

export function CreateCampaignModal({ isOpen, onClose, onSubmit }: CreateCampaignModalProps) {
  const [formData, setFormData] = useState<CreateCampaignInput>({
    name: "",
    description: "",
    platform: "Facebook",
    budget: 0,
    startDate: "",
    endDate: "",
    targetAudience: "",
    landingPageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Prepare data (remove empty optional fields)
      const submitData: CreateCampaignInput = {
        name: formData.name,
        platform: formData.platform,
        budget: formData.budget,
        startDate: new Date(formData.startDate).toISOString(),
      };

      if (formData.description) submitData.description = formData.description;
      if (formData.endDate) submitData.endDate = new Date(formData.endDate).toISOString();
      if (formData.targetAudience) submitData.targetAudience = formData.targetAudience;
      if (formData.landingPageUrl) submitData.landingPageUrl = formData.landingPageUrl;

      await onSubmit(submitData);

      // Reset form
      setFormData({
        name: "",
        description: "",
        platform: "Facebook",
        budget: 0,
        startDate: "",
        endDate: "",
        targetAudience: "",
        landingPageUrl: "",
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f172a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Create New Campaign</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Campaign Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="e.g., Summer Sale Campaign"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20 resize-none"
              placeholder="Brief description of campaign goals and target audience"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Platform <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              style={{ colorScheme: 'dark' }}
              className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
            >
              {PLATFORMS.map((platform) => (
                <option key={platform} value={platform} className="bg-[#1b2335] text-white">
                  {platform}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Budget (CAD) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.budget || ""}
              onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="1000.00"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Start Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                style={{ colorScheme: 'dark' }}
                className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                End Date <span className="text-white/40 text-xs">(Optional - leave blank for ongoing)</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                style={{ colorScheme: 'dark' }}
                className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              />
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Target Audience</label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="e.g., Age 25-45, interested in tech"
            />
          </div>

          {/* Landing Page URL */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Landing Page URL</label>
            <input
              type="url"
              value={formData.landingPageUrl}
              onChange={(e) => setFormData({ ...formData, landingPageUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1b2335] border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#3B82F6]/50 focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="https://example.com/landing-page"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-white/20 bg-[#1b2335] text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-wait font-semibold"
            >
              {isSubmitting ? "Creating..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
