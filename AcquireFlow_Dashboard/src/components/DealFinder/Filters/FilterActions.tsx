import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { useFilters } from './FilterContext';
export const FilterActions: React.FC = () => {
  const {
    applyFilters,
    resetFilters
  } = useFilters();
  return <div className="p-5 border-t border-gray-200 bg-white">
      <div className="flex gap-3">
        <button className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-primary-dark transition-colors" onClick={applyFilters}>
          <Search size={18} className="mr-2" />
          Find Properties
        </button>
        <button className="py-2.5 px-4 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center" onClick={resetFilters}>
          <RefreshCw size={18} className="mr-2" />
          Reset
        </button>
      </div>
    </div>;
};