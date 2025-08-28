import React from 'react';
import { Grid, List, Map } from 'lucide-react';
import { ViewMode } from './ContactsPage';
type ViewToggleProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};
export const ViewToggle = ({
  viewMode,
  setViewMode
}: ViewToggleProps) => {
  return <div className="flex bg-gray-100 rounded-xl p-1 shadow-sm">
      <button className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:bg-gray-200'}`} onClick={() => setViewMode('list')} title="List View">
        <List size={20} />
      </button>
      <button className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:bg-gray-200'}`} onClick={() => setViewMode('grid')} title="Grid View">
        <Grid size={20} />
      </button>
      <button className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:bg-gray-200'}`} onClick={() => setViewMode('map')} title="Map View">
        <Map size={20} />
      </button>
    </div>;
};