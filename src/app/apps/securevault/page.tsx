"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  CheckIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  LockClosedIcon,
  CloudIcon,
  EyeIcon,
  ShareIcon,
  ClockIcon,
  UserGroupIcon,
  CogIcon,
  BoltIcon,
  ArchiveBoxIcon,
  SparklesIcon,
  RocketLaunchIcon,
  PlayIcon,
  StarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

// Theme Colors
const THEME = {
  primary: "#24a7b8",      // Teal
  primaryDark: "#1e8a99",  // Darker teal for hover
  primaryLight: "#2fc4d7", // Lighter teal
  bgDark: "#0f172a",       // Dark background
  bgMid: "#1b273a",        // Mid dark
  bgLight: "#243447",      // Lighter dark
  accent: "#24a7b8",       // Same as primary
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.7)",
  textDim: "rgba(255,255,255,0.5)",
};

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Bank-Grade Security",
    description: "End-to-end encryption, secure data centers, and compliance with industry standards including SOC 2, GDPR, and HIPAA."
  },
  {
    icon: DocumentTextIcon,
    title: "Universal Document Support",
    description: "Support for all file types including PDFs, images, videos, and office documents with intelligent categorization."
  },
  {
    icon: LockClosedIcon,
    title: "Access Control",
    description: "Granular permissions, role-based access, and audit trails to ensure only authorized users can access sensitive documents."
  },
  {
    icon: CloudIcon,
    title: "Cloud-Native Storage",
    description: "Scalable cloud infrastructure with automatic backups, version control, and global content delivery."
  },
  {
    icon: EyeIcon,
    title: "Document Analytics",
    description: "Track document views, downloads, and interactions with detailed analytics and reporting capabilities."
  },
  {
    icon: ShareIcon,
    title: "Secure Sharing",
    description: "Generate secure links with expiration dates, password protection, and download limits for external sharing."
  }
]

const capabilities = [
  {
    category: "Document Management",
    items: [
      "Drag-and-drop file uploads",
      "Automatic file categorization",
      "Version control and history",
      "Bulk operations and batch processing",
      "Advanced search and filtering",
      "Metadata extraction and tagging"
    ]
  },
  {
    category: "Security & Compliance",
    items: [
      "End-to-end encryption at rest and in transit",
      "Multi-factor authentication",
      "Role-based access control",
      "Audit logs and compliance reporting",
      "Data loss prevention",
      "Automated backup and recovery"
    ]
  },
  {
    category: "Collaboration",
    items: [
      "Real-time document collaboration",
      "Comment and annotation tools",
      "Approval workflows",
      "Team workspaces",
      "External sharing controls",
      "Integration with communication tools"
    ]
  },
  {
    category: "Integration & Automation",
    items: [
      "API access for custom integrations",
      "Webhook notifications",
      "Automated document processing",
      "OCR and text extraction",
      "E-signature integration",
      "Third-party app connections"
    ]
  }
]

const useCases = [
  {
    title: "Legal Document Management",
    description: "Secure storage and management of contracts, case files, and sensitive legal documents with strict access controls.",
    icon: "⚖️"
  },
  {
    title: "Healthcare Records",
    description: "HIPAA-compliant storage of patient records, medical images, and healthcare documentation.",
    icon: "🏥"
  },
  {
    title: "Financial Documents",
    description: "Secure handling of financial statements, tax documents, and sensitive financial information.",
    icon: "💰"
  },
  {
    title: "Real Estate Files",
    description: "Property documents, contracts, and client files with secure sharing capabilities.",
    icon: "🏠"
  },
  {
    title: "HR Documentation",
    description: "Employee records, policies, and confidential HR documents with role-based access.",
    icon: "👥"
  },
  {
    title: "Research & Development",
    description: "Intellectual property, research data, and confidential project documents.",
    icon: "🔬"
  }
]

const securityFeatures = [
  {
    feature: "Encryption",
    description: "AES-256 encryption for data at rest and TLS 1.3 for data in transit",
    level: "Military Grade"
  },
  {
    feature: "Access Control",
    description: "Multi-factor authentication, single sign-on, and granular permissions",
    level: "Enterprise"
  },
  {
    feature: "Compliance",
    description: "PIPEDA and industry-specific compliance frameworks seamlessly integrated into our solutions.",
    level: "Certified"
  },
  {
    feature: "Monitoring",
    description: "24/7 security monitoring, intrusion detection, and automated threat response",
    level: "Advanced"
  }
]

const pricing = [
  {
    name: "Starter",
    price: "$19",
    period: "per month",
    storage: "100 GB",
    users: "Up to 5 users",
    features: [
      "Basic document storage",
      "Standard security features",
      "Email support",
      "Mobile app access",
      "Basic sharing controls"
    ]
  },
  {
    name: "Professional",
    price: "$49",
    period: "per month",
    storage: "1 TB",
    users: "Up to 25 users",
    features: [
      "Advanced security features",
      "Workflow automation",
      "API access",
      "Priority support",
      "Advanced analytics",
      "Custom integrations"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    storage: "Unlimited",
    users: "Unlimited users",
    features: [
      "Custom security policies",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom training",
      "On-premise deployment",
      "Advanced compliance tools"
    ]
  }
]

export default function SecureVaultPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    security: 0,
    documents: 0,
    compliance: 0,
    uptime: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateStat = (target: number, key: keyof typeof animatedStats, duration: number) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      animateStat(99, 'security', 2000);
      animateStat(1000, 'documents', 2500);
      animateStat(100, 'compliance', 3000);
      animateStat(99, 'uptime', 3500);
    }
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero Section - SVD Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1b273a] to-[#0f172a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#24a7b8]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#24a7b8]/15 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{animationDelay: "1s"}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#24a7b8]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

          {/* Floating document icons */}
          <div className="absolute top-20 left-[10%] opacity-20 animate-float">
            <DocumentTextIcon className="w-16 h-16 text-[#24a7b8]" />
          </div>
          <div className="absolute top-40 right-[15%] opacity-15 animate-float" style={{animationDelay: "0.5s"}}>
            <LockClosedIcon className="w-12 h-12 text-[#24a7b8]" />
          </div>
          <div className="absolute bottom-40 left-[20%] opacity-20 animate-float" style={{animationDelay: "1s"}}>
            <ShieldCheckIcon className="w-14 h-14 text-[#24a7b8]" />
          </div>
          <div className="absolute bottom-32 right-[25%] opacity-15 animate-float" style={{animationDelay: "1.5s"}}>
            <DocumentDuplicateIcon className="w-10 h-10 text-[#24a7b8]" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#24a7b8]/20 border border-[#24a7b8]/40 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#24a7b8] rounded-full mr-2 animate-pulse"></div>
              <span className="text-[#24a7b8] font-medium text-sm">AI Powered That Understands Your Files</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Capture Once.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24a7b8] to-[#2fc4d7]">
                Organize Securely.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              Client portals, secure sharing, and OCR that files itself —
              <br className="hidden md:block" />
              built for Business and Personal use.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                asChild
                size="lg"
                className="bg-[#24a7b8] hover:bg-[#1e8a99] text-white font-semibold rounded-xl px-8 py-6 text-lg transition-all duration-300 shadow-lg shadow-[#24a7b8]/30 hover:shadow-xl hover:shadow-[#24a7b8]/40 hover:scale-105"
              >
                <Link href="/signup" className="flex items-center">
                  Get Started Free
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-[#1b273a]/80 backdrop-blur-sm text-white font-semibold rounded-xl px-8 py-6 text-lg border border-white/20 hover:bg-[#243447] hover:border-white/30 transition-all duration-300"
              >
                <Link href="/apps/securevault-docs" className="flex items-center">
                  Try the Demo
                  <span className="ml-2 px-2 py-0.5 bg-[#24a7b8]/30 text-[#24a7b8] text-xs rounded-full">Coming Soon</span>
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-[#24a7b8] mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-[#24a7b8] mr-2" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-[#24a7b8] mr-2" />
                Cancel anytime
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 flex flex-col items-center text-white/50">
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#24a7b8] rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why People Struggle Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why People Struggle Today
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Struggle 1 */}
            <div className="bg-[#1b273a] rounded-2xl p-8 border border-white/10 hover:border-[#24a7b8]/30 transition-all duration-300">
              <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
                <ArchiveBoxIcon className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Endless chasing</h3>
              <p className="text-white/60">Files scattered in email, text, and random drives.</p>
            </div>

            {/* Struggle 2 */}
            <div className="bg-[#1b273a] rounded-2xl p-8 border border-white/10 hover:border-[#24a7b8]/30 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                <ClockIcon className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Missed items</h3>
              <p className="text-white/60">No clear checklist for clients; back-and-forth slows projects.</p>
            </div>

            {/* Struggle 3 */}
            <div className="bg-[#1b273a] rounded-2xl p-8 border border-white/10 hover:border-[#24a7b8]/30 transition-all duration-300">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                <EyeIcon className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Security risks</h3>
              <p className="text-white/60">Sensitive files sent over unsecured channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#0f172a] via-[#1b273a] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Your Documents Need SecureVault
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Simple security that actually works. No complicated setup, no confusing features.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-[#1b273a] rounded-2xl p-6 border border-white/10 hover:border-[#24a7b8]/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Feature Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-[#24a7b8]/20 rounded-xl mx-auto mb-4 group-hover:bg-[#24a7b8]/30 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-[#24a7b8]" />
                </div>

                {/* Feature Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#24a7b8] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-[#1b273a] border border-[#24a7b8]/30 rounded-full">
              <div className="w-2 h-2 bg-[#24a7b8] rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-medium">Trusted by businesses that value their data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Keep Documents Safe
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We've thought of everything so you don't have to. Here's how SecureVault makes document security simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className={`bg-[#1b273a] rounded-2xl p-8 border border-white/10 hover:border-[#24a7b8]/30 transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#24a7b8]/20 rounded-xl flex items-center justify-center mr-4">
                    {index === 0 && <DocumentTextIcon className="w-6 h-6 text-[#24a7b8]" />}
                    {index === 1 && <ShieldCheckIcon className="w-6 h-6 text-[#24a7b8]" />}
                    {index === 2 && <UserGroupIcon className="w-6 h-6 text-[#24a7b8]" />}
                    {index === 3 && <CogIcon className="w-6 h-6 text-[#24a7b8]" />}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {capability.category}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {capability.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#24a7b8]/20 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#24a7b8]/30 transition-colors">
                        <CheckIcon className="h-4 w-4 text-[#24a7b8]" />
                      </div>
                      <span className="text-white/60 group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mt-16 bg-[#1b273a] rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">How SecureVault Works</h3>
              <p className="text-white/60">Three simple steps to secure your documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#24a7b8] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg shadow-[#24a7b8]/30">
                  1
                </div>
                <h4 className="font-semibold text-white mb-2">Upload Your Documents</h4>
                <p className="text-white/60 text-sm">Drag and drop your files. We'll organize them automatically.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#24a7b8] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg shadow-[#24a7b8]/30">
                  2
                </div>
                <h4 className="font-semibold text-white mb-2">We Secure Everything</h4>
                <p className="text-white/60 text-sm">Military-grade encryption keeps your documents safe from prying eyes.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#24a7b8] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg shadow-[#24a7b8]/30">
                  3
                </div>
                <h4 className="font-semibold text-white mb-2">Share When Needed</h4>
                <p className="text-white/60 text-sm">Give access to the right people, when they need it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-[#0f172a] via-[#1b273a] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perfect for Every Business
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              No matter what industry you're in, your documents need protection. Here's how different businesses use SecureVault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`group bg-[#1b273a] rounded-2xl p-8 text-center border border-white/10 hover:border-[#24a7b8]/30 transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {useCase.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-[#24a7b8] to-[#2fc4d7] rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Industry Stats */}
          <div className="mt-16 bg-[#1b273a] rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Trusted Across Industries</h3>
              <p className="text-white/60">See how different businesses protect their documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#24a7b8] mb-2">500+</div>
                <div className="text-white/60">Businesses Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#24a7b8] mb-2">1M+</div>
                <div className="text-white/60">Documents Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#24a7b8] mb-2">99.9%</div>
                <div className="text-white/60">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security That Actually Works
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              We don't just talk about security - we build it into everything. Here's how we keep your documents safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((security, index) => (
              <div
                key={index}
                className={`bg-[#1b273a] rounded-2xl p-8 border border-white/10 hover:border-[#24a7b8]/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {security.feature}
                  </h3>
                  <span className="px-4 py-2 bg-[#24a7b8] text-white rounded-full text-sm font-medium">
                    {security.level}
                  </span>
                </div>
                <p className="text-white/60 leading-relaxed">
                  {security.description}
                </p>

                {/* Security Level Indicator */}
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 4 ? 'bg-[#24a7b8]' : 'bg-white/20'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-white/40">Security Level</span>
                </div>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-[#1b273a] border border-[#24a7b8]/30 rounded-2xl">
              <div className="w-8 h-8 bg-[#24a7b8] rounded-full flex items-center justify-center mr-4">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Bank-Grade Security</div>
                <div className="text-white/60 text-sm">Your documents are as safe as money in a vault</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-[#0f172a] via-[#1b273a] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple Pricing That Makes Sense
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              No hidden fees, no complicated tiers. Just honest pricing for document security that works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-[#1b273a] rounded-2xl p-8 border transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'border-[#24a7b8] shadow-lg shadow-[#24a7b8]/20' : 'border-white/10 hover:border-[#24a7b8]/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#24a7b8] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg shadow-[#24a7b8]/30">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#24a7b8] mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-white/50">/{plan.period}</span>
                  </div>
                  <p className="text-white/70 mb-2 font-medium">{plan.storage} Storage</p>
                  <p className="text-white/60">{plan.users}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#24a7b8]/20 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#24a7b8]/30 transition-colors">
                        <CheckIcon className="h-4 w-4 text-[#24a7b8]" />
                      </div>
                      <span className="text-white/60 group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#24a7b8] hover:bg-[#1e8a99] text-white shadow-lg shadow-[#24a7b8]/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  } transition-all duration-300 transform hover:scale-105`}
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-[#1b273a] rounded-2xl border border-[#24a7b8]/30">
              <div className="w-8 h-8 bg-[#24a7b8] rounded-full flex items-center justify-center mr-4 shadow-lg shadow-[#24a7b8]/30">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">7-Day Free Trial</div>
                <div className="text-white/60 text-sm">Try SecureVault risk-free for 7 days—no commitment required.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#1b273a] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#24a7b8]/20 border border-[#24a7b8]/40 rounded-full mb-8">
              <div className="w-2 h-2 bg-[#24a7b8] rounded-full mr-2 animate-pulse"></div>
              <span className="text-[#24a7b8] font-medium text-sm">Ready to secure your documents?</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Documents Deserve
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24a7b8] to-[#2fc4d7]">
                Robust Protection
              </span>
            </h2>

            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Stop worrying about document security. Start with a free demo and see how easy it is to keep your most important files safe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                asChild
                size="lg"
                className="bg-[#24a7b8] hover:bg-[#1e8a99] text-white font-semibold rounded-xl px-8 py-6 text-lg transition-all duration-300 shadow-lg shadow-[#24a7b8]/30 hover:shadow-xl hover:shadow-[#24a7b8]/40 hover:scale-105"
              >
                <Link href="/apps/securevault-docs" className="flex items-center">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Try Free Demo
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-[#1b273a]/80 backdrop-blur-sm text-white font-semibold rounded-xl px-8 py-6 text-lg border border-white/20 hover:bg-[#243447] hover:border-white/30 transition-all duration-300"
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-[#24a7b8] mr-2" />
                No setup fees
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-[#24a7b8] mr-2" />
                Cancel anytime
              </div>
              <div className="flex items-center">
                <CheckIcon className="w-5 h-5 text-[#24a7b8] mr-2" />
                Canadian data residency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
