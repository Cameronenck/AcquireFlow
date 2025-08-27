import React, { useState } from 'react';
import { Mail, MessageSquare, Printer, FileText, Settings, Check, Calendar, Clock, Plus, Trash2, Edit, ExternalLink, RefreshCw, Download, Upload, CheckCircle, AlertTriangle, HelpCircle, Users, Smartphone } from 'lucide-react';
export const DeliveryOptions = () => {
  const [activeTab, setActiveTab] = useState('email');
  const deliveryTabs = [{
    id: 'email',
    name: 'Email Integration',
    icon: <Mail size={16} />
  }, {
    id: 'sms',
    name: 'SMS Delivery',
    icon: <Smartphone size={16} />
  }, {
    id: 'print',
    name: 'Print Formatting',
    icon: <Printer size={16} />
  }, {
    id: 'docusign',
    name: 'DocuSign Integration',
    icon: <FileText size={16} />
  }, {
    id: 'tracking',
    name: 'Delivery Tracking',
    icon: <RefreshCw size={16} />
  }];
  const emailTemplates = [{
    id: 1,
    name: 'Standard LOI Email',
    subject: 'Letter of Intent for [Property Address]',
    lastUsed: '2 days ago',
    default: true
  }, {
    id: 2,
    name: 'Follow-up LOI Email',
    subject: 'Following Up: Letter of Intent for [Property Address]',
    lastUsed: '1 week ago',
    default: false
  }, {
    id: 3,
    name: 'Urgent LOI Email',
    subject: 'URGENT: Letter of Intent for [Property Address]',
    lastUsed: '2 weeks ago',
    default: false
  }];
  const scheduledDeliveries = [{
    id: 1,
    property: '123 Main St, Orlando, FL 32801',
    recipient: 'Sarah Johnson',
    method: 'email',
    scheduledDate: '2023-08-18 09:00 AM',
    status: 'scheduled'
  }, {
    id: 2,
    property: '456 Oak Ave, Miami, FL 33101',
    recipient: 'Michael Brown',
    method: 'docusign',
    scheduledDate: '2023-08-19 10:30 AM',
    status: 'scheduled'
  }, {
    id: 3,
    property: '789 Pine Rd, Tampa, FL 33602',
    recipient: 'David Wilson',
    method: 'email',
    scheduledDate: '2023-08-17 02:00 PM',
    status: 'sent'
  }];
  const deliveryHistory = [{
    id: 1,
    property: '123 Main St, Orlando, FL 32801',
    recipient: 'Sarah Johnson',
    method: 'email',
    deliveredDate: '2023-08-15 09:15 AM',
    status: 'opened',
    openedDate: '2023-08-15 10:22 AM'
  }, {
    id: 2,
    property: '456 Oak Ave, Miami, FL 33101',
    recipient: 'Michael Brown',
    method: 'docusign',
    deliveredDate: '2023-08-14 11:30 AM',
    status: 'signed',
    signedDate: '2023-08-14 03:45 PM'
  }, {
    id: 3,
    property: '789 Pine Rd, Tampa, FL 33602',
    recipient: 'David Wilson',
    method: 'email',
    deliveredDate: '2023-08-13 02:10 PM',
    status: 'delivered'
  }, {
    id: 4,
    property: '101 Beach Blvd, Fort Lauderdale, FL 33301',
    recipient: 'Jennifer Lee',
    method: 'sms',
    deliveredDate: '2023-08-12 09:45 AM',
    status: 'failed'
  }];
  const renderDeliveryMethodIcon = method => {
    switch (method) {
      case 'email':
        return <Mail size={16} />;
      case 'docusign':
        return <FileText size={16} />;
      case 'sms':
        return <Smartphone size={16} />;
      case 'print':
        return <Printer size={16} />;
      default:
        return <Mail size={16} />;
    }
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'opened':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-tertiary bg-opacity-10 text-tertiary-dark">
            <Check size={12} className="mr-1" />
            Opened
          </span>;
      case 'signed':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-primary bg-opacity-10 text-primary">
            <CheckCircle size={12} className="mr-1" />
            Signed
          </span>;
      case 'delivered':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
            <Check size={12} className="mr-1" />
            Delivered
          </span>;
      case 'failed':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary bg-opacity-10 text-secondary">
            <AlertTriangle size={12} className="mr-1" />
            Failed
          </span>;
      case 'scheduled':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
            <Clock size={12} className="mr-1" />
            Scheduled
          </span>;
      case 'sent':
        return <span className="flex items-center px-2 py-0.5 rounded-full text-xs bg-tertiary bg-opacity-10 text-tertiary-dark">
            <Check size={12} className="mr-1" />
            Sent
          </span>;
      default:
        return null;
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'email':
        return <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">Email Templates</h3>
                  <button className="flex items-center text-primary text-sm hover:underline">
                    <Plus size={14} className="mr-1" />
                    New Template
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {emailTemplates.map(template => <div key={template.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-dark">
                              {template.name}
                            </h4>
                            {template.default && <span className="ml-2 text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
                                Default
                              </span>}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Subject: {template.subject}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Last used {template.lastUsed}</span>
                        <button className="text-primary hover:underline">
                          Preview
                        </button>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Email Settings</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Email
                    </label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" value="acquisitions@acquireflow.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Name
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" value="AcquireFlow Acquisitions Team" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Email Template
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Standard LOI Email</option>
                      <option>Follow-up LOI Email</option>
                      <option>Urgent LOI Email</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Automatically CC my email on all LOI emails
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Enable email tracking (opens, clicks)
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm">
                        Send automatic follow-up if no response within 3 days
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-tertiary bg-opacity-10 rounded-lg p-4 border border-tertiary border-opacity-20">
                <div className="flex items-start">
                  <HelpCircle size={18} className="text-tertiary-dark mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-dark">
                      Email Delivery Tips
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      For best deliverability, personalize your email subject
                      lines and avoid using too many capital letters or
                      exclamation marks. Including a clear call-to-action
                      increases response rates by up to 28%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Email Preview</h3>
                </div>
                <div className="p-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b border-gray-200">
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">From:</span>
                          <span className="ml-1">
                            AcquireFlow Acquisitions Team
                            &lt;acquisitions@acquireflow.com&gt;
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">To:</span>
                          <span className="ml-1">[Agent Email]</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Subject:</span>
                          <span className="ml-1 font-medium">
                            Letter of Intent for [Property Address]
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 max-h-80 overflow-y-auto">
                      <div className="space-y-4 text-sm">
                        <p>Dear [Agent Name],</p>
                        <p>
                          I hope this email finds you well. I am writing to
                          express my interest in the property at [Property
                          Address].
                        </p>
                        <p>
                          Please find attached our formal Letter of Intent for
                          this property. We are offering [Offer Amount], with a
                          closing timeline of [Closing Timeline] days.
                        </p>
                        <p>
                          Our team at AcquireFlow has extensive experience with
                          properties in this area, and we're committed to making
                          this a smooth transaction for all parties involved.
                        </p>
                        <p>
                          If you have any questions or would like to discuss
                          this offer further, please don't hesitate to contact
                          me directly at [Your Phone] or reply to this email.
                        </p>
                        <p>I look forward to your response.</p>
                        <p>
                          Best regards,
                          <br />
                          [Your Name]
                          <br />
                          AcquireFlow Acquisitions Team
                          <br />
                          [Your Phone]
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button className="text-primary text-sm hover:underline">
                      Edit Template
                    </button>
                    <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
                      <Mail size={14} className="mr-1.5" />
                      Test Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Email Analytics</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Open Rate
                      </div>
                      <div className="text-lg font-bold text-primary">
                        68.2%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Response Rate
                      </div>
                      <div className="text-lg font-bold text-primary">
                        24.7%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Avg. Response Time
                      </div>
                      <div className="text-lg font-bold">2.3 days</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Delivery Success
                      </div>
                      <div className="text-lg font-bold text-primary">
                        99.1%
                      </div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <BarChart2 size={14} className="mr-1.5" />
                    View Detailed Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>;
      case 'sms':
        return <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">SMS Configuration</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Provider
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Twilio</option>
                      <option>Nexmo</option>
                      <option>MessageBird</option>
                      <option>Custom Provider</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Phone Number
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 (555) 123-4567" value="+1 (555) 987-6543" />
                    <div className="mt-1 text-xs text-gray-500">
                      Must be a verified number from your SMS provider
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default SMS Template
                    </label>
                    <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none" placeholder="Enter your SMS template..." value="Hi {{agent_name}}, we've sent a Letter of Intent for the property at {{property_address}}. Please check your email or view it here: {{loi_link}}. Questions? Call {{sender_phone}}."></textarea>
                    <div className="mt-1 text-xs text-gray-500 flex justify-between">
                      <span>Character count: 160/160</span>
                      <button className="text-primary hover:underline">
                        Insert Variable
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Include shortened link to LOI PDF
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Send SMS notification when LOI is viewed
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm">
                        Send automatic follow-up SMS if no response within 2
                        days
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">SMS Compliance Settings</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium mb-2">
                      Compliance Checklist
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-primary mr-2" />
                        <span className="text-sm">
                          Opt-in consent verification
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-primary mr-2" />
                        <span className="text-sm">
                          Automatic opt-out instructions
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-primary mr-2" />
                        <span className="text-sm">
                          TCPA compliance verification
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-primary mr-2" />
                        <span className="text-sm">
                          Message frequency disclosure
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opt-out Message
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value="Reply STOP to unsubscribe from future messages." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Help Message
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value="Reply HELP for assistance or call (555) 987-6543." />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">SMS Preview</h3>
                </div>
                <div className="p-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Message Preview
                      </span>
                      <span className="text-xs text-gray-500">
                        160/160 characters
                      </span>
                    </div>
                    <div className="p-4 bg-gray-800 text-white rounded-b-lg">
                      <div className="max-w-xs mx-auto">
                        <div className="bg-gray-700 rounded-lg p-3 text-sm">
                          Hi David, we've sent a Letter of Intent for the
                          property at 789 Pine Rd, Tampa, FL. Please check your
                          email or view it here: https://loi.acq.io/x8f2a.
                          Questions? Call (555) 987-6543.
                        </div>
                        <div className="text-xs text-gray-400 mt-1 text-right">
                          Just now
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button className="text-primary text-sm hover:underline">
                      Edit Template
                    </button>
                    <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
                      <Smartphone size={14} className="mr-1.5" />
                      Test Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">SMS Analytics</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Delivery Rate
                      </div>
                      <div className="text-lg font-bold text-primary">
                        97.3%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Response Rate
                      </div>
                      <div className="text-lg font-bold text-primary">
                        18.9%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Link Click Rate
                      </div>
                      <div className="text-lg font-bold text-primary">
                        42.1%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Opt-out Rate
                      </div>
                      <div className="text-lg font-bold">2.7%</div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <BarChart2 size={14} className="mr-1.5" />
                    View Detailed Analytics
                  </button>
                </div>
              </div>
            </div>
          </div>;
      case 'print':
        return <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Print Formatting Options</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Size
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Letter (8.5" x 11")</option>
                        <option>Legal (8.5" x 14")</option>
                        <option>A4 (210mm x 297mm)</option>
                        <option>A5 (148mm x 210mm)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Orientation
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Portrait</option>
                        <option>Landscape</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Margins
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Normal (1")</option>
                        <option>Narrow (0.5")</option>
                        <option>Wide (1.5")</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Print Quality
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>High (300 DPI)</option>
                        <option>Medium (150 DPI)</option>
                        <option>Draft (72 DPI)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header & Footer
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Header
                        </label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value="AcquireFlow Real Estate - Letter of Intent" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Footer
                        </label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value="Confidential - Page {{page}} of {{total_pages}}" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Include company logo in header
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">Include signature image</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Add watermark for confidentiality
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm">Include property photos</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Print Services</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium mb-3">
                      Professional Printing & Mailing
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Send professionally printed LOIs directly to recipients
                      through our integrated print and mail service.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Paper Type
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Standard White (24lb)</option>
                          <option>Premium White (32lb)</option>
                          <option>Executive Linen (32lb)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Envelope Type
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Standard #10</option>
                          <option>Window #10</option>
                          <option>9x12 Catalog</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">Pricing:</span> Starting at
                      $2.95 per letter + postage
                    </div>
                    <div className="mt-3">
                      <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all">
                        Enable Print & Mail Service
                      </button>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">
                      Local Printing Options
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                        <span className="text-sm">
                          Save as PDF for local printing
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm">
                          Enable direct printer integration
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm">
                          Batch print multiple LOIs
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Print Preview</h3>
                </div>
                <div className="p-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Letter Preview
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <Download size={14} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <Printer size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center">
                          <FileText size={48} className="mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            PDF Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
                      <Printer size={14} className="mr-1.5" />
                      Generate PDF
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Mailing Addresses</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium mb-1">Sender Address</h4>
                    <div className="text-sm text-gray-600">
                      <p>AcquireFlow Real Estate</p>
                      <p>123 Business St, Suite 500</p>
                      <p>Orlando, FL 32801</p>
                    </div>
                    <button className="mt-2 text-primary text-xs hover:underline">
                      Edit Address
                    </button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium mb-1">
                      Recipient Address
                    </h4>
                    <div className="text-sm text-gray-600">
                      <p>[Agent Name]</p>
                      <p>[Agent Company]</p>
                      <p>[Agent Address]</p>
                      <p>[Agent City, State ZIP]</p>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Automatically populated from property agent data
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                      <Upload size={14} className="mr-1.5" />
                      Import Address List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>;
      case 'docusign':
        return <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">DocuSign Integration</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-tertiary bg-opacity-10 rounded-lg p-4 border border-tertiary border-opacity-20 flex items-start">
                    <CheckCircle size={18} className="text-tertiary-dark mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-dark">
                        DocuSign Connected
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Your DocuSign account is connected and ready to use for
                        sending LOIs with electronic signatures.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DocuSign Account
                      </label>
                      <div className="flex items-center">
                        <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50" value="acquisitions@acquireflow.com" disabled />
                        <button className="ml-2 p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Default Template
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Standard LOI Template</option>
                        <option>Purchase Agreement Template</option>
                        <option>Custom LOI Template</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Subject
                    </label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value="Please Sign: Letter of Intent for {{property_address}}" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Message
                    </label>
                    <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none" value="Dear {{recipient_name}},
I have sent you a Letter of Intent for the property at {{property_address}} for your review and signature.
Please click the button below to review and sign this document electronically through DocuSign.
Thank you,
{{sender_name}}
AcquireFlow Real Estate"></textarea>
                  </div>
                  <div className="pt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Enable reminder emails if not signed within 2 days
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm">
                        Require recipient to authenticate before signing
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm">
                        Enable SMS notifications for signing updates
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">
                    Signature Fields Configuration
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium mb-3">
                      Required Signature Fields
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-primary bg-opacity-10 rounded-lg text-primary mr-2">
                            <FileText size={16} />
                          </div>
                          <span className="text-sm font-medium">
                            Buyer Signature
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
                            Required
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-primary bg-opacity-10 rounded-lg text-primary mr-2">
                            <FileText size={16} />
                          </div>
                          <span className="text-sm font-medium">
                            Seller Signature
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
                            Required
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-gray-100 rounded-lg text-gray-500 mr-2">
                            <Calendar size={16} />
                          </div>
                          <span className="text-sm font-medium">
                            Date Signed
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Auto-filled
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 text-primary text-sm hover:underline flex items-center">
                      <Plus size={14} className="mr-1" />
                      Add Signature Field
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium mb-3">
                      Optional Form Fields
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-gray-100 rounded-lg text-gray-500 mr-2">
                            <Users size={16} />
                          </div>
                          <span className="text-sm font-medium">
                            Agent Information
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Optional
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-gray-100 rounded-lg text-gray-500 mr-2">
                            <FileText size={16} />
                          </div>
                          <span className="text-sm font-medium">
                            Additional Comments
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            Optional
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 text-primary text-sm hover:underline flex items-center">
                      <Plus size={14} className="mr-1" />
                      Add Form Field
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">DocuSign Preview</h3>
                </div>
                <div className="p-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Docusign_logo.svg/1200px-Docusign_logo.svg.png" alt="DocuSign" className="h-5 mr-2" />
                        <span className="text-sm font-medium">
                          DocuSign Envelope
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                        <div className="text-center">
                          <FileText size={48} className="mx-auto mb-2 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            DocuSign Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
                      <FileText size={14} className="mr-1.5" />
                      Test DocuSign
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">DocuSign Analytics</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Completion Rate
                      </div>
                      <div className="text-lg font-bold text-primary">
                        78.3%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Avg. Time to Sign
                      </div>
                      <div className="text-lg font-bold">1.8 days</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Envelopes Sent
                      </div>
                      <div className="text-lg font-bold">124</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">
                        Envelopes Signed
                      </div>
                      <div className="text-lg font-bold">97</div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <BarChart2 size={14} className="mr-1.5" />
                    View DocuSign Reports
                  </button>
                </div>
              </div>
            </div>
          </div>;
      case 'tracking':
        return <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="font-medium">Delivery Tracking</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Total Deliveries
                    </h4>
                    <div className="text-2xl font-bold text-dark">247</div>
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <span>Last 30 days</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Open Rate
                    </h4>
                    <div className="text-2xl font-bold text-primary">68.2%</div>
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <span>+5.7% from last month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Response Rate
                    </h4>
                    <div className="text-2xl font-bold text-primary">24.7%</div>
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <span>+3.2% from last month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Avg. Response Time
                    </h4>
                    <div className="text-2xl font-bold text-dark">2.3 days</div>
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <span>-0.5 days from last month</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                  <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium">Delivery History</h3>
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search deliveries..." className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-64" />
                      </div>
                      <button className="text-primary text-sm hover:underline flex items-center">
                        <RefreshCw size={14} className="mr-1" />
                        Refresh
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recipient
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Method
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delivered
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {deliveryHistory.map(delivery => <tr key={delivery.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {delivery.property}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {delivery.recipient}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className={`p-1 rounded-full mr-2 ${delivery.method === 'email' ? 'bg-primary bg-opacity-10 text-primary' : delivery.method === 'docusign' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-gray-100 text-gray-600'}`}>
                                  {renderDeliveryMethodIcon(delivery.method)}
                                </span>
                                <span className="text-sm capitalize">
                                  {delivery.method}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {delivery.deliveredDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(delivery.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-primary hover:underline">
                                View
                              </button>
                              <span className="mx-2 text-gray-300">|</span>
                              <button className="text-primary hover:underline">
                                Resend
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Showing 4 of 247 deliveries
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
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="font-medium">Scheduled Deliveries</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {scheduledDeliveries.map(delivery => <div key={delivery.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">
                            {delivery.property}
                          </h4>
                          {getStatusBadge(delivery.status)}
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                          <span>To: {delivery.recipient}</span>
                          <div className="flex items-center">
                            <span className={`p-1 rounded-full mr-1 ${delivery.method === 'email' ? 'bg-primary bg-opacity-10 text-primary' : delivery.method === 'docusign' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-gray-100 text-gray-600'}`}>
                              {renderDeliveryMethodIcon(delivery.method)}
                            </span>
                            <span className="capitalize">
                              {delivery.method}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center text-gray-500">
                            <Calendar size={12} className="mr-1" />
                            <span>Scheduled: {delivery.scheduledDate}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-primary hover:underline">
                              Edit
                            </button>
                            <button className="text-gray-500 hover:underline">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
                    <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                      <Plus size={14} className="mr-1.5" />
                      Schedule New Delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="font-medium">Tracking Settings</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notification Preferences
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                        <span className="text-sm">
                          Email notification when LOI is opened
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                        <span className="text-sm">
                          Email notification when LOI is signed
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm">
                          SMS notification for delivery updates
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm">
                          Dashboard notification for all activity
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tracking Features
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                        <span className="text-sm">
                          Track email opens and clicks
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                        <span className="text-sm">Track document views</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                        <span className="text-sm">
                          Track time spent reviewing document
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm">
                          Track device and location information
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Automatic Follow-up Rules
                  </label>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-primary bg-opacity-10 rounded-lg text-primary mr-2">
                          <Mail size={16} />
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            Email Follow-up
                          </span>
                          <p className="text-xs text-gray-500">
                            If no response within 3 days
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
                          Active
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-tertiary bg-opacity-10 rounded-lg text-tertiary-dark mr-2">
                          <Smartphone size={16} />
                        </div>
                        <div>
                          <span className="text-sm font-medium">
                            SMS Reminder
                          </span>
                          <p className="text-xs text-gray-500">
                            If document viewed but not signed within 2 days
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          Inactive
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit size={14} />
                        </button>
                      </div>
                    </div>
                    <button className="text-primary text-sm hover:underline flex items-center">
                      <Plus size={14} className="mr-1" />
                      Add Follow-up Rule
                    </button>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark">Delivery Options</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm flex items-center hover:bg-gray-50">
            <Settings size={16} className="mr-1.5" />
            Delivery Settings
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center hover:bg-primary-dark">
            <Send size={16} className="mr-1.5" />
            Send LOI
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar">
            {deliveryTabs.map(tab => <button key={tab.id} className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab(tab.id)}>
                <div className="flex items-center">
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </div>
              </button>)}
          </div>
        </div>
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>;
};