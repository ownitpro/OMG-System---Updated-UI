"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I import my old leads?",
    answer: "Yes, CSV or direct sync. We support most CRMs and lead management systems.",
  },
  {
    question: "Does it integrate with my MLS?",
    answer: "Yes — full MLS/IDX sync for Canada, supporting all major Canadian MLS systems.",
  },
  {
    question: "Can my assistants access it?",
    answer: "Yes — role-based permissions. You control who sees what data and what actions they can perform.",
  },
  {
    question: "Is it compliant with RECO & CREA?",
    answer: "Fully compliant; SecureVault Docs ensures record-keeping. All data is stored in Canada with proper audit trails.",
  },
  {
    question: "How soon can I launch?",
    answer: "Usually within 2–4 weeks. Most agents are up and running with basic automation in ~2 weeks; full implementation takes ~3–4 weeks.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Common questions about real estate automation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about implementing automation in your real estate business.
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
