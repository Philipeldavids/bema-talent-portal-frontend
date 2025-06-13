"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Users, Award, Star, Crown } from "lucide-react"

interface EmailMetrics {
  openRate: number
  clickRate: number
  bounceRate: number
  totalSent: number
}

interface SMSMetrics {
  deliveryRate: number
  responseRate: number
  optOutRate: number
  totalSent: number
}

interface CRMTiers {
  gold: number
  silver: number
  bronze: number
}

interface Campaign {
  id: string
  name: string
  artist: string
  status: "active" | "completed" | "draft"
  emailMetrics: EmailMetrics
  smsMetrics: SMSMetrics
  crmTiers: CRMTiers
}

export function MOFUSection() {
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  const artists = [
    { id: "all", name: "All Artists" },
    { id: "artist1", name: "Luna Martinez" },
    { id: "artist2", name: "Echo Rivers" },
    { id: "artist3", name: "Neon Dreams" },
  ]

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true)
      try {
        console.log("Fetching campaigns for artist:", selectedArtist) // Debug log
        const emailRes = await fetch(`/api/metrics/email?artist=${selectedArtist}`)
        const emailData = await emailRes.json()
        console.log("Received data:", emailData) // Debug log

        // Combine data into campaigns
        setCampaigns(emailData.campaigns || [])
      } catch (error) {
        console.error("Failed to fetch MOFU metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [selectedArtist])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg">Loading engagement metrics...</div>
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-4">
          <Select value={selectedArtist} onValueChange={setSelectedArtist}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Artist" />
            </SelectTrigger>
            <SelectContent>
              {artists.map((artist) => (
                <SelectItem key={artist.id} value={artist.id}>
                  {artist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">No campaign data available for the selected artist</h3>
            <p className="text-muted-foreground mt-2">
              {selectedArtist === "all"
                ? "No campaigns found"
                : `No campaigns found for ${artists.find((a) => a.id === selectedArtist)?.name}`}
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const statusColors = {
    active: "#10B981", // green-500
    completed: "#3B82F6", // blue-500
    draft: "#6B7280", // gray-500
  }

  const tierColors = {
    gold: "#F59E0B", // amber-500
    silver: "#9CA3AF", // gray-400
    bronze: "#B45309", // amber-700
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "gold":
        return Crown
      case "silver":
        return Award
      case "bronze":
        return Star
      default:
        return Users
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedArtist} onValueChange={setSelectedArtist}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Artist" />
          </SelectTrigger>
          <SelectContent>
            {artists.map((artist) => (
              <SelectItem key={artist.id} value={artist.id}>
                {artist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card style={{ backgroundColor: "#F0F9FF", borderLeft: "4px solid #3B82F6" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ color: "#2563EB" }} className="text-2xl font-bold">
              {campaigns.length}
            </div>
            <p style={{ color: "#3B82F6" }} className="text-xs">
              {selectedArtist === "all" ? "All artists" : artists.find((a) => a.id === selectedArtist)?.name}
            </p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "#F0FDF4", borderLeft: "4px solid #10B981" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ color: "#059669" }} className="text-2xl font-bold">
              {campaigns.length > 0
                ? (campaigns.reduce((sum, c) => sum + c.emailMetrics.openRate, 0) / campaigns.length).toFixed(1)
                : "0"}
              %
            </div>
            <p style={{ color: "#10B981" }} className="text-xs">
              Email campaigns
            </p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "#FFFBEB", borderLeft: "4px solid #F59E0B" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ color: "#D97706" }} className="text-2xl font-bold">
              {campaigns
                .reduce((sum, c) => sum + c.crmTiers.gold + c.crmTiers.silver + c.crmTiers.bronze, 0)
                .toLocaleString()}
            </div>
            <p style={{ color: "#F59E0B" }} className="text-xs">
              All tiers combined
            </p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "#F5F3FF", borderLeft: "4px solid #8B5CF6" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ color: "#7C3AED" }} className="text-2xl font-bold">
              {campaigns.filter((c) => c.status === "active").length}
            </div>
            <p style={{ color: "#8B5CF6" }} className="text-xs">
              Currently running
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Campaigns {selectedArtist !== "all" && `for ${artists.find((a) => a.id === selectedArtist)?.name}`}
        </h3>
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription>Artist: {campaign.artist}</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  style={{
                    backgroundColor: statusColors[campaign.status as keyof typeof statusColors],
                    borderColor: statusColors[campaign.status as keyof typeof statusColors],
                    color: "white",
                  }}
                >
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* Email Metrics */}
                <div style={{ backgroundColor: "#F0F9FF" }} className="space-y-4 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail style={{ color: "#0EA5E9" }} className="h-5 w-5" />
                    <h4 className="font-medium">Email Metrics</h4>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Open Rate</span>
                      <span style={{ color: "#0369A1" }} className="font-medium">
                        {campaign.emailMetrics.openRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Click Rate</span>
                      <span style={{ color: "#0369A1" }} className="font-medium">
                        {campaign.emailMetrics.clickRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bounce Rate</span>
                      <span style={{ color: "#0369A1" }} className="font-medium">
                        {campaign.emailMetrics.bounceRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Sent</span>
                      <span style={{ color: "#0369A1" }} className="font-medium">
                        {campaign.emailMetrics.totalSent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SMS Metrics */}
                <div style={{ backgroundColor: "#F0FDF4" }} className="space-y-4 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare style={{ color: "#10B981" }} className="h-5 w-5" />
                    <h4 className="font-medium">SMS Metrics</h4>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Delivery Rate</span>
                      <span style={{ color: "#059669" }} className="font-medium">
                        {campaign.smsMetrics.deliveryRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Response Rate</span>
                      <span style={{ color: "#059669" }} className="font-medium">
                        {campaign.smsMetrics.responseRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Opt-out Rate</span>
                      <span style={{ color: "#059669" }} className="font-medium">
                        {campaign.smsMetrics.optOutRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Sent</span>
                      <span style={{ color: "#059669" }} className="font-medium">
                        {campaign.smsMetrics.totalSent.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CRM Tiers */}
                <div style={{ backgroundColor: "#FFFBEB" }} className="space-y-4 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users style={{ color: "#F59E0B" }} className="h-5 w-5" />
                    <h4 className="font-medium">CRM Tiers</h4>
                  </div>
                  <div className="grid gap-3">
                    {Object.entries(campaign.crmTiers).map(([tier, count]) => {
                      const Icon = getTierIcon(tier)
                      const color = tierColors[tier as keyof typeof tierColors]

                      return (
                        <div key={tier} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon style={{ color }} className="h-4 w-4" />
                            <span className="text-sm text-muted-foreground capitalize">{tier}</span>
                          </div>
                          <span style={{ color }} className="font-medium">
                            {count.toLocaleString()}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Audience</span>
                      <span className="font-bold">
                        {(
                          campaign.crmTiers.gold +
                          campaign.crmTiers.silver +
                          campaign.crmTiers.bronze
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
