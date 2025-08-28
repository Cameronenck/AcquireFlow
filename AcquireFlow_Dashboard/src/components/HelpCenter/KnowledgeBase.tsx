import React, { useState } from 'react';
import { Search, Filter, BookOpen, FileText, ChevronRight, ArrowRight, ThumbsUp, ThumbsDown, Tag, Clock, X } from 'lucide-react';
export const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const categories = [{
    id: 'all',
    name: 'All Categories',
    count: 126
  }, {
    id: 'getting-started',
    name: 'Getting Started',
    count: 18
  }, {
    id: 'deal-finder',
    name: 'Deal Finder',
    count: 24
  }, {
    id: 'campaigns',
    name: 'Campaigns',
    count: 31
  }, {
    id: 'loi-generator',
    name: 'LOI Generator',
    count: 15
  }, {
    id: 'integrations',
    name: 'Integrations',
    count: 22
  }, {
    id: 'account',
    name: 'Account & Billing',
    count: 16
  }];
  const tags = [{
    id: 'tutorial',
    name: 'Tutorial'
  }, {
    id: 'guide',
    name: 'Guide'
  }, {
    id: 'troubleshooting',
    name: 'Troubleshooting'
  }, {
    id: 'faq',
    name: 'FAQ'
  }, {
    id: 'best-practice',
    name: 'Best Practice'
  }, {
    id: 'advanced',
    name: 'Advanced'
  }];
  const articles = [{
    id: 1,
    title: 'Getting Started with AcquireFlow.AI',
    excerpt: 'Learn the basics of setting up your account, creating your first campaign, and navigating the dashboard.',
    category: 'Getting Started',
    tags: ['Tutorial', 'Guide'],
    readTime: '5 min read',
    lastUpdated: '2 days ago',
    helpful: 128
  }, {
    id: 2,
    title: 'How to Create and Send LOIs in Bulk',
    excerpt: 'Step-by-step guide to creating, customizing, and sending Letters of Intent to multiple property owners.',
    category: 'LOI Generator',
    tags: ['Tutorial', 'Advanced'],
    readTime: '7 min read',
    lastUpdated: '1 week ago',
    helpful: 95
  }, {
    id: 3,
    title: 'Setting Up MLS Integration',
    excerpt: 'Connect your MLS accounts to automatically import property listings into your deal finder.',
    category: 'Integrations',
    tags: ['Guide', 'Tutorial'],
    readTime: '6 min read',
    lastUpdated: '3 days ago',
    helpful: 87
  }, {
    id: 4,
    title: 'Troubleshooting Common Campaign Issues',
    excerpt: 'Solutions to the most frequent problems encountered when running marketing campaigns.',
    category: 'Campaigns',
    tags: ['Troubleshooting', 'FAQ'],
    readTime: '10 min read',
    lastUpdated: '5 days ago',
    helpful: 76
  }, {
    id: 5,
    title: 'Advanced Deal Analysis Techniques',
    excerpt: 'Learn how to use the advanced deal analysis features to evaluate investment opportunities.',
    category: 'Deal Finder',
    tags: ['Advanced', 'Best Practice'],
    readTime: '12 min read',
    lastUpdated: '1 day ago',
    helpful: 65
  }, {
    id: 6,
    title: 'Managing Team Permissions and Roles',
    excerpt: 'Learn how to add team members, set permissions, and manage roles for optimal collaboration.',
    category: 'Account & Billing',
    tags: ['Guide', 'Best Practice'],
    readTime: '8 min read',
    lastUpdated: '2 weeks ago',
    helpful: 54
  }];
  const toggleTag = tagId => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
  };
  // Filter articles based on search, category, and tags
  const filteredArticles = articles.filter(article => {
    // Search filter
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase()) && !article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && article.category.toLowerCase().replace(/\s+/g, '-') !== selectedCategory) {
      return false;
    }
    // Tags filter
    if (selectedTags.length > 0 && !article.tags.some(tag => selectedTags.includes(tag.toLowerCase().replace(/\s+/g, '-')))) {
      return false;
    }
    return true;
  });
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">Knowledge Base</h1>
              <p className="text-gray-500 mt-1">
                Browse our articles, tutorials, and guides
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
              <Search size={16} className="mr-2" />
              Advanced Search
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and filter bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Search the knowledge base..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <select className="appearance-none pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    {categories.map(category => <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>)}
                  </select>
                  <BookOpen size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center bg-white">
                  <Filter size={16} className="mr-2 text-gray-500" />
                  Filters
                </button>
              </div>
            </div>
            {/* Active filters */}
            {(selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery) && <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedCategory !== 'all' && <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm flex items-center">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button className="ml-1 p-0.5 hover:bg-primary hover:bg-opacity-20 rounded-full" onClick={() => setSelectedCategory('all')}>
                      <X size={14} />
                    </button>
                  </span>}
                {selectedTags.map(tagId => <span key={tagId} className="px-2 py-1 bg-tertiary bg-opacity-10 text-tertiary-dark rounded-full text-sm flex items-center">
                    {tags.find(t => t.id === tagId)?.name}
                    <button className="ml-1 p-0.5 hover:bg-tertiary hover:bg-opacity-20 rounded-full" onClick={() => toggleTag(tagId)}>
                      <X size={14} />
                    </button>
                  </span>)}
                {searchQuery && <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                    "{searchQuery}"
                    <button className="ml-1 p-0.5 hover:bg-gray-200 rounded-full" onClick={() => setSearchQuery('')}>
                      <X size={14} />
                    </button>
                  </span>}
                <button className="text-primary text-sm hover:underline ml-2" onClick={clearFilters}>
                  Clear all
                </button>
              </div>}
          </div>
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Categories</h3>
                </div>
                <div className="py-2">
                  {categories.map(category => <button key={category.id} className={`w-full text-left px-5 py-2.5 text-sm flex items-center justify-between ${selectedCategory === category.id ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'hover:bg-gray-50'}`} onClick={() => setSelectedCategory(category.id)}>
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </button>)}
                </div>
              </div>
              {/* Tags */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-medium">Filter by Tags</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => <button key={tag.id} className={`px-3 py-1.5 rounded-full text-sm ${selectedTags.includes(tag.id) ? 'bg-tertiary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => toggleTag(tag.id)}>
                        {tag.name}
                      </button>)}
                  </div>
                </div>
              </div>
            </div>
            {/* Articles list */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">
                    {filteredArticles.length}{' '}
                    {filteredArticles.length === 1 ? 'Article' : 'Articles'}{' '}
                    Found
                  </h3>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-2">Sort by:</span>
                    <select className="border-none bg-transparent focus:outline-none text-primary">
                      <option>Most Helpful</option>
                      <option>Recently Updated</option>
                      <option>Alphabetical</option>
                    </select>
                  </div>
                </div>
                {filteredArticles.length > 0 ? <div className="divide-y divide-gray-200">
                    {filteredArticles.map(article => <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start">
                          <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-4 mt-1">
                            <FileText size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {article.category}
                              </span>
                              {article.tags.map((tag, index) => <span key={index} className="text-xs bg-tertiary bg-opacity-10 text-tertiary-dark px-2 py-1 rounded-full flex items-center">
                                  <Tag size={12} className="mr-1" />
                                  {tag}
                                </span>)}
                            </div>
                            <h4 className="font-medium text-dark">
                              {article.title}
                            </h4>
                            <p className="text-gray-500 text-sm mt-1">
                              {article.excerpt}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center text-xs text-gray-500 space-x-4">
                                <span className="flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {article.readTime}
                                </span>
                                <span className="flex items-center">
                                  <ThumbsUp size={14} className="mr-1" />
                                  {article.helpful} found helpful
                                </span>
                                <span>Updated {article.lastUpdated}</span>
                              </div>
                              <button className="text-primary text-sm flex items-center hover:underline">
                                Read Article{' '}
                                <ChevronRight size={16} className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search or filter criteria to find what
                      you're looking for.
                    </p>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm" onClick={clearFilters}>
                      Clear all filters
                    </button>
                  </div>}
                {filteredArticles.length > 0 && <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Showing{' '}
                      <span className="font-medium">
                        {filteredArticles.length}
                      </span>{' '}
                      of <span className="font-medium">{articles.length}</span>{' '}
                      articles
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm" disabled>
                        Previous
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                        Next
                      </button>
                    </div>
                  </div>}
              </div>
              {/* Still need help section */}
              <div className="mt-8 bg-gray-800 rounded-lg shadow-sm overflow-hidden text-white">
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-2">Still need help?</h3>
                  <p className="text-white text-opacity-80 mb-4">
                    Can't find what you're looking for? Our support team is
                    ready to assist you.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                      Contact Support
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
                      Schedule a Demo
                    </button>
                    <button className="px-4 py-2 bg-transparent border border-white text-white rounded-lg text-sm hover:bg-white hover:bg-opacity-10 transition-colors">
                      Visit Community Forum
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};