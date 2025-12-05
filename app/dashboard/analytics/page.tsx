"use client"

import Sidebar from "@/components/dashboard/sidebar"
import EfficiencyReport from "@/components/dashboard/efficiency-report"
import { DEMO_ORGANIZATION_ID, DEMO_DATA } from "@/lib/demo-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={false} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">Analytics & Metrics</h1>
            <p className="text-sm text-muted-foreground mt-1">Deep dive into your organization's efficiency metrics</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Efficiency Score</p>
                <TrendingUp className="text-green-500" size={18} />
              </div>
              <p className="text-4xl font-bold">75</p>
              <p className="text-xs text-muted-foreground mt-2">+5 points this quarter</p>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Redundancy Index</p>
                <TrendingDown className="text-red-500" size={18} />
              </div>
              <p className="text-4xl font-bold">24%</p>
              <p className="text-xs text-muted-foreground mt-2">
                {DEMO_DATA.metrics.redundantRoles} role groups detected
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Automation Ready</p>
                <TrendingUp className="text-blue-500" size={18} />
              </div>
              <p className="text-4xl font-bold">{DEMO_DATA.metrics.automationPotential}%</p>
              <p className="text-xs text-muted-foreground mt-2">Of workflows can be automated</p>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Projected Savings</p>
                <TrendingUp className="text-green-500" size={18} />
              </div>
              <p className="text-4xl font-bold">{DEMO_DATA.metrics.potentialCostSavings}</p>
              <p className="text-xs text-muted-foreground mt-2">Annual ROI potential</p>
            </Card>
          </div>

          {/* Full Efficiency Report */}
          <EfficiencyReport organizationId={DEMO_ORGANIZATION_ID} />

          {/* Recommendations */}
          <Card className="p-8 bg-card/50 border-border/50">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="text-primary" size={24} />
              <h2 className="text-2xl font-bold">AI Recommendations</h2>
            </div>

            <div className="space-y-4">
              {DEMO_DATA.metrics.recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <Badge
                      variant={rec.impact === "high" ? "default" : rec.impact === "medium" ? "secondary" : "outline"}
                    >
                      {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
