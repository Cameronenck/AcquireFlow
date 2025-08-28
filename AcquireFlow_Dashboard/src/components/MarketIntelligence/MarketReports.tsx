import React from 'react';
import { FileText, Download, LineChart, BarChart, Bookmark, Star, ChevronRight, Calendar, AlertTriangle, TrendingUp, PieChart, ArrowUpRight } from 'lucide-react';
export const MarketReports = ({
  selectedMarket,
  timeRange
}) => {
  const marketReports = [{
    title: 'Quarterly Market Analysis',
    description: `Comprehensive analysis of ${selectedMarket} real estate trends and forecasts`,
    date: 'July 2023',
    type: 'quarterly',
    pages: 24,
    premium: false,
    image: 'https://source.unsplash.com/random/300x200/?chart,report'
  }, {
    title: 'Investment Opportunity Report',
    description: `Top investment areas in ${selectedMarket} with ROI projections`,
    date: 'August 2023',
    type: 'special',
    pages: 18,
    premium: true,
    image: 'https://source.unsplash.com/random/300x200/?investment,chart'
  }, {
    title: 'Neighborhood Price Analysis',
    description: `Detailed price trends by neighborhood in ${selectedMarket}`,
    date: 'July 2023',
    type: 'monthly',
    pages: 15,
    premium: false,
    image: 'https://source.unsplash.com/random/300x200/?neighborhood,map'
  }, {
    title: 'Market Risk Assessment',
    description: `Risk analysis and volatility metrics for ${selectedMarket}`,
    date: 'August 2023',
    type: 'special',
    pages: 12,
    premium: true,
    image: 'https://source.unsplash.com/random/300x200/?risk,chart'
  }];
  const cmaSummary = {
    medianPrice: '$375,000',
    averagePrice: '$412,500',
    pricePerSqFt: '$215',
    averageDaysOnMarket: 18,
    comparableProperties: 24,
    confidenceScore: 92
  };
  const investmentOpportunities = [{
    area: 'Downtown',
    score: 87,
    capRate: '6.8%',
    cashOnCash: '8.2%',
    priceRange: '$350K-$450K',
    propertyType: 'Condo',
    riskLevel: 'Medium'
  }, {
    area: 'Westside',
    score: 92,
    capRate: '7.4%',
    cashOnCash: '9.1%',
    priceRange: '$280K-$350K',
    propertyType: 'Single Family',
    riskLevel: 'Low'
  }, {
    area: 'Lakefront',
    score: 84,
    capRate: '6.2%',
    cashOnCash: '7.8%',
    priceRange: '$450K-$600K',
    propertyType: 'Single Family',
    riskLevel: 'Medium'
  }];
  const riskFactors = [{
    factor: 'Price Volatility',
    score: 32,
    level: 'Low'
  }, {
    factor: 'Inventory Risk',
    score: 45,
    level: 'Medium'
  }, {
    factor: 'Market Liquidity',
    score: 28,
    level: 'Low'
  }, {
    factor: 'Economic Dependency',
    score: 52,
    level: 'Medium'
  }, {
    factor: 'Natural Hazards',
    score: 68,
    level: 'High'
  }];
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Market Reports Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <FileText size={20} className="mr-2 text-primary" />
              Market Reports
            </h2>
            <button className="text-sm text-primary flex items-center">
              View All Reports
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketReports.map((report, index) => <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-100 relative">
                  <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                  {report.premium && <div className="absolute top-2 right-2 bg-tertiary text-dark text-xs px-2 py-0.5 rounded-full font-medium">
                      Premium
                    </div>}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{report.title}</h3>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Bookmark size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {report.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {report.date} • {report.pages} pages
                    </div>
                    <button className="flex items-center text-primary text-sm hover:underline">
                      <Download size={14} className="mr-1" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        {/* Comparative Market Analysis */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <BarChart size={20} className="mr-2 text-primary" />
              Comparative Market Analysis
            </h2>
            <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg flex items-center">
              Generate Custom CMA
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Median Price</div>
              <div className="text-xl font-bold">{cmaSummary.medianPrice}</div>
              <div className="mt-2 flex items-center text-xs text-primary">
                <TrendingUp size={14} className="mr-1" />
                +2.7% from last quarter
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Price per Sq Ft</div>
              <div className="text-xl font-bold">{cmaSummary.pricePerSqFt}</div>
              <div className="mt-2 flex items-center text-xs text-primary">
                <TrendingUp size={14} className="mr-1" />
                +3.2% from last quarter
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Days on Market</div>
              <div className="text-xl font-bold">
                {cmaSummary.averageDaysOnMarket}
              </div>
              <div className="mt-2 flex items-center text-xs text-primary">
                <TrendingUp size={14} className="mr-1" transform="rotate(180)" />
                -3 days from last quarter
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">CMA Confidence Score</h3>
              <div className="bg-primary text-white text-sm px-2 py-0.5 rounded-full">
                {cmaSummary.confidenceScore}/100
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{
                width: `${cmaSummary.confidenceScore}%`
              }}></div>
              </div>
              <span className="ml-3 text-sm">
                {cmaSummary.confidenceScore}%
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Based on {cmaSummary.comparableProperties} comparable properties
              in {selectedMarket}
            </div>
            <div className="mt-4">
              <button className="text-primary text-sm hover:underline flex items-center">
                View Detailed Comparables
                <ArrowUpRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Right Column */}
      <div className="space-y-6">
        {/* Investment Opportunity Scoring */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <Star size={20} className="mr-2 text-tertiary" />
              Investment Opportunities
            </h2>
          </div>
          <div className="space-y-3">
            {investmentOpportunities.map((opp, index) => <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{opp.area}</h3>
                  <div className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    Score: {opp.score}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <div className="text-xs text-gray-500">Cap Rate</div>
                    <div className="font-medium">{opp.capRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Cash on Cash</div>
                    <div className="font-medium">{opp.cashOnCash}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Price Range</div>
                    <div className="font-medium">{opp.priceRange}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Risk Level</div>
                    <div className="font-medium">{opp.riskLevel}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {opp.propertyType}
                  </div>
                  <button className="text-primary text-xs hover:underline">
                    View Properties
                  </button>
                </div>
              </div>)}
          </div>
          <div className="mt-4">
            <button className="w-full px-3 py-2 bg-tertiary text-dark text-sm rounded-lg flex items-center justify-center">
              Find More Opportunities
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        {/* Risk Assessment */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <AlertTriangle size={20} className="mr-2 text-secondary" />
              Risk Assessment
            </h2>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Overall Risk Score</h3>
              <div className={`text-xs px-2 py-0.5 rounded-full ${45 < 40 ? 'bg-primary bg-opacity-10 text-primary' : 45 < 70 ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                {45 < 40 ? 'Low' : 45 < 70 ? 'Medium' : 'High'} Risk
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className={`h-2.5 rounded-full ${45 < 40 ? 'bg-primary' : 45 < 70 ? 'bg-tertiary' : 'bg-secondary'}`} style={{
                width: `${45}%`
              }}></div>
              </div>
              <span className="ml-3 text-sm">45/100</span>
            </div>
          </div>
          <div className="space-y-3">
            {riskFactors.map((factor, index) => <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="text-sm">{factor.factor}</div>
                  <div className={`text-xs ${factor.level === 'Low' ? 'text-primary' : factor.level === 'Medium' ? 'text-tertiary-dark' : 'text-secondary'}`}>
                    {factor.level} Risk
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${factor.level === 'Low' ? 'bg-primary' : factor.level === 'Medium' ? 'bg-tertiary' : 'bg-secondary'}`} style={{
                width: `${factor.score}%`
              }}></div>
                </div>
              </div>)}
          </div>
          <div className="mt-4">
            <button className="text-primary text-sm hover:underline flex items-center">
              View Full Risk Report
              <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
        {/* ROI Projections */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              <PieChart size={20} className="mr-2" />
              ROI Projections
            </h2>
            <div className="bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">
              {selectedMarket}
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-white text-opacity-90">
                Average Annual ROI
              </div>
              <div className="text-2xl font-bold">14.8%</div>
            </div>
            <div>
              <div className="text-sm text-white text-opacity-90">
                5-Year Appreciation
              </div>
              <div className="text-2xl font-bold">32.5%</div>
            </div>
            <div>
              <div className="text-sm text-white text-opacity-90">
                Cash Flow Potential
              </div>
              <div className="text-2xl font-bold">$1,250/mo</div>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full px-3 py-2 bg-white text-primary text-sm rounded-lg flex items-center justify-center">
              Calculate Custom ROI
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};