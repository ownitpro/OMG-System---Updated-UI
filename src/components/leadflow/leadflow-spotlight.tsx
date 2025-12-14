import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { 
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface LeadFlowSpotlightProps {
  headline: string
  subheadline: string
  primaryCTA: {
    text: string
    href: string
  }
  painPoints: string[]
  systemExplanation: string
  sixStepJourney: Array<{
    step: number
    whatHappens: string
    whyItMatters: string
  }>
  deliverables: string[]
  results: Array<{
    metric: string
    description: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function LeadFlowSpotlight({
  headline,
  subheadline,
  primaryCTA,
  painPoints,
  systemExplanation,
  sixStepJourney,
  deliverables,
  results,
  faqs
}: LeadFlowSpotlightProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {headline}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
            <Link href={primaryCTA.href}>
              {primaryCTA.text}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Visual Flow */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-lg p-4">
                <span className="text-2xl">📱</span>
              </div>
              <ArrowRightIcon className="h-6 w-6 text-gray-400 hidden md:block" />
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-lg p-4">
                <span className="text-2xl">👥</span>
              </div>
              <ArrowRightIcon className="h-6 w-6 text-gray-400 hidden md:block" />
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 rounded-lg p-4">
                <span className="text-2xl">💼</span>
              </div>
              <ArrowRightIcon className="h-6 w-6 text-gray-400 hidden md:block" />
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-lg p-4">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-gray-500">
            Ads → Leads → CRM → Clients
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Pain Points */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Problem</h3>
            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Explanation */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Solution</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {systemExplanation}
            </p>
            
            {/* Results */}
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">{result.metric}</span>
                    <span className="text-gray-600 ml-2">{result.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Six-Step Journey */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Your 6-Step Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sixStepJourney.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold text-sm">{step.step}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Step {step.step}</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">What Happens</h5>
                    <p className="text-sm text-gray-600">{step.whatHappens}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">Why It Matters</h5>
                    <p className="text-sm text-gray-600">{step.whyItMatters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Quick Questions</h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready To Turn Your Ads Into Clients On Autopilot?
          </h3>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4">
            <Link href={primaryCTA.href}>
              Book Your Free LeadFlow Strategy Call
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
