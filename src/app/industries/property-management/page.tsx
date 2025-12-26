// app/industries/property-management/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getIndustryById } from "@/config/industries_config";
import { getAppsByIds } from "@/config/apps_config";
import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  HomeModernIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

const industry = getIndustryById("pm");

export const metadata: Metadata = {
  title: "Property Management Automation | OMGsystems",
  description: industry.summary,
  keywords: "property management automation, tenant management, owner statements, maintenance workflows, property management software",
  openGraph: {
    title: "Property Management Automation | OMGsystems",
    description: industry.summary,
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/property-management",
  },
};

// Pain points data
const painPoints = [
  {
    icon: BellAlertIcon,
    problem: "Tenant requests lost in email chaos",
    solution: "Every request tracked, assigned, and resolved in one system",
  },
  {
    icon: DocumentTextIcon,
    problem: "Hours spent on owner reporting",
    solution: "Automated statements and updates sent on schedule",
  },
  {
    icon: WrenchScrewdriverIcon,
    problem: "Maintenance coordination headaches",
    solution: "Work orders auto-routed to vendors with real-time tracking",
  },
  {
    icon: ClipboardDocumentListIcon,
    problem: "Lease renewals slipping through",
    solution: "Automatic reminders and renewal workflows triggered early",
  },
];

// Workflow steps
const workflowSteps = [
  {
    step: "01",
    title: "Centralize Everything",
    description: "Tenants, owners, units, and documents—all organized in one dashboard you can access anywhere.",
    icon: BuildingOffice2Icon,
  },
  {
    step: "02",
    title: "Automate Communications",
    description: "Owner updates, tenant notices, and maintenance alerts sent automatically on your schedule.",
    icon: BellAlertIcon,
  },
  {
    step: "03",
    title: "Streamline Maintenance",
    description: "Requests come in, get triaged, assigned to vendors, and tracked to completion—hands-free.",
    icon: WrenchScrewdriverIcon,
  },
  {
    step: "04",
    title: "Scale Your Portfolio",
    description: "Add properties without adding chaos. Your systems grow with you.",
    icon: ChartBarIcon,
  },
];

// Key benefits
const keyBenefits = [
  {
    icon: DocumentTextIcon,
    title: "Owner Statements & Payouts",
    description: "Generate statements automatically, send by email, and speed up payout processing.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Maintenance & Work-Order Routing",
    description: "Ticket intake → auto-assign vendor → real-time updates for streamlined service.",
  },
  {
    icon: UserGroupIcon,
    title: "Tenant & Owner Portals",
    description: "Self-service portals for tenants & owners reduce calls and manual work.",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics & Benchmarking",
    description: "See occupancy trends, cost per unit, and owner profitability at a glance.",
  },
];

// Results/outcomes
const outcomes = [
  { metric: "60%", label: "Less time on owner reporting" },
  { metric: "3x", label: "Faster maintenance resolution" },
  { metric: "100%", label: "Visibility across your portfolio" },
  { metric: "0", label: "Missed lease renewals" },
];

export default function PropertyManagementPage() {
  // Extract app IDs from the relation objects
  const appIds = (industry.recommendedApps ?? industry.apps ?? []).map(a => a.appId);
  const featuredApps = getAppsByIds(appIds);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ============================================
          1. HERO SECTION - Property Grid Animation
          ============================================ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-20 sm:pb-28">
        {/* SVG Property Grid Background Animation */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient for buildings */}
            <linearGradient id="pmBuildingGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(14, 165, 233, 0.3)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
            </linearGradient>
            <linearGradient id="pmBuildingGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </linearGradient>
            {/* Window glow */}
            <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated building blocks - left side */}
          <g className="pm-building-group">
            <rect x="30" y="500" width="80" height="300" fill="url(#pmBuildingGradient1)" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
            </rect>
            {/* Windows */}
            <rect x="45" y="520" width="15" height="12" fill="#0EA5E9" opacity="0.6" filter="url(#windowGlow)">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </rect>
            <rect x="75" y="520" width="15" height="12" fill="#38BDF8" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </rect>
            <rect x="45" y="550" width="15" height="12" fill="#0EA5E9" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.5s" repeatCount="indefinite" begin="1s" />
            </rect>
            <rect x="75" y="550" width="15" height="12" fill="#38BDF8" opacity="0.6" filter="url(#windowGlow)">
              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
            </rect>
          </g>

          <g className="pm-building-group">
            <rect x="130" y="450" width="100" height="350" fill="url(#pmBuildingGradient2)" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.6;0.4" dur="5s" repeatCount="indefinite" begin="1s" />
            </rect>
            {/* Windows row 1 */}
            <rect x="145" y="470" width="18" height="14" fill="#0EA5E9" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.8s" repeatCount="indefinite" />
            </rect>
            <rect x="180" y="470" width="18" height="14" fill="#38BDF8" opacity="0.4" filter="url(#windowGlow)">
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.2s" repeatCount="indefinite" begin="0.8s" />
            </rect>
            <rect x="215" y="470" width="18" height="14" fill="#0EA5E9" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.5s" repeatCount="indefinite" begin="1.5s" />
            </rect>
          </g>

          {/* Right side buildings */}
          <g className="pm-building-group">
            <rect x="950" y="480" width="90" height="320" fill="url(#pmBuildingGradient1)" opacity="0.45">
              <animate attributeName="opacity" values="0.35;0.55;0.35" dur="4.5s" repeatCount="indefinite" begin="0.5s" />
            </rect>
            <rect x="965" y="500" width="16" height="12" fill="#38BDF8" opacity="0.5" filter="url(#windowGlow)">
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" begin="0.3s" />
            </rect>
            <rect x="1000" y="500" width="16" height="12" fill="#0EA5E9" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.7s" repeatCount="indefinite" />
            </rect>
            <rect x="965" y="530" width="16" height="12" fill="#0EA5E9" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3.3s" repeatCount="indefinite" begin="0.7s" />
            </rect>
            <rect x="1000" y="530" width="16" height="12" fill="#38BDF8" opacity="0.5" filter="url(#windowGlow)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
            </rect>
          </g>

          <g className="pm-building-group">
            <rect x="1060" y="520" width="70" height="280" fill="url(#pmBuildingGradient2)" opacity="0.5">
              <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3.8s" repeatCount="indefinite" begin="1.5s" />
            </rect>
            <rect x="1075" y="540" width="14" height="10" fill="#0EA5E9" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.9s" repeatCount="indefinite" />
            </rect>
            <rect x="1105" y="540" width="14" height="10" fill="#38BDF8" opacity="0.6" filter="url(#windowGlow)">
              <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3.1s" repeatCount="indefinite" begin="0.5s" />
            </rect>
          </g>

          {/* Floating property markers */}
          <g>
            <circle cx="350" cy="350" r="6" fill="#0EA5E9" opacity="0.6">
              <animate attributeName="cy" values="350;330;350" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="350" r="12" fill="none" stroke="#0EA5E9" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="12;22;12" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
          <g>
            <circle cx="800" cy="300" r="5" fill="#38BDF8" opacity="0.5">
              <animate attributeName="cy" values="300;280;300" dur="5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="800" cy="300" r="10" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.25">
              <animate attributeName="r" values="10;20;10" dur="5s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="5s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>
          <g>
            <circle cx="600" cy="450" r="4" fill="#7DD3FC" opacity="0.4">
              <animate attributeName="cy" values="450;435;450" dur="4.5s" repeatCount="indefinite" begin="2s" />
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="4.5s" repeatCount="indefinite" begin="2s" />
            </circle>
            <circle cx="600" cy="450" r="8" fill="none" stroke="#7DD3FC" strokeWidth="2" opacity="0.2">
              <animate attributeName="r" values="8;16;8" dur="4.5s" repeatCount="indefinite" begin="2s" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="4.5s" repeatCount="indefinite" begin="2s" />
            </circle>
          </g>
        </svg>

        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] sky-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px] sky-glow-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-sky-400/10 rounded-full blur-[80px] sky-glow-float" style={{ animationDelay: '1s' }} />

        {/* Floating Building Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] float-building" style={{ animationDelay: '0s' }}>
            <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center building-pulse">
              <BuildingOffice2Icon className="w-6 h-6 text-sky-400/70" />
            </div>
          </div>
          <div className="absolute top-[25%] right-[10%] float-building" style={{ animationDelay: '1.5s' }}>
            <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
              <HomeModernIcon className="w-5 h-5 text-blue-400/60" />
            </div>
          </div>
          <div className="absolute top-[50%] left-[5%] float-building" style={{ animationDelay: '3s' }}>
            <div className="w-10 h-10 rounded-full bg-sky-400/15 border border-sky-400/25 flex items-center justify-center">
              <KeyIcon className="w-4 h-4 text-sky-300/50" />
            </div>
          </div>
          <div className="absolute top-[40%] right-[6%] float-building" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center building-pulse" style={{ animationDelay: '1s' }}>
              <BuildingOffice2Icon className="w-7 h-7 text-blue-400/50" />
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-sky-500/30 text-sky-400 text-sm font-medium">
              <BuildingOffice2Icon className="w-4 h-4" />
              Industry · Property Management
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
              Property Management{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                Without the Chaos
              </span>
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
              href="/solutions/custom-solutions"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg hover:from-sky-400 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-sky-500/25"
            >
              Talk about my systems
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 px-6 py-3 font-medium text-sky-300 hover:bg-sky-500/10 hover:border-sky-400 transition-all duration-300"
            >
              Try live demos
            </Link>
          </div>

          {/* Outcomes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 text-center hover:border-sky-500/30 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {outcome.metric}
                </div>
                <div className="text-sm text-white/60">{outcome.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          2. KEY BENEFITS SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Key Benefits &{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Everything you need to streamline property management operations in one unified platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-sky-500/30 group-hover:to-blue-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/60">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          3. PAIN POINTS SECTION - Problems We Solve
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What we help property managers{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                fix
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Stop drowning in email threads and spreadsheets. Let your systems do the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-sky-500/30 group-hover:to-blue-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <div className="text-red-400/80 text-sm font-medium mb-1 line-through decoration-red-400/50">
                        {item.problem}
                      </div>
                      <div className="text-white font-semibold flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />
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
          4. WORKFLOW STEPS - How It Works
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How it{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                works
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A simple workflow that scales with your portfolio.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500/50 via-sky-500/30 to-sky-500/50 md:-translate-x-0.5">
              {/* Animated particles */}
              <div className="timeline-particle-sky w-3 h-3 bg-sky-400 rounded-full -left-[5px] shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
              <div className="timeline-particle-sky w-2.5 h-2.5 bg-sky-500 rounded-full -left-[4px] shadow-[0_0_8px_rgba(14,165,233,0.6)]" style={{ animationDelay: '2.5s' }} />
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
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center font-bold text-white flex-shrink-0 shadow-lg shadow-sky-500/30">
                      {item.step}
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-sky-500/40 transition-all duration-300 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-sky-400" />
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
          5. REAL STORY SECTION - Social Proof
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-3xl border border-sky-500/30 p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-5 h-5 text-sky-400" />
              <span className="text-sky-400 font-medium text-sm">Real story, real impact</span>
            </div>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              A property management company managing 200+ units switched from spreadsheets and email to one unified system. Within 60 days:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-sky-500 flex-shrink-0" />
                <span className="text-white">Owner statements generated in minutes, not hours</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-sky-500 flex-shrink-0" />
                <span className="text-white">Maintenance requests resolved 3× faster</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-sky-500 flex-shrink-0" />
                <span className="text-white">Zero missed lease renewals in the first quarter</span>
              </li>
            </ul>

            <p className="text-sky-300/80 font-medium">
              Same team. Better systems.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          6. APPS SECTION - Featured Apps
          ============================================ */}
      {featuredApps.length > 0 && (
        <section className="py-20 sm:py-28 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Apps we plug into your{" "}
                <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  property management workflows
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                These apps are already wired to work together for property managers. You choose where to start; we connect the rest.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredApps.map((app) => (
                <Link
                  key={app.id}
                  href={app.href}
                  className="group relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-sky-500/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Top Accent */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

                  {/* Label + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/30 px-3 py-1 text-xs font-semibold text-sky-400">
                      {app.label}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-white/40">
                      {app.status === "live" ? "Live" : "Coming Soon"}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-medium text-sky-300 mb-2">{app.tagline}</p>

                  {/* Summary */}
                  <p className="text-white/70 mb-4">{app.summary}</p>

                  {/* Industry-specific angle */}
                  <div className="text-sm text-white/50 mb-5">
                    {app.id === "crm" && (
                      <p>Track tenants, owners, units, leases, and renewals in one unified pipeline.</p>
                    )}
                    {app.id === "svd" && (
                      <p>Lease agreements, inspection reports, and owner documents with secure portals.</p>
                    )}
                    {app.id === "leads" && (
                      <p>Turn rental inquiries into qualified tenant applications automatically.</p>
                    )}
                    {app.id === "iq" && (
                      <p>Occupancy rates, maintenance costs, and portfolio performance at a glance.</p>
                    )}
                    {app.id === "timeguard" && (
                      <p>Track team hours, vendor time, and project costs across your properties.</p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/40">Open {app.label} page</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 px-4 py-2 text-sm font-medium text-sky-300 group-hover:bg-sky-500/30 transition-colors">
                      Learn more
                      <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-sky-500/0 via-sky-500/5 to-blue-500/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          7. RECOMMENDED STACK - Modern Design
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              Recommended Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How Property Management teams usually run{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                OMGsystems
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The apps and solutions we pair together so your tenants, owners, maintenance, and documents all flow in one system.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Apps Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Core Apps</h3>
                  <p className="text-sm text-white/50">The foundation of your system</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "OMGCRM", href: "/apps/omgcrm", tagline: "Track tenants, owners, units, and leases in visual pipelines" },
                  { name: "SecureVault Docs", href: "/apps/securevault-docs", tagline: "Lease agreements, inspections, and owner docs in secure portals" },
                  { name: "OMG Leads", href: "/apps/leadflow-engine", tagline: "Capture rental inquiries and turn them into applications" },
                ].map((app, index) => (
                  <Link
                    key={index}
                    href={app.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-sky-400 transition-colors">{app.name}</h4>
                      <p className="text-sm text-white/50">{app.tagline}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Solutions</h3>
                  <p className="text-sm text-white/50">Automation & strategy add-ons</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Automations", href: "/solutions/automations", tagline: "Connect your tools and automate maintenance & owner updates" },
                  { name: "Strategy Session", href: "/solutions/strategy-session", tagline: "1-on-1 planning to map your ideal workflow" },
                ].map((solution, index) => (
                  <Link
                    key={index}
                    href={solution.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">{solution.name}</h4>
                      <p className="text-sm text-white/50">{solution.tagline}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Optional Training Badge */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-500/5 border border-sky-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Optional: OMG AI Mastery</h4>
                    <p className="text-white/50 text-xs mt-1">Train your team to use AI tools for faster tenant communication and owner reporting.</p>
                    <Link href="/apps/omg-iq" className="text-sky-400 text-xs font-medium hover:text-sky-300 transition-colors mt-2 inline-block">
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
          8. FINAL CTA SECTION - Gradient Banner
          ============================================ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-500" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pm-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#pm-grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to simplify your property management?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            We&apos;ll map your current processes, find the gaps, and build a system that scales with your portfolio—without the chaos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/solutions/custom-solutions"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-sky-600 shadow-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Talk about my property systems
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
    </main>
  );
}
