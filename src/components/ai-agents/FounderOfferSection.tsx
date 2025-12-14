"use client";

import { useState, useEffect } from "react";
import { 
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  RocketLaunchIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function FounderOfferSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [spotsLeft, setSpotsLeft] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = () => {
    // Track offer claim
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "founder_offer_claim", {
        event_category: "AI Agents",
        event_label: "Founder's Offer Claimed",
        value: 2500
      });
    }
    
    // Scroll to quote form
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Custom AI Agent development",
    "3 months optimization included",
    "Unlimited integrations",
    "Lifetime support",
    "Priority development queue",
    "Direct access to founders"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/images/ai-agents/offer-pattern.svg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-emerald-500/20 rounded-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 font-medium mb-6">
            <StarIcon className="w-4 h-4 mr-2" />
            Limited-Time Founder's Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            First 10 Businesses Get Special Pricing
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Exclusive pricing for early adopters
          </p>
        </div>

        {/* Offer Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Popular Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Founder's Special
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8 pt-4">
            <div className="flex items-center justify-center mb-4">
              <div className="text-5xl font-bold text-white mr-4">$2,500</div>
              <div className="text-gray-400 line-through text-xl">$5,000+</div>
            </div>
            <p className="text-gray-300 text-lg mb-2">One-time setup</p>
            <p className="text-gray-400 text-sm">Regular pricing applies after that</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Spots Left */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 font-medium">
              <ClockIcon className="w-4 h-4 mr-2" />
              Only {spotsLeft} spots remaining
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleClaimOffer}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Request Your Agent Now – Get the Founder's Offer
            </button>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            This offer is only available for the first 10 businesses. Regular pricing of $5,000+ applies after that.
          </p>
        </div>
      </div>
    </section>
  );
}


