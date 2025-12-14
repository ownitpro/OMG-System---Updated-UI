import React from "react";
import { metadata } from "./metadata";
import SearchBar from "../../components/blog/SearchBar";
import ArticleCard from "../../components/blog/ArticleCard";
import CategoryFilter from "../../components/blog/CategoryFilter";
import TagCloud from "../../components/blog/TagCloud";
import { CTASection } from "../../components/common/cta-section";

export { metadata };

const mockArticles = [
  {
    slug: "how-ontario-property-managers-cut-owner-statement-time",
    title: "How Ontario Property Managers Cut Owner Statement Time from 14 Days to 0",
    excerpt: "Discover how Ontario property managers eliminated 14-day owner delays using automation and SecureVault Docs.",
    date: "Oct 13, 2025",
    readTime: "5 min",
    authors: ["OMGsystems Editorial Team"],
    categories: ["Property Management Automation"],
    tags: [
      "property management automation",
      "Ontario PM software",
      "owner statements",
    ],
  },
  {
    slug: "the-45-minute-quote-how-ontario-builders-win-jobs-faster",
    title: "The 45-Minute Quote: How Ontario Builders Win Jobs Faster",
    excerpt: "Learn how GTA contractors slash quoting time by 80% using automation with OMGsystems' Contractor Growth Engine.",
    date: "Oct 13, 2025",
    readTime: "4-6 min",
    authors: ["OMGsystems Editorial Team"],
    categories: ["Contractor Growth / CRM Automation"],
    tags: ["contractor CRM", "Ontario construction leads", "fast quotes"],
  },
  {
    slug: "from-paper-charts-to-careflow-how-ontario-clinics-reduced-admin-time",
    title: "From Paper Charts to CareFlow: How Ontario Clinics Reduced Admin Time by 70%",
    excerpt: "Learn how Ontario healthcare teams cut admin time by 70%, reduced errors, and improved patient satisfaction using CareFlow Automation by OMGsystems.",
    date: "Oct 13, 2025",
    readTime: "6-8 min",
    authors: ["OMGsystems Editorial Team"],
    categories: ["Healthcare Automation"],
    tags: ["healthcare automation", "Ontario clinics", "CareFlow"],
  },
];

export default function BlogIndexPage() {
  return (
    <main>
      <section className="blog-hero py-16 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Business Automation Blog
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Discover how Ontario businesses are transforming their operations with
            automation. Read case studies, industry insights, and
            implementation guides from the OMGsystems team.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar placeholder="Search articles..." />
        </div>
        
        <div className="my-8">
          <CategoryFilter
            categories={[
              "Property Management Automation",
              "Contractor Growth / CRM Automation",
              "Healthcare Automation",
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              readTime={article.readTime}
              authors={article.authors}
              categories={article.categories}
              tags={article.tags}
            />
          ))}
        </div>
        
        <div className="mb-12">
          <TagCloud
            tags={[
              "property management automation",
              "Ontario PM software",
              "owner statements",
              "SecureVault Docs",
              "contractor CRM",
              "Ontario construction leads",
              "fast quotes",
              "healthcare automation",
              "Ontario clinics",
              "CareFlow",
              "automation",
              "OMGsystems",
              "digital transformation",
              "business efficiency",
            ]}
          />
        </div>
      </div>

      <CTASection
        title="Stay Updated with Automation Insights"
        subtitle="Get the latest case studies, industry insights, and automation tips delivered to your inbox."
        primaryCta={{ label: "Subscribe", href: "/subscribe" }}
      />

      <section className="final-cta py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            See how OMGsystems can automate your workflows and boost your efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/apps/demo" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Try Live Demos
            </a>
            <a 
              href="/case-snapshots" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}