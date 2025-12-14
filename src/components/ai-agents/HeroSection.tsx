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

  const handleStartConversation = () => {
    // Track interaction
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ai_agent_cta_click", {
        event_category: "AI Agents",
        event_label: "Start Your Agent Conversation",
      });
    }
    // Navigate to demo or contact form
    window.location.href = "/try-live-demo?solution=ai-agents";
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Background Image with Transparency */}
        <div className="absolute inset-0 bg-[url('/images/ai-agents/background-for-ai.svg')] bg-cover bg-center opacity-25"></div>
        <div className="absolute inset-0 bg-[url('/images/ai-agents/hero-pattern.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-lg animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-emerald-500/20 rounded-lg animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Meet Your 24/7 Digital Teammate
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                AI Agents That Work While You Sleep
              </p>
            </div>

            {/* Value Proposition */}
            <div className="mb-8">
              <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto lg:mx-0">
                Our team will co-design and launch your custom AI Agent—so you can capture leads, automate tasks, make decisions at scale, and support your business around the clock.
              </p>
              <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto lg:mx-0">
                Spend less time on admin, more time on what matters.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 font-medium">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Build Once. Profit Forever.
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleStartConversation}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Start Your Agent Conversation
              </button>
              <button
                onClick={handleSeeUseCases}
                className="inline-flex items-center justify-center px-8 py-4 border border-emerald-400/30 text-lg font-medium rounded-lg text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                See Real AI Agent Use-Cases
              </button>
            </div>

            {/* Quick Benefits Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-white/80">
                <ClockIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">24/7 Automated Operations</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-white/80">
                <CpuChipIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Custom AI Integration</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-white/80">
                <UserGroupIcon className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Scalable & Profitable</span>
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
                  <div className={`absolute left-8 transition-all duration-1000 ${
                    animationPhase === 0 ? 'translate-y-0 opacity-100' : 
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
                  <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                    animationPhase === 1 ? 'translate-y-0 opacity-100 scale-100' : 
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
                  <div className={`absolute right-8 transition-all duration-500 ${
                    animationPhase === 0 ? 'translate-y-0 opacity-100 scale-100' : 
                    animationPhase === 1 ? 'translate-y-0 opacity-100 scale-100' : 
                    animationPhase === 2 ? 'translate-y-0 opacity-100 scale-110 animate-robotWork' : 
                    animationPhase === 3 ? 'translate-y-0 opacity-100 scale-110 animate-robotWork' : 
                    animationPhase === 4 ? 'translate-y-0 opacity-100 scale-100' : 
                    'translate-y-0 opacity-100 scale-100'
                  }`}>
                    <div className={`w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      animationPhase === 2 || animationPhase === 3 ? 'animate-pulse shadow-emerald-500/50 animate-spin' : ''
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
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  animationPhase === 0 ? 'bg-gray-400' : 'bg-emerald-400 animate-pulse'
                }`}></div>
                <span>Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  animationPhase === 2 || animationPhase === 3 ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span>Working</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  animationPhase === 4 ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'
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