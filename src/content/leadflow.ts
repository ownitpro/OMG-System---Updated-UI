export const analytics = {
  view: "leadflow_view",
  ctaCall: "leadflow_strategy_call_click",
} as const;

export const hero = {
  eyebrow: "Lead generation",
  title: "Stop running ads blindly — build a predictable lead machine",
  subtitle: "LeadFlow Engine™ turns your campaigns into a consistent stream of qualified clients — from first click to final sale.",
  primaryCta: { 
    label: "Get Your LeadFlow Strategy Call", 
    href: "/book-demo?app=leadflow", 
    id: "leadflow_call" 
  },
  secondaryCta: { 
    label: "See how it works", 
    href: "#how-it-works" 
  },
  badges: [
    "Meta-ready creatives", 
    "Instant CRM follow-up", 
    "Nurture & retarget", 
    "ROI feedback loop"
  ]
} as const;

export const frustrations = [
  { 
    title: "Rollercoaster lead flow", 
    body: "Great months followed by silence. You can't plan staffing or cash flow." 
  },
  { 
    title: "Low intent contacts", 
    body: "Lots of form fills, few buyers. You waste time qualifying by hand." 
  },
  { 
    title: "Slow follow-up", 
    body: "By the time you respond, they've moved on." 
  },
  { 
    title: "Tools are disconnected", 
    body: "Spreadsheets, ad managers, and inboxes don't talk to each other." 
  },
  { 
    title: "No clarity on ROI", 
    body: "You spend on ads but can't see which campaigns drive revenue." 
  },
  { 
    title: "Messaging blends in", 
    body: "You sound like everyone else — attention is gone in 3 seconds." 
  }
] as const;

export const steps = [
  { 
    index: 1, 
    title: "Strategy & Audience Discovery", 
    body: "Clarify ideal client, offers, regions, and competitive angles.", 
    icon: "/icons/target.svg" 
  },
  { 
    index: 2, 
    title: "Video & Creative Production", 
    body: "Thumb-stopping short-form videos and visuals that fit your brand.", 
    icon: "/icons/video.svg" 
  },
  { 
    index: 3, 
    title: "Meta Lead Campaigns", 
    body: "High-conversion lead forms with minimal friction and strong copy.", 
    icon: "/icons/meta.svg" 
  },
  { 
    index: 4, 
    title: "Instant CRM Follow-Up", 
    body: "Leads sync into your CRM; auto email/SMS reply within minutes.", 
    icon: "/icons/bolt.svg" 
  },
  { 
    index: 5, 
    title: "Nurture & Retarget", 
    body: "Multi-step drips and ad retargeting keep prospects engaged.", 
    icon: "/icons/loop.svg" 
  },
  { 
    index: 6, 
    title: "Track, Optimize & Scale", 
    body: "ROI feedback loops reallocate spend to what converts.", 
    icon: "/icons/graph.svg" 
  }
] as const;

export const deliverables = [
  { 
    title: "Targeting & Messaging Blueprint", 
    bullets: ["ICP profile", "Hooks", "Angle matrix"] 
  },
  { 
    title: "3–5 High-Converting Video Ads", 
    bullets: ["30–45s variants", "Captions & hooks", "Cut-downs for testing"] 
  },
  { 
    title: "Meta Lead Campaigns", 
    bullets: ["Optimized forms", "Conversion objectives", "Budget guardrails"] 
  },
  { 
    title: "LeadFlow Setup", 
    bullets: ["Ad → capture → CRM", "Immediate replies", "Follow-up tasks"] 
  },
  { 
    title: "Nurture & Retarget", 
    bullets: ["Email/SMS sequences", "Ad retargeting audiences", "Dwell-time triggers"] 
  },
  { 
    title: "Live ROI Dashboard", 
    bullets: ["Cost per lead", "Booked rates", "Revenue attribution"] 
  }
] as const;

export const proof = {
  quotes: [
    { 
      quote: "Within 7 days we got 20 qualified leads and closed 2 clients — ad spend paid for itself.", 
      cite: "Toronto Real Estate Team" 
    },
    { 
      quote: "We used to wait weeks for leads. Now we have conversations every day.", 
      cite: "Mississauga Property Management" 
    },
    { 
      quote: "Our lead quality improved 3x and we're closing more deals with less effort.", 
      cite: "Toronto Healthcare Practice" 
    }
  ],
  logos: ["/logos/sample1.svg", "/logos/sample2.svg", "/logos/sample3.svg"]
} as const;

export const faqs = [
  { 
    q: "Do you work in my industry?", 
    a: "Yes — real estate, healthcare, cleaning, accounting, contractors, property management, and more. We tailor messaging and flows to your niche." 
  },
  { 
    q: "What if I already run Meta ads?", 
    a: "We audit, fix gaps, and rebuild using the optimized LeadFlow framework. You keep what works; we improve the rest." 
  },
  { 
    q: "I don't use a CRM — is that a problem?", 
    a: "No. We can set up OMGsystems CRM for you or connect to your current stack. Your team gets a simple handoff." 
  },
  { 
    q: "What results should I expect?", 
    a: "Every business is different, but we aim for profitable CAC and 3–5× ROAS once creative and audiences are dialed." 
  },
  { 
    q: "Are there long-term contracts?", 
    a: "Engagements are flexible. We believe in performance and clarity." 
  }
] as const;

export const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LeadFlow Engine",
  provider: { "@type": "Organization", name: "OMGsystems" },
  areaServed: "CA",
  serviceType: "Lead generation & marketing automation",
  offers: { 
    "@type": "Offer", 
    priceCurrency: "USD", 
    description: "Custom strategy, creative, campaign setup, and optimization." 
  }
} as const;
