import { Metadata } from "next";
import HeroSection from "@/components/custom-apps/HeroSection";
import AppGallery from "@/components/custom-apps/AppGallery";
import HowItWorks from "@/components/custom-apps/HowItWorks";
import FinalCTA from "@/components/custom-apps/FinalCTA";
import CustomAppsPageTracker from "@/components/custom-apps/CustomAppsPageTracker";

export const metadata: Metadata = {
  title: "Build Custom Apps Perfectly Tailored to Your Business | OMGsystems",
  description: "Start with proven templates or a blank slate. Our team brings your ideas to life — in weeks, not months. View example apps and start building today.",
  keywords: [
    "custom app development",
    "business app builder",
    "custom software development",
    "app templates",
    "business automation apps",
    "custom web applications",
    "mobile app development",
    "workflow automation",
    "business process automation",
    "custom dashboard builder",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/custom-apps",
  },
  openGraph: {
    title: "Build Custom Apps Perfectly Tailored to Your Business | OMGsystems",
    description: "Start with proven templates or a blank slate. Our team brings your ideas to life — in weeks, not months. View example apps and start building today.",
    url: "https://www.omgsystems.com/custom-apps",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/custom-apps/hero-preview.png",
        width: 1200,
        height: 630,
        alt: "Custom app development - build tailored business applications",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Custom Apps Perfectly Tailored to Your Business | OMGsystems",
    description: "Start with proven templates or a blank slate. Our team brings your ideas to life — in weeks, not months. View example apps and start building today.",
    images: ["https://www.omgsystems.com/images/custom-apps/hero-preview.png"],
  },
};

export default function CustomAppsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <CustomAppsPageTracker />
      <HeroSection />
      <AppGallery />
      <HowItWorks />
      <FinalCTA />
    </div>
  );
}