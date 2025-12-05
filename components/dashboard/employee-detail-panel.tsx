"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DEMO_DATA } from "@/lib/demo-data"
import { Mail, Phone, Briefcase, Building, TrendingUp, Users } from "lucide-react"

interface EmployeeDetailPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId?: string
}

export default function EmployeeDetailPanel({ open, onOpenChange, employeeId }: EmployeeDetailPanelProps) {
  const employee = employeeId ? DEMO_DATA.orgChart.find((e) => e.id === employeeId) : null
  const manager = employee?.parent ? DEMO_DATA.orgChart.find((e) => e.id === employee.parent) : null
  const directReports = DEMO_DATA.orgChart.filter((e) => e.parent === employeeId)

  if (!employee) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Employee Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <p className="text-lg text-accent font-semibold">{employee.role}</p>
            <Badge variant="secondary">{employee.department}</Badge>
          </div>

          {/* Contact Info */}
          <Card className="p-4 bg-card/50 border-border/50 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground" size={18} />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{employee.name.toLowerCase().replace(" ", ".")}@company.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground" size={18} />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">+1 (555) 000-0000</p>
              </div>
            </div>
          </Card>

          {/* Organization Info */}
          <Card className="p-4 bg-card/50 border-border/50 space-y-3">
            {manager && (
              <div className="flex items-center gap-3">
                <Briefcase className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-xs text-muted-foreground">Manager</p>
                  <p className="text-sm font-medium">{manager.name}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Building className="text-muted-foreground" size={18} />
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium">{employee.department}</p>
              </div>
            </div>
            {directReports.length > 0 && (
              <div className="flex items-center gap-3">
                <Users className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-xs text-muted-foreground">Direct Reports</p>
                  <p className="text-sm font-medium">
                    {directReports.length} team member{directReports.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Automation Score */}
          {employee.automationScore && (
            <Card className="p-4 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="text-primary" size={18} />
                <p className="font-semibold">Automation Potential</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Automation Score</span>
                  <span className="text-sm font-semibold">{(employee.automationScore * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${employee.automationScore * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Direct Reports */}
          {directReports.length > 0 && (
            <Card className="p-4 bg-card/50 border-border/50">
              <h3 className="font-semibold mb-3">Direct Reports</h3>
              <div className="space-y-2">
                {directReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-2 bg-background/50 rounded">
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4">
            <Button className="w-full">Edit Employee</Button>
            <Button variant="outline" className="w-full bg-transparent">
              View Analytics
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
