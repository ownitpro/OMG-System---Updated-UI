"use client";

import { useState } from "react";
import { 
  ChevronDownIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

const faqs = [
  {
    id: 1,
    question: "What is an AI Agent?",
    answer: "An AI-powered teammate—from simple task automations to complex workflows—custom-built for your business. Think of it as a digital employee that never sleeps, learns from your data, and handles repetitive tasks so your team can focus on what matters most."
  },
  {
    id: 2,
    question: "How does pricing work?",
    answer: "We quote a fixed setup + optional monthly optimisation; ask about our Founder's Offer for special pricing. Our pricing is transparent and based on the complexity of your agent's tasks, integrations needed, and ongoing support requirements."
  },
  {
    id: 3,
    question: "How do you protect my data?",
    answer: "Enterprise-grade security, encrypted storage, and full control of your data. We use industry-standard encryption, secure data centers, and never share your information with third parties. Your data remains yours, always."
  },
  {
    id: 4,
    question: "Can I update my agent after launch?",
    answer: "Yes—agents are fully customisable, retrainable and evolve with your business. As your needs change, we can modify your agent's capabilities, add new integrations, or expand its responsibilities without starting from scratch."
  },
  {
    id: 5,
    question: "Will I need to switch from my CRM or other tools?",
    answer: "No. Our solution integrates into your existing systems. We work with your current CRM, email systems, databases, and other tools to create a seamless experience that enhances your existing workflow."
  },
  {
    id: 6,
    question: "How long does it take to launch an AI Agent?",
    answer: "Most agents are live in 2-4 weeks, depending on complexity. Simple task automation can be ready in 1-2 weeks, while complex multi-system integrations may take 3-4 weeks. We provide regular updates throughout the development process."
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about AI Agents
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openFAQ === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Contact our AI Agent team or Request Your Custom Quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Our Team
              </a>
              <button
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-6 py-3 border border-emerald-400/30 text-lg font-medium rounded-lg text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}