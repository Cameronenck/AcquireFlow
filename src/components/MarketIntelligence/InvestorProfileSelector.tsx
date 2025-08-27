import React, { useState } from 'react';
import { Users, Home, TrendingUp, Briefcase, DollarSign, Clock, ChevronDown, Check, Filter } from 'lucide-react';
export type InvestorProfile = {
  strategy: 'fix_and_flip' | 'buy_and_hold' | 'wholesale' | 'development' | 'custom';
  experience: 'beginner' | 'intermediate' | 'advanced';
  capitalAvailable: number;
  timeline: 'short' | 'medium' | 'long';
  riskTolerance: 'low' | 'medium' | 'high';
  focusAreas?: string[];
};
interface InvestorProfileSelectorProps {
  onProfileChange: (profile: InvestorProfile) => void;
  currentProfile: InvestorProfile;
}
export const InvestorProfileSelector: React.FC<InvestorProfileSelectorProps> = ({
  onProfileChange,
  currentProfile
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  // Strategy display names
  const strategyNames = {
    fix_and_flip: 'Fix & Flip',
    buy_and_hold: 'Buy & Hold',
    wholesale: 'Wholesale',
    development: 'Development',
    custom: 'Custom Strategy'
  };
  // Experience level display names
  const experienceNames = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  };
  // Timeline display names
  const timelineNames = {
    short: 'Short-term (< 1 year)',
    medium: 'Medium-term (1-5 years)',
    long: 'Long-term (5+ years)'
  };
  // Risk tolerance display names
  const riskToleranceNames = {
    low: 'Conservative',
    medium: 'Moderate',
    high: 'Aggressive'
  };
  // Format capital as currency
  const formatCapital = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(amount);
  };
  const handleStrategyChange = (strategy: InvestorProfile['strategy']) => {
    onProfileChange({
      ...currentProfile,
      strategy
    });
  };
  const handleExperienceChange = (experience: InvestorProfile['experience']) => {
    onProfileChange({
      ...currentProfile,
      experience
    });
  };
  const handleCapitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/,/g, ''));
    if (!isNaN(value)) {
      onProfileChange({
        ...currentProfile,
        capitalAvailable: value
      });
    }
  };
  const handleTimelineChange = (timeline: InvestorProfile['timeline']) => {
    onProfileChange({
      ...currentProfile,
      timeline
    });
  };
  const handleRiskToleranceChange = (riskTolerance: InvestorProfile['riskTolerance']) => {
    onProfileChange({
      ...currentProfile,
      riskTolerance
    });
  };
  return <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="px-4 py-3 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          <Users size={18} className="text-primary mr-2" />
          <h3 className="font-medium">Investor Profile</h3>
        </div>
        <div className="flex items-center">
          <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full mr-2">
            {strategyNames[currentProfile.strategy]}
          </span>
          <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && <div className="px-4 py-3 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Investment Strategy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Strategy
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(strategyNames).map(([value, label]) => <button key={value} className={`px-3 py-1.5 text-xs rounded-lg flex items-center ${currentProfile.strategy === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleStrategyChange(value as InvestorProfile['strategy'])}>
                    {value === 'fix_and_flip' && <Home size={12} className="mr-1.5" />}
                    {value === 'buy_and_hold' && <TrendingUp size={12} className="mr-1.5" />}
                    {value === 'wholesale' && <Briefcase size={12} className="mr-1.5" />}
                    {value === 'development' && <Users size={12} className="mr-1.5" />}
                    {value === 'custom' && <Filter size={12} className="mr-1.5" />}
                    {label}
                  </button>)}
              </div>
            </div>
            {/* Capital Available */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capital Available
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="text" className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg" placeholder="Enter amount" value={currentProfile.capitalAvailable.toLocaleString()} onChange={handleCapitalChange} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-primary text-sm flex items-center" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              <ChevronDown size={14} className={`ml-1 transition-transform ${showAdvanced ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
          {showAdvanced && <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(experienceNames).map(([value, label]) => <button key={value} className={`px-3 py-1.5 text-xs rounded-lg ${currentProfile.experience === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleExperienceChange(value as InvestorProfile['experience'])}>
                      {label}
                    </button>)}
                </div>
              </div>
              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Timeline
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(timelineNames).map(([value, label]) => <button key={value} className={`px-3 py-1.5 text-xs rounded-lg flex items-center ${currentProfile.timeline === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleTimelineChange(value as InvestorProfile['timeline'])}>
                      <Clock size={12} className="mr-1.5" />
                      {label.split(' ')[0]}
                    </button>)}
                </div>
              </div>
              {/* Risk Tolerance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Tolerance
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(riskToleranceNames).map(([value, label]) => <button key={value} className={`px-3 py-1.5 text-xs rounded-lg ${currentProfile.riskTolerance === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => handleRiskToleranceChange(value as InvestorProfile['riskTolerance'])}>
                      {label}
                    </button>)}
                </div>
              </div>
            </div>}
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg flex items-center" onClick={() => setIsOpen(false)}>
              <Check size={16} className="mr-1.5" />
              Apply Profile
            </button>
          </div>
        </div>}
    </div>;
};