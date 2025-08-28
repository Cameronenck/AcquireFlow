'use client'

import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Heart,
  Send,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Home,
  GraduationCap,
  Car
} from 'lucide-react'
import { useState } from 'react'
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
  roi: number
  cashFlow: number
  status: string
  daysOnMarket: number
  description: string
  neighborhood: string
  schools: string
}

interface PropertyModalProps {
  property: Property
  onClose: () => void
}

function ImageGallery({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative aspect-[16/10] bg-bg-tertiary rounded-lg overflow-hidden">
      <div className="w-full h-full bg-bg-tertiary flex items-center justify-center">
        <span className="text-text-muted">Property Image {currentImage + 1}</span>
      </div>
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-200",
                  index === currentImage ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function FinancialAnalysis({ property }: { property: Property }) {
  const monthlyRent = Math.round(property.cashFlow + (property.price * 0.004)) // Estimated
  const totalMonthlyExpenses = monthlyRent - property.cashFlow
  const capRate = ((monthlyRent * 12) / property.price * 100).toFixed(2)
  const onePercentRule = ((monthlyRent / property.price) * 100).toFixed(2)

  return (
    <div className="bg-bg-tertiary rounded-lg p-4">
      <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        Financial Analysis
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-text-muted">Monthly Rent (Est.)</span>
          <div className="text-lg font-semibold text-text-primary">
            ${monthlyRent.toLocaleString()}
          </div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Cash Flow</span>
          <div className="text-lg font-semibold text-accent-green">
            ${property.cashFlow.toLocaleString()}
          </div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Cap Rate</span>
          <div className="text-lg font-semibold text-text-primary">
            {capRate}%
          </div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">ROI</span>
          <div className="text-lg font-semibold text-accent-green">
            {property.roi}%
          </div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">1% Rule</span>
          <div className="text-lg font-semibold text-text-primary">
            {onePercentRule}%
          </div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Monthly Expenses</span>
          <div className="text-lg font-semibold text-text-primary">
            ${totalMonthlyExpenses.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

function PropertyDetails({ property }: { property: Property }) {
  const pricePerSqft = (property.price / property.sqft).toFixed(0)
  
  return (
    <div className="bg-bg-tertiary rounded-lg p-4">
      <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
        <Home className="w-4 h-4" />
        Property Details
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-text-muted">Property Type</span>
          <div className="text-sm font-medium text-text-primary">{property.propertyType}</div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Condition</span>
          <div className="text-sm font-medium text-text-primary">{property.condition}</div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Year Built</span>
          <div className="text-sm font-medium text-text-primary">{property.yearBuilt}</div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Lot Size</span>
          <div className="text-sm font-medium text-text-primary">{property.lotSize} acres</div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Price per Sq Ft</span>
          <div className="text-sm font-medium text-text-primary">${pricePerSqft}</div>
        </div>
        
        <div>
          <span className="text-sm text-text-muted">Days on Market</span>
          <div className="text-sm font-medium text-text-primary">{property.daysOnMarket} days</div>
        </div>
      </div>
    </div>
  )
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-bg-primary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              {property.address}
            </h2>
            <p className="text-text-muted">
              {property.city}, {property.state} {property.zipCode}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                isLiked ? "bg-accent-red text-white" : "bg-bg-secondary text-text-muted hover:text-accent-red"
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            </button>
            
            <button className="p-2 bg-bg-secondary text-text-muted hover:text-text-primary rounded-lg transition-colors duration-200">
              <Share2 className="w-5 h-5" />
            </button>
            
            <button className="p-2 bg-bg-secondary text-text-muted hover:text-text-primary rounded-lg transition-colors duration-200">
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 bg-bg-secondary text-text-muted hover:text-text-primary rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image Gallery */}
              <ImageGallery images={property.images} />
              
              {/* Description */}
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Description</h4>
                <p className="text-text-secondary leading-relaxed">
                  {property.description}
                </p>
              </div>
              
              {/* Property Details */}
              <PropertyDetails property={property} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Price and Key Metrics */}
              <div className="bg-bg-secondary rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-text-primary">
                    {formatPrice(property.price)}
                  </span>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium border',
                    property.status === 'LOI Sent' && 'bg-accent-green/10 text-accent-green border-accent-green/20',
                    property.status === 'Under Review' && 'bg-accent-orange/10 text-accent-orange border-accent-orange/20',
                    property.status === 'New' && 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
                  )}>
                    {property.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
                      <Bed className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-text-primary">{property.bedrooms}</div>
                    <div className="text-xs text-text-muted">Bedrooms</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
                      <Bath className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-text-primary">{property.bathrooms}</div>
                    <div className="text-xs text-text-muted">Bathrooms</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
                      <Square className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-text-primary">{property.sqft.toLocaleString()}</div>
                    <div className="text-xs text-text-muted">Sq Ft</div>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send LOI
                </button>
              </div>
              
              {/* Financial Analysis */}
              <FinancialAnalysis property={property} />
              
              {/* Location & Schools */}
              <div className="bg-bg-tertiary rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location & Schools
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-text-muted">Neighborhood</span>
                    <div className="text-sm font-medium text-text-primary">{property.neighborhood}</div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-text-muted flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      School District
                    </span>
                    <div className="text-sm font-medium text-text-primary">{property.schools}</div>
                  </div>
                </div>
              </div>
              
              {/* Contact Agent */}
              <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">Interested in this property?</h4>
                <p className="text-sm text-text-muted mb-4">
                  Generate an LOI or contact the listing agent for more information.
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors duration-200 text-sm font-medium">
                    Generate LOI
                  </button>
                  <button className="flex-1 py-2 border border-accent-blue text-accent-blue rounded-lg hover:bg-accent-blue/5 transition-colors duration-200 text-sm font-medium">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 