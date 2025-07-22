"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Key, 
  Users, 
  Mail,
  Save,
  Eye,
  EyeOff,
  Trash2,
  Download
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    mentions: true,
    updates: false,
    marketing: false,
  })

  const [appearance, setAppearance] = useState({
    theme: "dark",
    compactMode: false,
    animations: true,
    sidebar: "expanded",
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "team",
    showActivity: true,
    showProjects: true,
    allowMentions: true,
  })

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Settings</h1>
          <p className="text-xl text-gray-300 mt-2">Manage your account and application preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-white/10 border border-white/20">
          <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
            <Eye className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400">
            <Database className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-gray-300">
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-blue-600 text-white text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Change Avatar
                  </Button>
                  <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@nexuspm.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white">Job Title</Label>
                  <Input
                    id="role"
                    defaultValue="Senior Full Stack Developer"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-white">Department</Label>
                  <Select defaultValue="engineering">
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Love building scalable applications and mentoring junior developers."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL", "MongoDB", "Python"].map((skill) => (
                    <Badge key={skill} variant="outline" className="border-blue-500/50 text-blue-400">
                      {skill}
                      <Button variant="ghost" size="sm" className="ml-1 h-4 w-4 p-0 text-blue-400 hover:text-red-400">
                        ×
                      </Button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    + Add Skill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-300">
                Choose how you want to be notified about updates and activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Push Notifications</Label>
                    <p className="text-sm text-gray-400">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Mentions & Comments</Label>
                    <p className="text-sm text-gray-400">When someone mentions you or comments on your work</p>
                  </div>
                  <Switch
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, mentions: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Project Updates</Label>
                    <p className="text-sm text-gray-400">Updates about projects you're involved in</p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, updates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Marketing & Tips</Label>
                    <p className="text-sm text-gray-400">Product updates, tips, and promotional content</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Notification Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Quiet Hours Start</Label>
                    <Input
                      type="time"
                      defaultValue="22:00"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Quiet Hours End</Label>
                    <Input
                      type="time"
                      defaultValue="08:00"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Appearance Settings</CardTitle>
              <CardDescription className="text-gray-300">
                Customize the look and feel of your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-white">Theme</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={`cursor-pointer border-2 ${appearance.theme === "dark" ? "border-blue-500" : "border-white/20"} bg-white/10`}>
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-12 bg-gray-900 rounded mb-2"></div>
                        <p className="text-sm text-white">Dark</p>
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer border-2 ${appearance.theme === "light" ? "border-blue-500" : "border-white/20"} bg-white/10`}>
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-12 bg-gray-100 rounded mb-2"></div>
                        <p className="text-sm text-white">Light</p>
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer border-2 ${appearance.theme === "auto" ? "border-blue-500" : "border-white/20"} bg-white/10`}>
                      <CardContent className="p-4 text-center">
                        <div className="w-full h-12 bg-gradient-to-r from-gray-900 to-gray-100 rounded mb-2"></div>
                        <p className="text-sm text-white">Auto</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Compact Mode</Label>
                    <p className="text-sm text-gray-400">Reduce spacing and element sizes</p>
                  </div>
                  <Switch
                    checked={appearance.compactMode}
                    onCheckedChange={(checked) => setAppearance(prev => ({ ...prev, compactMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Animations</Label>
                    <p className="text-sm text-gray-400">Enable smooth transitions and animations</p>
                  </div>
                  <Switch
                    checked={appearance.animations}
                    onCheckedChange={(checked) => setAppearance(prev => ({ ...prev, animations: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Sidebar Behavior</Label>
                  <Select 
                    value={appearance.sidebar} 
                    onValueChange={(value) => setAppearance(prev => ({ ...prev, sidebar: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expanded">Always Expanded</SelectItem>
                      <SelectItem value="collapsed">Always Collapsed</SelectItem>
                      <SelectItem value="auto">Auto Hide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription className="text-gray-300">
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Password
                </Button>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-white">Authenticator App</p>
                    <p className="text-sm text-gray-400">Use an authenticator app to generate verification codes</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Configure 2FA
                </Button>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: "Chrome on Windows", location: "New York, US", current: true, lastActive: "Now" },
                    { device: "Safari on iPhone", location: "New York, US", current: false, lastActive: "2 hours ago" },
                    { device: "Firefox on MacOS", location: "San Francisco, US", current: false, lastActive: "1 day ago" },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{session.device}</p>
                        <p className="text-sm text-gray-400">{session.location} • {session.lastActive}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.current && (
                          <Badge className="bg-green-500/20 text-green-400">Current</Badge>
                        )}
                        {!session.current && (
                          <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Privacy Settings</CardTitle>
              <CardDescription className="text-gray-300">
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Profile Visibility</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="team">Team Only - Only team members can see your profile</SelectItem>
                      <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Show Activity Status</Label>
                    <p className="text-sm text-gray-400">Let others see when you're online and active</p>
                  </div>
                  <Switch
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showActivity: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Show Project Involvement</Label>
                    <p className="text-sm text-gray-400">Display which projects you're working on</p>
                  </div>
                  <Switch
                    checked={privacy.showProjects}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showProjects: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Allow Mentions</Label>
                    <p className="text-sm text-gray-400">Let others mention you in comments and discussions</p>
                  </div>
                  <Switch
                    checked={privacy.allowMentions}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowMentions: checked }))}
                  />
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Data & Privacy</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download Your Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                    <Eye className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/20">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Connected Integrations</CardTitle>
              <CardDescription className="text-gray-300">
                Manage your connected apps and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { name: "GitHub", description: "Sync repositories and track commits", connected: true, icon: "🐙" },
                  { name: "Slack", description: "Get notifications and updates in Slack", connected: true, icon: "📱" },
                  { name: "Google Calendar", description: "Sync meetings and deadlines", connected: false, icon: "📅" },
                  { name: "Jira", description: "Import and sync issues", connected: false, icon: "🔧" },
                  { name: "Figma", description: "Link design files to projects", connected: true, icon: "🎨" },
                  { name: "Discord", description: "Team communication and notifications", connected: false, icon: "💬" },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h4 className="font-medium text-white">{integration.name}</h4>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {integration.connected ? (
                        <>
                          <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">API Access</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Personal Access Token</p>
                      <p className="text-sm text-gray-400">For API access and custom integrations</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Key className="h-4 w-4 mr-2" />
                      Generate Token
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Webhook URLs</p>
                      <p className="text-sm text-gray-400">Configure webhooks for external notifications</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Globe className="h-4 w-4 mr-2" />
                      Manage Webhooks
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
