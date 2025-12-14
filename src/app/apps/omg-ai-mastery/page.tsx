"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AiMasteryRelationsStrip } from "@/components/apps/AiMasteryRelationsStrip";

const painPoints = [
  "You try prompting… but the answers feel generic.",
  "You know AI is powerful… but you don't know how to use it for your life or work.",
  "Your team is using AI randomly with no standards, no guardrails.",
  "You're overwhelmed by tutorials, features, and shiny tools.",
  "You're worried you'll fall behind if you don't start learning now.",
];

const individualBuilds = [
  "A personal writing assistant that helps you write faster and clearer.",
  "A planning and productivity system for your days, weeks, and projects.",
  "A learning coach system to help you understand anything quicker.",
  "A research assistant that organizes ideas and information for you.",
  "Custom AI tools you can reuse every day in your life and work.",
];

const businessBuilds = [
  "Sales follow-up systems your team can actually use.",
  "Content and marketing systems with reusable prompts and templates.",
  "SOP and operations systems built from your real processes.",
  "Internal communication templates so messages stay clear and consistent.",
  "Team standards, guardrails, and a manager dashboard for tracking progress.",
];

const faqs = [
  {
    question: "Do I need to be technical to take this course?",
    answer:
      "No. If you can type a sentence, you can follow this course. Everything is written in simple language.",
  },
  {
    question: "Which AI tools do I need?",
    answer:
      "You can use ChatGPT, Claude, Gemini, or other large language models. The course teaches skills and systems that work across tools, not just one platform.",
  },
  {
    question: "How long do I have access?",
    answer:
      "You can complete the course at your own pace. You decide how fast you move through the lessons and practice sessions.",
  },
  {
    question: "Is this just theory or real practice?",
    answer:
      "You'll practice inside a guided AI Playground. You build real prompts, systems, and workflows while you learn.",
  },
];

export default function OmgAiMasteryPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-yellow-100 to-emerald-100 py-12">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-emerald-400 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Centered Text */}
          <div className="mx-auto max-w-3xl text-center mb-6">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Become AI-smart in days, not months.
            </h1>
            <p className="mb-3 text-lg font-semibold text-amber-800 md:text-xl">
              Unlock faster work, clearer thinking, and real results with OMG AI
              Mastery.
            </p>
            <p className="mb-5 text-base text-gray-700 md:text-lg">
              Whether you're a busy professional or a leader running a full
              team, this course teaches you how to use AI the right way with
              simple steps, real examples, and tools you can use today.
            </p>
            <div className="mb-5 flex flex-col gap-2 text-xs text-gray-700 sm:flex-row sm:flex-wrap sm:justify-center md:text-sm">
              <div className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-700 md:h-5 md:w-5" />
                <span>Learn AI fast: 3 days for individuals, 2 weeks for businesses</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-700 md:h-5 md:w-5" />
                <span>Use AI with confidence (no tech background required)</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-700 md:h-5 md:w-5" />
                <span>Boost writing, planning, selling, and decision-making</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-700 md:h-5 md:w-5" />
                <span>Move from "random prompts" to "I know exactly what to say"</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/app/login"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-emerald-600 hover:shadow-xl hover:scale-[1.02] md:px-10 md:py-4 md:text-base"
              >
                Start Learning Now
                <ArrowRightIcon className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <a
                href="#course-details"
                className="inline-flex items-center justify-center rounded-xl border-2 border-amber-400 bg-white/90 px-8 py-3 text-sm font-semibold text-amber-900 backdrop-blur transition hover:bg-white hover:border-amber-500 md:px-10 md:py-4 md:text-base"
              >
                See Course Details
              </a>
            </div>
          </div>

          {/* Course preview card - side-by-side paths */}
          <div className="mx-auto max-w-4xl rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur sm:p-6">
            <h2 className="mb-3 text-center text-base font-semibold text-gray-900 sm:text-lg">
              Two clear paths. One goal: make you AI-smart.
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-amber-300 bg-amber-100 p-3 sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                  For individuals
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  3-Day Personal Course
                </p>
                <p className="mt-1 text-xs text-gray-700 sm:text-sm">
                  Learn how to write, plan, and learn faster with AI at your own pace.
                </p>
              </div>
              <div className="rounded-xl border-2 border-emerald-300 bg-emerald-100 p-3 sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  For businesses
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  2-Week Team Bootcamp
                </p>
                <p className="mt-1 text-xs text-gray-700 sm:text-sm">
                  Train your whole team to use AI with clear systems, guardrails, and real results.
                </p>
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-gray-500">
              Includes a built-in AI Playground and a professional, verifiable certificate with QR code.
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-amber-50/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Most people waste time with AI because they don't know how to talk to it.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
            You're not alone. Most people struggle with AI because no one ever
            taught them how to use it properly. OMG AI Mastery fixes that with
            simple, step-by-step lessons anyone can follow.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                  <XMarkIcon className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-sm text-gray-800">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="course-details" className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Meet OMG AI Mastery: the simple path to becoming truly AI-smart.
          </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
              This course gives you clear lessons, practical examples, and hands-on
              practice in a built-in AI Playground so you walk away with real systems,
              not just more notes.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl border-2 border-amber-300 bg-amber-100 p-6">
                <h3 className="text-lg font-semibold text-amber-900">
                  Clear, simple lessons
                </h3>
                <p className="text-sm text-amber-900/90">
                  No big words. No confusing tech jargon. Just real steps that work
                  in your everyday life and business.
                </p>
                <h3 className="pt-2 text-lg font-semibold text-amber-900">
                  Practical examples
                </h3>
                <p className="text-sm text-amber-900/90">
                  We use real emails, planning, sales, content, and operations
                  scenarios: the same things you're already doing.
                </p>
                <h3 className="pt-2 text-lg font-semibold text-amber-900">
                  Hands-on practice
                </h3>
                <p className="text-sm text-amber-900/90">
                  You actually build systems while learning, so you can use them
                  the same day.
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border-2 border-emerald-300 bg-emerald-100 p-6">
                <h3 className="text-lg font-semibold text-emerald-900">
                  AI Playground built in
                </h3>
                <p className="text-sm text-emerald-900/90">
                  Learn → practice → apply, all inside one guided space. No bouncing
                  between twenty tools.
                </p>
                <h3 className="pt-2 text-lg font-semibold text-emerald-900">
                  Designed for individuals & teams
                </h3>
                <p className="text-sm text-emerald-900/90">
                  One path for individuals, one for teams, one goal: confidence and
                  real results with AI.
                </p>
                <h3 className="pt-2 text-lg font-semibold text-emerald-900">
                  Verifiable certification
                </h3>
                <p className="text-sm text-emerald-900/90">
                  Your certificate is professional, scannable via QR code, and
                  ready for resumes, promotions, and internal records.
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* TWO COURSES SECTION */}
      <section className="bg-amber-50/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
            Two courses, one goal: become confident, fast, and effective with AI.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
            Choose the path that fits you now. Both lead to clearer thinking,
            faster work, and real systems you can reuse.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Personal Course */}
                  <div className="flex flex-col rounded-2xl border-2 border-amber-300 bg-white p-8 shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                      For Individuals
                    </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                3-Day Personal Course
              </h3>
              <p className="mt-3 text-sm text-gray-700">
                Perfect for students, creators, job seekers, freelancers, and
                professionals who want to use AI better in daily life and work.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-800">
                <li>• How to talk to AI so it really understands you.</li>
                <li>• How to write better, faster, and clearer.</li>
                <li>• How to plan your day, week, or life with AI.</li>
                <li>• How to learn anything quicker using AI.</li>
                <li>• How to create systems you can reuse forever.</li>
              </ul>
                    <p className="mt-4 text-sm font-semibold text-amber-800">
                      Most learners feel a clear difference in 3 days or less, and you
                      can always go at your own pace.
                    </p>
              <div className="mt-6">
                <Link
                  href="/app/signup?track=personal"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-amber-600 hover:to-emerald-600 hover:shadow-xl"
                >
                  Start the 3-Day Personal Course
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Business Course */}
                  <div className="flex flex-col rounded-2xl border-2 border-emerald-300 bg-white p-8 shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                      For Businesses & Teams
                    </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                2-Week Team Bootcamp
              </h3>
              <p className="mt-3 text-sm text-gray-700">
                Perfect for companies, departments, and leaders who want
                consistent, safe, high-impact AI use across the organization.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-800">
                <li>• Clear AI systems for writing, planning, and communication.</li>
                <li>• Turn messy processes into SOPs, checklists, and workflows.</li>
                <li>• Improve sales follow-ups and objection practice.</li>
                <li>• Create reusable marketing systems and templates.</li>
                <li>• Set guardrails and safe data usage rules.</li>
                <li>• Manager-only tips, team defaults, and progress tracking.</li>
              </ul>
                    <p className="mt-4 text-sm font-semibold text-emerald-800">
                      Teams can be fully up and running in about 2 weeks without
                      overwhelming staff.
                    </p>
              <div className="mt-6">
                <Link
                  href="/contact?topic=ai-mastery-teams"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-100"
                >
                  Enroll Your Entire Team
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              AI isn't the future, it's the present. But only if you know how to use it.
            </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
            OMG AI Mastery is different: simple language, real examples from real
            work, and clear steps you can follow. No noise, no fluff, just a
            friendly, guided path.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Simple language (anyone can learn).",
              "Real examples from real teams and workflows.",
              "Clear steps, not random \"tips & tricks.\"",
              "Friendly, motivating teaching style.",
              "Business systems you can plug in right away.",
              "A safe, guided path, not a confusing YouTube mess.",
            ].map((item, idx) => (
              <div
                key={idx}
                      className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200"
                    >
                      <CheckCircleIcon className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-700" />
                <p className="text-sm text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL BUILD */}
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
            What you'll actually build inside OMG AI Mastery.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
            You don't just learn concepts. You leave with tools you can use the same day.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold text-gray-900">
                For Personal Learners
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                By the end of the course, you'll have:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-800">
                {individualBuilds.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
                  <div className="rounded-2xl bg-white p-8 shadow-md border border-emerald-200">
                    <h3 className="text-xl font-bold text-gray-900">For Businesses</h3>
              <p className="mt-2 text-sm text-gray-700">
                Your team will walk away with:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-800">
                {businessBuilds.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Show your skills with a real, verifiable certificate.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-gray-700">
            When you finish the course, you'll earn a digital certificate with
            your name, your course completion, a unique verification code, and a
            QR code that anyone can scan to verify it.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-xl bg-emerald-50 p-6 text-center border border-emerald-200">
                    <p className="text-sm font-semibold text-gray-900">
                      Job Applications
                    </p>
              <p className="mt-2 text-xs text-gray-700">
                Stand out by showing you're AI-smart, not just "curious."
              </p>
            </div>
                  <div className="rounded-xl bg-amber-50 p-6 text-center border border-amber-200">
                    <p className="text-sm font-semibold text-gray-900">Promotions</p>
              <p className="mt-2 text-xs text-gray-700">
                Prove you're ready to lead with AI, not get dragged behind it.
              </p>
            </div>
                  <div className="rounded-xl bg-emerald-50 p-6 text-center border border-emerald-200">
                    <p className="text-sm font-semibold text-gray-900">
                      Team Records & Compliance
                    </p>
              <p className="mt-2 text-xs text-gray-700">
                Give HR and leadership a clean record of who's trained and how.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section className="bg-gradient-to-br from-amber-50 to-emerald-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Clear, simple pricing.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-700">
            Individuals: one-time purchase with optional membership.  
            Businesses: one-time bootcamp with optional monthly access for teams.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-8 shadow-md border-2 border-amber-300">
                    <h3 className="text-xl font-bold text-gray-900">For Individuals</h3>
              <p className="mt-3 text-sm text-gray-700">
                One-time course purchase, with an option to add ongoing
                membership if you want support, updates, or extra systems later.
              </p>
            </div>
                  <div className="rounded-2xl bg-white p-8 shadow-md border-2 border-emerald-300">
                    <h3 className="text-xl font-bold text-gray-900">
                      For Businesses & Teams
                    </h3>
              <p className="mt-3 text-sm text-gray-700">
                One-time bootcamp for the full rollout, plus optional monthly
                access if you want to keep training, tracking, and improving over
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-gray-200 bg-white p-6"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-gray-900">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-gray-400 transition group-open:rotate-180">
                    ˅
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-emerald-600 py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            You don't need to be "techy" to get good at AI.
          </h2>
          <p className="mb-8 text-lg text-amber-50/90">
            You just need a guide. OMG AI Mastery gives you a clear path in 3
            days for individuals, or 2 weeks for teams.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/app/signup"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-sm font-semibold text-emerald-600 shadow-lg transition hover:bg-amber-50"
            >
              Start Learning Now
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact?topic=ai-mastery-teams"
              className="inline-flex items-center justify-center rounded-xl border border-white/70 bg-transparent px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-white/10"
            >
              Enroll Your Team
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="bg-gray-900 py-4 text-center text-xs text-gray-400">
        Powered by OMGsystems 2025
      </div>

      {/* Relations Strip */}
      <AiMasteryRelationsStrip />
    </main>
  );
}

