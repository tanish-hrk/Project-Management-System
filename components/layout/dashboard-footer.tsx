"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Heart,
  Shield,
  Zap,
  Users,
  BookOpen,
  MessageCircle,
  Bug,
  Lightbulb,
} from "lucide-react"

export function DashboardFooter() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Documentation", href: "#", icon: BookOpen },
    { name: "API Reference", href: "#", icon: ExternalLink },
    { name: "Support Center", href: "#", icon: MessageCircle },
    { name: "Report Bug", href: "#", icon: Bug },
    { name: "Feature Request", href: "#", icon: Lightbulb },
    { name: "Community", href: "#", icon: Users },
  ]

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ]

  const companyInfo = [
    { label: "Email", value: "support@projectmanager.com", icon: Mail },
    { label: "Phone", value: "+1 (555) 123-4567", icon: Phone },
    { label: "Address", value: "123 Tech Street, San Francisco, CA", icon: MapPin },
  ]

  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">ProjectManager</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Streamline your project management with powerful tools designed for modern teams. Built with performance
                and collaboration in mind.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  All Systems Operational
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 p-2 h-auto"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h4>
              <div className="space-y-3">
                {companyInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <info.icon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{info.label}</p>
                      <p className="text-sm text-gray-300">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status & Version */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">System Info</h4>
              <div className="space-y-3">
                <Card className="bg-white/5 border-white/10 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Version</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      v2.4.1
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Build</span>
                    <span className="text-xs text-gray-300 font-mono">#1247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Updated</span>
                    <span className="text-xs text-gray-300">Dec 20, 2024</span>
                  </div>
                </Card>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-gray-300">Security: Up to date</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-gray-300">Performance: Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>© {currentYear} ProjectManager Inc.</span>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <Button variant="link" size="sm" className="text-gray-400 hover:text-white p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" size="sm" className="text-gray-400 hover:text-white p-0 h-auto">
                Terms of Service
              </Button>
              <Button variant="link" size="sm" className="text-gray-400 hover:text-white p-0 h-auto">
                Cookie Policy
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-400" /> for teams
              </span>
              <Separator orientation="vertical" className="h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
