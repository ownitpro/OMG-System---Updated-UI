"use client";

import Link from "next/link";
import {
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CogIcon,
  UserGroupIcon,
  FolderIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";
import { SolutionsLeadForm, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";

const painPoints = [
  {
    title: "Every tool works… alone",
    description: "CRM, inbox, calendar, invoicing—none of them talk properly.",
    icon: ExclamationTriangleIcon,
  },
  {
    title: "Follow-up depends on someone's memory",
    description: "Leads get missed. Tasks fall through. No automatic safety nets.",
    icon: ClockIcon,
  },
  {
    title: "You're the integration",
    description: "You're the one forwarding emails, saving attachments, chasing updates.",
    icon: ArrowPathIcon,
  },
  {
    title: "Endless status check-ins",
    description: '"Did we send that?" "Did they sign?" "Did we follow up?" all day.',
    icon: PhoneIcon,
  },
  {
    title: "No clear picture of what's working",
    description: "Data is scattered, so decisions are based on gut, not dashboards.",
    icon: ChartBarIcon,
  },
  {
    title: "Time with family gets the leftovers",
    description: "Evenings and weekends become your admin time.",
    icon: ClockIcon,
  },
];

const transformationRows = [
  {
    old: "Leads live in 5 different places",
    new: "Leads auto-captured, scored, and routed to the right pipeline",
  },
  {
    old: "You chase documents and signatures",
    new: "Clients get automated reminders, portals, and status updates",
  },
  {
    old: "You only follow up when you remember",
    new: "Follow-ups trigger automatically based on time or status",
  },
  {
    old: "You wonder which ads are working",
    new: "Automated reporting shows what actually drives revenue",
  },
  {
    old: "Late nights catching up",
    new: "Evenings back for family, rest, and actually thinking",
  },
];

const automationPillars = [
  {
    title: "Leads & Sales",
    icon: UserGroupIcon,
    automations: [
      "New lead → instant SMS + email",
      "Missed call → auto-text + task",
      "Pipeline stage changes → follow-up sequences",
      "Quote sent → reminder if unopened",
    ],
  },
  {
    title: "Operations & Projects",
    icon: CogIcon,
    automations: [
      "New client → auto-create tasks, folders, portals",
      "Internal hand-offs → auto-assign next team",
      "Status changes → notify the right people",
      "Project checklists → track progress without manual chasing",
    ],
  },
  {
    title: "Documents & Compliance",
    icon: DocumentTextIcon,
    automations: [
      "File upload → auto-file in SecureVault Docs",
      "Missing documents → automated reminders",
      "Contract expiry → 30/60/90-day alerts",
      "Portal updates → log who did what, when",
    ],
  },
  {
    title: "Billing & Admin",
    icon: CurrencyDollarIcon,
    automations: [
      "New invoice → scheduled reminders",
      "Overdue payments → polite sequences",
      "Renewals → renewal workflows",
      "Financial snapshots → send to owner/leadership weekly",
    ],
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Mapping Call",
    description:
      "We walk through your tools, bottlenecks, and where your time actually goes.",
    icon: PhoneIcon,
  },
  {
    step: "2",
    title: "Automation Blueprint",
    description:
      "We design a clear, visual map of what should be automated, in what order.",
    icon: DocumentTextIcon,
  },
  {
    step: "3",
    title: "Build & Connect",
    description:
      "We connect your tools, set up workflows, and test everything end-to-end.",
    icon: CogIcon,
  },
  {
    step: "4",
    title: "Monitor & Improve",
    description:
      "We watch performance, fix edge cases, and adjust as your business grows.",
    icon: ChartBarIcon,
  },
];

const impactMetrics = [
  {
    title: "5–10+ hours back per week, per key role",
    description: "Less copy-paste. Less chasing. Less 'did you send that?'",
    icon: ClockIcon,
  },
  {
    title: "Cleaner hand-offs across your team",
    description:
      "Tasks, docs, and status changes are all automated, not verbal.",
    icon: UserGroupIcon,
  },
  {
    title: "More time for sales and strategy",
    description: "Owners and leaders can finally get out of the weeds.",
    icon: ChartBarIcon,
  },
  {
    title: "Less stress after hours",
    description: "Systems don't sleep. You're allowed to.",
    icon: CheckCircleIcon,
  },
];

const automationExamples = [
  {
    title: "New Lead → Instant Follow-Up + CRM + Task",
    description:
      "Lead fills out a form → automatically added to OMGCRM → assigned to the right pipeline → receives instant welcome SMS/email → task created for your team.",
  },
  {
    title: "Document Request → Client Portal + Reminders",
    description:
      "You send a SecureVault Docs portal link → client sees exactly what's needed → receives automatic reminders until everything is uploaded.",
  },
  {
    title: "Missed Call → Text + Callback Task",
    description:
      "Missed call from a new number? They get a quick 'sorry we missed you' text + link, and your team gets a callback task automatically.",
  },
  {
    title: "Quote Sent → Smart Follow-Up",
    description:
      "When a quote is sent, automations follow up if it's unopened or untouched after a set number of days.",
  },
  {
    title: "New Client → Full Onboarding Workflow",
    description:
      "New client in CRM triggers tasks, folders, docs, welcome email, and internal notifications.",
  },
  {
    title: "Overdue Invoice → Gentle Sequences",
    description:
      "Automatically send reminders at set intervals with the right tone, not copy-pasted from old emails.",
  },
];

const faqs = [
  {
    question: "Is this going to be too complex for my team?",
    answer:
      "No. We design automations so they reduce clicks and screens, not add more. If it doesn't make your day feel simpler, we adjust it.",
  },
  {
    question: "What tools can you work with?",
    answer:
      "We work with CRMs, calendars, inboxes, accounting apps, document tools, and more. We'll map what you already use and build from there.",
  },
  {
    question: "How long until we see a difference?",
    answer:
      "Most clients feel the difference in the first few weeks—especially around follow-up, document chasing, and internal hand-offs.",
  },
  {
    question: "Do we need a full-time tech person?",
    answer:
      "No. We build, maintain, and document everything so your team can use it without 'being the IT department.'",
  },
  {
    question: "What if our processes change?",
    answer:
      "Your workflows will evolve. We design your automations so they can be edited, scaled, and improved without starting from scratch.",
  },
];

export default function AutomationsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Global Styles for Animations */}
      <style jsx global>{`
        /* Pipeline particle flow animation */
        @keyframes pipelineFlow {
          0% { left: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* Separate animation for "How It Works" section - stops at end */
        @keyframes pipelineFlowStop {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { left: 97%; opacity: 1; }
          100% { left: 97%; opacity: 0; }
        }

        /* Node pulse glow */
        @keyframes nodePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px 8px rgba(16, 185, 129, 0.15);
            transform: scale(1.05);
          }
        }

        /* Glow orb float */
        @keyframes glowFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        /* Card 3D tilt on hover */
        .automation-card-3d {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        .group:hover .automation-card-3d {
          transform: rotateX(-5deg) rotateY(5deg) translateY(-8px);
        }

        /* Pipeline particle */
        .pipeline-particle {
          animation: pipelineFlow 8s linear infinite;
        }
        .pipeline-particle-slow {
          animation: pipelineFlow 12s linear infinite;
        }
        .pipeline-particle-slower {
          animation: pipelineFlow 16s linear infinite;
        }

        /* Pipeline particles that stop at end (for How It Works section) */
        .pipeline-dot-stop {
          animation: pipelineFlowStop 6s ease-in-out infinite;
        }
        .pipeline-dot-stop-slow {
          animation: pipelineFlowStop 8s ease-in-out infinite;
        }

        /* Node pulse */
        .pipeline-node {
          animation: nodePulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Pipeline Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Pipeline Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
            {/* Top Pipeline */}
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#pipelineGradient)" strokeWidth="2" strokeDasharray="8 4" />
            {/* Middle Pipeline */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#pipelineGradient)" strokeWidth="2" strokeDasharray="8 4" />
            {/* Bottom Pipeline */}
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#pipelineGradient)" strokeWidth="2" strokeDasharray="8 4" />
            <defs>
              <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#10B981" />
                <stop offset="80%" stopColor="#10B981" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pipeline Nodes */}
          <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" />
          <div className="absolute top-[20%] left-[40%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[20%] left-[65%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[20%] left-[85%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" style={{ animationDelay: '1.5s' }} />

          <div className="absolute top-[50%] left-[10%] w-3 h-3 bg-teal-400 rounded-full pipeline-node" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-[50%] left-[35%] w-3 h-3 bg-teal-400 rounded-full pipeline-node" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-[50%] left-[60%] w-3 h-3 bg-teal-400 rounded-full pipeline-node" style={{ animationDelay: '1.3s' }} />
          <div className="absolute top-[50%] left-[90%] w-3 h-3 bg-teal-400 rounded-full pipeline-node" style={{ animationDelay: '1.8s' }} />

          <div className="absolute top-[80%] left-[20%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" style={{ animationDelay: '0.7s' }} />
          <div className="absolute top-[80%] left-[45%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" style={{ animationDelay: '1.2s' }} />
          <div className="absolute top-[80%] left-[70%] w-3 h-3 bg-emerald-400 rounded-full pipeline-node" style={{ animationDelay: '1.7s' }} />

          {/* Animated Particles */}
          <div className="absolute top-[20%] w-2 h-2 bg-emerald-300 rounded-full pipeline-particle" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[20%] w-2 h-2 bg-emerald-300 rounded-full pipeline-particle-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[50%] w-2 h-2 bg-teal-300 rounded-full pipeline-particle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[50%] w-2 h-2 bg-teal-300 rounded-full pipeline-particle-slower" style={{ animationDelay: '4s' }} />
          <div className="absolute top-[80%] w-2 h-2 bg-emerald-300 rounded-full pipeline-particle-slow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[80%] w-2 h-2 bg-emerald-300 rounded-full pipeline-particle" style={{ animationDelay: '3s' }} />

          {/* Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-52 pb-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Solution · Automations
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Reclaim <span className="text-emerald-400">10+ Hours</span> Every Week
              </h1>

              <p className="text-xl text-slate-200 leading-relaxed">
                Eliminate manual busywork, automate workflows, and free your team to focus on revenue—not admin tasks.
              </p>
              
              <ul className="space-y-3 text-slate-200">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>40–60% less admin time</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Fewer dropped balls between teams</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>More time spent on sales, not software</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                  Book an Automation Mapping Call
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#examples"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 border border-emerald-500/30 hover:border-emerald-400/50"
                >
                  See Automation Examples
                </Link>
              </div>
            </div>
            
            {/* Right: Animated workflow card */}
            <div className="relative">
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-200">Leads</span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRightIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm font-medium text-blue-200">Tasks</span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRightIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-sm font-medium text-purple-200">Invoices</span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRightIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    <span className="text-sm font-medium text-amber-200">Follow-ups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN SECTION - Timeline Design */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The real reason you're drowning in manual work
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              It's not that your team is lazy. It's that your systems are glued together with copy-paste and crossed fingers.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Horizontal Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {painPoints.map((point, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-500/50 items-center justify-center z-10 group-hover:border-amber-400 transition-colors">
                    <span className="text-xs font-bold text-amber-400">{index + 1}</span>
                  </div>

                  {/* Card */}
                  <div className="lg:mt-12 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">
                          {point.title}
                        </h3>
                        <p className="text-sm text-white/60">{point.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANSFORMATION SECTION - Split Comparison */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            The shift from manual busywork to an automated backbone
          </h2>

          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Animated Center Divider */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent" />
              {/* Animated particles on divider */}
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-full left-1/2 -translate-x-1/2 animate-pulse" style={{ top: '20%' }} />
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-full left-1/2 -translate-x-1/2 animate-pulse" style={{ top: '50%', animationDelay: '0.5s' }} />
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-full left-1/2 -translate-x-1/2 animate-pulse" style={{ top: '80%', animationDelay: '1s' }} />
            </div>

            <div className="grid md:grid-cols-2">
              {/* Old Way */}
              <div className="p-8 bg-red-500/5 border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Old Way
                  </h3>
                </div>
                <ul className="space-y-4">
                  {transformationRows.map((row, index) => (
                    <li key={index} className="flex items-start gap-3 group hover:bg-red-500/5 p-2 rounded-lg transition-colors -mx-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">{row.old}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Automated Way */}
              <div className="p-8 bg-emerald-500/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Automated Way
                  </h3>
                </div>
                <ul className="space-y-4">
                  {transformationRows.map((row, index) => (
                    <li key={index} className="flex items-start gap-3 group hover:bg-emerald-500/5 p-2 rounded-lg transition-colors -mx-2">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70 group-hover:text-white/90 transition-colors">{row.new}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE AUTOMATE - Bento Grid */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What we automate for you
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We don't sell random zaps. We build an automation backbone around the four parts of your business that burn the most time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {automationPillars.map((pillar, index) => (
              <div
                key={index}
                className="group bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                    <pillar.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {pillar.automations.map((auto, autoIndex) => (
                    <li key={autoIndex} className="flex items-start gap-3 text-white/70 hover:text-white/90 transition-colors">
                      <ArrowRightIcon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                      <span className="text-sm">{auto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS - Pipeline Steps */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
            How we build automations that actually stick
          </h2>

          {/* Pipeline Visualization */}
          <div className="relative mb-12">
            {/* Connecting Pipeline Line - Desktop */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-emerald-400/40 to-emerald-500/20 rounded-full" />
              {/* Animated particles on pipeline - stop at node 4 */}
              <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -top-1 pipeline-dot-stop" />
              <div className="absolute w-3 h-3 bg-teal-400 rounded-full -top-1 pipeline-dot-stop-slow" style={{ animationDelay: '3s' }} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="group" style={{ perspective: '1000px' }}>
                  {/* Step Number Node */}
                  <div className="relative flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white font-bold text-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] pipeline-node z-10">
                      {step.step}
                    </div>
                  </div>

                  {/* Step Card with 3D Tilt */}
                  <div className="automation-card-3d bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 p-5 text-center group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] min-h-[180px]">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/60">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Book my Automation Mapping Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <p className="mt-4 text-sm text-white/60">
              We'll start by finding where you can win back the first 5–10 hours per week.
            </p>
          </div>
        </div>
      </section>

      {/* 6. HOURS & IMPACT - Left Border Accent Cards */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            The impact you actually feel week to week
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="group bg-slate-900/60 backdrop-blur-xl rounded-xl border-l-4 border-l-emerald-500/50 border border-white/10 p-6 hover:border-l-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors">
                    <metric.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 text-lg">
                      {metric.title}
                    </h3>
                    <p className="text-sm text-white/60">{metric.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AUTOMATION EXAMPLES GRID - Enhanced Hover */}
      <section id="examples" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            A few of the automations we set up on day one
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationExamples.map((example, index) => (
              <div
                key={index}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="automation-card-3d bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/25 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                      <SparklesIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-emerald-200 transition-colors">
                      {example.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 group-hover:text-white/70 transition-colors pl-[52px]">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WORKS BEST WITH APPS & INDUSTRIES */}
      <section className="py-20 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built to plug into the tools and industries you already live in
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Automations works best when it wraps around your core apps and workflows—not when it tries to replace everything overnight.
            </p>
          </div>

          <SolutionRelationsStrip solutionId="automations" />
        </div>
      </section>

      {/* 9. FAQ - Enhanced Accordion */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Common questions about automations
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
              >
                <summary className="font-semibold text-white cursor-pointer list-none flex items-center gap-4 p-6">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-open:bg-emerald-500/25 transition-colors">
                    <span className="text-emerald-400 font-bold text-sm">?</span>
                  </div>
                  <span className="flex-1">{faq.question}</span>
                  <ArrowRightIcon className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform duration-300 flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <div className="pl-12 border-l-2 border-emerald-500/30">
                    <p className="text-white/70 pl-4">{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA - Gradient Glow */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-12 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)]">
            {/* Animated Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" style={{ animation: 'glowFloat 6s ease-in-out infinite' }} />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to stop being the glue in your business?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                We'll map your tools, find the gaps, and design an automation plan that gives you hours back every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                  Talk about my systems
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/try-live-demo"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-emerald-500/30 font-bold rounded-lg hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300"
                >
                  Explore live demos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <SolutionsLeadForm />

      {/* Sticky Button (Desktop) */}
      <StickyGetStartedButton variant="solutions" />

      {/* Mobile Drawer */}
      <MobileFormDrawer variant="solutions" />
    </main>
  );
}

