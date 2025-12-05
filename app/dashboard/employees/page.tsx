"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DEMO_DATA } from "@/lib/demo-data"
import { Plus, Search, Edit2, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(DEMO_DATA.orgChart)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEmployees, setFilteredEmployees] = useState(employees)

  useEffect(() => {
    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredEmployees(filtered)
  }, [searchTerm, employees])

  const getAutomationColor = (score?: number) => {
    if (!score) return "bg-gray-100"
    if (score >= 0.8) return "text-red-500 bg-red-50"
    if (score >= 0.6) return "text-yellow-500 bg-yellow-50"
    return "text-green-500 bg-green-50"
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={false} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Employees</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage and analyze your team members</p>
            </div>
            <Button>
              <Plus size={18} className="mr-2" />
              Add Employee
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Search */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search by name, role, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Employees Table */}
          <Card className="bg-card/50 border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card/80 backdrop-blur">
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Role</th>
                    <th className="px-6 py-4 text-left font-semibold">Department</th>
                    <th className="px-6 py-4 text-left font-semibold">Reports To</th>
                    <th className="px-6 py-4 text-left font-semibold">Automation Score</th>
                    <th className="px-6 py-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredEmployees.map((emp) => {
                    const manager = employees.find((e) => e.id === emp.parent)
                    return (
                      <tr key={emp.id} className="hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{emp.name}</td>
                        <td className="px-6 py-4">{emp.role}</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary">{emp.department}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{manager?.name || "—"}</td>
                        <td className="px-6 py-4">
                          {emp.automationScore && (
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${getAutomationColor(emp.automationScore)}`}
                            >
                              {(emp.automationScore * 100).toFixed(0)}%
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit2 size={16} className="mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredEmployees.length} of {employees.length} employees
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent">
                Previous
              </Button>
              <Button variant="outline" className="bg-transparent">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
