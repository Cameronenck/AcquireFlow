'use client'

import { useState } from 'react'
import { 
  MapPin, 
  TrendingUp, 
  Target, 
  Filter, 
  Zap, 
  DollarSign,
  Clock,
  Users,
  Home,
  Sliders
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DealDiscoverySidebarProps {
  selectedStrategy: string
  onFiltersChange: (filters: any) => void
}

export default function DealDiscoverySidebar({ selectedStrategy, onFiltersChange }: DealDiscoverySidebarProps) {
  const [location, setLocation] = useState('')
  const [radius, setRadius] = useState(25)
  const [priceRange, setPriceRange] = useState([25000, 500000])
  const [propertyTypes, setPropertyTypes] = useState<string[]>(['Single Family'])
  const [targetROI, setTargetROI] = useState(15)
  const [cashFlow, setCashFlow] = useState(300)
  const [motivation, setMotivation] = useState('any')
  const [competition, setCompetition] = useState('any')

  const strategyNames: { [key: string]: string } = {
    wholesaling: 'Wholesaling',
    flipping: 'Flipping',
    rentals: 'Rentals',
    subjectTo: 'Subject To',
    brrrr: 'BRRRR',
    sellerFinance: 'Seller Finance'
  }

  const aiRecommendations = [
    {
      id: 1,
      type: 'opportunity',
      title: 'High Equity Property',
      description: 'Found property with 65% equity just listed',
      confidence: 92,
      action: 'View Property'
    },
    {
      id: 2,
      type: 'market',
      title: 'Low Competition Area',
      description: 'Lancaster West has 40% fewer investors',
      confidence: 87,
      action: 'Explore Area'
    },
    {
      id: 3,
      type: 'timing',
      title: 'Best Offer Time',
      description: 'Send offers Tuesday 10-11am for 23% higher response',
      confidence: 79,
      action: 'Schedule Offers'
    }
  ]

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border-color">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Target className="w-5 h-5 text-accent-blue" />
          Smart Deal Finder
        </h2>
        <p className="text-sm text-text-muted mt-1">
          AI-powered filters for {strategyNames[selectedStrategy]} deals
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Location & Market Filters */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location & Market
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Primary Location
              </label>
              <input
                type="text"
                placeholder="Enter city, state, or ZIP..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Market Radius: {radius} miles
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>10mi</span>
                <span>50mi</span>
                <span>100mi+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Criteria */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Home className="w-4 h-4" />
            Property Criteria
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Property Types
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Single Family', 'Multi Family', 'Commercial', 'Land'].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={propertyTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPropertyTypes([...propertyTypes, type])
                        } else {
                          setPropertyTypes(propertyTypes.filter(t => t !== type))
                        }
                      }}
                      className="rounded border-border-color text-accent-blue focus:ring-accent-blue"
                    />
                    <span className="text-text-secondary">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
              </label>
              <div className="mt-2 space-y-2">
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Investment Strategy Filters */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Investment Targets
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Target ROI: {targetROI}%+
              </label>
              <input
                type="range"
                min="8"
                max="30"
                value={targetROI}
                onChange={(e) => setTargetROI(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Min Cash Flow: ${cashFlow}/month
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={cashFlow}
                onChange={(e) => setCashFlow(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>
        </div>

        {/* AI Filters */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            AI Intelligence
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Seller Motivation
              </label>
              <select 
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="any">Any Level</option>
                <option value="high">High Motivation</option>
                <option value="medium">Medium Motivation</option>
                <option value="low">Low Motivation</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Competition Level
              </label>
              <select 
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="any">Any Level</option>
                <option value="low">Low Competition</option>
                <option value="medium">Medium Competition</option>
                <option value="high">High Competition</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            AI Recommendations
          </h3>
          
          <div className="space-y-3">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-bg-primary border border-border-color rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-text-primary">{rec.title}</h4>
                  <span className="text-xs text-accent-green font-medium">{rec.confidence}%</span>
                </div>
                <p className="text-xs text-text-muted mb-2">{rec.description}</p>
                <button className="text-xs text-accent-blue hover:text-accent-blue/80 font-medium">
                  {rec.action} →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
          Apply AI Filters
        </button>
      </div>
    </div>
  )
} 