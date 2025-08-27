import React, { useEffect, useState, useRef } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { contactTypes, allTags } from './mockData';
type ContactsSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    types: string[];
    relationshipStrength: [number, number];
    tags: string[];
    lastInteraction: string;
  };
  setFilters: (filters: any) => void;
};
export const ContactsSearch = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters
}: ContactsSearchProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleTypeToggle = (type: string) => {
    setFilters({
      ...filters,
      types: filters.types.includes(type) ? filters.types.filter(t => t !== type) : [...filters.types, type]
    });
  };
  const handleTagToggle = (tag: string) => {
    setFilters({
      ...filters,
      tags: filters.tags.includes(tag) ? filters.tags.filter(t => t !== tag) : [...filters.tags, tag]
    });
  };
  const handleRelationshipStrengthChange = (value: [number, number]) => {
    setFilters({
      ...filters,
      relationshipStrength: value
    });
  };
  const handleLastInteractionChange = (value: string) => {
    setFilters({
      ...filters,
      lastInteraction: value
    });
  };
  const clearFilters = () => {
    setFilters({
      types: [],
      relationshipStrength: [0, 100],
      tags: [],
      lastInteraction: ''
    });
  };
  const hasActiveFilters = () => {
    return filters.types.length > 0 || filters.tags.length > 0 || filters.relationshipStrength[0] > 0 || filters.relationshipStrength[1] < 100 || filters.lastInteraction !== '';
  };
  return <div className="relative flex-1 max-w-2xl" ref={filterRef}>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search contacts, companies, or tags..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          {searchQuery && <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>}
        </div>
        <button className={`ml-3 px-3.5 py-2.5 border rounded-xl flex items-center transition-colors ${hasActiveFilters() ? 'border-primary text-primary bg-primary bg-opacity-5' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`} onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Filter size={18} className="mr-2" />
          Filters
          {hasActiveFilters() && <span className="ml-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {filters.types.length + filters.tags.length + (filters.lastInteraction ? 1 : 0) + (filters.relationshipStrength[0] > 0 || filters.relationshipStrength[1] < 100 ? 1 : 0)}
            </span>}
          {isFilterOpen ? <ChevronUp size={16} className="ml-2 transition-transform" /> : <ChevronDown size={16} className="ml-2 transition-transform" />}
        </button>
      </div>
      {isFilterOpen && <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-lg p-5 animate-fade-in-up">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-medium text-dark">Filter Contacts</h3>
            {hasActiveFilters() && <button className="text-sm text-primary hover:underline transition-colors" onClick={clearFilters}>
                Clear All
              </button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Type Filter */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">
                Contact Type
              </h4>
              <div className="flex flex-wrap gap-2">
                {contactTypes.map(type => <button key={type} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${filters.types.includes(type) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleTypeToggle(type)}>
                    {type}
                  </button>)}
              </div>
            </div>
            {/* Relationship Strength Filter */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">
                Relationship Strength:{' '}
                <span className="text-primary">
                  {filters.relationshipStrength[0]} -{' '}
                  {filters.relationshipStrength[1]}
                </span>
              </h4>
              <div className="px-2 space-y-4">
                <div className="relative pt-1">
                  <label className="text-xs text-gray-500">Minimum</label>
                  <input type="range" min={0} max={100} value={filters.relationshipStrength[0]} onChange={e => handleRelationshipStrengthChange([parseInt(e.target.value), filters.relationshipStrength[1]])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div className="relative pt-1">
                  <label className="text-xs text-gray-500">Maximum</label>
                  <input type="range" min={0} max={100} value={filters.relationshipStrength[1]} onChange={e => handleRelationshipStrengthChange([filters.relationshipStrength[0], parseInt(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
              </div>
            </div>
            {/* Last Interaction Filter */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">
                Last Interaction
              </h4>
              <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={filters.lastInteraction} onChange={e => handleLastInteractionChange(e.target.value)}>
                <option value="">Any time</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last 3 months</option>
                <option value="year">Last year</option>
              </select>
            </div>
            {/* Tags Filter */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => <button key={tag} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${filters.tags.includes(tag) ? 'bg-tertiary text-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleTagToggle(tag)}>
                    {tag}
                  </button>)}
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
            <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg transition-colors hover:bg-primary-dark" onClick={() => setIsFilterOpen(false)}>
              Apply Filters
            </button>
          </div>
        </div>}
    </div>;
};