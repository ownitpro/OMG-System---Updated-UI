import { PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/lib/security';

const prisma = new PrismaClient();

async function setAdminPassword() {
  try {
    const email = 'admin@testorg.com';
    const password = 'password123'; // Simple password for MVP testing
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('❌ User not found:', email);
      console.log('Creating user with password...');
      
      // Create test organization first
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

      // Create user with password
      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.user.create({
        data: {
          name: 'Test Admin',
          email: email,
          password: hashedPassword,
        },
      });

      // Create membership
      await prisma.userMembership.create({
        data: {
          userId: newUser.id,
          organizationId: testOrg.id,
          role: 'ADMIN',
        },
      });

      console.log('✅ User created with password:', email);
      console.log('   Password:', password);
    } else {
      // Update existing user with password
      const hashedPassword = await hashPassword(password);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
      });
      
      console.log('✅ Password set for user:', email);
      console.log('   Password:', password);
    }
  } catch (error) {
    console.error('❌ Error setting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setAdminPassword();

