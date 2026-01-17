"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalCTASection() {
  const handleBookDemo = () => {
    // Navigate to demo page with cleaning industry pre-selected
    window.location.href = "/try-live-demo?industry=cleaning";
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
          Ready to automate your cleaning business?
        </h2>
        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of Canadian cleaning companies already using the Cleaning Operations Engine™ to streamline their operations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            onClick={handleBookDemo}
          >
            Book a Demo
          </Button>
          <Link
            href="#lead-form"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-emerald-600 transition-all duration-300"
          >
            Talk to Sales
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-emerald-100">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
            <span>✓ Canadian Data Residency</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
            <span>✓ PHIPA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
            <span>✓ 30-Day Free Trial</span>
          </div>
        </div>
      </div>
    </section>
  );
}
