import React from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  SparklesIcon,
  LightBulbIcon,
  Squares2X2Icon,
  StarIcon
} from '@heroicons/react/24/outline';

const marketingItems = [
  {
    name: 'How it Works',
    href: '/marketing/how-it-works',
    icon: LightBulbIcon,
    description: 'Our philosophy, approach, and the 4-step process.',
    color: 'text-amber-400'
  },
  {
    name: 'Services',
    href: '/marketing/services',
    icon: Squares2X2Icon,
    description: 'Marketing capabilities built as integrated systems.',
    color: 'text-blue-400'
  },
  {
    name: 'Tiers',
    href: '/marketing/tiers',
    icon: StarIcon,
    description: 'Choose your growth path: Ignite, Flow, or Scale packages.',
    color: 'text-rose-400'
  }
];

export function MarketingAgencyDropdown() {
  return (
    <div className="p-4">
      {/* All Marketing Services Link */}
      <Link
        href="/marketing"
        className="group flex items-center justify-between p-3 mb-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 hover:border-rose-500/40 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all duration-400 ease-premium-out cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (typeof window !== 'undefined') {
            const event = new CustomEvent('closeDropdown');
            window.dispatchEvent(event);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-105 transition-all duration-400">
            <SparklesIcon className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h4 className="text-white text-[15px] font-semibold group-hover:text-rose-400 transition-colors duration-400">
              All Marketing Services
            </h4>
            <p className="text-xs text-white/50">View our full marketing capabilities</p>
          </div>
        </div>
        <ArrowRightIcon className="w-4 h-4 text-rose-400/70 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>

      <div className="space-y-1">
        {marketingItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
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
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-[15px] font-medium group-hover:text-[#47BD79] transition-colors duration-400 ease-premium-out">
                {item.name}
              </h4>
              {item.description && (
                <p className="text-xs text-white/50 mt-0.5 line-clamp-1">{item.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
