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
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            {offer.urgency}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {offer.title}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {offer.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Offer Details */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-5xl font-bold text-yellow-400">
                    {offer.price}
                  </span>
                  <span className="text-2xl text-gray-300 line-through">
                    {offer.originalPrice}
                  </span>
                </div>
                <p className="text-blue-100">
                  {offer.subtitle}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {offer.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Timer */}
              <div className="bg-white/10 rounded-2xl p-6 mb-8">
                <div className="text-center mb-4">
                  <ClockIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold mb-2">Limited Time Offer</h3>
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-blue-100">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-blue-100">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-blue-100">Seconds</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={offer.href}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 flex items-center justify-center group"
              >
                {offer.cta}
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side - Testimonials */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-8 text-center">
              What Business Owners Say
            </h3>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-blue-200 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold mb-4 text-center">
                Want to reach us directly?
              </h4>
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">Contact@omgsystems.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
