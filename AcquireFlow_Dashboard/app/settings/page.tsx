'use client'

import { useState, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  CreditCard, 
  Database,
  Settings as SettingsIcon,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Save,
  RefreshCw
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { initializeTheme } from '@/lib/utils'

// Mock data
const userProfile = {
  name: 'John Anderson',
  email: 'john.anderson@email.com',
  phone: '(555) 123-4567',
  company: 'Anderson Real Estate Investments',
  role: 'Lead Investor',
  avatar: 'JA',
  timezone: 'America/Denver',
  language: 'English'
}

const investmentCriteria = {
  minPrice: 150000,
  maxPrice: 500000,
  targetLocations: ['Denver, CO', 'Aurora, CO', 'Lakewood, CO'],
  propertyTypes: ['Single Family', 'Condo', 'Townhouse'],
  minROI: 8.0,
  maxCapRate: 12.0,
  minCashFlow: 200,
  preferences: {
    cashOnly: true,
    distressed: true,
    newConstruction: false,
    foreclosure: true
  }
}

const integrations = [
  {
    id: 1,
    name: 'Zillow API',
    description: 'Property data and market analysis',
    status: 'connected',
    lastSync: '2024-01-25 14:30',
    features: ['Property Search', 'Market Data', 'Comps']
  },
  {
    id: 2,
    name: 'MLS Integration',
    description: 'Multiple Listing Service access',
    status: 'connected',
    lastSync: '2024-01-25 12:15',
    features: ['Live Listings', 'Price History', 'Property Details']
  },
  {
    id: 3,
    name: 'RentSpree',
    description: 'Rental market data and management',
    status: 'disconnected',
    lastSync: 'Never',
    features: ['Rental Comps', 'Tenant Screening', 'Lease Management']
  },
  {
    id: 4,
    name: 'BiggerPockets',
    description: 'Investment analysis tools',
    status: 'connected',
    lastSync: '2024-01-24 18:45',
    features: ['Deal Analysis', 'Calculator Tools', 'Market Reports']
  }
]

const notificationSettings = {
  email: {
    newDeals: true,
    priceChanges: true,
    marketUpdates: false,
    weeklyReports: true,
    systemUpdates: true
  },
  sms: {
    urgentDeals: true,
    priceAlerts: false,
    systemAlerts: true
  },
  push: {
    newMatches: true,
    bidUpdates: true,
    messages: true
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showApiKey, setShowApiKey] = useState(false)
  const [editingCriteria, setEditingCriteria] = useState(false)
  
  // Form states
  const [profileForm, setProfileForm] = useState(userProfile)
  const [criteriaForm, setCriteriaForm] = useState(investmentCriteria)
  const [notifications, setNotifications] = useState(notificationSettings)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'disconnected': return 'bg-red-100 text-red-800'
      case 'syncing': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return Check
      case 'disconnected': return X
      case 'syncing': return RefreshCw
      default: return X
    }
  }

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCriteriaUpdate = (field: string, value: any) => {
    setCriteriaForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationToggle = (category: string, setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }))
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        
        {/* Settings Content */}
        <div className="p-8">
          <div className="mb-8">
            <div className="mb-6">
              <div>
                <p className="text-text-muted">Manage your account, investment criteria, and platform preferences</p>
              </div>
            </div>

        {/* Tabs */}
        <div className="border-b border-border-color mb-6">
          <div className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'criteria', label: 'Investment Criteria', icon: SettingsIcon },
              { id: 'integrations', label: 'Integrations', icon: SettingsIcon },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'billing', label: 'Billing', icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
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
      </div>

      {/* Content Sections */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <div className="bg-bg-secondary rounded-lg border border-border-color p-6 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Profile Information</h3>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center text-white text-2xl font-medium">
                {profileForm.avatar}
              </div>
              <div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200 mb-2">
                  {/* <Upload className="w-4 h-4" /> */}
                  Upload Photo
                </button>
                <p className="text-sm text-text-muted">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => handleProfileUpdate('name', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Company</label>
                <input
                  type="text"
                  value={profileForm.company}
                  onChange={(e) => handleProfileUpdate('company', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Role</label>
                <select
                  value={profileForm.role}
                  onChange={(e) => handleProfileUpdate('role', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                >
                  <option value="Lead Investor">Lead Investor</option>
                  <option value="Real Estate Agent">Real Estate Agent</option>
                  <option value="Property Manager">Property Manager</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Timezone</label>
                <select
                  value={profileForm.timezone}
                  onChange={(e) => handleProfileUpdate('timezone', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                >
                  <option value="America/Denver">Mountain Time (Denver)</option>
                  <option value="America/New_York">Eastern Time (New York)</option>
                  <option value="America/Chicago">Central Time (Chicago)</option>
                  <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'criteria' && (
        <div className="max-w-4xl">
          <div className="bg-bg-secondary rounded-lg border border-border-color p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Investment Criteria</h3>
              <button 
                onClick={() => setEditingCriteria(!editingCriteria)}
                className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200"
              >
                {/* <Edit3 className="w-4 h-4" /> */}
                {editingCriteria ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Min Price</label>
                <div className="relative">
                  {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" /> */}
                  <input
                    type="number"
                    value={criteriaForm.minPrice}
                    onChange={(e) => handleCriteriaUpdate('minPrice', parseInt(e.target.value))}
                    disabled={!editingCriteria}
                    className="w-full pl-10 pr-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:bg-bg-tertiary disabled:text-text-muted"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Max Price</label>
                <div className="relative">
                  {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" /> */}
                  <input
                    type="number"
                    value={criteriaForm.maxPrice}
                    onChange={(e) => handleCriteriaUpdate('maxPrice', parseInt(e.target.value))}
                    disabled={!editingCriteria}
                    className="w-full pl-10 pr-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:bg-bg-tertiary disabled:text-text-muted"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Min ROI (%)</label>
                <div className="relative">
                  {/* <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" /> */}
                  <input
                    type="number"
                    step="0.1"
                    value={criteriaForm.minROI}
                    onChange={(e) => handleCriteriaUpdate('minROI', parseFloat(e.target.value))}
                    disabled={!editingCriteria}
                    className="w-full pl-10 pr-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:bg-bg-tertiary disabled:text-text-muted"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Max Cap Rate (%)</label>
                <div className="relative">
                  {/* <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" /> */}
                  <input
                    type="number"
                    step="0.1"
                    value={criteriaForm.maxCapRate}
                    onChange={(e) => handleCriteriaUpdate('maxCapRate', parseFloat(e.target.value))}
                    disabled={!editingCriteria}
                    className="w-full pl-10 pr-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:bg-bg-tertiary disabled:text-text-muted"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Min Cash Flow</label>
                <div className="relative">
                  {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" /> */}
                  <input
                    type="number"
                    value={criteriaForm.minCashFlow}
                    onChange={(e) => handleCriteriaUpdate('minCashFlow', parseInt(e.target.value))}
                    disabled={!editingCriteria}
                    className="w-full pl-10 pr-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:bg-bg-tertiary disabled:text-text-muted"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-text-primary mb-3">Target Locations</label>
              <div className="flex flex-wrap gap-2">
                {criteriaForm.targetLocations.map((location, index) => (
                  <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {/* <MapPin className="w-3 h-3" /> */}
                    {location}
                    {editingCriteria && (
                      <button className="text-blue-600 hover:text-blue-800">
                        {/* <X className="w-3 h-3" /> */}
                      </button>
                    )}
                  </span>
                ))}
                {editingCriteria && (
                  <button className="inline-flex items-center gap-2 px-3 py-1 border-2 border-dashed border-border-color rounded-full text-sm text-text-muted hover:text-text-primary hover:border-accent-blue transition-colors duration-200">
                    {/* <Plus className="w-3 h-3" /> */}
                    Add Location
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-text-primary mb-3">Property Types</label>
              <div className="flex flex-wrap gap-2">
                {criteriaForm.propertyTypes.map((type, index) => (
                  <span key={index} className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {type}
                    {editingCriteria && (
                      <button className="text-green-600 hover:text-green-800">
                        {/* <X className="w-3 h-3" /> */}
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-text-primary mb-3">Investment Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(criteriaForm.preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleCriteriaUpdate('preferences', {
                        ...criteriaForm.preferences,
                        [key]: e.target.checked
                      })}
                      disabled={!editingCriteria}
                      className="w-4 h-4 text-accent-blue border-border-color rounded focus:ring-accent-blue disabled:opacity-50"
                    />
                    <label className="text-sm text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-1">API Integrations</h2>
            <p className="text-text-muted">Connect with external services to enhance your property search and analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => {
              const StatusIcon = getStatusIcon(integration.status)
              
              return (
                <div key={integration.id} className="bg-bg-secondary rounded-lg border border-border-color p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-purple rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{integration.name}</h3>
                        <p className="text-sm text-text-muted">{integration.description}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(integration.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {integration.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-text-muted mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border-color">
                    <span className="text-sm text-text-muted">
                      Last sync: {integration.lastSync}
                    </span>
                    <div className="flex items-center gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <button className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary border border-border-color rounded hover:bg-bg-tertiary transition-colors duration-200">
                            Configure
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded hover:bg-red-50 transition-colors duration-200">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button className="px-4 py-1 text-sm bg-accent-blue text-white rounded hover:bg-blue-600 transition-colors duration-200">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8">
            <div className="bg-bg-secondary rounded-lg border border-border-color p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">API Keys</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Your API Key</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value="ak_1234567890abcdef1234567890abcdef"
                        readOnly
                        className="w-full px-4 py-3 border border-border-color rounded-lg bg-bg-tertiary text-text-muted"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button className="px-4 py-3 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                      Copy
                    </button>
                    <button className="px-4 py-3 border border-border-color rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200">
                      Regenerate
                    </button>
                  </div>
                  <p className="text-sm text-text-muted mt-2">Use this API key to access AcquireFlow.ai programmatically</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="max-w-2xl">
          <div className="bg-bg-secondary rounded-lg border border-border-color p-6 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Email Notifications</h3>
            <div className="space-y-4">
              {Object.entries(notifications.email).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-text-muted">
                      {key === 'newDeals' && 'Get notified when new deals match your criteria'}
                      {key === 'priceChanges' && 'Alerts when property prices change'}
                      {key === 'marketUpdates' && 'Weekly market analysis and trends'}
                      {key === 'weeklyReports' && 'Weekly performance and portfolio summaries'}
                      {key === 'systemUpdates' && 'Platform updates and new features'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('email', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      value ? 'bg-accent-blue' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-secondary rounded-lg border border-border-color p-6 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">SMS Notifications</h3>
            <div className="space-y-4">
              {Object.entries(notifications.sms).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-text-muted">
                      {key === 'urgentDeals' && 'High-priority deals requiring immediate attention'}
                      {key === 'priceAlerts' && 'Significant price changes on watched properties'}
                      {key === 'systemAlerts' && 'Critical system notifications'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('sms', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      value ? 'bg-accent-blue' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-secondary rounded-lg border border-border-color p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Push Notifications</h3>
            <div className="space-y-4">
              {Object.entries(notifications.push).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-text-muted">
                      {key === 'newMatches' && 'When new properties match your criteria'}
                      {key === 'bidUpdates' && 'Updates on your offers and bids'}
                      {key === 'messages' && 'New messages from contacts and agents'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('push', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      value ? 'bg-accent-blue' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="max-w-2xl">
          <div className="bg-bg-secondary rounded-lg border border-border-color p-6 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Password & Security</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border border-border-color rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                />
              </div>
              
              <button className="flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
                  {/* <Key className="w-4 h-4" /> */}
                Update Password
              </button>
            </div>
          </div>

          <div className="bg-bg-secondary rounded-lg border border-border-color p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-text-primary">Enable 2FA</p>
                <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors duration-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-border-color rounded-lg">
                {/* <Smartphone className="w-5 h-5 text-text-muted" /> */}
                <div>
                  <p className="text-sm font-medium text-text-primary">Authenticator App</p>
                  <p className="text-xs text-text-muted">Use Google Authenticator or similar apps</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border-color rounded-lg">
                {/* <Phone className="w-5 h-5 text-text-muted" /> */}
                <div>
                  <p className="text-sm font-medium text-text-primary">SMS Verification</p>
                  <p className="text-xs text-text-muted">Receive codes via text message</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="max-w-2xl">
          <div className="bg-bg-secondary rounded-lg border border-border-color p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Billing & Subscription</h3>
            <div className="text-center py-8">
              <CreditCard className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-text-primary mb-2">Billing Management</h4>
              <p className="text-text-muted mb-4">Subscription management and billing details coming soon</p>
              <button className="bg-gradient-to-r from-accent-blue to-accent-purple text-white px-6 py-2 rounded-lg font-medium">
                Contact Sales
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