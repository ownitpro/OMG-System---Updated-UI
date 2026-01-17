"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import { AppPairingsStrip } from "@/components/apps/AppPairingsStrip";
import { AppIndustriesStrip } from "@/components/apps/AppIndustriesStrip";
import { AppSolutionsStrip } from "@/components/apps/AppSolutionsStrip";
import { AppRelationsStrip } from "@/components/apps/AppRelationsStrip";
import {
  ArrowRightIcon,
  UserIcon,
  CheckCircleIcon,
  ChartBarIcon,
  BoltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  frustrations,
  steps,
  deliverables,
  proof,
  faqs,
  analytics,
  productStructuredData
} from "@/content/leadflow";

type Props = { app: AppConfig };

export function LeadsAppPage({ app }: Props) {
  const [currentLead, setCurrentLead] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Analytics tracking
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(analytics.view));
    }
  }, []);

  // Lead animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentLead((prev) => (prev + 1) % 6);
        setIsAnimating(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Build FAQPage JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const leadTypes = [
    { name: "Sarah M.", company: "TechCorp", type: "Enterprise", color: "blue" },
    { name: "Mike R.", company: "StartupXYZ", type: "SMB", color: "indigo" },
    { name: "Lisa K.", company: "Global Inc", type: "Enterprise", color: "slate" },
    { name: "David L.", company: "LocalBiz", type: "Local", color: "blue" },
    { name: "Emma S.", company: "ScaleUp", type: "Growth", color: "indigo" },
    { name: "John D.", company: "MegaCorp", type: "Enterprise", color: "slate" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Hero Section - Dark Blue theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content - Main Message */}
            <div className="text-white animate-in slide-in-from-left duration-1000 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <BoltIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-400 font-semibold text-lg">{app.label}</span>
              </div>

              <h1 className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                Capture & Convert
                <br />
                <span className="text-blue-400">Every Lead</span>
              </h1>

              <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
                {app.summary}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in slide-in-from-left duration-1000 delay-300">
                <Link
                  href="/try-live-demo?product=leadflow"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-900/40"
                >
                  <span className="mr-2">Try Live Demo</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 animate-in slide-in-from-left duration-1000 delay-500">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  Real-time capture
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  Smart qualification
                </div>
              </div>
            </div>

            {/* Right Content - Lead Flow Animation */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-200">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">

                {/* Lead Flow Animation Container */}
                <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">

                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800"></div>

                  {/* Incoming Leads Animation */}
                  <div className="absolute inset-4 bg-white/5 rounded-xl border border-white/20 overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white text-sm font-semibold">
                      Live Lead Capture
                    </div>

                    {/* Leads Container */}
                    <div className="p-4 h-full overflow-y-auto">
                      <div className="space-y-3">
                        {leadTypes.map((lead, index) => (
                          <div
                            key={index}
                            className={`bg-white/10 rounded-lg p-3 border border-white/20 transition-all duration-500 ${currentLead === index && isAnimating ? 'scale-105 bg-white/20 shadow-lg' : 'opacity-70'
                              }`}
                            style={{
                              animation: currentLead === index && isAnimating ? 'leadSlideIn 0.5s ease-out' : 'none'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 bg-${lead.color}-500 rounded-full flex items-center justify-center mr-3`}>
                                  <UserIcon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white text-sm font-medium">{lead.name}</div>
                                  <div className="text-gray-300 text-xs">{lead.company}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="text-xs text-gray-400 mr-2">{lead.type}</div>
                                {currentLead === index && isAnimating && (
                                  <CheckCircleIcon className="w-5 h-5 text-green-400 animate-pulse" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Success Counter */}
                  <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm rounded-lg p-2 border border-green-400/30">
                    <div className="flex items-center text-green-400 text-xs">
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      <span className="font-semibold">Verified</span>
                      <span className="ml-1">{currentLead + 1}/6</span>
                    </div>
                  </div>

                  {/* Flow Indicator */}
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg p-2 border border-blue-400/30">
                    <div className="flex items-center text-white text-xs">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="font-semibold">ACTIVE</span>
                      <span className="ml-2">Lead Flow Processing</span>
                    </div>
                  </div>

                  {/* Floating Success Icons */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>

                {/* Animation Description */}
                <div className="mt-6 text-center">
                  <p className="text-white/80 text-sm font-medium">Live Lead Processing</p>
                  <p className="text-white/60 text-xs mt-1">Real-time capture & verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Wavy divider at bottom - like CRM */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[360px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            {/* Define the wave path for reuse */}
            <defs>
              <path
                id="wavePath"
                d="M0,0 C150,100 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1150,60 1200,80"
              />
              {/* Glow filter for the dot */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Fill path */}
            <path
              d="M0,0 C150,100 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1150,60 1200,80 L1200,120 L0,120 Z"
              fill="#020617"
            />

            {/* Animated glowing dot */}
            <circle r="6" fill="#3B82F6" filter="url(#glow)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                keyPoints="0;1;0"
                keyTimes="0;0.5;1"
                calcMode="linear"
              >
                <mpath href="#wavePath" />
              </animateMotion>
            </circle>

            {/* Second dot with offset for trail effect */}
            <circle r="4" fill="#3B82F6" opacity="0.6" filter="url(#glow)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                keyPoints="0;1;0"
                keyTimes="0;0.5;1"
                calcMode="linear"
                begin="0.15s"
              >
                <mpath href="#wavePath" />
              </animateMotion>
            </circle>

            {/* Third dot for extended trail */}
            <circle r="2" fill="#3B82F6" opacity="0.3" filter="url(#glow)">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                keyPoints="0;1;0"
                keyTimes="0;0.5;1"
                calcMode="linear"
                begin="0.3s"
              >
                <mpath href="#wavePath" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </section>

      {/* Frustrations / Pain Points - Timeline Journey Style */}
      <section className="relative py-16 bg-slate-950">
        {/* Blue glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[150px] h-[300px] bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-[150px] h-[300px] bg-gradient-to-l from-blue-600/15 via-indigo-500/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-blue-600/8 via-indigo-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              We've heard this before
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Your journey from frustration to predictable growth
            </p>
          </div>

          {/* Timeline Journey - Blue (Solution) always LEFT, Red (Pain) always RIGHT */}
          <div className="relative pb-8">
            {/* Central timeline line - hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600/60 via-blue-600/40 to-indigo-600 rounded-full" style={{ height: 'calc(100% - 80px)' }} />

            {/* Timeline nodes */}
            <div className="space-y-8 md:space-y-0">
              {frustrations.map((frustration, index) => {
                const solutions = [
                  "Consistent Meta campaigns with predictable budget allocation",
                  "Smart qualification forms + lead scoring automation",
                  "Instant CRM sync + auto-reply within 60 seconds",
                  "Unified dashboard connecting ads → CRM → email",
                  "Real-time attribution dashboard tracking every dollar",
                  "Custom video creatives + tested hooks that convert"
                ];

                return (
                  <div
                    key={index}
                    className="relative flex flex-col md:flex-row items-center md:mb-16"
                  >
                    {/* Solution side (BLUE) - Always LEFT */}
                    <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pr-8 md:text-right">
                      <div className="bg-blue-600/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-600/30 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                        <div className="flex items-center mb-3 md:justify-end">
                          <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mr-3 md:mr-0 md:order-last md:ml-3">
                            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-blue-400">LeadFlow Solution</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">{solutions[index]}</p>
                      </div>
                    </div>

                    {/* Timeline node (center) */}
                    <div className="hidden md:flex w-2/12 justify-center relative z-10">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-red-500 p-0.5 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile node */}
                    <div className="flex md:hidden w-full justify-center my-4">
                      <div className="flex items-center">
                        <div className="h-0.5 w-8 bg-gradient-to-r from-blue-600 to-blue-600/50"></div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-red-500 p-0.5 mx-2">
                          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                        </div>
                        <div className="h-0.5 w-8 bg-gradient-to-r from-red-500/50 to-red-500"></div>
                      </div>
                    </div>

                    {/* Pain side (RED) - Always RIGHT */}
                    <div className="w-full md:w-5/12 md:pl-8 md:text-left">
                      <div className="bg-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center mb-3 md:justify-start">
                          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-white">{frustration.title}</h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">{frustration.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Journey end indicator - with proper spacing */}
            <div className="flex justify-center mt-16 pt-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full px-8 py-4 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <span className="text-white font-semibold text-lg">Predictable Growth Achieved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Bento Grid Layout */}
      <section className="relative py-20 bg-slate-950 overflow-hidden">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#A855F7]/10 via-purple-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-[#A855F7]/8 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            How it works
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Six steps from nothing to something.
          </p>

          {/* Desktop & Tablet: Bento Grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-4 auto-rows-[180px]">
              {/* Step 1 - Large card spanning 2 cols */}
              <div className="col-span-2 row-span-1 bg-gradient-to-br from-blue-600/20 to-blue-600/5 backdrop-blur-xl rounded-3xl p-6 border border-blue-600/30 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_30px_rgba(37,99,235,0.15)] group">
                <div className="flex items-start gap-4 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-1">Start Here</p>
                    <h3 className="text-xl font-bold text-white mb-2">{steps[0]?.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{steps[0]?.body}</p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Regular card */}
              <div className="col-span-1 row-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{steps[1]?.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{steps[1]?.body}</p>
                </div>
              </div>

              {/* Step 3 - Regular card */}
              <div className="col-span-1 row-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{steps[2]?.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{steps[2]?.body}</p>
                </div>
              </div>

              {/* Step 4 - Regular card */}
              <div className="col-span-1 row-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{steps[3]?.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{steps[3]?.body}</p>
                </div>
              </div>

              {/* Step 5 - Regular card */}
              <div className="col-span-1 row-span-1 bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{steps[4]?.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{steps[4]?.body}</p>
                </div>
              </div>

              {/* Step 6 - Large card spanning 2 cols (finish emphasis) */}
              <div className="col-span-2 row-span-1 bg-gradient-to-br from-blue-600/20 to-blue-600/5 backdrop-blur-xl rounded-3xl p-6 border border-blue-600/30 hover:border-blue-600/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_30px_rgba(37,99,235,0.15)] group">
                <div className="flex items-start gap-4 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-2xl">6</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-1">Final Step</p>
                    <h3 className="text-xl font-bold text-white mb-2">{steps[5]?.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{steps[5]?.body}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative pl-2">
              {/* Vertical line */}
              <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-600/60 to-blue-600/20 rounded-full" />

              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start mb-8 last:mb-0">
                  {/* Node */}
                  <div className={`rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center z-10 flex-shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)] ${index === 0 || index === 5 ? 'w-12 h-12' : 'w-10 h-10'}`}>
                    <span className={`text-white font-bold ${index === 0 || index === 5 ? 'text-lg' : ''}`}>{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="ml-4">
                    {(index === 0 || index === 5) && (
                      <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-1">
                        {index === 0 ? 'Start Here' : 'Final Step'}
                      </p>
                    )}
                    <h3 className={`font-bold text-white mb-1 ${index === 0 || index === 5 ? 'text-xl' : 'text-lg'}`}>{step.title}</h3>
                    <p className="text-sm text-white/60">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables - Slate 950 Theme */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-blue-600/10 via-indigo-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-blue-600/10 via-indigo-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gradient-to-br from-blue-600/8 via-indigo-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            What you get
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Clear handoffs, working assets, measurable outcomes.
          </p>

          {/* Horizontal Scroll Cards - Drag to scroll */}
          <div className="relative">
            {/* Left gradient fade - subtle */}
            <div className="absolute left-0 top-0 bottom-4 w-6 bg-gradient-to-r from-slate-950/80 to-transparent z-10 pointer-events-none" />

            <div
              className="flex gap-6 overflow-x-auto pb-4 px-2 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onMouseDown={(e) => {
                const el = e.currentTarget;
                el.dataset.isDown = 'true';
                el.dataset.startX = String(e.pageX - el.offsetLeft);
                el.dataset.scrollLeft = String(el.scrollLeft);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.dataset.isDown = 'false';
              }}
              onMouseUp={(e) => {
                e.currentTarget.dataset.isDown = 'false';
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                if (el.dataset.isDown !== 'true') return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - Number(el.dataset.startX)) * 1.5;
                el.scrollLeft = Number(el.dataset.scrollLeft) - walk;
              }}
            >
              {deliverables.map((deliverable, index) => (
                <div
                  key={index}
                  className="flex-none w-[300px] sm:w-[320px] bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 group"
                >
                  {/* Numbered badge + checkmark */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {deliverable.title}
                  </h3>

                  {/* Bullets as list */}
                  <ul className="space-y-2">
                    {deliverable.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right gradient fade - subtle */}
            <div className="absolute right-0 top-0 bottom-4 w-6 bg-gradient-to-l from-slate-950/80 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-4">
            <p className="text-sm text-white/40 flex items-center gap-2">
              <ArrowRightIcon className="w-4 h-4 rotate-180" />
              <span>Drag to explore</span>
              <ArrowRightIcon className="w-4 h-4" />
            </p>
          </div>
        </div>
      </section>

      {/* App Pairings Strip */}
      <AppPairingsStrip app={app} />

      {/* Proof & Results - Slate 950 Theme */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-blue-600/10 via-indigo-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-blue-600/10 via-indigo-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gradient-to-br from-blue-600/8 via-indigo-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Proof & results
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Real results from real businesses using LeadFlow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proof.quotes.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-blue-600/20 hover:border-blue-600/40 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.08)]"
              >
                <div className="flex text-blue-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed mb-6">
                  "{item.quote}"
                </p>
                <p className="text-blue-400 font-semibold">
                  — {item.cite}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Industries Strip */}
      <AppIndustriesStrip app={app} />

      {/* App Solutions Strip */}
      <AppSolutionsStrip app={app} />

      {/* App Relations Strip */}
      <AppRelationsStrip app={app} />

      {/* Final CTA - Slate 950 Theme */}
      <section className="relative py-20 bg-slate-950">
        {/* Multiple smaller blue glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80px] h-[120px] bg-gradient-to-r from-blue-600/15 via-indigo-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[80px] h-[120px] bg-gradient-to-l from-blue-600/15 via-indigo-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[120px] bg-gradient-to-br from-blue-600/12 via-indigo-500/8 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150px] h-[80px] bg-gradient-to-b from-blue-600/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[150px] h-[80px] bg-gradient-to-t from-blue-600/10 to-transparent rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to turn ads into clients on autopilot?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Onboarding typically completes in 1–3 weeks depending on complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-demo?app=leadflow"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/25"
            >
              Get Your LeadFlow Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl text-white border-2 border-blue-600 font-bold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/20"
            >
              Talk to Sales
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion Style */}
      <section className="relative py-16 bg-slate-950">
        {/* Blue glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-blue-600/8 via-indigo-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            Everything you need to know about LeadFlow.
          </p>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30"
              >
                {/* Question Header - Clickable */}
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${openFaqIndex === index ? 'bg-blue-600' : 'bg-white/10'
                      }`}>
                      <span className="text-white font-bold text-sm">?</span>
                    </div>
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${openFaqIndex === index ? 'text-blue-400' : 'text-white'
                      }`}>
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === index ? 'rotate-180 text-blue-400' : ''
                      }`}
                  />
                </button>

                {/* Answer - Collapsible */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-12 border-l-2 border-blue-600/30">
                      <p className="text-white/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
    </main>
  );
}
