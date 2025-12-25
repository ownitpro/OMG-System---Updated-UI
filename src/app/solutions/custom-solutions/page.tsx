import { Metadata } from "next";
import Link from "next/link";
import {
  MapIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  CogIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
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
      icon: BuildingOffice2Icon,
      title: "Multi-location or multi-brand companies",
      description:
        "You've got offices, brands, or divisions—and each one has its own half-working setup.",
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Teams with messy, half-working tools",
      description:
        "CRMs, spreadsheets, portals, inboxes, and \"that one drive\" all trying to do the same job.",
    },
    {
      icon: UserGroupIcon,
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
      icon: BuildingOffice2Icon,
      title: "Multi-location real estate team",
      description:
        "Unified lead intake from 5 sources → one CRM pipeline + automated follow-ups + SecureVault Docs portals for documents.",
    },
    {
      icon: DocumentChartBarIcon,
      title: "Property management company",
      description:
        "Tenant onboarding, maintenance requests, and owner reporting handled through connected systems instead of scattered emails.",
    },
    {
      icon: UserGroupIcon,
      title: "Accounting firm with multiple brands",
      description:
        "One intake flow feeding multiple brands, automated document collection, and partner-level dashboards powered by OMG IQ.",
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Contractor company with sales reps",
      description:
        "Lead routing by territory, quote follow-up automations, and project hand-offs built as a clean, repeatable system.",
    },
  ];

  const industryIcons: Record<string, React.ElementType> = {
    re: BuildingOffice2Icon,
    pm: DocumentChartBarIcon,
    cont: WrenchScrewdriverIcon,
    acc: UserGroupIcon,
  };

  const industryDescriptions: Record<string, string> = {
    re: "Multi-agent teams, lead routing, transaction workflows.",
    pm: "Tenant workflows, owner reporting, maintenance flows.",
    cont: "Quotes, jobs, field teams, and invoicing in sync.",
    acc: "Intake, document collection, deadlines, client communication.",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ============================================
          1. HERO SECTION - Flowing Connection Lines Background
          ============================================ */}
      <section className="relative overflow-hidden pt-40 sm:pt-52 pb-20 sm:pb-32">
        {/* SVG Flowing Connection Lines Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient for lines - fades at edges */}
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249, 115, 22, 0)" />
              <stop offset="30%" stopColor="rgba(249, 115, 22, 0.3)" />
              <stop offset="70%" stopColor="rgba(249, 115, 22, 0.3)" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0)" />
              <stop offset="30%" stopColor="rgba(245, 158, 11, 0.25)" />
              <stop offset="70%" stopColor="rgba(245, 158, 11, 0.25)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
            </linearGradient>
          </defs>

          {/* Curved flowing paths - organic wave patterns */}
          <path
            d="M-100,150 Q200,80 500,180 T900,120 T1300,200"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M-50,350 Q300,280 600,380 T1000,300 T1250,380"
            stroke="url(#lineGradient2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0,550 Q250,480 550,560 T950,500 T1200,580"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M-80,700 Q350,620 700,720 T1100,660 T1280,740"
            stroke="url(#lineGradient2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />

          {/* Animated dots traveling along paths */}
          <circle r="5" fill="#F97316" opacity="0.8">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M-100,150 Q200,80 500,180 T900,120 T1300,200"
            />
          </circle>
          <circle r="4" fill="#F59E0B" opacity="0.7">
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              begin="3s"
              path="M-50,350 Q300,280 600,380 T1000,300 T1250,380"
            />
          </circle>
          <circle r="4" fill="#FB923C" opacity="0.6">
            <animateMotion
              dur="16s"
              repeatCount="indefinite"
              begin="6s"
              path="M0,550 Q250,480 550,560 T950,500 T1200,580"
            />
          </circle>
          <circle r="3" fill="#F97316" opacity="0.5">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              begin="9s"
              path="M-80,700 Q350,620 700,720 T1100,660 T1280,740"
            />
          </circle>
        </svg>

        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] orange-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] orange-glow-float-delayed" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-orange-500/30 text-orange-400 text-sm font-medium">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Solution · Custom Solutions
            </span>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Custom systems
              </span>{" "}
              designed around the way your company actually works
            </h1>
          </div>

          {/* Description */}
          <div className="text-center mb-10">
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Deep-dive strategy and implementation to design AI workflows and systems tailored to your company—not someone else's template.
            </p>
          </div>

          {/* Benefit Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Systems audit", "Custom roadmap", "Full implementation"].map((benefit, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm"
              >
                <CheckCircleIcon className="w-4 h-4 text-orange-500" />
                {benefit}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link
              href="/contact"
              className="group inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
            >
              Schedule a systems review
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full border-2 border-orange-500/50 px-8 py-4 font-medium text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300"
            >
              Explore live demos
            </Link>
          </div>

          {/* Connected Systems Visualization */}
          <div className="max-w-5xl mx-auto">
            <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 lg:p-8 shadow-2xl shadow-orange-500/10">
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-white/60 uppercase tracking-wide">
                  Your Systems, Connected
                </p>
              </div>

              {/* Department Cards - All Orange Icons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Marketing', icon: '📊' },
                  { name: 'Sales', icon: '💼' },
                  { name: 'Ops', icon: '⚙️' },
                  { name: 'Finance', icon: '💰' }
                ].map((dept, index) => (
                  <div
                    key={index}
                    className="group backdrop-blur-sm bg-white/5 rounded-xl p-5 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                        {dept.icon}
                      </div>
                      <div className="text-sm font-semibold text-white">{dept.name}</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-white/20 rounded-full"></div>
                      <div className="h-1.5 bg-white/15 rounded-full w-3/4"></div>
                      <div className="h-1.5 bg-white/10 rounded-full w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Connection Lines SVG */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl mt-8">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="orangeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(249, 115, 22, 0.2)" />
                      <stop offset="50%" stopColor="rgba(249, 115, 22, 0.5)" />
                      <stop offset="100%" stopColor="rgba(249, 115, 22, 0.2)" />
                    </linearGradient>
                  </defs>
                  <line x1="12.5%" y1="50%" x2="37.5%" y2="50%" stroke="url(#orangeLineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                  <line x1="37.5%" y1="50%" x2="62.5%" y2="50%" stroke="url(#orangeLineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <line x1="62.5%" y1="50%" x2="87.5%" y2="50%" stroke="url(#orangeLineGradient)" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                </svg>
              </div>

              {/* Central Hub Indicator */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-xs font-semibold text-white shadow-lg blueprint-pulse">
                Custom Solutions Hub
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          2. WHO THIS IS BUILT FOR - Glassmorphism Cards
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who Custom Solutions is{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                built for
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Designed for companies that need more than off-the-shelf solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whoItHelps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-xl p-8 border-l-4 border-orange-500 border-t border-r border-b border-t-white/10 border-r-white/10 border-b-white/10 hover:bg-white/10 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          3. THREE OUTCOMES - Card Grid
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What you'll{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                walk away with
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-xl p-8 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {outcome.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          4. WHAT IT MEANS - Split Layout with Timeline
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Copy */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  What{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    "Custom Solutions"
                  </span>{" "}
                  really means
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  This isn't one more call and a PDF. We become your systems partner for a focused sprint—mapping, redesigning, and implementing the backbone of how your business runs.
                </p>
                <p className="text-white/60 leading-relaxed">
                  We dig into every department, understand how information flows (or doesn't), and design a system that actually works for your team—not against them.
                </p>
              </div>

              {/* Right: Vertical Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500/30" />

                {/* Animated particle on timeline */}
                <div className="absolute left-5 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50 timeline-particle" />

                <div className="space-y-8">
                  {processSteps.map((step, index) => (
                    <div key={index} className="relative pl-16">
                      {/* Step Number */}
                      <div className="absolute left-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/30">
                        {index + 1}
                      </div>

                      <div className="backdrop-blur-sm bg-white/5 rounded-xl p-5 border border-white/10 hover:border-orange-500/30 transition-colors">
                        <h3 className="text-lg font-semibold text-white mb-3">
                          {step.phase}
                        </h3>
                        <ul className="space-y-2">
                          {step.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-3 text-white/60 text-sm"
                            >
                              <CheckCircleIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          5. EXAMPLES - 4-Column Grid
          ============================================ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              A few examples of{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Custom Solutions
              </span>{" "}
              in action
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Real implementations that transformed how these companies operate
            </p>
          </div>

          {/* 4-Column Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          6. WORKS BEST WITH THESE APPS
          ============================================ */}
      {recommendedApps.length > 0 && (
        <section className="py-20 sm:py-28 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Works best with these{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Apps
                </span>
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
                    className="group backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-orange-500">
                        OMG App
                      </p>
                      <RelationBadge
                        label={badgeLabel}
                        priority={relation?.priority}
                        className="text-[10px] px-2 py-0.5"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {app.label}
                    </h3>
                    <p className="text-sm font-medium text-orange-400 mb-3">
                      {app.tagline}
                    </p>
                    <p className="text-sm text-white/60 mb-4">
                      {app.summary}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={app.href}
                        className="inline-flex items-center text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        View {app.label}
                        <ArrowRightIcon className="w-3 h-3 ml-1" />
                      </Link>
                      {app.id === "crm" && (
                        <Link
                          href="/apps/demo/crm"
                          className="inline-flex items-center text-xs font-medium text-white/50 hover:text-white/70 transition-colors"
                        >
                          Try CRM demo
                        </Link>
                      )}
                      {app.id === "svd" && (
                        <Link
                          href="/apps/demo/securevault-docs"
                          className="inline-flex items-center text-xs font-medium text-white/50 hover:text-white/70 transition-colors"
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

      {/* ============================================
          7. USED MOST IN THESE INDUSTRIES - Icon Grid
          ============================================ */}
      {industries.length > 0 && (
        <section className="py-20 sm:py-28 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Used most in these{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                industries
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry) => {
                const Icon = industryIcons[industry.id] || BuildingOffice2Icon;
                return (
                  <Link
                    key={industry.id}
                    href={industry.href}
                    className="group backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 text-center"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-colors">
                      <Icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {industry.label}
                    </h3>
                    <p className="text-sm text-white/60">
                      {industryDescriptions[industry.id] || industry.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          8. FINAL CTA - Gradient Banner with Glow
          ============================================ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to rebuild your systems the right way?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            We'll map your current tools, find the gaps, and design a Custom Solutions plan that fits the way you and your team actually work.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center rounded-full bg-white px-8 py-4 font-semibold text-orange-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Talk about my systems
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-8 py-4 font-semibold text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Explore live demos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
