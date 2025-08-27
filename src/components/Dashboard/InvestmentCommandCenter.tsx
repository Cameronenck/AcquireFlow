import React from 'react';
import { Plus, LayoutDashboard } from 'lucide-react';
export const InvestmentCommandCenter = ({
  setActivePage
}) => {
  // Update to use setActivePage for proper navigation
  const navigateToCampaignCreation = () => {
    setActivePage('Campaigns');
  };
  return <div className="mb-2">
      <div className="flex items-center justify-between py-4 px-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-dark flex items-center">
            <LayoutDashboard size={32} className="mr-3 text-primary" />
            Dashboard
          </h1>
          <span className="ml-4 px-3 py-1 text-xs bg-dark text-white rounded-full flex items-center shadow-sm">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Active
          </span>
        </div>
        <div>
          <button onClick={navigateToCampaignCreation} className="flex items-center px-5 py-2.5 bg-dark text-white rounded-xl font-medium shadow-sm 
              hover:shadow-md hover:translate-y-[-2px] active:scale-[0.98] active:shadow-sm 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary
              relative overflow-hidden group" aria-label="Create new campaign">
            {/* Button content with improved animation */}
            <span className="flex items-center relative z-10">
              <Plus size={18} className="mr-2.5 group-hover:rotate-90 transition-transform duration-300" />
              <span>New Campaign</span>
            </span>
            {/* Ripple effect on click */}
            <span className="absolute inset-0 overflow-hidden rounded-xl">
              <span className="ripple-effect"></span>
            </span>
          </button>
        </div>
      </div>
    </div>;
};