"use client";

import { useState, useEffect } from "react";
import {
  SparklesIcon,
  RocketLaunchIcon,
  PlayIcon,
  CpuChipIcon,
  ClockIcon,
  UserGroupIcon,
  BoltIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: idle, 1: human gives task, 2: robot working, 3: loading, 4: completion, 5: human reaction

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 6);
    }, 2000); // Doubled the speed from 4000ms to 2000ms
    return () => clearInterval(interval);
  }, []);

  const handleHireAgent = () => {
    // Track interaction
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ai_agent_cta_click", {
        event_category: "AI Agents",
        event_label: "Hire Your Agent - Scroll to Form",
      });
    }
    // Scroll to the AI Agent form section
    document.getElementById("ai-agent-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeUseCases = () => {
    // Track interaction
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ai_agent_cta_click", {
        event_category: "AI Agents",
        event_label: "See Real AI Agent Use-Cases",
      });
    }
    // Scroll to case studies section
    document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute inset-0 chess-grid translate-y-[-50%] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
              <CpuChipIcon className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Autonomous Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Meet Your <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-violet-400 bg-clip-text text-transparent italic">Digital Teammate</span>
            </h1>

            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
              AI Agents that work while you sleep. We architect and launch custom autonomous staff that capture leads, automate tasks, and handle decisions at scale 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
              <button
                onClick={handleHireAgent}
                className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:scale-105"
              >
                Hire Your Agent
                <RocketLaunchIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleSeeUseCases}
                className="inline-flex items-center justify-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
              >
                Explore Use Cases
              </button>
            </div>

            {/* Quick Benefits Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 border-t border-white/10 pt-10">
              <div className="flex items-center space-x-3 text-white/80 transition-colors hover:text-white">
                <ClockIcon className="w-6 h-6 text-purple-400" />
                <span className="text-sm font-medium">24/7 Autopilot</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 transition-colors hover:text-white">
                <CpuChipIcon className="w-6 h-6 text-blue-400" />
                <span className="text-sm font-medium">Native Integration</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 transition-colors hover:text-white">
                <UserGroupIcon className="w-6 h-6 text-violet-400" />
                <span className="text-sm font-medium">Scale Without Hiring</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animated AI Agent Scene */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* LunaBox Animation Container */}
                <div className="w-full h-full relative flex items-center justify-center">

                  {/* Human Character */}
                  <div className={`absolute left-8 transition-all duration-1000 ${animationPhase === 0 ? 'translate-y-0 opacity-100' :
                    animationPhase === 1 ? 'translate-y-0 opacity-100 animate-humanPoint' :
                      animationPhase === 2 ? 'translate-y-0 opacity-100' :
                        animationPhase === 3 ? 'translate-y-0 opacity-100' :
                          animationPhase === 4 ? 'translate-y-0 opacity-100' :
                            animationPhase === 5 ? 'translate-y-0 opacity-100 animate-humanSurprise' :
                              'translate-y-0 opacity-100'
                    }`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">👤</span>
                    </div>
                    {/* Human Expression */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                      <span className="text-sm">
                        {animationPhase === 1 ? '👆' :
                          animationPhase === 5 ? '😲' : '😊'}
                      </span>
                    </div>
                  </div>

                  {/* Task/Work Item */}
                  <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${animationPhase === 1 ? 'translate-y-0 opacity-100 scale-100' :
                    animationPhase === 2 ? 'translate-y-8 opacity-100 scale-90' :
                      animationPhase === 3 ? 'translate-y-12 opacity-100 scale-80' :
                        animationPhase === 4 ? 'translate-y-16 opacity-100 scale-70' :
                          'translate-y-0 opacity-0 scale-100'
                    }`}>
                    <div className="bg-white/90 rounded-lg p-3 shadow-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-sm">📋</span>
                      </div>
                    </div>
                  </div>

                  {/* Robot Character */}
                  <div className={`absolute right-8 transition-all duration-500 ${animationPhase === 0 ? 'translate-y-0 opacity-100 scale-100' :
                    animationPhase === 1 ? 'translate-y-0 opacity-100 scale-100' :
                      animationPhase === 2 ? 'translate-y-0 opacity-100 scale-110 animate-robotWork' :
                        animationPhase === 3 ? 'translate-y-0 opacity-100 scale-110 animate-robotWork' :
                          animationPhase === 4 ? 'translate-y-0 opacity-100 scale-100' :
                            'translate-y-0 opacity-100 scale-100'
                    }`}>
                    <div className={`w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${animationPhase === 2 || animationPhase === 3 ? 'animate-pulse shadow-emerald-500/50 animate-spin' : ''
                      }`}>
                      <CpuChipIcon className="w-8 h-8 text-white" />
                    </div>
                    {/* Robot Expression */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-300 rounded-full flex items-center justify-center">
                      <span className="text-sm">
                        {animationPhase === 2 || animationPhase === 3 ? '⚡' :
                          animationPhase === 4 ? '✅' : '😊'}
                      </span>
                    </div>
                    {/* Speed Lines for Fast Movement */}
                    {animationPhase === 2 || animationPhase === 3 ? (
                      <>
                        <div className="absolute -left-4 top-2 w-8 h-1 bg-emerald-400 rounded-full animate-speedLine"></div>
                        <div className="absolute -left-6 top-4 w-6 h-1 bg-blue-400 rounded-full animate-speedLine delay-100"></div>
                        <div className="absolute -left-5 top-6 w-7 h-1 bg-cyan-400 rounded-full animate-speedLine delay-200"></div>
                      </>
                    ) : null}
                  </div>

                  {/* Loading/Charging Animation */}
                  {animationPhase === 3 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="flex flex-col items-center space-y-2">
                        {/* Multiple Task Processing */}
                        <div className="flex space-x-2 mb-2">
                          <div className="w-6 h-6 bg-emerald-400 rounded flex items-center justify-center animate-bounce">
                            <span className="text-white text-xs">📊</span>
                          </div>
                          <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center animate-bounce delay-100">
                            <span className="text-white text-xs">📧</span>
                          </div>
                          <div className="w-6 h-6 bg-purple-400 rounded flex items-center justify-center animate-bounce delay-200">
                            <span className="text-white text-xs">📈</span>
                          </div>
                        </div>
                        {/* Battery Charging */}
                        <div className="w-20 h-8 bg-gray-700 rounded-lg border-2 border-gray-600 relative overflow-hidden">
                          <div className="absolute inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded animate-batteryCharge">
                            <div className="w-full h-full bg-gradient-to-r from-emerald-300 to-blue-300 rounded animate-batteryCharge"></div>
                          </div>
                          <div className="absolute -right-1 top-1 w-1 h-6 bg-gray-600 rounded"></div>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-batteryCharge"></div>
                        </div>
                        {/* Lightning Effects */}
                        <div className="flex space-x-1">
                          <BoltIcon className="w-4 h-4 text-yellow-400 animate-lightningFlash" />
                          <BoltIcon className="w-4 h-4 text-yellow-400 animate-lightningFlash delay-100" />
                          <BoltIcon className="w-4 h-4 text-yellow-400 animate-lightningFlash delay-200" />
                        </div>
                        {/* Speed Indicator */}
                        <div className="text-xs text-emerald-300 font-bold animate-pulse">
                          PROCESSING AT 10X SPEED
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Completion Checkmark */}
                  {animationPhase === 4 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-successPop">
                        <CheckCircleIcon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Floating Success Elements */}
                  {animationPhase === 4 && (
                    <>
                      <div className="absolute top-8 right-8 w-6 h-6 bg-emerald-400 rounded-full animate-bounce">
                        <span className="text-white text-xs">✨</span>
                      </div>
                      <div className="absolute bottom-8 left-12 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-200">
                        <span className="text-white text-xs">🎉</span>
                      </div>
                      <div className="absolute top-12 left-16 w-5 h-5 bg-purple-400 rounded-full animate-bounce delay-500">
                        <span className="text-white text-xs">🚀</span>
                      </div>
                    </>
                  )}

                  {/* Task Completion Display */}
                  {animationPhase === 4 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 rounded-lg p-2 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-gray-800">Task Complete!</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Animation Status Indicator */}
            <div className="mt-6 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${animationPhase === 0 ? 'bg-gray-400' : 'bg-emerald-400 animate-pulse'
                  }`}></div>
                <span>Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${animationPhase === 2 || animationPhase === 3 ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                <span>Working</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${animationPhase === 4 ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                <span>Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}