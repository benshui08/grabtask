import { NextRequest, NextResponse } from "next/server";
import { processPostback } from "./action";

// CPALead postback URL: https://yourdomain.com/api/postback/cpalead?subid={subid}&payout={payout}&offer_name={offer_name}&ip={ip}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const subid = searchParams.get("subid"); // User UID
  const payout = searchParams.get("payout"); // Payout amount
  const offerName = searchParams.get("offer_name");
  const ip = searchParams.get("ip");

  // Validate required params
  if (!subid || !payout) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    await processPostback({
      userId: subid,
      payout: parseFloat(payout),
      offerName: offerName || "Unknown Offer",
      ip: ip || "",
      source: "cpalead",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Postback processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}