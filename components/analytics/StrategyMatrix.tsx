'use client'

import { BarChart3, TrendingUp } from 'lucide-react'
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

interface StrategyMatrixProps {
  marketData: MarketData[]
  selectedStrategy: string
}

function getScoreStyle(score: number, isSelected: boolean = false): string {
  let baseStyle = "px-2 py-1 rounded text-sm font-semibold text-center "
  
  if (isSelected) {
    baseStyle += "ring-2 ring-accent-blue "
  }
  
  if (score >= 8.5) {
    return baseStyle + "bg-green-100 text-green-800 border border-green-200"
  } else if (score >= 7.5) {
    return baseStyle + "bg-yellow-100 text-yellow-800 border border-yellow-200"  
  } else if (score >= 6.5) {
    return baseStyle + "bg-orange-100 text-orange-800 border border-orange-200"
  } else {
    return baseStyle + "bg-red-100 text-red-800 border border-red-200"
  }
}

function getPerformanceIcon(score: number) {
  if (score >= 8.5) return "🔥"
  if (score >= 7.5) return "📈"
  if (score >= 6.5) return "📊"
  return "📉"
}

export default function StrategyMatrix({ marketData, selectedStrategy }: StrategyMatrixProps) {
  const strategies = [
    { key: 'wholesaling', name: 'Wholesaling', shortName: 'Wholesale' },
    { key: 'flipping', name: 'Flipping', shortName: 'Flip' },
    { key: 'rentals', name: 'Rentals', shortName: 'Rental' },
    { key: 'subjectTo', name: 'Subject To', shortName: 'Sub2' },
    { key: 'brrrr', name: 'BRRRR', shortName: 'BRRRR' },
    { key: 'commercial', name: 'Commercial', shortName: 'Commercial' }
  ]

  // Sort markets by selected strategy score (highest first)
  const sortedMarkets = [...marketData].sort((a, b) => 
    b.scores[selectedStrategy as keyof MarketData['scores']] - 
    a.scores[selectedStrategy as keyof MarketData['scores']]
  )

  // Calculate strategy averages
  const strategyAverages = strategies.map(strategy => {
    const avg = marketData.reduce((sum, market) => 
      sum + market.scores[strategy.key as keyof MarketData['scores']], 0) / marketData.length
    return { ...strategy, average: avg }
  }).sort((a, b) => b.average - a.average)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent-blue" />
          Investment Strategy Performance Matrix
        </h2>
        
        <div className="text-sm text-text-muted">
          Score Scale: 🔥 Excellent (8.5+) • 📈 Good (7.5-8.4) • 📊 Fair (6.5-7.4) • 📉 Poor (6.4-)
        </div>
      </div>

      {/* Strategy Averages Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {strategyAverages.map((strategy) => (
          <div 
            key={strategy.key}
            className={cn(
              "bg-bg-secondary rounded-lg p-4 border transition-all duration-200",
              selectedStrategy === strategy.key 
                ? "border-accent-blue ring-2 ring-accent-blue/20" 
                : "border-border-color"
            )}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {strategy.average.toFixed(1)}
              </div>
              <div className="text-sm text-text-muted">{strategy.shortName}</div>
              <div className="text-lg mt-1">{getPerformanceIcon(strategy.average)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Performance Matrix Table */}
      <div className="bg-bg-secondary rounded-2xl border border-border-color overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-bg-tertiary/50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted border-r border-border-color">
                  Market
                </th>
                {strategies.map((strategy) => (
                  <th 
                    key={strategy.key}
                    className={cn(
                      "text-center py-4 px-4 text-sm font-semibold border-r border-border-color last:border-r-0",
                      selectedStrategy === strategy.key 
                        ? "text-accent-blue bg-accent-blue/5" 
                        : "text-text-muted"
                    )}
                  >
                    {strategy.shortName}
                  </th>
                ))}
                <th className="text-center py-4 px-6 text-sm font-semibold text-text-muted">
                  Best Strategy
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sortedMarkets.map((market, index) => (
                <tr 
                  key={market.metro}
                  className="border-b border-border-color last:border-b-0 hover:bg-bg-tertiary/30 transition-colors duration-200"
                >
                  {/* Market Name */}
                  <td className="py-4 px-6 border-r border-border-color">
                    <div>
                      <div className="font-medium text-text-primary">{market.metro}</div>
                      <div className="text-sm text-text-muted">{market.state}</div>
                    </div>
                  </td>

                  {/* Strategy Scores */}
                  {strategies.map((strategy) => {
                    const score = market.scores[strategy.key as keyof MarketData['scores']]
                    const isSelected = selectedStrategy === strategy.key
                    
                    return (
                      <td 
                        key={strategy.key}
                        className="py-4 px-4 border-r border-border-color last:border-r-0 text-center"
                      >
                        <div className={getScoreStyle(score, isSelected)}>
                          {score.toFixed(1)}
                        </div>
                      </td>
                    )
                  })}

                  {/* Best Strategy */}
                  <td className="py-4 px-6 text-center">
                    <div className="px-3 py-1 bg-accent-purple/10 text-accent-purple border border-accent-purple/20 rounded-full text-sm font-medium">
                      {market.bestStrategy}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matrix Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performing Strategy */}
        <div className="bg-accent-green/5 border border-accent-green/20 rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-green" />
            Top Performing Strategy
          </h3>
          <div className="space-y-2">
            <div className="text-lg font-bold text-accent-green">
              {strategyAverages[0].name} - {strategyAverages[0].average.toFixed(1)} avg
            </div>
            <div className="text-sm text-text-secondary">
              Consistently performs well across multiple markets with the highest average score.
            </div>
          </div>
        </div>

        {/* Market Leader */}
        <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent-blue" />
            Market Leader
          </h3>
          <div className="space-y-2">
            <div className="text-lg font-bold text-accent-blue">
              {sortedMarkets[0].metro} - {sortedMarkets[0].scores[selectedStrategy as keyof MarketData['scores']].toFixed(1)} score
            </div>
            <div className="text-sm text-text-secondary">
              Best performing market for {strategies.find(s => s.key === selectedStrategy)?.name} strategy.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 