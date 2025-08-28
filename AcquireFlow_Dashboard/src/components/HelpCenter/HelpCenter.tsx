import React, { useState } from 'react';
import { Search, BookOpen, Video, Bell, MessageSquare, ChevronRight, ArrowRight, ExternalLink, Play, HelpCircle } from 'lucide-react';
import { HelpNavigation } from './HelpNavigation';
import { PopularArticles } from './PopularArticles';
import { VideoTutorials } from './VideoTutorials';
import { FeatureAnnouncements } from './FeatureAnnouncements';
import { ContactOptions } from './ContactOptions';
export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = [{
    id: 1,
    text: 'How to create a new campaign',
    category: 'Campaigns'
  }, {
    id: 2,
    text: 'Setting up your first deal',
    category: 'Deal Finder'
  }, {
    id: 3,
    text: 'Integrating with MLS systems',
    category: 'Integrations'
  }, {
    id: 4,
    text: 'Customizing LOI templates',
    category: 'LOI Generator'
  }, {
    id: 5,
    text: 'Managing team permissions',
    category: 'Settings'
  }];
  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };
  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">
                Help & Support Center
              </h1>
              <p className="text-gray-500 mt-1">
                Find answers, tutorials, and support for AcquireFlow.AI
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
          {/* Navigation */}
          <HelpNavigation />
          {/* Search section */}
          <div className="mt-8 bg-gradient-to-r from-primary to-primary-dark rounded-xl py-10 px-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">
                How can we help you today?
              </h2>
              <p className="text-white text-opacity-90 mb-6">
                Search our knowledge base for answers or browse the categories
                below
              </p>
              <div className="relative">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
                  <input type="text" placeholder="Search for answers..." className="w-full pl-12 pr-4 py-3 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
                </div>
                {/* Search suggestions */}
                {showSuggestions && <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                    <div className="p-2">
                      {suggestions.map(suggestion => <div key={suggestion.id} className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center justify-between" onClick={() => setSearchQuery(suggestion.text)}>
                          <div className="flex items-center">
                            <Search size={16} className="text-gray-400 mr-2" />
                            <span>{suggestion.text}</span>
                          </div>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
                            {suggestion.category}
                          </span>
                        </div>)}
                      <div className="mt-2 pt-2 border-t border-gray-100 px-3 py-2">
                        <button className="text-primary text-sm hover:underline flex items-center">
                          View all results{' '}
                          <ArrowRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
          {/* Quick links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                  <BookOpen size={20} className="text-primary" />
                </div>
                <h3 className="font-medium">Knowledge Base</h3>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Browse our comprehensive library of articles and guides
              </p>
              <button className="mt-4 text-primary text-sm flex items-center hover:underline">
                Explore Articles <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-secondary bg-opacity-10 rounded-lg mr-3">
                  <Video size={20} className="text-secondary" />
                </div>
                <h3 className="font-medium">Video Tutorials</h3>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Watch step-by-step tutorials on how to use AcquireFlow.AI
              </p>
              <button className="mt-4 text-secondary text-sm flex items-center hover:underline">
                Watch Videos <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                  <MessageSquare size={20} className="text-tertiary" />
                </div>
                <h3 className="font-medium">Interactive Support</h3>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Get personalized help through chat, tickets, or screen sharing
              </p>
              <button className="mt-4 text-tertiary text-sm flex items-center hover:underline">
                Get Support <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-gray-200 rounded-lg mr-3">
                  <HelpCircle size={20} className="text-gray-700" />
                </div>
                <h3 className="font-medium">Self-Service Tools</h3>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Access diagnostics, status updates, and feature requests
              </p>
              <button className="mt-4 text-gray-700 text-sm flex items-center hover:underline">
                View Tools <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
          {/* Popular articles */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">
                Popular Articles & FAQs
              </h2>
              <button className="text-primary text-sm flex items-center hover:underline">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <PopularArticles />
          </div>
          {/* Video tutorials */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">
                Video Tutorial Library
              </h2>
              <button className="text-primary text-sm flex items-center hover:underline">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <VideoTutorials />
          </div>
          {/* Feature announcements */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-dark">
                Latest Feature Announcements
              </h2>
              <button className="text-primary text-sm flex items-center hover:underline">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            <FeatureAnnouncements />
          </div>
          {/* Contact options */}
          <div className="mt-12 mb-8">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-bold text-dark">
                Contact Support Options
              </h2>
            </div>
            <ContactOptions />
          </div>
        </div>
      </div>
    </div>;
};