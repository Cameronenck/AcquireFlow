import React, { useState } from 'react';
import { Search, Filter, MapPin, Home, Building, DollarSign, CheckSquare, X } from 'lucide-react';
export const PropertySelection = ({
  campaignData,
  updateCampaignData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    propertyTypes: campaignData.propertyTypes || [],
    priceRange: [0, 5000000],
    areas: []
  });
  // Mock property data
  const mockProperties = [{
    id: 1,
    address: '123 Main St, Miami, FL 33101',
    price: 850000,
    type: 'Single Family',
    beds: 4,
    baths: 3,
    sqft: 2200,
    image: 'https://source.unsplash.com/random/800x600/?house,1',
    area: 'Miami-Dade County'
  }, {
    id: 2,
    address: '456 Oak Ave, Orlando, FL 32801',
    price: 1250000,
    type: 'Multi-Family',
    beds: 8,
    baths: 6,
    sqft: 4500,
    image: 'https://source.unsplash.com/random/800x600/?house,2',
    area: 'Orlando Metro'
  }, {
    id: 3,
    address: '789 Pine Ln, Tampa, FL 33602',
    price: 650000,
    type: 'Single Family',
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://source.unsplash.com/random/800x600/?house,3',
    area: 'Tampa Bay Area'
  }, {
    id: 4,
    address: '101 Beach Rd, Naples, FL 34102',
    price: 2100000,
    type: 'Luxury',
    beds: 5,
    baths: 4.5,
    sqft: 3800,
    image: 'https://source.unsplash.com/random/800x600/?house,4',
    area: 'Naples'
  }, {
    id: 5,
    address: '202 Commercial Blvd, Jacksonville, FL 32202',
    price: 1750000,
    type: 'Commercial',
    beds: 0,
    baths: 2,
    sqft: 5200,
    image: 'https://source.unsplash.com/random/800x600/?building,1',
    area: 'Jacksonville'
  }, {
    id: 6,
    address: '303 Condo Way, Fort Lauderdale, FL 33301',
    price: 425000,
    type: 'Condo',
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: 'https://source.unsplash.com/random/800x600/?condo,1',
    area: 'Fort Lauderdale'
  }];
  const [selectedProperties, setSelectedProperties] = useState(campaignData.selectedProperties || []);
  const handlePropertySelect = property => {
    if (selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id));
    } else {
      setSelectedProperties([...selectedProperties, property]);
    }
  };
  const handleSelectAll = () => {
    if (selectedProperties.length === mockProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties([...mockProperties]);
    }
  };
  const handleFilterChange = (type, value) => {
    if (type === 'propertyTypes') {
      setSelectedFilters(prev => {
        const updated = prev.propertyTypes.includes(value) ? prev.propertyTypes.filter(t => t !== value) : [...prev.propertyTypes, value];
        return {
          ...prev,
          propertyTypes: updated
        };
      });
    } else if (type === 'areas') {
      setSelectedFilters(prev => {
        const updated = prev.areas.includes(value) ? prev.areas.filter(a => a !== value) : [...prev.areas, value];
        return {
          ...prev,
          areas: updated
        };
      });
    }
  };
  const handleContinue = () => {
    updateCampaignData({
      selectedProperties,
      propertyTypes: selectedFilters.propertyTypes,
      targetArea: selectedProperties.length > 0 ? [...new Set(selectedProperties.map(p => p.area))].join(', ') : ''
    });
  };
  const formatPrice = price => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };
  return <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark mb-2">Select Properties</h3>
        <p className="text-gray-500">
          Choose properties to include in your campaign
        </p>
      </div>
      {/* Campaign name input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Name
        </label>
        <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter campaign name" value={campaignData.name} onChange={e => updateCampaignData({
        name: e.target.value
      })} />
      </div>
      {/* Search and filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-md">
            <input type="text" placeholder="Search properties by address, area, or type..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex items-center ml-4">
            <button className="flex items-center px-3 py-2 bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-all">
              <Filter size={16} className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
        </div>
        {/* Filter options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Home size={16} className="mr-1" />
              Property Type
            </h4>
            <div className="space-y-2">
              {['Single Family', 'Multi-Family', 'Commercial', 'Condo', 'Luxury'].map(type => <label key={type} className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={selectedFilters.propertyTypes.includes(type)} onChange={() => handleFilterChange('propertyTypes', type)} />
                  <span className="text-sm">{type}</span>
                </label>)}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <MapPin size={16} className="mr-1" />
              Area
            </h4>
            <div className="space-y-2">
              {['Miami-Dade County', 'Orlando Metro', 'Tampa Bay Area', 'Jacksonville', 'Naples', 'Fort Lauderdale'].map(area => <label key={area} className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked={selectedFilters.areas.includes(area)} onChange={() => handleFilterChange('areas', area)} />
                  <span className="text-sm">{area}</span>
                </label>)}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <DollarSign size={16} className="mr-1" />
              Price Range
            </h4>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Min</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
                    <option>$0</option>
                    <option>$500,000</option>
                    <option>$1,000,000</option>
                    <option>$1,500,000</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Max</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
                    <option>$500,000</option>
                    <option>$1,000,000</option>
                    <option>$2,000,000</option>
                    <option>$5,000,000+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Applied filters */}
        {(selectedFilters.propertyTypes.length > 0 || selectedFilters.areas.length > 0) && <div className="flex flex-wrap gap-2 mb-4">
            {selectedFilters.propertyTypes.map(type => <div key={type} className="bg-primary bg-opacity-10 text-primary text-sm px-2 py-1 rounded-lg flex items-center">
                {type}
                <button className="ml-1 p-0.5 rounded-full hover:bg-primary hover:bg-opacity-20" onClick={() => handleFilterChange('propertyTypes', type)}>
                  <X size={12} />
                </button>
              </div>)}
            {selectedFilters.areas.map(area => <div key={area} className="bg-tertiary bg-opacity-10 text-tertiary-dark text-sm px-2 py-1 rounded-lg flex items-center">
                {area}
                <button className="ml-1 p-0.5 rounded-full hover:bg-tertiary hover:bg-opacity-20" onClick={() => handleFilterChange('areas', area)}>
                  <X size={12} />
                </button>
              </div>)}
            <button className="text-sm text-gray-500 underline" onClick={() => setSelectedFilters({
          propertyTypes: [],
          priceRange: [0, 5000000],
          areas: []
        })}>
              Clear all
            </button>
          </div>}
      </div>
      {/* Property selection */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center">
            <button className="flex items-center mr-4" onClick={handleSelectAll}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${selectedProperties.length === mockProperties.length ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
                {selectedProperties.length === mockProperties.length && <CheckSquare size={14} />}
              </div>
              <span className="text-sm font-medium">Select All</span>
            </button>
            <span className="text-sm text-gray-500">
              {selectedProperties.length} of {mockProperties.length} properties
              selected
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Showing {mockProperties.length} properties
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {mockProperties.map(property => <div key={property.id} className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${selectedProperties.find(p => p.id === property.id) ? 'bg-primary bg-opacity-5' : ''}`} onClick={() => handlePropertySelect(property)}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center mr-4 ${selectedProperties.find(p => p.id === property.id) ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
                {selectedProperties.find(p => p.id === property.id) && <CheckSquare size={14} />}
              </div>
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-dark">{property.address}</h4>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="mr-3">{property.type}</span>
                  {property.type !== 'Commercial' && <>
                      <span className="mr-3">{property.beds} beds</span>
                      <span className="mr-3">{property.baths} baths</span>
                    </>}
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-6">
                  <span className="font-medium text-dark">
                    {formatPrice(property.price)}
                  </span>
                </div>
                <div className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {property.area}
                </div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Selected properties summary */}
      <div className="bg-tertiary bg-opacity-10 rounded-xl p-5 border border-tertiary border-opacity-20">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-dark">Selected Properties Summary</h4>
          <span className="text-sm bg-tertiary text-dark px-2 py-1 rounded font-medium">
            {selectedProperties.length} Properties
          </span>
        </div>
        {selectedProperties.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-sm text-gray-500 mb-1">Areas</h5>
              <div className="text-sm">
                {[...new Set(selectedProperties.map(p => p.area))].join(', ')}
              </div>
            </div>
            <div>
              <h5 className="text-sm text-gray-500 mb-1">Property Types</h5>
              <div className="text-sm">
                {[...new Set(selectedProperties.map(p => p.type))].join(', ')}
              </div>
            </div>
            <div>
              <h5 className="text-sm text-gray-500 mb-1">Price Range</h5>
              <div className="text-sm">
                {formatPrice(Math.min(...selectedProperties.map(p => p.price)))}{' '}
                -
                {formatPrice(Math.max(...selectedProperties.map(p => p.price)))}
              </div>
            </div>
          </div> : <div className="text-center py-4">
            <p className="text-gray-500">No properties selected yet</p>
            <p className="text-sm mt-1">
              Select properties above to see the summary
            </p>
          </div>}
      </div>
      <div className="mt-6 text-right">
        <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all" onClick={handleContinue} disabled={selectedProperties.length === 0 || !campaignData.name}>
          Continue
        </button>
      </div>
    </div>;
};