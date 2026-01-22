// src/app/demo/business/templates/page.tsx
// Templates page showing installed templates from marketplace

'use client';

import * as React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Folder, Tag, FileText, Link as LinkIcon, CheckSquare } from 'lucide-react';
import { templatePreviews } from '@/lib/marketplace/templatePreviews';

function TemplatesContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [installedTemplates, setInstalledTemplates] = React.useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('svd_installed_templates') || '[]');
  });

  React.useEffect(() => {
    if (templateId && !installedTemplates.includes(templateId)) {
      const updated = [...installedTemplates, templateId];
      setInstalledTemplates(updated);
      localStorage.setItem('svd_installed_templates', JSON.stringify(updated));
    }
  }, [templateId, installedTemplates]);

  const templateNames: Record<string, string> = {
    'tpl-personal-life': 'Personal – Life Admin',
    'tpl-biz-generic': 'Business – Essentials',
    'tpl-acc-starter': 'Accounting – Starter Vault',
  };

  const renderTemplateContent = (id: string) => {
    const preview = templatePreviews[id];
    if (!preview) return null;

    return (
      <div className="space-y-4">
        {preview.folders && preview.folders.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-100 mb-2">
              <Folder className="h-4 w-4" />
              <span>Folders</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {preview.folders.slice(0, 8).map((folder, i) => (
                <div key={i} className="text-xs text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
                  {folder}
                </div>
              ))}
            </div>
          </div>
        )}
        {preview.labels && preview.labels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-100 mb-2">
              <Tag className="h-4 w-4" />
              <span>Labels</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preview.labels.map((label, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/30">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
        {preview.quickActions && preview.quickActions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-100 mb-2">
              <LinkIcon className="h-4 w-4" />
              <span>Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {preview.quickActions.map((action, i) => (
                <div key={i} className="text-xs text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
                  {action}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-zinc-100">Templates</h1>
        <p className="text-sm text-zinc-400">Manage installed templates from the marketplace.</p>
      </div>

      {installedTemplates.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 p-8 bg-zinc-900 text-center">
          <p className="text-zinc-400 mb-4">No templates installed yet.</p>
          <Link 
            href="/marketplace" 
            className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {installedTemplates.map((id) => (
            <div key={id} className="rounded-2xl border border-zinc-800 p-6 bg-zinc-900">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-100">{templateNames[id] || id}</h2>
                <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/30">
                  Installed
                </span>
              </div>
              {renderTemplateContent(id)}
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-zinc-800 p-4 bg-zinc-900">
        <div className="text-sm font-medium text-zinc-100 mb-2">Install More Templates</div>
        <p className="text-sm text-zinc-400 mb-3">
          Browse the marketplace to find more templates for your workspace.
        </p>
        <Link 
          href="/marketplace" 
          className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Browse Marketplace
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 p-8 flex items-center justify-center"><div className="text-zinc-400">Loading...</div></div>}>
      <TemplatesContent />
    </Suspense>
  );
}
