"use client";

import { useState, useEffect } from "react";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

const caseStudies = [
  {
    id: 1,
    title: "Lead Qualification Agent",
    industry: "Real Estate",
    description: "Automatically qualifies leads based on budget, timeline & preferences",
    icon: HomeIcon,
    color: "blue",
    metrics: [
      { label: "40% faster response time", icon: ClockIcon },
      { label: "60% better lead quality", icon: ChartBarIcon },
      { label: "25% higher conversion rate", icon: UserGroupIcon }
    ],
    visual: "🏠"
  },
  {
    id: 2,
    title: "Invoice Alert Agent",
    industry: "Contractors",
    description: "Reminds overdue payments, escalates to management",
    icon: WrenchScrewdriverIcon,
    color: "emerald",
    metrics: [
      { label: "60% fewer overdue invoices", icon: CurrencyDollarIcon },
      { label: "30% faster payment processing", icon: ClockIcon },
      { label: "50% less manual follow-up time", icon: ChartBarIcon }
    ],
    visual: "🔧"
  },
  {
    id: 3,
    title: "Document Processing Agent",
    industry: "Healthcare",
    description: "Processes patient forms, extracts key info, routes tasks",
    icon: HeartIcon,
    color: "purple",
    metrics: [
      { label: "70% less manual data entry", icon: ChartBarIcon },
      { label: "45% faster patient processing", icon: ClockIcon },
      { label: "90% accuracy improvement", icon: UserGroupIcon }
    ],
    visual: "🏥"
  },
  {
    id: 4,
    title: "Property Management Agent",
    industry: "Property Management",
    description: "Handles tenant inquiries, schedules maintenance, tracks renewals",
    icon: BuildingOfficeIcon,
    color: "orange",
    metrics: [
      { label: "80% fewer routine inquiries", icon: UserGroupIcon },
      { label: "50% faster scheduling", icon: ClockIcon },
      { label: "35% increase in tenant satisfaction", icon: ChartBarIcon }
    ],
    visual: "🏢"
  }
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  emerald: "from-emerald-500 to-emerald-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600"
};

const bgColorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30",
  emerald: "bg-emerald-500/10 border-emerald-500/30",
  purple: "bg-purple-500/10 border-purple-500/30",
  orange: "bg-orange-500/10 border-orange-500/30"
};

export default function CaseStudiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="case-studies" className="py-24 md:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See AI Agents in Action: Real Business Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proven results across industries
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy, index) => {
            const Icon = caseStudy.icon;
            const isHovered = hoveredCase === caseStudy.id;

            return (
              <div
                key={caseStudy.id}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCase(caseStudy.id)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                {/* Case Study Header */}
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClasses[caseStudy.color as keyof typeof colorClasses]} flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm text-gray-400">— {caseStudy.industry}</p>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{caseStudy.visual}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {caseStudy.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  {caseStudy.metrics.map((metric, metricIndex) => {
                    const MetricIcon = metric.icon;
                    return (
                      <div key={metricIndex} className="flex items-center space-x-3">
                        <MetricIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{metric.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">Ready to see what your AI agent can do? Let's discuss your specific needs</span>
          </div>
        </div>
      </div>
    </section>
  );
}


