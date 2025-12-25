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
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

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
    <div className="min-h-screen bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-green-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce"></div>
      </div>

      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Main Message */}
            <div className="text-white animate-in slide-in-from-left duration-1000 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-emerald-400 font-semibold text-lg">SecureVault Docs</span>
              </div>
              
              <h1 className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent" style={{fontSize: "clamp(2.5rem, 5vw, 4.5rem)"}}>
                Your Documents Deserve
                <br />
                <span className="text-emerald-400">Robust Protection.</span>
              </h1>
              
              <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{fontSize: "clamp(1rem, 2vw, 1.25rem)"}}>
                Keep your most important documents safe with military-grade security that's so simple, your team will actually use it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in slide-in-from-left duration-1000 delay-300">
                <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105">
                  <Link href="/apps/securevault-docs" className="flex items-center">
                    <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Try SecureVault Docs
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl hover:scale-105">
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 animate-in slide-in-from-left duration-1000 delay-500">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  Bank-grade security
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" style={{animationDelay: "0.5s"}}></div>
                  Easy to use
                </div>
              </div>
            </div>
            
            {/* Right Content - Document Security Animation */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-200">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Prominent Square Animation Container */}
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  
                  {/* Central Document with Floating Animation */}
                  <div className="relative z-10">
                    <div className="w-24 h-32 bg-white/90 rounded-lg shadow-2xl transform transition-all duration-3000 ease-in-out animate-float">
                      <div className="p-3">
                        <div className="w-full h-2 bg-emerald-500 rounded mb-2"></div>
                        <div className="w-3/4 h-1 bg-gray-400 rounded mb-1"></div>
                        <div className="w-1/2 h-1 bg-gray-300 rounded mb-2"></div>
                        <div className="w-full h-1 bg-gray-400 rounded mb-1"></div>
                        <div className="w-2/3 h-1 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Encryption Effects */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Shimmering Locks */}
                    <div className="absolute top-8 left-8 w-6 h-6 bg-emerald-400/80 rounded animate-pulse animate-spin-slow">
                      <LockClosedIcon className="w-4 h-4 text-white m-1" />
                    </div>
                    <div className="absolute top-16 right-12 w-5 h-5 bg-blue-400/80 rounded animate-pulse animate-spin-slow" style={{animationDelay: "0.5s"}}>
                      <LockClosedIcon className="w-3 h-3 text-white m-1" />
                    </div>
                    <div className="absolute bottom-12 left-12 w-4 h-4 bg-purple-400/80 rounded animate-pulse animate-spin-slow" style={{animationDelay: "1s"}}>
                      <LockClosedIcon className="w-2 h-2 text-white m-1" />
                    </div>
                    
                    {/* Digital Shield Overlays */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-500/60 rounded-full animate-ping">
                      <ShieldCheckIcon className="w-4 h-4 text-white m-2" />
                    </div>
                    <div className="absolute bottom-4 right-8 w-6 h-6 bg-blue-500/60 rounded-full animate-ping" style={{animationDelay: "0.3s"}}>
                      <ShieldCheckIcon className="w-3 h-3 text-white m-1.5" />
                    </div>
                    
                    {/* Glowing Encrypted Code Lines */}
                    <div className="absolute top-1/4 left-4 w-16 h-1 bg-gradient-to-r from-emerald-400 to-transparent opacity-60 animate-pulse"></div>
                    <div className="absolute top-1/3 right-4 w-12 h-1 bg-gradient-to-l from-blue-400 to-transparent opacity-60 animate-pulse" style={{animationDelay: "0.2s"}}></div>
                    <div className="absolute bottom-1/4 left-6 w-14 h-1 bg-gradient-to-r from-purple-400 to-transparent opacity-60 animate-pulse" style={{animationDelay: "0.4s"}}></div>
                    <div className="absolute bottom-1/3 right-6 w-10 h-1 bg-gradient-to-l from-emerald-400 to-transparent opacity-60 animate-pulse" style={{animationDelay: "0.6s"}}></div>
                    
                    {/* Shielded Data Particles */}
                    <div className="absolute top-1/2 left-2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-80"></div>
                    <div className="absolute top-1/2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-80" style={{animationDelay: "0.2s"}}></div>
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-80" style={{animationDelay: "0.4s"}}></div>
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce opacity-80" style={{animationDelay: "0.6s"}}></div>
                    
                    {/* Rotating Security Rings */}
                    <div className="absolute inset-4 border-2 border-emerald-400/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-8 border border-blue-400/20 rounded-full animate-spin-reverse" style={{animationDelay: "1s"}}></div>
                    
                    {/* Active Protection Indicators */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: "0.1s"}}></div>
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Animation Description */}
                <div className="mt-6 text-center">
                  <p className="text-white/80 text-sm font-medium">Active Document Protection</p>
                  <p className="text-white/60 text-xs mt-1">Real-time encryption & security monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-xs text-white/80 mt-2 text-center">Scroll to explore</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Your Documents Need SecureVault
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple security that actually works. No complicated setup, no confusing features.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Feature Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Feature Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-medium">Trusted by businesses that value their data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section - Dark Glass Theme */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Keep Documents Safe
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We've thought of everything so you don't have to. Here's how SecureVault makes document security simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className={`bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#47BD79]/20 rounded-xl flex items-center justify-center mr-4">
                    {index === 0 && <DocumentTextIcon className="w-6 h-6 text-[#47BD79]" />}
                    {index === 1 && <ShieldCheckIcon className="w-6 h-6 text-[#47BD79]" />}
                    {index === 2 && <UserGroupIcon className="w-6 h-6 text-[#47BD79]" />}
                    {index === 3 && <CogIcon className="w-6 h-6 text-[#47BD79]" />}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {capability.category}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {capability.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#47BD79]/20 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#47BD79]/30 transition-colors">
                        <CheckIcon className="h-4 w-4 text-[#47BD79]" />
                      </div>
                      <span className="text-white/70 group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works - Simple Steps */}
          <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">How SecureVault Works</h3>
              <p className="text-white/70">Three simple steps to secure your documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#47BD79] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-[0_0_20px_rgba(71,189,121,0.4)]">
                  1
                </div>
                <h4 className="font-semibold text-white mb-2">Upload Your Documents</h4>
                <p className="text-white/60 text-sm">Drag and drop your files. We'll organize them automatically.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#47BD79] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-[0_0_20px_rgba(71,189,121,0.4)]">
                  2
                </div>
                <h4 className="font-semibold text-white mb-2">We Secure Everything</h4>
                <p className="text-white/60 text-sm">Military-grade encryption keeps your documents safe from prying eyes.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#47BD79] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-[0_0_20px_rgba(71,189,121,0.4)]">
                  3
                </div>
                <h4 className="font-semibold text-white mb-2">Share When Needed</h4>
                <p className="text-white/60 text-sm">Give access to the right people, when they need it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Dark Glass Theme */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perfect for Every Business
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              No matter what industry you're in, your documents need protection. Here's how different businesses use SecureVault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
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
                  <div className="w-full h-1 bg-gradient-to-r from-[#47BD79] to-blue-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Industry Stats */}
          <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Trusted Across Industries</h3>
              <p className="text-white/70">See how different businesses protect their documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#47BD79] mb-2">500+</div>
                <div className="text-white/70">Businesses Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
                <div className="text-white/70">Documents Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-white/70">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Section - Dark Glass Theme */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security That Actually Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just talk about security - we build it into everything. Here's how we keep your documents safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((security, index) => (
              <div 
                key={index} 
                className={`bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {security.feature}
                  </h3>
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full text-sm font-medium">
                    {security.level}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {security.description}
                </p>
                
                {/* Security Level Indicator */}
                <div className="mt-6 flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${
                          i < 4 ? 'bg-emerald-400' : 'bg-gray-400'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-400">Security Level</span>
                </div>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Bank-Grade Security</div>
                <div className="text-gray-300 text-sm">Your documents are as safe as money in a vault</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Dark Glass Theme */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple Pricing That Makes Sense
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              No hidden fees, no complicated tiers. Just honest pricing for document security that works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-600 ease-premium-out transform hover:-translate-y-2 ${
                  plan.popular ? 'border-[#47BD79]/50 shadow-[0_0_30px_rgba(71,189,121,0.2)]' : 'border-white/10 hover:border-[#47BD79]/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#47BD79] text-white px-6 py-2 rounded-full text-sm font-medium shadow-[0_0_20px_rgba(71,189,121,0.4)]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#47BD79] mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-white/50">/{plan.period}</span>
                  </div>
                  <p className="text-white/70 mb-2 font-medium">{plan.storage} Storage</p>
                  <p className="text-white/60">{plan.users}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#47BD79]/20 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#47BD79]/30 transition-colors">
                        <CheckIcon className="h-4 w-4 text-[#47BD79]" />
                      </div>
                      <span className="text-white/70 group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#47BD79] hover:bg-[#3da86a] text-white shadow-[0_0_20px_rgba(71,189,121,0.4)]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  } transition-all duration-600 ease-premium-out transform hover:scale-105`}
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-[#47BD79]/30">
              <div className="w-8 h-8 bg-[#47BD79] rounded-full flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(71,189,121,0.4)]">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-medium">Ready to secure your documents?</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Documents Deserve
            <br />
            <span className="text-emerald-400">Robust Protection</span>
          </h2>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stop worrying about document security. Start with a free demo and see how easy it is to keep your most important files safe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105">
              <Link href="/apps/securevault-docs" className="flex items-center">
                <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Try Free Demo
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl hover:scale-105">
              <Link href="/contact">Contact Security Team</Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              No setup fees
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" style={{animationDelay: "0.5s"}}></div>
              Cancel anytime
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" style={{animationDelay: "1s"}}></div>
              Canadian data residency
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
