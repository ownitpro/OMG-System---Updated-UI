"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  PlayCircleIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PaperAirplaneIcon,
  TicketIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Getting Started",
    question: "How do I access my purchased tools?",
    answer:
      "After purchase, your tools will appear in your Dashboard under 'My Tools'. Click on any tool to launch it. Some tools may require initial setup - follow the on-screen instructions.",
  },
  {
    category: "Getting Started",
    question: "How do I update my profile information?",
    answer:
      "Navigate to Profile in the left sidebar. You can update your personal information, contact details, and preferences. Don't forget to click 'Save Changes' when you're done.",
  },
  {
    category: "Billing",
    question: "How do I view my invoices?",
    answer:
      "Go to Billing in your portal sidebar. You'll see your payment history with downloadable invoices. You can also update your payment method from this page.",
  },
  {
    category: "Billing",
    question: "Can I upgrade my plan?",
    answer:
      "Yes! Visit the Billing page and click 'View Plans' to see available upgrades. Any pricing difference will be prorated based on your current billing cycle.",
  },
  {
    category: "Security",
    question: "How do I enable two-factor authentication?",
    answer:
      "Go to Security in your portal settings. Under 'Two-Factor Authentication', click 'Enable' and follow the setup process using an authenticator app like Google Authenticator.",
  },
  {
    category: "Security",
    question: "How do I change my password?",
    answer:
      "Navigate to Security in your portal. Enter your current password, then your new password twice to confirm. We recommend using a strong, unique password.",
  },
  {
    category: "Tools",
    question: "Why can't I access a specific tool?",
    answer:
      "Some tools require a subscription or one-time purchase. Check your current plan in Billing to see what's included. Tools marked as 'Coming Soon' are in development.",
  },
  {
    category: "Tools",
    question: "How do I get support for a specific tool?",
    answer:
      "Each tool has a help button (?) that provides tool-specific documentation. For additional support, use the contact form below or start a live chat.",
  },
];

export default function ClientSupportPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "tickets">("faq");

  // Contact form state
  const [contactSubject, setContactSubject] = useState("");
  const [contactCategory, setContactCategory] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Mock tickets
  const tickets = [
    {
      id: "TKT-1234",
      subject: "Unable to access CRM dashboard",
      status: "open",
      priority: "high",
      created: "Dec 25, 2024",
      lastUpdate: "Dec 26, 2024",
    },
    {
      id: "TKT-1189",
      subject: "Question about billing cycle",
      status: "resolved",
      priority: "low",
      created: "Dec 20, 2024",
      lastUpdate: "Dec 22, 2024",
    },
    {
      id: "TKT-1102",
      subject: "Feature request: Dark mode",
      status: "in_progress",
      priority: "medium",
      created: "Dec 15, 2024",
      lastUpdate: "Dec 24, 2024",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  const handleSendMessage = async () => {
    if (!contactSubject || !contactCategory || !contactMessage) return;

    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setSent(true);
    setContactSubject("");
    setContactCategory("");
    setContactMessage("");
    setTimeout(() => setSent(false), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-amber-500/20 border-amber-500/30 text-amber-400";
      case "in_progress":
        return "bg-[#3B82F6]/20 border-[#3B82F6]/30 text-[#3B82F6]";
      case "resolved":
        return "bg-[#47BD79]/20 border-[#47BD79]/30 text-[#47BD79]";
      default:
        return "bg-white/10 border-white/20 text-white/60";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-amber-400";
      case "low":
        return "text-[#47BD79]";
      default:
        return "text-white/60";
    }
  };

  return (
    <PortalShellV2 role="client" title="Help & Support" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-[#47BD79]/30 bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 p-6 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#47BD79]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#47BD79]/20 flex items-center justify-center">
                <QuestionMarkCircleIcon className="w-7 h-7 text-[#47BD79]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Help & Support</h1>
                <p className="text-white/60">Find answers or get in touch with our team</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full rounded-xl border border-white/20 bg-white/5 pl-12 pr-4 py-3 text-white placeholder-white/40 focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-3 rounded-2xl border border-[#47BD79]/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#47BD79]" />
            </div>
            <span className="text-sm font-medium text-white">Live Chat</span>
          </button>

          <button className="flex flex-col items-center gap-3 rounded-2xl border border-[#3B82F6]/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpenIcon className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <span className="text-sm font-medium text-white">Documentation</span>
          </button>

          <button className="flex flex-col items-center gap-3 rounded-2xl border border-[#A855F7]/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlayCircleIcon className="w-6 h-6 text-[#A855F7]" />
            </div>
            <span className="text-sm font-medium text-white">Video Guides</span>
          </button>

          <button className="flex flex-col items-center gap-3 rounded-2xl border border-amber-500/30 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AcademicCapIcon className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-sm font-medium text-white">Academy</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "faq"
                ? "bg-[#47BD79] text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "contact"
                ? "bg-[#47BD79] text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === "tickets"
                ? "bg-[#47BD79] text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            My Tickets
          </button>
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            {Object.entries(groupedFAQs).map(([category, items]) => (
              <div key={category} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                </div>
                <div className="divide-y divide-white/10">
                  {items.map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isExpanded = expandedFAQ === globalIndex;

                    return (
                      <div key={index}>
                        <button
                          onClick={() => setExpandedFAQ(isExpanded ? null : globalIndex)}
                          className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
                          {isExpanded ? (
                            <ChevronUpIcon className="w-5 h-5 text-[#47BD79] flex-shrink-0" />
                          ) : (
                            <ChevronDownIcon className="w-5 h-5 text-white/40 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-4">
                            <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredFAQs.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
                <QuestionMarkCircleIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
                <p className="text-sm text-white/60">
                  Try a different search term or contact us directly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Send us a message</h3>

                {sent && (
                  <div className="mb-6 rounded-xl bg-[#47BD79]/20 border border-[#47BD79]/30 p-4">
                    <div className="flex items-center gap-2 text-[#47BD79]">
                      <CheckCircleIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Message sent successfully!</span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
                    <select
                      value={contactCategory}
                      onChange={(e) => setContactCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors"
                    >
                      <option value="" className="bg-[#1e293b]">Select a category</option>
                      <option value="billing" className="bg-[#1e293b]">Billing & Payments</option>
                      <option value="technical" className="bg-[#1e293b]">Technical Support</option>
                      <option value="account" className="bg-[#1e293b]">Account & Access</option>
                      <option value="feature" className="bg-[#1e293b]">Feature Request</option>
                      <option value="other" className="bg-[#1e293b]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={5}
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#47BD79] focus:outline-none focus:ring-1 focus:ring-[#47BD79] transition-colors resize-none"
                      placeholder="Describe your issue or question in detail..."
                    />
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={sending || !contactSubject || !contactCategory || !contactMessage}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3da86a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#47BD79]/30"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-sm text-white/60">General Questions</span>
                    <span className="text-sm text-white">24 hours</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-sm text-white/60">Technical Issues</span>
                    <span className="text-sm text-white">12 hours</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white/60">Urgent/Critical</span>
                    <span className="text-sm text-white">4 hours</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#47BD79]/30 bg-[#47BD79]/5 backdrop-blur-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-2">Need faster help?</h3>
                <p className="text-sm text-white/60 mb-4">
                  Try our live chat for immediate assistance during business hours.
                </p>
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all">
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Your Support Tickets</h3>
              <button
                onClick={() => setActiveTab("contact")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all"
              >
                <TicketIcon className="w-4 h-4" />
                New Ticket
              </button>
            </div>

            {tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-white/50">{ticket.id}</span>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status === "open" && <ExclamationCircleIcon className="w-3 h-3 mr-1" />}
                            {ticket.status === "in_progress" && <ClockIcon className="w-3 h-3 mr-1" />}
                            {ticket.status === "resolved" && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                            {ticket.status.replace("_", " ")}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-white">{ticket.subject}</h4>
                      </div>
                      <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span>Created: {ticket.created}</span>
                      <span>Last update: {ticket.lastUpdate}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <button className="text-sm text-[#47BD79] hover:text-[#5ed492] transition-colors">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
                <TicketIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No tickets yet</h3>
                <p className="text-sm text-white/60 mb-4">
                  You haven't submitted any support tickets.
                </p>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all"
                >
                  Create Your First Ticket
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </PortalShellV2>
  );
}
