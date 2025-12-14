export interface CustomApp {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  modules: string[];
  techStack: {
    frontend: string;
    backend: string;
    integrations: string[];
  };
  category: string;
  features: string[];
}

export const customApps: CustomApp[] = [
  {
    id: "property-inventory-tracker",
    title: "Property Inventory Tracker",
    slug: "property-inventory-tracker",
    description: "Track property occupancy, maintenance schedules, and tenant information in one centralized dashboard.",
    image: "/images/customApps/property-inventory-tracker.png",
    modules: ["Form Intake", "User Management", "Notifications", "Data Dashboard", "File Upload"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Google Sheets API", "Zapier hooks", "Email notifications"]
    },
    category: "Property Management",
    features: ["Occupancy tracking", "Maintenance scheduling", "Tenant communication", "Financial reporting"]
  },
  {
    id: "tenant-payment-portal",
    title: "Tenant Payment Portal",
    slug: "tenant-payment-portal",
    description: "Secure online payment processing with automated receipts and transaction history for tenants.",
    image: "/images/customApps/tenant-payment-portal.png",
    modules: ["Payment Processing", "User Login", "Notifications", "Data Dashboard", "API Integration"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Stripe API", "Email notifications", "Google Sheets API"]
    },
    category: "Property Management",
    features: ["Secure payments", "Digital receipts", "Payment history", "Automated reminders"]
  },
  {
    id: "contractor-work-order-app",
    title: "Contractor Work Order App",
    slug: "contractor-work-order-app",
    description: "Manage work orders, track progress, and coordinate with clients through a mobile-friendly interface.",
    image: "/images/customApps/contractor-work-order-app.png",
    modules: ["Form Intake", "User Management", "Notifications", "File Upload", "Workflow Automation"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Slack API", "Google Drive", "Email notifications"]
    },
    category: "Contractors",
    features: ["Work order management", "Photo documentation", "Progress tracking", "Client communication"]
  },
  {
    id: "client-onboarding-toolkit",
    title: "Client Onboarding Toolkit",
    slug: "client-onboarding-toolkit",
    description: "Streamline client onboarding with automated document collection and progress tracking.",
    image: "/images/customApps/client-onboarding-toolkit.png",
    modules: ["Form Intake", "User Management", "Notifications", "File Upload", "Workflow Automation"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Google Drive", "Email notifications", "Slack API"]
    },
    category: "Accounting",
    features: ["Document collection", "Progress tracking", "Automated reminders", "Client portal"]
  },
  {
    id: "clinic-intake-hub",
    title: "Clinic Intake Hub",
    slug: "clinic-intake-hub",
    description: "Digital patient intake system with appointment scheduling and health record management.",
    image: "/images/customApps/clinic-intake-hub.png",
    modules: ["Form Intake", "User Management", "Notifications", "Data Dashboard", "File Upload"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Email notifications", "Calendar API", "Secure file storage"]
    },
    category: "Healthcare",
    features: ["Patient intake", "Appointment scheduling", "Health records", "Secure communication"]
  },
  {
    id: "cleaning-route-planner",
    title: "Cleaning Route Planner",
    slug: "cleaning-route-planner",
    description: "Optimize cleaning routes and track service completion with GPS integration.",
    image: "/images/customApps/cleaning-route-planner.png",
    modules: ["Form Intake", "User Management", "Notifications", "API Integration", "Data Dashboard"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Google Maps API", "GPS tracking", "Email notifications"]
    },
    category: "Cleaning",
    features: ["Route optimization", "GPS tracking", "Service completion", "Client notifications"]
  },
  {
    id: "real-estate-lead-manager",
    title: "Real Estate Lead Manager",
    slug: "real-estate-lead-manager",
    description: "Track leads through the sales pipeline with automated follow-ups and property matching.",
    image: "/images/customApps/real-estate-lead-manager.png",
    modules: ["Form Intake", "User Management", "Notifications", "Workflow Automation", "Data Dashboard"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["HubSpot API", "Email notifications", "Google Maps API"]
    },
    category: "Real Estate",
    features: ["Lead tracking", "Pipeline management", "Property matching", "Automated follow-ups"]
  },
  {
    id: "custom-dashboard-builder",
    title: "Custom Dashboard Builder",
    slug: "custom-dashboard-builder",
    description: "Create custom analytics dashboards with drag-and-drop widgets and real-time data visualization.",
    image: "/images/customApps/custom-dashboard-builder.png",
    modules: ["Data Dashboard", "User Management", "API Integration", "Workflow Automation", "Notifications"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Multiple APIs", "Real-time data", "Export functionality"]
    },
    category: "Analytics",
    features: ["Drag-and-drop widgets", "Real-time data", "Custom metrics", "Export reports"]
  },
  {
    id: "workflow-automation-studio",
    title: "Workflow Automation Studio",
    slug: "workflow-automation-studio",
    description: "Visual workflow builder for creating custom business process automations.",
    image: "/images/customApps/workflow-automation-studio.png",
    modules: ["Workflow Automation", "User Management", "API Integration", "Notifications", "Data Dashboard"],
    techStack: {
      frontend: "React + Tailwind",
      backend: "Supabase",
      integrations: ["Zapier hooks", "API webhooks", "Email notifications"]
    },
    category: "Automation",
    features: ["Visual workflow builder", "Node-based logic", "API integrations", "Automated triggers"]
  }
];

export const getCustomAppBySlug = (slug: string): CustomApp | undefined => {
  return customApps.find(app => app.slug === slug);
};

export const getCustomAppsByCategory = (category: string): CustomApp[] => {
  return customApps.filter(app => app.category === category);
};

export const categories = [
  "Property Management",
  "Contractors", 
  "Accounting",
  "Healthcare",
  "Cleaning",
  "Real Estate",
  "Analytics",
  "Automation"
];
