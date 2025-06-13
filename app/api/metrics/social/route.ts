import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const artist = searchParams.get("artist") || "artist1"
  const days = searchParams.get("days") || "30"

  // Mock data - replace with actual Metricool API integration
  // Use artist and days to vary the mock data
  const baseFollowers = artist === "artist1" ? 25000 : artist === "artist2" ? 35000 : 45000
  const daysMultiplier = days === "7" ? 0.3 : 1

  const mockData = {
    platforms: {
      instagram: {
        followers: Math.floor(baseFollowers * 1.2 + Math.random() * 10000),
        avgLikes: Math.floor((Math.random() * 500 + 100) * daysMultiplier),
        posts: Math.floor((Math.random() * 20 + 5) * daysMultiplier),
      },
      twitter: {
        followers: Math.floor(baseFollowers * 0.8 + Math.random() * 5000),
        avgLikes: Math.floor((Math.random() * 200 + 50) * daysMultiplier),
        posts: Math.floor((Math.random() * 30 + 10) * daysMultiplier),
      },
      youtube: {
        followers: Math.floor(baseFollowers * 2 + Math.random() * 20000),
        avgLikes: Math.floor((Math.random() * 1000 + 200) * daysMultiplier),
        posts: Math.floor((Math.random() * 10 + 2) * daysMultiplier),
      },
    },
    topContent: [
      {
        platform: "instagram",
        content: "Behind the scenes of new music video shoot 🎬",
        shares: Math.floor(1250 * daysMultiplier),
        engagement: 8.5,
      },
      {
        platform: "twitter",
        content: "New single dropping this Friday! Who's ready? 🔥",
        shares: Math.floor(890 * daysMultiplier),
        engagement: 6.2,
      },
      {
        platform: "youtube",
        content: 'Acoustic version of "Midnight Dreams" live session',
        shares: Math.floor(2100 * daysMultiplier),
        engagement: 12.3,
      },
    ],
    paidAds: {
      reach: Math.floor((Math.random() * 100000 + 50000) * daysMultiplier),
      impressions: Math.floor((Math.random() * 500000 + 200000) * daysMultiplier),
      ctr: Number.parseFloat((Math.random() * 3 + 1).toFixed(2)),
      spend: Math.floor((Math.random() * 2000 + 500) * daysMultiplier),
    },
  }

  return NextResponse.json(mockData)
}
