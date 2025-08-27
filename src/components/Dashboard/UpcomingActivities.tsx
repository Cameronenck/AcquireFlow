import React from 'react';
export const UpcomingActivities = () => {
  const activities = [{
    title: 'Follow-up: Sarah Johnson',
    time: 'Today, 2:00 PM',
    isToday: true
  }, {
    title: 'Orlando Campaign Launch',
    time: 'Tomorrow, 9:00 AM',
    isToday: false
  }, {
    title: 'Due Diligence: Oak Ave',
    time: 'Friday, 10:00 AM',
    isToday: false
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 h-full transition-colors duration-200">
      <h2 className="text-lg font-bold mb-4">Upcoming Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => <div key={index} className="flex">
            <div className="mr-3 relative">
              <div className={`w-3 h-3 rounded-full ${activity.isToday ? 'bg-[#3AB795]' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
              {index < activities.length - 1 && <div className="absolute top-3 bottom-0 left-1.5 -ml-px w-0.5 bg-gray-200 dark:bg-gray-600 h-full"></div>}
            </div>
            <div className="flex-1 pb-4">
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>)}
      </div>
    </div>;
};