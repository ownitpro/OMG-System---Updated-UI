"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const openRoles = [
  {
    title: "Senior Full-Stack Developer",
    location: "Durham, Ontario",
    type: "Full-Time",
    summary: "Lead development of our automation platform and modern web technologies.",
    responsibilities: [
      "Design, implement and maintain new features",
      "Collaborate with product team to define technical roadmap",
      "Ensure quality, scalability and performance",
    ],
    qualifications: [
      "5+ years full-stack development experience",
      "Experience building SaaS applications",
      "Strong proficiency in modern web technologies",
    ],
  },
  {
    title: "Customer Service Manager",
    location: "Durham, Ontario",
    type: "Full-Time",
    summary: "Lead our client success & support team to ensure outstanding customer experiences.",
    responsibilities: [
      "Manage client support operations and team",
      "Ensure customer satisfaction for automation platform users",
      "Develop support processes and best practices",
    ],
    qualifications: [
      "3+ years customer success or support management experience",
      "Experience with SaaS platforms",
      "Strong communication and leadership skills",
    ],
  },
  {
    title: "Sales Development Representative",
    location: "Durham, Ontario",
    type: "Full-Time",
    summary: "Drive growth by identifying and qualifying new business opportunities.",
    responsibilities: [
      "Generate leads and qualify prospects",
      "Drive growth for our vertical-specific automation platform",
      "Collaborate with sales team on outreach strategies",
    ],
    qualifications: [
      "2+ years sales or business development experience",
      "Experience with B2B SaaS sales",
      "Strong prospecting and communication skills",
    ],
  },
  {
    title: "DevOps Engineer",
    location: "Durham, Ontario",
    type: "Full-Time",
    summary: "Manage our infrastructure and deployment pipeline for our automation platform.",
    responsibilities: [
      "Manage cloud infrastructure and deployment pipelines",
      "Ensure system reliability and performance",
      "Implement monitoring and security best practices",
    ],
    qualifications: [
      "3+ years DevOps or infrastructure experience",
      "Experience with cloud platforms and CI/CD",
      "Strong automation and scripting skills",
    ],
  },
];

const benefits = [
  { text: "Competitive compensation", icon: ChartBarIcon },
  { text: "Professional development support", icon: LightBulbIcon },
  { text: "Flexible work arrangements", icon: ClockIcon },
  { text: "Collaborative, growth-oriented environment", icon: UserGroupIcon },
  { text: "Modern tech stack", icon: SparklesIcon },
  { text: "Canada-based team", icon: MapPinIcon },
];

const values = [
  {
    title: "Clarity over Complexity",
    description: "We build solutions that work in real-world operations.",
    icon: LightBulbIcon,
  },
  {
    title: "Privacy by Design",
    description: "Canadian data residency, security-first architecture.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Outcomes You Can Measure",
    description: "Continuous improvement with measurable results.",
    icon: ChartBarIcon,
  },
  {
    title: "Team Growth & Autonomy",
    description: "Your ideas matter, your work is visible.",
    icon: UserGroupIcon,
  },
];

const hiringSteps = [
  {
    number: "1",
    title: "Apply",
    description: "Select a role and submit your application with resume and cover letter.",
  },
  {
    number: "2",
    title: "Review",
    description: "Our team reviews your application. We respond within 48 hours.",
  },
  {
    number: "3",
    title: "Interview",
    description: "Meet the team, discuss the role, and see if we're a mutual fit.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[40%] right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[70%] left-1/3 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              <BriefcaseIcon className="w-4 h-4" />
              We're Hiring
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join the Team Building the Future of{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Business Automation
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-4">
              Durham, Ontario • Full-Time • Remote-Friendly
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-10">
              We design industry-specific SaaS solutions for property management, real estate, contractors, accounting, and healthcare. We're growing fast – join us.
            </p>

            <Link
              href="#open-positions"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              See Open Roles
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* ===== WHY JOIN US (Values) ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Join{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                OMGsystems
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our culture is built on innovation, autonomy, and measurable impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-white/60">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <blockquote className="text-lg text-white/80 mb-6 italic">
                "Working at OMGsystems means I'm part of building something meaningful. Every day I see the impact our automation has on real businesses across Canada."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-white">Michael C.</div>
                  <div className="text-white/60 text-sm">Systems Architect</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== OPEN POSITIONS ===== */}
        <div id="open-positions" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Current{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Find your next role and make an impact with us.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openRoles.map((role, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{role.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 text-sm text-white/60">
                        <MapPinIcon className="w-4 h-4" />
                        {role.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-white/60">
                        <ClockIcon className="w-4 h-4" />
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="#application-form"
                    className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 text-sm"
                  >
                    Apply Now
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                <p className="text-white/70 mb-6">{role.summary}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-3">Responsibilities</h4>
                    <ul className="space-y-2">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">Qualifications</h4>
                    <ul className="space-y-2">
                      {role.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== HOW WE HIRE ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hire
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Three simple steps to join our team.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50" />

            <div className="grid lg:grid-cols-3 gap-8">
              {hiringSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== BENEFITS & PERKS ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Benefits &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Perks
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-4 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-white/80">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== APPLICATION FORM ===== */}
        <div id="application-form" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                <DocumentTextIcon className="w-4 h-4" />
                Apply Now
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Submit Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Application
                </span>
              </h2>
              <p className="text-white/60">
                Ready to join our team? We'll get back to you within 48 hours.
              </p>
            </div>

            <form className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="(555) 987-6543"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Position</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all">
                    <option value="" className="bg-slate-900">Select a position</option>
                    {openRoles.map((role, index) => (
                      <option key={index} value={role.title} className="bg-slate-900">
                        {role.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Resume</label>
                <div className="w-full px-4 py-6 bg-white/5 border border-dashed border-white/20 rounded-lg text-center hover:border-blue-500/40 transition-all cursor-pointer">
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="resume-upload" />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <DocumentTextIcon className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
                    <p className="text-white/40 text-xs mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Cover Letter</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                  placeholder="Tell us why you'd like to work at OMGsystems..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Can't Find a Role That Fits?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:careers@omgsystems.ca"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Send Your Resume
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
