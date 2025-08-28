import React, { useState } from 'react';
import { X, Mail, MessageSquare, Calendar, Send, Save, BarChart2, CheckCircle, User, Users } from 'lucide-react';
import { Contact } from './ContactsPage';
type CommunicationToolsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
};
type Tab = 'email' | 'sms' | 'schedule' | 'templates' | 'analytics';
export const CommunicationToolsPanel = ({
  isOpen,
  onClose,
  contacts
}: CommunicationToolsPanelProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('email');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  if (!isOpen) return null;
  const filteredContacts = contacts.filter(contact => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return contact.name.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query) || contact.phone.includes(query) || contact.company?.toLowerCase().includes(query) || contact.type.toLowerCase().includes(query);
  });
  const handleContactToggle = (contactId: string) => {
    setSelectedContacts(prev => prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]);
  };
  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  };
  const handleSend = () => {
    alert(`Message sent to ${selectedContacts.length} contacts!`);
    setSelectedContacts([]);
    setEmailSubject('');
    setMessageContent('');
  };
  const handleSaveTemplate = () => {
    alert('Template saved successfully!');
  };
  // Email templates
  const emailTemplates = [{
    id: 't1',
    name: 'Property Update',
    subject: 'New Property Listings in Your Area',
    content: 'Hi {first_name},\n\nI wanted to share some exciting new property listings in the {area} area that match your investment criteria...'
  }, {
    id: 't2',
    name: 'Follow-up',
    subject: 'Following Up on Our Conversation',
    content: 'Hi {first_name},\n\nI hope this email finds you well. I wanted to follow up on our conversation about {topic}...'
  }, {
    id: 't3',
    name: 'Market Report',
    subject: 'Your Personalized Market Report - {month}',
    content: "Hi {first_name},\n\nI've prepared a personalized market report for the {area} area based on your investment interests..."
  }];
  // SMS templates
  const smsTemplates = [{
    id: 's1',
    name: 'Quick Update',
    content: 'Hi {first_name}, just a quick update: {message}'
  }, {
    id: 's2',
    name: 'Property Alert',
    content: 'New property alert! {property_address} just listed for ${price}. Interested in viewing?'
  }, {
    id: 's3',
    name: 'Meeting Confirmation',
    content: 'Hi {first_name}, confirming our meeting on {date} at {time}. Please reply to confirm.'
  }];
  // Analytics data
  const analyticsData = {
    emails: {
      sent: 127,
      opened: 98,
      clicked: 42,
      replied: 31
    },
    sms: {
      sent: 85,
      delivered: 83,
      replied: 47
    },
    campaigns: [{
      name: 'Market Update - June',
      sent: 45,
      opened: 38,
      clicked: 22,
      conversion: 12
    }, {
      name: 'Off-Market Opportunities',
      sent: 32,
      opened: 29,
      clicked: 18,
      conversion: 7
    }, {
      name: 'Investment Webinar',
      sent: 50,
      opened: 31,
      clicked: 24,
      conversion: 18
    }]
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-dark">Communication Tools</h2>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'email' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('email')}>
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              Email
            </div>
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'sms' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('sms')}>
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              SMS
            </div>
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'schedule' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('schedule')}>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Schedule
            </div>
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'templates' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('templates')}>
            <div className="flex items-center">
              <Save size={18} className="mr-2" />
              Templates
            </div>
          </button>
          <button className={`px-5 py-3 text-sm font-medium ${activeTab === 'analytics' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('analytics')}>
            <div className="flex items-center">
              <BarChart2 size={18} className="mr-2" />
              Analytics
            </div>
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-3 h-full">
            {/* Left Column - Contact List */}
            <div className="col-span-1 border-r border-gray-200 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <input type="text" placeholder="Search contacts..." className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  {searchQuery && <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setSearchQuery('')}>
                      <X size={16} />
                    </button>}
                </div>
              </div>
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <input type="checkbox" id="select-all" className="rounded border-gray-300 text-primary focus:ring-primary" checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0} onChange={handleSelectAll} />
                  <label htmlFor="select-all" className="ml-2 text-sm">
                    Select All
                  </label>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedContacts.length} selected
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.length === 0 ? <div className="p-4 text-center text-gray-500">
                    No contacts found
                  </div> : <div className="divide-y divide-gray-100">
                    {filteredContacts.map(contact => <div key={contact.id} className={`p-3 flex items-center hover:bg-gray-50 cursor-pointer ${selectedContacts.includes(contact.id) ? 'bg-primary bg-opacity-5' : ''}`} onClick={() => handleContactToggle(contact.id)}>
                        <input type="checkbox" checked={selectedContacts.includes(contact.id)} onChange={() => handleContactToggle(contact.id)} className="rounded border-gray-300 text-primary focus:ring-primary" onClick={e => e.stopPropagation()} />
                        <div className="ml-3 flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            {contact.photo ? <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                                <User size={16} className="text-gray-400" />
                              </div>}
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium">
                              {contact.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {activeTab === 'email' ? contact.email : contact.phone}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>
            </div>
            {/* Right Column - Content */}
            <div className="col-span-2 flex flex-col">
              {/* Email Tab */}
              {activeTab === 'email' && <div className="flex-1 flex flex-col p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input type="text" placeholder="Enter email subject..." className="w-full p-2 border border-gray-300 rounded-lg" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
                  </div>
                  <div className="mb-4 flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea placeholder="Type your message here..." className="w-full h-full p-2 border border-gray-300 rounded-lg resize-none" value={messageContent} onChange={e => setMessageContent(e.target.value)} />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg flex items-center" onClick={handleSaveTemplate}>
                        <Save size={18} className="mr-2" />
                        Save as Template
                      </button>
                      <div className="relative">
                        <select className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg appearance-none pr-8" onChange={e => {
                      const template = emailTemplates.find(t => t.id === e.target.value);
                      if (template) {
                        setEmailSubject(template.subject);
                        setMessageContent(template.content);
                      }
                    }} value="">
                          <option value="" disabled>
                            Select Template
                          </option>
                          {emailTemplates.map(template => <option key={template.id} value={template.id}>
                              {template.name}
                            </option>)}
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center" onClick={handleSend} disabled={selectedContacts.length === 0 || !emailSubject || !messageContent}>
                      <Send size={18} className="mr-2" />
                      Send Email
                    </button>
                  </div>
                </div>}
              {/* SMS Tab */}
              {activeTab === 'sms' && <div className="flex-1 flex flex-col p-4">
                  <div className="mb-4 flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea placeholder="Type your SMS message here..." className="w-full h-full p-2 border border-gray-300 rounded-lg resize-none" value={messageContent} onChange={e => setMessageContent(e.target.value)} />
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                      <span>Character count: {messageContent.length}</span>
                      <span>
                        Messages: {Math.ceil(messageContent.length / 160)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg flex items-center" onClick={handleSaveTemplate}>
                        <Save size={18} className="mr-2" />
                        Save as Template
                      </button>
                      <div className="relative">
                        <select className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg appearance-none pr-8" onChange={e => {
                      const template = smsTemplates.find(t => t.id === e.target.value);
                      if (template) {
                        setMessageContent(template.content);
                      }
                    }} value="">
                          <option value="" disabled>
                            Select Template
                          </option>
                          {smsTemplates.map(template => <option key={template.id} value={template.id}>
                              {template.name}
                            </option>)}
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg flex items-center" onClick={handleSend} disabled={selectedContacts.length === 0 || !messageContent}>
                      <Send size={18} className="mr-2" />
                      Send SMS
                    </button>
                  </div>
                </div>}
              {/* Schedule Tab */}
              {activeTab === 'schedule' && <div className="flex-1 p-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">
                      Schedule Communication
                    </h3>
                    <p className="text-gray-500 mt-1 mb-4">
                      Set up automated follow-ups and scheduled messages
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="border border-gray-200 rounded-lg p-4 bg-white text-left">
                        <h4 className="font-medium">Follow-up Sequence</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Create automated multi-step follow-up sequences
                        </p>
                        <button className="mt-3 px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
                          Create Sequence
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 bg-white text-left">
                        <h4 className="font-medium">Scheduled Message</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Schedule a one-time email or SMS for future delivery
                        </p>
                        <button className="mt-3 px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
                          Schedule Message
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 bg-white text-left">
                        <h4 className="font-medium">Recurring Updates</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Send recurring market updates or newsletters
                        </p>
                        <button className="mt-3 px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
                          Set Up Recurring
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 bg-white text-left">
                        <h4 className="font-medium">Birthday & Anniversary</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Automatically send wishes on special dates
                        </p>
                        <button className="mt-3 px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
                          Configure Reminders
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="font-medium mb-3">Active Automations</h4>
                      <div className="border border-gray-200 rounded-lg bg-white">
                        <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                          <div>
                            <div className="font-medium">
                              Monthly Market Update
                            </div>
                            <div className="text-xs text-gray-500">
                              Sends on the 1st of each month
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                            <button className="ml-3 text-gray-400 hover:text-gray-600">
                              <Edit2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">
                              New Listing Follow-up
                            </div>
                            <div className="text-xs text-gray-500">
                              3-step sequence, 2 days between messages
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                            <button className="ml-3 text-gray-400 hover:text-gray-600">
                              <Edit2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Templates Tab */}
              {activeTab === 'templates' && <div className="flex-1 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Message Templates</h3>
                    <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
                      Create Template
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Mail size={16} className="mr-2" />
                        Email Templates
                      </h4>
                      <div className="space-y-3">
                        {emailTemplates.map(template => <div key={template.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">
                                  {template.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Subject: {template.subject}
                                </div>
                              </div>
                              <div className="flex">
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <Edit2 size={16} />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                              {template.content}
                            </div>
                            <div className="mt-2 flex justify-end">
                              <button className="text-primary text-sm hover:underline">
                                Use Template
                              </button>
                            </div>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <MessageSquare size={16} className="mr-2" />
                        SMS Templates
                      </h4>
                      <div className="space-y-3">
                        {smsTemplates.map(template => <div key={template.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start">
                              <div className="font-medium">{template.name}</div>
                              <div className="flex">
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <Edit2 size={16} />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              {template.content}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {template.content.length} characters
                              </div>
                              <button className="text-primary text-sm hover:underline">
                                Use Template
                              </button>
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Template Variables</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Use these variables in your templates to personalize your
                      messages:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-primary">
                          {'{first_name}'}
                        </code>
                        <span className="ml-2 text-gray-600">
                          Contact's first name
                        </span>
                      </div>
                      <div className="flex items-center">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-primary">
                          {'{last_name}'}
                        </code>
                        <span className="ml-2 text-gray-600">
                          Contact's last name
                        </span>
                      </div>
                      <div className="flex items-center">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-primary">
                          {'{company}'}
                        </code>
                        <span className="ml-2 text-gray-600">
                          Contact's company
                        </span>
                      </div>
                      <div className="flex items-center">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-primary">
                          {'{area}'}
                        </code>
                        <span className="ml-2 text-gray-600">
                          Contact's location
                        </span>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Analytics Tab */}
              {activeTab === 'analytics' && <div className="flex-1 p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">
                        Emails Sent
                      </div>
                      <div className="text-2xl font-bold">
                        {analyticsData.emails.sent}
                      </div>
                      <div className="mt-2 text-xs text-primary">
                        <span className="font-medium">
                          {Math.round(analyticsData.emails.opened / analyticsData.emails.sent * 100)}
                          % open rate
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">SMS Sent</div>
                      <div className="text-2xl font-bold">
                        {analyticsData.sms.sent}
                      </div>
                      <div className="mt-2 text-xs text-primary">
                        <span className="font-medium">
                          {Math.round(analyticsData.sms.replied / analyticsData.sms.sent * 100)}
                          % response rate
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">
                        Total Responses
                      </div>
                      <div className="text-2xl font-bold">
                        {analyticsData.emails.replied + analyticsData.sms.replied}
                      </div>
                      <div className="mt-2 text-xs text-primary">
                        <span className="font-medium">
                          {Math.round((analyticsData.emails.replied + analyticsData.sms.replied) / (analyticsData.emails.sent + analyticsData.sms.sent) * 100)}
                          % overall
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-500 mb-1">
                        Conversions
                      </div>
                      <div className="text-2xl font-bold">
                        {analyticsData.campaigns.reduce((sum, campaign) => sum + campaign.conversion, 0)}
                      </div>
                      <div className="mt-2 text-xs text-primary">
                        <span className="font-medium">
                          From {analyticsData.campaigns.length} campaigns
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
                    <h3 className="font-medium mb-4">Campaign Performance</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <th className="pb-3">Campaign</th>
                            <th className="pb-3">Sent</th>
                            <th className="pb-3">Opened</th>
                            <th className="pb-3">Clicked</th>
                            <th className="pb-3">Conversions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {analyticsData.campaigns.map((campaign, index) => <tr key={index}>
                              <td className="py-3 font-medium">
                                {campaign.name}
                              </td>
                              <td className="py-3">{campaign.sent}</td>
                              <td className="py-3">
                                {campaign.opened}
                                <span className="text-xs text-gray-500 ml-1">
                                  (
                                  {Math.round(campaign.opened / campaign.sent * 100)}
                                  %)
                                </span>
                              </td>
                              <td className="py-3">
                                {campaign.clicked}
                                <span className="text-xs text-gray-500 ml-1">
                                  (
                                  {Math.round(campaign.clicked / campaign.opened * 100)}
                                  %)
                                </span>
                              </td>
                              <td className="py-3">
                                <span className="font-medium text-primary">
                                  {campaign.conversion}
                                </span>
                                <span className="text-xs text-gray-500 ml-1">
                                  (
                                  {Math.round(campaign.conversion / campaign.clicked * 100)}
                                  %)
                                </span>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-primary bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3">
                        <CheckCircle size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">
                          AI-Powered Insights
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Based on your communication patterns, here are some
                          recommendations:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-gray-700">
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            Tuesday mornings have the highest open rates for
                            your emails
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            Messages with "Market Update" in the subject line
                            perform 28% better
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            Follow-up sequences with 3 steps have the highest
                            conversion rate
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};