import React from 'react';
import { Check, Calendar, MapPin, Home, Mail, Clock, FileText, AlertCircle } from 'lucide-react';
export const PreviewConfirmation = ({
  campaignData,
  updateCampaignData
}) => {
  const formatDate = date => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark mb-2">Preview & Confirm</h3>
        <p className="text-gray-500">
          Review your campaign details before launching
        </p>
      </div>
      {/* Campaign summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h4 className="font-medium text-lg mb-4">Campaign Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  Campaign Name
                </h5>
                <p className="font-medium">{campaignData.name}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <MapPin size={16} className="mr-1" />
                  Target Area
                </h5>
                <p>{campaignData.targetArea || 'Multiple areas'}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <Home size={16} className="mr-1" />
                  Property Types
                </h5>
                <div className="flex flex-wrap gap-1">
                  {campaignData.propertyTypes && campaignData.propertyTypes.length > 0 ? campaignData.propertyTypes.map((type, index) => <span key={index} className="bg-gray-100 text-dark text-xs px-2 py-0.5 rounded">
                        {type}
                      </span>) : <span className="text-gray-500">All property types</span>}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <Mail size={16} className="mr-1" />
                  Selected Properties
                </h5>
                <p>
                  {campaignData.selectedProperties ? campaignData.selectedProperties.length : 0}{' '}
                  properties
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Schedule
                </h5>
                <div>
                  <p>Start: {formatDate(campaignData.schedule?.startDate)}</p>
                  {campaignData.schedule?.endDate && <p>End: {formatDate(campaignData.schedule.endDate)}</p>}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <Clock size={16} className="mr-1" />
                  Frequency
                </h5>
                <p>
                  {campaignData.schedule?.frequency === 'once' ? 'One-time send' : campaignData.schedule?.frequency === 'daily' ? 'Daily' : campaignData.schedule?.frequency === 'weekly' ? 'Weekly' : 'Custom schedule'}
                  {campaignData.schedule?.timeOfDay && ` at ${campaignData.schedule.timeOfDay}`}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FileText size={16} className="mr-1" />
                  Template
                </h5>
                <p>
                  {campaignData.template === 'standard' ? 'Standard Acquisition' : campaignData.template === 'aggressive' ? 'Aggressive Offer' : campaignData.template === 'luxury' ? 'Luxury Property' : campaignData.template === 'distressed' ? 'Distressed Property' : 'Custom Template'}
                </p>
                {campaignData.customizations && <div className="mt-1 text-sm text-gray-500">
                    {campaignData.customizations.offerPercentage && <span className="bg-gray-100 text-dark text-xs px-2 py-0.5 rounded mr-1">
                        {campaignData.customizations.offerPercentage} of asking
                      </span>}
                    {campaignData.customizations.closingTimeline && <span className="bg-gray-100 text-dark text-xs px-2 py-0.5 rounded mr-1">
                        {campaignData.customizations.closingTimeline} closing
                      </span>}
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Campaign preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-lg">Campaign Preview</h4>
          <button className="px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all">
            View Full Preview
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3">
              <h5 className="font-medium text-sm">Property Sample</h5>
            </div>
            <div className="p-3">
              {campaignData.selectedProperties && campaignData.selectedProperties[0] ? <div>
                  <div className="w-full h-24 bg-gray-200 rounded mb-2 overflow-hidden">
                    <img src={campaignData.selectedProperties[0].image} alt="Property" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-medium truncate">
                    {campaignData.selectedProperties[0].address}
                  </p>
                  <p className="text-xs text-gray-500">
                    {campaignData.selectedProperties[0].type}
                  </p>
                </div> : <div className="text-center py-8 text-gray-500 text-sm">
                  No properties selected
                </div>}
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3">
              <h5 className="font-medium text-sm">Email Preview</h5>
            </div>
            <div className="p-3">
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Subject:</strong> Property Acquisition Opportunity -
                  [Address]
                </p>
                <p>
                  <strong>To:</strong> [Agent Name]
                </p>
                <p className="text-xs text-gray-500 border-t border-gray-100 pt-2">
                  Hello [Agent Name],
                  <br />
                  <br />
                  I'm interested in discussing the property at [Address]...
                  <br />
                  <span className="text-primary">[View full email]</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-3">
              <h5 className="font-medium text-sm">LOI Preview</h5>
            </div>
            <div className="p-3">
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Letter of Intent</strong>
                </p>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <p>
                    <strong>Purchase Price:</strong> 90% of asking
                  </p>
                  <p>
                    <strong>Closing:</strong> 30 days
                  </p>
                  <p>
                    <strong>Contingencies:</strong> Inspection, Financing
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  <span className="text-primary">[View full LOI]</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Final checklist */}
      <div className="bg-tertiary bg-opacity-10 rounded-xl p-5 border border-tertiary border-opacity-20">
        <h4 className="font-medium text-lg mb-4">Pre-Launch Checklist</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
              <Check size={14} className="text-white" />
            </div>
            <span>Campaign name and target area defined</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
              <Check size={14} className="text-white" />
            </div>
            <span>
              Properties selected (
              {campaignData.selectedProperties ? campaignData.selectedProperties.length : 0}{' '}
              properties)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
              <Check size={14} className="text-white" />
            </div>
            <span>LOI template customized</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
              <Check size={14} className="text-white" />
            </div>
            <span>Campaign schedule configured</span>
          </div>
          <div className="flex items-start mt-4">
            <div className="text-tertiary-dark mr-3 mt-0.5">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-medium">Ready to launch!</p>
              <p className="text-xs text-gray-500 mt-1">
                Click "Create Campaign" to finalize and launch your campaign
                according to the schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
            <span className="text-sm">
              Save as template for future campaigns
            </span>
          </label>
        </div>
        <button className="px-6 py-2.5 bg-tertiary text-dark font-bold rounded-lg hover:bg-tertiary-dark transition-all shadow-sm">
          Create Campaign
        </button>
      </div>
    </div>;
};