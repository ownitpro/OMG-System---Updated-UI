"use client";

import { ShieldCheckIcon, SparklesIcon, CogIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: "Bank-Level Security",
    description: "AES-256 encryption + Canadian data residency",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: SparklesIcon,
    title: "Smart Organization",
    description: "AI-powered document categorization & auto-tagging",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: CogIcon,
    title: "Automated Workflows",
    description: "Request → e-sign → archive with one click",
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: DocumentCheckIcon,
    title: "Audit-Ready",
    description: "Full audit logs, compliance evidence, instant reporting",
    color: "text-indigo-600",
    bgColor: "bg-indigo-500/10",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You Get with SecureVault Docs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of intelligent document management designed for your industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-emerald-700 font-medium">
              All features included in your 5-minute demo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
