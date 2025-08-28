import React, { useState, createContext, useContext } from 'react';
import { mockDeals } from '../Pipeline/mockData';
import { Deal, DealStage, DealPriority } from '../Pipeline/types';
type DealsContextType = {
  deals: Deal[];
  updateDeal: (updatedDeal: Deal) => void;
  addDeal: (newDeal: Deal) => void;
  deleteDeal: (dealId: string) => void;
  moveDealToStage: (dealId: string, newStage: DealStage) => void;
  duplicateDeal: (dealId: string) => void;
  setDealPriority: (dealId: string, priority: DealPriority) => void;
  toggleDealFlag: (dealId: string, flagged: boolean) => void;
  getDealById: (dealId: string) => Deal | undefined;
};
const DealsContext = createContext<DealsContextType | undefined>(undefined);
export const DealsProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const updateDeal = (updatedDeal: Deal) => {
    setDeals(prevDeals => prevDeals.map(deal => deal.id === updatedDeal.id ? updatedDeal : deal));
  };
  const addDeal = (newDeal: Deal) => {
    setDeals(prevDeals => [...prevDeals, newDeal]);
  };
  const deleteDeal = (dealId: string) => {
    setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));
  };
  const moveDealToStage = (dealId: string, newStage: DealStage) => {
    setDeals(prevDeals => prevDeals.map(deal => {
      if (deal.id === dealId) {
        return {
          ...deal,
          stage: newStage,
          stageHistory: [...deal.stageHistory, {
            stage: newStage,
            date: new Date().toISOString(),
            daysInStage: 0
          }],
          lastUpdated: new Date().toISOString()
        };
      }
      return deal;
    }));
  };
  const duplicateDeal = (dealId: string) => {
    const dealToDuplicate = deals.find(deal => deal.id === dealId);
    if (!dealToDuplicate) return;
    // Create a new ID for the duplicated deal
    const newId = `duplicate-${dealId}-${Date.now()}`;
    // Create a duplicate with a new ID and slightly modified title
    const duplicatedDeal: Deal = {
      ...dealToDuplicate,
      id: newId,
      title: `${dealToDuplicate.title} (Copy)`,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    addDeal(duplicatedDeal);
  };
  const setDealPriority = (dealId: string, priority: DealPriority) => {
    setDeals(prevDeals => prevDeals.map(deal => {
      if (deal.id === dealId) {
        return {
          ...deal,
          priority,
          lastUpdated: new Date().toISOString()
        };
      }
      return deal;
    }));
  };
  const toggleDealFlag = (dealId: string, flagged: boolean) => {
    setDeals(prevDeals => prevDeals.map(deal => {
      if (deal.id === dealId) {
        return {
          ...deal,
          flagged,
          lastUpdated: new Date().toISOString()
        };
      }
      return deal;
    }));
  };
  const getDealById = (dealId: string) => {
    return deals.find(deal => deal.id === dealId);
  };
  return <DealsContext.Provider value={{
    deals,
    updateDeal,
    addDeal,
    deleteDeal,
    moveDealToStage,
    duplicateDeal,
    setDealPriority,
    toggleDealFlag,
    getDealById
  }}>
      {children}
    </DealsContext.Provider>;
};
export const useDeals = () => {
  const context = useContext(DealsContext);
  if (context === undefined) {
    throw new Error('useDeals must be used within a DealsProvider');
  }
  return context;
};