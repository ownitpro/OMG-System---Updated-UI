import type { Metadata } from 'next';

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  // This will be handled in the page.tsx file
  return {
    metadataBase: new URL("https://www.omgsystems.com"),
    title: "Case Snapshot | OMGsystems",
    description: "Real results from businesses using OMGsystems automation",
  };
}
