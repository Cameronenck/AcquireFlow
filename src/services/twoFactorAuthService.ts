import { config } from '../config';
import { tokenUtils } from '../utils/tokenUtils';

export interface TwoFactorAuthSetup {
  success: boolean;
}

export interface TwoFactorAuthStatus {
  isEnabled: boolean;
  lastUsedAt?: string;
}

export interface TwoFactorAuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

class TwoFactorAuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = tokenUtils.getValidToken();
    
    if (!token) {
      throw new Error('No valid access token found. Please log in again.');
    }

    const response = await fetch(`${this.baseUrl}/auth${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (response.status === 401) {
      // Token expired or invalid, redirect to login
      tokenUtils.clearAuthData();
      window.location.href = '/auth';
      throw new Error('Session expired. Please log in again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Setup 2FA for user
   */
  async setup2FA(): Promise<TwoFactorAuthSetup> {
    const response = await this.request<TwoFactorAuthResponse>('/2fa/setup', {
      method: 'POST',
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to setup 2FA');
  }

  /**
   * Verify 2FA setup OTP
   */
  async verifySetupOTP(otpCode: string): Promise<boolean> {
    const response = await this.request<TwoFactorAuthResponse>('/2fa/verify-setup', {
      method: 'POST',
      body: JSON.stringify({ otpCode }),
    });
    
    if (response.success && response.data) {
      return response.data.isEnabled;
    }
    throw new Error(response.message || 'Failed to verify 2FA setup');
  }

  /**
   * Verify 2FA OTP for login
   */
  async verifyLoginOTP(userId: string, otpCode: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/auth/2fa/verify-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, otpCode }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Get 2FA status
   */
  async getStatus(): Promise<TwoFactorAuthStatus | null> {
    const response = await this.request<TwoFactorAuthResponse>('/2fa/status');
    
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  }

  /**
   * Send disable 2FA OTP
   */
  async sendDisableOTP(): Promise<void> {
    const response = await this.request<TwoFactorAuthResponse>('/2fa/send-disable-otp', {
      method: 'POST',
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to send disable OTP');
    }
  }

  /**
   * Disable 2FA
   */
  async disable2FA(otpCode: string): Promise<boolean> {
    const response = await this.request<TwoFactorAuthResponse>('/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ otpCode }),
    });
    
    if (response.success && response.data) {
      return !response.data.isEnabled;
    }
    throw new Error(response.message || 'Failed to disable 2FA');
  }


}

export const twoFactorAuthService = new TwoFactorAuthService();
export default twoFactorAuthService;
