'use client'

import Link from "next/link";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [rotatingText, setRotatingText] = useState(0);
  const rotatingTexts = ["Forever.", "Securely.", "Instantly."];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [planTier, setPlanTier] = useState<'personal' | 'business'>('personal');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  /* State: Mobile menu handling removed (handled in Header component) */

  /* Effect: Scroll lock removed (handled in Header component) */

  useEffect(() => {
    // Rotating text animation
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ctx: any;

    const initAnimations = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-subheadline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );


      // Trust badges animation
      gsap.fromTo(
        ".trust-badge",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.8,
          ease: "back.out(1.7)"
        }
      );

      // Scroll-triggered animations for features
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          }
        }
      );

      // How it works section
      gsap.fromTo(
        ".step-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 80%",
          }
        }
      );

      // Security feature cards
      gsap.fromTo(
        ".security-feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          }
        }
      );

      // Pricing cards
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 80%",
          }
        }
      );

      // FAQ items
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          }
        }
      );

      // CTA section
      gsap.fromTo(
        ".cta-section",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          }
        }
      );

      // Floating elements animation - gentle bobbing effect
      gsap.to(".floating-doc-1", {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".floating-doc-2", {
        y: 15,
        rotation: -3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      gsap.to(".floating-doc-3", {
        y: -15,
        rotation: -5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });

      gsap.to(".floating-shield", {
        y: -10,
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Parallax for feature cards
      gsap.utils.toArray(".feature-card").forEach((card: any, i: number) => {
        gsap.to(card, {
          y: -20 - (i % 3) * 10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });
      });
    };

    initAnimations();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const faqs = [
    {
      question: "How secure is SecureVault Docs?",
      answer: "We use bank-level AES-256 encryption for all documents at rest and in transit. Your data is stored securely on AWS. AI processing happens securely on our servers, and we never store or train on your document content."
    },
    {
      question: "Can I try before I buy?",
      answer: "Absolutely! All plans include a 6-day free trial with full access to all features. No credit card required to start."
    },
    {
      question: "How does AI-powered OCR work?",
      answer: "Our AI analyzes your documents across 3 core aspects: Classification (identifying document type), Naming (suggesting smart file names), and Organization (recommending the right folder). It extracts text, detects expiration dates, and automatically organizes everything for you."
    },
    {
      question: "What does AI analyze in my documents?",
      answer: "Our AI performs 3 core analyses: Document Classification (identifying the type like invoice, receipt, contract), Smart Naming (suggesting descriptive file names), and Folder Organization (recommending where to store it). It also detects expiration dates for tracking."
    },
    {
      question: "Can my clients upload documents to me?",
      answer: "Yes! With client portals, your clients get their own secure space to upload documents directly to you. Our AI automatically classifies, names, and organizes uploaded files into the right folders. You can also send request links for specific documents."
    },
    {
      question: "What file types are supported?",
      answer: "We support all major file types including PDF, Word, Excel, images (JPG, PNG, HEIC), and more. Files are automatically converted to searchable PDFs when needed."
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes! SecureVault Docs works as a Progressive Web App (PWA) on any device. You can also use our native mobile apps for iOS and Android for camera capture on the go."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 landing-bg font-outfit`} style={{ overflowX: 'hidden' }} suppressHydrationWarning>
      <div className="grain-overlay"></div>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">


        {/* Floating Elements - Original positions in hero */}
        <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Document Icons */}
          <div className={`floating-doc-1 absolute top-[15%] left-[10%] w-16 h-20 rounded-lg shadow-xl flex items-center justify-center opacity-60 glass-card`}>
            <svg className="w-8 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
          </div>
          <div className={`floating-doc-2 absolute top-[25%] right-[15%] w-14 h-18 rounded-lg shadow-xl flex items-center justify-center opacity-50 glass-card`}>
            <svg className="w-7 h-9 text-cyan-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 11h-2v2H9v-2H7v-2h2V9h2v2h2v2z"/>
            </svg>
          </div>
          <div className={`floating-doc-3 absolute bottom-[30%] left-[8%] w-12 h-16 rounded-lg shadow-xl flex items-center justify-center opacity-40 glass-card`}>
            <svg className="w-6 h-8 text-teal-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>

          {/* Floating Shield */}
          <div className="floating-shield absolute bottom-[25%] right-[10%] w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center opacity-70 glass-card border-0">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12 sm:pt-32 sm:pb-20 flex flex-col items-center justify-center text-center">
          <div className="space-y-2 sm:space-y-8 max-w-4xl w-full">


            {/* Headline with rotating text - Responsive sizes */}
            <h1 ref={headlineRef} className={`hero-headline text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-headline leading-[1.0] text-readable-light text-shadow-md`}>
              <span className="block">Capture Once.</span>
              <span className="block mt-1 sm:mt-2">
                Organize{" "}
                <span className="relative inline-block">
                  <span className="transition-all duration-500 font-italic-headline text-teal-400">
                    {rotatingTexts[rotatingText]}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-teal-400 rounded-full"></span>
                </span>
              </span>
            </h1>

            {/* Subheadline - Responsive */}
            <p className={`hero-subheadline text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed px-2 text-readable-muted text-shadow-sm`}>
              Client portals, secure sharing, and OCR that files itself — built for Business and Personal use.
            </p>

            {/* CTA Buttons - Responsive */}
            <div className="hero-cta flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/signup"
                className="group btn-enhanced-primary text-sm sm:text-base inline-flex items-center justify-center"
              >
                Get Started Free
                <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button
                disabled
                className={`btn-enhanced-secondary text-sm sm:text-base cursor-not-allowed relative group inline-flex items-center justify-center opacity-60`}
              >
                Try the Demo
                <span className={`ml-2 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/40`}>Coming Soon</span>
              </button>
            </div>

            {/* Trust Badges - Responsive, stacked on mobile */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-6 pt-1 sm:pt-4">
              <div className={`trust-badge flex items-center gap-2 text-xs sm:text-sm text-slate-100 text-shadow-sm`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className={`trust-badge flex items-center gap-2 text-xs sm:text-sm text-slate-100 text-shadow-sm`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                6-day free trial on all plans
              </div>
              <div className={`trust-badge flex items-center gap-2 text-xs sm:text-sm text-slate-100 text-shadow-sm`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator - Absolute bottom center */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-10">
          <div className="flex flex-col items-center gap-1 sm:gap-2 animate-bounce">
            <span className={`text-[10px] sm:text-xs text-slate-500`}>Scroll to explore</span>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className={`py-12 sm:py-24 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
            <span className={`badge-enhanced mb-3 sm:mb-4`}>Features</span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold font-headline mb-4 sm:mb-6 text-readable-light text-shadow-md`}>Everything you need to manage documents</h2>
            <p className={`text-sm sm:text-lg md:text-xl px-2 text-readable-muted text-shadow-sm`}>Powerful features designed for both personal and business use. Simplify your document workflow today.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Feature 1 - Smart Labels */}
            <div className={`feature-card group p-4 sm:p-8 rounded-2xl transition-all duration-300 text-center sm:text-left relative h-full flex flex-col glass-card-enhanced border-0 hover:scale-105`}>
              <span className={`absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-500/30 text-orange-100 border border-orange-400/40 text-shadow-sm`}>Coming Soon</span>
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-readable-light text-shadow-sm`}>Smart Labels</h3>
              <p className={`text-sm sm:text-base flex-grow text-slate-100 text-shadow-sm`}>Auto-tag documents with AI. Create custom labels and folders to organize everything your way.</p>
            </div>

            {/* Feature 2 - Smart OCR */}
            <div className={`feature-card group p-4 sm:p-8 rounded-2xl transition-all duration-300 text-center sm:text-left h-full flex flex-col glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-readable-light text-shadow-sm`}>Smart OCR</h3>
              <p className={`text-sm sm:text-base flex-grow text-slate-100 text-shadow-sm`}>AI-powered document analysis that extracts text, identifies document types, and suggests smart file names. Our AI analyzes 3 core aspects: classification, naming, and organization.</p>
            </div>

            {/* Feature 3 - Client Portals */}
            <div className={`feature-card group p-4 sm:p-8 rounded-2xl transition-all duration-300 text-center sm:text-left h-full flex flex-col glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-readable-light text-shadow-sm`}>Client Portals</h3>
              <p className={`text-sm sm:text-base flex-grow text-slate-100 text-shadow-sm`}>Dedicated secure spaces powered by AI analysis. Clients upload documents and our AI automatically classifies, names, and organizes files into the right folders.</p>
            </div>

            {/* Feature 4 - Secure Sharing */}
            <div className={`feature-card group p-4 sm:p-8 rounded-2xl transition-all duration-300 text-center sm:text-left h-full flex flex-col glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-readable-light text-shadow-sm`}>Secure Sharing</h3>
              <p className={`text-sm sm:text-base flex-grow text-slate-100 text-shadow-sm`}>Share documents with PIN protection, expiry dates, and download limits. Full control over who sees what.</p>
            </div>

            {/* Feature 5 - Cloud Storage */}
            <div className={`feature-card group p-4 sm:p-8 rounded-2xl transition-all duration-300 text-center sm:text-left h-full flex flex-col glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-readable-light text-shadow-sm`}>Cloud Storage</h3>
              <p className={`text-sm sm:text-base flex-grow text-slate-100 text-shadow-sm`}>Connect Google Drive, OneDrive, and Dropbox. Import files from anywhere and keep everything in sync.</p>
            </div>

            {/* Feature 6 - Bank-Level Security */}
            <div className={`feature-card group p-4 sm:p-8 rounded-2xl transition-all duration-300 text-center sm:text-left h-full flex flex-col glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto sm:mx-0 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-readable-light text-shadow-sm`}>Bank-Level Security</h3>
              <p className={`text-sm sm:text-base flex-grow text-slate-100 text-shadow-sm`}>AES-256 encryption and zero-knowledge architecture. Your documents are always protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className={`py-12 sm:py-24 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
            <span className={`badge-enhanced mb-3 sm:mb-4`}>How It Works</span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold font-headline mb-4 sm:mb-6 text-readable-light text-shadow-md`}>Three steps to document zen</h2>
            <p className={`text-sm sm:text-lg md:text-xl px-2 text-readable-muted text-shadow-sm`}>From chaos to organized in minutes. Here's how SecureVault Docs transforms your workflow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-8 relative mt-6 sm:mt-0">
            {/* Step 1 */}
            <div className={`step-card relative rounded-2xl p-4 sm:p-8 pt-8 sm:pt-8 transition-shadow text-center sm:text-left glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 sm:-top-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-teal-500/30">1</div>
              <div className="sm:pt-6">
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-readable-light text-shadow-sm`}>Capture</h3>
                <p className={`text-sm sm:text-base mb-4 sm:mb-6 text-slate-100 text-shadow-sm`}>Upload from any device — drag & drop, camera capture, email forwarding, or connect your cloud drives.</p>
                <ul className={`space-y-2 text-xs sm:text-sm text-slate-100 text-shadow-sm`}>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-teal-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Drag & drop upload
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-teal-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Mobile camera scan
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-teal-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Email forwarding
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`step-card relative rounded-2xl p-4 sm:p-8 pt-8 sm:pt-8 transition-shadow text-center sm:text-left glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 sm:-top-6 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-teal-400/30">2</div>
              <div className="sm:pt-6">
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-readable-light text-shadow-sm`}>Organize</h3>
                <p className={`text-sm sm:text-base mb-4 sm:mb-6 text-slate-100 text-shadow-sm`}>Our smart OCR extracts data automatically. Documents are tagged, labeled, and filed without lifting a finger.</p>
                <ul className={`space-y-2 text-xs sm:text-sm text-slate-100 text-shadow-sm`}>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-cyan-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    AI-powered OCR
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-cyan-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Expiration Warning
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-cyan-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Smart folders
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`step-card relative rounded-2xl p-4 sm:p-8 pt-8 sm:pt-8 transition-shadow text-center sm:text-left glass-card-enhanced border-0 hover:scale-105`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 sm:-top-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-teal-500/30">3</div>
              <div className="sm:pt-6">
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-readable-light text-shadow-sm`}>Access</h3>
                <p className={`text-sm sm:text-base mb-4 sm:mb-6 text-slate-100 text-shadow-sm`}>Find any file in seconds. Share securely with clients or team members with granular permissions.</p>
                <ul className={`space-y-2 text-xs sm:text-sm text-slate-100 text-shadow-sm`}>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-teal-bright flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Smart search
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-teal-bright flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Client portals
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 text-teal-bright flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Secure sharing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Teams Section */}
      <section ref={testimonialsRef} className={`py-16 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`badge-enhanced mb-3`}>Trusted by Teams Worldwide</span>
            <h2 className={`text-3xl md:text-4xl font-bold font-headline mb-4 text-readable-light text-shadow-md`}>
              Share Confidential Documents with Confidence
            </h2>
            <p className={`text-lg text-readable-muted text-shadow-sm`}>
              From legal contracts to financial reports, teams trust SecureVault Docs to protect what matters most.
            </p>
          </div>

          {/* Main Content: Asymmetric 2-Column Layout */}
          <div className="grid md:grid-cols-5 gap-6 mb-10">

            {/* Left Column: Use Cases & Benefits (60% width - 3 cols) */}
            <div className="md:col-span-3 glass-card-enhanced p-6 rounded-3xl">
              <h3 className={`text-xl font-bold text-readable-light text-shadow-sm mb-4`}>
                Built for Sensitive Work
              </h3>

              <div className="space-y-4">
                {/* Use Case 1: Legal Teams */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Legal & Compliance Teams</h4>
                    <p className="text-slate-200 text-sm">Share contracts, NDAs, and case files with clients securely. Control who sees what, and revoke access instantly.</p>
                  </div>
                </div>

                {/* Use Case 2: Finance */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Financial Services</h4>
                    <p className="text-slate-200 text-sm">Protect financial statements, audit reports, and investor documents with bank-level encryption and compliance standards.</p>
                  </div>
                </div>

                {/* Use Case 3: Healthcare */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Healthcare & Research</h4>
                    <p className="text-slate-200 text-sm">HIPAA-compliant document sharing for patient records, research data, and medical reports with complete audit trails.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <Link href="/security" className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-2 transition">
                  Learn About Our Security
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column: Key Benefits (40% width - 2 cols) */}
            <div className="md:col-span-2 space-y-4">

              {/* Benefit 1: Easy Sharing */}
              <div className="glass-card-enhanced p-4 rounded-2xl">
                <div className="w-10 h-10 mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1 text-sm">Share in Seconds</h4>
                <p className="text-xs text-slate-300">Generate secure links with PIN protection. No downloads required.</p>
              </div>

              {/* Benefit 2: Full Control */}
              <div className="glass-card-enhanced p-4 rounded-2xl">
                <div className="w-10 h-10 mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1 text-sm">Stay in Control</h4>
                <p className="text-xs text-slate-300">Set expiration dates, watermarks, and permissions. Revoke access anytime.</p>
              </div>

              {/* Benefit 3: Compliance */}
              <div className="glass-card-enhanced p-4 rounded-2xl">
                <div className="w-10 h-10 mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1 text-sm">Enterprise-Ready</h4>
                <p className="text-xs text-slate-300">SOC 2, GDPR, and HIPAA compliant. Built for strict security requirements.</p>
              </div>
            </div>
          </div>

          {/* Bottom: 4-Column Key Features Grid */}
          <div className="grid md:grid-cols-4 gap-4">

            {/* Feature 1: Quick Setup */}
            <div className="security-feature-card glass-card-enhanced p-4 rounded-2xl text-center hover:border-teal-500/40 transition-all duration-300 border border-transparent">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">Setup in Minutes</h4>
              <p className="text-xs text-slate-300">Start sharing securely in under 5 minutes.</p>
            </div>

            {/* Feature 2: Track Everything */}
            <div className="security-feature-card glass-card-enhanced p-4 rounded-2xl text-center hover:border-teal-500/40 transition-all duration-300 border border-transparent">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">Know Who's Viewing</h4>
              <p className="text-xs text-slate-300">See exactly who accessed your documents and when.</p>
            </div>

            {/* Feature 3: Team Collaboration */}
            <div className="security-feature-card glass-card-enhanced p-4 rounded-2xl text-center hover:border-teal-500/40 transition-all duration-300 border border-transparent">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">Built for Teams</h4>
              <p className="text-xs text-slate-300">Manage team access and collaborate securely.</p>
            </div>

            {/* Feature 4: Always Available */}
            <div className="security-feature-card glass-card-enhanced p-4 rounded-2xl text-center hover:border-teal-500/40 transition-all duration-300 border border-transparent">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">99.9% Uptime</h4>
              <p className="text-xs text-slate-300">Your documents are always accessible.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className={`py-24 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className={`badge-enhanced mb-4`}>Pricing</span>
            <h2 className={`text-4xl md:text-5xl font-bold font-headline mb-6 text-readable-light text-shadow-md`}>Simple, transparent pricing</h2>
            <p className={`text-xl text-readable-muted text-shadow-sm`}>Choose the plan that fits your needs. All plans include a 6-day free trial.</p>
          </div>

          {/* Plan Tier & Billing Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
            {/* Plan Tier Toggle */}
            <div className={`inline-flex rounded-2xl p-1.5 glass-card-enhanced`}>
              <button
                onClick={() => setPlanTier('personal')}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  planTier === 'personal'
                    ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/30'
                    : 'text-slate-100 hover:text-white hover:bg-white/10'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setPlanTier('business')}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  planTier === 'business'
                    ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/30'
                    : 'text-slate-100 hover:text-white hover:bg-white/10'
                }`}
              >
                Business
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none bg-gradient-to-r from-teal-bright to-cyan-teal"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                    billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                Yearly
                <span className={`px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-400`}>
                  Save 15%
                </span>
              </span>
            </div>
          </div>

          {planTier === 'personal' ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 transition-shadow pricing-card-enhanced border-0 hover:scale-105`}>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Starter</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>Personal vault for individuals</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>${billingCycle === 'monthly' ? '9.99' : '101.90'}</span>
                    <span className={'text-slate-200'}>/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  {billingCycle === 'monthly' && <p className={`text-sm text-slate-300`}>or $101.90/year (save 15%)</p>}
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>1 user (personal vault)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>10 GB storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>200 OCR pages / month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>5 secure share links</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Email support</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className={`btn-enhanced-secondary block w-full text-center px-6 py-3 rounded-xl`}
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Growth Plan - Featured */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 shadow-xl relative scale-105 pricing-card-enhanced pricing-card-featured`}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                  MOST POPULAR
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Growth</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>For growing personal needs</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>${billingCycle === 'monthly' ? '14.99' : '152.90'}</span>
                    <span className={'text-slate-200'}>/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  {billingCycle === 'monthly' && <p className={`text-sm text-slate-300`}>or $152.90/year (save 15%)</p>}
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>50 GB storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>600 OCR pages / month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Unlimited share links</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Cloud drive import</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="btn-enhanced-primary block w-full text-center px-6 py-3 rounded-xl"
                >
                  Unlock Growth Features
                </Link>
              </div>

              {/* Pro Plan */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 hover:shadow-xl transition-shadow pricing-card-enhanced border-0`}>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Pro</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>For professionals & teams</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>${billingCycle === 'monthly' ? '24.99' : '254.90'}</span>
                    <span className={'text-slate-200'}>/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  {billingCycle === 'monthly' && <p className={`text-sm text-slate-300`}>or $254.90/year (save 15%)</p>}
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Everything in Growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Up to 3 team seats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>200 GB storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>2,000 OCR pages / month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className={`btn-enhanced-secondary block w-full text-center px-6 py-3 rounded-xl`}
                >
                  Unlock Pro Access
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* Business Starter Plan */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 transition-shadow pricing-card-enhanced border-0 hover:scale-105`}>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Business Starter</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>For small teams (1-3 seats)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>${billingCycle === 'monthly' ? '59.99' : '611.90'}</span>
                    <span className={'text-slate-200'}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {billingCycle === 'monthly' && <p className={`text-sm text-slate-300`}>or $50/seat/year (save 10%)</p>}
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>1-3 seats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>300 GB shared storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>6,750 PU/seat/mo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Client portals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className={`btn-enhanced-secondary block w-full text-center px-6 py-3 rounded-xl`}
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Business Growth Plan - Featured */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 shadow-xl relative scale-105 pricing-card-enhanced pricing-card-featured`}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                  MOST POPULAR
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Business Growth</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>For growing teams (3-10 seats)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>${billingCycle === 'monthly' ? '109.99' : '1,121.90'}</span>
                    <span className={'text-slate-200'}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {billingCycle === 'monthly' && <p className={`text-sm text-slate-300`}>or $187.89/seat/year (save 15%)</p>}
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>3-10 seats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>500 GB shared storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>19,500 PU/seat/mo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Custom branding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Priority support</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="btn-enhanced-primary block w-full text-center px-6 py-3 rounded-xl"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Business Pro Plan */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 transition-shadow pricing-card-enhanced border-0 hover:scale-105`}>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Business Pro</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>For larger teams (10-20 seats)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>${billingCycle === 'monthly' ? '219.99' : '2,243.90'}</span>
                    <span className={'text-slate-200'}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {billingCycle === 'monthly' && <p className={`text-sm text-slate-300`}>or $2,243.80/year (save 15%)</p>}
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>10-20 seats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>1 TB shared storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>36,000 PU/seat/mo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>SSO integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Dedicated support</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className={`btn-enhanced-secondary block w-full text-center px-6 py-3 rounded-xl`}
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Enterprise Plan */}
              <div className={`pricing-card rounded-2xl p-8 space-y-6 transition-shadow pricing-card-enhanced border-0 hover:scale-105`}>
                <div>
                  <h3 className={`text-2xl font-bold text-readable-light`}>Enterprise</h3>
                  <p className={`text-sm mt-1 text-slate-200`}>For large organizations (20+ )</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold text-readable-light`}>Custom</span>
                  </div>
                  <p className={`text-sm text-slate-300`}>Contact us for pricing</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>20+ seats</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Custom storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Custom PU limits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>SSO & SAML</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-bright mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className={'text-slate-100'}>Account manager</span>
                  </li>
                </ul>
                <Link
                  href="/contact-sales"
                  className={`btn-enhanced-secondary block w-full text-center px-6 py-3 rounded-xl`}
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          )}

          <p className={`text-center text-sm mt-12 text-slate-200 text-shadow-sm`}>
            All plans include a 6-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className={`py-24 transition-colors duration-500`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className={`badge-enhanced mb-4`}>FAQ</span>
            <h2 className={`text-4xl md:text-5xl font-bold font-headline mb-6 text-readable-light text-shadow-md`}>Frequently asked questions</h2>
            <p className={`text-xl text-readable-muted text-shadow-sm`}>Everything you need to know about SecureVault Docs.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item rounded-xl overflow-hidden glass-card-enhanced border-0`}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between transition hover:bg-white/5`}
                >
                  <span className={`font-semibold text-readable-light`}>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform text-slate-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`px-6 overflow-hidden transition-all ${openFaq === index ? `py-5 border-t border-slate-700/50` : 'max-h-0'}`}>
                  <p className={'text-slate-100 text-shadow-sm'}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className={`py-24 bg-gradient-to-br from-teal-900/50 via-cyan-900/50 to-teal-950/80 backdrop-blur-sm border-t border-slate-800`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="cta-section space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-readable-light text-shadow-md">Ready to get started?</h2>
            <p className={`text-xl max-w-2xl mx-auto text-readable-muted text-shadow-sm`}>
              Join thousands of businesses and individuals who trust SecureVault Docs for their document management needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/signup"
                className={`btn-enhanced-primary px-8 py-4 rounded-xl font-semibold transition shadow-lg`}
              >
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="btn-enhanced-secondary px-8 py-4 rounded-xl font-semibold"
              >
                View All Plans
              </Link>
            </div>
            <p className={`text-sm text-slate-200 text-shadow-sm`}>No credit card required. 6-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
