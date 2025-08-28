import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole, SubscriptionPlan, SubscriptionStatus, UserPreferences, SubscriptionInfo } from '../types/user';
import { config } from '../config/env';

export interface IUserDocument extends Document {
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
  createdAt: Date;
  updatedAt: Date;
  firebaseUid?: string;
  preferences?: UserPreferences;
  subscription?: SubscriptionInfo;
  cardDetails?: {
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvv: string;
    billingZipCode: string;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
  hashPassword(): Promise<void>;
  hashCardDetails(): Promise<void>;
  updateLastLogin(): Promise<IUserDocument>;
  verifyEmail(): Promise<IUserDocument>;
  verifyPhone(): Promise<IUserDocument>;
  deactivate(): Promise<IUserDocument>;
  activate(): Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters'],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters'],
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'],
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters'],
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  lastLoginAt: {
    type: Date,
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true,
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    timezone: { type: String, default: 'UTC' },
    language: { type: String, default: 'en' },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  },
  subscription: {
    plan: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      default: SubscriptionPlan.FREE,
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.INACTIVE,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    features: [{ type: String }],
  },
  cardDetails: {
    cardNumber: { type: String, required: false },
    nameOnCard: { type: String, required: false },
    expiryDate: { type: String, required: false },
    cvv: { type: String, required: false },
    billingZipCode: { type: String, required: false },
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      delete (ret as any).__v;
      delete (ret as any).cardDetails; // Don't expose card details in JSON
      return ret;
    },
  },
  toObject: {
    transform: (_doc, ret) => {
      delete (ret as any).__v;
      delete (ret as any).cardDetails; // Don't expose card details in objects
      return ret;
    },
  },
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this['firstName']} ${this['lastName']}`;
});

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this['company'] ? `${this['firstName']} ${this['lastName']} (${this.company})` : `${this['firstName']} ${this['lastName']}`;
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ firebaseUid: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password and card details if modified
userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      await this['hashPassword']();
    }
    
    if (this.isModified('cardDetails')) {
      await this['hashCardDetails']();
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Hash password method
userSchema.methods['hashPassword'] = async function(): Promise<void> {
  if (this['password']) {
    this['password'] = await bcrypt.hash(this['password'], config.security.bcryptRounds);
  }
};

// Compare password method
userSchema.methods['comparePassword'] = async function(candidatePassword: string): Promise<boolean> {
  if (!this['password']) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this['password']);
};

// Hash card details method
userSchema.methods['hashCardDetails'] = async function(): Promise<void> {
  if (this['cardDetails']) {
    const cardDetails = this['cardDetails'];
    
    // Hash sensitive card information
    if (cardDetails.cardNumber) {
      cardDetails.cardNumber = await bcrypt.hash(cardDetails.cardNumber, config.security.bcryptRounds);
    }
    if (cardDetails.cvv) {
      cardDetails.cvv = await bcrypt.hash(cardDetails.cvv, config.security.bcryptRounds);
    }
    if (cardDetails.billingZipCode) {
      cardDetails.billingZipCode = await bcrypt.hash(cardDetails.billingZipCode, config.security.bcryptRounds);
    }
    
    // Encrypt other card details
    if (cardDetails.nameOnCard) {
      cardDetails.nameOnCard = await bcrypt.hash(cardDetails.nameOnCard, config.security.bcryptRounds);
    }
    if (cardDetails.expiryDate) {
      cardDetails.expiryDate = await bcrypt.hash(cardDetails.expiryDate, config.security.bcryptRounds);
    }
  }
};

// Static method to find by email
userSchema.statics['findByEmail'] = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active users
userSchema.statics['findActive'] = function() {
  return this.find({ isActive: true });
};

// Static method to find by role
userSchema.statics['findByRole'] = function(role: UserRole) {
  return this.find({ role, isActive: true });
};

// Instance method to update last login
userSchema.methods['updateLastLogin'] = function() {
  this['lastLoginAt'] = new Date();
  return this['save']();
};

// Instance method to verify email
userSchema.methods['verifyEmail'] = function() {
  this['isEmailVerified'] = true;
  return this['save']();
};

// Instance method to verify phone
userSchema.methods['verifyPhone'] = function() {
  this['isPhoneVerified'] = true;
  return this['save']();
};

// Instance method to deactivate
userSchema.methods['deactivate'] = function() {
  this['isActive'] = false;
  return this['save']();
};

// Instance method to activate
userSchema.methods['activate'] = function() {
  this['isActive'] = true;
  return this['save']();
};

export const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
