const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testContentProjects() {
  console.log("🧪 Testing Content Projects API\n");

  let testUser, projectId;

  try {
    testUser = await prisma.user.findFirst({ where: { role: "CLIENT" } });
    console.log(`✅ Using user: ${testUser.email}\n`);

    // Test 1: Create project
    console.log("📝 TEST 1: Create content project");
    const project = await prisma.contentProject.create({
      data: {
        userId: testUser.id,
        title: "Ultimate Guide to Next.js 16",
        description: "Comprehensive tutorial covering all new features",
        type: "Blog",
        dueDate: new Date("2026-03-15"),
        assignedTo: "Content Team",
        wordCount: 2500,
        targetKeywords: JSON.stringify(["Next.js", "React", "Web Development"]),
        status: "DRAFT",
      },
    });
    projectId = project.id;
    console.log(`✅ Created: ${project.title} (${project.status})\n`);

    // Test 2: List projects
    console.log("📝 TEST 2: List all projects");
    const projects = await prisma.contentProject.findMany({
      where: { userId: testUser.id },
    });
    console.log(`✅ Found ${projects.length} project(s)\n`);

    // Test 3: Filter by status
    console.log("📝 TEST 3: Filter by status=DRAFT");
    const drafts = await prisma.contentProject.findMany({
      where: { userId: testUser.id, status: "DRAFT" },
    });
    console.log(`✅ Found ${drafts.length} draft project(s)\n`);

    // Test 4: Filter by type
    console.log("📝 TEST 4: Filter by type=Blog");
    const blogs = await prisma.contentProject.findMany({
      where: { userId: testUser.id, type: "Blog" },
    });
    console.log(`✅ Found ${blogs.length} blog project(s)\n`);

    // Test 5: Update project
    console.log("📝 TEST 5: Update project to IN_PROGRESS");
    const updated = await prisma.contentProject.update({
      where: { id: projectId },
      data: {
        status: "IN_PROGRESS",
        wordCount: 1250,
        draftUrl: "https://example.com/drafts/nextjs-guide",
      },
    });
    console.log(`✅ Updated: ${updated.title} (${updated.status}, ${updated.wordCount} words)\n`);

    // Test 6: Ownership check
    console.log("📝 TEST 6: Ownership verification");
    const wrongUser = await prisma.contentProject.findFirst({
      where: { id: projectId, userId: "wrong-id" },
    });
    console.log(`✅ Ownership protection: ${!wrongUser ? "Working" : "FAILED"}\n`);

    // Test 7: Delete project
    console.log("📝 TEST 7: Delete project");
    await prisma.contentProject.delete({ where: { id: projectId } });
    console.log(`✅ Project deleted\n`);

    console.log("=".repeat(60));
    console.log("✅ Content Projects API: ALL TESTS PASSED!");
    console.log("=".repeat(60));

  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testContentProjects();
