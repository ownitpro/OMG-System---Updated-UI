import React from "react";

interface FeatureCardProps {
  title: string;
  bullets: readonly string[];
}

export function FeatureCard({
  title,
  bullets
}: FeatureCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <h3 className="font-semibold text-gray-900 text-lg mb-4">{title}</h3>
      
      <ul className="space-y-2">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start text-sm text-gray-600">
            <span className="text-green-600 mr-2 mt-1">•</span>
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
