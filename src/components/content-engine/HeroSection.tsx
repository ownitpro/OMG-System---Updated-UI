"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SparklesIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const GENERATION_STEPS = [
  { id: 1, text: "Analyzing brand voice...", icon: "🎯", duration: 1.2 },
  { id: 2, text: "Generating content...", icon: "✍️", duration: 1.5 },
  { id: 3, text: "Optimizing for SEO...", icon: "🔍", duration: 1.0 },
  { id: 4, text: "Formatting output...", icon: "✨", duration: 0.8 },
  { id: 5, text: "Content ready!", icon: "✅", duration: 1.5 }
];

export default function HeroSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const runAnimation = () => {
      setCurrentStep(0);
      setProgress(0);

      let accumulatedTime = 0;

      GENERATION_STEPS.forEach((step, index) => {
        stepTimer = setTimeout(() => {
          setCurrentStep(index);
          setProgress(0);

          // Animate progress bar
          const progressInterval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 100) {
                clearInterval(progressInterval);
                return 100;
              }
              return prev + 5;
            });
          }, step.duration * 10);

        }, accumulatedTime * 1000);

        accumulatedTime += step.duration;
      });

      // Loop the animation
      setTimeout(() => {
        runAnimation();
      }, (accumulatedTime + 1) * 1000);
    };

    runAnimation();

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(progressTimer);
    };
  }, []);

  const currentStepData = GENERATION_STEPS[currentStep];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 chess-grid opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 animate-fade-in shadow-2xl">
              <SparklesIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-200 uppercase tracking-widest">Multi-Format Creator</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.05] tracking-tight">
              The <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent italic">Content Engine</span>
            </h1>

            <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12 font-medium">
              Effortless AI-powered creation for the modern enterprise. Scale your output with intelligent tools that capture your brand's unique voice and adapt instantly to any channel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-14">
              <Link
                href="/try-live-demo?solution=content-engine"
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-105"
              >
                Launch Demo
                <RocketLaunchIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                Start Free Trial
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
              <div className="flex items-center gap-3 transition-opacity hover:opacity-100">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                <span className="text-sm font-bold tracking-tight text-white uppercase">Omni-Channel</span>
              </div>
              <div className="flex items-center gap-3 transition-opacity hover:opacity-100">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="text-sm font-bold tracking-tight text-white uppercase">Brand Aware</span>
              </div>
              <div className="flex items-center gap-3 transition-opacity hover:opacity-100">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <span className="text-sm font-bold tracking-tight text-white uppercase">Auto-Scaling</span>
              </div>
            </div>
          </div>

          {/* Right Content - Compact Animation */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-8">

                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}
                  />
                </div>

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center mb-6"
                    >
                      <div className="text-6xl mb-4">{currentStepData?.icon}</div>
                      <p className="text-white text-lg font-semibold mb-2">{currentStepData?.text}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>

                  {/* Step Counter */}
                  <div className="mt-4 flex justify-center gap-2">
                    {GENERATION_STEPS.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentStep
                            ? 'bg-cyan-400 w-6'
                            : index < currentStep
                              ? 'bg-emerald-400'
                              : 'bg-slate-600'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-500/20 rounded-lg animate-bounce">
                  <div className="w-full h-full bg-white/20 rounded text-xs flex items-center justify-center">📝</div>
                </div>
                <div className="absolute top-8 right-6 w-6 h-6 bg-blue-500/20 rounded-full animate-pulse delay-500">
                  <div className="w-full h-full bg-white/20 rounded-full text-xs flex items-center justify-center">🎨</div>
                </div>
                <div className="absolute bottom-6 left-8 w-4 h-4 bg-purple-500/20 rounded-full animate-bounce delay-1000">
                  <div className="w-full h-full bg-white/20 rounded-full text-xs flex items-center justify-center">🎥</div>
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-500/10 rounded-lg animate-pulse delay-700">
                  <div className="w-full h-full bg-white/20 rounded text-xs flex items-center justify-center">🎧</div>
                </div>
              </div>
            </div>

            {/* Content Creation Steps Indicator */}
            <div className="mt-6 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Write</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Design</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Publish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
