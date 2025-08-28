'use client'

import { useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import MetricsGrid from '@/components/MetricsGrid'
import ChartsSection from '@/components/ChartsSection'
import BottomSection from '@/components/BottomSection'
import { initializeTheme } from '@/lib/utils'

export default function Dashboard() {
  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        <main className="p-8 space-y-8">
          <MetricsGrid />
          <ChartsSection />
          <BottomSection />
        </main>
      </div>
    </div>
  )
} 