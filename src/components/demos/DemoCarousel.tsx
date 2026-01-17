"use client";

import { useState, useRef, useEffect } from "react";
import { PlayIcon, ClockIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { LiveDemoTile } from "@/config/try_live_demo_config";

interface DemoCarouselProps {
  demos: LiveDemoTile[];
}

export default function DemoCarousel({ demos }: DemoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  // Handle mouse/touch drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap to nearest card
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(demos.length - 1, newIndex)));
      smoothScrollToIndex(newIndex);
    }
  };

  // Handle mouse/touch drag move
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Multiply by 2 for faster scroll
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Smooth scroll to specific index
  const smoothScrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Navigate to previous card
  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    smoothScrollToIndex(newIndex);
  };

  // Navigate to next card
  const handleNext = () => {
    const newIndex = Math.min(demos.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    smoothScrollToIndex(newIndex);
  };

  // Navigate to specific dot
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    smoothScrollToIndex(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="overflow-x-hidden cursor-grab active:cursor-grabbing scroll-smooth"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onMouseMove={handleDragMove}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={handleDragMove}
      >
        <div className="flex gap-6" style={{ width: `${demos.length * 100}%` }}>
          {demos.map((demo) => (
            <div
              key={demo.id}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / demos.length}% - ${(demos.length - 1) * 24 / demos.length}px)` }}
            >
              <div className="group relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 p-8 h-full flex flex-col">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                {/* Badge Row */}
                <div className="mb-6 flex items-center justify-between gap-2">
                  {demo.badge && (
                    <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 text-xs font-semibold text-cyan-400">
                      {demo.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <ClockIcon className="w-4 h-4 text-teal-400" />
                    <span className="font-medium">~{demo.estTimeMinutes} min</span>
                  </div>
                </div>

                {/* Title + Summary */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {demo.label}
                  </h2>
                  <p className="text-base text-white/60 leading-relaxed">{demo.summary}</p>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {demo.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Ideal For */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-5">
                    <span className="font-semibold text-white">Ideal for:</span>{" "}
                    {demo.idealFor}
                  </p>

                  {/* CTA with Coming Soon */}
                  <div className="flex flex-col gap-3">
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white/40 px-6 py-3 text-sm font-semibold cursor-not-allowed border border-white/10 whitespace-nowrap w-full"
                    >
                      <PlayIcon className="w-4 h-4 flex-shrink-0" />
                      <span>Launch demo</span>
                    </button>
                    <div className="flex justify-center">
                      <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 text-xs font-semibold text-amber-400 whitespace-nowrap">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                        <span>Coming Soon</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`absolute left-2 sm:left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center ${
          currentIndex === 0
            ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-110'
        }`}
        aria-label="Previous demo"
      >
        <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex === demos.length - 1}
        className={`absolute right-2 sm:right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center ${
          currentIndex === demos.length - 1
            ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-110'
        }`}
        aria-label="Next demo"
      >
        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
      </button>

      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {demos.map((demo, index) => (
          <button
            key={demo.id}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-cyan-500'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to ${demo.label}`}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      <div className="text-center mt-6">
        <p className="text-sm text-white/40 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">← Drag to explore →</span>
          <span className="sm:hidden">← Swipe to explore →</span>
        </p>
      </div>
    </div>
  );
}
