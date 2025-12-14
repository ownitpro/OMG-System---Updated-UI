"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Will this work with my existing CRM or ads?",
    answer: "Yes. You can bring your existing ads or CRM; we integrate or transition gradually without disrupting your current workflow.",
  },
  {
    question: "How long until this is live?",
    answer: "Typically 1–3 weeks, depending on number of modules and complexity. We configure, test, and hand-off seamlessly.",
  },
  {
    question: "Can I customise proposal templates or contract logic?",
    answer: "Yes. You have full control over templates, pricing, clauses, branding, and logic to match your business needs.",
  },
  {
    question: "What happens if I hit usage limits or overages?",
    answer: "You'll be alerted at thresholds (70%, 90% etc.). New automations will pause at 100% until you upgrade or reduce usage.",
  },
  {
    question: "Are client data and documents secure in Ontario/Canada?",
    answer: "Absolutely. Encrypted, stored in Canada, with audit logs and role-based access. Full compliance with PIPEDA standards.",
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
            Everything you need to know about implementing automation in your contracting business.
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
