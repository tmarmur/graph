// This file contains configuration and helper functions for Neo4j

export interface Neo4jConfig {
  uri: string
  username: string
  password: string
}

export function getNeo4jConfig(): Neo4jConfig {
  return {
    uri: process.env.NEO4J_URI || "bolt://localhost:7687",
    username: process.env.NEO4J_USERNAME || "neo4j",
    password: process.env.NEO4J_PASSWORD || "password",
  }
}

// Query templates for common Neo4j operations
export const neo4jQueries = {
  // Create employee node
  createEmployee: `
    CREATE (e:Employee {
      id: $id,
      organizationId: $organizationId,
      name: $name,
      email: $email,
      role: $role,
      department: $department,
      automationScore: $automationScore,
      createdAt: $createdAt
    })
    RETURN e
  `,

  // Create manager relationship
  createManagerRelationship: `
    MATCH (manager:Employee {id: $managerId}), (employee:Employee {id: $employeeId})
    CREATE (employee)-[r:REPORTS_TO {strength: 1.0}]->(manager)
    RETURN r
  `,

  // Find redundant roles
  findRedundantRoles: `
    MATCH (org:Organization {id: $organizationId})
    MATCH (e1:Employee {organizationId: $organizationId})-[:HAS_ROLE]->(r:Role)
    MATCH (e2:Employee {organizationId: $organizationId})-[:HAS_ROLE]->(r)
    WHERE e1.id < e2.id
    RETURN e1, e2, r, count(*) as similarity
    ORDER BY similarity DESC
  `,

  // Analyze approval chains
  analyzeApprovalChains: `
    MATCH (org:Organization {id: $organizationId})
    MATCH path = (requester:Employee)-[:NEEDS_APPROVAL_FROM*1..10]->(approver:Employee)
    WHERE org.id = requester.organizationId
    RETURN path, length(path) as chainLength
    ORDER BY chainLength DESC
  `,

  // Get organization hierarchy
  getOrgHierarchy: `
    MATCH (org:Organization {id: $organizationId})
    MATCH (e:Employee {organizationId: $organizationId})
    OPTIONAL MATCH (e)-[:REPORTS_TO]->(manager:Employee)
    RETURN e {.*}, manager {id: manager.id, name: manager.name, role: manager.role}
    ORDER BY e.name
  `,

  // Find weak paths (low interaction nodes)
  findWeakPaths: `
    MATCH (org:Organization {id: $organizationId})
    MATCH (e:Employee {organizationId: $organizationId})
    OPTIONAL MATCH (e)-[r:COLLABORATES_WITH]->(other:Employee)
    WITH e, count(r) as connectionCount, avg(r.strength) as avgStrength
    WHERE connectionCount < 3 OR avgStrength < 0.5
    RETURN e, connectionCount, avgStrength
    ORDER BY connectionCount ASC, avgStrength ASC
  `,
}

// Placeholder for Neo4j driver initialization (will be replaced when credentials are provided)
export function getDriver() {
  // When Neo4j Aura credentials are provided, initialize the driver here
  throw new Error(
    "Neo4j Aura credentials not yet configured. Please add NEO4J_URI, NEO4J_USERNAME, and NEO4J_PASSWORD to environment variables.",
  )
}
