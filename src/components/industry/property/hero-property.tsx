import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { 
  ArrowRightIcon,
  PlayIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface HeroPropertyProps {
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
  microBenefits: string[]
}

export function HeroProperty({ 
  headline, 
  subheadline, 
  primaryCTA, 
  secondaryCTA, 
  microBenefits 
}: HeroPropertyProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-blue-200 rounded-full"></div>
      </div>
      
      <Container>
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          
          {/* CTA Buttons */}
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
          
          {/* Micro Benefits */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600">
            {microBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-100 to-transparent rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-purple-100 to-transparent rounded-full opacity-20"></div>
      </div>
    </section>
  )
}
