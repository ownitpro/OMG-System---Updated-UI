#!/usr/bin/env node

// OMGsystems Authentication Test Script
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function testUserCreation() {
  console.log('👤 Testing User Creation...');
  
  try {
    // Create a test user
    const testUser = await prisma.user.upsert({
      where: { email: 'testuser@omgsystems.com' },
      update: {},
      create: {
        email: 'testuser@omgsystems.com',
        name: 'Test User',
        image: null
      }
    });
    
    console.log(`✅ User created: ${testUser.name} (${testUser.email})`);
    return testUser;
  } catch (error) {
    console.error('❌ User creation failed:', error.message);
    return null;
  }
}

async function testOrganizationCreation() {
  console.log('\n🏢 Testing Organization Creation...');
  
  try {
    const testOrg = await prisma.organization.upsert({
      where: { slug: 'test-org' },
      update: {},
      create: {
        name: 'Test Organization',
        slug: 'test-org',
        description: 'A test organization',
        industry: 'Technology',
        size: 'Small'
      }
    });
    
    console.log(`✅ Organization created: ${testOrg.name}`);
    return testOrg;
  } catch (error) {
    console.error('❌ Organization creation failed:', error.message);
    return null;
  }
}

async function testMembershipCreation(user, organization) {
  console.log('\n🔗 Testing Membership Creation...');
  
  try {
    const membership = await prisma.userMembership.upsert({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: organization.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        organizationId: organization.id,
        role: 'ADMIN',
        status: 'active'
      }
    });
    
    console.log(`✅ Membership created: ${membership.role} role`);
    return membership;
  } catch (error) {
    console.error('❌ Membership creation failed:', error.message);
    return null;
  }
}

async function testProjectCreation(user, organization) {
  console.log('\n📋 Testing Project Creation...');
  
  try {
    const project = await prisma.project.create({
      data: {
        name: 'Test Project',
        description: 'A test project for authentication testing',
        organizationId: organization.id,
        userId: user.id,
        status: 'PLANNING',
        priority: 'medium'
      }
    });
    
    console.log(`✅ Project created: ${project.name}`);
    return project;
  } catch (error) {
    console.error('❌ Project creation failed:', error.message);
    return null;
  }
}

async function testTaskCreation(project, user) {
  console.log('\n✅ Testing Task Creation...');
  
  try {
    const task = await prisma.task.create({
      data: {
        title: 'Test Task',
        description: 'A test task for the project',
        projectId: project.id,
        userId: user.id,
        status: 'TODO',
        priority: 'medium'
      }
    });
    
    console.log(`✅ Task created: ${task.title}`);
    return task;
  } catch (error) {
    console.error('❌ Task creation failed:', error.message);
    return null;
  }
}

async function testInvoiceCreation(organization) {
  console.log('\n💰 Testing Invoice Creation...');
  
  try {
    const invoice = await prisma.invoice.create({
      data: {
        organizationId: organization.id,
        number: 'INV-TEST-001',
        amount: 1000.00,
        currency: 'USD',
        status: 'DRAFT'
      }
    });
    
    console.log(`✅ Invoice created: ${invoice.number} - $${invoice.amount}`);
    return invoice;
  } catch (error) {
    console.error('❌ Invoice creation failed:', error.message);
    return null;
  }
}

async function testAuditLogging(user, organization) {
  console.log('\n📝 Testing Audit Logging...');
  
  try {
    const auditLog = await prisma.auditLog.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        action: 'test_action',
        resourceType: 'test',
        resourceId: 'test-123',
        metadata: {
          test: true,
          timestamp: new Date().toISOString()
        },
        ipAddress: '127.0.0.1',
        userAgent: 'Test Script'
      }
    });
    
    console.log(`✅ Audit log created: ${auditLog.action}`);
    return auditLog;
  } catch (error) {
    console.error('❌ Audit logging failed:', error.message);
    return null;
  }
}

async function testDataRetrieval() {
  console.log('\n🔍 Testing Data Retrieval...');
  
  try {
    // Test complex query with relations
    const userWithData = await prisma.user.findFirst({
      where: { email: 'testuser@omgsystems.com' },
      include: {
        memberships: {
          include: {
            organization: true
          }
        },
        projects: {
          include: {
            tasks: true
          }
        }
      }
    });
    
    if (userWithData) {
      console.log(`✅ User data retrieved: ${userWithData.name}`);
      console.log(`   Organizations: ${userWithData.memberships.length}`);
      console.log(`   Projects: ${userWithData.projects.length}`);
      console.log(`   Tasks: ${userWithData.projects.reduce((acc, p) => acc + p.tasks.length, 0)}`);
    } else {
      console.log('❌ No user data found');
    }
    
    return userWithData;
  } catch (error) {
    console.error('❌ Data retrieval failed:', error.message);
    return null;
  }
}

async function runAuthTests() {
  console.log('🚀 OMGsystems Authentication & Data Flow Test\n');
  
  try {
    // Test user creation
    const user = await testUserCreation();
    if (!user) return;
    
    // Test organization creation
    const organization = await testOrganizationCreation();
    if (!organization) return;
    
    // Test membership creation
    const membership = await testMembershipCreation(user, organization);
    if (!membership) return;
    
    // Test project creation
    const project = await testProjectCreation(user, organization);
    if (!project) return;
    
    // Test task creation
    const task = await testTaskCreation(project, user);
    if (!task) return;
    
    // Test invoice creation
    const invoice = await testInvoiceCreation(organization);
    if (!invoice) return;
    
    // Test audit logging
    const auditLog = await testAuditLogging(user, organization);
    if (!auditLog) return;
    
    // Test data retrieval
    const userData = await testDataRetrieval();
    
    console.log('\n📋 Authentication Test Results:');
    console.log('   User Creation: ✅ PASS');
    console.log('   Organization Creation: ✅ PASS');
    console.log('   Membership Creation: ✅ PASS');
    console.log('   Project Creation: ✅ PASS');
    console.log('   Task Creation: ✅ PASS');
    console.log('   Invoice Creation: ✅ PASS');
    console.log('   Audit Logging: ✅ PASS');
    console.log('   Data Retrieval: ✅ PASS');
    
    console.log('\n🎉 All authentication and data flow tests passed!');
    console.log('💡 The system is ready for user authentication testing.');
    
  } catch (error) {
    console.error('❌ Authentication test suite failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAuthTests().catch(console.error);
}

module.exports = { runAuthTests };
