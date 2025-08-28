import React, { useState, Component } from 'react';
import { Layout, PlusCircle, Save, Eye, Share2, Download, Settings, Layers, BarChart, LineChart, PieChart, Map, Table, Calendar, Filter, Clock, Move, X, ChevronDown, Plus, Sliders, Users, DollarSign, Activity } from 'lucide-react';
export const ReportBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [reportName, setReportName] = useState('New Custom Report');
  const [showTemplates, setShowTemplates] = useState(true);
  const templates = [{
    id: 'campaign',
    name: 'Campaign Performance',
    description: 'Key metrics for campaign performance analysis',
    icon: <BarChart size={24} />,
    color: 'bg-primary'
  }, {
    id: 'market',
    name: 'Market Analysis',
    description: 'Real estate market trends and forecasts',
    icon: <LineChart size={24} />,
    color: 'bg-tertiary'
  }, {
    id: 'financial',
    name: 'Financial Overview',
    description: 'Revenue, expenses, and profitability metrics',
    icon: <DollarSign size={24} />,
    color: 'bg-secondary'
  }, {
    id: 'operational',
    name: 'Operational Dashboard',
    description: 'Team performance and productivity metrics',
    icon: <Activity size={24} />,
    color: 'bg-indigo-500'
  }, {
    id: 'blank',
    name: 'Blank Report',
    description: 'Start from scratch with a blank canvas',
    icon: <Layout size={24} />,
    color: 'bg-gray-700'
  }];
  const visualizationTypes = [{
    id: 'bar',
    name: 'Bar Chart',
    icon: <BarChart size={20} />
  }, {
    id: 'line',
    name: 'Line Chart',
    icon: <LineChart size={20} />
  }, {
    id: 'pie',
    name: 'Pie Chart',
    icon: <PieChart size={20} />
  }, {
    id: 'map',
    name: 'Map',
    icon: <Map size={20} />
  }, {
    id: 'table',
    name: 'Table',
    icon: <Table size={20} />
  }, {
    id: 'calendar',
    name: 'Calendar',
    icon: <Calendar size={20} />
  }];
  const availableMetrics = [{
    id: 'revenue',
    name: 'Revenue',
    category: 'financial',
    icon: <DollarSign size={16} />
  }, {
    id: 'expenses',
    name: 'Expenses',
    category: 'financial',
    icon: <DollarSign size={16} />
  }, {
    id: 'profit',
    name: 'Profit',
    category: 'financial',
    icon: <DollarSign size={16} />
  }, {
    id: 'roi',
    name: 'ROI',
    category: 'campaign',
    icon: <Activity size={16} />
  }, {
    id: 'response_rate',
    name: 'Response Rate',
    category: 'campaign',
    icon: <Activity size={16} />
  }, {
    id: 'conversion',
    name: 'Conversion Rate',
    category: 'campaign',
    icon: <Activity size={16} />
  }, {
    id: 'leads',
    name: 'Lead Count',
    category: 'campaign',
    icon: <Users size={16} />
  }, {
    id: 'deals',
    name: 'Deal Count',
    category: 'operational',
    icon: <Users size={16} />
  }, {
    id: 'market_price',
    name: 'Market Price',
    category: 'market',
    icon: <DollarSign size={16} />
  }, {
    id: 'inventory',
    name: 'Inventory',
    category: 'market',
    icon: <Layers size={16} />
  }];
  const renderBuilderContent = () => {
    if (showTemplates) {
      return <div className="p-6">
          <h2 className="text-lg font-bold mb-6">Choose a Report Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map(template => <div key={template.id} className={`border rounded-xl p-5 cursor-pointer hover:shadow-md transition-all ${selectedTemplate === template.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-gray-200'}`} onClick={() => setSelectedTemplate(template.id)}>
                <div className={`w-12 h-12 rounded-lg ${template.color} text-white flex items-center justify-center mb-4`}>
                  {template.icon}
                </div>
                <h3 className="font-medium text-dark">{template.name}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {template.description}
                </p>
              </div>)}
          </div>
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors" onClick={() => setShowTemplates(false)} disabled={!selectedTemplate}>
              Continue
            </button>
          </div>
        </div>;
    }
    return <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <input type="text" value={reportName} onChange={e => setReportName(e.target.value)} className="text-lg font-bold border-none focus:ring-0 focus:outline-none bg-transparent" />
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center hover:bg-gray-50">
              <Eye size={16} className="mr-1.5" />
              Preview
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center hover:bg-gray-50">
              <Settings size={16} className="mr-1.5" />
              Settings
            </button>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center hover:bg-primary-dark">
              <Save size={16} className="mr-1.5" />
              Save
            </button>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Components */}
          <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
              Visualizations
            </h3>
            <div className="space-y-2 mb-6">
              {visualizationTypes.map(type => <div key={type.id} className="flex items-center p-2 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50">
                  <div className="p-1.5 rounded bg-gray-100 mr-2">
                    {type.icon}
                  </div>
                  <span className="text-sm">{type.name}</span>
                </div>)}
            </div>
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
              Metrics
            </h3>
            <div className="space-y-2">
              {availableMetrics.map(metric => <div key={metric.id} className="flex items-center p-2 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50">
                  <div className="p-1.5 rounded bg-gray-100 mr-2">
                    {metric.icon}
                  </div>
                  <span className="text-sm">{metric.name}</span>
                </div>)}
            </div>
          </div>
          {/* Main Content - Canvas */}
          <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <div className="bg-white border border-dashed border-gray-300 rounded-xl h-full flex flex-col items-center justify-center">
              <div className="text-center p-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Layout size={24} className="text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Design Your Report
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Drag and drop visualizations and metrics from the sidebar to
                  create your custom report
                </p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center mx-auto">
                  <PlusCircle size={16} className="mr-2" />
                  Add Visualization
                </button>
              </div>
            </div>
          </div>
          {/* Right Sidebar - Properties */}
          <div className="w-72 border-l border-gray-200 p-4 overflow-y-auto">
            <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-3">
              Properties
            </h3>
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-3 flex items-center justify-between">
                <span>Report Settings</span>
                <ChevronDown size={16} />
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Date Range
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg p-1.5 text-sm">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This year</option>
                    <option>Custom range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Refresh Rate
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg p-1.5 text-sm">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>On demand</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Layout
                  </label>
                  <div className="flex space-x-2">
                    <button className="p-2 border border-gray-200 rounded bg-gray-50 flex-1 flex items-center justify-center">
                      <Layers size={14} />
                    </button>
                    <button className="p-2 border border-gray-200 rounded bg-gray-50 flex-1 flex items-center justify-center">
                      <Layout size={14} />
                    </button>
                    <button className="p-2 border border-gray-200 rounded bg-gray-50 flex-1 flex items-center justify-center">
                      <Sliders size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center justify-between">
                <span>Filters</span>
                <Plus size={16} />
              </h4>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-center text-sm text-gray-500">
                No filters applied yet
              </div>
              <button className="w-full mt-3 px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center justify-center hover:bg-gray-50">
                <Filter size={14} className="mr-1.5" />
                Add Filter
              </button>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-220px)]">
      {renderBuilderContent()}
    </div>;
};