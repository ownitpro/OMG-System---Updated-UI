"use client";

// app/contact/page.tsx
import * as React from "react";
import Link from "next/link";
import { contact } from "@/content/contact";

export default function ContactPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent(contact.analytics.view));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO + CONTENT SECTION - All in One Flow
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-40 sm:pt-48 pb-20 sm:pb-28">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="contactGridGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.15)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </linearGradient>
              <linearGradient
                id="contactVerticalGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0)" />
                <stop offset="50%" stopColor="rgba(20, 184, 166, 0.1)" />
                <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
              </linearGradient>
            </defs>

            {/* Horizontal lines */}
            {[100, 200, 300, 400, 500].map((y, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                stroke="url(#contactGridGradient)"
                strokeWidth="1"
                opacity={0.3 - i * 0.04}
              />
            ))}

            {/* Vertical lines */}
            {[150, 300, 450, 600, 750, 900, 1050].map((x, i) => (
              <line
                key={`v-${i}`}
                x1={x}
                y1="0"
                x2={x}
                y2="600"
                stroke="url(#contactVerticalGradient)"
                strokeWidth="1"
                opacity={0.2}
              />
            ))}

            {/* Animated pulse dots at intersections */}
            <circle r="4" fill="#06B6D4" opacity="0.6">
              <animate
                attributeName="cx"
                values="300;600;900;600;300"
                dur="12s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="200;300;200;100;200"
                dur="12s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0.3;0.6;0.3;0.6"
                dur="12s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3" fill="#14B8A6" opacity="0.5">
              <animate
                attributeName="cx"
                values="600;900;600;300;600"
                dur="10s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="300;400;300;200;300"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Chat bubble */}
          <div className="absolute top-[20%] left-[10%] text-cyan-400/20 float-contact">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          {/* Envelope */}
          <div className="absolute top-[30%] right-[8%] text-teal-400/15 float-contact-delayed">
            <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          {/* Phone */}
          <div className="absolute bottom-[25%] left-[5%] text-cyan-500/15 float-contact">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </div>
          {/* Location pin */}
          <div className="absolute bottom-[35%] right-[12%] text-teal-400/20 float-contact-delayed">
            <svg className="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </div>

        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] cyan-glow-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] cyan-glow-float-delayed" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-16">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Let's Connect
            </span>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                {contact.hero.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8">
              {contact.hero.subtitle}
            </p>

            {/* Trust badges */}
            {contact.hero.badges?.length ? (
              <div className="flex flex-wrap justify-center gap-3">
                {contact.hero.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-sm text-white/80"
                  >
                    <svg
                      className="w-4 h-4 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Two Column Layout - Info + Form */}
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left Column - Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* How we help */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {contact.reasons.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {contact.reasons.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-3 h-3 text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-white/70 text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office Location */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-teal-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Our Office
                  </h2>
                </div>
                <div className="space-y-4">
                  {contact.offices.map((o) => (
                    <div key={o.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {o.label}
                        </div>
                        <div className="text-white/50 text-sm">
                          {o.address}, {o.city}, {o.province}, {o.country}{" "}
                          {o.postal}
                        </div>
                        <div className="text-white/40 text-xs mt-1">
                          {o.hours}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    Quick Answers
                  </h2>
                </div>
                <div className="space-y-3">
                  {contact.faq.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="cursor-pointer font-medium text-white/90 hover:text-cyan-400 transition-colors flex items-center justify-between text-sm py-2">
                        <span>{f.q}</span>
                        <svg
                          className="w-4 h-4 text-white/40 group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <p className="mt-2 text-white/50 text-sm leading-relaxed pl-0">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>

              </div>

              {/* Quick Links */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/5 rounded-2xl border border-cyan-500/20 p-6">
                <h3 className="text-sm font-semibold text-white mb-4">
                  Quick Access to Lead Forms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Apps Lead Form */}
                  <Link
                    href="/apps#waiting-list-form"
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors">
                      Apps
                    </span>
                  </Link>

                  {/* Solutions Lead Form */}
                  <Link
                    href="/solutions#lead-form"
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/40 transition-all text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors">
                      Solutions
                    </span>
                  </Link>

                  {/* Marketing Lead Form */}
                  <Link
                    href="/marketing"
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors">
                      Marketing
                    </span>
                  </Link>

                  {/* Industries Lead Form */}
                  <Link
                    href="/industries#lead-form"
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-white/70 group-hover:text-white transition-colors">
                      Industries
                    </span>
                  </Link>
                </div>
              </div>



            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contact.schema.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contact.schema.breadcrumb),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contact.schema.faq) }}
      />
    </main >
  );
}

/* ========== Client component for the form ========== */
function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [showOtherModal, setShowOtherModal] = React.useState(false);
  const [otherIndustry, setOtherIndustry] = React.useState("");
  const [tempOtherIndustry, setTempOtherIndustry] = React.useState("");

  const [selectedBudget, setSelectedBudget] = React.useState("");
  const [showBudgetModal, setShowBudgetModal] = React.useState(false);
  const [otherBudget, setOtherBudget] = React.useState("");
  const [tempOtherBudget, setTempOtherBudget] = React.useState("");

  // Date range picker state
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [selectingEndDate, setSelectingEndDate] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [calendarMonth, setCalendarMonth] = React.useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = React.useState(new Date().getFullYear());
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const handleIndustryChange = (value: string) => {
    if (value === "Other") {
      setTempOtherIndustry(otherIndustry);
      setShowOtherModal(true);
    } else {
      setSelectedIndustry(value);
      setOtherIndustry("");
    }
  };

  const handleOtherConfirm = () => {
    if (tempOtherIndustry.trim()) {
      setOtherIndustry(tempOtherIndustry.trim());
      setSelectedIndustry("Other");
      setShowOtherModal(false);
    }
  };

  const handleOtherCancel = () => {
    setTempOtherIndustry("");
    setShowOtherModal(false);
    if (!otherIndustry) {
      setSelectedIndustry("");
    }
  };

  const handleBudgetChange = (value: string) => {
    if (value === "Flexible") {
      setTempOtherBudget(otherBudget);
      setShowBudgetModal(true);
    } else {
      setSelectedBudget(value);
      setOtherBudget("");
    }
  };

  const handleBudgetInputChange = (value: string) => {
    // Only allow numbers and commas
    const numericValue = value.replace(/[^0-9,]/g, "");
    setTempOtherBudget(numericValue);
  };

  const formatBudgetDisplay = (value: string) => {
    if (!value) return "";
    // Add commas for thousands
    const num = value.replace(/,/g, "");
    return `$${Number(num).toLocaleString()}/mo`;
  };

  const handleBudgetConfirm = () => {
    if (tempOtherBudget.trim()) {
      const formattedBudget = formatBudgetDisplay(tempOtherBudget);
      setOtherBudget(formattedBudget);
      setSelectedBudget("Flexible");
      setShowBudgetModal(false);
    }
  };

  const handleBudgetCancel = () => {
    setTempOtherBudget("");
    setShowBudgetModal(false);
    if (!otherBudget) {
      setSelectedBudget("");
    }
  };

  // Date picker helpers
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDateDisplay = (date: Date) => {
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (year: number, month: number, day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  const isToday = (year: number, month: number, day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const isStartDate = (year: number, month: number, day: number) => {
    if (!startDate) return false;
    return (
      startDate.getFullYear() === year &&
      startDate.getMonth() === month &&
      startDate.getDate() === day
    );
  };

  const isEndDate = (year: number, month: number, day: number) => {
    if (!endDate) return false;
    return (
      endDate.getFullYear() === year &&
      endDate.getMonth() === month &&
      endDate.getDate() === day
    );
  };

  const isInRange = (year: number, month: number, day: number) => {
    if (!startDate || !endDate) return false;
    const checkDate = new Date(year, month, day);
    return checkDate > startDate && checkDate < endDate;
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(calendarYear, calendarMonth, day)) return;

    const selectedDate = new Date(calendarYear, calendarMonth, day);

    if (!selectingEndDate) {
      // Selecting start date
      setStartDate(selectedDate);
      setEndDate(null);
      setSelectingEndDate(true);
    } else {
      // Selecting end date
      if (selectedDate < startDate!) {
        // If selected date is before start date, swap them
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
      setSelectingEndDate(false);
      setShowCalendar(false);
    }
  };

  const formatDateRangeDisplay = () => {
    if (!startDate && !endDate) return "";
    if (startDate && !endDate) return `${formatDateDisplay(startDate)} - Select end date`;
    if (startDate && endDate) return `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`;
    return "";
  };

  const clearDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectingEndDate(false);
  };

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  // Close calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      window.dispatchEvent(new CustomEvent(contact.analytics.submit));
      setStatus("submitting");

      // Prepare submission data with metadata
      const submissionData = {
        ...data,
        source: 'contact-page',
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      };

      // Send to n8n webhook (primary) and API (secondary) in parallel
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_CONTACT;

      if (webhookUrl) {
        // Send to webhook
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData)
          // Removed mode: 'no-cors' to allow proper JSON body transmission to n8n
        });
        console.log('Contact webhook sent to:', webhookUrl);
        console.log('Submission data:', submissionData);
      }

      // Try to send to API as well (non-blocking)
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        console.log('Contact API submission successful');
      } catch (error) {
        console.warn('Contact API failed (non-blocking):', error);
        // Don't throw - webhook is the primary submission method
      }

      // Show success if webhook was sent - form stays locked
      setStatus("success");
      window.dispatchEvent(new CustomEvent(contact.analytics.success));
      // Form stays in success state - no reset, one-time submission only
    } catch {
      setStatus("error");
      window.dispatchEvent(new CustomEvent(contact.analytics.error));
      // Error state allows retry
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:border-cyan-500/20 transition-all duration-300">
      {/* Form Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {contact.form.title}
            </h2>
            <p className="text-white/50 text-sm">{contact.form.subtitle}</p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Full name <span className="text-cyan-400">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Work email <span className="text-cyan-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none"
              placeholder="john@company.com"
            />
          </div>
        </div>

        {/* Company & Phone Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-company"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Company
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none"
              placeholder="Your company name"
            />
          </div>
          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Phone{" "}
              <span className="text-white/40 font-normal">(optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none"
              placeholder="+1 (___) ___-____"
            />
          </div>
        </div>

        {/* Industry & Budget Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-industry"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Industry <span className="text-cyan-400">*</span>
            </label>
            <select
              id="contact-industry"
              name="industry"
              required
              value={selectedIndustry}
              onChange={(e) => handleIndustryChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2306B6D4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "20px",
              }}
            >
              <option value="">Select industry</option>
              {contact.form.fields.industries.map((i) => (
                <option key={i} value={i}>
                  {i === "Other" && otherIndustry ? `Other: ${otherIndustry}` : i}
                </option>
              ))}
            </select>
            {/* Hidden input for form submission */}
            {selectedIndustry === "Other" && otherIndustry && (
              <input type="hidden" name="otherIndustry" value={otherIndustry} />
            )}
          </div>
          <div>
            <label
              htmlFor="contact-budget"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Monthly budget <span className="text-cyan-400">*</span>
            </label>
            <select
              id="contact-budget"
              name="budget"
              required
              value={selectedBudget}
              onChange={(e) => handleBudgetChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2306B6D4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "20px",
              }}
            >
              <option value="">Select budget</option>
              {contact.form.fields.budgets.map((b) => (
                <option key={b} value={b}>
                  {b === "Flexible" && otherBudget ? `Flexible: ${otherBudget}` : b}
                </option>
              ))}
            </select>
            {/* Hidden input for form submission */}
            {selectedBudget === "Flexible" && otherBudget && (
              <input type="hidden" name="otherBudget" value={otherBudget} />
            )}
          </div>
        </div>

        {/* Timeline Row - Date Range Picker */}
        <div ref={calendarRef}>
          <label
            htmlFor="contact-timeline"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            Project Timeline <span className="text-cyan-400">*</span>
            <span className="text-white/40 font-normal ml-2">(Start - End)</span>
          </label>
          <div className="relative">
            {/* Date Range Input - Using div to avoid nested button issue */}
            <div
              onClick={() => setShowCalendar(!showCalendar)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowCalendar(!showCalendar);
                }
              }}
              className={`w-full rounded-xl border bg-slate-900 px-4 py-3 text-left text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none cursor-pointer flex items-center justify-between hover:border-cyan-500/30 ${selectingEndDate ? "border-cyan-500/50 ring-2 ring-cyan-500/30" : "border-white/10"
                }`}
            >
              <span className={startDate ? "text-white" : "text-white/30"}>
                {formatDateRangeDisplay() || "Select start and end dates"}
              </span>
              <div className="flex items-center gap-2">
                {(startDate || endDate) && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      clearDateRange();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        clearDateRange();
                      }
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white/50 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Hidden inputs for form submission */}
            <input
              type="hidden"
              name="timeline_start"
              value={startDate ? formatDateDisplay(startDate) : ""}
            />
            <input
              type="hidden"
              name="timeline_end"
              value={endDate ? formatDateDisplay(endDate) : ""}
            />
            <input
              type="hidden"
              name="timeline"
              value={startDate && endDate ? `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}` : ""}
              required
            />

            {/* Calendar Dropdown */}
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 z-50 w-full sm:w-80 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 p-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Selection Indicator */}
                <div className="mb-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <p className="text-sm text-cyan-400 font-medium">
                    {!startDate && "Select start date"}
                    {startDate && !endDate && "Now select end date"}
                    {startDate && endDate && "Date range selected"}
                  </p>
                </div>

                {/* Month/Year Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-white font-semibold">
                    {monthNames[calendarMonth]} {calendarYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs text-white/50 font-medium py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the first of the month */}
                  {Array.from({ length: getFirstDayOfMonth(calendarYear, calendarMonth) }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-full aspect-square" />
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: getDaysInMonth(calendarYear, calendarMonth) }).map((_, i) => {
                    const day = i + 1;
                    const disabled = isDateDisabled(calendarYear, calendarMonth, day);
                    const today = isToday(calendarYear, calendarMonth, day);
                    const isStart = isStartDate(calendarYear, calendarMonth, day);
                    const isEnd = isEndDate(calendarYear, calendarMonth, day);
                    const inRange = isInRange(calendarYear, calendarMonth, day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        disabled={disabled}
                        className={`w-full aspect-square rounded-lg text-sm font-medium transition-all
                          ${disabled
                            ? "text-white/20 cursor-not-allowed"
                            : isStart
                              ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 rounded-r-none"
                              : isEnd
                                ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 rounded-l-none"
                                : inRange
                                  ? "bg-cyan-500/20 text-cyan-300 rounded-none"
                                  : today
                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30"
                                    : "text-white hover:bg-white/10"
                          }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      setCalendarMonth(today.getMonth());
                      setCalendarYear(today.getFullYear());
                    }}
                    className="flex-1 py-2 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Go to Today
                  </button>
                  {(startDate || endDate) && (
                    <button
                      type="button"
                      onClick={clearDateRange}
                      className="flex-1 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-white/80 mb-2"
          >
            What problem should we solve first?{" "}
            <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none resize-none"
            placeholder="e.g., We need consistent leads; proposals and document collection take too long..."
          />
        </div>

        {/* CASL Consent */}
        <div className="flex items-start gap-3">
          <input
            id="contact-casl"
            type="checkbox"
            name="casl"
            required
            className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
          />
          <label htmlFor="contact-casl" className="text-sm text-white/60">
            {contact.form.caslNote}
          </label>
        </div>

        {/* Privacy note */}
        <p className="text-xs text-white/40">{contact.form.privacyNote}</p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : status === "success" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submitted Successfully
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {contact.form.submitLabel}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          )}
        </button>

        {/* Status Messages */}
        {status === "success" && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-emerald-400 font-medium text-sm">
                  {contact.form.successTitle}
                </p>
                <p className="text-emerald-400/70 text-sm mt-1">
                  {contact.form.successBody}
                </p>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-red-400 font-medium text-sm">
                  {contact.form.errorTitle}
                </p>
                <p className="text-red-400/70 text-sm mt-1">
                  {contact.form.errorBody}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Other Industry Modal */}
      {showOtherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleOtherCancel}
          />

          {/* Modal */}
          <div className="relative bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-cyan-500/20 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Specify Your Industry</h3>
                <p className="text-sm text-white/50">Tell us what industry you're in</p>
              </div>
            </div>

            {/* Input */}
            <input
              type="text"
              value={tempOtherIndustry}
              onChange={(e) => setTempOtherIndustry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleOtherConfirm();
                }
              }}
              placeholder="e.g., Manufacturing, Education, Retail..."
              className="w-full rounded-xl border border-cyan-500/30 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none mb-6"
              autoFocus
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleOtherCancel}
                className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOtherConfirm}
                disabled={!tempOtherIndustry.trim()}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleBudgetCancel}
          />

          {/* Modal */}
          <div className="relative bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-cyan-500/20 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Specify Your Budget</h3>
                <p className="text-sm text-white/50">Tell us your estimated monthly budget</p>
              </div>
            </div>

            {/* Input with $ prefix */}
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-semibold text-lg">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={tempOtherBudget}
                onChange={(e) => handleBudgetInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleBudgetConfirm();
                  }
                }}
                placeholder="Enter amount (e.g., 1500)"
                className="w-full rounded-xl border border-cyan-500/30 bg-white/5 pl-8 pr-16 py-3 text-white placeholder-white/30 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">/mo</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBudgetCancel}
                className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBudgetConfirm}
                disabled={!tempOtherBudget.trim()}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
