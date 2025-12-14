"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserPlusIcon,
  CalendarIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: UserPlusIcon,
    title: "Lead lands",
    description: "Captured via campaign or inbound contact",
    step: "1",
  },
  {
    icon: CalendarIcon,
    title: "Books visit",
    description: "Live availability for virtual or in-person appointments",
    step: "2",
  },
  {
    icon: DocumentTextIcon,
    title: "Intake & e-sign",
    description: "Dynamic forms and optional identity verification",
    step: "3",
  },
  {
    icon: ClipboardDocumentListIcon,
    title: "Visit & summary",
    description: "Auto-generated notes and task extraction post-visit",
    step: "4",
  },
  {
    icon: FolderIcon,
    title: "Docs filed",
    description: "Checklist completes as required documents arrive",
    step: "5",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Claims submitted",
    description: "Eligibility verified, claim submitted, denial management",
    step: "6",
  },
  {
    icon: ChartBarIcon,
    title: "Dashboards",
    description: "Real-time throughput, issues and SLA monitoring",
    step: "7",
  },
];

export default function HowCareFlowWorks() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [activeStep, setActiveStep] = useState(0);
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            From booking to billing to better outcomes.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how CareFlow handles every step of your healthcare workflow.
          </p>
        </div>

        {/* Desktop: Horizontal stepper */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between relative">
            {/* Connection line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-blue-400 w-0 transition-all duration-1000 ease-out"
                   style={{ width: visibleSteps.size > 0 ? `${(visibleSteps.size / steps.length) * 100}%` : '0%' }}></div>
            </div>

            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                data-index={index}
                className={`relative z-10 flex flex-col items-center text-center max-w-[150px] ${
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
                  {step.title}
                </div>
                <div className="text-xs text-gray-600">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical sequence */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
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

        {/* Microcopy */}
        <div className="mt-12 text-center">
          <p className="text-lg text-emerald-600 font-medium">
            You're one click away from better outcomes.
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
