import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artist = searchParams.get("artist") || "all"
  const campaign = searchParams.get("campaign") || "all"

  // Mock sales data
  const mockCampaigns = [
    {
      id: "sales1",
      name: "New Album Launch",
      artist: "Luna Martinez",
      status: "active",
      salesMetrics: {
        totalRevenue: 45250,
        revenueBreakdown: {
          bema: 18500,
          patreon: 12200,
          giveButter: 8950,
          merch: 5600,
        },
        conversionRate: 3.2,
        averageOrderValue: 28,
        totalOrders: 1616,
      },
    },
    {
      id: "sales2",
      name: "Summer Tour Announcement",
      artist: "Echo Rivers",
      status: "completed",
      salesMetrics: {
        totalRevenue: 67800,
        revenueBreakdown: {
          bema: 28900,
          patreon: 19200,
          giveButter: 12400,
          merch: 7300,
        },
        conversionRate: 4.1,
        averageOrderValue: 35,
        totalOrders: 1937,
      },
    },
    {
      id: "sales3",
      name: "Exclusive Merch Drop",
      artist: "Neon Dreams",
      status: "active",
      salesMetrics: {
        totalRevenue: 32100,
        revenueBreakdown: {
          bema: 8200,
          patreon: 7800,
          giveButter: 4900,
          merch: 11200,
        },
        conversionRate: 5.8,
        averageOrderValue: 42,
        totalOrders: 764,
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
    filteredCampaigns = filteredCampaigns.filter((camp) => camp.artist === artistMap[artist as keyof typeof artistMap])
  }

  if (campaign !== "all") {
    filteredCampaigns = filteredCampaigns.filter((camp) => camp.id === campaign)
  }

  return NextResponse.json({ campaigns: filteredCampaigns })
}
