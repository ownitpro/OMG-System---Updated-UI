"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FAQ } from "@/config/app_pages_config";

type FAQAccordionProps = {
  heading: string;
  items: FAQ[];
};

export function FAQAccordion({ heading, items }: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          {heading}
        </h2>

        <div className="space-y-4">
          {items.map((faq, index) => (
            <details
              key={index}
              open={openFAQ === index}
              onClick={(e) => {
                e.preventDefault();
                setOpenFAQ((prev) => (prev === index ? null : index));
              }}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6"
            >
              <summary className="flex items-center justify-between text-lg font-semibold text-gray-900">
                <span>{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </summary>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

