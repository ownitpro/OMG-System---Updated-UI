import { ProductMarketingTemplate } from "@/components/ProductMarketingTemplate";
import { STRIPE_LINKS } from "@/config/stripeLinks";

export default function SecureVaultDocsPage() {
  return (
    <ProductMarketingTemplate
      brand="OMG Systems"
      productName="SecureVault Docs"
      tagline="Stop losing documents. Store them once. Find them in seconds."
      heroBullets={[
        "Organize everything into clean vaults",
        "Search fast so you don't waste time",
        "Keep your business documents protected",
      ]}
      buyNow={{
        label: "Buy Now",
        href: "/checkout/start?product=securevault-docs",
      }}
      primaryCta={{ label: "View Plans", href: "/products/plans" }}
      secondaryCta={{ label: "Back to Portal", href: "/portal/client" }}
      sections={[
        {
          title: "What you get",
          text: "A simple vault system that keeps your files organized so you can move fast and stay protected.",
          bullets: [
            "Vault folders you can actually understand",
            "Tags for quick sorting",
            "Download anytime",
            "Built to expand later (sharing, permissions, audit logs)",
          ],
        },
        {
          title: "Why it matters",
          text: "Most businesses waste hours searching for files. This fixes that. You'll feel the difference in week one.",
          bullets: [
            "Less time searching",
            "Cleaner handoffs between team members",
            "Fewer mistakes and missing documents",
          ],
        },
      ]}
      highlights={{
        title: "Key Highlights",
        items: [
          { title: "Simple vault structure", text: "No messy folders. Just clean organization." },
          { title: "Fast retrieval", text: "Find what you need quickly with search + tags." },
          { title: "Built for business", text: "Designed for teams, clients, and real workflows." },
        ],
      }}
      faqs={[
        {
          q: "Is this the same as Google Drive?",
          a: "No. This is built for business vaults and clean document organization. Drive is a file dump. This is a system.",
        },
        {
          q: "Can I share documents with clients?",
          a: "Week 1 focuses on vault organization. Client sharing and permissions can be added next as an upgrade.",
        },
        {
          q: "Can I move my files in?",
          a: "Yes. You can upload and organize as you go. Migration tools can be added later if needed.",
        },
      ]}
      footerCta={{
        title: "Ready to get organized?",
        text: "SecureVault Docs helps you stop losing time, stop losing files, and run cleaner.",
        primary: { label: "View Plans", href: "/products/plans" },
        secondary: { label: "Back to Portal", href: "/portal/client" },
      }}
    />
  );
}
