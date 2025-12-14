import { ProductMarketingTemplate } from "@/components/ProductMarketingTemplate";
import { STRIPE_LINKS } from "@/config/stripeLinks";

export default function OmgLeadsPage() {
  return (
    <ProductMarketingTemplate
      brand="OMG Systems"
      productName="OMG-Leads"
      tagline="More leads is good. Better follow-up is even better."
      heroBullets={[
        "Capture leads from multiple sources",
        "Track where leads came from",
        "Send them into your workflow cleanly",
      ]}
      buyNow={{
        label: "Buy Now",
        href: "/checkout/start?product=omg-leads",
      }}
      primaryCta={{ label: "View Plans", href: "/products/plans" }}
      secondaryCta={{ label: "Back to Portal", href: "/portal/client" }}
      sections={[
        {
          title: "What you get",
          text: "A lead capture and tracking system that's built for growth.",
          bullets: [
            "Simple lead lists",
            "Source tracking",
            "Pipeline-ready structure",
            "Works great with OMG-CRM",
          ],
        },
        {
          title: "Why it matters",
          text: "If you don't know where leads come from, you can't scale. This makes your growth measurable.",
          bullets: [
            "Know what ads work",
            "Know what content works",
            "Stop guessing and start tracking",
          ],
        },
      ]}
      highlights={{
        title: "Key Highlights",
        items: [
          { title: "Lead source clarity", text: "See exactly what's working." },
          { title: "Cleaner handoff", text: "Move leads into CRM smoothly." },
          { title: "Built for volume", text: "Works when you're small and when you scale." },
        ],
      }}
      faqs={[
        {
          q: "Does this replace a CRM?",
          a: "No. Leads captures and tracks. CRM manages follow-up, pipeline, and deals.",
        },
        {
          q: "Can I track ad leads vs referral leads?",
          a: "Yes. Source tracking is a core reason this exists.",
        },
        {
          q: "Can I automate lead follow-up later?",
          a: "Yes. Automations can handle that in a later phase.",
        },
      ]}
      footerCta={{
        title: "Want clean lead flow?",
        text: "OMG-Leads helps you track growth and stay consistent.",
        primary: { label: "View Plans", href: "/products/plans" },
        secondary: { label: "Back to Portal", href: "/portal/client" },
      }}
    />
  );
}
