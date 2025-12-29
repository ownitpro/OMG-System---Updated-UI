"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection, HeroSectionProps } from './hero-section';
import { MetricsBar, Metric } from './metrics-bar';

// Dynamically import GalaxyBackground to avoid SSR issues with Three.js
const GalaxyBackground = dynamic(
  () => import('@/components/galaxy/galaxy-background-wrapper'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />
  }
);

interface HeroWithGalaxyProps {
  heroProps: HeroSectionProps;
  metrics: Metric[];
}

export function HeroWithGalaxy({ heroProps, metrics }: HeroWithGalaxyProps) {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Black background base */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* Galaxy Background - contained within hero and metrics only */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <GalaxyBackground />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <HeroSection {...heroProps} />
      </div>

      {/* Metrics Bar - Galaxy particles visible behind */}
      <div className="relative z-10">
        <MetricsBar metrics={metrics} />
      </div>
    </div>
  );
}
