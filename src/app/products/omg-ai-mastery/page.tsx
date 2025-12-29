"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  PlayIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  CalendarIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Course modules
const modules = [
  {
    icon: PencilSquareIcon,
    title: "Writing Assistant",
    description: "Create a personal writing system for faster, clearer content",
    duration: "Day 1",
  },
  {
    icon: CalendarIcon,
    title: "Planning System",
    description: "Build an AI-powered planning and productivity workflow",
    duration: "Day 2",
  },
  {
    icon: LightBulbIcon,
    title: "Learning Coach",
    description: "Set up a system to learn anything faster with AI",
    duration: "Day 3",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Custom AI Tools",
    description: "Create reusable AI tools for your everyday tasks",
    duration: "Bonus",
  },
];

// Course highlights
const highlights = [
  {
    icon: ClockIcon,
    value: "3 Days",
    label: "Complete Course",
  },
  {
    icon: AcademicCapIcon,
    value: "Certificate",
    label: "Included",
  },
  {
    icon: UserGroupIcon,
    value: "Beginner",
    label: "Friendly",
  },
];

// What you'll build
const outcomes = [
  "Your own AI writing assistant",
  "A daily planning system",
  "A learning acceleration tool",
  "Reusable prompt templates",
  "Professional certificate",
];

export default function OmgAiMasteryPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role;
  const isAdmin = userRole === "ADMIN" || userRole === "STAFF";
  const backToPortalHref = status === "loading" ? "/portal/client" : (isAdmin ? "/portal/admin/products" : "/portal/client");

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % modules.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + modules.length) % modules.length);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#DB2777] flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">OMG Systems</span>
            </Link>

            {/* Back to Portal */}
            <Link
              href={backToPortalHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section - Course Style */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#EC4899]/30 bg-[#EC4899]/10 px-4 py-2 mb-6">
                <div className="w-6 h-6 rounded-lg bg-[#EC4899] flex items-center justify-center">
                  <AcademicCapIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-[#EC4899]">OMG-AI-Mastery</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Become AI-smart in<br />
                <span className="text-[#EC4899]">days, not months.</span>
              </h1>
              <p className="text-xl text-white/60 mb-6">
                Learn to use AI the right way with simple steps, real examples, and tools you can use today. No tech background required.
              </p>

              {/* Course highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <item.icon className="w-5 h-5 text-[#EC4899]" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                      <p className="text-xs text-white/50">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Badge */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EC4899] px-4 py-2">
                  <span className="text-lg font-bold text-white">$49/month</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-[#EC4899]" />
                    6-day free trial
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-[#EC4899]" />
                    Certificate included
                  </span>
                </div>
              </div>

              {/* Primary CTA */}
              <Link
                href="/checkout/start?product=omg-ai-mastery&trial=true"
                className="inline-flex items-center gap-2 rounded-xl bg-[#EC4899] px-8 py-4 text-lg font-semibold text-white hover:bg-[#DB2777] transition-all shadow-lg shadow-[#EC4899]/30 hover:shadow-xl hover:shadow-[#EC4899]/40"
              >
                Start 6-Day Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Certificate Preview */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#EC4899]/10 via-[#1e293b] to-[#A855F7]/10 p-8">
                {/* Certificate Preview */}
                <div className="rounded-xl border border-white/20 bg-white/5 p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#EC4899]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckBadgeIcon className="w-8 h-8 text-[#EC4899]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Professional Certificate</h3>
                  <p className="text-sm text-white/60 mb-4">AI Mastery Completion</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                    <span className="px-2 py-1 rounded bg-white/10">QR Verified</span>
                    <span className="px-2 py-1 rounded bg-white/10">Unique ID</span>
                  </div>
                </div>

                {/* What you'll build */}
                <div className="mt-6">
                  <p className="text-sm text-white/50 mb-3">What you'll build:</p>
                  <ul className="space-y-2">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircleIcon className="w-4 h-4 text-[#EC4899] flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-[#EC4899]/10 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </section>

        {/* Course Modules Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Course Modules</h2>
            <p className="text-white/60">Learn AI step-by-step in just 3 days</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#1e293b] p-6 hover:border-[#EC4899]/30 transition-all group relative overflow-hidden"
              >
                {/* Day badge */}
                <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-[#EC4899]/20 text-xs font-medium text-[#EC4899]">
                  {module.duration}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#EC4899]/20 flex items-center justify-center mb-4 group-hover:bg-[#EC4899]/30 transition-all">
                  <module.icon className="w-6 h-6 text-[#EC4899]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                <p className="text-sm text-white/60">{module.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">See what you'll learn</h2>
            <p className="text-white/60">Watch a quick preview of the AI Mastery course</p>
          </div>

          {/* Video Player Placeholder */}
          <div
            onClick={() => setShowVideoModal(true)}
            className="relative aspect-video rounded-2xl border border-white/10 bg-[#1e293b] overflow-hidden cursor-pointer group"
          >
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EC4899]/20 via-transparent to-[#A855F7]/20" />

            {/* Placeholder Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#EC4899] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#EC4899]/30">
                <PlayIcon className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-white/60 text-sm">Click to watch course preview</p>
            </div>

            {/* Upload Indicator for Dev */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white/40">
              Video placeholder - Upload your course preview
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#EC4899]/10 via-[#1e293b] to-[#A855F7]/10 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Perfect for you if...</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                "You get generic AI answers when you try prompting",
                "You don't know how to use AI for your work",
                "You're overwhelmed by tutorials and features",
                "You're worried about falling behind without AI skills",
                "You want to boost writing, planning, and decision-making",
                "You want to move from random prompts to confident AI use",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircleIcon className="w-5 h-5 text-[#EC4899] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-white/10 bg-[#1e293b] p-8 md:p-12">
            <div className="w-16 h-16 rounded-full bg-[#EC4899]/20 flex items-center justify-center mx-auto mb-6">
              <AcademicCapIcon className="w-8 h-8 text-[#EC4899]" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to master AI?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Start your 6-day free trial. Learn AI the simple way and get your professional certificate.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout/start?product=omg-ai-mastery&trial=true"
                className="inline-flex items-center gap-2 rounded-xl bg-[#EC4899] px-8 py-4 text-lg font-semibold text-white hover:bg-[#DB2777] transition-all shadow-lg shadow-[#EC4899]/30 hover:shadow-xl hover:shadow-[#EC4899]/40"
              >
                Start 6-Day Free Trial
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/products/plans"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-lg font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                View All Plans
              </Link>
            </div>

            <p className="text-sm text-white/40 mt-6">
              No tech background required. If you can text, you can do this.
            </p>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl bg-[#1e293b] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Video Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#EC4899]/20 via-transparent to-[#A855F7]/20">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <PlayIcon className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white/60">Video placeholder</p>
              <p className="text-sm text-white/40 mt-2">Embed your YouTube/Vimeo video here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
