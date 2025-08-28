'use client'

import { useState } from 'react'
import { Database, Search, ArrowUpDown, ArrowUp, ArrowDown, Target } from 'lucide-react'
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

interface MarketDatabaseProps {
  marketData: MarketData[]
  selectedStrategy: string
}

type SortField = 'metro' | 'state' | 'population' | 'medianIncome' | 'unemployment' | 'priceGrowth' | 'inventory' | 'bestStrategy' | keyof MarketData['scores']
type SortDirection = 'asc' | 'desc'

function SortIcon({ direction }: { direction: SortDirection | null }) {
  if (direction === 'asc') return <ArrowUp className="w-4 h-4" />
  if (direction === 'desc') return <ArrowDown className="w-4 h-4" />
  return <ArrowUpDown className="w-4 h-4 opacity-50" />
}

function getScoreColor(score: number): string {
  if (score >= 8.5) return 'text-green-600 bg-green-50 border-green-200'
  if (score >= 7.5) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
  if (score >= 6.5) return 'text-orange-600 bg-orange-50 border-orange-200'
  return 'text-red-600 bg-red-50 border-red-200'
}

export default function MarketDatabase({ marketData, selectedStrategy }: MarketDatabaseProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('metro')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const getSortDirection = (field: SortField): SortDirection | null => {
    return sortField === field ? sortDirection : null
  }

     // Filter and sort data
  const filteredAndSortedData = marketData
    .filter(market => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        market.metro.toLowerCase().includes(query) ||
        market.state.toLowerCase().includes(query) ||
        market.bestStrategy.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      let aValue: any
      let bValue: any

      if (Object.keys(a.scores).includes(sortField)) {
        aValue = a.scores[sortField as keyof MarketData['scores']]
        bValue = b.scores[sortField as keyof MarketData['scores']]
      } else {
        aValue = a[sortField as keyof MarketData]
        bValue = b[sortField as keyof MarketData]
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const strategies = [
    { key: 'wholesaling', name: 'Wholesale' },
    { key: 'flipping', name: 'Flip' },
    { key: 'rentals', name: 'Rental' },
    { key: 'subjectTo', name: 'Sub2' },
    { key: 'brrrr', name: 'BRRRR' },
    { key: 'commercial', name: 'Commercial' }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <Database className="w-5 h-5 text-accent-blue" />
          Comprehensive Market Database
        </h2>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            />
          </div>
          
          <div className="text-sm text-text-muted">
            {filteredAndSortedData.length} of {marketData.length} markets
          </div>
        </div>
      </div>

      {/* Database Table */}
      <div className="bg-bg-secondary rounded-2xl border border-border-color overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-bg-tertiary/50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('metro')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Metro
                    <SortIcon direction={getSortDirection('metro')} />
                  </button>
                </th>
                
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('state')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    State
                    <SortIcon direction={getSortDirection('state')} />
                  </button>
                </th>

                <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('population')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Pop
                    <SortIcon direction={getSortDirection('population')} />
                  </button>
                </th>

                <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('medianIncome')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Income
                    <SortIcon direction={getSortDirection('medianIncome')} />
                  </button>
                </th>

                <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('unemployment')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Unemp
                    <SortIcon direction={getSortDirection('unemployment')} />
                  </button>
                </th>

                <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('priceGrowth')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Growth
                    <SortIcon direction={getSortDirection('priceGrowth')} />
                  </button>
                </th>

                <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted border-r border-border-color">
                  <button
                    onClick={() => handleSort('inventory')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Inventory
                    <SortIcon direction={getSortDirection('inventory')} />
                  </button>
                </th>

                {/* Strategy Score Columns */}
                {strategies.map((strategy) => (
                  <th 
                    key={strategy.key}
                    className={cn(
                      "text-center py-4 px-3 text-sm font-semibold border-r border-border-color",
                      selectedStrategy === strategy.key 
                        ? "text-accent-blue bg-accent-blue/5" 
                        : "text-text-muted"
                    )}
                  >
                    <button
                      onClick={() => handleSort(strategy.key as SortField)}
                      className="flex items-center gap-1 hover:text-text-primary transition-colors duration-200"
                    >
                      {strategy.name}
                      <SortIcon direction={getSortDirection(strategy.key as SortField)} />
                    </button>
                  </th>
                ))}

                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  <button
                    onClick={() => handleSort('bestStrategy')}
                    className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
                  >
                    Best Strategy
                    <SortIcon direction={getSortDirection('bestStrategy')} />
                  </button>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredAndSortedData.map((market, index) => (
                <tr 
                  key={market.metro}
                  className="border-b border-border-color last:border-b-0 hover:bg-bg-tertiary/30 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-r border-border-color">
                    <div className="font-medium text-text-primary">{market.metro}</div>
                  </td>
                  
                  <td className="py-4 px-4 border-r border-border-color">
                    <div className="text-text-secondary text-sm">{market.state}</div>
                  </td>

                  <td className="py-4 px-4 border-r border-border-color text-right">
                    <div className="text-text-secondary text-sm">{market.population}</div>
                  </td>

                  <td className="py-4 px-4 border-r border-border-color text-right">
                    <div className="text-text-secondary text-sm">
                      ${(market.medianIncome / 1000).toFixed(0)}K
                    </div>
                  </td>

                  <td className="py-4 px-4 border-r border-border-color text-right">
                    <div className="text-text-secondary text-sm">{market.unemployment.toFixed(1)}%</div>
                  </td>

                  <td className="py-4 px-4 border-r border-border-color text-right">
                    <div className={cn(
                      "text-sm font-medium",
                      market.priceGrowth >= 10 ? "text-accent-green" : 
                      market.priceGrowth >= 5 ? "text-text-primary" : "text-accent-red"
                    )}>
                      {market.priceGrowth.toFixed(1)}%
                    </div>
                  </td>

                  <td className="py-4 px-4 border-r border-border-color text-right">
                    <div className={cn(
                      "text-sm font-medium",
                      market.inventory <= 2 ? "text-accent-red" : 
                      market.inventory <= 3 ? "text-accent-orange" : "text-text-secondary"
                    )}>
                      {market.inventory.toFixed(1)} mo
                    </div>
                  </td>

                  {/* Strategy Scores */}
                  {strategies.map((strategy) => {
                    const score = market.scores[strategy.key as keyof MarketData['scores']]
                    const isSelected = selectedStrategy === strategy.key
                    
                    return (
                      <td 
                        key={strategy.key}
                        className="py-4 px-3 border-r border-border-color text-center"
                      >
                        <div className={cn(
                          "px-2 py-1 rounded text-sm font-semibold border",
                          getScoreColor(score),
                          isSelected && "ring-2 ring-accent-blue ring-offset-1"
                        )}>
                          {score.toFixed(1)}
                        </div>
                      </td>
                    )
                  })}

                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Target className="w-3 h-3 text-accent-purple" />
                      <span className="text-sm font-medium text-accent-purple">
                        {market.bestStrategy}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Summary */}
      <div className="mt-6 bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-2">Database Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-text-muted">Markets Analyzed:</span>
            <span className="font-semibold text-text-primary ml-2">{marketData.length}</span>
          </div>
          <div>
            <span className="text-text-muted">Investment Strategies:</span>
            <span className="font-semibold text-text-primary ml-2">6</span>
          </div>
          <div>
            <span className="text-text-muted">Data Points:</span>
            <span className="font-semibold text-text-primary ml-2">{marketData.length * 6} scores</span>
          </div>
        </div>
      </div>
    </div>
  )
} 