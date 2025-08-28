import React from 'react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
interface CampaignDetailProps {
  campaign: any;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  allCampaigns: any[];
}
export const CampaignDetail: React.FC<CampaignDetailProps> = ({
  campaign,
  onBack,
  onEdit,
  onDelete,
  allCampaigns
}) => {
  if (!campaign) return null;
  return <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="mr-2" />
          Back to Campaigns
        </button>
        <div className="flex space-x-3">
          <button onClick={onEdit} className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button onClick={onDelete} className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">{campaign.name}</h1>
        <div className="text-gray-500 mb-6">
          Campaign details and metrics will be displayed here
        </div>
      </div>
    </div>;
};