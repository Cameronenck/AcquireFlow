import React from 'react';
import { MapPin, Briefcase, Home, AlertTriangle, Scale, Hourglass, DollarSign } from 'lucide-react';
import { useFilters } from './FilterContext';
import { MotivationFactor } from './FilterContext';
interface MotivationOption {
  id: MotivationFactor;
  name: string;
  icon: React.ReactNode;
  description: string;
}
export const MotivationFactorsFilter: React.FC = () => {
  const {
    filters,
    updateFilters
  } = useFilters();
  const motivationOptions: MotivationOption[] = [{
    id: 'outOfState',
    name: 'Out-of-State Owners',
    icon: <MapPin size={20} className="text-primary" />,
    description: 'Owners who live far from their property'
  }, {
    id: 'taxLiens',
    name: 'Tax Liens',
    icon: <Briefcase size={20} className="text-primary" />,
    description: 'Properties with unpaid tax obligations'
  }, {
    id: 'divorce',
    name: 'Divorce Situations',
    icon: <Scale size={20} className="text-primary" />,
    description: 'Properties involved in divorce proceedings'
  }, {
    id: 'probate',
    name: 'Probate',
    icon: <Hourglass size={20} className="text-primary" />,
    description: 'Properties in the probate process'
  }, {
    id: 'foreclosure',
    name: 'Foreclosure',
    icon: <AlertTriangle size={20} className="text-primary" />,
    description: 'Properties in pre-foreclosure or foreclosure'
  }, {
    id: 'vacant',
    name: 'Vacant Properties',
    icon: <Home size={20} className="text-primary" />,
    description: 'Unoccupied properties'
  }, {
    id: 'highEquity',
    name: 'High Equity',
    icon: <DollarSign size={20} className="text-primary" />,
    description: 'Properties with significant owner equity'
  }];
  const handleMotivationToggle = (factorId: MotivationFactor) => {
    const currentFactors = filters.motivationFactors || [];
    let newFactors: MotivationFactor[];
    if (currentFactors.includes(factorId)) {
      newFactors = currentFactors.filter(id => id !== factorId);
    } else {
      newFactors = [...currentFactors, factorId];
    }
    updateFilters({
      motivationFactors: newFactors
    });
  };
  return <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-3">
        Select motivation factors that may indicate motivated sellers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {motivationOptions.map(option => <div key={option.id} className={`p-3 rounded-lg border cursor-pointer transition-all ${filters.motivationFactors?.includes(option.id) ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300 bg-white'}`} onClick={() => handleMotivationToggle(option.id)}>
            <div className="flex items-center">
              <div className={`mr-3 ${filters.motivationFactors?.includes(option.id) ? 'text-primary' : 'text-gray-400'}`}>
                {option.icon}
              </div>
              <div>
                <h4 className="font-medium text-dark">{option.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {option.description}
                </p>
              </div>
            </div>
          </div>)}
      </div>
      <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm text-gray-600">
        <p className="font-medium mb-1">Pro Tip:</p>
        <p>
          Combining multiple motivation factors can help you find the most
          motivated sellers who are likely to accept below-market offers.
        </p>
      </div>
    </div>;
};