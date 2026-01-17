import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  LightBulbIcon,
  ChartBarIcon,
  CogIcon,
  RocketLaunchIcon,
  ClockIcon,
  SparklesIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  MapIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";
import { LeadFormWrapper } from "@/components/forms";

export const metadata: Metadata = {
  title: "Custom AI & Systems Strategy Session – Turn Chaos into a Clear Game Plan | OMGsystems",
  description:
    "In one focused 2-hour session, we audit your business, find the real bottlenecks, and map out a simple AI + automation roadmap you can start using right away. Regularly $3,000 — now $999 for a limited time.",
  keywords: [
    "AI strategy session",
    "business automation strategy",
    "AI roadmap",
    "business audit",
    "automation consulting",
    "systems strategy",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/strategy-session",
  },
  openGraph: {
    title: "Custom AI & Systems Strategy Session – Turn Chaos into a Clear Game Plan | OMGsystems",
    description:
      "In one focused 2-hour session, we audit your business, find the real bottlenecks, and map out a simple AI + automation roadmap you can start using right away.",
    url: "https://www.omgsystems.com/solutions/strategy-session",
    siteName: "OMGsystems",
    type: "website",
  },
};

const sessionBenefits = [
  {
    title: "Discovery Call",
    description: "We dive deep into your current workflows, pain points, and goals to understand exactly where you are.",
    icon: ChartBarIcon,
  },
  {
    title: "Tool & Workflow Audit",
    description: "We review every tool you use and map out how data flows between systems.",
    icon: CogIcon,
  },
  {
    title: "AI Opportunity Map",
    description: "Identify where AI can save you hours every week and improve quality.",
    icon: SparklesIcon,
  },
  {
    title: "Custom Action Plan",
    description: "Leave with a prioritized list of automations to implement immediately.",
    icon: RocketLaunchIcon,
  },
];

const sessionOutline = [
  {
    step: 1,
    title: "Discovery",
    time: "Minutes 0-30",
    description: "Deep dive into your current workflows, bottlenecks, and goals. We map out your entire operation.",
  },
  {
    step: 2,
    title: "Audit",
    time: "Minutes 30-60",
    description: "Review your tech stack, identify redundancies, and spot automation opportunities.",
  },
  {
    step: 3,
    title: "Roadmap",
    time: "Minutes 60-90",
    description: "Build your custom AI implementation roadmap with prioritized actions and expected time savings.",
  },
  {
    step: 4,
    title: "Next Steps",
    time: "Minutes 90-120",
    description: "Clear action items, timeline, and optional support packages to implement your plan.",
  },
];

const whoThisIsFor = [
  {
    title: "Business Owners",
    description: "Drowning in admin and manual tasks, ready to scale smarter.",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Growing Teams",
    description: "Scaling fast but systems are breaking under the pressure.",
    icon: ArrowTrendingUpIcon,
  },
  {
    title: "Ops Managers",
    description: "Tired of manual hand-offs and scattered processes.",
    icon: CogIcon,
  },
  {
    title: "Agency Founders",
    description: "Need better client systems and internal workflows.",
    icon: BriefcaseIcon,
  },
];

const benefits = [
  {
    title: "Clarity in 2 Hours",
    description: "Stop guessing what to automate—get a clear roadmap tailored to your business.",
    icon: LightBulbIcon,
  },
  {
    title: "Save 10+ Hours/Week",
    description: "Identify automations that give you real time back immediately.",
    icon: ClockIcon,
  },
  {
    title: "Custom, Not Generic",
    description: "Tailored to YOUR tools, YOUR team, YOUR workflows.",
    icon: MapIcon,
  },
  {
    title: "Actionable Next Steps",
    description: "Leave with a prioritized list, not just ideas.",
    icon: ClipboardDocumentCheckIcon,
  },
];

const faqs = [
  {
    question: "What happens during the 2-hour session?",
    answer: "We start with a comprehensive audit of your business systems, identify bottlenecks, and then create a custom AI + automation roadmap tailored to your specific needs. You'll leave with a clear action plan you can start implementing immediately.",
  },
  {
    question: "Do I need to prepare anything beforehand?",
    answer: "Just come ready to discuss your current processes, tools, and pain points. We'll handle the rest. A brief questionnaire will be sent before the session to help us prepare.",
  },
  {
    question: "What if I'm not tech-savvy?",
    answer: "Perfect! This session is designed for business owners, not tech experts. We explain everything in plain language and focus on practical solutions you can actually use.",
  },
  {
    question: "Can I bring my team?",
    answer: "Absolutely! We recommend having key team members present so everyone understands the roadmap and can contribute insights about current workflows.",
  },
  {
    question: "What happens after the session?",
    answer: "You'll receive a detailed roadmap document with all recommendations, tool suggestions, and next steps. You can implement it yourself, or we can help you execute it through our Automations or Custom Solutions services.",
  },
  {
    question: "Is the $999 price really limited time?",
    answer: "Yes. This is a special introductory price. The regular price is $3,000. Book now to lock in the $999 rate.",
  },
];

export default function StrategySessionPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. HERO SECTION - Chess Board Background */}
      <section className="relative overflow-hidden bg-slate-950 pt-40 sm:pt-52 pb-20 sm:pb-32">
        <div className="absolute inset-0 chess-grid"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="diagonal-dot absolute w-2 h-2 bg-purple-500/60 rounded-full" style={{ top: '10%', left: '5%' }}></div>
          <div className="diagonal-dot-2 absolute w-3 h-3 bg-purple-400/40 rounded-full" style={{ top: '30%', left: '15%' }}></div>
          <div className="diagonal-dot-3 absolute w-2 h-2 bg-violet-500/50 rounded-full" style={{ top: '50%', left: '25%' }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="glow-float absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="glow-float-delayed absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                <RocketLaunchIcon className="w-4 h-4 mr-2" />
                AI-POWERED STRATEGY • SYSTEMS • AUTOMATION
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Turn Chaos into a Clear
                </span>
                <br />
                <span className="text-white">AI Game Plan</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Get a personalized roadmap to automate your busywork, fix bottlenecks, and build systems that scale.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-purple-500/20 text-sm text-white/80">
                  <CheckCircleIcon className="w-4 h-4 text-purple-400" />
                  2-hour deep dive
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-purple-500/20 text-sm text-white/80">
                  <CheckCircleIcon className="w-4 h-4 text-purple-400" />
                  Custom AI roadmap
                </span>
              </div>
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-5 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <p className="text-white text-lg">
                  Regularly <span className="line-through text-white/40">$3,000</span> — now{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent font-bold text-3xl">$999</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  Book My Strategy Session
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#whats-included"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20"
                >
                  See What's Included
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Strategy Session</h3>
                      <p className="text-sm text-white/60">AI + Automation Roadmap</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center strategic-pulse">
                      <LightBulbIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/10">
                      <div className="text-2xl font-bold text-white">2hr</div>
                      <div className="text-xs text-white/60">Session</div>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/10">
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-xs text-white/60">Custom</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED SECTION */}
      <section id="whats-included" className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What's Included in Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Strategy Session
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              In just 2 hours, you'll get a complete business audit and a custom AI + automation roadmap.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {sessionBenefits.map((benefit, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-8 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-white/60">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR SECTION */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Who This Strategy Session Is{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                For
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoThisIsFor.map((item, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SESSION OUTLINE */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 chess-grid opacity-30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your 2-Hour{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Game Plan
              </span>
            </h2>
          </div>
          <div className="space-y-12">
            {sessionOutline.map((item, index) => (
              <div key={index} className="relative flex gap-8">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center z-10 font-bold text-white">
                  {item.step}
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 flex-grow">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium mb-3">
                    {item.time}
                  </span>
                  <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Book a{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Strategy Session
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 border-l-4 border-l-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Empire Blueprint ROI Segment - THE ARCHITECTURAL FORCE MULTIPLIER (Standout Design) */}
      <section className="relative w-full overflow-hidden bg-slate-950 py-32 border-y border-white/5">
        {/* Full-width Immersive Background */}
        <div className="absolute inset-0">
          {/* Layer 1: High-Density Chess Grid */}
          <div className="absolute inset-0 bg-[url('/chess-grid.png')] bg-[length:50px_50px] opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"></div>

          {/* Layer 2: Massive Edge Flux Gradients */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[180px] rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[180px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          {/* Layer 3: Central Deep-Space Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-950/20"></div>
        </div>

        {/* Massive Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-black text-purple-600/[0.015] select-none pointer-events-none tracking-tighter italic whitespace-nowrap leading-none">
          EMPIRE
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column: The Aggressive Vision */}
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-purple-500/10 backdrop-blur-2xl rounded-full border border-purple-500/30">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping"></div>
                <span className="text-[11px] font-black text-purple-300 uppercase tracking-[0.4em]">The Empire Protocol</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter">
                  DOUBLE <br />
                  <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-indigo-300 bg-clip-text text-transparent italic">REVENUE</span>.
                </h3>
                <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter">
                  HALVE <br />
                  <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">EFFORT</span>.
                </h3>
              </div>

              <p className="text-xl text-white/50 leading-relaxed font-light max-w-lg">
                We don't just "optimize"—we <span className="text-white font-medium italic underline decoration-purple-500/50 underline-offset-8">re-engineer</span> your entire operation to handle massive volume without the corresponding labor friction.
              </p>

              <div className="flex flex-wrap gap-12 pt-4">
                <div className="space-y-2">
                  <div className="text-xs font-black text-purple-400/70 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                    Wealth Ceiling
                  </div>
                  <div className="text-5xl font-black text-white">+200%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-black text-violet-400/70 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1 h-4 bg-violet-500 rounded-full"></div>
                    Operational Slack
                  </div>
                  <div className="text-5xl font-black text-white">42h<span className="text-lg text-violet-400/50 ml-1">saved</span></div>
                </div>
              </div>
            </div>

            {/* Right Column: The "Force Modulator" Interface */}
            <div className="relative z-10">
              <div className="absolute -inset-20 bg-purple-600/10 blur-[120px] rounded-full"></div>

              <div className="relative group perspective-1000">
                {/* Glass Control Panel */}
                <div className="backdrop-blur-3xl bg-slate-900/70 p-10 rounded-[3.5rem] border border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.15)] transition-all duration-1000 group-hover:shadow-[0_0_130px_rgba(139,92,246,0.25)]">

                  {/* Panel Header */}
                  <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                    <div className="space-y-1.5">
                      <p className="text-[9px] font-black text-purple-400/60 uppercase tracking-[0.5em]">Engine State</p>
                      <h4 className="text-3xl font-black text-white italic">EMPIRE SCALE</h4>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-purple-900/80 group-hover:rotate-6 transition-all duration-700">
                      <RocketLaunchIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Performance Meters */}
                  <div className="space-y-12">
                    <div className="space-y-5">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">System Autonomy</span>
                        <span className="text-3xl font-black text-purple-400">92%</span>
                      </div>
                      <div className="h-4 bg-black/40 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                        <div className="h-full w-[92%] bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Capacity Headroom</span>
                        <span className="text-3xl font-black text-violet-400 italic">MAXIMUM</span>
                      </div>
                      <div className="h-4 bg-black/40 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                        <div className="h-full w-full bg-gradient-to-r from-violet-700 via-purple-500 to-violet-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* ROI Control Summary */}
                  <div className="mt-14 pt-14 border-t border-white/5 grid grid-cols-2 gap-10 text-center">
                    <div>
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">Leverage Ratio</p>
                      <p className="text-5xl font-black text-white tracking-tighter">12.5<span className="text-xl ml-1 text-purple-500 font-black">X</span></p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">Margin Float</p>
                      <p className="text-5xl font-black text-white tracking-tighter">2.0<span className="text-xl ml-1 text-violet-500 font-black">X</span></p>
                    </div>
                  </div>
                </div>

                {/* Floating Meta-Badges */}
                <div className="absolute -top-10 -right-10 px-8 py-5 bg-purple-500/10 backdrop-blur-3xl rounded-[2rem] border border-purple-500/40 shadow-3xl rotate-6">
                  <div className="text-[11px] font-black text-purple-200 uppercase tracking-[0.15em] flex items-center gap-3">
                    <SparklesIcon className="w-4 h-4 text-purple-400" />
                    Elite Architectural Lead
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Common{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all duration-500"
              >
                <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between p-6 text-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-open:bg-purple-500/40 transition-colors">
                      <QuestionMarkCircleIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-left">{faq.question}</span>
                  </div>
                  <ChevronDownIcon className="w-5 h-5 text-white/40 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6">
                  <div className="pl-14 border-l-2 border-purple-500/30 ml-5">
                    <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-700"></div>
        <div className="absolute inset-0 chess-grid opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Turn Chaos into a Clear Game Plan?
          </h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            In 2 hours, you'll have a custom AI roadmap, clear action items, and a path to 10+ hours saved every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-purple-600 font-bold rounded-xl hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Book Your Strategy Session Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-slate-950 border-t border-white/5">
        <SolutionRelationsStrip solutionId="strategy_session" />
      </div>

      <LeadFormWrapper
        variant="solutions"
        colorScheme="purple"
        customGradient="from-purple-500 to-violet-500"
        customShadow="shadow-purple-500/30"
      />
    </main>
  );
}
