"use client";

import { useState } from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { getAdminNavV2 } from "@/config/portalNav";
import {
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

// FAQ data
const FAQ_DATA = [
  {
    category: "Getting Started",
    icon: RocketLaunchIcon,
    questions: [
      {
        q: "How do I create my first project?",
        a: "Navigate to the Dashboard and click 'New Project'. Follow the setup wizard to configure your project settings, add team members, and start building."
      },
      {
        q: "How do I invite team members?",
        a: "Go to Settings > Team Members > Invite. Enter their email address and select their role. They'll receive an invitation email to join your organization."
      },
      {
        q: "What's included in my plan?",
        a: "Your current plan includes access to all core features, 5 team members, 10GB storage, and priority email support. Visit the Billing page to see full details."
      },
    ]
  },
  {
    category: "Security & Privacy",
    icon: ShieldCheckIcon,
    questions: [
      {
        q: "How do I enable two-factor authentication?",
        a: "Go to Security Settings and click 'Enable 2FA'. Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.) and enter the verification code."
      },
      {
        q: "Where is my data stored?",
        a: "All data is stored in secure Canadian data centers with full SOC 2 compliance. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit."
      },
    ]
  },
  {
    category: "Billing & Plans",
    icon: CreditCardIcon,
    questions: [
      {
        q: "How do I upgrade my plan?",
        a: "Visit the Billing page and click 'Upgrade Plan'. Choose your new plan and confirm. Changes take effect immediately and you'll be prorated for the current billing period."
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, you can cancel anytime from the Billing page. You'll retain access until the end of your current billing period. No cancellation fees apply."
      },
    ]
  },
];

// Support ticket status mock
const MOCK_TICKETS = [
  { id: "TKT-001", subject: "Integration setup help", status: "open", created: "2 hours ago" },
  { id: "TKT-002", subject: "Billing question", status: "resolved", created: "3 days ago" },
];

export default function AdminSupportPage() {
  const nav = getAdminNavV2();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"help" | "tickets">("help");

  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setContactForm({ subject: "", category: "", message: "" });
  };

  const filteredFaqs = FAQ_DATA.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <PortalShellV2 role="admin" title="Help & Support" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <QuestionMarkCircleIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Help & Support</h1>
              <p className="text-sm text-white/60">
                Get help, browse FAQs, or contact our team
              </p>
            </div>
          </div>
          <Link
            href="/portal/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Hero Search Section */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#A855F7]/20 via-[#A855F7]/5 to-[#47BD79]/10 backdrop-blur-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">How can we help you?</h2>
          <p className="text-white/60 mb-6">Search our knowledge base or browse topics below</p>

          <div className="max-w-xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, tutorials, FAQs..."
              className="w-full rounded-xl border border-white/20 bg-[#1e293b] pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
              style={{
                WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                WebkitTextFillColor: 'white',
                caretColor: 'white'
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#A855F7]/30 transition-all group text-left">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center group-hover:bg-[#A855F7]/30 transition-all">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#A855F7]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Live Chat</p>
              <p className="text-xs text-white/50">Chat with support</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#47BD79]/30 transition-all group text-left">
            <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center group-hover:bg-[#47BD79]/30 transition-all">
              <BookOpenIcon className="w-6 h-6 text-[#47BD79]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Documentation</p>
              <p className="text-xs text-white/50">Browse guides</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all group text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
              <VideoCameraIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Video Tutorials</p>
              <p className="text-xs text-white/50">Watch & learn</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all group text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
              <AcademicCapIcon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Academy</p>
              <p className="text-xs text-white/50">Free courses</p>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-0">
          <button
            onClick={() => setActiveTab("help")}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-[1px] ${
              activeTab === "help"
                ? "text-[#A855F7] border-[#A855F7]"
                : "text-white/60 border-transparent hover:text-white"
            }`}
          >
            Help Center
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-[1px] ${
              activeTab === "tickets"
                ? "text-[#A855F7] border-[#A855F7]"
                : "text-white/60 border-transparent hover:text-white"
            }`}
          >
            My Tickets
          </button>
        </div>

        {activeTab === "help" && (
          <>
            {/* FAQ Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>

              {(searchQuery ? filteredFaqs : FAQ_DATA).map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.category} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white/60" />
                      </div>
                      <h4 className="text-sm font-semibold text-white">{category.category}</h4>
                    </div>
                    <div className="divide-y divide-white/5">
                      {category.questions.map((faq, idx) => {
                        const faqId = `${category.category}-${idx}`;
                        const isExpanded = expandedFaq === faqId;
                        return (
                          <div key={idx}>
                            <button
                              onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                            >
                              <span className="text-sm text-white/80">{faq.q}</span>
                              <ChevronDownIcon className={`w-4 h-4 text-white/40 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 text-sm text-white/60 bg-white/5">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {searchQuery && filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <QuestionMarkCircleIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-white/40 mt-1">Try different keywords or contact support</p>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Contact Support</h3>
                  <p className="text-sm text-white/50">Can't find what you're looking for? Send us a message</p>
                </div>
              </div>

              {submitted ? (
                <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 p-6 text-center">
                  <CheckCircleIcon className="w-12 h-12 text-[#47BD79] mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-sm text-white/60 mb-4">
                    We've received your request and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-[#47BD79] text-sm font-medium text-white hover:bg-[#3da86a] transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Brief description of your issue"
                        required
                        className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
                        style={{
                          WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
                          WebkitTextFillColor: 'white',
                          caretColor: 'white'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
                      <select
                        value={contactForm.category}
                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        required
                        className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all appearance-none"
                      >
                        <option value="">Select a category</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                        <option value="account">Account Help</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your issue in detail..."
                      required
                      rows={5}
                      className="w-full rounded-xl border border-white/20 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-[#A855F7] text-sm font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30 disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <EnvelopeIcon className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center mx-auto mb-3">
                  <EnvelopeIcon className="w-6 h-6 text-[#A855F7]" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Email Support</h4>
                <p className="text-xs text-white/50 mb-2">Response within 24 hours</p>
                <a href="mailto:support@omgsystems.com" className="text-sm text-[#A855F7] hover:underline">
                  support@omgsystems.com
                </a>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center mx-auto mb-3">
                  <PhoneIcon className="w-6 h-6 text-[#47BD79]" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Phone Support</h4>
                <p className="text-xs text-white/50 mb-2">Mon-Fri 9AM-6PM EST</p>
                <a href="tel:+14165551234" className="text-sm text-[#47BD79] hover:underline">
                  +1 (416) 555-1234
                </a>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Live Chat</h4>
                <p className="text-xs text-white/50 mb-2">Available 24/7</p>
                <button className="text-sm text-cyan-400 hover:underline">
                  Start Chat
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "tickets" && (
          <div className="space-y-4">
            {/* Tickets Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Support Tickets</h3>
              <button
                onClick={() => setActiveTab("help")}
                className="px-4 py-2 rounded-xl bg-[#A855F7] text-sm font-medium text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30"
              >
                New Ticket
              </button>
            </div>

            {/* Tickets List */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              {MOCK_TICKETS.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {MOCK_TICKETS.map((ticket) => (
                    <div key={ticket.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          ticket.status === "open" ? "bg-amber-500/20" : "bg-[#47BD79]/20"
                        }`}>
                          {ticket.status === "open" ? (
                            <ClockIcon className="w-5 h-5 text-amber-400" />
                          ) : (
                            <CheckCircleIcon className="w-5 h-5 text-[#47BD79]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{ticket.subject}</p>
                          <p className="text-xs text-white/50">{ticket.id} • Created {ticket.created}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "open"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30"
                        }`}>
                          {ticket.status === "open" ? "Open" : "Resolved"}
                        </span>
                        <ChevronRightIcon className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <DocumentTextIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60">No support tickets yet</p>
                  <p className="text-sm text-white/40 mt-1">Create a ticket when you need help</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PortalShellV2>
  );
}
