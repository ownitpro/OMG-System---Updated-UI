"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const metrics = [
  {
    icon: ArrowUpIcon,
    value: "45%",
    label: "Faster Lead Response",
    description: "automated follow-up & scheduling",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: ArrowUpIcon,
    value: "30%",
    label: "Listing Engagement",
    description: "AI-driven property marketing",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: ArrowDownIcon,
    value: "50%",
    label: "Admin Time",
    description: "contracts auto-filled from CRM data",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: ArrowUpIcon,
    value: "35%",
    label: "Referral Rate",
    description: "client nurture + review automation",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export default function PerformanceMetrics() {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<number>>(new Set());
  const [animatedValues, setAnimatedValues] = useState<number[]>(new Array(metrics.length).fill(0));
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleMetrics(prev => new Set([...prev, index]));
            
            // Animate count-up effect
            const targetValue = parseInt(metrics[index].value.replace('%', ''));
            let currentValue = 0;
            const increment = targetValue / 30; // 30 frames for smooth animation
            
            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
              }
              setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.floor(currentValue);
                return newValues;
              });
            }, 50);
          }
        });
      },
      { threshold: 0.3 }
    );

    metricRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Key Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the measurable impact of automation on your real estate business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              ref={(el) => (metricRefs.current[index] = el)}
              data-index={index}
              className={`
                bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                ${visibleMetrics.has(index) ? 'animate-fade-in-up' : 'opacity-0'}
              `}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${metric.bgColor} ${metric.color} mb-4`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {visibleMetrics.has(index) ? `${animatedValues[index]}%` : '0%'}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {metric.label}
              </div>
              <div className="text-sm text-gray-600">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
