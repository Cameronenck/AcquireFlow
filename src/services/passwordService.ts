import { config } from '../config';
import { tokenUtils } from '../utils/tokenUtils';

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
  data?: {
    updatedAt: string;
  };
}

class PasswordService {
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
   * Update user password with old, new, and confirm password
   */
  async updatePassword(passwordData: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    return this.request<UpdatePasswordResponse>('/update-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  /**
   * Change user password (legacy method)
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<UpdatePasswordResponse> {
    return this.request<UpdatePasswordResponse>('/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
  }
}

export const passwordService = new PasswordService();
export default passwordService;
