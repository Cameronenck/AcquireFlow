import React, { useState } from 'react';
import { Save, Eye, Send, ChevronLeft, AlertTriangle, Home, DollarSign, Calendar, User, FileText, Search } from 'lucide-react';
export const LOIBuilder = ({
  template,
  onBack
}) => {
  const [loiName, setLoiName] = useState('New Letter of Intent');
  const [previewMode, setPreviewMode] = useState(false);
  // Mock property data
  const [selectedProperty, setSelectedProperty] = useState(null);
  const properties = [{
    id: 1,
    address: '123 Main St, Orlando, FL 32801',
    type: 'Single Family',
    price: 350000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://source.unsplash.com/random/800x600/?house,1',
    agent: 'Sarah Johnson',
    agentEmail: 'sarah@example.com'
  }, {
    id: 2,
    address: '456 Oak Ave, Miami, FL 33101',
    type: 'Multi-Family',
    price: 750000,
    beds: 6,
    baths: 4,
    sqft: 3200,
    image: 'https://source.unsplash.com/random/800x600/?house,2',
    agent: 'Michael Brown',
    agentEmail: 'michael@example.com'
  }, {
    id: 3,
    address: '789 Pine Rd, Tampa, FL 33602',
    type: 'Commercial',
    price: 1250000,
    beds: null,
    baths: null,
    sqft: 5000,
    image: 'https://source.unsplash.com/random/800x600/?building,3',
    agent: 'David Wilson',
    agentEmail: 'david@example.com'
  }];
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 p-2 rounded-lg hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-dark">{template.name}</h2>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center hover:bg-gray-50" onClick={() => setPreviewMode(!previewMode)}>
            <Eye size={16} className="mr-1.5" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
          <button className="px-3 py-1.5 bg-tertiary text-dark rounded-lg text-sm flex items-center hover:bg-tertiary-dark">
            <Save size={16} className="mr-1.5" />
            Save Draft
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center hover:bg-primary-dark">
            <Send size={16} className="mr-1.5" />
            Send LOI
          </button>
        </div>
      </div>
      {previewMode ? <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                LETTER OF INTENT TO PURCHASE REAL ESTATE
              </h2>
              <p className="text-gray-500">
                {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
              </p>
            </div>
            {selectedProperty ? <div className="space-y-6">
                <div>
                  <p className="mb-4">
                    <strong>Property Address:</strong>{' '}
                    {selectedProperty.address}
                  </p>
                  <p className="mb-4">
                    <strong>Recipient:</strong> {selectedProperty.agent}
                  </p>
                  <p className="mb-4">
                    <strong>Subject:</strong> Letter of Intent to Purchase{' '}
                    {selectedProperty.address}
                  </p>
                </div>
                <div>
                  <p className="mb-4">Dear {selectedProperty.agent},</p>
                  <p className="mb-4">
                    I am writing to express my interest in purchasing the
                    property located at {selectedProperty.address}. After
                    careful consideration of the property's location, condition,
                    and potential, I would like to submit the following Letter
                    of Intent:
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                  <p className="mb-2">
                    <strong>Purchase Price:</strong>{' '}
                    {formatCurrency(selectedProperty.price * 0.9)} (90% of
                    asking price)
                  </p>
                  <p className="mb-2">
                    <strong>Deposit:</strong>{' '}
                    {formatCurrency(selectedProperty.price * 0.02)} (2% of offer
                    price)
                  </p>
                  <p className="mb-2">
                    <strong>Closing Timeline:</strong> 30 days from acceptance
                  </p>
                  <p className="mb-2">
                    <strong>Contingencies:</strong> Inspection, Financing
                  </p>
                  <p>
                    <strong>Financing:</strong> Conventional financing with
                    proof of funds available upon request
                  </p>
                </div>
                <div>
                  <p className="mb-4">
                    I am prepared to move forward quickly and can provide proof
                    of funds upon request. My team and I have extensive
                    experience in real estate acquisitions in this area and are
                    committed to a smooth transaction process.
                  </p>
                  <p className="mb-4">
                    Please consider this a formal expression of my interest in
                    the property. I look forward to your response and am
                    available to discuss any aspects of this offer at your
                    convenience.
                  </p>
                  <p className="mb-4">Sincerely,</p>
                  <p>
                    [Your Name]
                    <br />
                    [Your Company]
                    <br />
                    [Your Contact Information]
                  </p>
                </div>
              </div> : <div className="text-center py-10 text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Please select a property to generate the LOI preview</p>
              </div>}
          </div>
        </div> : <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Properties */}
          <div className="col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">Select Property</h3>
              <button className="text-primary text-sm hover:underline flex items-center">
                <Search size={14} className="mr-1" />
                Browse
              </button>
            </div>
            <div className="p-4 space-y-3">
              {properties.map(property => <div key={property.id} className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedProperty?.id === property.id ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedProperty(property)}>
                  <div className="flex">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-3">
                      <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">
                        {property.address}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <Home size={12} className="mr-1" />
                        <span>{property.type}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <DollarSign size={12} className="mr-1" />
                        <span>{formatCurrency(property.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          {/* Right Column - LOI Form */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="font-medium">LOI Details</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Price
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={selectedProperty ? formatCurrency(selectedProperty.price * 0.9).replace('$', '') : ''} placeholder="Enter offer amount" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                      90% of asking
                    </div>
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Closing Timeline
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="15">15 days</option>
                      <option value="30" selected>
                        30 days
                      </option>
                      <option value="45">45 days</option>
                      <option value="60">60 days</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Financing Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="cash">All Cash</option>
                    <option value="conventional" selected>
                      Conventional Financing
                    </option>
                    <option value="fha">FHA Loan</option>
                    <option value="va">VA Loan</option>
                    <option value="owner">Owner Financing</option>
                  </select>
                </div>
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
                  Sender Information
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" />
                    </div>
                  </div>
                  <div>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Company" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Terms
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none" placeholder="Enter any additional terms or conditions..."></textarea>
              </div>
              <div className="bg-tertiary bg-opacity-10 rounded-lg p-4 border border-tertiary border-opacity-20">
                <div className="flex items-start">
                  <AlertTriangle size={18} className="text-tertiary-dark mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-dark">Important Note</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Always consult with your attorney before finalizing any
                      real estate offer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};