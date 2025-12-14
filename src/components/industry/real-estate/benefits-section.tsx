import React from "react";
import { Container } from '@/components/layout/container';
import { 
  ClockIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

interface Benefit {
  title: string;
  subtitle: string;
  iconName: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const iconMap = {
  'speed': ClockIcon,
  'efficiency': DocumentTextIcon,
  'reminder': CalendarDaysIcon,
  'loyalty': HeartIcon,
  'insight': ChartBarIcon,
  'scale': ArrowTrendingUpIcon,
};

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results for Real Estate Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the measurable impact our Real Estate Suite delivers for agents and brokerages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName as keyof typeof iconMap] || ClockIcon;
            
            return (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.subtitle}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Statistics Section */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Proven Performance Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5x</div>
                <div className="text-sm text-gray-600">Faster Lead Response</div>
                <div className="text-xs text-gray-500 mt-1">Average response time: 2 minutes vs 10 minutes</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50%</div>
                <div className="text-sm text-gray-600">Less Paperwork Time</div>
                <div className="text-xs text-gray-500 mt-1">Auto-filled contracts and e-signature</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
                <div className="text-sm text-gray-600">Fewer No-Shows</div>
                <div className="text-xs text-gray-500 mt-1">Automated reminders and confirmations</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">3x</div>
                <div className="text-sm text-gray-600">More Referrals</div>
                <div className="text-xs text-gray-500 mt-1">Consistent post-close nurture</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* ROI Calculator Teaser */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Calculate Your ROI
            </h3>
            <p className="text-blue-100 mb-6">
              See how much time and money you could save with our Real Estate Suite. 
              Most agents save 10+ hours per week and increase their closing rate by 25%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/roi-calculator" 
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Try Our ROI Calculator
              </a>
              <a 
                href="/book-demo" 
                className="inline-flex items-center px-6 py-3 border border-blue-300 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
