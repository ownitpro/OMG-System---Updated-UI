export interface EmailTemplate {
  id: string;
  subject: string;
  preheader: string;
  content: string;
  ctaText: string;
  ctaUrl: string;
  industry?: string;
  segment: string;
  delay: number; // hours after previous email
  type: 'welcome' | 'nurture' | 'educational' | 'promotional' | 're-engagement';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

export interface EmailSequence {
  id: string;
  name: string;
  description: string;
  industry?: string;
  trigger: 'signup' | 'demo_request' | 'download' | 'trial_start' | 'abandoned_cart';
  templates: EmailTemplate[];
  totalDuration: number; // days
  expectedOpenRate: number;
  expectedClickRate: number;
  status: 'active' | 'paused' | 'draft';
}

// Property Management Email Sequence
export const propertyManagementSequence: EmailSequence = {
  id: "property-management-welcome",
  name: "Property Management Welcome Series",
  description: "7-day welcome sequence for property management professionals",
  industry: "property-management",
  trigger: "signup",
  totalDuration: 7,
  expectedOpenRate: 28,
  expectedClickRate: 8,
  status: "active",
  templates: [
    {
      id: "pm-welcome-1",
      subject: "Welcome to OMGsystems - Let's Transform Your Property Management",
      preheader: "Discover how SmartRent Flow can save you 20+ hours per week",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Welcome to the Future of Property Management!</h1>
          <p>Hi {{firstName}},</p>
          <p>Welcome to OMGsystems! We're excited to help you transform your property management operations with our SmartRent Flow automation system.</p>
          <p><strong>Here's what you can expect:</strong></p>
          <ul>
            <li>Automated rent collection and reminders</li>
            <li>Streamlined maintenance request management</li>
            <li>Automated owner reporting and communication</li>
            <li>Integrated tenant screening and onboarding</li>
          </ul>
          <p>Over the next 7 days, I'll share real case studies, best practices, and show you exactly how other property managers are saving 20+ hours per week.</p>
          <p>Ready to get started?</p>
        </div>
      `,
      ctaText: "Book Your Free Demo",
      ctaUrl: "/demo?industry=property-management",
      industry: "property-management",
      segment: "new_signup",
      delay: 0,
      type: "welcome",
      priority: "high",
      tags: ["welcome", "property-management", "automation"]
    },
    {
      id: "pm-case-study-1",
      subject: "How Sarah Saved 25 Hours Per Week (Real Case Study)",
      preheader: "See the exact system that transformed a 500-unit property management company",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Real Results: 25 Hours Saved Per Week</h1>
          <p>Hi {{firstName}},</p>
          <p>Yesterday I mentioned how property managers are saving 20+ hours per week. Today, I want to show you exactly how Sarah Chen achieved this with her 500-unit portfolio.</p>
          <p><strong>Sarah's Challenge:</strong></p>
          <ul>
            <li>Managing 500 units across 15 properties</li>
            <li>Spending 40+ hours per week on administrative tasks</li>
            <li>Constant tenant communication and maintenance coordination</li>
            <li>Monthly owner reports taking 2 full days</li>
          </ul>
          <p><strong>Sarah's Solution with SmartRent Flow:</strong></p>
          <ul>
            <li>Automated rent collection: 95% on-time payments</li>
            <li>Maintenance requests: 50% faster resolution</li>
            <li>Owner reports: Generated automatically in minutes</li>
            <li>Tenant communication: 80% reduction in phone calls</li>
          </ul>
          <p><strong>Result:</strong> Sarah now works 15 hours per week on admin tasks instead of 40. That's 25 hours saved every single week!</p>
          <p>Want to see how this could work for your portfolio?</p>
        </div>
      `,
      ctaText: "See How It Works",
      ctaUrl: "/case-snapshots/property-management-success",
      industry: "property-management",
      segment: "new_signup",
      delay: 24,
      type: "educational",
      priority: "high",
      tags: ["case-study", "property-management", "results"]
    },
    {
      id: "pm-features-1",
      subject: "The 3 Features That Changed Everything for Property Managers",
      preheader: "Discover the automation features that save the most time",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">3 Game-Changing Features</h1>
          <p>Hi {{firstName}},</p>
          <p>After working with hundreds of property managers, I've identified the 3 features that consistently save the most time and create the biggest impact:</p>
          <p><strong>1. Automated Rent Collection & Reminders</strong></p>
          <p>SmartRent Flow automatically sends rent reminders, processes payments, and follows up with late payments. Most property managers see 95%+ on-time payment rates.</p>
          <p><strong>2. Intelligent Maintenance Request Management</strong></p>
          <p>Tenants submit requests through the portal, which are automatically categorized, prioritized, and assigned to the right contractor. No more phone tag or missed requests.</p>
          <p><strong>3. Automated Owner Reporting</strong></p>
          <p>Monthly owner reports are generated automatically with rent rolls, maintenance summaries, and financial data. What used to take 2 days now takes 5 minutes.</p>
          <p>These three features alone typically save property managers 15-20 hours per week. Imagine what you could do with that extra time!</p>
        </div>
      `,
      ctaText: "Try These Features Free",
      ctaUrl: "/demo?industry=property-management&features=rent-collection,maintenance,reporting",
      industry: "property-management",
      segment: "new_signup",
      delay: 48,
      type: "educational",
      priority: "high",
      tags: ["features", "property-management", "automation"]
    },
    {
      id: "pm-roi-calculator",
      subject: "Calculate Your Time Savings (Free ROI Calculator)",
      preheader: "See exactly how much time and money you could save",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">What's Your Time Worth?</h1>
          <p>Hi {{firstName}},</p>
          <p>I've been sharing how property managers save 20+ hours per week with SmartRent Flow. But what does that mean for YOUR business?</p>
          <p>I've created a free ROI calculator specifically for property managers. Just enter a few details about your portfolio and see exactly how much time and money you could save.</p>
          <p><strong>The calculator will show you:</strong></p>
          <ul>
            <li>Hours saved per week</li>
            <li>Annual time savings</li>
            <li>Cost savings based on your hourly rate</li>
            <li>ROI timeline for SmartRent Flow</li>
          </ul>
          <p>Most property managers are shocked by the results. The average ROI is 300%+ in the first year alone.</p>
          <p>Ready to see your potential savings?</p>
        </div>
      `,
      ctaText: "Calculate My ROI",
      ctaUrl: "/roi?industry=property-management",
      industry: "property-management",
      segment: "new_signup",
      delay: 72,
      type: "educational",
      priority: "high",
      tags: ["roi", "calculator", "property-management"]
    },
    {
      id: "pm-demo-reminder",
      subject: "Last Chance: Free Demo This Week",
      preheader: "See SmartRent Flow in action - limited spots available",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Don't Miss Your Free Demo</h1>
          <p>Hi {{firstName}},</p>
          <p>This is your final reminder about your free SmartRent Flow demo. I have limited spots available this week, and I'd hate for you to miss out.</p>
          <p><strong>In your demo, you'll see:</strong></p>
          <ul>
            <li>Live SmartRent Flow system in action</li>
            <li>How to set up automated rent collection</li>
            <li>Maintenance request management workflow</li>
            <li>Automated owner reporting features</li>
            <li>Custom setup for your specific portfolio</li>
          </ul>
          <p>Most property managers who see the demo book within 48 hours. The results speak for themselves.</p>
          <p>Ready to transform your property management operations?</p>
        </div>
      `,
      ctaText: "Book My Demo Now",
      ctaUrl: "/demo?industry=property-management&urgency=true",
      industry: "property-management",
      segment: "new_signup",
      delay: 120,
      type: "promotional",
      priority: "high",
      tags: ["demo", "property-management", "urgency"]
    }
  ]
};

// Real Estate Email Sequence
export const realEstateSequence: EmailSequence = {
  id: "real-estate-welcome",
  name: "Real Estate Agent Growth Series",
  description: "5-day sequence for real estate agents focused on lead generation and closing",
  industry: "real-estate",
  trigger: "signup",
  totalDuration: 5,
  expectedOpenRate: 32,
  expectedClickRate: 12,
  status: "active",
  templates: [
    {
      id: "re-welcome-1",
      subject: "Welcome to the Agent Growth Engine - Close 40% More Deals",
      preheader: "Discover the automation system that's helping agents close more deals",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Welcome to the Agent Growth Engine!</h1>
          <p>Hi {{firstName}},</p>
          <p>Welcome to OMGsystems! I'm excited to show you how our Agent Growth Engine is helping real estate agents close 40% more deals while working fewer hours.</p>
          <p><strong>Here's what you'll discover:</strong></p>
          <ul>
            <li>Automated lead nurturing that converts 3x better</li>
            <li>Smart follow-up sequences that never miss an opportunity</li>
            <li>Automated listing management and client communication</li>
            <li>Integrated CRM that works with your existing tools</li>
          </ul>
          <p>Over the next 5 days, I'll share real success stories, proven strategies, and show you exactly how top agents are using automation to dominate their markets.</p>
          <p>Ready to grow your business?</p>
        </div>
      `,
      ctaText: "See the Agent Growth Engine",
      ctaUrl: "/demo?industry=real-estate",
      industry: "real-estate",
      segment: "new_signup",
      delay: 0,
      type: "welcome",
      priority: "high",
      tags: ["welcome", "real-estate", "growth"]
    },
    {
      id: "re-lead-nurturing",
      subject: "The Secret to Converting 3x More Leads (Most Agents Miss This)",
      preheader: "See how top agents nurture leads while others lose them",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">The Lead Nurturing Secret</h1>
          <p>Hi {{firstName}},</p>
          <p>Did you know that 80% of real estate leads are lost due to poor follow-up? Most agents follow up 2-3 times and then give up. Top agents know the secret: consistent, valuable follow-up over time.</p>
          <p><strong>Here's what top agents do differently:</strong></p>
          <ul>
            <li>Follow up with leads 7-12 times over 6 months</li>
            <li>Provide valuable market insights in every touch</li>
            <li>Automate follow-up so nothing falls through the cracks</li>
            <li>Track engagement to know when leads are ready to buy</li>
          </ul>
          <p>Jennifer Walsh, a top agent in Toronto, increased her lead conversion rate from 8% to 24% using our automated nurturing system. That's 3x more deals from the same number of leads!</p>
          <p>Want to see how this works?</p>
        </div>
      `,
      ctaText: "See Jennifer's System",
      ctaUrl: "/case-snapshots/real-estate-agent-success",
      industry: "real-estate",
      segment: "new_signup",
      delay: 24,
      type: "educational",
      priority: "high",
      tags: ["lead-nurturing", "real-estate", "conversion"]
    },
    {
      id: "re-automation-features",
      subject: "3 Automation Features That Close More Deals",
      preheader: "Discover the features that separate top agents from the rest",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">3 Deal-Closing Features</h1>
          <p>Hi {{firstName}},</p>
          <p>After analyzing thousands of real estate transactions, I've identified the 3 automation features that consistently help agents close more deals:</p>
          <p><strong>1. Smart Lead Scoring & Prioritization</strong></p>
          <p>Our system automatically scores leads based on behavior, engagement, and market signals. You'll know exactly which leads to focus on first.</p>
          <p><strong>2. Automated Market Updates</strong></p>
          <p>Send personalized market reports to your database automatically. Keep your name top-of-mind with valuable insights, not sales pitches.</p>
          <p><strong>3. Transaction Management Automation</strong></p>
          <p>From offer to closing, automate the paperwork, reminders, and client communication. Never miss a deadline or leave clients wondering about status.</p>
          <p>These three features help agents close 40% more deals while working 30% fewer hours. Imagine what that could do for your business!</p>
        </div>
      `,
      ctaText: "Try These Features Free",
      ctaUrl: "/demo?industry=real-estate&features=lead-scoring,market-updates,transaction-management",
      industry: "real-estate",
      segment: "new_signup",
      delay: 48,
      type: "educational",
      priority: "high",
      tags: ["features", "real-estate", "automation"]
    },
    {
      id: "re-success-story",
      subject: "How Mike Closed $12M in Sales Last Year (Case Study)",
      preheader: "See the exact system that helped Mike dominate his market",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">$12M in Sales: Mike's Success Story</h1>
          <p>Hi {{firstName}},</p>
          <p>Yesterday I shared the 3 features that close more deals. Today, I want to show you how Mike Rodriguez used these features to close $12M in sales last year.</p>
          <p><strong>Mike's Challenge:</strong></p>
          <ul>
            <li>Struggling to follow up with all his leads</li>
            <li>Spending 60+ hours per week on administrative tasks</li>
            <li>Missing opportunities due to poor lead management</li>
            <li>Clients frustrated with lack of communication</li>
          </ul>
          <p><strong>Mike's Solution with Agent Growth Engine:</strong></p>
          <ul>
            <li>Automated lead nurturing: 3x better conversion rates</li>
            <li>Smart follow-up sequences: Never miss an opportunity</li>
            <li>Transaction automation: 50% less admin time</li>
            <li>Client communication: 90% satisfaction rate</li>
          </ul>
          <p><strong>Result:</strong> Mike closed $12M in sales while working 40 hours per week instead of 60. That's $20M in sales per hour worked!</p>
          <p>Ready to see how this could work for you?</p>
        </div>
      `,
      ctaText: "See Mike's System",
      ctaUrl: "/demo?industry=real-estate&case-study=mike-rodriguez",
      industry: "real-estate",
      segment: "new_signup",
      delay: 72,
      type: "educational",
      priority: "high",
      tags: ["case-study", "real-estate", "success"]
    },
    {
      id: "re-demo-reminder",
      subject: "Final Reminder: Free Agent Growth Engine Demo",
      preheader: "Last chance to see how top agents are closing more deals",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Don't Miss Your Free Demo</h1>
          <p>Hi {{firstName}},</p>
          <p>This is your final reminder about your free Agent Growth Engine demo. I have limited spots available this week, and I'd hate for you to miss out on the system that's helping agents close 40% more deals.</p>
          <p><strong>In your demo, you'll see:</strong></p>
          <ul>
            <li>Live Agent Growth Engine in action</li>
            <li>Automated lead nurturing workflows</li>
            <li>Smart follow-up sequences</li>
            <li>Transaction management automation</li>
            <li>Custom setup for your market</li>
          </ul>
          <p>Most agents who see the demo book within 24 hours. The results speak for themselves.</p>
          <p>Ready to close more deals?</p>
        </div>
      `,
      ctaText: "Book My Demo Now",
      ctaUrl: "/demo?industry=real-estate&urgency=true",
      industry: "real-estate",
      segment: "new_signup",
      delay: 96,
      type: "promotional",
      priority: "high",
      tags: ["demo", "real-estate", "urgency"]
    }
  ]
};

// Accounting Email Sequence
export const accountingSequence: EmailSequence = {
  id: "accounting-welcome",
  name: "Accounting Firm Efficiency Series",
  description: "6-day sequence for accounting firms focused on automation and efficiency",
  industry: "accounting",
  trigger: "signup",
  totalDuration: 6,
  expectedOpenRate: 26,
  expectedClickRate: 9,
  status: "active",
  templates: [
    {
      id: "ac-welcome-1",
      subject: "Welcome to the Financial Workflow Engine - Automate 80% of Your Admin",
      preheader: "Discover how accounting firms are automating their biggest time drains",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Welcome to the Financial Workflow Engine!</h1>
          <p>Hi {{firstName}},</p>
          <p>Welcome to OMGsystems! I'm excited to show you how our Financial Workflow Engine is helping accounting firms automate 80% of their administrative work.</p>
          <p><strong>Here's what you'll discover:</strong></p>
          <ul>
            <li>Automated document collection and organization</li>
            <li>Smart client communication and reminders</li>
            <li>Automated report generation and delivery</li>
            <li>Integrated compliance tracking and alerts</li>
          </ul>
          <p>Over the next 6 days, I'll share real case studies, proven strategies, and show you exactly how successful accounting firms are using automation to serve more clients with less stress.</p>
          <p>Ready to transform your practice?</p>
        </div>
      `,
      ctaText: "See the Financial Workflow Engine",
      ctaUrl: "/demo?industry=accounting",
      industry: "accounting",
      segment: "new_signup",
      delay: 0,
      type: "welcome",
      priority: "high",
      tags: ["welcome", "accounting", "automation"]
    },
    {
      id: "ac-document-automation",
      subject: "How to Automate Document Collection (Save 15 Hours Per Week)",
      preheader: "See the system that eliminates the document chase forever",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">End the Document Chase Forever</h1>
          <p>Hi {{firstName}},</p>
          <p>One of the biggest time drains in accounting is chasing clients for documents. The average accounting firm spends 15+ hours per week just collecting and organizing client documents.</p>
          <p><strong>Here's how our Financial Workflow Engine solves this:</strong></p>
          <ul>
            <li>Automated document requests with smart reminders</li>
            <li>Secure client portal for document uploads</li>
            <li>Automatic document categorization and filing</li>
            <li>Integration with your existing accounting software</li>
          </ul>
          <p>David Kim, CPA, reduced his document collection time from 20 hours per week to 2 hours. That's 18 hours saved every single week!</p>
          <p>Want to see how this works?</p>
        </div>
      `,
      ctaText: "See David's System",
      ctaUrl: "/case-snapshots/accounting-firm-efficiency",
      industry: "accounting",
      segment: "new_signup",
      delay: 24,
      type: "educational",
      priority: "high",
      tags: ["document-automation", "accounting", "efficiency"]
    },
    {
      id: "ac-client-communication",
      subject: "The Client Communication System That Builds Trust",
      preheader: "See how top accounting firms keep clients happy and informed",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Build Trust Through Better Communication</h1>
          <p>Hi {{firstName}},</p>
          <p>Client satisfaction in accounting is directly tied to communication. Clients who feel informed and supported are 5x more likely to refer new business.</p>
          <p><strong>Here's how our system improves client communication:</strong></p>
          <ul>
            <li>Automated status updates and progress reports</li>
            <li>Smart reminders for deadlines and requirements</li>
            <li>Personalized communication based on client needs</li>
            <li>Integrated messaging that keeps everything in one place</li>
          </ul>
          <p>Lisa Thompson's accounting firm increased client satisfaction scores from 7.2 to 9.4 using our communication automation. Referrals increased by 60%!</p>
          <p>Ready to improve your client relationships?</p>
        </div>
      `,
      ctaText: "See Lisa's System",
      ctaUrl: "/demo?industry=accounting&features=client-communication",
      industry: "accounting",
      segment: "new_signup",
      delay: 48,
      type: "educational",
      priority: "high",
      tags: ["client-communication", "accounting", "satisfaction"]
    },
    {
      id: "ac-compliance-automation",
      subject: "Never Miss a Deadline Again (Compliance Automation)",
      preheader: "See how automation keeps you compliant and stress-free",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Compliance Made Simple</h1>
          <p>Hi {{firstName}},</p>
          <p>Compliance is critical in accounting, but tracking deadlines and requirements across hundreds of clients can be overwhelming. One missed deadline can cost thousands in penalties.</p>
          <p><strong>Here's how our compliance automation works:</strong></p>
          <ul>
            <li>Automated deadline tracking and alerts</li>
            <li>Smart compliance checklists for each client</li>
            <li>Integration with tax software and regulatory systems</li>
            <li>Automated report generation and filing</li>
          </ul>
          <p>Carlos Mendez's firm has never missed a deadline since implementing our compliance automation. They've also reduced compliance-related stress by 80%.</p>
          <p>Want to see how this could work for your firm?</p>
        </div>
      `,
      ctaText: "See Compliance Automation",
      ctaUrl: "/demo?industry=accounting&features=compliance-automation",
      industry: "accounting",
      segment: "new_signup",
      delay: 72,
      type: "educational",
      priority: "high",
      tags: ["compliance", "accounting", "automation"]
    },
    {
      id: "ac-roi-calculator",
      subject: "Calculate Your Time Savings (Free ROI Calculator)",
      preheader: "See exactly how much time and money you could save",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">What's Your Time Worth?</h1>
          <p>Hi {{firstName}},</p>
          <p>I've been sharing how accounting firms save 15-20 hours per week with the Financial Workflow Engine. But what does that mean for YOUR practice?</p>
          <p>I've created a free ROI calculator specifically for accounting firms. Just enter a few details about your practice and see exactly how much time and money you could save.</p>
          <p><strong>The calculator will show you:</strong></p>
          <ul>
            <li>Hours saved per week</li>
            <li>Annual time savings</li>
            <li>Cost savings based on your hourly rate</li>
            <li>ROI timeline for the Financial Workflow Engine</li>
          </ul>
          <p>Most accounting firms see 400%+ ROI in the first year. The time savings alone typically pay for the system within 3 months.</p>
          <p>Ready to see your potential savings?</p>
        </div>
      `,
      ctaText: "Calculate My ROI",
      ctaUrl: "/roi?industry=accounting",
      industry: "accounting",
      segment: "new_signup",
      delay: 96,
      type: "educational",
      priority: "high",
      tags: ["roi", "calculator", "accounting"]
    },
    {
      id: "ac-demo-reminder",
      subject: "Last Chance: Free Financial Workflow Engine Demo",
      preheader: "See the system that's transforming accounting practices",
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Don't Miss Your Free Demo</h1>
          <p>Hi {{firstName}},</p>
          <p>This is your final reminder about your free Financial Workflow Engine demo. I have limited spots available this week, and I'd hate for you to miss out on the system that's helping accounting firms automate 80% of their admin work.</p>
          <p><strong>In your demo, you'll see:</strong></p>
          <ul>
            <li>Live Financial Workflow Engine in action</li>
            <li>Document automation and organization</li>
            <li>Client communication workflows</li>
            <li>Compliance tracking and alerts</li>
            <li>Custom setup for your practice</li>
          </ul>
          <p>Most accounting firms who see the demo book within 48 hours. The results speak for themselves.</p>
          <p>Ready to transform your practice?</p>
        </div>
      `,
      ctaText: "Book My Demo Now",
      ctaUrl: "/demo?industry=accounting&urgency=true",
      industry: "accounting",
      segment: "new_signup",
      delay: 120,
      type: "promotional",
      priority: "high",
      tags: ["demo", "accounting", "urgency"]
    }
  ]
};

// Export all sequences
export const emailSequences = {
  "property-management": propertyManagementSequence,
  "real-estate": realEstateSequence,
  "accounting": accountingSequence
};

// Helper functions
export function getSequenceByIndustry(industry: string): EmailSequence | undefined {
  return emailSequences[industry as keyof typeof emailSequences];
}

export function getAllSequences(): EmailSequence[] {
  return Object.values(emailSequences);
}

export function getSequenceById(id: string): EmailSequence | undefined {
  return Object.values(emailSequences).find(sequence => sequence.id === id);
}

export function getTemplatesByType(type: string): EmailTemplate[] {
  const allTemplates: EmailTemplate[] = [];
  Object.values(emailSequences).forEach(sequence => {
    allTemplates.push(...sequence.templates);
  });
  return allTemplates.filter(template => template.type === type);
}

export function getTemplatesByIndustry(industry: string): EmailTemplate[] {
  const allTemplates: EmailTemplate[] = [];
  Object.values(emailSequences).forEach(sequence => {
    if (sequence.industry === industry) {
      allTemplates.push(...sequence.templates);
    }
  });
  return allTemplates;
}
