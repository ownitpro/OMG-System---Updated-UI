import React from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

interface FinalCTABandProps {
  headline: string;
  subtext: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

export function FinalCTABand({ headline, subtext, primaryCTA, secondaryCTA }: FinalCTABandProps) {
  const benefits = [
    "Most clients go live within weeks",
    "No long-term contracts required",
    "Canadian data storage & compliance",
    "24/7 support included"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <Container>
        <div className="relative text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtext}
          </p>
          
          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-blue-100">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon className="h-5 w-5 text-green-300 mr-2" />
                {benefit}
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 text-sm">Active Real Estate Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200 text-sm">Platform Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Canadian Support</div>
            </div>
          </div>
          
          {/* Urgency Message */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-blue-100 text-lg">
              <strong className="text-white">Limited Time:</strong> Get your first month free when you sign up this quarter. 
              Perfect timing to capitalize on the active Ontario real estate market.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
