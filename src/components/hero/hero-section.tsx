import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { Metric } from '@/types/homepage'
import { 
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface HeroSectionProps {
  headline: string
  subheadline: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
  metrics: Metric[]
}

export function HeroSection({ 
  headline, 
  subheadline, 
  primaryCTA, 
  secondaryCTA, 
  metrics 
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
      <Container>
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            {headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              <Link href={primaryCTA.href}>
                {primaryCTA.text}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
              <Link href={secondaryCTA.href}>
                <PlayIcon className="mr-2 h-5 w-5" />
                {secondaryCTA.text}
              </Link>
            </Button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
      </div>
    </section>
  )
}
