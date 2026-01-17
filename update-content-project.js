/**
 * Quick Script to Update a Content Project
 * Usage: node update-content-project.js
 *
 * This simulates what the admin portal would do
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateProject() {
  console.log('🔍 Finding "dsdsd" project...\n');

  // Find the project by title
  const project = await prisma.contentProject.findFirst({
    where: { title: 'dsdsd' },
    select: { id: true, title: true, status: true, draftUrl: true, finalUrl: true },
  });

  if (!project) {
    console.log('❌ Project "dsdsd" not found');
    return;
  }

  console.log('✅ Found project:');
  console.log(`   ID: ${project.id}`);
  console.log(`   Title: ${project.title}`);
  console.log(`   Status: ${project.status}`);
  console.log(`   Draft URL: ${project.draftUrl || 'null'}`);
  console.log(`   Final URL: ${project.finalUrl || 'null'}`);
  console.log('');

  // Scenario: Content team creates draft
  console.log('📝 Step 1: Content team creates draft...\n');

  const withDraft = await prisma.contentProject.update({
    where: { id: project.id },
    data: {
      status: 'REVIEW',
      draftUrl: 'https://placehold.co/1200x800/A855F7/ffffff?text=dsdsd+DRAFT',
      assignedTo: 'Sarah Johnson',
    },
  });

  console.log('✅ Updated to REVIEW status with draft URL:');
  console.log(`   Status: ${withDraft.status}`);
  console.log(`   Draft URL: ${withDraft.draftUrl}`);
  console.log(`   Assigned To: ${withDraft.assignedTo}`);
  console.log('');
  console.log('👁️  Now the Eye button will work! Click it to see the draft.\n');

  // Wait 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scenario: Client approves, content team publishes
  console.log('📝 Step 2: Client approves, content team publishes...\n');

  const published = await prisma.contentProject.update({
    where: { id: project.id },
    data: {
      status: 'PUBLISHED',
      finalUrl: 'https://placehold.co/1200x800/47BD79/ffffff?text=dsdsd+PUBLISHED',
      publishedAt: new Date(),
    },
  });

  console.log('✅ Updated to PUBLISHED status:');
  console.log(`   Status: ${published.status}`);
  console.log(`   Final URL: ${published.finalUrl}`);
  console.log(`   Published At: ${published.publishedAt.toLocaleString()}`);
  console.log('');
  console.log('🎉 Project is now live! Eye button opens published version.\n');
}

async function main() {
  try {
    await updateProject();
    console.log('✅ Complete! Refresh your browser to see the changes.\n');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
