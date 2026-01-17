"use client";

import Link from "next/link";
import {
  SparklesIcon,
  LightBulbIcon,
  SwatchIcon,
  DocumentDuplicateIcon,
  ComputerDesktopIcon,
  BookOpenIcon,
  FilmIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  PaintBrushIcon,
  PhotoIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowLongRightIcon,
  EyeIcon,
  HeartIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ServiceNav from "@/components/marketing/ServiceNav";
import { MarketingLeadForm, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";

export default function BrandingCreativePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const transformations = [
    {
      before: "Generic logo from a template",
      after: "Custom visual identity that tells your story",
    },
    {
      before: "Inconsistent colors and fonts everywhere",
      after: "Cohesive brand system across all touchpoints",
    },
    {
      before: "No clear message or positioning",
      after: "Strategic voice that resonates with your audience",
    },
    {
      before: "DIY graphics that look amateur",
      after: "Premium creative assets that build trust",
    },
  ];

  const serviceCategories = [
    {
      title: "Strategy",
      icon: LightBulbIcon,
      color: "purple",
      items: [
        "Brand Discovery Workshop",
        "Competitive Analysis",
        "Brand Positioning",
        "Messaging Framework",
        "Target Audience Profiling",
      ],
    },
    {
      title: "Identity",
      icon: SwatchIcon,
      color: "violet",
      items: [
        "Logo Design System",
        "Color Palette",
        "Typography Selection",
        "Visual Style Guide",
        "Icon & Pattern Library",
      ],
    },
    {
      title: "Assets",
      icon: DocumentDuplicateIcon,
      color: "fuchsia",
      items: [
        "Business Cards & Stationery",
        "Social Media Templates",
        "Presentation Decks",
        "Email Signatures",
        "Marketing Collateral",
      ],
    },
  ];

  const processSteps = [
    {
      phase: "Discover",
      title: "Deep Dive Into Your Brand",
      description: "We learn everything about your business, goals, audience, and competition through collaborative workshops.",
      icon: EyeIcon,
    },
    {
      phase: "Define",
      title: "Strategy & Direction",
      description: "We crystallize your brand positioning, voice, and visual direction with clear creative concepts.",
      icon: LightBulbIcon,
    },
    {
      phase: "Design",
      title: "Bring It To Life",
      description: "Your complete visual identity takes shape through iterative design and refinement.",
      icon: PaintBrushIcon,
    },
    {
      phase: "Deliver",
      title: "Launch Ready",
      description: "You receive all assets, guidelines, and files organized for immediate implementation.",
      icon: BoltIcon,
    },
  ];

  const portfolioStats = [
    { label: "Brands Transformed", value: "100+" },
    { label: "Industries Served", value: "25+" },
    { label: "Client Satisfaction", value: "98%" },
    { label: "Years Experience", value: "15+" },
  ];

  const testimonial = {
    quote: "They didn't just give us a logo — they gave us a complete brand identity that transformed how customers perceive us. Our brand finally matches the quality of our work.",
    author: "Sarah Chen",
    role: "Founder, Elevate Consulting",
  };

  const faqs = [
    {
      question: "How long does a full branding project take?",
      answer: "Most projects complete in 4-6 weeks depending on scope. Rush timelines available for additional investment.",
    },
    {
      question: "What if I already have a logo?",
      answer: "We can work with existing elements or recommend a refresh. Many clients come to us for brand systems, not just logos.",
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes, our process includes multiple revision rounds at each phase to ensure you're completely satisfied.",
    },
    {
      question: "What files do I receive?",
      answer: "You receive all source files (AI, PSD), web-ready formats (PNG, SVG, JPG), and organized packages for print and digital use.",
    },
    {
      question: "Can you help with ongoing creative needs?",
      answer: "Absolutely. Many clients retain us for ongoing creative direction, campaign assets, and brand evolution.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== SECTION 1: HERO (Keeping Same Design) ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-32 sm:pb-40">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="brandGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
                <stop offset="100%" stopColor="rgba(167, 139, 250, 0.1)" />
              </linearGradient>
              <linearGradient id="brandGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(167, 139, 250, 0.2)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.05)" />
              </linearGradient>
            </defs>

            {/* Abstract creative shapes */}
            <path
              d="M100,400 Q300,200 500,400 T900,400"
              fill="none"
              stroke="url(#brandGradient1)"
              strokeWidth="2"
              opacity="0.3"
            >
              <animate attributeName="d" values="M100,400 Q300,200 500,400 T900,400;M100,400 Q300,600 500,400 T900,400;M100,400 Q300,200 500,400 T900,400" dur="10s" repeatCount="indefinite" />
            </path>
            <path
              d="M200,300 Q400,500 600,300 T1000,300"
              fill="none"
              stroke="url(#brandGradient2)"
              strokeWidth="1.5"
              opacity="0.25"
            >
              <animate attributeName="d" values="M200,300 Q400,500 600,300 T1000,300;M200,300 Q400,100 600,300 T1000,300;M200,300 Q400,500 600,300 T1000,300" dur="12s" repeatCount="indefinite" />
            </path>

            {/* Floating creative dots */}
            {[...Array(15)].map((_, i) => (
              <circle
                key={i}
                cx={80 + i * 80}
                cy="400"
                r="4"
                fill="rgba(167, 139, 250, 0.5)"
              >
                <animate
                  attributeName="cy"
                  values={`${350 + (i % 3) * 50};${400 + (i % 2) * 30};${350 + (i % 3) * 50}`}
                  dur={`${4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur={`${4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>

          {/* Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-[15%] animate-bounce" style={{ animationDuration: "3s" }}>
          <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <PaintBrushIcon className="w-7 h-7 text-purple-400/70" />
          </div>
        </div>
        <div className="absolute top-48 right-[20%] animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-violet-400/70" />
          </div>
        </div>
        <div className="absolute bottom-32 left-[25%] animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <SwatchIcon className="w-5 h-5 text-purple-400/70" />
          </div>
        </div>
        <div className="absolute bottom-48 right-[15%] animate-bounce" style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}>
          <div className="w-11 h-11 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <PhotoIcon className="w-5 h-5 text-violet-400/70" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Service Navigation Links */}
          <ServiceNav />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-8">
            <SparklesIcon className="w-4 h-4" />
            Done-For-You Branding & Creative
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
              Your Brand.
            </span>
            <br />
            <span className="text-white">Unforgettable.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            We craft compelling brand identities and creative assets that
            capture attention, build trust, and drive lasting impressions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold rounded-lg hover:from-purple-400 hover:to-violet-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              Start Your Brand Transformation
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="#process"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              See Our Process
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-purple-400" />
              Award-Winning Designers
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-purple-400" />
              100+ Brands Launched
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-purple-400" />
              Full Creative Suite
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: BEFORE/AFTER TRANSFORMATION ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Transformation
              </span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              See what changes when you invest in professional branding.
            </p>
          </div>

          {/* Before/After Container */}
          <div className="relative backdrop-blur-xl bg-slate-900/40 rounded-3xl border border-white/10 overflow-hidden">
            {/* Center Divider Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2">
              {/* Before Side */}
              <div className="p-8 md:p-12 bg-red-500/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-4 h-4 rounded-full bg-red-500/50" />
                  <h3 className="text-2xl md:text-3xl font-bold text-red-400 uppercase tracking-wider">Before</h3>
                </div>
                <div className="space-y-6">
                  {transformations.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <XCircleIcon className="w-5 h-5 text-red-400/70 flex-shrink-0 mt-0.5" />
                      <span className="text-white/50">{item.before}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After Side */}
              <div className="p-8 md:p-12 bg-purple-500/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-400 uppercase tracking-wider">After</h3>
                </div>
                <div className="space-y-6">
                  {transformations.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item.after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: SERVICES WITH TABS ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What's{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Included
              </span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              A complete brand system, not just a logo.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 mb-12">
            {serviceCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === index
                    ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.title}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Icon Display */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-3xl flex items-center justify-center">
                    {(() => {
                      const IconComponent = serviceCategories[activeTab].icon;
                      return <IconComponent className="w-24 h-24 text-purple-400" />;
                    })()}
                  </div>
                  <div className="absolute -inset-4 bg-purple-500/10 rounded-3xl blur-xl -z-10" />
                </div>
              </div>

              {/* Right - Items List */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {serviceCategories[activeTab].title} Deliverables
                </h3>
                <ul className="space-y-4">
                  {serviceCategories[activeTab].items.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: PROCESS - VERTICAL TIMELINE ===== */}
      <section id="process" className="relative py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              A proven approach that delivers results in 4-6 weeks.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-violet-500/50 to-purple-500/50 md:-translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className={`relative flex items-start gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30" />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 1 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-purple-400 font-semibold uppercase tracking-wider text-sm">{step.phase}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-white/60">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: STATS BAR ===== */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl border border-purple-500/20 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {portfolioStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: TESTIMONIAL ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Quote Mark */}
            <div className="absolute -top-8 left-8 text-8xl text-purple-500/20 font-serif">"</div>

            <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
              <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                {testimonial.quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: FAQ - DIFFERENT LAYOUT ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 sticky top-32">
                Questions?{" "}
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Answers.
                </span>
              </h2>
              <p className="text-white/60 mb-8">
                Everything you need to know about working with us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                Have another question? Let's talk
                <ArrowLongRightIcon className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 pb-4"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex items-start justify-between gap-4 py-2"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <span className={`text-purple-400 transition-transform duration-300 ${openFaq === index ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <p className="text-white/60 text-sm mt-2 pr-8">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: FINAL CTA - DIFFERENT DESIGN ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

            {/* Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to stand out?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
                Let's build a brand that makes your competition nervous.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
                >
                  Book Free Consultation
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <MarketingLeadForm />

      {/* Sticky Button (Desktop) */}
      <StickyGetStartedButton variant="marketing" />

      {/* Mobile Drawer */}
      <MobileFormDrawer variant="marketing" />
    </div>
  );
}
