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
  ai_mastery: AcademicCapIcon, // OMG AI Mastery uses same icon as learn
};

export function AppsDropdown() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Apps</h3>
        <p className="text-gray-600 text-sm">Powerful tools for your business</p>
      </div>
      
      <div className="space-y-2">
        {appsConfig
          .filter((app) => app.id !== 'timeguard') // Remove TimeGuard AI from Apps dropdown
          .map((app) => {
            const Icon = appIcons[app.id] || DocumentTextIcon;
            const colorMap: Record<string, string> = {
              svd: 'text-green-400',
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
                className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('closeDropdown');
                    window.dispatchEvent(event);
                  }
                }}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-3 h-3 ${colorMap[app.id] || 'text-gray-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-200">
                      {app.label}
                    </h4>
                    {app.status === 'coming_soon' && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-orange-500 text-white rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {app.tagline && (
                    <p className="text-xs text-gray-500 mt-0.5">{app.tagline}</p>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200/50">
        <Link
          href="/apps"
          className="flex items-center justify-center w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          See All Apps
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
