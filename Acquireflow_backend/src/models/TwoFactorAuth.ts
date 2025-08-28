import mongoose, { Document, Schema } from 'mongoose';

export interface ITwoFactorAuth extends Document {
  userId: mongoose.Types.ObjectId;
  isEnabled: boolean;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOTPCode extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: 'login' | 'setup' | 'disable';
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

const TwoFactorAuthSchema = new Schema<ITwoFactorAuth>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
  lastUsedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const OTPCodeSchema = new Schema<IOTPCode>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code: {
    type: String,
    required: true,
    length: 6,
  },
  type: {
    type: String,
    enum: ['login', 'setup', 'disable'],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, // Auto-expire documents
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for faster queries
OTPCodeSchema.index({ userId: 1, type: 1, isUsed: 1 });
OTPCodeSchema.index({ code: 1, type: 1, isUsed: 1 });

export const TwoFactorAuth = mongoose.model<ITwoFactorAuth>('TwoFactorAuth', TwoFactorAuthSchema);
export const OTPCode = mongoose.model<IOTPCode>('OTPCode', OTPCodeSchema);
