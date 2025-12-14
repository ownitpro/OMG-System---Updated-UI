"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I need to move my old data?",
      answer: "No problem! We provide easy data migration tools and support to help you import your existing contacts, leads, and documents from your current system. Our team can assist with the migration process to ensure nothing is lost."
    },
    {
      question: "What tools does this CRM connect with?",
      answer: "Our CRM integrates with popular tools including email platforms (Gmail, Outlook), calendar systems (Google Calendar, Outlook), document storage (Google Drive, Dropbox), accounting software (QuickBooks, Xero), and many more. We're constantly adding new integrations based on customer needs."
    },
    {
      question: "Is my data safe and who can access it?",
      answer: "Absolutely. Your data is encrypted both in transit and at rest, stored in secure Canadian data centers, and protected by enterprise-grade security. You control who has access through role-based permissions, and we never share your data with third parties without your explicit consent."
    },
    {
      question: "Can I modify fields and pipelines myself?",
      answer: "Yes! Our CRM is fully customizable. You can create custom fields, modify sales pipelines, set up automated workflows, and configure the system to match your specific business processes. No technical knowledge required - it's all done through our intuitive interface."
    },
    {
      question: "How quickly can my team learn to use it?",
      answer: "Most teams are up and running within a few hours. We provide comprehensive onboarding, training materials, and ongoing support. The interface is designed to be intuitive, and we offer live training sessions to get your team productive quickly."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Everything you need to know about our CRM platform.
          </h2>
          <p className="text-xl text-gray-600">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="pl-12">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
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
