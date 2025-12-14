import React from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  HomeIcon, 
  WrenchScrewdriverIcon, 
  CalculatorIcon
} from '@heroicons/react/24/outline';
import { industriesConfig } from '@/config/industries_config';

// Map industry IDs to icons (using actual IDs from config: pm, re, cont, acc)
const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pm: BuildingOfficeIcon,
  re: HomeIcon,
  cont: WrenchScrewdriverIcon,
  acc: CalculatorIcon,
};

// Map industry IDs to colors
const industryColors: Record<string, string> = {
  pm: 'text-blue-400',
  re: 'text-green-400',
  cont: 'text-orange-400',
  acc: 'text-purple-400',
};

export function IndustriesDropdown() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Focused</h3>
        <p className="text-gray-600 text-sm">Solutions tailored for your industry</p>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {industriesConfig.map((industry) => {
          const Icon = industryIcons[industry.id] || BuildingOfficeIcon;
          const color = industryColors[industry.id] || 'text-gray-400';
          
          return (
            <Link
              key={industry.id}
              href={industry.href}
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
                <Icon className={`w-3 h-3 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-200">
                  {industry.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200/50">
        <Link
          href="/industries"
          className="flex items-center justify-center w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          View All Industries
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
