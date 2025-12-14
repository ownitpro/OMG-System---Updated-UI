import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface CallToActionBannerProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; url: string };
}

export function CallToActionBanner({
  headline,
  subheadline,
  primaryCTA,
}: CallToActionBannerProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {headline}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link href={primaryCTA.url}>
                {primaryCTA.label}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-blue-100 text-sm">
              It's free. All levels welcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
