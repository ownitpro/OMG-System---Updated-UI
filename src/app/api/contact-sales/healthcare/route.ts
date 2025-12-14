import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      practiceName, 
      practiceType, 
      location, 
      patientVolume, 
      painPoints, 
      currentEMR, 
      currentTools, 
      desiredOutcome, 
      notes 
    } = body;

    // Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: Name, Email, Phone" }, 
        { status: 400 }
      );
    }

    console.log("Received Healthcare Contact Sales Request:", {
      name,
      email,
      phone,
      practiceName,
      practiceType,
      location,
      patientVolume,
      painPoints,
      currentEMR,
      currentTools,
      desiredOutcome,
      notes,
      industry: "healthcare",
      timestamp: new Date().toISOString(),
    });

    // In a real application, you would:
    // 1. Save to database (e.g., Prisma, your CRM)
    // 2. Send email notification to sales team
    // 3. Create lead in CRM with industry-specific tags
    // 4. Trigger automated follow-up sequence
    // 5. Ensure HIPAA compliance for data handling
    
    // Example database save:
    // await prisma.lead.create({
    //   data: {
    //     ...body,
    //     industry: "healthcare",
    //     source: "contact-sales-page",
    //     status: "new",
    //     complianceFlags: ["hipaa"],
    //     createdAt: new Date(),
    //   }
    // });

    // Example email notification:
    // await sendEmail({
    //   to: "sales@omgsystems.com",
    //   subject: `New Healthcare Lead: ${name} - ${practiceName}`,
    //   template: "healthcare-lead-notification",
    //   data: { ...body, industry: "healthcare" }
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: "Healthcare contact request received successfully." 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing Healthcare contact sales request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
