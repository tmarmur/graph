"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Sidebar from "@/components/dashboard/sidebar"
import OrganizationChart from "@/components/dashboard/organization-chart"
import EfficiencyMetrics from "@/components/dashboard/efficiency-metrics"
import EfficiencyReport from "@/components/dashboard/efficiency-report"
import AIInsightsPanel from "@/components/dashboard/ai-insights-panel"
import { DEMO_DATA, DEMO_ORGANIZATION_ID } from "@/lib/demo-data"
import { Users, TrendingDown, AlertTriangle } from "lucide-react"

export default function DemoPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "insights">("overview")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const demoStats = [
    {
      label: "Total Employees",
      value: DEMO_DATA.orgChart.length.toString(),
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Departments",
      value: "4",
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "Potential Savings",
      value: "$287K",
      icon: TrendingDown,
      color: "text-green-500",
    },
    {
      label: "Risk Areas",
      value: DEMO_DATA.metrics.recommendations.filter((r) => r.impact === "high").length.toString(),
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={true} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Demo Organization</h1>
                <p className="text-sm text-muted-foreground">
                  Interactive walkthrough with AI-powered organizational insights
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Exit Demo
                </Button>
              </Link>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-t border-border/50 pt-4">
              {(["overview", "analytics", "insights"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-card"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {demoStats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <Card key={stat.label} className="p-6 bg-card/50 border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <Icon className={stat.color} size={20} />
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </Card>
                    )
                  })}
                </div>

                {/* Organization Chart Section */}
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Organization Structure</h2>
                    <p className="text-sm text-muted-foreground">
                      Interactive org chart showing employee hierarchy and relationships. Blue borders highlight roles
                      with high automation potential.
                    </p>
                  </div>
                  <Card className="p-8 bg-card/50 border-border/50 overflow-auto">
                    <OrganizationChart data={DEMO_DATA.orgChart} onNodeClick={setSelectedEmployee} />
                  </Card>
                </section>

                {/* Efficiency Metrics */}
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Key Efficiency Metrics</h2>
                    <p className="text-sm text-muted-foreground">
                      AI-identified inefficiencies and optimization opportunities
                    </p>
                  </div>
                  <EfficiencyMetrics data={DEMO_DATA.metrics} />
                </section>

                {/* Selected Employee Details */}
                {selectedEmployee && (
                  <section>
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Employee Details</h2>
                    </div>
                    <Card className="p-6 bg-card/50 border-border/50">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {DEMO_DATA.orgChart.find((e) => e.id === selectedEmployee)?.name || "Unknown"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {DEMO_DATA.orgChart.find((e) => e.id === selectedEmployee)?.role}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedEmployee(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-background/50 p-3 rounded">
                          <p className="text-xs text-muted-foreground">Department</p>
                          <p className="font-semibold">
                            {DEMO_DATA.orgChart.find((e) => e.id === selectedEmployee)?.department}
                          </p>
                        </div>
                        <div className="bg-background/50 p-3 rounded">
                          <p className="text-xs text-muted-foreground">Automation Score</p>
                          <p className="font-semibold">
                            {DEMO_DATA.orgChart.find((e) => e.id === selectedEmployee)?.automationScore
                              ? Math.round(
                                  (DEMO_DATA.orgChart.find((e) => e.id === selectedEmployee)?.automationScore || 0) *
                                    100,
                                )
                              : "N/A"}
                            %
                          </p>
                        </div>
                        <div className="bg-background/50 p-3 rounded">
                          <p className="text-xs text-muted-foreground">Reports</p>
                          <p className="font-semibold">
                            {DEMO_DATA.orgChart.filter((e) => e.parent === selectedEmployee).length}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </section>
                )}
              </>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <>
                <EfficiencyReport organizationId={DEMO_ORGANIZATION_ID} />
              </>
            )}

            {/* Insights Tab */}
            {activeTab === "insights" && (
              <>
                <section>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">AI-Powered Insights</h2>
                    <p className="text-sm text-muted-foreground">Advanced analysis powered by Google Gemini AI</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AIInsightsPanel organizationId={DEMO_ORGANIZATION_ID} />

                    {/* Insights Explanation */}
                    <Card className="p-6 bg-card/50 border-border/50 backdrop-blur">
                      <h3 className="text-lg font-semibold mb-4">How AI Analysis Works</h3>
                      <div className="space-y-4 text-sm">
                        <div>
                          <p className="font-semibold text-primary mb-1">Role Automation Detection</p>
                          <p className="text-muted-foreground">
                            Analyzes job responsibilities and skills to identify which tasks can be automated with AI
                            tools.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-primary mb-1">Redundancy Identification</p>
                          <p className="text-muted-foreground">
                            Detects duplicate roles across departments that could be consolidated or eliminated.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-primary mb-1">Approval Chain Analysis</p>
                          <p className="text-muted-foreground">
                            Finds unnecessary approval steps and recommends streamlining opportunities.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-primary mb-1">Cost Impact Calculation</p>
                          <p className="text-muted-foreground">
                            Estimates annual savings from consolidation, automation, and process improvements.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
