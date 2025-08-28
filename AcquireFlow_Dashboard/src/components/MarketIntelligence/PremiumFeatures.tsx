import React, { useState } from 'react';
import { Zap, Bell, Clock, Download, Database, LineChart, TrendingUp, BarChart2, Lock, ArrowUpRight, FileText, AlertTriangle, Layers, ChevronRight, CheckCircle } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
export const PremiumFeatures = ({
  selectedMarket,
  timeRange
}) => {
  const [predictionRange, setPredictionRange] = useState('1y');
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  // Generate prediction data
  const generatePredictionData = () => {
    const now = new Date();
    const data = [];
    // Historical data (past 6 months)
    for (let i = 6; i >= 1; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      data.push({
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        price: 375000 + Math.sin(i * 0.5) * 15000 + i * 2500,
        isHistorical: true,
        timestamp: date.getTime()
      });
    }
    // Current month
    data.push({
      date: now.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }),
      price: 395000,
      isHistorical: true,
      timestamp: now.getTime()
    });
    // Future predictions
    const months = predictionRange === '6m' ? 6 : predictionRange === '1y' ? 12 : 24;
    for (let i = 1; i <= months; i++) {
      const date = new Date(now);
      date.setMonth(date.getMonth() + i);
      // Add some randomness to the prediction but with an upward trend
      const noise = Math.sin(i * 0.5) * 5000 + (Math.random() * 5000 - 2500);
      const trend = i * 2000; // Upward trend
      data.push({
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        price: 395000 + noise + trend,
        predicted: true,
        optimistic: 395000 + noise + trend + i * 1000,
        conservative: 395000 + noise + trend - i * 500,
        timestamp: date.getTime()
      });
    }
    return data;
  };
  const predictionData = generatePredictionData();
  // Generate historical data for time series
  const generateHistoricalData = () => {
    const years = 5;
    const data = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    for (let y = 0; y < years; y++) {
      const year = currentYear - years + y;
      for (let m = 0; m < 12; m++) {
        const date = new Date(year, m, 1);
        // Create seasonal patterns with year-over-year growth
        const seasonality = Math.sin((m + 3) * Math.PI / 6) * 20000;
        const yearlyGrowth = y * 25000;
        const basePrice = 300000;
        data.push({
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          }),
          price: basePrice + seasonality + yearlyGrowth + (Math.random() * 10000 - 5000),
          timestamp: date.getTime()
        });
      }
    }
    return data;
  };
  const historicalData = generateHistoricalData();
  // Custom alert configurations
  const alertConfigurations = [{
    id: 1,
    type: 'Price Drop',
    metric: 'Median Price',
    threshold: '> 5% in 30 days',
    markets: ['Orlando, FL', 'Tampa, FL'],
    status: 'Active',
    lastTriggered: '2 weeks ago'
  }, {
    id: 2,
    type: 'Inventory Surge',
    metric: 'Available Listings',
    threshold: '> 15% in 60 days',
    markets: ['All Florida Markets'],
    status: 'Active',
    lastTriggered: 'Never'
  }, {
    id: 3,
    type: 'Market Opportunity',
    metric: 'Days on Market + Price',
    threshold: 'DOM < 15 & Price < $400K',
    markets: ['Miami, FL'],
    status: 'Paused',
    lastTriggered: '1 month ago'
  }];
  // External data sources
  const dataSources = [{
    name: 'MLS Data',
    status: 'Connected',
    lastSync: '12 minutes ago',
    records: '1.2M properties'
  }, {
    name: 'County Records',
    status: 'Connected',
    lastSync: '1 hour ago',
    records: '3.4M records'
  }, {
    name: 'Economic Indicators',
    status: 'Connected',
    lastSync: '6 hours ago',
    records: '250+ indicators'
  }, {
    name: 'Census Data',
    status: 'Available',
    lastSync: 'Never',
    records: '5M+ demographics'
  }];
  // Format price for tooltips and displays
  const formatPrice = value => {
    return `$${value.toLocaleString()}`;
  };
  // Custom tooltip for prediction chart
  const PredictionTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && payload && payload.length) {
      const isHistorical = payload[0].payload.isHistorical;
      const isPredicted = payload[0].payload.predicted;
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {isHistorical && <p className="text-primary mt-1">
              <span className="font-medium">Historical Price: </span>
              {formatPrice(payload[0].value)}
            </p>}
          {isPredicted && <>
              <p className="text-primary mt-1">
                <span className="font-medium">Predicted Price: </span>
                {formatPrice(payload[0].value)}
              </p>
              <div className="mt-1 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Optimistic:</span>
                  <span>{formatPrice(payload[0].payload.optimistic)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conservative:</span>
                  <span>{formatPrice(payload[0].payload.conservative)}</span>
                </div>
              </div>
              <div className="mt-1 text-xs flex items-center text-tertiary-dark">
                <AlertTriangle size={12} className="mr-1" />
                Prediction confidence: 82%
              </div>
            </>}
        </div>;
    }
    return null;
  };
  // Render premium lock overlay for non-premium users
  const renderPremiumLock = () => {
    if (isPremiumUser) return null;
    return <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex flex-col items-center justify-center rounded-xl z-10">
        <Lock size={32} className="text-white mb-3" />
        <h3 className="text-white font-bold text-lg mb-2">Premium Feature</h3>
        <p className="text-white text-opacity-90 text-center max-w-xs mb-4">
          Unlock advanced market intelligence features with our premium plan.
        </p>
        <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-colors" onClick={() => setIsPremiumUser(true)}>
          Upgrade Now
        </button>
      </div>;
  };
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Predictive Analytics */}
      <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-200 shadow-sm relative">
        {renderPremiumLock()}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <LineChart size={20} className="mr-2 text-primary" />
            Predictive Price Analytics
          </h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className={`px-2 py-1 text-xs rounded ${predictionRange === '6m' ? 'bg-primary text-white' : 'text-gray-600'}`} onClick={() => setPredictionRange('6m')}>
              6M
            </button>
            <button className={`px-2 py-1 text-xs rounded ${predictionRange === '1y' ? 'bg-primary text-white' : 'text-gray-600'}`} onClick={() => setPredictionRange('1y')}>
              1Y
            </button>
            <button className={`px-2 py-1 text-xs rounded ${predictionRange === '2y' ? 'bg-primary text-white' : 'text-gray-600'}`} onClick={() => setPredictionRange('2y')}>
              2Y
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          Price prediction model for {selectedMarket} based on historical
          trends, economic indicators, and market conditions.
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData} margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
              <YAxis tickFormatter={formatPrice} domain={['dataMin - 20000', 'dataMax + 20000']} tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
              <Tooltip content={<PredictionTooltip />} />
              <Legend />
              <defs>
                <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3AB795" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3AB795" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FECA57" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FECA57" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="price" name="Historical Price" stroke="#3AB795" fillOpacity={1} fill="url(#colorHistorical)" activeDot={{
              r: 6
            }} connectNulls isAnimationActive={true} animationDuration={1000} dot={props => {
              const {
                cx,
                cy,
                payload
              } = props;
              if (!payload.isHistorical) return null;
              return <circle cx={cx} cy={cy} r={4} fill="#3AB795" />;
            }} />
              <Area type="monotone" dataKey="price" name="Predicted Price" stroke="#FECA57" strokeWidth={2} fillOpacity={1} fill="url(#colorPredicted)" activeDot={{
              r: 6
            }} connectNulls isAnimationActive={true} animationDuration={1000} dot={props => {
              const {
                cx,
                cy,
                payload
              } = props;
              if (!payload.predicted) return null;
              return <circle cx={cx} cy={cy} r={4} fill="#FECA57" />;
            }} />
              {/* Prediction range */}
              {predictionData.map((entry, index) => {
              if (!entry.predicted) return null;
              return <Area key={`range-${index}`} type="monotone" dataKey="optimistic" data={[entry]} stroke="none" fill="none" activeDot={false} isAnimationActive={false} />;
            })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">Current Median</div>
            <div className="text-xl font-bold">
              {formatPrice(predictionData[6].price)}
            </div>
            <div className="mt-1 text-xs text-primary flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +5.3% YoY
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">1-Year Forecast</div>
            <div className="text-xl font-bold">
              {formatPrice(predictionData[predictionData.length - 1].price)}
            </div>
            <div className="mt-1 text-xs text-primary flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +6.1% projected growth
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">Confidence Score</div>
            <div className="text-xl font-bold">82%</div>
            <div className="mt-1 text-xs text-gray-500">
              Based on 24 market indicators
            </div>
          </div>
        </div>
      </div>
      {/* Custom Market Alerts */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm relative">
        {renderPremiumLock()}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Bell size={20} className="mr-2 text-primary" />
            Custom Market Alerts
          </h2>
          <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
            New Alert
          </button>
        </div>
        <div className="space-y-3">
          {alertConfigurations.map(alert => <div key={alert.id} className={`border rounded-lg p-3 ${alert.status === 'Active' ? 'border-primary' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{alert.type}</h3>
                <div className={`text-xs px-2 py-0.5 rounded-full ${alert.status === 'Active' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                  {alert.status}
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Metric:</span>
                  <span>{alert.metric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Threshold:</span>
                  <span>{alert.threshold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Markets:</span>
                  <span>{alert.markets.join(', ')}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center text-xs">
                <div className="text-gray-500">
                  {alert.lastTriggered === 'Never' ? 'Never triggered' : `Last triggered: ${alert.lastTriggered}`}
                </div>
                <button className="text-primary hover:underline">Edit</button>
              </div>
            </div>)}
        </div>
        <div className="mt-4">
          <button className="w-full px-3 py-2 bg-gray-100 text-dark text-sm rounded-lg flex items-center justify-center">
            Manage All Alerts
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      {/* Historical Trend Analysis */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm relative">
        {renderPremiumLock()}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Clock size={20} className="mr-2 text-primary" />
            Historical Trend Analysis
          </h2>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg">
            <Download size={16} />
          </button>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          5-year historical price trends for {selectedMarket} with seasonal
          patterns.
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={historicalData} margin={{
            top: 10,
            right: 10,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{
              fontSize: 10,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} interval={11} // Show only years
            />
              <YAxis tickFormatter={formatPrice} tick={{
              fontSize: 10,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
              <Tooltip formatter={value => formatPrice(value)} labelFormatter={label => `Date: ${label}`} />
              <Line type="monotone" dataKey="price" name="Historical Price" stroke="#3AB795" dot={false} activeDot={{
              r: 6
            }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 bg-gray-50 rounded-lg p-3">
          <h3 className="text-sm font-medium">Key Historical Insights</h3>
          <ul className="mt-2 text-xs text-gray-600 space-y-1">
            <li>• Consistent 5.8% annual appreciation since 2018</li>
            <li>• Seasonal peaks in May-June each year</li>
            <li>• 12.4% surge during 2021 market boom</li>
            <li>• Minimal impact from 2022 interest rate hikes</li>
          </ul>
        </div>
      </div>
      {/* Export Capabilities */}
      <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-gray-200 shadow-sm relative">
        {renderPremiumLock()}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <FileText size={20} className="mr-2 text-primary" />
            Export & Reports
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                <BarChart2 size={20} className="text-primary" />
              </div>
              <h3 className="font-medium">Market Report</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Comprehensive market analysis with trends and forecasts.
            </p>
            <div className="flex space-x-2">
              <button className="flex-1 px-2 py-1.5 text-xs bg-primary text-white rounded-lg">
                PDF
              </button>
              <button className="flex-1 px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg">
                Excel
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-tertiary bg-opacity-10 flex items-center justify-center mr-3">
                <LineChart size={20} className="text-tertiary-dark" />
              </div>
              <h3 className="font-medium">Data Export</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Raw data export for custom analysis and integration.
            </p>
            <div className="flex space-x-2">
              <button className="flex-1 px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg">
                CSV
              </button>
              <button className="flex-1 px-2 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg">
                JSON
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary bg-opacity-10 flex items-center justify-center mr-3">
                <Layers size={20} className="text-secondary" />
              </div>
              <h3 className="font-medium">Custom Report</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Build a tailored report with your selected metrics.
            </p>
            <button className="w-full px-2 py-1.5 text-xs bg-tertiary text-dark rounded-lg">
              Create Report
            </button>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Scheduled Reports</h3>
            <button className="text-primary text-sm hover:underline">
              Manage Schedule
            </button>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-400" />
                <span>Weekly Market Summary</span>
              </div>
              <span className="text-xs text-gray-500">
                Every Monday at 9 AM
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-400" />
                <span>Monthly Investment Opportunities</span>
              </div>
              <span className="text-xs text-gray-500">1st of each month</span>
            </div>
          </div>
        </div>
      </div>
      {/* External Data Integration */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm relative">
        {renderPremiumLock()}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Database size={20} className="mr-2 text-primary" />
            Data Integrations
          </h2>
        </div>
        <div className="space-y-3">
          {dataSources.map((source, index) => <div key={index} className={`border rounded-lg p-3 ${source.status === 'Connected' ? 'border-primary' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{source.name}</h3>
                <div className={`text-xs px-2 py-0.5 rounded-full ${source.status === 'Connected' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                  {source.status}
                </div>
              </div>
              {source.status === 'Connected' && <div className="mt-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    Last sync: {source.lastSync}
                  </div>
                  <div className="mt-1">{source.records} available</div>
                </div>}
              <div className="mt-3">
                <button className={`text-xs ${source.status === 'Connected' ? 'text-primary hover:underline' : 'px-2 py-1 bg-tertiary text-dark rounded-lg'}`}>
                  {source.status === 'Connected' ? 'View Data' : 'Connect'}
                </button>
              </div>
            </div>)}
        </div>
        <div className="mt-4">
          <button className="w-full px-3 py-2 bg-gray-100 text-dark text-sm rounded-lg flex items-center justify-center">
            Add New Data Source
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      {/* Upgrade Banner */}
      {!isPremiumUser && <div className="lg:col-span-3 bg-gradient-to-r from-tertiary to-primary rounded-xl p-6 text-dark">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="flex items-center">
                <Zap size={24} className="mr-2" />
                <h2 className="text-xl font-bold">
                  Unlock Premium Market Intelligence
                </h2>
              </div>
              <p className="mt-2 max-w-xl">
                Get access to predictive analytics, custom alerts, historical
                trends, and more with our premium plan. Make data-driven
                investment decisions with confidence.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-lg text-sm flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Predictive Analytics
                </div>
                <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-lg text-sm flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Custom Market Alerts
                </div>
                <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-lg text-sm flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Advanced Reporting
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" onClick={() => setIsPremiumUser(true)}>
                Upgrade Now
              </button>
            </div>
          </div>
        </div>}
    </div>;
};