import React from "react";
import Link from "next/link";

interface IndustryCardProps {
  title: string;
  blurb: string;
  href: string;
}

export function IndustryCard({
  title,
  blurb,
  href
}: IndustryCardProps) {
  return (
    <Link 
      href={href} 
      className="block rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300"
    >
      <h3 className="font-semibold text-gray-900 text-lg mb-3">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{blurb}</p>
      <span className="inline-block text-sm font-medium text-green-600 hover:text-green-700 underline underline-offset-4">
        Explore
      </span>
    </Link>
  );
}
