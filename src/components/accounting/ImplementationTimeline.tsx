"use client";

import { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  CogIcon,
  LinkIcon,
  RocketLaunchIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const timelineSteps = [
  {
    icon: MagnifyingGlassIcon,
    title: "Discovery & Blueprint",
    description: "Map workflows & identify automation opportunities",
    step: "1",
  },
  {
    icon: CogIcon,
    title: "Configuration",
    description: "Set up templates, checklists & integration points",
    step: "2",
  },
  {
    icon: LinkIcon,
    title: "Integration & Import",
    description: "Connect systems, migrate priority data",
    step: "3",
  },
  {
    icon: RocketLaunchIcon,
    title: "Pilot",
    description: "Test with select clients, refine processes",
    step: "4",
  },
  {
    icon: ChartBarIcon,
    title: "Go-Live & Optimize",
    description: "Full rollout, ongoing monitoring & optimisation",
    step: "5",
  },
];

export default function ImplementationTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSteps(prev => new Set([...prev, index]));
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Implementation Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Typical firm onboarding completes in weeks; modules can roll-out in phases.
          </p>
        </div>

        {/* Desktop: Progress bar timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((activeStep + 1) / timelineSteps.length) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between">
              {timelineSteps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => (stepRefs.current[index] = el)}
                  data-index={index}
                  className={`flex flex-col items-center text-center max-w-[200px] ${
                    visibleSteps.has(index) ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    activeStep >= index 
                      ? 'bg-emerald-500 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    Step {step.step}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-8">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              data-index={index}
              className={`flex items-start space-x-4 ${
                visibleSteps.has(index) ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                activeStep >= index 
                  ? 'bg-emerald-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <step.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-emerald-600 mb-1">
                  Step {step.step}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {step.title}
                </div>
                <div className="text-sm text-gray-600">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            <span className="font-semibold">Most firms start with 2-3 modules</span> and expand over time.
          </p>
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
