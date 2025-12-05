"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DEMO_DATA } from "@/lib/demo-data"

interface EmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee?: any
  onSave?: (employee: any) => void
}

export default function EmployeeDialog({ open, onOpenChange, employee, onSave }: EmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    email: employee?.email || "",
    role: employee?.role || "",
    department: employee?.department || "",
    manager: employee?.parent || "",
    costAnnual: employee?.costAnnual || "",
    skills: employee?.skills?.join(", ") || "",
  })

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.role || !formData.department) {
      alert("Please fill in all required fields")
      return
    }

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    }

    try {
      const response = await fetch("/api/employees", {
        method: employee ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: "demo_org_001",
          ...payload,
        }),
      })

      if (response.ok) {
        onSave?.(payload)
        onOpenChange(false)
        setFormData({
          name: "",
          email: "",
          role: "",
          department: "",
          manager: "",
          costAnnual: "",
          skills: "",
        })
      }
    } catch (error) {
      console.error("[v0] Error saving employee:", error)
      alert("Failed to save employee")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              placeholder="Software Engineer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Manager */}
          <div className="space-y-2">
            <Label htmlFor="manager">Manager</Label>
            <Select value={formData.manager} onValueChange={(value) => setFormData({ ...formData, manager: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent>
                {DEMO_DATA.orgChart
                  .filter((emp) => emp.role !== "Chief Executive Officer")
                  .map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cost */}
          <div className="space-y-2">
            <Label htmlFor="cost">Annual Cost</Label>
            <Input
              id="cost"
              type="number"
              placeholder="85000"
              value={formData.costAnnual}
              onChange={(e) => setFormData({ ...formData, costAnnual: e.target.value })}
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Textarea
              id="skills"
              placeholder="JavaScript, React, Node.js"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSave}>{employee ? "Update" : "Create"} Employee</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
