"use client";

import React from 'react';
import { useInView } from '@/hooks/use-in-view';

interface Metric {
  value: string;
  label: string;
  description?: string;
}

interface MetricsBarProps {
  metrics: Metric[];
  className?: string;
}

export function MetricsBar({ metrics, className = '' }: MetricsBarProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`py-12 bg-gradient-to-b from-gray-50 to-white border-y border-gray-200/50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`text-center transition-all duration-700 ease-out ${
                isInView 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                {metric.value}
              </div>
              <div className="text-base font-semibold text-gray-900 mb-2">
                {metric.label}
              </div>
              {metric.description && (
                <div className="text-sm text-gray-600">
                  {metric.description}
                </div>
              )}
            </div>
          ))}
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
