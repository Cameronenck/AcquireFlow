'use client'

import { 
  Moon, 
  Sun, 
  Calendar, 
  Filter, 
  Download 
} from 'lucide-react'
import { toggleTheme } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Page title mapping
const pageMapping: Record<string, string> = {
  '/': 'Dashboard',
  '/properties': 'Deal Finder',
  '/analytics': 'Market Intelligence', 
  '/communications': 'Inbox',
  '/contacts': 'Contacts',
  '/pipeline': 'Pipeline',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/loi-generator': 'LOI Generator',
  '/help': 'Help Center'
}

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  
  // Get page title from current route
  const pageTitle = pageMapping[pathname] || 'Dashboard'
  
  // Check if current page is dashboard
  const isDashboard = pathname === '/'

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const handleThemeToggle = () => {
    toggleTheme()
    setIsDark(!isDark)
  }

  return (
    <header className="sticky top-0 z-40 bg-bg-primary border-b border-border-color ml-70 max-w-full overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6 max-w-full">
        {/* Left Side - Page Title (Left-aligned, constrained width) */}
        <div className="flex-1 min-w-0 mr-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-heading text-left truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Right Side Actions (flexible, wraps on small screens) */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Theme Toggle - Always visible */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg bg-bg-secondary hover:bg-bg-tertiary border border-border-color transition-colors duration-200 flex-shrink-0"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-text-secondary" />
            )}
          </button>

          {/* Dashboard-only buttons */}
          {isDashboard && (
            <>
              {/* Date Picker - Hidden on very small screens */}
              <div className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg border border-border-color transition-colors duration-200 cursor-pointer flex-shrink-0">
                <Calendar className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <span className="text-xs lg:text-sm font-medium text-text-secondary whitespace-nowrap">Nov 21 - Nov 31</span>
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg border border-border-color transition-colors duration-200 flex-shrink-0">
                <Filter className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <span className="hidden sm:inline text-xs lg:text-sm font-medium text-text-secondary">Filter</span>
              </button>

              {/* Export Button */}
              <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary rounded-lg border border-border-color transition-colors duration-200 flex-shrink-0">
                <Download className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <span className="hidden sm:inline text-xs lg:text-sm font-medium text-text-secondary">Export</span>
              </button>
            </>
          )}

          {/* User Profile - Always visible, responsive */}
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 bg-bg-secondary rounded-lg border border-border-color flex-shrink-0">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs sm:text-sm font-bold text-white">RF</span>
            </div>
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="text-sm font-medium text-text-primary truncate">Robert Fox</span>
              <span className="text-xs text-text-muted">Business</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 