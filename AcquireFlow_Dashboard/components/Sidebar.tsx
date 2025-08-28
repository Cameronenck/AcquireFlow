'use client'

import { 
  LayoutDashboard, 
  Search, 
  TrendingUp, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  MessageSquare,
  Filter
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    section: 'General',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { name: 'Deal Finder', icon: Search, href: '/properties' },
      { name: 'Inbox', icon: MessageSquare, href: '/communications' },
      { name: 'Market Intelligence', icon: TrendingUp, href: '/analytics' },
    ]
  },
  {
    section: 'Management',
    items: [
      { name: 'Contacts', icon: Users, href: '/contacts' },
      { name: 'Pipeline', icon: Filter, href: '/pipeline' },
      { name: 'Reports', icon: BarChart3, href: '/reports' },
    ]
  },
  {
    section: 'Support',
    items: [
      { name: 'Settings', icon: Settings, href: '/settings' },
      { name: 'Help Center', icon: HelpCircle, href: '/help' },
      { name: 'LOI Generator', icon: FileText, href: '/loi-generator' },
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-screen w-70 bg-bg-secondary border-r border-border-color z-50">
      {/* Logo Section */}
      <a href="/" className="block p-8 border-b border-border-color hover:bg-transparent transition-colors duration-200">
        <img 
          src="/logo.png" 
          alt="AcquireFlow Logo" 
          className="h-16 w-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
        />
      </a>

      {/* Navigation */}
      <div className="p-4 space-y-8">
        {navigationItems.map((section) => (
          <div key={section.section}>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-3">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                      isActive 
                        ? "bg-sidebar-secondary text-white shadow-lg"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive 
                        ? "text-white" 
                        : "text-text-muted group-hover:text-text-primary group-hover:scale-110"
                    )} />
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 