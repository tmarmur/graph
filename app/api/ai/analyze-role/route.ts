import { analyzeRoleAutomation } from "@/lib/ai/google-ai"
import { cacheAIAnalysis } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { role, department, responsibilities, skills, organizationId, employeeId } = body

    if (!role || !department || !responsibilities || !organizationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const analysis = await analyzeRoleAutomation({
      role,
      department,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
      skills: Array.isArray(skills) ? skills : [skills],
    })

    // Cache the analysis
    if (employeeId) {
      await cacheAIAnalysis({
        id: `role_analysis_${employeeId}_${Date.now()}`,
        organizationId,
        analysisType: "role_automation",
        targetId: employeeId,
        resultData: analysis.object,
        confidenceScore: analysis.object.confidence,
      })
    }

    return NextResponse.json(analysis.object)
  } catch (error) {
    console.error("[v0] POST /api/ai/analyze-role error:", error)
    return NextResponse.json({ error: "Failed to analyze role" }, { status: 500 })
  }
}
