"use client";

import { 
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  SpeakerWaveIcon
} from "@heroicons/react/24/outline";

const frustrations = [
  {
    id: 1,
    title: "Inconsistent Lead Flow",
    description: "Some months are great, then nothing — your lead flow is a rollercoaster.",
    icon: ChartBarIcon,
    color: "text-red-600"
  },
  {
    id: 2,
    title: "Low-Quality Leads",
    description: "You get dozens of contacts but most never buy.",
    icon: UserGroupIcon,
    color: "text-orange-600"
  },
  {
    id: 3,
    title: "Slow Follow-Up",
    description: "Leads come in, and by the time you reach out, they've already moved on.",
    icon: ClockIcon,
    color: "text-yellow-600"
  },
  {
    id: 4,
    title: "Manual Chaos",
    description: "You're wrestling spreadsheets, email lists, and missed conversations.",
    icon: ExclamationTriangleIcon,
    color: "text-red-600"
  },
  {
    id: 5,
    title: "Wasted Ad Spend",
    description: "You pour money into ads but don't know which ones are worth it.",
    icon: CurrencyDollarIcon,
    color: "text-purple-600"
  },
  {
    id: 6,
    title: "Generic Messaging",
    description: "Your messaging blends in with competitors — no one notices you.",
    icon: SpeakerWaveIcon,
    color: "text-gray-600"
  }
];

export default function FrustrationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We've Heard This Before
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            If any of these sound familiar, you're not alone. Most businesses struggle with the same lead generation challenges.
          </p>
        </div>

        {/* Frustrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frustrations.map((frustration, index) => (
            <div
              key={frustration.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <frustration.icon className={`w-6 h-6 ${frustration.color}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {frustration.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {frustration.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sound Familiar?
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              These frustrations are costing you time, money, and opportunities. But they don't have to be your reality.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#intro-section" 
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-200"
              >
                See How We Fix This
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
