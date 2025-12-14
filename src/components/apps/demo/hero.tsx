import React from "react";
import { Container } from "@/components/layout/container";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  badges?: readonly string[];
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  badges
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle lime-to-white gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-transparent to-transparent"
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
