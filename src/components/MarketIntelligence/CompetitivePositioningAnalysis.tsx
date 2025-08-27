import React, { useState } from 'react';
import { BarChart2, Building, ChevronDown, Download, Filter, Info, PieChart, RefreshCw, Search, TrendingUp, TrendingDown, Users, Zap, ArrowUpRight, Clock, CheckCircle, MapPin, ChevronRight, AlertCircle, X } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
interface CompetitivePositioningAnalysisProps {
  selectedMarket: string;
  investorProfile: {
    strategy: string;
    experience: string;
    capitalAvailable: number;
    timeline: string;
    riskTolerance: string;
  };
}
export const CompetitivePositioningAnalysis: React.FC<CompetitivePositioningAnalysisProps> = ({
  selectedMarket,
  investorProfile
}) => {
  const [competitors, setCompetitors] = useState(['All Competitors', 'Keller Williams', 'Coldwell Banker', 'RE/MAX', 'Century 21', 'Berkshire Hathaway']);
  const [selectedCompetitor, setSelectedCompetitor] = useState('All Competitors');
  const [timeframe, setTimeframe] = useState('90d');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('All');
  const [priceRangeFilter, setPriceRangeFilter] = useState('All');
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
  // Generate data for neighborhood dominance
  const generateNeighborhoodData = () => {
    const neighborhoods = selectedMarket.includes('Orlando') ? ['Lake Nona', 'Winter Park', 'Downtown', 'College Park', 'Baldwin Park'] : selectedMarket.includes('Miami') ? ['Brickell', 'Wynwood', 'Coral Gables', 'Little Havana', 'Coconut Grove'] : ['Downtown', 'Riverside', 'Southside', 'Northside', 'Westside'];
    return neighborhoods.map(neighborhood => ({
      name: neighborhood,
      kw: Math.floor(Math.random() * 30) + 10,
      coldwell: Math.floor(Math.random() * 30) + 5,
      remax: Math.floor(Math.random() * 25) + 5,
      century21: Math.floor(Math.random() * 20) + 5,
      you: Math.floor(Math.random() * 15) + 5
    }));
  };
  const neighborhoodData = generateNeighborhoodData();
  // Generate marketing channels data
  const generateMarketingData = () => {
    return [{
      name: 'Social Media',
      competitor: 35,
      you: 20
    }, {
      name: 'Direct Mail',
      competitor: 15,
      you: 25
    }, {
      name: 'Email',
      competitor: 20,
      you: 15
    }, {
      name: 'Content Marketing',
      competitor: 10,
      you: 15
    }, {
      name: 'Paid Search',
      competitor: 15,
      you: 10
    }, {
      name: 'Events',
      competitor: 5,
      you: 15
    }];
  };
  const marketingData = generateMarketingData();
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
  return <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <Users size={20} className="mr-2 text-emerald-500" />
              Competitive Positioning Analysis
            </h2>
            <p className="text-gray-600 text-sm">
              Analyze your position against competitors in {selectedMarket}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={selectedCompetitor} onChange={e => setSelectedCompetitor(e.target.value)}>
                {competitors.map((comp, index) => <option key={index} value={comp}>
                    {comp}
                  </option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className={`px-2 py-0.5 text-xs rounded ${timeframe === '30d' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setTimeframe('30d')}>
                30D
              </button>
              <button className={`px-2 py-0.5 text-xs rounded ${timeframe === '90d' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setTimeframe('90d')}>
                90D
              </button>
              <button className={`px-2 py-0.5 text-xs rounded ${timeframe === '1y' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setTimeframe('1y')}>
                1Y
              </button>
            </div>
            <button className="flex items-center text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
              <Filter size={14} className="mr-2 text-gray-500" />
              Filters
              <ChevronDown size={14} className={`ml-2 text-gray-500 transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        {/* Advanced Filters */}
        {showAdvancedFilters && <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={propertyTypeFilter} onChange={e => setPropertyTypeFilter(e.target.value)}>
                  <option value="All">All Types</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Multi-Family">Multi-Family</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={priceRangeFilter} onChange={e => setPriceRangeFilter(e.target.value)}>
                  <option value="All">All Prices</option>
                  <option value="<$300K">Under $300K</option>
                  <option value="$300K-$500K">$300K - $500K</option>
                  <option value="$500K-$750K">$500K - $750K</option>
                  <option value="$750K-$1M">$750K - $1M</option>
                  <option value=">$1M">Over $1M</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Neighborhood
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="All">All Neighborhoods</option>
                  {neighborhoodData.map((n, i) => <option key={i} value={n.name}>
                      {n.name}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Status
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="text-sm text-gray-500 mr-3 hover:text-gray-700">
                Reset Filters
              </button>
              <button className="bg-emerald-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-emerald-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Share Analysis */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <PieChart size={20} className="mr-2 text-emerald-500" />
              Market Share Analysis
            </h3>
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <RefreshCw size={16} />
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
              <span className="font-medium text-emerald-600">
                #4 in {selectedMarket}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>YoY Change:</span>
              <span className="font-medium text-emerald-600">+2.5%</span>
            </div>
          </div>
        </div>

        {/* Deal Flow Comparison */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <BarChart2 size={20} className="mr-2 text-emerald-500" />
              Deal Flow Comparison
            </h3>
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={16} />
            </button>
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
              <div className="mt-1 text-xs text-emerald-600 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +12% from previous period
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">
                Total Deals (Competitor)
              </div>
              <div className="text-xl font-bold">143</div>
              <div className="mt-1 text-xs text-amber-600 flex items-center">
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
            <h3 className="font-bold flex items-center">
              <Filter size={18} className="mr-2 text-emerald-500" />
              Pricing Strategy
            </h3>
            <div className="flex items-center">
              <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 mr-1">
                <Info size={14} />
              </button>
              <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                <Download size={14} />
              </button>
            </div>
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
          <div className="mt-3 bg-emerald-500 bg-opacity-10 rounded-lg p-3">
            <h4 className="text-sm font-medium text-emerald-600">
              Strategic Insights
            </h4>
            <ul className="mt-1 text-xs text-gray-700 space-y-1">
              <li>• You're outperforming in the $300K-$400K range</li>
              <li>• Opportunity in the $500K-$600K segment</li>
              <li>• Consider expanding luxury ($700K+) presence</li>
            </ul>
          </div>
        </div>

        {/* Neighborhood Dominance */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center">
              <MapPin size={18} className="mr-2 text-emerald-500" />
              Neighborhood Dominance
            </h3>
            <div className="flex items-center">
              <div className="relative mr-2">
                <input type="text" placeholder="Search neighborhoods..." className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg w-48 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
              </div>
              <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                <Download size={14} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                  <th className="pb-2 font-medium">Neighborhood</th>
                  <th className="pb-2 font-medium">Your Share</th>
                  <th className="pb-2 font-medium">KW</th>
                  <th className="pb-2 font-medium">Coldwell</th>
                  <th className="pb-2 font-medium">RE/MAX</th>
                  <th className="pb-2 font-medium">Century 21</th>
                  <th className="pb-2 font-medium">Market Leader</th>
                </tr>
              </thead>
              <tbody>
                {neighborhoodData.map((neighborhood, index) => {
                const total = neighborhood.kw + neighborhood.coldwell + neighborhood.remax + neighborhood.century21 + neighborhood.you;
                const youPercent = Math.round(neighborhood.you / total * 100);
                const kwPercent = Math.round(neighborhood.kw / total * 100);
                const coldwellPercent = Math.round(neighborhood.coldwell / total * 100);
                const remaxPercent = Math.round(neighborhood.remax / total * 100);
                const century21Percent = Math.round(neighborhood.century21 / total * 100);
                const shares = [{
                  name: 'KW',
                  value: kwPercent
                }, {
                  name: 'Coldwell',
                  value: coldwellPercent
                }, {
                  name: 'RE/MAX',
                  value: remaxPercent
                }, {
                  name: 'Century 21',
                  value: century21Percent
                }, {
                  name: 'You',
                  value: youPercent
                }];
                const leader = shares.reduce((max, obj) => obj.value > max.value ? obj : max);
                return <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium">
                        {neighborhood.name}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-emerald-500 rounded-full" style={{
                          width: `${youPercent}%`
                        }}></div>
                          </div>
                          <span className="text-xs">{youPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-amber-500 rounded-full" style={{
                          width: `${kwPercent}%`
                        }}></div>
                          </div>
                          <span className="text-xs">{kwPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-blue-500 rounded-full" style={{
                          width: `${coldwellPercent}%`
                        }}></div>
                          </div>
                          <span className="text-xs">{coldwellPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-red-500 rounded-full" style={{
                          width: `${remaxPercent}%`
                        }}></div>
                          </div>
                          <span className="text-xs">{remaxPercent}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-gray-500 rounded-full" style={{
                          width: `${century21Percent}%`
                        }}></div>
                          </div>
                          <span className="text-xs">{century21Percent}%</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${leader.name === 'You' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                          {leader.name}
                        </span>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marketing Channel Comparison */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center">
              <TrendingUp size={18} className="mr-2 text-emerald-500" />
              Marketing Channels
            </h3>
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={14} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketingData} layout="vertical" margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" scale="band" tick={{
                fontSize: 12,
                fill: '#6B7280'
              }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="you" name="Your Focus" fill="#3AB795" barSize={10} />
                <Bar dataKey="competitor" name={selectedCompetitor === 'All Competitors' ? 'Competitors (Avg)' : selectedCompetitor} fill="#FF6B6B" barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <h4 className="text-sm font-medium text-emerald-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              Marketing Insight
            </h4>
            <p className="text-xs text-gray-700 mt-1">
              Your direct mail strategy is outperforming competitors by 10%,
              while competitors are investing 15% more in social media
              marketing.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Competitor Deals */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center">
            <Users size={20} className="mr-2 text-emerald-500" />
            Recent Competitor Activity
          </h3>
          <div className="relative">
            <input type="text" placeholder="Search properties or agents..." className="pl-8 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
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
                    <span className={`text-xs px-2 py-0.5 rounded-full ${deal.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
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
                    <button className="text-emerald-500 text-sm hover:underline">
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
          <button className="text-emerald-500 text-sm hover:underline flex items-center">
            View All Activity
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center">
            <Zap size={20} className="mr-2" />
            Your Competitive Edge
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <CheckCircle size={16} className="mr-2" />
              <h4 className="font-medium">Speed to Close</h4>
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
              <h4 className="font-medium">Pricing Accuracy</h4>
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
              <h4 className="font-medium">Market Responsiveness</h4>
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
          <button className="w-full px-3 py-2 bg-white text-emerald-500 text-sm rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-colors">
            Improve Your Competitive Edge
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>;
};