import { suggestRoleConsolidation } from "@/lib/ai/google-ai"
import { cacheAIAnalysis } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employees, organizationId } = body

    if (!employees || !organizationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const analysis = await suggestRoleConsolidation(employees)

    // Cache the analysis
    await cacheAIAnalysis({
      id: `consolidation_${organizationId}_${Date.now()}`,
      organizationId,
      analysisType: "role_consolidation",
      targetId: organizationId,
      resultData: analysis.object,
      confidenceScore: 0.85,
    })

    return NextResponse.json(analysis.object)
  } catch (error) {
    console.error("[v0] POST /api/ai/consolidation error:", error)
    return NextResponse.json({ error: "Failed to analyze consolidation" }, { status: 500 })
  }
}
