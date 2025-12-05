"use client"

import { Card } from "@/components/ui/card"
import { TrendingDown, AlertCircle, Zap } from "lucide-react"

interface MetricData {
  redundantRoles: number
  automationPotential: number
  approvalChainRedundancy: number
  potentialCostSavings: string
  recommendations: Array<{
    id: string
    title: string
    impact: "high" | "medium" | "low"
    description: string
  }>
}

interface EfficiencyMetricsProps {
  data: MetricData
}

export default function EfficiencyMetrics({ data }: EfficiencyMetricsProps) {
  const metrics = [
    {
      title: "Redundant Roles Detected",
      value: data.redundantRoles.toString(),
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Automation Potential",
      value: `${data.automationPotential}%`,
      icon: Zap,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Approval Chain Issues",
      value: data.approvalChainRedundancy.toString(),
      icon: AlertCircle,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Potential Savings",
      value: data.potentialCostSavings,
      icon: TrendingDown,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="p-6 bg-card/50 border-border/50 backdrop-blur">
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                  <Icon className={`${metric.color}`} size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold mt-1">{metric.value}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-card/50 border-border/50 backdrop-blur">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="space-y-3">
          {data.recommendations.map((rec) => (
            <div key={rec.id} className="flex items-start gap-4 p-4 rounded border border-border/50 bg-background/30">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  rec.impact === "high"
                    ? "bg-destructive"
                    : rec.impact === "medium"
                      ? "bg-chart-1"
                      : "bg-muted-foreground"
                }`}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{rec.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  rec.impact === "high"
                    ? "bg-destructive/20 text-destructive"
                    : rec.impact === "medium"
                      ? "bg-chart-1/20 text-chart-1"
                      : "bg-muted/20 text-muted-foreground"
                }`}
              >
                {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)} Impact
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
