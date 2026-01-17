"use client";

import {
  DocumentTextIcon,
  VideoCameraIcon,
  ChartBarIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  ChartPieIcon,
  PaintBrushIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

const deliverables = [
  {
    id: 1,
    title: "Complete Targeting & Messaging Blueprint",
    description: "Detailed strategy document with audience insights, messaging frameworks, and positioning guidelines.",
    icon: DocumentTextIcon,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "3–5 High-Converting Video Ad Creatives",
    description: "Professional video ads designed to stop the scroll and capture attention in your target market.",
    icon: VideoCameraIcon,
    color: "text-purple-600"
  },
  {
    id: 3,
    title: "Fully Built & Launched Meta Lead Campaigns",
    description: "Complete Facebook and Instagram campaigns optimized for lead generation with proper tracking.",
    icon: ChartBarIcon,
    color: "text-emerald-600"
  },
  {
    id: 4,
    title: "LeadFlow Engine™ Setup",
    description: "Complete ad → capture → CRM integration with automated workflows and follow-up sequences.",
    icon: ArrowPathIcon,
    color: "text-indigo-600"
  },
  {
    id: 5,
    title: "Automated Nurture Email/SMS Sequences",
    description: "Multi-touch nurture campaigns that keep leads engaged until they're ready to buy.",
    icon: EnvelopeIcon,
    color: "text-orange-600"
  },
  {
    id: 6,
    title: "Retargeting Funnels & Control Flows",
    description: "Advanced retargeting campaigns to re-engage website visitors and past leads.",
    icon: ChartPieIcon,
    color: "text-red-600"
  },
  {
    id: 7,
    title: "Live Dashboard & ROI Reporting",
    description: "Real-time analytics dashboard showing campaign performance, lead quality, and revenue attribution.",
    icon: ChartPieIcon,
    color: "text-teal-600"
  },
  {
    id: 8,
    title: "Ongoing Campaign Optimization & Scaling Strategy",
    description: "Continuous optimization plan with scaling strategies to grow your lead volume profitably.",
    icon: ArrowPathIcon,
    color: "text-cyan-600"
  },
  {
    id: 9,
    title: "Branding Support & Visual Assets",
    description: "Optional: Logo design, brand guidelines, and visual assets to strengthen your market presence.",
    icon: PaintBrushIcon,
    color: "text-pink-600"
  },
  {
    id: 10,
    title: "Landing Pages",
    description: "Optional: Custom landing pages designed to convert your specific audience with high-converting forms.",
    icon: GlobeAltIcon,
    color: "text-green-600"
  }
];

export default function DeliverablesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You Get (Deliverables)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            When you partner with us, here's what you walk away with. Everything you need to generate consistent, high-quality leads.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliverables.map((deliverable, index) => (
            <div
              key={deliverable.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <deliverable.icon className={`w-6 h-6 ${deliverable.color}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {deliverable.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {deliverable.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Complete System, Not Just Campaigns
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Unlike other agencies that just run ads, we build you a complete lead generation system.
              Everything works together to deliver consistent results, month after month.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartBarIcon className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Strategic Foundation</h4>
                <p className="text-gray-600 text-sm">Research-driven targeting and messaging</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowPathIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Automated Execution</h4>
                <p className="text-gray-600 text-sm">Hands-off lead generation and nurturing</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartPieIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Continuous Optimization</h4>
                <p className="text-gray-600 text-sm">Data-driven improvements and scaling</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/industries#lead-form"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Get Your Complete System
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
