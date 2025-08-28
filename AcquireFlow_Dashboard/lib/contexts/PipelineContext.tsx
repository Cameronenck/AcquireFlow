'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Deal data structure
export interface Deal {
  id: string
  property: {
    address: string
    city: string
    state: string
    zipCode: string
    price: number
    propertyType: 'Single Family' | 'Multi Family' | 'Commercial' | 'Land' | 'Condo' | 'Townhouse'
    bedrooms?: number
    bathrooms?: number
    sqft?: number
    yearBuilt?: number
    image: string
    description?: string
    arv?: number // After Repair Value
    repairCost?: number
  }
  contact: {
    id: string
    name: string
    email: string
    phone: string
    company?: string
    role?: string
    avatar: string
    responseRate: number
    relationshipScore: number
  }
  stage: PipelineStage
  value: number // Deal value/offer amount
  priority: 'low' | 'medium' | 'high'
  created_date: string
  updated_date: string
  stage_history: Array<{
    stage: PipelineStage
    timestamp: string
    userId: string
    notes?: string
  }>
  messages: Array<{
    id: string
    timestamp: string
    sender: string
    content: string
    type: 'email' | 'sms' | 'call' | 'note'
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
    uploadedAt: string
  }>
  activities: Array<{
    id: string
    type: 'stage_change' | 'message' | 'call' | 'email' | 'document' | 'note' | 'meeting'
    description: string
    timestamp: string
    userId: string
  }>
  next_action?: {
    type: 'call' | 'email' | 'meeting' | 'follow_up'
    description: string
    scheduledFor: string
  }
  notes: string
  tags: string[]
  strategy: 'wholesaling' | 'flipping' | 'rentals' | 'subjectTo' | 'brrrr' | 'commercial'
  daysInStage: number
  lastActivity: string
}

export type PipelineStage = 'lead' | 'qualified' | 'proposal' | 'negotiating' | 'contract' | 'closed_won' | 'closed_lost'

export interface PipelineStageConfig {
  id: PipelineStage
  name: string
  color: string
  description: string
  icon: string
}

// Pipeline stages configuration with vibrant colors
export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: 'lead',
    name: 'Lead',
    color: 'ocean-blue', // #4f8fdf
    description: 'Initial contact made',
    icon: '🎯'
  },
  {
    id: 'qualified',
    name: 'Qualified',
    color: 'deep-teal', // #3b9db0
    description: 'Lead verified and qualified',
    icon: '✅'
  },
  {
    id: 'proposal',
    name: 'Proposal Sent',
    color: 'royal-purple', // #7c6bdf
    description: 'Offer or proposal submitted',
    icon: '📋'
  },
  {
    id: 'negotiating',
    name: 'Negotiating',
    color: 'warm-orange', // #ff8b5a
    description: 'Terms being negotiated',
    icon: '🤝'
  },
  {
    id: 'contract',
    name: 'Under Contract',
    color: 'bright-yellow', // #ffc947
    description: 'Contract signed, pending close',
    icon: '📝'
  },
  {
    id: 'closed_won',
    name: 'Closed Won',
    color: 'brand-green', // #77c57f
    description: 'Deal successfully closed',
    icon: '🎉'
  },
  {
    id: 'closed_lost',
    name: 'Closed Lost',
    color: 'medium-gray', // #64748b
    description: 'Deal was lost',
    icon: '❌'
  }
]

interface PipelineContextType {
  deals: Deal[]
  addDeal: (deal: Omit<Deal, 'id' | 'created_date' | 'updated_date' | 'daysInStage' | 'lastActivity'>) => void
  updateDeal: (dealId: string, updates: Partial<Deal>) => void
  moveDeal: (dealId: string, newStage: PipelineStage, notes?: string) => void
  deleteDeal: (dealId: string) => void
  getDealsByStage: (stage: PipelineStage) => Deal[]
  getDealsByContact: (contactId: string) => Deal[]
  getStageStats: (stage: PipelineStage) => { count: number; totalValue: number }
  searchDeals: (query: string) => Deal[]
  filterDeals: (filters: {
    stage?: PipelineStage
    priority?: Deal['priority']
    strategy?: Deal['strategy']
    dateRange?: { start: string; end: string }
    valueRange?: { min: number; max: number }
  }) => Deal[]
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined)

// Mock deal data
const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    property: {
      address: '1935 Hemlock Rd',
      city: 'Lancaster',
      state: 'PA',
      zipCode: '17601',
      price: 275000,
      propertyType: 'Single Family',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1850,
      yearBuilt: 1995,
      image: '/property-1.jpg',
      description: 'Well-maintained single family home in desirable neighborhood',
      arv: 320000,
      repairCost: 25000
    },
    contact: {
      id: 'contact-1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@kw.com',
      phone: '(717) 555-0123',
      company: 'Keller Williams',
      role: 'Listing Agent',
      avatar: 'SJ',
      responseRate: 85,
      relationshipScore: 8
    },
    stage: 'negotiating',
    value: 260000,
    priority: 'high',
    created_date: '2024-01-15T10:30:00Z',
    updated_date: '2024-01-20T14:15:00Z',
    stage_history: [
      { stage: 'lead', timestamp: '2024-01-15T10:30:00Z', userId: 'user-1' },
      { stage: 'qualified', timestamp: '2024-01-16T09:00:00Z', userId: 'user-1' },
      { stage: 'proposal', timestamp: '2024-01-18T11:30:00Z', userId: 'user-1' },
      { stage: 'negotiating', timestamp: '2024-01-20T14:15:00Z', userId: 'user-1', notes: 'Counter offer received' }
    ],
    messages: [
      {
        id: 'msg-1',
        timestamp: '2024-01-20T14:00:00Z',
        sender: 'Sarah Johnson',
        content: 'Thanks for your offer. The seller would like to discuss terms...',
        type: 'email'
      }
    ],
    documents: [],
    activities: [
      {
        id: 'act-1',
        type: 'stage_change',
        description: 'Moved to Negotiating stage',
        timestamp: '2024-01-20T14:15:00Z',
        userId: 'user-1'
      }
    ],
    next_action: {
      type: 'call',
      description: 'Schedule call to discuss counter offer',
      scheduledFor: '2024-01-22T10:00:00Z'
    },
    notes: 'Seller motivated, property needs minor updates',
    tags: ['motivated-seller', 'minor-repairs'],
    strategy: 'flipping',
    daysInStage: 2,
    lastActivity: '2 hours ago'
  },
  {
    id: 'deal-2',
    property: {
      address: '2847 Pine Street',
      city: 'Denver',
      state: 'CO',
      zipCode: '80205',
      price: 342000,
      propertyType: 'Single Family',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      yearBuilt: 1988,
      image: '/property-2.jpg',
      description: 'Spacious family home with great potential',
      arv: 420000,
      repairCost: 45000
    },
    contact: {
      id: 'contact-2',
      name: 'Michael Chen',
      email: 'mchen@remax.com',
      phone: '(303) 555-0456',
      company: 'RE/MAX Premier',
      role: 'Investment Specialist',
      avatar: 'MC',
      responseRate: 72,
      relationshipScore: 6
    },
    stage: 'proposal',
    value: 315000,
    priority: 'medium',
    created_date: '2024-01-18T08:45:00Z',
    updated_date: '2024-01-19T16:30:00Z',
    stage_history: [
      { stage: 'lead', timestamp: '2024-01-18T08:45:00Z', userId: 'user-1' },
      { stage: 'qualified', timestamp: '2024-01-18T15:20:00Z', userId: 'user-1' },
      { stage: 'proposal', timestamp: '2024-01-19T16:30:00Z', userId: 'user-1' }
    ],
    messages: [
      {
        id: 'msg-2',
        timestamp: '2024-01-19T16:00:00Z',
        sender: 'Michael Chen',
        content: 'I have a client who might be interested. Can we schedule a call this week?',
        type: 'email'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'Property Analysis.pdf',
        type: 'pdf',
        url: '/docs/analysis-1.pdf',
        uploadedAt: '2024-01-19T14:00:00Z'
      }
    ],
    activities: [
      {
        id: 'act-2',
        type: 'document',
        description: 'Property analysis uploaded',
        timestamp: '2024-01-19T14:00:00Z',
        userId: 'user-1'
      }
    ],
    notes: 'Good investment potential, needs updating',
    tags: ['investment-opportunity', 'renovation-needed'],
    strategy: 'brrrr',
    daysInStage: 1,
    lastActivity: '4 hours ago'
  },
  {
    id: 'deal-3',
    property: {
      address: '1456 Oak Avenue',
      city: 'Aurora',
      state: 'CO',
      zipCode: '80012',
      price: 195000,
      propertyType: 'Condo',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      yearBuilt: 2005,
      image: '/property-3.jpg',
      description: 'Modern condo in prime location',
      arv: 240000,
      repairCost: 15000
    },
    contact: {
      id: 'contact-3',
      name: 'Lisa Rodriguez',
      email: 'lrodriguez@coldwell.com',
      phone: '(303) 555-0789',
      company: 'Coldwell Banker',
      role: 'Real Estate Broker',
      avatar: 'LR',
      responseRate: 90,
      relationshipScore: 9
    },
    stage: 'qualified',
    value: 185000,
    priority: 'medium',
    created_date: '2024-01-19T11:20:00Z',
    updated_date: '2024-01-20T09:45:00Z',
    stage_history: [
      { stage: 'lead', timestamp: '2024-01-19T11:20:00Z', userId: 'user-1' },
      { stage: 'qualified', timestamp: '2024-01-20T09:45:00Z', userId: 'user-1' }
    ],
    messages: [],
    documents: [],
    activities: [
      {
        id: 'act-3',
        type: 'stage_change',
        description: 'Qualified as viable lead',
        timestamp: '2024-01-20T09:45:00Z',
        userId: 'user-1'
      }
    ],
    notes: 'Great location, minimal repairs needed',
    tags: ['turn-key', 'good-location'],
    strategy: 'wholesaling',
    daysInStage: 1,
    lastActivity: '6 hours ago'
  },
  {
    id: 'deal-4',
    property: {
      address: '3721 Maple Drive',
      city: 'Westminster',
      state: 'CO',
      zipCode: '80031',
      price: 450000,
      propertyType: 'Multi Family',
      bedrooms: 6,
      bathrooms: 4,
      sqft: 3200,
      yearBuilt: 1992,
      image: '/property-4.jpg',
      description: 'Duplex with excellent rental history',
      arv: 520000,
      repairCost: 35000
    },
    contact: {
      id: 'contact-4',
      name: 'David Wilson',
      email: 'dwilson@exp.com',
      phone: '(303) 555-0321',
      company: 'eXp Realty',
      role: 'Investment Agent',
      avatar: 'DW',
      responseRate: 78,
      relationshipScore: 7
    },
    stage: 'lead',
    value: 425000,
    priority: 'low',
    created_date: '2024-01-20T13:15:00Z',
    updated_date: '2024-01-20T13:15:00Z',
    stage_history: [
      { stage: 'lead', timestamp: '2024-01-20T13:15:00Z', userId: 'user-1' }
    ],
    messages: [],
    documents: [],
    activities: [
      {
        id: 'act-4',
        type: 'stage_change',
        description: 'Added to pipeline as new lead',
        timestamp: '2024-01-20T13:15:00Z',
        userId: 'user-1'
      }
    ],
    notes: 'Duplex with rental income potential',
    tags: ['rental-income', 'duplex'],
    strategy: 'rentals',
    daysInStage: 0,
    lastActivity: '3 hours ago'
  },
  {
    id: 'deal-5',
    property: {
      address: '5678 Cedar Lane',
      city: 'Lakewood',
      state: 'CO',
      zipCode: '80228',
      price: 389000,
      propertyType: 'Single Family',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      yearBuilt: 1985,
      image: '/property-5.jpg',
      description: 'Recently renovated home in quiet neighborhood',
      arv: 450000,
      repairCost: 20000
    },
    contact: {
      id: 'contact-5',
      name: 'Jennifer Adams',
      email: 'jadams@century21.com',
      phone: '(303) 555-0654',
      company: 'Century 21',
      role: 'Realtor',
      avatar: 'JA',
      responseRate: 95,
      relationshipScore: 8
    },
    stage: 'closed_won',
    value: 375000,
    priority: 'high',
    created_date: '2024-01-10T09:00:00Z',
    updated_date: '2024-01-21T15:30:00Z',
    stage_history: [
      { stage: 'lead', timestamp: '2024-01-10T09:00:00Z', userId: 'user-1' },
      { stage: 'qualified', timestamp: '2024-01-11T10:30:00Z', userId: 'user-1' },
      { stage: 'proposal', timestamp: '2024-01-13T14:00:00Z', userId: 'user-1' },
      { stage: 'negotiating', timestamp: '2024-01-15T11:20:00Z', userId: 'user-1' },
      { stage: 'contract', timestamp: '2024-01-18T16:45:00Z', userId: 'user-1' },
      { stage: 'closed_won', timestamp: '2024-01-21T15:30:00Z', userId: 'user-1', notes: 'Successfully closed!' }
    ],
    messages: [],
    documents: [],
    activities: [
      {
        id: 'act-5',
        type: 'stage_change',
        description: 'Deal successfully closed!',
        timestamp: '2024-01-21T15:30:00Z',
        userId: 'user-1'
      }
    ],
    notes: 'Excellent deal, smooth transaction',
    tags: ['successful-close', 'good-profit'],
    strategy: 'flipping',
    daysInStage: 0,
    lastActivity: '1 hour ago'
  }
]

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>(mockDeals)

  // Add new deal
  const addDeal = (newDeal: Omit<Deal, 'id' | 'created_date' | 'updated_date' | 'daysInStage' | 'lastActivity'>) => {
    const deal: Deal = {
      ...newDeal,
      id: `deal-${Date.now()}`,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
      daysInStage: 0,
      lastActivity: 'just now'
    }
    setDeals(prev => [...prev, deal])
  }

  // Update deal
  const updateDeal = (dealId: string, updates: Partial<Deal>) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId 
        ? { ...deal, ...updates, updated_date: new Date().toISOString() }
        : deal
    ))
  }

  // Move deal to new stage
  const moveDeal = (dealId: string, newStage: PipelineStage, notes?: string) => {
    setDeals(prev => prev.map(deal => {
      if (deal.id === dealId) {
        const newStageHistory = [
          ...deal.stage_history,
          {
            stage: newStage,
            timestamp: new Date().toISOString(),
            userId: 'user-1',
            notes
          }
        ]
        
        const newActivity = {
          id: `act-${Date.now()}`,
          type: 'stage_change' as const,
          description: `Moved to ${PIPELINE_STAGES.find(s => s.id === newStage)?.name}`,
          timestamp: new Date().toISOString(),
          userId: 'user-1'
        }

        return {
          ...deal,
          stage: newStage,
          stage_history: newStageHistory,
          activities: [...deal.activities, newActivity],
          updated_date: new Date().toISOString(),
          daysInStage: 0,
          lastActivity: 'just now'
        }
      }
      return deal
    }))
  }

  // Delete deal
  const deleteDeal = (dealId: string) => {
    setDeals(prev => prev.filter(deal => deal.id !== dealId))
  }

  // Get deals by stage
  const getDealsByStage = (stage: PipelineStage) => {
    return deals.filter(deal => deal.stage === stage)
  }

  // Get deals by contact
  const getDealsByContact = (contactId: string) => {
    return deals.filter(deal => deal.contact.id === contactId)
  }

  // Get stage statistics
  const getStageStats = (stage: PipelineStage) => {
    const stageDeals = getDealsByStage(stage)
    return {
      count: stageDeals.length,
      totalValue: stageDeals.reduce((sum, deal) => sum + deal.value, 0)
    }
  }

  // Search deals
  const searchDeals = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return deals.filter(deal => 
      deal.property.address.toLowerCase().includes(lowercaseQuery) ||
      deal.contact.name.toLowerCase().includes(lowercaseQuery) ||
      deal.notes.toLowerCase().includes(lowercaseQuery) ||
      deal.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // Filter deals
  const filterDeals = (filters: {
    stage?: PipelineStage
    priority?: Deal['priority']
    strategy?: Deal['strategy']
    dateRange?: { start: string; end: string }
    valueRange?: { min: number; max: number }
  }) => {
    return deals.filter(deal => {
      if (filters.stage && deal.stage !== filters.stage) return false
      if (filters.priority && deal.priority !== filters.priority) return false
      if (filters.strategy && deal.strategy !== filters.strategy) return false
      if (filters.valueRange) {
        if (deal.value < filters.valueRange.min || deal.value > filters.valueRange.max) return false
      }
      if (filters.dateRange) {
        const dealDate = new Date(deal.created_date)
        const startDate = new Date(filters.dateRange.start)
        const endDate = new Date(filters.dateRange.end)
        if (dealDate < startDate || dealDate > endDate) return false
      }
      return true
    })
  }

  const value = {
    deals,
    addDeal,
    updateDeal,
    moveDeal,
    deleteDeal,
    getDealsByStage,
    getDealsByContact,
    getStageStats,
    searchDeals,
    filterDeals
  }

  return (
    <PipelineContext.Provider value={value}>
      {children}
    </PipelineContext.Provider>
  )
}

export function usePipeline() {
  const context = useContext(PipelineContext)
  if (context === undefined) {
    throw new Error('usePipeline must be used within a PipelineProvider')
  }
  return context
} 