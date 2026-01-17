"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  Squares2X2Icon,
  LightBulbIcon,
  ChartBarIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  DocumentTextIcon,
  CogIcon,
  SparklesIcon,
  RocketLaunchIcon,
  FireIcon,
  ArrowPathIcon,
  CubeTransparentIcon,
  SignalIcon,
  EyeIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import ServiceNav from "@/components/marketing/ServiceNav";
import { MarketingLeadForm, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";

export default function ServicesPage() {
  const capabilityPoints = [
    "Strategically scoped",
    "Integrated into a broader system",
    "Designed to compound over time",
  ];

  const strategyCapabilities = [
    "Market and competitive analysis",
    "Brand positioning and messaging frameworks",
    "Ideal customer and buyer journey definition",
    "Offer, funnel, and conversion strategy",
  ];

  const demandCapabilities = [
    "Paid media systems (Google, Meta, LinkedIn)",
    "SEO and organic growth infrastructure",
    "Conversion-focused landing pages",
    "Funnel optimization and testing",
  ];

  const brandCapabilities = [
    "Brand systems and visual identity",
    "Creative direction and design frameworks",
    "Website design and optimization",
    "Conversion-focused user experience",
  ];

  const contentCapabilities = [
    "Content strategy and frameworks",
    "Long-form and short-form content systems",
    "Social media distribution models",
    "Messaging alignment across platforms",
  ];

  const infrastructureCapabilities = [
    "Analytics and tracking setup",
    "Reporting dashboards and KPIs",
    "CRM and automation workflows",
    "Performance visibility for decision-makers",
  ];

  const systemConnections = [
    { from: "Strategy", verb: "informs", to: "Acquisition" },
    { from: "Acquisition", verb: "feeds", to: "Content" },
    { from: "Content", verb: "supports", to: "Brand" },
    { from: "Infrastructure", verb: "measures", to: "Everything" },
  ];

  const tierMapping = [
    {
      name: "Ignite",
      description: "Foundation and clarity",
      icon: SparklesIcon,
      color: "amber",
    },
    {
      name: "Flow",
      description: "Consistency and execution",
      icon: RocketLaunchIcon,
      color: "blue",
    },
    {
      name: "Scale",
      description: "Optimization and acceleration",
      icon: FireIcon,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[50%] right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Service Navigation Links */}
            <ServiceNav />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              <Squares2X2Icon className="w-4 h-4" />
              Marketing Capabilities
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Marketing Capabilities{" "}
              <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                Built as Systems
              </span>
            </h1>

            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
              OMG Marketing does not sell standalone services.
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              We design and operate marketing systems, and each capability below exists to support
              structured, scalable growth. This page outlines what we build, not what we sell individually.
            </p>
          </div>
        </div>

        {/* ===== HOW TO READ THIS PAGE ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

            {/* Main Card */}
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 rounded-3xl blur-2xl" />

              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl border border-white/10 overflow-hidden">
                {/* Header with gradient accent */}
                <div className="relative px-8 pt-8 pb-6 border-b border-white/10">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                    How to Read This Page
                  </h2>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Tier callout */}
                  <div className="text-center">
                    <p className="text-white/70 text-lg leading-relaxed">
                      These capabilities are implemented within our
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
                        <SparklesIcon className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 font-semibold">Ignite</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                        <RocketLaunchIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold">Flow</span>
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                        <FireIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 font-semibold">Scale</span>
                      </span>
                    </div>
                    <p className="text-white/50 mt-4">
                      tiers — not purchased independently
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />

                  {/* Capability points */}
                  <div>
                    <p className="text-white/50 text-sm text-center mb-6 uppercase tracking-wider">
                      Each capability is
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {capabilityPoints.map((point, index) => (
                        <div
                          key={index}
                          className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
                        >
                          <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-sky-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-white/80 font-medium text-sm leading-tight">{point}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="text-center pt-4 border-t border-white/[0.06]">
                    <p className="text-white/40 text-sm">
                      Looking for one-off execution?{" "}
                      <span className="text-white/60">We may not be the right fit.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== STRATEGY & FOUNDATION ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                  <CubeTransparentIcon className="w-4 h-4" />
                  Strategy & Foundation
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Where Every System{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                    Starts
                  </span>
                </h2>
                <p className="text-white/70 mb-6">
                  Strong execution without strategy creates noise.
                  This layer defines what should be built, why, and in what order.
                </p>

                <p className="text-white/50 text-sm mb-4">Capabilities include:</p>
                <ul className="space-y-3 mb-8">
                  {strategyCapabilities.map((capability, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{capability}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-white/60 text-sm">
                  This foundation ensures all future execution is aligned and intentional.
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Implemented primarily within <span className="text-amber-400">Ignite</span>, refined in <span className="text-blue-400">Flow</span>, and expanded in <span className="text-purple-400">Scale</span>.
                </p>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
                  <div className="space-y-4">
                    {["Define", "Plan", "Align", "Build"].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-white/5 rounded-xl border border-white/10 p-4"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-sky-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold">
                          {index + 1}
                        </div>
                        <span className="text-white font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== DEMAND & ACQUISITION ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Visual */}
              <div className="relative order-2 lg:order-1">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center mb-4">
                      <MegaphoneIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-sky-500/50" />
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {["Google", "Meta", "LinkedIn"].map((platform, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg border border-white/10 p-3 text-center"
                        >
                          <span className="text-white/60 text-sm">{platform}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-0.5 h-8 bg-gradient-to-b from-sky-500/50 to-blue-500/30" />
                    <div className="bg-blue-500/10 rounded-lg border border-blue-500/30 p-4 mt-4">
                      <span className="text-blue-400 text-sm font-medium">Qualified Leads</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-3xl blur-2xl -z-10" />
              </div>

              {/* Right Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                  <SignalIcon className="w-4 h-4" />
                  Demand & Acquisition
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Systems That Drive{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                    Qualified Traffic
                  </span>
                </h2>
                <p className="text-white/70 mb-6">
                  Traffic alone doesn't create growth — qualified demand does.
                  This layer focuses on building repeatable acquisition systems that attract the right audience.
                </p>

                <p className="text-white/50 text-sm mb-4">Capabilities include:</p>
                <ul className="space-y-3 mb-8">
                  {demandCapabilities.map((capability, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{capability}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-white/60 text-sm">
                  Every channel is connected to a strategy, tracked, and optimized — not run in isolation.
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Introduced in <span className="text-blue-400">Flow</span>, optimized and scaled in <span className="text-purple-400">Scale</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BRAND & EXPERIENCE ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                  <PaintBrushIcon className="w-4 h-4" />
                  Brand & Experience
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  How Your Business Is{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                    Perceived
                  </span>
                </h2>
                <p className="text-white/70 mb-6">
                  Brand is not just visuals — it's how your business communicates, converts, and builds trust
                  across every touchpoint. This layer ensures consistency between message, design, and experience.
                </p>

                <p className="text-white/50 text-sm mb-4">Capabilities include:</p>
                <ul className="space-y-3 mb-8">
                  {brandCapabilities.map((capability, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{capability}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-white/60 text-sm">
                  Brand decisions are made to support clarity and performance — not aesthetics alone.
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Typically built in <span className="text-amber-400">Ignite</span> or <span className="text-blue-400">Flow</span>, strengthened as you scale.
                </p>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {["Message", "Design", "Experience", "Trust"].map((element, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-xl border border-white/10 p-6 text-center hover:border-blue-500/40 transition-all duration-300"
                      >
                        <span className="text-white font-medium">{element}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/30">
                      <EyeIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 text-sm font-medium">Consistent Perception</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTENT & DISTRIBUTION ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                <DocumentTextIcon className="w-4 h-4" />
                Content & Distribution
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Systems That Support{" "}
                <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                  Visibility and Authority
                </span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Content works when it's structured and distributed intentionally.
                This layer focuses on building repeatable content systems — not random posting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {contentCapabilities.map((capability, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-blue-500/40 transition-all duration-300"
                >
                  <CheckCircleIcon className="w-5 h-5 text-blue-400 mb-3" />
                  <p className="text-white/70 text-sm">{capability}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">
                The goal is consistency, authority, and leverage — not volume for volume's sake.
              </p>
              <p className="text-white/50 text-sm">
                Most active in <span className="text-blue-400">Flow</span>, expanded in <span className="text-purple-400">Scale</span>.
              </p>
            </div>
          </div>
        </div>

        {/* ===== INFRASTRUCTURE & ANALYTICS ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                    <ChartBarIcon className="w-4 h-4" />
                    Infrastructure & Analytics
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    The Backbone of{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                      Scalable Marketing
                    </span>
                  </h2>
                  <p className="text-white/70 mb-6">
                    Growth becomes predictable when performance is visible.
                    This layer ensures your marketing system is measurable, accountable, and scalable.
                  </p>

                  <p className="text-white/50 text-sm mb-4">Capabilities include:</p>
                  <ul className="space-y-3 mb-8">
                    {infrastructureCapabilities.map((capability, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70">{capability}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-white/60 text-sm">
                    This infrastructure supports smarter decisions and faster optimization.
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Built alongside <span className="text-blue-400">Flow</span>, essential for <span className="text-purple-400">Scale</span>.
                  </p>
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className="space-y-4">
                    {["Track", "Measure", "Report", "Optimize"].map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-slate-900/50 rounded-xl border border-white/10 p-4"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-white/70">{action}</span>
                        <div className="ml-auto h-2 bg-gradient-to-r from-blue-500/50 to-sky-500/50 rounded-full" style={{ width: `${70 - index * 10}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== HOW CAPABILITIES WORK TOGETHER ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                <ArrowPathIcon className="w-4 h-4" />
                Systems Thinking
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                This Is a System —{" "}
                <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                  Not a Menu
                </span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Each capability above is designed to integrate with the others.
                We don't deploy them randomly or independently.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="space-y-6">
                {systemConnections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-center gap-4 text-lg">
                    <span className="text-white font-medium">{connection.from}</span>
                    <span className="text-blue-400">{connection.verb}</span>
                    <span className="text-white font-medium">{connection.to}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-white/60">
                  This interconnected approach is what allows growth to compound.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== WHERE SERVICES FIT INTO MODEL ===== */}
        <div className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Capabilities Are Deployed Through{" "}
                <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                  Our Tiers
                </span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                We don't sell services individually.
                Capabilities are implemented based on your stage of growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {tierMapping.map((tier, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 text-center hover:border-${tier.color}-500/40 transition-all duration-500`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      tier.color === "amber"
                        ? "bg-amber-500/20"
                        : tier.color === "blue"
                        ? "bg-blue-500/20"
                        : "bg-purple-500/20"
                    }`}
                  >
                    <tier.icon
                      className={`w-8 h-8 ${
                        tier.color === "amber"
                          ? "text-amber-400"
                          : tier.color === "blue"
                          ? "text-blue-400"
                          : "text-purple-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-white/60">{tier.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-white/50 mb-8">
              This ensures you build correctly — without skipping steps.
            </p>

            <div className="text-center">
              <Link
                href="/marketing/tiers"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold rounded-lg hover:from-blue-400 hover:to-sky-400 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                View Marketing Tiers
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-sky-500 to-blue-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Looking for Structure, Not Just Services?
          </h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            If you're ready to move beyond disconnected marketing and build a system designed for
            growth, the next step is a strategic conversation.
          </p>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto">
            Our process is best suited for businesses ready to invest in clarity, systems, and
            long-term execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Apply for a Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/marketing/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <MarketingLeadForm />

      {/* Sticky Button (Desktop) */}
      <StickyGetStartedButton variant="marketing" />

      {/* Mobile Drawer */}
      <MobileFormDrawer variant="marketing" />
    </div>
  );
}
