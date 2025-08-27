import React, { useState } from 'react';
import { BarChart, PieChart, LineChart, DollarSign, Map, Users, Clock, TrendingUp, Calendar, ChevronRight, FileText, Download, ExternalLink, Star } from 'lucide-react';
type ReportCategoriesProps = {
  fullView?: boolean;
};
export const ReportCategories = ({
  fullView = false
}: ReportCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState('campaign');
  const categories = [{
    id: 'campaign',
    name: 'Campaign Performance',
    icon: <BarChart size={20} />,
    description: 'ROI, response rates, conversion metrics',
    color: 'bg-primary'
  }, {
    id: 'market',
    name: 'Market Analysis',
    icon: <TrendingUp size={20} />,
    description: 'Trends, comparisons, forecasts',
    color: 'bg-tertiary'
  }, {
    id: 'financial',
    name: 'Financial Reports',
    icon: <DollarSign size={20} />,
    description: 'Revenue, expenses, profitability',
    color: 'bg-secondary'
  }, {
    id: 'operational',
    name: 'Operational Reports',
    icon: <Clock size={20} />,
    description: 'Efficiency, productivity, goals',
    color: 'bg-gray-700'
  }, {
    id: 'custom',
    name: 'Custom Reports',
    icon: <FileText size={20} />,
    description: 'User-defined metrics and visualizations',
    color: 'bg-indigo-500'
  }];
  const reports = {
    campaign: [{
      title: 'Campaign ROI Analysis',
      description: 'Detailed ROI breakdown by campaign type and region',
      updated: '2 days ago',
      type: 'chart',
      chartType: 'bar',
      starred: true
    }, {
      title: 'Response Rate Trends',
      description: 'Monthly response rates across all campaigns',
      updated: '1 week ago',
      type: 'chart',
      chartType: 'line',
      starred: false
    }, {
      title: 'Conversion Funnel',
      description: 'Conversion metrics at each stage of the funnel',
      updated: '3 days ago',
      type: 'chart',
      chartType: 'funnel',
      starred: true
    }, {
      title: 'Campaign Comparison',
      description: 'Side-by-side comparison of campaign performance',
      updated: '5 days ago',
      type: 'chart',
      chartType: 'bar',
      starred: false
    }],
    market: [{
      title: 'Market Trend Analysis',
      description: 'Real estate market trends by region',
      updated: '1 day ago',
      type: 'chart',
      chartType: 'line',
      starred: true
    }, {
      title: 'Competitive Landscape',
      description: 'Analysis of competitor activities and market share',
      updated: '2 weeks ago',
      type: 'chart',
      chartType: 'pie',
      starred: false
    }, {
      title: 'Regional Price Heatmap',
      description: 'Geographic visualization of property prices',
      updated: '4 days ago',
      type: 'map',
      chartType: 'heatmap',
      starred: true
    }, {
      title: 'Market Forecast',
      description: '6-month prediction of market trends',
      updated: '1 week ago',
      type: 'chart',
      chartType: 'line',
      starred: false
    }],
    financial: [{
      title: 'Revenue Breakdown',
      description: 'Revenue sources and growth trends',
      updated: 'Yesterday',
      type: 'chart',
      chartType: 'pie',
      starred: true
    }, {
      title: 'Expense Analysis',
      description: 'Detailed breakdown of operational expenses',
      updated: '3 days ago',
      type: 'chart',
      chartType: 'bar',
      starred: false
    }, {
      title: 'Profit Margin Trends',
      description: 'Monthly profit margin analysis',
      updated: '1 week ago',
      type: 'chart',
      chartType: 'line',
      starred: true
    }, {
      title: 'Cash Flow Statement',
      description: 'Comprehensive cash flow analysis',
      updated: '2 days ago',
      type: 'table',
      chartType: null,
      starred: false
    }],
    operational: [{
      title: 'Team Productivity',
      description: 'Productivity metrics by team and individual',
      updated: '2 days ago',
      type: 'chart',
      chartType: 'bar',
      starred: false
    }, {
      title: 'Task Completion Rate',
      description: 'Task completion metrics and trends',
      updated: 'Yesterday',
      type: 'chart',
      chartType: 'line',
      starred: true
    }, {
      title: 'Goal Tracking',
      description: 'Progress towards quarterly and annual goals',
      updated: '3 days ago',
      type: 'chart',
      chartType: 'gauge',
      starred: true
    }, {
      title: 'Process Efficiency',
      description: 'Analysis of operational process efficiency',
      updated: '1 week ago',
      type: 'chart',
      chartType: 'bar',
      starred: false
    }],
    custom: [{
      title: 'Custom Dashboard',
      description: 'Personalized metrics dashboard',
      updated: 'Yesterday',
      type: 'dashboard',
      chartType: null,
      starred: true
    }, {
      title: 'Investment Opportunity Score',
      description: 'Custom scoring model for investment opportunities',
      updated: '3 days ago',
      type: 'chart',
      chartType: 'scatter',
      starred: true
    }, {
      title: 'Lead Quality Analysis',
      description: 'Custom lead quality metrics and scoring',
      updated: '5 days ago',
      type: 'chart',
      chartType: 'bar',
      starred: false
    }, {
      title: 'Portfolio Performance',
      description: 'Custom portfolio performance metrics',
      updated: '1 week ago',
      type: 'chart',
      chartType: 'line',
      starred: false
    }]
  };
  const renderChartIcon = (chartType: string | null) => {
    switch (chartType) {
      case 'bar':
        return <BarChart size={16} className="text-primary" />;
      case 'line':
        return <LineChart size={16} className="text-tertiary-dark" />;
      case 'pie':
        return <PieChart size={16} className="text-secondary" />;
      case 'heatmap':
        return <Map size={16} className="text-green-600" />;
      case 'funnel':
        return <TrendingUp size={16} className="text-indigo-500" />;
      case 'gauge':
        return <Clock size={16} className="text-orange-500" />;
      case 'scatter':
        return <Users size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar">
          {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-6 py-4 flex items-center whitespace-nowrap transition-colors ${activeCategory === category.id ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-900'}`}>
              <span className={`p-1.5 rounded-lg mr-2 ${category.color} text-white`}>
                {category.icon}
              </span>
              <span className="font-medium">{category.name}</span>
            </button>)}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-dark">
              {categories.find(c => c.id === activeCategory)?.name} Reports
            </h2>
            <p className="text-gray-500 text-sm">
              {categories.find(c => c.id === activeCategory)?.description}
            </p>
          </div>
          <button className="flex items-center text-primary text-sm font-medium hover:underline">
            View All <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reports[activeCategory as keyof typeof reports].slice(0, fullView ? undefined : 4).map((report, index) => <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-gray-100">
                    {renderChartIcon(report.chartType)}
                  </div>
                  <button className="text-gray-400 hover:text-primary">
                    {report.starred ? <Star size={16} className="fill-tertiary text-tertiary" /> : <Star size={16} />}
                  </button>
                </div>
                <h3 className="font-medium mt-3 text-dark">{report.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {report.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Updated {report.updated}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                      <Download size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>)}
        </div>
        {fullView && <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recently Updated</h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.values(reports).flat().sort((a, b) => {
                // Sort by updated date (simple string comparison for this demo)
                return a.updated.localeCompare(b.updated);
              }).slice(0, 5).map((report, index) => <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-gray-100 rounded-lg">
                              {renderChartIcon(report.chartType)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {report.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {Object.entries(reports).find(([key, reports]) => reports.some(r => r.title === report.title))?.[0] || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.updated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                              <Download size={14} />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                              <ExternalLink size={14} />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                              {report.starred ? <Star size={14} className="fill-tertiary text-tertiary" /> : <Star size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>)}
                </tbody>
              </table>
            </div>
          </div>}
      </div>
    </div>;
};