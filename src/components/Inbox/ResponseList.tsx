import React, { useEffect, useState, useRef } from 'react';
import { ResponseCard } from './ResponseCard';
import { Filter, CheckSquare, ChevronDown, ChevronUp, List } from 'lucide-react';
export const ResponseList = ({
  responses,
  selectedResponse,
  onSelectResponse,
  loading,
  selectedResponses,
  onSelectResponseCheckbox
}) => {
  const [visibleCount, setVisibleCount] = useState(15);
  const [sortBy, setSortBy] = useState('date');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const containerRef = useRef(null);
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, responses.length));
  };
  // Handle scroll for infinite loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollHeight - container.scrollTop - container.clientHeight < 200) {
        loadMore();
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [responses]);
  // Reset visible count when responses change (due to filters)
  useEffect(() => {
    setVisibleCount(15);
  }, [responses.length]);
  const handleSortChange = newSortBy => {
    setSortBy(newSortBy);
    setShowSortOptions(false);
  };
  const sortedResponses = [...responses].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'priority':
        return b.priorityScore - a.priorityScore;
      case 'status':
        const statusOrder = {
          hot: 0,
          warm: 1,
          cold: 2
        };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });
  const displayedResponses = sortedResponses.slice(0, visibleCount);
  return <>
      {/* Header with sort options */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center text-sm text-gray-500">
          <List size={16} className="mr-2 text-gray-400" />
          {responses.length} {responses.length === 1 ? 'response' : 'responses'}
        </div>
        <div className="relative">
          <button className="flex items-center text-sm text-gray-700 hover:text-primary transition-colors" onClick={() => setShowSortOptions(!showSortOptions)}>
            <Filter size={14} className="mr-1" />
            Sort:{' '}
            {sortBy === 'date' ? 'Newest' : sortBy === 'priority' ? 'Priority' : 'Status'}
            {showSortOptions ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
          </button>
          {showSortOptions && <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in-up">
              <div className="py-1">
                <button className={`px-4 py-2 text-sm w-full text-left hover:bg-gray-50 transition-colors ${sortBy === 'date' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSortChange('date')}>
                  Newest first
                </button>
                <button className={`px-4 py-2 text-sm w-full text-left hover:bg-gray-50 transition-colors ${sortBy === 'priority' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSortChange('priority')}>
                  Priority score
                </button>
                <button className={`px-4 py-2 text-sm w-full text-left hover:bg-gray-50 transition-colors ${sortBy === 'status' ? 'text-primary font-medium' : 'text-gray-700'}`} onClick={() => handleSortChange('status')}>
                  Status (Hot to Cold)
                </button>
              </div>
            </div>}
        </div>
      </div>
      {/* Response list with infinite scroll */}
      <div ref={containerRef} className="flex-1 overflow-y-auto momentum-scroll">
        {loading ?
      // Loading skeleton
      <div className="animate-pulse">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="border-b border-gray-100 p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>)}
          </div> : displayedResponses.length === 0 ?
      // No results
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <img src="https://illustrations.popsy.co/gray/message-empty.svg" alt="No responses" className="w-48 h-48 mb-4 opacity-70 animate-float" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No responses found
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              Try adjusting your filters or search criteria to see more results.
            </p>
          </div> :
      // Response cards
      displayedResponses.map(response => <ResponseCard key={response.id} response={response} isSelected={selectedResponse && selectedResponse.id === response.id} isChecked={selectedResponses.includes(response.id)} onSelect={() => onSelectResponse(response)} onCheckboxToggle={() => onSelectResponseCheckbox(response.id)} />)}
        {!loading && displayedResponses.length < responses.length && <div className="p-4 text-center">
            <button className="text-primary text-sm hover:underline transition-colors" onClick={loadMore}>
              Load more responses
            </button>
          </div>}
      </div>
    </>;
};