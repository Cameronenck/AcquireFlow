import React, { useState } from 'react';
import { ArrowUpRight, Download, Map, Users, Building, TrendingUp, TrendingDown, DollarSign, Home, PieChart, Activity, Info, Briefcase, ChevronDown, ExternalLink, Layers, Filter, BarChart, LineChart, Calendar, School, Shield, Heart, AlertCircle, RefreshCw, Search, Zap } from 'lucide-react';
import { CityOverview } from './CityOverview';
import { NeighborhoodComparison } from './NeighborhoodComparison';
import { DemographicBreakdown } from './DemographicBreakdown';
import { RealEstateMetrics } from './RealEstateMetrics';
import { EconomicIndicators } from './EconomicIndicators';
import { InvestmentHeatmap } from './InvestmentHeatmap';
import { CityScorecard } from './CityScorecard';
interface CityAnalysisDashboardProps {
  selectedCity?: string;
  onCityChange?: (city: string) => void;
}
export const CityAnalysisDashboard: React.FC<CityAnalysisDashboardProps> = ({
  selectedCity = 'Orlando, FL',
  onCityChange = () => {}
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'neighborhoods' | 'demographics' | 'realestate' | 'economic' | 'heatmap'>('overview');
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y'>('1Y');
  const [dataSource, setDataSource] = useState<'census' | 'proprietary' | 'combined'>('combined');
  const [showComparisonMode, setShowComparisonMode] = useState(false);
  const [comparisonCity, setComparisonCity] = useState<string>('Miami, FL');
  // Available cities for selection
  const availableCities = ['Orlando, FL', 'Miami, FL', 'Tampa, FL', 'Jacksonville, FL', 'Fort Lauderdale, FL', 'West Palm Beach, FL', 'Naples, FL', 'Sarasota, FL', 'Fort Myers, FL', 'Daytona Beach, FL'];
  // City key metrics (would come from API in a real app)
  const cityMetrics = {
    population: 307573,
    medianIncome: 58420,
    medianHomePrice: 375000,
    medianPriceChange: 2.7,
    inventory: 3245,
    inventoryChange: -5.2,
    daysOnMarket: 18,
    daysOnMarketChange: -3,
    jobGrowth: 3.2,
    populationGrowth: 2.1,
    rentGrowth: 4.3,
    vacancyRate: 3.8,
    affordabilityIndex: 68,
    crimeIndex: 42,
    walkabilityScore: 52,
    opportunityScore: 72
  };
  // Handle view change
  const handleViewChange = (view: 'overview' | 'neighborhoods' | 'demographics' | 'realestate' | 'economic' | 'heatmap') => {
    setActiveView(view);
  };
  // Handle timeframe change
  const handleTimeframeChange = (tf: '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y') => {
    setTimeframe(tf);
  };
  // Handle city selection
  const handleCitySelect = (city: string) => {
    onCityChange(city);
  };
  // Handle comparison city selection
  const handleComparisonCitySelect = (city: string) => {
    setComparisonCity(city);
  };
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center text-gray-800">
              <Map size={20} className="mr-2 text-emerald-600" />
              City Analysis Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Comprehensive market insights for investment decision-making
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            {/* City Selector */}
            <div className="relative">
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
                <Map size={16} className="text-gray-400 mr-2" />
                <select className="appearance-none bg-transparent pr-6 text-sm focus:outline-none" value={selectedCity} onChange={e => handleCitySelect(e.target.value)}>
                  {availableCities.map(city => <option key={city} value={city}>
                      {city}
                    </option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Comparison Toggle */}
            <div className="flex items-center">
              <button className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium ${showComparisonMode ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setShowComparisonMode(!showComparisonMode)}>
                <Activity size={14} className="mr-1.5" />
                Compare Cities
              </button>
            </div>
            {/* Comparison City Selector (visible when comparison mode is on) */}
            {showComparisonMode && <div className="relative">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
                  <Map size={16} className="text-gray-400 mr-2" />
                  <select className="appearance-none bg-transparent pr-6 text-sm focus:outline-none" value={comparisonCity} onChange={e => handleComparisonCitySelect(e.target.value)}>
                    {availableCities.filter(city => city !== selectedCity).map(city => <option key={city} value={city}>
                          {city}
                        </option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
                </div>
              </div>}
            {/* Timeframe Selector */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button className={`px-2 py-1 text-xs font-medium ${timeframe === '1M' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => handleTimeframeChange('1M')}>
                1M
              </button>
              <button className={`px-2 py-1 text-xs font-medium ${timeframe === '3M' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => handleTimeframeChange('3M')}>
                3M
              </button>
              <button className={`px-2 py-1 text-xs font-medium ${timeframe === '6M' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => handleTimeframeChange('6M')}>
                6M
              </button>
              <button className={`px-2 py-1 text-xs font-medium ${timeframe === '1Y' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => handleTimeframeChange('1Y')}>
                1Y
              </button>
              <button className={`px-2 py-1 text-xs font-medium ${timeframe === '3Y' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => handleTimeframeChange('3Y')}>
                3Y
              </button>
              <button className={`px-2 py-1 text-xs font-medium ${timeframe === '5Y' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600'}`} onClick={() => handleTimeframeChange('5Y')}>
                5Y
              </button>
            </div>
            {/* Data Source Selector */}
            <div className="relative">
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
                <Layers size={16} className="text-gray-400 mr-2" />
                <select className="appearance-none bg-transparent pr-6 text-sm focus:outline-none" value={dataSource} onChange={e => setDataSource(e.target.value as any)}>
                  <option value="census">Census Data</option>
                  <option value="proprietary">Proprietary Data</option>
                  <option value="combined">Combined Sources</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Actions */}
            <button className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={16} />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 bg-white border-b border-gray-200">
        {/* Median Price Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-gray-500">Median Price</span>
            <div className={`flex items-center text-xs ${cityMetrics.medianPriceChange > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {cityMetrics.medianPriceChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {cityMetrics.medianPriceChange > 0 ? '+' : ''}
              {cityMetrics.medianPriceChange}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            ${cityMetrics.medianHomePrice.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous period</div>
        </div>
        {/* Inventory Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-gray-500">Inventory</span>
            <div className={`flex items-center text-xs ${cityMetrics.inventoryChange > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {cityMetrics.inventoryChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {cityMetrics.inventoryChange > 0 ? '+' : ''}
              {cityMetrics.inventoryChange}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {cityMetrics.inventory.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">active listings</div>
        </div>
        {/* Days on Market Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-gray-500">Days on Market</span>
            <div className={`flex items-center text-xs ${cityMetrics.daysOnMarketChange < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {cityMetrics.daysOnMarketChange < 0 ? <TrendingDown size={14} className="mr-1" /> : <TrendingUp size={14} className="mr-1" />}
              {cityMetrics.daysOnMarketChange > 0 ? '+' : ''}
              {cityMetrics.daysOnMarketChange} days
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {cityMetrics.daysOnMarket}
          </div>
          <div className="text-xs text-gray-500 mt-1">average days to sell</div>
        </div>
        {/* Population Growth Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-gray-500">Population Growth</span>
            <div className={`flex items-center text-xs ${cityMetrics.populationGrowth > 1.5 ? 'text-emerald-600' : 'text-amber-500'}`}>
              {cityMetrics.populationGrowth > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {cityMetrics.populationGrowth > 0 ? '+' : ''}
              {cityMetrics.populationGrowth}%
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {cityMetrics.population.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">total residents</div>
        </div>
        {/* Market Opportunity Card */}
        <div className="bg-emerald-500 text-white rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm">Market Opportunity</span>
            <div className="text-xs bg-white text-emerald-500 px-2 py-0.5 rounded-full">
              {cityMetrics.opportunityScore > 75 ? 'Strong Buy' : cityMetrics.opportunityScore > 65 ? 'Buy' : cityMetrics.opportunityScore > 55 ? 'Hold' : 'Watch'}
            </div>
          </div>
          <div className="text-2xl font-bold">
            {cityMetrics.opportunityScore}/100
          </div>
          <div className="text-xs text-white text-opacity-90 mt-1">
            investment opportunity score
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 bg-white px-6">
        <button className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeView === 'overview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleViewChange('overview')}>
          <Activity size={16} className="mr-2" />
          City Overview
        </button>
        <button className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeView === 'neighborhoods' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleViewChange('neighborhoods')}>
          <Home size={16} className="mr-2" />
          Neighborhood Comparison
        </button>
        <button className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeView === 'demographics' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleViewChange('demographics')}>
          <Users size={16} className="mr-2" />
          Demographics
        </button>
        <button className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeView === 'realestate' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleViewChange('realestate')}>
          <Building size={16} className="mr-2" />
          Real Estate Metrics
        </button>
        <button className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeView === 'economic' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleViewChange('economic')}>
          <Briefcase size={16} className="mr-2" />
          Economic Indicators
        </button>
        <button className={`px-4 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeView === 'heatmap' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => handleViewChange('heatmap')}>
          <Map size={16} className="mr-2" />
          Investment Heatmap
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeView === 'overview' && <CityOverview city={selectedCity} metrics={cityMetrics} timeframe={timeframe} dataSource={dataSource} comparisonCity={showComparisonMode ? comparisonCity : undefined} />}
        {activeView === 'neighborhoods' && <NeighborhoodComparison city={selectedCity} timeframe={timeframe} dataSource={dataSource} />}
        {activeView === 'demographics' && <DemographicBreakdown city={selectedCity} timeframe={timeframe} dataSource={dataSource} comparisonCity={showComparisonMode ? comparisonCity : undefined} />}
        {activeView === 'realestate' && <RealEstateMetrics city={selectedCity} timeframe={timeframe} dataSource={dataSource} comparisonCity={showComparisonMode ? comparisonCity : undefined} />}
        {activeView === 'economic' && <EconomicIndicators city={selectedCity} timeframe={timeframe} dataSource={dataSource} comparisonCity={showComparisonMode ? comparisonCity : undefined} />}
        {activeView === 'heatmap' && <InvestmentHeatmap city={selectedCity} timeframe={timeframe} dataSource={dataSource} />}
      </div>
    </div>;
};