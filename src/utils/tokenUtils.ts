// Token utility functions
export const tokenUtils = {
  // Check if token is expired
  isTokenExpired: (): boolean => {
    const token = localStorage.getItem('acquireflow-access-token');
    if (!token) return true;
    
    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  },

  // Get access token from localStorage
  getAccessToken: (): string | null => {
    return localStorage.getItem('acquireflow-access-token');
  },

  // Get valid token or redirect to login
  getValidToken: (): string | null => {
    const token = localStorage.getItem('acquireflow-access-token');
    if (!token || tokenUtils.isTokenExpired()) {
      // Clear expired tokens and redirect
      localStorage.removeItem('acquireflow-access-token');
      localStorage.removeItem('acquireflow-refresh-token');
      localStorage.removeItem('acquireflow-user-data');
      window.location.href = '/auth';
      return null;
    }
    return token;
  },

  // Clear all auth data
  clearAuthData: (): void => {
    localStorage.removeItem('acquireflow-access-token');
    localStorage.removeItem('acquireflow-refresh-token');
    localStorage.removeItem('acquireflow-user-data');
  }
};
