"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  DocumentTextIcon,
  PencilSquareIcon,
  NewspaperIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowRightIcon,
  ClockIcon,
  DocumentMinusIcon,
  ArrowPathIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  MapIcon,
  DocumentDuplicateIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  VideoCameraIcon,
  GiftIcon,
  CheckCircleIcon,
  SparklesIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import ServiceNav from "@/components/marketing/ServiceNav";
import { ConfigurableLeadForm, COLOR_SCHEMES, StickyGetStartedButton, MobileFormDrawer } from "@/components/forms";
export default function ContentDevelopmentPage() {
  // Slider state and refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Smooth momentum scroll after release
  const applyMomentum = () => {
    if (!sliderRef.current) return;

    if (Math.abs(velocityRef.current) > 0.5) {
      sliderRef.current.scrollLeft += velocityRef.current;
      velocityRef.current *= 0.95; // Friction
      animationRef.current = requestAnimationFrame(applyMomentum);
    } else {
      // Snap to nearest card
      const slideWidth = 340 + 24;
      const targetSlide = Math.round(sliderRef.current.scrollLeft / slideWidth);
      sliderRef.current.scrollTo({
        left: targetSlide * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  // Mouse handlers for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    lastXRef.current = e.pageX;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    // Track velocity for momentum
    velocityRef.current = lastXRef.current - e.pageX;
    lastXRef.current = e.pageX;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      applyMomentum();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    lastXRef.current = e.touches[0].pageX;
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    // Track velocity for momentum
    velocityRef.current = lastXRef.current - e.touches[0].pageX;
    lastXRef.current = e.touches[0].pageX;
  };

  const handleTouchEnd = () => {
    applyMomentum();
  };

  // Update active slide indicator
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const slideWidth = 340 + 24; // card width + gap
      const newActiveSlide = Math.round(slider.scrollLeft / slideWidth);
      setActiveSlide(newActiveSlide);
    };

    slider.addEventListener('scroll', handleScroll);
    return () => {
      slider.removeEventListener('scroll', handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Content types
  const contentTypes = [
    {
      icon: DocumentTextIcon,
      title: "Written Content",
      examples: "Blog posts, Articles, Guides, Whitepapers, Case Studies",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Social Media",
      examples: "Posts, Carousels, Threads, Stories, Captions",
    },
    {
      icon: EnvelopeIcon,
      title: "Email Marketing",
      examples: "Newsletters, Drip sequences, Welcome series, Re-engagement",
    },
    {
      icon: VideoCameraIcon,
      title: "Video & Audio",
      examples: "Video scripts, Podcast outlines, Webinar content",
    },
    {
      icon: GiftIcon,
      title: "Lead Magnets",
      examples: "Ebooks, Checklists, Templates, Calculators",
    },
  ];

  // Process steps
  const processSteps = [
    {
      phase: "DISCOVER",
      title: "Content Audit & Strategy",
      description:
        "We analyze your current content, research competitors, and identify gaps and opportunities. You receive a comprehensive content strategy document.",
      deliverable: "Content Strategy Document",
    },
    {
      phase: "DESIGN",
      title: "Systems & Templates",
      description:
        "We build your content SOPs, templates, and style guides. Everything is documented for consistent execution.",
      deliverable: "SOP Library + Templates",
    },
    {
      phase: "CREATE",
      title: "Content Production",
      description:
        "Our team produces your first batch of content following the systems we built. You review, we refine.",
      deliverable: "First Content Batch",
    },
    {
      phase: "OPTIMIZE",
      title: "Review & Scale",
      description:
        "We analyze performance, gather insights, and optimize the system for ongoing success. Your content machine is running.",
      deliverable: "Optimization Report",
    },
  ];

  // Stats for marquee
  const stats = [
    "500+ Pieces Created",
    "50+ Brands Served",
    "3x Engagement Increase",
    "90% Client Retention",
    "2 Week Turnaround",
    "100% SOP Documented",
  ];

  // FAQ items
  const faqs = [
    {
      question: "How fast can you start?",
      answer: "Most projects kick off within 1 week of signing.",
      size: "short",
    },
    {
      question: "What if I already have some content?",
      answer:
        "We'll audit your existing content and incorporate what's working into the new system. Nothing goes to waste.",
      size: "medium",
    },
    {
      question: "Do you write in our brand voice?",
      answer:
        "Absolutely. We develop a voice guide based on your brand and follow it for all content.",
      size: "short",
    },
    {
      question: "What's included in the SOP documentation?",
      answer:
        "You receive templates for every content type, workflow checklists, style guides, approval processes, and a complete operations manual your team can follow.",
      size: "long",
    },
    {
      question: "Can you handle ongoing content production?",
      answer:
        "Yes. Many clients start with strategy and SOPs, then retain us for ongoing content creation on a monthly basis.",
      size: "medium",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We specialize in B2B, SaaS, professional services, and growth-stage companies.",
      size: "short",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-32 sm:pb-40">
        {/* Animated Background - Document Flow SVG */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="contentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                <stop offset="100%" stopColor="rgba(45, 212, 191, 0.1)" />
              </linearGradient>
              <linearGradient id="contentGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(45, 212, 191, 0.2)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
              </linearGradient>
            </defs>

            {/* Flowing content lines */}
            <path
              d="M0,400 Q300,350 600,400 T1200,400"
              fill="none"
              stroke="url(#contentGradient1)"
              strokeWidth="2"
              opacity="0.4"
            >
              <animate
                attributeName="d"
                values="M0,400 Q300,350 600,400 T1200,400;M0,400 Q300,450 600,400 T1200,400;M0,400 Q300,350 600,400 T1200,400"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,300 Q400,250 800,300 T1200,300"
              fill="none"
              stroke="url(#contentGradient2)"
              strokeWidth="1.5"
              opacity="0.3"
            >
              <animate
                attributeName="d"
                values="M0,300 Q400,250 800,300 T1200,300;M0,300 Q400,350 800,300 T1200,300;M0,300 Q400,250 800,300 T1200,300"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,500 Q200,550 500,500 T1200,500"
              fill="none"
              stroke="url(#contentGradient1)"
              strokeWidth="1"
              opacity="0.25"
            >
              <animate
                attributeName="d"
                values="M0,500 Q200,550 500,500 T1200,500;M0,500 Q200,450 500,500 T1200,500;M0,500 Q200,550 500,500 T1200,500"
                dur="7s"
                repeatCount="indefinite"
              />
            </path>

            {/* Content node dots */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={150 + i * 130}
                cy="400"
                r="4"
                fill="rgba(16, 185, 129, 0.6)"
              >
                <animate
                  attributeName="cy"
                  values={`${400 + (i % 2 === 0 ? -30 : 30)};${400 + (i % 2 === 0 ? 30 : -30)};${400 + (i % 2 === 0 ? -30 : 30)}`}
                  dur={`${4 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur={`${4 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Document shapes floating */}
            <rect x="200" y="200" width="60" height="80" rx="4" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1">
              <animate attributeName="y" values="200;180;200" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="900" y="550" width="50" height="70" rx="4" fill="none" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1">
              <animate attributeName="y" values="550;570;550" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5s" repeatCount="indefinite" />
            </rect>
          </svg>

          {/* Glow Orbs */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-[15%] animate-bounce" style={{ animationDuration: "3s" }}>
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <DocumentTextIcon className="w-7 h-7 text-emerald-400/70" />
          </div>
        </div>
        <div className="absolute top-48 right-[20%] animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
            <PencilSquareIcon className="w-6 h-6 text-teal-400/70" />
          </div>
        </div>
        <div className="absolute bottom-32 left-[25%] animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <NewspaperIcon className="w-5 h-5 text-emerald-400/70" />
          </div>
        </div>
        <div className="absolute bottom-48 right-[15%] animate-bounce" style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}>
          <div className="w-11 h-11 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-teal-400/70" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Service Navigation Links */}
          <ServiceNav />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
            <DocumentTextIcon className="w-4 h-4" />
            Done-For-You Content Development
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Content That
            </span>
            <br />
            <span className="text-white">Actually Converts.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            We plan, create, and optimize content systems that attract your
            ideal audience, build authority, and drive measurable business results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Start Your Content Strategy
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              See Our Content Process
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-emerald-400" />
              500+ Pieces Created
            </div>
            <div className="flex items-center gap-2">
              <Cog6ToothIcon className="w-4 h-4 text-emerald-400" />
              SOP-Driven Process
            </div>
            <div className="flex items-center gap-2">
              <DocumentDuplicateIcon className="w-4 h-4 text-emerald-400" />
              Full Content Suite
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: PROBLEM - STAGGERED OFFSET CARDS ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Content Without a System is{" "}
              <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                Just Noise
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              If any of these sound familiar, you're leaving growth on the table.
            </p>
          </div>

          {/* Equal Size Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-500 h-full flex flex-col">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <ClockIcon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Inconsistent Publishing</h3>
              <p className="text-white/60 flex-1">
                You post when you remember, not when it matters. No rhythm, no strategy, no results.
              </p>
            </div>

            {/* Card 2 */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500 h-full flex flex-col">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                <DocumentMinusIcon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Content That Doesn't Connect</h3>
              <p className="text-white/60 flex-1">
                You're creating content but it's not speaking to your audience's real problems or desires.
              </p>
            </div>

            {/* Card 3 */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-500 h-full flex flex-col">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <ArrowPathIcon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Reinventing Every Piece</h3>
              <p className="text-white/60 flex-1">
                No templates, no SOPs, no systems. Every piece of content starts from scratch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CONTENT PILLARS - RADIAL HUB ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Radial Layout */}
          <div className="hidden lg:block relative h-[500px]">
            {/* Center Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center z-10">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Your Complete</h2>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Content System
                </span>
              </div>
            </div>

            {/* Connecting Lines - Animated dashed lines */}
            {/* Top line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[100px] w-[2px] h-[54px] overflow-hidden">
              <div
                className="w-full h-[200%] animate-[moveDown_1s_linear_infinite]"
                style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, rgb(16 185 129 / 0.5) 6px, rgb(16 185 129 / 0.5) 12px)'
                }}
              />
            </div>
            {/* Bottom line */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[100px] w-[2px] h-[54px] overflow-hidden">
              <div
                className="w-full h-[200%] animate-[moveUp_1s_linear_infinite]"
                style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, rgb(16 185 129 / 0.5) 6px, rgb(16 185 129 / 0.5) 12px)'
                }}
              />
            </div>
            {/* Left line */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[176px] h-[2px] overflow-hidden" style={{ width: 'calc(50% - 176px - 96px)' }}>
              <div
                className="h-full w-[200%] animate-[moveRight_1s_linear_infinite]"
                style={{
                  background: 'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgb(16 185 129 / 0.5) 6px, rgb(16 185 129 / 0.5) 12px)'
                }}
              />
            </div>
            {/* Right line */}
            <div className="absolute top-1/2 -translate-y-1/2 right-[176px] h-[2px] overflow-hidden" style={{ width: 'calc(50% - 176px - 96px)' }}>
              <div
                className="h-full w-[200%] animate-[moveLeft_1s_linear_infinite]"
                style={{
                  background: 'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgb(16 185 129 / 0.5) 6px, rgb(16 185 129 / 0.5) 12px)'
                }}
              />
            </div>

            {/* Animation keyframes */}
            <style jsx>{`
              @keyframes moveDown {
                0% { transform: translateY(-50%); }
                100% { transform: translateY(0%); }
              }
              @keyframes moveUp {
                0% { transform: translateY(0%); }
                100% { transform: translateY(-50%); }
              }
              @keyframes moveRight {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              @keyframes moveLeft {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `}</style>

            {/* Pillar 1 - Top */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-44">
              <div className="backdrop-blur-xl bg-slate-900/60 rounded-xl border border-emerald-500/20 p-4 text-center hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <LightBulbIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-sm">Content Strategy</h3>
                <p className="text-xs text-white/50 mt-1">Know what to create and why</p>
              </div>
            </div>

            {/* Pillar 2 - Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-44">
              <div className="backdrop-blur-xl bg-slate-900/60 rounded-xl border border-emerald-500/20 p-4 text-center hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <PencilSquareIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-sm">Content Creation</h3>
                <p className="text-xs text-white/50 mt-1">Professional, on-brand content</p>
              </div>
            </div>

            {/* Pillar 3 - Bottom */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-44">
              <div className="backdrop-blur-xl bg-slate-900/60 rounded-xl border border-emerald-500/20 p-4 text-center hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Cog6ToothIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-sm">SOPs & Systems</h3>
                <p className="text-xs text-white/50 mt-1">Repeatable, scalable processes</p>
              </div>
            </div>

            {/* Pillar 4 - Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-44">
              <div className="backdrop-blur-xl bg-slate-900/60 rounded-xl border border-emerald-500/20 p-4 text-center hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-10 h-10 mx-auto mb-2 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-sm">Optimization</h3>
                <p className="text-xs text-white/50 mt-1">Continuous improvement</p>
              </div>
            </div>
          </div>

          {/* Mobile: Stacked Layout */}
          <div className="lg:hidden">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Complete</h2>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Content System
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: LightBulbIcon, title: "Content Strategy", desc: "Know what to create and why" },
                { icon: PencilSquareIcon, title: "Content Creation", desc: "Professional, on-brand content" },
                { icon: Cog6ToothIcon, title: "SOPs & Systems", desc: "Repeatable, scalable processes" },
                { icon: ChartBarIcon, title: "Optimization", desc: "Continuous improvement" },
              ].map((pillar, index) => (
                <div key={index} className="backdrop-blur-xl bg-slate-900/60 rounded-xl border border-emerald-500/20 p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <pillar.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{pillar.title}</h3>
                  <p className="text-xs text-white/50 mt-1">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WHAT'S INCLUDED - STACKED ALTERNATING CARDS ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Scale Your Content
              </span>
            </h2>
          </div>

          {/* Stacked Cards */}
          <div className="space-y-8">
            {/* Card 01 - Icon Left */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                    <MapIcon className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">01</span>
                    <h3 className="text-xl font-semibold text-white">Content Strategy & Planning</h3>
                  </div>
                  <p className="text-white/60 mb-4">
                    We audit your current content, research your audience, and build a 90-day content roadmap aligned with your business goals.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {["Audience research & persona development", "Content audit & gap analysis", "Editorial calendar creation", "Topic cluster mapping"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 02 - Icon Right */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row-reverse gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                    <PencilSquareIcon className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">02</span>
                    <h3 className="text-xl font-semibold text-white">Content Creation & Production</h3>
                  </div>
                  <p className="text-white/60 mb-4">
                    Our team writes, designs, and produces content that resonates with your audience and drives action.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {["Blog posts & articles", "Social media content", "Email sequences", "Lead magnets & guides"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 03 - Icon Left */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                    <DocumentDuplicateIcon className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">03</span>
                    <h3 className="text-xl font-semibold text-white">SOPs & Content Systems</h3>
                  </div>
                  <p className="text-white/60 mb-4">
                    We document everything into repeatable systems your team can follow, ensuring consistency at scale.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {["Content creation templates", "Style guide & voice documentation", "Workflow SOPs", "Quality checklists"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 04 - Icon Right */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row-reverse gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                    <ArrowTrendingUpIcon className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">04</span>
                    <h3 className="text-xl font-semibold text-white">Optimization & Iteration</h3>
                  </div>
                  <p className="text-white/60 mb-4">
                    We analyze performance and continuously refine your content strategy based on real data.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {["Performance tracking", "A/B testing insights", "Content repurposing", "Quarterly strategy reviews"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CONTENT TYPES - SWIPEABLE SLIDER ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Every Content Format{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                You Need
              </span>
            </h2>
            <p className="text-white/50 text-sm mt-2">Swipe to explore →</p>
          </div>

          {/* Swipeable Slider */}
          <div
            ref={sliderRef}
            className={`flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: isDragging ? 'auto' : 'smooth'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {contentTypes.map((type, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] sm:w-[340px] snap-center backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500"
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30">
                  <type.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                <p className="text-sm text-white/50">{type.examples}</p>
              </div>
            ))}
          </div>

          {/* Scroll Indicator Dots - 3 dots for navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1, 2].map((dotIndex) => {
              // Map activeSlide (0-4) to dot (0-2): 0,1->0, 2->1, 3,4->2
              const activeDot = activeSlide <= 1 ? 0 : activeSlide <= 2 ? 1 : 2;
              return (
                <button
                  key={dotIndex}
                  onClick={() => {
                    if (sliderRef.current) {
                      const slideWidth = 340 + 24;
                      // Map 3 dots to positions: dot 0->slide 0, dot 1->slide 2, dot 2->slide 4
                      const targetSlide = dotIndex * 2;
                      sliderRef.current.scrollTo({
                        left: slideWidth * targetSlide,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeDot === dotIndex
                      ? 'bg-emerald-500 w-6'
                      : 'bg-emerald-500/30 hover:bg-emerald-500/50 w-2.5'
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* Hide scrollbar CSS */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* ===== SECTION 6: HOW IT WORKS - VERTICAL PROGRESS LINE ===== */}
      <section id="how-it-works" className="relative py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From Chaos to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Content Machine
              </span>
            </h2>
          </div>

          {/* Process Steps with Vertical Line */}
          <div className="relative">
            {/* Vertical Progress Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500" />

            {/* Steps */}
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative pl-12 md:pl-20">
                  {/* Progress Dot */}
                  <div className="absolute left-2 md:left-6 top-6 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

                  {/* Card */}
                  <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all duration-500">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                        {step.deliverable}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: TRUST - SCROLLING MARQUEE ===== */}
      <section className="relative py-16 overflow-hidden">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

        {/* Marquee Container */}
        <div className="flex animate-marquee hover:pause-animation">
          {/* Double the content for seamless loop */}
          {[...stats, ...stats].map((stat, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
            >
              <span className="text-emerald-400 font-semibold whitespace-nowrap">{stat}</span>
            </div>
          ))}
        </div>

        {/* Custom CSS for marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ===== SECTION 8: WHO THIS IS FOR - SINGLE CARD ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for Businesses{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Ready to Scale Content
              </span>
            </h2>
          </div>

          {/* Single Card */}
          <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-emerald-500/20 p-8 hover:border-emerald-500/40 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {[
                  "You know content matters but can't find time to create it",
                  "You want systems, not just one-off pieces",
                  "You're ready to invest in professional content",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {[
                  "You need consistent, on-brand messaging",
                  "You want to scale without hiring in-house",
                  "You value strategy over random posting",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-white/50">
                Not ready for a full content system?{" "}
                <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">
                  Start with our Content Strategy Session
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: FAQ - BENTO GRID ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions About{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Content Development
              </span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)]">
            {/* Card 1 - Short - 1 col */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col justify-center">
              <h3 className="font-semibold text-white mb-3">{faqs[0].question}</h3>
              <p className="text-white/60 text-sm">{faqs[0].answer}</p>
            </div>

            {/* Card 2 - Medium - 2 cols */}
            <div className="md:col-span-2 backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col justify-center">
              <h3 className="font-semibold text-white mb-3">{faqs[1].question}</h3>
              <p className="text-white/60 text-sm">{faqs[1].answer}</p>
            </div>

            {/* Card 3 - Short - 1 col */}
            <div className="backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col justify-center">
              <h3 className="font-semibold text-white mb-3">{faqs[2].question}</h3>
              <p className="text-white/60 text-sm">{faqs[2].answer}</p>
            </div>

            {/* Card 4 - Long - 2 cols, 2 rows */}
            <div className="md:col-span-2 lg:row-span-2 backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col justify-center">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <DocumentDuplicateIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-3">{faqs[3].question}</h3>
              <p className="text-white/70">{faqs[3].answer}</p>
            </div>

            {/* Card 5 - Medium - 2 cols */}
            <div className="md:col-span-2 backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col justify-center">
              <h3 className="font-semibold text-white mb-3">{faqs[4].question}</h3>
              <p className="text-white/60 text-sm">{faqs[4].answer}</p>
            </div>

            {/* Card 6 - Short - 2 cols on mobile, 2 cols on desktop */}
            <div className="md:col-span-2 backdrop-blur-xl bg-slate-900/60 rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col justify-center">
              <h3 className="font-semibold text-white mb-3">{faqs[5].question}</h3>
              <p className="text-white/60 text-sm">{faqs[5].answer}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: FINAL CTA - GRADIENT BORDER CARD ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card with Animated Gradient Border */}
          <div className="relative group">
            {/* Animated Gradient Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-3xl opacity-75 group-hover:opacity-100 blur-sm transition duration-500 animate-gradient-xy" />

            {/* Card Content */}
            <div className="relative backdrop-blur-xl bg-slate-900 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Your Content Engine?
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                Book a free content strategy call. We'll review your current content,
                identify quick wins, and show you what a real content system looks like.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                  Book Your Free Strategy Call
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                >
                  See Content Examples
                </Link>
              </div>

              {/* Micro-copy */}
              <p className="text-sm text-white/50">
                No commitment. Just a clear content roadmap.
              </p>
            </div>
          </div>

          {/* Custom CSS for gradient animation */}
          <style jsx>{`
            @keyframes gradient-xy {
              0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
            .animate-gradient-xy {
              background-size: 200% 200%;
              animation: gradient-xy 3s ease infinite;
            }
          `}</style>
        </div>
      </section>

      {/* Lead Form Section - Emerald Theme */}
      <ConfigurableLeadForm
        formType="marketing"
        colorScheme={COLOR_SCHEMES.emerald}
      />

      {/* Sticky Button (Desktop) - Emerald Theme */}
      <StickyGetStartedButton
        variant="marketing"
        customGradient="from-emerald-500 to-teal-500"
        customShadow="shadow-emerald-500/30"
      />

      {/* Mobile Drawer */}
      <MobileFormDrawer variant="marketing" />
    </div>
  );
}
