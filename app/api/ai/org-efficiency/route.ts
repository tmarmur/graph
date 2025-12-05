import { analyzeOrganizationEfficiency } from "@/lib/ai/google-ai"
import { cacheAIAnalysis, getDb } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId } = body

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId required" }, { status: 400 })
    }

    const db = getDb()

    // Get organization metrics
    const employeeResult = await db(
      `SELECT 
        COUNT(*) as total,
        AVG(automation_score) as avg_automation,
        department,
        COUNT(*) as dept_count
       FROM employees 
       WHERE organization_id = $1 AND is_active = 1
       GROUP BY department`,
      [organizationId],
    )

    const totalEmployees = employeeResult.reduce((sum: number, row: any) => sum + row.total, 0)
    const departments: Record<string, number> = {}
    let totalAutomation = 0

    employeeResult.forEach((row: any) => {
      departments[row.department] = row.dept_count
      totalAutomation += row.avg_automation || 0
    })

    const avgAutomationScore = totalAutomation / (employeeResult.length || 1)

    const analysis = await analyzeOrganizationEfficiency({
      totalEmployees,
      departments,
      hierarchy: { "Level 1": 1 },
      avgAutomationScore,
    })

    // Cache the analysis
    await cacheAIAnalysis({
      id: `org_efficiency_${organizationId}_${Date.now()}`,
      organizationId,
      analysisType: "organization_efficiency",
      targetId: organizationId,
      resultData: analysis.object,
      confidenceScore: 0.88,
    })

    return NextResponse.json(analysis.object)
  } catch (error) {
    console.error("[v0] POST /api/ai/org-efficiency error:", error)
    return NextResponse.json({ error: "Failed to analyze organization efficiency" }, { status: 500 })
  }
}
