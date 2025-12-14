"use client";

import React from "react";
import Link from "next/link";
import { 
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "AI Agents",
      description: "Intelligent automation that works 24/7 to handle your business processes",
      icon: SparklesIcon,
      href: "/solutions/ai-agents",
      features: ["Natural Language Processing", "Automated Decision Making", "24/7 Operation"]
    },
    {
      title: "Content Engine",
      description: "Generate high-quality content at scale for all your marketing needs",
      icon: DocumentTextIcon,
      href: "/solutions/content-engine",
      features: ["SEO-Optimized Content", "Multi-Platform Publishing", "Brand Voice Consistency"]
    },
    {
      title: "Custom Apps",
      description: "Tailored applications built specifically for your business requirements",
      icon: CogIcon,
      href: "/solutions/custom-apps",
      features: ["Industry-Specific Design", "Seamless Integration", "Scalable Architecture"]
    },
    {
      title: "Smart Automations",
      description: "Workflow automation that saves time and reduces errors",
      icon: RocketLaunchIcon,
      href: "/automation/smart-automations",
      features: ["Process Optimization", "Error Reduction", "Time Savings"]
    },
    {
      title: "Workflow Builder",
      description: "Visual tool to create and manage complex business workflows",
      icon: ChartBarIcon,
      href: "/automation/workflow-builder",
      features: ["Drag & Drop Interface", "Real-time Testing", "Custom Logic"]
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive insights into your business performance",
      icon: ChartBarIcon,
      href: "/solutions/analytics",
      features: ["Real-time Dashboards", "Custom Reports", "Performance Metrics"]
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Complete Business Solutions
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-8">
              From AI-powered automation to custom applications, we provide everything your business needs to thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Live Demos
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-xl text-gray-600">Comprehensive tools designed to transform your business operations</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Link
                  key={index}
                  href={solution.href}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{solution.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
              <p className="text-xl text-gray-600">Tailored solutions for every industry</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <Link
                  key={index}
                  href={`/industries/${industry.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry}</h3>
                  <p className="text-gray-600">Custom solutions for {industry.toLowerCase()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8">Let's discuss how our solutions can help you achieve your goals</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Live Demos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
