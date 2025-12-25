"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  LightBulbIcon,
  CubeTransparentIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  CogIcon,
  ArrowPathIcon,
  SparklesIcon,
  FireIcon,
  XCircleIcon,
  WrenchScrewdriverIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  FunnelIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function HowItWorksPage() {
  const approachDifferences = [
    {
      label: "Tactics-first",
      description: "Random campaigns, disconnected channels, reactive decisions",
      isNegative: true,
    },
    {
      label: "Systems-first",
      description: "Aligned strategy, connected execution, data-driven optimization",
      isNegative: false,
    },
  ];

  const whatMakesDifferent = [
    {
      title: "We Don't Start With Tactics",
      description:
        "Before ads, content, or creative, we focus on market clarity, positioning and messaging, funnel logic, and readiness for scale. This ensures execution supports growth — not noise.",
    },
    {
      title: "We Design for Maturity, Not Speed",
      description:
        "We don't rush businesses into advanced tactics before they're ready. Each phase of our work builds on the previous one. That's why we operate within a tiered growth model instead of one-size-fits-all services.",
    },
  ];

  const growthJourney = [
    {
      name: "Ignite",
      tagline: "Foundation",
      description:
        "Build the foundation: strategy, positioning, and core systems.",
      color: "amber",
    },
    {
      name: "Flow",
      tagline: "Consistency",
      description:
        "Create consistency: aligned channels, execution rhythm, and performance tracking.",
      color: "rose",
    },
    {
      name: "Scale",
      tagline: "Optimization",
      description:
        "Optimize and expand: automation, refinement, and accelerated growth.",
      color: "purple",
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Discovery & Strategy",
      description:
        "We assess your business, market, goals, and current marketing maturity. This is where we define what should be built — and what shouldn't.",
      icon: MagnifyingGlassIcon,
    },
    {
      number: "2",
      title: "System Design",
      description:
        "We map the marketing system: channels, workflows, infrastructure, and measurement. Everything is intentional.",
      icon: CogIcon,
    },
    {
      number: "3",
      title: "Execution",
      description:
        "We implement and manage the system across relevant channels — with structure, consistency, and accountability.",
      icon: RocketLaunchIcon,
    },
    {
      number: "4",
      title: "Optimization & Scale",
      description:
        "We analyze performance, refine what works, and expand strategically. Growth decisions are data-informed, not reactive.",
      icon: ArrowPathIcon,
    },
  ];

  const whatWeBuild = [
    {
      title: "Positioning & Messaging Frameworks",
      description: "Clear market positioning and messaging that resonates with your target audience.",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      title: "Paid Acquisition Systems",
      description: "Google, Meta, LinkedIn — strategic ad campaigns with tracking and optimization.",
      icon: PresentationChartLineIcon,
    },
    {
      title: "SEO & Organic Growth",
      description: "Content infrastructure, keyword strategies, and organic distribution systems.",
      icon: DocumentTextIcon,
    },
    {
      title: "Websites & Landing Pages",
      description: "Conversion-focused pages designed to turn traffic into qualified leads.",
      icon: GlobeAltIcon,
    },
    {
      title: "Analytics & Reporting",
      description: "Tracking, attribution, and dashboards that show what's actually working.",
      icon: ChartBarIcon,
    },
    {
      title: "CRM & Automation Workflows",
      description: "Lead routing, nurture sequences, and sales handoff systems.",
      icon: FunnelIcon,
    },
  ];

  const goodFit = [
    "Are a founder, operator, or leadership team",
    "Want clarity, structure, and repeatability",
    "Are done experimenting with random tactics",
    "Understand marketing is an investment, not a quick fix",
    "Are looking for a long-term partner, not a vendor",
  ];

  const notAFit = [
    "Only want one-off campaigns",
    "Are shopping purely on price",
    "Want quick wins without foundations",
    "Expect marketing to work without internal alignment",
  ];

  const callExpectations = [
    "Assess your current marketing maturity",
    "Identify gaps and opportunities",
    "Discuss whether Ignite, Flow, or Scale makes sense",
    "Decide together if moving forward is the right step",
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements - spans entire content area */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6">
              <LightBulbIcon className="w-4 h-4" />
              How It Works
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              From Strategy to{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Scalable Growth
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Marketing doesn't fail because of effort. It fails because there's no structure behind it.
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              At OMG Marketing, we don't run isolated tactics. We design and operate marketing systems that support long-term growth. This page explains how we work, who we work best with, and what to expect when partnering with us.
            </p>
          </div>
        </div>

        {/* ===== PHILOSOPHY SECTION ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-4">
                <CubeTransparentIcon className="w-4 h-4" />
                Our Philosophy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Systems First.
                </span>{" "}
                Always.
              </h2>
              <p className="text-lg text-white/70 mb-6">
                Most agencies sell activities: ads, posts, designs, campaigns. We build systems that make those activities work together.
              </p>
              <p className="text-white/60 mb-6">
                A marketing system aligns:
              </p>
              <ul className="space-y-3 mb-8">
                {["Strategy and messaging", "Channels and execution", "Infrastructure and tracking", "Optimization and decision-making"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white/60 mb-8">
                Without a system, marketing is reactive. With a system, growth becomes predictable.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                Start the Conversation
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Right Content - Abstract System Visual */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
                <div className="space-y-4">
                  {["Strategy", "Execution", "Data", "Optimization"].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-4 hover:border-amber-500/40 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium">{item}</span>
                      {index < 3 && (
                        <ArrowRightIcon className="w-4 h-4 text-amber-400 ml-auto" />
                      )}
                      {index === 3 && (
                        <ArrowPathIcon className="w-4 h-4 text-amber-400 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>

        {/* ===== WHAT MAKES US DIFFERENT ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Makes Our Approach{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Copy */}
            <div className="flex flex-col gap-8">
              {whatMakesDifferent.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-500"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Right: Comparison Visual */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                {approachDifferences.map((approach, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border p-6 ${
                      approach.isNegative
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-emerald-500/30 bg-emerald-500/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {approach.isNegative ? (
                        <XCircleIcon className="w-6 h-6 text-red-400" />
                      ) : (
                        <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                      )}
                      <h4 className={`font-semibold ${approach.isNegative ? "text-red-400" : "text-emerald-400"}`}>
                        {approach.label}
                      </h4>
                    </div>
                    <p className="text-white/60 text-sm">{approach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== THE GROWTH JOURNEY ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Growth Journey
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-4">
              Ignite → Flow → Scale
            </p>
            <p className="text-white/60 max-w-2xl mx-auto">
              Every engagement fits within a structured progression.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/50 via-rose-500/50 to-purple-500/50 -translate-y-1/2" />

            <div className="grid lg:grid-cols-3 gap-8">
              {growthJourney.map((tier, index) => (
                <div key={index} className="relative">
                  {/* Arrow between tiers (Desktop) */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                      <ArrowRightIcon className="w-8 h-8 text-white/30" />
                    </div>
                  )}

                  <div className={`backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 text-center hover:border-amber-500/40 transition-all duration-500 h-full ${
                    index === 2 ? "lg:shadow-[0_0_40px_rgba(168,85,247,0.2)]" : ""
                  }`}>
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        tier.color === "amber"
                          ? "bg-amber-500/20"
                          : tier.color === "rose"
                          ? "bg-rose-500/20"
                          : "bg-purple-500/20"
                      }`}
                    >
                      {tier.color === "amber" && <SparklesIcon className="w-8 h-8 text-amber-400" />}
                      {tier.color === "rose" && <RocketLaunchIcon className="w-8 h-8 text-rose-400" />}
                      {tier.color === "purple" && <FireIcon className="w-8 h-8 text-purple-400" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                    <p
                      className={`font-medium mb-4 ${
                        tier.color === "amber"
                          ? "text-amber-400"
                          : tier.color === "rose"
                          ? "text-rose-400"
                          : "text-purple-400"
                      }`}
                    >
                      {tier.tagline}
                    </p>
                    <p className="text-white/60">{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 mb-6">
                Not every business should start at Scale. Sustainable growth requires building correctly, in order.
              </p>
            </div>
          </div>
        </div>

        {/* ===== 4-STEP PROCESS ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                4-Step Process
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              How We Execute — Step by Step
            </p>
          </div>

          <div className="relative">
            {/* Vertical Timeline Line (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-yellow-500/50 to-amber-500/50 -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] z-10">
                    {step.number}
                  </div>

                  <div className={`lg:w-[45%] ${index % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="lg:hidden w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                          {step.number}
                        </div>
                        <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/60">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== WHAT WE ACTUALLY BUILD ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-4">
              <WrenchScrewdriverIcon className="w-4 h-4" />
              System Components
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Actually{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Build
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our work lives inside systems. Depending on your stage, your marketing system may include:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeBuild.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/60">
              These are components, not standalone services. They are implemented as part of a larger growth architecture.
            </p>
          </div>
        </div>

        {/* ===== WHO THIS IS FOR ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who This Is{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                For
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              This clarity protects both sides.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Good Fit */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">We're a Strong Fit If You:</h3>
              </div>
              <ul className="space-y-4">
                {goodFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not a Fit */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <XCircleIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">And Not a Fit If You:</h3>
              </div>
              <ul className="space-y-4">
                {notAFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ===== WHAT TO EXPECT WHEN YOU APPLY ===== */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-4">
                <UserGroupIcon className="w-4 h-4" />
                What to Expect
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                A Focused, Intentional Process
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Our strategy calls are not sales pitches. They're structured conversations to determine mutual fit.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-white/70 mb-4 text-center">On the call, we:</p>
              <ul className="space-y-3 max-w-md mx-auto">
                {callExpectations.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-center text-white/60 italic">
              If we're not a fit, we'll tell you.
            </p>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build a Marketing System That Works?
          </h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            If you're serious about structure, clarity, and scalable growth, the next step is simple.
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Strategy calls are selective and designed for businesses ready to invest in long-term marketing systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Apply for a Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/marketing/tiers"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              View Marketing Tiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
