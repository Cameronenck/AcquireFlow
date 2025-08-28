'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar,
  Star,
  Archive,
  MoreHorizontal,
  Paperclip,
  Send,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit3,
  Building,
  User,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  Zap,
  Target,
  DollarSign,
  MapPin,
  Users
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { initializeTheme } from '@/lib/utils'
import { usePipeline, PIPELINE_STAGES, PipelineStage } from '@/lib/contexts/PipelineContext'

// Mock data for the inbox
const conversations = [
  {
    id: 1,
    contactName: 'Sarah Johnson',
    company: 'Keller Williams',
    location: 'Lancaster, PA',
    role: 'Listing Agent',
    subject: 'RE: 1935 Hemlock Rd - LOI Response',
    lastMessage: 'Thanks for your offer. The seller is interested but would like to discuss terms...',
    timestamp: '2 hours ago',
    status: 'responded',
    priority: 'hot',
    propertyAddress: '1935 Hemlock Rd',
    propertyValue: 275000,
    messageCount: 12,
    unreadCount: 1,
    responseRate: 85,
    campaignType: 'loi',
    avatar: 'SJ'
  },
  {
    id: 2,
    contactName: 'Michael Chen',
    company: 'RE/MAX Premier',
    location: 'Denver, CO',
    role: 'Investment Specialist',
    subject: 'Cash Offer - 2847 Pine Street',
    lastMessage: 'I have a client who might be interested. Can we schedule a call this week?',
    timestamp: '4 hours ago',
    status: 'pending',
    priority: 'warm',
    propertyAddress: '2847 Pine Street',
    propertyValue: 342000,
    messageCount: 8,
    unreadCount: 0,
    responseRate: 72,
    campaignType: 'follow-up',
    avatar: 'MC'
  },
  {
    id: 3,
    contactName: 'Lisa Rodriguez',
    company: 'Coldwell Banker',
    location: 'Aurora, CO',
    role: 'Real Estate Broker',
    subject: 'Wholesale Opportunity - Multiple Properties',
    lastMessage: 'Let me review the portfolio you sent and get back to you by Friday.',
    timestamp: '1 day ago',
    status: 'pending',
    priority: 'warm',
    propertyAddress: 'Portfolio (4 properties)',
    propertyValue: 890000,
    messageCount: 15,
    unreadCount: 0,
    responseRate: 90,
    campaignType: 'campaign',
    avatar: 'LR'
  },
  {
    id: 4,
    contactName: 'David Wilson',
    company: 'eXp Realty',
    location: 'Westminster, CO',
    role: 'Realtor',
    subject: 'Property Inquiry - 1456 Oak Avenue',
    lastMessage: 'This property just came on the market. Are you still looking in this area?',
    timestamp: '2 days ago',
    status: 'unread',
    priority: 'cold',
    propertyAddress: '1456 Oak Avenue',
    propertyValue: 298000,
    messageCount: 3,
    unreadCount: 2,
    responseRate: 45,
    campaignType: 'inbound',
    avatar: 'DW'
  }
]

const messages = [
  {
    id: 1,
    type: 'outbound',
    direction: 'sent',
    timestamp: '3 days ago, 2:30 PM',
    from: 'you@acquireflow.ai',
    to: 'sarah.johnson@kellerwilliams.com',
    subject: 'Cash Offer - 1935 Hemlock Rd',
    content: `Hi Sarah,

I hope this message finds you well. I'm interested in making a cash offer on the property at 1935 Hemlock Rd that you have listed.

After analyzing the property and local market conditions, I'd like to present an offer of $275,000 with the following terms:

• All cash purchase (no financing contingency)
• 7-day inspection period
• 21-day closing
• $5,000 earnest money deposit

I'm prepared to move quickly on this opportunity. Would you be available for a brief call this week to discuss?

Best regards,
[Your Name]`,
    deliveryStatus: 'delivered',
    opened: true,
    openCount: 2,
    attachments: ['LOI_Template.pdf']
  },
  {
    id: 2,
    type: 'inbound',
    direction: 'received',
    timestamp: '2 hours ago, 10:15 AM',
    from: 'sarah.johnson@kellerwilliams.com',
    to: 'you@acquireflow.ai',
    subject: 'RE: Cash Offer - 1935 Hemlock Rd',
    content: `Thank you for your interest in 1935 Hemlock Rd!

The seller has reviewed your offer and appreciates the cash terms and quick closing timeline. However, they were hoping for something closer to the listing price of $289,000.

Would you be willing to consider $282,000? The seller is motivated and would accept your 21-day closing timeline.

I'm available for a call anytime today if you'd like to discuss further.

Best,
Sarah Johnson
Senior Real Estate Agent
Keller Williams Lancaster`,
    deliveryStatus: 'delivered',
    isNew: true
  }
]

const contactProfile = {
  name: 'Sarah Johnson',
  company: 'Keller Williams Lancaster',
  role: 'Senior Real Estate Agent',
  email: 'sarah.johnson@kw.com',
  phone: '(717) 555-0123',
  linkedin: 'sarah-johnson-realtor',
  avatar: 'SJ',
  stats: {
    responseRate: 85,
    avgResponseTime: '4.2 hours',
    dealsClosed: 3,
    relationshipScore: 8.5
  },
  properties: [
    { address: '1935 Hemlock Rd', price: 275000, status: 'Active Discussion' },
    { address: '664 Poplar St', price: 189000, status: 'LOI Sent' },
    { address: '531 Lafayette St', price: 312000, status: 'Exploring' }
  ],
  campaigns: [
    { name: 'Lancaster Wholesale Q1', sent: 12, responses: 8, rate: 67 },
    { name: 'York Rental Properties', sent: 5, responses: 3, rate: 60 },
    { name: 'Multi-Family Campaign', sent: 8, responses: 6, rate: 75 }
  ]
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [replyContent, setReplyContent] = useState('')
  const [showContactPanel, setShowContactPanel] = useState(true)
  const [showStageDropdown, setShowStageDropdown] = useState<number | null>(null)
  
  // Pipeline integration
  const { deals, getDealsByContact, moveDeal } = usePipeline()
  
  // Get pipeline stage for a contact
  const getContactPipelineStage = (contactName: string, propertyAddress: string) => {
    const contactDeals = deals.filter(deal => 
      deal.contact.name === contactName && 
      deal.property.address.includes(propertyAddress.split(' ')[0])
    )
    return contactDeals.length > 0 ? contactDeals[0].stage : null
  }
  
  // Get pipeline stage badge color
  const getPipelineStageColor = (stage: PipelineStage) => {
    const stageConfig = PIPELINE_STAGES.find(s => s.id === stage)
    if (!stageConfig) return 'bg-medium-gray/10 text-medium-gray border-medium-gray/30'
    
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
  
  // Handle stage change
  const handleStageChange = (contactName: string, propertyAddress: string, newStage: PipelineStage) => {
    const contactDeals = deals.filter(deal => 
      deal.contact.name === contactName && 
      deal.property.address.includes(propertyAddress.split(' ')[0])
    )
    
    if (contactDeals.length > 0) {
      moveDeal(contactDeals[0].id, newStage, `Stage updated from Inbox conversation`)
    }
    setShowStageDropdown(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'unread': return 'bg-blue-100 text-blue-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'hot': return <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
      case 'warm': return <Zap className="w-4 h-4 text-yellow-500" />
      case 'cold': return <Clock className="w-4 h-4 text-gray-400" />
      default: return null
    }
  }

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'loi': return <Building className="w-4 h-4 text-blue-600" />
      case 'follow-up': return <Calendar className="w-4 h-4 text-green-600" />
      case 'campaign': return <Target className="w-4 h-4 text-purple-600" />
      case 'inbound': return <Mail className="w-4 h-4 text-orange-600" />
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && conv.unreadCount > 0) ||
                         (activeFilter === 'loi' && conv.campaignType === 'loi') ||
                         (activeFilter === 'follow-ups' && conv.campaignType === 'follow-up') ||
                         (activeFilter === 'hot' && conv.priority === 'hot')
    
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      
      <div className="ml-70">
        <Header />
        
        {/* Communications Content */}
        <div className="border-b border-border-color bg-bg-primary px-8 py-6">
          <div>
            <div className="flex items-center gap-2 text-text-muted">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <span>Real-time messaging</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="h-screen flex">
          {/* Left Panel - Communications Navigation */}
          <div className="w-[350px] bg-bg-secondary border-r border-border-color flex flex-col">
        {/* Tab Navigation */}
        <div className="border-b border-border-color">
          <div className="flex">
            {[
              { id: 'inbox', label: 'Inbox', icon: Mail },
              { id: 'campaigns', label: 'Campaigns', icon: Target },
              { id: 'templates', label: 'Templates', icon: MessageSquare },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'contacts', label: 'Contacts', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1 py-3 px-2 text-xs font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-accent-blue text-accent-blue bg-blue-50'
                      : 'border-transparent text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Inbox Tab Content */}
        {activeTab === 'inbox' && (
          <>
            {/* Search and Filters Header */}
            <div className="p-4 border-b border-border-color space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations, contacts, or properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent text-sm"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'All', count: conversations.length },
                  { id: 'unread', label: 'Unread', count: conversations.filter(c => c.unreadCount > 0).length },
                  { id: 'loi', label: 'LOI Campaigns', count: conversations.filter(c => c.campaignType === 'loi').length },
                  { id: 'follow-ups', label: 'Follow-ups', count: conversations.filter(c => c.campaignType === 'follow-up').length },
                  { id: 'hot', label: 'Hot Leads', count: conversations.filter(c => c.priority === 'hot').length }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-accent-blue text-white'
                        : 'bg-bg-tertiary text-text-muted hover:text-text-primary hover:bg-bg-primary'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-border-color cursor-pointer transition-colors duration-200 hover:bg-bg-tertiary ${
                    selectedConversation.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-accent-blue' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      {conversation.avatar}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-text-primary text-sm truncate">{conversation.contactName}</h4>
                          {getPriorityIcon(conversation.priority)}
                          {/* Pipeline Stage Badge */}
                          {(() => {
                            const pipelineStage = getContactPipelineStage(conversation.contactName, conversation.propertyAddress)
                            if (pipelineStage) {
                              const stageConfig = PIPELINE_STAGES.find(s => s.id === pipelineStage)
                              return (
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getPipelineStageColor(pipelineStage)}`}>
                                  {stageConfig?.icon} {stageConfig?.name}
                                </span>
                              )
                            }
                            return null
                          })()}
                        </div>
                        <span className="text-xs text-text-muted">{conversation.timestamp}</span>
                      </div>
                      
                      <div className="text-xs text-text-muted mb-1">
                        {conversation.company} • {conversation.location}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {getMessageTypeIcon(conversation.campaignType)}
                        <span className="font-medium text-text-primary text-sm truncate">{conversation.subject}</span>
                      </div>
                      
                      <p className="text-sm text-text-muted line-clamp-2 mb-2">{conversation.lastMessage}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(conversation.status)}`}>
                            {conversation.status}
                          </span>
                          <span className="text-xs text-text-muted">${(conversation.propertyValue / 1000).toFixed(0)}K</span>
                        </div>
                        
                        {conversation.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-accent-blue rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">{conversation.unreadCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Other Tab Content */}
        {activeTab !== 'inbox' && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bg-tertiary rounded-lg flex items-center justify-center mx-auto mb-4">
                {activeTab === 'campaigns' && <Target className="w-8 h-8 text-text-muted" />}
                {activeTab === 'templates' && <MessageSquare className="w-8 h-8 text-text-muted" />}
                {activeTab === 'analytics' && <TrendingUp className="w-8 h-8 text-text-muted" />}
                {activeTab === 'contacts' && <Users className="w-8 h-8 text-text-muted" />}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 capitalize">{activeTab}</h3>
              <p className="text-text-muted text-sm mb-4">
                {activeTab === 'campaigns' && 'Manage your email and SMS campaigns'}
                {activeTab === 'templates' && 'Create and manage message templates'}
                {activeTab === 'analytics' && 'View communication performance analytics'}
                {activeTab === 'contacts' && 'Manage your contact lists and segments'}
              </p>
              <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-4 py-2 rounded-lg font-medium text-sm">
                Coming Soon
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Center Panel - Message Thread */}
      <div className="flex-1 flex flex-col bg-bg-primary">
        {/* Conversation Header */}
        <div className="p-6 border-b border-border-color bg-bg-secondary">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center text-white font-medium">
                {selectedConversation.avatar}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-semibold text-text-primary">{selectedConversation.contactName}</h2>
                  {/* Pipeline Stage Badge in Header */}
                  {(() => {
                    const pipelineStage = getContactPipelineStage(selectedConversation.contactName, selectedConversation.propertyAddress)
                    if (pipelineStage) {
                      const stageConfig = PIPELINE_STAGES.find(s => s.id === pipelineStage)
                      return (
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getPipelineStageColor(pipelineStage)}`}>
                          {stageConfig?.icon} {stageConfig?.name}
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
                <p className="text-sm text-text-muted">{selectedConversation.company} • {selectedConversation.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Pipeline Actions */}
              <div className="relative">
                <button 
                  onClick={() => setShowStageDropdown(showStageDropdown === selectedConversation.id ? null : selectedConversation.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors text-sm"
                >
                  <Target className="w-4 h-4" />
                  Change Stage
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showStageDropdown === selectedConversation.id && (
                  <div className="absolute right-0 top-10 bg-bg-primary border border-border-color rounded-lg shadow-lg py-1 z-20 min-w-[200px]">
                    {PIPELINE_STAGES.map(stage => (
                      <button
                        key={stage.id}
                        onClick={() => handleStageChange(selectedConversation.contactName, selectedConversation.propertyAddress, stage.id)}
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-bg-secondary w-full text-left transition-colors"
                      >
                        <span className="text-lg">{stage.icon}</span>
                        <span className="text-text-primary">{stage.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <a 
                href="/pipeline" 
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-ocean-blue to-royal-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View in Pipeline
              </a>
              
              <div className="h-6 w-px bg-border-color"></div>
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200">
                <Star className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200">
                <Archive className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Property:</span>
              <p className="font-medium text-text-primary">{selectedConversation.propertyAddress}</p>
            </div>
            <div>
              <span className="text-text-muted">Response Rate:</span>
              <p className="font-medium text-green-600">{selectedConversation.responseRate}%</p>
            </div>
            <div>
              <span className="text-text-muted">Messages:</span>
              <p className="font-medium text-text-primary">{selectedConversation.messageCount} total</p>
            </div>
            <div>
              <span className="text-text-muted">Last Activity:</span>
              <p className="font-medium text-text-primary">{selectedConversation.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`${message.type === 'outbound' ? 'ml-12' : 'mr-12'}`}>
              <div className={`rounded-lg border ${
                message.type === 'outbound' 
                  ? 'bg-blue-50 border-blue-200' 
                  : message.isNew 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-bg-secondary border-border-color'
              }`}>
                <div className="p-4 border-b border-inherit">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-text-primary text-sm">
                        {message.type === 'outbound' ? 'You' : selectedConversation.contactName}
                      </span>
                      <span className="text-xs text-text-muted">{message.timestamp}</span>
                      {message.isNew && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          New Response
                        </span>
                      )}
                    </div>
                    {message.type === 'outbound' && (
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        {message.opened && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>Opened {message.openCount} times</span>
                          </div>
                        )}
                        <span className="capitalize">{message.deliveryStatus}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-text-muted mb-2">
                    <strong>From:</strong> {message.from} <br />
                    <strong>To:</strong> {message.to} <br />
                    <strong>Subject:</strong> {message.subject}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-sm text-text-primary whitespace-pre-line leading-relaxed">
                    {message.content}
                  </div>
                  
                  {message.attachments && (
                    <div className="mt-4 pt-4 border-t border-inherit">
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <Paperclip className="w-4 h-4" />
                        <span>Attachments:</span>
                        {message.attachments.map((attachment, index) => (
                          <span key={index} className="text-accent-blue hover:underline cursor-pointer">
                            {attachment}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Composition */}
        <div className="p-6 border-t border-border-color bg-bg-secondary">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 border border-border-color rounded-lg text-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent">
                <option>Custom Reply</option>
                <option>Follow-up Template</option>
                <option>Negotiation Template</option>
                <option>Thank You Template</option>
                <option>Schedule Showing</option>
              </select>
              <button className="text-accent-blue hover:text-accent-purple text-sm font-medium">
                Insert Property Details
              </button>
            </div>
            
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply..."
              rows={4}
              className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent resize-none"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors duration-200">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="text-sm text-accent-blue hover:text-accent-purple font-medium">
                  Schedule Send
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                  Save Draft
                </button>
                <button className="flex items-center gap-2 bg-gradient-to-r from-ocean-blue to-royal-purple text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Contact Intelligence */}
      {showContactPanel && (
        <div className="w-[320px] bg-bg-secondary border-l border-border-color overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Contact Profile Card */}
            <div className="bg-bg-primary rounded-lg border border-border-color p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-ocean-blue to-deep-teal rounded-lg flex items-center justify-center text-white font-medium">
                  {contactProfile.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{contactProfile.name}</h3>
                  <p className="text-sm text-text-muted">{contactProfile.role}</p>
                  <p className="text-sm text-text-muted">{contactProfile.company}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-text-muted" />
                  <span className="text-text-primary">{contactProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-text-muted" />
                  <span className="text-text-primary">{contactProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-text-muted" />
                  <span className="text-ocean-blue cursor-pointer hover:underline">LinkedIn Profile</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border-color">
                <h4 className="font-medium text-text-primary mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-brand-green">{contactProfile.stats.responseRate}%</p>
                    <p className="text-text-muted">Response Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-warm-orange">{contactProfile.stats.avgResponseTime}</p>
                    <p className="text-text-muted">Avg Response</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-royal-purple">{contactProfile.stats.dealsClosed}</p>
                    <p className="text-text-muted">Deals Closed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-ocean-blue">{contactProfile.stats.relationshipScore}/10</p>
                    <p className="text-text-muted">Relationship</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Properties */}
            <div className="bg-bg-primary rounded-lg border border-border-color p-4">
              <h4 className="font-medium text-text-primary mb-3">Related Properties</h4>
              <div className="space-y-3">
                {contactProfile.properties.map((property, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{property.address}</p>
                      <p className="text-xs text-text-muted">${property.price.toLocaleString()}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {property.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-bg-primary rounded-lg border border-border-color p-4">
              <h4 className="font-medium text-text-primary mb-3">Campaign Performance</h4>
              <div className="space-y-3">
                {contactProfile.campaigns.map((campaign, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-text-primary">{campaign.name}</p>
                      <span className="text-sm font-medium text-green-600">{campaign.rate}%</span>
                    </div>
                    <p className="text-xs text-text-muted">
                      {campaign.sent} sent, {campaign.responses} responses
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 bg-accent-blue text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
                <Calendar className="w-4 h-4" />
                Schedule Follow-up
              </button>
              <button className="w-full flex items-center gap-2 border border-border-color py-2 px-4 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                <Plus className="w-4 h-4" />
                Add to Campaign
              </button>
              <button className="w-full flex items-center gap-2 border border-border-color py-2 px-4 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                <Edit3 className="w-4 h-4" />
                Update Notes
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}