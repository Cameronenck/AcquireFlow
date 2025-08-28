import React from 'react';
import { X } from 'lucide-react';
interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: any) => void;
  campaign?: any;
  isEditing?: boolean;
}
export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onSave,
  campaign,
  isEditing = false
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="text-gray-500 mb-4">
            Campaign creation form will be implemented here
          </div>
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button onClick={() => onSave({})} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
              {isEditing ? 'Save Changes' : 'Create Campaign'}
            </button>
          </div>
        </div>
      </div>
    </div>;
};