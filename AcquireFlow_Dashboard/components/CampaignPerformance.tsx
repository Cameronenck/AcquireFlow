'use client'

import { BarChart3 } from 'lucide-react'

interface Campaign {
  name: string
  responseRate: number
  sent: number
  responses: number
}

export default function CampaignPerformance() {
  const campaigns = [
    {
      name: 'Lancaster Wholesale Q1',
      sent: 12,
      responses: 8,
      rate: 67,
      color: 'ocean-blue' // Color coding for performance levels
    },
    {
      name: 'York Rental Properties',
      sent: 5,
      responses: 3,
      rate: 60,
      color: 'brand-green'
    },
    {
      name: 'Multi-Family Campaign',
      sent: 8,
      responses: 6,
      rate: 75,
      color: 'royal-purple'
    }
  ]

  return (
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border-color">
        <BarChart3 className="w-6 h-6 text-warm-orange" />
        <h3 className="text-xl font-bold text-text-primary">Campaign Performance</h3>
      </div>

      {/* Campaign List */}
      <div className="space-y-6">
        {campaigns.map((campaign, index) => (
          <div key={index} className="flex items-start justify-between p-4 rounded-xl hover:bg-bg-tertiary/50 transition-all duration-200 cursor-pointer group border border-transparent hover:border-border-color">
            <div className="flex-1">
              <h4 className={`font-semibold text-text-primary text-base group-hover:text-${campaign.color} transition-colors duration-200 mb-2`}>
                {campaign.name}
              </h4>
              <p className="text-sm text-text-muted">
                {campaign.sent} sent • {campaign.responses} responses
              </p>
            </div>
            <div className="text-right ml-6 flex flex-col items-end">
              <span className={`text-2xl font-bold text-${campaign.color} mb-1`}>
                {campaign.rate}%
              </span>
              <span className="text-xs text-text-muted uppercase tracking-wide">Response</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border-color">
                  <button className="w-full px-4 py-2.5 bg-gradient-to-r from-warm-orange to-royal-purple text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm font-semibold">
          View All Campaigns
        </button>
      </div>
    </div>
  )
} 