export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  managerId?: string
  skills: string[]
  automationScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface OrgNode {
  id: string
  employeeId: string
  parentId?: string
  children: string[]
  relationshipStrength: number
  automationPotential: number
}

export interface AIAnalysis {
  nodeId: string
  redundancyScore: number
  automationPotential: number
  recommendations: string[]
  costImpact: number
}

export interface EfficiencyMetrics {
  redundantRoles: number
  automationPotential: number
  approvalChainRedundancy: number
  potentialCostSavings: number
}
