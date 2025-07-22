'use client'

import { useState } from 'react'
import { 
  Send, 
  Settings, 
  Target, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  Plus,
  Calendar,
  DollarSign,
  FileText,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Property {
  id: string
  address: string
  city: string
  price: number
  strategyMetrics: any
}

interface OfferGenerationPanelProps {
  selectedProperties: string[]
  selectedStrategy: string
  properties: Property[]
}

export default function OfferGenerationPanel({ 
  selectedProperties, 
  selectedStrategy, 
  properties 
}: OfferGenerationPanelProps) {
  const [offerStrategy, setOfferStrategy] = useState('cash')
  const [offerPercentage, setOfferPercentage] = useState(85)
  const [closingDays, setClosingDays] = useState(30)
  const [selectedTemplate, setSelectedTemplate] = useState('standard')
  const [customMessage, setCustomMessage] = useState('')
  const [sendingSchedule, setSendingSchedule] = useState('immediate')

  const selectedProps = properties.filter(p => selectedProperties.includes(p.id))
  const totalValue = selectedProps.reduce((sum, p) => sum + p.price, 0)
  const avgOfferAmount = Math.round((totalValue * offerPercentage / 100) / selectedProps.length)

  const templates = [
    { id: 'standard', name: 'Standard Cash Offer', success: 18.2 },
    { id: 'motivated', name: 'Motivated Seller', success: 24.7 },
    { id: 'quick-close', name: 'Quick Close', success: 21.3 },
    { id: 'flexible', name: 'Flexible Terms', success: 19.8 },
    { id: 'off-market', name: 'Off-Market Deal', success: 26.1 }
  ]

  const aiSuggestions = [
    {
      type: 'pricing',
      title: 'Optimal Offer Amount',
      description: `AI suggests ${offerPercentage}% of list price for ${selectedStrategy} deals`,
      confidence: 87
    },
    {
      type: 'timing',
      title: 'Best Send Time',
      description: 'Tuesday 10-11 AM shows 23% higher response rates',
      confidence: 79
    },
    {
      type: 'template',
      title: 'Template Match',
      description: `"${templates.find(t => t.id === selectedTemplate)?.name}" has highest success for this market`,
      confidence: 92
    }
  ]

  const handleGenerateOffers = () => {
    console.log('Generating offers for:', {
      properties: selectedProperties,
      strategy: selectedStrategy,
      offerType: offerStrategy,
      percentage: offerPercentage,
      template: selectedTemplate,
      schedule: sendingSchedule
    })
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-border-color">
        <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Send className="w-5 h-5 text-accent-blue" />
          Offer Generation
        </h2>
        <p className="text-sm text-text-muted mt-1">
          {selectedProperties.length} properties selected
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Selected Properties Summary */}
        {selectedProperties.length > 0 && (
          <div className="p-4 bg-accent-blue/5 border border-accent-blue/20 rounded-lg">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Selection Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Properties:</span>
                <span className="text-text-primary font-medium">{selectedProperties.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Total Value:</span>
                <span className="text-text-primary font-medium">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Avg Offer:</span>
                <span className="text-accent-blue font-medium">${avgOfferAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Offer Strategy */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Offer Strategy
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Offer Type
              </label>
              <select 
                value={offerStrategy}
                onChange={(e) => setOfferStrategy(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value="cash">Cash Offer</option>
                <option value="financing">Conventional Financing</option>
                <option value="subject-to">Subject To</option>
                <option value="seller-finance">Seller Financing</option>
                <option value="lease-option">Lease Option</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Offer Amount: {offerPercentage}% of List Price
              </label>
              <input
                type="range"
                min="60"
                max="100"
                value={offerPercentage}
                onChange={(e) => setOfferPercentage(parseInt(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-text-muted mt-1">
                <span>60%</span>
                <span>80%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Closing Timeline
              </label>
              <select 
                value={closingDays}
                onChange={(e) => setClosingDays(parseInt(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                <option value={14}>14 Days (Fast Close)</option>
                <option value={21}>21 Days</option>
                <option value={30}>30 Days (Standard)</option>
                <option value={45}>45 Days (Flexible)</option>
                <option value={60}>60 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Offer Template
          </h3>
          
          <div className="space-y-2">
            {templates.map((template) => (
              <label 
                key={template.id}
                className={cn(
                  "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200",
                  selectedTemplate === template.id
                    ? "border-accent-blue bg-accent-blue/5"
                    : "border-border-color hover:bg-bg-tertiary"
                )}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={selectedTemplate === template.id}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="text-accent-blue focus:ring-accent-blue"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{template.name}</div>
                    <div className="text-xs text-accent-green">{template.success}% success rate</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Personal Message */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Personal Message</h3>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add a personal touch to your offers..."
            rows={3}
            className="w-full px-3 py-2 bg-bg-primary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
          />
        </div>

        {/* Sending Schedule */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Sending Schedule
          </h3>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-tertiary">
              <input
                type="radio"
                name="schedule"
                value="immediate"
                checked={sendingSchedule === 'immediate'}
                onChange={(e) => setSendingSchedule(e.target.value)}
                className="text-accent-blue focus:ring-accent-blue"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Send Immediately</div>
                <div className="text-xs text-text-muted">Send all offers right now</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-tertiary">
              <input
                type="radio"
                name="schedule"
                value="optimal"
                checked={sendingSchedule === 'optimal'}
                onChange={(e) => setSendingSchedule(e.target.value)}
                className="text-accent-blue focus:ring-accent-blue"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Optimal Timing</div>
                <div className="text-xs text-text-muted">Tuesday 10-11 AM (AI recommended)</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-tertiary">
              <input
                type="radio"
                name="schedule"
                value="custom"
                checked={sendingSchedule === 'custom'}
                onChange={(e) => setSendingSchedule(e.target.value)}
                className="text-accent-blue focus:ring-accent-blue"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Custom Schedule</div>
                <div className="text-xs text-text-muted">Choose specific date and time</div>
              </div>
            </label>
          </div>
        </div>

        {/* AI Suggestions */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            AI Optimization
          </h3>
          
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-bg-primary border border-border-color rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-text-primary">{suggestion.title}</h4>
                  <span className="text-xs text-accent-green font-medium">{suggestion.confidence}%</span>
                </div>
                <p className="text-xs text-text-muted">{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Offers Button */}
        <div className="space-y-3">
          <button 
            onClick={handleGenerateOffers}
            disabled={selectedProperties.length === 0}
            className={cn(
              "w-full px-4 py-3 rounded-lg font-medium transition-all duration-200",
              selectedProperties.length > 0
                ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg"
                : "bg-bg-tertiary text-text-muted cursor-not-allowed"
            )}
          >
            {selectedProperties.length > 0 
              ? `Generate ${selectedProperties.length} Offer${selectedProperties.length > 1 ? 's' : ''}`
              : 'Select Properties to Generate Offers'
            }
          </button>

          {selectedProperties.length > 0 && (
            <div className="text-center">
              <div className="text-xs text-text-muted">
                Estimated success rate: <span className="text-accent-green font-medium">
                  {templates.find(t => t.id === selectedTemplate)?.success}%
                </span>
              </div>
              <div className="text-xs text-text-muted">
                Expected responses: <span className="text-accent-blue font-medium">
                  {Math.round(selectedProperties.length * (templates.find(t => t.id === selectedTemplate)?.success || 20) / 100)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 