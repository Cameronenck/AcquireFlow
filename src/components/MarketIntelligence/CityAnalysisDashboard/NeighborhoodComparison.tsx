import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Scatter, ScatterChart, ZAxis, Cell } from 'recharts';
import { Map, Filter, ChevronDown, Home, TrendingUp, DollarSign, Users, Clock, Building, ArrowUpRight, Check, X } from 'lucide-react';
interface NeighborhoodComparisonProps {
  city: string;
  timeframe: string;
  dataSource: string;
}
export const NeighborhoodComparison: React.FC<NeighborhoodComparisonProps> = ({
  city,
  timeframe,
  dataSource
}) => {
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<{
    priceRange: [number, number];
    investmentType: string;
    propertyTypes: string[];
  }>({
    priceRange: [200000, 800000],
    investmentType: 'all',
    propertyTypes: ['single-family', 'multi-family', 'condo']
  });
  const [comparisonMetric, setComparisonMetric] = useState<string>('price');
  const [showAllMetrics, setShowAllMetrics] = useState<boolean>(false);
  // Generate neighborhood data based on the city
  const generateNeighborhoodData = () => {
    let neighborhoods: string[] = [];
    if (city.includes('Orlando')) {
      neighborhoods = ['Lake Nona', 'Winter Park', 'Downtown', 'College Park', 'Baldwin Park', 'Thornton Park', 'Metrowest', 'Doctor Phillips', 'Avalon Park', 'Waterford Lakes'];
    } else if (city.includes('Miami')) {
      neighborhoods = ['Brickell', 'Wynwood', 'Coral Gables', 'Little Havana', 'Coconut Grove', 'Downtown', 'Edgewater', 'Miami Beach', 'Design District', 'Doral'];
    } else if (city.includes('Tampa')) {
      neighborhoods = ['Hyde Park', 'Channelside', 'Westshore', 'Seminole Heights', 'SoHo', 'Tampa Heights', 'Davis Island', 'Carrollwood', 'Brandon', 'Temple Terrace'];
    } else {
      neighborhoods = ['Downtown', 'Riverside', 'Southside', 'Northside', 'Westside', 'Arlington', 'Springfield', 'San Marco', 'Mandarin', 'Baymeadows'];
    }
    return neighborhoods.map(name => {
      // Generate random but reasonable values for each neighborhood
      const priceBase = city.includes('Miami') ? 550000 : city.includes('Orlando') ? 380000 : city.includes('Tampa') ? 420000 : 350000;
      const priceVariation = Math.random() * 0.5 + 0.75; // 0.75 to 1.25
      const price = Math.round(priceBase * priceVariation);
      return {
        name,
        price,
        pricePerSqft: Math.round(price / 1800),
        appreciation: Math.round((Math.random() * 4 + 2) * 10) / 10,
        rentGrowth: Math.round((Math.random() * 5 + 3) * 10) / 10,
        cashFlow: Math.round((Math.random() * 400 + 100) * 10) / 10,
        capRate: Math.round((Math.random() * 2 + 4) * 10) / 10,
        avgRent: Math.round(price * 0.005 * (Math.random() * 0.4 + 0.8)),
        daysOnMarket: Math.round(Math.random() * 30 + 15),
        inventory: Math.round(Math.random() * 50 + 20),
        schoolRating: Math.round(Math.random() * 4 + 6),
        crimeIndex: Math.round(Math.random() * 50 + 20),
        walkScore: Math.round(Math.random() * 60 + 30),
        transitScore: Math.round(Math.random() * 50 + 20),
        investmentScore: Math.round(Math.random() * 30 + 60),
        propertyTypes: {
          'single-family': Math.round(Math.random() * 60 + 20),
          'multi-family': Math.round(Math.random() * 30 + 5),
          condo: Math.round(Math.random() * 40 + 5),
          townhouse: Math.round(Math.random() * 20 + 5)
        }
      };
    });
  };
  // Generate data for neighborhood comparison
  const neighborhoodData = generateNeighborhoodData();
  // Filter neighborhoods based on criteria
  const filteredNeighborhoods = neighborhoodData.filter(n => n.price >= filterCriteria.priceRange[0] && n.price <= filterCriteria.priceRange[1] && (filterCriteria.investmentType === 'all' || filterCriteria.investmentType === 'cashflow' && n.capRate >= 5 || filterCriteria.investmentType === 'appreciation' && n.appreciation >= 4));
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Toggle neighborhood selection
  const toggleNeighborhood = (name: string) => {
    if (selectedNeighborhoods.includes(name)) {
      setSelectedNeighborhoods(prev => prev.filter(n => n !== name));
    } else {
      setSelectedNeighborhoods(prev => [...prev, name]);
    }
  };
  // Colors for charts
  const COLORS = ['#3AB795', '#FECA57', '#FF6B6B', '#4B5563', '#9CA3AF'];
  // Prepare radar chart data
  const getRadarData = () => {
    if (selectedNeighborhoods.length === 0) return [];
    const metrics = [{
      name: 'Price (inverse)',
      key: 'price',
      inverse: true
    }, {
      name: 'Appreciation',
      key: 'appreciation'
    }, {
      name: 'Cap Rate',
      key: 'capRate'
    }, {
      name: 'School Rating',
      key: 'schoolRating'
    }, {
      name: 'Walk Score',
      key: 'walkScore'
    }, {
      name: 'Low Crime (inverse)',
      key: 'crimeIndex',
      inverse: true
    }];
    return metrics.map(metric => {
      const result: any = {
        metric: metric.name
      };
      selectedNeighborhoods.forEach(neighborhood => {
        const data = neighborhoodData.find(n => n.name === neighborhood);
        if (data) {
          // Normalize values to 0-100 scale
          let value = data[metric.key];
          // For price, normalize between min and max in the dataset
          if (metric.key === 'price') {
            const minPrice = Math.min(...neighborhoodData.map(n => n.price));
            const maxPrice = Math.max(...neighborhoodData.map(n => n.price));
            value = (value - minPrice) / (maxPrice - minPrice) * 100;
          } else if (metric.key === 'crimeIndex') {
            // For crime, normalize between min and max in the dataset
            const minCrime = Math.min(...neighborhoodData.map(n => n.crimeIndex));
            const maxCrime = Math.max(...neighborhoodData.map(n => n.crimeIndex));
            value = (value - minCrime) / (maxCrime - minCrime) * 100;
          } else if (metric.key === 'appreciation' || metric.key === 'capRate') {
            // For percentage values, multiply to get to 0-100 scale
            value = value * 10;
          } else if (metric.key === 'schoolRating') {
            // For 1-10 ratings, multiply by 10
            value = value * 10;
          }
          // Invert if needed (lower is better)
          if (metric.inverse) {
            value = 100 - value;
          }
          result[neighborhood] = Math.max(0, Math.min(100, value));
        }
      });
      return result;
    });
  };
  const radarData = getRadarData();
  // Prepare scatter plot data
  const getScatterData = () => {
    return neighborhoodData.map(n => ({
      name: n.name,
      price: n.price,
      appreciation: n.appreciation,
      capRate: n.capRate,
      investmentScore: n.investmentScore,
      selected: selectedNeighborhoods.includes(n.name)
    }));
  };
  const scatterData = getScatterData();
  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{payload[0]?.payload?.name || label}</p>
          {payload.map((entry: any, index: number) => <p key={index} className="text-sm" style={{
          color: entry.color
        }}>
              <span className="font-medium">{entry.name}: </span>
              {entry.name.toLowerCase().includes('price') ? formatCurrency(entry.value) : entry.name.toLowerCase().includes('rate') || entry.name.toLowerCase().includes('appreciation') ? `${entry.value}%` : entry.value}
            </p>)}
        </div>;
    }
    return null;
  };
  return <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium flex items-center">
            <Filter size={18} className="text-primary mr-2" />
            Neighborhood Filters
          </h3>
          <button className="text-xs text-primary">Reset Filters</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {formatCurrency(filterCriteria.priceRange[0])}
              </span>
              <input type="range" min="100000" max="2000000" step="10000" className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" value={filterCriteria.priceRange[0]} onChange={e => setFilterCriteria(prev => ({
              ...prev,
              priceRange: [parseInt(e.target.value), prev.priceRange[1]]
            }))} />
              <span className="text-sm">
                {formatCurrency(filterCriteria.priceRange[1])}
              </span>
              <input type="range" min="100000" max="2000000" step="10000" className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" value={filterCriteria.priceRange[1]} onChange={e => setFilterCriteria(prev => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value)]
            }))} />
            </div>
          </div>
          {/* Investment Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Strategy
            </label>
            <div className="flex space-x-2">
              <button className={`flex-1 px-3 py-1.5 text-xs rounded-lg ${filterCriteria.investmentType === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setFilterCriteria(prev => ({
              ...prev,
              investmentType: 'all'
            }))}>
                All Types
              </button>
              <button className={`flex-1 px-3 py-1.5 text-xs rounded-lg ${filterCriteria.investmentType === 'cashflow' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setFilterCriteria(prev => ({
              ...prev,
              investmentType: 'cashflow'
            }))}>
                Cash Flow
              </button>
              <button className={`flex-1 px-3 py-1.5 text-xs rounded-lg ${filterCriteria.investmentType === 'appreciation' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setFilterCriteria(prev => ({
              ...prev,
              investmentType: 'appreciation'
            }))}>
                Appreciation
              </button>
            </div>
          </div>
          {/* Property Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Types
            </label>
            <div className="flex flex-wrap gap-2">
              {['single-family', 'multi-family', 'condo', 'townhouse'].map(type => <button key={type} className={`px-3 py-1.5 text-xs rounded-lg ${filterCriteria.propertyTypes.includes(type) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setFilterCriteria(prev => ({
              ...prev,
              propertyTypes: prev.propertyTypes.includes(type) ? prev.propertyTypes.filter(t => t !== type) : [...prev.propertyTypes, type]
            }))}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>)}
            </div>
          </div>
        </div>
      </div>
      {/* Neighborhood Selection and Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neighborhood Selection */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <Map size={18} className="text-primary mr-2" />
            Select Neighborhoods to Compare
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {filteredNeighborhoods.map((neighborhood, index) => <div key={index} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedNeighborhoods.includes(neighborhood.name) ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary hover:bg-primary hover:bg-opacity-5'}`} onClick={() => toggleNeighborhood(neighborhood.name)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{neighborhood.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(neighborhood.price)} •{' '}
                      {neighborhood.appreciation}% appreciation
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedNeighborhoods.includes(neighborhood.name) ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                    {selectedNeighborhoods.includes(neighborhood.name) && <Check size={12} />}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-xs">
                    <span className="text-gray-500">Cap Rate:</span>
                    <span className="ml-1 font-medium">
                      {neighborhood.capRate}%
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">DOM:</span>
                    <span className="ml-1 font-medium">
                      {neighborhood.daysOnMarket} days
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">Score:</span>
                    <span className="ml-1 font-medium">
                      {neighborhood.investmentScore}/100
                    </span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        {/* Comparison Charts */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium flex items-center">
              <BarChart size={18} className="text-primary mr-2" />
              Neighborhood Comparison
            </h3>
            <div className="flex space-x-2">
              <button className={`px-3 py-1.5 text-xs rounded-lg ${comparisonMetric === 'price' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setComparisonMetric('price')}>
                Price
              </button>
              <button className={`px-3 py-1.5 text-xs rounded-lg ${comparisonMetric === 'appreciation' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setComparisonMetric('appreciation')}>
                Appreciation
              </button>
              <button className={`px-3 py-1.5 text-xs rounded-lg ${comparisonMetric === 'capRate' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setComparisonMetric('capRate')}>
                Cap Rate
              </button>
              <button className={`px-3 py-1.5 text-xs rounded-lg ${showAllMetrics ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setShowAllMetrics(!showAllMetrics)}>
                All Metrics
              </button>
            </div>
          </div>
          {selectedNeighborhoods.length === 0 ? <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <Map size={48} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">Select neighborhoods to compare</p>
              </div>
            </div> : showAllMetrics ?
        // Radar Chart for all metrics
        <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  {selectedNeighborhoods.map((neighborhood, index) => <Radar key={neighborhood} name={neighborhood} dataKey={neighborhood} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} fillOpacity={0.2} />)}
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div> :
        // Bar Chart for single metric comparison
        <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedNeighborhoods.map(name => {
              const data = neighborhoodData.find(n => n.name === name);
              return {
                name,
                value: data ? data[comparisonMetric] : 0
              };
            })} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={comparisonMetric === 'price' ? value => `$${(value / 1000).toFixed(0)}k` : value => `${value}${comparisonMetric === 'appreciation' || comparisonMetric === 'capRate' ? '%' : ''}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" name={comparisonMetric === 'price' ? 'Median Price' : comparisonMetric === 'appreciation' ? 'Appreciation Rate' : 'Cap Rate'} fill="#3AB795">
                    {selectedNeighborhoods.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>}
          {/* Investment Opportunity Map */}
          <div className="mt-6">
            <h3 className="font-medium flex items-center mb-4">
              <TrendingUp size={18} className="text-primary mr-2" />
              Investment Opportunity Map
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="capRate" name="Cap Rate" unit="%" domain={[3, 7]} label={{
                  value: 'Cap Rate (%)',
                  position: 'bottom',
                  offset: 0
                }} />
                  <YAxis type="number" dataKey="appreciation" name="Appreciation" unit="%" domain={[1, 7]} label={{
                  value: 'Appreciation (%)',
                  angle: -90,
                  position: 'insideLeft'
                }} />
                  <ZAxis type="number" dataKey="price" range={[50, 400]} name="Price" />
                  <Tooltip cursor={{
                  strokeDasharray: '3 3'
                }} formatter={(value, name) => {
                  if (name === 'Price') return formatCurrency(value as number);
                  return `${value}%`;
                }} />
                  <Legend />
                  <Scatter name="Neighborhoods" data={scatterData} fill="#8884d8">
                    {scatterData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.selected ? COLORS[selectedNeighborhoods.indexOf(entry.name) % COLORS.length] : '#d1d5db'} stroke={entry.selected ? COLORS[selectedNeighborhoods.indexOf(entry.name) % COLORS.length] : '#9ca3af'} />)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Bubble size represents relative property price. Position shows the
              balance between cash flow (cap rate) and appreciation potential.
            </div>
          </div>
        </div>
      </div>
      {/* Detailed Comparison Table (visible when neighborhoods are selected) */}
      {selectedNeighborhoods.length > 0 && <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <Home size={18} className="text-primary mr-2" />
            Detailed Neighborhood Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                  <th className="pb-2 font-medium">Metric</th>
                  {selectedNeighborhoods.map((name, index) => <th key={index} className="pb-2 font-medium">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: COLORS[index % COLORS.length]
                  }}></div>
                        {name}
                      </div>
                    </th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <Home size={14} className="mr-2 text-gray-400" />
                    Median Home Price
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? formatCurrency(data.price) : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <DollarSign size={14} className="mr-2 text-gray-400" />
                    Price Per Sq Ft
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `$${data.pricePerSqft}` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-2 text-gray-400" />
                    Appreciation (Yearly)
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `${data.appreciation}%` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <DollarSign size={14} className="mr-2 text-gray-400" />
                    Average Monthly Rent
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? formatCurrency(data.avgRent) : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-2 text-gray-400" />
                    Rent Growth (Yearly)
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `${data.rentGrowth}%` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <DollarSign size={14} className="mr-2 text-gray-400" />
                    Cash Flow (Monthly)
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? formatCurrency(data.cashFlow) : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <DollarSign size={14} className="mr-2 text-gray-400" />
                    Cap Rate
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `${data.capRate}%` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <Clock size={14} className="mr-2 text-gray-400" />
                    Days on Market
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `${data.daysOnMarket} days` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <Building size={14} className="mr-2 text-gray-400" />
                    Property Inventory
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? data.inventory : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <Users size={14} className="mr-2 text-gray-400" />
                    School Rating
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `${data.schoolRating}/10` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <Map size={14} className="mr-2 text-gray-400" />
                    Walk Score
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm">
                        {data ? `${data.walkScore}/100` : 'N/A'}
                      </td>;
              })}
                </tr>
                <tr>
                  <td className="py-3 text-sm font-medium flex items-center">
                    <TrendingUp size={14} className="mr-2 text-gray-400" />
                    Investment Score
                  </td>
                  {selectedNeighborhoods.map((name, index) => {
                const data = neighborhoodData.find(n => n.name === name);
                return <td key={index} className="py-3 text-sm font-medium">
                        {data ? `${data.investmentScore}/100` : 'N/A'}
                      </td>;
              })}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg flex items-center">
              Generate Detailed Report
              <ArrowUpRight size={16} className="ml-1.5" />
            </button>
          </div>
        </div>}
    </div>;
};