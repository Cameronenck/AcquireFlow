import React from 'react';
import { AlertCircle, Check, Award } from 'lucide-react';
export const ActivityFeed = () => {
  const activities = [{
    type: 'hot-lead',
    title: 'New Hot Lead',
    description: 'Sarah Johnson expressed interest in Main St property',
    time: '2 minutes ago',
    icon: <AlertCircle size={16} className="text-orange-500" />
  }, {
    type: 'deal-closed',
    title: 'Deal Closed',
    description: 'Oak Avenue property sold for $425,000',
    time: '1 hour ago',
    icon: <Check size={16} className="text-green-500" />
  }, {
    type: 'campaign',
    title: 'Campaign Milestone',
    description: 'Orlando Cash Buyers campaign reached 100 responses',
    time: '3 hours ago',
    icon: <Award size={16} className="text-blue-500" />
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 h-full transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Activity Feed</h2>
        <span className="bg-green-500 text-white px-2 py-0.5 text-xs rounded-full flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
          Live
        </span>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => <div key={index} className="flex border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
              {activity.icon}
            </div>
            <div>
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </div>)}
      </div>
      <button className="w-full mt-4 py-2 text-center text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        View All Activity
      </button>
    </div>;
};