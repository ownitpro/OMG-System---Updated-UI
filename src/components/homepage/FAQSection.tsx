"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    id: 1,
    question: "How quickly can I see results with OMGsystems?",
    answer: "Most businesses see initial results within the first week of implementation. Our typical timeline is 1-3 weeks for full deployment, with measurable improvements in lead response time and admin efficiency visible within days."
  },
  {
    id: 2,
    question: "Do I need technical knowledge to use OMGsystems?",
    answer: "Not at all! OMGsystems is designed for business owners and teams without technical backgrounds. We handle all the setup, configuration, and training. You just focus on running your business while the automation works in the background."
  },
  {
    id: 3,
    question: "Can OMGsystems integrate with my existing tools?",
    answer: "Yes! OMGsystems integrates with over 200+ popular business tools including CRM systems, email platforms, accounting software, and more. We'll ensure seamless integration with your current workflow."
  },
  {
    id: 4,
    question: "What industries does OMGsystems work with?",
    answer: "While we can work with any industry, we dominate in four key sectors: Real Estate, Property Management, Contractors, and Accounting. These are our specialties where we've proven massive ROI and know every workflow inside-out."
  },
  {
    id: 5,
    question: "How much does OMGsystems cost?",
    answer: "Pricing varies according to your business size and automation needs. We offer flexible plans to suit most organizations, and custom enterprise solutions are available. Contact us for a personalized quote."
  },
  {
    id: 6,
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 support via email and SMS. You'll also get dedicated account management, regular check-ins, and ongoing optimization to ensure your automation continues to deliver maximum value."
  },
  {
    id: 7,
    question: "Is my data secure with OMGsystems?",
    answer: "Absolutely. We use enterprise-grade security with end-to-end encryption and Canadian data residency. Your data is never shared with third parties and is protected by bank-level security standards."
  },
  {
    id: 8,
    question: "Can I try OMGsystems before committing?",
    answer: "Yes! We offer free strategy calls and demos to show you exactly how OMGsystems would work for your business. You can also try our live demos to experience the platform firsthand before making any commitment."
  },
  {
    id: 9,
    question: "What if I need to make changes to my automation?",
    answer: "No problem! Our team can modify and optimize your automation at any time. We also provide you with the tools to make simple adjustments yourself, and our support team is always available to help with more complex changes."
  },
  {
    id: 10,
    question: "How do I get started with OMGsystems?",
    answer: "Getting started is easy! Simply book a free strategy call with our team. We'll analyze your business, identify automation opportunities, and create a custom implementation plan. From there, we handle everything else."
  }
];

export default function HomepageFAQSection() {
  const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/60">
            Everything you need to know about OMGsystems automation solutions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#47BD79] focus:ring-inset rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openItems.has(faq.id) ? (
                  <ChevronUpIcon className="w-5 h-5 text-[#47BD79] flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-white/50 flex-shrink-0" />
                )}
              </button>

              {openItems.has(faq.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-[#47BD79]/20" style={{ boxShadow: '0 0 30px rgba(71, 189, 121, 0.1)' }}>
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/60 mb-6">
              Our automation experts are here to help. Book a free consultation
              to get personalized answers for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#47BD79] text-white font-semibold rounded-lg hover:bg-[#3da86a] transition-all duration-600 ease-premium-out shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)]"
              >
                Book Free Consultation
              </a>
              <a
                href="/try-live-demo"
                className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border-2 border-[#47BD79]/50 hover:bg-white/20 hover:border-[#47BD79] transition-all duration-400 ease-premium-out"
              >
                Try Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
