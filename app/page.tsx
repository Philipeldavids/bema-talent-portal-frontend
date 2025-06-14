import { Suspense } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TOFUSection } from "@/components/tofu-section"
import { MOFUSection } from "@/components/mofu-section"
import { BOFUSection } from "@/components/bofu-section"
import { Skeleton } from "@/components/ui/skeleton"
import Logo from 'next/image'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
        <div className="flex space-x-5 items-center">
          <Logo

          src="/bema_logo.png"
          alt="logo"
          width ={80}
          height={20}
          />
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bema Talent Portal
          </h1>
          </div>
          <p className="text-muted-foreground">Full-funnel artist performance dashboard</p>
        </div>

        <Tabs defaultValue="tofu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="tofu"
              style={{
                backgroundColor: "var(--state-active) ? #3B82F6 : undefined",
                color: "var(--state-active) ? white : undefined",
              }}
            >
              TOFU - Social Awareness
            </TabsTrigger>
            <TabsTrigger
              value="mofu"
              style={{
                backgroundColor: "var(--state-active) ? #10B981 : undefined",
                color: "var(--state-active) ? white : undefined",
              }}
            >
              MOFU - Engagement & CRM
            </TabsTrigger>
            <TabsTrigger
              value="bofu"
              style={{
                backgroundColor: "var(--state-active) ? #8B5CF6 : undefined",
                color: "var(--state-active) ? white : undefined",
              }}
            >
              BOFU - Sales & Conversions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tofu" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <TOFUSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="mofu" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <MOFUSection />
            </Suspense>
          </TabsContent>

          <TabsContent value="bofu" className="space-y-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <BOFUSection />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
