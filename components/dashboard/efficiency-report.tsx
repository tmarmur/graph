"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, TrendingUp, DollarSign } from "lucide-react"

interface EfficiencyReportProps {
  organizationId: string
}

export default function EfficiencyReport({ organizationId }: EfficiencyReportProps) {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReport()
  }, [organizationId])

  const loadReport = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/metrics/efficiency-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId }),
      })

      if (res.ok) {
        const data = await res.json()
        setReport(data)
      } else {
        console.error("[v0] Error loading report:", res.status)
      }
    } catch (error) {
      console.error("[v0] Error loading report:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Card className="p-8 text-center text-muted-foreground">Loading efficiency report...</Card>
  }

  if (!report) {
    return (
      <Card className="p-8 text-center">
        <Button onClick={loadReport}>Generate Report</Button>
      </Card>
    )
  }

  const healthColors = {
    excellent: "text-green-500 bg-green-500/10",
    good: "text-blue-500 bg-blue-500/10",
    fair: "text-yellow-500 bg-yellow-500/10",
    poor: "text-orange-500 bg-orange-500/10",
    critical: "text-destructive bg-destructive/10",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Efficiency Report</h2>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis of your organization's efficiency and optimization opportunities
            </p>
          </div>
          <div className={`text-center p-4 rounded-lg ${healthColors[report.healthScore]}`}>
            <p className="text-xs font-semibold mb-1">Health Status</p>
            <p className="text-xl font-bold capitalize">{report.healthScore}</p>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Efficiency Score</p>
          <p className="text-3xl font-bold text-primary">{report.overallEfficiencyScore}</p>
          <p className="text-xs text-muted-foreground mt-2">out of 100</p>
        </Card>

        <Card className="p-4 bg-card/50 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Redundant Roles</p>
          <p className="text-3xl font-bold text-destructive">{report.redundantRolesCount}</p>
          <p className="text-xs text-muted-foreground mt-2">role groups</p>
        </Card>

        <Card className="p-4 bg-card/50 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Automation Potential</p>
          <p className="text-3xl font-bold text-accent">{report.automationOpportunityPercentage}%</p>
          <p className="text-xs text-muted-foreground mt-2">of workflows</p>
        </Card>

        <Card className="p-4 bg-card/50 border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Potential Savings</p>
          <p className="text-3xl font-bold text-green-500">${Math.round(report.estimatedCostSavings / 1000)}K</p>
          <p className="text-xs text-muted-foreground mt-2">annually</p>
        </Card>
      </div>

      {/* Productivity & Savings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-accent" size={20} />
            <h3 className="font-semibold">Productivity Gain</h3>
          </div>
          <p className="text-4xl font-bold text-accent mb-2">{report.potentialProductivityGain}%</p>
          <p className="text-sm text-muted-foreground">Expected improvement through optimization</p>
        </Card>

        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="text-green-500" size={20} />
            <h3 className="font-semibold">Annual Cost Savings</h3>
          </div>
          <p className="text-4xl font-bold text-green-500 mb-2">${Math.round(report.estimatedCostSavings / 1000)}K</p>
          <p className="text-sm text-muted-foreground">From consolidation and automation</p>
        </Card>
      </div>

      {/* Top Recommendations */}
      {report.topOptimizationAreas && report.topOptimizationAreas.length > 0 && (
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-primary" size={20} />
            <h3 className="font-semibold">Top Recommendations</h3>
          </div>
          <div className="space-y-3">
            {report.topOptimizationAreas.map((rec: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-background/50 rounded">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Call to Action */}
      <div className="flex gap-3">
        <Button onClick={loadReport} className="flex-1">
          Refresh Report
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Export Report
        </Button>
      </div>
    </div>
  )
}
