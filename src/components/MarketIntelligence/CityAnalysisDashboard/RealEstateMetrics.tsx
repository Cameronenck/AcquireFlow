import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area, AreaChart } from 'recharts';
import { Building, ChevronDown, Download, Filter, Home, Info, LineChart as LineChartIcon, BarChart as BarChartIcon, PieChart as PieChartIcon, Calendar, TrendingUp, TrendingDown, DollarSign, Clock, Percent, RefreshCw, ArrowUpRight, Layers, Search, CheckCircle, AlertCircle, Zap } from 'lucide-react';
interface RealEstateMetricsProps {
  city: string;
  timeframe: string;
  dataSource: string;
  comparisonCity?: string;
}
export const RealEstateMetrics: React.FC<RealEstateMetricsProps> = ({
  city,
  timeframe,
  dataSource,
  comparisonCity
}) => {
  const [propertyType, setPropertyType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [chartView, setChartView] = useState<string>('price');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('all');
  // Generate real estate data based on city
  const generateRealEstateData = (cityName: string) => {
    // Seed some randomness based on city name to get consistent but different data
    const cityHash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomSeed = cityHash / 1000;
    // Base price varies by city
    const basePrice = cityName.includes('Miami') ? 550000 : cityName.includes('Orlando') ? 380000 : cityName.includes('Tampa') ? 420000 : 350000;
    // Price trend data (monthly for the past year)
    const priceTrendData = [];
    let currentPrice = basePrice * 0.9; // Start 10% lower than current
    for (let i = 0; i < 12; i++) {
      const month = new Date(2023, i, 1);
      // Add some realistic volatility and seasonal patterns
      const seasonalFactor = 1 + Math.sin(i / 12 * Math.PI * 2) * 0.01; // Slight seasonal pattern
      const randomFactor = 1 + (Math.random() - 0.5) * 0.01; // Small random variations
      const growthFactor = 1 + (0.005 + randomSeed % 0.005); // Base monthly growth rate
      currentPrice = currentPrice * growthFactor * seasonalFactor * randomFactor;
      priceTrendData.push({
        month: month.toLocaleString('default', {
          month: 'short'
        }),
        price: Math.round(currentPrice),
        inventory: Math.round(1500 + Math.sin(i / 12 * Math.PI * 2) * 300 + randomSeed * 200),
        daysOnMarket: Math.round(25 + Math.sin(i / 12 * Math.PI * 2) * 10 + randomSeed * 5),
        salesVolume: Math.round(200 + Math.sin(i / 12 * Math.PI * 2) * 50 + randomSeed * 30)
      });
    }
    // Property type distribution
    const propertyTypeData = [{
      name: 'Single Family',
      value: Math.round(55 + randomSeed % 10),
      color: '#3AB795'
    }, {
      name: 'Condo',
      value: Math.round(25 + randomSeed % 10),
      color: '#FECA57'
    }, {
      name: 'Townhouse',
      value: Math.round(12 + randomSeed % 5),
      color: '#FF6B6B'
    }, {
      name: 'Multi-Family',
      value: Math.round(8 + randomSeed % 5),
      color: '#4B5563'
    }];
    // Price range distribution
    const priceRangeData = [{
      name: 'Under $250K',
      value: Math.round(15 + randomSeed % 10),
      color: '#3AB795'
    }, {
      name: '$250K-$500K',
      value: Math.round(35 + randomSeed % 10),
      color: '#FECA57'
    }, {
      name: '$500K-$750K',
      value: Math.round(25 + randomSeed % 10),
      color: '#FF6B6B'
    }, {
      name: '$750K-$1M',
      value: Math.round(15 + randomSeed % 5),
      color: '#4B5563'
    }, {
      name: 'Over $1M',
      value: Math.round(10 + randomSeed % 5),
      color: '#9CA3AF'
    }];
    // Generate neighborhoods based on city
    const neighborhoods = cityName.includes('Orlando') ? ['Lake Nona', 'Winter Park', 'Downtown', 'College Park', 'Baldwin Park'] : cityName.includes('Miami') ? ['Brickell', 'Wynwood', 'Coral Gables', 'Little Havana', 'Coconut Grove'] : cityName.includes('Tampa') ? ['Hyde Park', 'Channelside', 'Westshore', 'Seminole Heights', 'Davis Islands'] : ['Downtown', 'Riverside', 'Southside', 'Northside', 'Westside'];
    // Neighborhood data
    const neighborhoodData = neighborhoods.map(name => {
      // Price multiplier varies by neighborhood
      const priceMultiplier = 0.8 + Math.random() * 0.6; // 0.8 to 1.4
      return {
        name,
        medianPrice: Math.round(basePrice * priceMultiplier),
        priceChange: Math.round((2 + Math.random() * 6) * 10) / 10,
        inventory: Math.round(100 + Math.random() * 300),
        daysOnMarket: Math.round(15 + Math.random() * 20),
        pricePerSqFt: Math.round(basePrice * priceMultiplier / 1800),
        salesVolume: Math.round(20 + Math.random() * 50)
      };
    });
    // Price to rent ratio by property type
    const priceToRentData = [{
      name: 'Single Family',
      ratio: Math.round(18 + randomSeed % 4 * 10) / 10,
      color: '#3AB795'
    }, {
      name: 'Condo',
      ratio: Math.round(16 + randomSeed % 4 * 10) / 10,
      color: '#FECA57'
    }, {
      name: 'Townhouse',
      ratio: Math.round(17 + randomSeed % 3 * 10) / 10,
      color: '#FF6B6B'
    }, {
      name: 'Multi-Family',
      ratio: Math.round(14 + randomSeed % 3 * 10) / 10,
      color: '#4B5563'
    }];
    // Calculate metrics
    const medianPrice = priceTrendData[priceTrendData.length - 1].price;
    const priceChange = (priceTrendData[priceTrendData.length - 1].price / priceTrendData[0].price - 1) * 100;
    const averageDaysOnMarket = priceTrendData[priceTrendData.length - 1].daysOnMarket;
    const inventory = priceTrendData[priceTrendData.length - 1].inventory;
    const salesVolume = priceTrendData[priceTrendData.length - 1].salesVolume;
    const medianPricePerSqFt = Math.round(medianPrice / 1800);
    const medianRent = Math.round(medianPrice * 0.005); // Monthly rent approx 0.5% of property value
    const priceToRentRatio = Math.round(medianPrice / (medianRent * 12) * 10) / 10;
    const affordabilityIndex = Math.round(70 - medianPrice / 10000); // Lower price = higher affordability
    const monthsOfInventory = Math.round(inventory / salesVolume * 10) / 10;
    const listToSaleRatio = Math.round(95 + randomSeed % 5);
    // Supply and demand index (0-100)
    const supplyDemandIndex = Math.min(100, Math.max(0, Math.round(50 - monthsOfInventory * 5 + priceChange * 2)));
    // Market type
    const marketType = supplyDemandIndex > 70 ? "Strong Seller's Market" : supplyDemandIndex > 55 ? "Seller's Market" : supplyDemandIndex > 45 ? 'Balanced Market' : supplyDemandIndex > 30 ? "Buyer's Market" : "Strong Buyer's Market";
    return {
      priceTrendData,
      propertyTypeData,
      priceRangeData,
      neighborhoodData,
      priceToRentData,
      metrics: {
        medianPrice,
        priceChange,
        averageDaysOnMarket,
        inventory,
        salesVolume,
        medianPricePerSqFt,
        medianRent,
        priceToRentRatio,
        affordabilityIndex,
        monthsOfInventory,
        listToSaleRatio,
        supplyDemandIndex,
        marketType
      }
    };
  };
  const cityData = generateRealEstateData(city);
  const comparisonData = comparisonCity ? generateRealEstateData(comparisonCity) : null;
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
  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label || payload[0].name}</p>
          {payload.map((entry: any, index: number) => <p key={index} className="text-sm" style={{
          color: entry.color || entry.stroke
        }}>
              <span className="font-medium">{entry.name}: </span>
              {entry.name?.toLowerCase().includes('price') || entry.dataKey === 'price' ? formatCurrency(entry.value) : entry.name?.toLowerCase().includes('ratio') || entry.dataKey === 'ratio' ? `${entry.value}x` : `${entry.value}${entry.unit || ''}`}
            </p>)}
        </div>;
    }
    return null;
  };
  // Get color for comparative metrics
  const getComparisonColor = (value1: number, value2: number, inverse = false) => {
    if (value1 === value2) return 'text-gray-600';
    if (inverse) {
      return value1 < value2 ? 'text-emerald-600' : 'text-red-500';
    }
    return value1 > value2 ? 'text-emerald-600' : 'text-red-500';
  };
  return <div className="space-y-6">
      {/* Real Estate Market Overview */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Building size={18} className="mr-2 text-emerald-500" />
            Real Estate Market Overview
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={14} />
            </button>
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Median Price</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.medianPrice, comparisonData.metrics.medianPrice, true)}`}>
                  {cityData.metrics.medianPrice < comparisonData.metrics.medianPrice ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {formatCurrency(Math.abs(cityData.metrics.medianPrice - comparisonData.metrics.medianPrice))}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {formatCurrency(cityData.metrics.medianPrice)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span className={cityData.metrics.priceChange >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                {cityData.metrics.priceChange >= 0 ? '+' : ''}
                {cityData.metrics.priceChange.toFixed(1)}%
              </span>{' '}
              year-over-year
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Days on Market</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.averageDaysOnMarket, comparisonData.metrics.averageDaysOnMarket, true)}`}>
                  {cityData.metrics.averageDaysOnMarket < comparisonData.metrics.averageDaysOnMarket ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.averageDaysOnMarket - comparisonData.metrics.averageDaysOnMarket)}{' '}
                  days
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.averageDaysOnMarket} days
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Average time to sell
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Inventory</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.inventory, comparisonData.metrics.inventory)}`}>
                  {cityData.metrics.inventory > comparisonData.metrics.inventory ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {formatNumber(Math.abs(cityData.metrics.inventory - comparisonData.metrics.inventory))}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {formatNumber(cityData.metrics.inventory)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Active listings</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Market Type</div>
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.marketType}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Supply-demand index: {cityData.metrics.supplyDemandIndex}/100
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Price Per Sq Ft</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.medianPricePerSqFt, comparisonData.metrics.medianPricePerSqFt, true)}`}>
                  {cityData.metrics.medianPricePerSqFt < comparisonData.metrics.medianPricePerSqFt ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  $
                  {Math.abs(cityData.metrics.medianPricePerSqFt - comparisonData.metrics.medianPricePerSqFt)}
                </div>}
            </div>
            <div className="text-xl font-bold">
              ${cityData.metrics.medianPricePerSqFt}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Median price per square foot
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">
                Months of Inventory
              </div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.monthsOfInventory, comparisonData.metrics.monthsOfInventory, true)}`}>
                  {cityData.metrics.monthsOfInventory < comparisonData.metrics.monthsOfInventory ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.monthsOfInventory - comparisonData.metrics.monthsOfInventory).toFixed(1)}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.monthsOfInventory}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Supply at current sales pace
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Median Rent</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.medianRent, comparisonData.metrics.medianRent, true)}`}>
                  {cityData.metrics.medianRent < comparisonData.metrics.medianRent ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  $
                  {Math.abs(cityData.metrics.medianRent - comparisonData.metrics.medianRent)}
                </div>}
            </div>
            <div className="text-xl font-bold">
              ${cityData.metrics.medianRent}
            </div>
            <div className="text-xs text-gray-500 mt-1">Monthly rent</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">
                Price-to-Rent Ratio
              </div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.priceToRentRatio, comparisonData.metrics.priceToRentRatio, true)}`}>
                  {cityData.metrics.priceToRentRatio < comparisonData.metrics.priceToRentRatio ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.priceToRentRatio - comparisonData.metrics.priceToRentRatio).toFixed(1)}
                  x
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.priceToRentRatio}x
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Price to annual rent
            </div>
          </div>
        </div>
        {comparisonData && <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-medium flex items-center">
              <LineChartIcon size={16} className="mr-1.5 text-emerald-500" />
              Comparison: {city} vs. {comparisonCity}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {city} has a{' '}
              {cityData.metrics.medianPrice > comparisonData.metrics.medianPrice ? 'higher' : 'lower'}{' '}
              median home price ($
              {Math.abs(cityData.metrics.medianPrice - comparisonData.metrics.medianPrice).toLocaleString()}{' '}
              {cityData.metrics.medianPrice > comparisonData.metrics.medianPrice ? 'more' : 'less'}
              ),
              {cityData.metrics.averageDaysOnMarket < comparisonData.metrics.averageDaysOnMarket ? ' faster' : ' slower'}{' '}
              sales cycle (
              {Math.abs(cityData.metrics.averageDaysOnMarket - comparisonData.metrics.averageDaysOnMarket)}{' '}
              days{' '}
              {cityData.metrics.averageDaysOnMarket < comparisonData.metrics.averageDaysOnMarket ? 'faster' : 'slower'}
              ), and
              {cityData.metrics.monthsOfInventory < comparisonData.metrics.monthsOfInventory ? ' lower' : ' higher'}{' '}
              months of inventory (
              {Math.abs(cityData.metrics.monthsOfInventory - comparisonData.metrics.monthsOfInventory).toFixed(1)}{' '}
              months{' '}
              {cityData.metrics.monthsOfInventory < comparisonData.metrics.monthsOfInventory ? 'less' : 'more'}
              ).
              {cityData.metrics.supplyDemandIndex > comparisonData.metrics.supplyDemandIndex ? " Overall, it has a stronger seller's market." : " Overall, it has a weaker seller's market."}
            </p>
          </div>}
      </div>
      {/* Market Trends */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <LineChartIcon size={18} className="mr-2 text-emerald-500" />
            Market Trends
          </h3>
          <div className="flex flex-wrap gap-2">
            <button className={`px-3 py-1.5 text-xs rounded-lg ${chartView === 'price' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setChartView('price')}>
              Price
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${chartView === 'inventory' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setChartView('inventory')}>
              Inventory
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${chartView === 'dom' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setChartView('dom')}>
              Days on Market
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${chartView === 'sales' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setChartView('sales')}>
              Sales Volume
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${chartView === 'combined' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setChartView('combined')}>
              Combined
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'combined' ? <ComposedChart data={cityData.priceTrendData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" tickFormatter={value => `$${(value / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="price" name={`${city} Price`} stroke="#3AB795" strokeWidth={2} dot={false} />
                <Bar yAxisId="right" dataKey="inventory" name={`${city} Inventory`} fill="#FECA57" barSize={10} />
                <Line yAxisId="right" type="monotone" dataKey="daysOnMarket" name={`${city} Days on Market`} stroke="#FF6B6B" strokeWidth={2} dot={false} />
                {comparisonData && <>
                    <Line yAxisId="left" type="monotone" dataKey="price" name={`${comparisonCity} Price`} stroke="#4B5563" strokeWidth={2} dot={false} data={comparisonData.priceTrendData} />
                    <Bar yAxisId="right" dataKey="inventory" name={`${comparisonCity} Inventory`} fill="#9CA3AF" barSize={10} data={comparisonData.priceTrendData} />
                  </>}
              </ComposedChart> : chartView === 'price' ? <LineChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" allowDuplicatedCategory={false} />
                <YAxis tickFormatter={value => `$${(value / 1000).toFixed(0)}K`} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line data={cityData.priceTrendData} type="monotone" dataKey="price" name={`${city} Median Price`} stroke="#3AB795" strokeWidth={2} dot={false} activeDot={{
              r: 6
            }} />
                {comparisonData && <Line data={comparisonData.priceTrendData} type="monotone" dataKey="price" name={`${comparisonCity} Median Price`} stroke="#FF6B6B" strokeWidth={2} dot={false} activeDot={{
              r: 6
            }} />}
              </LineChart> : chartView === 'inventory' ? <AreaChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" allowDuplicatedCategory={false} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area data={cityData.priceTrendData} type="monotone" dataKey="inventory" name={`${city} Inventory`} stroke="#3AB795" fill="#3AB795" fillOpacity={0.3} />
                {comparisonData && <Area data={comparisonData.priceTrendData} type="monotone" dataKey="inventory" name={`${comparisonCity} Inventory`} stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.3} />}
              </AreaChart> : chartView === 'dom' ? <LineChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" allowDuplicatedCategory={false} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line data={cityData.priceTrendData} type="monotone" dataKey="daysOnMarket" name={`${city} Days on Market`} stroke="#3AB795" strokeWidth={2} />
                {comparisonData && <Line data={comparisonData.priceTrendData} type="monotone" dataKey="daysOnMarket" name={`${comparisonCity} Days on Market`} stroke="#FF6B6B" strokeWidth={2} />}
              </LineChart> : <BarChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" allowDuplicatedCategory={false} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar data={cityData.priceTrendData} dataKey="salesVolume" name={`${city} Sales Volume`} fill="#3AB795" />
                {comparisonData && <Bar data={comparisonData.priceTrendData} dataKey="salesVolume" name={`${comparisonCity} Sales Volume`} fill="#FF6B6B" />}
              </BarChart>}
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Price Trend Analysis</h4>
            <div className="text-sm text-gray-600 mt-2">
              {cityData.metrics.priceChange > 5 ? `Strong price appreciation of ${cityData.metrics.priceChange.toFixed(1)}% over the past year indicates high demand.` : cityData.metrics.priceChange > 2 ? `Moderate price growth of ${cityData.metrics.priceChange.toFixed(1)}% shows a healthy market.` : cityData.metrics.priceChange > 0 ? `Modest price increase of ${cityData.metrics.priceChange.toFixed(1)}% suggests a stabilizing market.` : `Price decrease of ${Math.abs(cityData.metrics.priceChange).toFixed(1)}% indicates a market correction.`}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Inventory Trend</h4>
            <div className="text-sm text-gray-600 mt-2">
              {cityData.metrics.monthsOfInventory < 3 ? "Low inventory levels (under 3 months) indicate a strong seller's market with competition among buyers." : cityData.metrics.monthsOfInventory < 6 ? 'Balanced inventory levels (3-6 months) suggest a healthy market equilibrium.' : 'High inventory levels (over 6 months) favor buyers with more options and negotiating power.'}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Market Velocity</h4>
            <div className="text-sm text-gray-600 mt-2">
              {cityData.metrics.averageDaysOnMarket < 20 ? 'Properties are selling extremely quickly, often with multiple offers.' : cityData.metrics.averageDaysOnMarket < 30 ? 'Homes are selling at a healthy pace, indicating strong buyer demand.' : cityData.metrics.averageDaysOnMarket < 45 ? 'Average time on market suggests a balanced pace of sales.' : 'Longer selling times indicate buyers have more negotiating power.'}
            </div>
          </div>
        </div>
      </div>
      {/* Property Type & Price Range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium flex items-center">
              <Home size={18} className="mr-2 text-emerald-500" />
              Property Type Distribution
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                <Download size={14} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={cityData.propertyTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                  name,
                  percent
                }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {cityData.propertyTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">
                Property Type Insights
              </h4>
              <div className="space-y-2">
                {cityData.propertyTypeData.map((type, index) => <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: type.color
                  }}></div>
                      <span className="text-sm">{type.name}</span>
                    </div>
                    <div className="text-sm font-medium">{type.value}%</div>
                  </div>)}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium mb-2">
                  Property Type Analysis
                </h4>
                <p className="text-xs text-gray-600">
                  {cityData.propertyTypeData[0].value > 50 ? 'Single-family homes dominate the market, reflecting suburban character.' : 'The market has a diverse mix of property types, offering various investment options.'}
                  {cityData.propertyTypeData[1].value > 25 ? ' Condos represent a significant portion, appealing to investors and first-time buyers.' : ''}
                  {cityData.propertyTypeData[3].value > 10 ? ' The higher percentage of multi-family properties suggests good rental investment opportunities.' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Price Range Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium flex items-center">
              <DollarSign size={18} className="mr-2 text-emerald-500" />
              Price Range Distribution
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
                <Download size={14} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData.priceRangeData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={value => `${value}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name={`${city} Distribution`} fill="#3AB795">
                  {cityData.priceRangeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
                {comparisonData && <Bar dataKey="value" name={`${comparisonCity} Distribution`} fill="#FF6B6B" data={comparisonData.priceRangeData} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">
              Price Distribution Analysis
            </h4>
            <p className="text-sm text-gray-600">
              {cityData.priceRangeData[0].value + cityData.priceRangeData[1].value > 60 ? 'The market is dominated by affordable to mid-range properties, offering good entry points for investors.' : cityData.priceRangeData[3].value + cityData.priceRangeData[4].value > 30 ? 'The market has a significant luxury segment, with a substantial portion of properties priced above $750K.' : 'The market has a balanced price distribution across different segments.'}
              {cityData.priceRangeData[2].value > 25 ? ' The mid-range market ($500K-$750K) is particularly strong, offering good value for investors.' : ''}
              {cityData.priceRangeData[4].value > 15 ? ' The luxury market (over $1M) represents a significant opportunity for high-end investments.' : ''}
            </p>
          </div>
        </div>
      </div>
      {/* Neighborhood Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Layers size={18} className="mr-2 text-emerald-500" />
            Neighborhood Comparison
          </h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input type="text" placeholder="Search neighborhoods..." className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
            </div>
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Filter size={14} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
                <th className="pb-2 font-medium">Neighborhood</th>
                <th className="pb-2 font-medium">Median Price</th>
                <th className="pb-2 font-medium">Price Change</th>
                <th className="pb-2 font-medium">Price/Sq Ft</th>
                <th className="pb-2 font-medium">Days on Market</th>
                <th className="pb-2 font-medium">Inventory</th>
                <th className="pb-2 font-medium">Sales Volume</th>
              </tr>
            </thead>
            <tbody>
              {cityData.neighborhoodData.map((neighborhood, index) => <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium">
                    {neighborhood.name}
                  </td>
                  <td className="py-3 text-sm">
                    {formatCurrency(neighborhood.medianPrice)}
                  </td>
                  <td className="py-3 text-sm">
                    <span className={neighborhood.priceChange >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                      {neighborhood.priceChange >= 0 ? '+' : ''}
                      {neighborhood.priceChange}%
                    </span>
                  </td>
                  <td className="py-3 text-sm">${neighborhood.pricePerSqFt}</td>
                  <td className="py-3 text-sm">
                    {neighborhood.daysOnMarket} days
                  </td>
                  <td className="py-3 text-sm">{neighborhood.inventory}</td>
                  <td className="py-3 text-sm">{neighborhood.salesVolume}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-emerald-700">
              Hottest Neighborhood
            </h4>
            {(() => {
            const hottest = [...cityData.neighborhoodData].sort((a, b) => b.priceChange - a.priceChange)[0];
            return <>
                  <div className="text-lg font-bold mt-1">{hottest.name}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {hottest.priceChange}% price growth • {hottest.daysOnMarket}{' '}
                    days on market
                  </div>
                </>;
          })()}
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Best Value Neighborhood</h4>
            {(() => {
            const bestValue = [...cityData.neighborhoodData].sort((a, b) => a.pricePerSqFt - b.pricePerSqFt)[0];
            return <>
                  <div className="text-lg font-bold mt-1">{bestValue.name}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    ${bestValue.pricePerSqFt}/sq ft •{' '}
                    {formatCurrency(bestValue.medianPrice)} median
                  </div>
                </>;
          })()}
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Most Active Market</h4>
            {(() => {
            const mostActive = [...cityData.neighborhoodData].sort((a, b) => b.salesVolume - a.salesVolume)[0];
            return <>
                  <div className="text-lg font-bold mt-1">
                    {mostActive.name}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {mostActive.salesVolume} monthly sales •{' '}
                    {mostActive.inventory} listings
                  </div>
                </>;
          })()}
          </div>
        </div>
      </div>
      {/* Price to Rent Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Percent size={18} className="mr-2 text-emerald-500" />
            Price to Rent Analysis
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData.priceToRentData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="ratio" name={`${city} Price-to-Rent Ratio`} fill="#3AB795">
                  {cityData.priceToRentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
                {comparisonData && <Bar dataKey="ratio" name={`${comparisonCity} Price-to-Rent Ratio`} fill="#FF6B6B" data={comparisonData.priceToRentData} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">
              Investment Strategy Analysis
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 p-1 bg-emerald-100 text-emerald-700 rounded">
                      <CheckCircle size={16} />
                    </div>
                    <span className="font-medium">Cash Flow Opportunities</span>
                  </div>
                  <div className="text-sm font-medium">
                    {cityData.metrics.priceToRentRatio < 15 ? 'Strong' : cityData.metrics.priceToRentRatio < 18 ? 'Moderate' : 'Limited'}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {cityData.metrics.priceToRentRatio < 15 ? 'Price-to-rent ratio below 15 indicates strong cash flow potential. Rental income typically covers mortgage and expenses with positive cash flow.' : cityData.metrics.priceToRentRatio < 18 ? 'Moderate price-to-rent ratio (15-18) suggests balanced investment potential with modest cash flow opportunities.' : 'Higher price-to-rent ratio (18+) indicates properties are relatively expensive compared to rental income. Cash flow may be limited.'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 p-1 bg-emerald-100 text-emerald-700 rounded">
                      <TrendingUp size={16} />
                    </div>
                    <span className="font-medium">Appreciation Potential</span>
                  </div>
                  <div className="text-sm font-medium">
                    {cityData.metrics.priceChange > 5 ? 'Strong' : cityData.metrics.priceChange > 2 ? 'Moderate' : 'Limited'}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {cityData.metrics.priceChange > 5 ? 'Strong price appreciation of over 5% suggests good potential for equity growth. Market momentum favors appreciation-focused strategies.' : cityData.metrics.priceChange > 2 ? 'Moderate price growth indicates stable appreciation potential. Consider balanced investment strategies.' : 'Limited recent price growth suggests focusing on cash flow rather than appreciation in the short term.'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 p-1 bg-emerald-100 text-emerald-700 rounded">
                      <Home size={16} />
                    </div>
                    <span className="font-medium">Best Property Types</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {cityData.priceToRentData.sort((a, b) => a.ratio - b.ratio)[0].name}{' '}
                  properties offer the best price-to-rent ratio at{' '}
                  {cityData.priceToRentData.sort((a, b) => a.ratio - b.ratio)[0].ratio}
                  x, suggesting stronger cash flow potential.
                  {cityData.propertyTypeData[0].value > 50 ? ' Single-family homes dominate the market, providing more liquidity and broader buyer appeal.' : cityData.propertyTypeData[1].value > 25 ? ' Condos represent a significant market segment with potentially lower entry points and maintenance requirements.' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Investment Recommendations */}
      <div className="bg-emerald-500 text-white rounded-xl p-5">
        <h3 className="font-medium flex items-center mb-4">
          <Zap size={18} className="mr-2" />
          Investment Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Market Entry Strategy</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {cityData.metrics.marketType.includes('Seller') ? 'Act quickly when properties match your criteria; competition is high' : 'Take time to negotiate; buyer leverage is strong in this market'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {cityData.metrics.priceChange > 5 ? 'Consider buying sooner rather than later as strong price growth continues' : 'Focus on fundamentals rather than timing in this moderately appreciating market'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {cityData.metrics.listToSaleRatio > 98 ? 'Prepare to offer at or above asking price in competitive situations' : 'Room for negotiation exists with average sales at ' + cityData.metrics.listToSaleRatio + '% of list price'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Target Properties</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  Focus on{' '}
                  {cityData.priceToRentData.sort((a, b) => a.ratio - b.ratio)[0].name.toLowerCase()}{' '}
                  properties for best cash flow potential
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {(() => {
                  const bestValueNeighborhood = [...cityData.neighborhoodData].sort((a, b) => a.pricePerSqFt - b.pricePerSqFt)[0];
                  return `Target ${bestValueNeighborhood.name} for best value at $${bestValueNeighborhood.pricePerSqFt}/sq ft`;
                })()}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {(() => {
                  const hottestNeighborhood = [...cityData.neighborhoodData].sort((a, b) => b.priceChange - a.priceChange)[0];
                  return `Consider ${hottestNeighborhood.name} for strongest appreciation potential (${hottestNeighborhood.priceChange}%)`;
                })()}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Investment Strategy</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {cityData.metrics.priceToRentRatio < 15 && cityData.metrics.priceChange > 4 ? 'Balanced approach recommended: market offers both cash flow and appreciation' : cityData.metrics.priceToRentRatio < 15 ? 'Cash flow strategy recommended: favorable price-to-rent ratios' : 'Appreciation strategy recommended: focus on long-term equity growth'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {cityData.metrics.monthsOfInventory < 3 ? 'Move quickly on deals; prepare financing in advance for competitive edge' : 'Take time to thoroughly analyze properties; negotiation leverage exists'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <CheckCircle size={12} />
                </span>
                <span>
                  {cityData.metrics.affordabilityIndex < 60 ? 'Consider house hacking or multi-unit properties to offset higher entry costs' : 'Good affordability creates opportunities for various investment strategies'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-white bg-opacity-5 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Market Outlook</h4>
          <p className="text-sm">
            {city} is currently a {cityData.metrics.marketType.toLowerCase()}
            {cityData.metrics.priceChange > 4 ? ' with strong price appreciation' : cityData.metrics.priceChange > 2 ? ' with moderate price growth' : ' with stable prices'}
            .
            {cityData.metrics.monthsOfInventory < 3 ? ' Inventory remains constrained, creating competitive conditions for buyers.' : cityData.metrics.monthsOfInventory < 6 ? ' Inventory levels are balanced, creating healthy market conditions.' : ' Higher inventory levels favor buyers and create negotiating opportunities.'}
            {cityData.metrics.averageDaysOnMarket < 20 ? ' Properties are selling extremely quickly, often with multiple offers.' : cityData.metrics.averageDaysOnMarket < 30 ? ' Homes are selling at a healthy pace, indicating strong buyer demand.' : ' Longer selling times indicate buyers have more time to make decisions.'}
            {cityData.metrics.affordabilityIndex > 70 ? ' Strong affordability creates good investment conditions for various strategies.' : cityData.metrics.affordabilityIndex > 60 ? ' Moderate affordability requires careful analysis of investment opportunities.' : ' Lower affordability requires focusing on value-add opportunities and careful cash flow analysis.'}
          </p>
        </div>
      </div>
    </div>;
};