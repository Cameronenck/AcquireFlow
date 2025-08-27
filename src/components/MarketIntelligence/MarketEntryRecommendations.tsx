import React, { useState } from 'react';
import { ArrowRight, Award, BarChart2, Building, Check, ChevronDown, Clock, DollarSign, Download, Filter, Home, Info, LineChart, Map, PieChart, Plus, RefreshCw, Search, Settings, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
interface InvestorProfile {
  strategy: 'buy_and_hold' | 'fix_and_flip' | 'development' | 'multi_family';
  experience: 'beginner' | 'intermediate' | 'advanced';
  capitalAvailable: number;
  timeline: 'short' | 'medium' | 'long';
  riskTolerance: 'low' | 'medium' | 'high';
}
interface MarketEntryRecommendationsProps {
  investorProfile: InvestorProfile;
  selectedMarket: string;
}
export const MarketEntryRecommendations: React.FC<MarketEntryRecommendationsProps> = ({
  investorProfile,
  selectedMarket
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>(investorProfile.strategy);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Lake Nona');
  const [propertyType, setPropertyType] = useState<string>('Single Family');
  const [priceRange, setPriceRange] = useState<[number, number]>([300000, 500000]);
  const [showRecommendationDetails, setShowRecommendationDetails] = useState<boolean>(true);
  // Get neighborhoods based on selected market
  const getNeighborhoods = (): string[] => {
    if (selectedMarket.includes('Orlando')) {
      return ['Lake Nona', 'Winter Park', 'Downtown', 'College Park', 'Baldwin Park'];
    } else if (selectedMarket.includes('Miami')) {
      return ['Brickell', 'Wynwood', 'Coral Gables', 'Little Havana', 'Coconut Grove'];
    } else if (selectedMarket.includes('Tampa')) {
      return ['Hyde Park', 'Channelside', 'Westshore', 'Seminole Heights', 'Davis Islands'];
    } else {
      return ['Downtown', 'Riverside', 'Southside', 'Northside', 'Westside'];
    }
  };
  const neighborhoods = getNeighborhoods();
  // Get recommended neighborhoods
  const getRecommendedNeighborhoods = () => {
    // This would typically come from an API based on the investor profile
    return neighborhoods.map(name => {
      // Generate some realistic data for each neighborhood
      const roi = (Math.random() * 5 + 7).toFixed(1);
      const growthRate = (Math.random() * 4 + 1).toFixed(1);
      const riskScore = Math.floor(Math.random() * 30 + 20);
      const score = Math.floor(Math.random() * 20 + 75);
      return {
        name,
        roi: `${roi}%`,
        growthRate: `${growthRate}%`,
        riskScore,
        score
      };
    }).sort((a, b) => b.score - a.score);
  };
  const recommendedNeighborhoods = getRecommendedNeighborhoods();
  // Generate some sample data for the charts
  const generateStrategyComparisonData = () => {
    return [{
      name: 'Buy & Hold',
      roi: 8.2,
      risk: 35,
      effort: 40,
      timeline: 80
    }, {
      name: 'Fix & Flip',
      roi: 12.5,
      risk: 60,
      effort: 75,
      timeline: 25
    }, {
      name: 'BRRRR',
      roi: 10.8,
      risk: 55,
      effort: 80,
      timeline: 60
    }, {
      name: 'Multi-Family',
      roi: 9.5,
      risk: 45,
      effort: 60,
      timeline: 85
    }, {
      name: 'Short-Term Rental',
      roi: 14.2,
      risk: 70,
      effort: 85,
      timeline: 40
    }];
  };
  const generateMarketEntryTimingData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => {
      const opportunityScore = Math.floor(Math.random() * 30 + 50);
      const competition = Math.floor(Math.random() * 40 + 40);
      const seasonality = Math.floor(Math.random() * 30 + 50);
      return {
        month,
        opportunityScore,
        competition,
        seasonality
      };
    });
  };
  const generatePropertyTypeData = () => {
    return [{
      name: 'Single Family',
      value: 45
    }, {
      name: 'Condo',
      value: 25
    }, {
      name: 'Townhouse',
      value: 15
    }, {
      name: 'Multi-Family',
      value: 10
    }, {
      name: 'Luxury',
      value: 5
    }];
  };
  const generateFinancingOptionsData = () => {
    return [{
      name: 'Conventional',
      interestRate: '5.75%',
      downPayment: '20%',
      terms: '15-30 years',
      requirements: 'Good credit, stable income',
      bestFor: 'Primary residence or long-term investments',
      score: 85
    }, {
      name: 'FHA',
      interestRate: '5.25%',
      downPayment: '3.5%',
      terms: '30 years',
      requirements: 'Min. 580 credit score, primary residence only',
      bestFor: 'First-time homebuyers with limited funds',
      score: 75
    }, {
      name: 'Hard Money',
      interestRate: '8-12%',
      downPayment: '25-30%',
      terms: '6-24 months',
      requirements: 'Property value more important than credit',
      bestFor: 'Fix and flip projects with quick turnaround',
      score: 65
    }, {
      name: 'DSCR Loan',
      interestRate: '6.5-7.5%',
      downPayment: '20-25%',
      terms: '30 years',
      requirements: 'Property must generate sufficient income',
      bestFor: 'Investment properties with strong cash flow',
      score: 80
    }, {
      name: 'Private Money',
      interestRate: '8-15%',
      downPayment: 'Varies',
      terms: 'Negotiable',
      requirements: 'Relationship-based, flexible',
      bestFor: 'Creative deals or those who can qualify conventionally score 70'
    }];
  };
  const generateRecommendedAgentsData = () => {
    return [{
      name: 'Sarah Johnson',
      company: 'Keller Williams',
      specialty: 'Investment Properties',
      deals: 87,
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    }, {
      name: 'Michael Rodriguez',
      company: 'RE/MAX',
      specialty: 'Multi-Family',
      deals: 65,
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    }, {
      name: 'Jessica Chen',
      company: 'Coldwell Banker',
      specialty: 'Fix & Flip',
      deals: 52,
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/women/33.jpg'
    }];
  };
  const strategyComparisonData = generateStrategyComparisonData();
  const marketEntryTimingData = generateMarketEntryTimingData();
  const propertyTypeData = generatePropertyTypeData();
  const financingOptionsData = generateFinancingOptionsData();
  const recommendedAgentsData = generateRecommendedAgentsData();
  // Colors for charts
  const COLORS = ['#3AB795', '#FECA57', '#FF6B6B', '#4B5563', '#9CA3AF'];
  return <div className="space-y-6">
      {/* Strategy Selection and Recommendations Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2 flex items-center">
              <Zap size={20} className="mr-2 text-emerald-500" />
              Market Entry Strategy for {selectedMarket}
            </h2>
            <p className="text-gray-600 text-sm">
              Personalized recommendations based on your investor profile and
              market conditions
            </p>
          </div>
          <div className="flex items-center mt-4 lg:mt-0 space-x-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Strategy:</span>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={selectedStrategy} onChange={e => setSelectedStrategy(e.target.value)}>
                <option value="buy_and_hold">Buy & Hold</option>
                <option value="fix_and_flip">Fix & Flip</option>
                <option value="development">Development</option>
                <option value="multi_family">Multi-Family</option>
              </select>
            </div>
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-lg text-gray-600 text-sm">
              <Settings size={16} className="mr-2" />
              Adjust Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Neighborhoods */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium flex items-center">
              <Map size={18} className="mr-2 text-emerald-500" />
              Recommended Neighborhoods
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <RefreshCw size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Download size={16} />
              </button>
              <div className="relative">
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                  <th className="pb-2 font-medium">Rank</th>
                  <th className="pb-2 font-medium">Neighborhood</th>
                  <th className="pb-2 font-medium">Expected ROI</th>
                  <th className="pb-2 font-medium">Growth Rate</th>
                  <th className="pb-2 font-medium">Risk Score</th>
                  <th className="pb-2 font-medium">Overall Score</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {recommendedNeighborhoods.map((neighborhood, index) => <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 ${selectedNeighborhood === neighborhood.name ? 'bg-emerald-50' : ''}`} onClick={() => setSelectedNeighborhood(neighborhood.name)}>
                    <td className="py-3 text-sm">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index < 3 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 text-sm font-medium">
                      {neighborhood.name}
                    </td>
                    <td className="py-3 text-sm text-emerald-600 font-medium">
                      {neighborhood.roi}
                    </td>
                    <td className="py-3 text-sm">{neighborhood.growthRate}</td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                          <div className={`h-1.5 rounded-full ${neighborhood.riskScore < 30 ? 'bg-emerald-500' : neighborhood.riskScore < 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                        width: `${neighborhood.riskScore}%`
                      }}></div>
                        </div>
                        <span className="text-xs">
                          {neighborhood.riskScore}/100
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                          <div className="h-1.5 bg-emerald-500 rounded-full" style={{
                        width: `${neighborhood.score}%`
                      }}></div>
                        </div>
                        <span className="text-xs">
                          {neighborhood.score}/100
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-right">
                      <button className="text-emerald-500 hover:text-emerald-600 text-sm">
                        Details
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategy Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-medium flex items-center mb-4">
            <BarChart2 size={18} className="mr-2 text-emerald-500" />
            Strategy Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={strategyComparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{
                fill: '#6B7280',
                fontSize: 12
              }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="ROI" dataKey="roi" stroke="#3AB795" fill="#3AB795" fillOpacity={0.6} />
                <Radar name="Risk" dataKey="risk" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.6} />
                <Radar name="Effort" dataKey="effort" stroke="#FECA57" fill="#FECA57" fillOpacity={0.6} />
                <Radar name="Timeline" dataKey="timeline" stroke="#4B5563" fill="#4B5563" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">
              Best Strategy Match:
            </div>
            <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <Award size={20} className="text-emerald-500 mr-3" />
              <div>
                <div className="font-medium">Buy & Hold</div>
                <div className="text-xs text-gray-500 mt-1">
                  Based on your profile and market conditions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Entry Timing */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Clock size={18} className="mr-2 text-emerald-500" />
            Market Entry Timing
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-xs rounded-lg bg-emerald-500 text-white">
              Monthly
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600">
              Quarterly
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600">
              Yearly
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketEntryTimingData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="opportunityScore" name="Opportunity Score" fill="#3AB795" />
              <Bar dataKey="competition" name="Competition" fill="#FF6B6B" />
              <Bar dataKey="seasonality" name="Seasonality" fill="#FECA57" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Star size={16} className="text-emerald-500 mr-2" />
              <h4 className="font-medium">Best Time to Enter</h4>
            </div>
            <p className="text-sm text-gray-600">
              September-November offers the optimal balance of opportunity and
              reduced competition.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <TrendingUp size={16} className="text-gray-600 mr-2" />
              <h4 className="font-medium">Price Trend</h4>
            </div>
            <p className="text-sm text-gray-600">
              Prices expected to increase 3.5% over next 6 months, stabilizing
              in Q1 next year.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Users size={16} className="text-gray-600 mr-2" />
              <h4 className="font-medium">Buyer Competition</h4>
            </div>
            <p className="text-sm text-gray-600">
              Competition decreases 15% in fall months, creating better
              negotiation leverage.
            </p>
          </div>
        </div>
      </div>

      {/* Property Type and Financing Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Property Types */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-medium flex items-center mb-4">
            <Home size={18} className="mr-2 text-emerald-500" />
            Recommended Property Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={propertyTypeData} cx="50%" cy="50%" labelLine={false} label={({
                  name,
                  percent
                }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={60} fill="#8884d8" dataKey="value">
                    {propertyTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Top Property Match</h4>
              <div className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-emerald-300 transition-colors" onClick={() => setPropertyType('Single Family')}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Single Family Home</div>
                  <div className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                    85% Match
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  3-4 beds, 2+ baths, 1,800-2,400 sqft
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Price range: $300K-$500K
                </div>
                <div className="mt-3 flex items-center text-xs text-emerald-600">
                  <Check size={14} className="mr-1" />
                  Best ROI potential for your strategy
                </div>
              </div>
              <button className="w-full mt-3 text-sm text-emerald-500 hover:text-emerald-600">
                View all property recommendations
              </button>
            </div>
          </div>
        </div>

        {/* Financing Options */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-medium flex items-center mb-4">
            <DollarSign size={18} className="mr-2 text-emerald-500" />
            Financing Options
          </h3>
          <div className="space-y-3">
            {financingOptionsData.slice(0, 3).map((option, index) => <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-emerald-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="font-medium">{option.name}</div>
                  <div className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {option.score}/100
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <div className="text-xs text-gray-500">Interest Rate</div>
                    <div className="text-sm">{option.interestRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Down Payment</div>
                    <div className="text-sm">{option.downPayment}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Terms</div>
                    <div className="text-sm">{option.terms}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500">Best For</div>
                  <div className="text-sm">{option.bestFor}</div>
                </div>
              </div>)}
            <button className="w-full mt-2 text-sm text-emerald-500 hover:text-emerald-600 flex items-center justify-center">
              <Plus size={14} className="mr-1" />
              View all financing options
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Professionals */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-medium flex items-center mb-4">
          <Users size={18} className="mr-2 text-emerald-500" />
          Recommended Agents & Professionals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedAgentsData.map((agent, index) => <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-center">
                <img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-xs text-gray-500">{agent.company}</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Specialty</div>
                  <div className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                    {agent.specialty}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-gray-500">Deals Closed</div>
                  <div className="text-sm font-medium">{agent.deals}</div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(agent.rating) ? 'text-amber-400' : 'text-gray-300'} fill={i < Math.floor(agent.rating) ? '#F59E0B' : '#D1D5DB'} />)}
                    <span className="text-xs ml-1">{agent.rating}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 text-sm text-emerald-500 hover:text-emerald-600 border border-emerald-500 rounded-lg py-1">
                Contact
              </button>
            </div>)}
        </div>
        <div className="mt-4 text-center">
          <button className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center mx-auto">
            View all recommended professionals
            <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
        <h3 className="font-medium flex items-center mb-4">
          <Zap size={18} className="mr-2" />
          Your Next Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-white text-emerald-500 rounded-full flex items-center justify-center font-medium">
                1
              </div>
              <h4 className="ml-3 font-medium">Schedule Market Tour</h4>
            </div>
            <p className="text-sm text-white text-opacity-90">
              Visit top neighborhoods to get a feel for the area and property
              conditions
            </p>
            <button className="mt-4 w-full bg-white text-emerald-500 rounded-lg py-2 text-sm font-medium hover:bg-opacity-90 transition-colors">
              Schedule Now
            </button>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-white text-emerald-500 rounded-full flex items-center justify-center font-medium">
                2
              </div>
              <h4 className="ml-3 font-medium">Get Pre-Approved</h4>
            </div>
            <p className="text-sm text-white text-opacity-90">
              Secure financing with our recommended lenders for best rates and
              terms
            </p>
            <button className="mt-4 w-full bg-white text-emerald-500 rounded-lg py-2 text-sm font-medium hover:bg-opacity-90 transition-colors">
              Start Process
            </button>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-white text-emerald-500 rounded-full flex items-center justify-center font-medium">
                3
              </div>
              <h4 className="ml-3 font-medium">Connect with Agent</h4>
            </div>
            <p className="text-sm text-white text-opacity-90">
              Meet with one of our recommended agents specializing in your
              strategy
            </p>
            <button className="mt-4 w-full bg-white text-emerald-500 rounded-lg py-2 text-sm font-medium hover:bg-opacity-90 transition-colors">
              Connect Now
            </button>
          </div>
        </div>
      </div>
    </div>;
};