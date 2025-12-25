"use client";

import Link from "next/link";
import {
  RocketLaunchIcon,
  BanknotesIcon,
  ClockIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
  AdjustmentsHorizontalIcon,
  BeakerIcon,
  DocumentChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  MegaphoneIcon,
  CursorArrowRaysIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ServiceNav from "@/components/marketing/ServiceNav";

export default function AdsManagementPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const painPoints = [
    {
      icon: BanknotesIcon,
      title: "Money Down the Drain",
      description:
        "Throwing money at ads without knowing what's working is expensive and frustrating.",
    },
    {
      icon: ClockIcon,
      title: "No Time to Learn Platforms",
      description:
        "Facebook, Google, LinkedIn — each platform has its own rules, and they change constantly.",
    },
    {
      icon: ChartBarIcon,
      title: "Underwhelming Results",
      description:
        "You've tried boosting posts or running basic ads, but leads aren't coming in.",
    },
    {
      icon: PuzzlePieceIcon,
      title: "Too Many Moving Parts",
      description:
        "Audiences, creatives, budgets, bidding strategies — it's overwhelming without expertise.",
    },
  ];

  const services = [
    {
      icon: LightBulbIcon,
      title: "Custom Ad Strategy",
      description:
        "We analyze your business, audience, and goals to create a tailored advertising strategy that aligns with your growth objectives.",
      features: [
        "Market & competitor research",
        "Audience targeting blueprint",
        "Platform selection & budget allocation",
      ],
      large: true,
    },
    {
      icon: RocketLaunchIcon,
      title: "Professional Campaign Setup",
      description:
        "From pixel installation to campaign architecture, we build your ad infrastructure the right way from day one.",
      features: [
        "Tracking & pixel configuration",
        "Campaign structure optimization",
        "Ad creative development",
      ],
      large: true,
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: "Continuous Optimization",
      description:
        "We monitor performance daily and make data-driven adjustments to maximize your ROI.",
      large: false,
    },
    {
      icon: BeakerIcon,
      title: "Creative Testing",
      description:
        "Systematic testing of audiences, creatives, and copy to find winning combinations.",
      large: false,
    },
    {
      icon: DocumentChartBarIcon,
      title: "Clear Reporting",
      description:
        "Monthly reports that show exactly where your money goes and what results you're getting.",
      large: false,
    },
  ];

  const platforms = [
    { name: "Google Ads", subtitle: "Search, Display & YouTube" },
    { name: "Meta Ads", subtitle: "Facebook & Instagram" },
    { name: "LinkedIn Ads", subtitle: "B2B & Professional" },
    { name: "TikTok Ads", subtitle: "Short-Form Video" },
    { name: "Microsoft Ads", subtitle: "Bing & Partners" },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery Call",
      description:
        "We learn about your business, goals, current challenges, and ideal customers.",
      duration: "Week 1",
    },
    {
      number: "02",
      title: "Strategy Development",
      description:
        "Our team creates a custom ad strategy with targeting, messaging, and budget recommendations.",
      duration: "Week 1-2",
    },
    {
      number: "03",
      title: "Campaign Launch",
      description:
        "We build and launch your campaigns with proper tracking, creative assets, and optimized structure.",
      duration: "Week 2-3",
    },
    {
      number: "04",
      title: "Optimize & Scale",
      description:
        "Ongoing management, testing, and optimization to continuously improve performance and scale winners.",
      duration: "Ongoing",
    },
  ];

  const trustStats = [
    {
      number: "500+",
      label: "Campaigns Managed",
      description: "Across industries from e-commerce to B2B services",
    },
    {
      number: "3.2x",
      label: "Average ROAS",
      description: "Return on ad spend for our managed clients",
    },
    {
      number: "10+",
      label: "Years Combined Experience",
      description: "Our team has managed millions in ad spend",
    },
  ];

  const goodFit = [
    "You're spending $2,000+/month on ads (or ready to)",
    "You want to scale but don't have time to manage campaigns",
    "You need expert help to improve underperforming ads",
    "You want transparent reporting and clear communication",
  ];

  const notFit = [
    "You want to learn to manage ads yourself (we offer training separately)",
    "You need results overnight (ads require testing time)",
    "Budget under $1,000/month (minimum investment needed)",
  ];

  const faqs = [
    {
      question: "How much do I need to spend on ads?",
      answer:
        "We recommend a minimum of $2,000/month in ad spend to see meaningful results. Our management fee is separate from your ad budget.",
    },
    {
      question: "How long before I see results?",
      answer:
        "Most clients see initial data within 2-4 weeks. Optimization typically shows significant improvements by month 2-3 as we gather data and refine targeting.",
    },
    {
      question: "Do you create the ad creatives?",
      answer:
        "Yes, we handle creative direction and can produce ad copy and basic graphics. For complex video production, we work with your team or recommend partners.",
    },
    {
      question: "What platforms do you recommend?",
      answer:
        "It depends on your audience and goals. We'll analyze your business during our strategy phase and recommend the platforms that will deliver the best ROI for your specific situation.",
    },
    {
      question: "Can I see what you're doing in my ad accounts?",
      answer:
        "Absolutely. You maintain full ownership and access to your ad accounts at all times. We believe in complete transparency — you can see every campaign, ad, and dollar spent.",
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
              <linearGradient id="adsGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
              </linearGradient>
              <linearGradient id="adsGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
              </linearGradient>
            </defs>

            {/* Animated targeting circles */}
            <circle cx="300" cy="300" r="100" fill="none" stroke="url(#adsGradient1)" strokeWidth="1" opacity="0.4">
              <animate attributeName="r" values="100;130;100" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.6;0.4" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="300" r="60" fill="none" stroke="url(#adsGradient1)" strokeWidth="1" opacity="0.3">
              <animate attributeName="r" values="60;80;60" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="300" r="20" fill="rgba(59, 130, 246, 0.3)">
              <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx="900" cy="500" r="120" fill="none" stroke="url(#adsGradient2)" strokeWidth="1" opacity="0.3">
              <animate attributeName="r" values="120;150;120" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="500" r="70" fill="none" stroke="url(#adsGradient2)" strokeWidth="1" opacity="0.25">
              <animate attributeName="r" values="70;90;70" dur="5s" repeatCount="indefinite" />
            </circle>

            {/* Flowing particles */}
            {[...Array(12)].map((_, i) => (
              <circle
                key={i}
                cx={100 + i * 100}
                cy="400"
                r="3"
                fill="rgba(6, 182, 212, 0.5)"
              >
                <animate
                  attributeName="cy"
                  values="400;350;400"
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>

          {/* Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-[15%] animate-bounce" style={{ animationDuration: "3s" }}>
          <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <MegaphoneIcon className="w-7 h-7 text-blue-400/70" />
          </div>
        </div>
        <div className="absolute top-48 right-[20%] animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <CursorArrowRaysIcon className="w-6 h-6 text-cyan-400/70" />
          </div>
        </div>
        <div className="absolute bottom-32 left-[25%] animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-blue-400/70" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Service Navigation Links */}
          <ServiceNav />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-8">
            <RocketLaunchIcon className="w-4 h-4" />
            Done-For-You Ad Management
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Stop Guessing.
            </span>
            <br />
            <span className="text-white">Start Converting.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            We handle your entire ad strategy — from setup to optimization —
            so you can focus on closing deals, not managing campaigns.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              Get Your Free Ad Audit
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
              <ShieldCheckIcon className="w-4 h-4 text-blue-400" />
              Google Ads Certified
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-blue-400" />
              Meta Business Partner
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-blue-400" />
              500+ Campaigns Managed
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: PAIN POINTS ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Managing Ads Shouldn't Feel Like{" "}
              <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                Gambling
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              If any of these sound familiar, you're not alone — and there's a better way.
            </p>
          </div>

          {/* Pain Point Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-slate-900/60 rounded-xl border border-white/10 p-6 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{point.title}</h3>
                    <p className="text-sm text-white/60">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: SOLUTION INTRO ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                We Take Ads Off Your Plate —{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Completely
                </span>
              </h2>
              <p className="text-lg text-white/70 mb-6">
                Our Ads Management service gives you a dedicated team that handles
                everything — strategy, setup, creative direction, and ongoing optimization.
              </p>
              <p className="text-xl font-semibold text-white">
                You get the results. We handle the complexity.
              </p>
            </div>

            {/* Right Content - Feature Pills */}
            <div className="space-y-4">
              {[
                "Full-Service Management",
                "Multi-Platform Expertise",
                "Data-Driven Optimization",
                "Transparent Reporting",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-4 flex items-center gap-4 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WHAT'S INCLUDED - BENTO GRID ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Win with Paid Ads
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive ad management that covers every aspect of your paid advertising.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {/* Card 1 - Custom Ad Strategy - Large (2 cols, 2 rows) */}
            <div className="md:col-span-2 lg:row-span-2 group backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 p-6 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <LightBulbIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{services[0].title}</h3>
              <p className="text-white/70 mb-6 flex-grow">{services[0].description}</p>
              {services[0].features && (
                <ul className="space-y-3">
                  {services[0].features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-sm text-white/60">
                      <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Card 2 - Professional Campaign Setup (2 cols) */}
            <div className="md:col-span-2 group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <RocketLaunchIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{services[1].title}</h3>
              <p className="text-white/60 mb-4 flex-grow">{services[1].description}</p>
              {services[1].features && (
                <ul className="space-y-2">
                  {services[1].features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-white/50">
                      <CheckCircleIcon className="w-4 h-4 text-blue-400/70" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Card 3 - Continuous Optimization (1 col) */}
            <div className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{services[2].title}</h3>
              <p className="text-white/60">{services[2].description}</p>
            </div>

            {/* Card 4 - Creative Testing (1 col) */}
            <div className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col justify-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <BeakerIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{services[3].title}</h3>
              <p className="text-white/60">{services[3].description}</p>
            </div>

            {/* Card 5 - Clear Reporting (2 cols) */}
            <div className="md:col-span-2 group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DocumentChartBarIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{services[4].title}</h3>
                  <p className="text-white/60">{services[4].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PLATFORMS ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              One Team.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Every Platform.
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We manage your ads across all major platforms so you get consistent results everywhere.
            </p>
          </div>

          {/* Platform Cards */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                    <MegaphoneIcon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{platform.name}</h3>
                  <p className="text-xs text-white/50">{platform.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From Strategy to Scale in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                4 Steps
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our proven process ensures consistent results for every client.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50" />

            {/* Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Number Badge */}
                  <div className="relative z-10 w-12 h-12 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 text-center hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full mb-4">
                      {step.duration}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: TRUST STATS ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Businesses{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Trust Us
              </span>{" "}
              With Their Ad Spend
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {trustStats.map((stat, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 text-center hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>
                <p className="text-sm text-white/50">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: WHO THIS IS FOR ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perfect For Businesses{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Grow
              </span>
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Good Fit */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                This is for you if...
              </h3>
              <ul className="space-y-4">
                {goodFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not a Fit */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <XCircleIcon className="w-6 h-6 text-white/40" />
                This might not be the best fit if...
              </h3>
              <ul className="space-y-4">
                {notFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircleIcon className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                    <span className="text-white/50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: FAQ ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Common{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-slate-900/60 rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <ArrowRightIcon
                    className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="border-l-2 border-blue-500/30 pl-4">
                      <p className="text-white/70">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600" />

        {/* Animated Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Turn Ad Spend Into Revenue?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book a free strategy call. We'll review your current ads,
            identify opportunities, and show you exactly how we can help.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Book Your Free Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              View Our Case Studies
            </Link>
          </div>

          {/* Micro-copy */}
          <p className="text-sm text-white/70">
            No commitment required. Just actionable insights.
          </p>
        </div>
      </section>
    </div>
  );
}
