export interface EmployeeEfficiencyMetrics {
  employeeId: string
  efficiencyScore: number // 0-100
  automationPotential: number // 0-100
  relationshipCentrality: number // 0-100
  costEffectiveness: number // 0-100
  redundancyRisk: number // 0-100
  recommendations: string[]
}

export interface OrganizationEfficiencyMetrics {
  organizationId: string
  overallEfficiencyScore: number
  redundantRolesCount: number
  automationOpportunityPercentage: number
  approvalChainRedundancy: number
  estimatedCostSavings: number
  potentialProductivityGain: number // percentage
  topOptimizationAreas: string[]
  healthScore: "critical" | "poor" | "fair" | "good" | "excellent"
}

/**
 * Calculate individual employee efficiency metrics
 */
export function calculateEmployeeEfficiency(data: {
  automationScore: number
  role: string
  costAnnual: number
  relationshipCount: number
  directReports: number
  yearsInRole: number
  skillMatches: number
  totalRequiredSkills: number
}): EmployeeEfficiencyMetrics["efficiencyScore"] {
  // Component 1: Automation Potential (0-40 points)
  const automationComponent = Math.min(data.automationScore * 0.4, 40)

  // Component 2: Role Specificity (0-20 points)
  // More specific roles = higher value, less replaceable
  const roleSpecificityScore = data.role.length > 15 ? 15 : (data.role.length / 15) * 15
  const roleComponent = 20 - roleSpecificityScore // Inverse: too generic = lower score

  // Component 3: Relationship Centrality (0-20 points)
  // Moderate relationships are healthy, too few or too many is inefficient
  const centralityOptimal = 5 // Optimal number of relationships
  const centralityDiff = Math.abs(data.relationshipCount - centralityOptimal)
  const relationshipComponent = Math.max(20 - centralityDiff * 3, 0)

  // Component 4: Span of Control (0-10 points)
  // 3-7 direct reports is optimal
  const spanOptimal = 5
  const spanDiff = Math.abs(data.directReports - spanOptimal)
  const spanComponent = Math.max(10 - spanDiff * 1.5, 0)

  // Component 5: Skill Utilization (0-10 points)
  const skillUtilization = (data.skillMatches / data.totalRequiredSkills) * 10

  const totalScore = automationComponent + roleComponent + relationshipComponent + spanComponent + skillUtilization

  return Math.round(Math.max(0, Math.min(100, totalScore)))
}

/**
 * Identify redundant positions within an organization
 */
export function identifyRedundancies(
  employees: Array<{
    id: string
    role: string
    department: string
    automationScore: number
    costAnnual: number
  }>,
) {
  const redundancies: Array<{
    roles: string[]
    department: string
    count: number
    employees: string[]
    automationPotential: number
    totalCost: number
    redundancyScore: number // 0-100, higher = more redundant
  }> = []

  const roleMap = new Map<string, typeof employees>()

  // Group by role and department
  employees.forEach((emp) => {
    const key = `${emp.department}:${emp.role}`
    if (!roleMap.has(key)) {
      roleMap.set(key, [])
    }
    roleMap.get(key)!.push(emp)
  })

  // Identify redundancies
  roleMap.forEach((emps, key) => {
    if (emps.length > 1) {
      const [department, role] = key.split(":")
      const avgAutomation = emps.reduce((sum, e) => sum + e.automationScore, 0) / emps.length
      const totalCost = emps.reduce((sum, e) => sum + e.costAnnual, 0)

      // Calculate redundancy score
      // More employees in same role + higher automation = higher redundancy
      const redundancyScore = Math.min(100, (emps.length / 5) * 50 + (avgAutomation / 100) * 50)

      redundancies.push({
        roles: [role],
        department,
        count: emps.length,
        employees: emps.map((e) => e.id),
        automationPotential: Math.round(avgAutomation),
        totalCost,
        redundancyScore: Math.round(redundancyScore),
      })
    }
  })

  return redundancies.sort((a, b) => b.redundancyScore - a.redundancyScore)
}

/**
 * Analyze approval chain efficiency
 */
export function analyzeApprovalChains(
  chains: Array<{
    processType: string
    steps: Array<{ role: string; automatable: boolean }>
    department: string
  }>,
) {
  const analysis = {
    averageChainLength: 0,
    redundantApprovals: 0,
    parallelizableApprovals: 0,
    totalProcesses: chains.length,
    automationPotential: 0,
  }

  let totalLength = 0
  let redundantCount = 0
  const parallelizableCount = 0
  let automatable = 0

  chains.forEach((chain) => {
    totalLength += chain.steps.length

    // Detect similar roles that could be parallelized
    const roleGroups = new Map<string, number>()
    chain.steps.forEach((step) => {
      roleGroups.set(step.role, (roleGroups.get(step.role) || 0) + 1)
    })

    roleGroups.forEach((count) => {
      if (count > 1) {
        redundantCount += count - 1 // All duplicates after the first are redundant
      }
    })

    // Count automatable steps
    chain.steps.forEach((step) => {
      if (step.automatable) {
        automatable++
      }
    })
  })

  analysis.averageChainLength = chains.length > 0 ? totalLength / chains.length : 0
  analysis.redundantApprovals = redundantCount
  analysis.parallelizableApprovals = Math.floor(analysis.averageChainLength / 2)
  analysis.automationPotential = Math.round((automatable / (totalLength || 1)) * 100)

  return analysis
}

/**
 * Calculate cost optimization potential
 */
export function calculateCostSavings(data: {
  redundantRoles: Array<{ count: number; totalCost: number }>
  automationOpportunities: Array<{ costSavings: number }>
  roleConsolidations: Array<{ currentCost: number; consolidatedCost: number }>
}) {
  let totalSavings = 0

  // Savings from role elimination (keep 1, eliminate rest)
  data.redundantRoles.forEach((role) => {
    if (role.count > 1) {
      totalSavings += (role.totalCost / role.count) * (role.count - 1)
    }
  })

  // Savings from automation
  totalSavings += data.automationOpportunities.reduce((sum, opp) => sum + opp.costSavings, 0)

  // Savings from consolidation
  data.roleConsolidations.forEach((cons) => {
    totalSavings += cons.currentCost - cons.consolidatedCost
  })

  return Math.round(totalSavings)
}

/**
 * Calculate organization-wide efficiency metrics
 */
export function calculateOrganizationEfficiency(data: {
  employees: Array<{
    id: string
    role: string
    department: string
    automationScore: number
    costAnnual: number
  }>
  redundancies: ReturnType<typeof identifyRedundancies>
  approvalChains: Array<{
    processType: string
    steps: Array<{ role: string; automatable: boolean }>
    department: string
  }>
  averageEmployeeEfficiency: number
}): OrganizationEfficiencyMetrics["overallEfficiencyScore"] {
  // Component 1: Redundancy Level (0-30 points)
  const redundancyRisk = data.redundancies.length === 0 ? 30 : Math.max(0, 30 - data.redundancies.length * 3)

  // Component 2: Automation Opportunity (0-30 points)
  const avgAutomation =
    data.employees.length > 0
      ? data.employees.reduce((sum, e) => sum + e.automationScore, 0) / data.employees.length
      : 0
  const automationComponent = (avgAutomation / 100) * 30

  // Component 3: Approval Chain Efficiency (0-20 points)
  const approvalAnalysis = analyzeApprovalChains(data.approvalChains)
  const approvalComponent = Math.max(0, 20 - approvalAnalysis.averageChainLength * 2)

  // Component 4: Employee Efficiency Average (0-20 points)
  const employeeComponent = (data.averageEmployeeEfficiency / 100) * 20

  const totalScore = redundancyRisk + automationComponent + approvalComponent + employeeComponent

  return Math.round(Math.max(0, Math.min(100, totalScore)))
}

/**
 * Determine organization health based on efficiency score
 */
export function getHealthScore(efficiencyScore: number): OrganizationEfficiencyMetrics["healthScore"] {
  if (efficiencyScore >= 80) return "excellent"
  if (efficiencyScore >= 60) return "good"
  if (efficiencyScore >= 40) return "fair"
  if (efficiencyScore >= 20) return "poor"
  return "critical"
}

/**
 * Generate productivity gain estimate
 */
export function estimateProductivityGain(data: {
  automationPotential: number
  redundancyReduction: number
  approvalStreamlining: number
}): number {
  // Sum efficiency gains (capped at 50% as realistic max)
  const totalGain = Math.min(
    50,
    (data.automationPotential * 0.3 + data.redundancyReduction * 0.4 + data.approvalStreamlining * 0.3) / 100,
  )

  return Math.round(totalGain)
}
