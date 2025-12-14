"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useInView } from '@/hooks/use-in-view';

interface FinalCTASectionProps {
  headline: string;
  subheadline: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  benefits?: string[];
  className?: string;
}

export function FinalCTASection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  benefits = [],
  className = ''
}: FinalCTASectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });

  // Safety checks - provide defaults if props are missing
  const safePrimaryCTA = primaryCTA || {
    label: "Get Started",
    href: "/apps/demo"
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden ${className}`}>
      {/* Modern Background Pattern with subtle animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div 
          className={`flex justify-center mb-8 transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-12'
          }`}
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors duration-300">
            <SparklesIcon className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* Headline */}
        <h2 
          className={`text-4xl md:text-5xl font-bold mb-6 leading-tight transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {headline}
        </h2>

        {/* Subheadline */}
        <p 
          className={`text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {subheadline}
        </p>

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-blue-100 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link
            href={safePrimaryCTA.href}
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg group"
          >
            {safePrimaryCTA.label}
            <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {secondaryCTA && secondaryCTA.href && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">1-3 Weeks</div>
            <div className="text-blue-100">Launch Time</div>
            <div className="text-blue-100 text-sm">From setup to go-live</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">5+</div>
            <div className="text-blue-100">Industries Supported</div>
            <div className="text-blue-100 text-sm">From day one</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">5+</div>
            <div className="text-blue-100">Industries</div>
            <div className="text-blue-100 text-sm">Live with custom automations</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm mb-4">
            Join thousands of businesses already transforming their operations
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-blue-200 text-sm">
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Setup fees may vary by product.
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Canadian data residency
            </div>
          </div>
          
          {/* Ad Landing Page Link */}
          <div className="mt-8">
            <Link
              href="/ads"
              className="inline-flex items-center text-blue-200 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              See Our Full Offering
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle floating elements - performance optimized */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-5 w-8 h-8 bg-white/5 rounded-full blur-xl"></div>
    </section>
  );
}

// Default CTA data
export const defaultFinalCTAData: FinalCTASectionProps = {
  headline: "Ready to Automate & Grow?",
  subheadline: "Let us show you how your business can run itself with OMGsystems.",
  primaryCTA: {
    label: "Try Live Demos",
    href: "/apps/demo"
  },
  secondaryCTA: {
    label: "Start Free Trial",
    href: "/signup"
  },
  benefits: [
    "Launch in 1-3 weeks",
    "Cut admin time by 60%",
    "7× faster lead response"
  ]
};
