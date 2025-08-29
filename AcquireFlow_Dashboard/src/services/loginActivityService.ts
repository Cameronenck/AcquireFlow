import type { LoginActivity } from '../types/loginActivity';

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api/v1';

export const loginActivityService = {
  async getRecentActivity(accessToken: string, limit: number = 10): Promise<LoginActivity[]> {
    try {
      const response = await fetch(`${API_BASE}/v1/auth/login-activity?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch login activity: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch login activity');
      }

      return result.data || [];
    } catch (error) {
      console.error('Error fetching login activity:', error);
      throw error;
    }
  },

  async logoutSession(accessToken: string, sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/v1/auth/logout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to logout session: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to logout session');
      }
    } catch (error) {
      console.error('Error logging out session:', error);
      throw error;
    }
  },
};
