"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const categories = [
  { name: "All", color: "white", count: 6 },
  { name: "Property Management", color: "emerald", count: 2 },
  { name: "Contractor Growth", color: "amber", count: 2 },
  { name: "Healthcare", color: "rose", count: 2 },
];

const featuredArticle = {
  slug: "how-ontario-property-managers-cut-owner-statement-time",
  title: "How Ontario Property Managers Cut Owner Statement Time from 14 Days to 0",
  excerpt: "Discover how Ontario property managers eliminated 14-day owner delays using automation and SecureVault Docs. A complete guide to transforming your property management workflow.",
  date: "Dec 20, 2024",
  readTime: "8 min read",
  author: "OMGsystems Editorial Team",
  category: "Property Management",
  image: "🏢",
  color: "emerald",
};

const articles = [
  {
    slug: "the-45-minute-quote-how-ontario-builders-win-jobs-faster",
    title: "The 45-Minute Quote: How Ontario Builders Win Jobs Faster",
    excerpt: "Learn how GTA contractors slash quoting time by 80% using automation with OMGsystems' Contractor Growth Engine.",
    date: "Dec 18, 2024",
    readTime: "5 min",
    author: "OMGsystems Editorial Team",
    category: "Contractor Growth",
    color: "amber",
  },
  {
    slug: "from-paper-charts-to-careflow-how-ontario-clinics-reduced-admin-time",
    title: "From Paper Charts to CareFlow: How Ontario Clinics Reduced Admin Time by 70%",
    excerpt: "Learn how Ontario healthcare teams cut admin time by 70%, reduced errors, and improved patient satisfaction.",
    date: "Dec 15, 2024",
    readTime: "6 min",
    author: "OMGsystems Editorial Team",
    category: "Healthcare",
    color: "rose",
  },
  {
    slug: "automation-roi-calculator-how-to-measure-your-savings",
    title: "Automation ROI Calculator: How to Measure Your Savings",
    excerpt: "A practical guide to calculating the return on investment for business automation projects.",
    date: "Dec 12, 2024",
    readTime: "4 min",
    author: "OMGsystems Editorial Team",
    category: "Property Management",
    color: "emerald",
  },
  {
    slug: "lead-nurturing-sequences-that-convert",
    title: "Lead Nurturing Sequences That Actually Convert",
    excerpt: "The exact email sequences that helped contractors increase their close rate by 40%.",
    date: "Dec 10, 2024",
    readTime: "7 min",
    author: "OMGsystems Editorial Team",
    category: "Contractor Growth",
    color: "amber",
  },
  {
    slug: "patient-communication-automation-best-practices",
    title: "Patient Communication Automation: Best Practices for 2025",
    excerpt: "How to automate patient communications while maintaining the personal touch patients expect.",
    date: "Dec 8, 2024",
    readTime: "5 min",
    author: "OMGsystems Editorial Team",
    category: "Healthcare",
    color: "rose",
  },
];

const popularTags = [
  "automation", "Ontario", "property management", "CRM", "healthcare",
  "contractors", "SecureVault", "CareFlow", "efficiency", "digital transformation",
  "workflow", "ROI", "case study", "best practices",
];

const insights = [
  { value: "70%", label: "Avg. Time Saved", icon: ClockIcon },
  { value: "14→0", label: "Days to Process", icon: ArrowTrendingUpIcon },
  { value: "40%", label: "Higher Close Rate", icon: ChartBarIcon },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute top-[40%] right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[70%] left-1/3 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <BookOpenIcon className="w-4 h-4" />
              OMGsystems Blog
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Business{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                Automation Insights
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
              Discover how Ontario businesses are transforming their operations with automation.
              Case studies, industry insights, and implementation guides.
            </p>

            {/* Insights Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {insights.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-3xl font-bold ${
                    idx === 0 ? "text-emerald-400" : idx === 1 ? "text-amber-400" : "text-rose-400"
                  }`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-white/50 flex items-center gap-1 justify-center mt-1">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== CATEGORY FILTER - Pill Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.name
                    ? cat.color === "emerald"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : cat.color === "amber"
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                      : cat.color === "rose"
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                      : "bg-white text-slate-900 shadow-lg shadow-white/20"
                    : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                }`}
              >
                {cat.name}
                <span className="ml-2 text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== FEATURED ARTICLE - Large Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              Featured Article
            </div>
          </div>

          <Link href={`/blog/${featuredArticle.slug}`}>
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all" />

              <div className="relative z-10 p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {featuredArticle.category}
                      </span>
                      <span className="text-white/40 text-sm flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {featuredArticle.date}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-white/60 text-lg mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <UserIcon className="w-4 h-4" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <ClockIcon className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <BuildingOfficeIcon className="w-20 h-20 text-white" />
                    </div>
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-2 text-emerald-400 font-medium mt-6">
                  <span>Read Full Article</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ===== ARTICLES GRID - Card Variety ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              Latest{" "}
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
            <span className="text-white/40 text-sm">{filteredArticles.length} articles</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <div
                  className={`group h-full backdrop-blur-xl rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.02] ${
                    article.color === "emerald"
                      ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-400/40 hover:bg-emerald-500/10"
                      : article.color === "amber"
                      ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-400/40 hover:bg-amber-500/10"
                      : "bg-rose-500/5 border-rose-500/20 hover:border-rose-400/40 hover:bg-rose-500/10"
                  }`}
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        article.color === "emerald"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : article.color === "amber"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {article.category}
                    </span>
                    <span className="text-white/40 text-xs">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-white transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {article.readTime}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        article.color === "emerald"
                          ? "text-emerald-400"
                          : article.color === "amber"
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      Read
                      <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== CATEGORIES SHOWCASE - Icon Cards ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Explore by{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                Industry
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Property Management",
                desc: "Automate owner statements, tenant communications, and maintenance workflows",
                icon: BuildingOfficeIcon,
                color: "emerald",
                articles: 12,
              },
              {
                name: "Contractor Growth",
                desc: "Win more jobs with faster quotes, better lead nurturing, and CRM automation",
                icon: WrenchScrewdriverIcon,
                color: "amber",
                articles: 8,
              },
              {
                name: "Healthcare",
                desc: "Streamline patient intake, reduce admin time, and improve care coordination",
                icon: HeartIcon,
                color: "rose",
                articles: 10,
              },
            ].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                className={`group text-left backdrop-blur-xl rounded-3xl border p-8 transition-all duration-500 hover:scale-[1.02] ${
                  cat.color === "emerald"
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-400/40"
                    : cat.color === "amber"
                    ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-400/40"
                    : "bg-rose-500/5 border-rose-500/20 hover:border-rose-400/40"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    cat.color === "emerald"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
                      : cat.color === "amber"
                      ? "bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30"
                      : "bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30"
                  }`}
                >
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{cat.name}</h3>
                <p className="text-white/50 text-sm mb-4">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">{cat.articles} articles</span>
                  <ArrowRightIcon
                    className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                      cat.color === "emerald"
                        ? "text-emerald-400"
                        : cat.color === "amber"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== POPULAR TAGS - Cloud Style ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <TagIcon className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Popular Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-amber-500/30 text-white/60 hover:text-white text-sm transition-all duration-300"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== NEWSLETTER - CTA Card ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-amber-500/10 to-rose-500/20" />
              <div className="relative backdrop-blur-xl border border-white/10 p-8 lg:p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-amber-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <NewspaperIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h2>
                <p className="text-white/60 mb-8 max-w-lg mx-auto">
                  Get the latest automation insights, case studies, and industry tips delivered to your inbox. No spam, just value.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                    Subscribe
                  </button>
                </div>

                <p className="text-white/40 text-xs mt-4">Join 2,500+ Ontario business owners</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-amber-600 to-rose-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            See how OMGsystems can automate your workflows and boost your efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apps/demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Try Live Demos
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
