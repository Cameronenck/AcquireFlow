import React from 'react';
import { Link, Database, Mail, MessageSquare, FileText, Shield, Key, RefreshCw, AlertTriangle, Check, X, ExternalLink, Plus } from 'lucide-react';
export const IntegrationManagement = () => {
  const integrationCategories = [{
    id: 'mls',
    name: 'MLS Connections',
    description: 'Connect to Multiple Listing Services to import property data',
    items: [{
      id: 'bright_mls',
      name: 'Bright MLS',
      logo: 'https://brightmls.com/Content/img/BrightMLS_bug_orange.svg',
      status: 'connected',
      lastSync: '2 hours ago',
      details: 'Connected as john.doe@acquireflow.ai'
    }, {
      id: 'stellar_mls',
      name: 'Stellar MLS',
      logo: 'https://stellarmls.com/wp-content/themes/stellar/images/logo.svg',
      status: 'connected',
      lastSync: '1 day ago',
      details: 'Connected as john.doe@acquireflow.ai'
    }, {
      id: 'crmls',
      name: 'CRMLS',
      logo: 'https://www.crmls.org/wp-content/themes/crmls/assets/images/logo.svg',
      status: 'disconnected',
      lastSync: 'Never',
      details: 'Not connected'
    }]
  }, {
    id: 'crm',
    name: 'CRM Integrations',
    description: 'Sync contacts and deals with your existing CRM platforms',
    items: [{
      id: 'salesforce',
      name: 'Salesforce',
      logo: 'https://www.salesforce.com/content/dam/web/en_us/www/images/home/logo-salesforce.svg',
      status: 'connected',
      lastSync: '30 minutes ago',
      details: 'Connected to Sales Cloud'
    }, {
      id: 'hubspot',
      name: 'HubSpot',
      logo: 'https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_the-logo.svg',
      status: 'disconnected',
      lastSync: 'Never',
      details: 'Not connected'
    }, {
      id: 'zoho',
      name: 'Zoho CRM',
      logo: 'https://www.zohowebstatic.com/sites/default/files/zoho_general_pages/zoho-logo-white.png',
      status: 'connected',
      lastSync: '2 days ago',
      details: 'Connected as AcquireFlow'
    }]
  }, {
    id: 'communication',
    name: 'Communication Tools',
    description: 'Connect email, SMS, and messaging platforms',
    items: [{
      id: 'gmail',
      name: 'Gmail / Google Workspace',
      logo: 'https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_512dp.png',
      status: 'connected',
      lastSync: '5 minutes ago',
      details: 'Connected as john.doe@acquireflow.ai'
    }, {
      id: 'outlook',
      name: 'Microsoft Outlook',
      logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
      status: 'disconnected',
      lastSync: 'Never',
      details: 'Not connected'
    }, {
      id: 'twilio',
      name: 'Twilio SMS',
      logo: 'https://www.twilio.com/assets/icons/twilio-icon-512.png',
      status: 'connected',
      lastSync: 'Real-time',
      details: 'Connected to AcquireFlow account'
    }]
  }, {
    id: 'documents',
    name: 'Document Services',
    description: 'Connect document storage and e-signature platforms',
    items: [{
      id: 'docusign',
      name: 'DocuSign',
      logo: 'https://www.docusign.com/sites/all/themes/custom/docusign/logo.svg',
      status: 'connected',
      lastSync: '1 hour ago',
      details: 'Connected as john.doe@acquireflow.ai'
    }, {
      id: 'dropbox',
      name: 'Dropbox',
      logo: 'https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/dropbox-logo_2x.jpg',
      status: 'connected',
      lastSync: '3 hours ago',
      details: 'Connected to Business account'
    }, {
      id: 'google_drive',
      name: 'Google Drive',
      logo: 'https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png',
      status: 'connected',
      lastSync: '5 minutes ago',
      details: 'Connected as john.doe@acquireflow.ai'
    }]
  }];
  const renderIntegrationStatus = status => {
    if (status === 'connected') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check size={12} className="mr-1" />
          Connected
        </span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <X size={12} className="mr-1" />
          Disconnected
        </span>;
    }
  };
  return <div className="space-y-6">
      {/* API Key Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">API Key Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your API keys for external integrations
          </p>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                  <Key size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Your API Key</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    Use this key to access the AcquireFlow API from external
                    applications
                  </p>
                  <div className="flex items-center">
                    <input type="password" className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono" value="ak_live_51KdJkHJdKjSDF8sKJSDkfJSDLKfjSDLKJF" disabled />
                    <button className="ml-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs">
                      Show
                    </button>
                    <button className="ml-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                  <Shield size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">API Security</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    Control API access and permissions
                  </p>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <RefreshCw size={14} className="mr-2" />
                      Regenerate API Key
                    </button>
                    <button className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                      <Shield size={14} className="mr-2" />
                      Manage IP Restrictions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-yellow-800">
                API Key Security Warning
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Keep your API key secure and never share it publicly. The API
                key provides access to your account and data. If you suspect
                your key has been compromised, regenerate it immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Integration Categories */}
      {integrationCategories.map(category => {})}
      {/* Webhooks */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Webhooks</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure webhooks to send real-time data to external systems
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Active Webhooks</h3>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center">
              <Plus size={14} className="mr-1.5" />
              Add Webhook
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Events
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Triggered
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">
                      https://api.mycrm.com/webhook/acquireflow
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        deal.created
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        deal.updated
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">
                      https://hooks.zapier.com/123456/abcdef
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        contact.created
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        contact.updated
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    30 minutes ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium mb-2">Webhook Documentation</h3>
            <p className="text-sm text-gray-600 mb-3">
              Learn how to set up and use webhooks to integrate AcquireFlow with
              your systems.
            </p>
            <a href="#" className="text-primary hover:underline text-sm flex items-center">
              View Documentation
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>;
};