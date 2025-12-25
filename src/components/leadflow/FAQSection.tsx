"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you work in my industry?",
      answer: "Absolutely. We've helped real estate, healthcare, cleaning services, accounting, project management, and more."
    },
    {
      question: "What if I already run Facebook ads?",
      answer: "Great! We audit, improve, and integrate your campaigns."
    },
    {
      question: "I don't use a CRM—problem?",
      answer: "No worries. We'll set it up for you or integrate your current system with training and hand-off."
    },
    {
      question: "What ROI should I expect?",
      answer: "Most clients see 3×–5× return on ad spend. Results depend on market and scale."
    },
    {
      question: "Long-term contracts?",
      answer: "No long-term contracts. We earn your business monthly."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A]">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Common questions about lead generation & automation
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-[#47BD79]/30 transition-all duration-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:ring-inset transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#47BD79] transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 border-t border-white/10">
                  <p className="text-white/70 leading-relaxed pt-4">
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
      </div>
    </section>
  );
}
