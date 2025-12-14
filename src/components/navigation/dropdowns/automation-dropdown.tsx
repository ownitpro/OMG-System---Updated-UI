import React from 'react';
import Link from 'next/link';
import { 
  CogIcon, 
  SparklesIcon, 
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const automationItems = [
  {
    name: 'Workflow Builder',
    href: '/automation/workflow-builder',
    icon: CogIcon,
    description: 'Visual workflow designer with drag-and-drop',
    features: ['Visual designer', 'Pre-built templates', 'Real-time testing'],
    isPopular: true,
    color: 'text-blue-400'
  },
  {
    name: 'Smart Automations',
    href: '/automation/smart-automations',
    icon: SparklesIcon,
    description: 'Ready-to-deploy automation templates',
    features: ['Industry-specific', 'One-click deploy', 'Customizable'],
    isPopular: false,
    isDynamic: true,
    color: 'text-emerald-400'
  },
  {
    name: 'Custom Automation',
    href: '/automation/custom',
    icon: WrenchScrewdriverIcon,
    description: 'Bespoke automation development',
    features: ['Tailored solutions', 'API integrations', 'Expert support'],
    isPopular: false,
    isDynamic: true,
    color: 'text-orange-400'
  }
];


export function AutomationDropdown() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation & Workflows</h3>
        <p className="text-gray-600 text-sm">Build, deploy, and scale your automations</p>
      </div>
      
      <div className="space-y-2">
        {automationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors duration-200"
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center`}>
              <item.icon className={`w-3 h-3 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-200">
                  {item.name}
                </h4>
                {item.isPopular && (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white rounded">
                    Popular
                  </span>
                )}
                {item.isDynamic && (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-purple-500 text-white rounded">
                    Dynamic
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      
      <div className="mt-6 pt-4 border-t border-gray-200/50">
        <Link
          href="/automation"
          className="flex items-center justify-center w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
        >
          Explore All Automation
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
