import { createRelationship, getRelationshipsByOrganization } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const organizationId = request.nextUrl.searchParams.get("organizationId")

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId required" }, { status: 400 })
    }

    const relationships = await getRelationshipsByOrganization(organizationId)
    return NextResponse.json(relationships)
  } catch (error) {
    console.error("[v0] GET /api/relationships error:", error)
    return NextResponse.json({ error: "Failed to fetch relationships" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, sourceEmployeeId, targetEmployeeId, relationshipType, strength, isApprovalChain } = body

    if (!organizationId || !sourceEmployeeId || !targetEmployeeId || !relationshipType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const id = `rel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const result = await createRelationship({
      id,
      organizationId,
      sourceEmployeeId,
      targetEmployeeId,
      relationshipType,
      strength,
      isApprovalChain,
    })

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] POST /api/relationships error:", error)
    return NextResponse.json({ error: "Failed to create relationship" }, { status: 500 })
  }
}
