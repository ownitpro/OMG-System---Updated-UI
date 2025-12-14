#!/usr/bin/env node

// OMGsystems System Test Script
const { PrismaClient } = require('../src/generated/prisma');
const fetch = require('node-fetch');

const prisma = new PrismaClient();

async function testDatabase() {
  console.log('🔍 Testing Database Connection...');
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test basic queries
    const userCount = await prisma.user.count();
    const orgCount = await prisma.organization.count();
    const projectCount = await prisma.project.count();
    
    console.log(`📊 Database Stats:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Organizations: ${orgCount}`);
    console.log(`   Projects: ${projectCount}`);
    
    return true;
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    return false;
  }
}

async function testAPI() {
  console.log('\n🌐 Testing API Endpoints...');
  
  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test homepage
    const homeResponse = await fetch(`${baseUrl}/`);
    if (homeResponse.ok) {
      console.log('✅ Homepage accessible');
    } else {
      console.log('❌ Homepage not accessible');
    }
    
    // Test contact API
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message',
      industry: 'Technology'
    };
    
    const contactResponse = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    
    if (contactResponse.ok) {
      console.log('✅ Contact API working');
    } else {
      console.log('❌ Contact API failed');
    }
    
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    return false;
  }
}

async function createTestData() {
  console.log('\n🆕 Creating Test Data...');
  
  try {
    // Create test organization
    const testOrg = await prisma.organization.upsert({
      where: { slug: 'omgsystems-demo' },
      update: {},
      create: {
        name: 'OMGsystems Demo',
        slug: 'omgsystems-demo',
        description: 'Demo organization for testing',
        industry: 'Technology',
        size: 'Small'
      }
    });
    
    console.log(`✅ Organization: ${testOrg.name}`);
    
    // Create test user
    const testUser = await prisma.user.upsert({
      where: { email: 'demo@omgsystems.com' },
      update: {},
      create: {
        email: 'demo@omgsystems.com',
        name: 'Demo User'
      }
    });
    
    console.log(`✅ User: ${testUser.name}`);
    
    // Create membership
    const membership = await prisma.userMembership.upsert({
      where: {
        userId_organizationId: {
          userId: testUser.id,
          organizationId: testOrg.id
        }
      },
      update: {},
      create: {
        userId: testUser.id,
        organizationId: testOrg.id,
        role: 'ADMIN'
      }
    });
    
    console.log(`✅ Membership created`);
    
    // Create test project
    const testProject = await prisma.project.create({
      data: {
        name: 'Demo Project',
        description: 'A demo project for testing',
        organizationId: testOrg.id,
        userId: testUser.id,
        status: 'PLANNING'
      }
    });
    
    console.log(`✅ Project: ${testProject.name}`);
    
    return true;
  } catch (error) {
    console.error('❌ Test data creation failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 OMGsystems System Test\n');
  
  const dbTest = await testDatabase();
  const apiTest = await testAPI();
  const dataTest = await createTestData();
  
  console.log('\n📋 Test Results:');
  console.log(`   Database: ${dbTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   API: ${apiTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Test Data: ${dataTest ? '✅ PASS' : '❌ FAIL'}`);
  
  if (dbTest && apiTest && dataTest) {
    console.log('\n🎉 All tests passed! System is ready for development.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
  }
  
  await prisma.$disconnect();
}

runTests().catch(console.error);
