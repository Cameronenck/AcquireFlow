import React, { useState, createContext, useContext } from 'react';
export interface FilterState {
  locations: string[];
  propertyTypes: string[];
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  motivationFactors: string[];
  minCashFlow?: number;
  minCapRate?: number;
  minROI?: number;
  maxDaysOnMarket?: number;
  minDealScore?: number;
  investmentStrategy?: 'wholesaling' | 'fixAndFlip' | 'buyAndHold' | 'shortTermRental' | 'custom';
}
interface FilterContextType {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}
const defaultFilters: FilterState = {
  locations: [],
  propertyTypes: [],
  motivationFactors: [],
  investmentStrategy: 'buyAndHold'
};
const FilterContext = createContext<FilterContextType | undefined>(undefined);
interface FilterProviderProps {
  children: ReactNode;
  onFiltersApplied: (filters: FilterState) => void;
}
export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  onFiltersApplied
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };
  const resetFilters = () => {
    setFilters(defaultFilters);
  };
  const applyFilters = () => {
    onFiltersApplied(filters);
  };
  return <FilterContext.Provider value={{
    filters,
    updateFilters,
    resetFilters,
    applyFilters
  }}>
      {children}
    </FilterContext.Provider>;
};
export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};