import React from "react";
import { Container } from '@/components/layout/container'

interface TrustBadge {
  text: string
  color: string
}

interface TrustBarProps {
  title?: string
  logos?: string[]
  badges: TrustBadge[]
}

export function TrustBar({ 
  title = "Trusted by industry leaders", 
  logos = [], 
  badges 
}: TrustBarProps) {
  return (
    <section className="py-8 bg-gray-50 border-y border-gray-200">
      <Container>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">{title}</p>
          
          {/* Company Logos */}
          {logos.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 mb-6">
              {logos.map((logo, index) => (
                <div key={index} className="h-8 w-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          )}
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${badge.color}`}></span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
