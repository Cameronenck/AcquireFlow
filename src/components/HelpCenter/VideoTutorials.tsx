import React from 'react';
import { Play, Clock, ChevronRight } from 'lucide-react';
export const VideoTutorials = () => {
  const featuredTutorial = {
    id: 1,
    title: 'Complete Platform Walkthrough',
    description: 'A comprehensive tour of all AcquireFlow.AI features and how to use them effectively',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    duration: '18:24',
    instructor: 'Sarah Johnson',
    category: 'Getting Started'
  };
  const tutorials = [{
    id: 2,
    title: 'Setting Up Your First Campaign',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    duration: '8:45',
    category: 'Campaigns'
  }, {
    id: 3,
    title: 'Advanced Deal Analysis',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    duration: '12:30',
    category: 'Deal Finder'
  }, {
    id: 4,
    title: 'Creating Custom LOI Templates',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    duration: '10:15',
    category: 'LOI Generator'
  }, {
    id: 5,
    title: 'Team Collaboration Features',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    duration: '7:50',
    category: 'Team Management'
  }];
  const categories = ['Getting Started', 'Deal Finder', 'Campaigns', 'LOI Generator', 'Integrations', 'Team Management', 'Reports & Analytics'];
  return <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Video categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-medium">Categories</h3>
        </div>
        <div className="py-2">
          {categories.map((category, index) => <button key={index} className="w-full text-left px-5 py-2.5 hover:bg-gray-50 text-sm flex items-center justify-between">
              <span>{category}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </button>)}
        </div>
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
            View All Categories
          </button>
        </div>
      </div>
      {/* Featured tutorial */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-medium">Featured Tutorial</h3>
        </div>
        <div className="p-5">
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img src={featuredTutorial.thumbnail} alt={featuredTutorial.title} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button className="w-14 h-14 rounded-full bg-primary bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors">
                <Play size={24} className="text-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 m-2 rounded">
              {featuredTutorial.duration}
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">
                {featuredTutorial.category}
              </span>
              <span className="text-xs text-gray-500">
                Instructor: {featuredTutorial.instructor}
              </span>
            </div>
            <h4 className="font-medium mt-2 text-dark">
              {featuredTutorial.title}
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              {featuredTutorial.description}
            </p>
            <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors flex items-center">
              <Play size={16} className="mr-2" />
              Watch Now
            </button>
          </div>
        </div>
      </div>
      {/* Recent tutorials */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-medium">Recent Tutorials</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {tutorials.map(tutorial => <div key={tutorial.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex space-x-3">
                <div className="relative w-20 h-14 flex-shrink-0">
                  <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-full object-cover rounded" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-black bg-opacity-60 flex items-center justify-center">
                      <Play size={12} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-dark">
                    {tutorial.title}
                  </h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {tutorial.duration}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {tutorial.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
            View All Videos
          </button>
        </div>
      </div>
    </div>;
};