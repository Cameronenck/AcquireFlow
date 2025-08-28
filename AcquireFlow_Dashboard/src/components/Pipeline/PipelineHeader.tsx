import React from 'react';
import { Plus, BarChart2, Download, Filter, Search } from 'lucide-react';
type PipelineHeaderProps = {
  totalDeals: number;
  totalValue: number;
  totalProfit: number;
  onAddDeal: () => void;
  onToggleAnalytics: () => void;
};
export const PipelineHeader = ({
  totalDeals,
  totalValue,
  totalProfit,
  onAddDeal,
  onToggleAnalytics
}: PipelineHeaderProps) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-dark">Deal Pipeline</h1>
            <p className="text-gray-500 mt-1">
              {totalDeals} deals worth {formatCurrency(totalValue)}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button onClick={onAddDeal} className="flex items-center px-4 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
              <Plus size={18} className="mr-2" />
              Add Deal
            </button>
            <button onClick={onToggleAnalytics} className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-dark hover:bg-gray-50 transition-colors shadow-sm">
              <BarChart2 size={18} className="mr-2" />
              Analytics
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-dark hover:bg-gray-50 transition-colors shadow-sm">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Deal Value</div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalValue)}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Across all pipeline stages
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Potential Profit</div>
            <div className="text-2xl font-bold text-secondary">
              {formatCurrency(totalProfit)}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Estimated total profit
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Average Deal Size</div>
            <div className="text-2xl font-bold text-tertiary-dark">
              {formatCurrency(totalDeals > 0 ? totalValue / totalDeals : 0)}
            </div>
            <div className="mt-1 text-xs text-gray-500">Per deal average</div>
          </div>
        </div>
      </div>
    </div>;
};