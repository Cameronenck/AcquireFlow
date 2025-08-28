'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  Building, 
  MapPin,
  Filter,
  Download,
  RefreshCw,
  Target,
  Zap,
  BarChart3
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import StrategyPerformanceCards from '@/components/analytics/StrategyPerformanceCards'
import StrategyMatrix from '@/components/analytics/StrategyMatrix'
import USMarketHeatmap from '@/components/analytics/USMarketHeatmap'
import MarketDatabase from '@/components/analytics/MarketDatabase'
import { cn } from '@/lib/utils'
import { initializeTheme } from '@/lib/utils'

// Sample market data for major US metros with strategy-specific scoring
const marketData = [
  {
    metro: 'Austin, TX',
    state: 'Texas',
    population: '2.3M',
    medianIncome: 78000,
    unemployment: 3.2,
    priceGrowth: 8.4,
    inventory: 2.1,
    bestStrategy: 'Flipping',
    scores: {
      wholesaling: 8.5,
      flipping: 9.2,
      rentals: 7.8,
      subjectTo: 6.2,
      brrrr: 8.1,
      commercial: 9.4
    }
  },
  {
    metro: 'Tampa, FL',
    state: 'Florida', 
    population: '3.2M',
    medianIncome: 65000,
    unemployment: 2.8,
    priceGrowth: 12.1,
    inventory: 1.8,
    bestStrategy: 'Wholesaling',
    scores: {
      wholesaling: 9.1,
      flipping: 8.7,
      rentals: 8.9,
      subjectTo: 7.8,
      brrrr: 8.5,
      commercial: 7.6
    }
  },
  {
    metro: 'Phoenix, AZ',
    state: 'Arizona',
    population: '5.0M',
    medianIncome: 72000,
    unemployment: 3.4,
    priceGrowth: 15.2,
    inventory: 1.4,
    bestStrategy: 'Flipping',
    scores: {
      wholesaling: 7.8,
      flipping: 9.4,
      rentals: 7.2,
      subjectTo: 5.9,
      brrrr: 7.6,
      commercial: 8.2
    }
  },
  {
    metro: 'Atlanta, GA',
    state: 'Georgia',
    population: '6.1M',
    medianIncome: 68000,
    unemployment: 3.1,
    priceGrowth: 9.8,
    inventory: 2.3,
    bestStrategy: 'Wholesaling',
    scores: {
      wholesaling: 9.3,
      flipping: 8.1,
      rentals: 8.4,
      subjectTo: 8.7,
      brrrr: 9.1,
      commercial: 8.0
    }
  },
  {
    metro: 'Dallas, TX',
    state: 'Texas',
    population: '7.6M',
    medianIncome: 75000,
    unemployment: 3.0,
    priceGrowth: 7.2,
    inventory: 2.8,
    bestStrategy: 'Rentals',
    scores: {
      wholesaling: 8.2,
      flipping: 7.9,
      rentals: 9.1,
      subjectTo: 7.4,
      brrrr: 8.3,
      commercial: 8.8
    }
  },
  {
    metro: 'Charlotte, NC',
    state: 'North Carolina',
    population: '2.7M',
    medianIncome: 70000,
    unemployment: 2.9,
    priceGrowth: 11.4,
    inventory: 2.0,
    bestStrategy: 'BRRRR',
    scores: {
      wholesaling: 8.4,
      flipping: 8.6,
      rentals: 8.8,
      subjectTo: 7.9,
      brrrr: 9.2,
      commercial: 7.8
    }
  },
  {
    metro: 'Nashville, TN',
    state: 'Tennessee',
    population: '2.0M',
    medianIncome: 69000,
    unemployment: 2.7,
    priceGrowth: 10.6,
    inventory: 1.9,
    bestStrategy: 'Flipping',
    scores: {
      wholesaling: 8.7,
      flipping: 9.0,
      rentals: 8.2,
      subjectTo: 8.1,
      brrrr: 8.4,
      commercial: 7.9
    }
  },
  {
    metro: 'Indianapolis, IN',
    state: 'Indiana',
    population: '2.1M',
    medianIncome: 58000,
    unemployment: 3.3,
    priceGrowth: 6.8,
    inventory: 3.2,
    bestStrategy: 'Rentals',
    scores: {
      wholesaling: 7.9,
      flipping: 7.4,
      rentals: 9.3,
      subjectTo: 8.5,
      brrrr: 8.7,
      commercial: 7.2
    }
  },
  {
    metro: 'Denver, CO',
    state: 'Colorado',
    population: '2.96M',
    medianIncome: 81000,
    unemployment: 3.9,
    priceGrowth: 6.2,
    inventory: 2.8,
    bestStrategy: 'BRRRR',
    scores: {
      wholesaling: 7.2,
      flipping: 7.8,
      rentals: 8.9,
      subjectTo: 7.1,
      brrrr: 9.2,
      commercial: 8.4
    }
  }
]

// Investment strategies with vibrant colors
const strategies = [
  { 
    id: 'wholesaling', 
    name: 'Wholesaling', 
    icon: Zap, 
    color: 'warm-orange',
    gradient: 'from-warm-orange to-bright-yellow'
  },
  { 
    id: 'flipping', 
    name: 'Flipping', 
    icon: TrendingUp, 
    color: 'ocean-blue',
    gradient: 'from-ocean-blue to-deep-teal'
  },
  { 
    id: 'rentals', 
    name: 'Buy & Hold', 
    icon: Home, 
    color: 'brand-green',
    gradient: 'from-brand-green to-deep-teal'
  },
  { 
    id: 'subjectTo', 
    name: 'Subject To', 
    icon: Target, 
    color: 'royal-purple',
    gradient: 'from-royal-purple to-warm-orange'
  },
  { 
    id: 'brrrr', 
    name: 'BRRRR', 
    icon: RefreshCw, 
    color: 'deep-teal',
    gradient: 'from-deep-teal to-brand-green'
  },
  { 
    id: 'commercial', 
    name: 'Commercial', 
    icon: Building, 
    color: 'bright-yellow',
    gradient: 'from-bright-yellow to-warm-orange'
  }
]

export default function AnalyticsPage() {
  const [selectedStrategy, setSelectedStrategy] = useState('wholesaling')
  const [selectedRegion, setSelectedRegion] = useState('all')

  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        
        {/* Page Header with Strategy Selection */}
        <div className="bg-bg-secondary border-b border-border-color">
          <div className="px-8 py-6">
            <div>
              <p className="text-text-muted">
                Nationwide REI strategy analysis and opportunity discovery
              </p>
            </div>
          </div>

          {/* Strategy Toggle - Updated with Vibrant Colors */}
          <div className="px-8 pb-6">
            <div className="flex items-center gap-2 p-1 bg-bg-primary rounded-lg border border-border-color">
              {strategies.map((strategy) => {
                const Icon = strategy.icon
                return (
                  <button
                    key={strategy.id}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      selectedStrategy === strategy.id
                        ? `bg-gradient-to-r ${strategy.gradient} text-white shadow-md border border-white/20`
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {strategy.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <main className="p-8 space-y-8">
          {/* Section 1: National Strategy Performance Dashboard */}
          <StrategyPerformanceCards marketData={marketData} />

          {/* Section 2: US Market Heatmap */}
          <USMarketHeatmap 
            selectedStrategy={selectedStrategy} 
            marketData={marketData}
          />

          {/* Section 3: Investment Strategy Matrix */}
          <StrategyMatrix 
            marketData={marketData}
            selectedStrategy={selectedStrategy}
          />

          {/* Section 4: Comprehensive Market Database */}
          <MarketDatabase 
            marketData={marketData}
            selectedStrategy={selectedStrategy}
          />
        </main>
      </div>
    </div>
  )
} 