"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  DocumentTextIcon,
  PhotoIcon,
  CalendarIcon,
  EnvelopeIcon,
  NewspaperIcon,
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const featuredCoverage = [
  {
    title: "OMGsystems automates 14-day process into 0-days for property managers",
    publication: "Canadian Property Management Today",
    date: "October 15, 2024",
    excerpt: "Ontario-based automation platform reduces manual processes by 90% for property management companies.",
  },
  {
    title: "Healthcare automation startup secures $2M in funding",
    publication: "TechCrunch Canada",
    date: "September 28, 2024",
    excerpt: "OMGsystems raises Series A to expand automation solutions across Canadian healthcare sector.",
  },
  {
    title: "The future of business automation in Canada",
    publication: "Canadian Business Review",
    date: "September 10, 2024",
    excerpt: "How OMGsystems is transforming traditional industries with intelligent automation workflows.",
  },
];

const pressReleases = [
  {
    date: "October 10, 2024",
    title: "OMGsystems Launches Industry IQ Beta for Healthcare Providers",
    summary: "New AI-powered module helps healthcare providers automate patient intake and compliance workflows.",
  },
  {
    date: "September 15, 2024",
    title: "OMGsystems Secures $2M Series A Funding Round",
    summary: "Funding will accelerate product development and expand team across engineering and customer success.",
  },
  {
    date: "August 20, 2024",
    title: "OMGsystems Partners with Leading Property Management Companies",
    summary: "Strategic partnerships bring automation to 500+ properties across Ontario and British Columbia.",
  },
  {
    date: "July 5, 2024",
    title: "OMGsystems Achieves SOC 2 Type II Compliance",
    summary: "Security certification demonstrates commitment to protecting client data and maintaining highest security standards.",
  },
];

const mediaAssets = [
  {
    title: "Company Logo & Brand Assets",
    description: "High-resolution logos, brand guidelines, and style guide",
    icon: DocumentTextIcon,
  },
  {
    title: "Executive Headshots",
    description: "Professional photos of leadership team",
    icon: PhotoIcon,
  },
  {
    title: "Company Fact Sheet",
    description: "Key statistics, milestones, and company overview",
    icon: DocumentTextIcon,
  },
  {
    title: "Product Screenshots",
    description: "High-resolution images of our platform in action",
    icon: PhotoIcon,
  },
];

const milestones = [
  {
    year: "2024",
    title: "500+ Companies Onboarded",
    description: "Reached milestone of 500+ businesses using our automation platform",
  },
  {
    year: "2024",
    title: "SOC 2 Type II Certified",
    description: "Achieved highest security standards for data protection",
  },
  {
    year: "2024",
    title: "Series A Funding Secured",
    description: "Raised $2M to accelerate growth and product development",
  },
  {
    year: "2023",
    title: "Platform Launch",
    description: "Launched comprehensive automation platform for Canadian businesses",
  },
];

const publications = [
  "TechCrunch Canada",
  "Canadian Business Review",
  "Property Management Today",
  "Healthcare Innovation",
  "Canadian Tech Weekly",
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[40%] right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[70%] left-1/3 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <NewspaperIcon className="w-4 h-4" />
              Press & Media
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              In the{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Media
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              See how OMGsystems is featured, innovating the future of vertical-business automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#media-kit"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Download Media Kit
              </Link>
              <Link
                href="#press-contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                Contact Media Relations
              </Link>
            </div>

            {/* Publications Strip */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm mb-6">As featured in</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {publications.map((pub, index) => (
                  <span key={index} className="text-white/50 font-medium text-sm hover:text-white/70 transition-colors">
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== FEATURED COVERAGE ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Coverage
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Recent press mentions and media coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCoverage.map((article, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 group"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <PhotoIcon className="w-12 h-12 text-white/30 group-hover:text-emerald-400/50 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                    <span className="text-emerald-400">{article.publication}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4">{article.excerpt}</p>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Read Article
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PRESS RELEASES ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Press{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Releases
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{release.date}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-white/60 text-sm">{release.summary}</p>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 transition-all"
                  >
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MEDIA KIT ===== */}
        <div id="media-kit" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Downloads
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Media{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Kit
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Download official branding assets for editorial use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mediaAssets.map((asset, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-emerald-500/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <asset.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{asset.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{asset.description}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Download
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MILESTONES ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Company{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Milestones
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-teal-500/50 to-emerald-500/50 hidden md:block" />

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 flex-1 hover:border-emerald-500/40 transition-all duration-300">
                    <h3 className="font-semibold text-white mb-1">{milestone.title}</h3>
                    <p className="text-sm text-white/60">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== PRESS CONTACT ===== */}
        <div id="press-contact" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
                <EnvelopeIcon className="w-4 h-4" />
                Get in Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Press{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Contact
                </span>
              </h2>
              <p className="text-white/60">
                For media inquiries, interviews, or press information.
              </p>
            </div>

            {/* Contact Info */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BuildingOfficeIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Media Relations Team</h3>
                  <p className="text-emerald-400">press@omgsystems.ca</p>
                  <p className="text-white/60 text-sm">+1 (905) 555-0123</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Publication/Outlet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    placeholder="Your outlet"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  placeholder="your.email@publication.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Inquiry</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                  placeholder="Tell us about your inquiry or interview request..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5" />
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-emerald-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Want to Learn More About OMGsystems?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Discover how we're transforming business automation across Canada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              About Us
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
