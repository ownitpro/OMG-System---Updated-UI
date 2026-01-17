"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does the demo take?",
    answer: "10–15 minutes; explore at your pace. You can go through it as quickly or slowly as you'd like, and you can always come back to specific sections."
  },
  {
    question: "Do I need to install anything?",
    answer: "No—fully browser-based, no download required. The demo runs entirely in your web browser, so you can access it from any device with an internet connection."
  },
  {
    question: "Is my data secure?",
    answer: "Enterprise-grade encryption, Canadian data residency, role-based access. We use the same security standards as major financial institutions to protect your information."
  },
  {
    question: "Can I try it for my industry?",
    answer: "Absolutely! While we can work with any industry, we dominate in Real Estate, Property Management, Contractors, and Accounting. Our demos are specifically designed to show you exactly how OMGsystems crushes it for your business type."
  },
  {
    question: "What happens after?",
    answer: "We follow up to discuss pricing and launch options. Our team will reach out within 24 hours to answer any questions and help you get started with OMGsystems."
  },
  {
    question: "Can I share the demo with my team?",
    answer: "Yes! You'll receive a secure link that you can share with colleagues. Each team member can explore the demo independently and see how OMGsystems would work for your organization."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our live demo experience
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-emerald-600 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
