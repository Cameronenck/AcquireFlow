export interface IUser {
  _id?: string | any;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  company?: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  firebaseUid?: string;
  preferences?: UserPreferences | undefined;
  subscription?: SubscriptionInfo | undefined;
  cardDetails?: CardDetails | undefined;
}

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  MANAGER = 'manager',
  USER = 'user',
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  timezone: string;
  language: string;
  theme: 'light' | 'dark';
}

export interface SubscriptionInfo {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  features: string[];
}

export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  company?: string;
  role?: UserRole;
  password: string;
  firebaseUid?: string;
  cardDetails?: CardDetails;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  company?: string;
  role?: UserRole;
  isActive?: boolean;
  preferences?: Partial<UserPreferences>;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | undefined;
  company?: string | undefined;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  preferences?: UserPreferences | undefined;
  subscription?: SubscriptionInfo | undefined;
  cardDetails?: CardDetails | undefined;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface CardDetails {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
  billingZipCode: string;
}
