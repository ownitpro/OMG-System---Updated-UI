/**
 * OMGsystems Case Snapshots
 * 
 * Lightweight social-proof engine with industry-specific success stories
 * Format: Situation → Intervention → Outcome → Proof Notes → CTA
 * Word count: 250-400 words; 1 chart or stat card
 */

export interface CaseSnapshot {
  id: string;
  industry: string;
  title: string;
  subtitle: string;
  situation: string;
  intervention: string;
  outcome: string;
  proofNotes: string[];
  cta: {
    primary: string;
    secondary: string;
  };
  metrics: {
    kpi: string;
    before: string;
    after: string;
    delta: string;
    unit: string;
  }[];
  socialTiles: {
    banner: string;
    square: string;
    altText: string;
  };
  seo: {
    metaDescription: string;
    keywords: string[];
    canonical: string;
  };
  publishedAt: string;
  featured: boolean;
}

export const caseSnapshots: CaseSnapshot[] = [
  {
    id: "property-management-3-day-turnaround",
    industry: "property-management",
    title: "From Spreadsheet Chaos to a Predictable 3-Day Turnaround",
    subtitle: "How a Durham property management firm automated owner statements and cut ticket resolution time by 57%",
    situation: "A mid-sized property management firm in Durham, Ontario managed 130 residential units using spreadsheets and group emails. Owner statements were often delayed two weeks. Maintenance tickets were scattered across texts and emails, causing tenant frustration and missed renewals.",
    intervention: "We deployed OMGsystems Property Management Suite — automating maintenance intake, ticket routing, owner statement generation, and client updates. Key modules included: Smart Intake Forms (auto-create tickets from tenant submissions), Role-Based Dashboards (Maintenance, Finance, and Leasing each saw their own view), SecureVault Docs Integration (all invoices, leases, and inspection photos auto-archived), and AI Owner Reports (automated summaries with revenue, expenses, and open items — generated weekly).",
    outcome: "Ticket resolution time dropped from 7 days to 3 days. Owner statement delay reduced from 14 days to 0 days (same week). Tenant satisfaction (surveyed via SMS) rose 28%. Admin workload decreased by 12 hours per week.",
    proofNotes: [
      "All workflows hosted in Canadian data centers",
      "No staff replaced — instead, teams repurposed time into client relations",
      "ROI achieved in 19 days of operation"
    ],
    cta: {
      primary: "Book a Property Management Demo",
      secondary: "See how we did it"
    },
    metrics: [
      {
        kpi: "Average ticket close time",
        before: "7 days",
        after: "3 days",
        delta: "-57%",
        unit: "days"
      },
      {
        kpi: "Owner statement delay",
        before: "14 days",
        after: "0 days",
        delta: "-100%",
        unit: "days"
      },
      {
        kpi: "Tenant satisfaction",
        before: "68%",
        after: "96%",
        delta: "+28 pts",
        unit: "percentage"
      },
      {
        kpi: "Admin time saved",
        before: "0",
        after: "12h/week",
        delta: "12h/week",
        unit: "hours"
      }
    ],
    socialTiles: {
      banner: "/case-mockups/property-management/property-management-case.png",
      square: "/case-mockups/property-management/property-management-case-square.png",
      altText: "Dashboard-style banner showing three cards ('Tickets Resolved 57% Faster', 'Owner Statements Auto-Generated', '12h Admin Time Saved') and a small table (7d→3d, 14d→0, 68%→96%). OMGsystems lime accents on off-white."
    },
    seo: {
      metaDescription: "See how a Durham property management firm cut ticket resolution time by 57% and automated owner statements with OMGsystems. Real results in 30 days.",
      keywords: ["property management automation", "maintenance ticket system", "owner statements", "Durham Ontario", "property management software"],
      canonical: "https://omgsystems.com/case-snapshots/property-management-3-day-turnaround"
    },
    publishedAt: "2024-10-14",
    featured: true
  },
  {
    id: "contractors-80-percent-quote-time",
    industry: "contractors",
    title: "How a GTA Renovation Firm Cut Quote Time by 80%",
    subtitle: "From 3-day quote delays to 45-minute turnarounds with automated lead scoring and proposal generation",
    situation: "A renovation contractor in Oshawa handled 40+ projects yearly but struggled to keep up with quotes and follow-ups. Prospects waited 3-4 days for pricing; many went cold. Client communication was manual, and invoice tracking was done in Excel.",
    intervention: "We rolled out the OMGsystems Contractor Growth Engine, integrating CRM, quoting, and follow-up automation. Key modules included: Lead Capture Forms → Instant Scoring (qualified leads within 30 seconds), Proposal Templates with E-Sign (clients received quotes same-day), Progress Portal (milestones auto-updated; photos uploaded via mobile), and Payment Triggers (invoices generated automatically upon milestone completion).",
    outcome: "Quote turnaround dropped from 3 days to 45 minutes. Close rate increased 32%. Average monthly revenue grew 27%. Follow-up emails sent automatically → response rate +44%.",
    proofNotes: [
      "Deployed in under 10 business days",
      "100% data hosted in Canada; full CRA invoice compliance",
      "Most-used automation: 'Deposit paid → Kickoff task creation'"
    ],
    cta: {
      primary: "See the Contractor Demo",
      secondary: "Get your outline"
    },
    metrics: [
      {
        kpi: "Quote turnaround time",
        before: "3 days",
        after: "45 min",
        delta: "-80%",
        unit: "time"
      },
      {
        kpi: "Close rate increase",
        before: "baseline",
        after: "+32%",
        delta: "+32%",
        unit: "percentage"
      },
      {
        kpi: "Monthly revenue growth",
        before: "baseline",
        after: "+27%",
        delta: "+27%",
        unit: "percentage"
      },
      {
        kpi: "Email response rate",
        before: "baseline",
        after: "+44%",
        delta: "+44%",
        unit: "percentage"
      }
    ],
    socialTiles: {
      banner: "/case-mockups/contractors/contractor-case.png",
      square: "/case-mockups/contractors/contractor-case-square.png",
      altText: "Contractor holding tablet showing 'Quote Approved' with timeline nodes and stats: Quote Turnaround ↓80%, Close Rate ↑32%, Revenue ↑27%. Electric Lime accents on Graphite background."
    },
    seo: {
      metaDescription: "GTA renovation contractor cuts quote time from 3 days to 45 minutes with OMGsystems automation. 32% higher close rate, 27% revenue growth.",
      keywords: ["contractor automation", "quote management", "renovation software", "GTA contractors", "construction CRM"],
      canonical: "https://omgsystems.com/case-snapshots/contractors-80-percent-quote-time"
    },
    publishedAt: "2024-10-14",
    featured: true
  },
  {
    id: "real-estate-showing-automation",
    industry: "real-estate",
    title: "Never Miss a Showing Again: Self-Booking + SMS Reminders",
    subtitle: "Toronto real estate agent eliminates scheduling conflicts and increases showing attendance by 40%",
    situation: "A busy Toronto real estate agent juggled 15+ active listings with manual scheduling. Showings were often double-booked, clients missed appointments, and follow-up was inconsistent. The agent spent 3+ hours daily on scheduling and reminder calls.",
    intervention: "We implemented OMGsystems Real Estate Growth Engine with automated showing management. Features included: Self-Booking Portal (clients book their own showing slots), SMS Reminder System (automated 24h and 2h reminders), Unified Inbox (all communications in one place), and E-Sign Integration (offers and contracts signed digitally).",
    outcome: "Showing attendance increased 40%. Scheduling conflicts dropped to zero. Agent saved 2.5 hours daily on administrative tasks. Client satisfaction scores improved 35%.",
    proofNotes: [
      "100% Canadian data residency maintained",
      "Integration with MLS and showing services",
      "Mobile-optimized for on-the-go agents"
    ],
    cta: {
      primary: "Sandbox the CRM",
      secondary: "See checklist"
    },
    metrics: [
      {
        kpi: "Showing attendance",
        before: "60%",
        after: "84%",
        delta: "+40%",
        unit: "percentage"
      },
      {
        kpi: "Scheduling conflicts",
        before: "3-5/week",
        after: "0",
        delta: "-100%",
        unit: "incidents"
      },
      {
        kpi: "Daily admin time saved",
        before: "3 hours",
        after: "30 min",
        delta: "-83%",
        unit: "hours"
      },
      {
        kpi: "Client satisfaction",
        before: "7.2/10",
        after: "9.7/10",
        delta: "+35%",
        unit: "rating"
      }
    ],
    socialTiles: {
      banner: "/case-mockups/real-estate/real-estate-case.png",
      square: "/case-mockups/real-estate/real-estate-case-square.png",
      altText: "Real estate agent with tablet showing calendar with green checkmarks and stats: Showing Attendance +40%, Zero Conflicts, 2.5h Daily Saved. Clean white background with Electric Lime accents."
    },
    seo: {
      metaDescription: "Toronto real estate agent increases showing attendance by 40% with automated scheduling and SMS reminders. Zero conflicts, 2.5 hours saved daily.",
      keywords: ["real estate automation", "showing management", "Toronto real estate", "agent productivity", "real estate CRM"],
      canonical: "https://omgsystems.com/case-snapshots/real-estate-showing-automation"
    },
    publishedAt: "2024-10-14",
    featured: false
  },
  {
    id: "accounting-chasing-time-70-percent",
    industry: "accounting",
    title: "From Chasing Documents to 70% Time Savings",
    subtitle: "Small CPA firm in Mississauga automates client onboarding and document collection",
    situation: "A 5-person CPA firm in Mississauga spent 60% of their time chasing clients for missing documents during tax season. Manual follow-ups, scattered email threads, and lost documents created stress for both staff and clients. The firm was turning away new clients due to capacity constraints.",
    intervention: "We deployed OMGsystems Accounting Workflow Engine with automated document collection and client communication. Key features included: Digital Intake Forms (clients upload documents directly), Automated Follow-up Sequences (gentle reminders for missing items), SecureVault Docs (all documents organized and searchable), and AI Meeting Summaries (client calls automatically summarized with action items).",
    outcome: "Document collection time reduced by 70%. Client onboarding completed 3x faster. Staff stress levels decreased significantly. Firm capacity increased by 40% without adding headcount.",
    proofNotes: [
      "Full PHIPA/PIPEDA compliance maintained",
      "Integration with major accounting software",
      "Client portal accessible 24/7"
    ],
    cta: {
      primary: "Pilot a small pod",
      secondary: "See how we did it"
    },
    metrics: [
      {
        kpi: "Document collection time",
        before: "60% of time",
        after: "18% of time",
        delta: "-70%",
        unit: "percentage"
      },
      {
        kpi: "Client onboarding speed",
        before: "2 weeks",
        after: "5 days",
        delta: "3x faster",
        unit: "time"
      },
      {
        kpi: "Firm capacity increase",
        before: "baseline",
        after: "+40%",
        delta: "+40%",
        unit: "percentage"
      },
      {
        kpi: "Staff stress reduction",
        before: "high",
        after: "low",
        delta: "significant",
        unit: "qualitative"
      }
    ],
    socialTiles: {
      banner: "/case-mockups/accounting/accounting-case.png",
      square: "/case-mockups/accounting/accounting-case-square.png",
      altText: "CPA firm dashboard showing document collection automation with stats: 70% Time Saved, 3x Faster Onboarding, 40% Capacity Increase. Professional blue and white design."
    },
    seo: {
      metaDescription: "Mississauga CPA firm reduces document collection time by 70% with automated client onboarding. 3x faster processing, 40% capacity increase.",
      keywords: ["accounting automation", "CPA software", "document collection", "Mississauga accounting", "tax preparation"],
      canonical: "https://omgsystems.com/case-snapshots/accounting-chasing-time-70-percent"
    },
    publishedAt: "2024-10-14",
    featured: false
  },
  {
    id: "cleaning-receivables-reduction",
    industry: "cleaning",
    title: "Route Optimization + Auto-Invoicing = 50% Faster Payments",
    subtitle: "GTA cleaning company eliminates manual invoicing and reduces receivables by 50%",
    situation: "A commercial cleaning company serving the GTA struggled with manual invoicing and late payments. Staff spent hours each week creating invoices, tracking payments, and following up on overdue accounts. Cash flow was inconsistent, and the company was losing money on late fees and collection efforts.",
    intervention: "We implemented OMGsystems Cleaning Operations Suite with automated invoicing and route optimization. Features included: Route Optimization Engine (efficient scheduling and travel time reduction), Mobile Checklist + Photo Proof (quality control with visual documentation), Auto-Invoice Generation (invoices created automatically upon job completion), and Payment Reminder System (automated follow-ups for overdue accounts).",
    outcome: "Payment collection time reduced by 50%. Route efficiency improved 25%. Quality control issues decreased 60%. Cash flow became predictable and consistent.",
    proofNotes: [
      "Integration with major accounting platforms",
      "Mobile app for field staff",
      "Real-time GPS tracking and optimization"
    ],
    cta: {
      primary: "Start a pilot route",
      secondary: "See checklist"
    },
    metrics: [
      {
        kpi: "Payment collection time",
        before: "45 days",
        after: "22 days",
        delta: "-50%",
        unit: "days"
      },
      {
        kpi: "Route efficiency",
        before: "baseline",
        after: "+25%",
        delta: "+25%",
        unit: "percentage"
      },
      {
        kpi: "Quality control issues",
        before: "15/month",
        after: "6/month",
        delta: "-60%",
        unit: "incidents"
      },
      {
        kpi: "Cash flow predictability",
        before: "inconsistent",
        after: "consistent",
        delta: "improved",
        unit: "qualitative"
      }
    ],
    socialTiles: {
      banner: "/case-mockups/cleaning/cleaning-case.png",
      square: "/case-mockups/cleaning/cleaning-case-square.png",
      altText: "Cleaning company dashboard showing route optimization and payment automation with stats: 50% Faster Payments, 25% Route Efficiency, 60% Fewer Issues. Green and white design."
    },
    seo: {
      metaDescription: "GTA cleaning company reduces payment collection time by 50% with automated invoicing and route optimization. 25% efficiency gain, 60% fewer quality issues.",
      keywords: ["cleaning company automation", "route optimization", "commercial cleaning", "GTA cleaning", "invoice automation"],
      canonical: "https://omgsystems.com/case-snapshots/cleaning-receivables-reduction"
    },
    publishedAt: "2024-10-14",
    featured: false
  },
  {
    id: "healthcare-intake-time-50-percent",
    industry: "healthcare",
    title: "Digital Intake + OCR Reduces Patient Wait Times by 50%",
    subtitle: "Toronto healthcare clinic automates patient intake and document processing",
    situation: "A busy healthcare clinic in Toronto struggled with long patient wait times due to manual intake processes. Staff spent 15-20 minutes per patient collecting and entering information. Paper forms were often incomplete or illegible, leading to delays and errors. Patient satisfaction was declining due to wait times.",
    intervention: "We deployed OMGsystems Healthcare Automation Suite with digital intake and OCR capabilities. Key features included: Digital Intake Forms (patients complete forms online before arrival), OCR Document Processing (insurance cards and IDs scanned automatically), Claims Validation (real-time eligibility checks), and Staff Scheduling Optimization (efficient appointment management).",
    outcome: "Patient intake time reduced by 50%. Wait times decreased from 45 minutes to 22 minutes. Staff productivity increased 30%. Patient satisfaction scores improved 40%.",
    proofNotes: [
      "Full PHIPA compliance maintained",
      "Integration with major EMR systems",
      "Real-time insurance verification"
    ],
    cta: {
      primary: "Request a secure demo",
      secondary: "See how we did it"
    },
    metrics: [
      {
        kpi: "Patient intake time",
        before: "15-20 min",
        after: "7-10 min",
        delta: "-50%",
        unit: "minutes"
      },
      {
        kpi: "Average wait time",
        before: "45 min",
        after: "22 min",
        delta: "-51%",
        unit: "minutes"
      },
      {
        kpi: "Staff productivity",
        before: "baseline",
        after: "+30%",
        delta: "+30%",
        unit: "percentage"
      },
      {
        kpi: "Patient satisfaction",
        before: "6.8/10",
        after: "9.5/10",
        delta: "+40%",
        unit: "rating"
      }
    ],
    socialTiles: {
      banner: "/case-mockups/healthcare/healthcare-case.png",
      square: "/case-mockups/healthcare/healthcare-case-square.png",
      altText: "Healthcare clinic dashboard showing digital intake automation with stats: 50% Faster Intake, 51% Shorter Waits, 30% More Productive. Medical blue and white design."
    },
    seo: {
      metaDescription: "Toronto healthcare clinic reduces patient intake time by 50% with digital forms and OCR. 51% shorter wait times, 30% productivity increase.",
      keywords: ["healthcare automation", "patient intake", "OCR healthcare", "Toronto clinic", "EMR integration"],
      canonical: "https://omgsystems.com/case-snapshots/healthcare-intake-time-50-percent"
    },
    publishedAt: "2024-10-14",
    featured: false
  }
];

// Helper functions
export function getCaseSnapshotById(id: string): CaseSnapshot | undefined {
  return caseSnapshots.find(snapshot => snapshot.id === id);
}

export function getCaseSnapshotsByIndustry(industry: string): CaseSnapshot[] {
  return caseSnapshots.filter(snapshot => snapshot.industry === industry);
}

export function getFeaturedCaseSnapshots(): CaseSnapshot[] {
  return caseSnapshots.filter(snapshot => snapshot.featured);
}

export function getLatestCaseSnapshots(limit: number = 3): CaseSnapshot[] {
  return caseSnapshots
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAllIndustries(): string[] {
  return [...new Set(caseSnapshots.map(snapshot => snapshot.industry))];
}
