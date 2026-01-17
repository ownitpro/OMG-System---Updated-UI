// Seed content projects for testing
// Run with: node seed-content-projects.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding content projects...\n');

  // Find the test client user
  const client = await prisma.user.findUnique({
    where: { email: 'client@testorg.com' },
  });

  if (!client) {
    console.error('❌ Test client user not found (client@testorg.com)');
    process.exit(1);
  }

  console.log(`✅ Found test client: ${client.name} (${client.email})\n`);

  // Check if projects already exist
  const existing = await prisma.contentProject.findMany({
    where: { userId: client.id },
  });

  if (existing.length > 0) {
    console.log(`⚠️  Found ${existing.length} existing content projects`);
    console.log('   Deleting old projects first...\n');
    await prisma.contentProject.deleteMany({
      where: { userId: client.id },
    });
  }

  // Create test content projects
  // ✅ Using placehold.co - more reliable placeholder service
  const projects = [
    {
      userId: client.id,
      title: 'Complete Guide to Digital Marketing',
      description: 'Comprehensive guide covering SEO, PPC, social media, and content marketing strategies',
      type: 'Blog Post',
      status: 'PUBLISHED',
      dueDate: new Date('2024-11-30'),
      publishedAt: new Date('2024-11-28'),
      assignedTo: 'Sarah Johnson',
      wordCount: 5200,
      targetKeywords: JSON.stringify(['digital marketing', 'SEO', 'content strategy', 'PPC advertising']),
      draftUrl: 'https://placehold.co/1200x800/47BD79/ffffff?text=Digital+Marketing+Guide+DRAFT',
      finalUrl: 'https://placehold.co/1200x800/47BD79/ffffff?text=Published+Article+-+Digital+Marketing',
    },
    {
      userId: client.id,
      title: 'Product Demo Video',
      description: 'Short video showcasing our product features and benefits',
      type: 'Video',
      status: 'IN_PROGRESS',
      dueDate: new Date('2025-01-20'),
      publishedAt: null,
      assignedTo: 'Video Team',
      wordCount: null, // Videos don't have word count
      targetKeywords: JSON.stringify(['product demo', 'tutorial', 'features']),
      draftUrl: 'https://placehold.co/1920x1080/3B82F6/ffffff?text=Product+Demo+Video+DRAFT',
      finalUrl: null, // Not published yet
    },
    {
      userId: client.id,
      title: 'Q1 2025 Email Newsletter',
      description: 'Monthly newsletter highlighting new features and customer success stories',
      type: 'Email Campaign',
      status: 'REVIEW',
      dueDate: new Date('2025-01-10'),
      publishedAt: null,
      assignedTo: 'Content Team',
      wordCount: 800,
      targetKeywords: JSON.stringify(['newsletter', 'updates', 'features']),
      draftUrl: 'https://placehold.co/800x1200/F59E0B/ffffff?text=Q1+Newsletter+DRAFT',
      finalUrl: null,
    },
    {
      userId: client.id,
      title: 'Social Media Content Pack',
      description: 'Monthly social media posts for Instagram, LinkedIn, and Twitter',
      type: 'Social Media',
      status: 'DRAFT',
      dueDate: new Date('2025-02-01'),
      publishedAt: null,
      assignedTo: 'Marketing Team',
      wordCount: 1200,
      targetKeywords: JSON.stringify(['social media', 'engagement', 'brand awareness']),
      draftUrl: 'https://placehold.co/1080x1920/A855F7/ffffff?text=Social+Media+Calendar+DRAFT',
      finalUrl: null,
    },
  ];

  console.log('📦 Creating content projects...\n');

  for (const project of projects) {
    const created = await prisma.contentProject.create({
      data: project,
    });
    console.log(`   ✓ Created: ${created.title} (${created.type}, ${created.status})`);
  }

  console.log(`\n✅ Successfully seeded ${projects.length} content projects!`);
  console.log('\n💡 You can now test the buttons at: http://localhost:3000/portal/client/content-development\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
