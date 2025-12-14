import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function seedTestData() {
  try {
    // Create a test organization
    const testOrg = await prisma.organization.upsert({
      where: { slug: 'test-org' },
      update: {},
      create: {
        name: 'Test Organization',
        slug: 'test-org',
        description: 'A test organization for demonstration',
        industry: 'Technology',
        size: 'Small',
      },
    });

    // Create a test user
    const testUser = await prisma.user.upsert({
      where: { email: 'admin@testorg.com' },
      update: {},
      create: {
        name: 'Test Admin',
        email: 'admin@testorg.com',
      },
    });

    // Create a membership
    const membership = await prisma.userMembership.upsert({
      where: {
        userId_organizationId: {
          userId: testUser.id,
          organizationId: testOrg.id,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        organizationId: testOrg.id,
        role: 'ADMIN',
      },
    });

    // Create a test project
    const testProject = await prisma.project.create({
      data: {
        name: 'Test Project',
        description: 'A test project for demonstration',
        status: 'IN_PROGRESS',
        organizationId: testOrg.id,
        userId: testUser.id,
      },
    });

    // Create a test task
    await prisma.task.create({
      data: {
        title: 'Test Task',
        description: 'A test task for demonstration',
        status: 'TODO',
        projectId: testProject.id,
        userId: testUser.id,
      },
    });

    // Create a test invoice
    await prisma.invoice.create({
      data: {
        number: 'INV-001',
        status: 'SENT',
        amount: 1000.00,
        currency: 'USD',
        organizationId: testOrg.id,
      },
    });

    // Create a test ticket
    await prisma.ticket.create({
      data: {
        subject: 'Test Support Ticket',
        description: 'A test support ticket for demonstration',
        status: 'OPEN',
        priority: 'medium',
        organizationId: testOrg.id,
        userId: testUser.id,
      },
    });

    console.log('✅ Test data seeded successfully!');
    console.log('Test User:', testUser.email);
    console.log('Test Organization:', testOrg.name);
    console.log('Test Project:', testProject.name);
  } catch (error) {
    console.error('❌ Error seeding test data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestData();
