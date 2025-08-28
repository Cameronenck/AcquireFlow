import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, Tablet, Clock, MapPin, AlertTriangle, LogOut } from 'lucide-react';
import { loginActivityService } from '../../services/loginActivityService';
import { LoginActivity } from '../../types/loginActivity';
import { useAuth } from './AuthContext';

interface RecentLoginActivityProps {
  limit?: number;
  showLogoutButton?: boolean;
}

export const RecentLoginActivity: React.FC<RecentLoginActivityProps> = ({ 
  limit = 10, 
  showLogoutButton = false 
}) => {
  const [activities, setActivities] = useState<LoginActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLoginActivity = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get access token from localStorage
        const accessToken = localStorage.getItem('acquireflow-access-token');
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const data = await loginActivityService.getRecentActivity(accessToken, limit);
        setActivities(data);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to fetch login activity:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchLoginActivity();
    }
  }, [user, limit]);

  const handleLogoutSession = async (sessionId: string) => {
    try {
      const accessToken = localStorage.getItem('acquireflow-access-token');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      await loginActivityService.logoutSession(accessToken, sessionId);
      
      // Remove the logged out session from the list
      setActivities(prev => prev.filter(activity => activity.sessionId !== sessionId));
    } catch (err) {
      console.error('Failed to logout session:', err);
      // You could show a toast notification here
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone size={16} className="text-gray-500" />;
      case 'tablet':
        return <Tablet size={16} className="text-gray-500" />;
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center text-red-600">
          <AlertTriangle size={16} className="mr-2" />
          <span className="text-sm">Failed to load login activity: {error}</span>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="text-center text-gray-500">
          <Clock size={24} className="mx-auto mb-2" />
          <p className="text-sm">No login activity found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Login Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getDeviceIcon(activity.deviceInfo.device)}
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    {activity.deviceInfo.browser} on {activity.deviceInfo.os}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin size={12} className="mr-1" />
                    IP: {activity.ipAddress}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className={`text-xs ${getStatusColor(activity.isActive)}`}>
                  {activity.isActive ? 'Active' : 'Inactive'}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTimeAgo(activity.loginAt)}
                </div>
              </div>
              
              {showLogoutButton && activity.isActive && (
                <button
                  onClick={() => handleLogoutSession(activity.sessionId)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout this session"
                >
                  <LogOut size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {activities.length >= limit && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:text-primary-dark">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};
