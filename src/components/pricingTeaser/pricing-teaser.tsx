import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { PlanCard } from './plan-card'
import { Plan } from '@/types/homepage'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface PricingTeaserProps {
  title: string
  subtitle: string
  plans: Plan[]
  fullPricingHref: string
  disclaimer: string
}

export function PricingTeaser({ 
  title, 
  subtitle, 
  plans, 
  fullPricingHref, 
  disclaimer 
}: PricingTeaserProps) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              name={plan.name}
              priceMonthly={plan.priceMonthly}
              features={plan.features}
              link={plan.link}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="mr-4">
            <Link href={fullPricingHref}>
              See Full Pricing
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            {disclaimer}
          </p>
        </div>
      </Container>
    </section>
  )
}
