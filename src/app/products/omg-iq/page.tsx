import { ProductMarketingTemplate } from "@/components/ProductMarketingTemplate";
import { STRIPE_LINKS } from "@/config/stripeLinks";

export default function OmgIqPage() {
  return (
    <ProductMarketingTemplate
      brand="OMG Systems"
      productName="OMG-IQ"
      tagline="Your daily business brief. Quick scan. Better decisions."
      heroBullets={[
        "Daily updates in one place",
        "Stay sharp without doom-scrolling",
        "Make better moves faster",
      ]}
      buyNow={{
        label: "Buy Now",
        href: "/checkout/start?product=omg-iq",
      }}
      primaryCta={{ label: "View Plans", href: "/products/plans" }}
      secondaryCta={{ label: "Back to Portal", href: "/portal/client" }}
      sections={[
        {
          title: "What you get",
          text: "A daily feed designed for business operators who want signal, not noise.",
          bullets: [
            "Short daily brief",
            "Save what matters",
            "Built to expand with filters later",
          ],
        },
        {
          title: "Why it matters",
          text: "If you're late, you pay the price. This keeps you aware without stealing your day.",
          bullets: [
            "Faster decisions",
            "More confidence",
            "Less time wasted",
          ],
        },
      ]}
      highlights={{
        title: "Key Highlights",
        items: [
          { title: "Short and useful", text: "No fluff. Just what matters." },
          { title: "Operator-focused", text: "Built for people running real businesses." },
          { title: "Daily habit", text: "5 minutes to stay sharp." },
        ],
      }}
      faqs={[
        { q: "Is this regular news?", a: "No. It's curated for business decisions and daily clarity." },
        { q: "Can I choose my industries later?", a: "Yes. Filters and industry packs can be added next." },
        { q: "How long does it take daily?", a: "About 3–5 minutes." },
      ]}
      footerCta={{
        title: "Want clarity every day?",
        text: "OMG-IQ keeps you informed without wasting your time.",
        primary: { label: "View Plans", href: "/products/plans" },
        secondary: { label: "Back to Portal", href: "/portal/client" },
      }}
    />
  );
}
