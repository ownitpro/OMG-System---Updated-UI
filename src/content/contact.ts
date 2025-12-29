// content/contact.ts

export type CTA = { label: string; href: string; id?: string };

export type Office = {
  label: string;
  address: string;
  city: string;
  province: "ON";
  country: "Canada";
  postal: string;
  hours: string; // plain text, local time
};

export type ContactContent = {
  hero: {
    title: string;
    subtitle: string;
    badges?: string[];
  };
  reasons: { title: string; bullets: string[] };
  form: {
    title: string;
    subtitle: string;
    fields: {
      industries: string[];
      budgets: string[];
      timelines: string[];
    };
    caslNote: string;
    privacyNote: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
  };
  offices: Office[];
  faq: { q: string; a: string }[];
  analytics: {
    view: string;
    submit: string;
    success: string;
    error: string;
  };
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  schema: {
    organization: Record<string, unknown>;
    breadcrumb: Record<string, unknown>;
    faq: Record<string, unknown>;
  };
};

export const contact: ContactContent = {
  hero: {
    title: "Talk to OMGsystems",
    subtitle:
      "Tell us your goals and pain points. We'll map a 1–3 week onboarding plan and show you exactly how we'll remove busywork and grow revenue.",
    badges: ["Onboarding in 1–3 weeks depending on complexity", "Canadian data residency", "Privacy-first"],
  },

  reasons: {
    title: "How we help",
    bullets: [
      "Design an outcome-first plan for your industry",
      "Configure the vertical CRM + automations",
      "Connect SecureVault Docs for document flows",
      "Train your team; launch without disruption",
      "Measure impact with dashboards & alerts",
    ],
  },

  form: {
    title: "Book a strategy call or request a quote",
    subtitle: "Share a few details so we can prep relevant examples before we meet.",
    fields: {
      industries: [
        "Property Management",
        "Real Estate",
        "Contractors",
        "Accounting",
        "Other",
      ],
      budgets: ["<$1,000/mo", "$1,000–$2,500/mo", "$2,500–$5,000/mo", "$5,000+/mo", "Flexible"],
      timelines: ["ASAP (this month)", "Next 1–3 months", "This quarter", "Exploring"],
    },
    caslNote:
      "By submitting, you consent to receive emails/SMS related to this inquiry. You can unsubscribe anytime (CASL-compliant).",
    privacyNote: "We never share your data. See our Privacy Policy for details.",
    submitLabel: "Send request",
    successTitle: "Thanks — we've got your request",
    successBody:
      "We'll reply within one business day with a proposed time and a short outline tailored to your industry.",
    errorTitle: "Something went wrong",
    errorBody: "Please check your info and try again. If this persists, email support@omgsystems.com.",
  },

  offices: [
    {
      label: "Toronto (HQ)",
      address: "1280 Finch Ave W, Unit 405",
      city: "Toronto",
      province: "ON",
      country: "Canada",
      postal: "M3J 3K6",
      hours: "Mon–Fri 9:00–17:00 ET",
    },
  ],

  faq: [
    { q: "How fast can we launch?", a: "Most teams launch in 1–3 weeks depending on complexity." },
    { q: "Do you integrate with our current tools?", a: "Yes. We can connect to your stack or replace where simpler." },
    { q: "Where is our data stored?", a: "In Canada, encrypted at rest and in transit." },
    {
      q: "Do you provide training?",
      a: "Yes. Short, focused sessions with playbooks and recorded walkthroughs.",
    },
    { q: "Is there a free demo?", a: "Yes — try the CRM and SecureVault Docs demos from our Demos page." },
  ],

  analytics: {
    view: "contact_view",
    submit: "contact_submit",
    success: "contact_success",
    error: "contact_error",
  },

  meta: {
    title: "Contact OMGsystems — Strategy Calls & Quotes",
    description:
      "Share your goals and pain points. We'll prep an industry-specific plan and show you how to launch in 1–3 weeks.",
    canonical: "/contact",
    ogImage: "/og/contact.jpg",
  },

  schema: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OMGsystems",
      url: "https://www.omgsystems.com",
      logo: "https://www.omgsystems.com/logo.svg",
      areaServed: "CA",
      contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "sales@omgsystems.com" }],
      address: {
        "@type": "PostalAddress",
        streetAddress: "1280 Finch Ave W, Unit 405",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M3J 3K6",
        addressCountry: "CA",
      },
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.omgsystems.com" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.omgsystems.com/contact" },
      ],
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        ...[
          ["How fast can we launch?", "Most teams launch in 1–3 weeks depending on complexity."],
          ["Do you integrate with our current tools?", "Yes. We can connect to your stack or replace where simpler."],
          ["Where is our data stored?", "In Canada, encrypted at rest and in transit."],
          ["Do you provide training?", "Yes. Short, focused sessions with playbooks and recorded walkthroughs."],
          ["Is there a free demo?", "Yes — try the CRM and SecureVault Docs demos from our Demos page."],
        ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      ],
    },
  },
};
