"use client";

import { 
  LightbulbIcon,
  VideoCameraIcon,
  ChartBarIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  ChartPieIcon
} from "@heroicons/react/24/outline";

const processSteps = [
  {
    id: 1,
    title: "Strategy & Audience Discovery",
    description: "We dig deep into your ideal client, industry players, and messaging.",
    benefit: "We target the right people — not just anyone.",
    icon: LightbulbIcon,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Video & Creative Production",
    description: "We produce thumb-stopping video ads and compelling visuals.",
    benefit: "Video captures attention faster than any static post.",
    icon: VideoCameraIcon,
    color: "text-purple-600"
  },
  {
    id: 3,
    title: "Meta Lead Campaigns",
    description: "We run Facebook & Instagram lead campaigns with optimised forms.",
    benefit: "High-conversion lead capture — no redirect friction.",
    icon: ChartBarIcon,
    color: "text-emerald-600"
  },
  {
    id: 4,
    title: "Instant CRM Integration & Follow-Up",
    description: "Leads flow directly into your CRM; auto-response emails or SMS get sent immediately; follow-up tasks are created.",
    benefit: "No lead gets lost. You respond while interest is high.",
    icon: ArrowPathIcon,
    color: "text-indigo-600"
  },
  {
    id: 5,
    title: "Nurture & Retarget Funnels",
    description: "Automated email/SMS sequences + ad retargeting keep leads engaged until they're ready.",
    benefit: "You don't have to chase — the system moves prospects forward.",
    icon: EnvelopeIcon,
    color: "text-orange-600"
  },
  {
    id: 6,
    title: "Tracking, Optimization & Scale",
    description: "We monitor every campaign, feed conversion data back to Meta, and allocate budget to what's working best.",
    benefit: "You know exactly which campaigns generate revenue — so you can scale safely.",
    icon: ChartPieIcon,
    color: "text-red-600"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works — The Six-Step Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven process transforms your marketing from chaotic to predictable, one step at a time.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500">Step {step.id}</div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What Happens:</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-emerald-800 mb-2">Why It Matters:</h4>
                      <p className="text-emerald-700">{step.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Arrow */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's build your predictable lead machine together. Book your strategy call and see how we can transform your marketing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact-sales" 
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Book Your Strategy Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
