import React, { useEffect, useState } from 'react';
import { FilterProvider } from './Filters/FilterContext';
import { FilterSidebar } from './Filters/FilterSidebar';
import { FilterState } from './Filters/FilterContext';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { PropertyMap } from './PropertyMap';
import { BulkSelectionToolbar } from './PropertyResults/BulkSelectionToolbar';
import { BulkOfferModal } from './BulkOfferModal';
import { DealFinderHeader } from './DealFinderHeader';
import { Home, Building, MapPin, DollarSign, TrendingUp, Star, Heart, Map, Grid, List, Clock, CheckSquare, FileText, Mail } from 'lucide-react';
interface PropertyResult {
  id: number;
  address: string;
  city: string;
  state: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  cashFlow: number;
  capRate: number;
  roi: number;
  rehabCost: number;
  motivationFactors: string[];
  daysOnMarket: number;
  dealScore: number;
  lat: number;
  lng: number;
}
export const DealFinder: React.FC = () => {
  const [results, setResults] = useState<PropertyResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilteredResults, setIsFilteredResults] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyResult | null>(null);
  const [savedProperties, setSavedProperties] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [showBulkOfferModal, setShowBulkOfferModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [investmentStrategy, setInvestmentStrategy] = useState<'wholesaling' | 'fixAndFlip' | 'buyAndHold' | 'shortTermRental' | 'custom'>('buyAndHold');
  // Fetch initial properties when component mounts
  useEffect(() => {
    fetchInitialProperties();
  }, []);
  // Function to fetch initial properties
  const fetchInitialProperties = () => {
    setIsLoading(true);
    setIsFilteredResults(false);
    setSelectedProperties([]); // Clear selections when refreshing
    // In a real application, this would be an API call
    // For now, we'll simulate a delay and then set dummy results
    setTimeout(() => {
      // Generate between 8-15 properties
      const count = Math.floor(Math.random() * 7) + 8;
      const generatedResults: PropertyResult[] = [];
      // Florida coordinates (approximate for different cities)
      const floridaCities = [{
        city: 'Orlando',
        lat: 28.5383,
        lng: -81.3792
      }, {
        city: 'Miami',
        lat: 25.7617,
        lng: -80.1918
      }, {
        city: 'Tampa',
        lat: 27.9506,
        lng: -82.4572
      }, {
        city: 'Jacksonville',
        lat: 30.3322,
        lng: -81.6557
      }, {
        city: 'Fort Lauderdale',
        lat: 26.1224,
        lng: -80.1373
      }];
      for (let i = 1; i <= count; i++) {
        // Select a city
        const cityIndex = Math.floor(Math.random() * floridaCities.length);
        const selectedCity = floridaCities[cityIndex].city;
        // Add some randomness to coordinates to spread properties around
        const latOffset = (Math.random() - 0.5) * 0.1;
        const lngOffset = (Math.random() - 0.5) * 0.1;
        // Generate a property
        const property: PropertyResult = {
          id: i,
          address: `${1000 + i} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
          city: selectedCity,
          state: 'FL',
          price: Math.round(100000 + Math.random() * 400000),
          type: ['Single Family', 'Multi-Family', 'Commercial', 'Land', 'Industrial'][Math.floor(Math.random() * 5)],
          beds: Math.floor(Math.random() * 4) + 2,
          baths: Math.floor(Math.random() * 3) + 1,
          sqft: Math.floor(Math.random() * 2000) + 1000,
          image: `https://source.unsplash.com/random/800x600/?house,${i}`,
          cashFlow: Math.floor(Math.random() * 1000) + 200,
          capRate: Math.floor(Math.random() * 10) + 5,
          roi: Math.floor(Math.random() * 20) + 10,
          rehabCost: Math.floor(Math.random() * 50000) + 5000,
          motivationFactors: ['Out-of-State', 'Tax Liens', 'Divorce', 'Probate', 'Foreclosure', 'Vacant', 'High Equity'].slice(0, Math.floor(Math.random() * 3) + 1),
          daysOnMarket: Math.floor(Math.random() * 90) + 10,
          dealScore: Math.floor(Math.random() * 30) + 70,
          lat: floridaCities[cityIndex].lat + latOffset,
          lng: floridaCities[cityIndex].lng + lngOffset
        };
        generatedResults.push(property);
      }
      setResults(generatedResults);
      setIsLoading(false);
    }, 1500);
  };
  const handleFiltersApplied = (filters: FilterState) => {
    setIsLoading(true);
    setIsFilteredResults(true);
    setSelectedProperties([]); // Clear selections when applying filters
    // Update investment strategy based on filter selection if available
    if (filters.investmentStrategy) {
      setInvestmentStrategy(filters.investmentStrategy as any);
    }
    // In a real application, this would be an API call
    // For now, we'll simulate a delay and then set dummy results
    setTimeout(() => {
      // Generate between 5-15 properties
      const count = Math.floor(Math.random() * 10) + 5;
      const generatedResults: PropertyResult[] = [];
      // Florida coordinates (approximate for different cities)
      const floridaCities = [{
        city: 'Orlando',
        lat: 28.5383,
        lng: -81.3792
      }, {
        city: 'Miami',
        lat: 25.7617,
        lng: -80.1918
      }, {
        city: 'Tampa',
        lat: 27.9506,
        lng: -82.4572
      }, {
        city: 'Jacksonville',
        lat: 30.3322,
        lng: -81.6557
      }, {
        city: 'Fort Lauderdale',
        lat: 26.1224,
        lng: -80.1373
      }];
      for (let i = 1; i <= count; i++) {
        // Select a city or use filter location
        const cityIndex = Math.floor(Math.random() * floridaCities.length);
        const selectedCity = filters.locations && filters.locations.length > 0 ? filters.locations[0].split(',')[0] : floridaCities[cityIndex].city;
        // Find coordinates for the city or use random ones
        const cityCoords = floridaCities.find(c => c.city === selectedCity) || floridaCities[cityIndex];
        // Add some randomness to coordinates to spread properties around
        const latOffset = (Math.random() - 0.5) * 0.1;
        const lngOffset = (Math.random() - 0.5) * 0.1;
        // Generate a property that somewhat matches the filters
        const property: PropertyResult = {
          id: i,
          address: `${1000 + i} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
          city: selectedCity,
          state: 'FL',
          price: Math.round((filters.minPrice || 100000) + Math.random() * ((filters.maxPrice || 500000) - (filters.minPrice || 100000))),
          type: filters.propertyTypes && filters.propertyTypes.length > 0 ? formatPropertyType(filters.propertyTypes[Math.floor(Math.random() * filters.propertyTypes.length)]) : ['Single Family', 'Multi-Family', 'Commercial', 'Land', 'Industrial'][Math.floor(Math.random() * 5)],
          beds: Math.floor(Math.random() * 4) + 2,
          baths: Math.floor(Math.random() * 3) + 1,
          sqft: Math.floor(Math.random() * 2000) + 1000,
          image: `https://source.unsplash.com/random/800x600/?house,${i}`,
          cashFlow: Math.floor(Math.random() * 1000) + 200,
          capRate: Math.floor(Math.random() * 10) + 5,
          roi: Math.floor(Math.random() * 20) + 10,
          rehabCost: Math.floor(Math.random() * 50000) + 5000,
          motivationFactors: filters.motivationFactors && filters.motivationFactors.length > 0 ? [formatMotivationFactor(filters.motivationFactors[Math.floor(Math.random() * filters.motivationFactors.length)])] : ['Out-of-State', 'Tax Liens', 'Divorce', 'Probate', 'Foreclosure', 'Vacant', 'High Equity'].slice(0, Math.floor(Math.random() * 3) + 1),
          daysOnMarket: Math.floor(Math.random() * 90) + 10,
          dealScore: Math.floor(Math.random() * 30) + 70,
          lat: cityCoords.lat + latOffset,
          lng: cityCoords.lng + lngOffset
        };
        generatedResults.push(property);
      }
      setResults(generatedResults);
      setIsLoading(false);
    }, 1500);
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
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Handle property selection
  const handleViewDetails = (property: PropertyResult) => {
    setSelectedProperty(property);
  };
  // Handle closing property details modal
  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };
  // Handle saving/favoriting properties
  const handleSaveProperty = (propertyId: number) => {
    setSavedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };
  // Toggle between grid and map view
  const toggleViewMode = (mode: 'grid' | 'map') => {
    setViewMode(mode);
  };
  // Handle refreshing results
  const handleRefreshResults = () => {
    fetchInitialProperties();
  };
  // Handle selecting/deselecting a property
  const handleSelectProperty = (propertyId: number) => {
    setSelectedProperties(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };
  // Handle selecting all properties
  const handleSelectAll = () => {
    if (selectedProperties.length === results.length) {
      // If all are selected, deselect all
      setSelectedProperties([]);
    } else {
      // Otherwise, select all
      setSelectedProperties(results.map(property => property.id));
    }
  };
  // Clear all property selections
  const handleClearSelection = () => {
    setSelectedProperties([]);
  };
  // Handle bulk offer
  const handleBulkOffer = () => {
    if (selectedProperties.length > 0) {
      setShowBulkOfferModal(true);
    } else {
      alert('Please select properties first');
    }
  };
  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return <FilterProvider onFiltersApplied={handleFiltersApplied}>
      <div className="flex flex-col h-full">
        <DealFinderHeader propertyCount={results.length} selectedCount={selectedProperties.length} clearSelection={handleClearSelection} investmentStrategy={investmentStrategy} toggleSidebar={toggleSidebar} isSidebarCollapsed={sidebarCollapsed} />
        <div className="flex flex-1 overflow-hidden">
          <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0' : 'w-80'} h-full`}>
            {!sidebarCollapsed && <FilterSidebar />}
          </div>
          <div className="flex-1 p-5 bg-gray-50 overflow-auto">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl font-semibold text-dark">
                  {isFilteredResults ? 'Filtered Properties' : 'Featured Properties'}
                </h2>
                {!isLoading && <p className="text-gray-500 mt-1">
                    {isFilteredResults ? `${results.length} properties matching your filters` : `${results.length} featured properties in Florida`}
                  </p>}
              </div>
              <div className="flex items-center gap-3">
                {!isLoading && results.length > 0 && <>
                    <button onClick={handleSelectAll} className={`px-3 py-1.5 text-sm rounded-lg flex items-center transition-colors ${selectedProperties.length === results.length && results.length > 0 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                      <CheckSquare size={16} className="mr-1.5" />
                      {selectedProperties.length === results.length && results.length > 0 ? 'Deselect All' : 'Select All'}
                    </button>
                    {selectedProperties.length > 0 && <button onClick={handleBulkOffer} className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg flex items-center hover:bg-primary-dark transition-colors">
                        <FileText size={16} className="mr-1.5" />
                        Send Bulk Offer
                      </button>}
                    <button onClick={handleRefreshResults} className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                      <Clock size={16} className="mr-1.5 text-primary" />
                      Refresh
                    </button>
                  </>}
                {results.length > 0 && !isLoading && <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
                    <button className={`px-3 py-1.5 rounded flex items-center text-sm ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => toggleViewMode('grid')}>
                      <Grid size={16} className="mr-1.5" />
                      Grid
                    </button>
                    <button className={`px-3 py-1.5 rounded flex items-center text-sm ${viewMode === 'map' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => toggleViewMode('map')}>
                      <Map size={16} className="mr-1.5" />
                      Map
                    </button>
                  </div>}
              </div>
            </div>
            {isLoading ? <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="text-center">
                  <svg className="animate-spin h-10 w-10 mx-auto text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-4 text-lg text-gray-600">
                    {isFilteredResults ? 'Finding properties matching your criteria...' : 'Loading featured investment properties...'}
                  </p>
                </div>
              </div> : <>
                {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.length > 0 ? results.map(property => <div key={property.id} className={`bg-white rounded-xl border ${selectedProperties.includes(property.id) ? 'border-primary ring-2 ring-primary ring-opacity-30' : 'border-gray-200'} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
                          <div className="h-48 bg-gray-200 relative">
                            <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
                              <Star size={12} className="mr-1" />
                              {property.dealScore}/100
                            </div>
                            <div className="absolute top-3 left-3 flex gap-2">
                              <button className={`p-2 rounded-full ${selectedProperties.includes(property.id) ? 'bg-primary text-white' : 'bg-white text-gray-500 hover:text-primary'} transition-colors shadow-sm`} onClick={e => {
                      e.stopPropagation();
                      handleSelectProperty(property.id);
                    }}>
                                <CheckSquare size={16} className={selectedProperties.includes(property.id) ? 'fill-current' : ''} />
                              </button>
                              <button className={`p-2 rounded-full ${savedProperties.includes(property.id) ? 'bg-rose-500 text-white' : 'bg-white text-gray-500 hover:text-rose-500'} transition-colors shadow-sm`} onClick={e => {
                      e.stopPropagation();
                      handleSaveProperty(property.id);
                    }}>
                                <Heart size={16} className={savedProperties.includes(property.id) ? 'fill-current' : ''} />
                              </button>
                            </div>
                            {property.motivationFactors && property.motivationFactors.length > 0 && <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                                  {property.motivationFactors.map((factor, index) => <span key={index} className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                        {factor}
                                      </span>)}
                                </div>}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-dark">
                                {property.address}
                              </h3>
                              <p className="text-primary font-bold">
                                {formatCurrency(property.price)}
                              </p>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <MapPin size={14} className="mr-1" />
                              <span>
                                {property.city}, {property.state}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center text-gray-500 text-sm">
                                <Home size={14} className="mr-1" />
                                <span>{property.type}</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <span>{property.beds} bd</span>
                                <span className="mx-1">•</span>
                                <span>{property.baths} ba</span>
                                <span className="mx-1">•</span>
                                <span>
                                  {property.sqft.toLocaleString()} sqft
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                <div className="text-xs text-gray-500">
                                  Cash Flow
                                </div>
                                <div className="font-medium text-primary">
                                  ${property.cashFlow}/mo
                                </div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                <div className="text-xs text-gray-500">
                                  Cap Rate
                                </div>
                                <div className="font-medium text-primary">
                                  {property.capRate}%
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors" onClick={() => handleViewDetails(property)}>
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>) : <div className="col-span-full bg-white rounded-xl border border-gray-200 p-8 text-center">
                        <h3 className="text-lg font-medium mb-2">
                          No properties found
                        </h3>
                        <p className="text-gray-500">
                          Try adjusting your filters to see more results.
                        </p>
                      </div>}
                  </div> : <div className="h-[calc(100vh-220px)] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {results.length > 0 ? <PropertyMap properties={results} onPropertySelect={handleViewDetails} selectedProperty={selectedProperty} savedProperties={savedProperties} onSaveProperty={handleSaveProperty} selectedProperties={selectedProperties} onSelectProperty={handleSelectProperty} /> : <div className="bg-white rounded-xl border border-gray-200 p-8 text-center h-64 flex items-center justify-center">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            No properties found
                          </h3>
                          <p className="text-gray-500">
                            Try adjusting your filters to see results on the
                            map.
                          </p>
                        </div>
                      </div>}
                  </div>}
              </>}
          </div>
        </div>
      </div>
      {/* Property Details Modal */}
      {selectedProperty && <PropertyDetailsModal property={selectedProperty} onClose={handleCloseDetails} onSave={handleSaveProperty} savedProperties={savedProperties} />}
      {/* Bulk Selection Toolbar */}
      {selectedProperties.length > 0 && <BulkSelectionToolbar selectedCount={selectedProperties.length} onClearSelection={handleClearSelection} investmentStrategy={investmentStrategy} />}
      {/* Bulk Offer Modal */}
      <BulkOfferModal isOpen={showBulkOfferModal} onClose={() => setShowBulkOfferModal(false)} selectedProperties={selectedProperties} propertyData={results} investmentStrategy={investmentStrategy} />
    </FilterProvider>;
};