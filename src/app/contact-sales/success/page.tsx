"use client";

import React from "react";
import Link from "next/link";
import { CheckCircleIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function ContactSalesSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircleIcon className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-5xl font-bold mb-6">Thank You!</h1>
        <p className="text-2xl text-green-100 mb-8">
          We've received your request and our sales team will contact you within 24-48 hours.
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">What happens next?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Initial Review</h3>
                  <p className="text-green-100 text-sm">Our sales team will review your requirements and business needs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Personalized Consultation</h3>
                  <p className="text-green-100 text-sm">We'll schedule a call to discuss your specific challenges and goals.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Custom Solution</h3>
                  <p className="text-green-100 text-sm">We'll design a tailored solution that fits your business perfectly.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Implementation & Support</h3>
                  <p className="text-green-100 text-sm">We'll guide you through setup and provide ongoing support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Need immediate assistance?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:Contact@omgsystems.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Contact@omgsystems.com
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Call Us Directly
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/demos"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Try Live Demos
          </Link>
        </div>
      </div>
    </main>
  );
}
