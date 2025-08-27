import React, { useEffect, useState } from 'react';
import { Shield, Key, Lock, Smartphone, History, AlertTriangle, Monitor, Clock, MapPin } from 'lucide-react';
import { profileService } from '../../services/profileService';
import { useAuth } from '../Auth/AuthContext';
import { PasswordUpdateForm } from './PasswordUpdateForm';
import { TwoFactorAuthSetup } from './TwoFactorAuthSetup';
import { twoFactorAuthService } from '../../services/twoFactorAuthService';

interface LoginActivity {
  id: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
  ipAddress: string;
  loginAt: string;
  isActive: boolean;
  sessionId: string;
}

export const SecuritySettings = () => {
  const { user } = useAuth();
  const [loginActivities, setLoginActivities] = useState<LoginActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
           const [twoFactorStatus, setTwoFactorStatus] = useState<{
           isEnabled: boolean;
           lastUsedAt?: string;
         } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);

        // Fetch profile data and 2FA status concurrently
        const [profileData, twoFactorData] = await Promise.all([
          profileService.getCompleteProfile(),
          twoFactorAuthService.getStatus(),
        ]);

        if (profileData?.data?.recentLoginActivity) {
          setLoginActivities(profileData.data.recentLoginActivity);
        }

        setTwoFactorStatus(twoFactorData);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone size={16} className="text-gray-500" />;
      case 'tablet':
        return <Monitor size={16} className="text-gray-500" />;
      case 'desktop':
      default:
        return <Monitor size={16} className="text-gray-500" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600' : 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Password Update Form - Only show when button is clicked */}
      <div className={`transition-all duration-300 ease-in-out ${
        showPasswordForm 
          ? 'opacity-100 max-h-screen overflow-visible' 
          : 'opacity-0 max-h-0 overflow-hidden'
      }`}>
        {showPasswordForm && (
          <PasswordUpdateForm onClose={() => setShowPasswordForm(false)} />
        )}
      </div>

      {/* 2FA Setup Form - Only show when button is clicked */}
      <div className={`transition-all duration-300 ease-in-out ${
        show2FASetup 
          ? 'opacity-100 max-h-screen overflow-visible' 
          : 'opacity-0 max-h-0 overflow-hidden'
      }`}>
        {show2FASetup && (
          <TwoFactorAuthSetup 
            onClose={() => setShow2FASetup(false)} 
            onSuccess={() => {
              setShow2FASetup(false);
              // Refresh 2FA status
              twoFactorAuthService.getStatus().then(setTwoFactorStatus);
            }} 
          />
        )}
      </div>
      
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
              <button 
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
              </button>
            </div>
            
            {/* Two-Factor Authentication */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Two-Factor Authentication
              </h3>
              
              {twoFactorStatus?.isEnabled ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Shield size={16} />
                    <span className="text-sm font-medium">2FA is enabled</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last used: {twoFactorStatus.lastUsedAt ? new Date(twoFactorStatus.lastUsedAt).toLocaleDateString() : 'Never'}
                  </div>
                  <button 
                    onClick={() => setShow2FASetup(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Manage 2FA
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Shield size={16} />
                    <span className="text-sm">2FA is not enabled</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                  <button 
                    onClick={() => setShow2FASetup(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Enable 2FA
                  </button>
                </div>
              )}
            </div>
            
            {/* Login History */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Recent Login Activity
              </h3>
              
              {loading ? (
                <div className="animate-pulse">
                  <div className="space-y-3">
                    <div className="h-16 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center text-red-600 p-3 border border-red-200 rounded-lg bg-red-50">
                  <AlertTriangle size={16} className="mr-2" />
                  <span className="text-sm">Failed to load login activity: {error}</span>
                </div>
              ) : loginActivities.length === 0 ? (
                <div className="text-center text-gray-500 p-6 border border-gray-200 rounded-lg">
                  <Clock size={24} className="mx-auto mb-2" />
                  <p className="text-sm">No login activity found</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {loginActivities.map((activity) => (
                    <div key={activity.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(activity.deviceInfo.device)}
                          <div>
                            <p className="text-sm font-medium">
                              {activity.deviceInfo.browser} on {activity.deviceInfo.os}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin size={12} className="mr-1" />
                              IP: {activity.ipAddress}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs ${getStatusColor(activity.isActive)} mb-1`}>
                            {activity.isActive ? 'Active' : 'Inactive'}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(activity.loginAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};