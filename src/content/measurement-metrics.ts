export interface Metric {
  id: string;
  name: string;
  description: string;
  category: 'acquisition' | 'activation' | 'retention' | 'revenue' | 'referral';
  type: 'count' | 'rate' | 'currency' | 'duration' | 'percentage';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastUpdated: string;
  industry?: string;
  platform?: string;
}

export interface FeedbackLoop {
  id: string;
  name: string;
  description: string;
  type: 'automated' | 'manual' | 'hybrid';
  frequency: 'real-time' | 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'paused' | 'draft';
  metrics: string[];
  triggers: FeedbackTrigger[];
  actions: FeedbackAction[];
  createdAt: string;
  lastRun: string;
  nextRun: string;
}

export interface FeedbackTrigger {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  operator: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
  metric: string;
}

export interface FeedbackAction {
  id: string;
  name: string;
  type: 'email' | 'notification' | 'automation' | 'report';
  description: string;
  parameters: Record<string, any>;
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'operational' | 'marketing' | 'sales' | 'product';
  metrics: string[];
  layout: DashboardLayout;
  filters: DashboardFilter[];
  refreshInterval: number; // minutes
  isPublic: boolean;
  createdAt: string;
  lastUpdated: string;
}

export interface DashboardLayout {
  rows: DashboardRow[];
}

export interface DashboardRow {
  id: string;
  columns: DashboardColumn[];
}

export interface DashboardColumn {
  id: string;
  width: number; // 1-12 grid system
  widgets: DashboardWidget[];
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'alert' | 'text';
  title: string;
  metricId?: string;
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  data?: any;
  config?: Record<string, any>;
}

export interface DashboardFilter {
  id: string;
  name: string;
  type: 'date' | 'select' | 'multiselect' | 'text';
  options?: string[];
  defaultValue?: any;
}

// Key Performance Indicators
export const kpiMetrics: Metric[] = [
  // Acquisition Metrics
  {
    id: "website-traffic",
    name: "Website Traffic",
    description: "Total unique visitors to the website",
    category: "acquisition",
    type: "count",
    value: 45678,
    target: 50000,
    trend: "up",
    changePercent: 12.5,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "demo-requests",
    name: "Demo Requests",
    description: "Number of demo requests submitted",
    category: "acquisition",
    type: "count",
    value: 234,
    target: 300,
    trend: "up",
    changePercent: 8.3,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "lead-conversion-rate",
    name: "Lead Conversion Rate",
    description: "Percentage of visitors who become leads",
    category: "acquisition",
    type: "percentage",
    value: 3.2,
    target: 4.0,
    trend: "up",
    changePercent: 15.2,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "cost-per-lead",
    name: "Cost Per Lead",
    description: "Average cost to acquire a new lead",
    category: "acquisition",
    type: "currency",
    value: 45.67,
    target: 40.00,
    trend: "down",
    changePercent: -8.1,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },

  // Activation Metrics
  {
    id: "demo-completion-rate",
    name: "Demo Completion Rate",
    description: "Percentage of started demos that are completed",
    category: "activation",
    type: "percentage",
    value: 67.8,
    target: 75.0,
    trend: "up",
    changePercent: 5.2,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "time-to-first-value",
    name: "Time to First Value",
    description: "Average time for users to see value from the product",
    category: "activation",
    type: "duration",
    value: 2.5, // days
    target: 2.0,
    trend: "down",
    changePercent: -12.3,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "feature-adoption-rate",
    name: "Feature Adoption Rate",
    description: "Percentage of users who adopt key features",
    category: "activation",
    type: "percentage",
    value: 45.2,
    target: 60.0,
    trend: "up",
    changePercent: 8.7,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },

  // Retention Metrics
  {
    id: "user-retention-30d",
    name: "30-Day User Retention",
    description: "Percentage of users still active after 30 days",
    category: "retention",
    type: "percentage",
    value: 78.5,
    target: 80.0,
    trend: "up",
    changePercent: 3.1,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "churn-rate",
    name: "Monthly Churn Rate",
    description: "Percentage of users who churn each month",
    category: "retention",
    type: "percentage",
    value: 5.2,
    target: 4.0,
    trend: "down",
    changePercent: -15.8,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "net-promoter-score",
    name: "Net Promoter Score",
    description: "Customer satisfaction and loyalty score",
    category: "retention",
    type: "count",
    value: 42,
    target: 50,
    trend: "up",
    changePercent: 8.5,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },

  // Revenue Metrics
  {
    id: "monthly-recurring-revenue",
    name: "Monthly Recurring Revenue",
    description: "Total monthly recurring revenue",
    category: "revenue",
    type: "currency",
    value: 125000,
    target: 150000,
    trend: "up",
    changePercent: 18.7,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "customer-lifetime-value",
    name: "Customer Lifetime Value",
    description: "Average lifetime value of a customer",
    category: "revenue",
    type: "currency",
    value: 2450,
    target: 3000,
    trend: "up",
    changePercent: 12.3,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "revenue-per-customer",
    name: "Revenue Per Customer",
    description: "Average monthly revenue per customer",
    category: "revenue",
    type: "currency",
    value: 125,
    target: 150,
    trend: "up",
    changePercent: 6.8,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "conversion-rate",
    name: "Lead to Customer Conversion Rate",
    description: "Percentage of leads that become paying customers",
    category: "revenue",
    type: "percentage",
    value: 15.8,
    target: 20.0,
    trend: "up",
    changePercent: 9.2,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },

  // Referral Metrics
  {
    id: "referral-rate",
    name: "Customer Referral Rate",
    description: "Percentage of customers who refer others",
    category: "referral",
    type: "percentage",
    value: 23.5,
    target: 30.0,
    trend: "up",
    changePercent: 11.4,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "viral-coefficient",
    name: "Viral Coefficient",
    description: "Number of new users each user brings in",
    category: "referral",
    type: "count",
    value: 0.8,
    target: 1.2,
    trend: "up",
    changePercent: 14.3,
    period: "monthly",
    lastUpdated: "2025-01-15T10:30:00Z"
  }
];

// Industry-Specific Metrics
export const industryMetrics: Record<string, Metric[]> = {
  "property-management": [
    {
      id: "pm-portfolio-size",
      name: "Average Portfolio Size",
      description: "Average number of units managed per customer",
      category: "revenue",
      type: "count",
      value: 45,
      target: 50,
      trend: "up",
      changePercent: 5.2,
      period: "monthly",
      lastUpdated: "2025-01-15T10:30:00Z",
      industry: "property-management"
    },
    {
      id: "pm-automation-adoption",
      name: "Automation Feature Adoption",
      description: "Percentage of PM customers using automation features",
      category: "activation",
      type: "percentage",
      value: 78.3,
      target: 85.0,
      trend: "up",
      changePercent: 8.7,
      period: "monthly",
      lastUpdated: "2025-01-15T10:30:00Z",
      industry: "property-management"
    }
  ],
  "real-estate": [
    {
      id: "re-deals-per-agent",
      name: "Average Deals Per Agent",
      description: "Average number of deals closed per agent per month",
      category: "revenue",
      type: "count",
      value: 3.2,
      target: 4.0,
      trend: "up",
      changePercent: 12.5,
      period: "monthly",
      lastUpdated: "2025-01-15T10:30:00Z",
      industry: "real-estate"
    },
    {
      id: "re-lead-response-time",
      name: "Average Lead Response Time",
      description: "Average time to respond to new leads",
      category: "activation",
      type: "duration",
      value: 15, // minutes
      target: 10,
      trend: "down",
      changePercent: -25.0,
      period: "monthly",
      lastUpdated: "2025-01-15T10:30:00Z",
      industry: "real-estate"
    }
  ],
  "accounting": [
    {
      id: "ac-clients-per-firm",
      name: "Average Clients Per Firm",
      description: "Average number of clients per accounting firm",
      category: "revenue",
      type: "count",
      value: 125,
      target: 150,
      trend: "up",
      changePercent: 8.3,
      period: "monthly",
      lastUpdated: "2025-01-15T10:30:00Z",
      industry: "accounting"
    },
    {
      id: "ac-compliance-score",
      name: "Compliance Score",
      description: "Average compliance score for accounting customers",
      category: "retention",
      type: "percentage",
      value: 94.2,
      target: 95.0,
      trend: "up",
      changePercent: 2.1,
      period: "monthly",
      lastUpdated: "2025-01-15T10:30:00Z",
      industry: "accounting"
    }
  ]
};

// Feedback Loops
export const feedbackLoops: FeedbackLoop[] = [
  {
    id: "low-conversion-alert",
    name: "Low Conversion Rate Alert",
    description: "Alert when lead conversion rate drops below threshold",
    type: "automated",
    frequency: "daily",
    status: "active",
    metrics: ["lead-conversion-rate"],
    triggers: [
      {
        id: "conversion-threshold",
        name: "Conversion Rate Below 3%",
        condition: "lead-conversion-rate < 3.0",
        threshold: 3.0,
        operator: "less_than",
        metric: "lead-conversion-rate"
      }
    ],
    actions: [
      {
        id: "email-alert",
        name: "Send Email Alert",
        type: "email",
        description: "Send alert to marketing team",
        parameters: {
          recipients: ["marketing@omgsystems.com"],
          subject: "Low Conversion Rate Alert",
          template: "low-conversion-alert"
        }
      }
    ],
    createdAt: "2025-01-01T00:00:00Z",
    lastRun: "2025-01-15T09:00:00Z",
    nextRun: "2025-01-16T09:00:00Z"
  },
  {
    id: "high-churn-alert",
    name: "High Churn Rate Alert",
    description: "Alert when churn rate exceeds threshold",
    type: "automated",
    frequency: "weekly",
    status: "active",
    metrics: ["churn-rate"],
    triggers: [
      {
        id: "churn-threshold",
        name: "Churn Rate Above 6%",
        condition: "churn-rate > 6.0",
        threshold: 6.0,
        operator: "greater_than",
        metric: "churn-rate"
      }
    ],
    actions: [
      {
        id: "slack-notification",
        name: "Slack Notification",
        type: "notification",
        description: "Send notification to customer success team",
        parameters: {
          channel: "#customer-success",
          message: "High churn rate detected - immediate attention required"
        }
      }
    ],
    createdAt: "2025-01-01T00:00:00Z",
    lastRun: "2025-01-14T09:00:00Z",
    nextRun: "2025-01-21T09:00:00Z"
  },
  {
    id: "revenue-growth-celebration",
    name: "Revenue Growth Celebration",
    description: "Celebrate when MRR growth exceeds target",
    type: "automated",
    frequency: "monthly",
    status: "active",
    metrics: ["monthly-recurring-revenue"],
    triggers: [
      {
        id: "revenue-growth",
        name: "MRR Growth Above 15%",
        condition: "monthly-recurring-revenue growth > 15%",
        threshold: 15.0,
        operator: "greater_than",
        metric: "monthly-recurring-revenue"
      }
    ],
    actions: [
      {
        id: "company-announcement",
        name: "Company Announcement",
        type: "notification",
        description: "Announce growth milestone to company",
        parameters: {
          channel: "#general",
          message: "🎉 We've exceeded our MRR growth target! Great work team!"
        }
      }
    ],
    createdAt: "2025-01-01T00:00:00Z",
    lastRun: "2025-01-01T09:00:00Z",
    nextRun: "2025-02-01T09:00:00Z"
  }
];

// Dashboards
export const dashboards: Dashboard[] = [
  {
    id: "executive-dashboard",
    name: "Executive Dashboard",
    description: "High-level metrics for executive team",
    type: "executive",
    metrics: ["monthly-recurring-revenue", "customer-lifetime-value", "churn-rate", "net-promoter-score"],
    layout: {
      rows: [
        {
          id: "row-1",
          columns: [
            {
              id: "col-1",
              width: 6,
              widgets: [
                {
                  id: "mrr-widget",
                  type: "metric",
                  title: "Monthly Recurring Revenue",
                  metricId: "monthly-recurring-revenue"
                }
              ]
            },
            {
              id: "col-2",
              width: 6,
              widgets: [
                {
                  id: "clv-widget",
                  type: "metric",
                  title: "Customer Lifetime Value",
                  metricId: "customer-lifetime-value"
                }
              ]
            }
          ]
        },
        {
          id: "row-2",
          columns: [
            {
              id: "col-3",
              width: 12,
              widgets: [
                {
                  id: "revenue-chart",
                  type: "chart",
                  title: "Revenue Trend",
                  chartType: "line",
                  metricId: "monthly-recurring-revenue"
                }
              ]
            }
          ]
        }
      ]
    },
    filters: [
      {
        id: "date-range",
        name: "Date Range",
        type: "date",
        defaultValue: "last-30-days"
      }
    ],
    refreshInterval: 60,
    isPublic: false,
    createdAt: "2025-01-01T00:00:00Z",
    lastUpdated: "2025-01-15T10:30:00Z"
  },
  {
    id: "marketing-dashboard",
    name: "Marketing Dashboard",
    description: "Marketing performance metrics and KPIs",
    type: "marketing",
    metrics: ["website-traffic", "demo-requests", "lead-conversion-rate", "cost-per-lead"],
    layout: {
      rows: [
        {
          id: "row-1",
          columns: [
            {
              id: "col-1",
              width: 3,
              widgets: [
                {
                  id: "traffic-widget",
                  type: "metric",
                  title: "Website Traffic",
                  metricId: "website-traffic"
                }
              ]
            },
            {
              id: "col-2",
              width: 3,
              widgets: [
                {
                  id: "demos-widget",
                  type: "metric",
                  title: "Demo Requests",
                  metricId: "demo-requests"
                }
              ]
            },
            {
              id: "col-3",
              width: 3,
              widgets: [
                {
                  id: "conversion-widget",
                  type: "metric",
                  title: "Conversion Rate",
                  metricId: "lead-conversion-rate"
                }
              ]
            },
            {
              id: "col-4",
              width: 3,
              widgets: [
                {
                  id: "cpl-widget",
                  type: "metric",
                  title: "Cost Per Lead",
                  metricId: "cost-per-lead"
                }
              ]
            }
          ]
        }
      ]
    },
    filters: [
      {
        id: "date-range",
        name: "Date Range",
        type: "date",
        defaultValue: "last-30-days"
      },
      {
        id: "industry",
        name: "Industry",
        type: "select",
        options: ["all", "property-management", "real-estate", "accounting"],
        defaultValue: "all"
      }
    ],
    refreshInterval: 30,
    isPublic: false,
    createdAt: "2025-01-01T00:00:00Z",
    lastUpdated: "2025-01-15T10:30:00Z"
  }
];

// Helper functions
export function getMetricsByCategory(category: string): Metric[] {
  return kpiMetrics.filter(metric => metric.category === category);
}

export function getMetricsByIndustry(industry: string): Metric[] {
  return industryMetrics[industry] || [];
}

export function getAllMetrics(): Metric[] {
  return [...kpiMetrics, ...Object.values(industryMetrics).flat()];
}

export function getMetricById(id: string): Metric | undefined {
  return getAllMetrics().find(metric => metric.id === id);
}

export function getFeedbackLoopsByStatus(status: string): FeedbackLoop[] {
  return feedbackLoops.filter(loop => loop.status === status);
}

export function getDashboardById(id: string): Dashboard | undefined {
  return dashboards.find(dashboard => dashboard.id === id);
}

export function getDashboardsByType(type: string): Dashboard[] {
  return dashboards.filter(dashboard => dashboard.type === type);
}

export function calculateMetricTrend(metric: Metric): { trend: 'up' | 'down' | 'stable'; changePercent: number } {
  // This would typically calculate based on historical data
  // For now, we'll use the stored values
  return {
    trend: metric.trend,
    changePercent: metric.changePercent
  };
}

export function getMetricStatus(metric: Metric): 'on-track' | 'at-risk' | 'off-track' {
  const progress = (metric.value / metric.target) * 100;
  
  if (progress >= 100) return 'on-track';
  if (progress >= 80) return 'at-risk';
  return 'off-track';
}
