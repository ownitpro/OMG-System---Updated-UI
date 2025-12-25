"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import { AppPairingsStrip } from "@/components/apps/AppPairingsStrip";
import { AppIndustriesStrip } from "@/components/apps/AppIndustriesStrip";
import { AppSolutionsStrip } from "@/components/apps/AppSolutionsStrip";
import { AppRelationsStrip } from "@/components/apps/AppRelationsStrip";
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  LockClosedIcon,
  EyeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon,
  UserGroupIcon,
  CogIcon,
  CloudIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  PaperClipIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  RocketLaunchIcon,
  PlayIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

type Props = { app: AppConfig };

export function SecureVaultAppPage({ app }: Props) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const problems = [
    {
      icon: FolderIcon,
      title: "Endless chasing",
      description: "Files scattered in email, text, and random drives."
    },
    {
      icon: PaperClipIcon,
      title: "Missed items",
      description: "No clear checklist for clients; back-and-forth slows projects."
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Risky sharing",
      description: "Open links, no PIN, no expiry, no watermark."
    },
    {
      icon: MagnifyingGlassIcon,
      title: "No single source of truth",
      description: "Duplicates, wrong versions, lost time."
    },
    {
      icon: EyeIcon,
      title: "Zero visibility",
      description: "No status tracking until something breaks."
    }
  ];

  const solutions = [
    {
      problem: "Endless chasing",
      solution: "One link, done: send a PIN-protected portal so clients upload everything at once."
    },
    {
      problem: "Missed items",
      solution: "Everything in one place: versions, labels, and notes stay together."
    },
    {
      problem: "Risky sharing",
      solution: "Smart organization: OCR auto-reads and auto-labels."
    },
    {
      problem: "No single source of truth",
      solution: "Share safely: expiring, watermarked links that can be revoked anytime."
    },
    {
      problem: "Zero visibility",
      solution: "Know what's happening: see activity, alerts, and usage limits in real time."
    }
  ];

  const businessFeatures = [
    { icon: ShieldCheckIcon, title: "Client Portals (unlimited)", description: "PIN + expiry protection" },
    { icon: DocumentTextIcon, title: "File Requests", description: "Visual checklist; upload from phone/desktop" },
    { icon: ShareIcon, title: "Secure Sharing", description: "Watermark viewer; revoke anytime" },
    { icon: CogIcon, title: "OCR + Auto-Labels", description: "Searchable text & smart sorting" },
    { icon: MagnifyingGlassIcon, title: "Power Search", description: "By name, text, label, date, version" },
    { icon: CloudIcon, title: "Connect Your Tools", description: "QBO, Xero, FreshBooks, Sage, Google Drive, OneDrive, Dropbox, Box, Email-to-Vault, Slack, Teams" },
    { icon: RocketLaunchIcon, title: "Install as an App", description: "Desktop + PWA" },
    { icon: EyeIcon, title: "Clear Activity Trail", description: "Uploads, views, shares all logged" }
  ];

  const businessOutcomes = [
    { metric: "50–70%", label: "less time chasing documents" },
    { metric: "Fewer", label: "errors and do-overs" },
    { metric: "Faster", label: "client onboarding" },
    { metric: "Safer", label: "more professional experience" }
  ];

  const personalFeatures = [
    { icon: ShieldCheckIcon, title: "Simple Vault", description: "Upload, label, search instantly" },
    { icon: ShareIcon, title: "Secure Sharing", description: "PIN + expiry links; revoke anytime" },
    { icon: MagnifyingGlassIcon, title: "Smart Search", description: "By name, label, or text inside" },
    { icon: UserGroupIcon, title: "Pro Perks", description: "Up to 3 people and 2 business vaults" },
    { icon: RocketLaunchIcon, title: "Install as App", description: "Desktop + PWA" }
  ];

  const personalOutcomes = [
    "Stop hunting for files",
    "Share safely without attachments",
    "Keep your life organized and portable"
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Invite or Upload",
      description: "Start a client portal or upload to your vault."
    },
    {
      step: "2",
      title: "Smart Organize",
      description: "OCR reads files; labels + checklists keep it tidy."
    },
    {
      step: "3",
      title: "Share & Track",
      description: "PIN + expiry links, watermarked viewer, activity log."
    }
  ];

  const securityFeatures = [
    { icon: LockClosedIcon, title: "PIN + expiry links", description: "for sharing" },
    { icon: EyeIcon, title: "Watermarked viewer", description: "to discourage screenshots" },
    { icon: UserGroupIcon, title: "Role-based access", description: "for teams" },
    { icon: DocumentTextIcon, title: "Version history & audit log", description: "" },
    { icon: RocketLaunchIcon, title: "Install as App", description: "for quick secure access" }
  ];

  const connectors = [
    {
      category: "Accounting & Finance",
      items: ["QBO", "Xero", "FreshBooks", "Sage Cloud"]
    },
    {
      category: "Cloud Drives",
      items: ["Google Drive", "OneDrive", "Dropbox", "Box"]
    },
    {
      category: "Email-to-Vault",
      items: ["Forward receipts directly into folders"]
    },
    {
      category: "e-Sign Handoff",
      items: ["Auto-file signed copies"]
    },
    {
      category: "Team Comms",
      items: ["Slack", "Teams"]
    },
    {
      category: "Workflow Marketplace",
      items: ["Ready-made automations via n8n/Make/Notion (coming)"]
    }
  ];

  const faqs = [
    {
      question: "Is this hard to set up?",
      answer: "No—send a PIN portal link and you're live."
    },
    {
      question: "Can I control who sees what?",
      answer: "Yes—fine-grained permissions and revocation."
    },
    {
      question: "Do clients need an account?",
      answer: "Not for simple uploads."
    },
    {
      question: "Can I install it like an app?",
      answer: "Yes—Mac, Windows, Linux, PWA."
    },
    {
      question: "Does it work with my tools?",
      answer: "Yes—accounting apps, cloud drives, e-Sign, chat."
    }
  ];

  const testimonials = [
    {
      quote: "Teams save hours per week per staff member.",
      metric: "Hours saved weekly"
    },
    {
      quote: "Clients complete intake in minutes instead of days.",
      metric: "Faster onboarding"
    },
    {
      quote: "Fewer surprises and clear audit trails.",
      metric: "Better compliance"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-950">
        {/* Emerald Glowing Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main center glow */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-[#47BD79]/30 via-emerald-600/20 to-transparent rounded-full blur-2xl"></div>
          {/* Top right accent glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-bl from-[#47BD79]/25 via-emerald-500/15 to-transparent rounded-full blur-2xl"></div>
          {/* Animated pulse center */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#47BD79]/40 to-emerald-600/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#47BD79] to-emerald-600 rounded-2xl mb-6 shadow-[0_0_30px_rgba(71,189,121,0.4)]">
            <ShieldCheckIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {app.label}
          </h1>
          <p className="text-3xl md:text-4xl text-[#47BD79] font-semibold mb-6">
            {app.tagline}
          </p>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            {app.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white font-bold rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-[0_0_20px_rgba(71,189,121,0.4)]"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white border border-white/20 font-bold rounded-xl hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out transform hover:scale-105"
            >
              Try the Live Demo
              <PlayIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <Link
            href="/contact-sales?product=SecureVault Docs"
            className="inline-flex items-center text-[#47BD79] hover:text-[#5fd994] font-semibold"
          >
            Talk to Sales
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>

          {/* Why People Struggle Today - Bento Grid Layout */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why People Struggle Today
            </h2>

            {/* Bento Grid - Asymmetric Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Hero Problem Card - Spans 2 columns, 2 rows */}
              <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-red-500/10 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]">
                <div className="h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FolderIcon className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{problems[0].title}</h3>
                  <p className="text-lg text-white/70 mb-6 flex-grow">{problems[0].description}</p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <span>Most common pain point</span>
                  </div>
                </div>
              </div>

              {/* Problem 2 - Regular card */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-red-500/15 hover:border-red-500/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <PaperClipIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problems[1].title}</h3>
                <p className="text-white/60 text-sm">{problems[1].description}</p>
              </div>

              {/* Problem 3 - Regular card */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-red-500/15 hover:border-red-500/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problems[2].title}</h3>
                <p className="text-white/60 text-sm">{problems[2].description}</p>
              </div>

              {/* Problem 4 - Regular card */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-red-500/15 hover:border-red-500/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MagnifyingGlassIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problems[3].title}</h3>
                <p className="text-white/60 text-sm">{problems[3].description}</p>
              </div>

              {/* Problem 5 - Regular card */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-red-500/15 hover:border-red-500/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <EyeIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problems[4].title}</h3>
                <p className="text-white/60 text-sm">{problems[4].description}</p>
              </div>

              {/* Summary Badge Card */}
              <div className="bg-gradient-to-br from-red-500/15 to-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-red-500/20 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">5+</div>
                <div className="text-white/70 text-sm">Hours wasted weekly</div>
                <div className="text-white/50 text-xs mt-1">on document chaos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Before/After Bento Split */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald Glowing Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left accent glow - red tinted */}
          <div className="absolute top-1/3 left-0 w-[200px] h-[300px] bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent rounded-full blur-2xl"></div>
          {/* Right accent glow - green tinted */}
          <div className="absolute top-1/2 right-0 w-[200px] h-[300px] bg-gradient-to-l from-[#47BD79]/15 via-emerald-500/10 to-transparent rounded-full blur-2xl"></div>
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient-to-br from-[#47BD79]/8 via-transparent to-red-500/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From Chaos to Clarity
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              See how SecureVault Docs transforms your document workflow
            </p>
          </div>

          {/* Before/After Split Container */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-0">
            {/* BEFORE Side - Red tinted */}
            <div className="bg-gradient-to-br from-red-500/10 via-slate-900/80 to-slate-900/60 backdrop-blur-xl rounded-2xl md:rounded-r-none p-8 border border-red-500/20 md:border-r-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <XMarkIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-400">Before</h3>
              </div>
              <div className="space-y-4">
                {solutions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <XMarkIcon className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors">{item.problem}</p>
                  </div>
                ))}
              </div>
              {/* Decorative element */}
              <div className="mt-8 pt-6 border-t border-red-500/10">
                <div className="flex items-center gap-2 text-red-400/70 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>Time lost, stress gained</span>
                </div>
              </div>
            </div>

            {/* AFTER Side - Green tinted */}
            <div className="bg-gradient-to-bl from-[#47BD79]/15 via-slate-900/80 to-slate-900/60 backdrop-blur-xl rounded-2xl md:rounded-l-none p-8 border border-[#47BD79]/20 md:border-l md:border-l-[#47BD79]/30">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#47BD79]/20 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-[#47BD79]" />
                </div>
                <h3 className="text-2xl font-bold text-[#47BD79]">After</h3>
              </div>
              <div className="space-y-4">
                {solutions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-[#47BD79]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                    </div>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors">{item.solution}</p>
                  </div>
                ))}
              </div>
              {/* Decorative element */}
              <div className="mt-8 pt-6 border-t border-[#47BD79]/10">
                <div className="flex items-center gap-2 text-[#47BD79]/70 text-sm">
                  <SparklesIcon className="w-4 h-4" />
                  <span>Organized, secure, under control</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Badge */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#47BD79]/10 to-emerald-600/10 backdrop-blur-md rounded-full border border-[#47BD79]/20">
              <ArrowRightIcon className="w-5 h-5 text-[#47BD79]" />
              <span className="text-white/80">Make the switch in minutes, not months</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Ways to Use - Business - Feature Cards Row */}
      <section className="relative py-16 bg-slate-950">
        {/* Blue glowing gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200px] h-[300px] bg-gradient-to-r from-blue-500/20 via-blue-600/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[200px] h-[300px] bg-gradient-to-l from-blue-500/20 via-blue-600/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-b from-blue-500/10 via-blue-600/5 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <UserGroupIcon className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">For Teams & Businesses</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for Firms, Practices & Teams
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Perfect for accounting, bookkeeping, contractors, and small businesses
            </p>
          </div>

          {/* Auto-Scrolling Feature Cards - Pause on Hover */}
          <div className="relative mb-10 overflow-hidden">
            {/* Scroll gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>

            {/* Auto-scroll container */}
            <div className="group/scroll">
              <div className="flex gap-6 animate-scroll-left group-hover/scroll:[animation-play-state:paused]">
                {/* First set of cards */}
                {businessFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 w-[280px] md:w-[320px] bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]"
                    >
                      {/* Large Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>

                      {/* Description */}
                      <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>

                      {/* Popular badge for first item */}
                      {index === 0 && (
                        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 rounded-full border border-blue-500/25">
                          <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">Most Popular</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Duplicate set for seamless loop */}
                {businessFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0 w-[280px] md:w-[320px] bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]"
                    >
                      {/* Large Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>

                      {/* Description */}
                      <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>

                      {/* Popular badge for first item */}
                      {index === 0 && (
                        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 rounded-full border border-blue-500/25">
                          <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">Most Popular</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Auto-scroll animation */}
            <style jsx>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll-left {
                animation: scroll-left 30s linear infinite;
              }
            `}</style>
          </div>

          {/* Outcomes Stats Row */}
          <div className="bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {businessOutcomes.map((outcome, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {outcome.metric}
                  </div>
                  <div className="text-sm text-white/60">{outcome.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing?product=securevault-docs&plan=business"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
            >
              See Business Plans
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/5 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              Try the Live Demo
              <PlayIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Two Ways to Use - Personal - Central Vault Visual */}
      <section className="relative py-16 bg-slate-950 overflow-hidden">
        {/* Purple glowing gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-gradient-to-br from-purple-500/15 via-purple-600/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-gradient-to-t from-purple-500/10 via-purple-600/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[150px] h-[200px] bg-gradient-to-r from-purple-500/10 via-purple-600/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[150px] h-[200px] bg-gradient-to-l from-purple-500/10 via-purple-600/5 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <LockClosedIcon className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">For Personal Use</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Private Vault
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              IDs, proof of income, school records, medical forms, housing docs, car papers—everything that matters
            </p>
          </div>

          {/* Central Vault Visual Layout */}
          <div className="relative mb-16">
            {/* Central Vault Icon - 3D Spinning Icon Only */}
            <div className="flex justify-center mb-8 md:mb-0">
              <div className="relative">
                {/* Animated glow ring */}
                <div className="absolute inset-0 w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-purple-500/40 to-purple-600/20 rounded-3xl blur-xl animate-pulse"></div>
                {/* Vault container - static */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-slate-900/80 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center border-2 border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
                  {/* 3D Spinning Shield Icon Only */}
                  <div style={{ perspective: '500px' }}>
                    <ShieldCheckIcon
                      className="vault-icon-spin w-16 h-16 md:w-20 md:h-20 text-purple-400 mb-2"
                      style={{ transformStyle: 'preserve-3d' }}
                    />
                  </div>
                  <span className="text-white font-bold text-lg">VAULT</span>
                </div>
                {/* 3D Spin Animation for Icon Only */}
                <style jsx>{`
                  .vault-icon-spin {
                    animation: spin3d-vault-icon 6s linear infinite;
                  }
                  @keyframes spin3d-vault-icon {
                    0% {
                      transform: rotateY(0deg);
                    }
                    100% {
                      transform: rotateY(360deg);
                    }
                  }
                `}</style>
              </div>
            </div>

            {/* Features radiating around vault - Desktop */}
            <div className="hidden md:block">
              {/* Feature positioning grid */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Left features */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 w-[280px]">
                  {/* Feature 1 - Simple Vault */}
                  <div className="group flex items-center gap-4">
                    <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:translate-x-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center">
                          <ShieldCheckIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{personalFeatures[0].title}</h4>
                          <p className="text-xs text-white/50">{personalFeatures[0].description}</p>
                        </div>
                      </div>
                    </div>
                    {/* Connecting dot */}
                    <div className="w-2 h-2 rounded-full bg-purple-500/50"></div>
                  </div>

                  {/* Feature 2 - Secure Sharing */}
                  <div className="group flex items-center gap-4">
                    <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:translate-x-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center">
                          <ShareIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{personalFeatures[1].title}</h4>
                          <p className="text-xs text-white/50">{personalFeatures[1].description}</p>
                        </div>
                      </div>
                    </div>
                    {/* Connecting dot */}
                    <div className="w-2 h-2 rounded-full bg-purple-500/50"></div>
                  </div>
                </div>

                {/* Right features */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 w-[280px]">
                  {/* Feature 3 - Smart Search */}
                  <div className="group flex items-center gap-4">
                    {/* Connecting dot */}
                    <div className="w-2 h-2 rounded-full bg-purple-500/50"></div>
                    <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-x-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center">
                          <MagnifyingGlassIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{personalFeatures[2].title}</h4>
                          <p className="text-xs text-white/50">{personalFeatures[2].description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature 4 - Pro Perks */}
                  <div className="group flex items-center gap-4">
                    {/* Connecting dot */}
                    <div className="w-2 h-2 rounded-full bg-purple-500/50"></div>
                    <div className="flex-1 bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:-translate-x-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center">
                          <UserGroupIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{personalFeatures[3].title}</h4>
                          <p className="text-xs text-white/50">{personalFeatures[3].description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features - Mobile (stacked below vault) */}
            <div className="md:hidden grid grid-cols-1 gap-4 mt-8">
              {personalFeatures.slice(0, 4).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                        <p className="text-xs text-white/50">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Feature - Install as App */}
            <div className="mt-8 md:mt-16 flex justify-center">
              <div className="bg-gradient-to-r from-purple-500/15 via-slate-900/80 to-purple-500/15 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 max-w-md w-full">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/15 rounded-xl flex items-center justify-center">
                    <RocketLaunchIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{personalFeatures[4].title}</h4>
                    <p className="text-sm text-white/50">{personalFeatures[4].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Types Pills */}
          <div className="text-center mb-8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Perfect For</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['IDs', 'Tax Docs', 'Medical', 'School Records', 'Housing', 'Auto'].map((type) => (
                <span key={type} className="px-4 py-2 bg-purple-500/10 rounded-full text-sm text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Outcomes Row */}
          <div className="bg-gradient-to-r from-purple-500/10 via-purple-600/5 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personalOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-slate-900/30 rounded-xl hover:bg-slate-900/50 transition-colors">
                  <div className="w-8 h-8 bg-purple-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-white/80">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing?product=securevault-docs&plan=personal"
              className="inline-flex items-center justify-center px-8 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              See Personal Plans
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/5 text-white border border-white/20 font-semibold rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              Get Started Free (7-day trial)
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow for How It Works */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-gradient-to-br from-[#47BD79]/15 via-emerald-600/10 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#47BD79] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-[0_0_30px_rgba(71,189,121,0.4)]">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Pairings Strip */}
      <AppPairingsStrip app={app} />

      {/* Security Section - Shield/Badge Visual */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald security glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[250px] h-[180px] bg-gradient-to-br from-[#47BD79]/10 via-emerald-600/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[200px] h-[150px] bg-gradient-to-tl from-emerald-500/10 via-[#47BD79]/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-gradient-to-br from-[#47BD79]/8 via-emerald-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#47BD79]/10 border border-[#47BD79]/20 mb-4">
              <ShieldCheckIcon className="w-4 h-4 text-[#47BD79]" />
              <span className="text-sm font-medium text-[#47BD79]">Built for Trust</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security in Plain English
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              No jargon, no complexity—just real protection for your documents
            </p>
          </div>

          {/* Large Central Shield Hero - Icon Only Spinning */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Animated glow ring */}
              <div className="absolute inset-0 w-40 h-48 md:w-52 md:h-60 bg-gradient-to-br from-[#47BD79]/30 to-emerald-600/20 rounded-3xl blur-xl animate-pulse"></div>
              {/* Static Shield container */}
              <div className="relative w-40 h-48 md:w-52 md:h-60 bg-gradient-to-br from-[#47BD79]/20 via-emerald-600/15 to-slate-900/80 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center border-2 border-[#47BD79]/30 shadow-[0_0_80px_rgba(71,189,121,0.25)]">
                {/* 3D Spinning Shield Icon Only */}
                <div style={{ perspective: '500px' }} className="mb-3">
                  <ShieldCheckIcon
                    className="security-icon-spin w-20 h-20 md:w-24 md:h-24 text-[#47BD79]"
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </div>
                <div className="text-center px-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">Bank-Level</h3>
                  <p className="text-[#47BD79] font-semibold">Security</p>
                </div>
              </div>
              {/* 3D Spin Animation for Icon Only */}
              <style jsx>{`
                .security-icon-spin {
                  animation: spin3d-security-icon 6s linear infinite;
                }
                @keyframes spin3d-security-icon {
                  0% {
                    transform: rotateY(0deg);
                  }
                  100% {
                    transform: rotateY(360deg);
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Security Features as Badges/Pills Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-5 py-4 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-[#47BD79]/20 hover:border-[#47BD79]/40 transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(71,189,121,0.15)]"
                >
                  <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#47BD79]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    {feature.description && (
                      <p className="text-xs text-white/50">{feature.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust/Compliance Badges Row */}
          <div className="text-center mb-8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Compliance & Standards</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: '256-bit SSL', icon: LockClosedIcon },
                { label: 'SOC 2 Type II', icon: ShieldCheckIcon },
                { label: 'GDPR Ready', icon: DocumentTextIcon },
                { label: 'AES Encryption', icon: LockClosedIcon },
                { label: 'PIPEDA Compliant', icon: ShieldCheckIcon }
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-[#47BD79]/10 rounded-full border border-[#47BD79]/25 hover:bg-[#47BD79]/15 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#47BD79]" />
                    <span className="text-sm text-[#47BD79] font-medium">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Availability Row */}
          <div className="bg-gradient-to-r from-[#47BD79]/10 via-emerald-600/5 to-[#47BD79]/10 backdrop-blur-xl rounded-2xl p-6 border border-[#47BD79]/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center">
                  <RocketLaunchIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <span className="text-white font-medium">Install as App</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Mac', 'Windows', 'Linux', 'iOS', 'Android', 'PWA'].map((platform) => (
                  <span key={platform} className="px-4 py-2 bg-slate-900/50 rounded-lg text-sm text-white/70 border border-white/10 hover:border-[#47BD79]/30 transition-colors">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connectors & Automations - Bento Grid */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[150px] h-[250px] bg-gradient-to-r from-[#47BD79]/12 via-emerald-500/8 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[150px] h-[250px] bg-gradient-to-l from-[#47BD79]/12 via-emerald-500/8 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-gradient-to-br from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#47BD79]/10 border border-[#47BD79]/20 mb-4">
              <CloudIcon className="w-4 h-4 text-[#47BD79]" />
              <span className="text-sm font-medium text-[#47BD79]">Connect Everything</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Connectors & Automations
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Seamlessly integrate with the tools you already use
            </p>
          </div>

          {/* Bento Grid Layout - 3x2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Accounting & Finance */}
            <div className="bg-gradient-to-br from-[#47BD79]/10 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-[#47BD79]/15 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <DocumentTextIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <h3 className="font-semibold text-white">{connectors[0].category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {connectors[0].items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-900/50 rounded-lg text-sm text-white/70 border border-white/10 hover:border-[#47BD79]/30 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud Drives */}
            <div className="bg-gradient-to-br from-[#47BD79]/10 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-[#47BD79]/15 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CloudIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <h3 className="font-semibold text-white">{connectors[1].category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {connectors[1].items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-900/50 rounded-lg text-sm text-white/70 border border-white/10 hover:border-[#47BD79]/30 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Email-to-Vault */}
            <div className="bg-gradient-to-br from-[#47BD79]/10 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-2xl p-6 border border-[#47BD79]/15 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PaperClipIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <h3 className="font-semibold text-white">{connectors[2].category}</h3>
              </div>
              <p className="text-sm text-white/60">{connectors[2].items[0]}</p>
            </div>

            {/* e-Sign Handoff */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-[#47BD79]/15 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircleIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <h3 className="font-semibold text-white">{connectors[3].category}</h3>
              </div>
              <p className="text-sm text-white/60">{connectors[3].items[0]}</p>
            </div>

            {/* Team Comms */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-[#47BD79]/15 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#47BD79]/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="w-5 h-5 text-[#47BD79]" />
                </div>
                <h3 className="font-semibold text-white">{connectors[4].category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {connectors[4].items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-900/50 rounded-lg text-sm text-white/70 border border-white/10 hover:border-[#47BD79]/30 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Workflow Marketplace - Coming Soon */}
            <div className="bg-gradient-to-br from-[#47BD79]/5 via-slate-900/60 to-slate-900/40 backdrop-blur-xl rounded-xl p-6 border border-dashed border-[#47BD79]/20 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out group hover:translate-y-[-2px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#47BD79]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SparklesIcon className="w-5 h-5 text-[#47BD79]/70" />
                  </div>
                  <h3 className="font-semibold text-white/70">{connectors[5].category}</h3>
                </div>
                <span className="px-2 py-1 bg-[#47BD79]/10 rounded-md text-xs text-[#47BD79] border border-[#47BD79]/20">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm text-white/50">Ready-made automations via n8n, Make & Notion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="relative py-16 bg-slate-950">
        {/* Subtle emerald glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-gradient-to-br from-[#47BD79]/10 via-emerald-600/5 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Pricing Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out">
              <h3 className="text-2xl font-bold text-white mb-4">Business</h3>
              <p className="text-white/70 mb-6">
                Seat-based Starter / Growth / Pro plans. Unlimited portals, usage alerts, 7-day trial.
              </p>
              <Link
                href="/pricing?product=securevault-docs&plan=business"
                className="inline-flex items-center text-[#47BD79] hover:text-[#3da86a] font-semibold transition-colors"
              >
                View Detailed Pricing
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out">
              <h3 className="text-2xl font-bold text-white mb-4">Personal</h3>
              <p className="text-white/70 mb-6">
                Starter / Growth / Pro. Up to 3 people + 2 businesses per vault. 7-day trial.
              </p>
              <Link
                href="/pricing?product=securevault-docs&plan=personal"
                className="inline-flex items-center text-[#47BD79] hover:text-[#3da86a] font-semibold transition-colors"
              >
                View Detailed Pricing
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Outcomes */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-gradient-to-br from-[#47BD79]/15 via-emerald-600/8 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Real Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl rounded-xl p-8 text-center border border-[#47BD79]/20 hover:border-[#47BD79]/40 transition-all duration-600 ease-premium-out">
                <p className="text-lg text-white/80 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm font-semibold text-[#47BD79]">{testimonial.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-16 bg-slate-950">
        {/* Emerald glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-gradient-to-br from-[#47BD79]/12 via-emerald-500/8 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
                open={openFAQ === index}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === index ? null : index);
                }}
              >
                <summary className="cursor-pointer font-semibold text-white text-lg flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-white/50 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </summary>
                <p className="mt-4 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* App Industries Strip */}
      <AppIndustriesStrip app={app} />

      {/* App Solutions Strip */}
      <AppSolutionsStrip app={app} />

      {/* App Relations Strip */}
      <AppRelationsStrip app={app} />

      {/* Final CTA */}
      <section className="py-20 bg-slate-950 relative">
        {/* Emerald glowing effects - multiple smaller glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left side glows */}
          <div className="absolute top-1/3 left-[10%] w-[120px] h-[180px] bg-gradient-to-r from-[#47BD79]/15 via-emerald-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-2/3 left-[5%] w-[100px] h-[150px] bg-gradient-to-r from-[#47BD79]/12 via-emerald-500/8 to-transparent rounded-full blur-xl"></div>
          {/* Right side glows */}
          <div className="absolute top-1/3 right-[10%] w-[120px] h-[180px] bg-gradient-to-l from-[#47BD79]/15 via-emerald-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-2/3 right-[5%] w-[100px] h-[150px] bg-gradient-to-l from-[#47BD79]/12 via-emerald-500/8 to-transparent rounded-full blur-xl"></div>
          {/* Center glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[180px] bg-gradient-to-br from-[#47BD79]/20 via-emerald-600/12 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-gradient-to-br from-[#47BD79]/25 to-emerald-600/15 rounded-full blur-xl animate-pulse"></div>
          {/* Top and bottom accent glows */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-gradient-to-b from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-gradient-to-t from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stop Chasing Documents?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#47BD79] text-white font-bold rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-[0_0_20px_rgba(71,189,121,0.4)]"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 font-bold rounded-xl hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
            >
              Try the Live Demo
              <PlayIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact-sales?product=SecureVault Docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 font-bold rounded-xl hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
            >
              Talk to Sales
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-slate-950 text-white/50 py-4 text-center text-sm border-t border-white/10">
        <p>Powered by OMGSystems — 2025</p>
      </div>
    </main>
  );
}

