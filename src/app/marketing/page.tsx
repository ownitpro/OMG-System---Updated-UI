"use client";

import Link from "next/link";
import {
  RocketLaunchIcon,
  ChartBarIcon,
  CogIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  MegaphoneIcon,
  CubeTransparentIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  BanknotesIcon,
  DocumentTextIcon,
  UserGroupIcon,
  FireIcon,
  ArrowPathIcon,
  BeakerIcon,
  ChartPieIcon,
  CircleStackIcon,
  CommandLineIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

export default function MarketingPage() {
  const painPoints = [
    {
      icon: BanknotesIcon,
      title: "Burning cash on ads with no clear ROI",
      description:
        "You're spending money on ads but can't connect the spend to actual revenue. The numbers don't add up.",
    },
    {
      icon: DocumentTextIcon,
      title: "Endless content with no measurable impact",
      description:
        "You're posting, emailing, and creating — but leads aren't converting and you don't know why.",
    },
    {
      icon: UserGroupIcon,
      title: "Agencies chasing trends instead of results",
      description:
        "Your agency talks about impressions and engagement, but your pipeline stays empty.",
    },
  ];

  const capabilities = [
    {
      icon: LightBulbIcon,
      title: "Strategy",
      description: "Market positioning, competitive analysis, customer journey mapping",
      color: "emerald",
    },
    {
      icon: RocketLaunchIcon,
      title: "Execution",
      description: "Paid ads, content production, creative, email campaigns",
      color: "emerald",
    },
    {
      icon: CogIcon,
      title: "Systems",
      description: "Automation, CRM integration, lead routing, workflows",
      color: "emerald",
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: "Optimization",
      description: "A/B testing, analytics, continuous improvement cycles",
      color: "emerald",
    },
  ];

  const differentiators = [
    {
      icon: ChartPieIcon,
      title: "No fluff metrics",
      description: "We measure revenue, not vanity. If it doesn't drive results, we don't chase it.",
    },
    {
      icon: CubeTransparentIcon,
      title: "Cross-platform execution",
      description: "Not just one channel — we orchestrate campaigns across paid, organic, and email.",
    },
    {
      icon: CircleStackIcon,
      title: "Integrated with your stack",
      description: "We plug into your CRM, automation tools, and data sources for seamless operation.",
    },
    {
      icon: ArrowPathIcon,
      title: "Month-over-month optimization",
      description: "No set-and-forget. We analyze, test, and improve continuously.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery Call",
      description:
        "We learn about your business, goals, current challenges, and what success looks like for you.",
    },
    {
      number: "02",
      title: "Strategy Blueprint",
      description:
        "We create a custom marketing plan with clear KPIs, channel strategy, and timeline.",
    },
    {
      number: "03",
      title: "Launch & Execute",
      description:
        "We build and launch campaigns across your chosen channels with proper tracking in place.",
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description:
        "Data-driven improvements, scaling winners, cutting losers. Continuous growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-32 sm:pb-40">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="marketingGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                <stop offset="100%" stopColor="rgba(52, 211, 153, 0.1)" />
              </linearGradient>
              <linearGradient id="marketingGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(52, 211, 153, 0.2)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
              </linearGradient>
            </defs>

            {/* Network nodes representing marketing system */}
            <circle cx="200" cy="200" r="8" fill="rgba(16, 185, 129, 0.6)">
              <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="300" r="6" fill="rgba(52, 211, 153, 0.5)">
              <animate attributeName="r" values="6;9;6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="200" r="10" fill="rgba(16, 185, 129, 0.7)">
              <animate attributeName="r" values="10;14;10" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="350" r="7" fill="rgba(52, 211, 153, 0.6)">
              <animate attributeName="r" values="7;10;7" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="1000" cy="250" r="9" fill="rgba(16, 185, 129, 0.5)">
              <animate attributeName="r" values="9;13;9" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="500" r="6" fill="rgba(52, 211, 153, 0.4)">
              <animate attributeName="r" values="6;9;6" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="550" r="8" fill="rgba(16, 185, 129, 0.5)">
              <animate attributeName="r" values="8;11;8" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="500" r="7" fill="rgba(52, 211, 153, 0.6)">
              <animate attributeName="r" values="7;10;7" dur="3.8s" repeatCount="indefinite" />
            </circle>

            {/* Connecting lines */}
            <line x1="200" y1="200" x2="400" y2="300" stroke="url(#marketingGradient1)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="400" y1="300" x2="600" y2="200" stroke="url(#marketingGradient1)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="600" y1="200" x2="800" y2="350" stroke="url(#marketingGradient2)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite" />
            </line>
            <line x1="800" y1="350" x2="1000" y2="250" stroke="url(#marketingGradient2)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="500" x2="400" y2="300" stroke="url(#marketingGradient1)" strokeWidth="1" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="700" y1="550" x2="800" y2="350" stroke="url(#marketingGradient2)" strokeWidth="1" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5.5s" repeatCount="indefinite" />
            </line>
            <line x1="900" y1="500" x2="1000" y2="250" stroke="url(#marketingGradient1)" strokeWidth="1" opacity="0.2">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4.8s" repeatCount="indefinite" />
            </line>

            {/* Outer rings */}
            <circle cx="600" cy="400" r="200" fill="none" stroke="url(#marketingGradient1)" strokeWidth="1" opacity="0.2">
              <animate attributeName="r" values="200;230;200" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="400" r="300" fill="none" stroke="url(#marketingGradient2)" strokeWidth="0.5" opacity="0.15">
              <animate attributeName="r" values="300;340;300" dur="10s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-400/15 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-[15%] animate-bounce" style={{ animationDuration: "3s" }}>
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <MegaphoneIcon className="w-7 h-7 text-emerald-400/70" />
          </div>
        </div>
        <div className="absolute top-48 right-[20%] animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-emerald-400/70" />
          </div>
        </div>
        <div className="absolute bottom-32 left-[25%] animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <CursorArrowRaysIcon className="w-5 h-5 text-emerald-400/70" />
          </div>
        </div>
        <div className="absolute bottom-48 right-[15%] animate-bounce" style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}>
          <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-emerald-400/70" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
            <BoltIcon className="w-4 h-4" />
            Strategic Marketing Services
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-white">Marketing that</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              actually scales your business
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Stop running random campaigns. Build a marketing system that delivers
            predictable pipeline and measurable revenue growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Apply for Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              See How It Works
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              Strategy-First Approach
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              Data-Driven Execution
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              Measurable Results
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: THE REAL PROBLEM ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium mb-4">
              <ExclamationTriangleIcon className="w-4 h-4" />
              The Real Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Marketing fails without{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                structure, data, or real strategy
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Most businesses aren't getting results because they're doing marketing without a system.
            </p>
          </div>

          {/* Pain Point Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-slate-900/60 rounded-xl border border-white/10 p-6 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-500"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-sm text-white/60">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: OUR APPROACH ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
                <CubeTransparentIcon className="w-4 h-4" />
                Our Approach
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  System-Based
                </span>{" "}
                Marketing
              </h2>
              <p className="text-lg text-white/70 mb-6">
                We're not social media managers chasing likes. We're strategic operators
                who build marketing machines — predictable pipelines, data-backed decisions,
                and scalable acquisition systems.
              </p>
              <p className="text-white/60 mb-8">
                Every campaign is part of a larger system. Every metric ties back to revenue.
                Every optimization moves you closer to your goals.
              </p>

              {/* Key Points */}
              <div className="space-y-4">
                {[
                  "Predictable pipeline generation",
                  "Data-backed decision making",
                  "Scalable acquisition systems",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Strategy", icon: LightBulbIcon },
                    { label: "Execution", icon: RocketLaunchIcon },
                    { label: "Systems", icon: CogIcon },
                    { label: "Optimization", icon: AdjustmentsHorizontalIcon },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 text-center hover:border-emerald-500/40 transition-all duration-300"
                    >
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mb-3">
                        <item.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CORE CAPABILITIES ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Everything you need to build a marketing engine that drives real business growth.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <capability.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{capability.title}</h3>
                    <p className="text-white/60">{capability.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== SECTION 5: WHY OMG MARKETING ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Serious Operators
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Why businesses choose OMG for their marketing engine.
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <diff.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{diff.title}</h3>
                    <p className="text-sm text-white/60">{diff.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our proven process from strategy to scale.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-emerald-500/50" />

            {/* Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Number Badge */}
                  <div className="relative z-10 w-12 h-12 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 text-center hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-emerald-600" />

        {/* Animated Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to build a marketing system that scales?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Apply for a free strategy call to see if we're a fit.
            No pitch — just actionable insights for your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Apply Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              View Case Studies
            </Link>
          </div>

          {/* Micro-copy */}
          <p className="text-sm text-white/70">
            Limited availability — we only take on clients we can truly help.
          </p>
        </div>
      </section>
    </div>
  );
}
