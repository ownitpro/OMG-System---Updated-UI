import { NextResponse } from "next/server";
import { SEO_CONFIG } from "@/lib/seo";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Private areas
Disallow: /admin/
Disallow: /portal/
Disallow: /api/

# Sitemap
Sitemap: ${SEO_CONFIG.defaults.canonicalBase}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
