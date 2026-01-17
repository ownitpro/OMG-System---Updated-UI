import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";

const courses = [
  {
    name: "3-Day Personal Course",
    tagline: "For Individuals",
    price: "$297",
    duration: "3 days",
    color: "from-amber-500 to-orange-600",
    description: "Learn how to write, plan, and learn faster with AI at your own pace.",
    features: [
      "Self-paced learning (complete in 3 days or take your time)",
      "20+ practical AI prompts and templates",
      "Built-in AI Playground for practice",
      "Professional certificate with QR code",
      "Lifetime access to course materials",
      "Weekly updated content library",
      "Private community access",
      "Email support"
    ],
    cta: "Enroll Now",
    popular: false,
  },
  {
    name: "2-Week Team Bootcamp",
    tagline: "For Businesses",
    price: "$2,997",
    duration: "2 weeks",
    color: "from-emerald-500 to-green-600",
    description: "Train your whole team to use AI with clear systems, guardrails, and real results.",
    features: [
      "Live cohort-based training",
      "Up to 10 team members included",
      "Custom AI workflow design for your business",
      "Team AI Playground with collaboration features",
      "Professional team certificates",
      "90-day implementation support",
      "Private Slack channel with instructor",
      "Weekly live Q&A sessions",
      "Team progress dashboard",
      "Priority support"
    ],
    cta: "Book Team Training",
    popular: true,
  },
];

export default function AILoginPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f172a] to-black" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/apps/omg-ai-mastery"
          className="mb-8 inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to AI Mastery
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 mb-6">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your AI Journey Today
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Choose the path that fits your needs. Both courses include hands-on practice,
            real-world examples, and a professional certificate.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group flex flex-col ${course.popular ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/20' : 'border-white/10'
                }`}
            >
              {/* Popular Badge */}
              {course.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Course Header */}
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-white/60 mb-2">{course.tagline}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{course.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
                    {course.price}
                  </span>
                </div>
                <p className="text-white/50 text-sm">{course.duration} program</p>
              </div>

              {/* Description */}
              <p className="text-white/70 text-center mb-6">{course.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {course.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-white/70">
                    <CheckCircleIcon className={`h-5 w-5 mr-3 shrink-0 ${course.popular ? 'text-emerald-500' : 'text-amber-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={course.popular ? "/app/omg-ai-mastery/enroll-team" : "/app/omg-ai-mastery/enroll"}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-full px-6 py-4 rounded-xl text-white font-bold transition-all duration-300 ${course.popular
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50'
                  }`}
              >
                {course.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* What's Included - Common Features */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Both Courses Include
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Practical Tools</h3>
                <p className="text-sm text-white/60">Ready-to-use prompts, templates, and workflows</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-white mb-2">AI Playground</h3>
                <p className="text-sm text-white/60">Hands-on practice environment with real AI tools</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📜</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Certificate</h3>
                <p className="text-sm text-white/60">Professional, verifiable certificate with QR code</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ / Questions */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-white/60 mb-6">
            We're here to help you choose the right path. Book a free 15-minute consultation
            to discuss your goals and find the best fit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/apps/omg-ai-mastery#course-details"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 transition-all"
            >
              View Course Details
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
