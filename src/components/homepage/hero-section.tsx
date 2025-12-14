"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useInView } from '@/hooks/use-in-view';

// Dynamically import GalaxyBackground to avoid SSR issues with Three.js
const GalaxyBackground = dynamic(
  () => import('@/components/galaxy/galaxy-background-wrapper'),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />
  }
);

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
    <section ref={heroRef as React.RefObject<HTMLElement>} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <React.Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />}>
          <GalaxyBackground />
        </React.Suspense>
        {/* Lighter overlay to let galaxy shine through more */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        {/* Subtle radial gradient for focus - using multiple layers */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 100%)' }}></div>
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
            <h1 className="font-bold leading-tight mb-3 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] whitespace-nowrap" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', textShadow: '0 0 50px rgba(255, 255, 255, 0.3), 0 0 100px rgba(99, 102, 241, 0.4)' }}>
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
            <p className="text-gray-100 mb-5 leading-relaxed text-lg sm:text-xl drop-shadow-lg text-center" style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.6)' }}>
              {subhead}
            </p>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-3 mb-8 justify-center items-center transition-all duration-1000 ease-out ${
              isInView && mounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group shadow-2xl hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 text-sm"
            >
              {primaryCTA.label}
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/40 hover:border-white/60 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 text-sm"
              >
                {showVideo && videoUrl ? (
                  <>
                    <PlayIcon className="mr-2 h-4 w-4" />
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
            className={`flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 transition-all duration-1000 ease-out ${
              isInView && mounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-center bg-white/15 backdrop-blur-md px-5 py-3 rounded-full border border-green-400/30 shadow-[0_0_10px_rgba(74,222,128,0.3)] hover:bg-white/20 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)] transition-all duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
              <span className="font-medium text-gray-200">Trusted by 10,000+ businesses</span>
            </div>
            <div className="flex items-center bg-white/15 backdrop-blur-md px-5 py-3 rounded-full border border-blue-400/30 shadow-[0_0_10px_rgba(96,165,250,0.3)] hover:bg-white/20 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-all duration-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.6)]" style={{ animationDelay: '0.5s' }}></div>
              <span className="font-medium text-gray-200">Canadian data residency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Modern smooth animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10 animate-[bounce_2s_ease-in-out_infinite]">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-xs text-white/80 mt-2 text-center animate-[fade_3s_ease-in-out_infinite]">Scroll to explore</p>
      </div>
    </section>
  );
}
