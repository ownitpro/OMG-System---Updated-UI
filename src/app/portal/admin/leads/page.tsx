"use client";

import * as React from "react";
import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getAdminNavV2 } from "@/config/portalNav";
import {
  InboxIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

// Lead source types matching the tabs
type LeadSource = "all" | "apps" | "solutions" | "marketing" | "industries" | "ai-agents" | "content-engine" | "custom-apps" | "smart-automations" | "contact";

// Lead status options
type LeadStatus = "new" | "contacted" | "nurturing" | "qualified" | "converted" | "lost";

// Mock lead data for UI demonstration
type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: Exclude<LeadSource, "all">;
  status: LeadStatus;
  industry?: string;
  message: string;
  formData: Record<string, any>;
  tags: string[];
  createdAt: string;
};

// App name mapping for display (Apps waiting list form)
const APP_NAMES: Record<string, string> = {
  crm: "OMG-CRM",
  leads: "OMG Leads",
  securevault: "SecureVault Docs",
};

// Solution name mapping for display (Solutions pages)
const SOLUTION_NAMES: Record<string, string> = {
  "timeguard-ai": "TimeGuard AI",
  automations: "Automations",
  "strategy-session": "Strategy Session",
  "custom-solutions": "Custom Solutions",
};

// Service name mapping for display (Marketing/Services pages)
const SERVICE_NAMES: Record<string, string> = {
  ads: "Ads Management",
  branding: "Branding & Creative",
  content: "Content Development",
};

// Industry name mapping for display (Industries pages)
const INDUSTRY_NAMES: Record<string, string> = {
  "real-estate": "Real Estate",
  accounting: "Accounting",
  contractors: "Contractors",
  "property-management": "Property Management",
};

// Real Estate volume mapping
const RE_VOLUME_NAMES: Record<string, string> = {
  "0-10": "0-10 Deals/Year",
  "10-25": "10-25 Deals/Year",
  "25-50": "25-50 Deals/Year",
  "50+": "50+ Deals/Year",
};

// Accounting practice size mapping
const ACC_SIZE_NAMES: Record<string, string> = {
  "solo": "Solo Practitioner",
  "2-5": "2-5 Staff",
  "5-10": "5-10 Staff",
  "10+": "10+ Staff",
};

// Property Management units mapping
const PM_UNITS_NAMES: Record<string, string> = {
  "1-50": "1-50 Units",
  "50-200": "50-200 Units",
  "200-500": "200-500 Units",
  "500+": "500+ Units",
};

// Contractors trade mapping
const CONT_TRADE_NAMES: Record<string, string> = {
  "gc": "General Contractor",
  "hvac-plumbing": "HVAC / Plumbing",
  "electrical": "Electrical",
  "landscaping": "Landscaping",
  "other": "Other",
};

// Contractors project volume mapping
const CONT_PROJECT_VOL_NAMES: Record<string, string> = {
  "1-5": "1-5 Projects/Month",
  "5-15": "5-15 Projects/Month",
  "15-30": "15-30 Projects/Month",
  "30+": "30+ Projects/Month",
};

// AI Agent type mapping for display (AI Agents form)
const AGENT_TYPE_NAMES: Record<string, string> = {
  "lead-capture": "Lead Capture Agent",
  "customer-support": "Customer Support Agent",
  "scheduling": "Scheduling Assistant",
  "data-entry": "Data Entry Agent",
  "email-automation": "Email Automation Agent",
  "custom": "Custom Agent",
};

// Content type mapping for display (Content Engine form)
const CONTENT_TYPE_NAMES: Record<string, string> = {
  "blog-posts": "Blog Posts",
  "social-media": "Social Media",
  "email-campaigns": "Email Campaigns",
  "video-scripts": "Video Scripts",
  "ad-copy": "Ad Copy",
  "whitepapers": "Whitepapers",
};

// Volume mapping for display
const VOLUME_NAMES: Record<string, string> = {
  "1-10": "1-10/month",
  "11-25": "11-25/month",
  "26-50": "26-50/month",
  "50+": "50+/month",
};

// Module mapping for display (Custom Apps form)
const MODULE_NAMES: Record<string, string> = {
  "dashboard": "Dashboard",
  "forms": "Data Entry Forms",
  "user-portal": "User Portal",
  "crm-integration": "CRM Integration",
  "database": "Database Setup",
  "notifications": "Notification System",
  "scheduling": "Scheduling System",
  "workflows": "Workflow Automation",
  "analytics": "Advanced Analytics",
  "ai-features": "AI Features",
};

// Automation name mapping for display (Smart Automations form)
const AUTOMATION_NAMES: Record<string, string> = {
  "1": "Lead Nurturing Sequence",
  "2": "Invoice Processing",
  "3": "Customer Onboarding",
  "4": "Report Generation",
  "5": "Task Assignment",
  "6": "Support Ticket Routing",
  "7": "Contract Renewal Alerts",
  "8": "Inventory Alerts",
  "9": "Lead Scoring",
  "custom": "Custom / Not Sure Yet",
};

// Mock data for demonstration
const MOCK_LEADS: Lead[] = [
  {
    id: "lead_001",
    name: "John Doe",
    email: "john@acmerealty.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Realty",
    source: "apps",
    status: "new",
    industry: "real-estate",
    message: "Need better lead tracking and follow-up automation. Currently using spreadsheets and losing leads.",
    formData: { interestedApps: ["crm", "leads"], crmIndustry: "real-estate" },
    tags: ["crm", "leads", "real-estate"],
    createdAt: "2026-01-15T10:30:00Z",
  },
  {
    id: "lead_002",
    name: "Jane Smith",
    email: "jane@creativestudio.com",
    phone: "+1 (555) 234-5678",
    company: "Creative Studio",
    source: "marketing",
    status: "contacted",
    industry: "creative-agency",
    message: "Want to increase brand awareness and generate more qualified leads through social media.",
    formData: { servicesInterested: ["ads", "branding", "content"], budget: "$5k-10k" },
    tags: ["ads", "branding", "high-budget"],
    createdAt: "2026-01-14T14:20:00Z",
  },
  {
    id: "lead_003",
    name: "Bob Builder",
    email: "bob@buildright.com",
    phone: "+1 (555) 345-6789",
    company: "BuildRight Construction",
    source: "industries",
    status: "nurturing",
    industry: "contractors",
    message: "Project management is chaotic, need better organization for jobs, estimates, and subcontractors.",
    formData: {
      industries: ["contractors"],
      cont_trade: "gc",
      cont_project_vol: "15-30",
      challenge: "Need better organization for jobs, estimates, and subcontractors."
    },
    tags: ["contractors"],
    createdAt: "2026-01-13T09:15:00Z",
  },
  {
    id: "lead_004",
    name: "Sarah Chen",
    email: "sarah@techstartup.io",
    phone: "+1 (555) 456-7890",
    company: "Tech Startup Inc",
    source: "solutions",
    status: "qualified",
    message: "Looking for automation to streamline our customer onboarding process.",
    formData: {
      solutions: ["automations"],
      teamSize: "6-20",
      automations_tools: "Zapier, Google Sheets, HubSpot CRM",
      automations_repetitive: "Manual data entry from form submissions to CRM"
    },
    tags: ["automations"],
    createdAt: "2026-01-12T16:45:00Z",
  },
  {
    id: "lead_005",
    name: "Mike Johnson",
    email: "mike@propertyplus.com",
    phone: "+1 (555) 567-8901",
    company: "Property Plus Management",
    source: "apps",
    status: "new",
    industry: "property-management",
    message: "Need a CRM to track tenants, leases, and maintenance requests all in one place.",
    formData: { interestedApps: ["crm"], crmIndustry: "property-management" },
    tags: ["crm", "property-management"],
    createdAt: "2026-01-15T08:00:00Z",
  },
  {
    id: "lead_006",
    name: "Emily Davis",
    email: "emily@taxsolutions.com",
    company: "Tax Solutions LLC",
    source: "contact",
    status: "new",
    industry: "accounting",
    message: "Interested in learning more about your document management and workflow automation solutions.",
    formData: { subject: "General Inquiry", budget: "$1k-5k", timeline: "1-3 months" },
    tags: ["accounting", "documents"],
    createdAt: "2026-01-11T11:30:00Z",
  },
  {
    id: "lead_007",
    name: "Tom Williams",
    email: "tom@cleanpro.com",
    phone: "+1 (555) 678-9012",
    company: "CleanPro Services",
    source: "solutions",
    status: "new",
    message: "Need TimeGuard AI to track employee hours for our cleaning crews.",
    formData: {
      solutions: ["timeguard-ai"],
      teamSize: "6-20",
      timeguard_headaches: ["No-shows", "Manual scheduling", "After-hours calls"],
      timeguard_volume: "50-100"
    },
    tags: ["timeguard-ai"],
    createdAt: "2026-01-14T09:00:00Z",
  },
  {
    id: "lead_027",
    name: "Amanda Rivera",
    email: "amanda@growthcoach.com",
    phone: "+1 (555) 111-5555",
    company: "Growth Coach Consulting",
    source: "solutions",
    status: "new",
    message: "Need a strategy session to map out our AI roadmap and identify automation opportunities.",
    formData: {
      solutions: ["strategy-session"],
      strategy_goal: "Scale revenue with better systems"
    },
    tags: ["strategy-session"],
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "lead_028",
    name: "Kevin Park",
    email: "kevin@innovatetech.co",
    phone: "+1 (555) 222-6666",
    company: "InnovateTech Solutions",
    source: "solutions",
    status: "contacted",
    message: "Looking to build a custom client portal with specific integrations and workflows.",
    formData: {
      solutions: ["custom-solutions"],
      custom_vision: "We need a branded client portal where customers can track project progress, download deliverables, and communicate with our team. Should integrate with Slack and our billing system."
    },
    tags: ["custom-solutions"],
    createdAt: "2026-01-14T15:30:00Z",
  },
  {
    id: "lead_029",
    name: "Michelle Wong",
    email: "michelle@dentalplus.com",
    phone: "+1 (555) 333-7777",
    company: "DentalPlus Clinic",
    source: "solutions",
    status: "qualified",
    message: "Need both TimeGuard for scheduling and automation for patient reminders.",
    formData: {
      solutions: ["timeguard-ai", "automations"],
      timeguard_headaches: ["No-shows", "Double bookings"],
      timeguard_volume: "100+",
      automations_tools: "Dentrix, Google Calendar, Gmail",
      automations_repetitive: "Sending appointment reminders and follow-up emails"
    },
    tags: ["timeguard-ai", "automations", "healthcare"],
    createdAt: "2026-01-13T14:00:00Z",
  },
  {
    id: "lead_008",
    name: "Lisa Anderson",
    email: "lisa@proaccount.com",
    phone: "+1 (555) 789-0123",
    company: "Pro Accounting Services",
    source: "industries",
    status: "contacted",
    industry: "accounting",
    message: "Looking for secure document storage for client tax files and financial records.",
    formData: {
      industries: ["accounting"],
      acc_size: "5-10",
      acc_challenge: ["Document Collection", "Tax Season Workflow"],
      challenge: "Looking for secure document storage for client tax files."
    },
    tags: ["accounting", "documents"],
    createdAt: "2026-01-13T15:30:00Z",
  },
  {
    id: "lead_009",
    name: "David Kim",
    email: "david@luxuryrealty.com",
    phone: "+1 (555) 890-1234",
    company: "Luxury Realty Group",
    source: "industries",
    status: "new",
    industry: "real-estate",
    message: "Need a system to manage high-end property listings and client relationships.",
    formData: {
      industries: ["real-estate"],
      re_volume: "25-50",
      re_pain_point: ["Lost Leads", "Pipeline Visibility"],
      challenge: "Need a system to manage high-end property listings and client relationships."
    },
    tags: ["real-estate"],
    createdAt: "2026-01-14T11:00:00Z",
  },
  {
    id: "lead_010",
    name: "Rachel Green",
    email: "rachel@greenproperties.com",
    phone: "+1 (555) 901-2345",
    company: "Green Properties LLC",
    source: "industries",
    status: "nurturing",
    industry: "property-management",
    message: "Managing 50+ rental units, need better tenant communication and maintenance tracking.",
    formData: {
      industries: ["property-management"],
      pm_units: "50-200",
      pm_focus: ["Tenant Screening", "Maintenance Coord", "Rent Collection"],
      challenge: "Need better tenant communication and maintenance tracking."
    },
    tags: ["property-management"],
    createdAt: "2026-01-12T14:30:00Z",
  },
  // AI Agents leads
  {
    id: "lead_011",
    name: "Marcus Thompson",
    email: "marcus@realtypro.com",
    phone: "+1 (555) 111-2222",
    company: "Realty Pro Group",
    source: "ai-agents",
    status: "new",
    industry: "Real Estate",
    message: "Need an AI agent to capture and qualify leads from our website 24/7, then automatically schedule showings.",
    formData: { agentType: "lead-capture", industry: "Real Estate", preferredStartDate: "2026-02-01" },
    tags: ["ai-agents", "lead-capture", "real-estate"],
    createdAt: "2026-01-15T09:00:00Z",
  },
  {
    id: "lead_012",
    name: "Jennifer Walsh",
    email: "jennifer@accountingplus.com",
    phone: "+1 (555) 222-3333",
    company: "Accounting Plus LLC",
    source: "ai-agents",
    status: "contacted",
    industry: "Accounting",
    message: "Looking for a customer support agent to handle basic client inquiries about tax deadlines and document requirements.",
    formData: { agentType: "customer-support", industry: "Accounting", preferredStartDate: "2026-01-20" },
    tags: ["ai-agents", "customer-support", "accounting"],
    createdAt: "2026-01-14T14:00:00Z",
  },
  {
    id: "lead_013",
    name: "Carlos Rodriguez",
    email: "carlos@buildmaster.com",
    phone: "+1 (555) 333-4444",
    company: "BuildMaster Construction",
    source: "ai-agents",
    status: "qualified",
    industry: "Contractors",
    message: "Want a scheduling assistant to coordinate subcontractors and manage project timelines automatically.",
    formData: { agentType: "scheduling", industry: "Contractors", preferredStartDate: "2026-02-15" },
    tags: ["ai-agents", "scheduling", "contractors"],
    createdAt: "2026-01-13T11:30:00Z",
  },
  {
    id: "lead_014",
    name: "Amanda Foster",
    email: "amanda@urbanproperties.com",
    phone: "+1 (555) 444-5555",
    company: "Urban Property Management",
    source: "ai-agents",
    status: "new",
    industry: "Property Management",
    message: "Need a custom AI agent to handle tenant communications, maintenance requests, and rent reminders.",
    formData: { agentType: "custom", industry: "Property Management", preferredStartDate: "2026-03-01" },
    tags: ["ai-agents", "custom", "property-management"],
    createdAt: "2026-01-15T08:15:00Z",
  },
  // Content Engine leads
  {
    id: "lead_015",
    name: "Sarah Mitchell",
    email: "sarah@techstartup.io",
    phone: "+1 (555) 555-6666",
    company: "TechStartup Inc",
    source: "content-engine",
    status: "new",
    industry: "Technology & SaaS",
    message: "Need to scale our blog content and social media presence. Currently producing 5 pieces/month but want to hit 50+.",
    formData: { contentTypes: ["blog-posts", "social-media", "email-campaigns"], monthlyVolume: "50+", industry: "Technology & SaaS", biggestChallenge: "Maintaining consistent brand voice across all channels while scaling output." },
    tags: ["content-engine", "blog", "social-media", "saas"],
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "lead_016",
    name: "David Chen",
    email: "david@ecomgrowth.com",
    phone: "+1 (555) 666-7777",
    company: "E-Com Growth Agency",
    source: "content-engine",
    status: "contacted",
    industry: "E-commerce & Retail",
    message: "Agency needs content creation for multiple clients. Looking for white-label solution.",
    formData: { contentTypes: ["ad-copy", "email-campaigns", "social-media", "video-scripts"], monthlyVolume: "50+", industry: "E-commerce & Retail", biggestChallenge: "Creating unique content for 20+ clients without it sounding generic." },
    tags: ["content-engine", "agency", "ad-copy", "e-commerce"],
    createdAt: "2026-01-14T16:30:00Z",
  },
  {
    id: "lead_017",
    name: "Emily Rodriguez",
    email: "emily@healthwellness.co",
    phone: "+1 (555) 777-8888",
    company: "Health & Wellness Co",
    source: "content-engine",
    status: "qualified",
    industry: "Healthcare",
    message: "Healthcare content needs to be accurate and compliant. Need help with patient education materials.",
    formData: { contentTypes: ["blog-posts", "whitepapers", "email-campaigns"], monthlyVolume: "26-50", industry: "Healthcare", biggestChallenge: "Ensuring medical accuracy while keeping content engaging and readable." },
    tags: ["content-engine", "healthcare", "compliance", "education"],
    createdAt: "2026-01-13T09:45:00Z",
  },
  {
    id: "lead_018",
    name: "Michael Torres",
    email: "michael@realestatepro.net",
    phone: "+1 (555) 888-9999",
    company: "Real Estate Pro Network",
    source: "content-engine",
    status: "new",
    industry: "Real Estate",
    message: "Need property descriptions, market updates, and social content for listings.",
    formData: { contentTypes: ["blog-posts", "social-media", "ad-copy"], monthlyVolume: "11-25", industry: "Real Estate", biggestChallenge: "Writing unique descriptions for similar properties without repetition." },
    tags: ["content-engine", "real-estate", "listings", "social"],
    createdAt: "2026-01-15T14:20:00Z",
  },
  // Custom Apps leads
  {
    id: "lead_019",
    name: "James Wilson",
    email: "james@logisticspro.com",
    phone: "+1 (555) 111-0000",
    company: "Logistics Pro Inc",
    source: "custom-apps",
    status: "new",
    industry: "Logistics",
    message: "Need a custom fleet management dashboard with real-time tracking and automated scheduling.",
    formData: { selectedModules: ["dashboard", "scheduling", "notifications", "analytics", "database"], coreObjectives: "Track 200+ vehicles in real-time, automate route optimization, and manage driver schedules.", additionalNotes: "Budget: $15k-25k, Timeline: 45 days, Need API integration with GPS providers." },
    tags: ["custom-apps", "logistics", "dashboard", "scheduling"],
    createdAt: "2026-01-15T10:30:00Z",
  },
  {
    id: "lead_020",
    name: "Patricia Adams",
    email: "patricia@medicalgroup.com",
    phone: "+1 (555) 222-1111",
    company: "Adams Medical Group",
    source: "custom-apps",
    status: "contacted",
    industry: "Healthcare",
    message: "Patient portal with appointment booking, medical records access, and secure messaging.",
    formData: { selectedModules: ["user-portal", "scheduling", "notifications", "database", "forms"], coreObjectives: "HIPAA-compliant patient portal for 5,000+ patients with self-service appointment booking.", additionalNotes: "Must integrate with existing EHR system. Timeline: 60 days." },
    tags: ["custom-apps", "healthcare", "patient-portal", "hipaa"],
    createdAt: "2026-01-14T15:45:00Z",
  },
  {
    id: "lead_021",
    name: "Robert Chang",
    email: "robert@constructionhub.net",
    phone: "+1 (555) 333-2222",
    company: "Construction Hub LLC",
    source: "custom-apps",
    status: "qualified",
    industry: "Contractors",
    message: "Project management system with subcontractor coordination, bid management, and progress tracking.",
    formData: { selectedModules: ["dashboard", "forms", "workflows", "crm-integration", "notifications", "analytics"], coreObjectives: "Manage 50+ concurrent construction projects with subcontractor assignments and milestone tracking.", additionalNotes: "Need QuickBooks integration for invoicing. Budget: $20k-30k." },
    tags: ["custom-apps", "construction", "project-management", "crm"],
    createdAt: "2026-01-13T11:00:00Z",
  },
  {
    id: "lead_022",
    name: "Michelle Lee",
    email: "michelle@edulearn.io",
    phone: "+1 (555) 444-3333",
    company: "EduLearn Platform",
    source: "custom-apps",
    status: "new",
    industry: "Education",
    message: "Learning management system with course creation, student progress tracking, and AI-powered assessments.",
    formData: { selectedModules: ["dashboard", "user-portal", "forms", "analytics", "ai-features", "notifications"], coreObjectives: "Build an LMS for 10,000+ students with automated grading and personalized learning paths.", additionalNotes: "Need video hosting integration and mobile app. Timeline: 90 days." },
    tags: ["custom-apps", "education", "lms", "ai"],
    createdAt: "2026-01-15T09:15:00Z",
  },
  // Smart Automations leads
  {
    id: "lead_023",
    name: "David Martinez",
    email: "david@techsolutions.io",
    phone: "+1 (555) 555-0001",
    company: "TechSolutions Inc",
    source: "smart-automations",
    status: "new",
    industry: "Technology",
    message: "Need to automate our lead follow-up process. Currently losing 30% of leads due to slow response times.",
    formData: { automationInterest: "1", workflowChallenge: "Our sales team is overwhelmed with manual follow-ups. We need automated nurturing sequences that trigger based on lead behavior." },
    tags: ["smart-automations", "lead-nurturing", "sales"],
    createdAt: "2026-01-15T16:30:00Z",
  },
  {
    id: "lead_024",
    name: "Sarah Thompson",
    email: "sarah@financepro.com",
    phone: "+1 (555) 555-0002",
    company: "FinancePro Advisors",
    source: "smart-automations",
    status: "contacted",
    industry: "Accounting",
    message: "Invoice processing takes our team 20+ hours weekly. Need automation to capture, categorize, and route invoices.",
    formData: { automationInterest: "2", workflowChallenge: "Manual data entry from invoices is error-prone and time-consuming. Need OCR and automatic categorization." },
    tags: ["smart-automations", "invoice-processing", "accounting"],
    createdAt: "2026-01-14T11:45:00Z",
  },
  {
    id: "lead_025",
    name: "Mark Johnson",
    email: "mark@growthstartup.co",
    phone: "+1 (555) 555-0003",
    company: "Growth Startup",
    source: "smart-automations",
    status: "qualified",
    industry: "SaaS",
    message: "Customer onboarding is inconsistent. Want to automate welcome emails, training assignments, and check-in reminders.",
    formData: { automationInterest: "3", workflowChallenge: "New customers get lost without proper onboarding. We need automated sequences to guide them through setup and training." },
    tags: ["smart-automations", "onboarding", "customer-success"],
    createdAt: "2026-01-13T09:00:00Z",
  },
  {
    id: "lead_026",
    name: "Lisa Chen",
    email: "lisa@dataanalytics.net",
    phone: "+1 (555) 555-0004",
    company: "DataAnalytics Corp",
    source: "smart-automations",
    status: "new",
    industry: "Analytics",
    message: "Weekly report generation takes 6+ hours. Need automation to pull data from multiple sources and distribute reports.",
    formData: { automationInterest: "4", workflowChallenge: "We pull data from 5 different systems manually to create weekly reports. Need to automate the entire process including distribution." },
    tags: ["smart-automations", "reports", "analytics"],
    createdAt: "2026-01-15T14:00:00Z",
  },
];

const SOURCE_TABS: { value: LeadSource; label: string; color: string }[] = [
  { value: "all", label: "All Leads", color: "#A855F7" },
  { value: "apps", label: "Apps", color: "#14B8A6" },
  { value: "solutions", label: "Solutions", color: "#3B82F6" },
  { value: "marketing", label: "Marketing", color: "#F59E0B" },
  { value: "industries", label: "Industries", color: "#EC4899" },
  { value: "ai-agents", label: "AI Agents", color: "#8B5CF6" },
  { value: "content-engine", label: "Content Engine", color: "#06B6D4" },
  { value: "custom-apps", label: "Custom Apps", color: "#6366F1" },
  { value: "smart-automations", label: "Smart Automations", color: "#10B981" },
  { value: "contact", label: "Contact", color: "#6B7280" },
];

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "#F59E0B" },
  { value: "contacted", label: "Contacted", color: "#3B82F6" },
  { value: "nurturing", label: "Nurturing", color: "#A855F7" },
  { value: "qualified", label: "Qualified", color: "#14B8A6" },
  { value: "converted", label: "Converted", color: "#47BD79" },
  { value: "lost", label: "Lost", color: "#EF4444" },
];

function StatusBadge({ status }: { status: LeadStatus }) {
  const option = STATUS_OPTIONS.find((s) => s.value === status);
  if (!option) return null;

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border"
      style={{
        backgroundColor: `${option.color}20`,
        color: option.color,
        borderColor: `${option.color}40`,
      }}
    >
      {option.label}
    </span>
  );
}

function SourceBadge({ source }: { source: Exclude<LeadSource, "all"> }) {
  const tab = SOURCE_TABS.find((t) => t.value === source);
  if (!tab) return null;

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border"
      style={{
        backgroundColor: `${tab.color}20`,
        color: tab.color,
        borderColor: `${tab.color}40`,
      }}
    >
      {tab.label}
    </span>
  );
}

function LeadDetailDrawer({
  lead,
  onClose,
  onStatusChange,
}: {
  lead: Lead;
  onClose: () => void;
  onStatusChange: (status: LeadStatus) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-slate-900 border-l border-white/10 shadow-2xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">{lead.name}</h2>
              <p className="text-sm text-white/60">{lead.email}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <XMarkIcon className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Status & Source */}
          <div className="flex items-center gap-3 mb-6">
            <select
              value={lead.status}
              onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#A855F7]/50"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-slate-900">
                  {s.label}
                </option>
              ))}
            </select>
            <SourceBadge source={lead.source} />
          </div>

          {/* Contact Info */}
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
              Contact Info
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <EnvelopeIcon className="w-4 h-4 text-white/40" />
                {lead.email}
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <PhoneIcon className="w-4 h-4 text-white/40" />
                  {lead.phone}
                </div>
              )}
              {lead.company && (
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <BuildingOfficeIcon className="w-4 h-4 text-white/40" />
                  {lead.company}
                </div>
              )}
              {lead.industry && (
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <TagIcon className="w-4 h-4 text-white/40" />
                  {lead.industry.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </div>
              )}
            </div>
          </div>

          {/* Form-Specific Data */}
          {lead.source === "apps" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Apps Waiting List
              </h3>
              <div className="space-y-3">
                {lead.formData.interestedApps && (
                  <div>
                    <span className="text-white/40 text-sm block mb-2">Interested Apps: </span>
                    <div className="flex flex-wrap gap-2">
                      {lead.formData.interestedApps.map((app: string) => (
                        <span
                          key={app}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500/20 text-teal-400 border border-teal-500/30"
                        >
                          {APP_NAMES[app] || app.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lead.formData.crmIndustry && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-2">Personalizing Your Experience: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {INDUSTRY_NAMES[lead.formData.crmIndustry] || lead.formData.crmIndustry.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {lead.source === "marketing" && lead.formData.servicesInterested && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Services Interested
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.formData.servicesInterested.map((service: string) => (
                  <span
                    key={service}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  >
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </span>
                ))}
              </div>
              {lead.formData.budget && (
                <div className="mt-3 text-sm text-white/60">
                  <span className="text-white/40">Budget: </span>
                  {lead.formData.budget}
                </div>
              )}
            </div>
          )}

          {lead.source === "solutions" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Solutions Request
              </h3>
              <div className="space-y-3">
                {/* Solutions Interested */}
                {lead.formData.solutions && (
                  <div>
                    <span className="text-white/40 text-sm block mb-2">Solutions Interested: </span>
                    <div className="flex flex-wrap gap-2">
                      {lead.formData.solutions.map((solution: string) => (
                        <span
                          key={solution}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        >
                          {SOLUTION_NAMES[solution] || solution}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* TimeGuard AI Configuration */}
                {(lead.formData.timeguard_headaches || lead.formData.timeguard_volume) && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/60 text-sm font-medium block mb-2">TimeGuard AI Configuration:</span>
                    {lead.formData.timeguard_headaches && (
                      <div className="mb-2">
                        <span className="text-white/40 text-sm block mb-2">Scheduling Headaches: </span>
                        <div className="flex flex-wrap gap-2">
                          {lead.formData.timeguard_headaches.map((headache: string) => (
                            <span
                              key={headache}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30"
                            >
                              {headache}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {lead.formData.timeguard_volume && (
                      <div>
                        <span className="text-white/40 text-sm">Weekly Appointments: </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500/20 text-teal-400 border border-teal-500/30">
                          {lead.formData.timeguard_volume}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Automations Configuration */}
                {(lead.formData.automations_tools || lead.formData.automations_repetitive) && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/60 text-sm font-medium block mb-2">Automations Configuration:</span>
                    {lead.formData.automations_tools && (
                      <div className="mb-2">
                        <span className="text-white/40 text-sm block mb-1">Current Tools: </span>
                        <p className="text-sm text-white/70 leading-relaxed">{lead.formData.automations_tools}</p>
                      </div>
                    )}
                    {lead.formData.automations_repetitive && (
                      <div>
                        <span className="text-white/40 text-sm block mb-1">Repetitive Tasks: </span>
                        <p className="text-sm text-white/70 leading-relaxed">{lead.formData.automations_repetitive}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Strategy Session Configuration */}
                {lead.formData.strategy_goal && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/60 text-sm font-medium block mb-2">Strategy Session Goal:</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {lead.formData.strategy_goal}
                    </span>
                  </div>
                )}

                {/* Custom Solutions Configuration */}
                {lead.formData.custom_vision && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/60 text-sm font-medium block mb-2">Custom Solution Vision:</span>
                    <p className="text-sm text-white/70 leading-relaxed">{lead.formData.custom_vision}</p>
                  </div>
                )}

                {/* Team Size */}
                {lead.formData.teamSize && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm">Team Size: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                      {lead.formData.teamSize} employees
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {lead.source === "industries" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Industry Profile
              </h3>
              <div className="space-y-3">
                {/* Industries Selected */}
                {lead.formData.industries && (
                  <div>
                    <span className="text-white/40 text-sm block mb-2">Industries: </span>
                    <div className="flex flex-wrap gap-2">
                      {lead.formData.industries.map((ind: string) => (
                        <span
                          key={ind}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-pink-500/20 text-pink-400 border border-pink-500/30"
                        >
                          {INDUSTRY_NAMES[ind] || ind.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Real Estate Profile */}
                {(lead.formData.re_volume || lead.formData.re_pain_point) && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-blue-400 text-sm font-medium block mb-2">Real Estate Profile:</span>
                    {lead.formData.re_volume && (
                      <div className="mb-2">
                        <span className="text-white/40 text-sm">Annual Volume: </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {RE_VOLUME_NAMES[lead.formData.re_volume] || lead.formData.re_volume}
                        </span>
                      </div>
                    )}
                    {lead.formData.re_pain_point && lead.formData.re_pain_point.length > 0 && (
                      <div>
                        <span className="text-white/40 text-sm block mb-2">Pain Points: </span>
                        <div className="flex flex-wrap gap-2">
                          {lead.formData.re_pain_point.map((pain: string) => (
                            <span
                              key={pain}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
                            >
                              {pain}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Accounting Profile */}
                {(lead.formData.acc_size || lead.formData.acc_challenge) && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-emerald-400 text-sm font-medium block mb-2">Accounting Firm Details:</span>
                    {lead.formData.acc_size && (
                      <div className="mb-2">
                        <span className="text-white/40 text-sm">Practice Size: </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {ACC_SIZE_NAMES[lead.formData.acc_size] || lead.formData.acc_size}
                        </span>
                      </div>
                    )}
                    {lead.formData.acc_challenge && lead.formData.acc_challenge.length > 0 && (
                      <div>
                        <span className="text-white/40 text-sm block mb-2">Primary Challenges: </span>
                        <div className="flex flex-wrap gap-2">
                          {lead.formData.acc_challenge.map((chall: string) => (
                            <span
                              key={chall}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            >
                              {chall}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Property Management Profile */}
                {(lead.formData.pm_units || lead.formData.pm_focus) && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-purple-400 text-sm font-medium block mb-2">Portfolio Overview:</span>
                    {lead.formData.pm_units && (
                      <div className="mb-2">
                        <span className="text-white/40 text-sm">Portfolio Size: </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          {PM_UNITS_NAMES[lead.formData.pm_units] || lead.formData.pm_units}
                        </span>
                      </div>
                    )}
                    {lead.formData.pm_focus && lead.formData.pm_focus.length > 0 && (
                      <div>
                        <span className="text-white/40 text-sm block mb-2">Key Focus Areas: </span>
                        <div className="flex flex-wrap gap-2">
                          {lead.formData.pm_focus.map((focus: string) => (
                            <span
                              key={focus}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Contractors Profile */}
                {(lead.formData.cont_trade || lead.formData.cont_project_vol) && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-amber-400 text-sm font-medium block mb-2">Business Profile:</span>
                    {lead.formData.cont_trade && (
                      <div className="mb-2">
                        <span className="text-white/40 text-sm">Primary Trade: </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {CONT_TRADE_NAMES[lead.formData.cont_trade] || lead.formData.cont_trade}
                        </span>
                      </div>
                    )}
                    {lead.formData.cont_project_vol && (
                      <div>
                        <span className="text-white/40 text-sm">Monthly Volume: </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {CONT_PROJECT_VOL_NAMES[lead.formData.cont_project_vol] || lead.formData.cont_project_vol}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* General Challenge */}
                {lead.formData.challenge && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-1">Additional Details: </span>
                    <p className="text-sm text-white/70 leading-relaxed">{lead.formData.challenge}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {lead.source === "ai-agents" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                AI Agent Request
              </h3>
              <div className="space-y-3">
                {lead.formData.agentType && (
                  <div>
                    <span className="text-white/40 text-sm">Agent Type: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30">
                      {AGENT_TYPE_NAMES[lead.formData.agentType] || lead.formData.agentType}
                    </span>
                  </div>
                )}
                {lead.formData.industry && (
                  <div>
                    <span className="text-white/40 text-sm">Industry: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {lead.formData.industry}
                    </span>
                  </div>
                )}
                {lead.formData.preferredStartDate && (
                  <div className="text-sm text-white/60">
                    <span className="text-white/40">Preferred Start Date: </span>
                    {new Date(lead.formData.preferredStartDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}

          {lead.source === "content-engine" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Content Engine Request
              </h3>
              <div className="space-y-3">
                {lead.formData.contentTypes && (
                  <div>
                    <span className="text-white/40 text-sm block mb-2">Content Types: </span>
                    <div className="flex flex-wrap gap-2">
                      {lead.formData.contentTypes.map((type: string) => (
                        <span
                          key={type}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        >
                          {CONTENT_TYPE_NAMES[type] || type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lead.formData.monthlyVolume && (
                  <div>
                    <span className="text-white/40 text-sm">Monthly Volume: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {VOLUME_NAMES[lead.formData.monthlyVolume] || lead.formData.monthlyVolume}
                    </span>
                  </div>
                )}
                {lead.formData.industry && (
                  <div>
                    <span className="text-white/40 text-sm">Industry: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {lead.formData.industry}
                    </span>
                  </div>
                )}
                {lead.formData.biggestChallenge && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-1">Biggest Challenge: </span>
                    <p className="text-sm text-white/70 leading-relaxed">{lead.formData.biggestChallenge}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {lead.source === "custom-apps" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Custom App Request
              </h3>
              <div className="space-y-3">
                {lead.formData.selectedModules && (
                  <div>
                    <span className="text-white/40 text-sm block mb-2">Selected Modules: </span>
                    <div className="flex flex-wrap gap-2">
                      {lead.formData.selectedModules.map((module: string) => (
                        <span
                          key={module}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        >
                          {MODULE_NAMES[module] || module}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lead.formData.coreObjectives && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-1">Core Objectives: </span>
                    <p className="text-sm text-white/70 leading-relaxed">{lead.formData.coreObjectives}</p>
                  </div>
                )}
                {lead.formData.additionalNotes && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-1">Additional Notes: </span>
                    <p className="text-sm text-white/70 leading-relaxed">{lead.formData.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {lead.source === "smart-automations" && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Automation Request
              </h3>
              <div className="space-y-3">
                {lead.formData.automationInterest && (
                  <div>
                    <span className="text-white/40 text-sm block mb-2">Automation Interest: </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {AUTOMATION_NAMES[lead.formData.automationInterest] || lead.formData.automationInterest}
                    </span>
                  </div>
                )}
                {lead.formData.workflowChallenge && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/40 text-sm block mb-1">Workflow Challenge: </span>
                    <p className="text-sm text-white/70 leading-relaxed">{lead.formData.workflowChallenge}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
              <ChatBubbleLeftIcon className="w-4 h-4 inline mr-2" />
              Message / Challenges
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">{lead.message}</p>
          </div>

          {/* Tags */}
          {lead.tags.length > 0 && (
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <CalendarIcon className="w-4 h-4" />
            Submitted {new Date(lead.createdAt).toLocaleDateString()} at{" "}
            {new Date(lead.createdAt).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLeadsPage() {
  const nav = getAdminNavV2();
  const [leads, setLeads] = React.useState<Lead[]>(MOCK_LEADS);
  const [activeTab, setActiveTab] = React.useState<LeadSource>("all");
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<LeadStatus | "all">("all");
  const [sortDir, setSortDir] = React.useState<"desc" | "asc">("desc");
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);

  // Filter leads based on tab, search, and status
  const filteredLeads = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    return leads
      .filter((lead) => (activeTab === "all" ? true : lead.source === activeTab))
      .filter((lead) => (statusFilter === "all" ? true : lead.status === statusFilter))
      .filter((lead) => {
        if (!q) return true;
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.company?.toLowerCase().includes(q) ||
          lead.message.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const dir = sortDir === "desc" ? -1 : 1;
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
      });
  }, [leads, activeTab, query, statusFilter, sortDir]);

  // Count leads per source for tab badges
  const sourceCounts = React.useMemo(() => {
    const counts: Record<LeadSource, number> = {
      all: leads.length,
      apps: 0,
      solutions: 0,
      marketing: 0,
      industries: 0,
      "ai-agents": 0,
      "content-engine": 0,
      "custom-apps": 0,
      "smart-automations": 0,
      contact: 0,
    };
    leads.forEach((lead) => {
      counts[lead.source]++;
    });
    return counts;
  }, [leads]);

  // Handle status change
  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Source", "Status", "Industry", "Message", "Date"];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone || "",
      lead.company || "",
      lead.source,
      lead.status,
      lead.industry || "",
      `"${lead.message.replace(/"/g, '""')}"`,
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${activeTab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PortalShellV2 role="admin" title="Leads" nav={nav} upgradeHref="/products/plans" lockedCount={0} fullWidth>
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 w-full max-w-none"
        style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <InboxIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <div className="text-xl font-semibold text-white">Leads</div>
              <div className="text-sm text-white/60">
                Manage leads from all forms across the website
              </div>
            </div>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Source Tabs - Horizontally scrollable for many tabs */}
        <div className="mb-6 border-b border-white/10 pb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
          {SOURCE_TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            const count = sourceCounts[tab.value];
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                style={isActive ? { borderColor: `${tab.color}50` } : {}}
              >
                {tab.label}
                <span
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: isActive ? `${tab.color}30` : "rgba(255,255,255,0.1)",
                    color: isActive ? tab.color : "rgba(255,255,255,0.5)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, company, or message..."
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#A855F7]/50 focus:ring-2 focus:ring-[#A855F7]/20 transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#A855F7]/50"
          >
            <option value="all" className="bg-slate-900">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} className="bg-slate-900">
                {s.label}
              </option>
            ))}
          </select>

          {/* Sort */}
          <button
            onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            {sortDir === "desc" ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronUpIcon className="w-4 h-4" />
            )}
            {sortDir === "desc" ? "Newest First" : "Oldest First"}
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
              setSortDir("desc");
            }}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-sm text-white/50">Showing: </span>
            <span className="text-sm font-semibold text-white">{filteredLeads.length}</span>
          </div>
          <div className="rounded-xl border border-[#47BD79]/30 bg-[#47BD79]/10 px-4 py-2">
            <span className="text-sm text-[#47BD79]/70">New: </span>
            <span className="text-sm font-semibold text-[#47BD79]">
              {filteredLeads.filter((l) => l.status === "new").length}
            </span>
          </div>
          <div className="rounded-xl border border-[#A855F7]/30 bg-[#A855F7]/10 px-4 py-2">
            <span className="text-sm text-[#A855F7]/70">Qualified: </span>
            <span className="text-sm font-semibold text-[#A855F7]">
              {filteredLeads.filter((l) => l.status === "qualified").length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <div className="max-h-[600px] overflow-auto">
            <table className="w-full min-w-[1200px] text-sm">
              <thead className="sticky top-0 z-10 bg-white/5 backdrop-blur-sm">
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    Company
                  </th>
                  {activeTab === "all" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                      Source
                    </th>
                  )}
                  {/* Source-specific columns */}
                  {activeTab === "apps" && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                        Interested Apps
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                        Industry Template
                      </th>
                    </>
                  )}
                  {activeTab === "solutions" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[200px]">
                      Solutions
                    </th>
                  )}
                  {activeTab === "marketing" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                      Services
                    </th>
                  )}
                  {activeTab === "industries" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                      Industry
                    </th>
                  )}
                  {activeTab === "ai-agents" && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[180px]">
                        Agent Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[140px]">
                        Industry
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[100px]">
                        Start Date
                      </th>
                    </>
                  )}
                  {activeTab === "content-engine" && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[200px]">
                        Content Types
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[120px]">
                        Volume
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[140px]">
                        Industry
                      </th>
                    </>
                  )}
                  {activeTab === "custom-apps" && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[220px]">
                        Selected Modules
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[140px]">
                        Industry
                      </th>
                    </>
                  )}
                  {activeTab === "smart-automations" && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[200px]">
                        Automation Interest
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50 min-w-[140px]">
                        Industry
                      </th>
                    </>
                  )}
                  {activeTab === "contact" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                      Subject
                    </th>
                  )}
                  {activeTab === "all" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                      Industry
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    Message
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === "all" ? 7 : 6} className="px-4 py-12">
                      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                        <div className="text-base font-semibold text-white">No leads yet</div>
                        <p className="mt-2 text-sm text-white/60">
                          When visitors submit forms on your website, their leads will appear here.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="group cursor-pointer transition-colors hover:bg-white/5"
                    >
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{lead.name}</div>
                        <div className="text-xs text-white/50">{lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-white/70">{lead.company || "-"}</td>
                      {activeTab === "all" && (
                        <td className="px-4 py-3">
                          <SourceBadge source={lead.source} />
                        </td>
                      )}
                      {/* Source-specific data columns */}
                      {activeTab === "apps" && (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {lead.formData.interestedApps?.map((app: string) => (
                                <span
                                  key={app}
                                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-teal-500/20 text-teal-400 border border-teal-500/30"
                                >
                                  {APP_NAMES[app] || app.toUpperCase()}
                                </span>
                              )) || "-"}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {lead.formData.crmIndustry ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                {lead.formData.crmIndustry.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                              </span>
                            ) : (
                              <span className="text-white/40">-</span>
                            )}
                          </td>
                        </>
                      )}
                      {activeTab === "solutions" && (
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {lead.formData.solutions?.map((solution: string) => (
                              <span
                                key={solution}
                                className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              >
                                {SOLUTION_NAMES[solution] || solution}
                              </span>
                            )) || (
                              lead.formData.solutionInterested ? (
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                  {SOLUTION_NAMES[lead.formData.solutionInterested] || lead.formData.solutionInterested}
                                </span>
                              ) : "-"
                            )}
                          </div>
                        </td>
                      )}
                      {activeTab === "marketing" && (
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {lead.formData.servicesInterested?.map((service: string) => (
                              <span
                                key={service}
                                className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              >
                                {SERVICE_NAMES[service] || service}
                              </span>
                            )) || "-"}
                          </div>
                        </td>
                      )}
                      {activeTab === "industries" && (
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-pink-500/20 text-pink-400 border border-pink-500/30">
                            {lead.industry
                              ? INDUSTRY_NAMES[lead.industry] || lead.industry.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
                              : "-"}
                          </span>
                        </td>
                      )}
                      {activeTab === "ai-agents" && (
                        <>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30 whitespace-nowrap">
                              {AGENT_TYPE_NAMES[lead.formData.agentType] || lead.formData.agentType || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                              {lead.formData.industry || lead.industry || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                            {lead.formData.preferredStartDate
                              ? new Date(lead.formData.preferredStartDate).toLocaleDateString()
                              : "-"}
                          </td>
                        </>
                      )}
                      {activeTab === "content-engine" && (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {lead.formData.contentTypes?.slice(0, 3).map((type: string) => (
                                <span
                                  key={type}
                                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap"
                                >
                                  {CONTENT_TYPE_NAMES[type] || type}
                                </span>
                              ))}
                              {lead.formData.contentTypes?.length > 3 && (
                                <span className="text-xs text-white/40">+{lead.formData.contentTypes.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap">
                              {VOLUME_NAMES[lead.formData.monthlyVolume] || lead.formData.monthlyVolume || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                              {lead.formData.industry || lead.industry || "-"}
                            </span>
                          </td>
                        </>
                      )}
                      {activeTab === "custom-apps" && (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {lead.formData.selectedModules?.slice(0, 3).map((module: string) => (
                                <span
                                  key={module}
                                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap"
                                >
                                  {MODULE_NAMES[module] || module}
                                </span>
                              ))}
                              {lead.formData.selectedModules?.length > 3 && (
                                <span className="text-xs text-white/40">+{lead.formData.selectedModules.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                              {lead.industry || "-"}
                            </span>
                          </td>
                        </>
                      )}
                      {activeTab === "smart-automations" && (
                        <>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                              {AUTOMATION_NAMES[lead.formData.automationInterest] || lead.formData.automationInterest || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                              {lead.industry || "-"}
                            </span>
                          </td>
                        </>
                      )}
                      {activeTab === "contact" && (
                        <td className="px-4 py-3 text-white/70">
                          {lead.formData.subject || "General Inquiry"}
                        </td>
                      )}
                      {activeTab === "all" && (
                        <td className="px-4 py-3 text-white/70">
                          {lead.industry
                            ? lead.industry.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
                            : "-"}
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-4 py-3 text-white/60 max-w-[200px]">
                        <div className="truncate" title={lead.message}>
                          {lead.message.length > 50
                            ? lead.message.substring(0, 50) + "..."
                            : lead.message}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/50">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={(status) => handleStatusChange(selectedLead.id, status)}
        />
      )}
    </PortalShellV2>
  );
}
