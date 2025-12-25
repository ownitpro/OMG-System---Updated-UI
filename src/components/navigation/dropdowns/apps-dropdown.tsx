import React from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  LightBulbIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { appsConfig } from '@/config/apps_config';

// Map app IDs to icons
const appIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  svd: DocumentTextIcon,
  crm: UserGroupIcon,
  leads: ChartBarIcon,
  iq: LightBulbIcon,
  learn: AcademicCapIcon,
  ai_mastery: AcademicCapIcon,
};

export function AppsDropdown() {
  return (
    <div className="p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-white mb-1">Apps</h3>
        <p className="text-white/60 text-sm">Powerful tools for your business</p>
      </div>

      <div className="space-y-1">
        {appsConfig
          .filter((app) => app.id !== 'timeguard')
          .map((app) => {
            const Icon = appIcons[app.id] || DocumentTextIcon;
            const colorMap: Record<string, string> = {
              svd: 'text-[#47BD79]',
              crm: 'text-blue-400',
              leads: 'text-purple-400',
              iq: 'text-purple-400',
              learn: 'text-yellow-400',
              ai_mastery: 'text-yellow-400',
            };

            return (
              <Link
                key={app.id}
                href={app.href}
                className="group flex items-center space-x-3 p-2.5 rounded-xl hover:bg-white/[0.10] hover:shadow-[0_0_12px_rgba(71,189,121,0.15)] transition-all duration-400 ease-premium-out cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('closeDropdown');
                    window.dispatchEvent(event);
                  }
                }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.10] flex items-center justify-center group-hover:bg-white/[0.15] group-hover:scale-105 transition-all duration-400 ease-premium-out">
                  <Icon className={`w-5 h-5 ${colorMap[app.id] || 'text-white/60'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white text-[15px] font-medium group-hover:text-[#47BD79] transition-colors duration-400 ease-premium-out">
                      {app.label}
                    </h4>
                    {app.status === 'coming_soon' && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-orange-500 text-white rounded">
                        Soon
                      </span>
                    )}
                  </div>
                  {app.tagline && (
                    <p className="text-xs text-white/50 mt-0.5 line-clamp-1">{app.tagline}</p>
                  )}
                </div>
              </Link>
            );
          })}
      </div>

      <div className="mt-3 pt-3 border-t border-white/[0.15]">
        <Link
          href="/apps"
          className="flex items-center justify-center w-full px-3 py-2.5 text-[#47BD79] hover:text-[#5fd492] text-[15px] font-medium transition-all duration-400 ease-premium-out cursor-pointer rounded-lg hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.2)]"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          See All Apps
          <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
