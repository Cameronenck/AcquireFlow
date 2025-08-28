import React from 'react';
import { Bell, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
export const NotificationPreferences = () => {
  return <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Notification Preferences</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage how and when you receive notifications
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Email Notifications
              </h3>
              <div className="space-y-3">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                  <span className="ml-2 text-sm">
                    <span className="font-medium block">Deal Updates</span>
                    <span className="text-gray-500">
                      Receive updates about your deals and properties
                    </span>
                  </span>
                </label>
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                  <span className="ml-2 text-sm">
                    <span className="font-medium block">Marketing Alerts</span>
                    <span className="text-gray-500">
                      Campaign performance and lead notifications
                    </span>
                  </span>
                </label>
              </div>
            </div>
            {/* Push Notifications */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Push Notifications
              </h3>
              <div className="space-y-3">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                  <span className="ml-2 text-sm">
                    <span className="font-medium block">Instant Alerts</span>
                    <span className="text-gray-500">
                      Real-time notifications for important updates
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};