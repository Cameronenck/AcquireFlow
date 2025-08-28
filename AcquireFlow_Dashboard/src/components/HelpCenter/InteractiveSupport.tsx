import React, { useState } from 'react';
import { MessageSquare, Phone, Video, Send, Paperclip, User, Clock, Calendar, AlertTriangle, CheckCircle, X, Monitor, Info, TicketIcon, ExternalLink, RefreshCw } from 'lucide-react';
export const InteractiveSupport = () => {
  const [activeTab, setActiveTab] = useState('live-chat');
  const [message, setMessage] = useState('');
  const [showChatWindow, setShowChatWindow] = useState(false);
  const tickets = [{
    id: 'TKT-1234',
    subject: 'Issue with MLS integration',
    status: 'Open',
    priority: 'High',
    created: '2 days ago',
    lastUpdated: '5 hours ago',
    category: 'Integrations'
  }, {
    id: 'TKT-1233',
    subject: 'Billing question about subscription',
    status: 'In Progress',
    priority: 'Medium',
    created: '3 days ago',
    lastUpdated: '1 day ago',
    category: 'Billing'
  }, {
    id: 'TKT-1232',
    subject: 'Feature request: Additional LOI templates',
    status: 'Pending',
    priority: 'Low',
    created: '1 week ago',
    lastUpdated: '2 days ago',
    category: 'Feature Request'
  }, {
    id: 'TKT-1231',
    subject: 'Data import failure from CSV',
    status: 'Resolved',
    priority: 'High',
    created: '2 weeks ago',
    lastUpdated: '1 week ago',
    category: 'Data Management'
  }];
  const upcomingSessions = [{
    id: 1,
    type: 'Screen Sharing',
    date: 'Oct 20, 2023',
    time: '10:00 AM - 10:30 AM ET',
    with: 'Sarah Johnson',
    topic: 'Deal Analysis Tool Setup'
  }];
  const getStatusBadge = status => {
    switch (status) {
      case 'Open':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center">
            <Info size={12} className="mr-1" />
            {status}
          </span>;
      case 'In Progress':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center">
            <RefreshCw size={12} className="mr-1" />
            {status}
          </span>;
      case 'Pending':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center">
            <Clock size={12} className="mr-1" />
            {status}
          </span>;
      case 'Resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
            <CheckCircle size={12} className="mr-1" />
            {status}
          </span>;
      default:
        return null;
    }
  };
  const getPriorityBadge = priority => {
    switch (priority) {
      case 'High':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
            {priority}
          </span>;
      case 'Medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
            {priority}
          </span>;
      case 'Low':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            {priority}
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
                Interactive Support
              </h1>
              <p className="text-gray-500 mt-1">
                Get personalized help through multiple channels
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center" onClick={() => setShowChatWindow(true)}>
              <MessageSquare size={16} className="mr-2" />
              Start Live Chat
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
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'live-chat' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('live-chat')}>
                <MessageSquare size={18} className="mr-2" />
                <span>Live Chat</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'tickets' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('tickets')}>
                <TicketIcon size={18} className="mr-2" />
                <span>Support Tickets</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'screen-sharing' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('screen-sharing')}>
                <Monitor size={18} className="mr-2" />
                <span>Screen Sharing</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'community' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('community')}>
                <ExternalLink size={18} className="mr-2" />
                <span>Community Forum</span>
              </button>
            </div>
          </div>
          {/* Tab content */}
          <div className="space-y-6">
            {/* Live Chat Tab */}
            {activeTab === 'live-chat' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">Start a Live Chat</h2>
                  </div>
                  <div className="p-6">
                    <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <MessageSquare size={20} className="text-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-dark">
                            24/7 Live Support
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            Our support team is available around the clock to
                            assist you with any questions or issues you may
                            have.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What do you need help with?
                      </label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Select a topic</option>
                        <option>Account & Billing</option>
                        <option>Deal Finder</option>
                        <option>Campaigns</option>
                        <option>LOI Generator</option>
                        <option>Integrations</option>
                        <option>Technical Issue</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Briefly describe your issue
                      </label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-lg h-32" placeholder="Please provide details about what you need help with..."></textarea>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Average response time:{' '}
                        <span className="font-medium">Under 1 minute</span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center" onClick={() => setShowChatWindow(true)}>
                        <MessageSquare size={16} className="mr-2" />
                        Start Chat
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="font-medium">Other Contact Options</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                          <Phone size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Phone Support</h3>
                          <p className="text-gray-500 text-xs">
                            Mon-Fri, 9AM-6PM ET
                          </p>
                        </div>
                        <button className="ml-auto px-3 py-1.5 bg-primary text-white rounded-lg text-sm">
                          Call
                        </button>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                          <Video size={20} className="text-tertiary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Video Support</h3>
                          <p className="text-gray-500 text-xs">
                            Schedule a session
                          </p>
                        </div>
                        <button className="ml-auto px-3 py-1.5 bg-tertiary text-dark rounded-lg text-sm">
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="font-medium">Chat Operating Hours</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Monday - Friday</span>
                          <span className="text-sm font-medium">24 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Saturday</span>
                          <span className="text-sm font-medium">
                            8AM - 8PM ET
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Sunday</span>
                          <span className="text-sm font-medium">
                            10AM - 6PM ET
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-green-600">
                            Support is currently online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Support Tickets Tab */}
            {activeTab === 'tickets' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-medium">Your Support Tickets</h2>
                    <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm flex items-center">
                      <TicketIcon size={14} className="mr-1.5" />
                      New Ticket
                    </button>
                  </div>
                  {tickets.length > 0 ? <div className="divide-y divide-gray-200">
                      {tickets.map(ticket => <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-2">
                                {ticket.id}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {ticket.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(ticket.status)}
                              {getPriorityBadge(ticket.priority)}
                            </div>
                          </div>
                          <h3 className="font-medium text-dark mb-2">
                            {ticket.subject}
                          </h3>
                          <div className="flex justify-between items-center text-sm">
                            <div className="text-gray-500 flex items-center space-x-4">
                              <span>Created {ticket.created}</span>
                              <span>Updated {ticket.lastUpdated}</span>
                            </div>
                            <button className="text-primary hover:underline">
                              View Details
                            </button>
                          </div>
                        </div>)}
                    </div> : <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TicketIcon size={24} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        No tickets found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        You don't have any support tickets yet.
                      </p>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                        Create Your First Ticket
                      </button>
                    </div>}
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="font-medium">Create a Support Ticket</h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Brief description of your issue" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg">
                            <option>Select a category</option>
                            <option>Account & Billing</option>
                            <option>Technical Issue</option>
                            <option>Feature Request</option>
                            <option>Data Management</option>
                            <option>Integrations</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-lg">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea className="w-full p-2 border border-gray-300 rounded-lg h-32" placeholder="Please provide detailed information about your issue..."></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attachments (optional)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center mx-auto">
                              <Paperclip size={14} className="mr-1.5" />
                              Add Files
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                              Max file size: 10MB (PNG, JPG, PDF)
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-lg">
                        Submit Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Screen Sharing Tab */}
            {activeTab === 'screen-sharing' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-medium">
                      Schedule a Screen Sharing Session
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <Video size={20} className="text-primary mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-dark">
                            Personalized Support
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            Schedule a one-on-one screen sharing session with a
                            support specialist to get guided assistance with
                            your specific needs.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Topic
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>Select a topic</option>
                          <option>Platform Walkthrough</option>
                          <option>Deal Analysis Tool Setup</option>
                          <option>Campaign Configuration</option>
                          <option>LOI Template Customization</option>
                          <option>Integration Setup</option>
                          <option>Data Import/Export</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>30 minutes</option>
                          <option>45 minutes</option>
                          <option>60 minutes</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date & Time
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" min={new Date().toISOString().split('T')[0]} />
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>9:00 AM ET</option>
                          <option>10:00 AM ET</option>
                          <option>11:00 AM ET</option>
                          <option>12:00 PM ET</option>
                          <option>1:00 PM ET</option>
                          <option>2:00 PM ET</option>
                          <option>3:00 PM ET</option>
                          <option>4:00 PM ET</option>
                          <option>5:00 PM ET</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details
                      </label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-lg h-32" placeholder="Please provide any specific details about what you need help with..."></textarea>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Schedule Session
                    </button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="font-medium">Upcoming Sessions</h2>
                    </div>
                    {upcomingSessions.length > 0 ? <div className="divide-y divide-gray-200">
                        {upcomingSessions.map(session => <div key={session.id} className="p-4">
                            <div className="flex items-center mb-2">
                              <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                                <Video size={16} className="text-tertiary" />
                              </div>
                              <span className="font-medium text-sm">
                                {session.type}
                              </span>
                            </div>
                            <div className="ml-10 space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar size={14} className="text-gray-500 mr-2" />
                                <span>{session.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock size={14} className="text-gray-500 mr-2" />
                                <span>{session.time}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <User size={14} className="text-gray-500 mr-2" />
                                <span>With: {session.with}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Info size={14} className="text-gray-500 mr-2" />
                                <span>Topic: {session.topic}</span>
                              </div>
                              <div className="flex space-x-2 mt-3">
                                <button className="px-3 py-1.5 bg-tertiary text-dark rounded-lg text-xs">
                                  Join Session
                                </button>
                                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs">
                                  Reschedule
                                </button>
                                <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>)}
                      </div> : <div className="p-6 text-center">
                        <p className="text-gray-500 text-sm">
                          You don't have any upcoming sessions scheduled.
                        </p>
                      </div>}
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="font-medium">Remote Assistance</h2>
                    </div>
                    <div className="p-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-yellow-500 mr-3 mt-0.5" />
                          <p className="text-sm text-yellow-700">
                            Remote assistance allows our support team to
                            securely access your screen to help troubleshoot
                            issues. Only available during active support
                            sessions.
                          </p>
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center justify-center">
                        <Monitor size={16} className="mr-2" />
                        Request Remote Assistance
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Community Forum Tab */}
            {activeTab === 'community' && <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">Community Forum</h2>
                </div>
                <div className="p-8 text-center">
                  <img src="https://illustrations.popsy.co/amber/community.svg" alt="Community Forum" className="w-48 h-48 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-dark mb-2">
                    Join Our Community
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Connect with other AcquireFlow.AI users, share tips, and get
                    help from the community. Our forum is a great place to learn
                    best practices and network with fellow real estate
                    investors.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center">
                      <ExternalLink size={16} className="mr-2" />
                      Visit Community Forum
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center">
                      <Users size={16} className="mr-2" />
                      Browse User Groups
                    </a>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
      {/* Live Chat Window (Fixed Position) */}
      {showChatWindow && <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="px-4 py-3 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              <h3 className="font-medium">Live Support</h3>
            </div>
            <button className="text-white hover:text-gray-200" onClick={() => setShowChatWindow(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="h-80 p-4 overflow-y-auto bg-gray-50">
            <div className="mb-3">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <User size={16} />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%]">
                  <p className="text-xs font-medium mb-1">Sarah (Support)</p>
                  <p className="text-sm">
                    Hello! Welcome to AcquireFlow.AI support. How can I help you
                    today?
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500 ml-10 mt-1">2:30 PM</div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input type="text" placeholder="Type your message..." className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary" value={message} onChange={e => setMessage(e.target.value)} />
              <button className="bg-primary text-white p-2 rounded-r-lg">
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <button className="flex items-center">
                <Paperclip size={14} className="mr-1" />
                Attach
              </button>
              <span>Sarah is typing...</span>
            </div>
          </div>
        </div>}
    </div>;
};