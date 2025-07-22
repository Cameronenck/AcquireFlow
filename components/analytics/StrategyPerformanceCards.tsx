'use client'

import { TrendingUp, Zap, Home, Building, Target, RefreshCw, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarketData {
  metro: string
  state: string
  population: string
  medianIncome: number
  unemployment: number
  priceGrowth: number
  inventory: number
  bestStrategy: string
  scores: {
    wholesaling: number
    flipping: number
    rentals: number
    subjectTo: number
    brrrr: number
    commercial: number
  }
}

interface StrategyPerformanceCardsProps {
  marketData: MarketData[]
}

function PerformanceCard({ 
  title, 
  market, 
  metric, 
  value, 
  icon: Icon, 
  color 
}: {
  title: string
  market: string
  metric: string
  value: string
  icon: any
  color: string
}) {
  return (
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-xl", `bg-${color}/10`)}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
        <div className="flex items-center gap-1 text-accent-green">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Hot</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <div className="text-2xl font-bold text-text-primary">{market}</div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">{metric}</span>
          <span className="font-semibold text-accent-blue">{value}</span>
        </div>
      </div>
    </div>
  )
}

export default function StrategyPerformanceCards({ marketData }: StrategyPerformanceCardsProps) {
  // Find best market for each strategy
  const getBestMarketForStrategy = (strategy: keyof MarketData['scores']) => {
    return marketData.reduce((best, current) => 
      current.scores[strategy] > best.scores[strategy] ? current : best
    )
  }

  const performanceData = [
    {
      title: 'Best Wholesaling Market',
      market: getBestMarketForStrategy('wholesaling'),
      metric: 'Assignment Fee Avg',
      value: '$12.5K',
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      title: 'Top Flipping Market', 
      market: getBestMarketForStrategy('flipping'),
      metric: 'Avg Profit',
      value: '$45.2K',
      icon: Home,
      color: 'text-blue-500'
    },
    {
      title: 'Best Rental Market',
      market: getBestMarketForStrategy('rentals'),
      metric: 'Cash Flow',
      value: '$485/mo',
      icon: Building,
      color: 'text-green-500'
    },
    {
      title: 'Subject To Hotspot',
      market: getBestMarketForStrategy('subjectTo'),
      metric: 'Success Rate',
      value: '73%',
      icon: Target,
      color: 'text-purple-500'
    },
    {
      title: 'BRRRR Champion',
      market: getBestMarketForStrategy('brrrr'),
      metric: 'Cash Recovery',
      value: '89%',
      icon: RefreshCw,
      color: 'text-cyan-500'
    },
    {
      title: 'Commercial Leader',
      market: getBestMarketForStrategy('commercial'),
      metric: 'Cap Rate',
      value: '8.4%',
      icon: BarChart3,
      color: 'text-indigo-500'
    }
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-accent-blue" />
        National Strategy Performance Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceData.map((item) => (
          <PerformanceCard
            key={item.title}
            title={item.title}
            market={item.market.metro}
            metric={item.metric}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </div>
  )
} 