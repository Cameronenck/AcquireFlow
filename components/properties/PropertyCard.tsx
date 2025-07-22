'use client'

import { useState } from 'react'
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Eye,
  Send,
  MoreHorizontal,
  Zap,
  Clock,
  Users,
  Target,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize: number
  yearBuilt: number
  propertyType: string
  condition: string
  images: string[]
  aiScore: number
  motivation: string
  competition: string
  dealProbability: number
  strategyMetrics: {
    wholesaling: { assignmentFee: number; marketTime: number; competition: string }
    flipping: { rehabCost: number; arv: number; profit: number; timeline: number }
    rentals: { cashFlow: number; capRate: number; rentEstimate: number; expenses: number }
    subjectTo: { equityPosition: number; paymentHistory: string; motivation: string }
    brrrr: { rehabPotential: number; refinanceEstimate: number; rentalProjection: number }
    sellerFinance: { ownerMotivation: string; financingTerms: string }
  }
  lastUpdated: string
}

interface PropertyCardProps {
  property: Property
  selectedStrategy: string
  isSelected: boolean
  onSelect: () => void
}

function getAIScoreColor(score: number): string {
  if (score >= 85) return 'text-accent-green bg-accent-green/10 border-accent-green/20'
  if (score >= 70) return 'text-accent-blue bg-accent-blue/10 border-accent-blue/20'
  if (score >= 50) return 'text-accent-orange bg-accent-orange/10 border-accent-orange/20'
  return 'text-accent-red bg-accent-red/10 border-accent-red/20'
}

function getMotivationColor(motivation: string): string {
  switch (motivation.toLowerCase()) {
    case 'very high': return 'text-accent-red'
    case 'high': return 'text-accent-orange'
    case 'medium': return 'text-accent-blue'
    case 'low': return 'text-text-muted'
    default: return 'text-text-muted'
  }
}

function getCompetitionColor(competition: string): string {
  switch (competition.toLowerCase()) {
    case 'low': return 'text-accent-green'
    case 'medium': return 'text-accent-orange'
    case 'high': return 'text-accent-red'
    default: return 'text-text-muted'
  }
}

function StrategyMetrics({ strategy, metrics }: { strategy: string, metrics: any }) {
  switch (strategy) {
    case 'wholesaling':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              Assignment:
            </span>
            <span className="font-semibold text-accent-green">${metrics.assignmentFee.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Market Time:
            </span>
            <span className="text-text-primary">{metrics.marketTime} days</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <Users className="w-3 h-3" />
              Competition:
            </span>
            <span className={getCompetitionColor(metrics.competition)}>{metrics.competition}</span>
          </div>
        </div>
      )
    
    case 'flipping':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              Est. Profit:
            </span>
            <span className="font-semibold text-accent-green">${metrics.profit.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Rehab Cost:</span>
            <span className="text-text-primary">${metrics.rehabCost.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Timeline:
            </span>
            <span className="text-text-primary">{metrics.timeline} days</span>
          </div>
        </div>
      )
    
    case 'rentals':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              Cash Flow:
            </span>
            <span className="font-semibold text-accent-green">${metrics.cashFlow}/mo</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Cap Rate:</span>
            <span className="text-text-primary">{metrics.capRate.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Rent Est:</span>
            <span className="text-text-primary">${metrics.rentEstimate.toLocaleString()}/mo</span>
          </div>
        </div>
      )
    
    case 'subjectTo':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Equity Position:</span>
            <span className="font-semibold text-accent-green">{metrics.equityPosition}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Payment History:</span>
            <span className={cn(
              metrics.paymentHistory === 'Excellent' ? 'text-accent-green' :
              metrics.paymentHistory === 'Good' ? 'text-accent-blue' :
              metrics.paymentHistory === 'Fair' ? 'text-accent-orange' : 'text-accent-red'
            )}>{metrics.paymentHistory}</span>
          </div>
        </div>
      )
    
    case 'brrrr':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Rehab Potential:</span>
            <span className="text-text-primary">${metrics.rehabPotential.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Refinance Est:</span>
            <span className="text-accent-blue">${metrics.refinanceEstimate.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              Rental Proj:
            </span>
            <span className="text-accent-green">${metrics.rentalProjection}/mo</span>
          </div>
        </div>
      )
    
    case 'sellerFinance':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Owner Motivation:</span>
            <span className={getMotivationColor(metrics.ownerMotivation)}>{metrics.ownerMotivation}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Financing Terms:</span>
            <span className={cn(
              metrics.financingTerms === 'Very Flexible' ? 'text-accent-green' :
              metrics.financingTerms === 'Flexible' ? 'text-accent-blue' :
              metrics.financingTerms === 'Standard' ? 'text-accent-orange' : 'text-text-muted'
            )}>{metrics.financingTerms}</span>
          </div>
        </div>
      )
    
    default:
      return null
  }
}

export default function PropertyCard({ 
  property, 
  selectedStrategy, 
  isSelected, 
  onSelect 
}: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const strategyMetrics = property.strategyMetrics[selectedStrategy as keyof typeof property.strategyMetrics]

  return (
    <div className={cn(
      "bg-bg-secondary rounded-2xl border transition-all duration-300 hover:shadow-lg group cursor-pointer",
      isSelected 
        ? "border-accent-blue ring-2 ring-accent-blue/20 shadow-lg" 
        : "border-border-color hover:border-accent-blue/50"
    )}>
      {/* Property Image */}
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.address}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        
        {/* Overlay Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2">
            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
              getAIScoreColor(property.aiScore)
            )}>
              💡 AI: {property.aiScore}/100
            </div>
            <div className="px-2 py-1 bg-black/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
              🎯 {property.dealProbability}% Deal Prob
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
              className={cn(
                "p-2 rounded-full backdrop-blur-sm transition-colors duration-200",
                isLiked 
                  ? "bg-accent-red text-white" 
                  : "bg-black/20 text-white hover:bg-accent-red hover:text-white"
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </button>
          </div>
        </div>

        {/* Selection Checkbox */}
        <div className="absolute bottom-4 left-4">
          <label 
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="w-4 h-4 rounded border-white/50 text-accent-blue focus:ring-accent-blue bg-white/10 backdrop-blur-sm"
            />
            <span className="text-white text-sm font-medium select-none">Select</span>
          </label>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary line-clamp-1">{property.address}</h3>
            <div className="flex items-center gap-1 text-text-muted text-sm">
              <MapPin className="w-4 h-4" />
              <span>{property.city}, {property.state} {property.zipCode}</span>
            </div>
          </div>
          
          <div className="text-right ml-4">
            <div className="text-xl font-bold text-text-primary">
              ${property.price.toLocaleString()}
            </div>
            <div className="text-xs text-text-muted">{property.lastUpdated}</div>
          </div>
        </div>

        {/* Property Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-text-muted">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}BR</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}BA</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{property.yearBuilt}</span>
          </div>
        </div>

        {/* Property Type & Condition */}
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 bg-bg-tertiary text-text-secondary rounded-md text-xs">
            {property.propertyType}
          </span>
          <span className={cn(
            "px-2 py-1 rounded-md text-xs",
            property.condition === 'Move-in Ready' ? 'bg-accent-green/10 text-accent-green' :
            property.condition === 'Light Rehab' ? 'bg-accent-blue/10 text-accent-blue' :
            property.condition === 'Heavy Rehab' ? 'bg-accent-orange/10 text-accent-orange' :
            property.condition === 'Cosmetic Work' ? 'bg-accent-purple/10 text-accent-purple' :
            'bg-accent-red/10 text-accent-red'
          )}>
            {property.condition}
          </span>
        </div>

        {/* Strategy-Specific Metrics */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            {selectedStrategy.charAt(0).toUpperCase() + selectedStrategy.slice(1)} Metrics
          </h4>
          <StrategyMetrics strategy={selectedStrategy} metrics={strategyMetrics} />
        </div>

        {/* Market Intelligence */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Motivation:</span>
            <span className={getMotivationColor(property.motivation)}>{property.motivation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Competition:</span>
            <span className={getCompetitionColor(property.competition)}>{property.competition}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Show quick analysis modal
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-bg-tertiary text-text-secondary border border-border-color rounded-lg hover:bg-bg-primary hover:text-text-primary transition-colors duration-200 text-sm"
          >
            <Eye className="w-4 h-4" />
            Quick Analysis
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Generate single offer
            }}
            className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            Generate Offer
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Show property menu
            }}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 