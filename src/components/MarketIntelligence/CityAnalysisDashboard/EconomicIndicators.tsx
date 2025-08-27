import React, { useState } from 'react';
import { Briefcase, Building, ChevronDown, Download, TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, LineChart as LineChartIcon, BarChart as BarChartIcon, Info, RefreshCw, Zap, Filter, Check, AlertCircle, Globe, Award, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';
interface EconomicIndicatorsProps {
  city: string;
  timeframe: string;
  dataSource: string;
  comparisonCity?: string;
}
export const EconomicIndicators: React.FC<EconomicIndicatorsProps> = ({
  city,
  timeframe,
  dataSource,
  comparisonCity
}) => {
  const [selectedIndicator, setSelectedIndicator] = useState<string>('employment');
  const [forecastPeriod, setForecastPeriod] = useState<string>('1y');
  // Generate economic data based on city
  const generateEconomicData = (cityName: string) => {
    // Seed some randomness based on city name to get consistent but different data
    const cityHash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomSeed = cityHash / 1000;
    // Employment growth data (5 years)
    const employmentData = [];
    let baseEmployment = 95 + randomSeed % 3; // Starting employment rate
    for (let i = 0; i < 5; i++) {
      const year = 2019 + i;
      // Add some realistic volatility including COVID impact in 2020
      let yearlyChange = 0;
      if (year === 2020) {
        // COVID impact
        yearlyChange = -4 - randomSeed % 2;
      } else if (year === 2021) {
        // Recovery
        yearlyChange = 2 + randomSeed % 2;
      } else {
        // Normal years
        yearlyChange = 0.5 + randomSeed % 1 - 0.5;
      }
      baseEmployment += yearlyChange;
      baseEmployment = Math.min(98, Math.max(90, baseEmployment)); // Keep within realistic bounds
      employmentData.push({
        year,
        rate: Math.round(baseEmployment * 10) / 10,
        change: Math.round(yearlyChange * 10) / 10
      });
    }
    // GDP growth data
    const gdpData = [];
    let baseGDP = 100; // Index value
    for (let i = 0; i < 5; i++) {
      const year = 2019 + i;
      // Add some realistic volatility including COVID impact in 2020
      let yearlyChange = 0;
      if (year === 2020) {
        // COVID impact
        yearlyChange = -3 - randomSeed % 3;
      } else if (year === 2021) {
        // Recovery
        yearlyChange = 5 + randomSeed % 2;
      } else {
        // Normal years
        yearlyChange = 2 + randomSeed % 2 - 1;
      }
      baseGDP = baseGDP * (1 + yearlyChange / 100);
      gdpData.push({
        year,
        gdp: Math.round(baseGDP * 10) / 10,
        change: yearlyChange
      });
    }
    // Industry sector distribution
    const industrySectorData = [{
      name: 'Healthcare',
      value: Math.round(15 + randomSeed % 10),
      color: '#3AB795',
      growth: Math.round((3 + randomSeed % 2) * 10) / 10
    }, {
      name: 'Technology',
      value: Math.round(8 + randomSeed % 15),
      color: '#FECA57',
      growth: Math.round((5 + randomSeed % 3) * 10) / 10
    }, {
      name: 'Finance',
      value: Math.round(10 + randomSeed % 8),
      color: '#FF6B6B',
      growth: Math.round((2 + randomSeed % 3) * 10) / 10
    }, {
      name: 'Retail',
      value: Math.round(12 + randomSeed % 5),
      color: '#4B5563',
      growth: Math.round((1 + randomSeed % 2) * 10) / 10
    }, {
      name: 'Hospitality',
      value: Math.round(10 + randomSeed % 10),
      color: '#9CA3AF',
      growth: Math.round((4 + randomSeed % 3 - 2) * 10) / 10
    }, {
      name: 'Education',
      value: Math.round(8 + randomSeed % 7),
      color: '#6366F1',
      growth: Math.round((1 + randomSeed % 2) * 10) / 10
    }, {
      name: 'Manufacturing',
      value: Math.round(7 + randomSeed % 8),
      color: '#EC4899',
      growth: Math.round((0 + randomSeed % 3 - 1) * 10) / 10
    }, {
      name: 'Construction',
      value: Math.round(7 + randomSeed % 5),
      color: '#F59E0B',
      growth: Math.round((2 + randomSeed % 4) * 10) / 10
    }, {
      name: 'Other',
      value: Math.round(15 + randomSeed % 5),
      color: '#10B981',
      growth: Math.round((1 + randomSeed % 2) * 10) / 10
    }];
    // Income and wage data
    const incomeData = [];
    let baseIncome = 55000 + randomSeed * 10000;
    for (let i = 0; i < 5; i++) {
      const year = 2019 + i;
      // Add some realistic volatility
      let yearlyChange = 0;
      if (year === 2020) {
        // COVID impact
        yearlyChange = 1 + randomSeed % 1;
      } else if (year === 2021) {
        // Recovery/inflation
        yearlyChange = 3 + randomSeed % 2;
      } else if (year === 2022) {
        // Inflation peak
        yearlyChange = 5 + randomSeed % 2;
      } else {
        // Normal years
        yearlyChange = 2 + randomSeed % 2;
      }
      baseIncome = baseIncome * (1 + yearlyChange / 100);
      incomeData.push({
        year,
        income: Math.round(baseIncome),
        change: Math.round(yearlyChange * 10) / 10
      });
    }
    // Unemployment rate
    const unemploymentData = [];
    let baseUnemployment = 3.5 + randomSeed % 1;
    for (let i = 0; i < 5; i++) {
      const year = 2019 + i;
      // Add some realistic volatility including COVID impact in 2020
      let yearlyChange = 0;
      if (year === 2020) {
        // COVID impact
        yearlyChange = 8 + randomSeed % 3;
      } else if (year === 2021) {
        // Recovery
        yearlyChange = -5 - randomSeed % 2;
      } else if (year === 2022) {
        // Continued recovery
        yearlyChange = -1 - randomSeed % 1;
      } else {
        // Normal years
        yearlyChange = randomSeed % 1 - 0.5;
      }
      baseUnemployment += yearlyChange;
      baseUnemployment = Math.max(3, Math.min(12, baseUnemployment)); // Keep within realistic bounds
      unemploymentData.push({
        year,
        rate: Math.round(baseUnemployment * 10) / 10,
        change: Math.round(yearlyChange * 10) / 10
      });
    }
    // Business growth data
    const businessGrowthData = [];
    let baseBusinesses = 100; // Index value
    for (let i = 0; i < 5; i++) {
      const year = 2019 + i;
      // Add some realistic volatility including COVID impact in 2020
      let yearlyChange = 0;
      if (year === 2020) {
        // COVID impact
        yearlyChange = -2 - randomSeed % 3;
      } else if (year === 2021) {
        // Recovery
        yearlyChange = 3 + randomSeed % 2;
      } else {
        // Normal years
        yearlyChange = 2 + randomSeed % 2 - 0.5;
      }
      baseBusinesses = baseBusinesses * (1 + yearlyChange / 100);
      businessGrowthData.push({
        year,
        businesses: Math.round(baseBusinesses * 10) / 10,
        change: Math.round(yearlyChange * 10) / 10
      });
    }
    // Economic forecasts
    const generateForecast = (baseValue: number, growthRate: number, volatility: number, years: number) => {
      const forecast = [];
      let value = baseValue;
      for (let i = 0; i < years; i++) {
        const year = 2024 + i;
        const yearlyChange = growthRate + Math.random() * volatility * 2 - volatility;
        value = value * (1 + yearlyChange / 100);
        forecast.push({
          year,
          value: Math.round(value * 10) / 10,
          change: Math.round(yearlyChange * 10) / 10
        });
      }
      return forecast;
    };
    // Calculate metrics
    const currentEmploymentRate = employmentData[employmentData.length - 1].rate;
    const employmentChange = employmentData[employmentData.length - 1].change;
    const currentGDP = gdpData[gdpData.length - 1].gdp;
    const gdpGrowth = gdpData[gdpData.length - 1].change;
    const currentIncome = incomeData[incomeData.length - 1].income;
    const incomeGrowth = incomeData[incomeData.length - 1].change;
    const currentUnemployment = unemploymentData[unemploymentData.length - 1].rate;
    const unemploymentChange = unemploymentData[unemploymentData.length - 1].change;
    const businessGrowthRate = businessGrowthData[businessGrowthData.length - 1].change;
    // Calculate economic diversity (higher is more diverse)
    const economicDiversity = 100 - Math.sqrt(industrySectorData.reduce((sum, sector) => sum + Math.pow(sector.value, 2), 0) / industrySectorData.length);
    // Calculate economic resilience (based on diversity and growth)
    const economicResilience = Math.round(economicDiversity * 0.5 + gdpGrowth * 5 + currentEmploymentRate * 0.3 - currentUnemployment * 2 + businessGrowthRate * 3);
    // Top growing sectors
    const topSectors = [...industrySectorData].sort((a, b) => b.growth - a.growth).slice(0, 3);
    // Economic forecast
    const gdpForecast = generateForecast(currentGDP, gdpGrowth, 1, 5);
    const employmentForecast = generateForecast(currentEmploymentRate, employmentChange, 0.5, 5);
    const incomeForecast = generateForecast(currentIncome, incomeGrowth, 1, 5);
    return {
      employmentData,
      gdpData,
      industrySectorData,
      incomeData,
      unemploymentData,
      businessGrowthData,
      gdpForecast,
      employmentForecast,
      incomeForecast,
      metrics: {
        currentEmploymentRate,
        employmentChange,
        currentGDP,
        gdpGrowth,
        currentIncome,
        incomeGrowth,
        currentUnemployment,
        unemploymentChange,
        businessGrowthRate,
        economicDiversity,
        economicResilience,
        topSectors
      }
    };
  };
  const cityData = generateEconomicData(city);
  const comparisonData = comparisonCity ? generateEconomicData(comparisonCity) : null;
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
          color: entry.color || entry.stroke || entry.fill
        }}>
              <span className="font-medium">{entry.name}: </span>
              {entry.name?.toLowerCase().includes('income') || entry.dataKey === 'income' ? formatCurrency(entry.value) : entry.name?.toLowerCase().includes('rate') || entry.dataKey === 'rate' || entry.dataKey === 'unemployment' ? `${entry.value}%` : entry.value}
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
  // Get active chart data based on selected indicator
  const getChartData = () => {
    switch (selectedIndicator) {
      case 'employment':
        return cityData.employmentData;
      case 'gdp':
        return cityData.gdpData;
      case 'income':
        return cityData.incomeData;
      case 'unemployment':
        return cityData.unemploymentData;
      case 'business':
        return cityData.businessGrowthData;
      default:
        return cityData.employmentData;
    }
  };
  // Get comparison chart data if available
  const getComparisonChartData = () => {
    if (!comparisonData) return null;
    switch (selectedIndicator) {
      case 'employment':
        return comparisonData.employmentData;
      case 'gdp':
        return comparisonData.gdpData;
      case 'income':
        return comparisonData.incomeData;
      case 'unemployment':
        return comparisonData.unemploymentData;
      case 'business':
        return comparisonData.businessGrowthData;
      default:
        return comparisonData.employmentData;
    }
  };
  // Get y-axis label and formatter based on indicator
  const getYAxisConfig = () => {
    switch (selectedIndicator) {
      case 'employment':
        return {
          label: 'Employment Rate (%)',
          formatter: (value: number) => `${value}%`
        };
      case 'gdp':
        return {
          label: 'GDP Index (2019=100)',
          formatter: (value: number) => value
        };
      case 'income':
        return {
          label: 'Median Income',
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}K`
        };
      case 'unemployment':
        return {
          label: 'Unemployment Rate (%)',
          formatter: (value: number) => `${value}%`
        };
      case 'business':
        return {
          label: 'Business Growth Index',
          formatter: (value: number) => value
        };
      default:
        return {
          label: 'Value',
          formatter: (value: number) => value
        };
    }
  };
  // Get data key for selected indicator
  const getDataKey = () => {
    switch (selectedIndicator) {
      case 'employment':
        return 'rate';
      case 'gdp':
        return 'gdp';
      case 'income':
        return 'income';
      case 'unemployment':
        return 'rate';
      case 'business':
        return 'businesses';
      default:
        return 'value';
    }
  };
  // Get forecast data based on selected indicator and period
  const getForecastData = () => {
    const years = forecastPeriod === '1y' ? 1 : forecastPeriod === '3y' ? 3 : 5;
    switch (selectedIndicator) {
      case 'employment':
        return cityData.employmentForecast.slice(0, years);
      case 'gdp':
        return cityData.gdpForecast.slice(0, years);
      case 'income':
        return cityData.incomeForecast.slice(0, years);
      default:
        return cityData.gdpForecast.slice(0, years);
    }
  };
  return <div className="space-y-6">
      {/* Economic Health Overview */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Briefcase size={18} className="mr-2 text-emerald-500" />
            Economic Health Overview
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
              <div className="text-sm text-gray-500 mb-1">Employment Rate</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.currentEmploymentRate, comparisonData.metrics.currentEmploymentRate)}`}>
                  {cityData.metrics.currentEmploymentRate > comparisonData.metrics.currentEmploymentRate ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.currentEmploymentRate - comparisonData.metrics.currentEmploymentRate).toFixed(1)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.currentEmploymentRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span className={cityData.metrics.employmentChange >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                {cityData.metrics.employmentChange >= 0 ? '+' : ''}
                {cityData.metrics.employmentChange}%
              </span>{' '}
              year-over-year
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Unemployment</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.currentUnemployment, comparisonData.metrics.currentUnemployment, true)}`}>
                  {cityData.metrics.currentUnemployment < comparisonData.metrics.currentUnemployment ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.currentUnemployment - comparisonData.metrics.currentUnemployment).toFixed(1)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.currentUnemployment}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span className={cityData.metrics.unemploymentChange <= 0 ? 'text-emerald-600' : 'text-red-500'}>
                {cityData.metrics.unemploymentChange <= 0 ? '' : '+'}
                {cityData.metrics.unemploymentChange}%
              </span>{' '}
              year-over-year
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">GDP Growth</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.gdpGrowth, comparisonData.metrics.gdpGrowth)}`}>
                  {cityData.metrics.gdpGrowth > comparisonData.metrics.gdpGrowth ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.gdpGrowth - comparisonData.metrics.gdpGrowth).toFixed(1)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.gdpGrowth}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Annual growth rate</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Median Income</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.currentIncome, comparisonData.metrics.currentIncome)}`}>
                  {cityData.metrics.currentIncome > comparisonData.metrics.currentIncome ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {formatCurrency(Math.abs(cityData.metrics.currentIncome - comparisonData.metrics.currentIncome))}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {formatCurrency(cityData.metrics.currentIncome)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span className={cityData.metrics.incomeGrowth >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                {cityData.metrics.incomeGrowth >= 0 ? '+' : ''}
                {cityData.metrics.incomeGrowth}%
              </span>{' '}
              year-over-year
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Business Growth</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.businessGrowthRate, comparisonData.metrics.businessGrowthRate)}`}>
                  {cityData.metrics.businessGrowthRate > comparisonData.metrics.businessGrowthRate ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.businessGrowthRate - comparisonData.metrics.businessGrowthRate).toFixed(1)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.businessGrowthRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Annual new business formation
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">
                Economic Diversity
              </div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.economicDiversity, comparisonData.metrics.economicDiversity)}`}>
                  {cityData.metrics.economicDiversity > comparisonData.metrics.economicDiversity ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.economicDiversity - comparisonData.metrics.economicDiversity).toFixed(1)}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {Math.round(cityData.metrics.economicDiversity)}/100
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Industry diversification score
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">
                Top Growing Sector
              </div>
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.topSectors[0].name}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <span className="text-emerald-600">
                +{cityData.metrics.topSectors[0].growth}%
              </span>{' '}
              annual growth
            </div>
          </div>
          <div className="bg-emerald-500 text-white rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm mb-1">Economic Resilience</div>
              {comparisonData && <div className="text-xs flex items-center">
                  {cityData.metrics.economicResilience > comparisonData.metrics.economicResilience ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.economicResilience - comparisonData.metrics.economicResilience)}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.economicResilience}/100
            </div>
            <div className="text-xs text-white text-opacity-90 mt-1">
              Overall economic health score
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
              {cityData.metrics.currentEmploymentRate > comparisonData.metrics.currentEmploymentRate ? 'higher' : 'lower'}{' '}
              employment rate (
              {Math.abs(cityData.metrics.currentEmploymentRate - comparisonData.metrics.currentEmploymentRate).toFixed(1)}
              %{' '}
              {cityData.metrics.currentEmploymentRate > comparisonData.metrics.currentEmploymentRate ? 'higher' : 'lower'}
              ),
              {cityData.metrics.gdpGrowth > comparisonData.metrics.gdpGrowth ? ' stronger' : ' weaker'}{' '}
              GDP growth (
              {Math.abs(cityData.metrics.gdpGrowth - comparisonData.metrics.gdpGrowth).toFixed(1)}
              %{' '}
              {cityData.metrics.gdpGrowth > comparisonData.metrics.gdpGrowth ? 'higher' : 'lower'}
              ), and
              {cityData.metrics.currentIncome > comparisonData.metrics.currentIncome ? ' higher' : ' lower'}{' '}
              median income (
              {formatCurrency(Math.abs(cityData.metrics.currentIncome - comparisonData.metrics.currentIncome))}{' '}
              {cityData.metrics.currentIncome > comparisonData.metrics.currentIncome ? 'higher' : 'lower'}
              ).
              {cityData.metrics.economicResilience > comparisonData.metrics.economicResilience ? ' Overall, it has a stronger economic resilience score.' : ' Overall, it has a weaker economic resilience score.'}
            </p>
          </div>}
      </div>
      {/* Economic Trend Charts */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <LineChartIcon size={18} className="mr-2 text-emerald-500" />
            Economic Trends
          </h3>
          <div className="flex flex-wrap gap-2">
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedIndicator === 'employment' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedIndicator('employment')}>
              Employment
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedIndicator === 'gdp' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedIndicator('gdp')}>
              GDP
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedIndicator === 'income' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedIndicator('income')}>
              Income
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedIndicator === 'unemployment' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedIndicator('unemployment')}>
              Unemployment
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedIndicator === 'business' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedIndicator('business')}>
              Business Growth
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" allowDuplicatedCategory={false} />
              <YAxis tickFormatter={getYAxisConfig().formatter} domain={['auto', 'auto']} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={value => `${value}%`} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line data={getChartData()} type="monotone" dataKey={getDataKey()} name={`${city} ${selectedIndicator.charAt(0).toUpperCase() + selectedIndicator.slice(1)}`} stroke="#3AB795" strokeWidth={2} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />
              <Bar data={getChartData()} dataKey="change" name={`${city} Annual Change`} fill="#FECA57" yAxisId="right" />
              {comparisonData && getComparisonChartData() && <Line data={getComparisonChartData()} type="monotone" dataKey={getDataKey()} name={`${comparisonCity} ${selectedIndicator.charAt(0).toUpperCase() + selectedIndicator.slice(1)}`} stroke="#FF6B6B" strokeWidth={2} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">5-Year Trend</h4>
            <div className="text-sm text-gray-600 mt-2">
              {selectedIndicator === 'employment' && (cityData.employmentData[cityData.employmentData.length - 1].rate > cityData.employmentData[0].rate ? `Employment has increased ${(cityData.employmentData[cityData.employmentData.length - 1].rate - cityData.employmentData[0].rate).toFixed(1)}% over the past 5 years, showing a strengthening job market.` : `Employment has decreased ${(cityData.employmentData[0].rate - cityData.employmentData[cityData.employmentData.length - 1].rate).toFixed(1)}% over the past 5 years, indicating some job market challenges.`)}
              {selectedIndicator === 'gdp' && (cityData.gdpData[cityData.gdpData.length - 1].gdp > cityData.gdpData[0].gdp ? `The local economy has grown ${((cityData.gdpData[cityData.gdpData.length - 1].gdp / cityData.gdpData[0].gdp - 1) * 100).toFixed(1)}% over the past 5 years, showing economic expansion.` : `The local economy has contracted ${((1 - cityData.gdpData[cityData.gdpData.length - 1].gdp / cityData.gdpData[0].gdp) * 100).toFixed(1)}% over the past 5 years, indicating economic challenges.`)}
              {selectedIndicator === 'income' && `Median income has increased ${((cityData.incomeData[cityData.incomeData.length - 1].income / cityData.incomeData[0].income - 1) * 100).toFixed(1)}% over the past 5 years, ${(cityData.incomeData[cityData.incomeData.length - 1].income / cityData.incomeData[0].income - 1) * 100 > 15 ? 'significantly outpacing inflation.' : 'roughly keeping pace with inflation.'}`}
              {selectedIndicator === 'unemployment' && (cityData.unemploymentData[cityData.unemploymentData.length - 1].rate < cityData.unemploymentData[0].rate ? `Unemployment has decreased ${(cityData.unemploymentData[0].rate - cityData.unemploymentData[cityData.unemploymentData.length - 1].rate).toFixed(1)}% over the past 5 years, showing job market improvement.` : `Unemployment has increased ${(cityData.unemploymentData[cityData.unemploymentData.length - 1].rate - cityData.unemploymentData[0].rate).toFixed(1)}% over the past 5 years, indicating job market challenges.`)}
              {selectedIndicator === 'business' && (cityData.businessGrowthData[cityData.businessGrowthData.length - 1].businesses > cityData.businessGrowthData[0].businesses ? `Business growth has increased ${((cityData.businessGrowthData[cityData.businessGrowthData.length - 1].businesses / cityData.businessGrowthData[0].businesses - 1) * 100).toFixed(1)}% over the past 5 years, showing a favorable business environment.` : `Business growth has decreased ${((1 - cityData.businessGrowthData[cityData.businessGrowthData.length - 1].businesses / cityData.businessGrowthData[0].businesses) * 100).toFixed(1)}% over the past 5 years, indicating business environment challenges.`)}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">COVID Impact & Recovery</h4>
            <div className="text-sm text-gray-600 mt-2">
              {selectedIndicator === 'employment' && (cityData.employmentData[2].rate < cityData.employmentData[1].rate ? `Employment fell ${(cityData.employmentData[1].rate - cityData.employmentData[2].rate).toFixed(1)}% during the pandemic but has since recovered ${((cityData.employmentData[cityData.employmentData.length - 1].rate - cityData.employmentData[2].rate) / (cityData.employmentData[1].rate - cityData.employmentData[2].rate) * 100).toFixed(0)}% of losses.` : `Employment showed remarkable resilience during the pandemic with minimal job losses.`)}
              {selectedIndicator === 'gdp' && (cityData.gdpData[2].gdp < cityData.gdpData[1].gdp ? `GDP contracted ${((1 - cityData.gdpData[2].gdp / cityData.gdpData[1].gdp) * 100).toFixed(1)}% during the pandemic but has since recovered ${((cityData.gdpData[cityData.gdpData.length - 1].gdp - cityData.gdpData[2].gdp) / (cityData.gdpData[1].gdp - cityData.gdpData[2].gdp) * 100).toFixed(0)}% of losses.` : `The local economy showed remarkable resilience during the pandemic with minimal GDP contraction.`)}
              {selectedIndicator === 'income' && (cityData.incomeData[2].income < cityData.incomeData[1].income ? `Median income fell ${((1 - cityData.incomeData[2].income / cityData.incomeData[1].income) * 100).toFixed(1)}% during the pandemic but has since recovered and grown ${((cityData.incomeData[cityData.incomeData.length - 1].income / cityData.incomeData[1].income - 1) * 100).toFixed(1)}% above pre-pandemic levels.` : `Median income showed resilience during the pandemic and has grown ${((cityData.incomeData[cityData.incomeData.length - 1].income / cityData.incomeData[1].income - 1) * 100).toFixed(1)}% since 2019.`)}
              {selectedIndicator === 'unemployment' && (cityData.unemploymentData[2].rate > cityData.unemploymentData[1].rate ? `Unemployment spiked ${(cityData.unemploymentData[2].rate - cityData.unemploymentData[1].rate).toFixed(1)}% during the pandemic but has since recovered ${((cityData.unemploymentData[2].rate - cityData.unemploymentData[cityData.unemploymentData.length - 1].rate) / (cityData.unemploymentData[2].rate - cityData.unemploymentData[1].rate) * 100).toFixed(0)}% toward pre-pandemic levels.` : `Unemployment showed remarkable resilience during the pandemic with minimal increases.`)}
              {selectedIndicator === 'business' && (cityData.businessGrowthData[2].businesses < cityData.businessGrowthData[1].businesses ? `Business growth contracted ${((1 - cityData.businessGrowthData[2].businesses / cityData.businessGrowthData[1].businesses) * 100).toFixed(1)}% during the pandemic but has since recovered ${((cityData.businessGrowthData[cityData.businessGrowthData.length - 1].businesses - cityData.businessGrowthData[2].businesses) / (cityData.businessGrowthData[1].businesses - cityData.businessGrowthData[2].businesses) * 100).toFixed(0)}% of losses.` : `The business environment showed remarkable resilience during the pandemic with continued growth.`)}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Current Trajectory</h4>
            <div className="text-sm text-gray-600 mt-2">
              {selectedIndicator === 'employment' && (cityData.employmentData[cityData.employmentData.length - 1].change > 0 ? `Employment is currently growing at ${cityData.employmentData[cityData.employmentData.length - 1].change}% annually, ${cityData.employmentData[cityData.employmentData.length - 1].change > 1 ? 'indicating a robust job market.' : 'showing modest job creation.'}` : `Employment is currently declining at ${Math.abs(cityData.employmentData[cityData.employmentData.length - 1].change)}% annually, suggesting economic headwinds.`)}
              {selectedIndicator === 'gdp' && (cityData.gdpData[cityData.gdpData.length - 1].change > 0 ? `GDP is currently growing at ${cityData.gdpData[cityData.gdpData.length - 1].change}% annually, ${cityData.gdpData[cityData.gdpData.length - 1].change > 2 ? 'indicating strong economic expansion.' : 'showing moderate economic growth.'}` : `GDP is currently contracting at ${Math.abs(cityData.gdpData[cityData.gdpData.length - 1].change)}% annually, suggesting economic challenges.`)}
              {selectedIndicator === 'income' && (cityData.incomeData[cityData.incomeData.length - 1].change > 0 ? `Median income is currently growing at ${cityData.incomeData[cityData.incomeData.length - 1].change}% annually, ${cityData.incomeData[cityData.incomeData.length - 1].change > 3 ? 'outpacing inflation and indicating rising prosperity.' : 'roughly keeping pace with inflation.'}` : `Median income is currently declining at ${Math.abs(cityData.incomeData[cityData.incomeData.length - 1].change)}% annually, suggesting household financial pressure.`)}
              {selectedIndicator === 'unemployment' && (cityData.unemploymentData[cityData.unemploymentData.length - 1].change < 0 ? `Unemployment is currently declining at ${Math.abs(cityData.unemploymentData[cityData.unemploymentData.length - 1].change)}% annually, indicating an improving job market.` : `Unemployment is currently rising at ${cityData.unemploymentData[cityData.unemploymentData.length - 1].change}% annually, suggesting job market challenges.`)}
              {selectedIndicator === 'business' && (cityData.businessGrowthData[cityData.businessGrowthData.length - 1].change > 0 ? `Business growth is currently at ${cityData.businessGrowthData[cityData.businessGrowthData.length - 1].change}% annually, ${cityData.businessGrowthData[cityData.businessGrowthData.length - 1].change > 2 ? 'indicating a vibrant entrepreneurial environment.' : 'showing moderate business formation.'}` : `Business growth is currently negative at ${Math.abs(cityData.businessGrowthData[cityData.businessGrowthData.length - 1].change)}% annually, suggesting a challenging business environment.`)}
            </div>
          </div>
        </div>
      </div>
      {/* Industry Sector Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Building size={18} className="mr-2 text-emerald-500" />
            Industry Sector Analysis
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData.industrySectorData} layout="vertical" margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={value => `${value}%`} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="value" name={`${city} Employment Share`} fill="#3AB795" radius={[0, 4, 4, 0]}>
                  {cityData.industrySectorData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
                {comparisonData && <Bar dataKey="value" name={`${comparisonCity} Employment Share`} fill="#FF6B6B" radius={[0, 4, 4, 0]} data={comparisonData.industrySectorData} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Sector Growth Rates</h4>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {[...cityData.industrySectorData].sort((a, b) => b.growth - a.growth).map((sector, index) => <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{
                  backgroundColor: sector.color
                }}></div>
                      <span className="text-sm">{sector.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div className={`h-2 rounded-full ${sector.growth > 3 ? 'bg-emerald-500' : sector.growth > 0 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                    width: `${Math.min(100, Math.max(0, (sector.growth + 5) * 10))}%`
                  }}></div>
                      </div>
                      <span className={`text-sm font-medium ${sector.growth > 3 ? 'text-emerald-600' : sector.growth > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                        {sector.growth > 0 ? '+' : ''}
                        {sector.growth}%
                      </span>
                    </div>
                  </div>)}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">
                Key Industry Insights
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <div className="flex items-center text-emerald-700 mb-1">
                    <TrendingUp size={14} className="mr-1.5" />
                    <span className="font-medium">Fastest Growing Sectors</span>
                  </div>
                  <p className="text-xs text-gray-700">
                    {cityData.metrics.topSectors.map(s => s.name).join(', ')}{' '}
                    are the fastest growing sectors, with growth rates of{' '}
                    {cityData.metrics.topSectors.map(s => `${s.growth}%`).join(', ')}{' '}
                    respectively. These sectors represent significant
                    opportunity for job growth and economic expansion.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-1">
                    <PieChartIcon size={14} className="mr-1.5 text-gray-700" />
                    <span className="font-medium">Sector Concentration</span>
                  </div>
                  <p className="text-xs text-gray-700">
                    {cityData.industrySectorData[0].value > 20 ? `The economy has significant concentration in ${cityData.industrySectorData[0].name} (${cityData.industrySectorData[0].value}% of employment), creating potential vulnerability to sector-specific downturns.` : `The economy is well-diversified with no single sector exceeding 20% of employment, providing resilience against sector-specific downturns.`}
                    {cityData.metrics.economicDiversity > 80 ? ` Overall diversity score of ${Math.round(cityData.metrics.economicDiversity)}/100 indicates excellent economic diversification.` : cityData.metrics.economicDiversity > 65 ? ` Overall diversity score of ${Math.round(cityData.metrics.economicDiversity)}/100 indicates good economic diversification.` : ` Overall diversity score of ${Math.round(cityData.metrics.economicDiversity)}/100 suggests opportunity for further diversification.`}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Globe size={14} className="mr-1.5 text-gray-700" />
                    <span className="font-medium">Economic Positioning</span>
                  </div>
                  <p className="text-xs text-gray-700">
                    {cityData.industrySectorData.find(s => s.name === 'Technology')?.value > 12 ? `Strong technology sector (${cityData.industrySectorData.find(s => s.name === 'Technology')?.value}% of employment) positions the economy well for future growth in high-wage jobs.` : cityData.industrySectorData.find(s => s.name === 'Healthcare')?.value > 15 ? `Significant healthcare presence (${cityData.industrySectorData.find(s => s.name === 'Healthcare')?.value}% of employment) provides stability and recession resistance.` : cityData.industrySectorData.find(s => s.name === 'Hospitality')?.value > 15 ? `Large hospitality sector (${cityData.industrySectorData.find(s => s.name === 'Hospitality')?.value}% of employment) indicates tourism-driven economy with potential seasonal volatility.` : `The economy has a balanced mix of service and goods-producing sectors, providing multiple growth drivers.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Economic Forecast */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <TrendingUp size={18} className="mr-2 text-emerald-500" />
            Economic Forecast
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className={`px-2 py-1 text-xs rounded-lg ${forecastPeriod === '1y' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setForecastPeriod('1y')}>
                1 Year
              </button>
              <button className={`px-2 py-1 text-xs rounded-lg ${forecastPeriod === '3y' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setForecastPeriod('3y')}>
                3 Year
              </button>
              <button className={`px-2 py-1 text-xs rounded-lg ${forecastPeriod === '5y' ? 'bg-emerald-500 text-white' : 'text-gray-600'}`} onClick={() => setForecastPeriod('5y')}>
                5 Year
              </button>
            </div>
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" allowDuplicatedCategory={false} />
                <YAxis tickFormatter={selectedIndicator === 'income' ? value => `$${(value / 1000).toFixed(0)}K` : value => value} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line data={selectedIndicator === 'gdp' ? cityData.gdpData : selectedIndicator === 'income' ? cityData.incomeData : cityData.employmentData} type="monotone" dataKey={selectedIndicator === 'gdp' ? 'gdp' : selectedIndicator === 'income' ? 'income' : 'rate'} name={`${city} Historical`} stroke="#3AB795" strokeWidth={2} dot={{
                r: 4
              }} />
                <Line data={getForecastData()} type="monotone" dataKey="value" name={`${city} Forecast`} stroke="#3AB795" strokeWidth={2} strokeDasharray="5 5" dot={{
                r: 4
              }} />
                {comparisonData && <>
                    <Line data={selectedIndicator === 'gdp' ? comparisonData.gdpData : selectedIndicator === 'income' ? comparisonData.incomeData : comparisonData.employmentData} type="monotone" dataKey={selectedIndicator === 'gdp' ? 'gdp' : selectedIndicator === 'income' ? 'income' : 'rate'} name={`${comparisonCity} Historical`} stroke="#FF6B6B" strokeWidth={2} dot={{
                  r: 4
                }} />
                  </>}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-3">Forecast Summary</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="p-1 bg-emerald-100 text-emerald-700 rounded mr-2">
                    <Briefcase size={16} />
                  </div>
                  <span className="font-medium">Employment Outlook</span>
                </div>
                <p className="text-xs text-gray-600">
                  {cityData.employmentForecast[cityData.employmentForecast.length - 1].value > cityData.metrics.currentEmploymentRate + 1 ? `Strong job growth projected with employment rate reaching ${cityData.employmentForecast[cityData.employmentForecast.length - 1].value}% in ${2023 + cityData.employmentForecast.length}, a ${(cityData.employmentForecast[cityData.employmentForecast.length - 1].value - cityData.metrics.currentEmploymentRate).toFixed(1)}% increase from current levels.` : cityData.employmentForecast[cityData.employmentForecast.length - 1].value > cityData.metrics.currentEmploymentRate ? `Moderate job growth projected with employment rate reaching ${cityData.employmentForecast[cityData.employmentForecast.length - 1].value}% in ${2023 + cityData.employmentForecast.length}, a ${(cityData.employmentForecast[cityData.employmentForecast.length - 1].value - cityData.metrics.currentEmploymentRate).toFixed(1)}% increase from current levels.` : `Challenging job market projected with employment rate declining to ${cityData.employmentForecast[cityData.employmentForecast.length - 1].value}% in ${2023 + cityData.employmentForecast.length}, a ${(cityData.metrics.currentEmploymentRate - cityData.employmentForecast[cityData.employmentForecast.length - 1].value).toFixed(1)}% decrease from current levels.`}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="p-1 bg-emerald-100 text-emerald-700 rounded mr-2">
                    <LineChartIcon size={16} />
                  </div>
                  <span className="font-medium">Economic Growth</span>
                </div>
                <p className="text-xs text-gray-600">
                  {cityData.gdpForecast[cityData.gdpForecast.length - 1].value > cityData.metrics.currentGDP * 1.1 ? `Strong economic expansion projected with GDP growing to ${cityData.gdpForecast[cityData.gdpForecast.length - 1].value.toFixed(1)} (index) by ${2023 + cityData.gdpForecast.length}, a ${((cityData.gdpForecast[cityData.gdpForecast.length - 1].value / cityData.metrics.currentGDP - 1) * 100).toFixed(1)}% increase from current levels.` : cityData.gdpForecast[cityData.gdpForecast.length - 1].value > cityData.metrics.currentGDP ? `Moderate economic growth projected with GDP reaching ${cityData.gdpForecast[cityData.gdpForecast.length - 1].value.toFixed(1)} (index) by ${2023 + cityData.gdpForecast.length}, a ${((cityData.gdpForecast[cityData.gdpForecast.length - 1].value / cityData.metrics.currentGDP - 1) * 100).toFixed(1)}% increase from current levels.` : `Economic challenges projected with GDP declining to ${cityData.gdpForecast[cityData.gdpForecast.length - 1].value.toFixed(1)} (index) by ${2023 + cityData.gdpForecast.length}, a ${((1 - cityData.gdpForecast[cityData.gdpForecast.length - 1].value / cityData.metrics.currentGDP) * 100).toFixed(1)}% decrease from current levels.`}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="p-1 bg-emerald-100 text-emerald-700 rounded mr-2">
                    <DollarSign size={16} />
                  </div>
                  <span className="font-medium">Income Trends</span>
                </div>
                <p className="text-xs text-gray-600">
                  {cityData.incomeForecast[cityData.incomeForecast.length - 1].value > cityData.metrics.currentIncome * 1.15 ? `Strong income growth projected with median income reaching ${formatCurrency(cityData.incomeForecast[cityData.incomeForecast.length - 1].value)} by ${2023 + cityData.incomeForecast.length}, a ${((cityData.incomeForecast[cityData.incomeForecast.length - 1].value / cityData.metrics.currentIncome - 1) * 100).toFixed(1)}% increase from current levels, significantly outpacing inflation.` : cityData.incomeForecast[cityData.incomeForecast.length - 1].value > cityData.metrics.currentIncome * 1.05 ? `Moderate income growth projected with median income reaching ${formatCurrency(cityData.incomeForecast[cityData.incomeForecast.length - 1].value)} by ${2023 + cityData.incomeForecast.length}, a ${((cityData.incomeForecast[cityData.incomeForecast.length - 1].value / cityData.metrics.currentIncome - 1) * 100).toFixed(1)}% increase from current levels, slightly outpacing inflation.` : `Limited real income growth projected with median income reaching ${formatCurrency(cityData.incomeForecast[cityData.incomeForecast.length - 1].value)} by ${2023 + cityData.incomeForecast.length}, a ${((cityData.incomeForecast[cityData.incomeForecast.length - 1].value / cityData.metrics.currentIncome - 1) * 100).toFixed(1)}% increase from current levels, roughly keeping pace with inflation.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Investment Implications */}
      <div className="bg-emerald-500 text-white rounded-xl p-5">
        <h3 className="font-medium flex items-center mb-4">
          <Zap size={18} className="mr-2" />
          Economic Impact on Real Estate Investment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Property Value Outlook</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.gdpGrowth > 3 && cityData.metrics.employmentChange > 0 ? 'Strong economic growth and job creation support continued property value appreciation' : cityData.metrics.gdpGrowth > 1.5 ? 'Moderate economic growth suggests stable property values with modest appreciation' : 'Limited economic growth may constrain property value appreciation in the near term'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.incomeGrowth > 4 ? 'Strong income growth increases purchasing power, supporting higher property values' : cityData.metrics.incomeGrowth > 2 ? 'Income growth roughly keeping pace with inflation suggests stable affordability' : 'Limited income growth may create affordability challenges, constraining price growth'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.economicDiversity > 75 ? 'Highly diversified economy provides resilience against sector-specific downturns' : cityData.metrics.economicDiversity > 60 ? 'Good economic diversity reduces vulnerability to industry-specific challenges' : 'Less diversified economy creates some vulnerability to sector-specific risks'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Rental Market Impact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.employmentChange > 1 ? 'Strong job growth supports robust rental demand and potential for rent increases' : cityData.metrics.employmentChange > 0 ? 'Stable employment suggests steady rental demand with moderate growth potential' : 'Employment challenges may pressure rental demand in some segments'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.incomeGrowth > cityData.metrics.gdpGrowth ? 'Income growth outpacing economic expansion suggests improving rental affordability' : 'Income growth roughly aligned with economic growth indicates stable rental market'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.topSectors.some(s => s.name === 'Technology' || s.name === 'Healthcare') ? `Growth in high-wage sectors (${cityData.metrics.topSectors.filter(s => s.name === 'Technology' || s.name === 'Healthcare').map(s => s.name).join(', ')}) supports premium rental segment` : 'Employment composition suggests focus on mid-market rental properties'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Investment Strategy</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.economicResilience > 75 ? 'Strong economic fundamentals support long-term buy and hold strategies' : cityData.metrics.economicResilience > 60 ? 'Solid economic foundation favors traditional investment approaches' : 'Economic uncertainties suggest more cautious, value-focused investing'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.topSectors[0].growth > 4 ? `Target properties near ${cityData.metrics.topSectors[0].name} employment centers for strongest demand` : 'Diversify property locations to reduce exposure to any single economic driver'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.incomeForecast[cityData.incomeForecast.length - 1].change > 3 ? 'Strong projected income growth supports investing in properties with value-add potential' : 'Moderate income projections suggest focusing on cash flow stability over appreciation'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-white bg-opacity-5 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Economic Outlook Summary</h4>
          <p className="text-sm">
            {city}'s economy shows
            {cityData.metrics.economicResilience > 75 ? ' strong resilience with excellent diversity across multiple sectors.' : cityData.metrics.economicResilience > 65 ? ' good resilience with solid diversity across several sectors.' : ' moderate resilience with opportunities for further diversification.'}
            {cityData.metrics.gdpGrowth > 3 ? ' GDP growth is robust at ' + cityData.metrics.gdpGrowth + '%, significantly outpacing national averages.' : cityData.metrics.gdpGrowth > 1.5 ? ' GDP growth is moderate at ' + cityData.metrics.gdpGrowth + '%, generally keeping pace with national trends.' : ' GDP growth is modest at ' + cityData.metrics.gdpGrowth + '%, slightly below national averages.'}
            {cityData.metrics.employmentChange > 1 ? ' Strong job creation and declining unemployment create a favorable backdrop for real estate demand.' : cityData.metrics.employmentChange > 0 ? ' Stable employment conditions provide a solid foundation for real estate market activity.' : ' Some employment challenges may create headwinds for certain real estate segments.'}
            {cityData.metrics.incomeGrowth > 4 ? ' Robust income growth of ' + cityData.metrics.incomeGrowth + '% suggests improving affordability and purchasing power.' : cityData.metrics.incomeGrowth > 2 ? ' Income growth of ' + cityData.metrics.incomeGrowth + '% is helping maintain consumer purchasing power.' : ' Limited income growth of ' + cityData.metrics.incomeGrowth + '% may constrain housing affordability.'}
            {cityData.metrics.topSectors[0].growth > 4 ? ' The ' + cityData.metrics.topSectors[0].name + ' sector is driving significant economic momentum with ' + cityData.metrics.topSectors[0].growth + '% growth.' : ' Key sectors show moderate growth, providing stable economic conditions.'}
          </p>
        </div>
      </div>
    </div>;
};