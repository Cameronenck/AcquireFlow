import { config } from '../config';
import { tokenUtils } from '../utils/tokenUtils';

export interface CompanyAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface CompanyInfo {
  companyName: string;
  businessType: string;
  companyWebsite?: string;
  companySize: string;
  companyAddress: CompanyAddress;
  companyLogo?: string;
}

export interface LocalizationPreferences {
  timezone: string;
  dateFormat: string;
  currency: string;
}

export interface ContactPreferences {
  marketingCommunications: boolean;
  productUpdates: boolean;
  marketResearch: boolean;
}

export interface ProfileData {
  profileImage?: string;
  jobTitle?: string;
  preferredLanguage?: string;
  companyInfo?: Partial<CompanyInfo>;
  localization?: Partial<LocalizationPreferences>;
  contactPreferences?: Partial<ContactPreferences>;
}

export interface ProfileResponse {
  _id: string;
  userId: string;
  profileImage?: string;
  jobTitle?: string;
  preferredLanguage?: string;
  companyInfo?: CompanyInfo;
  localization?: LocalizationPreferences;
  contactPreferences?: ContactPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompleteProfileResponse {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    company?: string;
    role: string;
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastLoginAt?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  profile: ProfileResponse | null;
}

class ProfileService {
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

    const response = await fetch(`${this.baseUrl}/profile${endpoint}`, {
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
   * Get the complete profile with user information
   */
  async getCompleteProfile(): Promise<CompleteProfileResponse> {
    return this.request<CompleteProfileResponse>('/complete');
  }

  /**
   * Get profile by user ID
   */
  async getProfile(): Promise<ProfileResponse | null> {
    return this.request<ProfileResponse | null>('/');
  }

  /**
   * Create a new profile
   */
  async createProfile(profileData: ProfileData): Promise<ProfileResponse> {
    return this.request<ProfileResponse>('/', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  /**
   * Update existing profile
   */
  async updateProfile(profileData: ProfileData): Promise<ProfileResponse> {
    return this.request<ProfileResponse>('/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  /**
   * Upsert profile (create if doesn't exist, update if it does)
   */
  async upsertProfile(profileData: ProfileData): Promise<ProfileResponse> {
    return this.request<ProfileResponse>('/upsert', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  /**
   * Delete profile
   */
  async deleteProfile(): Promise<void> {
    return this.request<void>('/', {
      method: 'DELETE',
    });
  }

  /**
   * Search profiles by company name
   */
  async searchProfilesByCompany(companyName: string): Promise<ProfileResponse[]> {
    return this.request<ProfileResponse[]>(`/search/company?companyName=${encodeURIComponent(companyName)}`);
  }

  /**
   * Get all profiles with company information
   */
  async getProfilesWithCompanyInfo(): Promise<ProfileResponse[]> {
    return this.request<ProfileResponse[]>('/company-info');
  }
}

export const profileService = new ProfileService();
export default profileService; 