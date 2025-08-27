import React, { useState } from 'react';
import { FileText, Edit, Eye, Copy, Check } from 'lucide-react';
export const TemplateCustomization = ({
  campaignData,
  updateCampaignData
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(campaignData.template || 'standard');
  const [showPreview, setShowPreview] = useState(false);
  const templates = [{
    id: 'standard',
    name: 'Standard Acquisition',
    description: 'A professional template for standard property acquisitions',
    responseRate: '18.7%',
    recommended: true
  }, {
    id: 'aggressive',
    name: 'Aggressive Offer',
    description: 'A direct template for below-market acquisitions',
    responseRate: '12.4%'
  }, {
    id: 'luxury',
    name: 'Luxury Property',
    description: 'Tailored for high-end and luxury properties',
    responseRate: '22.1%'
  }, {
    id: 'distressed',
    name: 'Distressed Property',
    description: 'For properties needing significant renovation',
    responseRate: '15.8%'
  }, {
    id: 'custom',
    name: 'Custom Template',
    description: 'Create your own template from scratch',
    responseRate: 'N/A'
  }];
  const handleTemplateSelect = templateId => {
    setSelectedTemplate(templateId);
    updateCampaignData({
      template: templateId
    });
  };
  const handleContinue = () => {
    updateCampaignData({
      template: selectedTemplate,
      customizations: {
        offerPercentage: '90%',
        closingTimeline: '30 days',
        contingencies: ['Inspection', 'Financing']
      }
    });
  };
  return <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark mb-2">
          Customize LOI Template
        </h3>
        <p className="text-gray-500">
          Select and customize the Letter of Intent template for your campaign
        </p>
      </div>
      {/* Template selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {templates.map(template => <div key={template.id} className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-primary bg-primary bg-opacity-5 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`} onClick={() => handleTemplateSelect(template.id)}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <FileText size={18} className={selectedTemplate === template.id ? 'text-primary' : 'text-gray-400'} />
                <h4 className="font-medium ml-2">{template.name}</h4>
              </div>
              {template.recommended && <span className="text-xs bg-tertiary px-1.5 py-0.5 rounded text-dark font-medium">
                  Recommended
                </span>}
            </div>
            <p className="text-sm text-gray-500 mb-2">{template.description}</p>
            {template.responseRate !== 'N/A' && <div className="text-xs">
                <span className="text-gray-500">Avg. Response Rate: </span>
                <span className={`font-medium ${parseFloat(template.responseRate) > 20 ? 'text-primary' : 'text-gray-700'}`}>
                  {template.responseRate}
                </span>
              </div>}
          </div>)}
      </div>
      {/* Template customization */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-lg">Template Customization</h4>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all" onClick={() => setShowPreview(!showPreview)}>
              <Eye size={16} className="mr-1.5" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button className="flex items-center px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all">
              <Edit size={16} className="mr-1.5" />
              Advanced Edit
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Percentage of Asking Price
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="95">95% of asking price</option>
                  <option value="90" selected>
                    90% of asking price
                  </option>
                  <option value="85">85% of asking price</option>
                  <option value="80">80% of asking price</option>
                  <option value="custom">Custom percentage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Closing Timeline
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="15">15 days</option>
                  <option value="30" selected>
                    30 days
                  </option>
                  <option value="45">45 days</option>
                  <option value="60">60 days</option>
                  <option value="custom">Custom timeline</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contingencies
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                    <span className="text-sm">Inspection Contingency</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                    <span className="text-sm">Financing Contingency</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                    <span className="text-sm">Appraisal Contingency</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                    <span className="text-sm">Title Contingency</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit Amount
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="1">1% of offer price</option>
                  <option value="2" selected>
                    2% of offer price
                  </option>
                  <option value="3">3% of offer price</option>
                  <option value="5">5% of offer price</option>
                  <option value="custom">Custom amount</option>
                </select>
              </div>
            </div>
          </div>
          {showPreview && <div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="font-medium">Template Preview</h5>
                  <button className="text-primary text-sm flex items-center">
                    <Copy size={14} className="mr-1" />
                    Copy
                  </button>
                </div>
                <div className="text-sm space-y-2 text-gray-700">
                  <p>
                    <strong>Date:</strong> [Current Date]
                  </p>
                  <p>
                    <strong>To:</strong> [Agent Name]
                  </p>
                  <p>
                    <strong>Property Address:</strong> [Property Address]
                  </p>
                  <p>
                    <strong>Subject:</strong> Letter of Intent to Purchase
                    [Property Address]
                  </p>
                  <p>Dear [Agent Name],</p>
                  <p>
                    I am writing to express my interest in purchasing the
                    property located at [Property Address]. After careful
                    consideration of the property's location, condition, and
                    potential, I would like to submit the following Letter of
                    Intent:
                  </p>
                  <div className="bg-white border border-gray-200 rounded p-3 my-3">
                    <p className="mb-1">
                      <strong>Purchase Price:</strong> 90% of asking price
                      [Purchase Price]
                    </p>
                    <p className="mb-1">
                      <strong>Deposit:</strong> 2% of offer price [Deposit
                      Amount]
                    </p>
                    <p className="mb-1">
                      <strong>Closing Timeline:</strong> 30 days from acceptance
                    </p>
                    <p className="mb-1">
                      <strong>Contingencies:</strong> Inspection, Financing
                    </p>
                  </div>
                  <p>
                    I am prepared to move forward quickly and can provide proof
                    of funds upon request. My team and I have extensive
                    experience in real estate acquisitions in the [Target Area]
                    area and are committed to a smooth transaction process.
                  </p>
                  <p>
                    Please consider this a formal expression of my interest in
                    the property. I look forward to your response and am
                    available to discuss any aspects of this offer at your
                    convenience.
                  </p>
                  <p>Sincerely,</p>
                  <p>
                    [Your Name]
                    <br />
                    [Your Company]
                  </p>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>
                  Note: All [bracketed] fields will be automatically populated
                  with property-specific information.
                </p>
              </div>
            </div>}
        </div>
      </div>
      {/* Template performance stats */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
        <h4 className="font-medium mb-4">Template Performance Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">
              Average Response Rate
            </div>
            <div className="text-xl font-bold text-primary">18.7%</div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-primary rounded-full" style={{
              width: '18.7%'
            }}></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">
              LOI Acceptance Rate
            </div>
            <div className="text-xl font-bold text-tertiary-dark">5.2%</div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-tertiary rounded-full" style={{
              width: '5.2%'
            }}></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">
              Average Time to Response
            </div>
            <div className="text-xl font-bold">2.4 days</div>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-gray-600 rounded-full" style={{
              width: '24%'
            }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Optimization suggestions */}
      <div className="bg-tertiary bg-opacity-10 rounded-xl p-5 border border-tertiary border-opacity-20">
        <div className="flex items-start">
          <div className="bg-tertiary rounded-full p-2 mr-4">
            <Check size={18} className="text-dark" />
          </div>
          <div>
            <h4 className="font-medium text-dark mb-1">
              Optimization Suggestions
            </h4>
            <p className="text-sm mb-3">
              Based on historical data, we recommend the following adjustments
              to maximize response rates:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check size={14} className="text-primary mr-2 flex-shrink-0" />
                <span>
                  Include a personalized note about why you're interested in the
                  specific property
                </span>
              </li>
              <li className="flex items-center">
                <Check size={14} className="text-primary mr-2 flex-shrink-0" />
                <span>
                  Mention your closing timeline prominently (30 days is optimal
                  for most sellers)
                </span>
              </li>
              <li className="flex items-center">
                <Check size={14} className="text-primary mr-2 flex-shrink-0" />
                <span>
                  Highlight your experience with similar properties in the area
                </span>
              </li>
              <li className="flex items-center">
                <Check size={14} className="text-primary mr-2 flex-shrink-0" />
                <span>
                  Include your contact information in multiple places for easy
                  access
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>;
};