"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FinalCTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartDemo = () => {
    // Dispatch custom event to open modal
    window.dispatchEvent(new CustomEvent('openIndustryModal'));
  };

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-700 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
          Build once. Profit forever with OMGsystems.
        </h2>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10">
          Join thousands of businesses already using OMGsystems to streamline their operations and grow faster.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={handleStartDemo}
            className="bg-white hover:bg-gray-100 text-emerald-600 px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Start Your Live Demo
            <ArrowRightIcon className="ml-3 h-6 w-6 inline-block" />
          </Button>
          <Button asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-emerald-600 px-10 py-4 text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <Link href="/contact-sales">
              Contact Sales for Enterprise
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-emerald-100">
          <p>Trusted by 10,000+ businesses worldwide</p>
        </div>
      </div>
    </section>
  );
}
