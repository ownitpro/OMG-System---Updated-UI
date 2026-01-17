// app/industries/real-estate/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getIndustryById } from "@/config/industries_config";
import { getAppsByIds } from "@/config/apps_config";
import {
  HomeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { LeadFormWrapper } from "@/components/forms";

const industry = getIndustryById("re");

export const metadata: Metadata = {
  title: "Real Estate Systems That Keep Every Lead, Client & Document on Track | OMGsystems",
  description: industry.summary,
  keywords: "real estate automation, real estate CRM, lead management, property management, real estate document management",
  openGraph: {
    title: "Real Estate Systems That Keep Every Lead, Client & Document on Track | OMGsystems",
    description: industry.summary,
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/real-estate",
  },
};

// Pain points data
const painPoints = [
  {
    icon: PhoneIcon,
    problem: "Leads slip through the cracks",
    solution: "Every inquiry captured, tagged, and followed up automatically",
  },
  {
    icon: DocumentTextIcon,
    problem: "Documents scattered everywhere",
    solution: "Offers, IDs, mortgage letters in one secure portal",
  },
  {
    icon: ClockIcon,
    problem: "Hours lost on manual follow-ups",
    solution: "Automated reminders for showings, conditions, and closings",
  },
  {
    icon: ChartBarIcon,
    problem: "No visibility into pipeline health",
    solution: "Real-time dashboards showing deals, revenue, and bottlenecks",
  },
];

// Workflow steps
const workflowSteps = [
  {
    step: "01",
    title: "Capture Every Lead",
    description: "Portal leads, social ads, website forms—all flow into one inbox with instant alerts.",
    icon: UserGroupIcon,
  },
  {
    step: "02",
    title: "Organize Your Pipeline",
    description: "Buyers, sellers, active deals—each in visual stages you can drag, filter, and track.",
    icon: BuildingOfficeIcon,
  },
  {
    step: "03",
    title: "Automate Follow-Ups",
    description: "Showing reminders, condition deadlines, closing prep—triggered automatically.",
    icon: ClockIcon,
  },
  {
    step: "04",
    title: "Close Faster",
    description: "All docs, signatures, and communications in one place. No chasing, no delays.",
    icon: CurrencyDollarIcon,
  },
];

// Results/outcomes
const outcomes = [
  { metric: "7×", label: "Faster follow-up on new inquiries" },
  { metric: "40-60%", label: "Less admin time per agent" },
  { metric: "100%", label: "Pipeline visibility at all times" },
  { metric: "0", label: "Leads falling through cracks" },
];

export default function RealEstateIndustryPage() {
  // Extract app IDs from the relation objects
  const appIds = (industry.recommendedApps ?? industry.apps ?? []).map(a => a.appId);
  const featuredApps = getAppsByIds(appIds);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ============================================
          1. HERO SECTION - Rising Buildings Animation
          ============================================ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-20 sm:pb-28">
        {/* SVG Rising Buildings Background Animation */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient for buildings */}
            <linearGradient id="buildingGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
            <linearGradient id="buildingGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.2)" />
              <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
            </linearGradient>
          </defs>

          {/* Animated building silhouettes rising from bottom */}
          <rect x="50" y="800" width="60" height="200" fill="url(#buildingGradient1)" opacity="0.4">
            <animate attributeName="y" from="800" to="600" dur="3s" fill="freeze" />
            <animate attributeName="opacity" from="0" to="0.4" dur="2s" fill="freeze" />
          </rect>
          <rect x="130" y="800" width="80" height="280" fill="url(#buildingGradient2)" opacity="0.3">
            <animate attributeName="y" from="800" to="520" dur="3.5s" fill="freeze" begin="0.3s" />
            <animate attributeName="opacity" from="0" to="0.3" dur="2s" fill="freeze" begin="0.3s" />
          </rect>
          <rect x="230" y="800" width="50" height="150" fill="url(#buildingGradient1)" opacity="0.35">
            <animate attributeName="y" from="800" to="650" dur="2.8s" fill="freeze" begin="0.6s" />
            <animate attributeName="opacity" from="0" to="0.35" dur="2s" fill="freeze" begin="0.6s" />
          </rect>

          {/* Right side buildings */}
          <rect x="900" y="800" width="70" height="220" fill="url(#buildingGradient2)" opacity="0.35">
            <animate attributeName="y" from="800" to="580" dur="3.2s" fill="freeze" begin="0.4s" />
            <animate attributeName="opacity" from="0" to="0.35" dur="2s" fill="freeze" begin="0.4s" />
          </rect>
          <rect x="990" y="800" width="90" height="300" fill="url(#buildingGradient1)" opacity="0.3">
            <animate attributeName="y" from="800" to="500" dur="3.8s" fill="freeze" begin="0.2s" />
            <animate attributeName="opacity" from="0" to="0.3" dur="2s" fill="freeze" begin="0.2s" />
          </rect>
          <rect x="1100" y="800" width="60" height="180" fill="url(#buildingGradient2)" opacity="0.4">
            <animate attributeName="y" from="800" to="620" dur="3s" fill="freeze" begin="0.5s" />
            <animate attributeName="opacity" from="0" to="0.4" dur="2s" fill="freeze" begin="0.5s" />
          </rect>

          {/* Floating property markers */}
          <g className="property-marker">
            <circle cx="400" cy="300" r="8" fill="#10B981" opacity="0.6">
              <animate attributeName="cy" values="300;280;300" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="300" r="16" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="16;28;16" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
          <g className="property-marker">
            <circle cx="750" cy="400" r="6" fill="#34D399" opacity="0.5">
              <animate attributeName="cy" values="400;380;400" dur="5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="750" cy="400" r="12" fill="none" stroke="#34D399" strokeWidth="2" opacity="0.25">
              <animate attributeName="r" values="12;24;12" dur="5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="5s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>
          <g className="property-marker">
            <circle cx="550" cy="500" r="5" fill="#6EE7B7" opacity="0.4">
              <animate attributeName="cy" values="500;485;500" dur="4.5s" repeatCount="indefinite" begin="2s" />
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4.5s" repeatCount="indefinite" begin="2s" />
            </circle>
            <circle cx="550" cy="500" r="10" fill="none" stroke="#6EE7B7" strokeWidth="2" opacity="0.2">
              <animate attributeName="r" values="10;20;10" dur="4.5s" repeatCount="indefinite" begin="2s" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="4.5s" repeatCount="indefinite" begin="2s" />
            </circle>
          </g>
        </svg>

        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] emerald-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/15 rounded-full blur-[100px] emerald-glow-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] emerald-glow-float" style={{ animationDelay: '1s' }} />

        {/* Floating Home Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] float-home" style={{ animationDelay: '0s' }}>
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center home-pulse">
              <HomeIcon className="w-6 h-6 text-emerald-400/70" />
            </div>
          </div>
          <div className="absolute top-[25%] right-[10%] float-home" style={{ animationDelay: '1.5s' }}>
            <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
              <BuildingOfficeIcon className="w-5 h-5 text-green-400/60" />
            </div>
          </div>
          <div className="absolute top-[50%] left-[5%] float-home" style={{ animationDelay: '3s' }}>
            <div className="w-10 h-10 rounded-full bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center">
              <HomeIcon className="w-4 h-4 text-emerald-300/50" />
            </div>
          </div>
          <div className="absolute top-[40%] right-[6%] float-home" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center home-pulse" style={{ animationDelay: '1s' }}>
              <BuildingOfficeIcon className="w-7 h-7 text-green-400/50" />
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-emerald-500/30 text-emerald-400 text-sm font-medium">
              <HomeIcon className="w-4 h-4" />
              Industry · Real Estate
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
              Real Estate Systems That Keep{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Every Lead, Client & Document
              </span>{" "}
              on Track
            </h1>
          </div>

          {/* Description */}
          <div className="text-center mb-10">
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              {industry.summary}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:from-emerald-400 hover:to-green-400 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25"
            >
              Talk about my systems
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/50 px-6 py-3 font-medium text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300"
            >
              Try live demos
            </Link>
          </div>

          {/* Outcomes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 text-center hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-1">
                  {outcome.metric}
                </div>
                <div className="text-sm text-white/60">{outcome.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          2. PAIN POINTS SECTION - Problems We Solve
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What we help real estate teams{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                fix
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From first contact to closing, your systems should support you—not slow you down.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-emerald-500/30 group-hover:to-green-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-red-400/80 text-sm font-medium mb-1 line-through decoration-red-400/50">
                        {item.problem}
                      </div>
                      <div className="text-white font-semibold flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        {item.solution}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          3. WORKFLOW STEPS - How It Works
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How it{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                works
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A simple workflow that keeps your real estate business moving.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500/30 to-emerald-500/50 md:-translate-x-0.5">
              {/* Animated particles */}
              <div className="timeline-particle-emerald w-3 h-3 bg-emerald-400 rounded-full -left-[5px] shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <div className="timeline-particle-emerald w-2.5 h-2.5 bg-emerald-500 rounded-full -left-[4px] shadow-[0_0_8px_rgba(16,185,129,0.6)]" style={{ animationDelay: '2.5s' }} />
            </div>

            <div className="space-y-12">
              {workflowSteps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`relative flex gap-6 md:gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Step Number */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center font-bold text-slate-950 flex-shrink-0 shadow-lg shadow-emerald-500/30">
                      {item.step}
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/40 transition-all duration-300 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          4. REAL STORY SECTION - Social Proof
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl border border-emerald-500/30 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium text-sm">Real story, real impact</span>
            </div>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              A small team moved from scattered spreadsheets and WhatsApp chats to one system for leads, deals, and documents. Within 90 days:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-white">7× faster follow-up on new inquiries</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-white">40–60% less admin time per agent</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span className="text-white">Cleaner pipeline and clearer monthly revenue picture</span>
              </li>
            </ul>

            <p className="text-emerald-300/80 font-medium">
              Same humans. Better systems.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          5. APPS SECTION - Featured Apps
          ============================================ */}
      {featuredApps.length > 0 && (
        <section className="py-20 sm:py-28 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Apps we plug into your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  real estate workflows
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                These apps are already wired to work together for real estate teams. You choose where to start; we connect the rest.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.href}
                  className="group relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Top Accent */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                  {/* Label + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                      {app.label}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-white/40">
                      {app.status === "live" ? "Live" : "Coming Soon"}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-medium text-emerald-300 mb-2">{app.tagline}</p>

                  {/* Summary */}
                  <p className="text-white/70 mb-4">{app.summary}</p>

                  {/* Industry-specific angle */}
                  <div className="text-sm text-white/50 mb-5">
                    {app.id === "crm" && (
                      <p>Track buyers, sellers, showings, offers, and conditions in one pipeline—with automated reminders.</p>
                    )}
                    {app.id === "svd" && (
                      <p>Offer docs, conditions, mortgage letters, IDs, and closing packages with PIN-protected portals.</p>
                    )}
                    {app.id === "leads" && (
                      <p>Turn portal leads, social ads, and website forms into a predictable flow of qualified buyers and sellers.</p>
                    )}
                    {app.id === "iq" && (
                      <p>Watch your pipeline, conversion rates, and market trends so you&apos;re always a step ahead.</p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Open {app.label} page</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300 group-hover:bg-emerald-500/30 transition-colors">
                      Learn more
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-green-500/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          6. RECOMMENDED STACK - Modern Design
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              Recommended Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How Real Estate teams usually run{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                OMGsystems
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The apps and solutions we pair together so your leads, showings, documents, and closings all flow in one system.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Apps Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-slate-900 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Core Apps</h3>
                  <p className="text-sm text-white/50">The foundation of your system</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "OMGCRM", href: "/apps/omgcrm", tagline: "Track buyers, sellers, and deals in visual pipelines" },
                  { name: "SecureVault Docs", href: "/apps/securevault-docs", tagline: "Offers, IDs, and closing packages in secure portals" },
                  { name: "OMG Leads", href: "/apps/leadflow-engine", tagline: "Capture portal leads and social ads automatically" },
                ].map((app, index) => (
                  <Link
                    key={index}
                    href={app.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors">{app.name}</h4>
                      <p className="text-sm text-white/50">{app.tagline}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-slate-900 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Solutions</h3>
                  <p className="text-sm text-white/50">Automation & strategy add-ons</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Automations", href: "/solutions/automations", tagline: "Connect your tools and automate follow-ups" },
                  { name: "Strategy Session", href: "/solutions/strategy-session", tagline: "1-on-1 planning to map your ideal workflow" },
                ].map((solution, index) => (
                  <Link
                    key={index}
                    href={solution.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-green-400 transition-colors">{solution.name}</h4>
                      <p className="text-sm text-white/50">{solution.tagline}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Optional Training Badge */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Optional: OMG AI Mastery</h4>
                    <p className="text-white/50 text-xs mt-1">Train your team to use AI tools for faster client communication and listing content.</p>
                    <Link href="/apps/omg-iq" className="text-emerald-400 text-xs font-medium hover:text-emerald-300 transition-colors mt-2 inline-block">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          7. FINAL CTA SECTION - Gradient Banner
          ============================================ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="re-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#re-grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Want this wired into your brokerage or team?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            We&apos;ll map your current lead sources, processes, and bottlenecks, then plug in OMGCRM, SecureVault Docs, OMG Leads, and OMG IQ where they make the biggest impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-emerald-600 shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Talk about my real estate systems
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full border-2 border-white/50 px-6 py-3.5 font-medium text-white hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Try CRM + SVD demos
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form Section - Emerald Theme */}
      <LeadFormWrapper
        variant="industries"
        colorScheme="emerald"
        customGradient="from-emerald-500 to-green-500"
        customShadow="shadow-emerald-500/30"
      />
    </main>
  );
}
