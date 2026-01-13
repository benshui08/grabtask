import { NextRequest, NextResponse } from "next/server";
import { cpaleadConfig } from "@/config/cpalead";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subid = searchParams.get("subid") || "";
  const country = searchParams.get("country") || "user"; // "user" for auto-detect, or specific like "US"
  const device = searchParams.get("device") || "user"; // "user", "ios", "android", "desktop"

  // Get user's real IP
  const userIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";

  try {
    // Pass user IP to CPALead for accurate geo detection
    let apiUrl = `${cpaleadConfig.apiEndpoint}?id=${cpaleadConfig.publisherId}&subid=${subid}&country=${country}&device=${device}`;

    // If using auto-detection and we have user IP, pass it
    if (country === "user" && userIp) {
      apiUrl += `&ip=${userIp}`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": request.headers.get("user-agent") || "",
      },
    });

    if (!response.ok) {
      throw new Error(`CPALead API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: data.status === "success",
      offers: data.offers || [],
      country: data.country,
      totalOffers: data.number_offers,
    });
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch offers", offers: [] },
      { status: 500 }
    );
  }
}