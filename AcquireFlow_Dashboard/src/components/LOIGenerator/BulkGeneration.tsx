import React, { useState } from 'react';
import { FileText, CheckSquare, ChevronDown, Filter, Upload, Download, Play, Pause, Clock, AlertTriangle, Check, X, BarChart2, Search, RefreshCw, List, Grid, ArrowRight, Home, Building, Building2, DollarSign } from 'lucide-react';
export const BulkGeneration = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTemplate, setSelectedTemplate] = useState('standard');
  const [selectedProperties, setSelectedProperties] = useState([1, 3]);
  const [showFilters, setShowFilters] = useState(false);
  const templates = [{
    id: 'standard',
    name: 'Standard Acquisition LOI'
  }, {
    id: 'aggressive',
    name: 'Aggressive Cash Offer'
  }, {
    id: 'multi-family',
    name: 'Multi-Family Value-Add'
  }, {
    id: 'commercial',
    name: 'Commercial Office Space'
  }, {
    id: 'custom',
    name: 'Custom Template'
  }];
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
  }, {
    id: 4,
    address: '101 Beach Blvd, Fort Lauderdale, FL 33301',
    type: 'Single Family',
    price: 425000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    image: 'https://source.unsplash.com/random/800x600/?house,4',
    agent: 'Jennifer Lee',
    agentEmail: 'jennifer@example.com'
  }, {
    id: 5,
    address: '202 Lake View Dr, Orlando, FL 32803',
    type: 'Single Family',
    price: 395000,
    beds: 3,
    baths: 2,
    sqft: 1950,
    image: 'https://source.unsplash.com/random/800x600/?house,5',
    agent: 'Robert Garcia',
    agentEmail: 'robert@example.com'
  }, {
    id: 6,
    address: '303 Office Park Way, Miami, FL 33125',
    type: 'Commercial',
    price: 1750000,
    beds: null,
    baths: null,
    sqft: 7500,
    image: 'https://source.unsplash.com/random/800x600/?building,6',
    agent: 'Lisa Martinez',
    agentEmail: 'lisa@example.com'
  }];
  const queuedLOIs = [{
    id: 1,
    property: '123 Main St, Orlando, FL 32801',
    template: 'Standard Acquisition LOI',
    agent: 'Sarah Johnson',
    status: 'sent',
    sentDate: '2023-08-15',
    offerAmount: 315000
  }, {
    id: 2,
    property: '789 Pine Rd, Tampa, FL 33602',
    template: 'Commercial Office Space',
    agent: 'David Wilson',
    status: 'queued',
    scheduledDate: '2023-08-18',
    offerAmount: 1125000
  }, {
    id: 3,
    property: '456 Oak Ave, Miami, FL 33101',
    template: 'Multi-Family Value-Add',
    agent: 'Michael Brown',
    status: 'draft',
    offerAmount: 675000
  }];
  const togglePropertySelection = propertyId => {
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter(id => id !== propertyId));
    } else {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const getPropertyTypeIcon = type => {
    switch (type) {
      case 'Single Family':
        return <Home size={16} />;
      case 'Multi-Family':
        return <Building size={16} />;
      case 'Commercial':
        return <Building2 size={16} />;
      default:
        return <Home size={16} />;
    }
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'sent':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-primary bg-opacity-10 text-primary">
            <Check size={12} className="mr-1" />
            Sent
          </span>;
      case 'queued':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-tertiary bg-opacity-10 text-tertiary-dark">
            <Clock size={12} className="mr-1" />
            Queued
          </span>;
      case 'draft':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
            <FileText size={12} className="mr-1" />
            Draft
          </span>;
      case 'failed':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary bg-opacity-10 text-secondary">
            <X size={12} className="mr-1" />
            Failed
          </span>;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark">Bulk LOI Generation</h2>
        <div className="flex items-center space-x-3">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`} onClick={() => setViewMode('grid')}>
              <Grid size={18} />
            </button>
            <button className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`} onClick={() => setViewMode('list')}>
              <List size={18} />
            </button>
          </div>
          <button className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} className="mr-1.5" />
            Filters
            {showFilters && <ChevronDown size={14} className="ml-1" />}
          </button>
          <button className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Upload size={16} className="mr-1.5" />
            Import
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            <Play size={16} className="mr-1.5" />
            Generate LOIs
          </button>
        </div>
      </div>
      {showFilters && <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Types</option>
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi-Family</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Min" />
                <span className="text-gray-500">-</span>
                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Max" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Locations</option>
                <option value="orlando">Orlando, FL</option>
                <option value="miami">Miami, FL</option>
                <option value="tampa">Tampa, FL</option>
                <option value="fort-lauderdale">Fort Lauderdale, FL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agent
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Agents</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="michael">Michael Brown</option>
                <option value="david">David Wilson</option>
                <option value="jennifer">Jennifer Lee</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="text-primary text-sm hover:underline mr-3">
              Reset Filters
            </button>
            <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
              <Search size={14} className="mr-1.5" />
              Apply Filters
            </button>
          </div>
        </div>}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Property Selection */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">Select Properties</h3>
            <div className="flex items-center">
              <div className="relative mr-3">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search properties..." className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-64" />
              </div>
              <button className="text-primary text-sm hover:underline flex items-center">
                <RefreshCw size={14} className="mr-1" />
                Refresh
              </button>
            </div>
          </div>
          {viewMode === 'grid' ? <div className="p-4 grid grid-cols-2 gap-4">
              {properties.map(property => <div key={property.id} className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedProperties.includes(property.id) ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => togglePropertySelection(property.id)}>
                  <div className="relative">
                    <img src={property.image} alt={property.address} className="w-full h-40 object-cover" />
                    <div className="absolute top-2 right-2">
                      <div className={`p-1 rounded-full ${selectedProperties.includes(property.id) ? 'bg-primary text-white' : 'bg-white text-gray-500'}`}>
                        <CheckSquare size={18} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                      <div className="flex items-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${property.type === 'Single Family' ? 'bg-primary bg-opacity-80 text-white' : property.type === 'Multi-Family' ? 'bg-tertiary bg-opacity-80 text-dark' : 'bg-secondary bg-opacity-80 text-white'}`}>
                          {property.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-1 line-clamp-1">
                      {property.address}
                    </h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-primary font-medium">
                        {formatCurrency(property.price)}
                      </span>
                      <div className="text-xs text-gray-500">
                        {property.beds && property.baths ? <span>
                            {property.beds} bd | {property.baths} ba |{' '}
                            {property.sqft.toLocaleString()} sqft
                          </span> : <span>{property.sqft.toLocaleString()} sqft</span>}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Agent: {property.agent}</span>
                    </div>
                  </div>
                </div>)}
            </div> : <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map(property => <tr key={property.id} className={`hover:bg-gray-50 cursor-pointer ${selectedProperties.includes(property.id) ? 'bg-primary bg-opacity-5' : ''}`} onClick={() => togglePropertySelection(property.id)}>
                      <td className="px-6 py-4 whitespace-nowrap w-10">
                        <div className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary" checked={selectedProperties.includes(property.id)} readOnly />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden mr-3">
                            <img src={property.image} alt={property.address} className="h-full w-full object-cover" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {property.address}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`p-1 rounded-full mr-2 ${property.type === 'Single Family' ? 'bg-primary bg-opacity-10 text-primary' : property.type === 'Multi-Family' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                            {getPropertyTypeIcon(property.type)}
                          </span>
                          <span className="text-sm text-gray-900">
                            {property.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary">
                          {formatCurrency(property.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.beds && property.baths ? <span>
                            {property.beds} bd | {property.baths} ba |{' '}
                            {property.sqft.toLocaleString()} sqft
                          </span> : <span>{property.sqft.toLocaleString()} sqft</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.agent}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedProperties.length} of {properties.length} properties
              selected
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Right Column - Template Selection & Queue */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="font-medium">Template Selection</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Template
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}>
                  {templates.map(template => <option key={template.id} value={template.id}>
                      {template.name}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Percentage
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
              <div className="bg-tertiary bg-opacity-10 rounded-lg p-3">
                <div className="flex items-start">
                  <BarChart2 size={16} className="text-tertiary-dark mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-dark">
                      Template Stats
                    </h4>
                    <p className="text-xs text-gray-700 mt-1">
                      This template has a 24% success rate and was last used 2
                      days ago.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                    <span className="text-sm">Send via Email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                    <span className="text-sm">Send via DocuSign</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                    <span className="text-sm">Generate PDF for printing</span>
                  </label>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduling
                </label>
                <div className="space-y-3">
                  <div>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="now">Send immediately</option>
                      <option value="schedule">Schedule for later</option>
                      <option value="draft">Save as drafts</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                  <Play size={16} className="mr-1.5" />
                  Generate {selectedProperties.length} LOIs
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">LOI Queue</h3>
              <button className="text-primary text-sm hover:underline flex items-center">
                <ArrowRight size={14} className="ml-1" />
                View All
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {queuedLOIs.map(loi => <div key={loi.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{loi.property}</h4>
                    {getStatusBadge(loi.status)}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>Template: {loi.template}</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(loi.offerAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">To: {loi.agent}</span>
                    {loi.status === 'sent' && <span className="text-gray-500">
                        Sent: {loi.sentDate}
                      </span>}
                    {loi.status === 'queued' && <span className="text-gray-500">
                        Scheduled: {loi.scheduledDate}
                      </span>}
                    {loi.status === 'draft' && <button className="text-primary hover:underline">
                        Edit
                      </button>}
                  </div>
                </div>)}
            </div>
            <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-500">3 LOIs in queue</div>
                <button className="text-primary hover:underline flex items-center">
                  Manage Queue <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Generation Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Bulk Generation Statistics</h3>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              LOIs Generated
            </h4>
            <div className="text-2xl font-bold text-dark">247</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <span>Last 30 days</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Response Rate
            </h4>
            <div className="text-2xl font-bold text-primary">18.2%</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <span>+2.4% from previous month</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Avg. Processing Time
            </h4>
            <div className="text-2xl font-bold text-dark">1.8s</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <span>Per LOI</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Success Rate
            </h4>
            <div className="text-2xl font-bold text-primary">4.7%</div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>Accepted offers</span>
            </div>
          </div>
        </div>
        <div className="bg-tertiary bg-opacity-10 rounded-lg p-4 border border-tertiary border-opacity-20">
          <div className="flex items-start">
            <AlertTriangle size={18} className="text-tertiary-dark mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-dark">Bulk Processing Tips</h4>
              <p className="text-sm text-gray-700 mt-1">
                For best results, group properties by type and use specialized
                templates for each group. Customize offer percentages based on
                market conditions in each area for higher acceptance rates.
              </p>
              <div className="mt-2">
                <button className="text-primary text-sm hover:underline">
                  Learn more about bulk processing best practices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};