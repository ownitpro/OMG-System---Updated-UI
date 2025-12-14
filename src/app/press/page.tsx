import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { ArrowRightIcon, DocumentTextIcon, PhotoIcon, CalendarIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Press & Media – OMGsystems",
  description: "Find the latest company news, media kit and press releases from OMGsystems – industry-specific automation & SaaS.",
  openGraph: {
    title: "Press & Media – OMGsystems",
    description: "Find the latest company news, media kit and press releases from OMGsystems – industry-specific automation & SaaS.",
    type: "website",
  },
};

const featuredCoverage = [
  {
    title: "OMGsystems automates 14-day process into 0-days for property managers",
    publication: "Canadian Property Management Today",
    date: "October 15, 2024",
    excerpt: "Ontario-based automation platform reduces manual processes by 90% for property management companies.",
    image: "/images/press/property-management-article.jpg",
    link: "#"
  },
  {
    title: "Healthcare automation startup secures $2M in funding",
    publication: "TechCrunch Canada",
    date: "September 28, 2024", 
    excerpt: "OMGsystems raises Series A to expand automation solutions across Canadian healthcare sector.",
    image: "/images/press/healthcare-funding-article.jpg",
    link: "#"
  },
  {
    title: "The future of business automation in Canada",
    publication: "Canadian Business Review",
    date: "September 10, 2024",
    excerpt: "How OMGsystems is transforming traditional industries with intelligent automation workflows.",
    image: "/images/press/business-automation-article.jpg", 
    link: "#"
  }
];

const pressReleases = [
  {
    date: "October 10, 2024",
    title: "OMGsystems Launches Industry IQ Beta for Healthcare Providers",
    summary: "New AI-powered module helps healthcare providers automate patient intake and compliance workflows.",
    link: "#"
  },
  {
    date: "September 15, 2024", 
    title: "OMGsystems Secures $2M Series A Funding Round",
    summary: "Funding will accelerate product development and expand team across engineering and customer success.",
    link: "#"
  },
  {
    date: "August 20, 2024",
    title: "OMGsystems Partners with Leading Property Management Companies",
    summary: "Strategic partnerships bring automation to 500+ properties across Ontario and British Columbia.",
    link: "#"
  },
  {
    date: "July 5, 2024",
    title: "OMGsystems Achieves SOC 2 Type II Compliance",
    summary: "Security certification demonstrates commitment to protecting client data and maintaining highest security standards.",
    link: "#"
  }
];

const mediaAssets = [
  {
    title: "Company Logo & Brand Assets",
    description: "High-resolution logos, brand guidelines, and style guide",
    icon: DocumentTextIcon,
    download: "#"
  },
  {
    title: "Executive Headshots",
    description: "Professional photos of leadership team",
    icon: PhotoIcon,
    download: "#"
  },
  {
    title: "Company Fact Sheet",
    description: "Key statistics, milestones, and company overview",
    icon: DocumentTextIcon,
    download: "#"
  },
  {
    title: "Product Screenshots",
    description: "High-resolution images of our platform in action",
    icon: PhotoIcon,
    download: "#"
  }
];

const milestones = [
  {
    year: "2024",
    title: "500+ Companies Onboarded",
    description: "Reached milestone of 500+ businesses using our automation platform"
  },
  {
    year: "2024", 
    title: "SOC 2 Type II Certified",
    description: "Achieved highest security standards for data protection"
  },
  {
    year: "2024",
    title: "Series A Funding Secured",
    description: "Raised $2M to accelerate growth and product development"
  },
  {
    year: "2023",
    title: "Platform Launch",
    description: "Launched comprehensive automation platform for Canadian businesses"
  }
];

const publicationLogos = [
  "TechCrunch Canada",
  "Canadian Business Review", 
  "Property Management Today",
  "Healthcare Innovation",
  "Canadian Tech Weekly",
  "Business Automation News"
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <Container className="relative py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 
              className="font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              In the media
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              See how OMGsystems is featured, innovating the future of vertical-business automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl">
                <Link href="#media-kit">
                  View Media Kit
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-2xl">
                <Link href="#press-contact">
                  Contact Media Relations
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Media Kit & Resources */}
      <Section id="media-kit" className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Media Kit Downloads
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use our official branding assets for editorial use. Contact us for additional assets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mediaAssets.map((asset, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <asset.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{asset.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{asset.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={asset.download}>
                        Download
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Press Mentions */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Press Mentions
            </h2>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {publicationLogos.map((publication, index) => (
                <div key={index} className="text-gray-600 font-medium text-sm">
                  {publication}
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCoverage.map((article, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <PhotoIcon className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{article.publication} • {article.date}</div>
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Press Releases */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Releases
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">{release.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{release.title}</h3>
                    <p className="text-gray-600 mb-4">{release.summary}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={release.link}>
                        Read More
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="#">
                View All Press Releases
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Media Kit */}
      <Section id="media-kit" className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Media Kit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download high-resolution assets, brand guidelines, and company information for your coverage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mediaAssets.map((asset, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <asset.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{asset.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{asset.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={asset.download}>
                        Download
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Milestones & Recognition */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Milestones & Recognition
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6 flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Press Contact */}
      <Section id="press-contact" className="py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Press Contact
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              For media inquiries, please email press@omgsystems.com or call +1-[phone placeholder].
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
              <div className="flex items-center justify-center mb-6">
                <EnvelopeIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Media Relations Team</div>
                  <div className="text-gray-600">press@omgsystems.com</div>
                  <div className="text-gray-600">+1 (905) 555-0123</div>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Outlet"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea 
                  rows={4}
                  placeholder="Your inquiry or request..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Inquiry
                </Button>
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="#media-kit">
                  Download Media Kit
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
