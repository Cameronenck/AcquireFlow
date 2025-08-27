import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useFilters } from './FilterContext';
export const ActiveFilters: React.FC = () => {
  const {
    filters,
    updateFilters,
    investmentStrategy
  } = useFilters();
  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get array of active filters
  const getActiveFilters = () => {
    const activeFilters = [];
    // Investment strategy
    if (investmentStrategy !== 'custom') {
      activeFilters.push({
        id: 'investmentStrategy',
        label: `Strategy: ${formatInvestmentStrategy(investmentStrategy)}`,
        onRemove: () => {},
        isStrategy: true
      });
    }
    // Locations
    if (filters.locations && filters.locations.length > 0) {
      filters.locations.forEach(location => {
        activeFilters.push({
          id: `location-${location}`,
          label: location,
          onRemove: () => {
            const newLocations = filters.locations?.filter(loc => loc !== location) || [];
            updateFilters({
              locations: newLocations
            });
          }
        });
      });
    }
    // Property types
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filters.propertyTypes.forEach(type => {
        activeFilters.push({
          id: `propertyType-${type}`,
          label: `Type: ${formatPropertyType(type)}`,
          onRemove: () => {
            const newTypes = filters.propertyTypes?.filter(t => t !== type) || [];
            updateFilters({
              propertyTypes: newTypes
            });
          }
        });
      });
    }
    // Price range
    if (filters.minPrice && filters.minPrice > 0) {
      activeFilters.push({
        id: 'minPrice',
        label: `Min: ${formatCurrency(filters.minPrice)}`,
        onRemove: () => updateFilters({
          minPrice: 0
        })
      });
    }
    if (filters.maxPrice && filters.maxPrice < 1000000) {
      activeFilters.push({
        id: 'maxPrice',
        label: `Max: ${formatCurrency(filters.maxPrice)}`,
        onRemove: () => updateFilters({
          maxPrice: 1000000
        })
      });
    }
    // Motivation factors
    if (filters.motivationFactors && filters.motivationFactors.length > 0) {
      filters.motivationFactors.forEach(factor => {
        activeFilters.push({
          id: `motivation-${factor}`,
          label: `${formatMotivationFactor(factor)}`,
          onRemove: () => {
            const newFactors = filters.motivationFactors?.filter(f => f !== factor) || [];
            updateFilters({
              motivationFactors: newFactors
            });
          }
        });
      });
    }
    // Financial metrics
    if (filters.minCashFlow && filters.minCashFlow > 0) {
      activeFilters.push({
        id: 'minCashFlow',
        label: `Cash Flow: $${filters.minCashFlow}+`,
        onRemove: () => updateFilters({
          minCashFlow: 0
        })
      });
    }
    if (filters.minCapRate && filters.minCapRate > 0) {
      activeFilters.push({
        id: 'minCapRate',
        label: `Cap Rate: ${filters.minCapRate}%+`,
        onRemove: () => updateFilters({
          minCapRate: 0
        })
      });
    }
    if (filters.minROI && filters.minROI > 0) {
      activeFilters.push({
        id: 'minROI',
        label: `ROI: ${filters.minROI}%+`,
        onRemove: () => updateFilters({
          minROI: 0
        })
      });
    }
    if (filters.maxRehabCost && filters.maxRehabCost < 50000) {
      activeFilters.push({
        id: 'maxRehabCost',
        label: `Max Rehab: ${formatCurrency(filters.maxRehabCost)}`,
        onRemove: () => updateFilters({
          maxRehabCost: 50000
        })
      });
    }
    return activeFilters;
  };
  const formatInvestmentStrategy = (strategy: string): string => {
    switch (strategy) {
      case 'wholesaling':
        return 'Wholesaling';
      case 'fixAndFlip':
        return 'Fix & Flip';
      case 'buyAndHold':
        return 'Buy & Hold';
      case 'shortTermRental':
        return 'Short-Term Rental';
      default:
        return strategy;
    }
  };
  const formatPropertyType = (type: string): string => {
    switch (type) {
      case 'singleFamily':
        return 'Single Family';
      case 'multiFamily':
        return 'Multi-Family';
      case 'commercial':
        return 'Commercial';
      case 'land':
        return 'Land';
      case 'industrial':
        return 'Industrial';
      default:
        return type;
    }
  };
  const formatMotivationFactor = (factor: string): string => {
    switch (factor) {
      case 'outOfState':
        return 'Out-of-State';
      case 'taxLiens':
        return 'Tax Liens';
      case 'divorce':
        return 'Divorce';
      case 'probate':
        return 'Probate';
      case 'foreclosure':
        return 'Foreclosure';
      case 'vacant':
        return 'Vacant';
      case 'highEquity':
        return 'High Equity';
      default:
        return factor;
    }
  };
  const activeFilters = getActiveFilters();
  if (activeFilters.length === 0) {
    return null;
  }
  return <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center mb-2">
        <AlertCircle size={14} className="text-primary mr-1.5" />
        <span className="text-xs text-gray-600">Active Filters</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map(filter => <div key={filter.id} className={`flex items-center text-xs rounded-full px-2.5 py-1 ${filter.isStrategy ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-200 text-gray-700'}`}>
            <span>{filter.label}</span>
            {!filter.isStrategy && <button className="ml-1.5 text-gray-500 hover:text-gray-700" onClick={() => filter.onRemove()}>
                <X size={12} />
              </button>}
          </div>)}
      </div>
    </div>;
};