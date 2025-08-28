import mongoose, { Schema, Document } from 'mongoose';
import { ICampaign, CampaignType, CampaignStatus, ScheduleFrequency } from '../types/campaign';

export interface ICampaignDocument extends Document {
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  userId: string;
  targetAudience: any;
  message: any;
  schedule: any;
  stats: any;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  updateStats(stats: any): Promise<void>;
  isActive(): boolean;
  canStart(): boolean;
  canPause(): boolean;
  canComplete(): boolean;
}

const audienceFilterSchema = new Schema({
  field: {
    type: String,
    required: true,
    trim: true,
  },
  operator: {
    type: String,
    enum: ['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than', 'in', 'not_in', 'exists', 'not_exists'],
    required: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, { _id: false });

const targetAudienceSchema = new Schema({
  filters: [audienceFilterSchema],
  estimatedSize: {
    type: Number,
    required: true,
    min: [1, 'Estimated audience size must be at least 1'],
  },
  actualSize: {
    type: Number,
    min: [0, 'Actual audience size cannot be negative'],
  },
}, { _id: false });

const attachmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: Number,
    required: true,
    min: [0, 'File size cannot be negative'],
  },
}, { _id: false });

const campaignMessageSchema = new Schema({
  subject: {
    type: String,
    trim: true,
    maxlength: [200, 'Subject cannot be more than 200 characters'],
  },
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: [10000, 'Message body cannot be more than 10,000 characters'],
  },
  templateId: {
    type: String,
    trim: true,
  },
  variables: {
    type: Map,
    of: String,
  },
  attachments: [attachmentSchema],
}, { _id: false });

const campaignScheduleSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value: Date) {
        return value > new Date();
      },
      message: 'Start date must be in the future',
    },
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(this: any, value: Date) {
        return !value || value > this.startDate;
      },
      message: 'End date must be after start date',
    },
  },
  timezone: {
    type: String,
    required: true,
    default: 'UTC',
  },
  frequency: {
    type: String,
    enum: Object.values(ScheduleFrequency),
    required: true,
  },
  daysOfWeek: [{
    type: Number,
    min: [0, 'Day of week must be between 0 and 6'],
    max: [6, 'Day of week must be between 0 and 6'],
  }],
  timeOfDay: {
    type: String,
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'],
  },
  maxSendsPerDay: {
    type: Number,
    min: [1, 'Max sends per day must be at least 1'],
  },
}, { _id: false });

const campaignStatsSchema = new Schema({
  totalSent: {
    type: Number,
    default: 0,
    min: [0, 'Total sent cannot be negative'],
  },
  totalDelivered: {
    type: Number,
    default: 0,
    min: [0, 'Total delivered cannot be negative'],
  },
  totalFailed: {
    type: Number,
    default: 0,
    min: [0, 'Total failed cannot be negative'],
  },
  totalOpened: {
    type: Number,
    default: 0,
    min: [0, 'Total opened cannot be negative'],
  },
  totalClicked: {
    type: Number,
    default: 0,
    min: [0, 'Total clicked cannot be negative'],
  },
  totalReplied: {
    type: Number,
    default: 0,
    min: [0, 'Total replied cannot be negative'],
  },
  totalUnsubscribed: {
    type: Number,
    default: 0,
    min: [0, 'Total unsubscribed cannot be negative'],
  },
  deliveryRate: {
    type: Number,
    default: 0,
    min: [0, 'Delivery rate cannot be negative'],
    max: [100, 'Delivery rate cannot exceed 100'],
  },
  openRate: {
    type: Number,
    default: 0,
    min: [0, 'Open rate cannot be negative'],
    max: [100, 'Open rate cannot exceed 100'],
  },
  clickRate: {
    type: Number,
    default: 0,
    min: [0, 'Click rate cannot be negative'],
    max: [100, 'Click rate cannot exceed 100'],
  },
  replyRate: {
    type: Number,
    default: 0,
    min: [0, 'Reply rate cannot be negative'],
    max: [100, 'Reply rate cannot exceed 100'],
  },
  cost: {
    type: Number,
    default: 0,
    min: [0, 'Cost cannot be negative'],
  },
}, { _id: false });

const campaignSchema = new Schema<ICampaignDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Campaign name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  type: {
    type: String,
    enum: Object.values(CampaignType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(CampaignStatus),
    default: CampaignStatus.DRAFT,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: targetAudienceSchema,
    required: true,
  },
  message: {
    type: campaignMessageSchema,
    required: true,
  },
  schedule: {
    type: campaignScheduleSchema,
    required: true,
  },
  stats: {
    type: campaignStatsSchema,
    default: {},
  },
  startedAt: {
    type: Date,
  },
  endedAt: {
    type: Date,
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
campaignSchema.index({ userId: 1 });
campaignSchema.index({ status: 1 });
campaignSchema.index({ type: 1 });
campaignSchema.index({ 'schedule.startDate': 1 });
campaignSchema.index({ createdAt: -1 });
campaignSchema.index({ userId: 1, status: 1 });

// Virtual for campaign duration
campaignSchema.virtual('duration').get(function() {
  if (this['startedAt'] && this['endedAt']) {
    return this['endedAt'].getTime() - this['startedAt'].getTime();
  }
  return null;
});

// Virtual for is overdue
campaignSchema.virtual('isOverdue').get(function() {
  if (this['schedule']?.endDate && this['status'] === CampaignStatus.ACTIVE) {
    return new Date() > this['schedule'].endDate;
  }
  return false;
});

// Pre-save middleware to validate schedule
campaignSchema.pre('save', function(next) {
  try {
    if (this.schedule?.frequency === ScheduleFrequency.WEEKLY && (!this.schedule?.daysOfWeek || this.schedule.daysOfWeek.length === 0)) {
      return next(new Error('Weekly campaigns must specify days of week'));
    }
    
    if (this.schedule?.frequency === ScheduleFrequency.DAILY && !this.schedule?.timeOfDay) {
      return next(new Error('Daily campaigns must specify time of day'));
    }
    
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to update stats
campaignSchema.methods['updateStats'] = async function(stats: Partial<ICampaign['stats']>): Promise<void> {
  Object.assign(this['stats'], stats);
  
  // Recalculate rates
  if (this['stats'].totalSent > 0) {
    this['stats'].deliveryRate = (this['stats'].totalDelivered / this['stats'].totalSent) * 100;
    
    if (this['stats'].totalOpened !== undefined) {
      this['stats'].openRate = (this['stats'].totalOpened / this['stats'].totalDelivered) * 100;
    }
    
    if (this['stats'].totalClicked !== undefined) {
      this['stats'].clickRate = (this['stats'].totalClicked / this['stats'].totalDelivered) * 100;
    }
    
    if (this['stats'].totalReplied !== undefined) {
      this['stats'].replyRate = (this['stats'].totalReplied / this['stats'].totalDelivered) * 100;
    }
  }
  
  await this['save']();
};

// Instance method to check if campaign is active
campaignSchema.methods['isActive'] = function(): boolean {
  return this['status'] === CampaignStatus.ACTIVE;
};

// Instance method to check if campaign can start
campaignSchema.methods['canStart'] = function(): boolean {
  return this['status'] === CampaignStatus.DRAFT || this['status'] === CampaignStatus.SCHEDULED;
};

// Instance method to check if campaign can pause
campaignSchema.methods['canPause'] = function(): boolean {
  return this['status'] === CampaignStatus.ACTIVE;
};

// Instance method to check if campaign can complete
campaignSchema.methods['canComplete'] = function(): boolean {
  return this['status'] === CampaignStatus.ACTIVE || this['status'] === CampaignStatus.PAUSED;
};

// Static method to find active campaigns
campaignSchema.statics['findActive'] = function() {
  return this.find({ status: CampaignStatus.ACTIVE });
};

// Static method to find campaigns by user
campaignSchema.statics['findByUser'] = function(userId: string) {
  return this.find({ userId });
};

// Static method to find campaigns by status
campaignSchema.statics['findByStatus'] = function(status: CampaignStatus) {
  return this.find({ status });
};

// Static method to find campaigns by type
campaignSchema.statics['findByType'] = function(type: CampaignType) {
  return this.find({ type });
};

export const Campaign = mongoose.model<ICampaignDocument>('Campaign', campaignSchema);

export default Campaign;
