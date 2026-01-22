// src/app/layout.tsx - Root layout (minimal wrapper)

import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://securevaultdocs.com'),
  title: {
    default: "SecureVault Docs - Secure Document Management & Client Portals",
    template: "%s | SecureVault Docs",
  },
  description: "Enterprise-grade document management with secure client portals, intelligent OCR, and automated file organization. Simplify document workflows with bank-level security.",
  keywords: [
    "document management",
    "client portal",
    "secure file sharing",
    "OCR document scanning",
    "document automation",
    "business document storage",
    "encrypted file sharing",
    "portal software",
    "document workflow",
    "KMS encryption"
  ],
  authors: [{ name: "SecureVault Docs" }],
  creator: "SecureVault Docs",
  publisher: "SecureVault Docs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SecureVault Docs - Secure Document Management & Client Portals',
    description: 'Enterprise-grade document management with secure client portals, intelligent OCR, and automated file organization.',
    siteName: 'SecureVault Docs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SecureVault Docs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecureVault Docs - Secure Document Management',
    description: 'Enterprise-grade document management with secure client portals and intelligent OCR.',
    images: ['/twitter-image.png'],
    creator: '@securevaultdocs',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SecureVault',
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '839344895733165');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=839344895733165&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-partner" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "8346180";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://px.ads.linkedin.com/collect/?pid=8346180&fmt=gif"
            alt=""
          />
        </noscript>
        {/* End LinkedIn Insight Tag */}
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground font-sans">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
