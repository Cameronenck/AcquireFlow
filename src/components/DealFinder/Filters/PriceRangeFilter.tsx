import React, { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useFilters } from './FilterContext';
export const PriceRangeFilter: React.FC = () => {
  const {
    filters,
    updateFilters
  } = useFilters();
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 1000000);
  // Format number as currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Parse currency string to number
  const parseCurrency = (value: string): number => {
    return parseInt(value.replace(/[$,]/g, ''), 10) || 0;
  };
  // Handle input changes
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseCurrency(e.target.value);
    setMinPrice(value);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseCurrency(e.target.value);
    setMaxPrice(value);
  };
  // Update filters when values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (minPrice <= maxPrice) {
        updateFilters({
          minPrice,
          maxPrice
        });
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [minPrice, maxPrice, updateFilters]);
  // Predefined price ranges
  const priceRanges = [{
    min: 0,
    max: 100000,
    label: 'Under $100K'
  }, {
    min: 100000,
    max: 250000,
    label: '$100K - $250K'
  }, {
    min: 250000,
    max: 500000,
    label: '$250K - $500K'
  }, {
    min: 500000,
    max: 1000000,
    label: '$500K - $1M'
  }, {
    min: 1000000,
    max: 10000000,
    label: 'Over $1M'
  }];
  const handlePriceRangeClick = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    updateFilters({
      minPrice: min,
      maxPrice: max
    });
  };
  return <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Min Price</label>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={formatCurrency(minPrice)} onChange={handleMinPriceChange} onBlur={() => {
            if (minPrice > maxPrice) {
              setMinPrice(maxPrice);
            }
          }} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Max Price</label>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={formatCurrency(maxPrice)} onChange={handleMaxPriceChange} onBlur={() => {
            if (maxPrice < minPrice) {
              setMaxPrice(minPrice);
            }
          }} />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          Price Range: {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
        </label>
        <input type="range" min="0" max="2000000" step="10000" value={minPrice} onChange={e => setMinPrice(parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-2" />
        <input type="range" min="0" max="2000000" step="10000" value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-700 mb-2">Quick Selections</p>
        <div className="grid grid-cols-2 gap-2">
          {priceRanges.map((range, index) => <button key={index} className="py-1.5 px-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors" onClick={() => handlePriceRangeClick(range.min, range.max)}>
              {range.label}
            </button>)}
        </div>
      </div>
    </div>;
};