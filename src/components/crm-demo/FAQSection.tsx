"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Do I need to move my old data?",
    answer: "Yes—we support quick imports from your current CRM and lead-management systems. Our team will help you migrate your data seamlessly during setup."
  },
  {
    question: "What tools does this CRM connect with?",
    answer: "We integrate your CRM, document management, email, and more—eliminating silos. Connect with popular tools like Gmail, Outlook, QuickBooks, and many others."
  },
  {
    question: "Is my data safe and who can access it?",
    answer: "Yes—bank-level encryption, role-based controls, audit logging, Canadian data residency. Your data is protected with enterprise-grade security measures."
  },
  {
    question: "Can I modify fields and pipelines myself?",
    answer: "Absolutely—customise every workflow, field and stage to meet your business needs. No coding required—our intuitive interface makes it easy."
  },
  {
    question: "How quickly can my team learn to use it?",
    answer: "Fast! Minimal training required, intuitive UI, onboarding support included. Most teams are productive within the first week of use."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/70">
            Everything you need to know about our CRM
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-[#47BD79]/30 transition-all duration-600 ease-premium-out"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:ring-inset transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-white/50 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/70 mb-6">
              Our team is here to help you get the most out of your CRM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#47BD79] hover:bg-[#3da86a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47BD79] transition-all duration-600 ease-premium-out shadow-[0_0_20px_rgba(71,189,121,0.4)]"
              >
                Contact Support
              </a>
              <a
                href="/try-live-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-base font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 hover:border-[#47BD79]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47BD79] transition-all duration-600 ease-premium-out"
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
