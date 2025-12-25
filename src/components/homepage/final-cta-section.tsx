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
    <section ref={ref as React.RefObject<HTMLElement>} className={`py-20 bg-black text-white relative overflow-hidden ${className}`}>
      {/* Pure black background to blend seamlessly */}
      <div className="absolute inset-0 bg-black" />

      {/* Glow orbs - subtle background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div 
          className={`flex justify-center mb-8 transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-12'
          }`}
        >
          <div className="w-20 h-20 bg-[#47BD79]/20 backdrop-blur-glass-medium rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(71,189,121,0.3)] hover:bg-[#47BD79]/30 hover:shadow-[0_0_40px_rgba(71,189,121,0.5)] transition-all duration-600 ease-premium-out border border-[#47BD79]/30">
            <SparklesIcon className="h-10 w-10 text-[#47BD79]" />
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
          className={`text-xl md:text-2xl text-white/70 mb-8 leading-relaxed transition-all duration-1000 ease-premium-out ${
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
                <div key={index} className="flex items-center justify-center bg-white/5 backdrop-blur-glass-subtle px-4 py-3 rounded-xl border border-white/10 hover:border-[#47BD79]/30 hover:bg-white/10 transition-all duration-400 ease-premium-out">
                  <CheckCircleIcon className="h-6 w-6 text-[#47BD79] mr-3 flex-shrink-0" />
                  <span className="text-white/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link
            href={safePrimaryCTA.href}
            className="inline-flex items-center justify-center px-10 py-5 bg-[#47BD79] text-white font-bold text-lg rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_40px_rgba(71,189,121,0.5)] group"
          >
            {safePrimaryCTA.label}
            <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {secondaryCTA && secondaryCTA.href && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center px-10 py-5 bg-white/10 backdrop-blur-glass-medium text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-600 ease-premium-out border border-white/30 hover:border-[#47BD79]/50 hover:shadow-[0_0_25px_rgba(71,189,121,0.2)]"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/5 backdrop-blur-glass-light rounded-2xl p-6 border border-[#47BD79]/20 hover:border-[#47BD79]/40 hover:bg-white/10 transition-all duration-600 ease-premium-out hover:shadow-[0_0_20px_rgba(71,189,121,0.2)]">
            <div className="text-3xl font-bold text-[#47BD79] mb-2">1-3 Weeks</div>
            <div className="text-white/80">Launch Time</div>
            <div className="text-white/50 text-sm">From setup to go-live</div>
          </div>
          <div className="bg-white/5 backdrop-blur-glass-light rounded-2xl p-6 border border-[#A855F7]/20 hover:border-[#A855F7]/40 hover:bg-white/10 transition-all duration-600 ease-premium-out hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <div className="text-3xl font-bold text-[#A855F7] mb-2">5+</div>
            <div className="text-white/80">Industries Supported</div>
            <div className="text-white/50 text-sm">From day one</div>
          </div>
          <div className="bg-white/5 backdrop-blur-glass-light rounded-2xl p-6 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 hover:bg-white/10 transition-all duration-600 ease-premium-out hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <div className="text-3xl font-bold text-[#3B82F6] mb-2">5+</div>
            <div className="text-white/80">Industries</div>
            <div className="text-white/50 text-sm">Live with custom automations</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm mb-4">
            Join thousands of businesses already transforming their operations
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-[#47BD79]" />
              Setup fees may vary by product.
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-[#47BD79]" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-2 text-[#47BD79]" />
              Canadian data residency
            </div>
          </div>

          {/* Ad Landing Page Link */}
          <div className="mt-8">
            <Link
              href="/ads"
              className="inline-flex items-center text-[#47BD79] hover:text-[#5fd492] transition-colors duration-400 ease-premium-out text-sm font-medium"
            >
              See Our Full Offering
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

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
