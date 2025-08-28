import React from 'react';
import { MarketTrendsChart } from './Charts/MarketTrendsChart';
import { PriceHeatMap } from './Charts/PriceHeatMap';
import { InventoryLevelsChart } from './Charts/InventoryLevelsChart';
import { DaysOnMarketChart } from './Charts/DaysOnMarketChart';
import { AgentActivityChart } from './Charts/AgentActivityChart';
import { SeasonalPatternsChart } from './Charts/SeasonalPatternsChart';
import { TopInvestmentCities } from './Charts/TopInvestmentCities';
import { ArrowUpRight, Download, RefreshCcw, Info } from 'lucide-react';
export const DataVisualizationGrid = ({
  selectedMarket,
  timeRange
}) => {
  const handleRefresh = chartName => {
    console.log(`Refreshing ${chartName} chart...`);
    // In a real app, this would trigger a data refresh
  };
  const handleDownload = (chartName, format = 'csv') => {
    console.log(`Downloading ${chartName} chart as ${format}...`);
    // In a real app, this would trigger a download
  };
  const renderChartHeader = (title, description) => <div className="flex justify-between items-start mb-3">
      <div className="flex items-center">
        <h3 className="font-medium text-dark">{title}</h3>
        {description && <div className="relative group ml-2">
            <Info size={14} className="text-gray-400" />
            <div className="absolute left-0 bottom-full mb-2 w-64 bg-white p-2 text-xs text-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {description}
            </div>
          </div>}
      </div>
      <div className="flex space-x-1">
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => handleRefresh(title)}>
          <RefreshCcw size={14} />
        </button>
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => handleDownload(title)}>
          <Download size={14} />
        </button>
      </div>
    </div>;
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Top Investment Cities */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm col-span-1 lg:col-span-3">
        <TopInvestmentCities selectedMarket={selectedMarket} />
      </div>
      {/* Market Trends Chart */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm col-span-1 lg:col-span-2">
        {renderChartHeader('Market Trends', 'Interactive price trends over time with key market events.')}
        <div className="h-72">
          <MarketTrendsChart selectedMarket={selectedMarket} timeRange={timeRange} />
        </div>
      </div>
      {/* Price Heat Map */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        {renderChartHeader('Price Heat Map', 'Geographic visualization of price trends by neighborhood.')}
        <div className="h-72">
          <PriceHeatMap selectedMarket={selectedMarket} />
        </div>
      </div>
      {/* Inventory Levels */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        {renderChartHeader('Inventory Levels', 'Supply and demand metrics showing market balance.')}
        <div className="h-72">
          <InventoryLevelsChart selectedMarket={selectedMarket} timeRange={timeRange} />
        </div>
      </div>
      {/* Days on Market */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        {renderChartHeader('Days on Market', 'Average time to sell properties by type and price range.')}
        <div className="h-72">
          <DaysOnMarketChart selectedMarket={selectedMarket} timeRange={timeRange} />
        </div>
      </div>
      {/* Agent Activity */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        {renderChartHeader('Agent Activity', 'Analysis of top-performing agents and agencies in the market.')}
        <div className="h-72">
          <AgentActivityChart selectedMarket={selectedMarket} timeRange={timeRange} />
        </div>
      </div>
      {/* Seasonal Patterns */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        {renderChartHeader('Seasonal Patterns', 'Recurring market patterns to identify optimal timing.')}
        <div className="h-72">
          <SeasonalPatternsChart selectedMarket={selectedMarket} />
        </div>
      </div>
      {/* Market Opportunity Card */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 border border-primary shadow-sm text-white col-span-1 lg:col-span-3 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="font-bold text-xl mb-2">
            Investment Opportunity Alert
          </h3>
          <p className="text-white text-opacity-90 mb-4">
            Our AI has identified 12 new high-potential investment opportunities
            in {selectedMarket} matching your criteria.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-lg text-sm">
              Average Cap Rate: 7.2%
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-lg text-sm">
              Median Price: $320K
            </div>
            <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-lg text-sm">
              Projected ROI: 18.5%
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-white text-primary px-5 py-2.5 rounded-xl font-medium flex items-center hover:shadow-lg transition-all">
            View Opportunities
            <ArrowUpRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>;
};