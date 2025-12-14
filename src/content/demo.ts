// ---------- Types ----------
export type CTA = { label: string; href: string; id?: string };

export type Hero = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  badges?: string[];
};

export type Tile = {
  title: string;
  body: string;
  href: string;
  bullets?: string[];
  onClickEvent?: string;
  icon?: string;
};

export type FAQ = { q: string; a: string };

export type SelectField = {
  type: "select";
  name: string;
  label: string;
  options: string[];
};

export type RadioField = {
  type: "radio";
  name: string;
  label: string;
  options: string[];
};

export type FormCardSpec = {
  title: string;
  subtitle?: string;
  fields: Array<SelectField | RadioField>;
  disclaimer?: string;
  submitLabel: string;
  onSubmitEvent?: string;
};

export type DemoViewportLead = {
  name: string;
  email: string;
  phone: string;
  city: string;
  province: "ON";
  postal: string;
  casl: "Express" | "Implied";
};

export type DemoViewportMessage = {
  channel: "sms" | "email";
  from: "client" | "team";
  body: string;
  timestamp: string; // ISO or human-readable
};

export type DemoViewportDoc = {
  name: string;
  status: "Requested" | "Received" | "Signed";
  source: "SVD";
};

export type DemoViewportSpec = {
  stages: string[];
  sampleLead: DemoViewportLead;
  messages: DemoViewportMessage[];
  docs: DemoViewportDoc[];
};

export type VaultViewportEvent = { action: string; actor: string; time: string };

export type VaultViewportSpec = {
  mode: "personal" | "business";
  folders: string[];
  checklist: string[];
  events: VaultViewportEvent[];
  immutableLocked?: boolean;
};

export type DemoContent = {
  hub: {
    hero: Hero;
    tiles: Tile[];
    faqs: FAQ[];
  };
  crm: {
    hero: Hero;
    form: FormCardSpec;
    viewportPreset: DemoViewportSpec; // default preview content when query is present
    meta: {
      title: string;
      description: string;
      ogImage: string;
      canonical: string;
      robots?: { index: boolean; follow: boolean } | "noindex";
    };
  };
  svd: {
    hero: Hero;
    form: FormCardSpec;
    personalViewport: VaultViewportSpec;
    businessViewport: VaultViewportSpec;
    meta: {
      title: string;
      description: string;
      ogImage: string;
      canonical: string;
      robots?: { index: boolean; follow: boolean } | "noindex";
    };
  };
  analytics: {
    hubView: string;
    openCrm: string;
    openSvd: string;
    launchCrm: string;
    launchSvd: string;
  };
};

// ---------- Content ----------
export const demoContent: DemoContent = {
  hub: {
    hero: {
      eyebrow: "Try a live sandbox",
      title: "Hands-on demos — no sales call required",
      subtitle:
        "Explore the CRM in your industry or try SecureVault Docs with sample data. No internal or client data is ever used.",
      badges: ["Read-only demo data", "Resets hourly", "Privacy-first"],
    },
    tiles: [
      {
        title: "CRM Sandbox",
        body:
          "Pick your industry and explore pipelines, messages, documents, and status updates — all with realistic Ontario scenarios.",
        href: "/apps/demo/crm",
        bullets: ["Industry pipelines", "Auto-messages", "Docs & e-sign (mock)"],
        onClickEvent: "demo_open_crm",
        icon: "/icons/pipeline.svg",
      },
      {
        title: "SecureVault Docs Demo",
        body:
          "Upload sample files, see OCR auto-naming, checklists, and audit logs. All links and uploads are simulated in the demo.",
        href: "/apps/demo/securevault-docs",
        bullets: ["OCR & auto-file", "Checklists & requests", "Short-lived links (demo)"],
        onClickEvent: "demo_open_svd",
        icon: "/icons/vault.svg",
      },
    ],
    faqs: [
      { q: "Is this my data?", a: "No. Demos use synthetic samples only." },
      {
        q: "Can I upload files?",
        a: "Demo simulates uploads; the full product supports real uploads with Canadian residency.",
      },
      {
        q: "How long is setup?",
        a: "Typical onboarding completes in 1–3 weeks depending on complexity.",
      },
      {
        q: "How do I buy?",
        a: "Start on any product page or book a call. We'll tailor a plan to your budget.",
      },
    ],
  },

  crm: {
    hero: {
      title: "CRM Demo — choose your industry",
      subtitle: "We preload realistic Ontario/Canada scenarios so you can click around immediately.",
    },
    form: {
      title: "Launch CRM Sandbox",
      subtitle: "Pick an industry to load the right pipelines, forms, and sample data.",
      fields: [
        {
          type: "select",
          name: "industry",
          label: "Choose industry",
          options: [
            "Property Management (ON)",
            "Real Estate (ON)",
            "Contractors (ON)",
            "Accounting (ON)",
            "Cleaning (ON)",
            "Healthcare (ON)",
          ],
        },
      ],
      disclaimer:
        "This sandbox uses synthetic data. No real client or back-office info is included. Export/share actions are disabled.",
      submitLabel: "Launch CRM Sandbox",
      onSubmitEvent: "demo_launch_crm",
    },
    viewportPreset: {
      stages: ["New", "Qualified", "In Progress", "Awaiting Docs", "Closed"],
      sampleLead: {
        name: "Alex Chen",
        email: "alex.chen@example.com",
        phone: "+1 (416) 555-0148",
        city: "Mississauga",
        province: "ON",
        postal: "L5B 2C9",
        casl: "Express",
      },
      messages: [
        {
          channel: "sms",
          from: "team",
          body: "Hi Alex — thanks for reaching out! Here's a link to pick a time for a quick call.",
          timestamp: "2025-10-12T09:18:00-04:00",
        },
        {
          channel: "email",
          from: "client",
          body: "Booked for tomorrow. Can you also send the checklist of required documents?",
          timestamp: "2025-10-12T09:21:00-04:00",
        },
      ],
      docs: [
        { name: "Proof of ID.pdf", status: "Requested", source: "SVD" },
        { name: "Service Agreement.pdf", status: "Signed", source: "SVD" },
        { name: "Intake Questionnaire.pdf", status: "Received", source: "SVD" },
      ],
    },
    meta: {
      title: "CRM Demo | OMGsystems",
      description: "Explore an industry-specific CRM sandbox with synthetic data and realistic flows.",
      ogImage: "/og/demo-crm.jpg",
      canonical: "/apps/demo/crm",
      robots: { index: false, follow: true }, // child demo route: noindex
    },
  },

  svd: {
    hero: {
      title: "SecureVault Docs Demo — pick a mode",
      subtitle: "See documents auto-file themselves. Try Personal or Business scenarios.",
    },
    form: {
      title: "Launch Vault Demo",
      subtitle: "Choose a mode. Uploads and links are simulated in demo.",
      fields: [
        {
          type: "radio",
          name: "mode",
          label: "Select mode",
          options: ["Personal vault (IDs, taxes, receipts)", "Business vault (Accounting/PM/Real Estate)"],
        },
      ],
      disclaimer:
        "Demo only. Uploads, OCR, links, and audit logs are simulated. No internal or client data is ever used.",
      submitLabel: "Launch Vault Demo",
      onSubmitEvent: "demo_launch_svd",
    },
    personalViewport: {
      mode: "personal",
      folders: ["IDs", "Taxes", "Receipts"],
      checklist: ["Upload primary ID", "Add last year's tax return", "Scan five recent receipts"],
      events: [
        { action: "Upload simulated: Driver's License.png", actor: "demo-user", time: "09:30" },
        { action: "OCR classified: ID → IDs/", actor: "system", time: "09:30" },
        { action: "Auto-rename: 2025-01_ID_JohnDoe.png", actor: "system", time: "09:30" },
      ],
      immutableLocked: false,
    },
    businessViewport: {
      mode: "business",
      folders: ["Client Files", "Engagement", "Year-end", "AR"],
      checklist: ["Request bank statements", "Collect signed engagement", "Assemble closing packet"],
      events: [
        { action: "Checklist requested: Bank Statements (30d)", actor: "demo-user", time: "10:05" },
        { action: "Upload simulated: Statements.pdf", actor: "client", time: "10:07" },
        { action: "OCR classified: Statements → Client Files/", actor: "system", time: "10:07" },
        { action: "Packetized: T2 year-end bundle (immutable lock)", actor: "system", time: "10:10" },
      ],
      immutableLocked: true,
    },
    meta: {
      title: "SecureVault Docs Demo | OMGsystems",
      description: "See OCR auto-naming, checklists, and audit logs in a safe vault demo.",
      ogImage: "/og/demo-svd.jpg",
      canonical: "/apps/demo/securevault-docs",
      robots: { index: false, follow: true }, // child demo route: noindex
    },
  },

  analytics: {
    hubView: "demo_hub_view",
    openCrm: "demo_open_crm",
    openSvd: "demo_open_svd",
    launchCrm: "demo_launch_crm",
    launchSvd: "demo_launch_svd",
  },
};

// Convenience named exports (optional)
export const { hub, crm, svd, analytics } = demoContent;

// Export faqs separately for easier access
export const faqs = demoContent.hub.faqs;

// Export industries for easier access
export const industries = demoContent.crm.form.fields[0].options;

// Export modes for easier access
export const modes = demoContent.svd.form.fields[0].options;

// Export sampleData for demo viewports
export const sampleData = {
  crm: {
    stages: ["New", "Qualified", "In Progress", "Awaiting Docs", "Closed"],
    sampleLead: {
      name: "Alex Chen",
      email: "alex.chen@example.com",
      phone: "+1 (416) 555-0148",
      city: "Mississauga",
      province: "ON",
      postal: "L5B 2C9",
      casl: "Express",
    },
    messages: [
      {
        channel: "sms",
        from: "team",
        body: "Hi Alex — thanks for reaching out! Here's a link to pick a time for a quick call.",
        timestamp: "2025-10-12T09:18:00-04:00",
      },
      {
        channel: "email",
        from: "client",
        body: "Booked for tomorrow. Can you also send the checklist of required documents?",
        timestamp: "2025-10-12T09:21:00-04:00",
      },
    ],
    docs: [
      { name: "Proof of ID.pdf", status: "Requested", source: "SVD" },
      { name: "Service Agreement.pdf", status: "Signed", source: "SVD" },
      { name: "Intake Questionnaire.pdf", status: "Received", source: "SVD" },
    ],
  },
  svd: {
    personal: {
      folders: ["IDs", "Taxes", "Receipts"],
      checklist: ["Upload primary ID", "Add last year's tax return", "Scan five recent receipts"],
      events: [
        { action: "Upload simulated: Driver's License.png", actor: "demo-user", time: "09:30" },
        { action: "OCR classified: ID → IDs/", actor: "system", time: "09:30" },
        { action: "Auto-rename: 2025-01_ID_JohnDoe.png", actor: "system", time: "09:30" },
      ],
      immutableLocked: false,
    },
    business: {
      folders: ["Client Files", "Engagement", "Year-end", "AR"],
      checklist: ["Request bank statements", "Collect signed engagement", "Assemble closing packet"],
      events: [
        { action: "Checklist requested: Bank Statements (30d)", actor: "demo-user", time: "10:05" },
        { action: "Upload simulated: Statements.pdf", actor: "client", time: "10:07" },
        { action: "OCR classified: Statements → Client Files/", actor: "system", time: "10:07" },
        { action: "Packetized: T2 year-end bundle (immutable lock)", actor: "system", time: "10:10" },
      ],
      immutableLocked: true,
    },
  },
};