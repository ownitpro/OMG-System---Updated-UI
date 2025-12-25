import React from 'react';
import Link from 'next/link';
import {
  ClockIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  PlayIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { solutionsConfig } from '@/config/solutions_config';

// Map solution IDs to icons
const solutionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ai_scheduler: ClockIcon,
  automations: CogIcon,
  strategy_session: LightBulbIcon,
  custom_solutions: WrenchScrewdriverIcon,
};

// Map solution IDs to colors
const solutionColors: Record<string, string> = {
  ai_scheduler: 'text-blue-400',
  automations: 'text-[#47BD79]',
  strategy_session: 'text-purple-400',
  custom_solutions: 'text-orange-400',
};

export function SolutionsDropdown() {
  return (
    <div className="p-4">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-white mb-1">Solutions</h3>
        <p className="text-white/60 text-sm">See how automation and AI transform your business</p>
      </div>

      <div className="space-y-1">
        {solutionsConfig
          .filter((solution) =>
            solution.id !== 'ai_mastery_training' &&
            solution.id !== 'live_demo'
          )
          .map((solution) => {
            const Icon = solutionIcons[solution.id] || CogIcon;
            const color = solutionColors[solution.id] || 'text-white/60';

            return (
              <Link
                key={solution.id}
                href={solution.href}
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
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white text-[15px] font-medium group-hover:text-[#47BD79] transition-colors duration-400 ease-premium-out">
                      {solution.label}
                    </h4>
                    {solution.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#47BD79] text-white rounded">
                        {solution.badge}
                      </span>
                    )}
                  </div>
                  {solution.summary && (
                    <p className="text-xs text-white/50 mt-0.5 line-clamp-1">{solution.summary}</p>
                  )}
                </div>
              </Link>
            );
          })}

        {/* Try Live Demo */}
        <Link
          href="/try-live-demo"
          className="group flex items-center space-x-3 p-2.5 rounded-xl bg-[#47BD79]/15 border border-[#47BD79]/30 hover:bg-[#47BD79]/20 hover:border-[#47BD79]/50 hover:shadow-[0_0_15px_rgba(71,189,121,0.25)] transition-all duration-400 ease-premium-out cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#47BD79]/20 flex items-center justify-center group-hover:bg-[#47BD79]/30 group-hover:scale-105 transition-all duration-400 ease-premium-out">
            <PlayIcon className="w-5 h-5 text-[#47BD79]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[#47BD79] text-[15px] font-medium group-hover:text-[#5fd492] transition-colors duration-400 ease-premium-out">
              Try Live Demo
            </h4>
            <p className="text-xs text-white/50 mt-0.5 line-clamp-1">
              Hands-on demos for OMGCRM and SecureVault Docs
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-3 pt-3 border-t border-white/[0.15]">
        <Link
          href="/solutions"
          className="flex items-center justify-center w-full px-3 py-2.5 text-[#47BD79] hover:text-[#5fd492] text-[15px] font-medium transition-all duration-400 ease-premium-out cursor-pointer rounded-lg hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.2)]"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          Explore All Solutions
          <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
