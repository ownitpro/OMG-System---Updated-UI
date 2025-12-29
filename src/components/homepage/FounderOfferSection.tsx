"use client";

import { useState, useEffect } from "react";
import { 
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const offer = {
  title: "Limited Time: Founder's Special Offer",
  subtitle: "Get your automation strategy call with our founder",
  description: "Book a free 30-minute strategy call with our founder to get personalized automation recommendations for your business.",
  price: "Free",
  originalPrice: "$500",
  features: [
    "30-minute one-on-one strategy call",
    "Custom automation roadmap",
    "ROI projections for your business",
    "Implementation timeline",
    "Priority support access"
  ],
  cta: "Book Your Free Call",
  href: "/contact",
  urgency: "Only 10 spots available this month"
};

const testimonials = [
  {
    name: "",
    company: "",
    quote: "The founder's call was incredibly valuable. We got a clear roadmap for our automation strategy.",
    rating: 5
  },
  {
    name: "",
    company: "", 
    quote: "Best 30 minutes I've spent on my business. The insights were game-changing.",
    rating: 5
  },
  {
    name: "",
    company: "",
    quote: "The personalized approach made all the difference. Highly recommend!",
    rating: 5
  }
];

export default function HomepageFounderOfferSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-[#0f172a] text-white overflow-hidden">
      {/* Smooth gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a] via-30% to-[#0f172a]" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#47BD79] text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg shadow-[#47BD79]/30">
            {offer.urgency}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {offer.title}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {offer.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Offer Details */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-[#A855F7]/20" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.15)' }}>
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-5xl font-bold text-[#47BD79]">
                    {offer.price}
                  </span>
                  <span className="text-2xl text-white/40 line-through">
                    {offer.originalPrice}
                  </span>
                </div>
                <p className="text-white/70">
                  {offer.subtitle}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {offer.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-[#47BD79] flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Timer */}
              <div className="bg-[#A855F7]/10 rounded-2xl p-6 mb-8 border border-[#A855F7]/20">
                <div className="text-center mb-4">
                  <ClockIcon className="w-8 h-8 text-[#A855F7] mx-auto mb-2" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Limited Time Offer</h3>
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#A855F7]">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/60">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#A855F7]">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/60">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#A855F7]">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-white/60">Seconds</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={offer.href}
                className="w-full bg-[#47BD79] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#3da86a] transition-all duration-600 ease-premium-out flex items-center justify-center group shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)]"
              >
                {offer.cta}
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-8 text-center text-white">
              What Business Owners Say
            </h3>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#A855F7]/30 transition-all duration-400 ease-premium-out"
                >
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-[#A855F7] fill-current" />
                    ))}
                  </div>
                  <p className="text-white/70 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#A855F7]/20 rounded-full flex items-center justify-center border border-[#A855F7]/30">
                      <UserIcon className="w-6 h-6 text-[#A855F7]" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-white/50 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-4 text-center text-white">
                Want to reach us directly?
              </h4>
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="w-5 h-5 text-[#47BD79]" />
                  <span className="text-white/80 font-semibold">Contact@omgsystems.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
