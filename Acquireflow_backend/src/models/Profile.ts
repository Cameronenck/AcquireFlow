import mongoose, { Schema, Document } from 'mongoose';
import { IProfile } from '../types/profile';

export interface IProfileDocument extends Omit<IProfile, '_id'>, Document {
  _id: string;
}

const companyAddressSchema = new Schema({
  addressLine1: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Address line 1 cannot be more than 100 characters'],
  },
  addressLine2: {
    type: String,
    trim: true,
    maxlength: [100, 'Address line 2 cannot be more than 100 characters'],
  },
  city: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, 'City cannot be more than 50 characters'],
  },
  state: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, 'State cannot be more than 50 characters'],
  },
  zipCode: {
    type: String,
    required: false,
    trim: true,
    maxlength: [20, 'Zip code cannot be more than 20 characters'],
  },
  country: {
    type: String,
    trim: true,
    maxlength: [50, 'Country cannot be more than 50 characters'],
    default: 'United States',
  },
});

const companyInfoSchema = new Schema({
  companyName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters'],
  },
  businessType: {
    type: String,
    required: false,
    trim: true,
    maxlength: [100, 'Business type cannot be more than 100 characters'],
  },
  companyWebsite: {
    type: String,
    trim: true,
    maxlength: [200, 'Company website cannot be more than 200 characters'],
    match: [/^https?:\/\/.+/, 'Please enter a valid website URL'],
  },
  companySize: {
    type: String,
    required: false,
    enum: [
      '1-10 employees',
      '11-50 employees',
      '51-200 employees',
      '201-500 employees',
      '500+ employees',
    ],
  },
  companyAddress: {
    type: companyAddressSchema,
    required: false,
  },
  companyLogo: {
    type: String,
    trim: true,
  },
});

const localizationPreferencesSchema = new Schema({
  timezone: {
    type: String,
    required: false,
    default: 'Eastern Time (ET)',
    enum: [
      'Eastern Time (ET)',
      'Central Time (CT)',
      'Mountain Time (MT)',
      'Pacific Time (PT)',
      'Alaska Time (AKT)',
      'Hawaii Time (HST)',
      'UTC',
    ],
  },
  dateFormat: {
    type: String,
    required: false,
    default: 'MM/DD/YYYY',
    enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
  },
  currency: {
    type: String,
    required: false,
    default: 'US Dollar ($)',
    enum: [
      'US Dollar ($)',
      'Euro (€)',
      'British Pound (£)',
      'Canadian Dollar (C$)',
      'Australian Dollar (A$)',
    ],
  },
});

const contactPreferencesSchema = new Schema({
  marketingCommunications: {
    type: Boolean,
    default: true,
  },
  productUpdates: {
    type: Boolean,
    default: true,
  },
  marketResearch: {
    type: Boolean,
    default: false,
  },
});

const profileSchema = new Schema<IProfileDocument>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters'],
  },
  preferredLanguage: {
    type: String,
    default: 'English (US)',
    enum: [
      'English (US)',
      'English (UK)',
      'Spanish',
      'French',
      'German',
      'Chinese',
      'Japanese',
    ],
  },
  companyInfo: {
    type: companyInfoSchema,
  },
  localization: {
    type: localizationPreferencesSchema,
    default: {},
  },
  contactPreferences: {
    type: contactPreferencesSchema,
    default: {},
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      delete (ret as any).__v;
      return ret;
    },
  },
  toObject: {
    transform: (_doc, ret) => {
      delete (ret as any).__v;
      return ret;
    },
  },
});

// Indexes
profileSchema.index({ userId: 1 });
profileSchema.index({ 'companyInfo.companyName': 1 });
profileSchema.index({ createdAt: -1 });

// Static methods
profileSchema.statics['findByUserId'] = function(userId: string) {
  return this.findOne({ userId });
};

profileSchema.statics['findWithCompanyInfo'] = function() {
  return this.find().populate('company');
};

export const Profile = mongoose.model<IProfileDocument>('Profile', profileSchema);

export default Profile; 