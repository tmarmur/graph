"use client"

import type React from "react"

import { LayoutDashboard, Users, BarChart3, Zap, Settings, LogOut } from "lucide-react"
import Link from "next/link"

interface SidebarProps {
  isDemoMode?: boolean
}

export default function Sidebar({ isDemoMode = false }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">OF</span>
          </div>
          <span className="font-semibold">OrgFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          <h2 className="px-4 py-2 text-xs font-semibold text-sidebar-muted-foreground uppercase tracking-wider">
            Dashboard
          </h2>
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            href={isDemoMode ? "/demo" : "/dashboard"}
            active={true}
          />
          <NavItem
            icon={<Users size={18} />}
            label="Employees"
            href={isDemoMode ? "/demo#employees" : "/dashboard/employees"}
          />
          <NavItem
            icon={<BarChart3 size={18} />}
            label="Analytics"
            href={isDemoMode ? "/demo#analytics" : "/dashboard/analytics"}
          />
          <NavItem
            icon={<Zap size={18} />}
            label="Insights"
            href={isDemoMode ? "/demo#insights" : "/dashboard/insights"}
          />
        </div>

        <div className="space-y-1 pt-4 border-t border-sidebar-border">
          <h2 className="px-4 py-2 text-xs font-semibold text-sidebar-muted-foreground uppercase tracking-wider">
            Settings
          </h2>
          <NavItem
            icon={<Settings size={18} />}
            label="Organization"
            href={isDemoMode ? "#" : "/settings/organization"}
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {isDemoMode && (
          <Link href="/" className="block">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-sidebar-accent transition-colors">
              <LogOut size={18} />
              Exit Demo
            </button>
          </Link>
        )}
        <div className="text-xs text-sidebar-muted-foreground p-3 bg-sidebar-accent/20 rounded">
          {isDemoMode ? "Demo Mode Active" : "Organization Admin"}
        </div>
      </div>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  href,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link href={href}>
      <button
        className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
          active ? "bg-sidebar-primary/20 text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </Link>
  )
}
