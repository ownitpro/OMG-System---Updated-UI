import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminUser() {
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

    // Create admin user (no password for MVP)
    const adminUser = await prisma.user.create({
      data: {
        name: 'Test Admin',
        email: 'admin@testorg.com',
        password: null, // MVP mode - no password
        backupCodes: [], // Empty array as JSON
      },
    });

    console.log('✅ User created:', adminUser.email);

    // Create membership with ADMIN role
    const membership = await prisma.userMembership.create({
      data: {
        userId: adminUser.id,
        organizationId: testOrg.id,
        role: 'ADMIN',
      },
    });

    console.log('✅ Membership created with role:', membership.role);
    console.log('');
    console.log('🎉 Admin user created successfully!');
    console.log('Email: admin@testorg.com');
    console.log('Password: any password (MVP mode)');
    console.log('Role: ADMIN');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();

