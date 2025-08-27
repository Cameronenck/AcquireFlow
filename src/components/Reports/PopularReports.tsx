import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Map, ExternalLink, Download, Clock, Users, DollarSign } from 'lucide-react';
export const PopularReports = () => {
  const popularReports = [{
    title: 'Campaign Performance Overview',
    description: 'Key metrics across all active campaigns',
    views: 128,
    lastViewed: '2 hours ago',
    type: 'bar',
    color: 'bg-primary'
  }, {
    title: 'Revenue Forecast',
    description: 'Projected revenue for next 6 months',
    views: 95,
    lastViewed: 'Yesterday',
    type: 'line',
    color: 'bg-tertiary'
  }, {
    title: 'Market Opportunity Map',
    description: 'Geographic visualization of investment opportunities',
    views: 87,
    lastViewed: '3 days ago',
    type: 'map',
    color: 'bg-secondary'
  }, {
    title: 'Lead Source Analysis',
    description: 'Conversion rates by lead generation channel',
    views: 76,
    lastViewed: '1 day ago',
    type: 'pie',
    color: 'bg-indigo-500'
  }, {
    title: 'Team Performance',
    description: 'Productivity metrics by team member',
    views: 64,
    lastViewed: '4 days ago',
    type: 'bar',
    color: 'bg-gray-700'
  }, {
    title: 'ROI Comparison',
    description: 'ROI analysis across different investment types',
    views: 59,
    lastViewed: '2 days ago',
    type: 'bar',
    color: 'bg-green-600'
  }];
  const renderIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart size={20} />;
      case 'line':
        return <LineChart size={20} />;
      case 'pie':
        return <PieChart size={20} />;
      case 'map':
        return <Map size={20} />;
      default:
        return <BarChart size={20} />;
    }
  };
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-dark">Popular Reports</h2>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularReports.map((report, index) => <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${report.color} text-white`}>
                {renderIcon(report.type)}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                {report.lastViewed}
              </div>
            </div>
            <h3 className="font-medium mt-3 text-dark">{report.title}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
              {report.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {report.views} views
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
    </div>;
};