"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const metrics = [
  {
    icon: ClockIcon,
    value: "40-70%",
    label: "Reduced manual admin time",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: UserGroupIcon,
    value: "To minutes",
    label: "Cut onboarding time",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: ShieldCheckIcon,
    value: "Audit-ready logs",
    label: "Fewer missing documents",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: ChartBarIcon,
    value: "Scale clients",
    label: "Without extra hires",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export default function RealOutcomes() {
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
            
            // Animate count-up effect for percentage values
            if (metrics[index].value.includes('%')) {
              const targetValue = parseInt(metrics[index].value.replace('%', ''));
              let currentValue = 0;
              const increment = targetValue / 30;
              
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
            Real Outcomes You Can Measure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the measurable impact of automation on your accounting practice.
          </p>
          <p className="text-lg text-gray-500 mt-4">
            Less chasing, more doing!
          </p>
        </div>

        {/* Metrics Grid */}
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
                {metric.value.includes('%') && visibleMetrics.has(index) 
                  ? `${animatedValues[index]}%` 
                  : metric.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {metric.label}
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
