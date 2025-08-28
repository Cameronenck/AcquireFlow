import React from 'react';
import { Calendar, ArrowRight, Bell, Zap, ChevronRight } from 'lucide-react';
export const FeatureAnnouncements = () => {
  const announcements = [{
    id: 1,
    title: 'New AI-Powered Deal Analysis',
    description: "We've launched our advanced AI deal analysis tool that automatically evaluates properties and provides investment recommendations.",
    date: 'October 15, 2023',
    category: 'New Feature',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }, {
    id: 2,
    title: 'Enhanced MLS Integration',
    description: 'Connect with 50+ new MLS providers across the country for more comprehensive property data.',
    date: 'October 10, 2023',
    category: 'Enhancement',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }, {
    id: 3,
    title: 'Mobile App Launch',
    description: 'AcquireFlow.AI is now available on iOS and Android devices. Manage your deals on the go!',
    date: 'October 5, 2023',
    category: 'New Feature',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }];
  const upcomingFeatures = [{
    id: 1,
    title: 'Advanced Team Collaboration Tools',
    releaseDate: 'November 2023'
  }, {
    id: 2,
    title: 'Custom Reporting Dashboard',
    releaseDate: 'December 2023'
  }, {
    id: 3,
    title: 'Multi-Channel Marketing Automation',
    releaseDate: 'January 2024'
  }];
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main announcements */}
      <div className="lg:col-span-2 space-y-6">
        {announcements.map(announcement => <div key={announcement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${announcement.category === 'New Feature' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-tertiary bg-opacity-10 text-tertiary-dark'}`}>
                  {announcement.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {announcement.date}
                </span>
              </div>
              <h4 className="font-medium mt-2 text-dark">
                {announcement.title}
              </h4>
              <p className="text-gray-500 text-sm mt-1">
                {announcement.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button className="text-primary text-sm flex items-center hover:underline">
                  Read More <ArrowRight size={16} className="ml-1" />
                </button>
                <button className="text-gray-500 text-sm hover:text-gray-700">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {/* Upcoming features & subscribe */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-medium">Coming Soon</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingFeatures.map(feature => <div key={feature.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-dark">{feature.title}</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {feature.releaseDate}
                  </span>
                </div>
                <button className="text-primary text-sm flex items-center hover:underline mt-2">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </button>
              </div>)}
          </div>
          <div className="px-5 py-4 border-t border-gray-200">
            <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
              View Product Roadmap
            </button>
          </div>
        </div>
        <div className="bg-gradient-to-r from-tertiary to-tertiary-dark rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-full mr-3">
              <Bell size={20} className="text-white" />
            </div>
            <h3 className="font-medium text-white">Stay Updated</h3>
          </div>
          <p className="text-white text-opacity-90 text-sm mb-4">
            Subscribe to our newsletter to get notified about new features and
            updates.
          </p>
          <div className="mb-4">
            <input type="email" placeholder="Your email address" className="w-full p-2 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-white" />
          </div>
          <button className="w-full py-2 bg-white text-tertiary-dark rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center">
            <Zap size={16} className="mr-2" />
            Subscribe
          </button>
        </div>
      </div>
    </div>;
};