"use client"

import Sidebar from "@/components/dashboard/sidebar"
import AIInsightsPanel from "@/components/dashboard/ai-insights-panel"
import { DEMO_ORGANIZATION_ID } from "@/lib/demo-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Brain, TrendingUp, AlertTriangle } from "lucide-react"

export default function InsightsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={false} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">AI-Powered Insights</h1>
            <p className="text-sm text-muted-foreground mt-1">Intelligent analysis of your organization</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* AI Insights Panel */}
          <AIInsightsPanel organizationId={DEMO_ORGANIZATION_ID} />

          {/* Analysis Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/50 border-border/50 hover:border-border transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-semibold">Role Automation Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Identify which roles can be partially or fully automated with AI agents and systems.
              </p>
              <Button variant="outline" className="bg-transparent w-full justify-start">
                Run Analysis
              </Button>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 hover:border-border transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Brain className="text-accent" size={20} />
                </div>
                <h3 className="text-lg font-semibold">Approval Chain Optimization</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Find redundant sign-offs and streamline decision-making processes.
              </p>
              <Button variant="outline" className="bg-transparent w-full justify-start">
                Analyze Chains
              </Button>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 hover:border-border transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="text-green-500" size={20} />
                </div>
                <h3 className="text-lg font-semibold">Role Consolidation Strategy</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Find opportunities to merge roles and reduce organizational overhead.
              </p>
              <Button variant="outline" className="bg-transparent w-full justify-start">
                Explore Options
              </Button>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 hover:border-border transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="text-orange-500" size={20} />
                </div>
                <h3 className="text-lg font-semibold">Weak Path Detection</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Identify single points of failure and critical path vulnerabilities.
              </p>
              <Button variant="outline" className="bg-transparent w-full justify-start">
                Detect Issues
              </Button>
            </Card>
          </div>

          {/* Key Findings */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border/50">
            <h3 className="text-lg font-semibold mb-4">Key Findings Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-semibold">High Priority:</span> Finance coordinator role can be 88% automated
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-semibold">Medium Priority:</span> Sales approval chain has 2 redundant sign-offs
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p className="text-sm">
                  <span className="font-semibold">Opportunity:</span> Consolidate two sales manager roles for 15%
                  efficiency gain
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
