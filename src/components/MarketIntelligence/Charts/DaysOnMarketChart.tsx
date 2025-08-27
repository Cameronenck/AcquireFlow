import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export const DaysOnMarketChart = ({
  selectedMarket,
  timeRange
}) => {
  const [propertyTypes, setPropertyTypes] = useState(['all']);
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
    // Base days on market for different markets
    const baseDays = selectedMarket.includes('Miami') ? 22 : selectedMarket.includes('Orlando') ? 18 : selectedMarket.includes('Tampa') ? 20 : selectedMarket.includes('Jacksonville') ? 15 : 19;
    const now = new Date();
    for (let i = monthCount; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      // Create some realistic fluctuations
      const noise = Math.sin(i * 0.5) * 0.1 + (Math.random() * 0.1 - 0.05);
      const trend = (monthCount - i) / monthCount * -0.15; // Slight downward trend (faster sales)
      const seasonality = Math.cos((date.getMonth() + 3) * Math.PI / 6) * 0.15; // Seasonal effect
      const multiplier = 1 + noise + trend + seasonality;
      data.push({
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        all: Math.round(baseDays * multiplier),
        singleFamily: Math.round(baseDays * multiplier * 0.9),
        condo: Math.round(baseDays * multiplier * 1.2),
        luxury: Math.round(baseDays * multiplier * 1.5),
        timestamp: date.getTime()
      });
    }
    return data;
  };
  const data = generateData();
  const togglePropertyType = type => {
    setPropertyTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
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
                {entry.value} days
              </p>)}
          </div>
        </div>;
    }
    return null;
  };
  return <div className="h-full">
      <div className="flex mb-3 space-x-2">
        <button className={`px-2 py-1 text-xs rounded-full ${propertyTypes.includes('all') ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => togglePropertyType('all')}>
          All Properties
        </button>
        <button className={`px-2 py-1 text-xs rounded-full ${propertyTypes.includes('singleFamily') ? 'bg-tertiary text-dark' : 'bg-gray-100 text-gray-600'}`} onClick={() => togglePropertyType('singleFamily')}>
          Single Family
        </button>
        <button className={`px-2 py-1 text-xs rounded-full ${propertyTypes.includes('condo') ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => togglePropertyType('condo')}>
          Condos
        </button>
        <button className={`px-2 py-1 text-xs rounded-full ${propertyTypes.includes('luxury') ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => togglePropertyType('luxury')}>
          Luxury
        </button>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{
        top: 5,
        right: 30,
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
        }} />
          <YAxis tick={{
          fontSize: 10,
          fill: '#6B7280'
        }} axisLine={{
          stroke: '#E5E7EB'
        }} tickLine={{
          stroke: '#E5E7EB'
        }} label={{
          value: 'Days',
          angle: -90,
          position: 'insideLeft',
          fontSize: 10,
          fill: '#6B7280'
        }} />
          <Tooltip content={<CustomTooltip />} />
          {propertyTypes.includes('all') && <Line type="monotone" dataKey="all" name="All Properties" stroke="#3AB795" strokeWidth={2} dot={{
          r: 2
        }} activeDot={{
          r: 4
        }} animationDuration={1000} />}
          {propertyTypes.includes('singleFamily') && <Line type="monotone" dataKey="singleFamily" name="Single Family" stroke="#FECA57" strokeWidth={2} dot={{
          r: 2
        }} activeDot={{
          r: 4
        }} animationDuration={1000} />}
          {propertyTypes.includes('condo') && <Line type="monotone" dataKey="condo" name="Condos" stroke="#FF6B6B" strokeWidth={2} dot={{
          r: 2
        }} activeDot={{
          r: 4
        }} animationDuration={1000} />}
          {propertyTypes.includes('luxury') && <Line type="monotone" dataKey="luxury" name="Luxury" stroke="#4B5563" strokeWidth={2} dot={{
          r: 2
        }} activeDot={{
          r: 4
        }} animationDuration={1000} />}
        </LineChart>
      </ResponsiveContainer>
    </div>;
};