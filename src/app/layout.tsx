import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Providers } from "@/components/providers/session-provider";
import { SEO_CONFIG, generateOrganizationSchema, generateWebsiteSchema, generateOGImage } from "@/lib/seo";
import { ConsentManager } from "@/components/consent/consent-manager";
import { PerformanceMonitor } from "@/components/performance/performance-monitor";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import ExitIntentManager from "@/components/lead-capture/ExitIntentManager";
import { HeaderABTest } from "@/components/ab-testing/header-ab-test";
import { IndustryExitIntent } from "@/components/exit-intent/industry-exit-intent";
import { HydrationFix } from "@/components/hydration-fix";
import { ConditionalLayoutWrapper } from "@/components/layout/conditional-layout-wrapper";
import { ServiceWorkerHandler } from "@/components/service-worker-handler";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.defaults.canonicalBase),
  title: {
    template: SEO_CONFIG.defaults.titleTemplate,
    default: SEO_CONFIG.brand.tagline,
  },
  description: SEO_CONFIG.brand.description,
  keywords: "business automation, CRM, document management, secure vault, industry solutions, property management, real estate, accounting, contractors, healthcare, cleaning, Canada, Ontario",
  authors: [{ name: SEO_CONFIG.brand.name }],
  creator: SEO_CONFIG.brand.name,
  publisher: SEO_CONFIG.brand.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: SEO_CONFIG.openGraph.type,
    locale: SEO_CONFIG.defaults.locale,
    url: SEO_CONFIG.defaults.canonicalBase,
    title: SEO_CONFIG.brand.tagline,
    description: SEO_CONFIG.brand.description,
    siteName: SEO_CONFIG.openGraph.siteName,
    images: [
      {
        url: generateOGImage("home"),
        width: SEO_CONFIG.openGraph.image.width,
        height: SEO_CONFIG.openGraph.image.height,
        alt: SEO_CONFIG.openGraph.image.alt,
      },
    ],
  },
  twitter: {
    card: SEO_CONFIG.twitter.card,
    site: SEO_CONFIG.twitter.site,
    creator: SEO_CONFIG.twitter.creator,
    title: SEO_CONFIG.brand.tagline,
    description: SEO_CONFIG.brand.description,
    images: [generateOGImage("home")],
  },
  alternates: {
    canonical: SEO_CONFIG.defaults.canonicalBase,
  },
  other: {
    "theme-color": SEO_CONFIG.defaults.themeColor,
    "msapplication-TileColor": SEO_CONFIG.defaults.themeColor,
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang={SEO_CONFIG.defaults.locale}>
      <head>
        {/* Font preloading is handled automatically by Next.js via next/font/google */}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
        suppressHydrationWarning={true}
      >
        <Providers>
          <HydrationFix />
          <ServiceWorkerHandler />
          <ConditionalLayoutWrapper>
            {children}
          </ConditionalLayoutWrapper>
          <ConsentManager />
          <PerformanceMonitor />
          <ChatbotWidget />
          <ExitIntentManager />
        </Providers>
      </body>
    </html>
  );
}
