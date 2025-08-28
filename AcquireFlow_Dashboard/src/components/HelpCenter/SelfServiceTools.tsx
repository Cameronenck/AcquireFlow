import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Search, Zap, BarChart2, FileText, MessageSquare, RefreshCw, Plus, ThumbsUp, ThumbsDown, ArrowRight, ChevronRight, Info, HelpCircle, Bug, Lightbulb } from 'lucide-react';
export const SelfServiceTools = () => {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const systemStatus = {
    overall: 'operational',
    components: [{
      name: 'Deal Finder',
      status: 'operational',
      lastIncident: null,
      uptime: '99.99%'
    }, {
      name: 'Marketing Campaigns',
      status: 'operational',
      lastIncident: '3 days ago',
      uptime: '99.95%'
    }, {
      name: 'LOI Generator',
      status: 'operational',
      lastIncident: null,
      uptime: '100%'
    }, {
      name: 'MLS Integration',
      status: 'degraded',
      lastIncident: 'Ongoing',
      uptime: '98.5%',
      message: 'Some users may experience slower than normal data syncing with certain MLS providers. We are working on a resolution.'
    }, {
      name: 'Notification System',
      status: 'operational',
      lastIncident: null,
      uptime: '99.97%'
    }, {
      name: 'Analytics Dashboard',
      status: 'operational',
      lastIncident: '1 week ago',
      uptime: '99.9%'
    }],
    plannedMaintenance: {
      scheduled: true,
      date: 'October 22, 2023',
      time: '2:00 AM - 4:00 AM ET',
      description: 'Database optimization and performance improvements',
      impact: 'The system will be in read-only mode during this period'
    }
  };
  const accountDiagnostics = {
    status: 'healthy',
    lastCheck: '10 minutes ago',
    issues: [{
      id: 1,
      severity: 'warning',
      component: 'MLS Integration',
      message: 'Your MLS credentials will expire in 7 days',
      action: 'Update credentials'
    }],
    checks: [{
      name: 'Account Settings',
      status: 'passed',
      details: 'All required account settings are complete'
    }, {
      name: 'Subscription Status',
      status: 'passed',
      details: 'Active subscription, next billing date: Nov 1, 2023'
    }, {
      name: 'API Access',
      status: 'passed',
      details: 'API key is active and functioning properly'
    }, {
      name: 'Data Storage',
      status: 'passed',
      details: 'Using 65% of allocated storage (6.5GB of 10GB)'
    }, {
      name: 'Integrations',
      status: 'warning',
      details: 'MLS credentials expiring soon'
    }, {
      name: 'Email Deliverability',
      status: 'passed',
      details: '98.7% delivery rate in the last 30 days'
    }]
  };
  const featureRequests = [{
    id: 1,
    title: 'Advanced filtering options in Deal Finder',
    description: 'Add more granular filtering options for property searches, including zoning, lot dimensions, and property age.',
    status: 'under review',
    votes: 124,
    comments: 18,
    category: 'Deal Finder',
    submitted: '2 weeks ago',
    userVoted: true
  }, {
    id: 2,
    title: 'Bulk editing for contact properties',
    description: 'Allow users to select multiple contacts and edit properties in bulk, such as tags, status, or assigned team member.',
    status: 'planned',
    votes: 87,
    comments: 12,
    category: 'Contacts',
    submitted: '1 month ago',
    userVoted: false
  }, {
    id: 3,
    title: 'Integration with REI-specific CRMs',
    description: 'Add direct integrations with popular real estate investor CRMs like Podio, REI Blackbook, and FreedomSoft.',
    status: 'in progress',
    votes: 156,
    comments: 24,
    category: 'Integrations',
    submitted: '3 months ago',
    userVoted: true
  }];
  const getStatusBadge = status => {
    switch (status) {
      case 'operational':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Operational
          </span>;
      case 'degraded':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            Degraded
          </span>;
      case 'outage':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            Outage
          </span>;
      default:
        return null;
    }
  };
  const getCheckStatusBadge = status => {
    switch (status) {
      case 'passed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Passed
          </span>;
      case 'warning':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            Warning
          </span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            Failed
          </span>;
      default:
        return null;
    }
  };
  const getFeatureStatusBadge = status => {
    switch (status) {
      case 'under review':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            Under Review
          </span>;
      case 'planned':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            Planned
          </span>;
      case 'in progress':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            In Progress
          </span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Completed
          </span>;
      case 'declined':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            Declined
          </span>;
      default:
        return null;
    }
  };
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">
                Self-Service Tools
              </h1>
              <p className="text-gray-500 mt-1">
                Diagnostics, system status, and feature requests
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
              <MessageSquare size={16} className="mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'diagnostics' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('diagnostics')}>
                <div size={18} className="mr-2" />
                <span>Account Diagnostics</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'status' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('status')}>
                <BarChart2 size={18} className="mr-2" />
                <span>System Status</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'features' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('features')}>
                <Lightbulb size={18} className="mr-2" />
                <span>Feature Requests</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'bugs' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('bugs')}>
                <Bug size={18} className="mr-2" />
                <span>Bug Reports</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'feedback' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('feedback')}>
                <MessageSquare size={18} className="mr-2" />
                <span>Feedback</span>
              </button>
            </div>
          </div>
          {/* Account Diagnostics Tab */}
          {activeTab === 'diagnostics' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-medium">Account Health Check</h2>
                    <button className="flex items-center text-primary text-sm">
                      <RefreshCw size={14} className="mr-1.5" />
                      Run Diagnostics
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${accountDiagnostics.status === 'healthy' ? 'bg-green-100' : accountDiagnostics.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                          {accountDiagnostics.status === 'healthy' ? <CheckCircle size={24} className="text-green-600" /> : accountDiagnostics.status === 'warning' ? <AlertTriangle size={24} className="text-yellow-600" /> : <AlertTriangle size={24} className="text-red-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {accountDiagnostics.status === 'healthy' ? 'Your account is healthy' : accountDiagnostics.status === 'warning' ? 'Your account has warnings' : 'Your account has issues'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Last checked: {accountDiagnostics.lastCheck}
                          </p>
                        </div>
                      </div>
                      <div>
                        {accountDiagnostics.issues.length > 0 && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            {accountDiagnostics.issues.length}{' '}
                            {accountDiagnostics.issues.length === 1 ? 'issue' : 'issues'}{' '}
                            found
                          </span>}
                      </div>
                    </div>
                    {accountDiagnostics.issues.length > 0 && <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">
                          Issues to Resolve
                        </h3>
                        <div className="space-y-3">
                          {accountDiagnostics.issues.map(issue => <div key={issue.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                              <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-sm">
                                    {issue.component}
                                  </h4>
                                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                    {issue.severity}
                                  </span>
                                </div>
                                <p className="text-sm text-yellow-700 mt-1">
                                  {issue.message}
                                </p>
                                <button className="mt-2 text-sm text-primary hover:underline">
                                  {issue.action}
                                </button>
                              </div>
                            </div>)}
                        </div>
                      </div>}
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Diagnostic Checks
                      </h3>
                      <div className="space-y-3">
                        {accountDiagnostics.checks.map((check, index) => <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">
                                {check.name}
                              </h4>
                              {getCheckStatusBadge(check.status)}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {check.details}
                            </p>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Account Optimization</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                            <Zap size={18} className="text-primary" />
                          </div>
                          <h3 className="font-medium text-sm">
                            Performance Optimization
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Analyze your account for performance bottlenecks and
                          get recommendations for improvement.
                        </p>
                        <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                          Run Performance Check
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                            <HelpCircle size={18} className="text-tertiary" />
                          </div>
                          <h3 className="font-medium text-sm">Setup Wizard</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Ensure your account is fully configured with our
                          guided setup wizard.
                        </p>
                        <button className="w-full py-2 border border-tertiary text-tertiary rounded-lg text-sm hover:bg-tertiary hover:text-white transition-colors">
                          Launch Setup Wizard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Quick Actions</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <button className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center">
                        <RefreshCw size={16} className="mr-2" />
                        Sync MLS Data
                      </button>
                      <button className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center">
                        <RefreshCw size={16} className="mr-2" />
                        Refresh Integrations
                      </button>
                      <button className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center">
                        <RefreshCw size={16} className="mr-2" />
                        Clear Cache
                      </button>
                      <button className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center">
                        <RefreshCw size={16} className="mr-2" />
                        Rebuild Search Index
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Usage Statistics</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Data Storage
                          </span>
                          <span className="text-sm text-gray-500">
                            65% used
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-primary rounded-full" style={{
                        width: '65%'
                      }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          6.5GB of 10GB
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            API Requests
                          </span>
                          <span className="text-sm text-gray-500">
                            23% used
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{
                        width: '23%'
                      }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          23,450 of 100,000 monthly requests
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            User Seats
                          </span>
                          <span className="text-sm text-gray-500">
                            60% used
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div className="h-full bg-tertiary rounded-full" style={{
                        width: '60%'
                      }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          6 of 10 seats
                        </p>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                      View Detailed Usage
                    </button>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg overflow-hidden text-white">
                  <div className="p-6">
                    <h3 className="font-medium mb-2">Need Help?</h3>
                    <p className="text-sm text-white text-opacity-90 mb-4">
                      Our support team is available to assist you with any
                      issues or questions.
                    </p>
                    <button className="w-full py-2 bg-white text-primary rounded-lg text-sm font-medium">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          {/* System Status Tab */}
          {activeTab === 'status' && <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-medium">System Status</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">
                      Last updated: 2 minutes ago
                    </span>
                    <button className="text-primary text-sm flex items-center">
                      <RefreshCw size={14} className="mr-1.5" />
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-4 ${systemStatus.overall === 'operational' ? 'bg-green-100' : systemStatus.overall === 'degraded' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                        {systemStatus.overall === 'operational' ? <CheckCircle size={30} className="text-green-600" /> : systemStatus.overall === 'degraded' ? <AlertTriangle size={30} className="text-yellow-600" /> : <AlertTriangle size={30} className="text-red-600" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {systemStatus.overall === 'operational' ? 'All Systems Operational' : systemStatus.overall === 'degraded' ? 'Some Systems Degraded' : 'System Outage Detected'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {systemStatus.components.filter(c => c.status !== 'operational').length}{' '}
                          active incidents
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                      Subscribe to Updates
                    </button>
                  </div>
                  <div className="space-y-4">
                    {systemStatus.components.map((component, index) => <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{component.name}</h4>
                          {getStatusBadge(component.status)}
                        </div>
                        {component.status !== 'operational' && component.message && <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-sm text-yellow-700">
                                {component.message}
                              </p>
                            </div>}
                        <div className="flex justify-between mt-3 text-sm text-gray-500">
                          <div>
                            {component.lastIncident ? <span>
                                Last incident: {component.lastIncident}
                              </span> : <span>No recent incidents</span>}
                          </div>
                          <span>Uptime: {component.uptime}</span>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
              {systemStatus.plannedMaintenance.scheduled && <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <Info size={24} className="text-blue-600 mr-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800 mb-2">
                        Planned Maintenance
                      </h3>
                      <p className="text-blue-700 mb-2">
                        {systemStatus.plannedMaintenance.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1.5" />
                          <span>{systemStatus.plannedMaintenance.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1.5" />
                          <span>{systemStatus.plannedMaintenance.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">
                        <strong>Impact:</strong>{' '}
                        {systemStatus.plannedMaintenance.impact}
                      </p>
                    </div>
                  </div>
                </div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Historical Uptime</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Last 24 hours
                          </span>
                          <span className="text-sm text-gray-500">
                            100% uptime
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{
                        width: '100%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Last 7 days
                          </span>
                          <span className="text-sm text-gray-500">
                            99.95% uptime
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{
                        width: '99.95%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Last 30 days
                          </span>
                          <span className="text-sm text-gray-500">
                            99.87% uptime
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{
                        width: '99.87%'
                      }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Last 90 days
                          </span>
                          <span className="text-sm text-gray-500">
                            99.92% uptime
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{
                        width: '99.92%'
                      }}></div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                      View Detailed History
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Recent Incidents</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">
                              MLS Integration Degraded Performance
                            </h4>
                            <span className="text-xs text-gray-500">
                              3 days ago
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Some users experienced slower than normal data
                            syncing with certain MLS providers. The issue has
                            been resolved.
                          </p>
                          <button className="mt-2 text-primary text-sm hover:underline">
                            View Incident Details
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm">
                              Analytics Dashboard Delayed Updates
                            </h4>
                            <span className="text-xs text-gray-500">
                              1 week ago
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Analytics dashboard data was updating with a delay
                            of up to 2 hours. The issue has been resolved.
                          </p>
                          <button className="mt-2 text-primary text-sm hover:underline">
                            View Incident Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                      View All Incidents
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          {/* Feature Requests Tab */}
          {activeTab === 'features' && <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-medium">Feature Requests</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
                    <Plus size={16} className="mr-2" />
                    New Feature Request
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="relative w-full md:w-64">
                      <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                      <input type="text" placeholder="Search feature requests..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <select className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                        <option>All Categories</option>
                        <option>Deal Finder</option>
                        <option>Campaigns</option>
                        <option>LOI Generator</option>
                        <option>Integrations</option>
                        <option>Contacts</option>
                        <option>Analytics</option>
                      </select>
                      <select className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                        <option>All Statuses</option>
                        <option>Under Review</option>
                        <option>Planned</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Declined</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {featureRequests.map(feature => <div key={feature.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2">
                                {feature.category}
                              </span>
                              {getFeatureStatusBadge(feature.status)}
                            </div>
                            <h3 className="font-medium">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 mb-3">
                              {feature.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>Submitted {feature.submitted}</span>
                              <span className="mx-2">•</span>
                              <span>{feature.comments} comments</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <button className={`p-1.5 rounded-full ${feature.userVoted ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                              <ThumbsUp size={16} />
                            </button>
                            <span className="text-sm font-medium mt-1">
                              {feature.votes}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="text-primary text-sm hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>)}
                  </div>
                  <div className="mt-6 text-center">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                      View All Feature Requests
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Recently Implemented</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            Bulk Email Templates
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Create and save email templates for bulk
                            communications with contacts.
                          </p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Implemented 2 weeks ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            Advanced Deal Filtering
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Filter deals by multiple criteria including property
                            type, price range, and status.
                          </p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Implemented 1 month ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            Mobile App Notifications
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Receive push notifications for important updates and
                            events on your mobile device.
                          </p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Implemented 2 months ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                      View All Implemented Features
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Product Roadmap</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs mr-2">
                            Q4 2023
                          </span>
                          Coming Soon
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="p-1.5 bg-yellow-100 rounded-full mr-3 mt-0.5">
                              <Clock size={16} className="text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                AI-Powered Deal Analysis
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Automatically analyze deals and receive
                                investment recommendations based on your
                                criteria.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1.5 bg-yellow-100 rounded-full mr-3 mt-0.5">
                              <Clock size={16} className="text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                Enhanced Mobile Experience
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Improved mobile app with offline capabilities
                                and enhanced user interface.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs mr-2">
                            Q1 2024
                          </span>
                          Planned
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="p-1.5 bg-purple-100 rounded-full mr-3 mt-0.5">
                              <Clock size={16} className="text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                Advanced Reporting Dashboard
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Customizable reporting dashboard with advanced
                                analytics and visualization tools.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="p-1.5 bg-purple-100 rounded-full mr-3 mt-0.5">
                              <Clock size={16} className="text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                Team Collaboration Tools
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Enhanced collaboration features including shared
                                workspaces and real-time editing.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm">
                      View Full Roadmap
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          {/* Bug Reports Tab */}
          {activeTab === 'bugs' && <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium">Report a Bug</h2>
                <button className="text-primary text-sm flex items-center">
                  <FileText size={14} className="mr-1.5" />
                  View My Reports
                </button>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <Info size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Please provide as much detail as possible about the bug
                      you've encountered. This helps our team quickly identify
                      and fix the issue.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bug Title
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Brief description of the issue" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Affected Area
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Select an area</option>
                        <option>Deal Finder</option>
                        <option>Campaigns</option>
                        <option>LOI Generator</option>
                        <option>Integrations</option>
                        <option>Dashboard</option>
                        <option>Reports</option>
                        <option>Settings</option>
                        <option>Mobile App</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Low - Minor inconvenience</option>
                        <option>Medium - Functionality limited</option>
                        <option>High - Feature unusable</option>
                        <option>Critical - System crash or data loss</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bug Description
                    </label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg h-32" placeholder="Please describe the bug in detail. What happened? What did you expect to happen?"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Steps to Reproduce
                    </label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg h-32" placeholder="1. Go to...
2. Click on...
3. Enter...
4. Observe..."></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Browser / App Version
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Chrome 96, iOS App 2.1.0" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Operating System
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Windows 11, macOS Ventura, iOS 16" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Screenshots or Screen Recording (optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center mx-auto">
                        <Plus size={14} className="mr-1.5" />
                        Add Files
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        Max file size: 10MB (PNG, JPG, GIF, MP4)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg">
                    Submit Bug Report
                  </button>
                </div>
              </div>
            </div>}
          {/* Feedback Tab */}
          {activeTab === 'feedback' && <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">Share Your Feedback</h2>
                </div>
                <div className="p-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <Info size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Your feedback helps us improve AcquireFlow.AI. We
                        appreciate your thoughts on what's working well and what
                        could be better.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How satisfied are you with AcquireFlow.AI?
                      </label>
                      <div className="flex space-x-4 mt-2">
                        {[1, 2, 3, 4, 5].map(rating => <button key={rating} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                            {rating}
                          </button>)}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                        <span>Not satisfied</span>
                        <span>Very satisfied</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What do you like most about AcquireFlow.AI?
                      </label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-lg h-24" placeholder="Tell us what's working well for you..."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What could we improve?
                      </label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-lg h-24" placeholder="Share your suggestions for improvement..."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Which features do you use most frequently?
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                          <span className="text-sm">Deal Finder</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                          <span className="text-sm">Marketing Campaigns</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                          <span className="text-sm">LOI Generator</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                          <span className="text-sm">Analytics & Reporting</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                          <span className="text-sm">Contact Management</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                          <span className="text-sm">Integrations</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How likely are you to recommend AcquireFlow.AI to a
                        colleague?
                      </label>
                      <div className="flex space-x-2 mt-2">
                        {Array.from({
                      length: 11
                    }, (_, i) => <button key={i} className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                              {i}
                            </button>)}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                        <span>Not likely</span>
                        <span>Very likely</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Any other comments or suggestions?
                      </label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-lg h-24" placeholder="Share any additional thoughts..."></textarea>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg">
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">
                      Recent Updates Based on Feedback
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            Improved Dashboard Loading Speed
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Based on user feedback, we've optimized the
                            dashboard to load 50% faster.
                          </p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Implemented 2 weeks ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="p-1.5 bg-green-100 rounded-full mr-3 mt-0.5">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">
                            Enhanced Mobile Experience
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Redesigned mobile interface based on user
                            suggestions for improved usability.
                          </p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            Implemented 1 month ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-tertiary to-tertiary-dark rounded-lg overflow-hidden">
                  <div className="p-6 text-dark">
                    <h3 className="font-medium mb-2">
                      Join Our User Research Panel
                    </h3>
                    <p className="text-sm mb-4">
                      Help shape the future of AcquireFlow.AI by participating
                      in user research sessions, interviews, and beta testing.
                    </p>
                    <button className="px-4 py-2 bg-dark text-white rounded-lg text-sm">
                      Sign Up for Research Panel
                    </button>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};