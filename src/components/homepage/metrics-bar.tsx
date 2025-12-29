"use client";

import React from 'react';
import { useInView } from '@/hooks/use-in-view';

export interface Metric {
  value: string;
  label: string;
  description?: string;
  color?: string;
}

interface MetricsBarProps {
  metrics: Metric[];
  className?: string;
}

// Color configurations for metrics
const metricColors = [
  { text: 'text-[#47BD79]', glow: 'rgba(71, 189, 121, 0.3)' },
  { text: 'text-[#3B82F6]', glow: 'rgba(59, 130, 246, 0.3)' },
  { text: 'text-[#A855F7]', glow: 'rgba(168, 85, 247, 0.3)' },
  { text: 'text-orange-400', glow: 'rgba(251, 146, 60, 0.3)' },
];

export function MetricsBar({ metrics, className = '' }: MetricsBarProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-transparent relative overflow-hidden ${className}`}
    >
      {/* Smooth gradient that fades to solid black at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#47BD79]/8 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#A855F7]/8 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, index) => {
            const colorConfig = metricColors[index % metricColors.length];
            return (
              <div
                key={index}
                className={`text-center p-4 lg:p-6 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.06] transition-all duration-600 ease-premium-out hover:scale-[1.02] ${
                  isInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: isInView ? `0 0 30px ${colorConfig.glow.replace('0.3', '0.15')}` : 'none'
                }}
              >
                <div className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${colorConfig.text} mb-2 lg:mb-3 whitespace-nowrap`}>
                  {metric.value}
                </div>
                <div className="text-sm lg:text-base font-semibold text-white mb-1 lg:mb-2">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="text-sm text-white/50">
                    {metric.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Default metrics for OMGsystems
export const defaultMetrics: Metric[] = [
  {
    value: '7×',
    label: 'Faster Lead Response',
    description: 'Average improvement'
  },
  {
    value: '40-60%',
    label: 'Less Admin Time',
    description: 'Across all industries'
  },
  {
    value: '1-3 Weeks',
    label: 'Launch Time',
    description: 'From setup to go-live'
  },
  {
    value: '5+',
    label: 'Industries Supported',
    description: 'From day one'
  }
];
