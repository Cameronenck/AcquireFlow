'use client'

import { Home, Building, Building2, MoreHorizontal, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Property {
  id: string
  icon: 'home' | 'building' | 'building2'
  address: string
  price: string
  status: 'LOI Sent' | 'Under Review' | 'New' | 'Analysis Complete' | 'Negotiating'
  roi: string
  lastUpdated: string
}

const properties: Property[] = [
  {
    id: '1',
    icon: 'home',
    address: '1935 Hemlock Rd, Lancaster PA',
    price: '$275,000',
    status: 'LOI Sent',
    roi: '14.2%',
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    icon: 'building',
    address: '664 Poplar St, Lancaster PA',
    price: '$189,500',
    status: 'Under Review',
    roi: '16.8%',
    lastUpdated: '1 day ago'
  },
  {
    id: '3',
    icon: 'building2',
    address: '531 Lafayette St, Lancaster PA',
    price: '$312,900',
    status: 'New',
    roi: '12.4%',
    lastUpdated: '3 hours ago'
  },
  {
    id: '4',
    icon: 'home',
    address: '892 Oak Avenue, York PA',
    price: '$245,000',
    status: 'Analysis Complete',
    roi: '18.9%',
    lastUpdated: '5 days ago'
  },
  {
    id: '5',
    icon: 'building',
    address: '156 Market Street, Harrisburg PA',
    price: '$425,000',
    status: 'Negotiating',
    roi: '22.1%',
    lastUpdated: '1 week ago'
  }
]

function StatusBadge({ status }: { status: Property['status'] }) {
  const styles = {
    'LOI Sent': 'bg-accent-green/15 text-accent-green border-accent-green/30',
    'Under Review': 'bg-accent-orange/15 text-accent-orange border-accent-orange/30',
            'New': 'bg-accent-purple/15 text-accent-purple border-accent-purple/30',
    'Analysis Complete': 'bg-accent-green/15 text-accent-green border-accent-green/30',
    'Negotiating': 'bg-accent-orange/15 text-accent-orange border-accent-orange/30'
  }

  return (
    <span className={cn(
      'px-3 py-1.5 rounded-full text-xs font-semibold border',
      styles[status]
    )}>
      {status}
    </span>
  )
}

function PropertyIcon({ type }: { type: Property['icon'] }) {
  const IconComponent = {
    home: Home,
    building: Building,
    building2: Building2
  }[type]

  const gradients = {
    home: 'from-accent-blue to-accent-cyan',
    building: 'from-accent-green to-accent-blue',
    building2: 'from-accent-purple to-accent-orange'
  }

  return (
    <div className={cn(
      'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg transition-all duration-200 group-hover:scale-105',
      gradients[type]
    )}>
      <IconComponent className="w-6 h-6 text-white" />
    </div>
  )
}

export default function PropertiesTable() {
  // Vibrant icon gradient mappings
  const iconGradients = {
    home: 'from-ocean-blue to-deep-teal',
    building: 'from-brand-green to-ocean-blue',
    building2: 'from-royal-purple to-warm-orange'
  }

  // Vibrant status badge colors
  const statusColors = {
    'LOI Sent': 'bg-brand-green/15 text-brand-green border-brand-green/30',
    'Under Review': 'bg-warm-orange/15 text-warm-orange border-warm-orange/30',
    'New': 'bg-royal-purple/15 text-royal-purple border-royal-purple/30',
    'Analysis Complete': 'bg-deep-teal/15 text-deep-teal border-deep-teal/30',
    'Negotiating': 'bg-bright-yellow/15 text-dark-slate border-bright-yellow/30',
  }

  const properties = [
    {
      address: '1935 Hemlock Rd, Lancaster PA',
      price: '$275,000',
      status: 'LOI Sent',
      roi: '14.2%',
      lastUpdated: '2 days ago',
      icon: 'home',
      priceRange: 'good' // good = green, market = blue, premium = orange
    },
    {
      address: '664 Poplar St, Lancaster PA', 
      price: '$189,500',
      status: 'Under Review',
      roi: '16.8%',
      lastUpdated: '1 day ago',
      icon: 'building',
      priceRange: 'good'
    },
    {
      address: '531 Lafayette St, Lancaster PA',
      price: '$312,900', 
      status: 'New',
      roi: '12.4%',
      lastUpdated: '3 hours ago',
      icon: 'building2',
      priceRange: 'market'
    },
    {
      address: '892 Oak Avenue, York PA',
      price: '$245,000',
      status: 'Analysis Complete',
      roi: '18.9%',
      lastUpdated: '5 days ago', 
      icon: 'home',
      priceRange: 'good'
    },
    {
      address: '156 Market Street, Harrisburg PA',
      price: '$425,000',
      status: 'Negotiating',
      roi: '22.1%',
      lastUpdated: '1 week ago',
      icon: 'building',
      priceRange: 'premium'
    }
  ]

  // Price range color coding
  const getPriceColor = (range: string) => {
    switch(range) {
      case 'good': return 'text-brand-green font-bold'
      case 'market': return 'text-ocean-blue font-semibold' 
      case 'premium': return 'text-warm-orange font-semibold'
      default: return 'text-text-primary'
    }
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-bg-secondary rounded-2xl border border-border-color overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border-color bg-gradient-to-r from-bg-secondary to-bg-tertiary/30">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-ocean-blue" />
            <h3 className="text-xl font-bold text-text-primary">Recent Properties</h3>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-ocean-blue to-deep-teal text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm font-semibold">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-tertiary/50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Property</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-text-muted">Price</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Status</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-text-muted">ROI</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Last Updated</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index} className="border-b border-border-color last:border-b-0 hover:bg-bg-tertiary/50 transition-all duration-200 cursor-pointer group bg-bg-secondary">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg transition-all duration-200 group-hover:scale-105 ${iconGradients[property.icon as keyof typeof iconGradients]}`}>
                        {property.icon === 'home' && <Home className="w-6 h-6 text-white" />}
                        {property.icon === 'building' && <Building className="w-6 h-6 text-white" />}
                        {property.icon === 'building2' && <Building2 className="w-6 h-6 text-white" />}
                      </div>
                      <span className="font-medium text-text-primary group-hover:text-ocean-blue transition-colors duration-200">
                        {property.address}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={getPriceColor(property.priceRange)}>
                      {property.price}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColors[property.status as keyof typeof statusColors]}`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-semibold text-brand-green">{property.roi}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-text-muted">{property.lastUpdated}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors duration-200">
                      <MoreHorizontal className="w-4 h-4 text-text-muted" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 