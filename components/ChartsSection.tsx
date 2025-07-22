'use client'

import { TrendingUp, PieChart } from 'lucide-react'
import { useEffect, useState } from 'react'

function BarChart() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const data = [
    { month: 'Sep', values: [30, 20, 15] },
    { month: 'Oct', values: [45, 25, 20] },
    { month: 'Nov', values: [35, 30, 25] },
    { month: 'Dec', values: [50, 35, 30] },
  ]

  const colors = ['#3b82f6', '#10b981', '#8b5cf6'] // blue, green, purple
  const maxValue = 50

  return (
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg transition-all duration-300 h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-accent-blue" />
          <h3 className="text-xl font-bold text-text-primary">Deal Flow Over Time</h3>
        </div>
        <select className="px-4 py-2 text-sm bg-bg-tertiary border border-border-color rounded-lg text-text-secondary hover:bg-bg-primary transition-colors duration-200">
          <option>Monthly</option>
        </select>
      </div>

      <div className="h-64 flex items-end justify-between gap-4">
        {data.map((item, index) => (
          <div key={item.month} className="flex-1 flex flex-col items-center">
            <div className="w-full h-48 flex items-end justify-center gap-1">
              {item.values.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="flex-1 rounded-t-lg"
                  style={{
                    backgroundColor: colors[valueIndex],
                    height: isVisible ? `${(value / maxValue) * 100}%` : '0%',
                    transition: `height 1.5s ease-out ${index * 0.2 + valueIndex * 0.1}s`
                  }}
                />
              ))}
            </div>
            <span className="mt-3 text-sm font-medium text-text-secondary">{item.month}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        {['New Leads', 'Qualified', 'Closed'].map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm text-text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChart() {
  const data = [
    { label: 'Single Family', value: 45, color: '#3b82f6' },
    { label: 'Multi Family', value: 28, color: '#10b981' },
    { label: 'Commercial', value: 17, color: '#f59e0b' },
    { label: 'Land', value: 10, color: '#8b5cf6' },
  ]

  const radius = 60
  const centerX = 80
  const centerY = 80
  const circumference = 2 * Math.PI * radius

  let currentAngle = 0

  return (
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg transition-all duration-300 h-full">
      <div className="flex items-center gap-3 mb-8">
        <PieChart className="w-6 h-6 text-accent-green" />
        <h3 className="text-xl font-bold text-text-primary">Property Types</h3>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="160" height="160" className="transform -rotate-90">
            {data.map((item, index) => {
              const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`
              const strokeDashoffset = -currentAngle * (circumference / 100)
              currentAngle += item.value
              
              return (
                <circle
                  key={item.label}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    animation: `draw-line 2s ease-out ${index * 0.3}s forwards`
                  }}
                />
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 mt-6 w-full">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-primary">{item.label}</span>
                <span className="text-xs text-text-muted">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChartsSection() {
  // Vibrant AcquireFlow Color Palette for Charts
  const colors = ['#4f8fdf', '#77c57f', '#7c6bdf', '#ff8b5a', '#3b9db0', '#ffc947'] // ocean-blue, brand-green, royal-purple, warm-orange, deep-teal, bright-yellow

  // Property Types Donut Chart Data with Vibrant Colors
  const data = [
    { label: 'Single Family', value: 45, color: '#4f8fdf' }, // ocean-blue
    { label: 'Multi Family', value: 28, color: '#77c57f' }, // brand-green
    { label: 'Commercial', value: 17, color: '#ff8b5a' }, // warm-orange
    { label: 'Land', value: 10, color: '#7c6bdf' }, // royal-purple
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
      {/* Deal Flow Chart */}
      <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg transition-all duration-300 h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-ocean-blue" />
            <h3 className="text-xl font-bold text-text-primary">Deal Flow Over Time</h3>
          </div>
          <select className="px-4 py-2 text-sm bg-bg-tertiary border border-border-color rounded-lg text-text-secondary hover:bg-bg-primary transition-colors duration-200">
            <option>Monthly</option>
          </select>
        </div>

        {/* Vibrant Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-4">
          {['Sep', 'Oct', 'Nov', 'Dec'].map((month, monthIndex) => (
            <div key={month} className="flex-1 flex flex-col items-center">
              <div className="w-full h-48 flex items-end justify-center gap-1">
                {[0, 1, 2].map((barIndex) => {
                  const heights = [
                    [60, 45, 30], // Sep
                    [75, 50, 40], // Oct  
                    [85, 65, 50], // Nov
                    [70, 55, 45]  // Dec
                  ]
                  return (
                    <div
                      key={barIndex}
                      className="flex-1 rounded-t-lg"
                      style={{
                        backgroundColor: colors[barIndex],
                        height: `${heights[monthIndex][barIndex]}%`,
                        transition: 'height 1.5s ease-out',
                        transitionDelay: `${(monthIndex * 0.2) + (barIndex * 0.1)}s`
                      }}
                    />
                  )
                })}
              </div>
              <span className="mt-3 text-sm font-medium text-text-secondary">{month}</span>
            </div>
          ))}
        </div>

        {/* Vibrant Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#4f8fdf' }}></div>
            <span className="text-sm text-text-muted">New Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#77c57f' }}></div>
            <span className="text-sm text-text-muted">Qualified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#7c6bdf' }}></div>
            <span className="text-sm text-text-muted">Closed</span>
          </div>
        </div>
      </div>

      {/* Property Types Donut Chart */}
      <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-8">
          <PieChart className="w-6 h-6 text-brand-green" />
          <h3 className="text-xl font-bold text-text-primary">Property Types</h3>
        </div>

        <div className="flex flex-col items-center">
          {/* Vibrant Donut Chart */}
          <div className="relative">
            <svg width="160" height="160" className="transform -rotate-90">
              {data.map((item, index) => {
                const total = data.reduce((sum, d) => sum + d.value, 0)
                const percentage = (item.value / total) * 100
                const circumference = 2 * Math.PI * 60
                const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
                const strokeDashoffset = data.slice(0, index).reduce((offset, d) => {
                  return offset - ((d.value / total) * circumference)
                }, 0)

                return (
                  <circle
                    key={index}
                    cx="80"
                    cy="80"
                    r="60"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="12"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      animation: `draw-line 2s ease-out ${index * 0.3}s forwards`
                    }}
                  />
                )
              })}
            </svg>
          </div>

          {/* Vibrant Legend Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 w-full">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text-primary">{item.label}</span>
                  <span className="text-xs text-text-muted">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 