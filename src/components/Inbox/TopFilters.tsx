import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
export const TopFilters = ({
  activeFilters,
  onFilterChange
}) => {
  const [showDateRanges, setShowDateRanges] = useState(false);
  const dateRanges = [{
    value: 'all',
    label: 'All Time'
  }, {
    value: 'today',
    label: 'Today'
  }, {
    value: 'week',
    label: 'This Week'
  }, {
    value: 'month',
    label: 'This Month'
  }];
  return <div className="flex flex-wrap items-center gap-3">
      {/* Unread filter */}
      <button className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${activeFilters.unread ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => onFilterChange('unread', !activeFilters.unread)}>
        <CheckCircle size={16} className="mr-1.5" />
        Unread
      </button>
      {/* Hot leads filter */}
      <button className={`flex items-center px-3 py-1.5 rounded-lg text-sm transition-colors ${activeFilters.hotLeads ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => onFilterChange('hotLeads', !activeFilters.hotLeads)}>
        <AlertCircle size={16} className="mr-1.5" />
        Hot Leads
      </button>
      {/* Date range filter */}
      <div className="relative">
        <button className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors" onClick={() => {
        setShowDateRanges(!showDateRanges);
      }}>
          <Calendar size={16} className="mr-1.5" />
          {dateRanges.find(range => range.value === activeFilters.dateRange)?.label}
          {showDateRanges ? <ChevronUp size={14} className="ml-1.5" /> : <ChevronDown size={14} className="ml-1.5" />}
        </button>
        {showDateRanges && <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48 py-1 animate-fade-in-up">
            {dateRanges.map(range => <button key={range.value} className={`w-full text-left px-4 py-2 text-sm transition-colors ${range.value === activeFilters.dateRange ? 'bg-primary bg-opacity-10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => {
          onFilterChange('dateRange', range.value);
          setShowDateRanges(false);
        }}>
                {range.label}
              </button>)}
          </div>}
      </div>
    </div>;
};