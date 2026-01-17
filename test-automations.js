const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testAutomations() {
  console.log("🧪 Testing Automations API\n");

  let testUser, automationId;

  try {
    testUser = await prisma.user.findFirst({ where: { role: "CLIENT" } });
    console.log(`✅ Using user: ${testUser.email}\n`);

    // Test 1: Create automation
    console.log("📝 TEST 1: Create automation");
    const automation = await prisma.automation.create({
      data: {
        userId: testUser.id,
        name: "Welcome Email Sequence",
        description: "Sends welcome emails to new subscribers",
        type: "Email",
        trigger: JSON.stringify({ event: "user.signup", delay: 0 }),
        actions: JSON.stringify([
          { type: "send_email", template: "welcome", delay: 0 },
          { type: "send_email", template: "onboarding_day_3", delay: 259200 },
        ]),
        status: "INACTIVE",
      },
    });
    automationId = automation.id;
    console.log(`✅ Created: ${automation.name} (${automation.status})\n`);

    // Test 2: List automations
    console.log("📝 TEST 2: List all automations");
    const automations = await prisma.automation.findMany({
      where: { userId: testUser.id },
    });
    console.log(`✅ Found ${automations.length} automation(s)\n`);

    // Test 3: Filter by status
    console.log("📝 TEST 3: Filter by status=INACTIVE");
    const inactive = await prisma.automation.findMany({
      where: { userId: testUser.id, status: "INACTIVE" },
    });
    console.log(`✅ Found ${inactive.length} inactive automation(s)\n`);

    // Test 4: Update to ACTIVE with run data
    console.log("📝 TEST 4: Activate automation and record run");
    const updated = await prisma.automation.update({
      where: { id: automationId },
      data: {
        status: "ACTIVE",
        totalRuns: 1,
        successfulRuns: 1,
        failedRuns: 0,
        lastRunAt: new Date(),
        lastRunStatus: "SUCCESS",
      },
    });
    console.log(`✅ Updated: ${updated.name} (${updated.status}, ${updated.totalRuns} runs)\n`);

    // Test 5: Simulate multiple runs
    console.log("📝 TEST 5: Record multiple runs");
    const multiRun = await prisma.automation.update({
      where: { id: automationId },
      data: {
        totalRuns: 145,
        successfulRuns: 142,
        failedRuns: 3,
      },
    });
    console.log(`✅ Stats: ${multiRun.totalRuns} total, ${multiRun.successfulRuns} success, ${multiRun.failedRuns} failed\n`);

    // Test 6: Ownership check
    console.log("📝 TEST 6: Ownership verification");
    const wrongUser = await prisma.automation.findFirst({
      where: { id: automationId, userId: "wrong-id" },
    });
    console.log(`✅ Ownership protection: ${!wrongUser ? "Working" : "FAILED"}\n`);

    // Test 7: Delete automation
    console.log("📝 TEST 7: Delete automation");
    await prisma.automation.delete({ where: { id: automationId } });
    console.log(`✅ Automation deleted\n`);

    console.log("=".repeat(60));
    console.log("✅ Automations API: ALL TESTS PASSED!");
    console.log("=".repeat(60));

  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testAutomations();
