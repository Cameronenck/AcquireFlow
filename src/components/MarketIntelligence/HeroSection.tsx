import React, { useState } from 'react';
import { LineChart, TrendingUp, TrendingDown, Clock, Calendar, Map, Bell, ChevronDown, AlertCircle, ArrowRight, X } from 'lucide-react';
export const HeroSection = ({
  selectedMarket,
  onMarketChange,
  timeRange,
  onTimeRangeChange
}) => {
  const [showMarketSelector, setShowMarketSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts, setAlerts] = useState([{
    id: 1,
    type: 'price-drop',
    message: 'Median home prices in Orlando dropped 2.3% in the last 30 days',
    severity: 'medium',
    date: '2 hours ago',
    read: false
  }, {
    id: 2,
    type: 'inventory',
    message: 'Inventory levels in Miami increased by 15% - opportunity alert',
    severity: 'high',
    date: '1 day ago',
    read: false
  }, {
    id: 3,
    type: 'market-shift',
    message: 'Days on market in Tampa increased from 24 to 32 days',
    severity: 'medium',
    date: '3 days ago',
    read: true
  }]);
  const markets = ['Orlando, FL', 'Miami, FL', 'Tampa, FL', 'Jacksonville, FL', 'Fort Lauderdale, FL', 'West Palm Beach, FL', 'Naples, FL', 'Sarasota, FL', 'Fort Myers, FL', 'Daytona Beach, FL'];
  const timeRanges = [{
    value: '1M',
    label: '1 Month'
  }, {
    value: '3M',
    label: '3 Months'
  }, {
    value: '6M',
    label: '6 Months'
  }, {
    value: '1Y',
    label: 'Last Year'
  }, {
    value: '3Y',
    label: '3 Years'
  }, {
    value: '5Y',
    label: '5 Years'
  }];
  const marketMetrics = {
    'Orlando, FL': {
      medianPrice: '$375,000',
      priceChange: '+2.7%',
      inventory: '3,245',
      inventoryChange: '-5.2%',
      daysOnMarket: '18',
      daysOnMarketChange: '-3',
      trend: 'up'
    },
    'Miami, FL': {
      medianPrice: '$520,000',
      priceChange: '+4.3%',
      inventory: '5,872',
      inventoryChange: '+2.1%',
      daysOnMarket: '22',
      daysOnMarketChange: '+2',
      trend: 'up'
    },
    'Tampa, FL': {
      medianPrice: '$398,000',
      priceChange: '+1.8%',
      inventory: '2,934',
      inventoryChange: '-3.6%',
      daysOnMarket: '20',
      daysOnMarketChange: '-1',
      trend: 'up'
    },
    'Jacksonville, FL': {
      medianPrice: '$325,000',
      priceChange: '+3.2%',
      inventory: '2,156',
      inventoryChange: '-7.4%',
      daysOnMarket: '15',
      daysOnMarketChange: '-4',
      trend: 'up'
    },
    'Fort Lauderdale, FL': {
      medianPrice: '$485,000',
      priceChange: '+3.5%',
      inventory: '3,789',
      inventoryChange: '-1.2%',
      daysOnMarket: '25',
      daysOnMarketChange: '+1',
      trend: 'up'
    }
  };
  const currentMetrics = marketMetrics[selectedMarket] || marketMetrics['Orlando, FL'];
  const unreadAlerts = alerts.filter(alert => !alert.read).length;
  const markAlertAsRead = id => {
    setAlerts(alerts.map(alert => alert.id === id ? {
      ...alert,
      read: true
    } : alert));
  };
  const dismissAlert = (id, e) => {
    e.stopPropagation();
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  // Filter markets based on search term
  const filteredMarkets = markets.filter(market => market.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark flex items-center">
              <LineChart size={24} className="mr-3" />
              Market Intelligence
            </h1>
            <p className="text-gray-500 mt-2">
              Real-time market insights and investment opportunities
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Market Search */}
            <div className="relative">
              <div className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-dark hover:bg-gray-50 transition-colors shadow-sm">
                <Map size={18} className="text-primary flex-shrink-0" />
                <input type="text" className="ml-3 border-none outline-none bg-transparent w-40 placeholder-gray-400" placeholder="Search city, state..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onFocus={() => setShowMarketSelector(true)} />
                <ChevronDown size={16} className="ml-2 text-gray-400 flex-shrink-0 cursor-pointer" onClick={() => setShowMarketSelector(!showMarketSelector)} />
              </div>
              {showMarketSelector && <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-2 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium text-sm">Select Market</h3>
                  </div>
                  {filteredMarkets.length > 0 ? filteredMarkets.map(market => <button key={market} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${market === selectedMarket ? 'bg-primary bg-opacity-10 text-primary font-medium' : 'text-dark'}`} onClick={() => {
                onMarketChange(market);
                setShowMarketSelector(false);
                setSearchTerm('');
              }}>
                        {market}
                      </button>) : <div className="px-4 py-3 text-sm text-gray-500">
                      No markets found
                    </div>}
                </div>}
            </div>
            {/* Time Range Selector */}
            <div className="flex bg-gray-100 rounded-xl p-1.5">
              {timeRanges.map(range => <button key={range.value} className={`px-3 py-1.5 text-sm rounded-lg ${timeRange === range.value ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-200'}`} onClick={() => onTimeRangeChange(range.value)}>
                  {range.value}
                </button>)}
            </div>
            {/* Alerts Button */}
            <div className="relative">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-dark hover:bg-gray-200 transition-colors relative" onClick={() => setShowAlerts(!showAlerts)}>
                <Bell size={20} />
                {unreadAlerts > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-secondary text-white text-xs flex items-center justify-center rounded-full">
                    {unreadAlerts}
                  </span>}
              </button>
              {showAlerts && <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-30">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium">Market Alerts</h3>
                    <span className="text-xs bg-primary bg-opacity-10 text-primary px-2.5 py-1 rounded-full">
                      {alerts.length} alerts
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {alerts.length > 0 ? alerts.map(alert => <div key={alert.id} className={`px-4 py-3.5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${!alert.read ? 'bg-primary bg-opacity-5' : ''}`} onClick={() => markAlertAsRead(alert.id)}>
                          <div className="flex items-start">
                            <div className={`mt-0.5 p-1.5 rounded-full mr-3 ${alert.severity === 'high' ? 'bg-secondary bg-opacity-10' : 'bg-tertiary bg-opacity-10'}`}>
                              <AlertCircle size={16} className={alert.severity === 'high' ? 'text-secondary' : 'text-tertiary-dark'} />
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${!alert.read ? 'font-medium' : ''}`}>
                                {alert.message}
                              </p>
                              <span className="text-xs text-gray-500 mt-1.5 block">
                                {alert.date}
                              </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 p-1.5" onClick={e => dismissAlert(alert.id, e)}>
                              <X size={14} />
                            </button>
                          </div>
                        </div>) : <div className="px-4 py-6 text-center text-gray-500">
                        <p>No new alerts</p>
                      </div>}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <button className="text-primary text-sm hover:underline flex items-center justify-center w-full">
                      Configure Alert Settings
                      <ArrowRight size={14} className="ml-2" />
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
        {/* Market Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">
                Median Price
              </h3>
              <div className={`flex items-center ${currentMetrics.priceChange.startsWith('+') ? 'text-primary' : 'text-secondary'}`}>
                {currentMetrics.priceChange.startsWith('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1.5 text-xs">
                  {currentMetrics.priceChange}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-dark">
                {currentMetrics.medianPrice}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              vs. previous{' '}
              {timeRange === '1M' ? 'month' : timeRange === '1Y' ? 'year' : 'period'}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">Inventory</h3>
              <div className={`flex items-center ${currentMetrics.inventoryChange.startsWith('+') ? 'text-primary' : 'text-secondary'}`}>
                {currentMetrics.inventoryChange.startsWith('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="ml-1.5 text-xs">
                  {currentMetrics.inventoryChange}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-dark">
                {currentMetrics.inventory}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">active listings</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-gray-500">
                Days on Market
              </h3>
              <div className={`flex items-center ${currentMetrics.daysOnMarketChange.startsWith('-') ? 'text-primary' : 'text-secondary'}`}>
                {currentMetrics.daysOnMarketChange.startsWith('-') ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                <span className="ml-1.5 text-xs">
                  {currentMetrics.daysOnMarketChange} days
                </span>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-dark">
                {currentMetrics.daysOnMarket}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              average days to sell
            </div>
          </div>
          <div className="bg-primary border border-primary rounded-xl p-5 shadow-sm text-white">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-white text-opacity-90">
                Market Opportunity
              </h3>
              <div className="bg-white text-primary text-xs px-2.5 py-1 rounded-full font-medium">
                {currentMetrics.trend === 'up' ? "Seller's Market" : "Buyer's Market"}
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold">
                {currentMetrics.trend === 'up' ? '72' : '68'}/100
              </span>
            </div>
            <div className="mt-2 text-xs text-white text-opacity-90">
              investment opportunity score
            </div>
          </div>
        </div>
      </div>
    </div>;
};