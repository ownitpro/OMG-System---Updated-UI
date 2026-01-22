// src/components/marketplace/TemplatePreviewModal.tsx
// Preview modal showing what a template will install

"use client";

import React from "react";
import { X, Folder, Tag, Link as LinkIcon, FileText, BarChart, CheckSquare } from "lucide-react";
import { templatePreviews, type TemplatePreview } from "@/lib/marketplace/templatePreviews";

type Props = {
  templateId: string;
  templateTitle: string;
  templateVertical: 'business' | 'personal';
  onClose: () => void;
  onInstall: (target: 'business' | 'personal') => void;
};

export function TemplatePreviewModal({ templateId, templateTitle, templateVertical, onClose, onInstall }: Props) {
  const preview = templatePreviews[templateId] || {};

  const renderSection = (title: string, items: string[] | undefined, icon: React.ReactNode) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          {icon}
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {items.map((item, i) => (
            <div key={i} className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{templateTitle}</h2>
            <p className="text-sm text-gray-500 mt-1">Preview what will be installed</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6 space-y-6">
          {renderSection('Folders', preview.folders, <Folder className="h-4 w-4" />)}
          {renderSection('Labels', preview.labels, <Tag className="h-4 w-4" />)}
          {renderSection('Quick Actions', preview.quickActions, <LinkIcon className="h-4 w-4" />)}
          {renderSection('Request Templates', preview.requests, <FileText className="h-4 w-4" />)}
          {renderSection('Share Link Templates', preview.shares, <LinkIcon className="h-4 w-4" />)}
          {renderSection('Analytics Dashboards', preview.analytics, <BarChart className="h-4 w-4" />)}
          {renderSection('Intake Links', preview.intakeLinks, <LinkIcon className="h-4 w-4" />)}
          {renderSection('Checklists', preview.checklists, <CheckSquare className="h-4 w-4" />)}
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onInstall(templateVertical)}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:opacity-90 transition"
          >
            Install to {templateVertical === 'business' ? 'Business' : 'Personal'}
          </button>
        </div>
      </div>
    </div>
  );
}

