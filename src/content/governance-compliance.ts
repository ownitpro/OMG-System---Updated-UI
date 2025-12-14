export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  framework: 'GDPR' | 'PIPEDA' | 'PHIPA' | 'SOC2' | 'ISO27001' | 'CCPA' | 'HIPAA';
  category: 'data-protection' | 'privacy' | 'security' | 'accessibility' | 'audit' | 'retention';
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-applicable';
  priority: 'high' | 'medium' | 'low';
  lastAssessed: string;
  nextAssessment: string;
  owner: string;
  evidence: ComplianceEvidence[];
  controls: ComplianceControl[];
}

export interface ComplianceEvidence {
  id: string;
  name: string;
  type: 'document' | 'policy' | 'procedure' | 'technical' | 'training';
  description: string;
  url?: string;
  lastUpdated: string;
  status: 'current' | 'outdated' | 'missing';
}

export interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  type: 'preventive' | 'detective' | 'corrective';
  implementation: 'automated' | 'manual' | 'hybrid';
  frequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  status: 'implemented' | 'in-progress' | 'planned' | 'not-applicable';
  owner: string;
  lastTested: string;
  nextTest: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  resource: string;
  outcome: 'success' | 'failure' | 'warning';
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
  complianceRelevant: boolean;
}

export interface DataRetentionPolicy {
  id: string;
  name: string;
  description: string;
  dataType: string;
  retentionPeriod: number; // days
  legalBasis: string;
  deletionMethod: 'secure' | 'anonymize' | 'archive';
  status: 'active' | 'draft' | 'archived';
  lastReviewed: string;
  nextReview: string;
  owner: string;
}

export interface PrivacyImpactAssessment {
  id: string;
  name: string;
  description: string;
  dataTypes: string[];
  processingPurposes: string[];
  legalBasis: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigationMeasures: string[];
  status: 'draft' | 'in-review' | 'approved' | 'rejected';
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  lastUpdated: string;
}

// GDPR Compliance Requirements
export const gdprRequirements: ComplianceRequirement[] = [
  {
    id: "gdpr-data-subject-rights",
    name: "Data Subject Rights",
    description: "Implementation of data subject rights including access, rectification, erasure, and portability",
    framework: "GDPR",
    category: "data-protection",
    status: "compliant",
    priority: "high",
    lastAssessed: "2025-01-01",
    nextAssessment: "2025-07-01",
    owner: "Legal Team",
    evidence: [
      {
        id: "data-subject-rights-policy",
        name: "Data Subject Rights Policy",
        type: "policy",
        description: "Comprehensive policy outlining data subject rights and procedures",
        url: "/policies/data-subject-rights",
        lastUpdated: "2025-01-01",
        status: "current"
      },
      {
        id: "data-subject-request-form",
        name: "Data Subject Request Form",
        type: "document",
        description: "Standardized form for data subject requests",
        url: "/forms/data-subject-request",
        lastUpdated: "2025-01-01",
        status: "current"
      }
    ],
    controls: [
      {
        id: "automated-data-export",
        name: "Automated Data Export",
        description: "System automatically generates data exports for portability requests",
        type: "preventive",
        implementation: "automated",
        frequency: "continuous",
        status: "implemented",
        owner: "Engineering Team",
        lastTested: "2025-01-01",
        nextTest: "2025-04-01"
      }
    ]
  },
  {
    id: "gdpr-consent-management",
    name: "Consent Management",
    description: "Proper consent collection, management, and withdrawal mechanisms",
    framework: "GDPR",
    category: "privacy",
    status: "compliant",
    priority: "high",
    lastAssessed: "2025-01-01",
    nextAssessment: "2025-07-01",
    owner: "Privacy Team",
    evidence: [
      {
        id: "consent-management-system",
        name: "Consent Management System",
        type: "technical",
        description: "Technical implementation of consent management",
        lastUpdated: "2025-01-01",
        status: "current"
      }
    ],
    controls: [
      {
        id: "consent-banner",
        name: "Consent Banner",
        description: "Granular consent collection banner",
        type: "preventive",
        implementation: "automated",
        frequency: "continuous",
        status: "implemented",
        owner: "Engineering Team",
        lastTested: "2025-01-01",
        nextTest: "2025-04-01"
      }
    ]
  }
];

// PIPEDA Compliance Requirements
export const pipedaRequirements: ComplianceRequirement[] = [
  {
    id: "pipeda-privacy-policy",
    name: "Privacy Policy",
    description: "Comprehensive privacy policy compliant with PIPEDA requirements",
    framework: "PIPEDA",
    category: "privacy",
    status: "compliant",
    priority: "high",
    lastAssessed: "2025-01-01",
    nextAssessment: "2025-07-01",
    owner: "Legal Team",
    evidence: [
      {
        id: "privacy-policy-document",
        name: "Privacy Policy",
        type: "policy",
        description: "Detailed privacy policy covering all PIPEDA requirements",
        url: "/legal/privacy",
        lastUpdated: "2025-01-01",
        status: "current"
      }
    ],
    controls: [
      {
        id: "privacy-policy-review",
        name: "Privacy Policy Review",
        description: "Regular review and update of privacy policy",
        type: "preventive",
        implementation: "manual",
        frequency: "quarterly",
        status: "implemented",
        owner: "Legal Team",
        lastTested: "2025-01-01",
        nextTest: "2025-04-01"
      }
    ]
  }
];

// PHIPA Compliance Requirements
export const phipaRequirements: ComplianceRequirement[] = [
  {
    id: "phipa-health-data-protection",
    name: "Health Data Protection",
    description: "Protection of personal health information in accordance with PHIPA",
    framework: "PHIPA",
    category: "data-protection",
    status: "compliant",
    priority: "high",
    lastAssessed: "2025-01-01",
    nextAssessment: "2025-07-01",
    owner: "Compliance Team",
    evidence: [
      {
        id: "health-data-policy",
        name: "Health Data Protection Policy",
        type: "policy",
        description: "Policy for handling personal health information",
        url: "/policies/health-data-protection",
        lastUpdated: "2025-01-01",
        status: "current"
      }
    ],
    controls: [
      {
        id: "health-data-encryption",
        name: "Health Data Encryption",
        description: "Encryption of health data at rest and in transit",
        type: "preventive",
        implementation: "automated",
        frequency: "continuous",
        status: "implemented",
        owner: "Security Team",
        lastTested: "2025-01-01",
        nextTest: "2025-04-01"
      }
    ]
  }
];

// SOC 2 Compliance Requirements
export const soc2Requirements: ComplianceRequirement[] = [
  {
    id: "soc2-access-controls",
    name: "Access Controls",
    description: "Comprehensive access control system for SOC 2 compliance",
    framework: "SOC2",
    category: "security",
    status: "compliant",
    priority: "high",
    lastAssessed: "2025-01-01",
    nextAssessment: "2025-07-01",
    owner: "Security Team",
    evidence: [
      {
        id: "access-control-policy",
        name: "Access Control Policy",
        type: "policy",
        description: "Policy governing access to systems and data",
        url: "/policies/access-control",
        lastUpdated: "2025-01-01",
        status: "current"
      }
    ],
    controls: [
      {
        id: "multi-factor-authentication",
        name: "Multi-Factor Authentication",
        description: "MFA required for all user accounts",
        type: "preventive",
        implementation: "automated",
        frequency: "continuous",
        status: "implemented",
        owner: "Security Team",
        lastTested: "2025-01-01",
        nextTest: "2025-04-01"
      }
    ]
  }
];

// Data Retention Policies
export const dataRetentionPolicies: DataRetentionPolicy[] = [
  {
    id: "user-account-data",
    name: "User Account Data",
    description: "Retention policy for user account information",
    dataType: "User Account Data",
    retentionPeriod: 2555, // 7 years
    legalBasis: "Business operations and legal requirements",
    deletionMethod: "secure",
    status: "active",
    lastReviewed: "2025-01-01",
    nextReview: "2025-07-01",
    owner: "Legal Team"
  },
  {
    id: "marketing-data",
    name: "Marketing Data",
    description: "Retention policy for marketing and lead data",
    dataType: "Marketing Data",
    retentionPeriod: 1095, // 3 years
    legalBasis: "Marketing and business development",
    deletionMethod: "anonymize",
    status: "active",
    lastReviewed: "2025-01-01",
    nextReview: "2025-07-01",
    owner: "Marketing Team"
  },
  {
    id: "audit-logs",
    name: "Audit Logs",
    description: "Retention policy for system audit logs",
    dataType: "Audit Logs",
    retentionPeriod: 2555, // 7 years
    legalBasis: "Compliance and security requirements",
    deletionMethod: "archive",
    status: "active",
    lastReviewed: "2025-01-01",
    nextReview: "2025-07-01",
    owner: "Security Team"
  }
];

// Privacy Impact Assessments
export const privacyImpactAssessments: PrivacyImpactAssessment[] = [
  {
    id: "pia-crm-system",
    name: "CRM System PIA",
    description: "Privacy impact assessment for CRM system implementation",
    dataTypes: ["Contact Information", "Business Data", "Communication History"],
    processingPurposes: ["Customer Relationship Management", "Business Operations", "Customer Support"],
    legalBasis: "Legitimate Interest",
    riskLevel: "medium",
    mitigationMeasures: [
      "Data encryption at rest and in transit",
      "Access controls and authentication",
      "Regular security audits",
      "Data minimization principles"
    ],
    status: "approved",
    createdBy: "Privacy Team",
    reviewedBy: "Legal Team",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-01"
  },
  {
    id: "pia-analytics-tracking",
    name: "Analytics Tracking PIA",
    description: "Privacy impact assessment for website analytics tracking",
    dataTypes: ["IP Address", "Browser Information", "Usage Data"],
    processingPurposes: ["Website Analytics", "Performance Monitoring", "User Experience Improvement"],
    legalBasis: "Consent",
    riskLevel: "low",
    mitigationMeasures: [
      "IP anonymization",
      "Consent management",
      "Data minimization",
      "Regular data purging"
    ],
    status: "approved",
    createdBy: "Privacy Team",
    reviewedBy: "Legal Team",
    createdAt: "2025-01-01",
    lastUpdated: "2025-01-01"
  }
];

// Sample Audit Logs
export const sampleAuditLogs: AuditLog[] = [
  {
    id: "audit-001",
    timestamp: "2025-01-15T10:30:00Z",
    userId: "user-123",
    action: "LOGIN",
    resource: "Authentication System",
    outcome: "success",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    details: {
      loginMethod: "password",
      mfaUsed: true
    },
    complianceRelevant: true
  },
  {
    id: "audit-002",
    timestamp: "2025-01-15T10:25:00Z",
    userId: "user-456",
    action: "DATA_EXPORT",
    resource: "User Data",
    outcome: "success",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    details: {
      dataType: "personal_data",
      recordCount: 150
    },
    complianceRelevant: true
  },
  {
    id: "audit-003",
    timestamp: "2025-01-15T10:20:00Z",
    userId: "admin-789",
    action: "CONSENT_UPDATE",
    resource: "Consent Management",
    outcome: "success",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    details: {
      consentType: "marketing",
      action: "withdraw"
    },
    complianceRelevant: true
  }
];

// Export all compliance data
export const complianceRequirements = {
  "GDPR": gdprRequirements,
  "PIPEDA": pipedaRequirements,
  "PHIPA": phipaRequirements,
  "SOC2": soc2Requirements
};

// Helper functions
export function getRequirementsByFramework(framework: string): ComplianceRequirement[] {
  return complianceRequirements[framework as keyof typeof complianceRequirements] || [];
}

export function getRequirementsByStatus(status: string): ComplianceRequirement[] {
  const allRequirements = Object.values(complianceRequirements).flat();
  return allRequirements.filter(req => req.status === status);
}

export function getRequirementsByCategory(category: string): ComplianceRequirement[] {
  const allRequirements = Object.values(complianceRequirements).flat();
  return allRequirements.filter(req => req.category === category);
}

export function getComplianceScore(): { overall: number; byFramework: Record<string, number> } {
  const allRequirements = Object.values(complianceRequirements).flat();
  const totalRequirements = allRequirements.length;
  const compliantRequirements = allRequirements.filter(req => req.status === 'compliant').length;
  const partialRequirements = allRequirements.filter(req => req.status === 'partial').length;
  
  const overall = ((compliantRequirements + (partialRequirements * 0.5)) / totalRequirements) * 100;
  
  const byFramework: Record<string, number> = {};
  Object.keys(complianceRequirements).forEach(framework => {
    const frameworkRequirements = complianceRequirements[framework as keyof typeof complianceRequirements];
    const frameworkTotal = frameworkRequirements.length;
    const frameworkCompliant = frameworkRequirements.filter(req => req.status === 'compliant').length;
    const frameworkPartial = frameworkRequirements.filter(req => req.status === 'partial').length;
    
    byFramework[framework] = ((frameworkCompliant + (frameworkPartial * 0.5)) / frameworkTotal) * 100;
  });
  
  return { overall, byFramework };
}

export function getUpcomingAssessments(): ComplianceRequirement[] {
  const allRequirements = Object.values(complianceRequirements).flat();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  return allRequirements.filter(req => {
    const nextAssessment = new Date(req.nextAssessment);
    return nextAssessment <= thirtyDaysFromNow;
  });
}

export function getNonCompliantRequirements(): ComplianceRequirement[] {
  const allRequirements = Object.values(complianceRequirements).flat();
  return allRequirements.filter(req => req.status === 'non-compliant');
}
