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
    <div className="relative overflow-visible">
      {/* Galaxy Background rendered at wrapper level to span both sections */}
      <div className="absolute inset-x-0 z-0 pointer-events-none" style={{ top: '-25vh', height: '200vh' }}>
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
