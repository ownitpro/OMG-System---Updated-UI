"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export function FAQSection({ title, subtitle, faqs, className = '' }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {faq.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {faq.category}
                    </span>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you find the perfect solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/apps/demo"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
              >
                Try Live Demos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default FAQ data
export const defaultFAQs: FAQItem[] = [
  {
    question: "How secure is my data?",
    answer: "Your data is encrypted using industry-standard AES-256 encryption, stored exclusively in Canadian data centers (AWS Canada Central), and protected by comprehensive audit logs and access controls. We're SOC 2 compliant and follow PHIPA/PIPEDA regulations for data protection.",
    category: "Security"
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Yes! OMGsystems offers extensive API integration capabilities and webhooks to connect with your existing stack. We support popular tools like QuickBooks, Slack, Microsoft 365, Google Workspace, and many others. Our team can also help with custom integrations.",
    category: "Integration"
  },
  {
    question: "How quickly can I get started?",
    answer: "Most clients go live in 1-3 weeks, depending on complexity and custom requirements. Our onboarding process includes data migration, team training, and workflow setup. We provide dedicated support throughout the entire process to ensure a smooth transition.",
    category: "Getting Started"
  },
  {
    question: "Do you offer a trial?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. You can also book a personalized demo where we'll show you how OMGsystems works with your specific data and workflows. No credit card required for the trial.",
    category: "Trial"
  },
  {
    question: "What industries do you serve?",
    answer: "We specialize in service industries including Property Management, Real Estate, Healthcare, Accounting, Contractors, and Cleaning Services. Each industry gets tailored features, compliance tools, and industry-specific automation templates.",
    category: "Industries"
  },
  {
    question: "Is there a mobile app?",
    answer: "Yes! OMGsystems includes a fully responsive web app that works seamlessly on mobile devices. You can access all features, manage leads, view documents, and collaborate with your team from anywhere. Native mobile apps are coming soon.",
    category: "Mobile"
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer multiple support tiers: email support for all plans, priority support for Growth plans, and dedicated account managers for Pro plans. We also provide comprehensive documentation, video tutorials, and regular training webinars.",
    category: "Support"
  },
  {
    question: "Can I customize the platform for my business?",
    answer: "Absolutely! OMGsystems is designed to be highly customizable. You can create custom fields, workflows, reports, and automation rules. Our Pro plan includes white-label options and custom integrations to match your brand and processes.",
    category: "Customization"
  }
];
