import React from "react";
import { Container } from '@/components/layout/container'
import { FAQItem } from './faq-item'
import { FAQItem as FAQItemType } from '@/types/homepage'

interface FAQSectionProps {
  title: string
  subtitle: string
  faqs: FAQItemType[]
}

export function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
