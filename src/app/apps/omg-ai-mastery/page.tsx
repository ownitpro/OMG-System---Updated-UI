import { Metadata } from "next";
import { AIMasteryAppPage } from "@/components/apps/AIMasteryAppPage";

export const metadata: Metadata = {
  title: "OMG AI Mastery | Become AI-Smart in Days",
  description:
    "Learn to use AI the right way with OMG AI Mastery. 3-day personal course for individuals, 2-week bootcamp for teams. Clear lessons, practical examples, and hands-on practice.",
  keywords: [
    "AI training",
    "AI course",
    "AI mastery",
    "learn AI",
    "AI for business",
    "AI for teams",
    "AI certification",
    "ChatGPT training",
    "prompt engineering",
  ],
  openGraph: {
    title: "OMG AI Mastery | Become AI-Smart in Days",
    description:
      "Learn to use AI the right way. 3-day personal course for individuals, 2-week bootcamp for teams.",
    type: "website",
  },
};

export default function OmgAiMasteryPage() {
  return <AIMasteryAppPage />;
}
