"use client"

import Sidebar from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Save } from "lucide-react"

export default function OrganizationSettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDemoMode={false} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold">Organization Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your organization configuration</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card className="p-6 bg-card/50 border-border/50">
                <h2 className="text-xl font-semibold mb-6">Organization Information</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input id="org-name" placeholder="Acme Corporation" defaultValue="Acme Corporation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="technology">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Organization description..."
                      defaultValue="Leading technology company focused on organizational optimization."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">Organization Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">1-50 employees</SelectItem>
                          <SelectItem value="medium">51-500 employees</SelectItem>
                          <SelectItem value="large">501-5000 employees</SelectItem>
                          <SelectItem value="enterprise">5000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Primary Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="eu">European Union</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="gap-2">
                      <Save size={18} />
                      Save Changes
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      Reset
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Automation Settings */}
            <TabsContent value="automation" className="space-y-6">
              <Card className="p-6 bg-card/50 border-border/50">
                <h2 className="text-xl font-semibold mb-6">Automation Preferences</h2>

                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-500 mb-1">Automation Threshold</p>
                      <p className="text-muted-foreground">
                        Tasks with automation potential above 60% are flagged for review
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Enable Automation Analysis</Label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                      <span className="text-sm">Automatically analyze roles for automation potential</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                      <span className="text-sm">Send weekly automation opportunity reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      <span className="text-sm">Auto-implement low-risk recommendations</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="gap-2">
                      <Save size={18} />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Integrations */}
            <TabsContent value="integrations" className="space-y-6">
              <Card className="p-6 bg-card/50 border-border/50">
                <h2 className="text-xl font-semibold mb-6">Connected Integrations</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded border border-border/50">
                    <div>
                      <h3 className="font-semibold">Google Gemini AI</h3>
                      <p className="text-sm text-muted-foreground">AI-powered organizational analysis</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">Connected</Badge>
                      <Button variant="ghost" size="sm">
                        Settings
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background/50 rounded border border-border/50">
                    <div>
                      <h3 className="font-semibold">Neo4j Aura</h3>
                      <p className="text-sm text-muted-foreground">Graph database for org relationships</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Configure</Badge>
                      <Button variant="ghost" size="sm">
                        Setup
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background/50 rounded border border-border/50">
                    <div>
                      <h3 className="font-semibold">Better Auth</h3>
                      <p className="text-sm text-muted-foreground">Employee authentication & SSO</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0">
                        Setup Required
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
