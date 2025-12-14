import React from "react";
import Link from 'next/link'

interface FeatureCardProps {
  iconName: string
  title: string
  description: string
  link: string
}

export function FeatureCard({ iconName, title, description, link }: FeatureCardProps) {
  return (
    <Link
      href={link}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
        <div className="h-6 w-6 text-blue-600 text-center text-lg">
          {iconName}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </Link>
  )
}
