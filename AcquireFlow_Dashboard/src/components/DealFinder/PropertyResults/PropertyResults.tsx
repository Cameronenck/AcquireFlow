import React, { useEffect, useState } from 'react';
import { PropertyCard } from './PropertyCard';
import { MapView } from './MapView';
import { Search, Grid, Map, SlidersHorizontal, ArrowUpDown, CheckSquare, X, Filter } from 'lucide-react';
export const PropertyResults = ({
  isMapView,
  handleViewToggle,
  selectedProperties,
  handlePropertySelect,
  isLoading,
  onViewPropertyDetails,
  onSelectAll,
  investmentStrategy,
  isSidebarCollapsed
}) => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('capRate');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [activeFilters, setActiveFilters] = useState(2); // Mock number of active filters
  // Generate sample property data
  useEffect(() => {
    const generateProperties = () => {
      const cities = ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'];
      const propertyTypes = ['Single Family', 'Multi-Family', 'Commercial', 'Condo'];
      const properties = [];
      for (let i = 1; i <= 30; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const beds = Math.floor(Math.random() * 5) + 1;
        const baths = Math.floor(Math.random() * 4) + 1;
        const sqft = Math.floor(Math.random() * 3000) + 800;
        const price = Math.floor(Math.random() * 1000000) + 150000;
        const capRate = (Math.random() * 5 + 4).toFixed(1);
        const cashOnCash = (Math.random() * 8 + 8).toFixed(1);
        const yearBuilt = Math.floor(Math.random() * 50) + 1970;
        const daysOnMarket = Math.floor(Math.random() * 120) + 1;
        properties.push({
          id: i,
          address: `${1000 + i} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
          city,
          state: 'FL',
          zip: `3${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          type,
          beds,
          baths,
          sqft,
          price,
          capRate,
          cashOnCash,
          yearBuilt,
          daysOnMarket,
          image: `https://source.unsplash.com/random/800x600/?house,${i}`,
          agent: {
            name: ['Sarah Johnson', 'Michael Brown', 'Jessica Lee', 'David Wilson'][Math.floor(Math.random() * 4)],
            company: ['Florida Realty', 'Sunshine Properties', 'Coastal Homes', 'Gulf Estates'][Math.floor(Math.random() * 4)],
            phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            email: `agent${i}@example.com`,
            avatar: `https://source.unsplash.com/random/100x100/?portrait,${i}`
          }
        });
      }
      return properties;
    };
    // Simulate API call
    setTimeout(() => {
      setProperties(generateProperties());
    }, 1000);
  }, []);
  // Filter properties based on search term
  const filteredProperties = properties.filter(property => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return property.address.toLowerCase().includes(searchLower) || property.city.toLowerCase().includes(searchLower) || property.type.toLowerCase().includes(searchLower);
  });
  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'capRate':
        return parseFloat(b.capRate) - parseFloat(a.capRate);
      case 'cashOnCash':
        return parseFloat(b.cashOnCash) - parseFloat(a.cashOnCash);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return a.daysOnMarket - b.daysOnMarket;
      default:
        return 0;
    }
  });
  // Check if all filtered properties are selected
  const areAllSelected = sortedProperties.length > 0 && sortedProperties.every(property => selectedProperties.includes(property.id));
  // Handle select all button click
  const handleSelectAll = () => {
    if (areAllSelected) {
      // If all are selected, deselect all
      onSelectAll([]);
    } else {
      // Otherwise select all filtered properties
      onSelectAll(sortedProperties.map(property => property.id));
    }
  };
  // Handle sort selection
  const handleSortSelect = sort => {
    setSortBy(sort);
    setShowSortDropdown(false);
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest('#sort-dropdown-container')) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <div className="flex-1 overflow-hidden flex flex-col">
      {/* Top filters bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 shadow-sm">
        <div className="relative w-full md:w-auto">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by address, city, or property type..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          {searchTerm && <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>}
        </div>
        <div className="flex items-center space-x-3">
          <button className={`flex items-center px-3 py-2 border rounded-lg transition-all ${areAllSelected ? 'bg-primary border-primary text-white hover:bg-primary-dark' : 'bg-white border-gray-200 text-dark hover:bg-gray-50'}`} onClick={handleSelectAll}>
            <CheckSquare size={16} className="mr-2" />
            <span>{areAllSelected ? 'Deselect All' : 'Select All'}</span>
          </button>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className={`p-1.5 rounded-md ${!isMapView ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'} transition-all`} onClick={() => !isMapView || handleViewToggle()}>
              <Grid size={20} />
            </button>
            <button className={`p-1.5 rounded-md ${isMapView ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'} transition-all`} onClick={() => isMapView || handleViewToggle()}>
              <Map size={20} />
            </button>
          </div>
          {isSidebarCollapsed && <button className={`flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all ${activeFilters > 0 ? 'text-primary' : 'text-dark'}`} onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} className="mr-2" />
              <span>Filters</span>
              {activeFilters > 0 && <span className="ml-1.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilters}
                </span>}
            </button>}
          <div id="sort-dropdown-container" className="relative">
            <button className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <ArrowUpDown size={16} className="mr-2" />
              <span>Sort</span>
            </button>
            {showSortDropdown && <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in">
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                    Sort Properties
                  </div>
                  <button className={`px-4 py-2.5 text-sm w-full text-left hover:bg-gray-50 transition-colors flex items-center ${sortBy === 'capRate' ? 'text-primary font-medium' : ''}`} onClick={() => handleSortSelect('capRate')}>
                    <span className="w-5 h-5 mr-3 inline-flex items-center justify-center">
                      {sortBy === 'capRate' && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                    </span>
                    Cap Rate (High to Low)
                  </button>
                  <button className={`px-4 py-2.5 text-sm w-full text-left hover:bg-gray-50 transition-colors flex items-center ${sortBy === 'cashOnCash' ? 'text-primary font-medium' : ''}`} onClick={() => handleSortSelect('cashOnCash')}>
                    <span className="w-5 h-5 mr-3 inline-flex items-center justify-center">
                      {sortBy === 'cashOnCash' && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                    </span>
                    Cash on Cash (High to Low)
                  </button>
                  <button className={`px-4 py-2.5 text-sm w-full text-left hover:bg-gray-50 transition-colors flex items-center ${sortBy === 'price-low' ? 'text-primary font-medium' : ''}`} onClick={() => handleSortSelect('price-low')}>
                    <span className="w-5 h-5 mr-3 inline-flex items-center justify-center">
                      {sortBy === 'price-low' && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                    </span>
                    Price (Low to High)
                  </button>
                  <button className={`px-4 py-2.5 text-sm w-full text-left hover:bg-gray-50 transition-colors flex items-center ${sortBy === 'price-high' ? 'text-primary font-medium' : ''}`} onClick={() => handleSortSelect('price-high')}>
                    <span className="w-5 h-5 mr-3 inline-flex items-center justify-center">
                      {sortBy === 'price-high' && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                    </span>
                    Price (High to Low)
                  </button>
                  <button className={`px-4 py-2.5 text-sm w-full text-left hover:bg-gray-50 transition-colors flex items-center ${sortBy === 'newest' ? 'text-primary font-medium' : ''}`} onClick={() => handleSortSelect('newest')}>
                    <span className="w-5 h-5 mr-3 inline-flex items-center justify-center">
                      {sortBy === 'newest' && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                    </span>
                    Newest Listings
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto p-6">
        {isMapView ? <MapView properties={sortedProperties} /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map(property => <PropertyCard key={property.id} property={property} isSelected={selectedProperties.includes(property.id)} onSelect={() => handlePropertySelect(property.id)} onViewDetails={onViewPropertyDetails} investmentStrategy={investmentStrategy} />)}
            {sortedProperties.length === 0 && !isLoading && <div className="col-span-3 flex flex-col items-center justify-center py-12">
                <img src="https://illustrations.popsy.co/gray/house-searching.svg" alt="No properties found" className="w-48 h-48 mb-6" />
                <h3 className="text-xl font-bold text-dark mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  Try adjusting your search criteria to see more results
                </p>
                <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all" onClick={() => setSearchTerm('')}>
                  Clear Search
                </button>
              </div>}
            {isLoading && <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => <div key={index} className="bg-white rounded-xl overflow-hidden animate-pulse shadow-sm">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-5">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between mb-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>)}
              </div>}
          </div>}
      </div>
    </div>;
};