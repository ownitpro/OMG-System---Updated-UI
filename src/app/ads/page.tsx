"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function AdLandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "OMGsystems transformed our property management operations. We've saved 20+ hours per week and increased tenant satisfaction by 40%.",
      author: "Sarah Johnson",
      company: "Premier Property Management",
      industry: "Property Management",
      metrics: "20+ hours saved weekly, 40% satisfaction increase"
    },
    {
      quote: "The automation tools have revolutionized our real estate business. Lead follow-up is now instant and our conversion rate doubled.",
      author: "Mike Chen",
      company: "Elite Realty Group", 
      industry: "Real Estate",
      metrics: "2x conversion rate, instant lead follow-up"
    },
    {
      quote: "Our accounting firm processes 3x more clients with the same staff. The workflow automation is incredible.",
      author: "Lisa Rodriguez",
      company: "Rodriguez & Associates",
      industry: "Accounting", 
      metrics: "3x client capacity, same staff size"
    }
  ];

  const solutions = [
    {
      title: "AI Agents",
      description: "Intelligent automation that works 24/7",
      icon: SparklesIcon,
      href: "/solutions/ai-agents",
      features: ["Natural Language Processing", "Automated Decision Making", "24/7 Operation"]
    },
    {
      title: "Smart Automations", 
      description: "Pre-built workflows that save time",
      icon: RocketLaunchIcon,
      href: "/automation/smart-automations",
      features: ["Lead Nurturing", "Invoice Processing", "Task Assignment"]
    },
    {
      title: "CRM System",
      description: "Complete customer relationship management",
      icon: UserGroupIcon,
      href: "/apps/crm",
      features: ["Contact Management", "Sales Pipeline", "Customer History"]
    },
    {
      title: "Lead Flow Engine",
      description: "Turn ads into qualified customers",
      icon: ChartBarIcon,
      href: "/apps/leadflow",
      features: ["Lead Capture", "Instant Follow-up", "ROI Tracking"]
    },
    {
      title: "SecureVault Docs",
      description: "Secure document management",
      icon: ShieldCheckIcon,
      href: "/apps/securevault",
      features: ["Document Security", "Compliance", "Easy Access"]
    },
    {
      title: "Content Engine",
      description: "Generate content at scale",
      icon: DocumentTextIcon,
      href: "/solutions/content-engine",
      features: ["SEO Content", "Multi-Platform", "Brand Consistency"]
    }
  ];

  const industries = [
    "Property Management",
    "Real Estate",
    "Contractors", 
    "Accounting",
    "Healthcare",
    "Cleaning"
  ];

  const stats = [
    { value: "5+", label: "Industries Supported", description: "From day one" },
    { value: "500+", label: "Automations Deployed", description: "And growing" },
    { value: "99.9%", label: "Uptime Guarantee", description: "Reliable service" },
    { value: "24/7", label: "Support Available", description: "Always here to help" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                🚀 Transform Your Business Today
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Stop Losing Money on
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}Manual Processes
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
              Join 500+ businesses that have automated their operations, saved thousands of hours, 
              and increased revenue with our industry-specific solutions.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm font-medium">No Setup Fees</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm font-medium">7-Day Free Trial</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Your Free Strategy Call
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Live Demos
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-blue-200">{stat.label}</div>
                  <div className="text-xs text-blue-300">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}Automate Your Business
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From AI-powered agents to custom workflows, we provide complete automation solutions 
                tailored to your industry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Link
                  key={index}
                  href={solution.href}
                  className="group bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{solution.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for Your Industry
              </h2>
              <p className="text-xl text-gray-600">
                Our solutions are tailored to the specific needs of your industry
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <Link
                  key={index}
                  href={`/industries/${industry.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{industry}</h3>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-gray-600">
                    Custom automation solutions designed specifically for {industry.toLowerCase()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Real Results from Real Businesses
              </h2>
              <p className="text-xl text-gray-600">
                See how our clients have transformed their operations
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="text-sm text-gray-500 mb-2">
                  <strong>{testimonials[currentTestimonial].metrics}</strong>
                </div>
              </div>
              <div className="border-t pt-6">
                <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
                <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
                <div className="text-sm text-blue-600">{testimonials[currentTestimonial].industry}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of businesses that have already automated their operations and increased their revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Your Free Strategy Call
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Live Demos
              </Link>
            </div>

            <div className="text-sm text-blue-200">
              <p>✅ No setup fees • ✅ 7-day free trial • ✅ 24/7 support</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
