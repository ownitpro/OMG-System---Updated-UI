"use client";

import { useState } from "react";
import {
  ComputerDesktopIcon,
  ShieldCheckIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const faqs = [
  {
    icon: ComputerDesktopIcon,
    question: "Does this replace our EHR?",
    answer: "No; CareFlow complements and integrates with your existing systems—scheduling, intake, documents, claims, medications, alerts.",
  },
  {
    icon: ShieldCheckIcon,
    question: "How is patient data protected?",
    answer: "PHI encrypted in transit and at rest, role-based access, all actions logged, Canadian residency.",
  },
  {
    icon: CogIcon,
    question: "Can we adopt modules gradually?",
    answer: "Yes; start small (scheduling + intake) then add claims, docs, meds and alerts.",
  },
  {
    icon: QuestionMarkCircleIcon,
    question: "What support & SLAs do you offer?",
    answer: "Onboarding, training, dedicated success manager, response SLAs included.",
  },
  {
    icon: LockClosedIcon,
    question: "How secure is the automation layer?",
    answer: "All workflows are audited; confidentiality, fairness and safety are validated.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about CareFlow Automation
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <faq.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JSON-LD structured data for FAQ */}
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
    </section>
  );
}
