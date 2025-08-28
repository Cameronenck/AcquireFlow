'use client'

import { useState } from 'react'
import { 
  X, 
  Send, 
  Target, 
  Clock, 
  FileText,
  Zap,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Property {
  id: string
  address: string
  city: string
  state: string
  price: number
  strategyMetrics: any
}

interface OfferGenerationModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProperties: string[]
  properties: Property[]
  selectedStrategy: string
}

const templates = [
  { id: 'standard', name: 'Standard Cash Offer', success: 18.2 },
  { id: 'motivated', name: 'Motivated Seller', success: 24.7 },
  { id: 'quick-close', name: 'Quick Close', success: 21.3 },
  { id: 'flexible', name: 'Flexible Terms', success: 19.8 },
  { id: 'off-market', name: 'Off-Market Deal', success: 26.1 }
]

export default function OfferGenerationModal({
  isOpen,
  onClose,
  selectedProperties,
  properties,
  selectedStrategy
}: OfferGenerationModalProps) {
  const [offerStrategy, setOfferStrategy] = useState('cash')
  const [offerPercentage, setOfferPercentage] = useState(85)
  const [closingDays, setClosingDays] = useState(30)
  const [selectedTemplate, setSelectedTemplate] = useState('standard')
  const [customMessage, setCustomMessage] = useState('')
  const [sendingSchedule, setSendingSchedule] = useState('immediate')

  const selectedProps = properties.filter(p => selectedProperties.includes(p.id))
  const totalValue = selectedProps.reduce((sum, p) => sum + p.price, 0)

  const handleGenerate = () => {
    console.log('Generating offers for:', {
      properties: selectedProperties,
      strategy: offerStrategy,
      percentage: offerPercentage,
      template: selectedTemplate,
      schedule: sendingSchedule
    })
    // TODO: Implement actual offer generation
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-primary rounded-2xl border border-border-color max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h2 className="text-xl font-semibold text-text-primary">
            Generate Offers for {selectedProperties.length} Properties
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Selected Properties Summary */}
          <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-3">Selected Properties:</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedProps.map((property) => (
                <div key={property.id} className="flex justify-between text-sm">
                  <span className="text-text-primary">{property.address}</span>
                  <span className="text-text-muted">${property.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-accent-blue/20 flex justify-between font-semibold">
              <span className="text-text-primary">Total Value:</span>
              <span className="text-accent-blue">${totalValue.toLocaleString()}</span>
            </div>
          </div>

          {/* Offer Strategy */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-blue" />
              Offer Strategy
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { id: 'cash', name: 'Cash Offer' },
                { id: 'subject-to', name: 'Subject To' },
                { id: 'seller-finance', name: 'Seller Finance' },
                { id: 'financing', name: 'Financing' }
              ].map((strategy) => (
                <label key={strategy.id} className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors">
                  <input
                    type="radio"
                    name="strategy"
                    value={strategy.id}
                    checked={offerStrategy === strategy.id}
                    onChange={(e) => setOfferStrategy(e.target.value)}
                    className="text-accent-blue focus:ring-accent-blue"
                  />
                  <span className="text-text-primary font-medium">{strategy.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Offer Amount */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Offer Amount</h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-accent-blue bg-accent-blue/5 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="amount"
                  checked={true}
                  className="text-accent-blue focus:ring-accent-blue"
                />
                <div className="flex-1">
                  <div className="font-medium text-text-primary">
                    {offerPercentage}% of List Price (AI Recommended)
                  </div>
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
              </label>

              <label className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors">
                <input
                  type="radio"
                  name="amount"
                  className="text-accent-blue focus:ring-accent-blue"
                />
                <span className="text-text-primary">Custom Amount</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-secondary transition-colors">
                <input
                  type="radio"
                  name="amount"
                  className="text-accent-blue focus:ring-accent-blue"
                />
                <span className="text-text-primary">Per Property</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Template */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-blue" />
                Template
              </h3>
              
              <select 
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue"
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              
              <div className="mt-2 text-sm text-accent-green">
                {templates.find(t => t.id === selectedTemplate)?.success}% success rate
              </div>
            </div>

            {/* Send Timing */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-blue" />
                Send Timing
              </h3>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="timing"
                    value="immediate"
                    checked={sendingSchedule === 'immediate'}
                    onChange={(e) => setSendingSchedule(e.target.value)}
                    className="text-accent-blue focus:ring-accent-blue"
                  />
                  <span className="text-text-primary">Send Immediately</span>
                </label>
                
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="timing"
                    value="optimal"
                    checked={sendingSchedule === 'optimal'}
                    onChange={(e) => setSendingSchedule(e.target.value)}
                    className="text-accent-blue focus:ring-accent-blue"
                  />
                  <div>
                    <div className="text-text-primary">Optimal Time</div>
                    <div className="text-text-muted text-xs">(Tue 10-11 AM)</div>
                  </div>
                </label>
                
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="timing"
                    value="custom"
                    checked={sendingSchedule === 'custom'}
                    onChange={(e) => setSendingSchedule(e.target.value)}
                    className="text-accent-blue focus:ring-accent-blue"
                  />
                  <span className="text-text-primary">Custom Schedule</span>
                </label>
              </div>
            </div>
          </div>

          {/* Personal Message */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Personal Message (Optional)</h3>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="I'm interested in making a cash offer on your property..."
              rows={3}
              className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
            />
          </div>

          {/* AI Optimization */}
          <div className="bg-accent-green/5 border border-accent-green/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-accent-green" />
              <span className="font-semibold text-text-primary">AI Optimization</span>
            </div>
            <p className="text-sm text-text-muted">
              89% confidence these offers will get responses based on market analysis and property characteristics.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border-color">
          <button
            onClick={onClose}
            className="px-6 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
          >
            <Send className="w-4 h-4" />
            Generate & Send Offers
          </button>
        </div>
      </div>
    </div>
  )
} 