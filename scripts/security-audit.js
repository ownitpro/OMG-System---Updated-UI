#!/usr/bin/env node

/**
 * OMGsystems Security Audit Script
 * 
 * Comprehensive security audit covering:
 * - Environment variables validation
 * - Hardcoded secrets detection
 * - Security headers verification
 * - CSP policy validation
 * - Rate limiting configuration
 * - Authentication security
 * - Data protection compliance
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class SecurityAuditor {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = [];
    this.startTime = Date.now();
  }

  log(level, message, details = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      details
    };
    
    console.log(`[${level.toUpperCase()}] ${message}`);
    if (details) {
      console.log(`  Details: ${JSON.stringify(details, null, 2)}`);
    }
  }

  addIssue(message, details = null) {
    this.issues.push({ message, details });
    this.log('error', message, details);
  }

  addWarning(message, details = null) {
    this.warnings.push({ message, details });
    this.log('warn', message, details);
  }

  addPass(message, details = null) {
    this.passed.push({ message, details });
    this.log('info', `✓ ${message}`, details);
  }

  // Check environment variables
  checkEnvironmentVariables() {
    this.log('info', 'Checking environment variables...');
    
    const required = [
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
      'DATABASE_URL',
    ];
    
    const optional = [
      'STRIPE_SECRET_KEY',
      'STRIPE_PUBLISHABLE_KEY',
      'GOOGLE_ANALYTICS_ID',
    ];
    
    // Check required variables
    required.forEach(key => {
      if (!process.env[key]) {
        this.addIssue(`Missing required environment variable: ${key}`);
      } else {
        this.addPass(`Required environment variable present: ${key}`);
      }
    });
    
    // Check for weak secrets
    Object.entries(process.env).forEach(([key, value]) => {
      if (value && key.toLowerCase().includes('secret')) {
        if (value.length < 32) {
          this.addWarning(`Potentially weak secret: ${key} (${value.length} characters)`);
        } else {
          this.addPass(`Secret strength adequate: ${key}`);
        }
      }
    });
    
    // Check for hardcoded secrets in files
    this.checkHardcodedSecrets();
  }

  // Scan for hardcoded secrets
  checkHardcodedSecrets() {
    this.log('info', 'Scanning for hardcoded secrets...');
    
    const suspiciousPatterns = [
      /password\s*=\s*['"][^'"]{3,}['"]/gi,
      /secret\s*=\s*['"][^'"]{3,}['"]/gi,
      /key\s*=\s*['"][^'"]{3,}['"]/gi,
      /token\s*=\s*['"][^'"]{3,}['"]/gi,
      /api[_-]?key\s*=\s*['"][^'"]{3,}['"]/gi,
      /private[_-]?key\s*=\s*['"][^'"]{3,}['"]/gi,
    ];
    
    const filesToCheck = [
      'src/**/*.ts',
      'src/**/*.tsx',
      'src/**/*.js',
      'src/**/*.jsx',
      '*.env*',
      '*.config.*',
    ];
    
    // This is a simplified check - in production, use tools like truffleHog
    const srcDir = path.join(process.cwd(), 'src');
    this.scanDirectory(srcDir, suspiciousPatterns);
  }

  scanDirectory(dir, patterns) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.scanDirectory(filePath, patterns);
      } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(file)) {
        this.scanFile(filePath, patterns);
      }
    });
  }

  scanFile(filePath, patterns) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      patterns.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          this.addWarning(`Potential hardcoded secret in ${filePath}`, {
            pattern: pattern.toString(),
            matches: matches.length
          });
        }
      });
    } catch (error) {
      // Skip files that can't be read
    }
  }

  // Check security headers configuration
  checkSecurityHeaders() {
    this.log('info', 'Checking security headers configuration...');
    
    const securityFile = path.join(process.cwd(), 'src/lib/security.ts');
    if (fs.existsSync(securityFile)) {
      this.addPass('Security headers configuration file exists');
      
      const content = fs.readFileSync(securityFile, 'utf8');
      
      // Check for required security headers
      const requiredHeaders = [
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Referrer-Policy',
        'Content-Security-Policy'
      ];
      
      requiredHeaders.forEach(header => {
        if (content.includes(header)) {
          this.addPass(`Security header configured: ${header}`);
        } else {
          this.addIssue(`Missing security header: ${header}`);
        }
      });
    } else {
      this.addIssue('Security headers configuration file not found');
    }
  }

  // Check CSP configuration
  checkCSPConfiguration() {
    this.log('info', 'Checking Content Security Policy configuration...');
    
    const middlewareFile = path.join(process.cwd(), 'src/middleware.ts');
    if (fs.existsSync(middlewareFile)) {
      const content = fs.readFileSync(middlewareFile, 'utf8');
      
      if (content.includes('generateCSP') || content.includes('Content-Security-Policy')) {
        this.addPass('CSP configuration found in middleware');
      } else {
        this.addWarning('CSP configuration not found in middleware');
      }
    }
    
    // Check for CSP violation reporting endpoint
    const cspReportFile = path.join(process.cwd(), 'src/app/api/csp-report/route.ts');
    if (fs.existsSync(cspReportFile)) {
      this.addPass('CSP violation reporting endpoint exists');
    } else {
      this.addWarning('CSP violation reporting endpoint not found');
    }
  }

  // Check rate limiting configuration
  checkRateLimiting() {
    this.log('info', 'Checking rate limiting configuration...');
    
    const securityFile = path.join(process.cwd(), 'src/lib/security.ts');
    const middlewareFile = path.join(process.cwd(), 'src/middleware.ts');
    
    if (fs.existsSync(securityFile)) {
      const content = fs.readFileSync(securityFile, 'utf8');
      
      if (content.includes('rateLimitConfig')) {
        this.addPass('Rate limiting configuration found');
      } else {
        this.addIssue('Rate limiting configuration not found');
      }
    }
    
    if (fs.existsSync(middlewareFile)) {
      const content = fs.readFileSync(middlewareFile, 'utf8');
      
      if (content.includes('checkRateLimit') || content.includes('rateLimitStore')) {
        this.addPass('Rate limiting implementation found');
      } else {
        this.addIssue('Rate limiting implementation not found');
      }
    } else {
      this.addIssue('Middleware file not found');
    }
  }

  // Check authentication security
  checkAuthenticationSecurity() {
    this.log('info', 'Checking authentication security...');
    
    const authFile = path.join(process.cwd(), 'src/lib/auth.ts');
    if (fs.existsSync(authFile)) {
      this.addPass('Authentication configuration file exists');
      
      const content = fs.readFileSync(authFile, 'utf8');
      
      // Check for secure session configuration
      if (content.includes('secure:') && content.includes('true')) {
        this.addPass('Secure session configuration found');
      } else {
        this.addWarning('Secure session configuration may be missing');
      }
      
      // Check for JWT configuration
      if (content.includes('jwt') || content.includes('JWT')) {
        this.addPass('JWT configuration found');
      } else {
        this.addWarning('JWT configuration not found');
      }
    } else {
      this.addIssue('Authentication configuration file not found');
    }
  }

  // Check data protection compliance
  checkDataProtection() {
    this.log('info', 'Checking data protection compliance...');
    
    // Check for PII redaction
    const securityFile = path.join(process.cwd(), 'src/lib/security.ts');
    if (fs.existsSync(securityFile)) {
      const content = fs.readFileSync(securityFile, 'utf8');
      
      if (content.includes('redactPII')) {
        this.addPass('PII redaction function found');
      } else {
        this.addIssue('PII redaction function not found');
      }
      
      if (content.includes('redactIP')) {
        this.addPass('IP address redaction function found');
      } else {
        this.addIssue('IP address redaction function not found');
      }
    }
    
    // Check for privacy pages
    const privacyPage = path.join(process.cwd(), 'src/app/legal/privacy/page.tsx');
    const cookiePage = path.join(process.cwd(), 'src/app/legal/cookies/page.tsx');
    const trustPage = path.join(process.cwd(), 'src/app/trust/page.tsx');
    
    if (fs.existsSync(privacyPage)) {
      this.addPass('Privacy policy page exists');
    } else {
      this.addIssue('Privacy policy page not found');
    }
    
    if (fs.existsSync(cookiePage)) {
      this.addPass('Cookie policy page exists');
    } else {
      this.addIssue('Cookie policy page not found');
    }
    
    if (fs.existsSync(trustPage)) {
      this.addPass('Trust & Security page exists');
    } else {
      this.addIssue('Trust & Security page not found');
    }
  }

  // Check consent management
  checkConsentManagement() {
    this.log('info', 'Checking consent management...');
    
    const consentFile = path.join(process.cwd(), 'src/components/consent/consent-manager.tsx');
    if (fs.existsSync(consentFile)) {
      this.addPass('Consent management component exists');
      
      const content = fs.readFileSync(consentFile, 'utf8');
      
      if (content.includes('localStorage') && content.includes('omg_consent')) {
        this.addPass('Consent state management found');
      } else {
        this.addWarning('Consent state management may be incomplete');
      }
      
      if (content.includes('gtag') && content.includes('consent')) {
        this.addPass('Google Analytics consent integration found');
      } else {
        this.addWarning('Google Analytics consent integration not found');
      }
    } else {
      this.addIssue('Consent management component not found');
    }
  }

  // Check health endpoint security
  checkHealthEndpoint() {
    this.log('info', 'Checking health endpoint security...');
    
    const healthFile = path.join(process.cwd(), 'src/app/api/health/route.ts');
    if (fs.existsSync(healthFile)) {
      this.addPass('Health endpoint exists');
      
      const content = fs.readFileSync(healthFile, 'utf8');
      
      if (content.includes('validateEnvironment')) {
        this.addPass('Environment validation in health endpoint');
      } else {
        this.addWarning('Environment validation not found in health endpoint');
      }
      
      if (content.includes('redactIP') || content.includes('redactPII')) {
        this.addPass('PII redaction in health endpoint');
      } else {
        this.addWarning('PII redaction not found in health endpoint');
      }
    } else {
      this.addIssue('Health endpoint not found');
    }
  }

  // Generate security report
  generateReport() {
    const duration = Date.now() - this.startTime;
    const report = {
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      summary: {
        total: this.issues.length + this.warnings.length + this.passed.length,
        issues: this.issues.length,
        warnings: this.warnings.length,
        passed: this.passed.length,
        score: Math.round((this.passed.length / (this.issues.length + this.warnings.length + this.passed.length)) * 100)
      },
      issues: this.issues,
      warnings: this.warnings,
      passed: this.passed
    };
    
    // Save report
    const reportPath = path.join(process.cwd(), 'qa_reports', 'security-audit.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Display summary
    console.log('\n' + '='.repeat(60));
    console.log('SECURITY AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Checks: ${report.summary.total}`);
    console.log(`Issues: ${report.summary.issues}`);
    console.log(`Warnings: ${report.summary.warnings}`);
    console.log(`Passed: ${report.summary.passed}`);
    console.log(`Security Score: ${report.summary.score}%`);
    console.log(`Duration: ${report.summary.duration}`);
    console.log('='.repeat(60));
    
    if (this.issues.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      this.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.message}`);
      });
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.message}`);
      });
    }
    
    console.log(`\n📊 Report saved to: ${reportPath}`);
    
    return report;
  }

  // Run all security checks
  async run() {
    console.log('🔒 Starting OMGsystems Security Audit...\n');
    
    this.checkEnvironmentVariables();
    this.checkSecurityHeaders();
    this.checkCSPConfiguration();
    this.checkRateLimiting();
    this.checkAuthenticationSecurity();
    this.checkDataProtection();
    this.checkConsentManagement();
    this.checkHealthEndpoint();
    
    const report = this.generateReport();
    
    // Exit with appropriate code
    if (this.issues.length > 0) {
      process.exit(1);
    } else if (this.warnings.length > 0) {
      process.exit(2);
    } else {
      process.exit(0);
    }
  }
}

// Run the audit
if (require.main === module) {
  const auditor = new SecurityAuditor();
  auditor.run().catch(console.error);
}

module.exports = SecurityAuditor;
