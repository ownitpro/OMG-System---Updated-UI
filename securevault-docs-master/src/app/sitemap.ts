// src/app/sitemap.ts
// Sitemap for SEO

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://securevaultdocs.com";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/pricing`, lastModified: new Date() },
    { url: `${base}/install`, lastModified: new Date() },
    { url: `${base}/faq`, lastModified: new Date() },
    { url: `${base}/marketplace`, lastModified: new Date() },
    { url: `${base}/demo`, lastModified: new Date() },
    { url: `${base}/features`, lastModified: new Date() },
    { url: `${base}/docs`, lastModified: new Date() },
    { url: `${base}/contact-sales`, lastModified: new Date() },
  ];
}

