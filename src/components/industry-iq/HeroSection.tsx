"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChartBarIcon, 
  BuildingOfficeIcon, 
  MapPinIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const industryUpdates = [
    {
      id: 1,
      message: "Yesterday: 900 properties sold",
      icon: HomeIcon,
      color: "emerald",
      delay: 0
    },
    {
      id: 2,
      message: "800 new listings this week",
      icon: BuildingOfficeIcon,
      color: "blue",
      delay: 2000
    },
    {
      id: 3,
      message: "Interest rates trending upward",
      icon: ArrowTrendingUpIcon,
      color: "yellow",
      delay: 4000
    },
    {
      id: 4,
      message: "Market insights for your area",
      icon: MapPinIcon,
      color: "purple",
      delay: 6000
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % industryUpdates.length);
        setIsTyping(false);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Live TV Segment Animation Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Main Message */}
          <div className="text-white animate-in slide-in-from-left duration-1000 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-violet-400 font-semibold text-lg">Industry IQ</span>
            </div>
            
            <h1 className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-violet-100 to-purple-200 bg-clip-text text-transparent" style={{fontSize: "clamp(2.5rem, 5vw, 4.5rem)"}}>
              Real-Time Industry
              <br />
              <span className="text-violet-400">Intelligence</span>
            </h1>
            
            <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{fontSize: "clamp(1rem, 2vw, 1.25rem)"}}>
              Get instant, actionable insights about your industry. Market trends, competitor analysis, and real-time data that drives decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in slide-in-from-left duration-1000 delay-300">
              <Link
                href="/try-live-demo?product=industry-iq"
                className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-slate-900 bg-gradient-to-r from-violet-400 to-purple-400 hover:from-violet-300 hover:to-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 transform ${
                  isHovered ? "scale-105 shadow-2xl" : "shadow-xl"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="mr-2">Try Live Demo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Start Free Trial
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 animate-in slide-in-from-left duration-1000 delay-500">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></div>
                Real-time data
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" style={{animationDelay: "0.5s"}}></div>
                AI-powered insights
              </div>
            </div>
          </div>
          
          {/* Right Content - Live TV Segment Animation */}
          <div className="relative animate-in slide-in-from-right duration-1000 delay-200">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              
              {/* Live TV Segment Container */}
              <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl relative overflow-hidden">
                
                {/* TV Studio Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800"></div>
                
                {/* Person with Smartphone */}
                <div className="absolute bottom-4 left-4 w-16 h-24 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-2xl rounded-b-lg animate-typing">
                  {/* Person silhouette */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-white/10 rounded-lg"></div>
                  
                  {/* Smartphone */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-10 bg-black rounded-lg shadow-lg">
                    <div className="w-full h-2 bg-white/30 rounded-t-lg"></div>
                    <div className="p-1">
                      <div className="w-full h-1 bg-white/20 rounded mb-1"></div>
                      <div className="w-3/4 h-1 bg-white/20 rounded mb-1"></div>
                      <div className="w-1/2 h-1 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Typing indicator */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                {/* Incoming Messages Panel */}
                <div className="absolute top-4 right-4 w-48 h-80 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                  
                  {/* Message Header */}
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-3 text-white text-sm font-semibold">
                    Industry Updates
                  </div>
                  
                  {/* Messages Container */}
                  <div className="p-3 space-y-3 h-full overflow-y-auto">
                    {industryUpdates.map((update, index) => (
                      <div
                        key={update.id}
                        className={`bg-white/10 rounded-lg p-3 border border-white/20 transition-all duration-500 ${
                          currentMessage === index ? 'scale-105 bg-white/20 shadow-lg' : 'opacity-70'
                        }`}
                        style={{
                          animationDelay: `${update.delay}ms`,
                          animation: currentMessage === index ? 'messageSlideIn 0.5s ease-out' : 'none'
                        }}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-6 h-6 bg-${update.color}-500 rounded-full flex items-center justify-center mr-2`}>
                            {React.createElement(update.icon, { className: "w-3 h-3 text-white" })}
                          </div>
                          <span className="text-white text-xs font-medium">Live Update</span>
                        </div>
                        <p className="text-white text-sm">{update.message}</p>
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-green-400 text-xs">Just now</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Market Charts Overlay */}
                <div className="absolute top-4 left-20 w-32 h-20 bg-white/5 rounded-lg border border-white/20 p-2">
                  <div className="text-white text-xs font-semibold mb-1">Market Trends</div>
                  <div className="flex items-end space-x-1 h-12">
                    <div className="w-2 bg-violet-400 rounded-t" style={{height: '60%'}}></div>
                    <div className="w-2 bg-violet-400 rounded-t" style={{height: '80%'}}></div>
                    <div className="w-2 bg-violet-400 rounded-t" style={{height: '45%'}}></div>
                    <div className="w-2 bg-violet-400 rounded-t" style={{height: '90%'}}></div>
                    <div className="w-2 bg-violet-400 rounded-t" style={{height: '70%'}}></div>
                  </div>
                </div>
                
                {/* News Banner */}
                <div className="absolute bottom-4 right-4 left-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg p-2 border border-violet-400/30">
                  <div className="flex items-center text-white text-xs">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="font-semibold">LIVE</span>
                    <span className="ml-2">Industry Intelligence Active</span>
                  </div>
                </div>
                
                {/* Floating Data Points */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              
              {/* Animation Description */}
              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm font-medium">Live Industry Intelligence</p>
                <p className="text-white/60 text-xs mt-1">Real-time updates & market insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}