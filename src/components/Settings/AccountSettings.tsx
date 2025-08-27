import React, { useEffect, useState } from 'react';
import { AccountInformation } from './AccountInformation';
import { SecuritySettings } from './SecuritySettings';
import { NotificationPreferences } from './NotificationPreferences';
import { BillingSubscription } from './BillingSubscription';
import { IntegrationManagement } from './IntegrationManagement';
import { TeamPermissions } from './TeamPermissions';
export const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  // Check for the billing tab parameter in localStorage when component mounts
  useEffect(() => {
    const billingTabRequested = window.localStorage.getItem('settingsTab');
    if (billingTabRequested === 'billing') {
      setActiveTab('billing');
      // Clear the localStorage value after using it
      window.localStorage.removeItem('settingsTab');
    }
  }, []);
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <AccountInformation />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationPreferences />;
      case 'billing':
        return <BillingSubscription />;
      case 'integrations':
        return <IntegrationManagement />;
      case 'team':
        return <TeamPermissions />;
      default:
        return <AccountInformation />;
    }
  };
  return <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-2xl font-bold text-dark mb-6">Account Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              <button className={`text-left px-4 py-3 border-l-4 ${activeTab === 'profile' ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setActiveTab('profile')}>
                Profile Information
              </button>
              <button className={`text-left px-4 py-3 border-l-4 ${activeTab === 'security' ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setActiveTab('security')}>
                Security & Login
              </button>
              <button className={`text-left px-4 py-3 border-l-4 ${activeTab === 'notifications' ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setActiveTab('notifications')}>
                Notification Preferences
              </button>
              <button className={`text-left px-4 py-3 border-l-4 ${activeTab === 'billing' ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setActiveTab('billing')}>
                Billing & Subscription
              </button>
              <button className={`text-left px-4 py-3 border-l-4 ${activeTab === 'integrations' ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setActiveTab('integrations')}>
                Integrations
              </button>
              <button className={`text-left px-4 py-3 border-l-4 ${activeTab === 'team' ? 'border-primary bg-primary bg-opacity-5 text-primary font-medium' : 'border-transparent hover:bg-gray-50'}`} onClick={() => setActiveTab('team')}>
                Team Management
              </button>
            </nav>
          </div>
        </div>
        <div className="md:col-span-3">{renderTabContent()}</div>
      </div>
    </div>;
};