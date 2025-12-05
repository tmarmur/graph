import { detectApprovalRedundancy } from "@/lib/ai/google-ai"
import { cacheAIAnalysis } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { steps, department, processType, organizationId } = body

    if (!steps || !department || !processType || !organizationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const analysis = await detectApprovalRedundancy({
      steps,
      department,
      processType,
    })

    // Cache the analysis
    await cacheAIAnalysis({
      id: `approval_${processType}_${Date.now()}`,
      organizationId,
      analysisType: "approval_redundancy",
      targetId: processType,
      resultData: analysis.object,
      confidenceScore: 0.9,
    })

    return NextResponse.json(analysis.object)
  } catch (error) {
    console.error("[v0] POST /api/ai/approval-chain error:", error)
    return NextResponse.json({ error: "Failed to analyze approval chain" }, { status: 500 })
  }
}
