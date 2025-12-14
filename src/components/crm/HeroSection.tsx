"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function HeroSection() {
  const router = useRouter();
  const [currentData, setCurrentData] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const crmData = [
    { type: "New Lead", name: "Sarah Johnson", company: "TechCorp", status: "Hot", color: "orange" },
    { type: "Follow-up", name: "Mike Chen", company: "StartupXYZ", status: "Warm", color: "blue" },
    { type: "Meeting", name: "Lisa Davis", company: "Enterprise Inc", status: "Scheduled", color: "green" },
    { type: "Proposal", name: "David Wilson", company: "Global Corp", status: "Review", color: "purple" },
    { type: "Close", name: "Emma Brown", company: "Local Business", status: "Ready", color: "pink" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentData((prev) => (prev + 1) % crmData.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [crmData.length]);

  const handleDemoClick = () => {
    router.push("/try-live-demo?industry=crm");
  };

  const handleContactSales = () => {
    router.push("/contact");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-teal-400 font-semibold text-lg">CRM System</span>
            </div>
            
            <h1 className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-teal-100 to-cyan-200 bg-clip-text text-transparent" style={{fontSize: "clamp(2.5rem, 5vw, 4.5rem)"}}>
          CRM for Business Growth & Efficiency
        </h1>
        
            <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{fontSize: "clamp(1rem, 2vw, 1.25rem)"}}>
              Unify your leads, clients & documents — built for real industries to drive growth and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in slide-in-from-left duration-1000 delay-300">
              <button
                onClick={handleDemoClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105"
              >
                <BoltIcon className="w-5 h-5 mr-2" />
                Try a Live Demo
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleContactSales}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-200 text-teal-200 font-semibold rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-gray-300">Real-time updates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-gray-300">Smart automation</span>
              </div>
            </div>
          </div>

          {/* Right Content - CRM Simulation Animation */}
          <div className="relative animate-in slide-in-from-right duration-1000 delay-200">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* CRM Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                    <UserGroupIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold">CRM Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              {/* CRM Data Flow Animation */}
              <div className="space-y-4">
                {crmData.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white/10 rounded-lg p-4 border border-white/20 transition-all duration-500 ${
                      currentData === index && isAnimating 
                        ? 'scale-105 bg-white/20 shadow-lg' 
                        : 'opacity-70'
                    }`}
                    style={{
                      animation: currentData === index && isAnimating ? 'crmSlideIn 0.5s ease-out' : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 bg-${item.color}-500 rounded-lg flex items-center justify-center mr-3`}>
                          <UserGroupIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{item.name}</div>
                          <div className="text-gray-300 text-sm">{item.company}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-${item.color}-400 text-sm font-medium`}>{item.status}</div>
                        <div className="text-gray-400 text-xs">{item.type}</div>
                      </div>
                    </div>
                    
                    {/* Action Icons */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                      <div className="flex space-x-3">
                        <PhoneIcon className="w-4 h-4 text-gray-400" />
                        <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      {currentData === index && isAnimating && (
                        <CheckCircleIcon className="w-5 h-5 text-green-400 animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CRM Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">127</div>
                  <div className="text-gray-400 text-sm">Active Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">23</div>
                  <div className="text-gray-400 text-sm">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">89%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
          </div>

              {/* Floating Data Elements */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-teal-400 rounded-full animate-bounce opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{animationDelay: "0.5s"}}></div>
          </div>
            
            {/* Animation Description */}
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm font-medium">Live CRM Activity</p>
              <p className="text-white/60 text-xs mt-1">Real-time customer data management</p>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}