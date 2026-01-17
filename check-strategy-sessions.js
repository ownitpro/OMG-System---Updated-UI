const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStrategySessions() {
  try {
    const sessions = await prisma.strategySession.findMany({
      orderBy: { scheduledAt: 'asc' },
      include: {
        user: {
          select: { email: true, name: true }
        }
      }
    });

    console.log('\n====================================');
    console.log('STRATEGY SESSIONS IN DATABASE');
    console.log('====================================');
    console.log('Total sessions:', sessions.length);
    console.log('');

    sessions.forEach((s, i) => {
      console.log(`\n[${i+1}] ${s.title}`);
      console.log(`    User: ${s.user.name} (${s.user.email})`);
      console.log(`    Date: ${new Date(s.scheduledAt).toLocaleString()}`);
      console.log(`    Status: ${s.status}`);
      console.log(`    Duration: ${s.durationMinutes} min`);
      console.log(`    Meeting Link: ${s.meetingLink || 'None'}`);
      console.log(`    Notes: ${s.notes || 'None'}`);
      console.log(`    Description: ${s.description || 'None'}`);
      console.log(`    Created: ${new Date(s.createdAt).toLocaleString()}`);
    });

    console.log('\n====================================\n');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStrategySessions();
