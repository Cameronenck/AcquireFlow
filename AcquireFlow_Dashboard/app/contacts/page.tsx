'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Star, 
  Mail, 
  Phone, 
  Calendar,
  Building,
  MapPin,
  Edit3,
  Trash2,
  Eye,
  MessageSquare,
  UserCheck,
  TrendingUp,
  Target,
  Zap,
  Upload,
  Download,
  Users,
  Activity,
  Clock,
  CheckCircle,
  DollarSign,
  Tag
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { initializeTheme } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { usePipeline, PIPELINE_STAGES, PipelineStage } from '@/lib/contexts/PipelineContext'

// Mock data
const contactStats = {
  total: 342,
  active: 28,
  recentInteractions: 156,
  monthlyGrowth: 12.3,
  averageResponse: 4.2,
  conversionRate: 23.7
}

const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    company: 'Coldwell Banker',
    email: 'sarah.johnson@coldwell.com',
    phone: '(555) 123-4567',
    location: 'Denver, CO',
    avatar: 'SJ',
    status: 'active',
    dealValue: 2400000,
    lastContact: '2024-01-25',
    source: 'referral',
    tags: ['VIP', 'High Volume', 'Cash Deals'],
    properties: 12,
    deals: 8,
    notes: 'Specializes in luxury properties. Great track record with cash deals.',
    socialProfiles: {
      linkedin: 'sarah-johnson-realtor',
      facebook: 'sarah.johnson.realtor'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Real Estate Broker',
    company: 'RE/MAX Premier',
    email: 'mchen@remax.com',
    phone: '(555) 234-5678',
    location: 'Aurora, CO',
    avatar: 'MC',
    status: 'prospect',
    dealValue: 850000,
    lastContact: '2024-01-23',
    source: 'cold_outreach',
    tags: ['New Contact', 'Investment Focus'],
    properties: 5,
    deals: 2,
    notes: 'Recently started focusing on investment properties. Potential for partnership.',
    socialProfiles: {
      linkedin: 'michael-chen-broker'
    }
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    title: 'Investment Specialist',
    company: 'Keller Williams',
    email: 'lrodriguez@kw.com',
    phone: '(555) 345-6789',
    location: 'Lakewood, CO',
    avatar: 'LR',
    status: 'active',
    dealValue: 1600000,
    lastContact: '2024-01-20',
    source: 'networking',
    tags: ['Investment Expert', 'Wholesaler Network'],
    properties: 18,
    deals: 15,
    notes: 'Excellent source for off-market deals. Strong wholesaler connections.',
    socialProfiles: {
      linkedin: 'lisa-rodriguez-investments',
      instagram: 'lisa_invests_co'
    }
  },
  {
    id: 4,
    name: 'David Park',
    title: 'Real Estate Agent',
    company: 'eXp Realty',
    email: 'david.park@exprealty.com',
    phone: '(555) 456-7890',
    location: 'Westminster, CO',
    avatar: 'DP',
    status: 'inactive',
    dealValue: 320000,
    lastContact: '2024-01-10',
    source: 'meetup',
    tags: ['First-time Buyer Focus'],
    properties: 3,
    deals: 1,
    notes: 'Primarily works with first-time buyers. Limited investment experience.',
    socialProfiles: {
      linkedin: 'david-park-realtor'
    }
  }
]

const recentActivities = [
  {
    id: 1,
    contactName: 'Sarah Johnson',
    type: 'meeting',
    description: 'Coffee meeting to discuss Q1 property targets',
    date: '2024-01-25',
    time: '10:00 AM'
  },
  {
    id: 2,
    contactName: 'Michael Chen',
    type: 'email',
    description: 'Sent LOI template and investment criteria',
    date: '2024-01-23',
    time: '2:30 PM'
  },
  {
    id: 3,
    contactName: 'Lisa Rodriguez',
    type: 'call',
    description: 'Discussed upcoming wholesale opportunities',
    date: '2024-01-22',
    time: '4:15 PM'
  },
  {
    id: 4,
    contactName: 'Sarah Johnson',
    type: 'deal',
    description: 'Closed on 1234 Maple Street property',
    date: '2024-01-20',
    time: '11:00 AM'
  }
]

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState('contacts')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  
  // Pipeline integration
  const { deals, getDealsByContact } = usePipeline()
  
  // Get active deals for a contact
  const getContactActiveDeals = (contactName: string) => {
    return deals.filter(deal => 
      deal.contact.name === contactName && 
      !['closed_won', 'closed_lost'].includes(deal.stage)
    )
  }
  
  // Get total deal value for a contact
  const getContactDealValue = (contactName: string) => {
    const contactDeals = deals.filter(deal => deal.contact.name === contactName)
    return contactDeals.reduce((sum, deal) => sum + deal.value, 0)
  }
  
  // Get pipeline stage color
  const getPipelineStageColor = (stage: PipelineStage) => {
    switch (stage) {
      case 'lead': return 'bg-ocean-blue/10 text-ocean-blue border-ocean-blue/30'
      case 'qualified': return 'bg-deep-teal/10 text-deep-teal border-deep-teal/30'
      case 'proposal': return 'bg-royal-purple/10 text-royal-purple border-royal-purple/30'
      case 'negotiating': return 'bg-warm-orange/10 text-warm-orange border-warm-orange/30'
      case 'contract': return 'bg-bright-yellow/10 text-dark-slate border-bright-yellow/30'
      case 'closed_won': return 'bg-brand-green/10 text-brand-green border-brand-green/30'
      case 'closed_lost': return 'bg-medium-gray/10 text-medium-gray border-medium-gray/30'
      default: return 'bg-medium-gray/10 text-medium-gray border-medium-gray/30'
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === 'all' || contact.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-brand-green/15 text-brand-green border border-brand-green/30'
      case 'prospect': return 'bg-ocean-blue/15 text-ocean-blue border border-ocean-blue/30'
      case 'warm': return 'bg-warm-orange/15 text-warm-orange border border-warm-orange/30'
      case 'vip': return 'bg-royal-purple/15 text-royal-purple border border-royal-purple/30'
      case 'lead': return 'bg-deep-teal/15 text-deep-teal border border-deep-teal/30'
      case 'inactive': return 'bg-medium-gray/15 text-medium-gray border border-medium-gray/30'
      default: return 'bg-medium-gray/15 text-medium-gray border border-medium-gray/30'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Calendar
      case 'email': return Mail
      case 'call': return Phone
      case 'deal': return DollarSign
      default: return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-brand-green/10 text-brand-green'
      case 'email': return 'bg-ocean-blue/10 text-ocean-blue'
      case 'meeting': return 'bg-royal-purple/10 text-royal-purple'
      case 'deal': return 'bg-warm-orange/10 text-warm-orange'
      case 'note': return 'bg-deep-teal/10 text-deep-teal'
      default: return 'bg-medium-gray/10 text-medium-gray'
    }
  }

  // Vibrant Avatar Color System
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

  // Vibrant Tag Colors
  const getTagColor = (tag: string, index: number) => {
    const tagColors = [
      'bg-ocean-blue/10 text-ocean-blue border-ocean-blue/30',
      'bg-brand-green/10 text-brand-green border-brand-green/30',
      'bg-royal-purple/10 text-royal-purple border-royal-purple/30',
      'bg-warm-orange/10 text-warm-orange border-warm-orange/30',
      'bg-deep-teal/10 text-deep-teal border-deep-teal/30'
    ]
    return tagColors[index % tagColors.length]
  }

  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        
        {/* Contacts Content */}
        <div className="p-8">
          {/* Vibrant Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-bg-secondary rounded-lg p-4 border border-brand-green/20 hover:border-brand-green/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-deep-teal rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Total Contacts</p>
                  <p className="text-2xl font-bold text-brand-green">{contactStats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-bg-secondary rounded-lg p-4 border border-ocean-blue/20 hover:border-ocean-blue/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-royal-purple rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Active</p>
                  <p className="text-2xl font-bold text-ocean-blue">{contactStats.active}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-bg-secondary rounded-lg p-4 border border-warm-orange/20 hover:border-warm-orange/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-bright-yellow rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Avg Response</p>
                  <p className="text-2xl font-bold text-warm-orange">{contactStats.averageResponse}h</p>
                </div>
              </div>
            </div>
            
            <div className="bg-bg-secondary rounded-lg p-4 border border-royal-purple/20 hover:border-royal-purple/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-royal-purple to-warm-orange rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Conversion</p>
                  <p className="text-2xl font-bold text-royal-purple">{contactStats.conversionRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vibrant Tabs */}
          <div className="border-b border-border-color mb-6">
            <div className="flex space-x-8">
              {[
                { id: 'contacts', label: 'All Contacts', icon: Users, color: 'ocean-blue' },
                { id: 'activity', label: 'Recent Activity', icon: Activity, color: 'brand-green' },
                { id: 'pipeline', label: 'Deal Pipeline', icon: Target, color: 'royal-purple' },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'warm-orange' }
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-all duration-200",
                      isActive
                        ? `border-${tab.color} text-${tab.color} shadow-sm`
                        : 'border-transparent text-text-muted hover:text-text-primary'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'contacts' && (
          <div className="px-8">
            {/* Enhanced Search and Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent w-80 bg-bg-secondary"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent bg-bg-secondary"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="prospect">Prospect</option>
                  <option value="warm">Warm</option>
                  <option value="vip">VIP</option>
                  <option value="lead">Lead</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-ocean-blue border border-border-color rounded-lg hover:bg-ocean-blue/5 hover:border-ocean-blue/30 transition-all duration-200">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Vibrant Contacts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContacts.map((contact, index) => (
                <div 
                  key={contact.id} 
                  className="bg-bg-secondary rounded-lg border border-border-color p-6 hover:shadow-lg hover:border-ocean-blue/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Colorful Avatar */}
                      <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarColors(index)} rounded-lg flex items-center justify-center text-white font-medium shadow-lg group-hover:scale-105 transition-transform`}>
                        {contact.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary group-hover:text-ocean-blue transition-colors">{contact.name}</h3>
                        <p className="text-sm text-text-muted">{contact.title}</p>
                        <p className="text-sm text-text-muted">{contact.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Vibrant Status Badge */}
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <button className="p-1 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded transition-colors duration-200">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Details with Icons */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Mail className="w-4 h-4 text-ocean-blue" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Phone className="w-4 h-4 text-brand-green" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <MapPin className="w-4 h-4 text-royal-purple" />
                      <span>{contact.location}</span>
                    </div>
                  </div>

                  {/* Colorful Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {contact.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getTagColor(tag, tagIndex)}`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Pipeline Deals Section */}
                  {(() => {
                    const activeDeals = getContactActiveDeals(contact.name)
                    const totalDealValue = getContactDealValue(contact.name)
                    
                    if (activeDeals.length > 0) {
                      return (
                        <div className="mb-4 p-3 bg-bg-primary rounded-lg border border-border-color">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-text-primary">Active Deals</span>
                            <span className="text-xs text-text-muted">{activeDeals.length} deal{activeDeals.length !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="space-y-2">
                            {activeDeals.slice(0, 2).map(deal => {
                              const stageConfig = PIPELINE_STAGES.find(s => s.id === deal.stage)
                              return (
                                <div key={deal.id} className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="text-text-primary truncate max-w-[120px]">{deal.property.address}</span>
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs border ${getPipelineStageColor(deal.stage)}`}>
                                      {stageConfig?.icon} {stageConfig?.name}
                                    </span>
                                  </div>
                                  <span className="text-text-muted">${(deal.value / 1000).toFixed(0)}K</span>
                                </div>
                              )
                            })}
                            {activeDeals.length > 2 && (
                              <p className="text-xs text-text-muted text-center">+{activeDeals.length - 2} more deals</p>
                            )}
                          </div>
                        </div>
                      )
                    }
                    return null
                  })()}

                  {/* Colorful Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-color">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-ocean-blue">{getContactActiveDeals(contact.name).length}</p>
                      <p className="text-xs text-text-muted">Active Deals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-royal-purple">{contact.deals}</p>
                      <p className="text-xs text-text-muted">Total Deals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-brand-green">
                        ${Math.max(getContactDealValue(contact.name), contact.dealValue * 1000) > 0 
                          ? (Math.max(getContactDealValue(contact.name), contact.dealValue * 1000) / 1000).toFixed(0) 
                          : '0'}K
                      </p>
                      <p className="text-xs text-text-muted">Deal Value</p>
                    </div>
                  </div>

                  {/* Vibrant Action Buttons */}
                  <div className="flex items-center gap-2 pt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-ocean-blue to-deep-teal text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 border border-brand-green/30 bg-brand-green/5 text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-all duration-200">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 border border-warm-orange/30 bg-warm-orange/5 text-warm-orange rounded-lg hover:bg-warm-orange hover:text-white transition-all duration-200">
                      <Mail className="w-4 h-4" />
                    </button>
                    {getContactActiveDeals(contact.name).length > 0 && (
                      <a 
                        href="/pipeline" 
                        className="flex items-center justify-center gap-2 px-3 py-2 border border-royal-purple/30 bg-royal-purple/5 text-royal-purple rounded-lg hover:bg-royal-purple hover:text-white transition-all duration-200"
                        title="View deals in pipeline"
                      >
                        <Target className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="px-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-1">Recent Activity</h2>
              <p className="text-text-muted">Track all interactions and engagements with your contacts</p>
            </div>

            <div className="bg-bg-secondary rounded-lg border border-border-color">
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.type)
                    const iconColor = getActivityColor(activity.type)
                    
                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-bg-primary rounded-lg border border-border-color hover:border-ocean-blue/30 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
                          <ActivityIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-text-primary">{activity.contactName}</span>
                            <span className="text-sm text-text-muted">•</span>
                            <span className="text-sm text-text-muted capitalize">{activity.type}</span>
                          </div>
                          <p className="text-sm text-text-muted">{activity.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-muted">{activity.date}</p>
                          <p className="text-sm text-text-muted">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="px-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-1">Deal Pipeline</h2>
              <p className="text-text-muted">Track ongoing deals and opportunities through your contact network</p>
            </div>
            
            {deals.length > 0 ? (
              <div className="space-y-6">
                {/* Pipeline Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-bg-secondary rounded-lg p-4 border border-ocean-blue/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-deep-teal rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-ocean-blue">{deals.length}</p>
                        <p className="text-text-muted text-sm">Total Deals</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-4 border border-brand-green/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-warm-orange rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-brand-green">
                          {deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length}
                        </p>
                        <p className="text-text-muted text-sm">Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-4 border border-royal-purple/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-royal-purple to-warm-orange rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-royal-purple">
                          {deals.filter(d => d.stage === 'closed_won').length}
                        </p>
                        <p className="text-text-muted text-sm">Closed Won</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-bg-secondary rounded-lg p-4 border border-warm-orange/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-bright-yellow rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-warm-orange">
                          ${(deals.reduce((sum, deal) => sum + deal.value, 0) / 1000).toFixed(0)}K
                        </p>
                        <p className="text-text-muted text-sm">Total Value</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pipeline Deals by Stage */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {PIPELINE_STAGES.filter(stage => deals.some(deal => deal.stage === stage.id)).map(stage => {
                    const stageDeals = deals.filter(deal => deal.stage === stage.id)
                    return (
                      <div key={stage.id} className="bg-bg-secondary rounded-lg border border-border-color p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">{stage.icon}</span>
                          <div>
                            <h3 className="font-semibold text-text-primary">{stage.name}</h3>
                            <p className="text-sm text-text-muted">{stageDeals.length} deal{stageDeals.length !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {stageDeals.slice(0, 3).map(deal => (
                            <div key={deal.id} className="p-3 bg-bg-primary rounded-lg border border-border-color">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-text-primary text-sm">{deal.property.address}</span>
                                <span className="text-sm text-text-muted">${(deal.value / 1000).toFixed(0)}K</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-text-secondary">{deal.contact.name}</span>
                                <span className="text-xs text-text-muted">•</span>
                                <span className="text-xs text-text-muted">{deal.daysInStage} days in stage</span>
                              </div>
                            </div>
                          ))}
                          {stageDeals.length > 3 && (
                            <p className="text-sm text-text-muted text-center">+{stageDeals.length - 3} more deals</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* View Full Pipeline Button */}
                <div className="text-center">
                  <a 
                    href="/pipeline" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-royal-purple to-warm-orange text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <Target className="w-5 h-5" />
                    View Full Pipeline
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-bg-secondary rounded-lg border border-border-color p-8 text-center">
                <div className="w-16 h-16 bg-bg-tertiary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No Active Deals</h3>
                <p className="text-text-muted text-sm mb-4">
                  No deals found in your pipeline. Start by adding properties from Deal Finder.
                </p>
                <a 
                  href="/properties" 
                  className="bg-gradient-to-r from-ocean-blue to-royal-purple text-white px-4 py-2 rounded-lg font-medium text-sm"
                >
                  Browse Properties
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-1">Contact Analytics</h2>
              <p className="text-text-muted">Analyze your contact network performance and relationship insights</p>
            </div>
            
            <div className="bg-bg-secondary rounded-lg border border-border-color p-8 text-center">
              <TrendingUp className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-text-primary mb-2">Analytics Dashboard</h3>
              <p className="text-text-muted mb-4">Advanced contact analytics and insights coming soon</p>
              <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-2 rounded-lg font-medium">
                Request Early Access
              </button>
            </div>
          </div>
        )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-bg-primary rounded-lg border border-border-color max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border-color">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center text-white text-xl font-medium">
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">{selectedContact.name}</h2>
                    <p className="text-text-muted">{selectedContact.title} at {selectedContact.company}</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize mt-1 ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-text-muted" />
                      <span className="text-text-primary">{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-text-muted" />
                      <span className="text-text-primary">{selectedContact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-text-muted" />
                      <span className="text-text-primary">{selectedContact.location}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-text-muted" />
                      <span className="text-text-primary">{selectedContact.company}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-text-muted" />
                      <span className="text-text-primary">Last Contact: {selectedContact.lastContact}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-text-muted" />
                      <span className="text-text-primary">Source: {selectedContact.source.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Performance</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-bg-secondary rounded-lg border border-border-color">
                    <p className="text-2xl font-bold text-text-primary">{selectedContact.properties}</p>
                    <p className="text-sm text-text-muted">Properties Listed</p>
                  </div>
                  <div className="text-center p-4 bg-bg-secondary rounded-lg border border-border-color">
                    <p className="text-2xl font-bold text-text-primary">{selectedContact.deals}</p>
                    <p className="text-sm text-text-muted">Deals Closed</p>
                  </div>
                  <div className="text-center p-4 bg-bg-secondary rounded-lg border border-border-color">
                    <p className="text-2xl font-bold text-green-600">${(selectedContact.dealValue / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-text-muted">Total Value</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Notes</h3>
                <div className="bg-bg-secondary rounded-lg border border-border-color p-4">
                  <p className="text-text-primary">{selectedContact.notes}</p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-border-color">
                <button className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Other tabs content would be similarly updated with vibrant colors */}
      </div>
    </div>
  )
} 