'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Eye, 
  Edit3, 
  Copy, 
  Send,
  Mail,
  Calendar,
  Building,
  Zap,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Upload,
  Filter,
  Star,
  Archive
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { initializeTheme } from '@/lib/utils'

// Mock data
const loiTemplates = [
  {
    id: 1,
    name: 'Standard Cash Purchase',
    description: 'Professional template for standard cash property purchases',
    category: 'Cash Offers',
    usage: 89,
    successRate: 22.5,
    lastModified: '2024-01-20',
    isDefault: true
  },
  {
    id: 2,
    name: 'Distressed Property Acquisition',
    description: 'Specialized template for distressed or foreclosure properties',
    category: 'Distressed',
    usage: 67,
    successRate: 31.2,
    lastModified: '2024-01-18',
    isDefault: false
  },
  {
    id: 3,
    name: 'Wholesale Assignment',
    description: 'Template for wholesale deals and assignment contracts',
    category: 'Wholesale',
    usage: 34,
    successRate: 15.8,
    lastModified: '2024-01-15',
    isDefault: false
  }
]

const recentLOIs = [
  {
    id: 1,
    propertyAddress: '1935 Hemlock Rd, Lancaster PA',
    recipient: 'Sarah Johnson',
    recipientCompany: 'Keller Williams',
    offerAmount: 275000,
    status: 'sent',
    templateUsed: 'Standard Cash Purchase',
    sentDate: '2024-01-20',
    responseDate: null
  },
  {
    id: 2,
    propertyAddress: '2847 Pine Street, York PA',
    recipient: 'Michael Chen',
    recipientCompany: 'RE/MAX Premier',
    offerAmount: 342000,
    status: 'responded',
    templateUsed: 'Fix & Flip Offer',
    sentDate: '2024-01-19',
    responseDate: '2024-01-20'
  }
]

export default function LOIGeneratorPage() {
  const [activeTab, setActiveTab] = useState('generator')
  const [selectedTemplate, setSelectedTemplate] = useState(loiTemplates[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loiForm, setLoiForm] = useState({
    propertyAddress: '',
    offerAmount: '',
    recipientName: '',
    recipientEmail: '',
    closingDate: '',
    earnestMoney: '',
    contingencies: '',
    personalMessage: ''
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'responded': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return Send
      case 'draft': return Edit3
      case 'responded': return Mail
      case 'accepted': return CheckCircle
      case 'rejected': return Clock
      default: return FileText
    }
  }

  const filteredLOIs = recentLOIs.filter(loi => {
    const matchesSearch = loi.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loi.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === 'all' || loi.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const handleInputChange = (field: string, value: string) => {
    setLoiForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      
      <div className="ml-70">
        <Header />
        
        {/* LOI Generator Content */}
        <div className="border-b border-border-color bg-bg-primary px-8 py-6">
          <div>
            <div className="flex items-center gap-2 text-text-muted">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <span>Professional letter generation</span>
            </div>
          </div>
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                <Plus className="w-5 h-5" />
                New LOI
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Tabs */}
          <div className="border-b border-border-color mb-6">
            <div className="flex space-x-8">
              {[
                { id: 'generator', label: 'Generate LOI', icon: Zap },
                { id: 'templates', label: 'Templates', icon: FileText },
                { id: 'history', label: 'History', icon: Clock },
                { id: 'settings', label: 'Settings', icon: Archive }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-accent-blue text-accent-blue'
                        : 'border-transparent text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Generate LOI Tab */}
          {activeTab === 'generator' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">Select Template</h2>
                  <p className="text-text-muted mb-4">Choose a template that matches your investment strategy</p>
                  
                  <div className="space-y-3">
                    {loiTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedTemplate.id === template.id
                            ? 'border-accent-blue bg-blue-50'
                            : 'border-border-color hover:border-accent-blue hover:bg-bg-tertiary'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-text-primary">{template.name}</h3>
                          {template.isDefault && (
                            <span className="text-xs bg-accent-blue text-white px-2 py-1 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-text-muted mb-2">{template.description}</p>
                        <div className="flex items-center gap-4 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {template.usage} uses
                          </span>
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            {template.successRate}% success rate
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Information */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Property Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Property Address</label>
                      <input
                        type="text"
                        placeholder="Enter property address"
                        value={loiForm.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Offer Amount</label>
                      <input
                        type="number"
                        placeholder="$0"
                        value={loiForm.offerAmount}
                        onChange={(e) => handleInputChange('offerAmount', e.target.value)}
                        className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="bg-bg-secondary rounded-lg border border-border-color p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Preview</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-bg-tertiary rounded-lg">
                      <Download className="w-4 h-4 text-text-muted" />
                    </button>
                    <button className="p-2 hover:bg-bg-tertiary rounded-lg">
                      <Copy className="w-4 h-4 text-text-muted" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 min-h-[400px] border border-border-color">
                  <div className="space-y-4 text-sm">
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-gray-900">Letter of Intent</h2>
                      <p className="text-gray-600">Property Purchase Offer</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                      <p><strong>To:</strong> [Recipient Name]</p>
                      <p><strong>Email:</strong> [Recipient Email]</p>
                      <p><strong>Re:</strong> Purchase Offer for {loiForm.propertyAddress || '[Property Address]'}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p>Dear [Recipient Name],</p>
                      <p>I am writing to express my interest in purchasing the above-referenced property. Based on my evaluation of the property and current market conditions, I would like to present the following offer:</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p><strong>Offer Details:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Purchase Price:</strong> ${loiForm.offerAmount || '[Offer Amount]'}</li>
                        <li><strong>Financing:</strong> Cash purchase (no financing contingency)</li>
                        <li><strong>Closing Date:</strong> [Closing Date]</li>
                        <li><strong>Earnest Money:</strong> $5,000</li>
                        <li><strong>Inspection Period:</strong> 7 days</li>
                      </ul>
                    </div>
                    
                    <p>This offer is contingent upon a satisfactory inspection of the property and clear title. I am prepared to move quickly and close on this transaction as soon as possible.</p>
                    <p>I look forward to hearing from you and hope we can come to a mutually beneficial agreement.</p>
                    
                    <div className="mt-8">
                      <p>Best regards,</p>
                      <p>[Your Name]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary mb-1">LOI Templates</h2>
                <p className="text-text-muted">Manage and customize your letter of intent templates</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loiTemplates.map((template) => (
                  <div key={template.id} className="bg-bg-secondary rounded-lg border border-border-color p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{template.category}</span>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-text-muted" />
                    </div>
                    
                    <h3 className="font-semibold text-text-primary mb-2">{template.name}</h3>
                    <p className="text-sm text-text-muted mb-4">{template.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Usage:</span>
                        <span className="font-medium">{template.usage} times</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Success Rate:</span>
                        <span className="font-medium text-green-600">{template.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Last Modified:</span>
                        <span className="font-medium">{template.lastModified}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-accent-blue text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 border border-border-color text-text-secondary rounded-lg text-sm hover:bg-bg-tertiary transition-colors">
                        <Copy className="w-3 h-3" />
                        Duplicate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-1">LOI History</h2>
                  <p className="text-text-muted">Track all your sent letters of intent and their responses</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search LOIs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="responded">Responded</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-bg-secondary rounded-lg border border-border-color overflow-hidden">
                <table className="w-full">
                  <thead className="bg-bg-tertiary border-b border-border-color">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-text-primary">Property</th>
                      <th className="text-left py-3 px-6 font-medium text-text-primary">Recipient</th>
                      <th className="text-left py-3 px-6 font-medium text-text-primary">Offer</th>
                      <th className="text-left py-3 px-6 font-medium text-text-primary">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-text-primary">Date</th>
                      <th className="text-left py-3 px-6 font-medium text-text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLOIs.map((loi) => {
                      const StatusIcon = getStatusIcon(loi.status)
                      return (
                        <tr key={loi.id} className="border-b border-border-color hover:bg-bg-tertiary">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-text-primary">{loi.propertyAddress}</p>
                              <p className="text-sm text-text-muted">{loi.templateUsed}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-text-primary">{loi.recipient}</p>
                              <p className="text-sm text-text-muted">{loi.recipientCompany}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-text-primary">${loi.offerAmount.toLocaleString()}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <StatusIcon className="w-4 h-4" />
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(loi.status)}`}>
                                {loi.status.charAt(0).toUpperCase() + loi.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="text-sm text-text-primary">{loi.sentDate || 'Not sent'}</p>
                              {loi.responseDate && (
                                <p className="text-xs text-text-muted">Responded: {loi.responseDate}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-bg-primary rounded">
                                <Eye className="w-4 h-4 text-text-muted" />
                              </button>
                              <button className="p-1 hover:bg-bg-primary rounded">
                                <Edit3 className="w-4 h-4 text-text-muted" />
                              </button>
                              <button className="p-1 hover:bg-bg-primary rounded">
                                <Download className="w-4 h-4 text-text-muted" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary mb-1">LOI Settings</h2>
                <p className="text-text-muted">Configure default settings and preferences for LOI generation</p>
              </div>
              
              <div className="bg-bg-secondary rounded-lg border border-border-color p-8 text-center">
                <Archive className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Settings Panel</h3>
                <p className="text-text-muted mb-4">Advanced settings and customization options coming soon</p>
                <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-2 rounded-lg font-medium">
                  Request Early Access
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 