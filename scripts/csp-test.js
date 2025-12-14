#!/usr/bin/env node

/**
 * OMGsystems CSP (Content Security Policy) Test Script
 * 
 * Tests CSP implementation by:
 * - Validating CSP headers
 * - Testing CSP violation reporting
 * - Checking nonce generation
 * - Verifying CSP policy syntax
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class CSPTester {
  constructor() {
    this.results = [];
    this.violations = [];
    this.startTime = Date.now();
  }

  log(level, message, details = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${level.toUpperCase()}] ${message}`);
    if (details) {
      console.log(`  Details: ${JSON.stringify(details, null, 2)}`);
    }
  }

  addResult(test, status, message, details = null) {
    this.results.push({
      test,
      status,
      message,
      details,
      timestamp: new Date().toISOString()
    });
    
    const level = status === 'pass' ? 'info' : status === 'warn' ? 'warn' : 'error';
    this.log(level, `${test}: ${message}`, details);
  }

  // Test CSP header presence and format
  async testCSPHeaders(baseUrl = 'http://localhost:3000') {
    this.log('info', 'Testing CSP headers...');
    
    try {
      const response = await this.makeRequest(`${baseUrl}/`);
      const cspHeader = response.headers['content-security-policy'];
      const cspReportOnlyHeader = response.headers['content-security-policy-report-only'];
      
      if (cspHeader) {
        this.addResult('CSP Header Present', 'pass', 'Content-Security-Policy header found');
        this.validateCSPPolicy(cspHeader, 'enforced');
      } else if (cspReportOnlyHeader) {
        this.addResult('CSP Header Present', 'warn', 'Content-Security-Policy-Report-Only header found (not enforced)');
        this.validateCSPPolicy(cspReportOnlyHeader, 'report-only');
      } else {
        this.addResult('CSP Header Present', 'fail', 'No CSP header found');
      }
      
      // Check other security headers
      this.checkSecurityHeaders(response.headers);
      
    } catch (error) {
      this.addResult('CSP Headers Test', 'fail', `Failed to test CSP headers: ${error.message}`);
    }
  }

  // Validate CSP policy syntax and directives
  validateCSPPolicy(policy, mode) {
    this.log('info', `Validating CSP policy (${mode})...`);
    
    const directives = policy.split(';').map(d => d.trim()).filter(d => d);
    const requiredDirectives = [
      'default-src',
      'script-src',
      'style-src',
      'img-src',
      'connect-src',
      'frame-src',
      'object-src',
      'base-uri',
      'form-action',
      'frame-ancestors'
    ];
    
    const foundDirectives = directives.map(d => d.split(' ')[0]);
    
    // Check for required directives
    requiredDirectives.forEach(directive => {
      if (foundDirectives.includes(directive)) {
        this.addResult(`CSP Directive: ${directive}`, 'pass', `Required directive found`);
      } else {
        this.addResult(`CSP Directive: ${directive}`, 'warn', `Recommended directive missing`);
      }
    });
    
    // Check for dangerous directives
    const dangerousPatterns = [
      /script-src\s+['"]?\*['"]?/,
      /object-src\s+['"]?\*['"]?/,
      /base-uri\s+['"]?\*['"]?/
    ];
    
    dangerousPatterns.forEach((pattern, index) => {
      if (pattern.test(policy)) {
        this.addResult('CSP Security Check', 'fail', `Dangerous wildcard found in CSP policy`);
      } else {
        this.addResult('CSP Security Check', 'pass', `No dangerous wildcards found`);
      }
    });
    
    // Check for nonce usage
    if (policy.includes('nonce-')) {
      this.addResult('CSP Nonce Usage', 'pass', 'Nonce-based CSP implementation found');
    } else {
      this.addResult('CSP Nonce Usage', 'warn', 'Nonce-based CSP not implemented');
    }
    
    // Check for unsafe-inline
    if (policy.includes('unsafe-inline')) {
      this.addResult('CSP Unsafe Inline', 'warn', 'unsafe-inline found in CSP policy');
    } else {
      this.addResult('CSP Unsafe Inline', 'pass', 'No unsafe-inline found');
    }
    
    // Check for unsafe-eval
    if (policy.includes('unsafe-eval')) {
      this.addResult('CSP Unsafe Eval', 'fail', 'unsafe-eval found in CSP policy');
    } else {
      this.addResult('CSP Unsafe Eval', 'pass', 'No unsafe-eval found');
    }
  }

  // Check other security headers
  checkSecurityHeaders(headers) {
    const securityHeaders = {
      'strict-transport-security': 'HSTS header',
      'x-content-type-options': 'X-Content-Type-Options header',
      'x-frame-options': 'X-Frame-Options header',
      'x-xss-protection': 'X-XSS-Protection header',
      'referrer-policy': 'Referrer-Policy header',
      'permissions-policy': 'Permissions-Policy header'
    };
    
    Object.entries(securityHeaders).forEach(([header, description]) => {
      if (headers[header]) {
        this.addResult(`Security Header: ${description}`, 'pass', `${description} found`);
      } else {
        this.addResult(`Security Header: ${description}`, 'warn', `${description} missing`);
      }
    });
  }

  // Test CSP violation reporting
  async testCSPViolationReporting(baseUrl = 'http://localhost:3000') {
    this.log('info', 'Testing CSP violation reporting...');
    
    try {
      // Test if CSP violation reporting endpoint exists
      const response = await this.makeRequest(`${baseUrl}/api/csp-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'csp-report': {
            'blocked-uri': 'http://example.com/malicious.js',
            'document-uri': `${baseUrl}/`,
            'effective-directive': 'script-src',
            'original-policy': 'script-src \'self\'',
            'referrer': '',
            'source-file': '',
            'violated-directive': 'script-src'
          }
        })
      });
      
      if (response.statusCode === 200) {
        this.addResult('CSP Violation Reporting', 'pass', 'CSP violation reporting endpoint working');
      } else {
        this.addResult('CSP Violation Reporting', 'fail', `CSP violation reporting endpoint returned ${response.statusCode}`);
      }
      
    } catch (error) {
      this.addResult('CSP Violation Reporting', 'fail', `Failed to test CSP violation reporting: ${error.message}`);
    }
  }

  // Test nonce generation
  testNonceGeneration() {
    this.log('info', 'Testing nonce generation...');
    
    const securityFile = path.join(process.cwd(), 'src/lib/security.ts');
    if (fs.existsSync(securityFile)) {
      const content = fs.readFileSync(securityFile, 'utf8');
      
      if (content.includes('generateNonce')) {
        this.addResult('Nonce Generation Function', 'pass', 'Nonce generation function found');
      } else {
        this.addResult('Nonce Generation Function', 'fail', 'Nonce generation function not found');
      }
      
      if (content.includes('crypto.randomBytes')) {
        this.addResult('Cryptographically Secure Nonce', 'pass', 'Cryptographically secure nonce generation found');
      } else {
        this.addResult('Cryptographically Secure Nonce', 'fail', 'Cryptographically secure nonce generation not found');
      }
    } else {
      this.addResult('Nonce Generation', 'fail', 'Security configuration file not found');
    }
  }

  // Test CSP in different pages
  async testCSPOnPages(baseUrl = 'http://localhost:3000') {
    this.log('info', 'Testing CSP on different pages...');
    
    const pages = [
      '/',
      '/about',
      '/contact',
      '/trust',
      '/legal/privacy',
      '/legal/cookies'
    ];
    
    for (const page of pages) {
      try {
        const response = await this.makeRequest(`${baseUrl}${page}`);
        const cspHeader = response.headers['content-security-policy'] || 
                         response.headers['content-security-policy-report-only'];
        
        if (cspHeader) {
          this.addResult(`CSP on ${page}`, 'pass', `CSP header present on ${page}`);
        } else {
          this.addResult(`CSP on ${page}`, 'warn', `No CSP header on ${page}`);
        }
      } catch (error) {
        this.addResult(`CSP on ${page}`, 'fail', `Failed to test CSP on ${page}: ${error.message}`);
      }
    }
  }

  // Make HTTP request
  makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const isHttps = url.startsWith('https://');
      const client = isHttps ? https : http;
      
      const requestOptions = {
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'OMGsystems-CSP-Tester/1.0',
          ...options.headers
        },
        timeout: 10000
      };
      
      const req = client.request(url, requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });
      
      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Request timeout')));
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }

  // Generate CSP test report
  generateReport() {
    const duration = Date.now() - this.startTime;
    const passed = this.results.filter(r => r.status === 'pass').length;
    const warnings = this.results.filter(r => r.status === 'warn').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const total = this.results.length;
    
    const report = {
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      summary: {
        total,
        passed,
        warnings,
        failed,
        score: Math.round((passed / total) * 100)
      },
      results: this.results
    };
    
    // Save report
    const reportPath = path.join(process.cwd(), 'qa_reports', 'csp-test.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Display summary
    console.log('\n' + '='.repeat(60));
    console.log('CSP TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Warnings: ${warnings}`);
    console.log(`Failed: ${failed}`);
    console.log(`Score: ${report.summary.score}%`);
    console.log(`Duration: ${report.summary.duration}`);
    console.log('='.repeat(60));
    
    if (failed > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.results.filter(r => r.status === 'fail').forEach((result, index) => {
        console.log(`${index + 1}. ${result.test}: ${result.message}`);
      });
    }
    
    if (warnings > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.results.filter(r => r.status === 'warn').forEach((result, index) => {
        console.log(`${index + 1}. ${result.test}: ${result.message}`);
      });
    }
    
    console.log(`\n📊 Report saved to: ${reportPath}`);
    
    return report;
  }

  // Run all CSP tests
  async run(baseUrl = 'http://localhost:3000') {
    console.log('🛡️  Starting OMGsystems CSP Tests...\n');
    
    await this.testCSPHeaders(baseUrl);
    await this.testCSPViolationReporting(baseUrl);
    this.testNonceGeneration();
    await this.testCSPOnPages(baseUrl);
    
    const report = this.generateReport();
    
    // Exit with appropriate code
    const failed = this.results.filter(r => r.status === 'fail').length;
    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}

// Run the tests
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const tester = new CSPTester();
  tester.run(baseUrl).catch(console.error);
}

module.exports = CSPTester;
