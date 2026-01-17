"use client";

import {
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: UserGroupIcon,
    title: "Contact & Lead Management",
    description: "Capture, organise, and track every interaction.",
    color: "text-sky-400",
    accent: "from-sky-500/20 to-sky-500/5"
  },
  {
    icon: ChartBarIcon,
    title: "Pipeline Tracking",
    description: "Visualise your sales pipeline; never lose an opportunity.",
    color: "text-blue-400",
    accent: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: CogIcon,
    title: "Automation Builder",
    description: "Create custom workflows that work 24/7 to nurture leads and clients.",
    color: "text-cyan-400",
    accent: "from-cyan-500/20 to-cyan-500/5"
  },
  {
    icon: DocumentTextIcon,
    title: "Document Integration",
    description: "Store and organise all client documents in one secure place.",
    color: "text-indigo-400",
    accent: "from-indigo-500/20 to-indigo-500/5"
  },
  {
    icon: PresentationChartBarIcon,
    title: "Reporting Dashboard",
    description: "Gain insights with customisable, real-time reports.",
    color: "text-white/80",
    accent: "from-white/10 to-white/5"
  },
  {
    icon: UsersIcon,
    title: "Team Collaboration",
    description: "Shared notes, tasks, and communication to keep your team aligned.",
    color: "text-sky-300",
    accent: "from-sky-400/20 to-sky-400/5"
  },
];

export default function FeaturesGridSection() {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
            A complete CRM solution that grows with your business
          </p>
        </div>

        {/* Bento Grid Layout - Varied Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            // Make some cards span 2 columns for visual interest
            const isWide = index === 2 || index === 4;

            return (
              <div
                key={index}
                className={`group relative ${isWide ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative p-8 border-l-2 border-white/10 group-hover:border-sky-400/50 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <IconComponent className={`w-10 h-10 ${feature.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-base md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Section - Inline, No Box */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Seamless Integration
          </h3>
          <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Connect your CRM with email, document management, accounting software, and more.
            No more switching between systems—everything works together.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-5 py-2 bg-gradient-to-r from-sky-500/20 to-sky-500/10 text-sky-400 rounded-full text-sm font-medium border border-sky-500/20">Email Integration</span>
            <span className="px-5 py-2 bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">Document Storage</span>
            <span className="px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">Accounting Software</span>
            <span className="px-5 py-2 bg-gradient-to-r from-sky-400/20 to-sky-400/10 text-sky-300 rounded-full text-sm font-medium border border-sky-400/20">Calendar Sync</span>
          </div>
        </div>
      </div>
    </section>
  );
}
