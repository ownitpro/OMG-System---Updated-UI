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
    answer: "We specialize in service-based industries including Property Management, Real Estate, Contractors, Accounting, Healthcare, and Cleaning services. Our solutions are tailored to each industry's specific needs and compliance requirements."
  },
  {
    id: 5,
    question: "How much does OMGsystems cost?",
    answer: "Pricing varies according to your business size and automation needs. We offer flexible plans to suit most organizations, and custom enterprise solutions are available. Contact us for a personalized quote."
  },
  {
    id: 6,
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 support via phone, email, and chat. You'll also get dedicated account management, regular check-ins, and ongoing optimization to ensure your automation continues to deliver maximum value."
  },
  {
    id: 7,
    question: "Is my data secure with OMGsystems?",
    answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and Canadian data residency. Your data is never shared with third parties and is protected by the same security standards used by major banks."
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
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about OMGsystems automation solutions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openItems.has(faq.id) ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.has(faq.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our automation experts are here to help. Book a free consultation 
              to get personalized answers for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Free Consultation
              </a>
              <a
                href="/demos/live"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
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
