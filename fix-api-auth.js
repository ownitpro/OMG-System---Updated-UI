/**
 * Script to add DEV MODE bypass to all client API routes
 * This allows testing APIs without proper NextAuth session
 */

const fs = require('fs');
const path = require('path');

const apiFiles = [
  'src/app/api/client/ads/campaigns/route.ts',
  'src/app/api/client/ads/campaigns/[id]/route.ts',
  'src/app/api/client/automations/route.ts',
  'src/app/api/client/automations/[id]/route.ts',
  'src/app/api/client/billing/payment-methods/route.ts',
  'src/app/api/client/billing/payment-methods/[id]/route.ts',
  'src/app/api/client/billing/subscriptions/route.ts',
  'src/app/api/client/brand/assets/route.ts',
  'src/app/api/client/brand/assets/[id]/route.ts',
  'src/app/api/client/content/projects/route.ts',
  'src/app/api/client/content/projects/[id]/route.ts',
  'src/app/api/client/custom/projects/route.ts',
  'src/app/api/client/custom/projects/[id]/route.ts',
  'src/app/api/client/profile/route.ts',
  'src/app/api/client/sessions/route.ts',
  'src/app/api/client/sessions/[id]/route.ts',
  'src/app/api/client/support/tickets/route.ts',
  'src/app/api/client/support/tickets/[id]/messages/route.ts',
  'src/app/api/client/timeguard/entries/route.ts',
  'src/app/api/client/timeguard/entries/[id]/route.ts',
];

const oldPattern = `  const session = await auth();

  if (!session?.user?.email) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "CLIENT") {
    return apiError("Forbidden", 403);
  }`;

const newPattern = `  const session = await auth();

  // 🔧 DEV MODE BYPASS: Use test client if no session in development
  let userEmail = session?.user?.email;
  if (!userEmail && process.env.NODE_ENV === 'development') {
    userEmail = 'client@testorg.com';
    console.log('[API DEV BYPASS] Using test client user');
  }

  if (!userEmail) {
    return apiError("Unauthorized", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "CLIENT") {
    return apiError("Forbidden", 403);
  }`;

let fixed = 0;
let skipped = 0;

apiFiles.forEach(file => {
  const filePath = path.join('d:\\Ownitpro Files\\OMG system', file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped (not found): ${file}`);
    skipped++;
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('DEV MODE BYPASS')) {
    console.log(`⏭️  Already fixed: ${file}`);
    skipped++;
    return;
  }

  if (content.includes(oldPattern)) {
    content = content.replace(oldPattern, newPattern);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${file}`);
    fixed++;
  } else {
    console.log(`⚠️  Pattern not found: ${file}`);
    skipped++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Fixed: ${fixed} files`);
console.log(`   ⏭️  Skipped: ${skipped} files`);
console.log(`\n🎯 Next: Refresh browser and test!`);
