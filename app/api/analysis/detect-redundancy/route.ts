import { getEmployeesByOrganization } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId } = body

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId required" }, { status: 400 })
    }

    // Get all employees
    const employees = await getEmployeesByOrganization(organizationId)

    // Group by department and role
    const roleGroups = new Map<string, any[]>()

    employees.forEach((emp) => {
      const key = `${emp.department}:${emp.role}`
      if (!roleGroups.has(key)) {
        roleGroups.set(key, [])
      }
      roleGroups.get(key)!.push(emp)
    })

    // Identify redundancies
    const redundancies = Array.from(roleGroups.entries())
      .filter(([_, emps]) => emps.length > 1)
      .map(([key, emps]) => ({
        role: key.split(":")[1],
        department: key.split(":")[0],
        count: emps.length,
        employees: emps.map((e) => ({ id: e.id, name: e.name, automationScore: e.automation_score })),
        redundancyLevel: emps.length > 3 ? "high" : emps.length > 1 ? "medium" : "low",
      }))

    return NextResponse.json({
      organizationId,
      redundantRoles: redundancies,
      totalRedundancy: redundancies.length,
      analyzedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] POST /api/analysis/detect-redundancy error:", error)
    return NextResponse.json({ error: "Failed to detect redundancy" }, { status: 500 })
  }
}
