import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
export const SelectAllHeader = ({
  totalProperties,
  selectedCount,
  onSelectAll,
  onDeselectAll
}) => {
  const allSelected = selectedCount > 0 && selectedCount === totalProperties;
  return <div className="bg-white shadow-sm border-b border-gray-200 py-3 px-6 flex items-center justify-between sticky top-16 z-10 transition-all duration-300">
      <div className="flex items-center">
        <button onClick={allSelected ? onDeselectAll : onSelectAll} className="flex items-center bg-dark text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all">
          {allSelected ? <CheckSquare size={18} className="mr-2" /> : <Square size={18} className="mr-2" />}
          <span>{allSelected ? 'Deselect All' : 'Select All'}</span>
        </button>
        <div className="ml-4 text-sm text-gray-600">
          {selectedCount > 0 ? <span className="bg-primary bg-opacity-10 px-3 py-1 rounded-lg text-primary font-medium">
              {selectedCount} of {totalProperties} selected
            </span> : <span>
              Select all {totalProperties.toLocaleString()} properties
            </span>}
        </div>
      </div>
      {selectedCount > 0 && <button onClick={onDeselectAll} className="text-sm text-gray-500 hover:text-gray-700 underline">
          Clear Selection
        </button>}
    </div>;
};