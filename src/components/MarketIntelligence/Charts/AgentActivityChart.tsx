import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
export const AgentActivityChart = ({
  selectedMarket
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  // Generate data based on selected market
  const generateData = () => {
    const marketData = {
      'Orlando, FL': [{
        name: 'Keller Williams',
        value: 28,
        transactions: 345,
        volume: '$124M'
      }, {
        name: 'Coldwell Banker',
        value: 22,
        transactions: 287,
        volume: '$98M'
      }, {
        name: 'RE/MAX',
        value: 18,
        transactions: 243,
        volume: '$87M'
      }, {
        name: 'Century 21',
        value: 15,
        transactions: 198,
        volume: '$76M'
      }, {
        name: 'Others',
        value: 17,
        transactions: 223,
        volume: '$82M'
      }],
      'Miami, FL': [{
        name: 'Douglas Elliman',
        value: 25,
        transactions: 412,
        volume: '$198M'
      }, {
        name: 'Coldwell Banker',
        value: 21,
        transactions: 356,
        volume: '$167M'
      }, {
        name: 'Keller Williams',
        value: 17,
        transactions: 289,
        volume: '$134M'
      }, {
        name: "ONE Sotheby's",
        value: 15,
        transactions: 245,
        volume: '$178M'
      }, {
        name: 'Others',
        value: 22,
        transactions: 378,
        volume: '$145M'
      }],
      'Tampa, FL': [{
        name: 'Keller Williams',
        value: 26,
        transactions: 312,
        volume: '$108M'
      }, {
        name: 'RE/MAX',
        value: 23,
        transactions: 275,
        volume: '$96M'
      }, {
        name: 'Coldwell Banker',
        value: 19,
        transactions: 228,
        volume: '$82M'
      }, {
        name: 'Century 21',
        value: 14,
        transactions: 168,
        volume: '$61M'
      }, {
        name: 'Others',
        value: 18,
        transactions: 216,
        volume: '$74M'
      }]
    };
    return marketData[selectedMarket] || marketData['Orlando, FL'];
  };
  const data = generateData();
  const COLORS = ['#3AB795', '#FECA57', '#FF6B6B', '#4B5563', '#9CA3AF'];
  const CustomTooltip = ({
    active,
    payload
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <div className="mt-2 space-y-1 text-sm">
            <p>
              <span className="font-medium">Market Share: </span>
              {data.value}%
            </p>
            <p>
              <span className="font-medium">Transactions: </span>
              {data.transactions}
            </p>
            <p>
              <span className="font-medium">Volume: </span>
              {data.volume}
            </p>
          </div>
        </div>;
    }
    return null;
  };
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  // Top agents data
  const topAgents = [{
    name: 'Sarah Johnson',
    company: 'Keller Williams',
    transactions: 42,
    volume: '$18.5M'
  }, {
    name: 'Michael Rodriguez',
    company: 'Coldwell Banker',
    transactions: 38,
    volume: '$16.2M'
  }, {
    name: 'Jennifer Smith',
    company: 'RE/MAX',
    transactions: 35,
    volume: '$14.8M'
  }];
  return <div className="h-full flex flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" onMouseEnter={onPieEnter} onMouseLeave={onPieLeave}>
              {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={activeIndex === index ? '#fff' : 'none'} strokeWidth={2} style={{
              filter: activeIndex === index ? 'drop-shadow(0px 0px 4px rgba(0,0,0,0.3))' : 'none',
              transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
              transformOrigin: 'center',
              transition: 'transform 0.2s, filter 0.2s'
            }} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="vertical" verticalAlign="middle" align="right" formatter={value => <span className="text-xs">{value}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 border-t border-gray-100 pt-2">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-medium">Top Performing Agents</h4>
          <button className="text-xs text-primary flex items-center">
            View All
            <ArrowUpRight size={12} className="ml-1" />
          </button>
        </div>
        <div className="space-y-1.5">
          {topAgents.map((agent, index) => <div key={index} className="flex justify-between items-center text-xs">
              <div className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-[10px]">
                  {index + 1}
                </span>
                <span>{agent.name}</span>
                <span className="text-gray-500 ml-1">({agent.company})</span>
              </div>
              <span className="text-gray-700">{agent.volume}</span>
            </div>)}
        </div>
      </div>
    </div>;
};