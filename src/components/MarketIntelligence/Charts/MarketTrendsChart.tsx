import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
export const MarketTrendsChart = ({
  selectedMarket,
  timeRange
}) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['median', 'average']);
  const [showMarketEvents, setShowMarketEvents] = useState(true);
  // Generate data based on selected market and time range
  const generateData = () => {
    const months = {
      '1M': 1,
      '3M': 3,
      '6M': 6,
      '1Y': 12,
      '3Y': 36,
      '5Y': 60
    };
    const data = [];
    const monthCount = months[timeRange] || 6;
    const basePrice = selectedMarket.includes('Miami') ? 520000 : selectedMarket.includes('Orlando') ? 375000 : selectedMarket.includes('Tampa') ? 398000 : selectedMarket.includes('Jacksonville') ? 325000 : 400000;
    const now = new Date();
    for (let i = monthCount; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      // Create some realistic price fluctuations
      const noise = Math.sin(i * 0.5) * 0.03 + (Math.random() * 0.02 - 0.01);
      const trend = i / monthCount * 0.1; // Slight upward trend
      const seasonality = Math.sin((date.getMonth() + 3) * Math.PI / 6) * 0.02; // Seasonal effect
      const multiplier = 1 + noise + trend + seasonality;
      data.push({
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        median: Math.round(basePrice * multiplier),
        average: Math.round(basePrice * multiplier * 1.1),
        luxury: Math.round(basePrice * multiplier * 2.2),
        entry: Math.round(basePrice * multiplier * 0.7),
        timestamp: date.getTime()
      });
    }
    return data;
  };
  const data = generateData();
  // Market events
  const marketEvents = [{
    date: new Date(new Date().setMonth(new Date().getMonth() - 3)).getTime(),
    label: 'Interest Rate Hike'
  }, {
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime(),
    label: 'New Tax Incentives'
  }];
  // Find events that fall within the data range
  const relevantEvents = marketEvents.filter(event => {
    const firstDate = data[0].timestamp;
    const lastDate = data[data.length - 1].timestamp;
    return event.date >= firstDate && event.date <= lastDate;
  });
  const formatPrice = value => {
    return `$${value.toLocaleString()}`;
  };
  const toggleMetric = metric => {
    setSelectedMetrics(prev => prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]);
  };
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry, index) => <p key={index} style={{
            color: entry.color
          }}>
                <span className="font-medium">{entry.name}: </span>
                {formatPrice(entry.value)}
              </p>)}
          </div>
        </div>;
    }
    return null;
  };
  return <div className="h-full">
      <div className="flex mb-3 justify-between items-center">
        <div className="flex space-x-2">
          <button className={`px-2 py-1 text-xs rounded-full ${selectedMetrics.includes('median') ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => toggleMetric('median')}>
            Median
          </button>
          <button className={`px-2 py-1 text-xs rounded-full ${selectedMetrics.includes('average') ? 'bg-tertiary text-dark' : 'bg-gray-100 text-gray-600'}`} onClick={() => toggleMetric('average')}>
            Average
          </button>
          <button className={`px-2 py-1 text-xs rounded-full ${selectedMetrics.includes('luxury') ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => toggleMetric('luxury')}>
            Luxury
          </button>
          <button className={`px-2 py-1 text-xs rounded-full ${selectedMetrics.includes('entry') ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => toggleMetric('entry')}>
            Entry
          </button>
        </div>
        <div>
          <button className={`px-2 py-1 text-xs rounded-full ${showMarketEvents ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'}`} onClick={() => setShowMarketEvents(!showMarketEvents)}>
            {showMarketEvents ? 'Hide Events' : 'Show Events'}
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
        top: 5,
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
          <YAxis tickFormatter={formatPrice} tick={{
          fontSize: 12,
          fill: '#6B7280'
        }} axisLine={{
          stroke: '#E5E7EB'
        }} tickLine={{
          stroke: '#E5E7EB'
        }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} formatter={value => <span className="text-xs font-medium">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>} />
          {selectedMetrics.includes('median') && <Line type="monotone" dataKey="median" name="Median Price" stroke="#3AB795" strokeWidth={2} dot={{
          r: 3
        }} activeDot={{
          r: 5
        }} animationDuration={1000} />}
          {selectedMetrics.includes('average') && <Line type="monotone" dataKey="average" name="Average Price" stroke="#FECA57" strokeWidth={2} dot={{
          r: 3
        }} activeDot={{
          r: 5
        }} animationDuration={1000} />}
          {selectedMetrics.includes('luxury') && <Line type="monotone" dataKey="luxury" name="Luxury Segment" stroke="#FF6B6B" strokeWidth={2} dot={{
          r: 3
        }} activeDot={{
          r: 5
        }} animationDuration={1000} />}
          {selectedMetrics.includes('entry') && <Line type="monotone" dataKey="entry" name="Entry Level" stroke="#4B5563" strokeWidth={2} dot={{
          r: 3
        }} activeDot={{
          r: 5
        }} animationDuration={1000} />}
          {/* Market Events */}
          {showMarketEvents && relevantEvents.map((event, index) => <ReferenceLine key={index} x={data.find(d => d.timestamp >= event.date)?.date} stroke="#FF6B6B" strokeDasharray="3 3" label={{
          value: event.label,
          position: 'insideTopRight',
          fill: '#FF6B6B',
          fontSize: 11
        }} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>;
};