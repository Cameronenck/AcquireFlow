'use client'

import { useState } from 'react'
import { 
  X, 
  MapPin, 
  Home, 
  DollarSign, 
  Zap,
  Plus,
  Sliders
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdvancedFiltersPanelProps {
  isOpen: boolean
  onClose: () => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
  targetROI: number
  onTargetROIChange: (roi: number) => void
}

export default function AdvancedFiltersPanel({
  isOpen,
  onClose,
  priceRange,
  onPriceRangeChange,
  targetROI,
  onTargetROIChange
}: AdvancedFiltersPanelProps) {
  const [markets, setMarkets] = useState(['Lancaster, PA'])
  const [radius, setRadius] = useState(25)
  const [propertyTypes, setPropertyTypes] = useState(['Single Family', 'Multi Family'])
  const [bedrooms, setBedrooms] = useState('2+')
  const [bathrooms, setBathrooms] = useState('1+')
  const [sqftRange, setSqftRange] = useState([1000, 3000])
  const [condition, setCondition] = useState(['Light Rehab'])
  const [cashFlow, setCashFlow] = useState(300)
  const [capital, setCapital] = useState(50000)
  const [motivation, setMotivation] = useState('high')
  const [competition, setCompetition] = useState('low')
  const [dealScore, setDealScore] = useState(70)

  const propertyTypeOptions = ['Single Family', 'Multi Family', 'Commercial', 'Land']
  const conditionOptions = ['Move-in Ready', 'Light Rehab', 'Heavy Rehab', 'Tear Down']

  const handlePropertyTypeToggle = (type: string) => {
    setPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleConditionToggle = (cond: string) => {
    setCondition(prev => 
      prev.includes(cond) 
        ? prev.filter(c => c !== cond)
        : [...prev, cond]
    )
  }

  const handleClearAll = () => {
    setMarkets(['Lancaster, PA'])
    setRadius(25)
    setPropertyTypes(['Single Family'])
    setBedrooms('any')
    setBathrooms('any')
    setSqftRange([500, 5000])
    setCondition([])
    onPriceRangeChange([25000, 1000000])
    onTargetROIChange(8)
    setCashFlow(0)
    setCapital(25000)
    setMotivation('any')
    setCompetition('any')
    setDealScore(50)
  }

  const handleApplyFilters = () => {
    // TODO: Apply all filters to property search
    console.log('Applying filters:', {
      markets,
      radius,
      propertyTypes,
      bedrooms,
      bathrooms,
      sqftRange,
      condition,
      priceRange,
      targetROI,
      cashFlow,
      capital,
      motivation,
      competition,
      dealScore
    })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/25 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-bg-primary border-r border-border-color z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
            <Sliders className="w-5 h-5 text-accent-blue" />
            Advanced Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Markets
                </label>
                <div className="space-y-2">
                  {markets.map((market, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={market}
                        onChange={(e) => {
                          const newMarkets = [...markets]
                          newMarkets[index] = e.target.value
                          setMarkets(newMarkets)
                        }}
                        className="flex-1 px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                      />
                      {markets.length > 1 && (
                        <button
                          onClick={() => setMarkets(markets.filter((_, i) => i !== index))}
                          className="p-2 text-text-muted hover:text-accent-red transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setMarkets([...markets, ''])}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Market
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Radius: {radius} miles
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>10mi</span>
                  <span>50mi</span>
                  <span>100mi+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Property Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Property Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypeOptions.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propertyTypes.includes(type)}
                        onChange={() => handlePropertyTypeToggle(type)}
                        className="rounded border-border-color text-accent-blue focus:ring-accent-blue"
                      />
                      <span className="text-text-secondary">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Condition
                </label>
                <div className="space-y-2">
                  {conditionOptions.map((cond) => (
                    <label key={cond} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={condition.includes(cond)}
                        onChange={() => handleConditionToggle(cond)}
                        className="rounded border-border-color text-accent-blue focus:ring-accent-blue"
                      />
                      <span className="text-text-secondary">{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                    Bedrooms
                  </label>
                  <select 
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  >
                    <option value="any">Any</option>
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                    Bathrooms
                  </label>
                  <select 
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  >
                    <option value="any">Any</option>
                    <option value="1+">1+</option>
                    <option value="1.5+">1.5+</option>
                    <option value="2+">2+</option>
                    <option value="3+">3+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Square Footage: {sqftRange[0]} - {sqftRange[1]} sqft
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={sqftRange[0]}
                    onChange={(e) => setSqftRange([parseInt(e.target.value), sqftRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={sqftRange[1]}
                    onChange={(e) => setSqftRange([sqftRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Investment Criteria */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Investment Criteria
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Target ROI: {targetROI}%+
                </label>
                <input
                  type="range"
                  min="8"
                  max="30"
                  value={targetROI}
                  onChange={(e) => onTargetROIChange(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Min Cash Flow: ${cashFlow}+ Monthly
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={cashFlow}
                  onChange={(e) => setCashFlow(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Available Capital: ${(capital / 1000).toFixed(0)}K
                </label>
                <input
                  type="range"
                  min="25000"
                  max="500000"
                  step="25000"
                  value={capital}
                  onChange={(e) => setCapital(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* AI Intelligence */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Intelligence
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Seller Motivation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'high', name: 'High' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'low', name: 'Low' },
                    { id: 'any', name: 'Any' }
                  ].map((option) => (
                    <label key={option.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="motivation"
                        value={option.id}
                        checked={motivation === option.id}
                        onChange={(e) => setMotivation(e.target.value)}
                        className="text-accent-blue focus:ring-accent-blue"
                      />
                      <span className="text-text-secondary">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  Competition Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'low', name: 'Low' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'high', name: 'High' },
                    { id: 'any', name: 'Any' }
                  ].map((option) => (
                    <label key={option.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="competition"
                        value={option.id}
                        checked={competition === option.id}
                        onChange={(e) => setCompetition(e.target.value)}
                        className="text-accent-blue focus:ring-accent-blue"
                      />
                      <span className="text-text-secondary">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-muted uppercase tracking-wider block mb-2">
                  AI Deal Score: {dealScore}%+ Confidence
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={dealScore}
                  onChange={(e) => setDealScore(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border-color bg-bg-primary">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Clear All
          </button>
          
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
} 