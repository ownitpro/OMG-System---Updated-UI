export const analytics = {
  view: "securevault_view",
  ctaStart: "securevault_cta_start",
  ctaPricing: "securevault_cta_pricing",
} as const;

export const hero = {
  eyebrow: "Document automation",
  title: "SecureVault Docs — the vault that files itself",
  subtitle: "Collect, organize, and secure documents without back-and-forth. OCR auto-names files, checklists show what's missing, and audit logs keep you compliant.",
  primaryCta: { 
    label: "Get started", 
    href: "/start?app=svd", 
    id: "svd_start" 
  },
  secondaryCta: { 
    label: "See pricing", 
    href: "/pricing/securevault-docs", 
    id: "svd_pricing" 
  },
  badges: [
    "KMS-encrypted", 
    "Short-lived links", 
    "Audit trail", 
    "Optional WORM archives"
  ]
} as const;

export const problem = {
  title: "The problem",
  body: "Documents arrive late, in every format, and vanish into inboxes. Teams waste hours chasing, renaming, and filing; personal users can't find what matters when it matters.",
  promiseTitle: "Our promise",
  promiseBody: "SecureVault Docs captures files from email, uploads, and your CRM, runs OCR, and auto-files them into the right spot — then keeps costs predictable with usage meters, nudges, and hard stops at 100%."
} as const;

export const steps = [
  { 
    index: 1, 
    title: "Capture", 
    body: "Upload, email-to-vault, or connect your CRM.", 
    icon: "/icons/upload.svg" 
  },
  { 
    index: 2, 
    title: "Understand", 
    body: "OCR extracts key details for consistent naming.", 
    icon: "/icons/ocr.svg" 
  },
  { 
    index: 3, 
    title: "Organize", 
    body: "Files auto-named and placed into the right folders with checklists.", 
    icon: "/icons/folder.svg" 
  }
] as const;

export const audiences = [
  {
    title: "For Businesses",
    body: "Industry-ready workflows for Accounting, Property Management, Real Estate, Mortgage, Contractors, and Healthcare.",
    cta: { label: "See business solutions", href: "/solutions/business" }
  },
  {
    title: "For Personal",
    body: "A private, smart vault for life's documents — taxes, IDs, receipts — with a 7-day 'Taste' trial.",
    cta: { label: "See personal plans", href: "/solutions/personal" }
  }
] as const;

export const features = [
  { 
    title: "Intake everywhere", 
    bullets: ["Uploads", "Email-to-vault", "Webhook/API from any CRM"] 
  },
  { 
    title: "Auto-filing with OCR", 
    bullets: ["Consistent names", "Smart folders", "Zero manual tagging"] 
  },
  { 
    title: "Smart requests & reminders", 
    bullets: ["Share checklists", "Auto-nudge until complete"] 
  },
  { 
    title: "Immutable packets", 
    bullets: ["One-click lock", "Closing/year-end bundles"] 
  },
  { 
    title: "Secure sharing", 
    bullets: ["Short-lived links", "Watermark/redaction (higher tiers)"] 
  },
  { 
    title: "Lifecycle archiving", 
    bullets: ["Hot now, archive later", "Restore with clear cost/time"] 
  },
  { 
    title: "Predictable billing", 
    bullets: ["Usage meters", "Nudges 70/80/90/95%", "Hard stop at 100%"] 
  },
  { 
    title: "Works with any CRM", 
    bullets: ["Email-to-vault", "Webhooks", "Open API"] 
  }
] as const;

export const valuePillars = [
  { 
    title: "Time back", 
    body: "Stop chasing and renaming — documents file themselves." 
  },
  { 
    title: "Visibility", 
    body: "One status page shows what's missing per client/deal/case." 
  },
  { 
    title: "Compliance", 
    body: "Audit trail, retention policies, optional WORM archive." 
  },
  { 
    title: "Cost control", 
    body: "Live projections, clear overages, and safeguards at 100%." 
  }
] as const;

export const security = {
  title: "Security & residency",
  subtitle: "Privacy by design with Canadian data residency.",
  points: [
    { 
      title: "Data Residency", 
      bullets: ["Canada (Central)"], 
      icon: "/icons/maple.svg" 
    },
    { 
      title: "Encryption", 
      bullets: ["KMS at rest", "TLS in transit"], 
      icon: "/icons/lock.svg" 
    },
    { 
      title: "Delivery", 
      bullets: ["Short-lived signed links"], 
      icon: "/icons/link.svg" 
    },
    { 
      title: "Operations", 
      bullets: ["Support-blind by default", "Dual-approved break-glass"], 
      icon: "/icons/shield.svg" 
    }
  ]
} as const;

export const pricing = {
  personal: {
    plans: [
      { 
        name: "Starter", 
        price: "$7/mo", 
        bullets: ["20 GB storage", "10 GB transfer", "400 OCR pages"] 
      },
      { 
        name: "Advanced", 
        price: "$12/mo", 
        bullets: ["30 GB storage", "15 GB transfer", "800 OCR + 20 expense OCR"] 
      },
      { 
        name: "Pro", 
        price: "$19/mo", 
        bullets: ["60 GB storage", "20 GB transfer", "1,200 OCR + 40 expense OCR", "Up to 3 spaces"] 
      }
    ]
  },
  business: {
    blurb: "Businesses pay per Active Work Item (AWI) per month; storage/transfer/OCR pooled per tenant.",
    link: "/pricing/securevault-docs"
  },
  ctas: {
    primary: { label: "Start 7-day trial", href: "/start?app=svd" },
    secondary: { label: "Compare pricing", href: "/pricing/securevault-docs" }
  }
} as const;

export const faqs = [
  { 
    q: "Does it work with my CRM?", 
    a: "Yes. Email-to-vault and webhooks are included; Embedded Panel/SSO and Managed Integration are optional." 
  },
  { 
    q: "What happens at 100% usage?", 
    a: "We pause the matching action (upload/download/OCR) until you upgrade or free capacity." 
  },
  { 
    q: "Where is data stored?", 
    a: "Canada (Central). Links are short-lived and signed." 
  },
  { 
    q: "Can support see our files?", 
    a: "No. Support-blind by default. Break-glass is dual-approved, time-boxed, and fully logged." 
  },
  { 
    q: "How do you bill?", 
    a: "Businesses pay per Active Work Item. Personal plans are flat monthly." 
  }
] as const;

export const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SecureVault Docs",
  brand: { "@type": "Brand", name: "OMGsystems" },
  description: "Secure, automated document management with OCR, auto-naming, status checklists, and audit logs. Canadian data residency.",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "57" }
} as const;
