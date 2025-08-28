import React from 'react';
import { RecentLoginActivity } from './RecentLoginActivity';

export const LoginActivityDemo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Login Activity Demo</h1>
        <p className="text-gray-600">
          This component displays recent login activity with device information, IP addresses, and timestamps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Recent Login Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic View (Last 5)</h2>
          <RecentLoginActivity limit={5} />
        </div>

        {/* Recent Login Activity with Logout Buttons */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">With Logout Buttons (Last 10)</h2>
          <RecentLoginActivity limit={10} showLogoutButton={true} />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Real-time login activity tracking
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Device detection (Browser, OS, Device Type)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            IP address logging
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Smart timestamp formatting (Just now, 5 minutes ago, etc.)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Session management with logout capabilities
          </div>
        </ul>
      </div>
    </div>
  );
};
