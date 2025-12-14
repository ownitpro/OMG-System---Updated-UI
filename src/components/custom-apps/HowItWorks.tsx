"use client";

import { useState, useEffect } from "react";
import { 
  CursorArrowRaysIcon, 
  Cog6ToothIcon, 
  RocketLaunchIcon,
  CheckCircleIcon 
} from "@heroicons/react/24/outline";

const steps = [
  {
    id: 1,
    title: "Choose Your App",
    description: "Pick from ready-made examples or start with a blank template.",
    icon: CursorArrowRaysIcon,
    color: "emerald",
    details: [
      "Browse our gallery of proven templates",
      "Start from scratch with a blank canvas",
      "Get inspiration from real-world examples",
      "Choose the perfect foundation for your needs"
    ]
  },
  {
    id: 2,
    title: "Customize & Configure",
    description: "Select features, integrations, and your branding—tailored to your workflow.",
    icon: Cog6ToothIcon,
    color: "blue",
    details: [
      "Configure app features and functionality",
      "Integrate with your existing tools",
      "Apply your brand colors and logo",
      "Set up user roles and permissions"
    ]
  },
  {
    id: 3,
    title: "We Build and Launch",
    description: "Our team develops your custom app and gets it running for you—fast.",
    icon: RocketLaunchIcon,
    color: "purple",
    details: [
      "Expert development team builds your app",
      "Quality assurance and testing",
      "Deploy to your preferred platform",
      "Training and ongoing support included"
    ]
  }
];

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600", 
  purple: "from-purple-500 to-purple-600"
};

const bgColorClasses = {
  emerald: "bg-emerald-500/10 border-emerald-500/30",
  blue: "bg-blue-500/10 border-blue-500/30",
  purple: "bg-purple-500/10 border-purple-500/30"
};

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            3-Step Visual Process
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
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {step.description}
                  </p>

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

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent transform translate-x-4"></div>
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
            <span className="text-white font-medium">Ready to start? Choose your app template above</span>
          </div>
        </div>
      </div>
    </section>
  );
}
