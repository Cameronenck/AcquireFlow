import React from 'react';
import { Zap, Brain, TrendingUp, BarChart2, FileText, BarChart, ArrowRight, ExternalLink, Code, Lock, Unlock } from 'lucide-react';
export const PremiumFeatures = () => {
  const features = [{
    title: 'AI-Powered Insights',
    description: 'Automatically identify trends, anomalies, and opportunities in your data',
    icon: <Brain size={24} />,
    color: 'bg-primary',
    locked: false
  }, {
    title: 'Predictive Analytics',
    description: 'Forecast future performance based on historical data and market trends',
    icon: <TrendingUp size={24} />,
    color: 'bg-tertiary',
    locked: false
  }, {
    title: 'Benchmark Comparisons',
    description: 'Compare your performance against industry benchmarks and competitors',
    icon: <BarChart2 size={24} />,
    color: 'bg-secondary',
    locked: true
  }, {
    title: 'White-Label Reports',
    description: 'Create branded reports with your company logo and colors',
    icon: <FileText size={24} />,
    color: 'bg-indigo-500',
    locked: true
  }, {
    title: 'API Integrations',
    description: 'Connect to external data sources and services via API',
    icon: <Code size={24} />,
    color: 'bg-gray-700',
    locked: true
  }];
  const insightExamples = [{
    title: 'Campaign Optimization',
    description: 'Increase ROI by 15% by reallocating budget from underperforming channels',
    type: 'opportunity'
  }, {
    title: 'Lead Quality Analysis',
    description: 'Response rates dropping in Orlando market - consider adjusting targeting criteria',
    type: 'alert'
  }, {
    title: 'Market Trend Detected',
    description: 'Property prices in Miami showing 8% increase over last quarter',
    type: 'trend'
  }];
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-tertiary text-dark mr-3">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-dark">
              Premium Analytics Features
            </h2>
            <p className="text-gray-500 text-sm">
              Advanced analytics capabilities to supercharge your reporting
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-colors">
          Upgrade Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {features.map((feature, index) => <div key={index} className={`border rounded-xl p-4 relative ${feature.locked ? 'opacity-75' : 'hover:shadow-md'} transition-all`}>
            {feature.locked && <div className="absolute top-3 right-3">
                <Lock size={16} className="text-gray-400" />
              </div>}
            <div className={`w-12 h-12 rounded-lg ${feature.color} text-white flex items-center justify-center mb-3`}>
              {feature.icon}
            </div>
            <h3 className="font-medium text-dark">{feature.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
            {!feature.locked && <button className="mt-3 text-primary text-sm font-medium flex items-center hover:underline">
                Learn More <ArrowRight size={14} className="ml-1" />
              </button>}
          </div>)}
      </div>
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Brain size={18} className="text-primary mr-2" />
            AI-Generated Insights
          </h3>
          <button className="text-primary text-sm hover:underline flex items-center">
            View All <ExternalLink size={14} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insightExamples.map((insight, index) => <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <div className={`p-1.5 rounded-full mr-2 ${insight.type === 'opportunity' ? 'bg-primary bg-opacity-10 text-primary' : insight.type === 'alert' ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-tertiary bg-opacity-10 text-tertiary-dark'}`}>
                  {insight.type === 'opportunity' ? <TrendingUp size={14} /> : insight.type === 'alert' ? <Zap size={14} /> : <BarChart size={14} />}
                </div>
                <h4 className="font-medium text-sm">{insight.title}</h4>
              </div>
              <p className="text-gray-600 text-xs">{insight.description}</p>
            </div>)}
        </div>
      </div>
    </div>;
};