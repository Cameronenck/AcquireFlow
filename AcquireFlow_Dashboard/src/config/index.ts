// Frontend configuration
export const config = {
  // API configuration
  apiUrl: import.meta.env?.VITE_API_URL || 'http://localhost:3000/api/v1',
  
  // App configuration
  appName: 'AcquireFlow',
  appVersion: '1.0.0',
  
  // Feature flags
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableDebugMode: import.meta.env?.VITE_DEBUG_MODE === 'true'
  }
};
