'use client'

import { 
  BarChart3, 
  TrendingUp, 
  Send, 
  MessageSquare, 
  Clock, 
  MoreHorizontal,
  Play,
  Pause,
  Settings,
  Eye,
  Plus,
  Home
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Campaign {
  id: string
  name: string
  properties: number
  offersSent: number
  responses: number
  responseRate: number
  lastActivity: string
  status: 'active' | 'paused' | 'completed'
}

interface CampaignDashboardProps {
  campaigns: Campaign[]
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-accent-green bg-accent-green/10 border-accent-green/20'
      case 'paused': return 'text-accent-orange bg-accent-orange/10 border-accent-orange/20'
      case 'completed': return 'text-text-muted bg-bg-tertiary border-border-color'
      default: return 'text-text-muted bg-bg-tertiary border-border-color'
    }
  }

  const getResponseRateColor = (rate: number) => {
    if (rate >= 20) return 'text-accent-green'
    if (rate >= 15) return 'text-accent-blue'
    if (rate >= 10) return 'text-accent-orange'
    return 'text-accent-red'
  }

  return (
    <tr className="border-b border-border-color last:border-b-0 hover:bg-bg-tertiary/30 transition-colors duration-200">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-text-primary">{campaign.name}</div>
            <div className="text-xs text-text-muted">Campaign #{campaign.id.slice(-4).toUpperCase()}</div>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-4 text-center">
        <div className="text-text-primary font-medium">{campaign.properties}</div>
      </td>
      
      <td className="py-4 px-4 text-center">
        <div className="text-text-primary font-medium">{campaign.offersSent}</div>
      </td>
      
      <td className="py-4 px-4 text-center">
        <div className="text-text-primary font-medium">{campaign.responses}</div>
      </td>
      
      <td className="py-4 px-4 text-center">
        <div className={cn("font-bold", getResponseRateColor(campaign.responseRate))}>
          {campaign.responseRate.toFixed(1)}%
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
          getStatusColor(campaign.status)
        )}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </div>
      </td>
      
      <td className="py-4 px-4 text-text-muted text-sm">
        {campaign.lastActivity}
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-text-muted hover:text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-colors">
            {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function CampaignDashboard({ campaigns }: CampaignDashboardProps) {
  const totalProperties = campaigns.reduce((sum, c) => sum + c.properties, 0)
  const totalOffersSent = campaigns.reduce((sum, c) => sum + c.offersSent, 0)
  const totalResponses = campaigns.reduce((sum, c) => sum + c.responses, 0)
  const avgResponseRate = totalOffersSent > 0 ? (totalResponses / totalOffersSent) * 100 : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent-blue" />
          Active Campaigns
        </h2>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Campaign Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-blue/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{campaigns.length}</div>
              <div className="text-sm text-text-muted">Active Campaigns</div>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-purple/10 rounded-lg">
              <Home className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{totalProperties}</div>
              <div className="text-sm text-text-muted">Total Properties</div>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-orange/10 rounded-lg">
              <Send className="w-5 h-5 text-accent-orange" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{totalOffersSent}</div>
              <div className="text-sm text-text-muted">Offers Sent</div>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-4 border border-border-color">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-green/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-green">{avgResponseRate.toFixed(1)}%</div>
              <div className="text-sm text-text-muted">Avg Response Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="bg-bg-secondary rounded-2xl border border-border-color overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-tertiary/50">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">
                  Campaign Name
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  Properties
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  Offers Sent
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  Responses
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  Response Rate
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">
                  Last Activity
                </th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <CampaignRow key={campaign.id} campaign={campaign} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No active campaigns</h3>
          <p className="text-text-muted mb-4">Create your first campaign to start sending offers at scale</p>
          <button className="px-6 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200">
            Create Campaign
          </button>
        </div>
      )}

      {/* Campaign Insights */}
      {campaigns.length > 0 && (
        <div className="mt-6 bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-2">Campaign Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Best Performing:</span>
              <span className="font-semibold text-text-primary ml-2">
                {campaigns.reduce((best, current) => 
                  current.responseRate > best.responseRate ? current : best
                ).name}
              </span>
            </div>
            <div>
              <span className="text-text-muted">Total Responses:</span>
              <span className="font-semibold text-accent-green ml-2">{totalResponses}</span>
            </div>
            <div>
              <span className="text-text-muted">Avg Deal Close Rate:</span>
              <span className="font-semibold text-accent-blue ml-2">
                {Math.round(avgResponseRate * 0.15)}% 
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 