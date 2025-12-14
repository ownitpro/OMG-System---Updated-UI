export type OfferPack = {
  id: string;
  name: string;
  leads: number;
  priceUsd: number;
  stripePriceId: string;
};

export type OfferPageConfig = {
  slug: string;
  industryTag: string;
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  whoThisIsFor: string[];
  whatYouGet: string[];
  howItWorks: string[];
  packs: OfferPack[];
  whyThisOffer: string[];
  faqs: { question: string; answer: string }[];
  finalCta: { text: string; buttonLabel: string };
};

export const REAL_ESTATE_OFFER: OfferPageConfig = {
  slug: "real-estate",
  industryTag: "real_estate",
  hero: {
    title: "Find People Who Want to Buy or Sell Homes Right Now",
    subtitle:
      "We find people who are searching for real estate help today. Then we give you their contact info so you can reach out and help them.",
    primaryCta: "Get My Real Estate Leads",
    secondaryCta: "See How It Works",
  },
  whoThisIsFor: [
    "Real estate agents who want real customers, not fake leads from Facebook.",
    "Agents who want to work in specific areas and get steady appointments.",
    "Real estate companies who want to give their agents good leads.",
  ],
  whatYouGet: [
    "Real people who want to buy or sell homes in your area (like Durham, Toronto, or Pickering).",
    "A simple report showing what people are searching for in your area.",
    "A ready-to-send email for each person, written just for real estate.",
    "Ad ideas you can use on Facebook, Instagram, and Google.",
    "A simple spreadsheet file you can use with any tool you already have.",
  ],
  howItWorks: [
    "You pick your area and how many leads you want (5, 10, 25, or 50).",
    "We search the internet to find people looking for real estate help in that area.",
    "We find real people who match what you're looking for.",
    "We check each lead to make sure they're good quality.",
    "You get a list with names, contact info, and ready-to-send emails.",
  ],
  packs: [
    {
      id: "gta-listing-demand-5",
      name: "GTA Listing Demand Pack",
      leads: 5,
      priceUsd: 25,
      stripePriceId: "price_RE_5",
    },
    {
      id: "pickering-buyer-intent-10",
      name: "Pickering Buyer Intent Pack",
      leads: 10,
      priceUsd: 50,
      stripePriceId: "price_RE_10",
    },
    {
      id: "durham-buyer-surge-25",
      name: "Durham Buyer Surge Pack",
      leads: 25,
      priceUsd: 125,
      stripePriceId: "price_RE_25",
    },
    {
      id: "toronto-seller-momentum-50",
      name: "Toronto Seller Momentum Pack",
      leads: 50,
      priceUsd: 250,
      stripePriceId: "price_RE_50",
    },
  ],
  whyThisOffer: [
    "We find real people who are searching right now, not old lists or fake emails.",
    "You choose exactly which areas you want to work in.",
    "Everything is written in simple language that real estate customers understand.",
    "Easy to download and use with any tool you already have.",
  ],
  faqs: [
    {
      question: "Are these leads only for me?",
      answer:
        "Yes. When you buy a lead pack, those leads are yours. We don't sell them to anyone else.",
    },
    {
      question: "How fast will I get my leads?",
      answer:
        "You'll get your leads in just a few days. Bigger packs might take a bit longer, but we work fast.",
    },
    {
      question: "Can I get leads for investors instead of regular buyers?",
      answer:
        "Yes. Just tell us you want investor leads and we'll find the right people for you.",
    },
    {
      question: "Can I use these with my own tools?",
      answer:
        "Yes. Every pack comes as a simple spreadsheet file. You can use it with any tool you already have.",
    },
  ],
  finalCta: {
    text: "Ready to find real customers who want to buy or sell homes?",
    buttonLabel: "Get My Real Estate Leads",
  },
};

export const ACCOUNTING_OFFER: OfferPageConfig = {
  slug: "accounting",
  industryTag: "accounting",
  hero: {
    title: "Find Accounting Clients All Year, Not Just Tax Season",
    subtitle:
      "We find people and businesses who need accounting help right now. Get steady clients every month, not just during tax time.",
    primaryCta: "Get My Accounting Leads",
    secondaryCta: "See How It Works",
  },
  whoThisIsFor: [
    "Accountants and bookkeepers who want steady clients every month.",
    "Firms who are tired of only being busy during tax season.",
    "Accountants who want better quality leads, not just random people.",
  ],
  whatYouGet: [
    "Real people and businesses who need accounting help in your area.",
    "A simple report showing what people are asking about taxes and bookkeeping.",
    "A ready-to-send email that builds trust with accounting clients.",
    "Ad ideas that talk about the problems your clients face.",
    "A simple spreadsheet file ready to use with your tools.",
  ],
  howItWorks: [
    "You pick what type of clients you want and how many leads (5, 10, 25, or 50).",
    "We search the internet to find people looking for accounting help in your area.",
    "We find real people and businesses who need your help.",
    "We check each lead to make sure they're good quality.",
    "You get contact info, simple summaries, ready-to-send emails, and ad ideas.",
  ],
  packs: [
    {
      id: "personal-tax-rush-5",
      name: "Personal Tax Rush Pack",
      leads: 5,
      priceUsd: 25,
      stripePriceId: "price_AC_5",
    },
    {
      id: "corporate-client-10",
      name: "Corporate Client Pack",
      leads: 10,
      priceUsd: 50,
      stripePriceId: "price_AC_10",
    },
    {
      id: "bookkeeping-growth-25",
      name: "Bookkeeping Growth Pack",
      leads: 25,
      priceUsd: 125,
      stripePriceId: "price_AC_25",
    },
    {
      id: "year-round-client-50",
      name: "Year-Round Client Pack",
      leads: 50,
      priceUsd: 250,
      stripePriceId: "price_AC_50",
    },
  ],
  whyThisOffer: [
    "Get clients every month, not just during tax season.",
    "We find people who are already looking for help, so you don't waste time on cold calls.",
    "Everything is written to be professional and build trust.",
    "Easy to download and use with any tool you already have.",
  ],
  faqs: [
    {
      question: "Are these leads only for tax season?",
      answer:
        "No. You can get leads for tax work, bookkeeping, or regular accounting clients. You choose what you want.",
    },
    {
      question: "Can I get only business clients?",
      answer:
        "Yes. You can choose to get only business clients, only personal clients, or a mix of both.",
    },
    {
      question: "How do I use the emails?",
      answer:
        "You can copy and paste them into your email, use them with your email tool, or give them to your team to use on phone calls.",
    },
    {
      question: "Will this work if I already get referrals?",
      answer:
        "Yes. This adds more clients on top of your referrals. It's a new way to find customers.",
    },
  ],
  finalCta: {
    text: "Ready to get steady accounting clients every month?",
    buttonLabel: "Get My Accounting Leads",
  },
};

export const OFFERS: Record<string, OfferPageConfig> = {
  [REAL_ESTATE_OFFER.slug]: REAL_ESTATE_OFFER,
  [ACCOUNTING_OFFER.slug]: ACCOUNTING_OFFER,
};

