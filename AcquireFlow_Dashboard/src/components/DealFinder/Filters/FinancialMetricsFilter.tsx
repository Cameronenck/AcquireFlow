import React from 'react';
import { DollarSign, TrendingUp, BarChart3, Hammer } from 'lucide-react';
import { useFilters } from './FilterContext';
export const FinancialMetricsFilter: React.FC = () => {
  const {
    filters,
    updateFilters
  } = useFilters();
  // Handle input changes
  const handleCashFlowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFilters({
      minCashFlow: isNaN(value) ? 0 : value
    });
  };
  const handleCapRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateFilters({
      minCapRate: isNaN(value) ? 0 : value
    });
  };
  const handleROIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateFilters({
      minROI: isNaN(value) ? 0 : value
    });
  };
  const handleRehabCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFilters({
      maxRehabCost: isNaN(value) ? 0 : value
    });
  };
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  return <div className="space-y-5">
      <p className="text-sm text-gray-600 mb-3">
        Set minimum requirements for key investment metrics.
      </p>
      {/* Cash Flow */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <DollarSign size={16} className="mr-2 text-primary" />
          Minimum Monthly Cash Flow
        </label>
        <div className="flex items-center">
          <input type="range" min="0" max="2000" step="50" value={filters.minCashFlow || 0} onChange={handleCashFlowChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mr-3" />
          <div className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-medium">
            ${filters.minCashFlow || 0}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>$1,000</span>
          <span>$2,000</span>
        </div>
      </div>
      {/* Cap Rate */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <BarChart3 size={16} className="mr-2 text-primary" />
          Minimum Cap Rate
        </label>
        <div className="flex items-center">
          <input type="range" min="0" max="20" step="0.5" value={filters.minCapRate || 0} onChange={handleCapRateChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mr-3" />
          <div className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-medium">
            {filters.minCapRate || 0}%
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>10%</span>
          <span>20%</span>
        </div>
      </div>
      {/* ROI */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <TrendingUp size={16} className="mr-2 text-primary" />
          Minimum ROI
        </label>
        <div className="flex items-center">
          <input type="range" min="0" max="50" step="1" value={filters.minROI || 0} onChange={handleROIChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mr-3" />
          <div className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-medium">
            {filters.minROI || 0}%
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
        </div>
      </div>
      {/* Max Rehab Cost */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Hammer size={16} className="mr-2 text-primary" />
          Maximum Rehab Cost
        </label>
        <div className="flex items-center">
          <input type="range" min="0" max="200000" step="5000" value={filters.maxRehabCost || 50000} onChange={handleRehabCostChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mr-3" />
          <div className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center font-medium text-sm">
            {formatCurrency(filters.maxRehabCost || 50000)}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>$100K</span>
          <span>$200K</span>
        </div>
      </div>
      <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm text-gray-600">
        <p className="font-medium mb-1">Financial Metrics Explained:</p>
        <ul className="space-y-1 text-xs list-disc pl-4">
          <li>
            <strong>Cash Flow:</strong> Monthly rental income minus expenses
          </li>
          <li>
            <strong>Cap Rate:</strong> Annual net operating income divided by
            property value
          </li>
          <li>
            <strong>ROI:</strong> Return on investment, annual return as
            percentage of total investment
          </li>
          <li>
            <strong>Rehab Cost:</strong> Estimated cost to renovate the property
          </li>
        </ul>
      </div>
    </div>;
};