import { Metadata } from "next";
import Link from "next/link";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";
import {
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ScaleIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "TimeGuard AI – Your 24/7 Client Concierge | OMGsystems",
  description:
    "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
  keywords: [
    "AI assistant",
    "appointment scheduling",
    "client concierge",
    "automated messaging",
    "time management",
    "AI scheduling",
    "business automation",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/solutions/timeguard-ai",
  },
  openGraph: {
    title: "TimeGuard AI – Your 24/7 Client Concierge | OMGsystems",
    description:
      "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    url: "https://www.omgsystems.com/solutions/timeguard-ai",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/timeguard-ai/timeguard-preview.png",
        width: 1200,
        height: 630,
        alt: "TimeGuard AI – 24/7 Client Concierge",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeGuard AI – Your 24/7 Client Concierge | OMGsystems",
    description:
      "An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.",
    images: ["https://www.omgsystems.com/images/timeguard-ai/timeguard-preview.png"],
  },
};

const painPoints = [
  {
    title: "Endless back-and-forth messages",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "Missed calls and lost leads",
    icon: PhoneIcon,
  },
  {
    title: "Scheduling errors and double bookings",
    icon: CalendarIcon,
  },
  {
    title: "Clients waiting for replies",
    icon: ClockIcon,
  },
];

const features = [
  {
    title: "Smart Messaging",
    description:
      "Responds instantly to new or existing clients on any channel you choose.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    title: "Real-Time Scheduling",
    description:
      "Checks your availability and books appointments without double booking.",
    icon: CalendarIcon,
  },
  {
    title: "Client Routing",
    description:
      "Sends people to onboarding, follow-up, payments, or your team—based on rules you set.",
    icon: UserGroupIcon,
  },
  {
    title: "Automatic Rescheduling",
    description:
      "Handles conflicts and changes without requiring you to get involved.",
    icon: ArrowPathIcon,
  },
];

const industries = [
  { name: "Doctors", icon: ShieldCheckIcon },
  { name: "Lawyers", icon: ScaleIcon },
  { name: "Accountants", icon: BriefcaseIcon },
  { name: "Real Estate Agents", icon: HomeIcon },
  { name: "Property Managers", icon: BuildingOfficeIcon },
  { name: "Consultants & Service Providers", icon: AcademicCapIcon },
];

const useCases = [
  {
    title: "A client asks to reschedule",
    description:
      "TimeGuard AI checks the calendar, finds an open slot, and books it instantly.",
    icon: CalendarIcon,
  },
  {
    title: "A new lead messages your website",
    description:
      "It qualifies them, captures details, and books a meeting automatically.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: "A tenant reports an issue",
    description:
      "TimeGuard AI routes them to the correct workflow without you getting involved.",
    icon: UserGroupIcon,
  },
  {
    title: "A patient or client asks a common question",
    description:
      "TimeGuard AI responds immediately with accurate information you've approved.",
    icon: SparklesIcon,
  },
];

const benefits = [
  {
    title: "Save 5–40 Hours Every Week",
    description:
      "No more answering the same messages or coordinating schedules manually.",
    icon: ClockIcon,
  },
  {
    title: "Respond Instantly, Close More Sales",
    description:
      "Speed builds trust—your AI never leaves clients waiting.",
    icon: CheckCircleIcon,
  },
  {
    title: "Reduce Stress for You and Your Team",
    description:
      "Let the system handle admin tasks so you can focus on growth.",
    icon: ShieldCheckIcon,
  },
];

const steps = [
  {
    number: "1",
    title: "We analyze your workflow",
    description:
      "You tell us how your business runs and what your schedule looks like.",
  },
  {
    number: "2",
    title: "We customize your AI assistant",
    description:
      "We build your automations inside N8N so the system matches your business perfectly.",
  },
  {
    number: "3",
    title: "You launch and save time immediately",
    description:
      "Your AI starts running your schedule and handling your communication 24/7.",
  },
];

export default function TimeGuardAIPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#0C0F14]">
      {/* SECTION 1 — HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + CTAs */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#0C0F14] mb-6">
                  Meet TimeGuard AI — Your 24/7 Client Concierge
                </h1>
                <p className="text-xl md:text-2xl text-[#5F697A] leading-relaxed">
                  An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?solution=timeguard-ai"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1C6EF2] text-white font-bold rounded-lg hover:bg-[#1557C0] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book Your Time Assessment Call
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1C6EF2] border-2 border-[#1C6EF2] font-semibold rounded-lg hover:bg-[#DCE8FF] transition-all duration-300"
                >
                  See How It Works
                </Link>
              </div>
            </div>
            {/* Right: Placeholder for AI chat widget mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#DCE8FF]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#1C6EF2] rounded-full flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0C0F14]">TimeGuard AI</p>
                      <p className="text-sm text-[#5F697A]">Online • 24/7</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#DCE8FF] rounded-lg p-4">
                      <p className="text-sm text-[#0C0F14]">
                        I can help you schedule your appointment. What time works best for you?
                      </p>
                    </div>
                    <div className="bg-[#1C6EF2] rounded-lg p-4 text-white ml-auto max-w-[80%]">
                      <p className="text-sm">
                        How about Tuesday at 2 PM?
                      </p>
                    </div>
                    <div className="bg-[#DCE8FF] rounded-lg p-4">
                      <p className="text-sm text-[#0C0F14]">
                        Perfect! I've booked you for Tuesday, March 15th at 2:00 PM. You'll receive a confirmation shortly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#33F3E5] opacity-20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROBLEM SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] mb-4">
              You're Losing Hours Every Week on Tasks You Shouldn't Be Doing
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="bg-[#DCE8FF] rounded-xl p-6 border border-[#1C6EF2]/20"
                >
                  <div className="w-12 h-12 bg-[#1C6EF2] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-[#0C0F14]">
                    {point.title}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-lg text-[#5F697A] max-w-2xl mx-auto">
            TimeGuard AI removes all of this so you can focus on the work that matters.
          </p>
        </div>
      </section>

      {/* SECTION 3 — INTRO TO TIMEGUARD AI */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] mb-6">
                Your Business Runs Smoother When Your Schedule Runs Itself
              </h2>
              <p className="text-xl text-[#5F697A] mb-8 leading-relaxed">
                Imagine having an assistant who never sleeps, never forgets, and always stays polite. That's TimeGuard AI. It handles your communication, coordinates your appointments, and routes clients to the right place—automatically.
              </p>
              <ul className="space-y-4">
                {[
                  "Replies instantly",
                  "Books appointments based on your real availability",
                  "Reschedules without your involvement",
                  "Sends reminders so no one forgets",
                  "Works across website, WhatsApp, SMS, and more",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-[#1C6EF2] flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-[#0C0F14]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#DCE8FF]">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1C6EF2] to-[#33F3E5] rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0C0F14]">Auto-Scheduling</p>
                    <p className="text-sm text-[#5F697A]">24/7 availability</p>
                  </div>
                </div>
                <div className="h-48 bg-gradient-to-br from-[#DCE8FF] to-white rounded-lg flex items-center justify-center">
                  <p className="text-[#5F697A] text-sm">Calendar visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURES SECTION */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] text-center mb-12">
            What TimeGuard AI Does For You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-[#DCE8FF] rounded-xl p-6 border border-[#1C6EF2]/20 hover:border-[#1C6EF2] transition-all"
                >
                  <div className="w-12 h-12 bg-[#1C6EF2] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C0F14] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#5F697A]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — INDUSTRIES SERVED */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] text-center mb-4">
            Built for Professionals Who Value Their Time
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center border border-[#DCE8FF] hover:border-[#1C6EF2] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-[#1C6EF2] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-[#0C0F14]">{industry.name}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-lg text-[#5F697A] max-w-2xl mx-auto mt-8">
            If your business runs on appointments or client communication, TimeGuard AI is built for you.
          </p>
        </div>
      </section>

      {/* SECTION 6 — REAL-LIFE USE CASES */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] text-center mb-12">
            Real Situations TimeGuard AI Handles Every Day
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="bg-[#DCE8FF] rounded-xl p-8 border border-[#1C6EF2]/20"
                >
                  <div className="w-12 h-12 bg-[#1C6EF2] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C0F14] mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-[#5F697A]">{useCase.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — BENEFITS SECTION */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] text-center mb-12">
            Why Businesses Love TimeGuard AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border border-[#DCE8FF] hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-[#1C6EF2] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0C0F14] mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-[#5F697A]">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] text-center mb-12">
            How TimeGuard AI Gets Set Up
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#DCE8FF] rounded-xl p-8 border border-[#1C6EF2]/20">
                  <div className="w-16 h-16 bg-[#1C6EF2] rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0C0F14] mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-lg text-[#5F697A] text-center">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRightIcon className="w-8 h-8 text-[#1C6EF2]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — SOCIAL PROOF */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0C0F14] text-center mb-12">
            Trusted by Busy Professionals Who Need Their Time Back
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-[#DCE8FF] shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F3C55B] text-xl">★</span>
                ))}
              </div>
              <p className="text-lg text-[#0C0F14] mb-4 italic">
                "This system saved me 10 hours a week within the first month."
              </p>
              <p className="text-sm text-[#5F697A]">— Business Owner</p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-[#DCE8FF] shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F3C55B] text-xl">★</span>
                ))}
              </div>
              <p className="text-lg text-[#0C0F14] mb-4 italic">
                "These automations changed how we handle clients."
              </p>
              <p className="text-sm text-[#5F697A]">— Service Provider</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Relations Strip */}
      <SolutionRelationsStrip solutionId="ai_scheduler" />

      {/* SECTION 10 — FINAL CTA SECTION */}
      <section className="bg-gradient-to-br from-[#1C6EF2] to-[#1557C0] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Your Time Back?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Let's build your own TimeGuard AI system and free up hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?solution=timeguard-ai"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1C6EF2] font-bold rounded-lg hover:bg-[#F8FAFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Your Time Assessment Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Learn More About TimeGuard AI
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FOOTER */}
      <footer className="bg-[#0C0F14] text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-2xl font-bold">OMGsystems</p>
              <p className="text-sm text-gray-400 mt-2">TimeGuard AI by OMGsystems</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

