import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string; id?: string };
  secondaryCta?: { label: string; href: string; id?: string };
  badges?: readonly string[];
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  badges
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle radial gradient */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-green-50/40 via-transparent to-transparent"
        aria-hidden="true"
      />
      
      <Container className="relative py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {eyebrow && (
            <div className="text-sm font-semibold text-green-600 mb-4 uppercase tracking-wide">
              {eyebrow}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-2xl">
              <Link href={primaryCta.href}>
                {primaryCta.label}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-2xl">
                <Link href={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
          
          {/* Trust Pills */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
