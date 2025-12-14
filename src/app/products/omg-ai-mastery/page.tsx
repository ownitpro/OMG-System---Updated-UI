import { ProductMarketingTemplate } from "@/components/ProductMarketingTemplate";
import { STRIPE_LINKS } from "@/config/stripeLinks";

export default function OmgAiMasteryPage() {
  return (
    <ProductMarketingTemplate
      brand="OMG Systems"
      productName="OMG-AI-Mastery"
      tagline="Learn AI the simple way — and actually use it daily."
      heroBullets={[
        "Step-by-step lessons that don't overwhelm you",
        "Templates you can copy and use instantly",
        "Real business examples (not theory)",
      ]}
      buyNow={{
        label: "Buy Now",
        href: "/checkout/start?product=omg-ai-mastery",
      }}
      primaryCta={{ label: "View Plans", href: "/products/plans" }}
      secondaryCta={{ label: "Back to Portal", href: "/portal/client" }}
      sections={[
        {
          title: "What you get",
          text: "A structured learning system that turns AI into daily results.",
          bullets: [
            "Simple lessons",
            "Copy/paste templates",
            "Weekly practice plan",
            "Made for teams and operators",
          ],
        },
        {
          title: "Why it matters",
          text: "AI is becoming the new skill baseline. If you learn it now, you move faster than your competitors.",
          bullets: [
            "Save time on daily work",
            "Get better outputs from your team",
            "Build systems that scale",
          ],
        },
      ]}
      highlights={{
        title: "Key Highlights",
        items: [
          { title: "No overwhelm", text: "Clear steps, clear outcomes." },
          { title: "Real examples", text: "Made for business and daily work." },
          { title: "Reusable templates", text: "Build once, use forever." },
        ],
      }}
      faqs={[
        { q: "Is this beginner-friendly?", a: "Yes. If you can text, you can do this." },
        { q: "Do I need tech skills?", a: "No. You'll learn in simple steps." },
        { q: "Can my team use it?", a: "Yes. It's built to be shared and used daily." },
      ]}
      footerCta={{
        title: "Ready to actually use AI?",
        text: "OMG-AI-Mastery helps you build skill and momentum fast.",
        primary: { label: "View Plans", href: "/products/plans" },
        secondary: { label: "Back to Portal", href: "/portal/client" },
      }}
    />
  );
}
