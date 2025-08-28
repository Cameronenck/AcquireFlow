import React from 'react';
import { Search, FileText, Calendar, CheckCircle } from 'lucide-react';
export const StepIndicators = ({
  currentStep,
  totalSteps
}) => {
  const steps = [{
    number: 1,
    title: 'Select Properties',
    icon: <Search size={18} />
  }, {
    number: 2,
    title: 'Customize Template',
    icon: <FileText size={18} />
  }, {
    number: 3,
    title: 'Schedule Campaign',
    icon: <Calendar size={18} />
  }, {
    number: 4,
    title: 'Preview & Confirm',
    icon: <CheckCircle size={18} />
  }];
  return <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div className="flex justify-between">
        {steps.map(step => <div key={step.number} className="flex flex-col items-center relative">
            {/* Progress line */}
            {step.number < totalSteps && <div className="absolute top-5 left-[50%] w-full h-0.5 bg-gray-200 z-0">
                {currentStep > step.number && <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" style={{
            width: '100%'
          }}></div>}
              </div>}
            {/* Step circle */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${currentStep === step.number ? 'bg-primary text-white' : currentStep > step.number ? 'bg-primary bg-opacity-20 text-primary' : 'bg-gray-200 text-gray-500'}`}>
              {step.icon}
            </div>
            {/* Step title */}
            <span className={`mt-2 text-sm font-medium ${currentStep === step.number ? 'text-primary' : currentStep > step.number ? 'text-gray-700' : 'text-gray-500'}`}>
              {step.title}
            </span>
          </div>)}
      </div>
    </div>;
};