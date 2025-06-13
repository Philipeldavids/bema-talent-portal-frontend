import { NextResponse } from "next/server"

export async function GET() {
  // Mock SMS-specific data (could be different from email)
  const mockSMSData = {
    campaigns: [
      {
        id: "sms1",
        name: "Flash Sale Alert",
        artist: "Luna Martinez",
        deliveryRate: 99.2,
        responseRate: 22.1,
        optOutRate: 0.8,
        totalSent: 5420,
      },
      {
        id: "sms2",
        name: "Concert Reminder",
        artist: "Echo Rivers",
        deliveryRate: 98.7,
        responseRate: 18.5,
        optOutRate: 1.1,
        totalSent: 8900,
      },
    ],
  }

  return NextResponse.json(mockSMSData)
}
