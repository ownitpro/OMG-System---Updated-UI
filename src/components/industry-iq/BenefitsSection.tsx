"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  LightBulbIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: ChartBarIcon,
    title: "Vertical Benchmarks",
    description: "See where your business stands against others in your industry. Compare. Improve. Repeat.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: LightBulbIcon,
    title: "Predictive Insights",
    description: "Use AI to predict revenue, churn, and growth. Make smart moves—before your competitors do.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: CpuChipIcon,
    title: "Unified Data Hub",
    description: "Connect CRM, docs, operations—all in one place. No more hunting for information.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: RocketLaunchIcon,
    title: "Quick-Start Setup",
    description: "Pick your industry, launch dashboards instantly. No complex setup required.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: BoltIcon,
    title: "Lightning Fast Onboarding",
    description: "Get started in minutes. Our support team is with you at every step.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
];

export default function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Why Choose Industry IQ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business data into actionable intelligence that drives growth and competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${benefit.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${benefit.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
            Trusted by 10,000+ businesses across 20+ industries
          </div>
        </div>
      </div>
    </section>
  );
}