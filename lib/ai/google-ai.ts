import { generateObject } from "ai"

// Using Vercel AI Gateway which supports Google models by default

export async function analyzeRoleAutomation(roleData: {
  role: string
  department: string
  responsibilities: string[]
  skills: string[]
  automationScore?: number
}) {
  const prompt = `Analyze this organizational role for automation potential:

Role: ${roleData.role}
Department: ${roleData.department}
Responsibilities: ${roleData.responsibilities.join(", ")}
Required Skills: ${roleData.skills.join(", ")}

Based on the responsibilities and skills, determine:
1. What percentage of tasks can be automated with AI/tools (0-100%)
2. Which specific tasks are most automatable
3. What tasks require human judgment
4. Estimated productivity improvement if automated

Provide a JSON response with: automationPercentage (number), automatableTasks (string[]), humanTasks (string[]), productivityImprovement (string), confidence (number 0-1), recommendation (string).`

  return generateObject({
    model: "google/gemini-1.5-flash",
    prompt,
    schema: {
      automationPercentage: "number",
      automatableTasks: "array of string",
      humanTasks: "array of string",
      productivityImprovement: "string",
      confidence: "number",
      recommendation: "string",
    } as any,
  })
}

export async function detectApprovalRedundancy(approvalChain: {
  steps: Array<{ role: string; reason: string }>
  department: string
  processType: string
}) {
  const prompt = `Review this organizational approval process for inefficiencies:

Process Type: ${approvalChain.processType}
Department: ${approvalChain.department}
Current Approval Steps:
${approvalChain.steps.map((s, i) => `${i + 1}. ${s.role} - Reason: ${s.reason}`).join("\n")}

Identify:
1. Redundant approval steps that could be eliminated
2. Approvals that could be parallelized
3. Recommended streamlined approval chain
4. Estimated time saved
5. Risk factors of streamlining

Provide JSON with: redundantSteps (string[]), parallelizableSteps (number[]), recommendedChain (string[]), timeSavedPercentage (number), riskLevel (string), riskFactors (string[]).`

  return generateObject({
    model: "google/gemini-1.5-flash",
    prompt,
    schema: {
      redundantSteps: "array of string",
      parallelizableSteps: "array of number",
      recommendedChain: "array of string",
      timeSavedPercentage: "number",
      riskLevel: "string",
      riskFactors: "array of string",
    } as any,
  })
}

export async function suggestRoleConsolidation(
  employees: Array<{
    id: string
    name: string
    role: string
    department: string
    responsibilities: string[]
    automationScore: number
    cost: number
  }>,
) {
  const prompt = `Analyze these employees and roles for consolidation opportunities:

${employees
  .map(
    (e) => `
Employee: ${e.name}
Role: ${e.role}
Department: ${e.department}
Responsibilities: ${e.responsibilities.join(", ")}
Automation Score: ${e.automationScore}/100
Annual Cost: $${e.cost}
`,
  )
  .join("\n---\n")}

Identify:
1. Roles that could be consolidated
2. Responsibilities that overlap
3. Which employees could be transitioned to other roles
4. Automation opportunities to free up capacity
5. Estimated cost savings
6. Implementation plan with risks

Provide JSON with: consolidationOpportunities (array of {roles, targetRole, employees, reason}), costSavings (number), implementationSteps (string[]), risks (string[]), timelineWeeks (number).`

  return generateObject({
    model: "google/gemini-1.5-flash",
    prompt,
    schema: {
      consolidationOpportunities: "array of object",
      costSavings: "number",
      implementationSteps: "array of string",
      risks: "array of string",
      timelineWeeks: "number",
    } as any,
  })
}

export async function analyzeOrganizationEfficiency(orgData: {
  totalEmployees: number
  departments: Record<string, number>
  hierarchy: Record<string, number>
  avgAutomationScore: number
}) {
  const prompt = `Analyze this organization's efficiency:

Total Employees: ${orgData.totalEmployees}
Departments: ${Object.entries(orgData.departments)
    .map(([d, c]) => `${d} (${c})`)
    .join(", ")}
Hierarchy Depth: ${Math.max(...Object.values(orgData.hierarchy), 1)} levels
Average Automation Score: ${orgData.avgAutomationScore}/100

Evaluate:
1. Overall organizational efficiency level
2. Span of control health
3. Automation readiness
4. Key bottlenecks
5. Top 3 optimization priorities
6. Expected ROI from recommendations

Provide JSON with: efficiencyScore (0-100), automationReadiness (string), topBottlenecks (string[]), priorities (string[]), expectedROI (number as percentage), recommendations (string[]).`

  return generateObject({
    model: "google/gemini-1.5-flash",
    prompt,
    schema: {
      efficiencyScore: "number",
      automationReadiness: "string",
      topBottlenecks: "array of string",
      priorities: "array of string",
      expectedROI: "number",
      recommendations: "array of string",
    } as any,
  })
}
