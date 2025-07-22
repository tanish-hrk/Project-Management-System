"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional(),
  location: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.string().length(0)),
})

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  mentions: z.boolean().default(true),
  assignments: z.boolean().default(true),
  comments: z.boolean().default(true),
  statusChanges: z.boolean().default(false),
})

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  boardView: z.enum(["kanban", "scrum", "calendar", "gantt"], {
    required_error: "Please select a default board view.",
  }),
  sidebarCollapsed: z.boolean().default(false),
})

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("general")

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      bio: "Product Manager with 5+ years of experience in agile development. Passionate about creating user-centered products and optimizing team workflows.",
      location: "San Francisco, CA",
      website: "https://alexjohnson.dev",
    },
  })

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      mentions: true,
      assignments: true,
      comments: true,
      statusChanges: false,
    },
  })

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      timezone: "America/Los_Angeles",
      boardView: "kanban",
      sidebarCollapsed: false,
    },
  })

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    })
    console.log(data)
  }

  function onNotificationSubmit(data: z.infer<typeof notificationFormSchema>) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been updated.",
    })
    console.log(data)
  }

  function onAppearanceSubmit(data: z.infer<typeof appearanceFormSchema>) {
    toast({
      title: "Appearance settings updated",
      description: "Your appearance settings have been updated.",
    })
    console.log(data)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-8 bg-white/10 border-white/20">
        <TabsTrigger value="general" className="text-gray-300 data-[state=active]:text-white">General</TabsTrigger>
        <TabsTrigger value="notifications" className="text-gray-300 data-[state=active]:text-white">Notifications</TabsTrigger>
        <TabsTrigger value="appearance" className="text-gray-300 data-[state=active]:text-white">Appearance</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Profile Information</CardTitle>
            <CardDescription className="text-gray-300">Update your personal information and public profile.</CardDescription>
          </CardHeader>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself"
                          className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">Brief description for your profile. URLs are hyperlinked.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} value={field.value || ""} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} value={field.value || ""} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Notification Preferences</CardTitle>
            <CardDescription className="text-gray-300">Configure how and when you receive notifications.</CardDescription>
          </CardHeader>
          <Form {...notificationForm}>
            <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-white">Notification Channels</h3>
                  <div className="grid gap-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
                            <p className="text-sm text-gray-400">Receive notifications via email</p>
                          </div>
                          <FormControl>
                            <Switch id="email-notifications" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
                            <p className="text-sm text-gray-400">
                              Receive push notifications in-app and on desktop
                            </p>
                          </div>
                          <FormControl>
                            <Switch id="push-notifications" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Types</h3>
                  <div className="grid gap-4">
                    <FormField
                      control={notificationForm.control}
                      name="mentions"
                      render={({ field }) => (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="mentions">Mentions</Label>
                            <p className="text-sm text-muted-foreground">
                              When someone mentions you in comments or descriptions
                            </p>
                          </div>
                          <FormControl>
                            <Switch id="mentions" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="assignments"
                      render={({ field }) => (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="assignments">Assignments</Label>
                            <p className="text-sm text-muted-foreground">When you are assigned to a task or issue</p>
                          </div>
                          <FormControl>
                            <Switch id="assignments" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="comments"
                      render={({ field }) => (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="comments">Comments</Label>
                            <p className="text-sm text-muted-foreground">
                              When someone comments on your tasks or issues
                            </p>
                          </div>
                          <FormControl>
                            <Switch id="comments" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="statusChanges"
                      render={({ field }) => (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="status-changes">Status Changes</Label>
                            <p className="text-sm text-muted-foreground">
                              When the status of your tasks or issues changes
                            </p>
                          </div>
                          <FormControl>
                            <Switch id="status-changes" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Preferences</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Appearance Settings</CardTitle>
            <CardDescription className="text-gray-300">Customize the appearance and behavior of the application.</CardDescription>
          </CardHeader>
          <Form {...appearanceForm}>
            <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={appearanceForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Theme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select your preferred theme for the application.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appearanceForm.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                          <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>All dates and times will be displayed in this timezone.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appearanceForm.control}
                  name="boardView"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Board View</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a default view" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kanban">Kanban</SelectItem>
                          <SelectItem value="scrum">Scrum</SelectItem>
                          <SelectItem value="calendar">Calendar</SelectItem>
                          <SelectItem value="gantt">Gantt</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose your preferred default view for project boards.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appearanceForm.control}
                  name="sidebarCollapsed"
                  render={({ field }) => (
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sidebar-collapsed">Collapsed Sidebar</Label>
                        <p className="text-sm text-muted-foreground">Start with the sidebar collapsed by default</p>
                      </div>
                      <FormControl>
                        <Switch id="sidebar-collapsed" checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </div>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save Settings</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
