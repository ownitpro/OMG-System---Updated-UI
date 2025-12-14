"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircleIcon,
  SparklesIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export default function SmartAutomationSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/automation/smart-automations');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircleIcon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                <SparklesIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🎉 Automation Deployment Request Submitted!
            </h1>
            <p className="text-xl text-emerald-200 mb-6">
              Thank you for choosing OMGsystems to automate your business processes.
            </p>
            <p className="text-lg text-white/80">
              Your automation deployment request has been successfully submitted and our team is already reviewing your requirements.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">What Happens Next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">Confirmation Email</h3>
                  <p className="text-emerald-200">You'll receive a detailed confirmation email within the next few minutes with your project details and next steps.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">Discovery Call</h3>
                  <p className="text-emerald-200">Our team will contact you within 24 hours to schedule a discovery call and finalize your automation requirements.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <RocketLaunchIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">Automation Development</h3>
                  <p className="text-emerald-200">We'll build and deploy your custom automation according to your specifications and timeline.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <LightBulbIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">Training & Support</h3>
                  <p className="text-emerald-200">You'll receive comprehensive training and ongoing support to ensure your automation runs smoothly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-6 border border-emerald-400/50 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Need Immediate Assistance?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-emerald-200">
                <EnvelopeIcon className="w-4 h-4" />
                <span>Contact@omgsystems.com</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <ClockIcon className="w-4 h-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>

          {/* Auto-redirect Notice */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/20">
            <p className="text-emerald-200 text-sm">
              Redirecting to Smart Automations in <span className="font-semibold text-white">{countdown}</span> seconds...
            </p>
          </div>

          {/* Manual Navigation */}
          <div className="mt-6">
            <button
              onClick={() => router.push('/automation/smart-automations')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span>Return to Smart Automations</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
