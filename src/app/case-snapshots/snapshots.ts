// app/case-snapshots/snapshots.ts
export type SnapshotItem = {
  slug: string;
  industry: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  hero?: string;        // path under /public e.g. "/cases/pm-dashboard.png"
  heroAlt?: string;
};

export const SNAPSHOTS: SnapshotItem[] = [
  {
    slug: "property-management-3-day-turnaround",
    industry: "Property Management",
    title: "From Spreadsheet Chaos to a Predictable 3-Day Turnaround",
    subtitle:
      "How a Durham property management firm automated owner statements and cut ticket resolution time by 57%",
    metricLabel: "Average ticket close time",
    metricValue: "-57%",
    hero: "/cases/pm-dashboard.png",
    heroAlt:
      "Dashboard-style banner with three cards and small table: tickets faster, owner statements auto-generated, admin time saved",
  },
  {
    slug: "contractor-80-percent-quote-time",
    industry: "Contractors",
    title: "How a GTA Renovation Firm Cut Quote Time by 80%",
    subtitle:
      "From 3-day quote delays to 45-minute turnarounds with automated lead scoring and proposal generation",
    metricLabel: "Quote turnaround time",
    metricValue: "-80%",
    hero: "/cases/contractor-quote-approved.png",
    heroAlt:
      "Contractor holding tablet showing Quote Approved with timeline and stats",
  },
  {
    slug: "real-estate-self-booking-showings",
    industry: "Real Estate",
    title: "Never Miss a Showing Again: Self-Booking + SMS Reminders",
    subtitle:
      "Toronto real estate agent eliminates scheduling conflicts and increases showing attendance by 40%",
    metricLabel: "Showing attendance",
    metricValue: "+40%",
    hero: "/cases/realestate-showings.png",
    heroAlt:
      "Agent with calendar, green checkmarks; showing attendance up",
  },
  {
    slug: "accounting-document-automation-70",
    industry: "Accounting",
    title: "From Chasing Documents to 70% Time Savings",
    subtitle:
      "Small CPA firm in Mississauga automates client onboarding and document collection",
    metricLabel: "Document collection time",
    metricValue: "-70%",
    hero: "/cases/accounting-intake.png",
    heroAlt:
      "CPA dashboard with document collection automation stats",
  },
  {
    slug: "cleaning-route-optimization",
    industry: "Cleaning",
    title: "Route Optimization + Auto-Invoicing = 50% Faster Payments",
    subtitle:
      "GTA cleaning company eliminates manual invoicing and reduces receivables by 50%",
    metricLabel: "Payment collection time",
    metricValue: "-50%",
    hero: "/cases/cleaning-route-invoice.png",
    heroAlt:
      "Cleaning company dashboard with route efficiency and auto-invoicing",
  },
  {
    slug: "healthcare-intake-automation-50",
    industry: "Healthcare",
    title: "Digital Intake + OCR Reduces Patient Wait Times by 50%",
    subtitle:
      "Toronto healthcare clinic automates patient intake and document processing",
    metricLabel: "Patient intake time",
    metricValue: "-50%",
    hero: "/cases/healthcare-intake-ocr.png",
    heroAlt:
      "Clinic dashboard with CareFlow intake and alerts",
  },
];
