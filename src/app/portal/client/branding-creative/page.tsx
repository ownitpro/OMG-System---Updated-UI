"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useBrandAssets } from "@/hooks/useBrandAssets";
import { useDesignRequests } from "@/hooks/useDesignRequests";
import { DesignRequestModal } from "@/components/portal/DesignRequestModal";
import React from "react";
import Link from "next/link";
import {
  PaintBrushIcon,
  PhotoIcon,
  DocumentIcon,
  FolderIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { formatFileSize, formatDate, safeJsonParse, formatNumber } from "@/lib/client/formatters";

const RECENT_PROJECTS = [
  {
    id: "1",
    name: "Q1 Campaign Graphics",
    status: "In Progress",
    dueDate: "Jan 15, 2025",
    progress: 65,
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Website Refresh",
    status: "Review",
    dueDate: "Jan 5, 2025",
    progress: 90,
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Product Launch Assets",
    status: "Pending",
    dueDate: "Feb 1, 2025",
    progress: 20,
    color: "#A855F7",
  },
];

// Helper function to assign colors by asset type
const getAssetColor = (type: string) => {
  switch (type) {
    case 'Logo': return '#47BD79';
    case 'Color Palette': return '#3B82F6';
    case 'Template': return '#A855F7';
    case 'Guide': return '#F59E0B';
    default: return '#9CA3AF';
  }
};

export default function BrandingCreativePage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const { assets, isLoading, error, downloadAsset } = useBrandAssets();
  const { createDesignRequest } = useDesignRequests();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [viewingAsset, setViewingAsset] = React.useState<any>(null);
  const [showAllAssets, setShowAllAssets] = React.useState(false);
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  // Loading state
  if (isLoading) {
    return (
      <PortalShellV2 role="client" title="Branding & Creative" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A855F7]"></div>
        </div>
      </PortalShellV2>
    );
  }

  // Error state
  if (error) {
    return (
      <PortalShellV2 role="client" title="Branding & Creative" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          Failed to load brand assets: {error.message}
        </div>
      </PortalShellV2>
    );
  }

  const totalAssets = assets.length;
  const activeProjects = RECENT_PROJECTS.length;
  const completedThisMonth = 7; // Could be calculated from API data

  // Show only first 4 assets by default, or all if "View All" is clicked
  const displayedAssets = showAllAssets ? assets : assets.slice(0, 4);

  return (
    <PortalShellV2 role="client" title="Branding & Creative" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <PaintBrushIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Branding & Creative</h1>
              <p className="text-sm text-white/60">
                Access your brand assets and creative projects.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-[#A855F7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Request Design
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="text-sm text-white/60">Brand Assets</div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">{totalAssets}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="text-sm text-white/60">Active Projects</div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{activeProjects}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="text-sm text-white/60">Completed This Month</div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{completedThisMonth}</div>
          </div>
        </div>

        {/* Brand Assets */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-white">Brand Assets</div>
              <button
                onClick={() => setShowAllAssets(!showAllAssets)}
                className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <FolderIcon className="w-4 h-4" />
                {showAllAssets ? 'Show Less' : 'View All'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {assets.length === 0 ? (
              <div className="col-span-full px-6 py-12 text-center">
                <PhotoIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 mb-4">No brand assets yet</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#A855F7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Request Design
                </button>
              </div>
            ) : (
              displayedAssets.map((asset) => {
                const color = getAssetColor(asset.type);
                const colorCodes = safeJsonParse(asset.colorCodes, []);
                return (
                  <div
                    key={asset.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      {asset.type === "Logo" && <PhotoIcon className="w-6 h-6" style={{ color }} />}
                      {asset.type === "Guide" && <DocumentIcon className="w-6 h-6" style={{ color }} />}
                      {asset.type === "Template" && <PaintBrushIcon className="w-6 h-6" style={{ color }} />}
                      {asset.type === "Color Palette" && <PaintBrushIcon className="w-6 h-6" style={{ color }} />}
                      {!["Logo", "Guide", "Template", "Color Palette"].includes(asset.type) && <FolderIcon className="w-6 h-6" style={{ color }} />}
                    </div>
                    <div className="font-medium text-white truncate">{asset.name}</div>
                    <div className="text-xs text-white/60 mt-1">
                      {asset.fileFormat} {asset.fileSize && `• ${formatFileSize(asset.fileSize)}`}
                    </div>
                    {asset.downloadCount > 0 && (
                      <div className="text-xs text-white/40 mt-1">
                        {asset.downloadCount} downloads
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          if (asset.fileUrl) {
                            window.open(asset.fileUrl, '_blank');
                          } else if (asset.thumbnailUrl) {
                            window.open(asset.thumbnailUrl, '_blank');
                          } else {
                            setViewingAsset(asset);
                          }
                        }}
                        className="flex-1 rounded-lg bg-white/5 border border-white/10 py-1.5 text-xs text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                      >
                        <EyeIcon className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button
                        onClick={() => downloadAsset(asset.id, asset.name)}
                        className="flex-1 rounded-lg bg-white/5 border border-white/10 py-1.5 text-xs text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                      >
                        <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Recent Projects</div>
          </div>

          <div className="divide-y divide-white/10">
            {RECENT_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <PaintBrushIcon className="w-5 h-5" style={{ color: project.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{project.name}</div>
                    <div className="text-sm text-white/60">Due: {project.dueDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                      <span>{project.status}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-[#A855F7] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors"
            >
              Request New Design
            </button>
            <button
              onClick={() => {
                // Download all assets as a brand kit (in a real implementation, this would create a ZIP)
                assets.forEach(asset => {
                  if (asset.fileUrl) {
                    const link = document.createElement('a');
                    link.href = asset.fileUrl;
                    link.download = asset.name;
                    link.click();
                  }
                });
              }}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Download Brand Kit
            </button>
            <button
              onClick={() => {
                // Open modal to schedule a brand review session
                setIsModalOpen(true);
              }}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Schedule Review
            </button>
          </div>
        </div>

        {/* Design Request Modal */}
        <DesignRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createDesignRequest}
        />
      </div>
    </PortalShellV2>
  );
}
