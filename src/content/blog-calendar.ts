export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: 'industry-insights' | 'how-to' | 'case-study' | 'product-updates' | 'thought-leadership';
  tags: string[];
  industry?: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  status: 'draft' | 'scheduled' | 'published';
}

export interface Resource {
  id: string;
  title: string;
  type: 'whitepaper' | 'ebook' | 'checklist' | 'template' | 'webinar' | 'guide';
  description: string;
  downloadUrl: string;
  industry?: string;
  publishDate: string;
  featured: boolean;
  gated: boolean;
  leadMagnet: boolean;
}

export interface ContentCalendar {
  quarter: string;
  theme: string;
  focus: string[];
  blogPosts: BlogPost[];
  resources: Resource[];
  campaigns: Campaign[];
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'paid' | 'content';
  startDate: string;
  endDate: string;
  targetAudience: string;
  goals: string[];
  content: string[];
  status: 'planned' | 'active' | 'completed';
}

// Q1 2025 Content Calendar
export const q1ContentCalendar: ContentCalendar = {
  quarter: "Q1 2025",
  theme: "New Year, New Systems",
  focus: [
    "Automation ROI",
    "Industry-specific solutions",
    "Digital transformation",
    "Efficiency gains"
  ],
  blogPosts: [
    {
      id: "automation-roi-2025",
      title: "The Complete Guide to Automation ROI in 2025",
      slug: "automation-roi-2025",
      excerpt: "Discover how businesses are achieving 300%+ ROI with strategic automation. Real metrics, real results.",
      content: "Full blog post content...",
      author: "Sarah Chen",
      publishDate: "2025-01-15",
      category: "how-to",
      tags: ["automation", "roi", "efficiency", "business-growth"],
      featured: true,
      seoTitle: "Automation ROI Guide 2025: How to Achieve 300%+ Returns",
      seoDescription: "Learn proven strategies to maximize automation ROI. Real case studies and metrics from successful implementations.",
      readingTime: 8,
      status: "scheduled"
    },
    {
      id: "property-management-automation",
      title: "How Property Managers Save 20 Hours Per Week with Automation",
      slug: "property-management-automation",
      excerpt: "Real case study: See how SmartRent Flow transformed a 500-unit property management company.",
      content: "Full blog post content...",
      author: "Mike Rodriguez",
      publishDate: "2025-01-22",
      category: "case-study",
      tags: ["property-management", "automation", "case-study", "efficiency"],
      industry: "property-management",
      featured: true,
      readingTime: 6,
      status: "scheduled"
    },
    {
      id: "real-estate-lead-generation",
      title: "The Agent Growth Engine: Turning Leads into Closings",
      slug: "real-estate-lead-generation",
      excerpt: "How top real estate agents are using automation to close 40% more deals.",
      content: "Full blog post content...",
      author: "Jennifer Walsh",
      publishDate: "2025-01-29",
      category: "industry-insights",
      tags: ["real-estate", "lead-generation", "sales-automation", "growth"],
      industry: "real-estate",
      featured: false,
      readingTime: 7,
      status: "scheduled"
    },
    {
      id: "accounting-firm-efficiency",
      title: "From Chaos to Clarity: How Accounting Firms Automate 80% of Admin Work",
      slug: "accounting-firm-efficiency",
      excerpt: "Transform your accounting practice with intelligent document management and client communication automation.",
      content: "Full blog post content...",
      author: "David Kim",
      publishDate: "2025-02-05",
      category: "how-to",
      tags: ["accounting", "document-management", "automation", "efficiency"],
      industry: "accounting",
      featured: true,
      readingTime: 9,
      status: "scheduled"
    },
    {
      id: "contractor-project-management",
      title: "Project Growth Engine: How Contractors Scale Without the Headache",
      slug: "contractor-project-management",
      excerpt: "Stop juggling projects manually. See how successful contractors use automation to manage 3x more projects.",
      content: "Full blog post content...",
      author: "Lisa Thompson",
      publishDate: "2025-02-12",
      category: "industry-insights",
      tags: ["contractors", "project-management", "scaling", "automation"],
      industry: "contractors",
      featured: false,
      readingTime: 6,
      status: "scheduled"
    },
    {
      id: "cleaning-business-automation",
      title: "CleanFlow Engine: Running Your Cleaning Business Without It Running You",
      slug: "cleaning-business-automation",
      excerpt: "How cleaning companies use automation to manage schedules, billing, and customer communication seamlessly.",
      content: "Full blog post content...",
      author: "Carlos Mendez",
      publishDate: "2025-02-19",
      category: "case-study",
      tags: ["cleaning", "business-automation", "scheduling", "customer-management"],
      industry: "cleaning",
      featured: false,
      readingTime: 5,
      status: "scheduled"
    },
    {
      id: "healthcare-compliance-automation",
      title: "CareFlow Automation: Improving Patient Care While Strengthening Compliance",
      slug: "healthcare-compliance-automation",
      excerpt: "How healthcare providers use automation to enhance patient care and maintain strict compliance standards.",
      content: "Full blog post content...",
      author: "Dr. Amanda Foster",
      publishDate: "2025-02-26",
      category: "industry-insights",
      tags: ["healthcare", "compliance", "patient-care", "automation"],
      industry: "healthcare",
      featured: true,
      readingTime: 8,
      status: "scheduled"
    },
    {
      id: "omgsystems-2025-roadmap",
      title: "OMGsystems 2025 Roadmap: What's Coming Next",
      slug: "omgsystems-2025-roadmap",
      excerpt: "Get an exclusive look at our upcoming features, integrations, and platform enhancements.",
      content: "Full blog post content...",
      author: "OMGsystems Team",
      publishDate: "2025-03-05",
      category: "product-updates",
      tags: ["product-updates", "roadmap", "features", "integrations"],
      featured: true,
      readingTime: 6,
      status: "scheduled"
    },
    {
      id: "digital-transformation-guide",
      title: "The Small Business Digital Transformation Playbook",
      slug: "digital-transformation-guide",
      excerpt: "A step-by-step guide to transforming your business operations with technology.",
      content: "Full blog post content...",
      author: "Sarah Chen",
      publishDate: "2025-03-12",
      category: "thought-leadership",
      tags: ["digital-transformation", "small-business", "technology", "strategy"],
      featured: true,
      readingTime: 10,
      status: "scheduled"
    },
    {
      id: "automation-myths-debunked",
      title: "5 Automation Myths That Are Holding Your Business Back",
      slug: "automation-myths-debunked",
      excerpt: "Separate fact from fiction: Common automation misconceptions and the truth behind them.",
      content: "Full blog post content...",
      author: "Mike Rodriguez",
      publishDate: "2025-03-19",
      category: "thought-leadership",
      tags: ["automation", "myths", "business-growth", "technology"],
      featured: false,
      readingTime: 7,
      status: "scheduled"
    },
    {
      id: "roi-calculator-guide",
      title: "How to Calculate Your Automation ROI (With Free Calculator)",
      slug: "roi-calculator-guide",
      excerpt: "Learn the exact formula to calculate automation ROI and use our free calculator to see your potential savings.",
      content: "Full blog post content...",
      author: "Jennifer Walsh",
      publishDate: "2025-03-26",
      category: "how-to",
      tags: ["roi", "calculator", "automation", "business-metrics"],
      featured: true,
      readingTime: 8,
      status: "scheduled"
    }
  ],
  resources: [
    {
      id: "automation-roi-calculator",
      title: "Automation ROI Calculator",
      type: "template",
      description: "Calculate your potential automation savings with our comprehensive ROI calculator.",
      downloadUrl: "/downloads/automation-roi-calculator.xlsx",
      publishDate: "2025-01-15",
      featured: true,
      gated: true,
      leadMagnet: true
    },
    {
      id: "property-management-automation-guide",
      title: "Property Management Automation Guide",
      type: "ebook",
      description: "Complete guide to automating property management operations for maximum efficiency.",
      downloadUrl: "/downloads/property-management-automation-guide.pdf",
      industry: "property-management",
      publishDate: "2025-01-22",
      featured: true,
      gated: true,
      leadMagnet: true
    },
    {
      id: "real-estate-lead-checklist",
      title: "Real Estate Lead Generation Checklist",
      type: "checklist",
      description: "25-point checklist to optimize your real estate lead generation process.",
      downloadUrl: "/downloads/real-estate-lead-checklist.pdf",
      industry: "real-estate",
      publishDate: "2025-01-29",
      featured: false,
      gated: true,
      leadMagnet: true
    },
    {
      id: "accounting-automation-whitepaper",
      title: "Accounting Firm Automation Whitepaper",
      type: "whitepaper",
      description: "In-depth analysis of automation opportunities in accounting firms.",
      downloadUrl: "/downloads/accounting-automation-whitepaper.pdf",
      industry: "accounting",
      publishDate: "2025-02-05",
      featured: true,
      gated: true,
      leadMagnet: true
    },
    {
      id: "contractor-project-templates",
      title: "Contractor Project Management Templates",
      type: "template",
      description: "Ready-to-use templates for contractor project management and client communication.",
      downloadUrl: "/downloads/contractor-project-templates.zip",
      industry: "contractors",
      publishDate: "2025-02-12",
      featured: false,
      gated: true,
      leadMagnet: true
    },
    {
      id: "cleaning-business-automation-guide",
      title: "Cleaning Business Automation Guide",
      type: "guide",
      description: "Step-by-step guide to automating your cleaning business operations.",
      downloadUrl: "/downloads/cleaning-business-automation-guide.pdf",
      industry: "cleaning",
      publishDate: "2025-02-19",
      featured: false,
      gated: true,
      leadMagnet: true
    },
    {
      id: "healthcare-compliance-checklist",
      title: "Healthcare Compliance Automation Checklist",
      type: "checklist",
      description: "Essential checklist for maintaining compliance while automating healthcare operations.",
      downloadUrl: "/downloads/healthcare-compliance-checklist.pdf",
      industry: "healthcare",
      publishDate: "2025-02-26",
      featured: true,
      gated: true,
      leadMagnet: true
    },
    {
      id: "digital-transformation-playbook",
      title: "Small Business Digital Transformation Playbook",
      type: "ebook",
      description: "Complete playbook for small business digital transformation success.",
      downloadUrl: "/downloads/digital-transformation-playbook.pdf",
      publishDate: "2025-03-12",
      featured: true,
      gated: true,
      leadMagnet: true
    }
  ],
  campaigns: [
    {
      id: "new-year-automation-campaign",
      name: "New Year, New Systems",
      type: "email",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      targetAudience: "All subscribers",
      goals: ["Increase demo bookings", "Drive resource downloads", "Boost engagement"],
      content: [
        "Welcome email series",
        "ROI calculator promotion",
        "Industry-specific case studies",
        "Demo booking reminders"
      ],
      status: "planned"
    },
    {
      id: "property-management-focus",
      name: "Property Management Focus Month",
      type: "content",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      targetAudience: "Property management professionals",
      goals: ["Generate property management leads", "Increase industry engagement", "Drive demo bookings"],
      content: [
        "Property management blog series",
        "Industry-specific resources",
        "Targeted social media content",
        "Webinar: Property Management Automation"
      ],
      status: "planned"
    },
    {
      id: "roi-calculator-promotion",
      name: "ROI Calculator Launch",
      type: "social",
      startDate: "2025-01-15",
      endDate: "2025-01-29",
      targetAudience: "Business owners and decision makers",
      goals: ["Drive calculator downloads", "Generate qualified leads", "Increase brand awareness"],
      content: [
        "Social media posts",
        "LinkedIn articles",
        "Email promotions",
        "Paid social ads"
      ],
      status: "planned"
    }
  ]
};

// Q2 2025 Content Calendar
export const q2ContentCalendar: ContentCalendar = {
  quarter: "Q2 2025",
  theme: "Scaling Success",
  focus: [
    "Growth strategies",
    "Advanced automation",
    "Team collaboration",
    "Performance optimization"
  ],
  blogPosts: [
    {
      id: "scaling-business-automation",
      title: "How to Scale Your Business with Automation (Without Losing Your Mind)",
      slug: "scaling-business-automation",
      excerpt: "The complete guide to scaling your business operations with intelligent automation.",
      content: "Full blog post content...",
      author: "Sarah Chen",
      publishDate: "2025-04-02",
      category: "how-to",
      tags: ["scaling", "automation", "business-growth", "operations"],
      featured: true,
      readingTime: 9,
      status: "scheduled"
    },
    {
      id: "team-collaboration-automation",
      title: "Building Better Teams: How Automation Enhances Collaboration",
      slug: "team-collaboration-automation",
      excerpt: "See how automation tools can improve team communication and project coordination.",
      content: "Full blog post content...",
      author: "Mike Rodriguez",
      publishDate: "2025-04-09",
      category: "thought-leadership",
      tags: ["team-collaboration", "automation", "productivity", "communication"],
      featured: false,
      readingTime: 7,
      status: "scheduled"
    },
    {
      id: "advanced-workflow-automation",
      title: "Beyond Basic Automation: Advanced Workflow Strategies",
      slug: "advanced-workflow-automation",
      excerpt: "Take your automation to the next level with advanced workflow strategies and integrations.",
      content: "Full blog post content...",
      author: "Jennifer Walsh",
      publishDate: "2025-04-16",
      category: "how-to",
      tags: ["advanced-automation", "workflows", "integrations", "strategy"],
      featured: true,
      readingTime: 10,
      status: "scheduled"
    },
    {
      id: "performance-metrics-automation",
      title: "Measuring Automation Success: Key Metrics That Matter",
      slug: "performance-metrics-automation",
      excerpt: "Learn which metrics to track to ensure your automation investments are paying off.",
      content: "Full blog post content...",
      author: "David Kim",
      publishDate: "2025-04-23",
      category: "how-to",
      tags: ["metrics", "performance", "automation", "analytics"],
      featured: false,
      readingTime: 8,
      status: "scheduled"
    },
    {
      id: "integration-best-practices",
      title: "Integration Best Practices: Connecting Your Business Tools",
      slug: "integration-best-practices",
      excerpt: "How to seamlessly connect your business tools for maximum efficiency and data flow.",
      content: "Full blog post content...",
      author: "Lisa Thompson",
      publishDate: "2025-04-30",
      category: "how-to",
      tags: ["integrations", "best-practices", "data-flow", "efficiency"],
      featured: true,
      readingTime: 9,
      status: "scheduled"
    }
  ],
  resources: [
    {
      id: "scaling-automation-playbook",
      title: "Business Scaling with Automation Playbook",
      type: "ebook",
      description: "Complete guide to scaling your business operations with automation.",
      downloadUrl: "/downloads/scaling-automation-playbook.pdf",
      publishDate: "2025-04-02",
      featured: true,
      gated: true,
      leadMagnet: true
    },
    {
      id: "workflow-automation-templates",
      title: "Advanced Workflow Automation Templates",
      type: "template",
      description: "Ready-to-use templates for advanced workflow automation.",
      downloadUrl: "/downloads/workflow-automation-templates.zip",
      publishDate: "2025-04-16",
      featured: true,
      gated: true,
      leadMagnet: true
    }
  ],
  campaigns: [
    {
      id: "scaling-success-campaign",
      name: "Scaling Success Campaign",
      type: "email",
      startDate: "2025-04-01",
      endDate: "2025-06-30",
      targetAudience: "Existing customers and prospects",
      goals: ["Increase upsells", "Drive referrals", "Boost engagement"],
      content: [
        "Scaling success stories",
        "Advanced feature highlights",
        "Customer success webinars",
        "Referral program promotion"
      ],
      status: "planned"
    }
  ]
};

// Q3 2025 Content Calendar
export const q3ContentCalendar: ContentCalendar = {
  quarter: "Q3 2025",
  theme: "Innovation & Growth",
  focus: [
    "Innovation strategies",
    "Market trends",
    "Future of automation",
    "Competitive advantage"
  ],
  blogPosts: [
    {
      id: "future-of-business-automation",
      title: "The Future of Business Automation: Trends to Watch",
      slug: "future-of-business-automation",
      excerpt: "Explore the emerging trends that will shape the future of business automation.",
      content: "Full blog post content...",
      author: "Sarah Chen",
      publishDate: "2025-07-02",
      category: "thought-leadership",
      tags: ["future-trends", "automation", "innovation", "technology"],
      featured: true,
      readingTime: 8,
      status: "scheduled"
    },
    {
      id: "competitive-advantage-automation",
      title: "Gaining Competitive Advantage Through Strategic Automation",
      slug: "competitive-advantage-automation",
      excerpt: "How to use automation as a strategic weapon to outperform your competition.",
      content: "Full blog post content...",
      author: "Mike Rodriguez",
      publishDate: "2025-07-09",
      category: "thought-leadership",
      tags: ["competitive-advantage", "strategy", "automation", "business-growth"],
      featured: true,
      readingTime: 9,
      status: "scheduled"
    }
  ],
  resources: [
    {
      id: "future-automation-report",
      title: "Future of Automation Report 2025",
      type: "whitepaper",
      description: "Comprehensive report on the future trends in business automation.",
      downloadUrl: "/downloads/future-automation-report-2025.pdf",
      publishDate: "2025-07-02",
      featured: true,
      gated: true,
      leadMagnet: true
    }
  ],
  campaigns: [
    {
      id: "innovation-campaign",
      name: "Innovation & Growth Campaign",
      type: "content",
      startDate: "2025-07-01",
      endDate: "2025-09-30",
      targetAudience: "Industry leaders and decision makers",
      goals: ["Establish thought leadership", "Generate high-value leads", "Drive premium demos"],
      content: [
        "Thought leadership content",
        "Industry trend analysis",
        "Executive webinars",
        "Premium resource offers"
      ],
      status: "planned"
    }
  ]
};

// Q4 2025 Content Calendar
export const q4ContentCalendar: ContentCalendar = {
  quarter: "Q4 2025",
  theme: "Year-End Success",
  focus: [
    "Year-end planning",
    "Success stories",
    "2026 preparation",
    "Customer appreciation"
  ],
  blogPosts: [
    {
      id: "year-end-automation-review",
      title: "Year-End Automation Review: Measuring Your Success",
      slug: "year-end-automation-review",
      excerpt: "How to conduct a comprehensive review of your automation initiatives and plan for next year.",
      content: "Full blog post content...",
      author: "Sarah Chen",
      publishDate: "2025-10-02",
      category: "how-to",
      tags: ["year-end-review", "automation", "planning", "success-metrics"],
      featured: true,
      readingTime: 8,
      status: "scheduled"
    },
    {
      id: "2026-automation-planning",
      title: "Planning Your 2026 Automation Strategy",
      slug: "2026-automation-planning",
      excerpt: "Get ahead of the competition with a strategic automation plan for 2026.",
      content: "Full blog post content...",
      author: "Mike Rodriguez",
      publishDate: "2025-10-09",
      category: "thought-leadership",
      tags: ["planning", "strategy", "2026", "automation"],
      featured: true,
      readingTime: 9,
      status: "scheduled"
    }
  ],
  resources: [
    {
      id: "2026-automation-planning-guide",
      title: "2026 Automation Planning Guide",
      type: "guide",
      description: "Complete guide to planning your automation strategy for 2026.",
      downloadUrl: "/downloads/2026-automation-planning-guide.pdf",
      publishDate: "2025-10-09",
      featured: true,
      gated: true,
      leadMagnet: true
    }
  ],
  campaigns: [
    {
      id: "year-end-success-campaign",
      name: "Year-End Success Campaign",
      type: "email",
      startDate: "2025-10-01",
      endDate: "2025-12-31",
      targetAudience: "All customers and prospects",
      goals: ["Drive year-end sales", "Customer appreciation", "2026 planning"],
      content: [
        "Success story highlights",
        "Customer appreciation content",
        "Year-end planning resources",
        "2026 strategy webinars"
      ],
      status: "planned"
    }
  ]
};

// Export all calendars
export const contentCalendars = {
  q1: q1ContentCalendar,
  q2: q2ContentCalendar,
  q3: q3ContentCalendar,
  q4: q4ContentCalendar
};

// Helper functions
export function getUpcomingPosts(limit: number = 5): BlogPost[] {
  const allPosts = [
    ...q1ContentCalendar.blogPosts,
    ...q2ContentCalendar.blogPosts,
    ...q3ContentCalendar.blogPosts,
    ...q4ContentCalendar.blogPosts
  ];
  
  return allPosts
    .filter(post => post.status === 'scheduled' || post.status === 'published')
    .sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())
    .slice(0, limit);
}

export function getPostsByIndustry(industry: string): BlogPost[] {
  const allPosts = [
    ...q1ContentCalendar.blogPosts,
    ...q2ContentCalendar.blogPosts,
    ...q3ContentCalendar.blogPosts,
    ...q4ContentCalendar.blogPosts
  ];
  
  return allPosts.filter(post => post.industry === industry);
}

export function getFeaturedResources(): Resource[] {
  const allResources = [
    ...q1ContentCalendar.resources,
    ...q2ContentCalendar.resources,
    ...q3ContentCalendar.resources,
    ...q4ContentCalendar.resources
  ];
  
  return allResources.filter(resource => resource.featured);
}

export function getLeadMagnets(): Resource[] {
  const allResources = [
    ...q1ContentCalendar.resources,
    ...q2ContentCalendar.resources,
    ...q3ContentCalendar.resources,
    ...q4ContentCalendar.resources
  ];
  
  return allResources.filter(resource => resource.leadMagnet);
}
