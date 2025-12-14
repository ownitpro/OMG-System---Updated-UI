"use client";

import {
  BuildingOfficeIcon,
  HomeIcon,
  HeartIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const segments = [
  {
    icon: BuildingOfficeIcon,
    title: "Clinics & Ambulatory",
    description: "Booking, intake, billing, telehealth; reduce admin, increase compliance",
    features: [
      "Self-service patient booking",
      "Digital intake forms",
      "Automated billing & claims"
    ],
    link: "/industries/healthcare/clinics",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: HomeIcon,
    title: "Long-Term Care / Retirement / Group Homes",
    description: "Medication rounds, staff scheduling, incident alerts, family updates",
    features: [
      "Medication management",
      "Staff scheduling automation",
      "Family communication portal"
    ],
    link: "/industries/healthcare/long-term-care",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: HeartIcon,
    title: "Allied Health (Physio/Chiro/Wellness)",
    description: "Care plans, reminders, progress notes, patient engagement",
    features: [
      "Care plan automation",
      "Progress tracking",
      "Patient engagement tools"
    ],
    link: "/industries/healthcare/allied-health",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "Integrated Networks & Home Care",
    description: "Referrals, shared records, remote updates; scale across sites",
    features: [
      "Cross-site coordination",
      "Shared patient records",
      "Remote monitoring"
    ],
    link: "/industries/healthcare/integrated-networks",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function HealthcareSegments() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Built for Ontario Care Settings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed for clinics, LTC/Group homes and multi-site practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-gray-100"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${segment.color} mb-4`}>
                <segment.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {segment.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {segment.description}
              </p>
              <ul className="space-y-2 mb-4">
                {segment.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-500 flex items-start">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={segment.link}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
              >
                Learn More
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
