import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StepIndicators } from './StepIndicators';
import { PropertySelection } from './PropertySelection';
import { TemplateCustomization } from './TemplateCustomization';
import { ScheduleOptions } from './ScheduleOptions';
import { PreviewConfirmation } from './PreviewConfirmation';
export const CampaignBuilder = ({
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    targetArea: '',
    propertyTypes: [],
    selectedProperties: [],
    template: 'standard',
    customizations: {},
    schedule: {
      startDate: new Date(),
      endDate: null,
      frequency: 'daily',
      timeOfDay: '9:00 AM'
    },
    notes: ''
  });
  const totalSteps = 4;
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of modal
      document.getElementById('campaign-builder-content')?.scrollTo(0, 0);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of modal
      document.getElementById('campaign-builder-content')?.scrollTo(0, 0);
    }
  };
  const handleUpdateCampaignData = data => {
    setCampaignData({
      ...campaignData,
      ...data
    });
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PropertySelection campaignData={campaignData} updateCampaignData={handleUpdateCampaignData} />;
      case 2:
        return <TemplateCustomization campaignData={campaignData} updateCampaignData={handleUpdateCampaignData} />;
      case 3:
        return <ScheduleOptions campaignData={campaignData} updateCampaignData={handleUpdateCampaignData} />;
      case 4:
        return <PreviewConfirmation campaignData={campaignData} updateCampaignData={handleUpdateCampaignData} />;
      default:
        return null;
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-dark">Create New Campaign</h2>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-all" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Step indicators */}
        <StepIndicators currentStep={currentStep} totalSteps={totalSteps} />
        {/* Modal content - scrollable */}
        <div id="campaign-builder-content" className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>
        {/* Modal footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button className="px-4 py-2 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-all" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </button>
          <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all" onClick={currentStep === totalSteps ? onClose : handleNext}>
            {currentStep === totalSteps ? 'Create Campaign' : 'Continue'}
          </button>
        </div>
      </div>
    </div>;
};