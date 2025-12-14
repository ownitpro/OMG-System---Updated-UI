import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const industry = formData.get("industry") as string;
    const description = formData.get("description") as string;
    const notes = formData.get("notes") as string;
    const appSpecJson = formData.get("appSpec") as string;

    // Basic validation
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Missing required fields: Name, Email, Phone, Description" }, 
        { status: 400 }
      );
    }

    // Parse app spec
    let appSpec;
    try {
      appSpec = JSON.parse(appSpecJson);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid app specification format" }, 
        { status: 400 }
      );
    }

    // Extract uploaded files info
    const uploadedFiles: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        uploadedFiles.push(value.name);
      }
    }

    const customAppSpec = {
      name,
      email,
      company,
      phone,
      industry,
      description,
      notes,
      appSpec,
      uploadedFiles,
      status: "submitted",
      createdAt: new Date().toISOString(),
      source: "custom-apps-builder"
    };

    console.log("Received Custom App Specification:", {
      name,
      email,
      company,
      phone,
      industry,
      description,
      notes,
      moduleCount: appSpec.moduleCount,
      modules: appSpec.modules?.length || 0,
      uploadedFiles: uploadedFiles.length,
      timestamp: new Date().toISOString(),
    });

    // In a real application, you would:
    // 1. Save to database (e.g., Prisma, your CRM)
    // 2. Store uploaded files to cloud storage (AWS S3, etc.)
    // 3. Send email notification to sales team
    // 4. Create lead in CRM with custom app spec
    // 5. Trigger automated follow-up sequence
    
    // Example database save:
    // await prisma.customAppSpec.create({
    //   data: {
    //     ...customAppSpec,
    //     specJson: appSpec,
    //     status: "submitted",
    //     createdAt: new Date(),
    //   }
    // });

    // Example file storage:
    // for (const [key, value] of formData.entries()) {
    //   if (key.startsWith("file_") && value instanceof File) {
    //     const buffer = await value.arrayBuffer();
    //     const fileName = `${Date.now()}-${value.name}`;
    //     await uploadToS3(buffer, fileName);
    //   }
    // }

    // Example email notification:
    // await sendEmail({
    //   to: "sales@omgsystems.com",
    //   subject: `New Custom App Specification: ${name} - ${company}`,
    //   template: "custom-app-spec-notification",
    //   data: { ...customAppSpec, appSpec }
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: "Custom app specification submitted successfully.",
        specId: `spec_${Date.now()}` // In real app, this would be the database ID
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing custom app specification:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
