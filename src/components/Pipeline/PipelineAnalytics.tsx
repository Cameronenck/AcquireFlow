import React from 'react';
import { X, TrendingUp, Clock, AlertCircle, Target, DollarSign, ArrowRight, Download } from 'lucide-react';
import { Deal, DealStage } from './types';
import { generatePipelineMetrics } from './mockData';
import { ConversionChart } from './Analytics/ConversionChart';
import { VelocityChart } from './Analytics/VelocityChart';
import { ForecastChart } from './Analytics/ForecastChart';
import { BottleneckChart } from './Analytics/BottleneckChart';
type PipelineAnalyticsProps = {
  deals: Deal[];
  onClose: () => void;
};
export const PipelineAnalytics = ({
  deals,
  onClose
}: PipelineAnalyticsProps) => {
  const metrics = generatePipelineMetrics(deals);
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get stage display name
  const getStageDisplayName = (stage: DealStage): string => {
    switch (stage) {
      case 'Prospecting':
        return 'Prospecting';
      case 'UnderContract':
        return 'Under Contract';
      case 'DueDiligence':
        return 'Due Diligence';
      case 'Negotiations':
        return 'Negotiations';
      case 'Closing':
        return 'Closing';
      default:
        return stage;
    }
  };
  // Find bottleneck stage
  const bottleneckStage = Object.entries(metrics.stageMetrics).reduce((a, b) => a[1].avgDaysInStage > b[1].avgDaysInStage ? a : b)[0] as DealStage;
  return <div className="bg-white border-b border-gray-200 shadow-md">
      {/* Header with close button */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-dark flex items-center">
          <TrendingUp size={24} className="mr-2 text-primary" />
          Pipeline Analytics
        </h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500" aria-label="Close analytics">
          <X size={20} />
        </button>
      </div>
      <div className="p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {/* Total Deals */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Total Deals</div>
            <div className="text-2xl font-bold">{metrics.totalDeals}</div>
            <div className="mt-1 text-xs text-gray-500">Across all stages</div>
          </div>
          {/* Pipeline Value */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Pipeline Value</div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(metrics.totalValue)}
            </div>
            <div className="mt-1 text-xs text-gray-500">Total deal value</div>
          </div>
          {/* Conversion Rate */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Conversion Rate</div>
            <div className="text-2xl font-bold text-tertiary-dark">
              {metrics.conversionRate}%
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Prospecting to closing
            </div>
          </div>
          {/* Avg Deal Cycle */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Avg Deal Cycle</div>
            <div className="text-2xl font-bold">
              {metrics.avgDealCycle} days
            </div>
            <div className="mt-1 text-xs text-gray-500">
              From start to close
            </div>
          </div>
          {/* Bottleneck */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Bottleneck</div>
            <div className="text-2xl font-bold text-secondary">
              {getStageDisplayName(bottleneckStage)}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {metrics.stageMetrics[bottleneckStage].avgDaysInStage} avg days
            </div>
          </div>
        </div>
        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Conversion Rate Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-dark">
                Conversion Rate by Stage
              </h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Download conversion rate data">
                <Download size={16} />
              </button>
            </div>
            <div className="h-[280px]">
              <ConversionChart metrics={metrics} />
            </div>
          </div>
          {/* Stage Velocity Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-dark">
                Stage Velocity (Avg Days)
              </h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Download velocity data">
                <Download size={16} />
              </button>
            </div>
            <div className="h-[280px]">
              <VelocityChart metrics={metrics} />
            </div>
          </div>
          {/* Revenue Forecast Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-dark">Revenue Forecast</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Download forecast data">
                <Download size={16} />
              </button>
            </div>
            <div className="h-[280px]">
              <ForecastChart deals={deals} />
            </div>
          </div>
          {/* Bottleneck Analysis Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-dark">Bottleneck Analysis</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Download bottleneck analysis">
                <Download size={16} />
              </button>
            </div>
            <div className="h-[280px]">
              <BottleneckChart metrics={metrics} />
            </div>
          </div>
        </div>
        {/* Optimization Recommendations */}
        <div className="bg-primary bg-opacity-5 rounded-xl p-6 border border-primary border-opacity-20">
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="bg-primary bg-opacity-10 p-2.5 rounded-full mr-5 mb-4 md:mb-0 flex-shrink-0">
              <TrendingUp size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-primary text-lg mb-3">
                Pipeline Optimization Recommendations
              </h3>
              <p className="text-sm text-gray-700 mb-5">
                Based on your pipeline data, here are some recommendations to
                improve performance:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-sm mb-2">
                    Reduce Time in {getStageDisplayName(bottleneckStage)}
                  </h4>
                  <p className="text-xs text-gray-600">
                    This stage is taking{' '}
                    {metrics.stageMetrics[bottleneckStage].avgDaysInStage} days
                    on average, which is slowing down your pipeline.
                  </p>
                  <button className="mt-3 text-xs text-primary flex items-center hover:underline">
                    View Recommendations{' '}
                    <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-sm mb-2">
                    Improve Conversion Rate
                  </h4>
                  <p className="text-xs text-gray-600">
                    Your conversion rate from Prospecting to Closing is{' '}
                    {metrics.conversionRate}%. Industry average is 15-20%.
                  </p>
                  <button className="mt-3 text-xs text-primary flex items-center hover:underline">
                    View Strategies <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <h4 className="font-medium text-sm mb-2">
                    Optimize Deal Size
                  </h4>
                  <p className="text-xs text-gray-600">
                    Focus on deals with higher potential profit margins to
                    improve overall ROI.
                  </p>
                  <button className="mt-3 text-xs text-primary flex items-center hover:underline">
                    View Opportunities <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};