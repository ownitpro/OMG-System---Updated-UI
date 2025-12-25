"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { 
  ClockIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CalendarIcon,
  AcademicCapIcon,
  MegaphoneIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const outcomes = [
  {
    id: 1,
    metric: "10,000+",
    label: "Businesses Served",
    icon: UserGroupIcon,
    color: "emerald"
  },
  {
    id: 2,
    metric: "99.9%",
    label: "Uptime Guarantee",
    icon: ClockIcon,
    color: "blue"
  },
  {
    id: 3,
    metric: "24/7",
    label: "Support Available",
    icon: StarIcon,
    color: "purple"
  }
];

const benefits = [
  {
    id: 1,
    title: "SecureVault Docs",
    description: "Secure document management with automated filing, sharing, and compliance tracking.",
    icon: ShieldCheckIcon,
    features: ["Secure document storage", "Automated filing", "Compliance tracking", "Team collaboration"],
    cta: "Try SecureVault Docs",
    href: "/apps/securevault-docs",
    color: "#A855F7",
    bgColor: "bg-[#A855F7]/20",
    textColor: "text-[#A855F7]",
    borderColor: "border-[#A855F7]/30",
    glowColor: "rgba(168, 85, 247, 0.3)",
    buttonBg: "bg-[#A855F7]",
    buttonHover: "hover:bg-[#9333ea]"
  },
  {
    id: 2,
    title: "TimeGuard AI",
    description: "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    icon: CalendarIcon,
    features: ["24/7 appointment scheduling", "Automated lead filtering", "Message handling", "Time protection"],
    cta: "Try TimeGuard AI",
    href: "/solutions/timeguard-ai",
    color: "#47BD79",
    bgColor: "bg-[#47BD79]/20",
    textColor: "text-[#47BD79]",
    borderColor: "border-[#47BD79]/30",
    glowColor: "rgba(71, 189, 121, 0.3)",
    buttonBg: "bg-[#47BD79]",
    buttonHover: "hover:bg-[#3da86a]"
  },
  {
    id: 3,
    title: "OMG AI Mastery",
    description: "A practical AI learning hub that teaches individuals and teams how to talk to AI properly, build reusable systems, and save hours every week.",
    icon: AcademicCapIcon,
    features: ["AI prompt training", "Reusable system building", "Team training programs", "Time-saving strategies"],
    cta: "Try OMG AI Mastery",
    href: "/apps/omg-ai-mastery",
    color: "#F59E0B",
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.3)",
    buttonBg: "bg-amber-500",
    buttonHover: "hover:bg-amber-600"
  },
  {
    id: 4,
    title: "Marketing Agency",
    description: "Done-for-you marketing services that help you grow your business with professional ad management, branding, and content development.",
    icon: MegaphoneIcon,
    features: ["Ads Management", "Branding & Creative", "Content Development", "Done-for-you service"],
    cta: "Explore Ads Management",
    href: "/marketing/ads-management",
    color: "#3B82F6",
    bgColor: "bg-[#3B82F6]/20",
    textColor: "text-[#3B82F6]",
    borderColor: "border-[#3B82F6]/30",
    glowColor: "rgba(59, 130, 246, 0.3)",
    buttonBg: "bg-[#3B82F6]",
    buttonHover: "hover:bg-[#2563eb]"
  }
];

export default function HomepageBenefitsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveBenefit(prev => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="benefits" className="py-20 bg-black relative overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Background glow orbs - positioned away from edges */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transform Your Business with
            <span className="text-[#47BD79]"> Intelligent Automation</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join thousands of businesses already using OMGsystems to automate workflows,
            capture leads, and scale operations effortlessly.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`flex flex-col h-full bg-white/5 backdrop-blur-glass-light rounded-2xl p-8 border ${benefit.borderColor} hover:bg-white/10 transition-all duration-600 ease-premium-out hover:scale-[1.02] hover:-translate-y-1 ${
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } ${activeBenefit === index ? `ring-2 ring-offset-2 ring-offset-[#1f1e1e]` : ''}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                boxShadow: activeBenefit === index ? `0 0 25px ${benefit.glowColor}` : `0 0 15px ${benefit.glowColor}`,
                ringColor: benefit.color
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400 ease-premium-out group-hover:scale-110`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.textColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 mb-4">
                    {benefit.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-[#47BD79] flex-shrink-0" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA - pushed to bottom with mt-auto on the outer flex-col */}
              <div className="mt-auto pt-6">
                <Link
                  href={benefit.href}
                  className={`inline-flex items-center px-6 py-3 ${benefit.buttonBg} text-white font-semibold rounded-xl ${benefit.buttonHover} transition-all duration-400 ease-premium-out group shadow-lg hover:shadow-xl hover:scale-[1.02]`}
                >
                  {benefit.cta}
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Proven Results Across Industries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => {
              const colorMap: Record<string, { text: string; glow: string }> = {
                emerald: { text: 'text-[#47BD79]', glow: 'rgba(71, 189, 121, 0.3)' },
                blue: { text: 'text-[#3B82F6]', glow: 'rgba(59, 130, 246, 0.3)' },
                purple: { text: 'text-[#A855F7]', glow: 'rgba(168, 85, 247, 0.3)' }
              };
              const colors = colorMap[outcome.color] || colorMap.emerald;

              return (
                <div
                  key={outcome.id}
                  className={`bg-white/5 backdrop-blur-glass-light rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-600 ease-premium-out hover:scale-105 ${
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    boxShadow: `0 0 20px ${colors.glow}`
                  }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <outcome.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div className={`text-3xl font-bold ${colors.text} mb-2`}>
                    {outcome.metric}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {outcome.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
