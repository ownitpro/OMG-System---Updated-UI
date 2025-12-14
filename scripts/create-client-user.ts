import { PrismaClient } from '../src/generated/prisma';
import { Role } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function createClientUser() {
  try {
    // Create or get test organization
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

    console.log('✅ Organization:', testOrg.name);

    // Create client user (no password for MVP)
    const clientUser = await prisma.user.upsert({
      where: { email: 'client@testorg.com' },
      update: {},
      create: {
        name: 'Test Client',
        email: 'client@testorg.com',
        password: null, // MVP mode - no password
        backupCodes: [], // Empty array as JSON
      },
    });

    console.log('✅ User created:', clientUser.email);

    // Create membership with CLIENT role
    const membership = await prisma.userMembership.upsert({
      where: {
        userId_organizationId: {
          userId: clientUser.id,
          organizationId: testOrg.id,
        },
      },
      update: {
        role: Role.CLIENT, // Ensure role is CLIENT
      },
      create: {
        userId: clientUser.id,
        organizationId: testOrg.id,
        role: Role.CLIENT,
      },
    });

    console.log('✅ Membership created with role:', membership.role);
    console.log('');
    console.log('🎉 Client user created successfully!');
    console.log('Email: client@testorg.com');
    console.log('Password: any password (MVP mode)');
    console.log('Role: CLIENT');
    console.log('');
    console.log('📍 Login URL: http://localhost:3000/login');
    console.log('📍 Client Dashboard: http://localhost:3000/dashboard/client');
  } catch (error) {
    console.error('❌ Error creating client user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createClientUser();

