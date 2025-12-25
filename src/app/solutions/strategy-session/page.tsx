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
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";

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
  {
    title: "Recorded Session + Notes",
    description: "Get a full recording and detailed notes so you can reference everything and share with your team.",
    icon: VideoCameraIcon,
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
    answer:
      "We start with a comprehensive audit of your business systems, identify bottlenecks, and then create a custom AI + automation roadmap tailored to your specific needs. You'll leave with a clear action plan you can start implementing immediately.",
  },
  {
    question: "Do I need to prepare anything beforehand?",
    answer:
      "Just come ready to discuss your current processes, tools, and pain points. We'll handle the rest. A brief questionnaire will be sent before the session to help us prepare.",
  },
  {
    question: "What if I'm not tech-savvy?",
    answer:
      "Perfect! This session is designed for business owners, not tech experts. We explain everything in plain language and focus on practical solutions you can actually use.",
  },
  {
    question: "Can I bring my team?",
    answer:
      "Absolutely! We recommend having key team members present so everyone understands the roadmap and can contribute insights about current workflows.",
  },
  {
    question: "What happens after the session?",
    answer:
      "You'll receive a detailed roadmap document with all recommendations, tool suggestions, and next steps. You can implement it yourself, or we can help you execute it through our Automations or Custom Solutions services.",
  },
  {
    question: "Is the $999 price really limited time?",
    answer:
      "Yes. This is a special introductory price. The regular price is $3,000. Book now to lock in the $999 rate.",
  },
];

export default function StrategySessionPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. HERO SECTION - Chess Board Background */}
      <section className="relative overflow-hidden bg-slate-950 pt-40 sm:pt-52 pb-20 sm:pb-32">
        {/* Chess Board Grid Pattern */}
        <div className="absolute inset-0 chess-grid"></div>

        {/* Gradient fade at bottom to blend chess grid into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none"></div>

        {/* Animated Diagonal Dots (Chess Piece Movements) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="diagonal-dot absolute w-2 h-2 bg-purple-500/60 rounded-full" style={{ top: '10%', left: '5%' }}></div>
          <div className="diagonal-dot-2 absolute w-3 h-3 bg-purple-400/40 rounded-full" style={{ top: '30%', left: '15%' }}></div>
          <div className="diagonal-dot-3 absolute w-2 h-2 bg-violet-500/50 rounded-full" style={{ top: '50%', left: '25%' }}></div>
          <div className="diagonal-dot absolute w-2 h-2 bg-purple-500/60 rounded-full" style={{ top: '20%', left: '60%', animationDelay: '1s' }}></div>
          <div className="diagonal-dot-2 absolute w-3 h-3 bg-purple-400/40 rounded-full" style={{ top: '40%', left: '70%', animationDelay: '3s' }}></div>
          <div className="diagonal-dot-3 absolute w-2 h-2 bg-violet-500/50 rounded-full" style={{ top: '60%', left: '80%', animationDelay: '5s' }}></div>
        </div>

        {/* Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="glow-float absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="glow-float-delayed absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                Solution · Strategy Session
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

              {/* Benefit Pills */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-purple-500/20 text-sm text-white/80">
                  <CheckCircleIcon className="w-4 h-4 text-purple-400" />
                  2-hour deep dive
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-purple-500/20 text-sm text-white/80">
                  <CheckCircleIcon className="w-4 h-4 text-purple-400" />
                  Custom AI roadmap
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-purple-500/20 text-sm text-white/80">
                  <CheckCircleIcon className="w-4 h-4 text-purple-400" />
                  Clear action plan
                </span>
              </div>

              {/* Price Card */}
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-5 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <p className="text-white text-lg">
                  Regularly <span className="line-through text-white/40">$3,000</span> — now{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent font-bold text-3xl">$999</span>
                  <span className="text-white/60 text-sm ml-2">for a limited time</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/contact?solution=strategy-session"
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

            {/* Right: Visual - Session Preview Card */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Strategy Session</h3>
                      <p className="text-sm text-white/60">AI + Automation Roadmap</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center strategic-pulse">
                      <LightBulbIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Key Metrics Cards */}
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

                  {/* Process Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/10">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <span className="text-sm text-white/80">Business Audit</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/10">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <span className="text-sm text-white/80">Bottleneck Analysis</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/10">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <span className="text-sm text-white/80">AI Roadmap</span>
                    </div>
                  </div>

                  {/* CTA Badge */}
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl p-4 text-center">
                    <div className="font-semibold">Limited Time: $999</div>
                    <div className="text-xs opacity-80">Regularly $3,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED SECTION - Bento Grid */}
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

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {sessionBenefits.slice(0, 4).map((benefit, index) => (
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

          {/* Full-width 5th item */}
          <div className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-8 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  5
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">
                  {sessionBenefits[4].title}
                </h3>
                <p className="text-white/60">{sessionBenefits[4].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR SECTION - Horizontal Scroll Carousel */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Who This Strategy Session Is{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                For
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              If you're ready to stop guessing and start executing, this session is for you.
            </p>
          </div>

          {/* Drag to explore hint */}
          <p className="text-center text-white/40 text-sm mb-6 md:hidden">← Drag to explore →</p>

          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 md:grid md:grid-cols-4 md:overflow-visible">
              {whoThisIsFor.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 md:w-auto group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-500"
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

          {/* Bottom Quote */}
          <div className="mt-12 text-center">
            <div className="inline-block backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 px-8 py-4">
              <p className="text-lg text-white/80 italic">
                "If you've ever thought <span className="text-purple-400 font-semibold">there has to be a better way</span>—this session is for you."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SESSION OUTLINE - Vertical Timeline */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
        {/* Subtle chess grid background */}
        <div className="absolute inset-0 chess-grid opacity-30"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your 2-Hour{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Game Plan
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Here's exactly what happens during your strategy session.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-purple-500/50 md:-translate-x-0.5">
              {/* Animated particles on line - flowing from top to bottom */}
              <div className="timeline-particle w-3 h-3 bg-purple-400 rounded-full -left-[5px] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
              <div className="timeline-particle w-2.5 h-2.5 bg-purple-500 rounded-full -left-[4px] shadow-[0_0_8px_rgba(168,85,247,0.6)]" style={{ animationDelay: '3.3s' }}></div>
              <div className="timeline-particle w-2 h-2 bg-violet-400 rounded-full -left-[3px] shadow-[0_0_6px_rgba(139,92,246,0.6)]" style={{ animationDelay: '6.6s' }}></div>
            </div>

            <div className="space-y-12">
              {sessionOutline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex gap-6 md:gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center z-10 strategic-pulse">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 1 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                    <div className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-500">
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium mb-3">
                        {item.time}
                      </span>
                      <h3 className="font-bold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION - Horizontal Cards with Left Border */}
      <section className="py-20 sm:py-28 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Book a{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Strategy Session
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-purple-500/20 p-6 border-l-4 border-l-purple-500 hover:border-l-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-purple-300 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-white/60 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION - Smooth Accordion */}
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

      {/* 7. FINAL CTA SECTION - Gradient Banner with Glow */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-700"></div>

        {/* Chess Grid Overlay */}
        <div className="absolute inset-0 chess-grid opacity-20"></div>

        {/* Animated Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="glow-float absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="glow-float-delayed absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Turn Chaos into a Clear Game Plan?
          </h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            In 2 hours, you'll have a custom AI roadmap, clear action items, and a path to 10+ hours saved every week.
          </p>
          <p className="text-lg text-white/70 mb-8">
            <span className="line-through">$3,000</span> → <span className="font-bold text-white">$999</span> for a limited time
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/contact?solution=strategy-session"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-purple-600 font-bold rounded-xl hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Book Your Strategy Session Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <p className="text-white/60 text-sm">
            Limited spots available each month
          </p>
        </div>
      </section>

      {/* 8. Solution Relations Strip */}
      <div className="bg-slate-950 border-t border-white/5">
        <SolutionRelationsStrip solutionId="strategy_session" />
      </div>
    </main>
  );
}
