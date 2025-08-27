import React, { useState } from 'react';
import { X, Home, MapPin, DollarSign, TrendingUp, Clock, Star, Share2, ChevronRight, Printer, Download, Mail, Phone } from 'lucide-react';
interface PropertyResult {
  id: number;
  address: string;
  city: string;
  state: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  cashFlow: number;
  capRate: number;
  roi: number;
  rehabCost: number;
  motivationFactors: string[];
  daysOnMarket: number;
  dealScore: number;
  lat: number;
  lng: number;
}
interface PropertyDetailsModalProps {
  property: PropertyResult;
  onClose: () => void;
  onSave: (propertyId: number) => void;
  savedProperties: number[];
}
export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onSave,
  savedProperties
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'contact'>('overview');
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Generate random agent info
  const agent = {
    name: 'Sarah Johnson',
    company: 'Florida Real Estate Group',
    phone: '(407) 555-1234',
    email: 'sarah.johnson@example.com',
    image: 'https://source.unsplash.com/random/100x100/?portrait,woman'
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-dark">{property.address}</h2>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
              <Share2 size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>
        {/* Modal content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Property image */}
            <div className="lg:w-1/2 h-80 lg:h-auto">
              <img src={property.image} alt={property.address} className="w-full h-full object-cover" />
            </div>
            {/* Property info */}
            <div className="lg:w-1/2 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>
                      {property.city}, {property.state}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    {formatCurrency(property.price)}
                  </h3>
                </div>
                <div className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg flex items-center">
                  <Star size={16} className="mr-1.5" />
                  Deal Score: {property.dealScore}/100
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Beds</p>
                  <p className="font-bold text-lg">{property.beds}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Baths</p>
                  <p className="font-bold text-lg">{property.baths}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Sqft</p>
                  <p className="font-bold text-lg">
                    {property.sqft.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-medium mb-2">Motivation Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {property.motivationFactors.map((factor, index) => <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                      {factor}
                    </span>)}
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Clock size={16} className="mr-1.5" />
                  <span>On market for {property.daysOnMarket} days</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <div className="text-sm text-gray-500">Cash Flow</div>
                  <div className="font-bold text-lg text-primary">
                    ${property.cashFlow}/mo
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <div className="text-sm text-gray-500">Cap Rate</div>
                  <div className="font-bold text-lg text-primary">
                    {property.capRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="border-t border-b border-gray-200">
            <div className="flex">
              <button className={`px-6 py-4 font-medium text-sm ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>
                Property Overview
              </button>
              <button className={`px-6 py-4 font-medium text-sm ${activeTab === 'financials' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('financials')}>
                Financial Analysis
              </button>
              <button className={`px-6 py-4 font-medium text-sm ${activeTab === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('contact')}>
                Contact Agent
              </button>
            </div>
          </div>
          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'overview' && <div>
                <h3 className="text-lg font-bold mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3">Property Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Property Type</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year Built</span>
                        <span className="font-medium">
                          {1950 + Math.floor(Math.random() * 70)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lot Size</span>
                        <span className="font-medium">
                          {(0.1 + Math.random() * 0.4).toFixed(2)} acres
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Parking</span>
                        <span className="font-medium">
                          {Math.floor(Math.random() * 3) + 1}-Car Garage
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Investment Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Rehab</span>
                        <span className="font-medium">
                          {formatCurrency(property.rehabCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated ARV</span>
                        <span className="font-medium">
                          {formatCurrency(property.price * 1.3)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Potential ROI</span>
                        <span className="font-medium">{property.roi}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Rent</span>
                        <span className="font-medium">
                          ${Math.floor(property.price * 0.005 + 500)}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Description</h4>
                  <p className="text-gray-600">
                    This {property.beds} bedroom, {property.baths} bathroom{' '}
                    {property.type.toLowerCase()} offers excellent investment
                    potential in the desirable {property.city} market. With{' '}
                    {property.sqft.toLocaleString()} square feet of living space
                    and multiple motivation factors including{' '}
                    {property.motivationFactors.join(' and ')}, this property
                    presents a compelling opportunity for investors looking to
                    add to their portfolio.
                  </p>
                  <p className="text-gray-600 mt-3">
                    The property features a favorable cap rate of{' '}
                    {property.capRate}% and potential cash flow of $
                    {property.cashFlow}/month. With some strategic improvements,
                    this investment could yield an estimated ROI of{' '}
                    {property.roi}%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Neighborhood Analysis</h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Market Trends
                        </h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">
                              Median Home Price
                            </span>
                            <span className="font-medium text-sm">
                              {formatCurrency(property.price * 1.1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">
                              Price Appreciation (1yr)
                            </span>
                            <span className="font-medium text-sm">
                              {Math.floor(Math.random() * 8) + 2}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">
                              Average Days on Market
                            </span>
                            <span className="font-medium text-sm">
                              {Math.floor(Math.random() * 20) + 15} days
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">
                          Rental Market
                        </h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">
                              Average Rent ({property.beds}bd)
                            </span>
                            <span className="font-medium text-sm">
                              ${Math.floor(property.price * 0.005 + 700)}/mo
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">
                              Rent Increase (1yr)
                            </span>
                            <span className="font-medium text-sm">
                              {Math.floor(Math.random() * 5) + 3}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">
                              Vacancy Rate
                            </span>
                            <span className="font-medium text-sm">
                              {Math.floor(Math.random() * 3) + 2}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {activeTab === 'financials' && <div>
                <h3 className="text-lg font-bold mb-4">Financial Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Purchase Price
                    </h4>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(property.price)}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {formatCurrency(Math.round(property.price / property.sqft))}
                      /sqft
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Rehab Costs
                    </h4>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(property.rehabCost)}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      {formatCurrency(Math.round(property.rehabCost / property.sqft))}
                      /sqft
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Total Investment
                    </h4>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(property.price + property.rehabCost)}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      Including purchase & rehab
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    Monthly Cash Flow Analysis
                  </h4>
                  <div className="bg-white rounded border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Income
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">Rental Income</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.005 + 500)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">Other Income</td>
                          <td className="px-4 py-3 text-sm text-right">$50</td>
                        </tr>
                        <tr className="border-t border-gray-100 bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">
                            Total Income
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium">
                            ${Math.floor(property.price * 0.005 + 550)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-white rounded border border-gray-200 overflow-hidden mt-4">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Expenses
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">
                            Mortgage Payment
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.004)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">Property Taxes</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0008)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">Insurance</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0004)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">
                            Property Management
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0005)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">Maintenance</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0003)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">
                            Vacancy Reserves
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0002)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100 bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">
                            Total Expenses
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium">
                            ${Math.floor(property.price * 0.0062)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-primary bg-opacity-10 rounded border border-primary border-opacity-20 overflow-hidden mt-4">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-primary">
                            Monthly Cash Flow
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-bold text-primary">
                            ${property.cashFlow}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Investment Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">
                        Cap Rate
                      </h5>
                      <p className="text-xl font-bold text-primary">
                        {property.capRate}%
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Annual return on investment
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">
                        Cash on Cash
                      </h5>
                      <p className="text-xl font-bold text-primary">
                        {Math.round(property.capRate * 0.8)}%
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Return on cash invested
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">
                        1% Rule Status
                      </h5>
                      <p className="text-xl font-bold text-primary">
                        {((property.price * 0.005 + 550) / property.price * 100).toFixed(2)}
                        %
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Monthly rent / purchase price
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                      <h5 className="text-sm font-medium text-gray-500 mb-2">
                        ROI
                      </h5>
                      <p className="text-xl font-bold text-primary">
                        {property.roi}%
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        5-year return projection
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Financing Options</h4>
                  <div className="bg-white rounded border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                            Loan Type
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Down Payment
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Interest Rate
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                            Monthly Payment
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">
                            Conventional 30-year
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            {formatCurrency(property.price * 0.2)} (20%)
                          </td>
                          <td className="px-4 py-3 text-sm text-right">6.5%</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.004)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">
                            Conventional 15-year
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            {formatCurrency(property.price * 0.2)} (20%)
                          </td>
                          <td className="px-4 py-3 text-sm text-right">6.0%</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0055)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">FHA Loan</td>
                          <td className="px-4 py-3 text-sm text-right">
                            {formatCurrency(property.price * 0.035)} (3.5%)
                          </td>
                          <td className="px-4 py-3 text-sm text-right">6.8%</td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0045)}
                          </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm">Hard Money Loan</td>
                          <td className="px-4 py-3 text-sm text-right">
                            {formatCurrency(property.price * 0.25)} (25%)
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            10.0%
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            ${Math.floor(property.price * 0.0065)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}
            {activeTab === 'contact' && <div>
                <h3 className="text-lg font-bold mb-4">
                  Contact Listing Agent
                </h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                      <div className="flex items-center mb-4">
                        <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-gray-500">
                            {agent.company}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <a href={`tel:${agent.phone}`} className="flex items-center text-sm hover:text-primary">
                          <Phone size={16} className="mr-2" />
                          {agent.phone}
                        </a>
                        <a href={`mailto:${agent.email}`} className="flex items-center text-sm hover:text-primary">
                          <Mail size={16} className="mr-2" />
                          {agent.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Your Name
                        </label>
                        <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Your Email
                        </label>
                        <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your email" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Your Phone
                        </label>
                        <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your phone number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Your Message
                        </label>
                        <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="I'm interested in this property and would like to schedule a viewing..." defaultValue={`I'm interested in the property at ${property.address} and would like to discuss making an offer. Please contact me at your earliest convenience.`}></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button type="button" className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>}
          </div>
        </div>
        {/* Modal footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center hover:bg-gray-200 transition-colors">
              <Printer size={18} className="mr-2" />
              Print
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center hover:bg-gray-200 transition-colors">
              <Download size={18} className="mr-2" />
              Download PDF
            </button>
          </div>
          <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center" onClick={onClose}>
            Make Offer
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>;
};