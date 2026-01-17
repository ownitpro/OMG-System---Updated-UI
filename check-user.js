const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
  const user = await prisma.user.findUnique({
    where: { email: 'client@testorg.com' },
    select: { email: true, password: true, role: true, name: true }
  });

  console.log('User found:', JSON.stringify(user, null, 2));
  console.log('\nPassword is null?', user.password === null);

  await prisma.$disconnect();
}

checkUser();
