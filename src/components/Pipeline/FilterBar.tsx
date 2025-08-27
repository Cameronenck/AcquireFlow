import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Deal, Filter as FilterType, PropertyType, DealPriority } from './types';
type FilterBarProps = {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  deals: Deal[];
};
export const FilterBar = ({
  filters,
  setFilters,
  deals
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  // Extract unique property types from deals
  const propertyTypes = Array.from(new Set(deals.map(deal => deal.property.type)));
  // Extract unique agents from deals
  const agents = Array.from(new Set(deals.map(deal => deal.agent.id))).map(agentId => {
    const agent = deals.find(deal => deal.agent.id === agentId)?.agent;
    return agent ? {
      id: agent.id,
      name: agent.name
    } : null;
  }).filter(Boolean) as {
    id: string;
    name: string;
  }[];
  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };
  // Handle property type toggle
  const handlePropertyTypeToggle = (type: PropertyType) => {
    const newPropertyTypes = filters.propertyType.includes(type) ? filters.propertyType.filter(t => t !== type) : [...filters.propertyType, type];
    setFilters({
      ...filters,
      propertyType: newPropertyTypes
    });
  };
  // Handle priority toggle
  const handlePriorityToggle = (priority: DealPriority) => {
    const newPriorities = filters.priority.includes(priority) ? filters.priority.filter(p => p !== priority) : [...filters.priority, priority];
    setFilters({
      ...filters,
      priority: newPriorities
    });
  };
  // Handle agent toggle
  const handleAgentToggle = (agentId: string) => {
    const newAgents = filters.agents.includes(agentId) ? filters.agents.filter(a => a !== agentId) : [...filters.agents, agentId];
    setFilters({
      ...filters,
      agents: newAgents
    });
  };
  // Handle value range change
  const handleValueRangeChange = (min: number, max: number) => {
    setFilters({
      ...filters,
      minValue: min,
      maxValue: max
    });
  };
  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      propertyType: [],
      minValue: 0,
      maxValue: 10000000,
      priority: [],
      agents: []
    });
  };
  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.search !== '' || filters.propertyType.length > 0 || filters.minValue > 0 || filters.maxValue < 10000000 || filters.priority.length > 0 || filters.agents.length > 0;
  };
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-2xl">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search deals, properties, or agents..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" value={filters.search} onChange={handleSearchChange} />
          {filters.search && <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setFilters({
          ...filters,
          search: ''
        })}>
              <X size={16} />
            </button>}
        </div>
        <button className={`ml-3 px-3 py-2 border rounded-xl flex items-center ${hasActiveFilters() ? 'border-primary text-primary bg-primary bg-opacity-5' : 'border-gray-200 text-gray-600 bg-white'}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={18} className="mr-1" />
          Filters
          {hasActiveFilters() && <span className="ml-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {filters.propertyType.length + filters.priority.length + filters.agents.length + (filters.minValue > 0 || filters.maxValue < 10000000 ? 1 : 0)}
            </span>}
          {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
        </button>
      </div>
      {showFilters && <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filter Deals</h3>
            {hasActiveFilters() && <button className="text-sm text-primary hover:underline" onClick={handleClearFilters}>
                Clear All
              </button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Property Type Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Property Type</h4>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map(type => <button key={type} className={`px-2 py-1 text-xs rounded-full ${filters.propertyType.includes(type) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handlePropertyTypeToggle(type)}>
                    {type}
                  </button>)}
              </div>
            </div>
            {/* Deal Value Range Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">
                Deal Value: {formatCurrency(filters.minValue)} -{' '}
                {formatCurrency(filters.maxValue)}
              </h4>
              <div className="px-2">
                <input type="range" min={0} max={10000000} step={100000} value={filters.minValue} onChange={e => handleValueRangeChange(parseInt(e.target.value), filters.maxValue)} className="w-full" />
                <input type="range" min={0} max={10000000} step={100000} value={filters.maxValue} onChange={e => handleValueRangeChange(filters.minValue, parseInt(e.target.value))} className="w-full" />
              </div>
            </div>
            {/* Priority Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Priority</h4>
              <div className="flex flex-wrap gap-2">
                {['High', 'Medium', 'Low'].map(priority => <button key={priority} className={`px-2 py-1 text-xs rounded-full ${filters.priority.includes(priority as DealPriority) ? priority === 'High' ? 'bg-secondary text-white' : priority === 'Medium' ? 'bg-tertiary text-dark' : 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handlePriorityToggle(priority as DealPriority)}>
                    {priority}
                  </button>)}
              </div>
            </div>
            {/* Agent Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Agent</h4>
              <div className="flex flex-wrap gap-2">
                {agents.map(agent => <button key={agent.id} className={`px-2 py-1 text-xs rounded-full ${filters.agents.includes(agent.id) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleAgentToggle(agent.id)}>
                    {agent.name}
                  </button>)}
              </div>
            </div>
          </div>
        </div>}
    </div>;
};