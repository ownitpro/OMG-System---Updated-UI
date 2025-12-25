"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useInView } from '@/hooks/use-in-view';

export interface HeroSectionProps {
  headline: string;
  subhead: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  showVideo?: boolean;
  videoUrl?: string;
}

export function HeroSection({
  headline,
  subhead,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  showVideo = false,
  videoUrl,
}: HeroSectionProps) {
  const { ref: heroRef, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={heroRef as React.RefObject<HTMLElement>} className="relative min-h-screen flex items-center justify-center bg-transparent">
      {/* Galaxy overlays - galaxy itself is rendered at page level */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Lighter overlay to let galaxy shine through more - no bottom fade to blend with metrics */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent via-50% to-transparent"></div>
        {/* Subtle radial gradient for focus */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.15) 100%)' }}></div>
      </div>

      {/* Fallback background image if provided */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content - Centered and Dynamic */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Headline - Modern animation with intersection observer */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isInView && mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h1
              className="font-bold leading-tight mb-3 bg-gradient-to-r from-white via-[#a8e6c3] to-[#47BD79] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(71,189,121,0.3)] whitespace-nowrap"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                textShadow: '0 0 50px rgba(71, 189, 121, 0.3), 0 0 100px rgba(71, 189, 121, 0.2)'
              }}
            >
              {headline}
            </h1>
          </div>

          {/* Subhead */}
          <div
            className={`max-w-3xl mx-auto transition-all duration-1000 ease-out ${
              isInView && mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <p
              className="text-white/90 mb-5 leading-relaxed text-lg sm:text-xl text-center font-medium"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 1), 0 4px 25px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.8)',
              }}
            >
              {subhead}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center transition-all duration-1000 ease-out ${
              isInView && mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#47BD79] text-white font-semibold rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out group shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)] hover:scale-105 active:scale-[0.98] text-base"
            >
              {primaryCTA.label}
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-glass-medium text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-600 ease-premium-out border-2 border-white/30 hover:border-[#47BD79]/50 shadow-lg hover:shadow-[0_0_25px_rgba(71,189,121,0.3)] hover:scale-105 active:scale-[0.98] text-base"
              >
                {showVideo && videoUrl ? (
                  <>
                    <PlayIcon className="mr-2 h-5 w-5" />
                    {secondaryCTA.label}
                  </>
                ) : (
                  secondaryCTA.label
                )}
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 text-sm transition-all duration-1000 ease-out ${
              isInView && mounted
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-center bg-black/60 backdrop-blur-glass-medium px-5 py-3 rounded-full border border-[#47BD79]/40 shadow-[0_0_15px_rgba(71,189,121,0.2)] hover:bg-black/70 hover:shadow-[0_0_25px_rgba(71,189,121,0.4)] hover:border-[#47BD79]/60 transition-all duration-600 ease-premium-out">
              <div className="w-2.5 h-2.5 bg-[#47BD79] rounded-full mr-2.5 animate-glow-pulse shadow-[0_0_10px_rgba(71,189,121,0.6)]"></div>
              <span className="font-semibold text-white">Trusted by 10,000+ businesses</span>
            </div>
            <div className="flex items-center bg-black/60 backdrop-blur-glass-medium px-5 py-3 rounded-full border border-[#A855F7]/40 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:bg-black/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:border-[#A855F7]/60 transition-all duration-600 ease-premium-out">
              <div className="w-2.5 h-2.5 bg-[#A855F7] rounded-full mr-2.5 animate-glow-pulse shadow-[0_0_10px_rgba(168,85,247,0.6)]" style={{ animationDelay: '0.5s' }}></div>
              <span className="font-semibold text-white">Canadian data residency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Modern smooth animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5 animate-[bounce_2s_ease-in-out_infinite]">
          <div className="w-1 h-3 bg-[#47BD79] rounded-full mt-2 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-xs text-white/60 mt-2 text-center">Scroll to explore</p>
      </div>
    </section>
  );
}
