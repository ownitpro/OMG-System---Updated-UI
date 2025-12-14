export interface Automation {
  id: string;
  title: string;
  painPoint: string;
  solution: string;
}

export const automations: Automation[] = [
  {
    id: "client-upsert",
    title: "Client Upsert + Chatbot Summarize & Approval",
    painPoint: "Teams waste time identifying if a client is new or existing and drafting repetitive replies.",
    solution: "Automation checks client DB, summarizes message, routes for approval, and sends pre-approved response automatically."
  },
  {
    id: "spreadsheet-sync",
    title: "Spreadsheet Sync Lead Capture",
    painPoint: "Leads get lost because manual copy/paste from forms to sheets is slow.",
    solution: "Webhooks push each submission straight into your Google Sheet or Airtable instantly."
  },
  {
    id: "overdue-invoice-reminder",
    title: "Overdue Invoice Notification",
    painPoint: "Businesses lose track of unpaid invoices and miss reminders.",
    solution: "Scheduled automation finds overdue invoices and sends branded email reminders automatically."
  },
  {
    id: "meeting-followup",
    title: "Meeting Follow-Up Summary",
    painPoint: "Staff spend hours typing up notes after every meeting.",
    solution: "Automation creates and sends a summary and action list right after each call."
  },
  {
    id: "auto-filing",
    title: "Document Auto-Filing & Tagging",
    painPoint: "Files pile up in random folders, and teams lose critical documents.",
    solution: "Automation reads uploads, classifies files by type, and moves them to correct folders automatically."
  },
  {
    id: "contract-renewal",
    title: "Contract Expiry & Renewal Alerts",
    painPoint: "Missed renewals cause lost revenue and rushed last-minute deals.",
    solution: "Automation sends reminders at 30/60/90 days before contract expiration."
  },
  {
    id: "feedback-request",
    title: "Customer Feedback Request",
    painPoint: "Businesses forget to ask for reviews, missing valuable testimonials.",
    solution: "Automation triggers personalized review requests after job completion."
  },
  {
    id: "team-alerts",
    title: "Slack / Teams Event Alerts",
    painPoint: "Important updates (like new leads or payments) go unnoticed.",
    solution: "Automation sends real-time notifications into Slack or Teams."
  },
  {
    id: "auto-approval",
    title: "Auto-Approval & Escalation Path",
    painPoint: "Internal requests stall because no one approves on time.",
    solution: "Workflow routes to approver A, then escalates to B if no response in X hours."
  },
  {
    id: "client-status-email",
    title: "Client Status Snapshot Email",
    painPoint: "Clients keep asking for updates or progress reports.",
    solution: "Automation emails each client their status summary weekly with open items and progress metrics."
  },
  {
    id: "lead-enrichment",
    title: "Lead Enrichment on Entry",
    painPoint: "Sales waste time researching leads.",
    solution: "Automation enriches leads with company data (industry, size, location) automatically on capture."
  },
  {
    id: "subscription-renewal",
    title: "Subscription Renewal Prompt",
    painPoint: "Clients forget to renew subscriptions, causing churn.",
    solution: "Automation sends renewal / upgrade prompts before plan expiration."
  },
  {
    id: "ticket-triage",
    title: "Support Ticket Triage & Auto-Assignment",
    painPoint: "Support tickets pile up or get assigned incorrectly.",
    solution: "Automation classifies and routes tickets by topic, priority, and workload."
  }
];
