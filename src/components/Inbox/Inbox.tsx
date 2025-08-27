import React, { useEffect, useState } from 'react';
import { ResponseList } from './ResponseList';
import { DetailView } from './DetailView';
import { TopFilters } from './TopFilters';
import { BulkActions } from './BulkActions';
import { Search, BellRing, Filter, X, Inbox as InboxIcon } from 'lucide-react';
export const Inbox = () => {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    unread: false,
    hotLeads: false,
    propertyType: 'all',
    dateRange: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  // Generate sample response data
  useEffect(() => {
    const generateResponses = () => {
      const statuses = ['hot', 'warm', 'cold'];
      const propertyTypes = ['Single Family', 'Multi-Family', 'Commercial', 'Land'];
      const sentiments = ['positive', 'neutral', 'negative'];
      const categories = ['Interested', 'Counter-offer', 'Need more info', 'Rejection'];
      const agentNames = ['Sarah Johnson', 'Michael Brown', 'Jessica Lee', 'David Wilson', 'Amanda Garcia', 'Thomas Lee', 'Samantha Taylor', 'James Wilson', 'Emily Davis', 'Daniel Kim', 'Rachel Martinez', 'Robert Chen', 'Jennifer Smith', 'Christopher Patel', 'Lisa Rodriguez'];
      const responses = [];
      for (let i = 1; i <= 50; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const agentName = agentNames[Math.floor(Math.random() * agentNames.length)];
        // Generate a random date within the last 30 days
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        // Generate a random message based on the category
        let message = '';
        switch (category) {
          case 'Interested':
            message = 'Thanks for your interest in the property. My client is interested in discussing further. Could you provide more details about your offer?';
            break;
          case 'Counter-offer':
            message = "We've reviewed your offer and while we appreciate it, my client is looking for something closer to the asking price. Would you consider a counter-offer of...";
            break;
          case 'Need more info':
            message = 'Thanks for reaching out. Before we proceed, could you provide more information about your investment strategy and timeline?';
            break;
          case 'Rejection':
            message = 'Thank you for your offer. After careful consideration, my client has decided to go with another buyer. We appreciate your interest.';
            break;
        }
        responses.push({
          id: i,
          agent: {
            name: agentName,
            email: `${agentName.toLowerCase().replace(' ', '.')}@example.com`,
            phone: `(555) ${100 + i}-${1000 + i}`,
            company: `Real Estate Co. ${i % 5 + 1}`,
            avatar: `https://source.unsplash.com/random/100x100/?portrait,${i}`
          },
          property: {
            id: 100 + i,
            address: `${1000 + i} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
            city: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'][Math.floor(Math.random() * 5)],
            state: 'FL',
            price: 500000 + Math.floor(Math.random() * 1500000),
            type: propertyType,
            beds: Math.floor(Math.random() * 4) + 2,
            baths: Math.floor(Math.random() * 3) + 1,
            sqft: 1000 + Math.floor(Math.random() * 3000),
            image: `https://source.unsplash.com/random/300x200/?house,${i}`
          },
          message: message,
          preview: message.substring(0, 80) + (message.length > 80 ? '...' : ''),
          status,
          sentiment,
          category,
          date,
          unread: Math.random() > 0.5,
          followUpNeeded: Math.random() > 0.7,
          priorityScore: Math.floor(Math.random() * 100),
          tags: ['Follow-up', 'Negotiation', 'Hot Lead', 'New Contact'].slice(0, Math.floor(Math.random() * 3) + 1),
          conversation: generateConversation(i, date, message)
        });
      }
      return responses.sort((a, b) => b.date - a.date);
    };
    const generateConversation = (id, latestDate, latestMessage) => {
      // Generate a conversation thread with 1-5 messages
      const messageCount = Math.floor(Math.random() * 5) + 1;
      const conversation = [];
      // Start date (7 days before the latest message)
      let currentDate = new Date(latestDate);
      currentDate.setDate(currentDate.getDate() - 7);
      // Initial outreach
      conversation.push({
        id: `${id}-1`,
        sender: 'you',
        message: "Hello, I'm reaching out regarding the property at [Address]. I'm interested in discussing a potential offer. Would you be available to talk?",
        date: new Date(currentDate),
        read: true
      });
      // Generate intermediate messages
      for (let i = 2; i < messageCount; i++) {
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 2) + 1);
        if (i % 2 === 0) {
          // Agent message
          conversation.push({
            id: `${id}-${i}`,
            sender: 'agent',
            message: "Thank you for reaching out. I'd be happy to discuss this property with you. What's your budget and timeline?",
            date: new Date(currentDate),
            read: true
          });
        } else {
          // User message
          conversation.push({
            id: `${id}-${i}`,
            sender: 'you',
            message: "I'm looking to close within 30 days and have financing ready. I'm thinking of an offer around 90% of the asking price. Would that be something your client would consider?",
            date: new Date(currentDate),
            read: true
          });
        }
      }
      // Add the latest message
      conversation.push({
        id: `${id}-${messageCount}`,
        sender: 'agent',
        message: latestMessage,
        date: new Date(latestDate),
        read: false
      });
      return conversation;
    };
    setTimeout(() => {
      setResponses(generateResponses());
      setLoading(false);
    }, 1000);
    // Simulate new message notification
    const notificationTimer = setTimeout(() => {
      const newMessage = {
        id: 'new-notification',
        agent: {
          name: 'Sarah Johnson',
          avatar: 'https://source.unsplash.com/random/100x100/?portrait,woman'
        },
        property: {
          address: '1234 Main St',
          city: 'Miami',
          state: 'FL'
        },
        preview: 'I just received your offer and my client is very interested...'
      };
      setNewNotification(newMessage);
      setShowNotification(true);
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 15000);
    return () => {
      clearTimeout(notificationTimer);
    };
  }, []);
  const handleSelectResponse = response => {
    setSelectedResponse(response);
    // Mark as read if unread
    if (response.unread) {
      setResponses(prevResponses => prevResponses.map(r => r.id === response.id ? {
        ...r,
        unread: false
      } : r));
    }
  };
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleFilterChange = (filter, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  const handleSelectAll = () => {
    if (selectedResponses.length === filteredResponses.length) {
      setSelectedResponses([]);
    } else {
      setSelectedResponses(filteredResponses.map(r => r.id));
    }
  };
  const handleToggleResponseSelection = responseId => {
    setSelectedResponses(prev => {
      if (prev.includes(responseId)) {
        return prev.filter(id => id !== responseId);
      } else {
        return [...prev, responseId];
      }
    });
  };
  const handleBulkAction = action => {
    console.log(`Performing ${action} on:`, selectedResponses);
    // In a real app, you would perform the action on the selected responses
    // Reset selection after action
    setSelectedResponses([]);
  };
  // Apply filters and search to responses
  const filteredResponses = responses.filter(response => {
    // Filter by unread
    if (activeFilters.unread && !response.unread) {
      return false;
    }
    // Filter by hot leads
    if (activeFilters.hotLeads && response.status !== 'hot') {
      return false;
    }
    // Filter by property type
    if (activeFilters.propertyType !== 'all' && response.property.type !== activeFilters.propertyType) {
      return false;
    }
    // Filter by date range
    if (activeFilters.dateRange !== 'all') {
      const today = new Date();
      const responseDate = new Date(response.date);
      switch (activeFilters.dateRange) {
        case 'today':
          if (responseDate.toDateString() !== today.toDateString()) {
            return false;
          }
          break;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          if (responseDate < weekAgo) {
            return false;
          }
          break;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          if (responseDate < monthAgo) {
            return false;
          }
          break;
      }
    }
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return response.agent.name.toLowerCase().includes(query) || response.property.address.toLowerCase().includes(query) || response.property.city.toLowerCase().includes(query) || response.message.toLowerCase().includes(query) || response.category.toLowerCase().includes(query) || response.tags.some(tag => tag.toLowerCase().includes(query));
    }
    return true;
  });
  const unreadCount = responses.filter(r => r.unread).length;
  const hotLeadsCount = responses.filter(r => r.status === 'hot').length;
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Top section with search and filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-dark flex items-center">
              <InboxIcon size={24} className="mr-3 text-primary" />
              Response Inbox
              {unreadCount > 0 && <span className="ml-3 text-sm bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full font-medium">
                  {unreadCount} Unread
                </span>}
              {hotLeadsCount > 0 && <span className="ml-3 text-sm bg-secondary bg-opacity-10 text-secondary px-3 py-1 rounded-full font-medium">
                  {hotLeadsCount} Hot Leads
                </span>}
            </h1>
            <div className="relative">
              <div className="relative">
                <input type="text" placeholder="Search responses..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-primary transition-all" value={searchQuery} onChange={handleSearchChange} />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                {searchQuery && <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setSearchQuery('')}>
                    <X size={18} />
                  </button>}
              </div>
              {searchQuery && <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10 py-2 animate-fade-in-up">
                  <div className="px-3 py-1 text-xs text-gray-500 uppercase">
                    Search tips
                  </div>
                  <div className="px-3 py-1 text-sm">
                    Try searching by agent name, property, or message content
                  </div>
                  <div className="px-3 py-1 text-sm">
                    Use <span className="font-mono bg-gray-100 px-1">tag:</span>{' '}
                    to search by tags
                  </div>
                  <div className="px-3 py-1 text-sm">
                    Use{' '}
                    <span className="font-mono bg-gray-100 px-1">status:</span>{' '}
                    to filter by status
                  </div>
                </div>}
            </div>
          </div>
          <TopFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Main content - split view with adjusted proportions */}
      <div className="flex flex-1 overflow-hidden">
        {/* Response list (reduced from 40% to 25%) */}
        <div className="w-1/4 border-r border-gray-200 bg-white overflow-hidden flex flex-col">
          <ResponseList responses={filteredResponses} selectedResponse={selectedResponse} onSelectResponse={handleSelectResponse} loading={loading} selectedResponses={selectedResponses} onSelectResponseCheckbox={handleToggleResponseSelection} />
        </div>

        {/* Detail view (expanded from 60% to 75%) */}
        <div className="w-3/4 overflow-hidden flex flex-col">
          {selectedResponse ? <DetailView response={selectedResponse} onBack={() => setSelectedResponse(null)} /> : <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
              <img src="https://illustrations.popsy.co/gray/message-sent.svg" alt="Select a response" className="w-64 h-64 mb-6 opacity-80 animate-float" />
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                No response selected
              </h2>
              <p className="text-gray-500 max-w-md">
                Select a response from the list to view the full conversation
                and property details.
              </p>
            </div>}
        </div>
      </div>

      {/* Bulk actions toolbar */}
      {selectedResponses.length > 0 && <BulkActions selectedCount={selectedResponses.length} onAction={handleBulkAction} onSelectAll={handleSelectAll} onClearSelection={() => setSelectedResponses([])} allSelected={selectedResponses.length === filteredResponses.length} />}

      {/* New message notification */}
      {showNotification && newNotification && <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-primary p-4 w-80 animate-float z-50">
          <div className="flex items-start">
            <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
              <BellRing size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-dark">New Response</h3>
                <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowNotification(false)}>
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">
                  {newNotification.agent.name}
                </span>{' '}
                responded about {newNotification.property.address}
              </p>
              <p className="text-xs text-gray-500 mt-2 italic">
                "{newNotification.preview}"
              </p>
              <button className="mt-3 text-primary text-sm font-medium hover:underline transition-colors" onClick={() => {
            setShowNotification(false);
            // In a real app, you would find and select the actual response
          }}>
                View Response
              </button>
            </div>
          </div>
        </div>}
    </div>;
};