"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Does this integrate with QuickBooks?",
    answer: "Yes. SmartRent Flow seamlessly integrates with QuickBooks for automated accounting, expense-tracking, and financial reporting.",
  },
  {
    question: "Do tenants get their own portal?",
    answer: "Yes. Tenants can pay rent, submit maintenance requests, view lease documents and communicate via their dedicated portal.",
  },
  {
    question: "What can property owners see in their dashboard?",
    answer: "Real-time occupancy, rent collection status, maintenance, performance, and automated monthly statements.",
  },
  {
    question: "How does maintenance request management work?",
    answer: "Tenants submit requests through the portal; system automatically routes to appropriate vendors with photo documentation & progress tracking.",
  },
  {
    question: "How secure is tenant and financial data?",
    answer: "All data is encrypted, stored in Canada, and complies with PIPEDA and provincial privacy laws. We use bank-level security standards.",
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
          <p className="text-xl text-gray-600">
            Get answers to common questions about property management automation.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b">
              <AccordionTrigger className="text-left text-lg font-medium text-gray-800 hover:text-emerald-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
