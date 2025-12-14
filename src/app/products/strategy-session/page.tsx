import { ProductMarketingTemplate } from "@/components/ProductMarketingTemplate";

export default function StrategySessionPage() {
  return (
    <ProductMarketingTemplate
      brand="OMG Systems"
      productName="Strategy-Session"
      tagline="Book time with our team to map your next move."
      heroBullets={[
        "Get clarity on your business goals",
        "Build a roadmap that actually works",
        "Skip the guesswork and move forward",
      ]}
      primaryCta={{ label: "Book a Session", href: "/contact?solution=strategy-session" }}
      secondaryCta={{ label: "Back to Portal", href: "/portal/client" }}
      sections={[
        {
          title: "What you get",
          text: "A focused session with our team to understand your business, identify opportunities, and create a clear action plan.",
          bullets: [
            "One-on-one strategy session",
            "Custom roadmap for your business",
            "Clear next steps and priorities",
            "Follow-up support to keep you moving",
          ],
        },
        {
          title: "Why it matters",
          text: "Most businesses know what they want but struggle with how to get there. This session bridges that gap.",
          bullets: [
            "Stop spinning your wheels",
            "Get expert guidance tailored to you",
            "Build momentum with a clear plan",
          ],
        },
      ]}
      highlights={{
        title: "Key Highlights",
        items: [
          { title: "Expert guidance", text: "Work with our team who've helped hundreds of businesses." },
          { title: "Custom roadmap", text: "A plan built specifically for your business, not a template." },
          { title: "Action-focused", text: "Leave with clear next steps, not just ideas." },
        ],
      }}
      faqs={[
        {
          q: "How long is the session?",
          a: "Typically 60-90 minutes. We'll cover your goals, current challenges, and build a roadmap together.",
        },
        {
          q: "What happens after the session?",
          a: "You'll receive a summary and action plan. We can also set up follow-up sessions to keep you on track.",
        },
        {
          q: "Is this for new businesses or existing ones?",
          a: "Both. Whether you're just starting or looking to scale, we'll help you map the path forward.",
        },
      ]}
      footerCta={{
        title: "Ready to map your next move?",
        text: "Book a Strategy Session and get clarity on your path forward.",
        primary: { label: "Book a Session", href: "/contact?solution=strategy-session" },
        secondary: { label: "Back to Portal", href: "/portal/client" },
      }}
    />
  );
}

