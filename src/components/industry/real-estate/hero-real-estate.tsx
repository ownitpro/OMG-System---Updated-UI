import React from "react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { 
  HomeIcon, 
  CalendarDaysIcon, 
  DocumentTextIcon,
  CheckIcon,
  ArrowRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface HeroRealEstateProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  microBenefits: string[];
}

export function HeroRealEstate({ 
  headline, 
  subheadline, 
  primaryCTA, 
  secondaryCTA, 
  microBenefits 
}: HeroRealEstateProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <Container>
        <div className="relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                <Link href={primaryCTA.href}>
                  {primaryCTA.text}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href={secondaryCTA.href}>
                  {secondaryCTA.text}
                </Link>
              </Button>
            </div>
            
            {/* Micro Benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {microBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual Flow Graphic */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your Real Estate Success Flow</h3>
                <p className="text-gray-600">From first inquiry to closed deal and beyond</p>
              </div>
              
              {/* Flow Steps */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Lead</h4>
                  <p className="text-xs text-gray-600">Capture</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <CalendarDaysIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Showings</h4>
                  <p className="text-xs text-gray-600">Schedule</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Offers</h4>
                  <p className="text-xs text-gray-600">Generate</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <CheckIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Close</h4>
                  <p className="text-xs text-gray-600">Finalize</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                    <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Nurture</h4>
                  <p className="text-xs text-gray-600">Follow-up</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                    <HomeIcon className="h-6 w-6 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">Referrals</h4>
                  <p className="text-xs text-gray-600">Grow</p>
                </div>
              </div>
              
              {/* Flow Arrows */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-purple-200 via-orange-200 via-indigo-200 to-pink-200 transform -translate-y-1/2 -z-10"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
