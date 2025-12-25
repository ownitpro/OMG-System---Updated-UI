"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  CogIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UserGroupIcon,
  BoltIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const helpCategories = [
  {
    name: "Getting Started",
    description: "New to OMGsystems? Start here for setup guides and tutorials",
    icon: RocketLaunchIcon,
    color: "cyan",
    articles: 12,
    popular: ["Quick Start Guide", "Account Setup", "First Automation"],
  },
  {
    name: "Account & Billing",
    description: "Manage your subscription, payments, and account settings",
    icon: CreditCardIcon,
    color: "amber",
    articles: 8,
    popular: ["Upgrade Plan", "Payment Methods", "Invoice History"],
  },
  {
    name: "Automations",
    description: "Learn how to create, manage, and optimize your workflows",
    icon: BoltIcon,
    color: "violet",
    articles: 24,
    popular: ["Create Workflow", "Triggers & Actions", "Templates"],
  },
  {
    name: "Integrations",
    description: "Connect OMGsystems with your favorite tools and apps",
    icon: CogIcon,
    color: "emerald",
    articles: 16,
    popular: ["API Setup", "Zapier", "Google Workspace"],
  },
  {
    name: "Security & Privacy",
    description: "Data protection, access controls, and compliance information",
    icon: ShieldCheckIcon,
    color: "rose",
    articles: 10,
    popular: ["Two-Factor Auth", "Data Export", "PIPEDA Compliance"],
  },
  {
    name: "Team Management",
    description: "Add users, set permissions, and manage your organization",
    icon: UserGroupIcon,
    color: "orange",
    articles: 9,
    popular: ["Invite Members", "Role Permissions", "Teams & Groups"],
  },
];

const popularArticles = [
  {
    title: "How to Create Your First Automation",
    category: "Getting Started",
    readTime: "5 min",
    color: "cyan",
  },
  {
    title: "Understanding Triggers and Actions",
    category: "Automations",
    readTime: "8 min",
    color: "violet",
  },
  {
    title: "Setting Up Two-Factor Authentication",
    category: "Security",
    readTime: "3 min",
    color: "rose",
  },
  {
    title: "Connecting Google Workspace",
    category: "Integrations",
    readTime: "4 min",
    color: "emerald",
  },
  {
    title: "Managing Team Permissions",
    category: "Team Management",
    readTime: "6 min",
    color: "orange",
  },
];

const videoTutorials = [
  { title: "Platform Overview", duration: "12:34", views: "2.4K" },
  { title: "Building Your First Workflow", duration: "8:45", views: "1.8K" },
  { title: "Advanced Automation Tips", duration: "15:20", views: "956" },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel anytime from your Account Settings. You'll retain access until the end of your billing period.",
  },
  {
    question: "How do I export my data?",
    answer: "Go to Settings → Data → Export. You can download all your data in JSON or CSV format within 24 hours.",
  },
  {
    question: "Is my data stored in Canada?",
    answer: "Yes, all data is stored exclusively in Canadian data centers. We never transfer data outside Canada without consent.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements - Warm/Cool mix */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute top-[35%] right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[65%] left-1/3 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <QuestionMarkCircleIcon className="w-4 h-4" />
              Help Center
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How Can We{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
                Help You?
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Find answers, tutorials, and guides to get the most out of OMGsystems.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white text-lg placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all">
                  Search
                </button>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Getting Started", "Billing", "API Docs", "Contact Support"].map((link) => (
                  <button
                    key={link}
                    className="px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== HELP CATEGORIES - Bento Grid ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Browse by{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {helpCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/help/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className={`group backdrop-blur-xl rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.02] ${
                  cat.color === "cyan"
                    ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/40"
                    : cat.color === "amber"
                    ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-400/40"
                    : cat.color === "violet"
                    ? "bg-violet-500/5 border-violet-500/20 hover:border-violet-400/40"
                    : cat.color === "emerald"
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-400/40"
                    : cat.color === "rose"
                    ? "bg-rose-500/5 border-rose-500/20 hover:border-rose-400/40"
                    : "bg-orange-500/5 border-orange-500/20 hover:border-orange-400/40"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      cat.color === "cyan"
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25"
                        : cat.color === "amber"
                        ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25"
                        : cat.color === "violet"
                        ? "bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25"
                        : cat.color === "emerald"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25"
                        : cat.color === "rose"
                        ? "bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25"
                        : "bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25"
                    }`}
                  >
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/40 text-sm">{cat.articles} articles</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{cat.name}</h3>
                <p className="text-sm text-white/50 mb-4">{cat.description}</p>

                {/* Popular in Category */}
                <div className="space-y-2">
                  {cat.popular.map((article, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
                      <ChevronRightIcon className="w-3 h-3" />
                      <span>{article}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== POPULAR ARTICLES - Horizontal Scroll ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Popular{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
            <Link href="/help/articles" className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1">
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularArticles.map((article, idx) => (
              <Link
                key={idx}
                href="#"
                className="group backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300"
              >
                <div className={`text-xs font-medium mb-3 ${
                  article.color === "cyan" ? "text-cyan-400" :
                  article.color === "violet" ? "text-violet-400" :
                  article.color === "rose" ? "text-rose-400" :
                  article.color === "emerald" ? "text-emerald-400" : "text-orange-400"
                }`}>
                  {article.category}
                </div>
                <h3 className="text-white font-medium mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <ClockIcon className="w-3.5 h-3.5" />
                  {article.readTime} read
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== VIDEO TUTORIALS - Featured Section ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="backdrop-blur-xl bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 rounded-3xl border border-white/10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left - Featured Video */}
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative aspect-video bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20" />
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <PlayCircleIcon className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white font-medium">Watch Platform Overview</p>
                    <p className="text-white/50 text-sm">12:34 minutes</p>
                  </div>
                </div>
              </div>

              {/* Right - Video List */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <VideoCameraIcon className="w-6 h-6 text-violet-400" />
                  <h2 className="text-2xl font-bold text-white">Video Tutorials</h2>
                </div>
                <p className="text-white/60 mb-6">
                  Learn OMGsystems visually with our step-by-step video guides.
                </p>

                <div className="space-y-3">
                  {videoTutorials.map((video, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-violet-500/30 cursor-pointer transition-all"
                    >
                      <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/30 transition-colors">
                        <PlayCircleIcon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{video.title}</h4>
                        <p className="text-white/40 text-sm">{video.duration} • {video.views} views</p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>

                <Link
                  href="/help/videos"
                  className="inline-flex items-center gap-2 mt-6 text-violet-400 hover:text-violet-300 font-medium"
                >
                  Browse All Videos <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FAQ SECTION - Accordion Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <QuestionMarkCircleIcon className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  <ChevronRightIcon
                    className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform ${
                      expandedFaq === idx ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-5 text-white/60 border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== CONTACT OPTIONS - 3 Cards ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Still Need{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Help?
              </span>
            </h2>
            <p className="text-white/50 mt-2">Our support team is here for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: ChatBubbleLeftRightIcon,
                title: "Live Chat",
                desc: "Chat with our team in real-time",
                action: "Start Chat",
                color: "cyan",
                availability: "Available 24/7",
              },
              {
                icon: EnvelopeIcon,
                title: "Email Support",
                desc: "Get a response within 24 hours",
                action: "Send Email",
                color: "amber",
                availability: "support@omgsystems.ca",
              },
              {
                icon: PhoneIcon,
                title: "Phone Support",
                desc: "Speak directly with an expert",
                action: "Call Now",
                color: "emerald",
                availability: "Mon-Fri, 9AM-6PM EST",
              },
            ].map((option, idx) => (
              <div
                key={idx}
                className={`group backdrop-blur-xl rounded-2xl border p-6 text-center transition-all duration-500 hover:scale-[1.02] ${
                  option.color === "cyan"
                    ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-400/40"
                    : option.color === "amber"
                    ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-400/40"
                    : "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-400/40"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    option.color === "cyan"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25"
                      : option.color === "amber"
                      ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25"
                      : "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25"
                  }`}
                >
                  <option.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-white/50 text-sm mb-4">{option.desc}</p>
                <p className={`text-xs mb-4 ${
                  option.color === "cyan" ? "text-cyan-400" :
                  option.color === "amber" ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {option.availability}
                </p>
                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    option.color === "cyan"
                      ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                      : option.color === "amber"
                      ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  }`}
                >
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RESOURCES STRIP ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: BookOpenIcon, label: "Documentation", href: "/docs" },
              { icon: AcademicCapIcon, label: "Academy", href: "/academy" },
              { icon: DocumentTextIcon, label: "API Reference", href: "/api" },
              { icon: UserGroupIcon, label: "Community", href: "/community" },
            ].map((resource, idx) => (
              <Link
                key={idx}
                href={resource.href}
                className="flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
              >
                <resource.icon className="w-5 h-5 text-violet-400" />
                <span className="text-white/70 hover:text-white">{resource.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-violet-600 to-amber-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Can't Find What You Need?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Our team is ready to help you succeed with OMGsystems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Contact Support
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/apps/demo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
