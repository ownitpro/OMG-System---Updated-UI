import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PricingTeaserProps {
  title: string;
  subtitle?: string;
  plans: any[];
  disclaimer?: string;
  className?: string;
}

export function PricingTeaser({ 
  title, 
  subtitle, 
  plans, 
  disclaimer,
  className = '' 
}: PricingTeaserProps) {
  return (
    <section className={`relative overflow-hidden ${className}`} style={{ padding: 'clamp(4rem, 10vw, 8rem) 1rem' }}>
      {/* Hero Background with Enhanced Visual Treatment */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated background elements for movement and energy */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-400/5 to-lime-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center text-white">
          <h1 className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-emerald-100 to-lime-200 bg-clip-text text-transparent" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Lose the Daily Grind. Build a Business That Runs Without You — Gain Back Time & Grow 40%+
          </h1>
          
          <p className="text-gray-300 italic font-light mb-4" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
            Build Once. Profit Forever.
          </p>
          
          <p className="text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            Our expert team partners with you to redesign your entire business — from how your brand shows up, to how you capture leads, to how operations run — so you can scale fast and reclaim your time.
          </p>

          {/* Single Primary CTA Button */}
          <div className="flex justify-center mb-8">
            <Link
              href="/contact?type=strategy"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-lime-700 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105 min-h-[3rem] w-full max-w-[18rem]"
            >
              Schedule Your Strategy Call
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              Trusted by 10,000+ businesses
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-lime-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              Canadian data residency
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default pricing plans (now empty since we're not using them)
export const defaultPricingPlans: any[] = [];
