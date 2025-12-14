import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, CheckCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface LeadFlowStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface LeadFlowSectionProps {
  title: string;
  subtitle: string;
  steps: LeadFlowStep[];
  ctaText: string;
  ctaHref: string;
  problemPoints: string[];
  solutionPoints: string[];
  journeySteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
}

export function LeadFlowSection({
  title,
  subtitle,
  steps,
  ctaText,
  ctaHref,
  problemPoints,
  solutionPoints,
  journeySteps,
}: LeadFlowSectionProps) {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
          >
            {ctaText}
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Visual Flow */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    {step.icon || (
                      <span className="text-2xl font-bold text-blue-600">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRightIcon className="h-6 w-6 text-gray-400 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Problem/Solution/Journey Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Problem */}
          <div className="bg-red-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Problem</h3>
            </div>
            <ul className="space-y-4">
              {problemPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <LightBulbIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Solution</h3>
            </div>
            <p className="text-gray-700 mb-4">
              LeadFlow Engine™ connects your ad campaigns directly to your CRM with intelligent scoring, automated follow-ups, and conversion tracking. It acts like a sales team working 24/7.
            </p>
            <ul className="space-y-3">
              {solutionPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Journey */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Your 6-Step Journey</h3>
            </div>
            <div className="space-y-4">
              {journeySteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-blue-600">
                      {step.step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default LeadFlow data
export const defaultLeadFlowData: LeadFlowSectionProps = {
  title: "Stop Running Ads Blindly — Build a Predictable Lead Machine",
  subtitle: "OMGsystems' LeadFlow Engine™ turns your digital campaigns into a consistent stream of qualified clients—from first click to final sale.",
  steps: [
    {
      title: "Ads",
      description: "Targeted campaigns that reach your ideal customers",
      icon: "📱"
    },
    {
      title: "Leads",
      description: "Auto-capture and qualify every inquiry",
      icon: "👥"
    },
    {
      title: "CRM",
      description: "Seamless integration with intelligent scoring",
      icon: "💼"
    },
    {
      title: "Clients",
      description: "Convert leads into paying customers",
      icon: "💰"
    }
  ],
  ctaText: "Get Your LeadFlow Strategy Call",
  ctaHref: "/leadflow-strategy",
  problemPoints: [
    "Some months are great, then nothing — your lead flow is a rollercoaster",
    "You get dozens of contacts but most never buy",
    "You spend on ads but can't trace ROI",
    "Your CRM is full of leads that go nowhere",
    "You're manually following up with every lead and burning out",
    "Revenue is unpredictable"
  ],
  solutionPoints: [
    "20 qualified leads in first 7 days",
    "3× higher conversion rate",
    "60% less time spent on manual follow-up",
    "Predictable monthly lead flow"
  ],
  journeySteps: [
    {
      step: "Why it matters: you need clarity before scaling",
      title: "Analyze your current ad performance & find gaps",
      description: "Step 1: Understand your current situation"
    },
    {
      step: "Why it matters: right messaging, right audience = better leads",
      title: "Craft targeted campaigns",
      description: "Step 2: Create compelling ad content"
    },
    {
      step: "No lost leads, no manual data entry",
      title: "Auto-capture & tag leads into CRM",
      description: "Step 3: Seamless lead management"
    },
    {
      step: "Consistent follow-up builds trust & engages leads",
      title: "Automated nurture sequences",
      description: "Step 4: Build relationships automatically"
    },
    {
      step: "Your team focuses where it matters most",
      title: "Prioritize hot leads to sales",
      description: "Step 5: Convert qualified prospects"
    },
    {
      step: "Data-driven decisions = steady growth",
      title: "Track & optimize campaigns",
      description: "Step 6: Continuous improvement"
    }
  ]
};
