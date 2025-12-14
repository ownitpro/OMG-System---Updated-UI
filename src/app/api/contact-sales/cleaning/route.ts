import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      companyName, 
      region, 
      cleaningType, 
      employeeCount, 
      painPoints, 
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

    console.log("Received Cleaning Services Contact Sales Request:", {
      name,
      email,
      phone,
      companyName,
      region,
      cleaningType,
      employeeCount,
      painPoints,
      currentTools,
      desiredOutcome,
      notes,
      industry: "cleaning",
      timestamp: new Date().toISOString(),
    });

    // In a real application, you would:
    // 1. Save to database (e.g., Prisma, your CRM)
    // 2. Send email notification to sales team
    // 3. Create lead in CRM with industry-specific tags
    // 4. Trigger automated follow-up sequence
    
    // Example database save:
    // await prisma.lead.create({
    //   data: {
    //     ...body,
    //     industry: "cleaning",
    //     source: "contact-sales-page",
    //     status: "new",
    //     createdAt: new Date(),
    //   }
    // });

    // Example email notification:
    // await sendEmail({
    //   to: "sales@omgsystems.com",
    //   subject: `New Cleaning Services Lead: ${name}`,
    //   template: "cleaning-lead-notification",
    //   data: { ...body, industry: "cleaning" }
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: "Cleaning services contact request received successfully." 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing Cleaning Services contact sales request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
