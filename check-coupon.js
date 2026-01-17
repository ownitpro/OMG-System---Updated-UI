const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const coupon = await p.coupon.findUnique({
    where: { code: 'OMG10' },
    select: { code: true, isPublic: true, isActive: true, assignedTo: true }
  });
  console.log('OMG10 Coupon Status:', JSON.stringify(coupon, null, 2));
  await p.$disconnect();
}

main();
