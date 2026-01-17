// src/app/industries/accounting/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { getIndustryById } from "@/config/industries_config";
import { getAppsByIds } from "@/config/apps_config";
import { getSolutionsByIds } from "@/config/solutions_config";
import { LeadFormWrapper } from "@/components/forms";

export const metadata: Metadata = {
  title: "Financial Workflow Engine | Accounting Automation | OMGsystems",
  description:
    "Automate 80% of your accounting firm's grind — secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
  keywords:
    "accounting automation, CPA firm software, document management, client onboarding, Canadian accounting, tax preparation, financial workflow, accounting CRM",
  openGraph: {
    title: "Financial Workflow Engine | Accounting Automation | OMGsystems",
    description:
      "Automate 80% of your accounting firm's grind — secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
    type: "website",
    images: [
      {
        url: "/images/accounting/accounting-workflow-preview.gif",
        width: 1200,
        height: 630,
        alt: "Accounting firm automation dashboard – intake to billing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Workflow Engine | Accounting Automation | OMGsystems",
    description:
      "Automate 80% of your accounting firm's grind — secure document capture, AI workflows, scheduling, identity verification, e-sign and billing — built for Canadian CPA firms.",
    images: ["/images/accounting/accounting-workflow-preview.gif"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/industries/accounting",
  },
};

export default function AccountingPage() {
  const industry = getIndustryById("acc");

  // Get apps from industry config
  const appRelations = industry.apps ?? industry.recommendedApps ?? [];
  const appIds = appRelations.map((rel) => rel.appId);
  const apps = getAppsByIds(appIds);

  // Get solutions from industry config
  const solutionRelations =
    industry.recommendedSolutions ?? industry.solutions ?? [];
  const solutionIds = solutionRelations.map((rel) => rel.solutionId);
  const solutions = getSolutionsByIds(solutionIds);

  // Separate primary and secondary apps
  const primaryApps = appRelations.filter((rel) => rel.role === "primary");
  const secondaryApps = appRelations.filter((rel) => rel.role === "secondary");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION - Indigo/Violet Theme with Floating Numbers Animation
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-40 sm:pt-52 pb-20">
        {/* SVG Animated Ledger Lines and Calculator Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Indigo gradient for ledger lines */}
              <linearGradient
                id="ledgerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.3)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
              </linearGradient>

              {/* Vertical ledger gradient */}
              <linearGradient
                id="ledgerVertical"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
              </linearGradient>
            </defs>

            {/* Horizontal ledger lines */}
            <line
              x1="0"
              y1="150"
              x2="1200"
              y2="150"
              stroke="url(#ledgerGradient)"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1="0"
              y1="300"
              x2="1200"
              y2="300"
              stroke="url(#ledgerGradient)"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="0"
              y1="450"
              x2="1200"
              y2="450"
              stroke="url(#ledgerGradient)"
              strokeWidth="1"
              opacity="0.35"
            />
            <line
              x1="0"
              y1="600"
              x2="1200"
              y2="600"
              stroke="url(#ledgerGradient)"
              strokeWidth="1"
              opacity="0.25"
            />

            {/* Vertical column lines (like spreadsheet) */}
            <line
              x1="200"
              y1="0"
              x2="200"
              y2="800"
              stroke="url(#ledgerVertical)"
              strokeWidth="1"
              opacity="0.2"
            />
            <line
              x1="400"
              y1="0"
              x2="400"
              y2="800"
              stroke="url(#ledgerVertical)"
              strokeWidth="1"
              opacity="0.15"
            />
            <line
              x1="600"
              y1="0"
              x2="600"
              y2="800"
              stroke="url(#ledgerVertical)"
              strokeWidth="1"
              opacity="0.2"
            />
            <line
              x1="800"
              y1="0"
              x2="800"
              y2="800"
              stroke="url(#ledgerVertical)"
              strokeWidth="1"
              opacity="0.15"
            />
            <line
              x1="1000"
              y1="0"
              x2="1000"
              y2="800"
              stroke="url(#ledgerVertical)"
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Animated data points flowing down columns */}
            <circle r="3" fill="#6366F1" opacity="0.6">
              <animate
                attributeName="cy"
                values="0;800"
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values="200;200"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="2" fill="#8B5CF6" opacity="0.5">
              <animate
                attributeName="cy"
                values="0;800"
                dur="6s"
                begin="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values="600;600"
                dur="6s"
                begin="1s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="4" fill="#A78BFA" opacity="0.4">
              <animate
                attributeName="cy"
                values="0;800"
                dur="10s"
                begin="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values="1000;1000"
                dur="10s"
                begin="3s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Floating Calculator/Math Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Calculator icon */}
          <div className="absolute top-[15%] left-[8%] text-indigo-400/20 float-number">
            <svg
              className="w-16 h-16"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h16V4H4zm2 2h12v4H6V6zm0 6h3v2H6v-2zm5 0h3v2h-3v-2zm5 0h3v6h-3v-6zm-10 4h3v2H6v-2zm5 0h3v2h-3v-2z" />
            </svg>
          </div>

          {/* Percentage symbol */}
          <div className="absolute top-[25%] right-[12%] text-violet-400/15 float-number-delayed text-6xl font-light">
            %
          </div>

          {/* Dollar sign */}
          <div className="absolute top-[60%] left-[5%] text-indigo-500/15 float-number text-7xl font-light">
            $
          </div>

          {/* Plus-minus symbol */}
          <div className="absolute top-[45%] right-[8%] text-purple-400/20 float-number-delayed text-5xl font-light">
            ±
          </div>

          {/* Sigma/Sum symbol */}
          <div className="absolute bottom-[20%] left-[15%] text-violet-500/15 float-number text-6xl font-serif">
            Σ
          </div>

          {/* Equals sign */}
          <div className="absolute bottom-[30%] right-[15%] text-indigo-400/20 float-number-delayed text-5xl font-light">
            =
          </div>

          {/* Pi symbol */}
          <div className="absolute top-[35%] left-[25%] text-purple-400/10 float-number text-4xl font-serif">
            π
          </div>

          {/* Division symbol */}
          <div className="absolute bottom-[45%] right-[25%] text-violet-400/15 float-number-delayed text-4xl font-light">
            ÷
          </div>
        </div>

        {/* Indigo Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] indigo-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px] indigo-glow-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-400 mb-4">
            Industry · Accounting
          </p>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Clean Intake. Clean Books.
            </span>
            <br />
            Calm Firm.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Stop chasing clients for documents and status updates—let your
            systems do the heavy lifting so you can focus on advisory.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "Secure Document Portals",
              "Automated Reminders",
              "E-Sign Ready",
              "Tax Season Ready",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-sm text-white/80"
              >
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Streamline My Firm
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PAIN POINTS SECTION - What's slowing your firm down
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What's slowing your firm down
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              You know the drill—clients who ghost on document requests, manual
              intake that eats hours, and tax season chaos that never seems to
              end.
            </p>
          </div>

          {/* Pain points grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Chasing Documents */}
            <div className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Chasing Documents
              </h3>
              <p className="text-sm text-white/50">
                Endless email threads requesting the same docs over and over.
                Clients forget, you follow up, repeat.
              </p>
            </div>

            {/* Manual Intake */}
            <div className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Manual Intake
              </h3>
              <p className="text-sm text-white/50">
                Paper forms, scattered PDFs, and handwritten notes that need to
                be typed into your system.
              </p>
            </div>

            {/* Security Concerns */}
            <div className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Security Concerns
              </h3>
              <p className="text-sm text-white/50">
                Sensitive financial data flying around in email attachments and
                unsecured file shares.
              </p>
            </div>

            {/* Deadline Scrambles */}
            <div className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Deadline Scrambles
              </h3>
              <p className="text-sm text-white/50">
                Tax season, year-end, quarterly filings—always rushing because
                clients wait until the last minute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WORKFLOW STEPS SECTION - How OMGsystems transforms your firm
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-400 mb-3">
              The Solution
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From intake to invoice, automated
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Replace the chaos with a clean, automated workflow that moves
              clients through your process without you lifting a finger.
            </p>
          </div>

          {/* Steps with vertical timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/50 to-purple-500/50">
              {/* Animated particles */}
              <div className="timeline-particle-indigo" />
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Client Intake Portal",
                  description:
                    "New clients land on a branded portal. They upload their docs, fill out their info, and sign engagement letters—all in one visit.",
                  features: [
                    "Secure document upload",
                    "Digital signatures",
                    "Auto-categorization",
                  ],
                },
                {
                  step: "02",
                  title: "Smart Document Collection",
                  description:
                    "SecureVault Docs sends automated requests for missing items. Clients get reminders until everything is in. You track it all from one dashboard.",
                  features: [
                    "Auto-reminders",
                    "Checklist tracking",
                    "OCR scanning",
                  ],
                },
                {
                  step: "03",
                  title: "Workflow Automation",
                  description:
                    "Once documents arrive, they route to the right team member. Tasks are created, deadlines are set, and nothing falls through the cracks.",
                  features: [
                    "Auto-task creation",
                    "Team assignments",
                    "Deadline tracking",
                  ],
                },
                {
                  step: "04",
                  title: "Client Communication",
                  description:
                    "Status updates go out automatically. Clients know where they stand. You focus on the actual work, not the back-and-forth.",
                  features: [
                    "Status notifications",
                    "Secure messaging",
                    "Progress tracking",
                  ],
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`relative flex items-start gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Step number circle */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30 z-10">
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all">
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/50 mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIAL SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote text */}
            <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
              "We cut our document collection time by 70%. Clients upload
              everything through the portal, and I actually have time to review
              their financials instead of chasing paperwork."
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white font-semibold">
                SM
              </div>
              <div>
                <p className="text-white font-semibold">Sarah Mitchell, CPA</p>
                <p className="text-white/50 text-sm">
                  Mitchell & Associates Accounting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          RECOMMENDED STACK SECTION - Modern Two-Column Design
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              Recommended Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How accounting firms run{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                OMGsystems
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The apps and solutions we pair together so your intake, documents,
              and client workflows all move in one system.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Apps Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Core Apps
                  </h3>
                  <p className="text-sm text-white/50">
                    The foundation of your system
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "SecureVault Docs",
                    href: "/apps/securevault-docs",
                    tagline:
                      "Secure client portals for document collection and e-signatures",
                    isPrimary: true,
                  },
                  {
                    name: "OMGCRM",
                    href: "/apps/omgcrm",
                    tagline:
                      "Track clients, deadlines, and workflow stages in one view",
                    isPrimary: true,
                  },
                  {
                    name: "OMG Leads",
                    href: "/apps/leadflow-engine",
                    tagline:
                      "Capture new client inquiries and automate follow-ups",
                    isPrimary: false,
                  },
                ].map((app, index) => (
                  <Link
                    key={index}
                    href={app.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                          {app.name}
                        </h4>
                        {app.isPrimary && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-medium border border-indigo-500/30">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/50">{app.tagline}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-white/30 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Solutions Column */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Solutions
                  </h3>
                  <p className="text-sm text-white/50">
                    Automation & strategy add-ons
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "Automations",
                    href: "/solutions/automations",
                    tagline:
                      "Connect your tools and eliminate repetitive admin tasks",
                  },
                  {
                    name: "Strategy Session",
                    href: "/solutions/strategy-session",
                    tagline:
                      "1-on-1 planning to map your ideal client workflow",
                  },
                ].map((solution, index) => (
                  <Link
                    key={index}
                    href={solution.href}
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-violet-400 transition-colors">
                        {solution.name}
                      </h4>
                      <p className="text-sm text-white/50">{solution.tagline}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                ))}
              </div>

              {/* Optional Training Badge */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border border-indigo-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      Optional: OMG AI Mastery
                    </h4>
                    <p className="text-white/50 text-xs mt-1">
                      Train your team to use AI tools for faster document
                      processing and client communication.
                    </p>
                    <Link
                      href="/apps/omg-ai-mastery"
                      className="text-indigo-400 text-xs font-medium hover:text-indigo-300 transition-colors mt-2 inline-block"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600" />

        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to stop chasing and start advising?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Let's look at your current intake and document process. We'll map
            out exactly where OMGsystems can save you hours every week.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-white/90 transition-all shadow-lg"
            >
              Book Strategy Session
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadFormWrapper variant="industries" />
    </div>
  );
}
