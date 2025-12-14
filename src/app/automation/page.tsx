"use client";

import React from "react";
import Link from "next/link";
import { 
  SparklesIcon,
  CogIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  BoltIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function AutomationPage() {
  const automations = [
    {
      title: "Smart Automations",
      description: "Pre-built automation templates that save time and reduce errors",
      icon: SparklesIcon,
      href: "/automation/smart-automations",
      features: ["Lead Nurturing", "Invoice Processing", "Task Assignment", "Follow-up Reminders"]
    },
    {
      title: "Workflow Builder",
      description: "Visual tool to create and manage complex business workflows",
      icon: ChartBarIcon,
      href: "/automation/workflow-builder",
      features: ["Drag & Drop Interface", "Real-time Testing", "Custom Logic", "Integration Ready"]
    },
    {
      title: "Custom Automation",
      description: "Tailored automation solutions built specifically for your business",
      icon: CogIcon,
      href: "/automation/custom",
      features: ["Multi-Channel Lead Scoring", "Dynamic Pricing", "Customer Journey Mapping", "Inventory Optimization"]
    }
  ];

  const benefits = [
    {
      icon: ClockIcon,
      title: "Save Time",
      description: "Automate repetitive tasks and focus on what matters most"
    },
    {
      icon: BoltIcon,
      description: "Reduce Errors",
      title: "Eliminate human error with consistent, automated processes"
    },
    {
      icon: ChartBarIcon,
      title: "Scale Efficiently",
      description: "Handle more work without proportional increases in resources"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Business Automation Solutions
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed max-w-4xl mx-auto mb-8">
              Transform your business with intelligent automation that works 24/7 to handle repetitive tasks, streamline workflows, and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Try Live Demos
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Automate?</h2>
              <p className="text-xl text-gray-600">The benefits of business automation are clear and measurable</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Types */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Automation Solutions</h2>
              <p className="text-xl text-gray-600">Choose the automation approach that fits your business needs</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {automations.map((automation, index) => (
                <Link
                  key={index}
                  href={automation.href}
                  className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <automation.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{automation.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{automation.description}</p>
                  <ul className="space-y-2">
                    {automation.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your Business?</h2>
            <p className="text-xl text-purple-100 mb-8">Let's discuss how automation can transform your operations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
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
