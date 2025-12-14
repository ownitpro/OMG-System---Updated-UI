import React from "react";
import { Container } from '@/components/layout/container';
import { 
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

interface PainCard {
  title: string;
  problem: string;
  solution: string;
  iconName: string;
}

interface PainGridProps {
  painCards: PainCard[];
}

const iconMap = {
  'lead-capture': ExclamationTriangleIcon,
  'calendar': CalendarDaysIcon,
  'document': DocumentTextIcon,
  'communication': ChatBubbleLeftRightIcon,
  'growth': ArrowTrendingUpIcon,
  'marketing': MegaphoneIcon,
};

export function PainGrid({ painCards }: PainGridProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Real Estate Pain Points We Solve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every real estate professional faces these challenges. We turn them into competitive advantages.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {painCards.map((pain, index) => {
            const IconComponent = iconMap[pain.iconName as keyof typeof iconMap] || ExclamationTriangleIcon;
            
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Pain: {pain.title}
                    </h3>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {pain.problem}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-green-800 font-medium text-sm">
                    <span className="font-semibold">We solve it by:</span> {pain.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary CTA */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to eliminate these pain points?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our Real Estate Suite addresses each of these challenges with proven automation and workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/book-demo" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                See How It Works
              </a>
              <a 
                href="#modules" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Our Modules
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
