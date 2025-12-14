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

const stats = [
  {
    id: 1,
    metric: "7×",
    label: "Faster Lead Response",
    source: "Average improvement",
    color: "emerald",
    textColor: "text-emerald-600"
  },
  {
    id: 2,
    metric: "40-60%",
    label: "Less Admin Time",
    source: "Across all industries",
    color: "blue",
    textColor: "text-blue-600"
  },
  {
    id: 3,
    metric: "1-3 Weeks",
    label: "Launch Time",
    source: "From setup to go-live",
    color: "purple",
    textColor: "text-purple-600"
  },
  {
    id: 4,
    metric: "5+",
    label: "Industries Supported",
    source: "From day one",
    color: "orange",
    textColor: "text-orange-600"
  }
];

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
    color: "purple",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    buttonBg: "bg-purple-600",
    buttonHover: "hover:bg-purple-700"
  },
  {
    id: 2,
    title: "TimeGuard AI",
    description: "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    icon: CalendarIcon,
    features: ["24/7 appointment scheduling", "Automated lead filtering", "Message handling", "Time protection"],
    cta: "Try TimeGuard AI",
    href: "/solutions/timeguard-ai",
    color: "emerald",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600",
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700"
  },
  {
    id: 3,
    title: "OMG AI Mastery",
    description: "A practical AI learning hub that teaches individuals and teams how to talk to AI properly, build reusable systems, and save hours every week.",
    icon: AcademicCapIcon,
    features: ["AI prompt training", "Reusable system building", "Team training programs", "Time-saving strategies"],
    cta: "Try OMG AI Mastery",
    href: "/apps/omg-ai-mastery",
    color: "amber",
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
    buttonBg: "bg-amber-600",
    buttonHover: "hover:bg-amber-700"
  },
  {
    id: 4,
    title: "Marketing Agency",
    description: "Done-for-you marketing services that help you grow your business with professional ad management, branding, and content development.",
    icon: MegaphoneIcon,
    features: ["Ads Management", "Branding & Creative", "Content Development", "Done-for-you service"],
    cta: "Explore Ads Management",
    href: "/marketing/ads-management",
    color: "orange",
    bgColor: "bg-orange-100",
    textColor: "text-orange-600",
    buttonBg: "bg-orange-600",
    buttonHover: "hover:bg-orange-700"
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
    <section ref={ref as React.RefObject<HTMLElement>} id="benefits" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business with
            <span className="text-blue-600"> Intelligent Automation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of businesses already using OMGsystems to automate workflows, 
            capture leads, and scale operations effortlessly.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ${
                isInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${stat.textColor}`}>
                  {stat.metric}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02] ${
                isInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } ${activeBenefit === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.textColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {benefit.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={benefit.href}
                    className={`inline-flex items-center px-6 py-3 ${benefit.buttonBg} text-white font-semibold rounded-lg ${benefit.buttonHover} transition-colors group`}
                  >
                    {benefit.cta}
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Proven Results Across Industries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <div
                key={outcome.id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ${
                  isInView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center mb-4">
                  <outcome.icon className={`w-8 h-8 text-${outcome.color}-600`} />
                </div>
                <div className={`text-3xl font-bold text-${outcome.color}-600 mb-2`}>
                  {outcome.metric}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {outcome.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
