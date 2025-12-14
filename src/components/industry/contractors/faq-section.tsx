"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/container";
import { FAQItem } from "@/data/contractorsContent";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-neutral-100">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg shadow-sm"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors duration-medium"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-text-primary">{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-text-secondary transition-transform duration-medium ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-text-secondary text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;