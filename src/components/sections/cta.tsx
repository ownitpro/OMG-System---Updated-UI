import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Setup in under 10 minutes",
  "24/7 expert support",
  "Cancel anytime"
]

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Most teams launch in 1–3 weeks.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/apps/demo">
                Try Live Demos
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
