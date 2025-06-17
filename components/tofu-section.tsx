"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Instagram, Twitter, Youtube, Users, Heart, Share2, Facebook } from "lucide-react"

interface SocialMetrics {
  platforms: {
    instagram: { followers: number; avgLikes: number; posts: number }
    twitter: { followers: number; avgLikes: number; posts: number }
    youtube: { followers: number; avgLikes: number; posts: number }
    facebook: { followers: number; avgLikes: number; posts: number }
  }
  topContent: Array<{
    platform: string
    content: string
    shares: number
    engagement: number
  }>
  paidAds: {
    reach: number
    impressions: number
    ctr: number
    spend: number
  }
}

export function TOFUSection() {
  const [selectedArtist, setSelectedArtist] = useState("artist1")
  const [dateFilter, setDateFilter] = useState("30")
  const [metrics, setMetrics] = useState<SocialMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  const artists = [
    { id: "artist1", name: "Luna Martinez" },
    { id: "artist2", name: "Echo Rivers" },
    { id: "artist3", name: "Neon Dreams" },
  ]

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/metrics/social?artist=${selectedArtist}&days=${dateFilter}`)
        const data = await response.json()
        setMetrics(data)
      } catch (error) {
        console.error("Failed to fetch social metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [selectedArtist, dateFilter])

  if (loading || !metrics) {
    return <div>Loading social metrics...</div>
  }

  const platformIcons = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    facebook: Facebook,
  }

  // Platform color mapping
  const platformColors = {
    instagram: "#E4405F", // Instagram pink
    twitter: "#1DA1F2", // Twitter blue
    youtube: "#FF0000", // YouTube red
    facebook: "#1877F2", // Facebook blue
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

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Platform Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(metrics.platforms).map(([platform, data]) => {
          const Icon = platformIcons[platform as keyof typeof platformIcons]
          const color = platformColors[platform as keyof typeof platformColors]

          return (
            <Card key={platform} style={{ borderTop: `4px solid ${color}` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{platform}</CardTitle>
                <Icon style={{ color }} className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users style={{ color: "#3B82F6" }} className="h-4 w-4" />
                    <span className="text-2xl font-bold">{data.followers.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart style={{ color: "#EF4444" }} className="h-4 w-4" />
                    <span className="text-lg">{data.avgLikes}</span>
                    <span className="text-sm text-muted-foreground">avg likes</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data.posts} posts in {dateFilter} days
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Top Content & Paid Ads */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Shared Content</CardTitle>
            <CardDescription>Most engaging posts this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.topContent.map((content, index) => {
                const color = platformColors[content.platform as keyof typeof platformColors] || "#64748B"

                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: color,
                            color: color,
                          }}
                          className="capitalize"
                        >
                          {content.platform}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{content.content}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Share2 style={{ color: "#10B981" }} className="h-4 w-4" />
                        <span className="font-medium">{content.shares}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{content.engagement}% engagement</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paid Ad Performance</CardTitle>
            <CardDescription>Current campaign results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-2">
              <div style={{ backgroundColor: "#F0F9FF" }} className="p-3 rounded-lg">
                <div style={{ color: "#0369A1" }} className="text-2xl font-bold">
                  {metrics.paidAds.reach.toLocaleString()}
                </div>
                <p style={{ color: "#0EA5E9" }} className="text-sm font-medium">
                  Reach
                </p>
              </div>
              <div style={{ backgroundColor: "#F0FDF4" }} className="p-3 rounded-lg">
                <div style={{ color: "#166534" }} className="text-2xl font-bold">
                  {metrics.paidAds.impressions.toLocaleString()}
                </div>
                <p style={{ color: "#22C55E" }} className="text-sm font-medium">
                  Impressions
                </p>
              </div>
              <div style={{ backgroundColor: "#FEF2F2" }} className="p-3 rounded-lg">
                <div style={{ color: "#B91C1C" }} className="text-2xl font-bold">
                  {metrics.paidAds.ctr}%
                </div>
                <p style={{ color: "#EF4444" }} className="text-sm font-medium">
                  CTR
                </p>
              </div>
              <div style={{ backgroundColor: "#FFF7ED" }} className="p-3 rounded-lg">
                <div style={{ color: "#C2410C" }} className="text-2xl font-bold">
                  ${metrics.paidAds.spend}
                </div>
                <p style={{ color: "#F97316" }} className="text-sm font-medium">
                  Spend
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
