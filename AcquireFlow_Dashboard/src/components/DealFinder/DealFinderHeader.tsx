import React, { useState } from 'react';
import { Plus, Bookmark, RefreshCw, X, Search, Briefcase, Home, Building, Hotel, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { InvestmentStrategy } from './Filters/InvestmentStrategyPresets';
interface DealFinderHeaderProps {
  propertyCount: number;
  selectedCount: number;
  clearSelection: () => void;
  investmentStrategy?: InvestmentStrategy;
  toggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}
export const DealFinderHeader: React.FC<DealFinderHeaderProps> = ({
  propertyCount,
  selectedCount,
  clearSelection,
  investmentStrategy = 'custom',
  toggleSidebar,
  isSidebarCollapsed = false
}) => {
  const [savedSearchesOpen, setSavedSearchesOpen] = useState(false);
  const [savedSearches, setSavedSearches] = useState([{
    id: 1,
    name: 'Miami Multi-Family',
    date: '2023-10-15',
    count: 342
  }, {
    id: 2,
    name: 'Orlando Commercial',
    date: '2023-11-02',
    count: 156
  }, {
    id: 3,
    name: 'Tampa Bay Residential',
    date: '2023-11-10',
    count: 489
  }]);
  const handleSaveSearch = () => {
    // In a real app, this would save the current search criteria
    const newSearch = {
      id: savedSearches.length + 1,
      name: `New Search ${savedSearches.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      count: Math.floor(Math.random() * 500) + 100
    };
    setSavedSearches([...savedSearches, newSearch]);
    alert('Search saved successfully!');
  };
  const handleDeleteSavedSearch = (id, e) => {
    e.stopPropagation();
    setSavedSearches(savedSearches.filter(search => search.id !== id));
  };
  const getStrategyIcon = () => {
    switch (investmentStrategy) {
      case 'wholesaling':
        return <Briefcase size={20} className="mr-2 text-primary" />;
      case 'fixAndFlip':
        return <Home size={20} className="mr-2 text-primary" />;
      case 'buyAndHold':
        return <Building size={20} className="mr-2 text-primary" />;
      case 'shortTermRental':
        return <Hotel size={20} className="mr-2 text-primary" />;
      default:
        return null;
    }
  };
  const getStrategyName = () => {
    switch (investmentStrategy) {
      case 'wholesaling':
        return 'Wholesaling';
      case 'fixAndFlip':
        return 'Fix & Flip';
      case 'buyAndHold':
        return 'Buy & Hold';
      case 'shortTermRental':
        return 'Short-Term Rental';
      default:
        return 'Custom';
    }
  };
  return <div className="bg-white border-b border-gray-200 px-6 py-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          {toggleSidebar && <button onClick={toggleSidebar} className="mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>}
          <div>
            <h1 className="text-2xl font-bold text-dark">Deal Finder</h1>
            <p className="text-gray-500 mt-1">
              Search properties and identify investment opportunities
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all shadow-sm" onClick={toggleSidebar}>
            <Filter size={16} className="mr-2" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="flex items-center px-4 py-2.5 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all shadow-sm">
            <Plus size={16} className="mr-2" />
            <span className="hidden sm:inline">New Search</span>
            <span className="sm:hidden">New</span>
          </button>
          <div className="relative">
            <button className="flex items-center px-4 py-2.5 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-all" onClick={() => setSavedSearchesOpen(!savedSearchesOpen)}>
              <Bookmark size={16} className="mr-2" />
              <span className="hidden sm:inline">Saved</span>
            </button>
            {savedSearchesOpen && <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">Saved Searches</h3>
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setSavedSearchesOpen(false)}>
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {savedSearches.length > 0 ? savedSearches.map(search => <div key={search.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => {
                // In a real app, this would load the search criteria
                alert(`Loading search: ${search.name}`);
                setSavedSearchesOpen(false);
              }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-dark">
                              {search.name}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span>{search.date}</span>
                              <span className="mx-2">•</span>
                              <span>{search.count} properties</span>
                            </div>
                          </div>
                          <button className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors" onClick={e => handleDeleteSavedSearch(search.id, e)}>
                            <X size={14} />
                          </button>
                        </div>
                      </div>) : <div className="p-4 text-center text-gray-500">
                      No saved searches yet
                    </div>}
                </div>
                <div className="p-3 bg-gray-50 rounded-b-lg">
                  <button className="w-full py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all" onClick={handleSaveSearch}>
                    Save Current Search
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {investmentStrategy !== 'custom' && <div className="bg-primary bg-opacity-10 px-3 py-1.5 rounded-lg flex items-center">
              {getStrategyIcon()}
              <span className="text-sm font-medium text-primary">
                {getStrategyName()} Mode
              </span>
            </div>}
          <div className="bg-gray-100 px-3 py-1.5 rounded-lg flex items-center">
            <span className="text-sm font-medium text-dark">
              <span className="font-bold">
                {propertyCount.toLocaleString()}
              </span>{' '}
              properties available
            </span>
            <RefreshCw size={14} className="ml-2 text-gray-500" />
          </div>
          {selectedCount > 0 && <div className="bg-primary bg-opacity-10 px-3 py-1.5 rounded-lg flex items-center">
              <span className="text-sm font-medium text-primary">
                <span className="font-bold">{selectedCount}</span> properties
                selected
              </span>
              <button className="ml-2 text-xs text-primary-dark underline hover:no-underline" onClick={clearSelection}>
                Clear
              </button>
            </div>}
        </div>
        <div className="text-sm text-gray-500">
          Last updated: Today at{' '}
          {new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
        </div>
      </div>
    </div>;
};