import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      brokerage: body.brokerage || null,
      city: body.city || null,
      industry: "real-estate",
      teamSize: body.teamSize || null,
      painPoints: body.painPoints || [],
      currentTools: body.currentTools || null,
      transactions: body.transactions || null,
      desiredOutcome: body.desiredOutcome || null,
      notes: body.notes || null,
      source: "contact-sales-page",
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to database
    // await prisma.lead.create({ data: leadData });

    // TODO: Send notification email to sales team
    // await sendSalesNotification({
    //   industry: "Real Estate",
    //   leadData,
    //   priority: "high"
    // });

    // Log the lead for now (in production, this would go to your CRM)
    console.log("Real Estate Lead:", leadData);

    return NextResponse.json({ 
      success: true, 
      message: "Lead submitted successfully",
      leadId: `re-${Date.now()}` // Temporary ID
    });

  } catch (error) {
    console.error("Error processing real estate lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
