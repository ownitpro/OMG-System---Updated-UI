const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listProjects() {
  console.log('📋 All Content Projects:\n');

  const projects = await prisma.contentProject.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      status: true,
      type: true,
      draftUrl: true,
      finalUrl: true,
      createdAt: true,
    },
  });

  if (projects.length === 0) {
    console.log('❌ No content projects found');
    return;
  }

  projects.forEach((p, i) => {
    console.log(`${i + 1}. "${p.title}"`);
    console.log(`   ID: ${p.id}`);
    console.log(`   Type: ${p.type}`);
    console.log(`   Status: ${p.status}`);
    console.log(`   Draft URL: ${p.draftUrl || 'null'}`);
    console.log(`   Final URL: ${p.finalUrl || 'null'}`);
    console.log(`   Created: ${p.createdAt.toLocaleString()}`);
    console.log('');
  });
}

async function main() {
  try {
    await listProjects();
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
