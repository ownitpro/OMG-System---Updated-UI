"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  SparklesIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-lime-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Limited Offer Banner */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-8">
            <SparklesIcon className="w-5 h-5 mr-2" />
            <span className="font-semibold">Limited Founder's Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            First 10 AI Agents at 
            <span className="block text-yellow-300">Introductory Pricing</span>
          </h2>
          
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            Join the early adopters and get your custom AI Agent at a special founder's rate. 
            Limited time offer for the first 10 businesses.
          </p>
        </div>

        {/* Value Proposition Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <ClockIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">24/7 Operations</h3>
            <p className="text-emerald-100">
              Your AI Agent never sleeps, never takes breaks, and works around the clock to serve your customers.
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <SparklesIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Scalable Growth</h3>
            <p className="text-emerald-100">
              Handle 10x more customers without hiring 10x more staff. Scale your business intelligently.
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <ShieldCheckIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Secure & Reliable</h3>
            <p className="text-emerald-100">
              Enterprise-grade security with 99.9% uptime. Your data is safe and your operations are protected.
            </p>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Founder's Pricing vs. Regular Pricing
            </h3>
            <p className="text-emerald-100">
              Lock in special pricing for life with our limited founder's offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/20 rounded-2xl p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Founder's Price</h4>
                <div className="text-3xl font-bold text-yellow-300 mb-2">$2,500</div>
                <p className="text-emerald-100 text-sm mb-4">One-time setup</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-300 mr-2" />
                    <span className="text-sm">Custom AI Agent development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-300 mr-2" />
                    <span className="text-sm">3 months monitoring & optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-300 mr-2" />
                    <span className="text-sm">Unlimited integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-300 mr-2" />
                    <span className="text-sm">Lifetime support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Regular Price</h4>
                <div className="text-3xl font-bold text-white mb-2">$5,000+</div>
                <p className="text-emerald-100 text-sm mb-4">Starting price</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-white mr-2" />
                    <span className="text-sm">Custom AI Agent development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-white mr-2" />
                    <span className="text-sm">1 month monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-white mr-2" />
                    <span className="text-sm">Basic integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-white mr-2" />
                    <span className="text-sm">Standard support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Transform Your Business?
          </h3>
          
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join the AI revolution and get your custom AI Agent at founder's pricing. 
            Only 10 spots available at this special rate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <a href="#offer">
                Request Your Agent Now
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <div className="text-center sm:text-left">
              <p className="text-sm text-emerald-200">
                <strong>7 spots remaining</strong> at founder's pricing
              </p>
              <p className="text-xs text-emerald-300">
                Regular pricing applies after 10 agents
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 pt-8 border-t border-white/20 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <p className="text-emerald-200 mb-6">
              Trusted by businesses across industries
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium">Property Management</div>
              <div className="text-sm font-medium">Real Estate</div>
              <div className="text-sm font-medium">Contractors</div>
              <div className="text-sm font-medium">Healthcare</div>
              <div className="text-sm font-medium">Accounting</div>
              <div className="text-sm font-medium">Cleaning Services</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
