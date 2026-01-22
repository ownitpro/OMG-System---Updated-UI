// lib/utm.ts

export type UTM = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
};

export function readUtmFromUrl(url: URL): UTM {
  const p = url.searchParams;
  return {
    source: p.get("utm_source") || undefined,
    medium: p.get("utm_medium") || undefined,
    campaign: p.get("utm_campaign") || undefined,
    term: p.get("utm_term") || undefined,
    content: p.get("utm_content") || undefined,
  };
}

