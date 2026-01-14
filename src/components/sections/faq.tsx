import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How quickly can I get started with OMGsystems?",
    answer: "You can be up and running in under 10 minutes. Our streamlined onboarding process includes guided setup, data migration assistance, and comprehensive training resources. Most clients see immediate benefits within the first week of implementation."
  },
  {
    question: "Is my data secure with OMGsystems?",
    answer: "Absolutely. We use bank-grade encryption and follow industry best practices for data security. Your data is encrypted both in transit and at rest, and we never share your information with third parties without explicit consent."
  },
  {
    question: "Can OMGsystems integrate with my existing systems?",
    answer: "Yes! OMGsystems offers seamless integration with over 200+ popular business tools including CRM systems, accounting software, email platforms, and more. Our API-first architecture ensures smooth connectivity with virtually any system."
  },
  {
    question: "What industries does OMGsystems support?",
    answer: "While we can work with any industry, we dominate in four key sectors: Real Estate, Property Management, Contractors, and Accounting. These are our specialties where we've proven massive ROI and know every workflow inside-out."
  },
  {
    question: "How does the pricing work?",
    answer: "OMGsystems offers flexible pricing plans based on your team size and feature requirements. We have plans for small businesses starting at $29/month, enterprise solutions with custom pricing, and everything in between. All plans include our core features with no hidden fees."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 expert support via email and SMS. Our support team includes industry specialists who understand your unique challenges. We also offer comprehensive documentation, video tutorials, and regular training webinars."
  },
  {
    question: "Can I customize OMGsystems for my specific needs?",
    answer: "Absolutely! OMGsystems is built with customization in mind. You can create custom workflows, fields, reports, and integrations. Our platform adapts to your business processes rather than forcing you to change how you work."
  },
  {
    question: "What happens if I need to cancel my subscription?",
    answer: "You can cancel your subscription at any time with no penalties. We'll help you export your data in a standard format, and you'll retain access to your account until the end of your billing period. We're confident you'll love OMGsystems, but we want you to feel comfortable trying it risk-free."
  },
  {
    question: "Does OMGsystems offer training for my team?",
    answer: "Yes! We provide comprehensive training including live onboarding sessions, video tutorials, documentation, and ongoing support. Our customer success team will work with you to ensure your team is fully trained and comfortable with the platform."
  },
  {
    question: "How does OMGsystems ensure compliance with regulations?",
    answer: "OMGsystems includes built-in compliance frameworks for GDPR, HIPAA, SOX, and industry-specific regulations. We provide automated compliance tracking, audit trails, and regular updates to ensure you stay compliant as regulations evolve."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about OMGsystems and how it can transform your business.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our expert team is here to help you understand how OMGsystems can 
              transform your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/book-demo"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
