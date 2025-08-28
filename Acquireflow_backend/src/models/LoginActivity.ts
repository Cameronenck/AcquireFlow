import mongoose, { Schema, Document } from 'mongoose';

export interface ILoginActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
    userAgent: string;
  };
  ipAddress: string;
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };
  loginAt: Date;
  logoutAt?: Date;
  isActive: boolean;
  sessionId: string;
}

const loginActivitySchema = new Schema<ILoginActivityDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  deviceInfo: {
    browser: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  ipAddress: {
    type: String,
    required: true,
  },
  location: {
    country: String,
    city: String,
    timezone: String,
  },
  loginAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  logoutAt: {
    type: Date,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      delete (ret as any).__v;
      return ret;
    },
  },
});

// Indexes for efficient querying
loginActivitySchema.index({ userId: 1, loginAt: -1 });
loginActivitySchema.index({ userId: 1, isActive: 1 });
loginActivitySchema.index({ sessionId: 1 });

// Static method to get recent login activity for a user
loginActivitySchema.statics['getRecentActivity'] = function(userId: string, limit: number = 10) {
  return this.find({ userId })
    .sort({ loginAt: -1 })
    .limit(limit)
    .select('-__v -userAgent');
};

// Static method to get active sessions for a user
loginActivitySchema.statics['getActiveSessions'] = function(userId: string) {
  return this.find({ userId, isActive: true })
    .sort({ loginAt: -1 });
};

// Instance method to mark session as inactive
loginActivitySchema.methods['logout'] = function() {
  this['isActive'] = false;
  this['logoutAt'] = new Date();
  return this['save']();
};

export const LoginActivity = mongoose.model<ILoginActivityDocument>('LoginActivity', loginActivitySchema);

export default LoginActivity;
