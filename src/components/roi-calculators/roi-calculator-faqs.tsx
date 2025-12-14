"use client";

import React from "react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FAQ {
  question: string;
  answer: string;
}

interface ROICalculatorFAQsProps {
  industry: string;
}

export function ROICalculatorFAQs({ industry }: ROICalculatorFAQsProps) {
  // Generate FAQs based on industry
  const faqs: FAQ[] = [
    {
      question: `How accurate is the ${industry} ROI calculator?`,
      answer: `Our ROI calculator is based on industry benchmarks and real client data from ${industry} businesses. While results are estimates, they provide a solid foundation for understanding potential savings.`
    },
    {
      question: `What's included in the automation setup?`,
      answer: `Our ${industry} automation includes workflow design, system integration, team training, and ongoing support. We handle the technical implementation so you can focus on your business.`
    },
    {
      question: `How long does implementation take?`,
      answer: `Most ${industry} automation projects are completed within 2-4 weeks, depending on complexity. We provide a detailed timeline during the planning phase.`
    },
    {
      question: `Is there ongoing support?`,
      answer: `Yes, we provide comprehensive support including system monitoring, updates, and training for new team members. Our support team understands ${industry} workflows.`
    }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-sm font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-4 pb-3 text-sm text-gray-600"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
