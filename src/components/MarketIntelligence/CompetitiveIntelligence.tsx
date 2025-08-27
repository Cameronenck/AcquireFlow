import React, { useState } from 'react';
import { Users, PieChart, TrendingUp, Zap, DollarSign, BarChart2, Search, ArrowUpRight, RefreshCcw, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
export const CompetitiveIntelligence = ({
  selectedMarket,
  timeRange
}) => {
  const [competitors, setCompetitors] = useState(['All Competitors', 'Keller Williams', 'Coldwell Banker', 'RE/MAX', 'Century 21', 'Berkshire Hathaway']);
  const [selectedCompetitor, setSelectedCompetitor] = useState('All Competitors');
  const [timeframe, setTimeframe] = useState('90d');
  // Market share data
  const marketShareData = [{
    name: 'Your Company',
    value: 12,
    color: '#3AB795'
  }, {
    name: 'Keller Williams',
    value: 24,
    color: '#FECA57'
  }, {
    name: 'Coldwell Banker',
    value: 18,
    color: '#FF6B6B'
  }, {
    name: 'RE/MAX',
    value: 15,
    color: '#4B5563'
  }, {
    name: 'Century 21',
    value: 10,
    color: '#9CA3AF'
  }, {
    name: 'Others',
    value: 21,
    color: '#E5E7EB'
  }];
  // Deal volume data
  const dealVolumeData = [{
    month: 'Jan',
    you: 12,
    competitor: 18
  }, {
    month: 'Feb',
    you: 15,
    competitor: 20
  }, {
    month: 'Mar',
    you: 18,
    competitor: 17
  }, {
    month: 'Apr',
    you: 16,
    competitor: 19
  }, {
    month: 'May',
    you: 22,
    competitor: 21
  }, {
    month: 'Jun',
    you: 25,
    competitor: 23
  }, {
    month: 'Jul',
    you: 28,
    competitor: 25
  }];
  // Pricing strategy data
  const pricingData = [{
    price: '<$300K',
    you: 15,
    competitor: 10
  }, {
    price: '$300K-$400K',
    you: 25,
    competitor: 20
  }, {
    price: '$400K-$500K',
    you: 20,
    competitor: 25
  }, {
    price: '$500K-$600K',
    you: 15,
    competitor: 20
  }, {
    price: '$600K-$700K',
    you: 10,
    competitor: 15
  }, {
    price: '>$700K',
    you: 15,
    competitor: 10
  }];
  // Recent competitor deals
  const competitorDeals = [{
    property: '123 Main St, Orlando, FL',
    price: '$425,000',
    competitor: 'Keller Williams',
    agent: 'Sarah Johnson',
    date: '2 days ago',
    status: 'Closed',
    type: 'Single Family',
    image: 'https://source.unsplash.com/random/100x100/?house,1'
  }, {
    property: '456 Oak Ave, Orlando, FL',
    price: '$380,000',
    competitor: 'RE/MAX',
    agent: 'Michael Brown',
    date: '3 days ago',
    status: 'Pending',
    type: 'Condo',
    image: 'https://source.unsplash.com/random/100x100/?house,2'
  }, {
    property: '789 Pine Rd, Orlando, FL',
    price: '$520,000',
    competitor: 'Coldwell Banker',
    agent: 'Jessica Lee',
    date: '5 days ago',
    status: 'Closed',
    type: 'Single Family',
    image: 'https://source.unsplash.com/random/100x100/?house,3'
  }, {
    property: '321 Maple Dr, Orlando, FL',
    price: '$675,000',
    competitor: 'Century 21',
    agent: 'David Wilson',
    date: '1 week ago',
    status: 'Closed',
    type: 'Luxury',
    image: 'https://source.unsplash.com/random/100x100/?house,4'
  }];
  // Custom tooltip for pie chart
  const CustomTooltip = ({
    active,
    payload
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary">
            <span className="font-medium">Market Share: </span>
            {data.value}%
          </p>
        </div>;
    }
    return null;
  };
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Market Share Analysis */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <PieChart size={20} className="mr-2 text-primary" />
            Market Share Analysis
          </h2>
          <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
            <RefreshCcw size={16} />
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie data={marketShareData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                {marketShareData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" formatter={value => <span className="text-xs">{value}</span>} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>Your Market Share:</span>
            <span className="font-medium">12%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Market Position:</span>
            <span className="font-medium text-primary">
              #4 in {selectedMarket}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>YoY Change:</span>
            <span className="font-medium text-primary">+2.5%</span>
          </div>
        </div>
      </div>
      {/* Competitor Selector and Deal Volume */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <BarChart2 size={20} className="mr-2 text-primary" />
            Deal Flow Comparison
          </h2>
          <div className="flex space-x-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5" value={selectedCompetitor} onChange={e => setSelectedCompetitor(e.target.value)}>
              {competitors.map((comp, index) => <option key={index} value={comp}>
                  {comp}
                </option>)}
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className={`px-2 py-0.5 text-xs rounded ${timeframe === '30d' ? 'bg-primary text-white' : 'text-gray-600'}`} onClick={() => setTimeframe('30d')}>
                30D
              </button>
              <button className={`px-2 py-0.5 text-xs rounded ${timeframe === '90d' ? 'bg-primary text-white' : 'text-gray-600'}`} onClick={() => setTimeframe('90d')}>
                90D
              </button>
              <button className={`px-2 py-0.5 text-xs rounded ${timeframe === '1y' ? 'bg-primary text-white' : 'text-gray-600'}`} onClick={() => setTimeframe('1y')}>
                1Y
              </button>
            </div>
          </div>
        </div>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dealVolumeData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
              <YAxis tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="you" name="Your Company" stroke="#3AB795" strokeWidth={2} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />
              <Line type="monotone" dataKey="competitor" name={selectedCompetitor === 'All Competitors' ? 'Competitors (Avg)' : selectedCompetitor} stroke="#FF6B6B" strokeWidth={2} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">Total Deals (You)</div>
            <div className="text-xl font-bold">136</div>
            <div className="mt-1 text-xs text-primary flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +12% from previous period
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">
              Total Deals (Competitor)
            </div>
            <div className="text-xl font-bold">143</div>
            <div className="mt-1 text-xs text-secondary flex items-center">
              <TrendingUp size={14} className="mr-1" />
              +8% from previous period
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500">Market Growth</div>
            <div className="text-xl font-bold">+10.5%</div>
            <div className="mt-1 text-xs text-gray-500">
              Year-over-year in {selectedMarket}
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Strategy Insights */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <DollarSign size={20} className="mr-2 text-primary" />
            Pricing Strategy
          </h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pricingData} margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="price" tick={{
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
              <Tooltip />
              <Legend />
              <Bar dataKey="you" name="Your Focus" fill="#3AB795" radius={[10, 10, 10, 10]} />
              <Bar dataKey="competitor" name={selectedCompetitor === 'All Competitors' ? 'Competitors (Avg)' : selectedCompetitor} fill="#FF6B6B" radius={[10, 10, 10, 10]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 bg-primary bg-opacity-10 rounded-lg p-3">
          <h3 className="text-sm font-medium text-primary">
            Strategic Insights
          </h3>
          <ul className="mt-1 text-xs text-gray-700 space-y-1">
            <li>• You're outperforming in the $300K-$400K range</li>
            <li>• Opportunity in the $500K-$600K segment</li>
            <li>• Consider expanding luxury ($700K+) presence</li>
          </ul>
        </div>
      </div>
      {/* Recent Competitor Deals */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Users size={20} className="mr-2 text-primary" />
            Recent Competitor Activity
          </h2>
          <div className="relative">
            <input type="text" placeholder="Search properties or agents..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-primary" />
            <Search size={16} className="absolute left-2.5 top-2 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                <th className="pb-2 font-medium">Property</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">Competitor</th>
                <th className="pb-2 font-medium">Agent</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {competitorDeals.map((deal, index) => <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center">
                      <img src={deal.image} alt={deal.property} className="w-8 h-8 rounded-md object-cover mr-2" />
                      <div>
                        <div className="text-sm font-medium">
                          {deal.property.split(',')[0]}
                        </div>
                        <div className="text-xs text-gray-500">{deal.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-sm font-medium">{deal.price}</td>
                  <td className="py-3 text-sm">{deal.competitor}</td>
                  <td className="py-3 text-sm">{deal.agent}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${deal.status === 'Closed' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-tertiary bg-opacity-10 text-tertiary-dark'}`}>
                      {deal.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {deal.date}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-primary text-sm hover:underline">
                      Details
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing 4 of 24 recent transactions
          </div>
          <button className="text-primary text-sm hover:underline flex items-center">
            View All Activity
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      {/* Competitive Advantages */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <Zap size={20} className="mr-2" />
            Your Competitive Edge
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <CheckCircle size={16} className="mr-2" />
              <h3 className="font-medium">Speed to Close</h3>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{
                  width: '85%'
                }}></div>
                </div>
              </div>
              <span className="ml-3 text-sm">85%</span>
            </div>
            <p className="text-xs mt-1 text-white text-opacity-90">
              You close 5 days faster than competitors on average
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <CheckCircle size={16} className="mr-2" />
              <h3 className="font-medium">Pricing Accuracy</h3>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{
                  width: '92%'
                }}></div>
                </div>
              </div>
              <span className="ml-3 text-sm">92%</span>
            </div>
            <p className="text-xs mt-1 text-white text-opacity-90">
              Your price-to-sale ratio is 3.2% better than market average
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <CheckCircle size={16} className="mr-2" />
              <h3 className="font-medium">Market Responsiveness</h3>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{
                  width: '78%'
                }}></div>
                </div>
              </div>
              <span className="ml-3 text-sm">78%</span>
            </div>
            <p className="text-xs mt-1 text-white text-opacity-90">
              Your team responds 2.5x faster to market changes
            </p>
          </div>
        </div>
        <div className="mt-5">
          <button className="w-full px-3 py-2 bg-white text-primary text-sm rounded-lg flex items-center justify-center">
            Improve Your Competitive Edge
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>;
};