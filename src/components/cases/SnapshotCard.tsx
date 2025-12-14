"use client";

import Link from "next/link";
import Image from "next/image";

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
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Media: fixed aspect so layout never collapses */}
      <div className="relative w-full aspect-[16/9] bg-slate-50">
        {hero ? (
          <Image
            src={hero}
            alt={heroAlt || title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Branded placeholder */}
            <div className="h-12 w-12 rounded-full bg-lime-400/20 ring-2 ring-lime-400/60" />
          </div>
        )}
        {/* Industry badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
          {industry}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 leading-snug">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{subtitle}</p>

        {/* Metric row */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-500">{metricLabel}</div>
          <div className="rounded-full bg-lime-400/15 px-2.5 py-1 text-sm font-semibold text-lime-700">
            {metricValue}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <Link
            href={`/case-snapshots/${slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-3.5 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Read Full Story
          </Link>
        </div>
      </div>
    </article>
  );
}
