export interface ICampaign {
  _id?: string | any;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  userId: string;
  targetAudience: TargetAudience;
  message: CampaignMessage;
  schedule: CampaignSchedule;
  stats: CampaignStats;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
}

export enum CampaignType {
  SMS = 'sms',
  EMAIL = 'email',
  MULTI_CHANNEL = 'multi_channel',
}

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface TargetAudience {
  filters: AudienceFilter[];
  estimatedSize: number;
  actualSize?: number;
}

export interface AudienceFilter {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | string[];
}

export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  IN = 'in',
  NOT_IN = 'not_in',
  EXISTS = 'exists',
  NOT_EXISTS = 'not_exists',
}

export interface CampaignMessage {
  subject?: string;
  body: string;
  templateId?: string;
  variables?: Record<string, string>;
  attachments?: Attachment[];
}

export interface Attachment {
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface CampaignSchedule {
  startDate: Date;
  endDate?: Date;
  timezone: string;
  frequency: ScheduleFrequency;
  daysOfWeek?: number[];
  timeOfDay?: string;
  maxSendsPerDay?: number;
}

export enum ScheduleFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
}

export interface CampaignStats {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalOpened?: number;
  totalClicked?: number;
  totalReplied?: number;
  totalUnsubscribed?: number;
  deliveryRate: number;
  openRate?: number;
  clickRate?: number;
  replyRate?: number;
  cost: number;
}

export interface CreateCampaignDto {
  name: string;
  description?: string;
  type: CampaignType;
  targetAudience: TargetAudience;
  message: CampaignMessage;
  schedule: CampaignSchedule;
}

export interface UpdateCampaignDto {
  name?: string;
  description?: string;
  status?: CampaignStatus;
  targetAudience?: Partial<TargetAudience>;
  message?: Partial<CampaignMessage>;
  schedule?: Partial<CampaignSchedule>;
}

export interface CampaignResponse {
  _id: string;
  name: string;
  description?: string;
  type: CampaignType;
  status: CampaignStatus;
  userId: string;
  targetAudience: TargetAudience;
  message: CampaignMessage;
  schedule: CampaignSchedule;
  stats: CampaignStats;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
}

export interface CampaignListResponse {
  campaigns: CampaignResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
