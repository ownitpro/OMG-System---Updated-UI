import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PriceGridProps {
  personal: {
    plans: readonly { name: string; price: string; bullets: readonly string[] }[];
  };
  business: {
    blurb: string;
    link: string;
  };
  ctas: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export function PriceGrid({
  personal,
  business,
  ctas
}: PriceGridProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personal.plans.map((plan, index) => (
            <div key={index} className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
              <div className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</div>
              <div className="text-2xl font-bold text-gray-900 mb-4">{plan.price}</div>
              <ul className="space-y-2">
                {plan.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-600 mr-2 mt-1">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-xl border border-gray-200 p-6 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Business pricing</h3>
        <p className="text-gray-600 mb-4">{business.blurb}</p>
        <a 
          href={business.link} 
          className="inline-block text-sm font-medium text-green-600 hover:text-green-700 underline underline-offset-4"
        >
          View business pricing
        </a>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-2xl">
          <Link href={ctas.primary.href}>
            {ctas.primary.label}
          </Link>
        </Button>
        {ctas.secondary && (
          <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-2xl">
            <Link href={ctas.secondary.href}>
              {ctas.secondary.label}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
