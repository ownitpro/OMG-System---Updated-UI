// Seed brand assets for testing
// Run with: node seed-brand-assets.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding brand assets...\n');

  // Find the test client user
  const client = await prisma.user.findUnique({
    where: { email: 'client@testorg.com' },
  });

  if (!client) {
    console.error('❌ Test client user not found (client@testorg.com)');
    process.exit(1);
  }

  console.log(`✅ Found test client: ${client.name} (${client.email})\n`);

  // Check if assets already exist
  const existing = await prisma.brandAsset.findMany({
    where: { userId: client.id },
  });

  if (existing.length > 0) {
    console.log(`⚠️  Found ${existing.length} existing brand assets`);
    console.log('   Deleting old assets first...\n');
    await prisma.brandAsset.deleteMany({
      where: { userId: client.id },
    });
  }

  // Create test brand assets
  const assets = [
    {
      userId: client.id,
      name: 'Primary Logo - Full Color',
      description: 'Main company logo with full color treatment',
      type: 'Logo',
      category: 'Primary',
      fileUrl: 'https://via.placeholder.com/800x400/47BD79/ffffff?text=Primary+Logo',
      thumbnailUrl: 'https://via.placeholder.com/400x200/47BD79/ffffff?text=Primary+Logo',
      fileSize: 245760, // 240 KB
      fileFormat: 'SVG',
      dimensions: '800x400',
      colorCodes: JSON.stringify(['#47BD79', '#FFFFFF']),
      version: '1.0',
      tags: JSON.stringify(['logo', 'primary', 'color']),
      downloadCount: 45,
      lastDownloadAt: new Date('2026-01-15T10:30:00Z'),
    },
    {
      userId: client.id,
      name: 'Brand Color Palette',
      description: 'Official brand colors with hex codes',
      type: 'Color Palette',
      category: 'Guidelines',
      fileUrl: 'https://via.placeholder.com/800x600/3B82F6/ffffff?text=Color+Palette',
      thumbnailUrl: 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=Color+Palette',
      fileSize: 150528, // 147 KB
      fileFormat: 'PDF',
      dimensions: '8.5x11',
      colorCodes: JSON.stringify(['#47BD79', '#3B82F6', '#A855F7', '#F59E0B']),
      version: '2.1',
      tags: JSON.stringify(['colors', 'palette', 'brand']),
      downloadCount: 67,
      lastDownloadAt: new Date('2026-01-16T09:15:00Z'),
    },
    {
      userId: client.id,
      name: 'Brand Guidelines PDF',
      description: 'Complete brand identity guidelines',
      type: 'Guide',
      category: 'Guidelines',
      fileUrl: 'https://via.placeholder.com/800x1000/F59E0B/ffffff?text=Brand+Guidelines',
      thumbnailUrl: 'https://via.placeholder.com/400x500/F59E0B/ffffff?text=Brand+Guidelines',
      fileSize: 1048576, // 1 MB
      fileFormat: 'PDF',
      dimensions: '8.5x11',
      colorCodes: null,
      version: '3.0',
      tags: JSON.stringify(['guidelines', 'brand', 'pdf']),
      downloadCount: 23,
      lastDownloadAt: new Date('2026-01-12T16:45:00Z'),
    },
    {
      userId: client.id,
      name: 'Social Media Templates',
      description: 'Instagram and Facebook post templates',
      type: 'Template',
      category: 'Marketing',
      fileUrl: 'https://via.placeholder.com/1080x1080/A855F7/ffffff?text=Social+Templates',
      thumbnailUrl: 'https://via.placeholder.com/540x540/A855F7/ffffff?text=Social+Templates',
      fileSize: 524288, // 512 KB
      fileFormat: 'PSD',
      dimensions: '1080x1080',
      colorCodes: JSON.stringify(['#A855F7', '#3B82F6']),
      version: '1.5',
      tags: JSON.stringify(['social media', 'templates', 'instagram']),
      downloadCount: 89,
      lastDownloadAt: new Date('2026-01-16T14:00:00Z'),
    },
  ];

  console.log('📦 Creating brand assets...\n');

  for (const asset of assets) {
    const created = await prisma.brandAsset.create({
      data: asset,
    });
    console.log(`   ✓ Created: ${created.name} (${created.fileFormat}, ${created.downloadCount} downloads)`);
  }

  console.log(`\n✅ Successfully seeded ${assets.length} brand assets!`);
  console.log('\n💡 You can now test the buttons at: http://localhost:3000/portal/client/branding-creative\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
