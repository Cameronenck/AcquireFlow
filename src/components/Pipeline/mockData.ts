import { Deal, DealStage, PropertyType } from './types';
// Generate random dates within a range
const randomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};
// Generate a list of mock deals
export const mockDeals: Deal[] = Array.from({
  length: 30
}, (_, i) => {
  // Generate random property type
  const propertyTypes: PropertyType[] = ['SingleFamily', 'MultiFamily', 'Commercial', 'Land', 'Industrial'];
  const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  // Generate random stage
  const stages: DealStage[] = ['Prospecting', 'UnderContract', 'DueDiligence', 'Negotiations', 'Closing'];
  const stage = stages[Math.floor(Math.random() * stages.length)];
  // Generate random financial data
  const purchasePrice = Math.round((200000 + Math.random() * 1800000) / 10000) * 10000;
  const repairCosts = Math.round(purchasePrice * (0.05 + Math.random() * 0.2) / 1000) * 1000;
  const closingCosts = Math.round(purchasePrice * (0.02 + Math.random() * 0.04) / 1000) * 1000;
  const arv = Math.round(purchasePrice * (1.2 + Math.random() * 0.4) / 10000) * 10000;
  const potentialProfit = arv - purchasePrice - repairCosts - closingCosts;
  // Generate random dates
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const createdAt = randomDate(oneYearAgo, now);
  const lastUpdated = randomDate(new Date(createdAt), now);
  // Generate random stage history
  const stageHistory = [];
  const allStages = ['Prospecting', 'UnderContract', 'DueDiligence', 'Negotiations', 'Closing'];
  const stageIndex = allStages.indexOf(stage);
  for (let j = 0; j <= stageIndex; j++) {
    const stageDate = j === 0 ? createdAt : randomDate(new Date(stageHistory[j - 1].date), new Date(lastUpdated));
    stageHistory.push({
      stage: allStages[j] as DealStage,
      date: stageDate,
      daysInStage: Math.floor(Math.random() * 30)
    });
  }
  // Calculate days in current stage
  const daysInCurrentStage = Math.floor((new Date().getTime() - new Date(stageHistory[stageHistory.length - 1].date).getTime()) / (1000 * 60 * 60 * 24));
  // Generate random agent
  const agent = {
    id: `agent-${Math.floor(Math.random() * 10) + 1}`,
    name: `Agent ${Math.floor(Math.random() * 10) + 1}`,
    email: `agent${Math.floor(Math.random() * 10) + 1}@example.com`,
    phone: `(555) ${100 + Math.floor(Math.random() * 900)}-${1000 + Math.floor(Math.random() * 9000)}`,
    company: `Real Estate Co. ${Math.floor(Math.random() * 5) + 1}`,
    photo: `https://source.unsplash.com/random/100x100/?portrait,${i}`
  };
  // Generate random property
  const cities = ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'];
  const cityIndex = Math.floor(Math.random() * cities.length);
  const property = {
    id: `property-${i + 1}`,
    address: `${1000 + i} ${['Main', 'Oak', 'Maple', 'Pine', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
    city: cities[cityIndex],
    state: 'FL',
    zip: `${32000 + Math.floor(Math.random() * 8000)}`,
    type: propertyType,
    beds: Math.floor(2 + Math.random() * 4),
    baths: Math.floor(2 + Math.random() * 3),
    sqft: Math.floor(1000 + Math.random() * 3000),
    yearBuilt: Math.floor(1950 + Math.random() * 70),
    lotSize: Math.round((0.1 + Math.random() * 0.9) * 100) / 100,
    image: `https://source.unsplash.com/random/600x400/?house,${i}`,
    description: 'Beautiful property with great potential for investment.',
    features: ['Garage', 'Pool', 'Renovated Kitchen', 'Central AC'].filter(() => Math.random() > 0.5)
  };
  // Generate random tasks
  const tasks = Array.from({
    length: Math.floor(Math.random() * 5) + 1
  }, (_, j) => ({
    id: `task-${i}-${j}`,
    title: ['Schedule inspection', 'Review contract', 'Contact lender', 'Submit offer', 'Negotiate repairs', 'Conduct final walkthrough', 'Prepare closing documents'][Math.floor(Math.random() * 7)],
    description: 'Task description goes here.',
    dueDate: randomDate(new Date(), new Date(new Date().setDate(new Date().getDate() + 30))),
    completed: Math.random() > 0.7,
    assignedTo: Math.random() > 0.5 ? 'User Name' : undefined
  }));
  // Generate random documents
  const documents = Array.from({
    length: Math.floor(Math.random() * 3) + 1
  }, (_, j) => ({
    id: `doc-${i}-${j}`,
    name: ['Purchase Agreement', 'Inspection Report', 'Property Disclosure', 'Title Report', 'Loan Estimate'][Math.floor(Math.random() * 5)],
    type: ['pdf', 'docx', 'jpg'][Math.floor(Math.random() * 3)],
    url: '#',
    uploadDate: randomDate(new Date(createdAt), now),
    size: Math.floor(100 + Math.random() * 9000)
  }));
  // Generate random communications
  const communications = Array.from({
    length: Math.floor(Math.random() * 5) + 1
  }, (_, j) => ({
    id: `comm-${i}-${j}`,
    type: ['email', 'call', 'meeting', 'note'][Math.floor(Math.random() * 4)] as 'email' | 'call' | 'meeting' | 'note',
    date: randomDate(new Date(createdAt), now),
    content: 'Communication content goes here.',
    sender: Math.random() > 0.5 ? 'You' : agent.name,
    recipient: Math.random() > 0.5 ? agent.name : 'You'
  }));
  // Generate next action
  const nextActions = ['Schedule inspection', 'Review contract', 'Follow up with agent', 'Submit counter offer', 'Complete due diligence', 'Prepare closing documents', 'Final walkthrough'];
  const nextAction = nextActions[Math.floor(Math.random() * nextActions.length)];
  const nextActionDate = randomDate(now, new Date(now.setDate(now.getDate() + 14)));
  return {
    id: `deal-${i + 1}`,
    title: `${property.address} Deal`,
    stage,
    priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High',
    value: purchasePrice,
    potentialProfit,
    property,
    agent,
    financial: {
      purchasePrice,
      closingCosts,
      repairCosts,
      arv,
      monthlyRent: Math.round((purchasePrice * 0.007 + Math.random() * 500) / 50) * 50,
      monthlyCosts: Math.round((purchasePrice * 0.003 + Math.random() * 300) / 50) * 50,
      capRate: Math.round((Math.random() * 4 + 4) * 100) / 100,
      cashOnCash: Math.round((Math.random() * 5 + 8) * 100) / 100,
      roi: Math.round((Math.random() * 10 + 10) * 100) / 100
    },
    createdAt,
    lastUpdated,
    stageHistory,
    tasks,
    documents,
    communications,
    notes: Math.random() > 0.3 ? 'Additional notes about this deal.' : undefined,
    tags: ['Hot Lead', 'Off-Market', 'Motivated Seller', 'Cash Deal', 'Rehab', 'Rental'].filter(() => Math.random() > 0.6),
    daysInCurrentStage,
    nextAction: Math.random() > 0.2 ? nextAction : undefined,
    nextActionDate: Math.random() > 0.2 ? nextActionDate : undefined
  };
});
// Generate pipeline metrics
export const generatePipelineMetrics = (deals: Deal[]) => {
  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const totalProfit = deals.reduce((sum, deal) => sum + deal.potentialProfit, 0);
  const stageMetrics: Record<DealStage, {
    count: number;
    value: number;
    avgDaysInStage: number;
  }> = {
    Prospecting: {
      count: 0,
      value: 0,
      avgDaysInStage: 0
    },
    UnderContract: {
      count: 0,
      value: 0,
      avgDaysInStage: 0
    },
    DueDiligence: {
      count: 0,
      value: 0,
      avgDaysInStage: 0
    },
    Negotiations: {
      count: 0,
      value: 0,
      avgDaysInStage: 0
    },
    Closing: {
      count: 0,
      value: 0,
      avgDaysInStage: 0
    }
  };
  // Calculate metrics for each stage
  deals.forEach(deal => {
    stageMetrics[deal.stage].count += 1;
    stageMetrics[deal.stage].value += deal.value;
    stageMetrics[deal.stage].avgDaysInStage += deal.daysInCurrentStage;
  });
  // Calculate average days in stage
  Object.keys(stageMetrics).forEach(stage => {
    const typedStage = stage as DealStage;
    if (stageMetrics[typedStage].count > 0) {
      stageMetrics[typedStage].avgDaysInStage = Math.round(stageMetrics[typedStage].avgDaysInStage / stageMetrics[typedStage].count);
    }
  });
  // Calculate conversion rates (simplified)
  const prospectingCount = stageMetrics.Prospecting.count;
  const closingCount = stageMetrics.Closing.count;
  const conversionRate = prospectingCount > 0 ? Math.round(closingCount / prospectingCount * 100) : 0;
  // Calculate average deal cycle (simplified)
  const avgDealCycle = Math.round(deals.reduce((sum, deal) => {
    const totalDays = deal.stageHistory.reduce((days, stage) => days + stage.daysInStage, 0);
    return sum + totalDays + deal.daysInCurrentStage;
  }, 0) / Math.max(deals.length, 1));
  return {
    totalDeals,
    totalValue,
    totalProfit,
    conversionRate,
    avgDealCycle,
    stageMetrics
  };
};