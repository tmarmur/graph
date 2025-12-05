import { updateEmployee, getDb } from "@/lib/db/sqlite"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb()
    const result = await db("SELECT * FROM employees WHERE id = $1", [params.id])

    if (!result.length) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] GET /api/employees/[id] error:", error)
    return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const result = await updateEmployee(params.id, body)

    if (!result.length) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("[v0] PUT /api/employees/[id] error:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb()
    const result = await db(
      "UPDATE employees SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [params.id],
    )

    if (!result.length) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] DELETE /api/employees/[id] error:", error)
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 })
  }
}
