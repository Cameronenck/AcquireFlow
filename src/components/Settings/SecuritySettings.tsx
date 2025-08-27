import React from 'react';
import { Shield, Key, Lock, Smartphone, History, AlertTriangle } from 'lucide-react';
export const SecuritySettings = () => {
  return <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Security Settings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account security and authentication preferences
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Password Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Password
              </h3>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Change Password
              </button>
            </div>
            {/* Two-Factor Authentication */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Two-Factor Authentication
              </h3>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                Enable 2FA
              </button>
            </div>
            {/* Login History */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Recent Login Activity
              </h3>
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Chrome on Windows</p>
                      <p className="text-xs text-gray-500">IP: 192.168.1.1</p>
                    </div>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Safari on iPhone</p>
                      <p className="text-xs text-gray-500">IP: 192.168.1.2</p>
                    </div>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};