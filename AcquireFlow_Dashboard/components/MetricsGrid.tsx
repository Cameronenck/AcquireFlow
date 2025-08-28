'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down'
  color: 'ocean-blue' | 'brand-green' | 'deep-teal' | 'warm-orange'
  sparklineData: number[]
}

function MetricCard({ title, value, change, trend, color, sparklineData }: MetricCardProps) {
  const colorClasses = {
    'ocean-blue': "bg-ocean-blue",
    'brand-green': "bg-brand-green", 
    'deep-teal': "bg-deep-teal",
    'warm-orange': "bg-warm-orange"
  }

  const colorVars = {
    'ocean-blue': "var(--ocean-blue)",
    'brand-green': "var(--brand-green)",
    'deep-teal': "var(--deep-teal)", 
    'warm-orange': "var(--warm-orange)"
  }

  return (
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group h-full">
      <div className={cn(
        "w-3 h-3 rounded-full pulse-icon absolute top-6 right-6",
        colorClasses[color]
      )}></div>
      
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-text-primary leading-none">{value}</span>
          <div className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg text-success bg-success/10">
            <ArrowUp className="w-4 h-4" />
            {change}
          </div>
        </div>
      </div>

      {/* Vibrant Sparkline */}
      <div className="absolute bottom-4 right-4 w-16 h-8 opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          <path
            d={`M ${sparklineData.map((point, index) => 
              `${(index / (sparklineData.length - 1)) * 100},${100 - point}`
            ).join(' L ')}`}
            fill="none"
            stroke={colorVars[color]}
            strokeWidth="3"
            className="animate-draw-line"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: 200,
              animation: 'draw-line 2s ease-out forwards'
            }}
          />
        </svg>
      </div>
    </div>
  )
}

export default function MetricsGrid() {
  const metrics = [
    {
      title: 'Active Properties',
      value: 247,
      change: '+18%',
      trend: 'up' as const,
      color: 'ocean-blue' as const,
      sparklineData: [20, 45, 30, 60, 40, 75, 65, 85, 70, 90]
    },
    {
      title: 'LOIs Sent', 
      value: 28,
      change: '+12%',
      trend: 'up' as const,
      color: 'brand-green' as const,
      sparklineData: [10, 35, 25, 50, 30, 65, 45, 80, 60, 85]
    },
    {
      title: 'LOIs Response Rate',
      value: '89%',
      change: '+5%', 
      trend: 'up' as const,
      color: 'deep-teal' as const,
      sparklineData: [15, 40, 35, 55, 45, 70, 50, 75, 65, 85]
    },
    {
      title: 'Hot Leads',
      value: 12,
      change: '+3',
      trend: 'up' as const,
      color: 'warm-orange' as const,
      sparklineData: [25, 50, 40, 65, 35, 70, 55, 85, 70, 90]
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
} 