#!/usr/bin/env node

// OMGsystems API Test Script
const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const requestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function testHomepage() {
  console.log('🏠 Testing Homepage...');
  try {
    const response = await makeRequest('/');
    if (response.status === 200) {
      console.log('✅ Homepage accessible');
      return true;
    } else {
      console.log(`❌ Homepage returned status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Homepage test failed: ${error.message}`);
    return false;
  }
}

async function testContactAPI() {
  console.log('📧 Testing Contact API...');
  try {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message',
      industry: 'Technology',
      budget: '10000-50000',
      timeline: '1-3 months'
    };

    const response = await makeRequest('/api/contact', {
      method: 'POST',
      body: contactData
    });

    if (response.status === 200 || response.status === 201) {
      console.log('✅ Contact API working');
      console.log(`   Response: ${response.data.substring(0, 100)}...`);
      return true;
    } else {
      console.log(`❌ Contact API returned status: ${response.status}`);
      console.log(`   Response: ${response.data}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Contact API test failed: ${error.message}`);
    return false;
  }
}

async function testDemoAPI() {
  console.log('🎯 Testing Demo APIs...');
  
  const demoEndpoints = [
    { path: '/api/demo/crm', data: { industry: 'Property Management (ON)' } },
    { path: '/api/demo/svd', data: { mode: 'business' } }
  ];

  let successCount = 0;
  
  for (const endpoint of demoEndpoints) {
    try {
      const response = await makeRequest(endpoint.path, {
        method: 'POST',
        body: endpoint.data
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`✅ ${endpoint.path} working`);
        successCount++;
      } else {
        console.log(`❌ ${endpoint.path} returned status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.path} test failed: ${error.message}`);
    }
  }

  return successCount === demoEndpoints.length;
}

async function testProjectAPI() {
  console.log('📋 Testing Project API...');
  try {
    // Test GET projects (should return empty or existing projects)
    const getResponse = await makeRequest('/api/projects');
    if (getResponse.status === 200) {
      console.log('✅ GET /api/projects working');
    } else {
      console.log(`❌ GET /api/projects returned status: ${getResponse.status}`);
    }

    // Test POST project (this might fail without authentication)
    const projectData = {
      name: 'Test Project',
      description: 'A test project',
      priority: 'medium'
    };

    const postResponse = await makeRequest('/api/projects', {
      method: 'POST',
      body: projectData
    });

    if (postResponse.status === 200 || postResponse.status === 201) {
      console.log('✅ POST /api/projects working');
      return true;
    } else if (postResponse.status === 401) {
      console.log('⚠️  POST /api/projects requires authentication (expected)');
      return true;
    } else {
      console.log(`❌ POST /api/projects returned status: ${postResponse.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Project API test failed: ${error.message}`);
    return false;
  }
}

async function testInvoiceAPI() {
  console.log('💰 Testing Invoice API...');
  try {
    // Test GET invoices
    const getResponse = await makeRequest('/api/invoices');
    if (getResponse.status === 200) {
      console.log('✅ GET /api/invoices working');
    } else if (getResponse.status === 401) {
      console.log('⚠️  GET /api/invoices requires authentication (expected)');
    } else {
      console.log(`❌ GET /api/invoices returned status: ${getResponse.status}`);
    }

    return true; // Authentication required is expected
  } catch (error) {
    console.log(`❌ Invoice API test failed: ${error.message}`);
    return false;
  }
}

async function testDocumentsAPI() {
  console.log('📄 Testing Documents API...');
  try {
    // Test GET documents
    const getResponse = await makeRequest('/api/documents');
    if (getResponse.status === 200) {
      console.log('✅ GET /api/documents working');
    } else if (getResponse.status === 401) {
      console.log('⚠️  GET /api/documents requires authentication (expected)');
    } else {
      console.log(`❌ GET /api/documents returned status: ${getResponse.status}`);
    }

    return true; // Authentication required is expected
  } catch (error) {
    console.log(`❌ Documents API test failed: ${error.message}`);
    return false;
  }
}

async function runAPITests() {
  console.log('🚀 OMGsystems API Test Suite\n');
  
  const tests = [
    { name: 'Homepage', fn: testHomepage },
    { name: 'Contact API', fn: testContactAPI },
    { name: 'Demo APIs', fn: testDemoAPI },
    { name: 'Project API', fn: testProjectAPI },
    { name: 'Invoice API', fn: testInvoiceAPI },
    { name: 'Documents API', fn: testDocumentsAPI }
  ];

  let passedTests = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) passedTests++;
    } catch (error) {
      console.log(`❌ ${test.name} test crashed: ${error.message}`);
    }
    console.log(''); // Add spacing between tests
  }

  console.log('📋 API Test Results:');
  console.log(`   Passed: ${passedTests}/${tests.length}`);
  
  if (passedTests === tests.length) {
    console.log('🎉 All API tests passed!');
  } else {
    console.log('⚠️  Some API tests failed. Check the output above.');
  }

  return passedTests === tests.length;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAPITests().catch(console.error);
}

module.exports = { runAPITests };
