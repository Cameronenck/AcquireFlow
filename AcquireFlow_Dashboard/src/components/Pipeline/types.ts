export type DealStage = 'Prospecting' | 'UnderContract' | 'DueDiligence' | 'Negotiations' | 'Closing';
export type DealPriority = 'Low' | 'Medium' | 'High';
export type PropertyType = 'SingleFamily' | 'MultiFamily' | 'Commercial' | 'Land' | 'Industrial';
export type StageHistory = {
  stage: DealStage;
  date: string;
  daysInStage: number;
};
export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  assignedTo?: string;
};
export type Document = {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
  size: number;
};
export type Communication = {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  date: string;
  content: string;
  sender: string;
  recipient?: string;
};
export type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  photo?: string;
};
export type Property = {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize?: number;
  image: string;
  description?: string;
  features?: string[];
};
export type Financial = {
  purchasePrice: number;
  closingCosts: number;
  repairCosts: number;
  arv: number; // After Repair Value
  monthlyRent?: number;
  monthlyCosts?: number;
  capRate?: number;
  cashOnCash?: number;
  roi?: number;
};
export type Deal = {
  id: string;
  title: string;
  stage: DealStage;
  priority: DealPriority;
  value: number;
  potentialProfit: number;
  property: Property;
  agent: Agent;
  financial: Financial;
  createdAt: string;
  lastUpdated: string;
  stageHistory: StageHistory[];
  tasks: Task[];
  documents: Document[];
  communications: Communication[];
  notes?: string;
  tags?: string[];
  daysInCurrentStage: number;
  nextAction?: string;
  nextActionDate?: string;
  flagged?: boolean; // Added flagged property
};
export type Filter = {
  search: string;
  propertyType: PropertyType[];
  minValue: number;
  maxValue: number;
  priority: DealPriority[];
  agents: string[];
};
export type StageMetrics = {
  count: number;
  value: number;
  avgDaysInStage: number;
};
export type PipelineMetrics = {
  totalDeals: number;
  totalValue: number;
  totalProfit: number;
  conversionRate: number;
  avgDealCycle: number;
  stageMetrics: Record<DealStage, StageMetrics>;
};