import React, { useState } from 'react';
import { MapPin, Plus, X } from 'lucide-react';
import { useFilters } from './FilterContext';
export const LocationFilter: React.FC = () => {
  const {
    filters,
    updateFilters
  } = useFilters();
  const [locationInput, setLocationInput] = useState('');
  const [radiusValue, setRadiusValue] = useState(filters.radius || 10);
  const [showRadiusSelector, setShowRadiusSelector] = useState(filters.locations && filters.locations.length > 0);
  const handleAddLocation = () => {
    if (!locationInput.trim()) return;
    const newLocations = [...(filters.locations || []), locationInput.trim()];
    updateFilters({
      locations: newLocations
    });
    setLocationInput('');
    setShowRadiusSelector(true);
  };
  const handleRemoveLocation = (location: string) => {
    const newLocations = (filters.locations || []).filter(loc => loc !== location);
    updateFilters({
      locations: newLocations
    });
    if (newLocations.length === 0) {
      setShowRadiusSelector(false);
    }
  };
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setRadiusValue(value);
    updateFilters({
      radius: value
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddLocation();
    }
  };
  return <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Enter city, state, or zip code" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={locationInput} onChange={e => setLocationInput(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors" onClick={handleAddLocation}>
          <Plus size={16} />
        </button>
      </div>
      {/* Selected locations */}
      {filters.locations && filters.locations.length > 0 && <div className="flex flex-wrap gap-2">
          {filters.locations.map(location => <div key={location} className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 text-sm">
              <MapPin size={14} className="mr-1.5 text-primary" />
              <span>{location}</span>
              <button className="ml-1.5 text-gray-500 hover:text-gray-700" onClick={() => handleRemoveLocation(location)}>
                <X size={14} />
              </button>
            </div>)}
        </div>}
      {/* Radius selector */}
      {showRadiusSelector && <div className="mt-4">
          <label className="block text-sm text-gray-700 mb-2">
            Search radius: {radiusValue} miles
          </label>
          <input type="range" min="1" max="100" step="1" value={radiusValue} onChange={handleRadiusChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 mile</span>
            <span>50 miles</span>
            <span>100 miles</span>
          </div>
        </div>}
    </div>;
};