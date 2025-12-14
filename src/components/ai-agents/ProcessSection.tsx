"use client";

import { useState, useEffect } from "react";
import { 
  MagnifyingGlassIcon, 
  CogIcon, 
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const steps = [
  {
    id: 1,
    title: "Discover & Define Your Agent's Role",
    description: "Business-process analysis",
    icon: MagnifyingGlassIcon,
    color: "blue",
    details: [
      "Identify bottlenecks",
      "Prioritise tasks & success metrics",
      "Map current workflows",
      "Define success criteria"
    ],
    visual: "🔍"
  },
  {
    id: 2,
    title: "Design & Connect Your Agent",
    description: "Map key integrations (CRM, Docs, Sheets, Email)",
    icon: CogIcon,
    color: "emerald",
    details: [
      "Configure logic, workflows",
      "Test & validate the setup",
      "Integrate with existing systems",
      "Set up monitoring and alerts"
    ],
    visual: "⚙️"
  },
  {
    id: 3,
    title: "Deploy & Optimise",
    description: "Go live fast",
    icon: RocketLaunchIcon,
    color: "purple",
    details: [
      "Monitor performance",
      "Continuous improvement & tracking",
      "Scale based on results",
      "Ongoing optimization"
    ],
    visual: "🚀"
  }
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  emerald: "from-emerald-500 to-emerald-600",
  purple: "from-purple-500 to-purple-600"
};

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works: Our Proven 3-Step Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From discovery to deployment, we guide you through every step
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            
            return (
              <div
                key={step.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(step.id)}
              >
                {/* Step Number */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">{step.id}</span>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className={`relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 ${
                  isActive ? 'ring-2 ring-emerald-500/50' : ''
                }`}>
                  {/* Visual Element */}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{step.visual}</div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                </div>

                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent transform translate-x-4">
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep >= step.id 
                    ? 'bg-emerald-400 scale-125' 
                    : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">Ready to start? Let's discover your agent's potential</span>
          </div>
        </div>
      </div>
    </section>
  );
}