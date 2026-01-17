"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SolutionRelationsStrip } from "@/components/solutions/SolutionRelationsStrip";
import { ConfigurableLeadForm, COLOR_SCHEMES, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";
import {
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  SparklesIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ScaleIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

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
    title: "Save 10–42 Hours Every Week",
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
  // Generate particle positions on client side only to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{ left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random positions only on client side
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 4,
      }))
    );
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* CSS Keyframes for animations */}
      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float-calendar {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateY(5deg); }
        }
        @keyframes timeline-dot {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes path-flow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-float-particle { animation: float-particle 8s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-float-calendar { animation: float-calendar 4s ease-in-out infinite; }
        .animate-timeline-dot { animation: timeline-dot 2s ease-in-out infinite; }
        .animate-path-flow { animation: path-flow 3s linear infinite; }
        .marquee-container:hover .animate-marquee { animation-play-state: paused; }

        /* 3D Flip Card Effect */
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }

        /* 3D Card Tilt Effect on Hover */
        .step-card-3d {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        .group:hover .step-card-3d {
          transform: rotateX(-8deg) rotateY(8deg) translateY(-10px);
        }
        .group:nth-child(2):hover .step-card-3d {
          transform: rotateX(-8deg) rotateY(0deg) translateY(-10px);
        }
        .group:nth-child(3):hover .step-card-3d {
          transform: rotateX(-8deg) rotateY(-8deg) translateY(-10px);
        }
      `}</style>

      {/* SECTION 1 — HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 pt-40 sm:pt-52 pb-20 sm:pb-32">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(28, 110, 242, 0.3)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float-particle"
              style={{
                left: `${particle.left}%`,
                bottom: `-20px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Glow Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline + CTAs */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Meet TimeGuard AI
                  </span>
                  <br />
                  <span className="text-white">Your 24/7 Client Concierge</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
                  An AI assistant that handles your messages, books your appointments, filters your leads, and protects your time—across every platform you use.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                >
                  Book Your Time Assessment Call
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl text-white border border-blue-500/30 font-semibold rounded-lg hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Right: AI Chat Widget Mockup */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-8 border border-blue-500/20 shadow-[0_0_60px_rgba(28,110,242,0.15)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">TimeGuard AI</p>
                      <p className="text-sm text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Online • 24/7
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-blue-500/10">
                      <p className="text-sm text-white/90">
                        I can help you schedule your appointment. What time works best for you?
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg p-4 text-white ml-auto max-w-[80%]">
                      <p className="text-sm">
                        How about Tuesday at 2 PM?
                      </p>
                    </div>
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-blue-500/10">
                      <p className="text-sm text-white/90">
                        Perfect! I've booked you for Tuesday, March 15th at 2:00 PM. You'll receive a confirmation shortly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative accents */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION — TIME SAVINGS COMPARISON */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 overflow-hidden">
        {/* Subtle glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Top Supporting Statement */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Time-Saving Power of TimeGuard AI
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Most businesses waste 40+ hours weekly on scheduling and client communication.
              <span className="block mt-2 text-blue-400 font-semibold">TimeGuard AI automates it all.</span>
            </p>
          </div>

          {/* Main Comparison Grid */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch max-w-5xl mx-auto mb-16">

            {/* LEFT: Without TimeGuard AI */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/5 to-red-600/10 rounded-3xl p-6 border-2 border-red-500/20 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-2xl border-2 border-red-500/30">
                <ClockIcon className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white/70 mb-4">Without TimeGuard AI</h3>
                <div className="text-6xl md:text-7xl font-black text-red-400 mb-2 leading-none">40</div>
                <p className="text-xl text-white/70 font-bold mb-4">hours/week</p>
                <div className="space-y-2 text-white/50">
                  <p className="text-base">Manual messaging</p>
                  <p className="text-base">Scheduling conflicts</p>
                  <p className="text-base">Missed leads</p>
                </div>
              </div>
            </div>

            {/* CENTER: Transformation Arrow */}
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl px-6 py-3 shadow-xl shadow-blue-500/50">
                <p className="text-white font-black text-lg">TimeGuard AI</p>
              </div>
              <ArrowRightIcon className="w-12 h-12 text-blue-400 hidden md:block animate-pulse" />
              <ArrowRightIcon className="w-10 h-10 text-blue-400 md:hidden rotate-90 animate-pulse" />
            </div>

            {/* RIGHT: With TimeGuard AI */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/10 rounded-3xl p-6 border-2 border-emerald-500/30 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/40">
                <ClockIcon className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white/70 mb-4">With TimeGuard AI</h3>
                <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 mb-2 leading-none">5-10</div>
                <p className="text-xl text-white/70 font-bold mb-4">hours/week</p>
                <div className="space-y-2 text-emerald-400 font-semibold">
                  <p className="text-base">Automated 24/7</p>
                  <p className="text-base">Zero missed leads</p>
                  <p className="text-base">Focus on growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary Banner */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl p-6 border border-blue-500/30 shadow-[0_0_60px_rgba(28,110,242,0.2)] max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                  Reclaim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">40 Hours</span> Monthly
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-2">
                  TimeGuard AI handles client messaging, appointment scheduling, and lead qualification 24/7
                </p>
                <p className="text-base text-blue-400 font-semibold italic">
                  "That's an entire work week back in your pocket every month."
                </p>
              </div>

              {/* Quick Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                <div className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold text-center text-xs">Auto-responds instantly</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold text-center text-xs">Books appointments</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold text-center text-xs">Qualifies leads</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all">
                  <div className="w-8 h-8 rounded-md bg-blue-500/20 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold text-center text-xs">Never sleeps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROBLEM SECTION */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              You're Losing Hours Every Week on Tasks
              <br />
              <span className="text-red-400">You Shouldn't Be Doing</span>
            </h2>
          </div>

          {/* Timeline with Pain Points */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-red-500/50 via-red-400/50 to-red-500/50" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {painPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div key={index} className="relative flex flex-col items-center">
                    {/* Timeline Node */}
                    <div className="hidden lg:flex w-8 h-8 bg-red-500/20 border-2 border-red-500 rounded-full items-center justify-center mb-4 z-10">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-timeline-dot" style={{ animationDelay: `${index * 0.5}s` }} />
                    </div>

                    {/* Card */}
                    <div className="backdrop-blur-xl bg-slate-900/60 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 w-full group hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                        <XMarkIcon className="w-6 h-6 text-red-400" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-white/60" />
                        <span className="text-xs text-white/40 font-medium">Problem #{index + 1}</span>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {point.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-lg text-white/60 max-w-2xl mx-auto mt-12">
            <span className="text-blue-400 font-semibold">TimeGuard AI</span> removes all of this so you can focus on the work that matters.
          </p>
        </div>
      </section>

      {/* SECTION 3 — INTRO TO TIMEGUARD AI */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Business Runs Smoother When Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Schedule Runs Itself
                </span>
              </h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
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
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500/30 transition-colors">
                      <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-lg text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3D Floating Calendar */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl p-8 border border-blue-500/20 shadow-[0_0_60px_rgba(28,110,242,0.15)] animate-float-calendar" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <CalendarIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Auto-Scheduling</p>
                      <p className="text-sm text-blue-400">24/7 availability</p>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-blue-500/10 flex items-center justify-center relative overflow-hidden">
                    {/* Calendar Grid Preview */}
                    <div className="grid grid-cols-7 gap-1 p-4 w-full">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-xs text-white/40 font-medium">{day}</div>
                      ))}
                      {[...Array(28)].map((_, i) => (
                        <div
                          key={i}
                          className={`text-center text-xs py-1 rounded ${[8, 12, 15, 22].includes(i)
                            ? 'bg-blue-500/30 text-blue-300'
                            : 'text-white/40 hover:bg-white/5'
                            }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURES SECTION (Bento Grid) */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            What TimeGuard AI Does For You
          </h2>
          <p className="text-xl text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Powerful features that work together to save you time
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-slate-900/60 rounded-xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(28,110,242,0.2)] hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/60">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — INDUSTRIES SERVED (Marquee) */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Built for Professionals Who Value Their Time
          </h2>
        </div>

        {/* Marquee Container */}
        <div className="marquee-container relative overflow-hidden py-4">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...industries, ...industries].map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 mx-3 backdrop-blur-xl bg-slate-900/60 rounded-xl p-6 text-center border border-blue-500/20 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(28,110,242,0.15)] transition-all duration-300 min-w-[160px] group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-white">{industry.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-lg text-white/60 max-w-2xl mx-auto mt-8 px-4">
          If your business runs on appointments or client communication, TimeGuard AI is built for you.
        </p>
      </section>

      {/* SECTION 6 — USE CASES (Scenario Cards with Before/After) */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-cyan-900/5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Situations TimeGuard AI Handles{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Every Day
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              See how TimeGuard AI transforms everyday business challenges into seamless experiences
            </p>
          </div>

          {/* 2x2 Grid of Scenario Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="group relative h-[280px] perspective-1000"
                >
                  {/* Card Container with Flip Effect */}
                  <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Front of Card - The Scenario */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="h-full backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 rounded-2xl p-8 border border-blue-500/20 flex flex-col justify-between overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />

                        {/* Scenario Number */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                        </div>

                        <div>
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {useCase.title}
                          </h3>
                          <p className="text-white/50 text-sm">Hover to see how TimeGuard AI handles this</p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex items-center gap-2 text-blue-400">
                          <span className="text-sm font-medium">See the solution</span>
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Back of Card - The Solution */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <div className="h-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-2xl p-8 flex flex-col justify-center overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                          <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                          <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
                        </div>

                        <div className="relative">
                          <div className="flex items-center gap-3 mb-4">
                            <CheckCircleIcon className="w-8 h-8 text-white" />
                            <span className="text-white/90 font-semibold text-lg">TimeGuard AI Response</span>
                          </div>
                          <p className="text-white text-xl leading-relaxed font-medium">
                            {useCase.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 7 — BENEFITS SECTION */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Why Businesses Love TimeGuard AI
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-slate-900/60 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(28,110,242,0.15)] relative overflow-hidden"
                >
                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center gap-6 pl-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/30 group-hover:to-cyan-400/30 transition-colors">
                      <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-lg text-white/60">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8 — HOW IT WORKS */}
      <section id="how-it-works" className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            How TimeGuard AI Gets Set Up
          </h2>

          <div className="relative">
            {/* Connecting Path */}
            <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%]">
              <svg className="w-full h-4" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path
                  d="M0,5 L100,5"
                  stroke="url(#pathGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  fill="none"
                  className="animate-path-flow"
                />
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative group h-full" style={{ perspective: '1000px' }}>
                  <div
                    className="step-card-3d backdrop-blur-xl bg-slate-900/60 rounded-xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(28,110,242,0.25)] h-full min-h-[280px] flex flex-col"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Step Number */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-[0_0_30px_rgba(28,110,242,0.5)] group-hover:scale-110 transition-all duration-500">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-lg text-white/60 text-center flex-grow">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — SOCIAL PROOF */}
      <section className="relative bg-slate-950 py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Trusted by Busy Professionals
            <br />
            <span className="text-white/60">Who Need Their Time Back</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { quote: "This system saved me 10 hours a week within the first month.", author: "Business Owner" },
              { quote: "These automations changed how we handle clients.", author: "Service Provider" },
            ].map((testimonial, index) => (
              <div key={index} className="relative backdrop-blur-xl bg-slate-900/60 rounded-xl p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(28,110,242,0.15)] group overflow-hidden">
                {/* Quote Icon Background */}
                <div className="absolute -right-4 -top-4 text-8xl text-blue-500/10 font-serif select-none">"</div>

                {/* Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />

                <div className="relative">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-xl text-white mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-white/60 font-medium">— {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Relations Strip */}
      <SolutionRelationsStrip solutionId="ai_scheduler" />

      {/* SECTION 10 — FINAL CTA SECTION */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500" />

        {/* Animated Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-300/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Your Time Back?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Let's build your own TimeGuard AI system and free up hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-900/20"
            >
              Book Your Time Assessment Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white/50 font-semibold rounded-lg hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              Learn More About TimeGuard AI
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Form Section - Blue Theme */}
      <ConfigurableLeadForm
        formType="solutions"
        colorScheme={COLOR_SCHEMES.blue}
      />

      {/* Sticky Button (Desktop) - Blue Theme */}
      <StickyGetStartedButton
        variant="solutions"
        customGradient="from-blue-500 to-cyan-500"
        customShadow="shadow-blue-500/30"
      />

      {/* Mobile Drawer */}
      <MobileFormDrawer variant="solutions" />
    </main>
  );
}
