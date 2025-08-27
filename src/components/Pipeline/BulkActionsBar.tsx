import React from 'react';
import { Trash2, Tags, MoveHorizontal, X } from 'lucide-react';
type BulkActionsBarProps = {
  selectedCount: number;
  onAction: (action: string) => void;
  onClearSelection: () => void;
};
export const BulkActionsBar = ({
  selectedCount,
  onAction,
  onClearSelection
}: BulkActionsBarProps) => {
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-3 px-6 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium text-dark">
            {selectedCount} deals selected
          </span>
          <button className="ml-3 text-gray-500 hover:text-gray-700 text-sm flex items-center" onClick={onClearSelection}>
            <X size={16} className="mr-1" />
            Clear selection
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => onAction('move')}>
            <MoveHorizontal size={16} className="mr-2" />
            Move to Stage
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => onAction('tag')}>
            <Tags size={16} className="mr-2" />
            Add Tags
          </button>
          <button className="flex items-center px-3 py-2 bg-secondary bg-opacity-10 text-secondary rounded-lg hover:bg-opacity-20 transition-colors" onClick={() => onAction('delete')}>
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>;
};