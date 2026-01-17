// app/industries/contractors/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { getIndustryById } from "@/config/industries_config";
import {
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
  CalculatorIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { LeadFormWrapper } from "@/components/forms";

const industry = getIndustryById("cont");

export const metadata: Metadata = {
  title: "Contractor Automation | Quotes, Jobs & Invoices in One Flow | OMGsystems",
  description: industry.summary,
  keywords: "contractor automation, construction CRM, quote management, job tracking, contractor software, trades automation",
  openGraph: {
    title: "Contractor Automation | Quotes, Jobs & Invoices in One Flow | OMGsystems",
    description: industry.summary,
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/contractors",
  },
};

// Pain points data
const painPoints = [
  {
    icon: PhoneIcon,
    problem: "Leads come in but never get quoted",
    solution: "Every inquiry triggers an instant response and quote workflow",
  },
  {
    icon: DocumentTextIcon,
    problem: "Contracts and receipts scattered everywhere",
    solution: "All job documents organized in one client portal per project",
  },
  {
    icon: ClockIcon,
    problem: "No-shows and scheduling chaos",
    solution: "Automated confirmations, reminders, and crew notifications",
  },
  {
    icon: CurrencyDollarIcon,
    problem: "Chasing payments and invoices",
    solution: "Auto-generated invoices and payment reminders on completion",
  },
];

// Workflow steps
const workflowSteps = [
  {
    step: "01",
    title: "Capture Every Lead",
    description: "Website forms, referrals, and calls flow into one inbox with instant follow-up.",
    icon: UserGroupIcon,
  },
  {
    step: "02",
    title: "Quote & Win Jobs",
    description: "Send professional quotes fast, track responses, and close more deals.",
    icon: CalculatorIcon,
  },
  {
    step: "03",
    title: "Schedule & Execute",
    description: "Book jobs, assign crews, and keep clients updated automatically.",
    icon: CalendarDaysIcon,
  },
  {
    step: "04",
    title: "Invoice & Get Paid",
    description: "Auto-generate invoices on completion with built-in payment reminders.",
    icon: CurrencyDollarIcon,
  },
];

// Results/outcomes
const outcomes = [
  { metric: "5x", label: "Faster quote turnaround" },
  { metric: "70%", label: "Less admin time per job" },
  { metric: "100%", label: "Job visibility for your team" },
  { metric: "0", label: "Lost leads or forgotten follow-ups" },
];

export default function ContractorsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ============================================
          1. HERO SECTION - Rotating Gears Animation
          ============================================ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-20 sm:pb-28">
        {/* SVG Rotating Gears Background Animation */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient for gears */}
            <linearGradient id="gearGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.3)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.1)" />
            </linearGradient>
            <linearGradient id="gearGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.25)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0.05)" />
            </linearGradient>

            {/* Gear shape definitions */}
            <path
              id="gear1"
              d="M50,25 L55,25 L57,20 L63,20 L65,25 L70,25 L72,30 L70,35 L65,35 L63,40 L57,40 L55,35 L50,35 L48,30 L50,25 M60,25 A5,5 0 1,1 60,35 A5,5 0 1,1 60,25"
              fill="none"
              strokeWidth="2"
            />
          </defs>

          {/* Large rotating gear - left side */}
          <g transform="translate(80, 200)">
            <circle cx="0" cy="0" r="80" fill="none" stroke="url(#gearGradient1)" strokeWidth="3" strokeDasharray="20 10" opacity="0.4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="30s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="0" r="60" fill="none" stroke="url(#gearGradient2)" strokeWidth="2" opacity="0.3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 0 0"
                to="0 0 0"
                dur="25s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="0" r="20" fill="rgba(245, 158, 11, 0.15)" />
          </g>

          {/* Medium rotating gear - right side */}
          <g transform="translate(1100, 350)">
            <circle cx="0" cy="0" r="100" fill="none" stroke="url(#gearGradient1)" strokeWidth="4" strokeDasharray="25 15" opacity="0.35">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="35s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="0" r="70" fill="none" stroke="url(#gearGradient2)" strokeWidth="2" strokeDasharray="15 8" opacity="0.25">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="28s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="0" r="25" fill="rgba(251, 191, 36, 0.12)" />
          </g>

          {/* Small gear - top right */}
          <g transform="translate(1000, 120)">
            <circle cx="0" cy="0" r="40" fill="none" stroke="url(#gearGradient1)" strokeWidth="2" strokeDasharray="12 6" opacity="0.3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="0" cy="0" r="12" fill="rgba(245, 158, 11, 0.1)" />
          </g>

          {/* Blueprint grid lines */}
          <g opacity="0.1">
            <line x1="0" y1="200" x2="1200" y2="200" stroke="#F59E0B" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="0" y1="400" x2="1200" y2="400" stroke="#F59E0B" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="0" y1="600" x2="1200" y2="600" stroke="#F59E0B" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="300" y1="0" x2="300" y2="800" stroke="#F59E0B" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="600" y1="0" x2="600" y2="800" stroke="#F59E0B" strokeWidth="1" strokeDasharray="8 4" />
            <line x1="900" y1="0" x2="900" y2="800" stroke="#F59E0B" strokeWidth="1" strokeDasharray="8 4" />
          </g>

          {/* Animated measurement markers */}
          <g>
            <circle cx="300" cy="200" r="4" fill="#F59E0B" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="400" r="4" fill="#FBBF24" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="900" cy="200" r="4" fill="#F59E0B" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>
        </svg>

        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px] yellow-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] yellow-glow-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px] yellow-glow-float" style={{ animationDelay: '1s' }} />

        {/* Floating Tool Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Tool icon 1 - Wrench */}
          <div className="absolute top-[18%] left-[8%] float-tool" style={{ animationDelay: '0s' }}>
            <div className="w-14 h-14 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center tool-pulse">
              <WrenchScrewdriverIcon className="w-7 h-7 text-yellow-400/70" />
            </div>
          </div>
          {/* Tool icon 2 - Clipboard */}
          <div className="absolute top-[25%] right-[10%] float-tool" style={{ animationDelay: '1.5s' }}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center tool-pulse" style={{ animationDelay: '0.5s' }}>
              <ClipboardDocumentCheckIcon className="w-6 h-6 text-amber-400/60" />
            </div>
          </div>
          {/* Tool icon 3 - Truck */}
          <div className="absolute top-[50%] left-[5%] float-tool" style={{ animationDelay: '2.5s' }}>
            <div className="w-11 h-11 rounded-xl bg-yellow-400/12 border border-yellow-400/22 flex items-center justify-center">
              <TruckIcon className="w-5 h-5 text-yellow-300/50" />
            </div>
          </div>
          {/* Tool icon 4 - Calculator */}
          <div className="absolute top-[40%] right-[6%] float-tool" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 rounded-xl bg-amber-500/12 border border-amber-500/22 flex items-center justify-center tool-pulse" style={{ animationDelay: '1s' }}>
              <CalculatorIcon className="w-8 h-8 text-amber-400/55" />
            </div>
          </div>
          {/* Tool icon 5 - Calendar */}
          <div className="absolute top-[60%] left-[12%] float-tool" style={{ animationDelay: '3s' }}>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 text-yellow-400/50" />
            </div>
          </div>
          {/* Tool icon 6 - Currency */}
          <div className="absolute top-[65%] right-[15%] float-tool" style={{ animationDelay: '4s' }}>
            <div className="w-13 h-13 rounded-xl bg-amber-400/10 border border-amber-400/18 flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 text-amber-300/45" />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-yellow-500/30 text-yellow-400 text-sm font-medium">
              <WrenchScrewdriverIcon className="w-4 h-4" />
              Industry · Contractors
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              {industry.heroTitle?.split(" ").slice(0, -4).join(" ")}{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                {industry.heroTitle?.split(" ").slice(-4).join(" ")}
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="text-center mb-10">
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              {industry.heroSubtitle}
            </p>
          </div>

          {/* Outcomes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 text-center hover:border-yellow-500/30 transition-colors"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  {outcome.metric}
                </div>
                <div className="text-sm text-white/60 mt-1">{outcome.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-4 font-semibold text-slate-900 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105"
            >
              Book a Strategy Session
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-white/5 backdrop-blur-sm px-8 py-4 font-medium text-white hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300"
            >
              <SparklesIcon className="w-5 h-5 text-yellow-400" />
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          2. PAIN POINTS SECTION - Problem/Solution Cards
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sound{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                familiar?
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              These headaches cost contractors hours every week. Here&apos;s how we fix them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-yellow-500/30 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-amber-500/30 transition-colors">
                      <Icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/50 line-through mb-2">{point.problem}</p>
                      <p className="text-white font-medium flex items-start gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        {point.solution}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          3. WORKFLOW STEPS - Vertical Timeline
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How it{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                works
              </span>
            </h2>
            <p className="text-lg text-white/60">
              From first call to final invoice—automated and organized.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500/50 via-amber-500/30 to-transparent">
              {/* Animated particle */}
              <div className="timeline-particle-yellow w-2 h-2 bg-yellow-500 rounded-full -left-[3px]" />
            </div>

            <div className="space-y-8">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-6 pl-4">
                    {/* Step number circle */}
                    <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg shadow-yellow-500/30">
                      {step.step}
                    </div>

                    {/* Content card */}
                    <div className="flex-1 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-yellow-500/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                          <p className="text-white/60">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          4. REAL STORY / TESTIMONIAL SECTION
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 rounded-2xl border border-yellow-500/20 p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Real Results</h3>
                <p className="text-white/60">From a general contractor in Toronto</p>
              </div>
            </div>
            <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
              &ldquo;Before OMGsystems, we were losing jobs because quotes took too long. Now every lead gets a response in minutes, and our close rate went up 40%. I spend my time on job sites, not chasing paperwork.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                M
              </div>
              <div>
                <p className="text-white font-medium">Mike R.</p>
                <p className="text-white/50 text-sm">General Contractor, 15+ employees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          5. APPS SECTION - Works Best With These Apps
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built on these{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Apps
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The complete toolkit for running a modern contracting business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "OMGCRM",
                slug: "omgcrm",
                description: "Track leads, quotes, and jobs in visual pipelines. Know exactly where every project stands.",
                role: "primary",
              },
              {
                name: "SecureVault Docs",
                slug: "securevault-docs",
                description: "Contracts, permits, receipts—all organized by project with client access portals.",
                role: "primary",
              },
              {
                name: "OMG Leads",
                slug: "leadflow-engine",
                description: "Capture every inquiry from every source and trigger instant quote workflows.",
                role: "primary",
              },
            ].map((app, index) => (
              <Link
                key={index}
                href={`/apps/${app.slug}`}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-yellow-500/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.role === "primary"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-white/10 text-white/60 border border-white/20"
                    }`}>
                    {app.role === "primary" ? "Core" : "Add-on"}
                  </span>
                  <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-yellow-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {app.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {app.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          6. RECOMMENDED STACK - Modern Design
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              Recommended Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How {industry.label} teams usually run{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                OMGsystems
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The apps and solutions we pair together so your leads, quotes, jobs, and invoices all flow in one system.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Apps Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Core Apps</h3>
                  <p className="text-sm text-white/50">The foundation of your system</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "OMGCRM", href: "/apps/omgcrm", tagline: "Track leads, quotes, and jobs in visual pipelines" },
                  { name: "SecureVault Docs", href: "/apps/securevault-docs", tagline: "Contracts, permits, and receipts organized by project" },
                  { name: "OMG Leads", href: "/apps/leadflow-engine", tagline: "Capture every inquiry and trigger instant follow-ups" },
                ].map((app, index) => (
                  <Link
                    key={index}
                    href={app.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-yellow-400 transition-colors">{app.name}</h4>
                      <p className="text-sm text-white/50">{app.tagline}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-slate-900 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Solutions</h3>
                  <p className="text-sm text-white/50">Automation & strategy add-ons</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Automations", href: "/solutions/automations", tagline: "Connect your tools and kill repetitive tasks" },
                  { name: "Strategy Session", href: "/solutions/strategy-session", tagline: "1-on-1 planning to map your ideal workflow" },
                ].map((solution, index) => (
                  <Link
                    key={index}
                    href={solution.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-amber-400 transition-colors">{solution.name}</h4>
                      <p className="text-sm text-white/50">{solution.tagline}</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Optional Training Badge */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Optional: OMG AI Mastery</h4>
                    <p className="text-white/50 text-xs mt-1">Train your team to use AI tools for faster quotes and better client communication.</p>
                    <Link href="/apps/omg-ai-mastery" className="text-yellow-400 text-xs font-medium hover:text-yellow-300 transition-colors mt-2 inline-block">
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
          7. FINAL CTA - Gradient Banner
          ============================================ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="contractor-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#contractor-grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ready to grow your contracting business?
          </h2>
          <p className="text-lg text-slate-800/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop losing leads to slow quotes and scattered paperwork. Get systems that let you focus on what you do best—building.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              Book Your Strategy Session
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900/30 px-8 py-4 font-medium text-slate-900 hover:bg-slate-900/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form Section - Orange Theme */}
      <LeadFormWrapper
        variant="industries"
        colorScheme="orange"
        customGradient="from-yellow-500 to-amber-500"
        customShadow="shadow-yellow-500/30"
      />
    </main>
  );
}
