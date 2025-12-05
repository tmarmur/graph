"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import OrganizationChart from "@/components/dashboard/organization-chart"
import EfficiencyReport from "@/components/dashboard/efficiency-report"
import AIInsightsPanel from "@/components/dashboard/ai-insights-panel"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DEMO_DATA, DEMO_ORGANIZATION_ID } from "@/lib/demo-data"
import { Users } from "lucide-react"

export default function DashboardPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [employees, setEmployees] = useState(DEMO_DATA.orgChart)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={false} />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Organization Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage and optimize your organization structure</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-transparent">
                Export Data
              </Button>
              <Button>Generate Report</Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                  <p className="text-3xl font-bold mt-1">{employees.length}</p>
                </div>
                <Users className="text-primary/50" size={32} />
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Automation Potential</p>
                <p className="text-3xl font-bold mt-1">{DEMO_DATA.metrics.automationPotential}%</p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Redundant Roles Detected</p>
                <p className="text-3xl font-bold mt-1 text-destructive">{DEMO_DATA.metrics.redundantRoles}</p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
                <p className="text-3xl font-bold mt-1 text-green-500">{DEMO_DATA.metrics.potentialCostSavings}</p>
              </div>
            </Card>
          </div>

          {/* Organization Chart */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h2 className="text-xl font-semibold mb-4">Organization Structure</h2>
            <OrganizationChart data={employees} onNodeClick={setSelectedEmployee} />
            {selectedEmployee && (
              <div className="mt-4 p-4 bg-primary/10 rounded border border-primary/20">
                <p className="text-sm">
                  Selected:{" "}
                  <span className="font-semibold">{employees.find((e) => e.id === selectedEmployee)?.name}</span>
                </p>
              </div>
            )}
          </Card>

          {/* Efficiency Report */}
          <EfficiencyReport organizationId={DEMO_ORGANIZATION_ID} />

          {/* AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIInsightsPanel organizationId={DEMO_ORGANIZATION_ID} />
            </div>
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  Add Employee
                </Button>
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  Manage Relationships
                </Button>
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  Run Full Analysis
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
