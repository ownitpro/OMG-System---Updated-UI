"use client";

import { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
  ArrowRightIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const caseStudies = [
  {
    id: 1,
    title: "Property Management Success",
    industry: "Property Management",
    icon: BuildingOfficeIcon,
    color: "blue",
    challenge: "Manual lead management and tenant communication",
    solution: "Automated lead scoring and tenant portal",
    results: [
      { metric: "40%", label: "Faster Lead Response" },
      { metric: "60%", label: "Reduced Admin Time" },
      { metric: "25%", label: "Higher Tenant Satisfaction" }
    ],
    testimonial: "",
    company: "",
    cta: "View Industry Solutions",
    href: "/case-studies#property-management"
  },
  {
    id: 2,
    title: "Real Estate Brokerage Growth",
    industry: "Real Estate",
    icon: HomeIcon,
    color: "emerald",
    challenge: "Scattered lead sources and manual follow-ups",
    solution: "Unified CRM with automated nurturing sequences",
    results: [
      { metric: "3x", label: "More Qualified Leads" },
      { metric: "50%", label: "Faster Deal Closure" },
      { metric: "35%", label: "Higher Conversion Rate" }
    ],
    testimonial: "",
    company: "",
    cta: "View Industry Solutions",
    href: "/case-studies#real-estate"
  },
  {
    id: 3,
    title: "Contractor Business Optimization",
    industry: "Contractors",
    icon: WrenchScrewdriverIcon,
    color: "orange",
    challenge: "Manual quote generation and project tracking",
    solution: "Automated quoting and project management system",
    results: [
      { metric: "45 min", label: "Quote Generation Time" },
      { metric: "32%", label: "Higher Close Rate" },
      { metric: "50%", label: "Faster Project Delivery" }
    ],
    testimonial: "",
    company: "",
    cta: "View Industry Solutions",
    href: "/case-studies#contractors"
  },
  {
    id: 4,
    title: "Accounting Firm Efficiency",
    industry: "Accounting",
    icon: CalculatorIcon,
    color: "purple",
    challenge: "Manual data entry and client communication",
    solution: "Automated data processing and client portal",
    results: [
      { metric: "2 weeks", label: "Integration Time" },
      { metric: "99.9%", label: "Report Accuracy" },
      { metric: "70%", label: "Reduced Manual Work" }
    ],
    testimonial: "",
    company: "",
    cta: "View Industry Solutions",
    href: "/case-studies#accounting"
  }
];

export default function HomepageCaseStudiesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase(prev => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="case-studies" className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how businesses across different industries are transforming their operations
            with OMGsystems automation solutions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((caseStudy, index) => {
            // Color mapping for consistent styling
            const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
              blue: { bg: 'bg-[#3B82F6]/10', border: 'border-[#3B82F6]/20', text: 'text-[#3B82F6]', glow: 'rgba(59, 130, 246, 0.15)' },
              emerald: { bg: 'bg-[#47BD79]/10', border: 'border-[#47BD79]/20', text: 'text-[#47BD79]', glow: 'rgba(71, 189, 121, 0.15)' },
              orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', glow: 'rgba(249, 115, 22, 0.15)' },
              purple: { bg: 'bg-[#A855F7]/10', border: 'border-[#A855F7]/20', text: 'text-[#A855F7]', glow: 'rgba(168, 85, 247, 0.15)' },
              red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', glow: 'rgba(239, 68, 68, 0.15)' },
              teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400', glow: 'rgba(20, 184, 166, 0.15)' }
            };
            const colors = colorMap[caseStudy.color] || colorMap.blue;

            return (
              <div
                key={caseStudy.id}
                className={`flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl p-8 border ${colors.border} hover:bg-white/10 transition-all duration-600 ease-premium-out ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                } ${activeCase === index ? 'ring-2 ring-[#47BD79] scale-[1.02]' : ''}`}
                style={{ animationDelay: `${index * 100}ms`, boxShadow: `0 0 30px ${colors.glow}` }}
              >
                {/* Industry Badge */}
                <div className="flex items-center space-x-2 mb-4">
                  <caseStudy.icon className={`w-5 h-5 ${colors.text}`} />
                  <span className={`text-sm font-semibold ${colors.text} ${colors.bg} px-3 py-1 rounded-full border ${colors.border}`}>
                    {caseStudy.industry}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {caseStudy.title}
                </h3>

                {/* Challenge & Solution */}
                <div className="mb-6">
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-red-400 mb-1">Challenge:</h4>
                    <p className="text-sm text-white/60">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#47BD79] mb-1">Solution:</h4>
                    <p className="text-sm text-white/60">{caseStudy.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {caseStudy.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="text-center">
                      <div className={`text-2xl font-bold ${colors.text}`}>
                        {result.metric}
                      </div>
                      <div className="text-xs text-white/50">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial - Only show if testimonial exists */}
                {caseStudy.testimonial && (
                  <div className={`${colors.bg} rounded-lg p-3 mb-4 border ${colors.border}`}>
                    <p className="text-sm text-white/70 italic">
                      "{caseStudy.testimonial}"
                    </p>
                    {caseStudy.company && (
                      <div className="text-xs text-white/50 mt-2">
                        — {caseStudy.company}
                      </div>
                    )}
                  </div>
                )}

                {/* CTA - pushed to bottom with mt-auto */}
                <div className="mt-auto pt-4">
                  <Link
                    href={caseStudy.href}
                    className={`inline-flex items-center w-full justify-center px-4 py-2 ${colors.bg} ${colors.text} font-semibold rounded-lg border ${colors.border} hover:bg-white/10 transition-all duration-400 ease-premium-out group`}
                  >
                    {caseStudy.cta}
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry Overview - Interactive Orbit */}
        <div className="relative py-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Trusted Across Industries
            </h3>
            <p className="text-white/60">
              From property management to healthcare, we help businesses automate their workflows
            </p>
          </div>

          {/* Orbit Container */}
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] mx-auto">
            {/* Orbit Ring */}
            <div className="absolute inset-8 md:inset-10 rounded-full border border-[#47BD79]/30" />

            {/* Second subtle ring */}
            <div className="absolute inset-12 md:inset-16 rounded-full border border-[#47BD79]/10" />

            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#47BD79] to-[#3da86a] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(71,189,121,0.5)] z-20">
              <span className="text-white font-bold text-lg md:text-xl">OMG</span>
            </div>

            {/* Orbiting Icons - positioned using absolute coordinates */}
            {caseStudies.map((caseStudy, index) => {
              const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
                blue: { bg: 'bg-[#3B82F6]/20', text: 'text-[#3B82F6]', border: 'border-[#3B82F6]/50', shadow: 'shadow-[#3B82F6]/30' },
                emerald: { bg: 'bg-[#47BD79]/20', text: 'text-[#47BD79]', border: 'border-[#47BD79]/50', shadow: 'shadow-[#47BD79]/30' },
                orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50', shadow: 'shadow-orange-500/30' },
                purple: { bg: 'bg-[#A855F7]/20', text: 'text-[#A855F7]', border: 'border-[#A855F7]/50', shadow: 'shadow-[#A855F7]/30' },
                red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50', shadow: 'shadow-red-500/30' },
                teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/50', shadow: 'shadow-teal-500/30' }
              };
              const colors = colorMap[caseStudy.color] || colorMap.blue;
              // Calculate delay: each item is offset by (index/total) of the duration
              const duration = 45; // seconds
              const delay = -((index / caseStudies.length) * duration);

              return (
                <div
                  key={caseStudy.id}
                  className="absolute orbit-item group cursor-pointer"
                  style={{
                    animationDelay: `${delay}s`,
                  }}
                  onClick={() => setActiveCase(index)}
                >
                  {/* Icon + Label - NO rotation, stays upright */}
                  <div className="flex flex-col items-center">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 ${colors.bg} backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border ${colors.border} shadow-lg ${colors.shadow} ${activeCase === index ? 'ring-2 ring-white/50 scale-110' : ''}`}
                    >
                      <caseStudy.icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.text}`} />
                    </div>
                    {/* Label */}
                    <span className={`mt-2 text-[10px] md:text-xs font-medium whitespace-nowrap ${activeCase === index ? colors.text : 'text-white/70'}`}>
                      {caseStudy.industry}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Orbit Animation - icons move in circle but stay upright (no rotation) */}
          <style jsx>{`
            .orbit-item {
              --radius: 130px;
              left: 50%;
              top: 50%;
              animation: orbit-path 45s linear infinite;
            }
            @media (min-width: 768px) {
              .orbit-item {
                --radius: 170px;
              }
            }
            @keyframes orbit-path {
              0% { transform: translate(-50%, -50%) translate(0px, calc(var(--radius) * -1)); }
              8.33% { transform: translate(-50%, -50%) translate(calc(var(--radius) * 0.5), calc(var(--radius) * -0.866)); }
              16.67% { transform: translate(-50%, -50%) translate(calc(var(--radius) * 0.866), calc(var(--radius) * -0.5)); }
              25% { transform: translate(-50%, -50%) translate(var(--radius), 0px); }
              33.33% { transform: translate(-50%, -50%) translate(calc(var(--radius) * 0.866), calc(var(--radius) * 0.5)); }
              41.67% { transform: translate(-50%, -50%) translate(calc(var(--radius) * 0.5), calc(var(--radius) * 0.866)); }
              50% { transform: translate(-50%, -50%) translate(0px, var(--radius)); }
              58.33% { transform: translate(-50%, -50%) translate(calc(var(--radius) * -0.5), calc(var(--radius) * 0.866)); }
              66.67% { transform: translate(-50%, -50%) translate(calc(var(--radius) * -0.866), calc(var(--radius) * 0.5)); }
              75% { transform: translate(-50%, -50%) translate(calc(var(--radius) * -1), 0px); }
              83.33% { transform: translate(-50%, -50%) translate(calc(var(--radius) * -0.866), calc(var(--radius) * -0.5)); }
              91.67% { transform: translate(-50%, -50%) translate(calc(var(--radius) * -0.5), calc(var(--radius) * -0.866)); }
              100% { transform: translate(-50%, -50%) translate(0px, calc(var(--radius) * -1)); }
            }
          `}</style>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center px-8 py-4 bg-[#47BD79] text-white font-bold rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)] group"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            View All Success Stories
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
