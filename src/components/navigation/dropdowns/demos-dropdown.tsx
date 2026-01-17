import React from 'react';
import Link from 'next/link';
import { 
  PlayIcon, 
  ChartBarIcon, 
  CogIcon, 
  SparklesIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const demos = [
  {
    name: 'Try a Live Demo',
    href: '/try-live-demo',
    icon: PlayIcon,
    description: 'Interactive platform tour with real data',
    duration: '5-10 min',
    type: 'primary',
    color: 'text-emerald-400'
  },
  {
    name: 'CRM Demo',
    href: '/apps/crm',
    icon: UserGroupIcon,
    description: 'See how our CRM transforms lead management',
    duration: '8-12 min',
    type: 'secondary',
    color: 'text-blue-400'
  },
  {
    name: 'SecureVault Demo',
    href: '/apps/securevault-docs',
    icon: DocumentTextIcon,
    description: 'Experience secure document management',
    duration: '6-10 min',
    type: 'secondary',
    color: 'text-green-400'
  },
];

export function DemosDropdown() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Demos</h3>
        <p className="text-gray-600 text-sm">Experience OMGsystems in action—live or guided</p>
      </div>
      
      <div className="space-y-2">
        {demos.map((demo) => (
          <Link
            key={demo.name}
            href={demo.href}
            className={`group flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              demo.type === 'primary'
                ? 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                : 'hover:bg-blue-50/50'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center`}>
              <demo.icon className={`w-3 h-3 ${demo.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium group-hover:text-blue-600 transition-colors duration-200 ${
                  demo.type === 'primary' ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {demo.name}
                </h4>
                <span className="text-gray-500 text-xs">{demo.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div>
            <h5 className="text-gray-900 font-medium">New here?</h5>
            <p className="text-gray-600 text-sm">Start with our most popular demos to see OMGsystems in action!</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200/50">
        <Link
          href="/try-live-demo"
          className="flex items-center justify-center w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
        >
          View All Demos
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
