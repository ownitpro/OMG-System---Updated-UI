"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function AdLandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "OMGsystems transformed our property management operations. We've saved 20+ hours per week and increased tenant satisfaction by 40%.",
      author: "Sarah Johnson",
      company: "Premier Property Management",
      industry: "Property Management",
      metrics: "20+ hours saved weekly, 40% satisfaction increase"
    },
    {
      quote: "The automation tools have revolutionized our real estate business. Lead follow-up is now instant and our conversion rate doubled.",
      author: "Mike Chen",
      company: "Elite Realty Group",
      industry: "Real Estate",
      metrics: "2x conversion rate, instant lead follow-up"
    },
    {
      quote: "Our accounting firm processes 3x more clients with the same staff. The workflow automation is incredible.",
      author: "Lisa Rodriguez",
      company: "Rodriguez & Associates",
      industry: "Accounting",
      metrics: "3x client capacity, same staff size"
    }
  ];

  const solutions = [
    {
      title: "AI Agents",
      description: "Intelligent automation that works 24/7",
      icon: SparklesIcon,
      href: "/solutions/ai-agents",
      features: ["Natural Language Processing", "Automated Decision Making", "24/7 Operation"]
    },
    {
      title: "Smart Automations",
      description: "Pre-built workflows that save time",
      icon: RocketLaunchIcon,
      href: "/automation/smart-automations",
      features: ["Lead Nurturing", "Invoice Processing", "Task Assignment"]
    },
    {
      title: "CRM System",
      description: "Complete customer relationship management",
      icon: UserGroupIcon,
      href: "/apps/crm",
      features: ["Contact Management", "Sales Pipeline", "Customer History"]
    },
    {
      title: "Lead Flow Engine",
      description: "Turn ads into qualified customers",
      icon: ChartBarIcon,
      href: "/apps/leadflow",
      features: ["Lead Capture", "Instant Follow-up", "ROI Tracking"]
    },
    {
      title: "SecureVault Docs",
      description: "Secure document management",
      icon: ShieldCheckIcon,
      href: "/apps/securevault",
      features: ["Document Security", "Compliance", "Easy Access"]
    },
    {
      title: "Content Engine",
      description: "Generate content at scale",
      icon: DocumentTextIcon,
      href: "/solutions/content-engine",
      features: ["SEO Content", "Multi-Platform", "Brand Consistency"]
    }
  ];

  const industries = [
    "Property Management",
    "Real Estate",
    "Contractors",
    "Accounting",
    "Healthcare",
    "Cleaning"
  ];

  const stats = [
    { value: "5+", label: "Industries Supported", description: "From day one" },
    { value: "500+", label: "Automations Deployed", description: "And growing" },
    { value: "99.9%", label: "Uptime Guarantee", description: "Reliable service" },
    { value: "24/7", label: "Support Available", description: "Always here to help" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section with proper spacing for fixed nav */}
      <section className="relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a1628] to-[#0f172a]" />

        {/* Animated glow orbs - blue theme */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-40 pb-20 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-blue-300 border border-blue-500/30">
              <RocketLaunchIcon className="w-4 h-4 mr-2" />
              Transform Your Business Today
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Stop Losing Money on
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              {" "}Manual Processes
            </span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto mb-8">
            Join 500+ businesses that have automated their operations, saved thousands of hours,
            and increased revenue with our industry-specific solutions.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-sm font-medium text-white/80">No Setup Fees</span>
            </div>
            <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-sm font-medium text-white/80">7-Day Free Trial</span>
            </div>
            <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-sm font-medium text-white/80">24/7 Support</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/industries#lead-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              Get Your Free Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300"
            >
              Try Live Demos
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white/80">{stat.label}</div>
                <div className="text-xs text-white/50">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section - Dark Theme */}
      <section className="py-20 bg-gradient-to-b from-[#0f172a] to-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}Automate Your Business
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              From AI-powered agents to custom workflows, we provide complete automation solutions
              tailored to your industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                href={solution.href}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-300">
                    <solution.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                </div>
                <p className="text-white/60 mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-white/50">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section - Dark Theme */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-white/60">
              Our solutions are tailored to the specific needs of your industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <Link
                key={index}
                href={`/industries/${industry.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{industry}</h3>
                  <ArrowRightIcon className="w-5 h-5 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-white/50">
                  Custom automation solutions designed specifically for {industry.toLowerCase()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dark Theme */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl text-white/60">
              See how our clients have transformed their operations
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 text-center">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="text-sm text-blue-400 font-semibold mb-2">
                {testimonials[currentTestimonial].metrics}
              </div>
            </div>
            <div className="border-t border-white/10 pt-6">
              <div className="font-semibold text-white">{testimonials[currentTestimonial].author}</div>
              <div className="text-white/60">{testimonials[currentTestimonial].company}</div>
              <div className="text-sm text-blue-400">{testimonials[currentTestimonial].industry}</div>
            </div>

            {/* Testimonial dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? 'bg-blue-400 w-6'
                      : 'bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Theme with Blue accent */}
      <section className="py-20 bg-[#0f172a] relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join hundreds of businesses that have already automated their operations and increased their revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/industries#lead-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
              >
                Get Your Free Strategy Call
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/try-live-demo"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 hover:border-blue-400/50 transition-all duration-300"
              >
                Try Live Demos
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" />
                7-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400 mr-2" />
                24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
