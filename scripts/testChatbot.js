#!/usr/bin/env node

/**
 * Comprehensive Chatbot Testing Script
 * 
 * This script tests the chatbot system with various queries including:
 * - Valid public content queries
 * - Disallowed content queries
 * - Edge cases and error handling
 * - Performance testing
 */

// Use built-in fetch for Node.js 18+ or import node-fetch for older versions
const fetch = globalThis.fetch || require('node-fetch');

const BASE_URL = process.env.CHATBOT_TEST_URL || 'http://localhost:3000';
const API_ENDPOINT = `${BASE_URL}/api/chatbot`;

// Test cases organized by category
const TEST_CASES = {
  validQueries: [
    {
      name: "Property Management Automations",
      query: "What automations do you offer for property management?",
      expectedConfidence: 0.6,
      shouldEscalate: false
    },
    {
      name: "Data Security",
      query: "How secure is my data with OMGsystems?",
      expectedConfidence: 0.5,
      shouldEscalate: false
    },
    {
      name: "Industries Served",
      query: "What industries do you serve?",
      expectedConfidence: 0.6,
      shouldEscalate: false
    },
    {
      name: "CRM Features",
      query: "Tell me about your CRM app features",
      expectedConfidence: 0.5,
      shouldEscalate: false
    },
    {
      name: "Lead Capture",
      query: "How can I automate lead capture?",
      expectedConfidence: 0.5,
      shouldEscalate: false
    }
  ],
  
  disallowedQueries: [
    {
      name: "Internal Pricing",
      query: "What is the internal pricing for admin users?",
      expectedEscalation: true,
      escalationType: "internal"
    },
    {
      name: "Back Office Access",
      query: "How do I access the back office admin panel?",
      expectedEscalation: true,
      escalationType: "admin"
    },
    {
      name: "Client Data",
      query: "Show me client-specific project details",
      expectedEscalation: true,
      escalationType: "internal"
    },
    {
      name: "Database Schema",
      query: "What is the database schema for user accounts?",
      expectedEscalation: true,
      escalationType: "internal"
    }
  ],
  
  edgeCases: [
    {
      name: "Empty Query",
      query: "",
      expectedError: true
    },
    {
      name: "Very Long Query",
      query: "a".repeat(2000),
      expectedError: true
    },
    {
      name: "Special Characters",
      query: "!@#$%^&*()_+{}|:<>?[]\\;'\",./",
      expectedConfidence: 0.0,
      shouldEscalate: true
    },
    {
      name: "Non-English",
      query: "¿Cómo puedo automatizar mi negocio?",
      expectedConfidence: 0.0,
      shouldEscalate: true
    }
  ],
  
  performanceTests: [
    {
      name: "Rapid Requests",
      queries: [
        "What automations do you offer?",
        "How secure is my data?",
        "What industries do you serve?",
        "Tell me about your CRM",
        "How can I automate workflows?"
      ],
      concurrent: true
    }
  ]
};

// Test result tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  errors: []
};

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function logTestResult(testName, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    log(`PASS: ${testName}`, 'success');
  } else {
    testResults.failed++;
    testResults.errors.push({ test: testName, details });
    log(`FAIL: ${testName} - ${details}`, 'error');
  }
}

// API call function
async function callChatbotAPI(query, sessionId = 'test-session') {
  try {
    const startTime = Date.now();
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: query,
        sessionId: sessionId,
        userId: `test-user-${Date.now()}`
      })
    });
    
    const responseTime = Date.now() - startTime;
    const data = await response.json();
    
    return {
      success: response.ok,
      data,
      responseTime,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      responseTime: 0,
      status: 0
    };
  }
}

// Test individual query
async function testQuery(testCase) {
  log(`Testing: ${testCase.name}`);
  
  const result = await callChatbotAPI(testCase.query);
  
  if (!result.success) {
    if (testCase.expectedError) {
      logTestResult(testCase.name, true, 'Expected error occurred');
      return;
    } else {
      logTestResult(testCase.name, false, `API call failed: ${result.error}`);
      return;
    }
  }
  
  const { data } = result;
  
  // Check response structure
  if (!data.answer) {
    logTestResult(testCase.name, false, 'Missing answer in response');
    return;
  }
  
  // Check confidence if expected
  if (testCase.expectedConfidence !== undefined) {
    const confidenceMatch = Math.abs((data.confidence || 0) - testCase.expectedConfidence) < 0.2;
    if (!confidenceMatch) {
      logTestResult(testCase.name, false, 
        `Confidence mismatch: expected ~${testCase.expectedConfidence}, got ${data.confidence}`);
      return;
    }
  }
  
  // Check escalation if expected
  if (testCase.shouldEscalate !== undefined) {
    if (data.shouldEscalate !== testCase.shouldEscalate) {
      logTestResult(testCase.name, false, 
        `Escalation mismatch: expected ${testCase.shouldEscalate}, got ${data.shouldEscalate}`);
      return;
    }
  }
  
  // Check escalation type if expected
  if (testCase.escalationType && data.escalationType !== testCase.escalationType) {
    logTestResult(testCase.name, false, 
      `Escalation type mismatch: expected ${testCase.escalationType}, got ${data.escalationType}`);
    return;
  }
  
  // Check response time (should be reasonable)
  if (result.responseTime > 10000) {
    logTestResult(testCase.name, false, `Response too slow: ${result.responseTime}ms`);
    return;
  }
  
  logTestResult(testCase.name, true, 
    `Response time: ${result.responseTime}ms, Confidence: ${data.confidence}, Escalation: ${data.shouldEscalate}`);
}

// Test concurrent requests
async function testConcurrentRequests(testCase) {
  log(`Testing concurrent requests: ${testCase.name}`);
  
  const promises = testCase.queries.map(query => callChatbotAPI(query));
  const results = await Promise.all(promises);
  
  const successCount = results.filter(r => r.success).length;
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  
  if (successCount === testCase.queries.length) {
    logTestResult(testCase.name, true, 
      `All ${successCount} requests succeeded, avg response time: ${avgResponseTime.toFixed(0)}ms`);
  } else {
    logTestResult(testCase.name, false, 
      `Only ${successCount}/${testCase.queries.length} requests succeeded`);
  }
}

// Rate limiting test
async function testRateLimiting() {
  log('Testing rate limiting...');
  
  const requests = [];
  for (let i = 0; i < 15; i++) {
    requests.push(callChatbotAPI(`Test query ${i}`));
  }
  
  const results = await Promise.all(requests);
  const rateLimitedCount = results.filter(r => r.status === 429).length;
  
  if (rateLimitedCount > 0) {
    logTestResult('Rate Limiting', true, `${rateLimitedCount} requests were rate limited`);
  } else {
    logTestResult('Rate Limiting', false, 'No requests were rate limited (rate limiting may not be working)');
  }
}

// Main test runner
async function runTests() {
  log('🚀 Starting Chatbot System Tests', 'info');
  log(`Testing against: ${API_ENDPOINT}`, 'info');
  
  // Test API health
  try {
    const healthResponse = await fetch(`${BASE_URL}/api/chatbot`, { method: 'GET' });
    if (healthResponse.ok) {
      log('✅ API health check passed', 'success');
    } else {
      log('❌ API health check failed', 'error');
      process.exit(1);
    }
  } catch (error) {
    log(`❌ Cannot connect to API: ${error.message}`, 'error');
    log('Make sure the development server is running on localhost:3000', 'warning');
    process.exit(1);
  }
  
  // Run valid query tests
  log('\n📋 Testing Valid Queries...', 'info');
  for (const testCase of TEST_CASES.validQueries) {
    await testQuery(testCase);
  }
  
  // Run disallowed query tests
  log('\n🚫 Testing Disallowed Queries...', 'info');
  for (const testCase of TEST_CASES.disallowedQueries) {
    await testQuery(testCase);
  }
  
  // Run edge case tests
  log('\n🔍 Testing Edge Cases...', 'info');
  for (const testCase of TEST_CASES.edgeCases) {
    await testQuery(testCase);
  }
  
  // Run performance tests
  log('\n⚡ Testing Performance...', 'info');
  for (const testCase of TEST_CASES.performanceTests) {
    await testConcurrentRequests(testCase);
  }
  
  // Test rate limiting
  log('\n🛡️ Testing Rate Limiting...', 'info');
  await testRateLimiting();
  
  // Print summary
  log('\n📊 Test Summary:', 'info');
  log(`Total Tests: ${testResults.total}`, 'info');
  log(`Passed: ${testResults.passed}`, 'success');
  log(`Failed: ${testResults.failed}`, testResults.failed > 0 ? 'error' : 'success');
  
  if (testResults.errors.length > 0) {
    log('\n❌ Failed Tests:', 'error');
    testResults.errors.forEach(error => {
      log(`  - ${error.test}: ${error.details}`, 'error');
    });
  }
  
  const successRate = (testResults.passed / testResults.total * 100).toFixed(1);
  log(`\n🎯 Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
  
  if (testResults.failed > 0) {
    process.exit(1);
  } else {
    log('\n🎉 All tests passed!', 'success');
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(error => {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { runTests, testQuery, callChatbotAPI };
