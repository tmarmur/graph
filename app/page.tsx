"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">OF</span>
            </div>
            <span className="font-semibold text-lg">OrgFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/demo">
              <Button>Demo</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold tracking-tight">
            Optimize Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Organization</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered organizational analysis that eliminates bureaucracy, removes redundant roles, and maximizes
            operational efficiency.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/demo">
              <Button size="lg" className="rounded-lg">
                Try Demo
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="rounded-lg bg-transparent">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary text-xl">📊</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Organization Mapping</h3>
            <p className="text-sm text-muted-foreground">
              Visualize your entire organization structure with interactive graphs and relationship analysis.
            </p>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <span className="text-accent text-xl">🤖</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Let AI identify redundant roles, weak paths, and automation opportunities across your organization.
            </p>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur">
            <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-4">
              <span className="text-chart-1 text-xl">📈</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Efficiency Metrics</h3>
            <p className="text-sm text-muted-foreground">
              Track efficiency gains, cost reductions, and identify optimization opportunities with detailed analytics.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Ready to transform your organization?</p>
          <Link href="/demo">
            <Button size="lg" className="rounded-lg">
              Explore Demo
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
