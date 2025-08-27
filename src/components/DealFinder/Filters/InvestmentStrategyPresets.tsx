import React from 'react';
import { TrendingUp, Home, Building, Palmtree, Settings } from 'lucide-react';
import { useFilters } from './FilterContext';
export type InvestmentStrategy = 'custom' | 'wholesaling' | 'fixAndFlip' | 'buyAndHold' | 'shortTermRental';
type StrategyOption = {
  id: InvestmentStrategy;
  name: string;
  description: string;
  icon: React.ReactNode;
};
export const InvestmentStrategyPresets: React.FC = () => {
  const {
    investmentStrategy,
    setInvestmentStrategy,
    expandedSections,
    toggleSection
  } = useFilters();
  const strategies: StrategyOption[] = [{
    id: 'wholesaling',
    name: 'Wholesaling',
    description: 'Find deeply discounted properties to assign to other investors',
    icon: <TrendingUp size={20} className="text-primary" />
  }, {
    id: 'fixAndFlip',
    name: 'Fix & Flip',
    description: 'Properties with renovation potential for resale',
    icon: <Home size={20} className="text-primary" />
  }, {
    id: 'buyAndHold',
    name: 'Buy & Hold',
    description: 'Long-term rental properties with steady cash flow',
    icon: <Building size={20} className="text-primary" />
  }, {
    id: 'shortTermRental',
    name: 'Short-Term Rental',
    description: 'Properties ideal for vacation rentals',
    icon: <Palmtree size={20} className="text-primary" />
  }, {
    id: 'custom',
    name: 'Custom Strategy',
    description: 'Create your own custom filter set',
    icon: <Settings size={20} className="text-primary" />
  }];
  const handleStrategyChange = (strategy: InvestmentStrategy) => {
    setInvestmentStrategy(strategy);
    // If selecting a preset strategy, collapse all other sections
    // If selecting custom, expand other sections
    if (strategy !== 'custom') {
      Object.keys(expandedSections).forEach(section => {
        if (section !== 'investmentStrategy' && expandedSections[section]) {
          toggleSection(section);
        }
      });
    }
  };
  return <div className="space-y-3">
      {strategies.map(strategy => <div key={strategy.id} className={`p-3 rounded-lg border cursor-pointer transition-all ${investmentStrategy === strategy.id ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300 bg-white'}`} onClick={() => handleStrategyChange(strategy.id)}>
          <div className="flex items-center">
            <div className={`mr-3 ${investmentStrategy === strategy.id ? 'text-primary' : 'text-gray-400'}`}>
              {strategy.icon}
            </div>
            <div>
              <h4 className="font-medium text-dark">{strategy.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {strategy.description}
              </p>
            </div>
          </div>
        </div>)}
    </div>;
};