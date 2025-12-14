"use client";

import {
  HomeIcon,
  CogIcon,
  UserPlusIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const timelineSteps = [
  {
    icon: HomeIcon,
    title: "Property Setup",
    description: "Import properties, units, tenant data.",
    step: "1",
  },
  {
    icon: CogIcon,
    title: "System Configuration",
    description: "Configure workflows, templates, integrations.",
    step: "2",
  },
  {
    icon: UserPlusIcon,
    title: "Tenant Onboarding",
    description: "Migrate tenants, enable portal access.",
    step: "3",
  },
  {
    icon: AcademicCapIcon,
    title: "Owner Training",
    description: "Teach owners dashboard and reporting tools.",
    step: "4",
  },
  {
    icon: RocketLaunchIcon,
    title: "Go-Live & Support",
    description: "Launch with ongoing support, optimization, scaling.",
    step: "5",
  },
];

export default function ImplementationTimeline() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Implementation Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A clear 5-step process to get your property management operations automated and running smoothly.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200 hidden lg:block"></div>

          <div className="space-y-12">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="flex-1 lg:max-w-md">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="flex-shrink-0 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg hidden lg:block mx-8"></div>

                <div className="flex-1 lg:max-w-md"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-emerald-800 text-sm">
              <strong>Typical single-property onboarding completes in weeks; multi-property roll-out handled in phases.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
