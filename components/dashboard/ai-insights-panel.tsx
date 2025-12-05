"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, Zap, AlertCircle } from "lucide-react"

interface AIInsightsPanelProps {
  organizationId: string
  onAnalysisComplete?: (data: any) => void
}

export default function AIInsightsPanel({ organizationId, onAnalysisComplete }: AIInsightsPanelProps) {
  const [loading, setLoading] = useState(false)
  const [insights, setInsights] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/org-efficiency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizationId }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setInsights(data)
      onAnalysisComplete?.(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border/50 backdrop-blur">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="text-primary" size={20} />
          <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
        </div>

        {!insights && !loading && (
          <p className="text-sm text-muted-foreground">
            Run AI analysis to discover optimization opportunities across your organization.
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-sm">
            <Loader className="animate-spin" size={16} />
            Analyzing organization structure...
          </div>
        )}

        {insights && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/50 p-3 rounded">
                <p className="text-xs text-muted-foreground">Efficiency Score</p>
                <p className="text-2xl font-bold text-primary">{insights.efficiencyScore}</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="text-xs text-muted-foreground">Automation Ready</p>
                <p className="text-sm font-semibold">{insights.automationReadiness}</p>
              </div>
            </div>

            <div className="bg-background/50 p-3 rounded">
              <p className="text-xs font-semibold text-muted-foreground mb-2">TOP PRIORITY</p>
              <p className="text-sm">{insights.priorities?.[0] || "No priorities identified"}</p>
            </div>

            <div className="bg-background/50 p-3 rounded">
              <p className="text-xs font-semibold text-muted-foreground mb-2">EXPECTED ROI</p>
              <p className="text-2xl font-bold text-accent">{insights.expectedROI}%</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <Button onClick={runAnalysis} disabled={loading} className="w-full">
          {loading ? "Analyzing..." : "Run AI Analysis"}
        </Button>
      </div>
    </Card>
  )
}
