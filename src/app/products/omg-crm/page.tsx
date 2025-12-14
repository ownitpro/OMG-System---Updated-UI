import { ProductMarketingTemplate } from "@/components/ProductMarketingTemplate";
import { STRIPE_LINKS } from "@/config/stripeLinks";

export default function OmgCrmPage() {
  return (
    <ProductMarketingTemplate
      brand="OMG Systems"
      productName="OMG-CRM"
      tagline="Follow-up wins deals. This keeps your pipeline clean and your next step obvious."
      heroBullets={[
        "Track leads and clients without chaos",
        "Know exactly who to follow up with next",
        "Keep notes, tasks, and pipeline simple",
      ]}
      buyNow={{
        label: "Buy Now",
        href: "/checkout/start?product=omg-crm",
      }}
      primaryCta={{ label: "View Plans", href: "/products/plans" }}
      secondaryCta={{ label: "Back to Portal", href: "/portal/client" }}
      sections={[
        {
          title: "What you get",
          text: "A clean CRM built for speed. No clutter—just what moves deals forward.",
          bullets: [
            "Pipeline stages you can actually use",
            "Follow-ups and notes in one place",
            "Built to work with OMG-Leads",
          ],
        },
        {
          title: "Why it matters",
          text: "Most people don't lose deals because they're bad. They lose deals because follow-up gets messy. This fixes that.",
          bullets: [
            "Fewer leads falling through the cracks",
            "A daily follow-up rhythm",
            "Clear next steps for your team",
          ],
        },
      ]}
      highlights={{
        title: "Key Highlights",
        items: [
          { title: "Clean pipeline", text: "See where every deal stands at a glance." },
          { title: "Simple daily flow", text: "Open it, follow up, win more." },
          { title: "Built for operators", text: "Fast and easy—no learning curve." },
        ],
      }}
      faqs={[
        {
          q: "Do I need OMG-Leads too?",
          a: "No, but they work great together. Leads captures. CRM manages follow-up and deals.",
        },
        {
          q: "Is this for teams or solo?",
          a: "Both. Start solo. Grow into a team setup when you're ready.",
        },
        {
          q: "Can you customize it to my workflow?",
          a: "Yes. That's what Custom Solutions is for (done-for-you setup).",
        },
      ]}
      footerCta={{
        title: "Ready to stop losing deals?",
        text: "If follow-up gets cleaner, revenue usually follows. Let's make it simple.",
        primary: { label: "View Plans", href: "/products/plans" },
        secondary: { label: "Back to Portal", href: "/portal/client" },
      }}
    />
  );
}
