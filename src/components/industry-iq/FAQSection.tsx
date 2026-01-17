"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Which industries are supported?",
    answer: "While we can work with any industry, we dominate in four key sectors: Real Estate, Property Management, Contractors, and Accounting. These are our specialties where we've proven massive ROI and know every workflow inside-out.",
  },
  {
    question: "Can this integrate with my current reporting/dashboard tools?",
    answer: "Yes! We can connect to your existing dashboards and business systems. Industry IQ integrates with popular CRM platforms, accounting software, and data sources to provide a unified view.",
  },
  {
    question: "No CRM? Not a problem.",
    answer: "Not a problem. We'll set it up for you or integrate with your current system—including training and hand-off. Our team ensures you're fully equipped to leverage Industry IQ's capabilities.",
  },
  {
    question: "What ROI can I expect?",
    answer: "Most clients see 3×–5× return from insights & optimization, but market and volume vary. Our AI helps identify opportunities that typically result in significant efficiency gains and revenue improvements.",
  },
  {
    question: "Long-term contracts?",
    answer: "No long-term contracts. We earn your business monthly. You can cancel anytime with 30 days notice, and we're confident you'll see the value that keeps you with us.",
  },
  {
    question: "How quickly can I get started?",
    answer: "Most businesses are up and running within 24-48 hours. Our quick-start setup means you can pick your industry and launch dashboards instantly with minimal configuration required.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide comprehensive onboarding support, training sessions, and ongoing assistance. Our team is available to help you maximize the value of Industry IQ throughout your journey.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Industry IQ uses enterprise-grade security with encryption at rest and in transit. We follow strict data privacy standards to protect your business information.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about Industry IQ and how it can transform your business intelligence.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you understand how Industry IQ can transform your business intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                <span className="mr-2">Contact Support</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        {/* FAQ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}