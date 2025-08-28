import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart2, Activity } from 'lucide-react';
export const MetricsOverview = () => {
  const metrics = [{
    title: 'Total Revenue',
    value: '$1,245,890',
    change: '+12.5%',
    trend: 'up',
    icon: <DollarSign size={20} />,
    color: 'bg-primary'
  }, {
    title: 'Campaign ROI',
    value: '187%',
    change: '+24.3%',
    trend: 'up',
    icon: <BarChart2 size={20} />,
    color: 'bg-tertiary'
  }, {
    title: 'Response Rate',
    value: '18.7%',
    change: '-2.1%',
    trend: 'down',
    icon: <Activity size={20} />,
    color: 'bg-secondary'
  }, {
    title: 'Total Contacts',
    value: '12,458',
    change: '+8.7%',
    trend: 'up',
    icon: <Users size={20} />,
    color: 'bg-gray-700'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {metric.title}
              </h3>
              <div className="mt-2">
                <span className="text-2xl font-bold text-dark">
                  {metric.value}
                </span>
              </div>
            </div>
            <div className={`${metric.color} p-2 rounded-lg text-white`}>
              {metric.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metric.trend === 'up' ? <TrendingUp size={16} className="text-primary mr-1" /> : <TrendingDown size={16} className="text-secondary mr-1" />}
            <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-primary' : 'text-secondary'}`}>
              {metric.change} vs last period
            </span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${metric.trend === 'up' ? 'bg-primary' : 'bg-secondary'}`} style={{
            width: `${metric.trend === 'up' ? 70 : 40}%`
          }}></div>
            </div>
          </div>
        </div>)}
    </div>;
};