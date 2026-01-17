import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SNAPSHOTS } from '../snapshots';
import SnapshotContent from './SnapshotContent';

// Generate static params for all snapshots
export async function generateStaticParams() {
  return SNAPSHOTS.map((snapshot) => ({
    slug: snapshot.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const snap = SNAPSHOTS.find((s) => s.slug === params.slug);
  if (!snap) {
    return {
      title: "Not Found | OMGsystems",
      description: "Case not found",
    };
  }
  return {
    title: snap.title + " | Case Snapshots | OMGsystems",
    description: snap.subtitle,
    openGraph: {
      title: snap.title,
      description: snap.subtitle,
      url: `https://www.omgsystems.com/case-snapshots/${snap.slug}`,
      images: snap.hero
        ? [
          {
            url: snap.hero,
            width: 1200,
            height: 630,
            alt: snap.heroAlt || snap.title,
          },
        ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: snap.title,
      description: snap.subtitle,
      images: snap.hero ? [snap.hero] : [],
    },
  };
}

export default async function SnapshotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snap = SNAPSHOTS.find((s) => s.slug === slug);

  if (!snap) {
    notFound();
  }

  return <SnapshotContent snap={snap} />;
}
