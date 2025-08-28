export interface IProfile {
  _id?: string;
  userId: string;
  profileImage?: string;
  jobTitle?: string;
  preferredLanguage?: string;
  companyInfo?: CompanyInfo;
  localization?: LocalizationPreferences;
  contactPreferences?: ContactPreferences;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyInfo {
  companyName: string;
  businessType: string;
  companyWebsite?: string;
  companySize: string;
  companyAddress: CompanyAddress;
  companyLogo?: string;
}

export interface CompanyAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
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

export interface CreateProfileDto {
  profileImage?: string;
  jobTitle?: string;
  preferredLanguage?: string;
  companyInfo?: Partial<CompanyInfo>;
  localization?: Partial<LocalizationPreferences>;
  contactPreferences?: Partial<ContactPreferences>;
}

export interface UpdateProfileDto {
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
  createdAt?: Date;
  updatedAt?: Date;
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
    lastLoginAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  };
  profile: ProfileResponse | null;
  recentLoginActivity: Array<{
    id: string;
    deviceInfo: {
      browser: string;
      os: string;
      device: string;
    };
    ipAddress: string;
    loginAt: Date;
    isActive: boolean;
    sessionId: string;
  }>;
} 