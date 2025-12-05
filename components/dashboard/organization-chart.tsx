"use client"

import { useEffect, useRef } from "react"

interface OrgNode {
  id: string
  name: string
  role: string
  department: string
  parent?: string
  children?: string[]
  automationScore?: number
}

interface OrganizationChartProps {
  data: OrgNode[]
  onNodeClick: (id: string) => void
}

export default function OrganizationChart({ data, onNodeClick }: OrganizationChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    const svg = svgRef.current
    const width = svg.clientWidth
    const height = 600
    const nodeHeight = 100
    const nodeWidth = 200
    const verticalGap = 150
    const horizontalGap = 220

    // Build tree structure
    const nodesMap = new Map(data.map((node) => [node.id, { ...node, x: 0, y: 0 }]))
    const rootId = data.find((n) => !n.parent)?.id

    // Calculate positions
    const calculatePositions = (nodeId: string | undefined, x: number, y: number, level: number) => {
      if (!nodeId || !nodesMap.has(nodeId)) return

      const node = nodesMap.get(nodeId)!
      node.x = x
      node.y = y

      const children = data.filter((n) => n.parent === nodeId)
      const totalWidth = children.length * horizontalGap
      let startX = x - totalWidth / 2 + horizontalGap / 2

      children.forEach((child) => {
        calculatePositions(child.id, startX, y + verticalGap, level + 1)
        startX += horizontalGap
      })
    }

    if (rootId) {
      calculatePositions(rootId, width / 2, 50, 0)
    }

    // Draw connections
    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    newSvg.setAttribute("width", width.toString())
    newSvg.setAttribute("height", height.toString())
    newSvg.setAttribute("viewBox", `0 0 ${width} ${height}`)
    newSvg.setAttribute("class", "w-full border border-border/50 rounded bg-background/30")

    // Draw lines
    const linesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    data.forEach((node) => {
      if (node.parent) {
        const parentNode = nodesMap.get(node.parent)
        const childNode = nodesMap.get(node.id)
        if (parentNode && childNode) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line.setAttribute("x1", (parentNode.x + nodeWidth / 2).toString())
          line.setAttribute("y1", (parentNode.y + nodeHeight).toString())
          line.setAttribute("x2", (childNode.x + nodeWidth / 2).toString())
          line.setAttribute("y2", childNode.y.toString())
          line.setAttribute("stroke", "hsl(var(--color-border))")
          line.setAttribute("stroke-width", "1")
          linesGroup.appendChild(line)
        }
      }
    })
    newSvg.appendChild(linesGroup)

    // Draw nodes
    const nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
    nodesMap.forEach((node, id) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
      g.setAttribute("cursor", "pointer")

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("x", (node.x - nodeWidth / 2).toString())
      rect.setAttribute("y", node.y.toString())
      rect.setAttribute("width", nodeWidth.toString())
      rect.setAttribute("height", nodeHeight.toString())
      rect.setAttribute("rx", "8")
      rect.setAttribute("fill", "hsl(var(--color-card))")
      rect.setAttribute("stroke", node.automationScore ? "hsl(var(--color-chart-1))" : "hsl(var(--color-border))")
      rect.setAttribute("stroke-width", "2")

      const nameText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      nameText.setAttribute("x", node.x.toString())
      nameText.setAttribute("y", (node.y + 30).toString())
      nameText.setAttribute("text-anchor", "middle")
      nameText.setAttribute("fill", "hsl(var(--color-foreground))")
      nameText.setAttribute("font-size", "12")
      nameText.setAttribute("font-weight", "bold")
      nameText.textContent = node.name

      const roleText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      roleText.setAttribute("x", node.x.toString())
      roleText.setAttribute("y", (node.y + 50).toString())
      roleText.setAttribute("text-anchor", "middle")
      roleText.setAttribute("fill", "hsl(var(--color-muted-foreground))")
      roleText.setAttribute("font-size", "10")
      roleText.textContent = node.role

      g.appendChild(rect)
      g.appendChild(nameText)
      g.appendChild(roleText)
      g.onclick = () => onNodeClick(id)
      nodesGroup.appendChild(g)
    })
    newSvg.appendChild(nodesGroup)

    // Replace SVG
    if (svg.parentNode) {
      svg.parentNode.replaceChild(newSvg, svg)
      if (svgRef.current?.parentElement) {
        svgRef.current = newSvg as any
      }
    }
  }, [data, onNodeClick])

  return (
    <div className="w-full overflow-auto">
      <svg
        ref={svgRef}
        className="w-full border border-border/50 rounded bg-background/30"
        style={{ minHeight: "600px" }}
      />
    </div>
  )
}
