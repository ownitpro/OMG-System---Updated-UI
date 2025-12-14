import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 1,000 contacts",
      "Basic CRM features",
      "Email integration",
      "Mobile app access",
      "Standard support"
    ],
    popular: false
  },
  {
    name: "Growth",
    price: "$79",
    period: "per month",
    description: "Ideal for growing businesses",
    features: [
      "Up to 10,000 contacts",
      "Advanced automation",
      "SecureVault Docs",
      "API access",
      "Priority support",
      "Advanced analytics"
    ],
    popular: true
  },
  {
    name: "Pro",
    price: "$199",
    period: "per month",
    description: "For large organizations",
    features: [
      "Unlimited contacts",
      "Custom integrations",
      "Industry IQ",
      "Content Engine",
      "Dedicated account manager",
      "24/7 phone support"
    ],
    popular: false
  }
]

export function PricingTeaser() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include 
            our core features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 ${
              plan.popular ? 'border-blue-500' : 'border-gray-200'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                asChild 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="mr-4">
            <Link href="/pricing">
              See Full Pricing
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Pricing subject to change. Custom enterprise plans available.
          </p>
        </div>
      </div>
    </section>
  )
}
