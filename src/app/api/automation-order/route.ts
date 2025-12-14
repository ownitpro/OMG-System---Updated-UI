import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { automationSlug, setupCost, monthlyCost, fullName, email, companyName, phone, requirements } = await req.json();
    
    // Basic validation
    if (!automationSlug || !setupCost || !monthlyCost || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    const orderData = {
      automation: {
        slug: automationSlug,
        setupCost: setupCost,
        monthlyCost: monthlyCost
      },
      customer: {
        name: fullName,
        email: email,
        company: companyName || '',
        phone: phone,
        requirements: requirements || ''
      },
      orderId: `AUTO-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      source: 'smart-automations-page'
    };

    console.log("New Automation Order:", {
      orderId: orderData.orderId,
      automation: automationSlug,
      customer: fullName,
      company: companyName,
      setupCost: setupCost,
      monthlyCost: monthlyCost,
      timestamp: new Date().toISOString(),
    });

    // In a real application, you would:
    // 1. Save to database (e.g., Prisma, your CRM)
    // 2. Send email notification to sales team
    // 3. Create lead in CRM with automation details
    // 4. Trigger automated follow-up sequence
    // 5. Set up payment processing (Stripe)
    // 6. Create customer account in portal
    
    // Example database save:
    // await prisma.automationOrder.create({
    //   data: {
    //     ...orderData,
    //     automationData: automation,
    //     customerData: customerInfo,
    //   }
    // });

    // Example email notification:
    // await sendEmail({
    //   to: "sales@omgsystems.com",
    //   subject: `New Automation Order: ${automation.title} - ${customerInfo.company}`,
    //   template: "automation-order-notification",
    //   data: orderData
    // });

    // Example CRM integration:
    // await createLeadInCRM({
    //   name: customerInfo.name,
    //   email: customerInfo.email,
    //   company: customerInfo.company,
    //   phone: customerInfo.phone,
    //   automation: automation.title,
    //   setupCost: automation.setupCost,
    //   monthlyCost: automation.monthlyCost,
    //   source: "smart-automations-page"
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: "Automation order submitted successfully.",
        orderId: orderData.orderId
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing automation order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
