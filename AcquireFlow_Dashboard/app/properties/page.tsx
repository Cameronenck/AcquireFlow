'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  Sliders,
  Heart,
  Save,
  Send,
  FileText,
  ChevronDown,
  X,
  Zap,
  Filter
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
// import PropertyCard from '@/components/properties/PropertyCard'
// import OfferGenerationModal from '@/components/properties/OfferGenerationModal'
// import AdvancedFiltersPanel from '@/components/properties/AdvancedFiltersPanel'
import { cn } from '@/lib/utils'
import { initializeTheme } from '@/lib/utils'
import { usePipeline, PIPELINE_STAGES, Deal } from '@/lib/contexts/PipelineContext'

// Investment strategies with counts
const strategies = [
  { id: 'wholesaling', name: 'Wholesaling', emoji: '🔥', count: 127 },
  { id: 'flipping', name: 'Flipping', emoji: '🏠', count: 89 },
  { id: 'rentals', name: 'Rentals', emoji: '🏢', count: 234 },
  { id: 'subjectTo', name: 'Subject To', emoji: '📋', count: 45 },
  { id: 'brrrr', name: 'BRRRR', emoji: '🔄', count: 67 },
  { id: 'sellerFinance', name: 'Seller Finance', emoji: '💰', count: 32 }
]

// Enhanced sample property data
const sampleProperties = [
  {
    id: '1',
    address: '1935 Hemlock Rd',
    city: 'Lancaster',
    state: 'PA',
    zipCode: '17603',
    price: 275000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    lotSize: 0.25,
    yearBuilt: 1995,
    propertyType: 'Single Family',
    condition: 'Light Rehab',
    images: ['/api/placeholder/400/300'],
    aiScore: 85,
    motivation: 'High',
    competition: 'Low',
    dealProbability: 92,
    strategyMetrics: {
      wholesaling: { assignmentFee: 8500, marketTime: 45, competition: 'Low' },
      flipping: { rehabCost: 35000, arv: 340000, profit: 30000, timeline: 120 },
      rentals: { cashFlow: 485, capRate: 8.2, rentEstimate: 1850, expenses: 1365 },
      subjectTo: { equityPosition: 45, paymentHistory: 'Good', motivation: 'High' },
      brrrr: { rehabPotential: 40000, refinanceEstimate: 280000, rentalProjection: 1750 },
      sellerFinance: { ownerMotivation: 'High', financingTerms: 'Flexible' }
    },
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    address: '2847 Oak Street',
    city: 'York',
    state: 'PA',
    zipCode: '17404',
    price: 185000,
    bedrooms: 4,
    bathrooms: 2,
    sqft: 1680,
    lotSize: 0.18,
    yearBuilt: 1987,
    propertyType: 'Single Family',
    condition: 'Heavy Rehab',
    images: ['/api/placeholder/400/300'],
    aiScore: 92,
    motivation: 'Very High',
    competition: 'Medium',
    dealProbability: 89,
    strategyMetrics: {
      wholesaling: { assignmentFee: 12000, marketTime: 30, competition: 'Medium' },
      flipping: { rehabCost: 55000, arv: 285000, profit: 45000, timeline: 150 },
      rentals: { cashFlow: 320, capRate: 9.1, rentEstimate: 1450, expenses: 1130 },
      subjectTo: { equityPosition: 51, paymentHistory: 'Fair', motivation: 'Very High' },
      brrrr: { rehabPotential: 50000, refinanceEstimate: 230000, rentalProjection: 1400 },
      sellerFinance: { ownerMotivation: 'Very High', financingTerms: 'Very Flexible' }
    },
    lastUpdated: '4 hours ago'
  },
  {
    id: '3',
    address: '4521 Pine Avenue',
    city: 'Harrisburg',
    state: 'PA',
    zipCode: '17109',
    price: 320000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1750,
    lotSize: 0.32,
    yearBuilt: 2005,
    propertyType: 'Single Family',
    condition: 'Move-in Ready',
    images: ['/api/placeholder/400/300'],
    aiScore: 76,
    motivation: 'Medium',
    competition: 'High',
    dealProbability: 65,
    strategyMetrics: {
      wholesaling: { assignmentFee: 6500, marketTime: 60, competition: 'High' },
      flipping: { rehabCost: 15000, arv: 365000, profit: 30000, timeline: 90 },
      rentals: { cashFlow: 625, capRate: 7.8, rentEstimate: 2100, expenses: 1475 },
      subjectTo: { equityPosition: 56, paymentHistory: 'Excellent', motivation: 'Medium' },
      brrrr: { rehabPotential: 20000, refinanceEstimate: 325000, rentalProjection: 2000 },
      sellerFinance: { ownerMotivation: 'Medium', financingTerms: 'Standard' }
    },
    lastUpdated: '1 day ago'
  },
  {
    id: '4',
    address: '892 Walnut Street',
    city: 'Lancaster',
    state: 'PA',
    zipCode: '17602',
    price: 210000,
    bedrooms: 3,
    bathrooms: 1.5,
    sqft: 1320,
    lotSize: 0.15,
    yearBuilt: 1978,
    propertyType: 'Single Family',
    condition: 'Cosmetic Work',
    images: ['/api/placeholder/400/300'],
    aiScore: 88,
    motivation: 'High',
    competition: 'Low',
    dealProbability: 84,
    strategyMetrics: {
      wholesaling: { assignmentFee: 9500, marketTime: 35, competition: 'Low' },
      flipping: { rehabCost: 25000, arv: 270000, profit: 35000, timeline: 90 },
      rentals: { cashFlow: 380, capRate: 8.8, rentEstimate: 1650, expenses: 1270 },
      subjectTo: { equityPosition: 48, paymentHistory: 'Good', motivation: 'High' },
      brrrr: { rehabPotential: 30000, refinanceEstimate: 250000, rentalProjection: 1600 },
      sellerFinance: { ownerMotivation: 'High', financingTerms: 'Flexible' }
    },
    lastUpdated: '6 hours ago'
  },
  {
    id: '5',
    address: '1547 Cherry Lane',
    city: 'York',
    state: 'PA',
    zipCode: '17403',
    price: 165000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 980,
    lotSize: 0.12,
    yearBuilt: 1965,
    propertyType: 'Single Family',
    condition: 'Heavy Rehab',
    images: ['/api/placeholder/400/300'],
    aiScore: 79,
    motivation: 'Very High',
    competition: 'Medium',
    dealProbability: 71,
    strategyMetrics: {
      wholesaling: { assignmentFee: 7500, marketTime: 25, competition: 'Medium' },
      flipping: { rehabCost: 45000, arv: 225000, profit: 15000, timeline: 180 },
      rentals: { cashFlow: 250, capRate: 7.5, rentEstimate: 1200, expenses: 950 },
      subjectTo: { equityPosition: 42, paymentHistory: 'Fair', motivation: 'Very High' },
      brrrr: { rehabPotential: 40000, refinanceEstimate: 200000, rentalProjection: 1150 },
      sellerFinance: { ownerMotivation: 'Very High', financingTerms: 'Very Flexible' }
    },
    lastUpdated: '12 hours ago'
  },
  {
    id: '6',
    address: '3298 Elm Street',
    city: 'Harrisburg',
    state: 'PA',
    zipCode: '17110',
    price: 425000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    lotSize: 0.28,
    yearBuilt: 2010,
    propertyType: 'Single Family',
    condition: 'Move-in Ready',
    images: ['/api/placeholder/400/300'],
    aiScore: 82,
    motivation: 'Medium',
    competition: 'High',
    dealProbability: 58,
    strategyMetrics: {
      wholesaling: { assignmentFee: 8000, marketTime: 75, competition: 'High' },
      flipping: { rehabCost: 20000, arv: 475000, profit: 30000, timeline: 75 },
      rentals: { cashFlow: 780, capRate: 7.2, rentEstimate: 2400, expenses: 1620 },
      subjectTo: { equityPosition: 62, paymentHistory: 'Excellent', motivation: 'Medium' },
      brrrr: { rehabPotential: 25000, refinanceEstimate: 400000, rentalProjection: 2250 },
      sellerFinance: { ownerMotivation: 'Medium', financingTerms: 'Standard' }
    },
    lastUpdated: '8 hours ago'
  }
]

export default function PropertiesPage() {
  const [selectedStrategy, setSelectedStrategy] = useState('wholesaling')
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [sortBy, setSortBy] = useState('ai-score')
  const [priceRange, setPriceRange] = useState([25000, 500000])
  const [targetROI, setTargetROI] = useState(15)
  const [showAddToPipelineModal, setShowAddToPipelineModal] = useState(false)
  const [selectedPropertyForPipeline, setSelectedPropertyForPipeline] = useState<any>(null)
  
  // Pipeline integration
  const { addDeal } = usePipeline()
  
  // Handle adding property to pipeline
  const handleAddToPipeline = (property: any) => {
    setSelectedPropertyForPipeline(property)
    setShowAddToPipelineModal(true)
  }
  
  // Add deal to pipeline
  const addPropertyToPipeline = (contactInfo: any) => {
    if (!selectedPropertyForPipeline) return
    
    const newDeal: Omit<Deal, 'id' | 'created_date' | 'updated_date' | 'daysInStage' | 'lastActivity'> = {
      property: {
        address: selectedPropertyForPipeline.address,
        city: selectedPropertyForPipeline.city,
        state: selectedPropertyForPipeline.state,
        zipCode: selectedPropertyForPipeline.zipCode,
        price: selectedPropertyForPipeline.price,
        propertyType: selectedPropertyForPipeline.propertyType,
        bedrooms: selectedPropertyForPipeline.bedrooms,
        bathrooms: selectedPropertyForPipeline.bathrooms,
        sqft: selectedPropertyForPipeline.sqft,
        yearBuilt: selectedPropertyForPipeline.yearBuilt,
        image: selectedPropertyForPipeline.photos?.[0] || '/property-placeholder.jpg',
        description: selectedPropertyForPipeline.description,
        arv: selectedPropertyForPipeline.arv,
        repairCost: selectedPropertyForPipeline.rehab
      },
      contact: {
        id: `contact-${Date.now()}`,
        name: contactInfo.name || 'New Contact',
        email: contactInfo.email || '',
        phone: contactInfo.phone || '',
        company: contactInfo.company || '',
        role: contactInfo.role || 'Property Owner',
        avatar: contactInfo.name ? contactInfo.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'NC',
        responseRate: 0,
        relationshipScore: 5
      },
      stage: 'lead',
      value: Math.round(selectedPropertyForPipeline.price * 0.85), // 85% of listing price
      priority: selectedPropertyForPipeline.aiScore >= 90 ? 'high' : selectedPropertyForPipeline.aiScore >= 80 ? 'medium' : 'low',
      stage_history: [{
        stage: 'lead',
        timestamp: new Date().toISOString(),
        userId: 'user-1',
        notes: 'Added from Deal Finder'
      }],
      messages: [],
      documents: [],
      activities: [{
        id: `act-${Date.now()}`,
        type: 'stage_change',
        description: 'Property added to pipeline from Deal Finder',
        timestamp: new Date().toISOString(),
        userId: 'user-1'
      }],
      notes: `Property discovered via Deal Finder. Strategy: ${selectedStrategy}. AI Score: ${selectedPropertyForPipeline.aiScore}/100`,
      tags: ['deal-finder', selectedStrategy, `score-${selectedPropertyForPipeline.aiScore}`],
      strategy: selectedStrategy as Deal['strategy']
    }
    
    addDeal(newDeal)
    setShowAddToPipelineModal(false)
    setSelectedPropertyForPipeline(null)
  }

  const totalProperties = 2347
  const matchingProperties = 89
  const aiRecommended = 12

  const handlePropertySelect = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleBulkSelect = () => {
    if (selectedProperties.length === sampleProperties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(sampleProperties.map(p => p.id))
    }
  }

  const handleGenerateOffers = () => {
    if (selectedProperties.length > 0) {
      setShowOfferModal(true)
    }
  }

  useEffect(() => {
    initializeTheme()
  }, [])

  // Vibrant Strategy Color Mapping
  const strategyColors = {
    'wholesaling': { bg: 'bg-warm-orange', text: 'text-warm-orange', gradient: 'from-warm-orange to-bright-yellow' },
    'flipping': { bg: 'bg-ocean-blue', text: 'text-ocean-blue', gradient: 'from-ocean-blue to-deep-teal' },
    'rentals': { bg: 'bg-brand-green', text: 'text-brand-green', gradient: 'from-brand-green to-deep-teal' },
    'subjectTo': { bg: 'bg-royal-purple', text: 'text-royal-purple', gradient: 'from-royal-purple to-warm-orange' },
    'brrrr': { bg: 'bg-deep-teal', text: 'text-deep-teal', gradient: 'from-deep-teal to-brand-green' },
    'sellerFinance': { bg: 'bg-bright-yellow', text: 'text-dark-slate', gradient: 'from-bright-yellow to-warm-orange' }
  }

  // Price Range Color Coding
  const getPriceRangeColor = (price: number) => {
    if (price < 200000) return { color: 'text-brand-green', bg: 'bg-brand-green/10', label: 'Great Deal' }
    if (price < 350000) return { color: 'text-ocean-blue', bg: 'bg-ocean-blue/10', label: 'Market Price' }
    return { color: 'text-warm-orange', bg: 'bg-warm-orange/10', label: 'Premium' }
  }

  // AI Score Color Coding
  const getAIScoreColor = (score: number) => {
    if (score >= 90) return 'bg-brand-green'
    if (score >= 80) return 'bg-ocean-blue' 
    if (score >= 70) return 'bg-warm-orange'
    return 'bg-royal-purple'
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        
        {/* Properties Content */}
        <div className="border-b border-border-color bg-bg-primary">
          {/* Main Header */}
          <div className="px-8 py-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-text-muted">
                <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                <span>Live property data</span>
              </div>
            </div>

            {/* Search Bar with Vibrant Button */}
            <div className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Enter city, state, or ZIP code..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-12 pr-24 py-4 bg-bg-secondary border border-border-color rounded-xl text-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-ocean-blue text-white rounded-lg text-sm font-medium hover:bg-ocean-blue/90 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Vibrant Status Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-text-primary font-medium">
                  Found <span className="text-ocean-blue font-bold">{totalProperties.toLocaleString()}</span> properties
                </span>
                <span className="text-text-secondary">
                  <span className="text-brand-green font-bold">{matchingProperties}</span> match criteria
                </span>
                <span className="text-text-secondary">
                  <span className="text-royal-purple font-bold">{aiRecommended}</span> AI recommended
                </span>
              </div>

              {selectedProperties.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted">
                    {selectedProperties.length} selected
                  </span>
                  <button
                    onClick={handleGenerateOffers}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-warm-orange to-royal-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium"
                  >
                    <Zap className="w-4 h-4" />
                    Generate Offers for {selectedProperties.length}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Vibrant Strategy Tabs */}
          <div className="px-8 pb-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              {strategies.map((strategy) => {
                const strategyColor = strategyColors[strategy.id as keyof typeof strategyColors]
                const isActive = selectedStrategy === strategy.id
                
                return (
                  <button
                    key={strategy.id}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                      isActive
                        ? `bg-gradient-to-r ${strategyColor.gradient} text-white shadow-lg`
                        : `bg-bg-secondary ${strategyColor.text} hover:${strategyColor.bg}/10 hover:bg-bg-tertiary border border-transparent hover:border-current/20`
                    )}
                  >
                    <span className="text-base">{strategy.emoji}</span>
                    <span>{strategy.name}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs",
                      isActive ? "bg-black/20" : "bg-current/10"
                    )}>
                      {strategy.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Property Grid with Vibrant Cards */}
        <div className="p-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-text-primary">
                {matchingProperties} properties match your criteria
              </h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              >
                <option value="ai-score">Best Deals</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="roi">ROI</option>
              </select>
            </div>

            <button
              onClick={handleBulkSelect}
              className="px-4 py-2 text-sm text-ocean-blue hover:bg-ocean-blue/10 rounded-lg transition-colors"
            >
              {selectedProperties.length === sampleProperties.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {/* Vibrant Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.map((property) => {
              const priceRange = getPriceRangeColor(property.price)
              const aiScoreColor = getAIScoreColor(property.aiScore)
              
              return (
                <div key={property.id} className="bg-bg-secondary rounded-lg border border-border-color hover:shadow-lg hover:border-ocean-blue/30 transition-all duration-300 overflow-hidden group">
                  {/* Vibrant Property Image Header */}
                  <div className="relative h-48 bg-gradient-to-br from-ocean-blue/20 to-royal-purple/20">
                    {/* Colorful AI Score Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`${aiScoreColor} text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg`}>
                        {property.aiScore}/100
                      </span>
                    </div>
                    
                    {/* Enhanced Heart Button */}
                    <div className="absolute top-3 right-3">
                      <button 
                        onClick={() => handlePropertySelect(property.id)}
                        className={cn(
                          "p-2 rounded-full transition-all duration-200 shadow-lg",
                          selectedProperties.includes(property.id) 
                            ? 'bg-warm-orange text-white scale-110' 
                            : 'bg-white/90 hover:bg-white text-text-muted hover:text-warm-orange hover:scale-105'
                        )}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Property Type with Color */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 text-text-primary px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                        {property.propertyType}
                      </span>
                    </div>
                    
                    {/* Price Range Indicator */}
                    <div className="absolute bottom-3 right-3">
                      <span className={`${priceRange.bg} ${priceRange.color} px-2 py-1 rounded text-xs font-medium backdrop-blur-sm`}>
                        {priceRange.label}
                      </span>
                    </div>
                  </div>

                  {/* Vibrant Property Details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-text-primary text-lg group-hover:text-ocean-blue transition-colors">{property.address}</h3>
                      <span className={`text-xl font-bold ${priceRange.color}`}>${property.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-text-muted mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.city}, {property.state}</span>
                    </div>

                    {/* Colorful Property Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 rounded-lg bg-brand-green/5 border border-brand-green/20">
                        <p className="text-sm font-medium text-brand-green">{property.strategyMetrics.rentals.capRate}%</p>
                        <p className="text-xs text-text-muted">Cap Rate</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-ocean-blue/5 border border-ocean-blue/20">
                        <p className="text-sm font-medium text-ocean-blue">${property.strategyMetrics.rentals.cashFlow}</p>
                        <p className="text-xs text-text-muted">Cash Flow</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-royal-purple/5 border border-royal-purple/20">
                        <p className="text-sm font-medium text-royal-purple">{property.sqft}</p>
                        <p className="text-xs text-text-muted">Sq Ft</p>
                      </div>
                    </div>

                    {/* Vibrant Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAddToPipeline(property)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ocean-blue to-deep-teal text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <FileText className="w-4 h-4" />
                        Add to Pipeline
                      </button>
                      <button 
                        onClick={() => handleGenerateOffers()}
                        className="p-2 border border-warm-orange/30 bg-warm-orange/5 text-warm-orange rounded-lg hover:bg-warm-orange hover:text-white transition-all duration-200"
                        title="Generate Offer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 border border-deep-teal/30 bg-deep-teal/5 text-deep-teal rounded-lg hover:bg-deep-teal hover:text-white transition-all duration-200"
                        title="Save Property"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Vibrant Modals */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-bg-primary rounded-lg p-6 max-w-md w-full mx-4 border border-border-color">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Generate Offer</h3>
            <p className="text-text-muted mb-4">Offer generation feature coming soon!</p>
            <button 
              onClick={() => setShowOfferModal(false)}
              className="w-full bg-ocean-blue text-white py-2 rounded-lg hover:bg-ocean-blue/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-bg-primary rounded-lg p-6 max-w-md w-full mx-4 border border-border-color">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Advanced Filters</h3>
            <p className="text-text-muted mb-4">Advanced filtering feature coming soon!</p>
            <button 
              onClick={() => setShowAdvancedFilters(false)}
              className="w-full bg-ocean-blue text-white py-2 rounded-lg hover:bg-ocean-blue/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add to Pipeline Modal */}
      {showAddToPipelineModal && selectedPropertyForPipeline && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-primary rounded-lg border border-border-color max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-border-color">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">Add to Pipeline</h3>
                  <p className="text-text-muted text-sm mt-1">Create a new deal for this property</p>
                </div>
                <button
                  onClick={() => setShowAddToPipelineModal(false)}
                  className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
            </div>

            {/* Property Preview */}
            <div className="p-6 border-b border-border-color bg-bg-secondary/50">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-ocean-blue/20 to-royal-purple/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">{selectedPropertyForPipeline.address}</h4>
                  <p className="text-text-muted text-sm">{selectedPropertyForPipeline.city}, {selectedPropertyForPipeline.state}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-bold text-ocean-blue">${selectedPropertyForPipeline.price.toLocaleString()}</span>
                    <span className="text-sm text-text-muted">Strategy: {selectedStrategy}</span>
                    <span className={`${getAIScoreColor(selectedPropertyForPipeline.aiScore)} text-white px-2 py-1 rounded text-xs`}>
                      {selectedPropertyForPipeline.aiScore}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Form */}
            <div className="p-6">
              <h4 className="font-semibold text-text-primary mb-4">Contact Information</h4>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const contactInfo = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  company: formData.get('company'),
                  role: formData.get('role')
                }
                addPropertyToPipeline(contactInfo)
              }}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Contact Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Enter contact name"
                      className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="contact@email.com"
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Company</label>
                      <input
                        name="company"
                        type="text"
                        placeholder="Real Estate Company"
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Role</label>
                      <select
                        name="role"
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                      >
                        <option value="Property Owner">Property Owner</option>
                        <option value="Listing Agent">Listing Agent</option>
                        <option value="Investor">Investor</option>
                        <option value="Property Manager">Property Manager</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Deal Preview */}
                <div className="mt-6 p-4 bg-bg-secondary rounded-lg border border-border-color">
                  <h5 className="font-medium text-text-primary mb-3">Deal Preview</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-muted">Initial Stage:</span>
                      <p className="font-medium text-ocean-blue">Lead</p>
                    </div>
                    <div>
                      <span className="text-text-muted">Estimated Offer:</span>
                      <p className="font-medium text-brand-green">${Math.round(selectedPropertyForPipeline.price * 0.85).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-text-muted">Strategy:</span>
                      <p className="font-medium text-text-primary capitalize">{selectedStrategy}</p>
                    </div>
                    <div>
                      <span className="text-text-muted">Priority:</span>
                      <p className={`font-medium ${selectedPropertyForPipeline.aiScore >= 90 ? 'text-warm-orange' : selectedPropertyForPipeline.aiScore >= 80 ? 'text-bright-yellow' : 'text-medium-gray'}`}>
                        {selectedPropertyForPipeline.aiScore >= 90 ? 'High' : selectedPropertyForPipeline.aiScore >= 80 ? 'Medium' : 'Low'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddToPipelineModal(false)}
                    className="flex-1 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ocean-blue to-royal-purple text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <FileText className="w-4 h-4" />
                    Add to Pipeline
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 