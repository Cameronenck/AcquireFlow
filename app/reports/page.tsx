'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { initializeTheme } from '@/lib/utils'

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    initializeTheme()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="ml-70">
        <Header />
        <div className="p-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-text-secondary">Investment performance and analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-secondary"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary hover:bg-bg-tertiary border border-border-color rounded-lg text-text-secondary hover:text-text-primary transition-colors duration-200">
                📄 Export PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ocean-blue to-royal-purple text-white rounded-lg hover:shadow-lg transition-all duration-200">
                📊 Generate Report
              </button>
            </div>
          </div>

          {/* Portfolio Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-ocean-blue"></div>
                  <span className="text-sm font-medium text-text-muted">Total Portfolio Value</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">$3.2M</div>
              <div className="flex items-center gap-1 text-sm font-medium text-brand-green">
                +12% ↗
              </div>
            </div>

            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                  <span className="text-sm font-medium text-text-muted">Monthly Cash Flow</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">$8,450</div>
              <div className="flex items-center gap-1 text-sm font-medium text-brand-green">
                +5% ↗
              </div>
            </div>

            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-royal-purple"></div>
                  <span className="text-sm font-medium text-text-muted">Average ROI</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">18.5%</div>
              <div className="flex items-center gap-1 text-sm font-medium text-warm-orange">
                -2% ↘
              </div>
            </div>

            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-warm-orange"></div>
                  <span className="text-sm font-medium text-text-muted">Active Deals</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">247</div>
              <div className="flex items-center gap-1 text-sm font-medium text-brand-green">
                +18% ↗
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  <h3 className="text-lg font-semibold text-text-primary">Portfolio Performance Over Time</h3>
                </div>
                <span className="text-sm text-text-muted">Monthly</span>
              </div>
              <div className="h-64 flex items-center justify-center text-text-muted bg-bg-tertiary rounded-lg">
                Portfolio performance chart will go here
              </div>
            </div>

            <div className="bg-bg-secondary rounded-2xl p-6 border border-border-color">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  <h3 className="text-lg font-semibold text-text-primary">Investment Distribution</h3>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center text-text-muted bg-bg-tertiary rounded-lg">
                Investment distribution chart will go here
              </div>
            </div>
          </div>

          {/* Property Performance Table */}
          <div className="bg-bg-secondary rounded-2xl border border-border-color overflow-hidden mb-8">
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">Property Performance</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                View All →
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg-tertiary/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Property</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Purchase Price</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Current Value</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Monthly Cash Flow</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">ROI</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-color hover:bg-bg-tertiary/30 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏠</span>
                        <div>
                          <h4 className="font-medium text-text-primary">1935 Hemlock Rd</h4>
                          <p className="text-sm text-text-muted">Lancaster, PA 17603</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-text-primary">$275,000</td>
                    <td className="py-4 px-6 font-semibold text-text-primary">$320,000</td>
                    <td className="py-4 px-6 font-semibold text-accent-green">$485</td>
                    <td className="py-4 px-6 font-semibold text-accent-green">14.2%</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Performing
                      </span>
                    </td>
                  </tr>

                  <tr className="border-b border-border-color hover:bg-bg-tertiary/30 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏢</span>
                        <div>
                          <h4 className="font-medium text-text-primary">664 Poplar St</h4>
                          <p className="text-sm text-text-muted">Lancaster, PA 17603</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-text-primary">$189,500</td>
                    <td className="py-4 px-6 font-semibold text-text-primary">$215,000</td>
                    <td className="py-4 px-6 font-semibold text-accent-green">$320</td>
                    <td className="py-4 px-6 font-semibold text-accent-green">16.8%</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Under Review
                      </span>
                    </td>
                  </tr>

                  <tr className="border-b border-border-color hover:bg-bg-tertiary/30 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🏘️</span>
                        <div>
                          <h4 className="font-medium text-text-primary">531 Lafayette St</h4>
                          <p className="text-sm text-text-muted">Lancaster, PA 17603</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-text-primary">$312,900</td>
                    <td className="py-4 px-6 font-semibold text-text-primary">$345,000</td>
                    <td className="py-4 px-6 font-semibold text-accent-green">$420</td>
                    <td className="py-4 px-6 font-semibold text-accent-green">12.4%</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Performing
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Report Generation Section */}
          <div className="bg-bg-secondary rounded-2xl border border-border-color overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">Generate Custom Reports</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <div className="bg-bg-primary rounded-lg p-6 border border-border-color cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-accent-blue"></div>
                  <span className="font-medium text-text-primary">Portfolio Summary</span>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Complete overview of all properties and performance
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  Generate →
                </button>
              </div>

              <div className="bg-bg-primary rounded-lg p-6 border border-border-color cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                  <span className="font-medium text-text-primary">Tax Report</span>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Detailed report for tax preparation and filing
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  Generate →
                </button>
              </div>

              <div className="bg-bg-primary rounded-lg p-6 border border-border-color cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-accent-purple"></div>
                  <span className="font-medium text-text-primary">Market Analysis</span>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Market trends and investment opportunities
                </p>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                  Generate →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 