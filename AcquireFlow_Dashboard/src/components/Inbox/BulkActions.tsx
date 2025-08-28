import React from 'react';
import { CheckSquare, Trash2, Archive, Tag, Clock, Star, MessageSquare, FileText, X } from 'lucide-react';
export const BulkActions = ({
  selectedCount,
  onAction,
  onSelectAll,
  onClearSelection,
  allSelected
}) => {
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 flex items-center z-30 animate-count-up">
      <div className="flex items-center">
        <button className="flex items-center mr-3" onClick={onSelectAll}>
          <div className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${allSelected ? 'bg-primary border-primary text-white' : 'border-gray-300'}`}>
            {allSelected && <CheckSquare size={14} />}
          </div>
          <span className="text-sm font-medium">
            {allSelected ? 'Deselect All' : 'Select All'}
          </span>
        </button>
        <div className="h-6 border-r border-gray-300 mx-2"></div>
        <span className="text-sm font-medium text-primary">
          {selectedCount} selected
        </span>
      </div>
      <div className="flex items-center space-x-2 ml-6">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('archive')}>
          <Archive size={18} className="mr-1" />
          <span className="text-sm">Archive</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('delete')}>
          <Trash2 size={18} className="mr-1" />
          <span className="text-sm">Delete</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('tag')}>
          <Tag size={18} className="mr-1" />
          <span className="text-sm">Tag</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('followup')}>
          <Clock size={18} className="mr-1" />
          <span className="text-sm">Schedule Follow-up</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('mark-read')}>
          <CheckSquare size={18} className="mr-1" />
          <span className="text-sm">Mark as Read</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('bulk-reply')}>
          <MessageSquare size={18} className="mr-1" />
          <span className="text-sm">Bulk Reply</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center" onClick={() => onAction('export')}>
          <FileText size={18} className="mr-1" />
          <span className="text-sm">Export</span>
        </button>
      </div>
      <button className="ml-auto p-2 rounded-full hover:bg-gray-100 text-gray-500" onClick={onClearSelection}>
        <X size={20} />
      </button>
    </div>;
};