import React, { useState } from 'react';
import { BarChart2, Building, Calculator, ChevronDown, LineChart, Map, Target, TrendingDown, TrendingUp, Users, Bell, Search, Download, Filter, PlusCircle, Info, RefreshCw } from 'lucide-react';
import { DataVisualizationGrid } from './DataVisualizationGrid';
import { CityAnalysisDashboard } from './CityAnalysisDashboard/CityAnalysisDashboard';
import { MarketComparisonGrid } from './MarketComparisonGrid';
import { MarketEntryRecommendations } from './MarketEntryRecommendations';
import { CompetitivePositioningAnalysis } from './CompetitivePositioningAnalysis';
import { ScenarioModelingTool } from './ScenarioModelingTool';
export const MarketIntelligence = () => {
  const [selectedMarket, setSelectedMarket] = useState('Orlando, FL');
  const [timeRange, setTimeRange] = useState('6M');
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  // Available markets for selection
  const availableMarkets = ['Orlando, FL', 'Miami, FL', 'Tampa, FL', 'Jacksonville, FL', 'Fort Lauderdale, FL', 'West Palm Beach, FL', 'Naples, FL', 'Sarasota, FL', 'Fort Myers, FL', 'Daytona Beach, FL'];
  // Market metrics (would come from API in a real app)
  const marketMetrics = {
    medianPrice: 375000,
    priceChange: 2.7,
    inventory: 3245,
    inventoryChange: -5.2,
    daysOnMarket: 18,
    daysOnMarketChange: -3,
    opportunityScore: 72
  };
  // Handle market selection changes
  const handleMarketChange = market => {
    setSelectedMarket(market);
  };
  // Handle time range changes
  const handleTimeRangeChange = range => {
    setTimeRange(range);
  };
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex flex-col space-y-6">
          {/* Title and Search */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center">
                <LineChart className="mr-2 text-gray-700" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">
                  Market Intelligence
                </h1>
              </div>
              <p className="text-gray-500 mt-1">
                Real-time market insights and investment opportunities
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search Markets */}
              <div className={`relative transition-all duration-300 ${isSearchExpanded ? 'w-64' : 'w-10'}`}>
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer ${isSearchExpanded ? 'text-gray-500' : 'text-gray-600'}`} onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
                  <Search size={18} />
                </div>
                <input type="text" className={`w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`} placeholder="Search markets..." onBlur={() => {
                if (!event.target.value) {
                  setIsSearchExpanded(false);
                }
              }} />
              </div>
              {/* City Selector */}
              <div className="relative flex-1 md:flex-none">
                <div className="flex items-center px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-gray-300 transition-colors">
                  <Map size={18} className="text-gray-400 mr-2" />
                  <select className="appearance-none bg-transparent pr-8 text-gray-800 w-full focus:outline-none cursor-pointer" value={selectedMarket} onChange={e => handleMarketChange(e.target.value)}>
                    {availableMarkets.map(market => <option key={market} value={market}>
                        {market}
                      </option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* Time Range Selector */}
              <div className="flex bg-gray-100 rounded-lg shadow-sm">
                {['1M', '3M', '6M', '1Y', '3Y', '5Y'].map(range => <button key={range} className={`px-3 py-2 text-sm font-medium transition-all ${timeRange === range ? 'bg-emerald-500 text-white rounded-lg shadow-sm' : 'text-gray-600 hover:text-gray-800'}`} onClick={() => handleTimeRangeChange(range)}>
                    {range}
                  </button>)}
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                  <Filter size={18} className="text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                  <Download size={18} className="text-gray-600" />
                </button>
                <div className="relative">
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full shadow-sm">
                      2
                    </div>
                    <Bell size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${selectedTab === 'dashboard' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`} onClick={() => setSelectedTab('dashboard')}>
                <LineChart size={16} className="mr-2" />
                Market Dashboard
              </button>
              <button className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${selectedTab === 'city' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`} onClick={() => setSelectedTab('city')}>
                <Building size={16} className="mr-2" />
                City Analysis
              </button>
              <button className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${selectedTab === 'comparison' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`} onClick={() => setSelectedTab('comparison')}>
                <BarChart2 size={16} className="mr-2" />
                Market Comparison
              </button>
              <button className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${selectedTab === 'entry' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`} onClick={() => setSelectedTab('entry')}>
                <Target size={16} className="mr-2" />
                Entry Strategy
              </button>
              <button className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${selectedTab === 'competitive' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`} onClick={() => setSelectedTab('competitive')}>
                <Users size={16} className="mr-2" />
                Competitive Analysis
              </button>
              <button className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${selectedTab === 'scenarios' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'}`} onClick={() => setSelectedTab('scenarios')}>
                <Calculator size={16} className="mr-2" />
                Scenario Modeling
              </button>
            </div>
          </div>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Median Price Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">Median Price</span>
                <div className={`flex items-center ${marketMetrics.priceChange > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {marketMetrics.priceChange > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                  {marketMetrics.priceChange > 0 ? '+' : ''}
                  {marketMetrics.priceChange}%
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                ${marketMetrics.medianPrice.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                vs. previous month
              </div>
            </div>
            {/* Inventory Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">Inventory</span>
                <div className={`flex items-center ${marketMetrics.inventoryChange > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {marketMetrics.inventoryChange > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                  {marketMetrics.inventoryChange > 0 ? '+' : ''}
                  {marketMetrics.inventoryChange}%
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {marketMetrics.inventory.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">active listings</div>
            </div>
            {/* Days on Market Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">
                  Days on Market
                </span>
                <div className={`flex items-center ${marketMetrics.daysOnMarketChange < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {marketMetrics.daysOnMarketChange < 0 ? <TrendingDown size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1" />}
                  {marketMetrics.daysOnMarketChange > 0 ? '+' : ''}
                  {marketMetrics.daysOnMarketChange} days
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {marketMetrics.daysOnMarket}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                average days to sell
              </div>
            </div>
            {/* Market Opportunity Card */}
            <div className="bg-emerald-500 text-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="text-white text-opacity-90 font-medium">
                  Market Opportunity
                </span>
                <div className="bg-white text-emerald-500 text-xs px-2 py-1 rounded-full font-medium">
                  Seller's Market
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {marketMetrics.opportunityScore}/100
              </div>
              <div className="text-xs text-white text-opacity-90 mt-1">
                investment opportunity score
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Last Updated & Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <RefreshCw size={14} className="mr-2" />
            Last updated: Today, 9:45 AM
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
              <Info size={14} className="mr-1.5" />
              Methodology
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
              <Download size={14} className="mr-1.5" />
              Export Data
            </button>
            <button className="flex items-center bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-emerald-600 transition-colors">
              <PlusCircle size={14} className="mr-1.5" />
              Add to Watchlist
            </button>
          </div>
        </div>
        {/* Tab Content */}
        <div className="animate-fadeIn">
          {selectedTab === 'dashboard' && <DataVisualizationGrid selectedMarket={selectedMarket} timeRange={timeRange} />}
          {selectedTab === 'city' && <CityAnalysisDashboard selectedCity={selectedMarket} onCityChange={handleMarketChange} />}
          {selectedTab === 'comparison' && <MarketComparisonGrid selectedMarkets={[selectedMarket]} onAddMarket={() => {}} onRemoveMarket={() => {}} availableMarkets={availableMarkets} />}
          {selectedTab === 'entry' && <MarketEntryRecommendations investorProfile={{
          strategy: 'buy_and_hold',
          experience: 'intermediate',
          capitalAvailable: 250000,
          timeline: 'medium',
          riskTolerance: 'medium'
        }} selectedMarket={selectedMarket} />}
          {selectedTab === 'competitive' && <CompetitivePositioningAnalysis selectedMarket={selectedMarket} investorProfile={{
          strategy: 'buy_and_hold',
          experience: 'intermediate',
          capitalAvailable: 250000,
          timeline: 'medium',
          riskTolerance: 'medium'
        }} />}
          {selectedTab === 'scenarios' && <ScenarioModelingTool selectedMarket={selectedMarket} investorProfile={{
          strategy: 'buy_and_hold',
          experience: 'intermediate',
          capitalAvailable: 250000,
          timeline: 'medium',
          riskTolerance: 'medium'
        }} />}
        </div>
      </div>
      {/* Add some global styles for animations */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>;
};