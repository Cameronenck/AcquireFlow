import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Home, DollarSign, Briefcase, MapPin, Calendar, Shield, AlertTriangle, Info, Layers } from 'lucide-react';
import { CityScorecard } from './CityScorecard';
interface CityOverviewProps {
  city: string;
  metrics: {
    population: number;
    medianIncome: number;
    medianHomePrice: number;
    jobGrowth: number;
    populationGrowth: number;
    rentGrowth: number;
    vacancyRate: number;
    affordabilityIndex: number;
    crimeIndex: number;
    walkabilityScore: number;
  };
  timeframe: string;
  dataSource: string;
}
export const CityOverview: React.FC<CityOverviewProps> = ({
  city,
  metrics,
  timeframe,
  dataSource
}) => {
  // Generate historical data based on current metrics and timeframe
  const generateHistoricalData = () => {
    const years = timeframe === '1Y' ? 1 : timeframe === '3Y' ? 3 : timeframe === '5Y' ? 5 : 10;
    const data = [];
    for (let i = years; i >= 0; i--) {
      const year = new Date().getFullYear() - i;
      // Add some variation to make the data look realistic
      const randomFactor = 1 + Math.sin(i * 0.5) * 0.05 + (Math.random() * 0.03 - 0.015);
      const growthFactor = 1 + i / years * 0.15; // Higher values in the past
      data.push({
        year,
        population: Math.round(metrics.population / growthFactor),
        homePrice: Math.round(metrics.medianHomePrice / growthFactor * randomFactor),
        income: Math.round(metrics.medianIncome / growthFactor * randomFactor),
        rent: Math.round(metrics.medianHomePrice / growthFactor * randomFactor * 0.004),
        jobs: Math.round(100 - i * 3 + (Math.random() * 5 - 2.5)) // Index value
      });
    }
    return data.reverse(); // Return chronological order
  };
  // Generate neighborhood data
  const generateNeighborhoodData = () => {
    // Base neighborhoods for different cities
    const neighborhoods = city.includes('Orlando') ? ['Lake Nona', 'Winter Park', 'Downtown', 'College Park', 'Baldwin Park'] : city.includes('Miami') ? ['Brickell', 'Wynwood', 'Coral Gables', 'Little Havana', 'Coconut Grove'] : ['Downtown', 'Riverside', 'Southside', 'Northside', 'Westside'];
    return neighborhoods.map(name => {
      // Generate random but reasonable values
      const priceMultiplier = Math.random() * 0.5 + 0.8; // 0.8 to 1.3
      const growthMultiplier = Math.random() * 0.6 + 0.7; // 0.7 to 1.3
      const rentMultiplier = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
      return {
        name,
        price: Math.round(metrics.medianHomePrice * priceMultiplier),
        growth: Math.round(metrics.populationGrowth * growthMultiplier * 10) / 10,
        rent: Math.round(metrics.medianHomePrice * 0.004 * rentMultiplier * 100) / 100,
        score: Math.round(Math.random() * 30 + 70) // 70-100
      };
    });
  };
  // Generate housing type data
  const generateHousingTypeData = () => {
    return [{
      name: 'Single Family',
      value: 52
    }, {
      name: 'Condo',
      value: 24
    }, {
      name: 'Townhouse',
      value: 16
    }, {
      name: 'Multi-Family',
      value: 8
    }];
  };
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Format large numbers with commas
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };
  const historicalData = generateHistoricalData();
  const neighborhoodData = generateNeighborhoodData();
  const housingTypeData = generateHousingTypeData();
  // Colors for charts
  const COLORS = ['#3AB795', '#FECA57', '#FF6B6B', '#4B5563', '#9CA3AF'];
  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => <p key={index} className="text-sm" style={{
          color: entry.color
        }}>
              <span className="font-medium">{entry.name}: </span>
              {entry.name.toLowerCase().includes('price') || entry.name.toLowerCase().includes('income') ? formatCurrency(entry.value) : entry.name.toLowerCase().includes('growth') ? `${entry.value}%` : formatNumber(entry.value)}
            </p>)}
        </div>;
    }
    return null;
  };
  return <div className="space-y-6">
      {/* Add City Scorecard at the top */}
      <CityScorecard city={city} metrics={metrics} />
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Users size={18} className="text-emerald-500 mr-2" />
              <h3 className="text-sm font-medium">Population</h3>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp size={12} className="mr-1" />
              {metrics.populationGrowth}%
            </span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {formatNumber(metrics.population)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Annual growth rate compared to national avg of 0.9%
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <DollarSign size={18} className="text-primary mr-2" />
              <h3 className="text-sm font-medium">Median Income</h3>
            </div>
            <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
              vs National: +4.2%
            </span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {formatCurrency(metrics.medianIncome)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Per household annually</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Home size={18} className="text-primary mr-2" />
              <h3 className="text-sm font-medium">Median Home Price</h3>
            </div>
            <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp size={12} className="mr-1" />
              {metrics.rentGrowth}%
            </span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {formatCurrency(metrics.medianHomePrice)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Year-over-year appreciation
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <Briefcase size={18} className="text-primary mr-2" />
              <h3 className="text-sm font-medium">Job Growth</h3>
            </div>
            <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp size={12} className="mr-1" />
              {metrics.jobGrowth}%
            </span>
          </div>
          <p className="text-2xl font-bold mt-2">{metrics.jobGrowth}%</p>
          <p className="text-xs text-gray-500 mt-1">Annual job growth rate</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <MapPin size={18} className="text-primary mr-2" />
              <h3 className="text-sm font-medium">Affordability</h3>
            </div>
            <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
              {metrics.affordabilityIndex}/100
            </span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {metrics.affordabilityIndex}/100
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Higher is more affordable
          </p>
        </div>
      </div>
      {/* Historical Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium flex items-center">
              <Calendar size={18} className="text-primary mr-2" />
              Historical Trends
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Key metrics over time for {city}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 text-xs bg-primary text-white rounded-lg">
              Home Prices
            </button>
            <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
              Income
            </button>
            <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
              Rent
            </button>
            <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
              Population
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={value => `$${value / 1000}k`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={value => formatNumber(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="homePrice" name="Home Price" stroke="#3AB795" strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              <Line yAxisId="left" type="monotone" dataKey="income" name="Median Income" stroke="#FECA57" strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              <Line yAxisId="left" type="monotone" dataKey="rent" name="Monthly Rent" stroke="#FF6B6B" strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              <Line yAxisId="right" type="monotone" dataKey="population" name="Population" stroke="#4B5563" strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Neighborhood Comparison and Housing Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neighborhood Comparison */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 lg:col-span-2">
          <h3 className="font-medium flex items-center mb-4">
            <Layers size={18} className="text-primary mr-2" />
            Top Neighborhoods
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                  <th className="pb-2">Neighborhood</th>
                  <th className="pb-2">Median Price</th>
                  <th className="pb-2">Growth Rate</th>
                  <th className="pb-2">Avg. Rent</th>
                  <th className="pb-2">Investment Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {neighborhoodData.map((neighborhood, index) => <tr key={index} className="text-sm">
                    <td className="py-3 font-medium">{neighborhood.name}</td>
                    <td className="py-3">
                      {formatCurrency(neighborhood.price)}
                    </td>
                    <td className="py-3 flex items-center">
                      <TrendingUp size={14} className="text-primary mr-1" />
                      {neighborhood.growth}%
                    </td>
                    <td className="py-3">
                      {formatCurrency(neighborhood.rent)}/sqft
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                          <div className="h-2 bg-primary rounded-full" style={{
                        width: `${neighborhood.score}%`
                      }}></div>
                        </div>
                        <span>{neighborhood.score}</span>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {/* Housing Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <Home size={18} className="text-primary mr-2" />
            Housing Type Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={housingTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {housingTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {housingTypeData.map((type, index) => <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: COLORS[index % COLORS.length]
            }}></div>
                <span className="text-xs">
                  {type.name}: {type.value}%
                </span>
              </div>)}
          </div>
        </div>
      </div>
      {/* Risk Assessment */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <h3 className="font-medium flex items-center mb-4">
          <Shield size={18} className="text-primary mr-2" />
          City Risk Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Natural Disaster Risk</span>
                <span className="text-sm font-medium">Medium</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-tertiary rounded-full" style={{
                width: '60%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Economic Volatility</span>
                <span className="text-sm font-medium">Low</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{
                width: '30%'
              }}></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Crime Rate</span>
                <span className="text-sm font-medium">Moderate</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-tertiary rounded-full" style={{
                width: '50%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Market Volatility</span>
                <span className="text-sm font-medium">Low</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{
                width: '25%'
              }}></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Regulatory Environment</span>
                <span className="text-sm font-medium">Favorable</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{
                width: '80%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Population Stability</span>
                <span className="text-sm font-medium">High</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{
                width: '85%'
              }}></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Infrastructure Quality</span>
                <span className="text-sm font-medium">Good</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{
                width: '70%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Overall Risk Score</span>
                <span className="text-sm font-medium">Low</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{
                width: '25%'
              }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-tertiary bg-opacity-10 p-3 rounded-lg flex items-start">
          <AlertTriangle size={16} className="text-tertiary-dark mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-tertiary-dark">
              Risk Assessment Note
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {city} has a relatively low overall investment risk profile. The
              main risk factors to monitor are natural disaster potential
              (hurricanes) and localized crime rates in certain neighborhoods.
              The strong economic fundamentals and population growth help
              mitigate many investment risks.
            </p>
          </div>
        </div>
      </div>
    </div>;
};