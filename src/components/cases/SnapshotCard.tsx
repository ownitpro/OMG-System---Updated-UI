"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type Props = {
  slug: string;
  industry: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  hero?: string;
  heroAlt?: string;
};

// Industry color mapping
const industryColors: Record<string, { badge: string; glow: string }> = {
  'Property Management': { badge: 'bg-blue-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]' },
  'Contractors': { badge: 'bg-orange-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]' },
  'Real Estate': { badge: 'bg-emerald-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]' },
  'Accounting': { badge: 'bg-purple-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]' },
  'Cleaning': { badge: 'bg-cyan-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]' },
  'Healthcare': { badge: 'bg-rose-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]' },
};

export default function SnapshotCard({
  slug,
  industry,
  title,
  subtitle,
  metricLabel,
  metricValue,
  hero,
  heroAlt,
}: Props) {
  const colors = industryColors[industry] || { badge: 'bg-emerald-500/90', glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]' };

  return (
    <article className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${colors.glow}`}>
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl p-[1px]">
        <div className="absolute inset-[1px] bg-slate-900/95 rounded-2xl" />
      </div>

      {/* Card Content */}
      <div className="relative">
        {/* Media: fixed aspect with enhanced gradient overlay */}
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {hero ? (
            <Image
              src={hero}
              alt={heroAlt || title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Enhanced branded placeholder with gradient */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 scale-150" />
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 ring-4 ring-emerald-400/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

          {/* Industry badge with bold styling */}
          <span className={`absolute left-4 top-4 rounded-lg ${colors.badge} text-white px-3 py-1.5 text-xs font-bold shadow-lg`}>
            {industry}
          </span>

          {/* Metric badge positioned on image */}
          <div className="absolute right-4 bottom-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 shadow-lg">
            <div className="text-xs text-white/80 font-medium">{metricLabel}</div>
            <div className="text-xl font-black text-white">{metricValue}</div>
          </div>
        </div>

        {/* Body with enhanced spacing and typography */}
        <div className="relative p-6 bg-slate-900/80">
          {/* Bold title with better line height */}
          <h3 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Subtitle with better contrast */}
          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed mb-6">
            {subtitle}
          </p>

          {/* Bold CTA button with gradient */}
          <Link
            href={`/case-snapshots/${slug}`}
            className="group/btn inline-flex items-center justify-center w-full rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 border border-white/10 hover:border-transparent text-white px-5 py-3 text-sm font-semibold transition-all"
          >
            Read Full Story
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
