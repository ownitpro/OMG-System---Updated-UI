import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Automations – Buy Your Time Back Every Week | OMGsystems",
  description:
    "We map your tools, remove repetitive work, and build automations that give you hours back every week—so you can focus on clients, family, and growth.",
  keywords: [
    "business automation",
    "workflow automation",
    "process automation",
    "time savings",
    "automated workflows",
    "business efficiency",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/automations",
  },
  openGraph: {
    title: "Automations – Buy Your Time Back Every Week | OMGsystems",
    description:
      "We map your tools, remove repetitive work, and build automations that give you hours back every week—so you can focus on clients, family, and growth.",
    url: "https://www.omgsystems.com/solutions/automations",
    siteName: "OMGsystems",
    type: "website",
  },
};

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
    <main className="min-h-screen bg-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Solution · Automations
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Automations that buy you time back every week
              </h1>
              
              <p className="text-xl text-slate-200 leading-relaxed">
                We map your tools, remove repetitive work, and build automations that give you hours back every week—so you can focus on clients, family, and growth.
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
                  href="/contact?solution=automations"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book an Automation Mapping Call
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#examples"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                >
                  See Automation Examples
                </Link>
              </div>
            </div>
            
            {/* Right: Animated workflow card */}
            <div className="relative">
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 p-6 shadow-2xl">
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

      {/* 2. PAIN SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The real reason you're drowning in manual work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              It's not that your team is lazy. It's that your systems are glued together with copy-paste and crossed fingers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-gray-600">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRANSFORMATION SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            The shift from manual busywork to an automated backbone
          </h2>
          
          <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-x divide-slate-200">
              {/* Old Way */}
              <div className="p-6 bg-slate-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Old Way
                </h3>
                <ul className="space-y-4">
                  {transformationRows.map((row, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{row.old}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Automated Way */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-lime-50 border-l-4 border-emerald-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Automated Way
                </h3>
                <ul className="space-y-4">
                  {transformationRows.map((row, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{row.new}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE AUTOMATE */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What we automate for you
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We don't sell random zaps. We build an automation backbone around the four parts of your business that burn the most time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {automationPillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <pillar.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {pillar.automations.map((auto, autoIndex) => (
                    <li key={autoIndex} className="flex items-start gap-2 text-slate-300">
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

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            How we build automations that actually stick
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/contact?solution=automations"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book my Automation Mapping Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              We'll start by finding where you can win back the first 5–10 hours per week.
            </p>
          </div>
        </div>
      </section>

      {/* 6. HOURS & IMPACT */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-lime-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            The impact you actually feel week to week
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-emerald-200 p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {metric.title}
                    </h3>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AUTOMATION EXAMPLES GRID */}
      <section id="examples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            A few of the automations we set up on day one
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationExamples.map((example, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WORKS BEST WITH APPS & INDUSTRIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built to plug into the tools and industries you already live in
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Automations works best when it wraps around your core apps and workflows—not when it tries to replace everything overnight.
            </p>
          </div>
          
          <SolutionRelationsStrip solutionId="automations" />
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Common questions about automations
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-slate-50 rounded-xl border border-slate-200 p-6 hover:border-emerald-300 transition-colors"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-lime-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to stop being the glue in your business?
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            We'll map your tools, find the gaps, and design an automation plan that gives you hours back every week.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?solution=automations"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Talk about my systems
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/try-live-demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Explore live demos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

