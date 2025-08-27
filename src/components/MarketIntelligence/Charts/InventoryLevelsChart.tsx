import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
export const InventoryLevelsChart = ({
  selectedMarket,
  timeRange
}) => {
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
    const baseInventory = selectedMarket.includes('Miami') ? 5800 : selectedMarket.includes('Orlando') ? 3200 : selectedMarket.includes('Tampa') ? 2900 : selectedMarket.includes('Jacksonville') ? 2100 : 3000;
    const now = new Date();
    for (let i = monthCount; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      // Create some realistic inventory fluctuations
      const noise = Math.sin(i * 0.5) * 0.1 + (Math.random() * 0.1 - 0.05);
      const trend = (monthCount - i) / monthCount * 0.15; // Slight downward trend
      const seasonality = Math.sin((date.getMonth() + 3) * Math.PI / 6) * 0.1; // Seasonal effect
      const multiplier = 1 + noise - trend + seasonality;
      data.push({
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        inventory: Math.round(baseInventory * multiplier),
        newListings: Math.round(baseInventory * multiplier * 0.2),
        balanced: baseInventory * 0.9,
        timestamp: date.getTime()
      });
    }
    return data;
  };
  const data = generateData();
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && payload && payload.length) {
      const inventoryData = payload.find(p => p.dataKey === 'inventory');
      const newListingsData = payload.find(p => p.dataKey === 'newListings');
      const balancedData = payload.find(p => p.dataKey === 'balanced');
      const inventoryValue = inventoryData ? inventoryData.value : 0;
      const balancedValue = balancedData ? balancedData.value : 0;
      const marketStatus = inventoryValue > balancedValue * 1.1 ? "Buyer's Market" : inventoryValue < balancedValue * 0.9 ? "Seller's Market" : 'Balanced Market';
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            <p style={{
            color: '#3AB795'
          }}>
              <span className="font-medium">Total Inventory: </span>
              {inventoryData?.value.toLocaleString()}
            </p>
            <p style={{
            color: '#FECA57'
          }}>
              <span className="font-medium">New Listings: </span>
              {newListingsData?.value.toLocaleString()}
            </p>
            <p className="text-gray-600 text-xs mt-2">
              <span className="font-medium">Market Status: </span>
              <span className={marketStatus === "Buyer's Market" ? 'text-secondary' : marketStatus === "Seller's Market" ? 'text-primary' : 'text-tertiary'}>
                {marketStatus}
              </span>
            </p>
          </div>
        </div>;
    }
    return null;
  };
  return <div className="h-full">
      <div className="text-xs text-gray-500 mb-2">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-primary rounded-full mr-1"></span>
          <span className="mr-3">Total Inventory</span>
          <span className="w-3 h-3 bg-tertiary rounded-full mr-1"></span>
          <span className="mr-3">New Listings</span>
          <span className="w-3 h-3 border border-dashed border-gray-400 rounded-full mr-1"></span>
          <span>Balanced Market</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{
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
        }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="inventory" fill="#3AB795" radius={[4, 4, 0, 0]} animationDuration={1000} name="Total Inventory" />
          <Bar dataKey="newListings" fill="#FECA57" radius={[4, 4, 0, 0]} animationDuration={1000} name="New Listings" />
          <ReferenceLine y={data[0].balanced} stroke="#9CA3AF" strokeDasharray="3 3" label={{
          value: 'Balanced Market',
          position: 'right',
          fill: '#9CA3AF',
          fontSize: 10
        }} />
        </BarChart>
      </ResponsiveContainer>
    </div>;
};