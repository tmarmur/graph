import { neon } from "@neondatabase/serverless"
import type { NeonQueryFunction } from "@neondatabase/serverless"

let sqliteClient: NeonQueryFunction | null = null

const isDatabaseAvailable = () => {
  return !!process.env.DATABASE_URL
}

export function getDb() {
  if (!isDatabaseAvailable()) {
    // In demo/development mode without DATABASE_URL
    return null
  }

  if (!sqliteClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required for database operations")
    }
    sqliteClient = neon(process.env.DATABASE_URL)
  }
  return sqliteClient
}

// Helper functions for common queries
export async function createEmployee(data: {
  id: string
  organizationId: string
  name: string
  email: string
  role: string
  department: string
  managerId?: string | null
  costAnnual?: number
  skills?: string[]
}) {
  const db = getDb()
  if (!db) return null // Fallback in demo mode
  const skillsJson = data.skills ? JSON.stringify(data.skills) : null

  return db(
    `INSERT INTO employees (id, organization_id, name, email, role, department, manager_id, cost_annual, skills)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      data.id,
      data.organizationId,
      data.name,
      data.email,
      data.role,
      data.department,
      data.managerId || null,
      data.costAnnual,
      skillsJson,
    ],
  )
}

export async function updateEmployee(
  id: string,
  data: Partial<{
    name: string
    email: string
    role: string
    department: string
    managerId: string | null
    costAnnual: number
    automationScore: number
  }>,
) {
  const db = getDb()
  if (!db) return null // Fallback in demo mode
  const fields: string[] = []
  const values: any[] = [id]
  let paramCount = 2

  if (data.name) {
    fields.push(`name = $${paramCount++}`)
    values.push(data.name)
  }
  if (data.role) {
    fields.push(`role = $${paramCount++}`)
    values.push(data.role)
  }
  if (data.department) {
    fields.push(`department = $${paramCount++}`)
    values.push(data.department)
  }
  if (data.managerId !== undefined) {
    fields.push(`manager_id = $${paramCount++}`)
    values.push(data.managerId)
  }
  if (data.costAnnual !== undefined) {
    fields.push(`cost_annual = $${paramCount++}`)
    values.push(data.costAnnual)
  }
  if (data.automationScore !== undefined) {
    fields.push(`automation_score = $${paramCount++}`)
    values.push(data.automationScore)
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`)

  return db(`UPDATE employees SET ${fields.join(", ")} WHERE id = $1 RETURNING *`, values)
}

export async function getEmployeesByOrganization(organizationId: string) {
  const db = getDb()
  if (!db) return [] // Return empty array in demo mode
  return db(`SELECT * FROM employees WHERE organization_id = $1 AND is_active = 1 ORDER BY name ASC`, [organizationId])
}

export async function createRelationship(data: {
  id: string
  organizationId: string
  sourceEmployeeId: string
  targetEmployeeId: string
  relationshipType: string
  strength?: number
  isApprovalChain?: boolean
}) {
  const db = getDb()
  if (!db) return null // Fallback in demo mode
  return db(
    `INSERT INTO employee_relationships (id, organization_id, source_employee_id, target_employee_id, relationship_type, strength, is_approval_chain)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.id,
      data.organizationId,
      data.sourceEmployeeId,
      data.targetEmployeeId,
      data.relationshipType,
      data.strength || 1.0,
      data.isApprovalChain || false,
    ],
  )
}

export async function getRelationshipsByOrganization(organizationId: string) {
  const db = getDb()
  if (!db) return [] // Return empty array in demo mode
  return db(`SELECT * FROM employee_relationships WHERE organization_id = $1`, [organizationId])
}

export async function cacheAIAnalysis(data: {
  id: string
  organizationId: string
  analysisType: string
  targetId: string
  resultData: any
  confidenceScore: number
  expiresAt?: Date
}) {
  const db = getDb()
  if (!db) return null // Skip caching in demo mode
  const expiresAt = data.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000)

  return db(
    `INSERT INTO ai_analysis_results (id, organization_id, analysis_type, target_id, result_data, confidence_score, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT(organization_id, analysis_type, target_id) DO UPDATE SET result_data = $5, confidence_score = $6, expires_at = $7
     RETURNING *`,
    [
      data.id,
      data.organizationId,
      data.analysisType,
      data.targetId,
      JSON.stringify(data.resultData),
      data.confidenceScore,
      expiresAt.toISOString(),
    ],
  )
}

export async function getCachedAnalysis(organizationId: string, analysisType: string, targetId: string) {
  const db = getDb()
  if (!db) return null // No cache in demo mode
  const result = await db(
    `SELECT * FROM ai_analysis_results 
     WHERE organization_id = $1 AND analysis_type = $2 AND target_id = $3 AND expires_at > CURRENT_TIMESTAMP`,
    [organizationId, analysisType, targetId],
  )
  return result?.[0]
}
