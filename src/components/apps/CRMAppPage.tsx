"use client";

import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import { AppIndustriesStrip } from "@/components/apps/AppIndustriesStrip";
import { AppSolutionsStrip } from "@/components/apps/AppSolutionsStrip";
import { AppRelationsStrip } from "@/components/apps/AppRelationsStrip";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  CalculatorIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  HeartIcon,
  ScaleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

type Props = { app: AppConfig };

export function CRMAppPage({ app }: Props) {
  const industries = [
    {
      id: "contractors",
      icon: WrenchScrewdriverIcon,
      name: "Contractors",
      description:
        "Imagine a CRM that understands your jobs, quotes, site visits, materials, and client follow-ups.",
      pipeline: "New → Site Visit → Quote Sent → In Progress → Completed",
      roadmap: "from intake to walkthrough",
      ai: "writes proposal follow-ups",
      tasks: "reminders for inspections, materials, and client updates",
    },
    {
      id: "real-estate",
      icon: HomeIcon,
      name: "Real Estate",
      description:
        "Stay on top of buyers, sellers, showings, offers, and closing timelines.",
      pipeline: "New → Contacted → Viewing → Offer → Under Contract → Closed",
      roadmap: "from first call → viewing → closing",
      ai: "writes warm check-ins",
      tasks: '"Confirm viewing," "Send offer summary," etc.',
    },
    {
      id: "accountants",
      icon: CalculatorIcon,
      name: "Accountants",
      description:
        "The easiest way to track client files, missing documents, and follow-up reminders.",
      pipeline: "Inquiry → Document Request → Review → Return → Completed",
      roadmap: "from intake → documents → review → filing",
      ai: "writes tax-season reminders",
      tasks: "automatic missing-doc reminders",
    },
    {
      id: "agencies",
      icon: BuildingOfficeIcon,
      name: "Agencies",
      description: "Keep leads, proposals, and onboarding organized.",
      pipeline: "Lead → Discovery → Proposal → Negotiation → Won → Onboarding",
      roadmap: "from qualification → kickoff",
      ai: "writes friendly updates",
      tasks: "recap emails, proposal follow-ups",
    },
    {
      id: "coaches",
      icon: AcademicCapIcon,
      name: "Coaches & Consultants",
      description: "Track calls, offers, enrollment, and sessions.",
      pipeline: "New → Engaged → Discovery → Offer → Enrolled → Completed",
      roadmap: "from welcome → clarity → coaching",
      ai: "writes friendly updates",
      tasks: "call recaps, session reminders",
    },
    {
      id: "ecommerce",
      icon: ShoppingBagIcon,
      name: "E-commerce",
      description: "For high-touch orders, VIPs, and wholesale customers.",
      pipeline: "Inquiry → Engaged → Quote → Ordered → Fulfilled → Repeat",
      roadmap: "from inquiry → quote → fulfillment",
      ai: "writes follow-ups",
      tasks: "VIP outreach, quote follow-ups",
    },
    {
      id: "healthcare",
      icon: HeartIcon,
      name: "Healthcare",
      description: "Perfect for clinics, therapists, med spas, dental, etc.",
      pipeline: "Inquiry → Intake → Consult → Treatment Plan → In Treatment → Follow-Up",
      roadmap: "from inquiry → treatment → follow-up",
      ai: "writes appointment reminders",
      tasks: "appointment confirmations, treatment reminders",
    },
    {
      id: "legal",
      icon: ScaleIcon,
      name: "Legal",
      description: "Designed for intake, consultations, retainers, and matters.",
      pipeline: "Inquiry → Intake → Consult → Engagement → Retained → Closed",
      roadmap: "from inquiry → engagement → closure",
      ai: "writes engagement letters",
      tasks: "conflict checks, engagement letters, closing summaries",
    },
  ];

  const integrations = [
    "Websites (WordPress, Webflow, Shopify, custom)",
    "Forms (HTML, Jotform, Typeform, Gravity Forms)",
    "Meta Leads (Facebook/Instagram)",
    "Google Lead Forms",
    "TikTok Lead Ads",
    "Shopify order inquiries",
    "Stripe",
    "Zapier / Make / n8n",
    "Other CRMs (HubSpot, GoHighLevel, Pipedrive)",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center bg-slate-950 overflow-hidden">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-br from-[#3B82F6]/10 via-blue-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              A Light CRM Built for Real Businesses — Not Tech Experts
            </h1>
            <p className="text-2xl md:text-3xl text-[#3B82F6] font-semibold mb-6">
              {app.tagline}
            </p>
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
              {app.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apps/crm/templates"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#3B82F6]/25"
              >
                Start With an Industry Template
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="https://crm.omgsystems.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl text-white border-2 border-[#3B82F6] font-bold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#3B82F6]/20"
              >
                Open OMG CRM
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wavy divider at bottom */}
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
              fill="#0f172a"
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

      {/* Pain Points Section */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-[#3B82F6]/8 via-blue-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Pain Points We Solve
          </h2>

          {/* 2-column grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pain Point 1 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">
                Most CRMs are too heavy.
              </h3>
              <p className="text-white/70 mb-4">
                People get lost. Setup takes weeks. Nobody uses it.
              </p>
              <div className="bg-[#3B82F6]/10 rounded-xl p-4 border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold text-[#3B82F6] mb-1">
                  We fix it:
                </p>
                <p className="text-white/80 text-sm">
                  OMG CRM is clean, simple, and ready in minutes.
                </p>
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">
                Most CRMs don't match your industry.
              </h3>
              <p className="text-white/70 mb-4">
                Contractors need something different from lawyers. Realtors don't work like coaches.
              </p>
              <div className="bg-[#3B82F6]/10 rounded-xl p-4 border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold text-[#3B82F6] mb-1">
                  We fix it:
                </p>
                <p className="text-white/80 text-sm">
                  You pick your industry → CRM instantly reshapes itself for you.
                </p>
              </div>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">
                Too many reminders fall through the cracks.
              </h3>
              <p className="text-white/70 mb-4">
                People forget to follow up, and business is lost.
              </p>
              <div className="bg-[#3B82F6]/10 rounded-xl p-4 border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold text-[#3B82F6] mb-1">
                  We fix it:
                </p>
                <p className="text-white/80 text-sm">
                  Every pipeline stage triggers smart auto-tasks. Your CRM nudges you before you forget.
                </p>
              </div>
            </div>

            {/* Pain Point 4 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">
                Teams forget the "right process."
              </h3>
              <p className="text-white/70 mb-4">
                Everyone works differently → inconsistent results.
              </p>
              <div className="bg-[#3B82F6]/10 rounded-xl p-4 border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold text-[#3B82F6] mb-1">
                  We fix it:
                </p>
                <p className="text-white/80 text-sm">
                  Each industry has built-in Roadmaps — clear steps from lead → client → complete.
                </p>
              </div>
            </div>

            {/* Pain Point 5 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">
                Sales messages take too long to write.
              </h3>
              <p className="text-white/70 mb-4">
                Follow-ups are repetitive and time-consuming.
              </p>
              <div className="bg-[#3B82F6]/10 rounded-xl p-4 border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold text-[#3B82F6] mb-1">
                  We fix it:
                </p>
                <p className="text-white/80 text-sm">
                  AI writes warm, friendly messages in one click.
                </p>
              </div>
            </div>

            {/* Pain Point 6 */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 hover:border-red-500/50 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">
                Switching tools is painful.
              </h3>
              <p className="text-white/70 mb-4">
                People don't want to switch from their existing CRM, email, or website.
              </p>
              <div className="bg-[#3B82F6]/10 rounded-xl p-4 border-l-4 border-[#3B82F6]">
                <p className="text-sm font-semibold text-[#3B82F6] mb-1">
                  We fix it:
                </p>
                <p className="text-white/80 text-sm">
                  OMG CRM integrates with websites, forms, Zapier, Shopify, Facebook & Google lead forms, Stripe, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Core Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Adaptive Pipelines",
                description:
                  "Each industry comes with a pipeline that already makes sense for your workflow. You can change it anytime.",
                icon: ChartBarIcon,
              },
              {
                title: "Smart Roadmaps",
                description:
                  "Step-by-step guidance that mirrors the perfect client process — and auto-updates as stages change.",
                icon: SparklesIcon,
              },
              {
                title: "Auto-Tasks for Every Stage",
                description:
                  'Move a lead from "New" to "Proposal Sent"? We auto-create the follow-up.',
                icon: BoltIcon,
              },
              {
                title: "AI Follow-Up Generator",
                description:
                  "Click once → send a friendly message that sounds like you.",
                icon: SparklesIcon,
              },
              {
                title: "Industry Templates",
                description:
                  "8 industries done + expandable. Pick yours and go.",
                icon: UserGroupIcon,
              },
              {
                title: "Integrations",
                description:
                  "Bring your leads from anywhere. Website, forms, ads, other CRMs.",
                icon: LinkIcon,
              },
              {
                title: "Website & Forms",
                description:
                  "Embed forms that drop leads directly into the right industry + right stage.",
                icon: LinkIcon,
              },
              {
                title: "Clean and Simple UI",
                description:
                  "No clutter. No chaos. No guesswork. Easy enough for anyone.",
                icon: CheckCircleIcon,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#3B82F6]/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why OMG CRM Is Different */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gradient-to-br from-[#3B82F6]/8 via-blue-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why OMG CRM Is Different
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "It's a CRM that adapts to YOU",
                description:
                  "Not a one-size-fits-all tool. Not a confusing monster like Salesforce. Not a marketing tool pretending to be a CRM. You click your industry → Boom. Tailored pipeline, tasks, roadmap, and AI prompts.",
                icon: SparklesIcon,
              },
              {
                title: "You stay consistent — automatically",
                description:
                  'Every stage change triggers tasks: "Call John back", "Send proposal summary", "Confirm appointment", "Check on treatment progress". Depends on the industry. No more guessing what\'s next.',
                icon: BoltIcon,
              },
              {
                title: "You get clarity — instantly",
                description:
                  "Your Roadmap shows every big step: What's done, What's next, What needs attention. It's like having a project manager inside the CRM.",
                icon: ChartBarIcon,
              },
              {
                title: "You get speed — without the stress",
                description:
                  "AI writes emails. AI suggests tasks. AI checks stages and fills in the blanks.",
                icon: BoltIcon,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                >
                  <div className="w-12 h-12 bg-[#3B82F6] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[150px] h-[250px] bg-gradient-to-r from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-0 w-[150px] h-[250px] bg-gradient-to-l from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Built for Your Industry
          </h2>
          <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
            Pick your industry and get a CRM that already understands how you work.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#3B82F6]/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {industry.name}
                  </h3>
                  <p className="text-white/70 mb-4 text-sm">
                    {industry.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-[#3B82F6]">Pipeline:</p>
                      <p className="text-white/60">{industry.pipeline}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#3B82F6]">Roadmap:</p>
                      <p className="text-white/60">{industry.roadmap}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#3B82F6]">AI:</p>
                      <p className="text-white/60">{industry.ai}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#3B82F6]">Tasks:</p>
                      <p className="text-white/60">{industry.tasks}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gradient-to-br from-[#3B82F6]/8 via-blue-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Connect OMG CRM to the tools you already use
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Your leads can come from anywhere — your CRM catches them and puts them in the right pipeline instantly.
            </p>
          </div>

          {/* 3-column grid */}
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-[#3B82F6]/30 transition-colors"
              >
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-[#3B82F6] mr-3 flex-shrink-0" />
                  <span className="text-white/90">{integration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#3B82F6]/10 via-blue-500/6 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple pricing. No stress.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/mo",
                description: "1 user. One industry.",
                features: [
                  "Leads, tasks, pipeline, roadmap",
                  "AI follow-ups",
                  "Website integration",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "/mo",
                description: "Team access. Multi-industry workspaces.",
                features: [
                  "Everything in Starter",
                  "Roadmap editor",
                  "AI task suggestions",
                ],
                cta: "Get Started",
                popular: true,
              },
              {
                name: "Agency",
                price: "$99",
                period: "/mo",
                description: "White-label. Unlimited industries.",
                features: [
                  "Everything in Pro",
                  "Integrations",
                  "Client accounts",
                ],
                cta: "Get Started",
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur-xl rounded-2xl p-8 border ${
                  plan.popular
                    ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/30 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    : "border-white/10 hover:border-[#3B82F6]/30"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="inline-block bg-[#3B82F6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <p className="text-white/70 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-[#3B82F6] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup?plan=crm"
                  className={`block w-full text-center px-6 py-3 font-semibold rounded-lg transition-all ${
                    plan.popular
                      ? "bg-[#3B82F6] text-white hover:bg-blue-600"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {plan.cta}
                </Link>
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

      {/* Final CTA Section */}
      <section className="relative py-20 bg-slate-950">
        {/* Multiple smaller blue glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80px] h-[120px] bg-gradient-to-r from-[#3B82F6]/15 via-blue-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[80px] h-[120px] bg-gradient-to-l from-[#3B82F6]/15 via-blue-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[120px] bg-gradient-to-br from-[#3B82F6]/12 via-blue-500/8 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150px] h-[80px] bg-gradient-to-b from-[#3B82F6]/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[150px] h-[80px] bg-gradient-to-t from-[#3B82F6]/10 to-transparent rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start with the CRM that adapts to your business
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/apps/crm/templates"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#3B82F6] text-white font-bold rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#3B82F6]/25"
            >
              Pick Your Industry Template
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="https://crm.omgsystems.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl text-white border-2 border-[#3B82F6] font-bold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#3B82F6]/20"
            >
              Try the CRM
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

