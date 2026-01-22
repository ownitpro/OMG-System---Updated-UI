// src/components/marketplace/TemplateCardPreview.tsx
// Visual preview component for template cards

"use client";

import React from "react";
import { Folder, Tag, FileText, Link as LinkIcon } from "lucide-react";

type Props = {
  templateId: string;
};

export function TemplateCardPreview({ templateId }: Props) {
  if (templateId === 'tpl-personal-life') {
    return (
      <div className="h-28 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(43,213,118,0.1),transparent_50%)]"></div>
        <div className="relative h-full flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-[#3b82f6]" />
            <span className="text-[10px] font-medium text-white/90">IDs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-[#3b82f6]" />
            <span className="text-[10px] font-medium text-white/90">Bills</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-[#3b82f6]" />
            <span className="text-[10px] font-medium text-white/90">Receipts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-[#3b82f6]" />
            <span className="text-[10px] font-medium text-white/90">Tax</span>
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <Folder className="h-3 w-3 text-[#3b82f6]/70" />
            <span className="text-[9px] text-white/70">2025/January</span>
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <Folder className="h-3 w-3 text-[#3b82f6]/70" />
            <span className="text-[9px] text-white/70">2025/February</span>
          </div>
          <div className="absolute bottom-1 right-1 flex gap-1">
            <Tag className="h-2.5 w-2.5 text-[#3b82f6]/60" />
            <Tag className="h-2.5 w-2.5 text-[#3b82f6]/60" />
            <Tag className="h-2.5 w-2.5 text-[#3b82f6]/60" />
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'tpl-biz-generic') {
    return (
      <div className="h-28 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-400/5 p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="relative h-full flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <FileText className="h-3 w-3 text-blue-400" />
            <span className="text-[10px] font-medium text-white/90">Requests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <LinkIcon className="h-3 w-3 text-blue-400" />
            <span className="text-[10px] font-medium text-white/90">Share Links</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-blue-400/30 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
            </div>
            <span className="text-[10px] font-medium text-white/90">Analytics</span>
          </div>
          <div className="mt-1 flex gap-1">
            <div className="h-1.5 flex-1 bg-blue-500/40 rounded"></div>
            <div className="h-1.5 flex-1 bg-blue-500/40 rounded"></div>
            <div className="h-1.5 flex-1 bg-blue-500/40 rounded"></div>
          </div>
          <div className="flex gap-1.5 text-[9px] text-white/70">
            <span>KYC Request</span>
            <span>•</span>
            <span>Year-end</span>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'tpl-acc-starter') {
    return (
      <div className="h-28 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-400/5 p-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="relative h-full flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-blue-400" />
            <span className="text-[10px] font-medium text-white/90">Clients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-blue-400" />
            <span className="text-[10px] font-medium text-white/90">Tax Returns</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Folder className="h-3 w-3 text-blue-400" />
            <span className="text-[10px] font-medium text-white/90">Financial Statements</span>
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <Tag className="h-2.5 w-2.5 text-blue-400/70" />
            <span className="text-[9px] text-white/70">Client: Acme Corp</span>
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <LinkIcon className="h-2.5 w-2.5 text-blue-400/70" />
            <span className="text-[9px] text-white/70">Intake Link</span>
          </div>
          <div className="absolute bottom-1 right-1 flex gap-1">
            <div className="h-2 w-2 rounded bg-blue-400/40"></div>
            <div className="h-2 w-2 rounded bg-blue-400/40"></div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="h-28 rounded-xl bg-gradient-to-br from-blue-600/30 to-blue-400/10"></div>
  );
}

