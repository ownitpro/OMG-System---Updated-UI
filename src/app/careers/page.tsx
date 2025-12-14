import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { ArrowRightIcon, CheckIcon, UserGroupIcon, LightBulbIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Careers – OMGsystems | Join Our Team",
  description: "Explore career opportunities with OMGsystems in Durham, Ontario. Make an impact in automation, back-office workflows, and industry-specific SaaS solutions.",
  openGraph: {
    title: "Careers – OMGsystems | Join Our Team",
    description: "Explore career opportunities with OMGsystems in Durham, Ontario. Make an impact in automation, back-office workflows, and industry-specific SaaS solutions.",
    type: "website",
  },
};

const openRoles = [
  {
    title: "Senior Full-Stack Developer",
    location: "Durham, Ontario",
    summary: "Lead development of our automation platform and modern web technologies.",
    responsibilities: [
      "Design, implement and maintain new features",
      "Collaborate with product team to define technical roadmap", 
      "Ensure quality, scalability and performance"
    ],
    qualifications: [
      "5+ years full-stack development experience",
      "Experience building SaaS applications",
      "Strong proficiency in modern web technologies"
    ]
  },
  {
    title: "Customer Service Manager",
    location: "Durham, Ontario",
    summary: "Lead our client success & support team to ensure outstanding customer experiences.",
    responsibilities: [
      "Manage client support operations and team",
      "Ensure customer satisfaction for automation platform users",
      "Develop support processes and best practices"
    ],
    qualifications: [
      "3+ years customer success or support management experience",
      "Experience with SaaS platforms",
      "Strong communication and leadership skills"
    ]
  },
  {
    title: "Sales Development Representative",
    location: "Durham, Ontario",
    summary: "Drive growth by identifying and qualifying new business opportunities.",
    responsibilities: [
      "Generate leads and qualify prospects",
      "Drive growth for our vertical-specific automation platform",
      "Collaborate with sales team on outreach strategies"
    ],
    qualifications: [
      "2+ years sales or business development experience",
      "Experience with B2B SaaS sales",
      "Strong prospecting and communication skills"
    ]
  },
  {
    title: "DevOps Engineer",
    location: "Durham, Ontario",
    summary: "Manage our infrastructure and deployment pipeline for our automation platform.",
    responsibilities: [
      "Manage cloud infrastructure and deployment pipelines",
      "Ensure system reliability and performance",
      "Implement monitoring and security best practices"
    ],
    qualifications: [
      "3+ years DevOps or infrastructure experience",
      "Experience with cloud platforms and CI/CD",
      "Strong automation and scripting skills"
    ]
  }
];

const benefits = [
  "Competitive compensation",
  "Professional development support", 
  "Flexible work arrangements",
  "Collaborative, growth-oriented environment",
  "Modern tech stack",
  "Canada-based team",
  "Team events and social activities"
];

const values = [
  {
    title: "Clarity over Complexity",
    description: "We build solutions that work in real-world operations.",
    icon: LightBulbIcon
  },
  {
    title: "Privacy by Design", 
    description: "Connected to our communities: Canadian data residency, privacy by design.",
    icon: CheckIcon
  },
  {
    title: "Outcomes You Can Measure",
    description: "Continuous improvement with measurable results.",
    icon: ChartBarIcon
  },
  {
    title: "Team Growth & Autonomy",
    description: "Your ideas matter, your work is visible.",
    icon: UserGroupIcon
  }
];

const growthOpportunities = [
  {
    title: "Impact at Scale",
    description: "Work across real businesses in Canada, automation has measurable results.",
    icon: ChartBarIcon
  },
  {
    title: "Innovative Tech Stack", 
    description: "Use next-gen tools: Next.js, AWS, n8n automation, modern workflows.",
    icon: LightBulbIcon
  },
  {
    title: "Team & Learning Focus",
    description: "Mentoring, learning budget, collaborative culture.",
    icon: UserGroupIcon
  }
];

export default function CareersPage() {
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
              Join the team building the future of business automation
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Durham ON • Full-Time • Remote-Friendly
            </h2>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-2xl">
              <Link href="#open-positions">
                See Open Roles
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Work With Us */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We design industry-specific SaaS solutions for property management, real estate, contractors, accounting, cleaning and healthcare. Based in Durham, Ontario, we're growing fast – join us.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start text-left">
                <CheckIcon className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Innovation-first mindset: we build solutions that work in real-world ops.</span>
              </div>
              <div className="flex items-start text-left">
                <CheckIcon className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Connected to our communities: Canadian data residency, privacy by design.</span>
              </div>
              <div className="flex items-start text-left">
                <CheckIcon className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Team growth & autonomy: your ideas matter, your work is visible.</span>
              </div>
            </div>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="#open-positions">
                View Open Roles
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Culture & Values */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture & Values
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Employee Testimonial */}
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <blockquote className="text-lg text-gray-700 mb-4">
              "Working at OMGsystems means I'm part of building something meaningful. Every day I see the impact our automation has on real businesses across Canada."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                MC
              </div>
              <div>
                <div className="font-semibold text-gray-900">Michael C.</div>
                <div className="text-gray-600 text-sm">Systems Architect</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section id="open-positions" className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Opportunities (Durham, Ontario)
            </h2>
          </div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {openRoles.map((role, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900 text-xl">{role.title}</h3>
                  <span className="text-sm text-gray-600">{role.location}</span>
                </div>
                <p className="text-gray-700 mb-6">{role.summary}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Responsibilities:</h4>
                    <ul className="space-y-2">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Qualifications:</h4>
                    <ul className="space-y-2">
                      {role.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="#application-form">
                    Apply Now
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How We Hire */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Hire
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Three simple steps to join our team
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Select your role and click Apply</h3>
                <p className="text-gray-600">Choose the position that matches your skills and interests.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Submit your resume and short cover letter</h3>
                <p className="text-gray-600">Tell us about yourself and why you want to join OMGsystems.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Interview, meet the team, and if it's a match – welcome aboard</h3>
                <p className="text-gray-600">We'll get back to you within 48 hours to schedule next steps.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits & Perks */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Work with Us
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start text-left">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Employee Testimonial */}
            <div className="bg-white rounded-2xl p-8 max-w-3xl mx-auto">
              <blockquote className="text-lg text-gray-700 mb-4">
                "I joined OMGsystems to build real impact. Every day I see how our automation transforms businesses across Canada."
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael C.</div>
                  <div className="text-gray-600 text-sm">Systems Architect</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Application Form */}
      <Section id="application-form" className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Apply Now
              </h2>
              <p className="text-gray-600">
                Ready to join our team? Fill out the form below and we'll get back to you within 48 hours.
              </p>
            </div>
            
            <form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 987-6543"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position of Interest</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select a position</option>
                    {openRoles.map((role, index) => (
                      <option key={index} value={role.title}>{role.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume Upload</label>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us why you'd like to work at OMGsystems..."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Why you'd like to work here (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What excites you about joining our team?"
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg">
                Submit Application
              </Button>
            </form>
          </div>
        </Container>
      </Section>

      {/* Footer CTA */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find a role that fits?
            </h2>
            <p className="text-gray-600 mb-8">
              Submit your resume for future opportunities.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Role of Interest"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea 
                  rows={3}
                  placeholder="Tell us about yourself and what you're looking for..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Submit Resume
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy and will keep your data secure.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
