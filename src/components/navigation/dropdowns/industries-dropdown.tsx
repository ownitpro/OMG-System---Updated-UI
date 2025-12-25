import React from 'react';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';
import { industriesConfig } from '@/config/industries_config';

// Map industry IDs to icons
const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pm: BuildingOfficeIcon,
  re: HomeIcon,
  cont: WrenchScrewdriverIcon,
  acc: CalculatorIcon,
};

// Map industry IDs to colors
const industryColors: Record<string, string> = {
  pm: 'text-blue-400',
  re: 'text-[#47BD79]',
  cont: 'text-orange-400',
  acc: 'text-purple-400',
};

export function IndustriesDropdown() {
  return (
    <div className="p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-white mb-1">Industry Focused</h3>
        <p className="text-white/60 text-sm">Solutions tailored for your industry</p>
      </div>

      <div className="space-y-1">
        {industriesConfig.map((industry) => {
          const Icon = industryIcons[industry.id] || BuildingOfficeIcon;
          const color = industryColors[industry.id] || 'text-white/60';

          return (
            <Link
              key={industry.id}
              href={industry.href}
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
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[15px] font-medium group-hover:text-[#47BD79] transition-colors duration-400 ease-premium-out">
                  {industry.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-white/[0.15]">
        <Link
          href="/industries"
          className="flex items-center justify-center w-full px-3 py-2.5 text-[#47BD79] hover:text-[#5fd492] text-[15px] font-medium transition-all duration-400 ease-premium-out cursor-pointer rounded-lg hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.2)]"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          View All Industries
          <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
