import { getDb, getCachedAnalysis, cacheAIAnalysis } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employeeId, organizationId } = body

    if (!employeeId || !organizationId) {
      return NextResponse.json({ error: "employeeId and organizationId required" }, { status: 400 })
    }

    // Check cache first
    const cached = await getCachedAnalysis(organizationId, "efficiency_score", employeeId)
    if (cached) {
      return NextResponse.json(JSON.parse(cached.result_data))
    }

    // Get employee data
    const db = getDb()
    const employeeResult = await db("SELECT * FROM employees WHERE id = $1", [employeeId])

    if (!employeeResult.length) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    const employee = employeeResult[0]

    // Get relationships count
    const relResult = await db(
      `SELECT COUNT(*) as count FROM employee_relationships 
       WHERE organization_id = $1 AND (source_employee_id = $2 OR target_employee_id = $2)`,
      [organizationId, employeeId],
    )

    const relationshipCount = relResult[0]?.count || 0

    // Calculate efficiency score (0-100)
    // Based on: automation score, role specificity, relationship centrality
    const automationComponent = (employee.automation_score || 0) * 40
    const relationshipComponent = Math.min(relationshipCount / 10, 1) * 30
    const roleComponent = employee.role.length > 10 ? 30 : 15

    const efficiencyScore = automationComponent + relationshipComponent + roleComponent

    const result = {
      employeeId,
      efficiencyScore: Math.round(efficiencyScore),
      automationScore: employee.automation_score || 0,
      relationshipCount,
      analyzedAt: new Date().toISOString(),
    }

    // Cache result
    await cacheAIAnalysis({
      id: `eff_${employeeId}_${Date.now()}`,
      organizationId,
      analysisType: "efficiency_score",
      targetId: employeeId,
      resultData: result,
      confidenceScore: 0.85,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] POST /api/analysis/efficiency-score error:", error)
    return NextResponse.json({ error: "Failed to calculate efficiency score" }, { status: 500 })
  }
}
