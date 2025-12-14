import { Metadata } from "next";
import Link from "next/link";
import {
  MapIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
  HomeIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";
import { getAppsForSolution, getSolutionBadgeLabel } from "@/config/relationships";
import { RelationBadge } from "@/components/ui/RelationBadge";
import { RelationLegend } from "@/components/ui/RelationLegend";
import { getSolutionById } from "@/config/solutions_config";
import { getIndustriesForSolution } from "@/config/relationships";

export const metadata: Metadata = {
  title: "Custom Solutions – Systems Designed Around Your Business | OMGsystems",
  description:
    "Deep-dive strategy and implementation to design AI workflows and systems tailored to your company—not someone else's template.",
  keywords: [
    "custom business systems",
    "systems integration",
    "workflow automation",
    "business process redesign",
    "custom solutions",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/custom-solutions",
  },
  openGraph: {
    title: "Custom Solutions – Systems Designed Around Your Business | OMGsystems",
    description:
      "Deep-dive strategy and implementation to design AI workflows and systems tailored to your company—not someone else's template.",
    url: "https://www.omgsystems.com/solutions/custom-solutions",
    siteName: "OMGsystems",
    type: "website",
  },
};

export default function CustomSolutionsPage() {
  const solution = getSolutionById("custom_solutions");
  const recommendedApps = getAppsForSolution("custom_solutions");
  const industries = getIndustriesForSolution("custom_solutions");

  const whoItHelps = [
    {
      title: "Multi-location or multi-brand companies",
      description:
        "You've got offices, brands, or divisions—and each one has its own half-working setup.",
    },
    {
      title: "Teams with messy, half-working tools",
      description:
        "CRMs, spreadsheets, portals, inboxes, and \"that one drive\" all trying to do the same job.",
    },
    {
      title: "Leaders who want a real systems overhaul",
      description:
        "You're done with band-aid fixes and one more app. You want a real, end-to-end systems reset.",
    },
  ];

  const outcomes = [
    {
      icon: MapIcon,
      title: "One clear map of your systems",
      description:
        "We document your current stack, show what stays, what goes, and where automations plug in.",
    },
    {
      icon: RocketLaunchIcon,
      title: "A rollout plan your team can actually follow",
      description:
        "Clear phases, owners, and timelines—so the plan doesn't die in a Google Doc.",
    },
    {
      icon: CogIcon,
      title: "Automations that match real workflows",
      description:
        "Each department gets workflows that fit how they work today, not how a template thinks they should.",
    },
  ];

  const processSteps = [
    {
      phase: "Discovery & Mapping",
      items: [
        "Interview key team members",
        "Map your current tools, workflows, and bottlenecks",
        "Identify quick wins vs deep fixes",
      ],
    },
    {
      phase: "Blueprint & Architecture",
      items: [
        "Design your ideal system by department",
        "Decide which tools stay, which go, and what connects where",
        "Define data flow, automations, and reporting",
      ],
    },
    {
      phase: "Build & Implementation",
      items: [
        "Set up or clean CRMs, portals, and automations",
        "Connect apps (CRM, SecureVault Docs, OMG Leads, OMG IQ)",
        "Test workflows with real scenarios from your team",
      ],
    },
    {
      phase: "Rollout & Support",
      items: [
        "Train your team on the new system",
        "Create SOPs and simple guides",
        "Iterate based on real-world usage",
      ],
    },
  ];

  const sampleProjects = [
    {
      title: "Multi-location real estate team",
      description:
        "Unified lead intake from 5 sources → one CRM pipeline + automated follow-ups + SecureVault Docs portals for documents.",
    },
    {
      title: "Property management company",
      description:
        "Tenant onboarding, maintenance requests, and owner reporting handled through connected systems instead of scattered emails.",
    },
    {
      title: "Accounting firm with multiple brands",
      description:
        "One intake flow feeding multiple brands, automated document collection, and partner-level dashboards powered by OMG IQ.",
    },
    {
      title: "Contractor company with sales reps",
      description:
        "Lead routing by territory, quote follow-up automations, and project hand-offs built as a clean, repeatable system.",
    },
  ];

  const industryDescriptions: Record<string, string> = {
    re: "Multi-agent teams, lead routing, transaction workflows.",
    pm: "Tenant workflows, owner reporting, maintenance flows.",
    cont: "Quotes, jobs, field teams, and invoicing in sync.",
    acc: "Intake, document collection, deadlines, client communication.",
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. HERO - Redesigned with horizontal layout */}
      <section className="relative bg-white text-slate-900 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Badge */}
          <div className="text-center mb-5">
            <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 tracking-wide">
              Solution · Custom Solutions
            </p>
          </div>

          {/* Main Headline - Full width, horizontal, two lines - smaller text */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
              Custom systems designed around the way<br className="hidden md:block" /> your company actually works
            </h1>
          </div>

          {/* Description - Full width */}
          <div className="text-center mb-10">
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deep-dive strategy and implementation to design AI workflows and systems tailored to your company—not someone else's template.
            </p>
          </div>

          {/* Three Highlighted Outcome Boxes */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {outcome.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-emerald-600 px-8 py-3.5 font-semibold text-white hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule a systems review
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full border-2 border-emerald-600 px-8 py-3.5 font-medium text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
            >
              Explore live demos
            </Link>
          </div>

          {/* Systems Visualization - Redesigned with actual content */}
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Connected Systems
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Marketing', icon: '📊', color: 'bg-blue-500' },
                  { name: 'Sales', icon: '💼', color: 'bg-purple-500' },
                  { name: 'Ops', icon: '⚙️', color: 'bg-orange-500' },
                  { name: 'Finance', icon: '💰', color: 'bg-green-500' }
                ].map((dept, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group">
                    <div className="text-center mb-3">
                      <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl group-hover:scale-110 transition-transform`}>
                        {dept.icon}
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{dept.name}</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-gray-200 rounded-full"></div>
                      <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-1.5 bg-gray-200 rounded-full w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Connection lines between departments */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl mt-8">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                      <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal connections */}
                  <line
                    x1="12.5%"
                    y1="50%"
                    x2="37.5%"
                    y2="50%"
                    stroke="url(#heroLineGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                  <line
                    x1="37.5%"
                    y1="50%"
                    x2="62.5%"
                    y2="50%"
                    stroke="url(#heroLineGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                    style={{ animationDelay: '0.3s' }}
                  />
                  <line
                    x1="62.5%"
                    y1="50%"
                    x2="87.5%"
                    y2="50%"
                    stroke="url(#heroLineGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                    style={{ animationDelay: '0.6s' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO THIS IS BUILT FOR */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who Custom Solutions is built for
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed for companies that need more than off-the-shelf solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whoItHelps.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DEEP-DIVE SECTION */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Copy */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  What "Custom Solutions" really means
                </h2>
                <p className="text-lg text-emerald-50 leading-relaxed">
                  This isn't one more call and a PDF. We become your systems partner for a focused sprint—mapping, redesigning, and implementing the backbone of how your business runs.
                </p>
              </div>

              {/* Right: Checklist */}
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="border-l-2 border-white/60 pl-6 hover:border-white transition-colors">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {step.phase}
                    </h3>
                    <ul className="space-y-2.5">
                      {step.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-emerald-50"
                        >
                          <CheckCircleIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SAMPLE PROJECTS GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A few examples of Custom Solutions in action
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real implementations that transformed how these companies operate
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sampleProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                    <RocketLaunchIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-11">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WORKS BEST WITH THESE APPS */}
      {recommendedApps.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Works best with these Apps
              </h2>
              <RelationLegend className="mt-4" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedApps.map((app) => {
                const relation = app.relation;
                const badgeLabel = getSolutionBadgeLabel(relation);

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                        OMG App
                      </p>
                      <RelationBadge
                        label={badgeLabel}
                        priority={relation?.priority}
                        className="text-[10px] px-2 py-0.5"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {app.label}
                    </h3>
                    <p className="text-sm font-medium text-emerald-600 mb-3">
                      {app.tagline}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {app.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={app.href}
                        className="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        View {app.label}
                        <ArrowRightIcon className="w-3 h-3 ml-1" />
                      </Link>
                      {app.id === "crm" && (
                        <Link
                          href="/apps/demo/crm"
                          className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-gray-700"
                        >
                          Try CRM demo
                        </Link>
                      )}
                      {app.id === "svd" && (
                        <Link
                          href="/apps/demo/securevault-docs"
                          className="inline-flex items-center text-xs font-medium text-gray-600 hover:text-gray-700"
                        >
                          Try SVD demo
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. USED MOST IN THESE INDUSTRIES */}
      {industries.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Used most in these industries
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry) => {
                return (
                  <Link
                    key={industry.id}
                    href={industry.href}
                    className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow text-center"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {industry.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {industryDescriptions[industry.id] || industry.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. FINAL CTA */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to rebuild your systems the right way?
          </h2>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            We'll map your current tools, find the gaps, and design a Custom Solutions plan that fits the way you and your team actually work.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 font-semibold text-emerald-600 hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Talk about my systems
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 font-semibold text-white border-2 border-white hover:bg-white/20 transition-all duration-300"
            >
              Explore live demos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

