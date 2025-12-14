import React from "react";
interface TestimonialCardProps {
  quote: string
  author: string
  role?: string
  logoUrl?: string
}

export function TestimonialCard({ quote, author, role, logoUrl }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-gray-700 text-lg leading-relaxed italic">
          "{quote}"
        </p>
      </div>
      
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {author}
          </div>
          {role && (
            <div className="text-sm text-gray-500">
              {role}
            </div>
          )}
        </div>
        {logoUrl && (
          <div className="ml-auto">
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        )}
      </div>
    </div>
  )
}
