import React from 'react';
import Link from 'next/link';
import { 
  MegaphoneIcon,
  PaintBrushIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const marketingItems = [
  {
    name: 'Ads Management',
    href: '/marketing/ads-management',
    icon: MegaphoneIcon,
    description: 'Done-for-you ad strategy, setup, and optimization across major platforms.',
    color: 'text-blue-400'
  },
  {
    name: 'Branding & Creative',
    href: '/marketing/branding-creative',
    icon: PaintBrushIcon,
    description: 'Brand identity, visuals, and creative direction that match your systems.',
    color: 'text-purple-400'
  },
  {
    name: 'Content Development',
    href: '/marketing/content-development',
    icon: DocumentTextIcon,
    description: 'Content plus SOP systems built around your industry and workflows.',
    color: 'text-emerald-400'
  }
];

export function MarketingAgencyDropdown() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing Agency</h3>
        <p className="text-gray-600 text-sm">Done-for-you marketing services</p>
      </div>
      
      <div className="space-y-2">
        {marketingItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
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
              <item.icon className={`w-3 h-3 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors duration-200">
                {item.name}
              </h4>
              {item.description && (
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

