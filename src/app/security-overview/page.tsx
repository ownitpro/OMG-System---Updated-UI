import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";

export const metadata: Metadata = {
  title: "Security & Privacy Overview | OMGsystems",
  description: "Learn how OMGsystems protects your data with Canadian data residency, enterprise-grade encryption, and comprehensive security controls.",
  openGraph: {
    title: "Security & Privacy Overview | OMGsystems",
    description: "Learn how OMGsystems protects your data with Canadian data residency, enterprise-grade encryption, and comprehensive security controls.",
    type: "website",
  },
};

export default function SecurityOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Security & Privacy by Design
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              How OMGsystems protects your data, ensures compliance, and maintains trust.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-700 font-medium">
                Data stored in Canada · Encryption, permissions & audit logs built in
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Infrastructure & Shared Responsibility */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Infrastructure & Shared Responsibility
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AWS Canada Central Region</h3>
                <p className="text-gray-600 mb-4">
                  OMGsystems uses Amazon Web Services (AWS) Canada Central region for all hosting and data storage, 
                  ensuring your data never leaves Canadian soil and complies with Canadian data residency requirements.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">AWS Certifications</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• SOC 2 Type II</li>
                    <li>• ISO 27001</li>
                    <li>• ISO 27017</li>
                    <li>• ISO 27018</li>
                    <li>• PCI DSS Level 1</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Shared Responsibility Model</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">AWS Responsibility</h4>
                    <p className="text-sm text-gray-600">Physical security, infrastructure, network, and cloud platform security</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">OMGsystems Responsibility</h4>
                    <p className="text-sm text-gray-600">Application security, data protection, access control, and encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Encryption & Data Protection */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Encryption & Data Safeguards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">In Transit</h3>
                <p className="text-gray-600 text-sm">
                  All client-to-server communication uses TLS 1.3 encryption with perfect forward secrecy.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">At Rest</h3>
                <p className="text-gray-600 text-sm">
                  All data encrypted using AES-256 encryption via AWS KMS with customer-managed keys.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Management</h3>
                <p className="text-gray-600 text-sm">
                  AWS KMS with automatic key rotation and strict access controls for encryption keys.
                </p>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Segmentation & Least Privilege</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Network Isolation</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Database layer isolated from application layer</li>
                    <li>• File storage in separate VPC</li>
                    <li>• API endpoints behind load balancers</li>
                    <li>• Private subnets for internal services</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Access Controls</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Principle of least privilege enforced</li>
                    <li>• Service-to-service authentication</li>
                    <li>• Network ACLs and security groups</li>
                    <li>• Regular access reviews and audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Identity & Access Management */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Access Controls, Accounts & Authorization
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Role-Based Access Control (RBAC)</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-red-600">A</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">ADMIN</span>
                      <p className="text-sm text-gray-600">Full system access, user management, security settings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">S</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">STAFF</span>
                      <p className="text-sm text-gray-600">Client management, support access, limited admin</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">C</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">CLIENT</span>
                      <p className="text-sm text-gray-600">Access to own data, limited system features</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-600">V</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">VENDOR</span>
                      <p className="text-sm text-gray-600">Limited access to specific client data</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication & Security</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Multi-Factor Authentication (MFA)</h4>
                    <p className="text-sm text-green-800">Enforced for all admin and staff accounts using TOTP or hardware tokens</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Session Management</h4>
                    <p className="text-sm text-blue-800">Automatic session timeout, secure session tokens, concurrent session limits</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Audit Logging</h4>
                    <p className="text-sm text-purple-800">All sensitive actions logged with user, timestamp, and action details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Monitoring & Incident Response */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Monitoring & Incident Response
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Monitoring</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">AWS CloudTrail</h4>
                    <p className="text-sm text-gray-600">Logs all API calls, configuration changes, and administrative actions</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">CloudWatch Monitoring</h4>
                    <p className="text-sm text-gray-600">Real-time monitoring of system performance, errors, and anomalies</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-2">Security Alerts</h4>
                    <p className="text-sm text-gray-600">Automated alerts for failed logins, privilege escalations, and suspicious activity</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Incident Response Plan</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-red-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Detection</h4>
                      <p className="text-sm text-gray-600">Automated monitoring and alerting systems detect potential security incidents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Triage</h4>
                      <p className="text-sm text-gray-600">Security team assesses severity and impact of the incident</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-yellow-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Mitigation</h4>
                      <p className="text-sm text-gray-600">Immediate containment and remediation actions to limit impact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-bold text-green-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Review</h4>
                      <p className="text-sm text-gray-600">Post-incident analysis and process improvements</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Regular Security Assessments</h4>
                  <p className="text-sm text-blue-800">We conduct periodic third-party security audits and penetration testing to ensure our security posture remains strong.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Data Retention & Legal Holds */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Retention, Deletion & Legal Holds
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Retention Policies</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Document Vault</h4>
                    <p className="text-sm text-gray-600">7 years retention with WORM (Write-Once, Read-Many) protection</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Project Data</h4>
                    <p className="text-sm text-gray-600">3 years active, 2 years archived, then secure deletion</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Audit Logs</h4>
                    <p className="text-sm text-gray-600">7 years retention for compliance and forensic purposes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">User Accounts</h4>
                    <p className="text-sm text-gray-600">Retained while active, anonymized 1 year after deactivation</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal & Compliance</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Legal Holds</h4>
                    <p className="text-sm text-gray-600">Ability to prevent deletion of specific data for litigation or audits</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Right to Deletion</h4>
                    <p className="text-sm text-gray-600">Secure deletion of personal data upon request, subject to legal requirements</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Data Portability</h4>
                    <p className="text-sm text-gray-600">Export of user data in standard formats (JSON, CSV, PDF)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Compliance Reporting</h4>
                    <p className="text-sm text-gray-600">Regular compliance reports and audit trail documentation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Backup & Disaster Recovery */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Backups & Recovery
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Backups</h3>
                <p className="text-gray-600 text-sm">
                  Daily automated backups across multiple availability zones with point-in-time recovery.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Disaster Recovery</h3>
                <p className="text-gray-600 text-sm">
                  Multi-region failover capability with RTO of 4 hours and RPO of 1 hour.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing & Validation</h3>
                <p className="text-gray-600 text-sm">
                  Quarterly disaster recovery testing and backup restoration validation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Compliance & Certifications */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Compliance & Certifications
            </h2>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-6">
                OMGsystems aligns with industry best practices and frameworks, and supports audit and compliance reviews.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-blue-600">SOC 2</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">SOC 2 Type II</h3>
                <p className="text-xs text-gray-600">Security, availability, processing integrity</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-green-600">ISO</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">ISO 27001</h3>
                <p className="text-xs text-gray-600">Information security management</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-purple-600">PCI</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">PCI DSS</h3>
                <p className="text-xs text-gray-600">Payment card industry standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-orange-600">PIPEDA</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">PIPEDA</h3>
                <p className="text-xs text-gray-600">Canadian privacy legislation</p>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Security Documentation</h3>
              <p className="text-sm text-blue-800 mb-4">
                We maintain comprehensive security documentation and are prepared to provide audit evidence and compliance reports upon request.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Request Security Documentation
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Architecture Overview */}
      <Section className="bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Security Architecture Overview
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-100 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Simplified Security Architecture</div>
                  <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gray-500 text-sm mb-2">Architecture Diagram</div>
                      <div className="text-xs text-gray-400">
                        Client → Load Balancer → API Gateway → Application → Database<br/>
                        All layers encrypted with audit logging throughout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Security Layers</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• WAF (Web Application Firewall)</li>
                    <li>• DDoS Protection</li>
                    <li>• TLS/SSL Termination</li>
                    <li>• API Rate Limiting</li>
                    <li>• Authentication & Authorization</li>
                    <li>• Data Encryption</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Monitoring Points</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Network Traffic Analysis</li>
                    <li>• Application Performance Monitoring</li>
                    <li>• Database Access Logging</li>
                    <li>• User Activity Auditing</li>
                    <li>• Security Event Correlation</li>
                    <li>• Compliance Reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Security FAQs
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Where is my data stored?</h3>
                <p className="text-gray-600 text-sm">All data is stored in Canada (Central region) in AWS data centers, ensuring Canadian data residency compliance.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can your support access my files?</h3>
                <p className="text-gray-600 text-sm">No — our system is support-blind by default. Any break-glass access requires dual approval and is fully logged and audited.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do you manage encryption keys?</h3>
                <p className="text-gray-600 text-sm">We use AWS KMS with automatic key rotation and strict permissions. Keys are managed separately from data and never stored in plaintext.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you perform security audits?</h3>
                <p className="text-gray-600 text-sm">Yes — we conduct regular third-party security assessments and penetration testing to ensure our security posture remains strong.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What happens in a security incident?</h3>
                <p className="text-gray-600 text-sm">We have a comprehensive incident response plan: immediate containment, root cause analysis, client notification (if relevant), and remediation with lessons learned.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions About Security?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our security team is here to answer your questions and provide additional documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact?type=security"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Security Team
              </a>
              <a
                href="/privacy-policy"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <div className="mt-8 text-sm text-gray-600">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
