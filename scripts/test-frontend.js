#!/usr/bin/env node

// OMGsystems Frontend Test Script
const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data,
          contentType: res.headers['content-type']
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testPage(path, name) {
  console.log(`🌐 Testing ${name}...`);
  try {
    const response = await makeRequest(path);
    
    if (response.status === 200) {
      // Check if it's HTML content
      if (response.contentType && response.contentType.includes('text/html')) {
        // Check for common HTML elements
        const hasTitle = response.data.includes('<title>');
        const hasBody = response.data.includes('<body>');
        const hasNextScript = response.data.includes('__NEXT_DATA__');
        
        if (hasTitle && hasBody && hasNextScript) {
          console.log(`✅ ${name}: LOADED SUCCESSFULLY`);
          return true;
        } else {
          console.log(`⚠️  ${name}: LOADED BUT MISSING ELEMENTS`);
          return false;
        }
      } else {
        console.log(`⚠️  ${name}: WRONG CONTENT TYPE (${response.contentType})`);
        return false;
      }
    } else {
      console.log(`❌ ${name}: HTTP ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return false;
  }
}

async function testAPIEndpoint(path, name, method = 'GET', body = null) {
  console.log(`🔌 Testing ${name}...`);
  try {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log(`✅ ${name}: SUCCESS (${res.statusCode})`);
        } else if (res.statusCode === 401) {
          console.log(`⚠️  ${name}: REQUIRES AUTH (${res.statusCode})`);
        } else {
          console.log(`❌ ${name}: HTTP ${res.statusCode}`);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${name}: ${error.message}`);
    });

    req.on('timeout', () => {
      console.log(`❌ ${name}: TIMEOUT`);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
    return true;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return false;
  }
}

async function runFrontendTests() {
  console.log('🚀 OMGsystems Frontend Test Suite\n');
  
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About Page' },
    { path: '/contact', name: 'Contact Page' },
    { path: '/login', name: 'Login Page' },
    { path: '/signup', name: 'Signup Page' },
    { path: '/industries', name: 'Industries Page' },
    { path: '/industries/accounting', name: 'Accounting Industry Page' },
    { path: '/industries/cleaning', name: 'Cleaning Industry Page' },
    { path: '/industries/real-estate', name: 'Real Estate Industry Page' },
    { path: '/apps/crm', name: 'CRM App Page' },
    { path: '/apps/leadflow', name: 'LeadFlow App Page' },
    { path: '/apps/securevault', name: 'SecureVault App Page' },
    { path: '/apps/securevault-docs', name: 'SecureVault Docs Page' }
  ];

  const apiEndpoints = [
    { path: '/api/contact', name: 'Contact API', method: 'POST', body: { name: 'Test', email: 'test@example.com', message: 'Test message', industry: 'Technology' } },
    { path: '/api/demo/crm', name: 'CRM Demo API', method: 'POST', body: { industry: 'Property Management (ON)' } },
    { path: '/api/demo/svd', name: 'SVD Demo API', method: 'POST', body: { mode: 'business' } },
    { path: '/api/projects', name: 'Projects API (GET)', method: 'GET' },
    { path: '/api/invoices', name: 'Invoices API (GET)', method: 'GET' },
    { path: '/api/documents', name: 'Documents API (GET)', method: 'GET' }
  ];

  let pageResults = [];
  let apiResults = [];

  console.log('📄 Testing Pages...\n');
  for (const page of pages) {
    const result = await testPage(page.path, page.name);
    pageResults.push(result);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between requests
  }

  console.log('\n🔌 Testing API Endpoints...\n');
  for (const endpoint of apiEndpoints) {
    const result = await testAPIEndpoint(endpoint.path, endpoint.name, endpoint.method, endpoint.body);
    apiResults.push(result);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between requests
  }

  // Calculate results
  const pagePassed = pageResults.filter(r => r === true).length;
  const apiPassed = apiResults.filter(r => r === true).length;

  console.log('\n📋 Frontend Test Results:');
  console.log(`   Pages: ${pagePassed}/${pages.length} passed`);
  console.log(`   API Endpoints: ${apiPassed}/${apiEndpoints.length} passed`);
  
  if (pagePassed === pages.length && apiPassed === apiEndpoints.length) {
    console.log('\n🎉 All frontend tests passed!');
  } else {
    console.log('\n⚠️  Some frontend tests failed. Check the output above.');
  }

  console.log('\n💡 Next Steps:');
  console.log('   1. Test user authentication flow');
  console.log('   2. Test form submissions');
  console.log('   3. Test protected routes');
  console.log('   4. Test responsive design');
  console.log('   5. Test file uploads');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runFrontendTests().catch(console.error);
}

module.exports = { runFrontendTests };
