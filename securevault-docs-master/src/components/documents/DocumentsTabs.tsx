'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { FileText, Share2 } from 'lucide-react';

type Tab = 'documents' | 'shares';

interface TabConfig {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: TabConfig[] = [
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'shares', label: 'Shares', icon: Share2 },
];

export function DocumentsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();
  const currentTab = (searchParams.get('tab') as Tab) || 'documents';

  const handleTabChange = (tabId: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tabId === 'documents') {
      // Remove tab param for default tab
      params.delete('tab');
    } else {
      params.set('tab', tabId);
    }

    const queryString = params.toString();
    const url = queryString ? `/documents?${queryString}` : '/documents';
    router.push(url);
  };

  return (
    <div className="flex">
      <nav className="nav-container-premium p-1 flex items-center gap-1" aria-label="Documents navigation">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-bold tracking-tight rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/25'
                  : 'text-white hover:text-teal-100 hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
