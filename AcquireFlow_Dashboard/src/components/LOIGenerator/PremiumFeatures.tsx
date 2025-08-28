import React from 'react';
import { Zap, TrendingUp, DollarSign, BarChart2, CheckSquare, ArrowRight, Lock, Star, RefreshCw, FileText, CheckCircle, BarChart, AlertTriangle, Award } from 'lucide-react';
export const PremiumFeatures = () => {
  const premiumFeatures = [{
    title: 'AI-Powered Offer Optimization',
    description: 'Automatically determine optimal offer amounts based on market data and property characteristics',
    icon: <Zap size={24} />,
    color: 'bg-primary',
    locked: false
  }, {
    title: 'Market-Based Pricing Suggestions',
    description: 'Get real-time pricing suggestions based on comparable properties and market trends',
    icon: <DollarSign size={24} />,
    color: 'bg-tertiary',
    locked: false
  }, {
    title: 'Success Rate Tracking',
    description: 'Track and analyze LOI success rates by template, property type, and location',
    icon: <BarChart2 size={24} />,
    color: 'bg-secondary',
    locked: false
  }, {
    title: 'A/B Testing Capabilities',
    description: 'Test different LOI templates and offers to optimize your acceptance rates',
    icon: <RefreshCw size={24} />,
    color: 'bg-indigo-500',
    locked: true
  }, {
    title: 'Campaign Integration',
    description: 'Seamlessly integrate LOIs with your marketing campaigns for streamlined workflow',
    icon: <CheckSquare size={24} />,
    color: 'bg-gray-700',
    locked: true
  }];
  const insightExamples = [{
    title: 'Offer Optimization',
    description: 'Based on recent transactions, we recommend offering 92% of asking price for properties in Miami',
    type: 'suggestion',
    metric: '+8.3%',
    metricLabel: 'acceptance rate'
  }, {
    title: 'Template Performance',
    description: "Your 'Aggressive Cash Offer' template is underperforming compared to 'Standard Acquisition LOI'",
    type: 'alert',
    metric: '-4.7%',
    metricLabel: 'success rate'
  }, {
    title: 'Market Trend Detected',
    description: 'Commercial properties in Orlando are accepting offers at 88% of asking price on average',
    type: 'trend',
    metric: '88%',
    metricLabel: 'avg. accepted offer'
  }];
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-tertiary text-dark mr-3">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-dark">
              Premium LOI Features
            </h2>
            <p className="text-gray-500 text-sm">
              Advanced capabilities to optimize your offers and increase
              acceptance rates
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-colors">
          Upgrade Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {premiumFeatures.map((feature, index) => <div key={index} className={`border rounded-xl p-4 relative ${feature.locked ? 'opacity-75' : 'hover:shadow-md'} transition-all`}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <Zap size={18} className="text-tertiary-dark mr-2" />
            AI-Generated Insights
          </h3>
          <div className="space-y-4">
            {insightExamples.map((insight, index) => <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className={`p-1.5 rounded-full mr-2 ${insight.type === 'suggestion' ? 'bg-primary bg-opacity-10 text-primary' : insight.type === 'alert' ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-tertiary bg-opacity-10 text-tertiary-dark'}`}>
                      {insight.type === 'suggestion' ? <CheckCircle size={14} /> : insight.type === 'alert' ? <AlertTriangle size={14} /> : <TrendingUp size={14} />}
                    </div>
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${insight.metric.startsWith('+') ? 'bg-primary bg-opacity-10 text-primary' : insight.metric.startsWith('-') ? 'bg-secondary bg-opacity-10 text-secondary' : 'bg-tertiary bg-opacity-10 text-tertiary-dark'}`}>
                    {insight.metric} {insight.metricLabel}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>)}
          </div>
          <button className="mt-4 text-primary text-sm hover:underline flex items-center">
            View All Insights <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <Award size={18} className="text-tertiary-dark mr-2" />
            Template Performance Analytics
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-sm mb-3">
                Top Performing Templates
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <FileText size={14} className="mr-2 text-primary" />
                      <span className="text-sm">Multi-Family Value-Add</span>
                    </div>
                    <span className="text-sm font-medium">32.1%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{
                    width: '32.1%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <FileText size={14} className="mr-2 text-primary" />
                      <span className="text-sm">Standard Acquisition LOI</span>
                    </div>
                    <span className="text-sm font-medium">24.5%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{
                    width: '24.5%'
                  }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <FileText size={14} className="mr-2 text-primary" />
                      <span className="text-sm">Commercial Office Space</span>
                    </div>
                    <span className="text-sm font-medium">18.9%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{
                    width: '18.9%'
                  }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 mb-1">
                  Avg. Response Time
                </h4>
                <div className="text-xl font-bold text-dark">2.3 days</div>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp size={12} className="mr-1" />
                  <span>0.5 days faster than industry avg.</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 mb-1">
                  Negotiation Rate
                </h4>
                <div className="text-xl font-bold text-dark">42.7%</div>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp size={12} className="mr-1" />
                  <span>+5.2% from last quarter</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-sm mb-3">A/B Testing Results</h4>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">
                    Version A: Standard Terms
                  </div>
                  <div className="flex items-center">
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mr-2">
                      <div className="h-full bg-primary" style={{
                      width: '18%'
                    }}></div>
                    </div>
                    <span className="text-xs font-medium">18%</span>
                  </div>
                </div>
                <div className="mx-2 text-xs text-gray-400">vs</div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">
                    Version B: Flexible Terms
                  </div>
                  <div className="flex items-center">
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mr-2">
                      <div className="h-full bg-tertiary" style={{
                      width: '27%'
                    }}></div>
                    </div>
                    <span className="text-xs font-medium">27%</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <Star size={12} className="text-tertiary mr-1" />
                <span>Version B outperforms by 9% in acceptance rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};