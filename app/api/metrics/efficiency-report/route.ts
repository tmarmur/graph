import { getEmployeesByOrganization } from "@/lib/db/sqlite"
import {
  calculateEmployeeEfficiency,
  identifyRedundancies,
  analyzeApprovalChains,
  calculateCostSavings,
  calculateOrganizationEfficiency,
  getHealthScore,
  estimateProductivityGain,
  type OrganizationEfficiencyMetrics,
} from "@/lib/efficiency/scoring-engine"
import { DEMO_DATA, DEMO_ORGANIZATION_ID } from "@/lib/demo-data"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId } = body

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId required" }, { status: 400 })
    }

    const isDemo = !process.env.DATABASE_URL || organizationId === DEMO_ORGANIZATION_ID
    let employees: any[] = []
    let relationships: any[] = []

    if (isDemo) {
      // Use demo data
      employees = DEMO_DATA.orgChart.map((emp) => ({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        manager_id: emp.parent,
        cost_annual: 85000 + Math.random() * 50000,
        automation_score: (emp.automationScore || 0) * 100,
        is_active: 1,
      }))

      relationships = Object.entries(DEMO_DATA.relationshipMap).flatMap(([source, targets]) =>
        (targets as string[]).map((target) => ({
          id: `rel_${source}_${target}`,
          organization_id: organizationId,
          source_employee_id: source,
          target_employee_id: target,
          relationship_type: "reports_to",
          strength: 1.0,
          is_approval_chain: false,
        })),
      )
    } else {
      // Fetch from database
      employees = await getEmployeesByOrganization(organizationId)
      const db = require("@/lib/db/sqlite").getDb()
      if (db) {
        relationships = await db(`SELECT * FROM employee_relationships WHERE organization_id = $1`, [organizationId])
      }
    }

    if (employees.length === 0) {
      return NextResponse.json({ error: "No employees found" }, { status: 404 })
    }

    // Build approval chains
    const approvalChains = relationships
      .filter((r: any) => r.is_approval_chain)
      .map((r: any) => ({
        processType: "approval",
        steps: [
          { role: "Employee", automatable: false },
          { role: "Manager", automatable: true },
        ],
        department: "General",
      }))

    // Calculate individual efficiency scores
    const employeeMetrics = employees.map((emp: any) => {
      const empRelationships = relationships.filter(
        (r: any) => r.source_employee_id === emp.id || r.target_employee_id === emp.id,
      )
      const directReports = employees.filter((e: any) => e.manager_id === emp.id).length

      const efficiencyScore = calculateEmployeeEfficiency({
        automationScore: emp.automation_score || 0,
        role: emp.role,
        costAnnual: emp.cost_annual || 0,
        relationshipCount: empRelationships.length,
        directReports,
        yearsInRole: 1,
        skillMatches: 5,
        totalRequiredSkills: 5,
      })

      return {
        employeeId: emp.id,
        name: emp.name,
        role: emp.role,
        efficiencyScore,
      }
    })

    // Calculate redundancies
    const redundancies = identifyRedundancies(
      employees.map((e: any) => ({
        id: e.id,
        role: e.role,
        department: e.department,
        automationScore: e.automation_score || 0,
        costAnnual: e.cost_annual || 0,
      })),
    )

    // Analyze approval chains
    const approvalAnalysis = analyzeApprovalChains(approvalChains)

    // Calculate cost savings
    const costSavings = calculateCostSavings({
      redundantRoles: redundancies.map((r) => ({
        count: r.count,
        totalCost: r.totalCost,
      })),
      automationOpportunities: [],
      roleConsolidations: [],
    })

    // Calculate organization efficiency
    const avgEmployeeEfficiency =
      employeeMetrics.reduce((sum: number, m: any) => sum + m.efficiencyScore, 0) / employeeMetrics.length

    const overallScore = calculateOrganizationEfficiency({
      employees: employees.map((e: any) => ({
        id: e.id,
        role: e.role,
        department: e.department,
        automationScore: e.automation_score || 0,
        costAnnual: e.cost_annual || 0,
      })),
      redundancies,
      approvalChains,
      averageEmployeeEfficiency: avgEmployeeEfficiency,
    })

    // Generate recommendations
    const recommendations: string[] = []
    if (redundancies.length > 0) {
      recommendations.push(
        `Consolidate ${redundancies.length} redundant role groups to save ${Math.round(costSavings / 1000)}K annually`,
      )
    }
    if (approvalAnalysis.automationPotential > 30) {
      recommendations.push(`Automate ${approvalAnalysis.automationPotential}% of approval workflows`)
    }
    if (overallScore < 60) {
      recommendations.push("Schedule organizational restructuring review with leadership")
    }

    const productivityGain = estimateProductivityGain({
      automationPotential: redundancies.length > 0 ? 35 : 0,
      redundancyReduction: redundancies.length * 5,
      approvalStreamlining: approvalAnalysis.automationPotential,
    })

    const report: OrganizationEfficiencyMetrics = {
      organizationId,
      overallEfficiencyScore: overallScore,
      redundantRolesCount: redundancies.length,
      automationOpportunityPercentage: approvalAnalysis.automationPotential,
      approvalChainRedundancy: approvalAnalysis.redundantApprovals,
      estimatedCostSavings: costSavings,
      potentialProductivityGain: productivityGain,
      topOptimizationAreas: recommendations,
      healthScore: getHealthScore(overallScore),
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("[v0] POST /api/metrics/efficiency-report error:", error)
    return NextResponse.json({ error: "Failed to generate efficiency report" }, { status: 500 })
  }
}
