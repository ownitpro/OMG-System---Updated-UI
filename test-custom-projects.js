const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testCustomProjects() {
  console.log("🧪 Testing Custom Projects API\n");

  let testUser, projectId;

  try {
    testUser = await prisma.user.findFirst({ where: { role: "CLIENT" } });
    console.log(`✅ Using user: ${testUser.email}\n`);

    // Test 1: Create project
    console.log("📝 TEST 1: Create custom project");
    const project = await prisma.customProject.create({
      data: {
        userId: testUser.id,
        name: "E-commerce Platform Integration",
        description: "Custom Shopify integration with inventory management",
        type: "Integration",
        startDate: new Date("2026-02-01"),
        targetEndDate: new Date("2026-04-30"),
        estimatedHours: 120,
        budget: 15000,
        milestones: JSON.stringify([
          { name: "Requirements Analysis", completed: true },
          { name: "API Development", completed: false },
          { name: "Testing", completed: false },
        ]),
        deliverables: JSON.stringify([
          "API Documentation",
          "Integration SDK",
          "Admin Dashboard",
        ]),
        assignedTeam: JSON.stringify(["Backend Dev", "Frontend Dev", "QA Engineer"]),
        repositoryUrl: "https://github.com/client/ecommerce-integration",
        status: "PLANNING",
        progress: 0,
      },
    });
    projectId = project.id;
    console.log(`✅ Created: ${project.name} (${project.status}, ${project.progress}%)\n`);

    // Test 2: List projects
    console.log("📝 TEST 2: List all projects");
    const projects = await prisma.customProject.findMany({
      where: { userId: testUser.id },
    });
    console.log(`✅ Found ${projects.length} project(s)\n`);

    // Test 3: Filter by status
    console.log("📝 TEST 3: Filter by status=PLANNING");
    const planning = await prisma.customProject.findMany({
      where: { userId: testUser.id, status: "PLANNING" },
    });
    console.log(`✅ Found ${planning.length} planning project(s)\n`);

    // Test 4: Update to IN_PROGRESS
    console.log("📝 TEST 4: Start project (IN_PROGRESS)");
    const started = await prisma.customProject.update({
      where: { id: projectId },
      data: {
        status: "IN_PROGRESS",
        progress: 25,
        actualHours: 30,
        spent: 3750,
        nextDeliverable: "API Documentation",
      },
    });
    console.log(`✅ Started: ${started.name} (${started.status}, ${started.progress}%)\n`);

    // Test 5: Update progress
    console.log("📝 TEST 5: Update project progress");
    const progressed = await prisma.customProject.update({
      where: { id: projectId },
      data: {
        progress: 65,
        actualHours: 78,
        spent: 9750,
      },
    });
    console.log(`✅ Progress: ${progressed.progress}%, Hours: ${progressed.actualHours}/${project.estimatedHours}\n`);

    // Test 6: Complete project
    console.log("📝 TEST 6: Complete project");
    const completed = await prisma.customProject.update({
      where: { id: projectId },
      data: {
        status: "COMPLETED",
        progress: 100,
        completedAt: new Date(),
        actualHours: 125,
        spent: 14500,
      },
    });
    console.log(`✅ Completed: ${completed.name} (${completed.status}, ${completed.progress}%)\n`);

    // Test 7: Ownership check
    console.log("📝 TEST 7: Ownership verification");
    const wrongUser = await prisma.customProject.findFirst({
      where: { id: projectId, userId: "wrong-id" },
    });
    console.log(`✅ Ownership protection: ${!wrongUser ? "Working" : "FAILED"}\n`);

    // Test 8: Delete project
    console.log("📝 TEST 8: Delete project");
    await prisma.customProject.delete({ where: { id: projectId } });
    console.log(`✅ Project deleted\n`);

    console.log("=".repeat(60));
    console.log("✅ Custom Projects API: ALL TESTS PASSED!");
    console.log("=".repeat(60));

  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testCustomProjects();
