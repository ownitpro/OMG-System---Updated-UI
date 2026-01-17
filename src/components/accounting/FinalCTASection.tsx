"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { trackCTAClick } from "@/lib/analytics";

export default function FinalCTASection() {
  const handleRequestDemo = () => {
    trackCTAClick('Request a Demo', 'Final CTA Section');
    window.location.href = "/try-live-demo?industry=accounting";
  };

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-700 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
          Ready to Focus on Advisory — Not Admin?
        </h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10">
          Join hundreds of Canadian accounting firms already using OMGsystems to streamline their practice with automation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="bg-white text-emerald-700 hover:bg-gray-100 px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            onClick={handleRequestDemo}
          >
            Request a Demo
            <ArrowRightIcon className="ml-3 h-6 w-6 inline-block" />
          </Button>
          <Link
            href="/industries#lead-form"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border border-white rounded-full hover:bg-white hover:text-blue-700 transition-colors duration-300"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
