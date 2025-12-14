export interface AutomationDefinition {
  slug: string;
  title: string;
  setupTime: string;        // e.g. "2-3 weeks"
  setupCost: number;        // USD one-time implementation cost
  monthlyCost: number;      // USD recurring
  pain: string;              // short "before / pain" line
  benefit: string;           // short "after / what it solves" line
  features: string[];        // key bullet points
  category: string;
  industries: string[];
  icon: string;
}

export const automations: AutomationDefinition[] = [
  {
    slug: "overdue-invoice-notification",
    title: "Overdue Invoice Notification",
    setupTime: "2-3 weeks",
    setupCost: 800,
    monthlyCost: 60,
    pain: "Clients forget to pay and you chase manually.",
    benefit: "Automatically send payment reminders so cash flows consistently.",
    features: [
      "Auto email/SMS reminders for overdue invoices",
      "Escalation logic for repeated delays",
      "Custom message templates per client tier",
      "Integration with billing & accounting system"
    ],
    category: "Finance",
    industries: ["accounting", "contractors", "property-management", "real-estate"],
    icon: "💰"
  },
  {
    slug: "meeting-followup-summary",
    title: "Meeting Follow-Up Summary",
    setupTime: "3 weeks",
    setupCost: 1200,
    monthlyCost: 90,
    pain: "Key next steps from meetings get lost or delayed.",
    benefit: "Generate summaries and tasks automatically so nothing slips.",
    features: [
      "Summarize call notes or transcripts",
      "Auto-send follow-up email with action items",
      "Assign tasks to team members",
      "Integrate with calendar & task tool"
    ],
    category: "Communication",
    industries: ["property-management", "real-estate", "contractors", "accounting", "healthcare"],
    icon: "📝"
  },
  {
    slug: "client-upsert-chatbot",
    title: "Client Upsert + Chatbot Summarize & Approve",
    setupTime: "3 weeks",
    setupCost: 1400,
    monthlyCost: 105,
    pain: "You manually track which leads are new or existing.",
    benefit: "Smartly upsert leads & auto-summarize chats for quick approval.",
    features: [
      "Detect existing vs new client in CRM",
      "Generate conversational summary drafts",
      "Approval workflow for summaries",
      "Chatbot handles follow-up Q&A"
    ],
    category: "CRM",
    industries: ["real-estate", "property-management", "contractors", "accounting"],
    icon: "🤖"
  },
  {
    slug: "spreadsheet-sync-lead-capture",
    title: "Spreadsheet Sync Lead Capture",
    setupTime: "2 weeks",
    setupCost: 1000,
    monthlyCost: 75,
    pain: "You manually copy leads between forms, sheets, CRM.",
    benefit: "Sync leads automatically to spreadsheets and CRM in real time.",
    features: [
      "Live two-way sync between Google Sheets / Excel and CRM",
      "Field mapping / data normalization",
      "Duplicate detection",
      "Conflict resolution / sync rules"
    ],
    category: "Data Management",
    industries: ["real-estate", "property-management", "contractors", "accounting", "cleaning"],
    icon: "📊"
  },
  {
    slug: "document-autofiling-tagging",
    title: "Document Auto-Filing & Tagging (OCR)",
    setupTime: "3-4 weeks",
    setupCost: 1800,
    monthlyCost: 135,
    pain: "Documents arrive messy, unlabeled, lost, or misplaced.",
    benefit: "Automatically file, name, tag, and store documents via OCR.",
    features: [
      "OCR extraction and text classification",
      "Auto naming convention (date, client, type)",
      "Tag & folder assignment rules",
      "Link to client records / portal"
    ],
    category: "Document Management",
    industries: ["accounting", "healthcare", "property-management", "real-estate", "contractors"],
    icon: "📁"
  },
  {
    slug: "contract-expiry-renew-alerts",
    title: "Contract Expiry & Renewal Alerts",
    setupTime: "2 weeks",
    setupCost: 600,
    monthlyCost: 54,
    pain: "Contracts lapse without reminders, you lose renewals.",
    benefit: "Get alert triggers before contract expiry to renew timely.",
    features: [
      "Schedule alerts ahead of expiry dates",
      "Email / SMS reminders to client & team",
      "Auto escalation if no response",
      "Renewal link in alert"
    ],
    category: "Contract Management",
    industries: ["property-management", "real-estate", "contractors", "accounting", "cleaning"],
    icon: "📋"
  },
  {
    slug: "customer-feedback-request",
    title: "Customer Feedback Request",
    setupTime: "2 weeks",
    setupCost: 500,
    monthlyCost: 45,
    pain: "You rarely collect feedback, miss chances to improve.",
    benefit: "Automatically send feedback surveys to clients post-work.",
    features: [
      "Trigger survey after job completion",
      "Custom survey templates",
      "Automatic reminders if no reply",
      "Feedback aggregation dashboard"
    ],
    category: "Customer Experience",
    industries: ["contractors", "cleaning", "healthcare", "property-management", "real-estate"],
    icon: "⭐"
  },
  {
    slug: "slack-team-events-alert",
    title: "Slack / Team Events Alert",
    setupTime: "2 weeks",
    setupCost: 700,
    monthlyCost: 54,
    pain: "Team misses important events or updates.",
    benefit: "Push alerts to Slack or internal channels for events / triggers.",
    features: [
      "Slack / Teams / webhook notification integration",
      "Trigger based on project events or workflow",
      "Custom message templates",
      "Conditional filters (only high priority, etc.)"
    ],
    category: "Team Communication",
    industries: ["property-management", "real-estate", "contractors", "accounting", "cleaning", "healthcare"],
    icon: "💬"
  },
  {
    slug: "auto-approval-escalation-path",
    title: "Auto Approval & Escalation Path",
    setupTime: "3 weeks",
    setupCost: 1000,
    monthlyCost: 84,
    pain: "Approvals are stuck waiting for manual review.",
    benefit: "Automatically approve simple cases and escalate complex ones.",
    features: [
      "Rule engine for auto-approval criteria",
      "Escalation to human if thresholds exceeded",
      "Approval logs & audit trail",
      "Notification to approvers on escalation"
    ],
    category: "Workflow",
    industries: ["property-management", "real-estate", "contractors", "accounting", "healthcare"],
    icon: "✅"
  },
  {
    slug: "client-status-snapshot-email",
    title: "Client Status Snapshot Email",
    setupTime: "2 weeks",
    setupCost: 800,
    monthlyCost: 60,
    pain: "Clients don't see status updates; you send manual reports.",
    benefit: "Periodic snapshot emails with project / metrics to clients.",
    features: [
      "Scheduled status emails",
      "Include metrics, alerts, next steps",
      "Custom templates per client",
      "Link to client portal for details"
    ],
    category: "Client Communication",
    industries: ["property-management", "real-estate", "contractors", "accounting", "cleaning", "healthcare"],
    icon: "📧"
  },
  {
    slug: "lead-enrichment-on-entry",
    title: "Lead Enrichment on Entry",
    setupTime: "2-3 weeks",
    setupCost: 1100,
    monthlyCost: 90,
    pain: "Leads come in cold, with little context or data.",
    benefit: "Enrich leads with data (firmographics, technographics) automatically.",
    features: [
      "API integrations (Clearbit, Pipl, etc.)",
      "Automatic data fill (company, size, industry)",
      "Score / grade leads based on enrichment",
      "Filter / routing based on enriched fields"
    ],
    category: "Lead Management",
    industries: ["real-estate", "property-management", "contractors", "accounting"],
    icon: "🔍"
  },
  {
    slug: "subscription-renewal-prompt",
    title: "Subscription Renewal Prompt",
    setupTime: "2 weeks",
    setupCost: 600,
    monthlyCost: 45,
    pain: "Renewals often missed; clients drop without reminders.",
    benefit: "Prompt clients ahead of renewal to reduce churn.",
    features: [
      "Pre-renewal reminders via email/SMS",
      "Custom messaging & timing",
      "Link to renew / cancel",
      "Pause / opt-out logic"
    ],
    category: "Retention",
    industries: ["property-management", "real-estate", "contractors", "accounting", "cleaning", "healthcare"],
    icon: "🔄"
  },
  {
    slug: "support-ticket-triage-auto",
    title: "Support Ticket Triage & Auto Assignment",
    setupTime: "3 weeks",
    setupCost: 1300,
    monthlyCost: 96,
    pain: "Support tickets sit unassigned, response is slow.",
    benefit: "Automatically classify and route tickets to right agents.",
    features: [
      "AI classifier for ticket topics",
      "Auto-assign based on skill / load",
      "Escalation logic for unhandled tickets",
      "Dashboard of ticket flow"
    ],
    category: "Support",
    industries: ["property-management", "real-estate", "contractors", "accounting", "cleaning", "healthcare"],
    icon: "🎫"
  }
];

export const categories = [
  "All",
  "Finance",
  "Communication", 
  "CRM",
  "Data Management",
  "Document Management",
  "Contract Management",
  "Customer Experience",
  "Team Communication",
  "Workflow",
  "Client Communication",
  "Lead Management",
  "Retention",
  "Support"
];

export const industries = [
  "All",
  "property-management",
  "real-estate", 
  "contractors",
  "accounting",
  "cleaning",
  "healthcare"
];
