import React, { useEffect, useState, useRef } from 'react';
import { Bell, Settings, HelpCircle, X, Calendar, FileText, MessageSquare, CreditCard, LogOut, User } from 'lucide-react';
import { useProfile } from '../Context/ProfileContext';
import { useAuth } from '../Auth/AuthContext';
export const Header = ({
  setActivePage
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const {
    profileImage
  } = useProfile();
  const {
    logout,
    user
  } = useAuth();
  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Handle logout
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };
  // Sample notifications data
  const notifications = [{
    id: 1,
    title: 'New Deal Alert',
    message: 'A property matching your criteria is now available in Miami.',
    time: '10 minutes ago',
    unread: true,
    icon: <FileText size={16} className="text-primary" />
  }, {
    id: 2,
    title: 'Campaign Performance',
    message: "Your 'Orlando Cash Buyers' campaign has reached 100 responses.",
    time: '2 hours ago',
    unread: true,
    icon: <Bell size={16} className="text-secondary" />
  }, {
    id: 3,
    title: 'Meeting Reminder',
    message: 'Virtual property tour scheduled for tomorrow at 2:00 PM.',
    time: 'Yesterday',
    unread: false,
    icon: <Calendar size={16} className="text-tertiary-dark" />
  }, {
    id: 4,
    title: 'New Message',
    message: 'Sarah Johnson responded to your inquiry about the Main St property.',
    time: '2 days ago',
    unread: false,
    icon: <MessageSquare size={16} className="text-blue-500" />
  }];
  return <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center w-full max-w-xl"></div>
      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationsRef}>
          <button className="p-2 text-gray-500 hover:text-gray-700 relative" onClick={() => {
          setNotificationsOpen(!notificationsOpen);
          setProfileDropdownOpen(false);
        }}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {/* Notifications Dropdown */}
          {notificationsOpen && <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-dark">Notifications</h3>
                <div className="flex space-x-2">
                  <button className="text-xs text-primary hover:underline">
                    Mark all as read
                  </button>
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => setNotificationsOpen(false)}>
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {notification.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-dark">
                            {notification.title}
                          </h4>
                          {notification.unread && <span className="w-2 h-2 bg-primary rounded-full"></span>}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="p-3 text-center border-t border-gray-100">
                <button className="text-sm text-primary hover:underline" onClick={() => {
              setActivePage('Inbox');
              setNotificationsOpen(false);
            }}>
                  View all notifications
                </button>
              </div>
            </div>}
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => setActivePage('Settings')}>
          <Settings size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => setActivePage('Help Center')} aria-label="Help and Support Center">
          <HelpCircle size={20} />
        </button>
        {/* Profile Picture with Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <button className="flex items-center" onClick={() => {
          setProfileDropdownOpen(!profileDropdownOpen);
          setNotificationsOpen(false);
        }}>
            <div className="rounded-full p-0.5 bg-primary/30 ring-1 ring-primary/40">
              {profileImage ? <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white" /> : <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                  <User size={18} className="text-gray-500" />
                </div>}
            </div>
          </button>
          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  {profileImage ? <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white mr-3" /> : <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white mr-3">
                      <User size={20} className="text-gray-500" />
                    </div>}
                  <div>
                    <h3 className="font-medium text-dark">
                      {user?.name || 'John Doe'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'john.doe@acquireflow.ai'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center" onClick={() => {
              setActivePage('Settings');
              setProfileDropdownOpen(false);
            }}>
                  <User size={16} className="mr-3 text-gray-500" />
                  <span>My Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center" onClick={() => {
              setActivePage('Settings');
              setProfileDropdownOpen(false);
            }}>
                  <Settings size={16} className="mr-3 text-gray-500" />
                  <span>Account Settings</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center" onClick={() => {
              window.localStorage.setItem('settingsTab', 'billing');
              setActivePage('Settings');
              setProfileDropdownOpen(false);
            }}>
                  <CreditCard size={16} className="mr-3 text-gray-500" />
                  <span>Billing & Subscription</span>
                </button>
              </div>
              <div className="border-t border-gray-200 py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-500" onClick={handleLogout}>
                  <LogOut size={16} className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>}
        </div>
      </div>
    </header>;
};