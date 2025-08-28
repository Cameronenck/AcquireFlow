import React from 'react';
import { X, FileText, Mail, DollarSign, CheckSquare } from 'lucide-react';
interface BulkSelectionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  investmentStrategy?: string;
}
export const BulkSelectionToolbar: React.FC<BulkSelectionToolbarProps> = ({
  selectedCount,
  onClearSelection,
  investmentStrategy = 'custom'
}) => {
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40 animate-slide-up">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary text-white p-2 rounded-lg mr-4">
            <CheckSquare size={20} />
          </div>
          <div>
            <h3 className="font-medium text-dark">
              {selectedCount} {selectedCount === 1 ? 'property' : 'properties'}{' '}
              selected
            </h3>
            <p className="text-sm text-gray-500">
              Take action on multiple properties at once
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" onClick={onClearSelection}>
            <X size={20} />
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center hover:bg-gray-50 transition-colors">
            <Mail size={16} className="mr-2" />
            Email
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center hover:bg-gray-50 transition-colors">
            <DollarSign size={16} className="mr-2" />
            Analyze
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center hover:bg-primary-dark transition-colors">
            <FileText size={16} className="mr-2" />
            Send Offer
          </button>
        </div>
      </div>
    </div>;
};