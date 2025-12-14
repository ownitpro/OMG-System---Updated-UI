import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { CommunityJoinForm } from "@/components/community/CommunityJoinForm";

export const metadata: Metadata = {
  title: "Join the OMGsystems Community | Connect, Learn & Grow",
  description: "Join the OMGsystems Community: Connect with forward-thinking operators, share workflows, get early access, and scale smarter together. Free to join with Canadian data residency.",
  openGraph: {
    title: "Join the OMGsystems Community | Connect, Learn & Grow",
    description: "Join the OMGsystems Community: Connect with forward-thinking operators, share workflows, get early access, and scale smarter together.",
    type: "website",
  },
};

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Exclusive community of peers",
    description: "Connect with operators across Property Management, Real Estate, Contractors, Healthcare & more."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Monthly live round-tables",
    description: "Templates & micro-automations you can deploy in days, plus exclusive events."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "First access to new modules",
    description: "Get early access to new workflows, pilot releases, and cutting-edge automation tools."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Peer Q&A & collaboration",
    description: "Share what works, fill the gaps, and never journey alone in your automation efforts."
  }
];

const memberProfiles = [
  {
    name: "Sarah Chen",
    role: "Property Manager",
    location: "Toronto",
    quote: "The community helped me automate tenant communications in just 2 weeks."
  },
  {
    name: "Dr. Michael Rodriguez",
    role: "Clinic Director",
    location: "Ontario",
    quote: "Patient intake workflows are now 70% faster thanks to community insights."
  },
  {
    name: "James Thompson",
    role: "Renovation Contractor",
    location: "GTA",
    quote: "Project scheduling and client follow-ups are completely automated now."
  }
];

const industries = [
  "Property Management",
  "Real Estate",
  "Contractors",
  "Accounting",
  "Cleaning",
  "Healthcare",
  "Other"
];

export default function CommunityJoinPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Join the OMGsystems Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Connect with other forward-thinking operators, share workflows, get early access, and scale smarter together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="#signup-form"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Become a Member
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Free to join • Canadian-residency data • Member-only resources & events
            </p>
          </div>
        </div>
      </section>

      {/* Why Join / Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Our Community?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with automation experts, access exclusive resources, and accelerate your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Profiles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who It's For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you're a small-team operator or run multi-site enterprises, our community is built for organizations ready to automate, scale and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberProfiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {profile.role}, {profile.location}
                  </p>
                  <blockquote className="text-gray-700 italic">
                    "{profile.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join the Community
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll send you access details within 24-48 hours.
            </p>
          </div>

          <CommunityJoinForm />
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Community Promise
            </h2>
            <p className="text-xl text-gray-600">
              We're building a respectful, helpful space for everyone to learn and grow together.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Respect all members and their perspectives</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Collaborate and share knowledge freely</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">No spam or self-promotion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Maintain confidentiality of shared information</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Access to exclusive resources & templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Monthly live sessions & workshops</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Peer networking & collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Early access to new features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with 1000+ members across Canada and accelerate your automation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#signup-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Join the Community
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg border border-white"
            >
              Explore Resources
            </Link>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            Questions? Contact <a href="mailto:community@omgsystems.com" className="underline hover:text-white">community@omgsystems.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
