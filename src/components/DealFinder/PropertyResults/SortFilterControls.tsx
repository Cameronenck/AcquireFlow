import React from 'react';
import { X } from 'lucide-react';
export const SortFilterControls = ({
  sortBy,
  handleSort,
  onClose
}) => {
  const sortOptions = [{
    id: 'newest',
    label: 'Newest Listings'
  }, {
    id: 'price-low',
    label: 'Price (Low to High)'
  }, {
    id: 'price-high',
    label: 'Price (High to Low)'
  }, {
    id: 'cap-rate',
    label: 'Highest Cap Rate'
  }, {
    id: 'cash-on-cash',
    label: 'Highest Cash-on-Cash'
  }];
  return <div className="absolute top-16 right-4 z-20 bg-white rounded-xl shadow-lg border border-gray-200 w-64 animate-count-up">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium text-dark">Sort & Filter</h3>
        <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
          <X size={18} className="text-gray-500" />
        </button>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Sort By</h4>
        <div className="space-y-1">
          {sortOptions.map(option => <div key={option.id} className={`flex items-center p-2 rounded-lg cursor-pointer ${sortBy === option.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`} onClick={() => {
          handleSort(option.id);
          onClose();
        }}>
              <div className={`w-4 h-4 rounded-full mr-2 border ${sortBy === option.id ? 'border-white bg-white' : 'border-gray-300'}`}>
                {sortBy === option.id && <div className="w-2 h-2 bg-primary rounded-full m-auto mt-1"></div>}
              </div>
              <span className="text-sm">{option.label}</span>
            </div>)}
        </div>
      </div>
    </div>;
};