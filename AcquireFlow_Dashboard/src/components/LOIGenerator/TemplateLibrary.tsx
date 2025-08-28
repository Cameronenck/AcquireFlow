import React from 'react';
import { FileText, Home, Building, Building2, Warehouse, DollarSign } from 'lucide-react';
export const TemplateLibrary = ({
  onSelectTemplate
}) => {
  const templates = [{
    id: 1,
    name: 'Standard Acquisition LOI',
    category: 'single-family',
    description: 'General purpose LOI for single family home acquisitions',
    icon: <Home size={20} className="text-primary" />
  }, {
    id: 2,
    name: 'Multi-Family LOI',
    category: 'multi-family',
    description: 'Specialized for multi-family property acquisitions',
    icon: <Building size={20} className="text-primary" />
  }, {
    id: 3,
    name: 'Commercial LOI',
    category: 'commercial',
    description: 'For office buildings and commercial space acquisitions',
    icon: <Building2 size={20} className="text-primary" />
  }, {
    id: 4,
    name: 'Distressed Property LOI',
    category: 'single-family',
    description: 'For properties needing significant renovation',
    icon: <Home size={20} className="text-primary" />
  }, {
    id: 5,
    name: 'Cash Offer LOI',
    category: 'custom',
    description: 'Aggressive all-cash offer template for quick closings',
    icon: <DollarSign size={20} className="text-primary" />
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark">Select a Template</h2>
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => <div key={template.id} className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                  {template.icon}
                </div>
                <div>
                  <h3 className="font-medium text-dark">{template.name}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>
              <button onClick={() => onSelectTemplate(template)} className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Use Template
              </button>
            </div>
          </div>)}
      </div>
    </div>;
};