"use client";

import React, { useState } from "react";
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 overflow-hidden">
        {/* Animated Vault Door Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-br from-emerald-400 to-lime-400 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl mb-6 shadow-lg">
            <ShieldCheckIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
            {app.label}
          </h1>
          <p className="text-3xl md:text-4xl text-emerald-600 font-semibold mb-6">
            {app.tagline}
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {app.summary}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-500 font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try the Live Demo
              <PlayIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <Link
            href="/contact-sales?product=SecureVault Docs"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            Talk to Sales
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why People Struggle Today
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-600">{problem.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            What SecureVault Docs Solves
          </h2>
          <div className="space-y-4">
            {solutions.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-6 border border-emerald-100"
              >
                <div className="flex items-start">
                  <XMarkIcon className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Problem</h3>
                    <p className="text-gray-600">{item.problem}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Solution</h3>
                    <p className="text-gray-600">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Ways to Use - Business */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Built for Firms, Practices & Teams that Work with Clients
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Perfect for accounting, bookkeeping, contractors, and small businesses.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {businessFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <Icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {businessOutcomes.map((outcome, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{outcome.metric}</div>
                <div className="text-gray-700">{outcome.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing?product=securevault-docs&plan=business"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              See Business Plans
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Try the Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Two Ways to Use - Personal */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Your Private Place for Important Life Documents
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Perfect for IDs, proof of income, school records, medical forms, housing docs, car papers—everything that matters.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {personalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <Icon className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 mb-8">
            {personalOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">{outcome}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing?product=securevault-docs&plan=personal"
              className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              See Personal Plans
            </Link>
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 border-2 border-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Get Started Free (7-day trial)
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Pairings Strip */}
      <AppPairingsStrip app={app} />

      {/* Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Security in Plain English
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <Icon className="w-8 h-8 text-emerald-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connectors & Automations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Connectors & Automations
          </h2>
          <div className="space-y-4">
            {connectors.map((connector, index) => (
              <details key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-900 text-lg flex items-center justify-between">
                  <span>{connector.category}</span>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </summary>
                <div className="mt-4 flex flex-wrap gap-2">
                  {connector.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-lime-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Pricing Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business</h3>
              <p className="text-gray-600 mb-6">
                Seat-based Starter / Growth / Pro plans. Unlimited portals, usage alerts, 7-day trial.
              </p>
              <Link
                href="/pricing?product=securevault-docs&plan=business"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                View Detailed Pricing
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal</h3>
              <p className="text-gray-600 mb-6">
                Starter / Growth / Pro. Up to 3 people + 2 businesses per vault. 7-day trial.
              </p>
              <Link
                href="/pricing?product=securevault-docs&plan=personal"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                View Detailed Pricing
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Outcomes */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Real Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl p-8 text-center border border-emerald-100">
                <p className="text-lg text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm font-semibold text-emerald-600">{testimonial.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200"
                open={openFAQ === index}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFAQ(openFAQ === index ? null : index);
                }}
              >
                <summary className="cursor-pointer font-semibold text-gray-900 text-lg flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
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
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-lime-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Stop Chasing Documents?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup?product=securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/securevault-docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Try the Live Demo
              <PlayIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact-sales?product=SecureVault Docs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Talk to Sales
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
        <p>Powered by OMGSystems — 2025</p>
      </div>
    </main>
  );
}

