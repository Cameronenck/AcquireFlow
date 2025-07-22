'use client'

import { MapPin, TrendingUp, TrendingDown } from 'lucide-react'
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

interface USMarketHeatmapProps {
  selectedStrategy: string
  marketData: MarketData[]
}

function getScoreColor(score: number): string {
  if (score >= 8.5) return 'bg-red-500' // Hot market
  if (score >= 7.5) return 'bg-orange-500' // Warm market
  if (score >= 6.5) return 'bg-yellow-500' // Moderate market
  if (score >= 5.5) return 'bg-blue-400' // Cool market
  return 'bg-blue-600' // Cold market
}

function getScoreIntensity(score: number): string {
  if (score >= 8.5) return 'opacity-100'
  if (score >= 7.5) return 'opacity-80'
  if (score >= 6.5) return 'opacity-60'
  if (score >= 5.5) return 'opacity-40'
  return 'opacity-20'
}

function MarketCard({ market, selectedStrategy }: { market: MarketData, selectedStrategy: string }) {
  const score = market.scores[selectedStrategy as keyof MarketData['scores']]
  const scoreColor = getScoreColor(score)
  const intensity = getScoreIntensity(score)
  
  return (
    <div className={cn(
      "relative p-4 rounded-lg border border-border-color cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
      scoreColor,
      intensity
    )}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white text-sm">{market.metro}</h3>
          <div className="text-white font-bold text-lg">{score.toFixed(1)}</div>
        </div>
        
        <div className="space-y-1 text-white/90 text-xs">
          <div className="flex justify-between">
            <span>Growth:</span>
            <span>{market.priceGrowth.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Population:</span>
            <span>{market.population}</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-1">
          {score >= 8.0 ? (
            <TrendingUp className="w-3 h-3 text-white" />
          ) : (
            <TrendingDown className="w-3 h-3 text-white" />
          )}
          <span className="text-xs text-white/80">
            {score >= 8.0 ? 'Hot Market' : score >= 6.5 ? 'Moderate' : 'Cool Market'}
          </span>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
    </div>
  )
}

export default function USMarketHeatmap({ selectedStrategy, marketData }: USMarketHeatmapProps) {
  const strategyNames = {
    wholesaling: 'Wholesaling',
    flipping: 'Flipping', 
    rentals: 'Rentals',
    subjectTo: 'Subject To',
    brrrr: 'BRRRR',
    commercial: 'Commercial'
  }

  // Sort markets by selected strategy score
  const sortedMarkets = [...marketData].sort((a, b) => 
    b.scores[selectedStrategy as keyof MarketData['scores']] - 
    a.scores[selectedStrategy as keyof MarketData['scores']]
  )

  // Calculate averages for insights
  const avgScore = marketData.reduce((sum, market) => 
    sum + market.scores[selectedStrategy as keyof MarketData['scores']], 0) / marketData.length
  
  const hotMarkets = marketData.filter(market => 
    market.scores[selectedStrategy as keyof MarketData['scores']] >= 8.5).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-blue" />
          US Market Heatmap - {strategyNames[selectedStrategy as keyof typeof strategyNames]}
        </h2>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-text-muted">Hot (8.5+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded opacity-80"></div>
            <span className="text-text-muted">Warm (7.5-8.4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded opacity-60"></div>
            <span className="text-text-muted">Moderate (6.5-7.4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded opacity-40"></div>
            <span className="text-text-muted">Cool (5.5-6.4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded opacity-20"></div>
            <span className="text-text-muted">Cold (5.5-)</span>
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="text-2xl font-bold text-text-primary">{avgScore.toFixed(1)}</div>
          <div className="text-sm text-text-muted">Average Market Score</div>
        </div>
        
        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="text-2xl font-bold text-accent-red">{hotMarkets}</div>
          <div className="text-sm text-text-muted">Hot Markets (8.5+)</div>
        </div>
        
        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="text-2xl font-bold text-accent-blue">{sortedMarkets[0].metro}</div>
          <div className="text-sm text-text-muted">Top Opportunity</div>
        </div>
      </div>

      {/* Simplified Market Grid (Simulating US Map Layout) */}
      <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedMarkets.map((market) => (
            <MarketCard 
              key={market.metro}
              market={market}
              selectedStrategy={selectedStrategy}
            />
          ))}
        </div>
      </div>

      {/* Strategy-Specific Insights */}
      <div className="mt-6 bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
        <h3 className="font-semibold text-text-primary mb-2">
          {strategyNames[selectedStrategy as keyof typeof strategyNames]} Market Insights
        </h3>
        <div className="text-sm text-text-secondary space-y-1">
          {selectedStrategy === 'wholesaling' && (
            <>
              <p>• High distressed inventory markets show best wholesaling opportunities</p>
              <p>• Tampa, FL leads with 9.1 score - strong investor activity and deal flow</p>
              <p>• Average assignment fees range from $8K-$25K in top markets</p>
            </>
          )}
          {selectedStrategy === 'flipping' && (
            <>
              <p>• Phoenix, AZ dominates with 9.4 score - high appreciation and renovation demand</p>
              <p>• Markets with 15%+ price growth show best flip opportunities</p>
              <p>• Average profit margins range from $35K-$65K in hot markets</p>
            </>
          )}
          {selectedStrategy === 'rentals' && (
            <>
              <p>• Indianapolis, IN leads with 9.3 score - excellent cash flow opportunities</p>
              <p>• Markets with lower median incomes often provide better rental yields</p>
              <p>• Focus on job growth and population increase for long-term stability</p>
            </>
          )}
          {selectedStrategy === 'subjectTo' && (
            <>
              <p>• Atlanta, GA shows highest potential with 8.7 score</p>
              <p>• Look for markets with moderate to high homeowner equity</p>
              <p>• Success rates typically range from 65%-85% in top markets</p>
            </>
          )}
          {selectedStrategy === 'brrrr' && (
            <>
              <p>• Charlotte, NC leads with 9.2 score - excellent refinance environment</p>
              <p>• Strong rental demand post-renovation is critical for success</p>
              <p>• Average cash recovery ranges from 75%-95% in optimal markets</p>
            </>
          )}
          {selectedStrategy === 'commercial' && (
            <>
              <p>• Austin, TX dominates with 9.4 score - strong commercial growth</p>
              <p>• Focus on job growth and business expansion in target markets</p>
              <p>• Cap rates range from 6%-10% depending on property type and location</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 