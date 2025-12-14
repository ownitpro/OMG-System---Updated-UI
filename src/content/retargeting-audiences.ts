export interface RetargetingAudience {
  id: string;
  name: string;
  description: string;
  platform: 'facebook' | 'google' | 'linkedin' | 'twitter';
  criteria: AudienceCriteria;
  size: number;
  industry?: string;
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
  lastUpdated: string;
}

export interface AudienceCriteria {
  websiteVisitors: {
    pages: string[];
    timeOnSite: number; // minutes
    visitFrequency: 'single' | 'multiple' | 'frequent';
  };
  engagement: {
    videoViews: boolean;
    formSubmissions: boolean;
    downloads: boolean;
    demoRequests: boolean;
  };
  demographics?: {
    ageRange?: [number, number];
    location?: string[];
    interests?: string[];
  };
  behavior: {
    cartAbandonment: boolean;
    pageDepth: number;
    sessionDuration: number; // minutes
  };
}

export interface RetargetingCreative {
  id: string;
  name: string;
  description: string;
  platform: 'facebook' | 'google' | 'linkedin' | 'twitter';
  format: 'image' | 'video' | 'carousel' | 'collection';
  audienceId: string;
  industry?: string;
  content: CreativeContent;
  cta: string;
  status: 'active' | 'paused' | 'draft';
  performance: CreativePerformance;
  createdAt: string;
  lastUpdated: string;
}

export interface CreativeContent {
  headline: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  logoUrl?: string;
  brandColors: string[];
  copy: string;
  features: string[];
}

export interface CreativePerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // click-through rate
  cpc: number; // cost per click
  cpa: number; // cost per acquisition
  roas: number; // return on ad spend
}

// Property Management Audiences
export const propertyManagementAudiences: RetargetingAudience[] = [
  {
    id: "pm-website-visitors",
    name: "Property Management Website Visitors",
    description: "Users who visited property management pages but didn't convert",
    platform: "facebook",
    industry: "property-management",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 2847,
    criteria: {
      websiteVisitors: {
        pages: ["/industries/property-management", "/apps/crm", "/case-snapshots/property-management-success"],
        timeOnSite: 2,
        visitFrequency: "multiple"
      },
      engagement: {
        videoViews: true,
        formSubmissions: false,
        downloads: false,
        demoRequests: false
      },
      demographics: {
        ageRange: [25, 65],
        location: ["Canada", "United States"],
        interests: ["Property Management", "Real Estate", "Business Software"]
      },
      behavior: {
        cartAbandonment: false,
        pageDepth: 3,
        sessionDuration: 5
      }
    }
  },
  {
    id: "pm-demo-abandoners",
    name: "Property Management Demo Abandoners",
    description: "Users who started but didn't complete the property management demo",
    platform: "google",
    industry: "property-management",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 1243,
    criteria: {
      websiteVisitors: {
        pages: ["/demo?industry=property-management"],
        timeOnSite: 1,
        visitFrequency: "single"
      },
      engagement: {
        videoViews: false,
        formSubmissions: false,
        downloads: false,
        demoRequests: true
      },
      behavior: {
        cartAbandonment: true,
        pageDepth: 2,
        sessionDuration: 3
      }
    }
  },
  {
    id: "pm-content-engagers",
    name: "Property Management Content Engagers",
    description: "Users who engaged with property management content but didn't convert",
    platform: "linkedin",
    industry: "property-management",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 1856,
    criteria: {
      websiteVisitors: {
        pages: ["/blog/property-management-automation", "/case-snapshots/property-management-success"],
        timeOnSite: 5,
        visitFrequency: "multiple"
      },
      engagement: {
        videoViews: true,
        formSubmissions: false,
        downloads: true,
        demoRequests: false
      },
      demographics: {
        ageRange: [30, 60],
        location: ["Canada", "United States"],
        interests: ["Property Management", "Business Automation", "Real Estate Technology"]
      },
      behavior: {
        cartAbandonment: false,
        pageDepth: 5,
        sessionDuration: 8
      }
    }
  }
];

// Real Estate Audiences
export const realEstateAudiences: RetargetingAudience[] = [
  {
    id: "re-website-visitors",
    name: "Real Estate Website Visitors",
    description: "Users who visited real estate pages but didn't convert",
    platform: "facebook",
    industry: "real-estate",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 3245,
    criteria: {
      websiteVisitors: {
        pages: ["/industries/real-estate", "/apps/leadflow", "/case-snapshots/real-estate-agent-success"],
        timeOnSite: 3,
        visitFrequency: "multiple"
      },
      engagement: {
        videoViews: true,
        formSubmissions: false,
        downloads: false,
        demoRequests: false
      },
      demographics: {
        ageRange: [25, 55],
        location: ["Canada", "United States"],
        interests: ["Real Estate", "Sales", "Lead Generation"]
      },
      behavior: {
        cartAbandonment: false,
        pageDepth: 4,
        sessionDuration: 6
      }
    }
  },
  {
    id: "re-lead-gen-interested",
    name: "Real Estate Lead Generation Interested",
    description: "Users who showed interest in lead generation but didn't convert",
    platform: "google",
    industry: "real-estate",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 1876,
    criteria: {
      websiteVisitors: {
        pages: ["/apps/leadflow", "/blog/real-estate-lead-generation"],
        timeOnSite: 4,
        visitFrequency: "multiple"
      },
      engagement: {
        videoViews: true,
        formSubmissions: false,
        downloads: true,
        demoRequests: false
      },
      behavior: {
        cartAbandonment: false,
        pageDepth: 6,
        sessionDuration: 7
      }
    }
  }
];

// Accounting Audiences
export const accountingAudiences: RetargetingAudience[] = [
  {
    id: "ac-website-visitors",
    name: "Accounting Website Visitors",
    description: "Users who visited accounting pages but didn't convert",
    platform: "linkedin",
    industry: "accounting",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 2156,
    criteria: {
      websiteVisitors: {
        pages: ["/industries/accounting", "/apps/securevault", "/case-snapshots/accounting-firm-efficiency"],
        timeOnSite: 4,
        visitFrequency: "multiple"
      },
      engagement: {
        videoViews: true,
        formSubmissions: false,
        downloads: false,
        demoRequests: false
      },
      demographics: {
        ageRange: [28, 65],
        location: ["Canada", "United States"],
        interests: ["Accounting", "Business Software", "Compliance"]
      },
      behavior: {
        cartAbandonment: false,
        pageDepth: 5,
        sessionDuration: 8
      }
    }
  },
  {
    id: "ac-compliance-interested",
    name: "Accounting Compliance Interested",
    description: "Users who showed interest in compliance features but didn't convert",
    platform: "google",
    industry: "accounting",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    size: 1432,
    criteria: {
      websiteVisitors: {
        pages: ["/apps/securevault", "/blog/accounting-compliance-automation"],
        timeOnSite: 5,
        visitFrequency: "multiple"
      },
      engagement: {
        videoViews: true,
        formSubmissions: false,
        downloads: true,
        demoRequests: false
      },
      behavior: {
        cartAbandonment: false,
        pageDepth: 7,
        sessionDuration: 10
      }
    }
  }
];

// Property Management Creatives
export const propertyManagementCreatives: RetargetingCreative[] = [
  {
    id: "pm-automation-benefits",
    name: "Property Management Automation Benefits",
    description: "Highlighting time savings and efficiency gains for property managers",
    platform: "facebook",
    format: "image",
    audienceId: "pm-website-visitors",
    industry: "property-management",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "Save 20+ Hours Per Week with SmartRent Flow",
      description: "Automate rent collection, maintenance requests, and owner reporting. See how other property managers are transforming their operations.",
      imageUrl: "/ads/property-management-automation.jpg",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Stop spending 40+ hours per week on administrative tasks. SmartRent Flow automates your biggest time drains so you can focus on growing your portfolio.",
      features: [
        "Automated rent collection & reminders",
        "Smart maintenance request management",
        "Automated owner reporting",
        "Integrated tenant communication"
      ]
    },
    cta: "See How It Works",
    performance: {
      impressions: 125847,
      clicks: 3847,
      conversions: 234,
      ctr: 3.05,
      cpc: 2.45,
      cpa: 45.67,
      roas: 4.2
    }
  },
  {
    id: "pm-case-study-video",
    name: "Property Management Success Story Video",
    description: "Video case study showing real results from property management automation",
    platform: "facebook",
    format: "video",
    audienceId: "pm-content-engagers",
    industry: "property-management",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "How Sarah Saved 25 Hours Per Week",
      description: "Watch how Sarah Chen transformed her 500-unit property management company with SmartRent Flow automation.",
      videoUrl: "/ads/property-management-case-study.mp4",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Real results from real property managers. See how automation can transform your operations and save you hours every week.",
      features: [
        "Real case study with actual metrics",
        "Before and after comparison",
        "Step-by-step implementation",
        "ROI calculation and results"
      ]
    },
    cta: "Watch Success Story",
    performance: {
      impressions: 98765,
      clicks: 4567,
      conversions: 189,
      ctr: 4.62,
      cpc: 1.89,
      cpa: 38.45,
      roas: 5.1
    }
  },
  {
    id: "pm-demo-reminder",
    name: "Property Management Demo Reminder",
    description: "Reminding users who started but didn't complete the property management demo",
    platform: "google",
    format: "image",
    audienceId: "pm-demo-abandoners",
    industry: "property-management",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "Complete Your SmartRent Flow Demo",
      description: "You started exploring SmartRent Flow but didn't finish. See how it can transform your property management operations.",
      imageUrl: "/ads/property-management-demo-reminder.jpg",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Don't miss out on the system that's helping property managers save 20+ hours per week. Complete your demo to see how SmartRent Flow can work for you.",
      features: [
        "Personalized demo for your portfolio",
        "Live system walkthrough",
        "Custom automation setup",
        "ROI calculation for your business"
      ]
    },
    cta: "Complete Demo",
    performance: {
      impressions: 45678,
      clicks: 2134,
      conversions: 156,
      ctr: 4.67,
      cpc: 3.12,
      cpa: 52.34,
      roas: 3.8
    }
  }
];

// Real Estate Creatives
export const realEstateCreatives: RetargetingCreative[] = [
  {
    id: "re-lead-generation",
    name: "Real Estate Lead Generation",
    description: "Focusing on lead generation and conversion for real estate agents",
    platform: "facebook",
    format: "image",
    audienceId: "re-website-visitors",
    industry: "real-estate",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "Close 40% More Deals with Agent Growth Engine",
      description: "Automate lead nurturing, follow-up sequences, and client communication. See how top agents are dominating their markets.",
      imageUrl: "/ads/real-estate-lead-generation.jpg",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Stop losing leads to poor follow-up. The Agent Growth Engine automates your lead nurturing so you never miss an opportunity to close a deal.",
      features: [
        "Automated lead nurturing sequences",
        "Smart follow-up reminders",
        "Client communication automation",
        "Transaction management tools"
      ]
    },
    cta: "See Agent Growth Engine",
    performance: {
      impressions: 156789,
      clicks: 5234,
      conversions: 312,
      ctr: 3.34,
      cpc: 2.67,
      cpa: 42.89,
      roas: 4.5
    }
  },
  {
    id: "re-success-story",
    name: "Real Estate Success Story",
    description: "Case study showing how an agent closed $12M in sales with automation",
    platform: "linkedin",
    format: "carousel",
    audienceId: "re-lead-gen-interested",
    industry: "real-estate",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "How Mike Closed $12M in Sales Last Year",
      description: "See the exact system that helped Mike Rodriguez close $12M in sales while working 30% fewer hours.",
      imageUrl: "/ads/real-estate-success-story.jpg",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Real results from real agents. Mike's success story shows how automation can transform your real estate business and help you close more deals.",
      features: [
        "Complete case study breakdown",
        "Before and after metrics",
        "System implementation details",
        "ROI and time savings analysis"
      ]
    },
    cta: "See Mike's System",
    performance: {
      impressions: 87654,
      clicks: 3456,
      conversions: 198,
      ctr: 3.94,
      cpc: 2.23,
      cpa: 38.76,
      roas: 5.3
    }
  }
];

// Accounting Creatives
export const accountingCreatives: RetargetingCreative[] = [
  {
    id: "ac-document-automation",
    name: "Accounting Document Automation",
    description: "Focusing on document automation and efficiency for accounting firms",
    platform: "linkedin",
    format: "image",
    audienceId: "ac-website-visitors",
    industry: "accounting",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "Automate 80% of Your Admin Work",
      description: "End the document chase forever. See how accounting firms are automating document collection, client communication, and compliance tracking.",
      imageUrl: "/ads/accounting-document-automation.jpg",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Stop spending 20+ hours per week chasing documents. The Financial Workflow Engine automates your biggest time drains so you can serve more clients.",
      features: [
        "Automated document collection",
        "Smart client communication",
        "Compliance tracking & alerts",
        "Integrated reporting tools"
      ]
    },
    cta: "See Financial Workflow Engine",
    performance: {
      impressions: 98765,
      clicks: 2876,
      conversions: 167,
      ctr: 2.91,
      cpc: 3.45,
      cpa: 58.23,
      roas: 3.9
    }
  },
  {
    id: "ac-compliance-focus",
    name: "Accounting Compliance Focus",
    description: "Targeting users interested in compliance automation features",
    platform: "google",
    format: "video",
    audienceId: "ac-compliance-interested",
    industry: "accounting",
    status: "active",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-15",
    content: {
      headline: "Never Miss a Deadline Again",
      description: "See how compliance automation keeps accounting firms compliant and stress-free. Never miss a deadline or face penalties.",
      videoUrl: "/ads/accounting-compliance-automation.mp4",
      logoUrl: "/logo/omgsystems-logo.png",
      brandColors: ["#1e40af", "#3b82f6", "#60a5fa"],
      copy: "Compliance made simple. Our automation system tracks deadlines, generates reports, and keeps you compliant without the stress.",
      features: [
        "Automated deadline tracking",
        "Smart compliance checklists",
        "Report generation & filing",
        "Integration with tax software"
      ]
    },
    cta: "See Compliance Automation",
    performance: {
      impressions: 65432,
      clicks: 2134,
      conversions: 134,
      ctr: 3.26,
      cpc: 4.12,
      cpa: 67.45,
      roas: 3.2
    }
  }
];

// Export all audiences and creatives
export const retargetingAudiences = {
  "property-management": propertyManagementAudiences,
  "real-estate": realEstateAudiences,
  "accounting": accountingAudiences
};

export const retargetingCreatives = {
  "property-management": propertyManagementCreatives,
  "real-estate": realEstateCreatives,
  "accounting": accountingCreatives
};

// Helper functions
export function getAudiencesByIndustry(industry: string): RetargetingAudience[] {
  return retargetingAudiences[industry as keyof typeof retargetingAudiences] || [];
}

export function getCreativesByIndustry(industry: string): RetargetingCreative[] {
  return retargetingCreatives[industry as keyof typeof retargetingCreatives] || [];
}

export function getAudienceById(id: string): RetargetingAudience | undefined {
  const allAudiences = Object.values(retargetingAudiences).flat();
  return allAudiences.find(audience => audience.id === id);
}

export function getCreativeById(id: string): RetargetingCreative | undefined {
  const allCreatives = Object.values(retargetingCreatives).flat();
  return allCreatives.find(creative => creative.id === id);
}

export function getTopPerformingCreatives(limit: number = 5): RetargetingCreative[] {
  const allCreatives = Object.values(retargetingCreatives).flat();
  return allCreatives
    .sort((a, b) => b.performance.roas - a.performance.roas)
    .slice(0, limit);
}

export function getAudiencePerformance(audienceId: string): { totalImpressions: number; totalClicks: number; totalConversions: number; avgCtr: number; avgCpc: number; avgCpa: number; avgRoas: number } {
  const allCreatives = Object.values(retargetingCreatives).flat();
  const audienceCreatives = allCreatives.filter(creative => creative.audienceId === audienceId);
  
  if (audienceCreatives.length === 0) {
    return { totalImpressions: 0, totalClicks: 0, totalConversions: 0, avgCtr: 0, avgCpc: 0, avgCpa: 0, avgRoas: 0 };
  }
  
  const totals = audienceCreatives.reduce((acc, creative) => ({
    totalImpressions: acc.totalImpressions + creative.performance.impressions,
    totalClicks: acc.totalClicks + creative.performance.clicks,
    totalConversions: acc.totalConversions + creative.performance.conversions,
    avgCtr: acc.avgCtr + creative.performance.ctr,
    avgCpc: acc.avgCpc + creative.performance.cpc,
    avgCpa: acc.avgCpa + creative.performance.cpa,
    avgRoas: acc.avgRoas + creative.performance.roas
  }), { totalImpressions: 0, totalClicks: 0, totalConversions: 0, avgCtr: 0, avgCpc: 0, avgCpa: 0, avgRoas: 0 });
  
  const count = audienceCreatives.length;
  return {
    totalImpressions: totals.totalImpressions,
    totalClicks: totals.totalClicks,
    totalConversions: totals.totalConversions,
    avgCtr: totals.avgCtr / count,
    avgCpc: totals.avgCpc / count,
    avgCpa: totals.avgCpa / count,
    avgRoas: totals.avgRoas / count
  };
}
