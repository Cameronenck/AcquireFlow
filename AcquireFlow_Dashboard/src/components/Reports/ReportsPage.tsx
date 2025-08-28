import React, { useState } from 'react';
import { BarChart, PieChart, LineChart, FileText, Clock, Download, Calendar, Settings, Star, Zap, Filter, ChevronRight, Users, DollarSign, TrendingUp, MapPin, PlusCircle } from 'lucide-react';
import { MetricsOverview } from './MetricsOverview';
import { ReportCategories } from './ReportCategories';
import { ReportBuilder } from './ReportBuilder';
import { ScheduledReports } from './ScheduledReports';
import { PremiumFeatures } from './PremiumFeatures';
import { PopularReports } from './PopularReports';
import { ReportHeader } from './ReportHeader';
export const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPremium, setShowPremium] = useState(false);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return <div className="flex flex-col h-full bg-gray-50">
      <ReportHeader onCreateReport={() => setActiveTab('builder')} onTogglePremium={() => setShowPremium(!showPremium)} />
      <div className="flex-1 px-6 pb-6 overflow-auto">
        <div className="flex space-x-4 mt-4 mb-6">
          <button onClick={() => handleTabChange('dashboard')} className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <BarChart size={16} className="mr-2" />
            Dashboard
          </button>
          <button onClick={() => handleTabChange('reports')} className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${activeTab === 'reports' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <FileText size={16} className="mr-2" />
            Reports
          </button>
          <button onClick={() => handleTabChange('builder')} className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${activeTab === 'builder' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <Settings size={16} className="mr-2" />
            Report Builder
          </button>
          <button onClick={() => handleTabChange('scheduled')} className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${activeTab === 'scheduled' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
            <Clock size={16} className="mr-2" />
            Scheduled
          </button>
        </div>
        {activeTab === 'dashboard' && <div className="space-y-6">
            <MetricsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PopularReports />
              </div>
              <div>
                <ScheduledReports preview={true} />
              </div>
            </div>
            <ReportCategories />
            {showPremium && <PremiumFeatures />}
          </div>}
        {activeTab === 'reports' && <ReportCategories fullView={true} />}
        {activeTab === 'builder' && <ReportBuilder />}
        {activeTab === 'scheduled' && <ScheduledReports />}
      </div>
    </div>;
};