"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Does this replace our tax suite / EFILE?",
    answer: "No — integrates with your current tax/tax-prep software (QuickBooks, Sage, etc.).",
  },
  {
    question: "Do we keep client data ownership?",
    answer: "Yes — you maintain full ownership. Data stored in Canada with audit logs; you can export or delete anytime.",
  },
  {
    question: "Can we start small?",
    answer: "Absolutely — begin with SecureVault Docs + Scheduling, then add modules over time.",
  },
  {
    question: "Which identity checks are supported?",
    answer: "Canadian IDs (driver's licence, passport, health card) + selfie matching; metadata stored for audit.",
  },
  {
    question: "How do you handle retention/deletion?",
    answer: "Configurable retention policies, legal-hold capability, full change log + automated deletion scheduling.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about implementing automation in your accounting practice.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* JSON-LD structured data for SEO */}
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
