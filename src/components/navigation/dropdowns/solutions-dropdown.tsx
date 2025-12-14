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
  automations: 'text-emerald-400',
  strategy_session: 'text-purple-400',
  custom_solutions: 'text-orange-400',
};

export function SolutionsDropdown() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Solutions</h3>
        <p className="text-gray-600 text-sm">See how automation and AI transform your business</p>
      </div>
      
      <div className="space-y-2">
        {solutionsConfig
          .filter((solution) => 
            solution.id !== 'ai_mastery_training' && // Remove OMG AI Mastery from Solutions dropdown
            solution.id !== 'live_demo' // Remove duplicate Try Live Demo (keeping the hardcoded one below)
          )
          .map((solution) => {
            const Icon = solutionIcons[solution.id] || CogIcon;
            const color = solutionColors[solution.id] || 'text-gray-400';
            
            return (
              <Link
                key={solution.id}
                href={solution.href}
                className="group flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-50/50 cursor-pointer"
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
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium group-hover:text-blue-600 transition-colors duration-200 text-gray-900">
                      {solution.label}
                    </h4>
                    {solution.badge && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-emerald-500 text-white rounded">
                        {solution.badge}
                      </span>
                    )}
                  </div>
                  {solution.summary && (
                    <p className="text-xs text-gray-500 mt-0.5">{solution.summary}</p>
                  )}
                </div>
              </Link>
            );
          })}
        
        {/* Try Live Demo - separate from solutions config */}
        <Link
          href="/try-live-demo"
          className="group flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
            <PlayIcon className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium group-hover:text-emerald-600 transition-colors duration-200 text-emerald-600">
              Try Live Demo
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Hands-on demos for OMGCRM and SecureVault Docs — no signup required.
            </p>
          </div>
        </Link>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200/50">
        <Link
          href="/solutions"
          className="flex items-center justify-center w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('closeDropdown');
              window.dispatchEvent(event);
            }
          }}
        >
          Explore All Solutions
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
