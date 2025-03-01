import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityCode = searchParams.get("city");

  if (!cityCode) {
    return NextResponse.json(
      { error: "City code is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://weather.tsukumijima.net/api/forecast?city=${cityCode}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch weather data: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
