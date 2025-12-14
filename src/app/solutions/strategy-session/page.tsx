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
  UserGroupIcon,
  DocumentTextIcon,
  SparklesIcon,
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
    title: "Find out what's actually slowing your business down",
    description: "We audit your current systems, tools, and workflows to identify the real bottlenecks—not just the symptoms.",
    icon: ChartBarIcon,
  },
  {
    title: "Discover which AI + automation tools fit your workflow",
    description: "Get personalized recommendations for AI and automation tools that match your industry, team size, and business goals.",
    icon: SparklesIcon,
  },
  {
    title: "Leave with a clear, step-by-step action plan",
    description: "Walk away with a concrete roadmap you can start implementing immediately—no guesswork, no overwhelm.",
    icon: RocketLaunchIcon,
  },
];

const sessionOutline = [
  {
    step: 1,
    title: "Business Audit",
    duration: "30 minutes",
    description: "We dive deep into your current processes, tools, and pain points to understand what's really happening.",
    deliverables: [
      "Complete systems map",
      "Bottleneck identification",
      "Time-waste analysis",
    ],
  },
  {
    step: 2,
    title: "Bottleneck Analysis",
    duration: "45 minutes",
    description: "We identify the root causes of your slowdowns and prioritize what to fix first for maximum impact.",
    deliverables: [
      "Priority action items",
      "ROI projections",
      "Quick wins identified",
    ],
  },
  {
    step: 3,
    title: "AI + Automation Roadmap",
    duration: "45 minutes",
    description: "We map out a clear, step-by-step plan for implementing AI and automation tools that fit your workflow.",
    deliverables: [
      "Custom AI strategy",
      "Tool recommendations",
      "Implementation timeline",
    ],
  },
];

const whoThisIsFor = [
  {
    title: "Business owners with big goals",
    description: "You have ambitious plans, but your systems aren't keeping up with your vision.",
  },
  {
    title: "Teams drowning in manual workflows",
    description: "Your team spends too much time on repetitive tasks instead of high-value work.",
  },
  {
    title: "Leaders ready to leverage AI",
    description: "You know AI and automation can help, but you don't know where to start or what tools to use.",
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
    <main className="min-h-screen bg-white">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div className="space-y-6">
              <p className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200">
                Solution · Strategy Session
              </p>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Turn Chaos into a Clear AI Game Plan
              </h1>
              
              <p className="text-xl text-slate-200 leading-relaxed">
                You've got big goals, but your systems, tools, and workflows aren't moving fast enough.
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                In one focused 2-hour session with the OMG Systems team, we audit your business, find the real bottlenecks, and map out a simple AI + automation roadmap you can start using right away.
              </p>
              
              <ul className="space-y-3 text-slate-200">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Find out what's actually slowing your business down</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Discover which AI + automation tools fit your workflow</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Leave with a clear, step-by-step action plan</span>
                </li>
              </ul>
              
              {/* Price */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <p className="text-white text-lg">
                  Regularly <span className="line-through text-slate-400">$3,000</span> — now{" "}
                  <span className="text-purple-300 font-bold text-2xl">$999</span> for a limited time.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact?solution=strategy-session"
                  className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book My Strategy Session
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#whats-included"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                >
                  Learn More About What's Included
                </Link>
              </div>
            </div>
            
            {/* Right: Visual */}
            <div className="relative">
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Strategy Session</h3>
                      <p className="text-sm text-slate-400">AI + Automation Roadmap</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <LightBulbIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Key Metrics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-2xl font-bold text-white">2hr</div>
                      <div className="text-xs text-slate-400">Session</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-xs text-slate-400">Custom</div>
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <span className="text-sm text-slate-200">Business Audit</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <span className="text-sm text-slate-200">Bottleneck Analysis</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-800 rounded-lg p-3 border border-slate-700">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <span className="text-sm text-slate-200">AI Roadmap</span>
                    </div>
                  </div>

                  {/* CTA Badge */}
                  <div className="bg-purple-500 text-white rounded-lg p-4 text-center">
                    <div className="font-semibold">Limited Time: $999</div>
                    <div className="text-xs opacity-90">Regularly $3,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED */}
      <section id="whats-included" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Your Strategy Session
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In just 2 hours, you'll get a complete business audit, bottleneck analysis, and a custom AI + automation roadmap.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {sessionBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Session Outline */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your 2-Hour Session Outline
            </h3>
            
            <div className="space-y-8">
              {sessionOutline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="grid md:grid-cols-3 gap-3">
                      {item.deliverables.map((deliverable, dIndex) => (
                        <div
                          key={dIndex}
                          className="flex items-center gap-2 text-sm text-gray-700 bg-purple-50 px-3 py-2 rounded-lg"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO THIS IS FOR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who This Strategy Session Is For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you're ready to stop guessing and start executing, this session is for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whoThisIsFor.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Turn Chaos into a Clear Game Plan?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Book your 2-hour strategy session now and lock in the $999 price (regularly $3,000).
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?solution=strategy-session"
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book My Strategy Session
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
            >
              See FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Relations Strip */}
      <SolutionRelationsStrip solutionId="strategy_session" />
    </main>
  );
}

