"use client";

import { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  CogIcon,
  LinkIcon,
  PlayIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const milestones = [
  {
    icon: MagnifyingGlassIcon,
    title: "Discovery",
    description: "Understand sites, teams & goals",
    step: "1",
  },
  {
    icon: CogIcon,
    title: "Configuration",
    description: "Tailor modules (schedule, invoice, review)",
    step: "2",
  },
  {
    icon: LinkIcon,
    title: "Integration",
    description: "Connect CRM + SecureVault Docs",
    step: "3",
  },
  {
    icon: PlayIcon,
    title: "Pilot",
    description: "Run first 2 weeks with live jobs",
    step: "4",
  },
  {
    icon: RocketLaunchIcon,
    title: "Go-Live",
    description: "System monitors, alerts, optimizes",
    step: "5",
  },
];

export default function ImplementationTimeline() {
  const [visibleMilestones, setVisibleMilestones] = useState<Set<number>>(new Set());
  const [activeMilestone, setActiveMilestone] = useState(0);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleMilestones(prev => new Set([...prev, index]));
            setActiveMilestone(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    milestoneRefs.current.forEach((ref) => {
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
            Typical onboarding: 1-3 weeks for small teams; 4-6 weeks for multi-site setups
          </p>
          <p className="text-lg text-emerald-600 font-medium mt-4">
            You're nearly ready for hands-off admin!
          </p>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between relative">
            {/* Progress bar */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-blue-400 w-0 transition-all duration-1000 ease-out"
                   style={{ width: visibleMilestones.size > 0 ? `${(visibleMilestones.size / milestones.length) * 100}%` : '0%' }}></div>
            </div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                ref={(el) => (milestoneRefs.current[index] = el)}
                data-index={index}
                className={`relative z-10 flex flex-col items-center text-center max-w-[200px] ${
                  visibleMilestones.has(index) ? 'animate-fade-in-up' : 'opacity-0'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  activeMilestone >= index 
                    ? 'bg-emerald-500 text-white shadow-lg scale-110' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <milestone.icon className="h-8 w-8" />
                </div>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {milestone.title}
                </div>
                <div className="text-xs text-gray-600">
                  {milestone.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => (milestoneRefs.current[index] = el)}
              data-index={index}
              className={`flex items-start space-x-4 ${
                visibleMilestones.has(index) ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                activeMilestone >= index 
                  ? 'bg-emerald-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <milestone.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {milestone.title}
                </div>
                <div className="text-sm text-gray-600">
                  {milestone.description}
                </div>
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
