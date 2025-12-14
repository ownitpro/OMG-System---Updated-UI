"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface TestimonialSliderProps {
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    industry: string;
    photo: string;
  }>;
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Members Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from community members who are transforming their businesses with automation.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center">
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-gray-900 mb-8 leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center overflow-hidden">
                  {currentTestimonial.photo ? (
                    <img
                      src={currentTestimonial.photo}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                      {currentTestimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {currentTestimonial.role}
                  </div>
                  <div className="text-blue-600 text-sm font-medium">
                    {currentTestimonial.industry}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href="/community/stories"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Share Your Own Story
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
