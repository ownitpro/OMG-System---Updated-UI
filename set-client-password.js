const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setClientPassword() {
  console.log('Setting password for client@testorg.com...\n');

  const hashedPassword = await bcrypt.hash('password123', 12);

  const updatedUser = await prisma.user.update({
    where: { email: 'client@testorg.com' },
    data: { password: hashedPassword },
    select: { email: true, name: true, role: true }
  });

  console.log('✅ Password updated successfully!');
  console.log('User:', JSON.stringify(updatedUser, null, 2));
  console.log('\n🔐 Login Credentials:');
  console.log('  Email: client@testorg.com');
  console.log('  Password: password123');

  await prisma.$disconnect();
}

setClientPassword().catch(console.error);
