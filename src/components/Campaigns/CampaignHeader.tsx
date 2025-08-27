import React, { useEffect, useState } from 'react';
import { PlusCircle, Clipboard, BarChart3 } from 'lucide-react';
export const CampaignHeader = ({
  onCreateCampaign,
  onStatusFilter,
  activeFilter
}) => {
  const [campaignCount, setCampaignCount] = useState(32);
  const [metrics, setMetrics] = useState({
    running: 12,
    scheduled: 8,
    completed: 18,
    total: 38
  });
  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase or decrease campaign count for effect
      const change = Math.random() > 0.7 ? 1 : 0;
      setCampaignCount(prev => prev + change);
      // Update metrics occasionally
      if (Math.random() > 0.9) {
        setMetrics(prev => ({
          ...prev,
          running: prev.running + (Math.random() > 0.5 ? 1 : -1),
          scheduled: prev.scheduled + (Math.random() > 0.7 ? 1 : 0),
          completed: prev.completed + (Math.random() > 0.8 ? 1 : 0)
        }));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-dark flex items-center">
              Campaign Management
              <span className="ml-4 text-sm bg-primary bg-opacity-10 text-primary px-3.5 py-1.5 rounded-full font-medium animate-pulse-subtle">
                {campaignCount} Active
              </span>
            </h1>
            <p className="text-gray-500 mt-2">
              Manage and optimize your property acquisition campaigns
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2.5 bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-all" onClick={() => {}}>
              <Clipboard size={18} className="mr-2.5" />
              Templates
            </button>
            <button className="flex items-center px-4 py-2.5 bg-gray-100 text-dark rounded-lg hover:bg-gray-200 transition-all" onClick={() => {}}>
              <BarChart3 size={18} className="mr-2.5" />
              Analytics
            </button>
            <button className="flex items-center px-4 py-2.5 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all shadow-sm" onClick={onCreateCampaign}>
              <PlusCircle size={18} className="mr-2.5" />
              Create Campaign
            </button>
          </div>
        </div>
        {/* Status Overview */}
        <div className="grid grid-cols-4 gap-5 mt-8">
          <div className={`px-5 py-4 rounded-xl border transition-all ${activeFilter === 'all' ? 'border-primary bg-primary bg-opacity-5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => onStatusFilter('all')}>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">All Campaigns</h3>
              <span className="text-lg font-bold iridescent-text">
                {metrics.total}
              </span>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full liquid-progress" style={{
              width: '100%'
            }}></div>
            </div>
          </div>
          <div className={`px-5 py-4 rounded-xl border transition-all ${activeFilter === 'running' ? 'border-primary bg-primary bg-opacity-5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => onStatusFilter('running')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full status-orb mr-2.5"></span>
                <h3 className="font-medium">Running</h3>
              </div>
              <span className="text-lg font-bold text-primary">
                {metrics.running}
              </span>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full liquid-progress" style={{
              width: `${metrics.running / metrics.total * 100}%`
            }}></div>
            </div>
          </div>
          <div className={`px-5 py-4 rounded-xl border transition-all ${activeFilter === 'scheduled' ? 'border-primary bg-primary bg-opacity-5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => onStatusFilter('scheduled')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-tertiary rounded-full status-orb mr-2.5"></span>
                <h3 className="font-medium">Scheduled</h3>
              </div>
              <span className="text-lg font-bold text-tertiary-dark">
                {metrics.scheduled}
              </span>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full liquid-progress" style={{
              width: `${metrics.scheduled / metrics.total * 100}%`
            }}></div>
            </div>
          </div>
          <div className={`px-5 py-4 rounded-xl border transition-all ${activeFilter === 'completed' ? 'border-primary bg-primary bg-opacity-5 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`} onClick={() => onStatusFilter('completed')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2.5"></span>
                <h3 className="font-medium">Completed</h3>
              </div>
              <span className="text-lg font-bold text-gray-600">
                {metrics.completed}
              </span>
            </div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400 rounded-full" style={{
              width: `${metrics.completed / metrics.total * 100}%`
            }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};