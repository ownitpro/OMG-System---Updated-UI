"use client";

import { StarIcon, SparklesIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    quote: "We got 20 qualified leads in 7 days; the ad spend paid for itself.",
    author: "Sarah Johnson",
    title: "Property Manager",
    company: "Metro Properties",
    avatar: "SJ"
  },
  {
    quote: "Our response time dropped from days to minutes.",
    author: "Michael Chen",
    title: "Managing Partner",
    company: "Healthcare Solutions",
    avatar: "MC"
  },
  {
    quote: "The automation features saved us 15 hours per week on admin tasks.",
    author: "Emily Rodriguez",
    title: "Operations Director",
    company: "CleanPro Services",
    avatar: "ER"
  }
];

const badges = [
  {
    metric: "3× ROI",
    description: "Average return on investment",
    color: "text-emerald-500"
  },
  {
    metric: "60% less",
    description: "admin time",
    color: "text-blue-500"
  },
  {
    metric: "20+",
    description: "industries served",
    color: "text-purple-500"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            What our clients say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real businesses using OMGsystems
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg italic text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-6 rounded-lg border-2 border-gray-200 bg-white shadow-sm">
              <SparklesIcon className={`h-10 w-10 ${badge.color} mb-2`} />
              <p className="text-3xl font-bold text-gray-900">{badge.metric}</p>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Company logos placeholder */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Company A</div>
            <div className="text-2xl font-bold text-gray-400">Company B</div>
            <div className="text-2xl font-bold text-gray-400">Company C</div>
            <div className="text-2xl font-bold text-gray-400">Company D</div>
            <div className="text-2xl font-bold text-gray-400">Company E</div>
          </div>
        </div>
      </div>
    </section>
  );
}
