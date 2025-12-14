"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function PricingCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
          <h2 className="text-3xl font-extrabold mb-6">
            Ready to turn your data into growth?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Get started with Industry IQ and unlock the power of AI-driven business intelligence
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <Link href="/apps/demo">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <Link href="/contact-sales">Request Demo</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center text-emerald-200">
            <CheckIcon className="h-5 w-5 mr-2" />
            <span className="text-sm">Included in OMGsystems Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
}
