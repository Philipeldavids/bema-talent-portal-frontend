"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, ShoppingBag, Heart, Gift } from "lucide-react"

interface RevenueBreakdown {
  bema: number
  patreon: number
  giveButter: number
  merch: number
}

interface SalesMetrics {
  totalRevenue: number
  revenueBreakdown: RevenueBreakdown
  conversionRate: number
  averageOrderValue: number
  totalOrders: number
}

interface Campaign {
  id: string
  name: string
  artist: string
  salesMetrics: SalesMetrics
  status: "active" | "completed"
}

export function BOFUSection() {
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [selectedCampaign, setSelectedCampaign] = useState("all")
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  const artists = [
    { id: "all", name: "All Artists" },
    { id: "artist1", name: "Luna Martinez" },
    { id: "artist2", name: "Echo Rivers" },
    { id: "artist3", name: "Neon Dreams" },
  ]

  // Fetch all campaigns on component mount
  useEffect(() => {
    const fetchAllCampaigns = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/metrics/sales?artist=all&campaign=all`)
        const data = await response.json()
        setAllCampaigns(data.campaigns || [])
      } catch (error) {
        console.error("Failed to fetch sales metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllCampaigns()
  }, [])

  // Handle artist selection
  const handleArtistChange = (artistId: string) => {
    setSelectedArtist(artistId)

    if (artistId === "all") {
      // If "All Artists" is selected, reset campaign to "all"
      setSelectedCampaign("all")
    } else {
      // If a specific artist is selected, find their first campaign and select it
      const artistMap = {
        artist1: "Luna Martinez",
        artist2: "Echo Rivers",
        artist3: "Neon Dreams",
      }

      const artistName = artistMap[artistId as keyof typeof artistMap]
      const artistCampaigns = allCampaigns.filter((campaign) => campaign.artist === artistName)

      if (artistCampaigns.length > 0) {
        setSelectedCampaign(artistCampaigns[0].id)
      } else {
        setSelectedCampaign("all")
      }
    }
  }

  // Handle campaign selection
  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId)
  }

  // Get filtered campaigns based on current selections
  const getFilteredCampaigns = () => {
    let filtered = allCampaigns

    // Filter by artist if not "all"
    if (selectedArtist !== "all") {
      const artistMap = {
        artist1: "Luna Martinez",
        artist2: "Echo Rivers",
        artist3: "Neon Dreams",
      }
      const artistName = artistMap[selectedArtist as keyof typeof artistMap]
      filtered = filtered.filter((campaign) => campaign.artist === artistName)
    }

    // Filter by campaign if not "all"
    if (selectedCampaign !== "all") {
      filtered = filtered.filter((campaign) => campaign.id === selectedCampaign)
    }

    return filtered
  }

  // Get campaigns available for dropdown (always show all campaigns)
  const getAvailableCampaigns = () => {
    return allCampaigns
  }

  // Check if selected campaign belongs to selected artist
  const isValidSelection = () => {
    if (selectedArtist === "all" || selectedCampaign === "all") {
      return true
    }

    const artistMap = {
      artist1: "Luna Martinez",
      artist2: "Echo Rivers",
      artist3: "Neon Dreams",
    }

    const artistName = artistMap[selectedArtist as keyof typeof artistMap]
    const selectedCampaignData = allCampaigns.find((c) => c.id === selectedCampaign)

    return selectedCampaignData?.artist === artistName
  }

  if (loading) {
    return <div>Loading sales metrics...</div>
  }

  const campaigns = getFilteredCampaigns()
  const availableCampaigns = getAvailableCampaigns()
  const validSelection = isValidSelection()

  // Show "no data" message only if selection is invalid
  if (!validSelection) {
    const selectedCampaignData = allCampaigns.find((c) => c.id === selectedCampaign)
    const selectedArtistName = artists.find((a) => a.id === selectedArtist)?.name

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-4">
          <Select value={selectedArtist} onValueChange={handleArtistChange}>
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

          <Select value={selectedCampaign} onValueChange={handleCampaignChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {availableCampaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name} ({campaign.artist})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">No sales data available for the selected filters</h3>
            <p className="text-muted-foreground mt-2">
              Campaign &quot;{selectedCampaignData?.name}&quot; does not belong to artist &quot;{selectedArtistName}
              &quot;.
              <br />
              Please select a different campaign or choose &quot;All Artists&quot;.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  if (campaigns.length === 0) {
    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-4">
          <Select value={selectedArtist} onValueChange={handleArtistChange}>
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

          <Select value={selectedCampaign} onValueChange={handleCampaignChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {availableCampaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name} ({campaign.artist})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">No campaigns found</h3>
            <p className="text-muted-foreground mt-2">
              Please select a different campaign or choose &quot;All Artists&quot;.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.salesMetrics.totalRevenue, 0)
  const totalOrders = campaigns.reduce((sum, campaign) => sum + campaign.salesMetrics.totalOrders, 0)
  const avgConversionRate =
    campaigns.length > 0
      ? campaigns.reduce((sum, campaign) => sum + campaign.salesMetrics.conversionRate, 0) / campaigns.length
      : 0

  // Aggregate revenue breakdown
  const aggregatedBreakdown = campaigns.reduce(
    (acc, campaign) => {
      acc.bema += campaign.salesMetrics.revenueBreakdown.bema
      acc.patreon += campaign.salesMetrics.revenueBreakdown.patreon
      acc.giveButter += campaign.salesMetrics.revenueBreakdown.giveButter
      acc.merch += campaign.salesMetrics.revenueBreakdown.merch
      return acc
    },
    { bema: 0, patreon: 0, giveButter: 0, merch: 0 },
  )

  const platformIcons = {
    bema: DollarSign,
    patreon: Heart,
    giveButter: Gift,
    merch: ShoppingBag,
  }

  // Platform color mapping
  const platformColors = {
    bema: {
      icon: "#3B82F6", // blue-500
      bar: "#3B82F6",
      text: "#2563EB", // blue-600
      bg: "#EFF6FF", // blue-50
    },
    patreon: {
      icon: "#F97316", // orange-500
      bar: "#F97316",
      text: "#EA580C", // orange-600
      bg: "#FFF7ED", // orange-50
    },
    giveButter: {
      icon: "#10B981", // green-500
      bar: "#10B981",
      text: "#059669", // green-600
      bg: "#ECFDF5", // green-50
    },
    merch: {
      icon: "#8B5CF6", // purple-500
      bar: "#8B5CF6",
      text: "#7C3AED", // purple-600
      bg: "#F5F3FF", // purple-50
    },
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedArtist} onValueChange={handleArtistChange}>
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

        <Select value={selectedCampaign} onValueChange={handleCampaignChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {availableCampaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.name} ({campaign.artist})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selection Info */}
      <div className="flex gap-2 text-sm text-muted-foreground">
        <span>Showing:</span>
        <span className="font-medium">
          {selectedArtist === "all" ? "All Artists" : artists.find((a) => a.id === selectedArtist)?.name}
        </span>
        <span>•</span>
        <span className="font-medium">
          {selectedCampaign === "all"
            ? "All Campaigns"
            : availableCampaigns.find((c) => c.id === selectedCampaign)?.name}
        </span>
        <span>•</span>
        <span className="font-medium">
          {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card style={{ borderLeft: "4px solid #3B82F6" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign style={{ color: "#3B82F6" }} className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div style={{ color: "#2563EB" }} className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
            <p style={{ color: "#10B981" }} className="text-xs">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card style={{ borderLeft: "4px solid #10B981" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag style={{ color: "#10B981" }} className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div style={{ color: "#059669" }} className="text-2xl font-bold">
              {totalOrders.toLocaleString()}
            </div>
            <p style={{ color: "#10B981" }} className="text-xs">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card style={{ borderLeft: "4px solid #8B5CF6" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp style={{ color: "#8B5CF6" }} className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div style={{ color: "#7C3AED" }} className="text-2xl font-bold">
              {avgConversionRate.toFixed(1)}%
            </div>
            <p style={{ color: "#10B981" }} className="text-xs">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card style={{ borderLeft: "4px solid #F97316" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign style={{ color: "#F97316" }} className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div style={{ color: "#EA580C" }} className="text-2xl font-bold">
              ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : "0"}
            </div>
            <p style={{ color: "#10B981" }} className="text-xs">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown by Platform</CardTitle>
          <CardDescription>Distribution across all revenue sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(aggregatedBreakdown).map(([platform, revenue]) => {
              const Icon = platformIcons[platform as keyof typeof platformIcons]
              const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0
              const colors = platformColors[platform as keyof typeof platformColors]

              return (
                <div key={platform} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon style={{ color: colors.icon }} className="h-5 w-5" />
                      <span style={{ color: colors.text }} className="font-medium capitalize">
                        {platform === "giveButter" ? "GiveButter" : platform}
                      </span>
                    </div>
                    <div className="text-right">
                      <div style={{ color: colors.text }} className="font-bold">
                        ${revenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      style={{
                        width: `${Math.max(percentage, 2)}%`,
                        backgroundColor: colors.bar,
                        transition: "width 0.5s ease-out",
                      }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campaign Performance</h3>
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription>Artist: {campaign.artist}</CardDescription>
                </div>
                <Badge
                  style={{
                    backgroundColor: campaign.status === "active" ? "#10B981" : undefined,
                  }}
                  variant={campaign.status === "active" ? "default" : "secondary"}
                >
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div style={{ backgroundColor: "#EFF6FF" }} className="text-center p-4 rounded-lg">
                  <div style={{ color: "#2563EB" }} className="text-2xl font-bold">
                    ${campaign.salesMetrics.totalRevenue.toLocaleString()}
                  </div>
                  <p style={{ color: "#3B82F6" }} className="text-sm font-medium">
                    Total Revenue
                  </p>
                </div>
                <div style={{ backgroundColor: "#ECFDF5" }} className="text-center p-4 rounded-lg">
                  <div style={{ color: "#059669" }} className="text-2xl font-bold">
                    {campaign.salesMetrics.totalOrders}
                  </div>
                  <p style={{ color: "#10B981" }} className="text-sm font-medium">
                    Orders
                  </p>
                </div>
                <div style={{ backgroundColor: "#F5F3FF" }} className="text-center p-4 rounded-lg">
                  <div style={{ color: "#7C3AED" }} className="text-2xl font-bold">
                    {campaign.salesMetrics.conversionRate}%
                  </div>
                  <p style={{ color: "#8B5CF6" }} className="text-sm font-medium">
                    Conversion Rate
                  </p>
                </div>
                <div style={{ backgroundColor: "#FFF7ED" }} className="text-center p-4 rounded-lg">
                  <div style={{ color: "#EA580C" }} className="text-2xl font-bold">
                    ${campaign.salesMetrics.averageOrderValue}
                  </div>
                  <p style={{ color: "#F97316" }} className="text-sm font-medium">
                    Avg Order Value
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
