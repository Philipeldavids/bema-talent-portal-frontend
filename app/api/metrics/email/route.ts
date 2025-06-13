import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artist = searchParams.get("artist") || "all"

  // Mock campaign data
  const mockCampaigns = [
    {
      id: "camp1",
      name: "New Album Launch",
      artist: "Luna Martinez",
      status: "active",
      emailMetrics: {
        openRate: 24.5,
        clickRate: 3.2,
        bounceRate: 2.1,
        totalSent: 15420,
      },
      smsMetrics: {
        deliveryRate: 98.5,
        responseRate: 12.3,
        optOutRate: 1.2,
        totalSent: 8950,
      },
      crmTiers: {
        gold: 1250,
        silver: 3400,
        bronze: 8900,
      },
    },
    {
      id: "camp2",
      name: "Summer Tour Announcement",
      artist: "Echo Rivers",
      status: "completed",
      emailMetrics: {
        openRate: 28.1,
        clickRate: 4.7,
        bounceRate: 1.8,
        totalSent: 22100,
      },
      smsMetrics: {
        deliveryRate: 97.8,
        responseRate: 15.6,
        optOutRate: 0.9,
        totalSent: 12300,
      },
      crmTiers: {
        gold: 2100,
        silver: 5600,
        bronze: 12400,
      },
    },
    {
      id: "camp3",
      name: "Exclusive Merch Drop",
      artist: "Neon Dreams",
      status: "active",
      emailMetrics: {
        openRate: 31.2,
        clickRate: 6.8,
        bounceRate: 1.5,
        totalSent: 18750,
      },
      smsMetrics: {
        deliveryRate: 99.1,
        responseRate: 18.4,
        optOutRate: 0.7,
        totalSent: 9800,
      },
      crmTiers: {
        gold: 1800,
        silver: 4200,
        bronze: 9500,
      },
    },
  ]

  let filteredCampaigns = mockCampaigns

  if (artist !== "all") {
    // Map artist IDs to their corresponding names for matching
    const artistMap = {
      artist1: "Luna Martinez",
      artist2: "Echo Rivers",
      artist3: "Neon Dreams",
    }

    // Filter by exact artist name match using the mapping
    const artistName = artistMap[artist as keyof typeof artistMap]
    if (artistName) {
      filteredCampaigns = filteredCampaigns.filter((camp) => camp.artist === artistName)
    }
  }

  return NextResponse.json({ campaigns: filteredCampaigns })
}
