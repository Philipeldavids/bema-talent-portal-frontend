import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params

  // Mock CRM tier data for specific campaign
  const mockTierData = {
    campaignId,
    tiers: {
      gold: {
        count: 1250,
        criteria: "High engagement + purchases > $500",
        avgSpend: 125,
      },
      silver: {
        count: 3400,
        criteria: "Medium engagement + purchases > $100",
        avgSpend: 65,
      },
      bronze: {
        count: 8900,
        criteria: "Basic engagement + any purchase",
        avgSpend: 25,
      },
    },
    totalAudience: 13550,
  }

  return NextResponse.json(mockTierData)
}
