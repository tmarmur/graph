import { getEmployeesByOrganization, createEmployee } from "@/lib/db/sqlite"
import { DEMO_DATA, DEMO_ORGANIZATION_ID } from "@/lib/demo-data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const organizationId = request.nextUrl.searchParams.get("organizationId")

    if (!organizationId) {
      return NextResponse.json({ error: "organizationId required" }, { status: 400 })
    }

    if (!process.env.DATABASE_URL || organizationId === DEMO_ORGANIZATION_ID) {
      const employees = DEMO_DATA.orgChart.map((emp) => ({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        manager_id: emp.parent || null,
        automation_score: (emp.automationScore || 0) * 100,
        is_active: 1,
      }))
      return NextResponse.json(employees)
    }

    const employees = await getEmployeesByOrganization(organizationId)
    return NextResponse.json(employees)
  } catch (error) {
    console.error("[v0] GET /api/employees error:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, name, email, role, department, managerId, costAnnual, skills } = body

    if (!organizationId || !name || !email || !role || !department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured. Set DATABASE_URL to enable employee creation." },
        { status: 503 },
      )
    }

    const id = `emp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const result = await createEmployee({
      id,
      organizationId,
      name,
      email,
      role,
      department,
      managerId,
      costAnnual,
      skills,
    })

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("[v0] POST /api/employees error:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}
