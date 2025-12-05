"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import EmployeeDetailPanel from "@/components/dashboard/employee-detail-panel"
import { useParams } from "next/navigation"

export default function EmployeeDetailPage() {
  const params = useParams()
  const [detailOpen, setDetailOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={false} />
      <main className="flex-1">
        <EmployeeDetailPanel open={detailOpen} onOpenChange={setDetailOpen} employeeId={params.id as string} />
      </main>
    </div>
  )
}
