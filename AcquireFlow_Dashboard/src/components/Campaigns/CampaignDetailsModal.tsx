import React, { useState } from 'react';
import { X, Edit, Clock, Trash2, Copy, PlayCircle, Download, Send, ExternalLink, Calendar, MapPin, Users, Home, BarChart2, FileText, Mail, Check } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
export const CampaignDetailsModal = ({
  campaign,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  // Mock performance data
  const performanceData = [{
    day: '1',
    responses: 4,
    lois: 2
  }, {
    day: '2',
    responses: 7,
    lois: 3
  }, {
    day: '3',
    responses: 5,
    lois: 2
  }, {
    day: '4',
    responses: 12,
    lois: 5
  }, {
    day: '5',
    responses: 9,
    lois: 4
  }, {
    day: '6',
    responses: 11,
    lois: 6
  }, {
    day: '7',
    responses: 8,
    lois: 3
  }, {
    day: '8',
    responses: 14,
    lois: 7
  }, {
    day: '9',
    responses: 13,
    lois: 6
  }, {
    day: '10',
    responses: 18,
    lois: 9
  }, {
    day: '11',
    responses: 15,
    lois: 8
  }, {
    day: '12',
    responses: 19,
    lois: 10
  }, {
    day: '13',
    responses: 21,
    lois: 11
  }, {
    day: '14',
    responses: 17,
    lois: 9
  }];
  // Mock property distribution data
  const propertyTypeData = [{
    name: 'Single Family',
    value: 65,
    color: '#3ab795'
  }, {
    name: 'Multi-Family',
    value: 20,
    color: '#feca57'
  }, {
    name: 'Commercial',
    value: 10,
    color: '#ff6b6b'
  }, {
    name: 'Vacant Land',
    value: 5,
    color: '#a5b4fc'
  }];
  // Mock response types data
  const responseTypeData = [{
    name: 'Interested',
    value: 45,
    color: '#3ab795'
  }, {
    name: 'Need More Info',
    value: 30,
    color: '#feca57'
  }, {
    name: 'Declined',
    value: 15,
    color: '#ff6b6b'
  }, {
    name: 'No Response',
    value: 10,
    color: '#9ca3af'
  }];
  // Mock property list
  const properties = Array(10).fill(0).map((_, i) => ({
    id: i + 1,
    address: `${1000 + i} Main St, ${campaign.targetArea}`,
    price: 500000 + Math.floor(Math.random() * 1500000),
    status: ['Contacted', 'Responded', 'LOI Sent', 'Negotiating', 'Not Interested'][Math.floor(Math.random() * 5)],
    agent: `Agent ${i + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000),
    responseRate: Math.floor(Math.random() * 100)
  }));
  const formatPrice = price => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };
  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const getStatusColor = status => {
    switch (status) {
      case 'Contacted':
        return 'bg-blue-600 text-white';
      case 'Responded':
        return 'bg-tertiary text-dark';
      case 'LOI Sent':
        return 'bg-primary text-white';
      case 'Negotiating':
        return 'bg-orange-500 text-white';
      case 'Not Interested':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-200 text-dark';
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-float">
        {/* Modal header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-dark">{campaign.name}</h2>
              <span className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full ${campaign.status === 'running' ? 'bg-primary text-white' : campaign.status === 'scheduled' ? 'bg-tertiary text-dark' : 'bg-gray-200 text-gray-700'}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center mt-2 text-gray-500">
              <div className="flex items-center mr-4">
                <MapPin size={16} className="mr-1" />
                <span>{campaign.targetArea}</span>
              </div>
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>
                  {formatDate(campaign.startDate)} -{' '}
                  {formatDate(campaign.endDate)}
                </span>
              </div>
              <div className="flex items-center">
                <Home size={16} className="mr-1" />
                <span>{campaign.propertyCount} Properties</span>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-all" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            <button className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'properties' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('properties')}>
              Properties
            </button>
            <button className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'performance' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('performance')}>
              Performance
            </button>
            <button className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${activeTab === 'template' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('template')}>
              LOI Template
            </button>
          </div>
        </div>
        {/* Modal content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && <div className="space-y-6">
              {/* Key metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Response Rate
                  </h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-primary">
                      {campaign.responseRate}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2 mb-1">
                      of agents
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-primary rounded-full liquid-progress" style={{
                  width: `${Math.min(parseFloat(campaign.responseRate) * 3, 100)}%`
                }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    LOIs Sent
                  </h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-dark">
                      {campaign.loisSent}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 mb-1">
                      of {campaign.propertyCount} properties
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-tertiary rounded-full liquid-progress" style={{
                  width: `${campaign.loisSent / campaign.propertyCount * 100}%`
                }}></div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Campaign Progress
                  </h3>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-dark">
                      {campaign.progress}%
                    </span>
                    <span className="text-xs text-gray-500 ml-2 mb-1">
                      complete
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-600 rounded-full" style={{
                  width: `${campaign.progress}%`
                }}></div>
                  </div>
                </div>
              </div>
              {/* Campaign timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-lg mb-4">Campaign Timeline</h3>
                <div className="relative pl-8 pb-2">
                  <div className="absolute top-0 bottom-0 left-3 w-px bg-gray-200"></div>
                  <div className="relative mb-6">
                    <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Calendar size={14} className="text-white" />
                    </div>
                    <h4 className="font-medium">Campaign Created</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(campaign.startDate)}
                    </p>
                    <p className="text-sm mt-1">
                      Initial setup with {campaign.propertyCount} target
                      properties in {campaign.targetArea}
                    </p>
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-tertiary flex items-center justify-center">
                      <PlayCircle size={14} className="text-dark" />
                    </div>
                    <h4 className="font-medium">Campaign Started</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(campaign.startDate)}
                    </p>
                    <p className="text-sm mt-1">
                      First batch of {Math.floor(campaign.propertyCount * 0.3)}{' '}
                      outreach emails sent to agents
                    </p>
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <Mail size={14} className="text-white" />
                    </div>
                    <h4 className="font-medium">First Responses Received</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(new Date(campaign.startDate.getTime() + 2 * 24 * 60 * 60 * 1000))}
                    </p>
                    <p className="text-sm mt-1">
                      Initial response rate of 8.2% with 12 interested agents
                    </p>
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <FileText size={14} className="text-white" />
                    </div>
                    <h4 className="font-medium">First LOIs Sent</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(new Date(campaign.startDate.getTime() + 4 * 24 * 60 * 60 * 1000))}
                    </p>
                    <p className="text-sm mt-1">
                      First batch of {Math.floor(campaign.loisSent * 0.2)} LOIs
                      sent to interested sellers
                    </p>
                  </div>
                  {campaign.status === 'running' && <div className="relative">
                      <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center border-2 border-white">
                        <Clock size={14} className="text-white" />
                      </div>
                      <h4 className="font-medium">Campaign In Progress</h4>
                      <p className="text-sm text-gray-500">Current</p>
                      <p className="text-sm mt-1">
                        Campaign is actively running with{' '}
                        {campaign.responseRate}% response rate
                      </p>
                    </div>}
                  {campaign.status === 'completed' && <div className="relative">
                      <div className="absolute left-[-28px] top-0 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                      <h4 className="font-medium">Campaign Completed</h4>
                      <p className="text-sm text-gray-500">
                        {formatDate(campaign.endDate)}
                      </p>
                      <p className="text-sm mt-1">
                        Final response rate of {campaign.responseRate}% with{' '}
                        {campaign.loisSent} LOIs sent
                      </p>
                    </div>}
                </div>
              </div>
              {/* Performance charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold mb-4">Property Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={propertyTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                          {propertyTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={value => [`${value}%`, 'Percentage']} contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {propertyTypeData.map((item, index) => <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: item.color
                  }}></div>
                        <span className="text-sm">
                          {item.name}: {item.value}%
                        </span>
                      </div>)}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold mb-4">Response Types</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={responseTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                          {responseTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip formatter={value => [`${value}%`, 'Percentage']} contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {responseTypeData.map((item, index) => <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: item.color
                  }}></div>
                        <span className="text-sm">
                          {item.name}: {item.value}%
                        </span>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}
          {/* Properties Tab */}
          {activeTab === 'properties' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Campaign Properties</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all">
                    Filter
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all">
                    Sort
                  </button>
                  <button className="px-3 py-1.5 bg-tertiary text-dark rounded-lg text-sm hover:bg-tertiary-dark transition-all">
                    Add Properties
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agent
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map(property => <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-dark">
                            {property.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark">
                            {formatPrice(property.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark">
                            {property.agent}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(property.status)}`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(property.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            View
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            Contact
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing 10 of {campaign.propertyCount} properties
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-all">
                    Next
                  </button>
                </div>
              </div>
            </div>}
          {/* Performance Tab */}
          {activeTab === 'performance' && <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-lg mb-4">Daily Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="day" tick={{
                    fill: '#9CA3AF'
                  }} tickLine={{
                    stroke: '#E5E7EB'
                  }} axisLine={{
                    stroke: '#E5E7EB'
                  }} label={{
                    value: 'Campaign Day',
                    position: 'insideBottom',
                    offset: -5,
                    fill: '#6B7280'
                  }} />
                      <YAxis tick={{
                    fill: '#9CA3AF'
                  }} tickLine={{
                    stroke: '#E5E7EB'
                  }} axisLine={{
                    stroke: '#E5E7EB'
                  }} />
                      <Tooltip contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }} />
                      <Area type="monotone" dataKey="responses" stroke="#3ab795" fill="#3ab795" fillOpacity={0.2} name="Responses" />
                      <Area type="monotone" dataKey="lois" stroke="#feca57" fill="#feca57" fillOpacity={0.2} name="LOIs Sent" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold mb-4">
                    Response Rate by Property Type
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Single Family</span>
                        <span className="text-sm font-medium text-primary">
                          24.2%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{
                      width: '24.2%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Multi-Family</span>
                        <span className="text-sm font-medium text-primary">
                          18.7%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{
                      width: '18.7%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Commercial</span>
                        <span className="text-sm font-medium text-primary">
                          15.3%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{
                      width: '15.3%'
                    }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Vacant Land</span>
                        <span className="text-sm font-medium text-gray-500">
                          8.9%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-full bg-gray-400 rounded-full" style={{
                      width: '8.9%'
                    }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold mb-4">
                    Campaign Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-sm">Open Rate</span>
                      <span className="text-sm font-medium">42.8%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-sm">Click Rate</span>
                      <span className="text-sm font-medium">28.3%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-sm">Response Rate</span>
                      <span className="text-sm font-medium text-primary">
                        {campaign.responseRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-sm">LOI Acceptance</span>
                      <span className="text-sm font-medium text-tertiary-dark">
                        3.2%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cost per Lead</span>
                      <span className="text-sm font-medium">$12.47</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* LOI Template Tab */}
          {activeTab === 'template' && <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">LOI Template Preview</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all flex items-center">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-gray-100 text-dark rounded-lg text-sm hover:bg-gray-200 transition-all flex items-center">
                      <Download size={14} className="mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-bold text-lg mb-1">
                        Letter of Intent to Purchase Real Estate
                      </h4>
                      <p className="text-sm text-gray-500">
                        Template: Standard Acquisition LOI
                      </p>
                    </div>
                    <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      SAMPLE
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
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
                    <div className="bg-white border border-gray-200 rounded p-4 my-4">
                      <p className="mb-2">
                        <strong>Purchase Price:</strong> [Purchase Price]
                      </p>
                      <p className="mb-2">
                        <strong>Deposit:</strong> [Deposit Amount]
                      </p>
                      <p className="mb-2">
                        <strong>Closing Timeline:</strong> [Closing Timeline]
                      </p>
                      <p className="mb-2">
                        <strong>Contingencies:</strong> [Standard Contingencies]
                      </p>
                      <p>
                        <strong>Financing:</strong> [Financing Details]
                      </p>
                    </div>
                    <p>
                      I am prepared to move forward quickly and can provide
                      proof of funds upon request. My team and I have extensive
                      experience in real estate acquisitions in the [Target
                      Area] area and are committed to a smooth transaction
                      process.
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
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    This template is being used for all properties in this
                    campaign with dynamic fields populated based on property
                    data.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-lg mb-4">Template Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Open Rate
                    </h4>
                    <div className="text-xl font-bold">42.8%</div>
                    <div className="text-xs text-primary mt-1">
                      +3.2% above average
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Response Rate
                    </h4>
                    <div className="text-xl font-bold">
                      {campaign.responseRate}%
                    </div>
                    <div className="text-xs text-primary mt-1">
                      +2.1% above average
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      LOI Acceptance
                    </h4>
                    <div className="text-xl font-bold">3.2%</div>
                    <div className="text-xs text-gray-500 mt-1">
                      -0.4% below average
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Optimization Suggestions</h4>
                  <div className="space-y-3">
                    <div className="flex items-start bg-tertiary bg-opacity-10 p-3 rounded-lg">
                      <div className="text-tertiary-dark mr-3 mt-0.5">
                        <BarChart2 size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark">
                          Consider increasing the initial offer amount
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Properties in this area are seeing higher acceptance
                          rates with offers at 92-95% of asking price.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start bg-primary bg-opacity-10 p-3 rounded-lg">
                      <div className="text-primary mr-3 mt-0.5">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark">
                          Add more personalization to the template
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Templates with agent-specific information show 18%
                          higher response rates.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
        {/* Modal footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center">
              <Edit size={16} className="mr-2" />
              Edit Campaign
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center">
              <Copy size={16} className="mr-2" />
              Clone
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-all flex items-center">
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
          <div className="flex space-x-3">
            {campaign.status === 'running' ? <button className="px-4 py-2 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center">
                <Clock size={16} className="mr-2" />
                Pause Campaign
              </button> : campaign.status === 'scheduled' ? <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all flex items-center">
                <PlayCircle size={16} className="mr-2" />
                Start Campaign
              </button> : null}
            <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all flex items-center">
              <Send size={16} className="mr-2" />
              Send LOIs
            </button>
            <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all flex items-center">
              <ExternalLink size={16} className="mr-2" />
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>;
};