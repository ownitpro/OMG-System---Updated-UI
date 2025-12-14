import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface FinalCTABandProps {
  headline: string
  subtext: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
}

export function FinalCTABand({ 
  headline, 
  subtext, 
  primaryCTA, 
  secondaryCTA 
}: FinalCTABandProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {headline}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link href={primaryCTA.href}>
                {primaryCTA.text}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              <Link href={secondaryCTA.href}>
                {secondaryCTA.text}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
