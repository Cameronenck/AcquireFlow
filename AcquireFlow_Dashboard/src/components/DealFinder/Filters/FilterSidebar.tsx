import React, { useState } from 'react';
import { useFilters } from './FilterContext';
import { ActiveFilters } from './ActiveFilters';
import { FilterActions } from './FilterActions';
import { Search, Home, Building, Building2, MapPin, DollarSign, Bed, Bath, SquareIcon, Calendar, Star, Filter, RefreshCw, ArrowRight, Trash2, User, TrendingUp, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
export const FilterSidebar: React.FC = () => {
  const {
    filters,
    updateFilters,
    resetFilters,
    applyFilters
  } = useFilters();
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    propertyType: true,
    price: true,
    features: false,
    motivation: false,
    financials: false,
    strategy: true
  });
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() === '') {
      updateFilters({
        locations: []
      });
    } else {
      updateFilters({
        locations: [value]
      });
    }
  };
  const handlePropertyTypeChange = (type: string) => {
    const currentTypes = [...filters.propertyTypes];
    const index = currentTypes.indexOf(type);
    if (index === -1) {
      updateFilters({
        propertyTypes: [...currentTypes, type]
      });
    } else {
      currentTypes.splice(index, 1);
      updateFilters({
        propertyTypes: currentTypes
      });
    }
  };
  const handleMotivationFactorChange = (factor: string) => {
    const currentFactors = [...filters.motivationFactors];
    const index = currentFactors.indexOf(factor);
    if (index === -1) {
      updateFilters({
        motivationFactors: [...currentFactors, factor]
      });
    } else {
      currentFactors.splice(index, 1);
      updateFilters({
        motivationFactors: currentFactors
      });
    }
  };
  const handleInvestmentStrategyChange = (strategy: string) => {
    updateFilters({
      investmentStrategy: strategy as 'wholesaling' | 'fixAndFlip' | 'buyAndHold' | 'shortTermRental' | 'custom'
    });
  };
  return <div className="h-full bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-dark flex items-center">
            <Filter size={18} className="mr-2 text-primary" />
            Filters
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Narrow down properties to find the best deals
          </p>
        </div>
        <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <RefreshCw size={14} className="mr-1" />
          Reset
        </button>
      </div>
      <ActiveFilters />
      <div className="p-5 flex-1 overflow-y-auto">
        {/* Location Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection('location')}>
            <h3 className="font-medium text-dark flex items-center">
              <MapPin size={16} className="mr-2 text-primary" />
              Location
            </h3>
            {expandedSections.location ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          {expandedSections.location && <div className="space-y-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="City, State, or ZIP" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={filters.locations[0] || ''} onChange={handleLocationChange} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Miami, FL
                </button>
                <button className="p-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Orlando, FL
                </button>
                <button className="p-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Tampa, FL
                </button>
                <button className="p-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Jacksonville, FL
                </button>
              </div>
            </div>}
        </div>
        {/* Investment Strategy Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection('strategy')}>
            <h3 className="font-medium text-dark flex items-center">
              <TrendingUp size={16} className="mr-2 text-primary" />
              Investment Strategy
            </h3>
            {expandedSections.strategy ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          {expandedSections.strategy && <div className="space-y-2">
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="investmentStrategy" className="h-4 w-4 text-primary focus:ring-primary" checked={filters.investmentStrategy === 'wholesaling'} onChange={() => handleInvestmentStrategyChange('wholesaling')} />
                <span className="ml-2 text-sm font-medium">Wholesaling</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="investmentStrategy" className="h-4 w-4 text-primary focus:ring-primary" checked={filters.investmentStrategy === 'fixAndFlip'} onChange={() => handleInvestmentStrategyChange('fixAndFlip')} />
                <span className="ml-2 text-sm font-medium">Fix & Flip</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="investmentStrategy" className="h-4 w-4 text-primary focus:ring-primary" checked={filters.investmentStrategy === 'buyAndHold'} onChange={() => handleInvestmentStrategyChange('buyAndHold')} />
                <span className="ml-2 text-sm font-medium">Buy & Hold</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="investmentStrategy" className="h-4 w-4 text-primary focus:ring-primary" checked={filters.investmentStrategy === 'shortTermRental'} onChange={() => handleInvestmentStrategyChange('shortTermRental')} />
                <span className="ml-2 text-sm font-medium">
                  Short-Term Rental
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="investmentStrategy" className="h-4 w-4 text-primary focus:ring-primary" checked={filters.investmentStrategy === 'custom'} onChange={() => handleInvestmentStrategyChange('custom')} />
                <span className="ml-2 text-sm font-medium">Custom</span>
              </label>
            </div>}
        </div>
        {/* Property Type Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection('propertyType')}>
            <h3 className="font-medium text-dark flex items-center">
              <Home size={16} className="mr-2 text-primary" />
              Property Type
            </h3>
            {expandedSections.propertyType ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          {expandedSections.propertyType && <div className="space-y-2">
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.propertyTypes.includes('singleFamily')} onChange={() => handlePropertyTypeChange('singleFamily')} />
                <span className="ml-2 text-sm flex items-center font-medium">
                  <Home size={14} className="mr-1.5 text-gray-500" />
                  Single Family
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.propertyTypes.includes('multiFamily')} onChange={() => handlePropertyTypeChange('multiFamily')} />
                <span className="ml-2 text-sm flex items-center font-medium">
                  <Building size={14} className="mr-1.5 text-gray-500" />
                  Multi-Family
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.propertyTypes.includes('commercial')} onChange={() => handlePropertyTypeChange('commercial')} />
                <span className="ml-2 text-sm flex items-center font-medium">
                  <Building2 size={14} className="mr-1.5 text-gray-500" />
                  Commercial
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.propertyTypes.includes('land')} onChange={() => handlePropertyTypeChange('land')} />
                <span className="ml-2 text-sm flex items-center font-medium">
                  <SquareIcon size={14} className="mr-1.5 text-gray-500" />
                  Land
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.propertyTypes.includes('industrial')} onChange={() => handlePropertyTypeChange('industrial')} />
                <span className="ml-2 text-sm flex items-center font-medium">
                  <Building2 size={14} className="mr-1.5 text-gray-500" />
                  Industrial
                </span>
              </label>
            </div>}
        </div>
        {/* Price Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection('price')}>
            <h3 className="font-medium text-dark flex items-center">
              <DollarSign size={16} className="mr-2 text-primary" />
              Price
            </h3>
            {expandedSections.price ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          {expandedSections.price && <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Min
                  </label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" placeholder="Min Price" className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={filters.minPrice || ''} onChange={e => updateFilters({
                  minPrice: e.target.value ? Number(e.target.value) : undefined
                })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Max
                  </label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="number" placeholder="Max Price" className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={filters.maxPrice || ''} onChange={e => updateFilters({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined
                })} />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.maxPrice === 200000 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => updateFilters({
              maxPrice: 200000
            })}>
                  Under $200k
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.minPrice === 200000 && filters.maxPrice === 500000 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => updateFilters({
              minPrice: 200000,
              maxPrice: 500000
            })}>
                  $200k-$500k
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.minPrice === 500000 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => updateFilters({
              minPrice: 500000
            })}>
                  $500k+
                </button>
              </div>
            </div>}
        </div>
        {/* Motivation Factors Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={() => toggleSection('motivation')}>
            <h3 className="font-medium text-dark flex items-center">
              <User size={16} className="mr-2 text-primary" />
              Seller Motivation
            </h3>
            {expandedSections.motivation ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          {expandedSections.motivation && <div className="space-y-2">
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('outOfState')} onChange={() => handleMotivationFactorChange('outOfState')} />
                <span className="ml-2 text-sm font-medium">
                  Out-of-State Owner
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('taxLiens')} onChange={() => handleMotivationFactorChange('taxLiens')} />
                <span className="ml-2 text-sm font-medium">Tax Liens</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('divorce')} onChange={() => handleMotivationFactorChange('divorce')} />
                <span className="ml-2 text-sm font-medium">Divorce</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('probate')} onChange={() => handleMotivationFactorChange('probate')} />
                <span className="ml-2 text-sm font-medium">Probate</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('foreclosure')} onChange={() => handleMotivationFactorChange('foreclosure')} />
                <span className="ml-2 text-sm font-medium">Foreclosure</span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('vacant')} onChange={() => handleMotivationFactorChange('vacant')} />
                <span className="ml-2 text-sm font-medium">
                  Vacant Property
                </span>
              </label>
              <label className="flex items-center p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="h-4 w-4 text-primary rounded focus:ring-primary" checked={filters.motivationFactors.includes('highEquity')} onChange={() => handleMotivationFactorChange('highEquity')} />
                <span className="ml-2 text-sm font-medium">High Equity</span>
              </label>
            </div>}
        </div>
      </div>
      {/* Filter Action Buttons */}
      <div className="p-5 border-t border-gray-200 mt-auto">
        <button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center" onClick={applyFilters}>
          <Search size={16} className="mr-2" />
          Find Properties
        </button>
      </div>
    </div>;
};