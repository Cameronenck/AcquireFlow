'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MessageSquare,
  Calendar,
  DollarSign,
  Clock,
  User,
  Building,
  MapPin,
  Star,
  TrendingUp,
  Target,
  Zap,
  Home,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { initializeTheme } from '@/lib/utils'
import { PipelineProvider, usePipeline, PIPELINE_STAGES, Deal, PipelineStage } from '@/lib/contexts/PipelineContext'
import { cn } from '@/lib/utils'

// Priority color mapping
const getPriorityColor = (priority: Deal['priority']) => {
  switch (priority) {
    case 'high': return 'border-l-warm-orange bg-warm-orange/5'
    case 'medium': return 'border-l-bright-yellow bg-bright-yellow/5'
    case 'low': return 'border-l-medium-gray bg-medium-gray/5'
    default: return 'border-l-medium-gray bg-medium-gray/5'
  }
}

// Strategy color mapping
const getStrategyColor = (strategy: Deal['strategy']) => {
  switch (strategy) {
    case 'wholesaling': return 'bg-warm-orange/10 text-warm-orange border border-warm-orange/30'
    case 'flipping': return 'bg-ocean-blue/10 text-ocean-blue border border-ocean-blue/30'
    case 'rentals': return 'bg-brand-green/10 text-brand-green border border-brand-green/30'
    case 'subjectTo': return 'bg-royal-purple/10 text-royal-purple border border-royal-purple/30'
    case 'brrrr': return 'bg-deep-teal/10 text-deep-teal border border-deep-teal/30'
    case 'commercial': return 'bg-bright-yellow/10 text-dark-slate border border-bright-yellow/30'
    default: return 'bg-medium-gray/10 text-medium-gray border border-medium-gray/30'
  }
}

// Property type icon mapping
const getPropertyIcon = (type: Deal['property']['propertyType']) => {
  switch (type) {
    case 'Single Family': return <Home className="w-4 h-4" />
    case 'Multi Family': return <Building className="w-4 h-4" />
    case 'Commercial': return <Building className="w-4 h-4" />
    case 'Condo': return <Building className="w-4 h-4" />
    case 'Townhouse': return <Home className="w-4 h-4" />
    case 'Land': return <MapPin className="w-4 h-4" />
    default: return <Home className="w-4 h-4" />
  }
}

// Deal Card Component
function DealCard({ deal, onStageChange, onViewDetails }: { 
  deal: Deal
  onStageChange: (dealId: string, newStage: PipelineStage) => void
  onViewDetails: (deal: Deal) => void 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getAvatarColors = (index: number) => {
    const colorSets = [
      'from-ocean-blue to-deep-teal',
      'from-brand-green to-warm-orange',
      'from-royal-purple to-warm-orange',
      'from-warm-orange to-bright-yellow',
      'from-deep-teal to-brand-green',
      'from-bright-yellow to-warm-orange'
    ]
    return colorSets[index % colorSets.length]
  }

  return (
    <div
      className={cn(
        "bg-bg-secondary rounded-lg border-l-4 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
        getPriorityColor(deal.priority),
        isHovered && "transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(deal)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('dealId', deal.id)
        e.dataTransfer.setData('currentStage', deal.stage)
      }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-text-muted">
            {getPropertyIcon(deal.property.propertyType)}
          </div>
          <div className="flex items-center gap-1">
            <span className={cn(
              "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
              getStrategyColor(deal.strategy)
            )}>
              {deal.strategy.charAt(0).toUpperCase() + deal.strategy.slice(1)}
            </span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowActions(!showActions)
            }}
            className="p-1 hover:bg-bg-tertiary rounded transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-text-muted" />
          </button>
          {showActions && (
            <div className="absolute right-0 top-6 bg-bg-primary border border-border-color rounded-lg shadow-lg py-1 z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails(deal)
                  setShowActions(false)
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-bg-secondary w-full text-left"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: Implement edit functionality
                  setShowActions(false)
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-bg-secondary w-full text-left"
              >
                <Edit3 className="w-4 h-4" />
                Edit Deal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Property Info */}
      <div className="mb-3">
        <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-1">
          {deal.property.address}
        </h3>
        <p className="text-text-muted text-xs mb-2">
          {deal.property.city}, {deal.property.state} {deal.property.zipCode}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-text-primary">
            {formatCurrency(deal.value)}
          </span>
          <span className="text-text-muted">
            List: {formatCurrency(deal.property.price)}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex items-center gap-3 mb-3 p-2 bg-bg-tertiary rounded-md">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium bg-gradient-to-br",
          getAvatarColors(parseInt(deal.contact.id.slice(-1)))
        )}>
          {deal.contact.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {deal.contact.name}
          </p>
          <p className="text-xs text-text-muted truncate">
            {deal.contact.company || deal.contact.role}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement phone call
            }}
            className="p-1 hover:bg-bg-secondary rounded transition-colors"
          >
            <Phone className="w-3 h-3 text-text-muted" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement email
            }}
            className="p-1 hover:bg-bg-secondary rounded transition-colors"
          >
            <Mail className="w-3 h-3 text-text-muted" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement message
            }}
            className="p-1 hover:bg-bg-secondary rounded transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-text-muted" />
          </button>
        </div>
      </div>

      {/* Deal Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-text-muted" />
          <span className="text-text-muted">{deal.daysInStage}d in stage</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-bright-yellow" />
          <span className="text-text-muted capitalize">{deal.priority}</span>
        </div>
      </div>

      {/* Tags */}
      {deal.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {deal.tags.slice(0, 2).map((tag, index) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 bg-bg-primary text-text-muted text-xs rounded border"
            >
              {tag}
            </span>
          ))}
          {deal.tags.length > 2 && (
            <span className="text-xs text-text-muted">
              +{deal.tags.length - 2} more
            </span>
          )}
        </div>
      )}

      {/* Last Activity */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-text-muted">
          Last activity: {deal.lastActivity}
        </span>
        {deal.next_action && (
          <div className="flex items-center gap-1 text-warm-orange">
            <AlertCircle className="w-3 h-3" />
            <span>Action needed</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Pipeline Stage Column Component
function PipelineStageColumn({ 
  stage, 
  deals, 
  onStageChange, 
  onViewDetails 
}: { 
  stage: typeof PIPELINE_STAGES[0]
  deals: Deal[]
  onStageChange: (dealId: string, newStage: PipelineStage) => void
  onViewDetails: (deal: Deal) => void
}) {
  const { getStageStats } = usePipeline()
  const stats = getStageStats(stage.id)
  
  const [isDragOver, setIsDragOver] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const dealId = e.dataTransfer.getData('dealId')
    const currentStage = e.dataTransfer.getData('currentStage')
    
    if (dealId && currentStage !== stage.id) {
      onStageChange(dealId, stage.id)
    }
  }

  return (
    <div className="flex flex-col h-full min-w-[300px] max-w-[350px]">
      {/* Stage Header */}
      <div className={cn(
        "p-4 rounded-t-lg border-b-2",
        `bg-${stage.color}/5 border-${stage.color}`
      )}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{stage.icon}</span>
            <h3 className="font-semibold text-text-primary">{stage.name}</h3>
          </div>
          <button className="p-1 hover:bg-bg-tertiary rounded transition-colors">
            <Plus className="w-4 h-4 text-text-muted" />
          </button>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">
            {stats.count} deal{stats.count !== 1 ? 's' : ''}
          </span>
          <span className={cn("font-semibold", `text-${stage.color}`)}>
            {formatCurrency(stats.totalValue)}
          </span>
        </div>
      </div>

      {/* Stage Content */}
      <div
        className={cn(
          "flex-1 p-3 space-y-3 bg-bg-primary/50 rounded-b-lg border-l border-r border-b border-border-color min-h-[600px] overflow-y-auto",
          isDragOver && "bg-bg-secondary/50 border-dashed border-2 border-primary"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {deals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-text-muted">
            <div className="text-2xl mb-2">{stage.icon}</div>
            <p className="text-sm">No deals in {stage.name.toLowerCase()}</p>
          </div>
        ) : (
          deals.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              onStageChange={onStageChange}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </div>
    </div>
  )
}

// Deal Details Modal Component
function DealDetailsModal({ 
  deal, 
  isOpen, 
  onClose 
}: { 
  deal: Deal | null
  isOpen: boolean
  onClose: () => void 
}) {
  if (!isOpen || !deal) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                {deal.property.address}
              </h2>
              <p className="text-text-muted">
                {deal.property.city}, {deal.property.state} {deal.property.zipCode}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Details */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Property Details</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-text-muted text-sm">Property Type</span>
                  <p className="font-medium text-text-primary">{deal.property.propertyType}</p>
                </div>
                <div>
                  <span className="text-text-muted text-sm">List Price</span>
                  <p className="font-medium text-text-primary">{formatCurrency(deal.property.price)}</p>
                </div>
                <div>
                  <span className="text-text-muted text-sm">Our Offer</span>
                  <p className="font-medium text-text-primary">{formatCurrency(deal.value)}</p>
                </div>
                <div>
                  <span className="text-text-muted text-sm">Strategy</span>
                  <p className="font-medium text-text-primary capitalize">{deal.strategy}</p>
                </div>
                {deal.property.bedrooms && (
                  <div>
                    <span className="text-text-muted text-sm">Bedrooms</span>
                    <p className="font-medium text-text-primary">{deal.property.bedrooms}</p>
                  </div>
                )}
                {deal.property.bathrooms && (
                  <div>
                    <span className="text-text-muted text-sm">Bathrooms</span>
                    <p className="font-medium text-text-primary">{deal.property.bathrooms}</p>
                  </div>
                )}
                {deal.property.sqft && (
                  <div>
                    <span className="text-text-muted text-sm">Square Feet</span>
                    <p className="font-medium text-text-primary">{deal.property.sqft.toLocaleString()}</p>
                  </div>
                )}
                {deal.property.yearBuilt && (
                  <div>
                    <span className="text-text-muted text-sm">Year Built</span>
                    <p className="font-medium text-text-primary">{deal.property.yearBuilt}</p>
                  </div>
                )}
              </div>
              {deal.property.description && (
                <div>
                  <span className="text-text-muted text-sm">Description</span>
                  <p className="text-text-primary">{deal.property.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Deal Info */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Contact & Deal Info</h3>
            <div className="space-y-4">
              {/* Contact Card */}
              <div className="bg-bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-deep-teal rounded-lg flex items-center justify-center text-white font-medium">
                    {deal.contact.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{deal.contact.name}</h4>
                    <p className="text-text-muted text-sm">{deal.contact.company}</p>
                    <p className="text-text-muted text-sm">{deal.contact.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span className="text-text-primary">{deal.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <span className="text-text-primary">{deal.contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Deal Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-text-muted text-sm">Current Stage</span>
                  <p className="font-medium text-text-primary">
                    {PIPELINE_STAGES.find(s => s.id === deal.stage)?.name}
                  </p>
                </div>
                <div>
                  <span className="text-text-muted text-sm">Priority</span>
                  <p className="font-medium text-text-primary capitalize">{deal.priority}</p>
                </div>
                <div>
                  <span className="text-text-muted text-sm">Days in Stage</span>
                  <p className="font-medium text-text-primary">{deal.daysInStage} days</p>
                </div>
                <div>
                  <span className="text-text-muted text-sm">Created</span>
                  <p className="font-medium text-text-primary">{formatDate(deal.created_date)}</p>
                </div>
              </div>

              {/* Notes */}
              {deal.notes && (
                <div>
                  <span className="text-text-muted text-sm">Notes</span>
                  <p className="text-text-primary">{deal.notes}</p>
                </div>
              )}

              {/* Tags */}
              {deal.tags.length > 0 && (
                <div>
                  <span className="text-text-muted text-sm">Tags</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {deal.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-bg-tertiary text-text-primary text-xs rounded border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-6 border-t border-border-color">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ocean-blue to-deep-teal text-white rounded-lg hover:shadow-lg transition-all duration-200">
                <MessageSquare className="w-4 h-4" />
                Message Contact
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors">
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors">
                <Edit3 className="w-4 h-4" />
                Edit Deal
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-warm-orange to-royal-purple text-white rounded-lg hover:shadow-lg transition-all duration-200">
                <CheckCircle className="w-4 h-4" />
                Update Stage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Pipeline Component
function PipelineContent() {
  const { deals, getDealsByStage, moveDeal } = usePipeline()
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [showDealModal, setShowDealModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStage, setFilterStage] = useState<PipelineStage | 'all'>('all')

  const handleStageChange = (dealId: string, newStage: PipelineStage) => {
    moveDeal(dealId, newStage, `Moved to ${PIPELINE_STAGES.find(s => s.id === newStage)?.name} via drag & drop`)
  }

  const handleViewDetails = (deal: Deal) => {
    setSelectedDeal(deal)
    setShowDealModal(true)
  }

  // Calculate total pipeline value
  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const activeDealCount = deals.filter(deal => !['closed_won', 'closed_lost'].includes(deal.stage)).length

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        
        {/* Pipeline Header */}
        <div className="p-8 border-b border-border-color">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-text-muted">
                Manage your deal pipeline from lead to close
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ocean-blue to-royal-purple text-white rounded-lg hover:shadow-lg transition-all duration-200">
                <Plus className="w-4 h-4" />
                Add Deal
              </button>
            </div>
          </div>

          {/* Pipeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-deep-teal rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">{activeDealCount}</p>
                  <p className="text-text-muted text-sm">Active Deals</p>
                </div>
              </div>
            </div>
            <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-warm-orange rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(totalPipelineValue)}
                  </p>
                  <p className="text-text-muted text-sm">Pipeline Value</p>
                </div>
              </div>
            </div>
            <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-royal-purple to-warm-orange rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">
                    {Math.round((deals.filter(d => d.stage === 'closed_won').length / Math.max(deals.length, 1)) * 100)}%
                  </p>
                  <p className="text-text-muted text-sm">Win Rate</p>
                </div>
              </div>
            </div>
            <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-bright-yellow rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">
                    {Math.round(deals.reduce((sum, deal) => sum + deal.daysInStage, 0) / Math.max(deals.length, 1))}
                  </p>
                  <p className="text-text-muted text-sm">Avg Days/Stage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="p-8">
          <div className="flex gap-6 overflow-x-auto pb-4">
            {PIPELINE_STAGES.map(stage => (
              <PipelineStageColumn
                key={stage.id}
                stage={stage}
                deals={getDealsByStage(stage.id)}
                onStageChange={handleStageChange}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Deal Details Modal */}
        <DealDetailsModal
          deal={selectedDeal}
          isOpen={showDealModal}
          onClose={() => {
            setShowDealModal(false)
            setSelectedDeal(null)
          }}
        />
      </div>
    </div>
  )
}

// Main Pipeline Page with Provider
export default function PipelinePage() {
  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <PipelineProvider>
      <PipelineContent />
    </PipelineProvider>
  )
} 