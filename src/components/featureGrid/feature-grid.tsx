import React from "react";
import { Container } from '@/components/layout/container'
import { FeatureCard } from './feature-card'
import { Feature } from '@/types/homepage'

interface FeatureGridProps {
  title: string
  subtitle: string
  features: Feature[]
}

export function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
