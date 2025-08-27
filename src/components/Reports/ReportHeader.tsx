import React from 'react';
import { PlusCircle, Download, Search, Bell, Zap } from 'lucide-react';
type ReportHeaderProps = {
  onCreateReport: () => void;
  onTogglePremium: () => void;
};
export const ReportHeader = ({
  onCreateReport,
  onTogglePremium
}: ReportHeaderProps) => {
  return <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-dark flex items-center">
              Analytics & Reporting
              <span className="ml-3 text-sm bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full font-medium">
                Pro
              </span>
            </h1>
            <p className="text-gray-500 mt-1">
              Create, schedule, and analyze reports to optimize your investment
              strategy
            </p>
          </div>
          <div className="flex space-x-3">
            
            <button className="flex items-center px-4 py-2 bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-all">
              <Download size={18} className="mr-2" />
              Export
            </button>
            <button onClick={onCreateReport} className="flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all shadow-sm">
              <PlusCircle size={18} className="mr-2" />
              Create Report
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="relative w-96">
            <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                3
              </span>
            </div>
            <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
      </div>
    </div>;
};