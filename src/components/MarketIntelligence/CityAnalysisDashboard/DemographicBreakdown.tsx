import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, ChevronDown, Download, Info, TrendingUp, TrendingDown, Calendar, DollarSign, Briefcase, GraduationCap, Home, Heart, Clock, Activity, Filter, RefreshCw, Zap, Check } from 'lucide-react';
interface DemographicBreakdownProps {
  city: string;
  timeframe: string;
  dataSource: string;
  comparisonCity?: string;
}
export const DemographicBreakdown: React.FC<DemographicBreakdownProps> = ({
  city,
  timeframe,
  dataSource,
  comparisonCity
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<string>('age');
  // Generate demographic data based on city
  const generateDemographicData = (cityName: string) => {
    // Seed some randomness based on city name to get consistent but different data
    const cityHash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomSeed = cityHash / 1000;
    // Age distribution - varies by city
    const ageData = [{
      name: 'Under 18',
      value: Math.round(18 + randomSeed % 5),
      color: '#3AB795'
    }, {
      name: '18-24',
      value: Math.round(10 + randomSeed % 4),
      color: '#FECA57'
    }, {
      name: '25-34',
      value: Math.round(15 + randomSeed % 6),
      color: '#FF6B6B'
    }, {
      name: '35-44',
      value: Math.round(14 + randomSeed % 4),
      color: '#4B5563'
    }, {
      name: '45-54',
      value: Math.round(13 + randomSeed % 3),
      color: '#9CA3AF'
    }, {
      name: '55-64',
      value: Math.round(12 + randomSeed % 4),
      color: '#6366F1'
    }, {
      name: '65+',
      value: Math.round(18 + randomSeed % 7),
      color: '#EC4899'
    }];
    // Income distribution
    const incomeData = [{
      name: 'Under $25K',
      value: Math.round(15 + randomSeed % 8),
      color: '#3AB795'
    }, {
      name: '$25K-$50K',
      value: Math.round(20 + randomSeed % 5),
      color: '#FECA57'
    }, {
      name: '$50K-$75K',
      value: Math.round(22 + randomSeed % 4),
      color: '#FF6B6B'
    }, {
      name: '$75K-$100K',
      value: Math.round(18 + randomSeed % 5),
      color: '#4B5563'
    }, {
      name: '$100K-$150K',
      value: Math.round(15 + randomSeed % 6),
      color: '#9CA3AF'
    }, {
      name: '$150K+',
      value: Math.round(10 + randomSeed % 8),
      color: '#6366F1'
    }];
    // Education distribution
    const educationData = [{
      name: 'Less than High School',
      value: Math.round(10 + randomSeed % 8),
      color: '#3AB795'
    }, {
      name: 'High School',
      value: Math.round(25 + randomSeed % 5),
      color: '#FECA57'
    }, {
      name: 'Some College',
      value: Math.round(20 + randomSeed % 4),
      color: '#FF6B6B'
    }, {
      name: 'Associate',
      value: Math.round(10 + randomSeed % 3),
      color: '#4B5563'
    }, {
      name: 'Bachelor',
      value: Math.round(25 + randomSeed % 6),
      color: '#9CA3AF'
    }, {
      name: 'Graduate',
      value: Math.round(10 + randomSeed % 4),
      color: '#6366F1'
    }];
    // Household composition
    const householdData = [{
      name: 'Single',
      value: Math.round(30 + randomSeed % 8),
      color: '#3AB795'
    }, {
      name: 'Married, no children',
      value: Math.round(25 + randomSeed % 5),
      color: '#FECA57'
    }, {
      name: 'Married with children',
      value: Math.round(30 + randomSeed % 6),
      color: '#FF6B6B'
    }, {
      name: 'Single parent',
      value: Math.round(15 + randomSeed % 4),
      color: '#4B5563'
    }];
    // Occupation sectors
    const occupationData = [{
      name: 'Healthcare',
      value: Math.round(15 + randomSeed % 5),
      color: '#3AB795'
    }, {
      name: 'Education',
      value: Math.round(12 + randomSeed % 4),
      color: '#FECA57'
    }, {
      name: 'Technology',
      value: Math.round(10 + randomSeed % 10),
      color: '#FF6B6B'
    }, {
      name: 'Finance',
      value: Math.round(8 + randomSeed % 6),
      color: '#4B5563'
    }, {
      name: 'Retail',
      value: Math.round(12 + randomSeed % 4),
      color: '#9CA3AF'
    }, {
      name: 'Manufacturing',
      value: Math.round(8 + randomSeed % 5),
      color: '#6366F1'
    }, {
      name: 'Hospitality',
      value: Math.round(14 + randomSeed % 8),
      color: '#EC4899'
    }, {
      name: 'Government',
      value: Math.round(10 + randomSeed % 3),
      color: '#F59E0B'
    }, {
      name: 'Other',
      value: Math.round(11 + randomSeed % 4),
      color: '#10B981'
    }];
    // Population trends (10 years)
    const populationTrends = [];
    let basePopulation = 250000 + randomSeed * 100000;
    const growthRate = 1 + (randomSeed % 3 + 1) / 100; // Growth rate between 1-4%
    for (let i = 0; i < 10; i++) {
      const year = 2014 + i;
      basePopulation = basePopulation * growthRate;
      populationTrends.push({
        year,
        population: Math.round(basePopulation)
      });
    }
    // Housing tenure
    const housingTenureData = [{
      name: 'Owner Occupied',
      value: Math.round(55 + randomSeed % 20),
      color: '#3AB795'
    }, {
      name: 'Renter Occupied',
      value: Math.round(45 - randomSeed % 20),
      color: '#FECA57'
    }];
    return {
      ageData,
      incomeData,
      educationData,
      householdData,
      occupationData,
      populationTrends,
      housingTenureData,
      metrics: {
        medianAge: Math.round(35 + randomSeed % 10),
        medianIncome: Math.round(50000 + randomSeed * 15000),
        householdSize: (2.5 + randomSeed % 1).toFixed(1),
        homeownershipRate: Math.round(55 + randomSeed % 20),
        collegeDegreeRate: Math.round(30 + randomSeed % 25),
        unemploymentRate: Math.round(4 + randomSeed % 3),
        povertyRate: Math.round(12 + randomSeed % 8),
        populationDensity: Math.round(1000 + randomSeed * 2000)
      }
    };
  };
  const cityData = generateDemographicData(city);
  const comparisonData = comparisonCity ? generateDemographicData(comparisonCity) : null;
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
          color: entry.color || entry.fill
        }}>
              <span className="font-medium">{entry.name}: </span>
              {typeof entry.value === 'number' && entry.name?.toLowerCase().includes('income') ? formatCurrency(entry.value) : `${entry.value}${entry.unit || (typeof entry.value === 'number' && !entry.name?.toLowerCase().includes('population') ? '%' : '')}`}
            </p>)}
        </div>;
    }
    return null;
  };
  // Get active data based on selected view
  const getActiveData = (dataSource: any) => {
    switch (selectedView) {
      case 'age':
        return dataSource.ageData;
      case 'income':
        return dataSource.incomeData;
      case 'education':
        return dataSource.educationData;
      case 'household':
        return dataSource.householdData;
      case 'occupation':
        return dataSource.occupationData;
      case 'housing':
        return dataSource.housingTenureData;
      default:
        return dataSource.ageData;
    }
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
      {/* Demographic Metrics Overview */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <Users size={18} className="mr-2 text-emerald-500" />
            Demographic Metrics Overview
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
              <div className="text-sm text-gray-500 mb-1">Median Age</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.medianAge, comparisonData.metrics.medianAge)}`}>
                  {cityData.metrics.medianAge > comparisonData.metrics.medianAge ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.medianAge - comparisonData.metrics.medianAge)}{' '}
                  yrs
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.medianAge} years
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {cityData.metrics.medianAge > 40 ? 'Older population' : cityData.metrics.medianAge > 35 ? 'Average age' : 'Younger population'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Median Income</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.medianIncome, comparisonData.metrics.medianIncome)}`}>
                  {cityData.metrics.medianIncome > comparisonData.metrics.medianIncome ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {formatCurrency(Math.abs(cityData.metrics.medianIncome - comparisonData.metrics.medianIncome))}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {formatCurrency(cityData.metrics.medianIncome)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Annual household income
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">College Degree</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.collegeDegreeRate, comparisonData.metrics.collegeDegreeRate)}`}>
                  {cityData.metrics.collegeDegreeRate > comparisonData.metrics.collegeDegreeRate ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.collegeDegreeRate - comparisonData.metrics.collegeDegreeRate)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.collegeDegreeRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Bachelor's or higher
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Homeownership</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.homeownershipRate, comparisonData.metrics.homeownershipRate)}`}>
                  {cityData.metrics.homeownershipRate > comparisonData.metrics.homeownershipRate ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.homeownershipRate - comparisonData.metrics.homeownershipRate)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.homeownershipRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Owner-occupied housing
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Household Size</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(parseFloat(cityData.metrics.householdSize), parseFloat(comparisonData.metrics.householdSize))}`}>
                  {parseFloat(cityData.metrics.householdSize) > parseFloat(comparisonData.metrics.householdSize) ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(parseFloat(cityData.metrics.householdSize) - parseFloat(comparisonData.metrics.householdSize)).toFixed(1)}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.householdSize}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Average persons per household
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Unemployment</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.unemploymentRate, comparisonData.metrics.unemploymentRate, true)}`}>
                  {cityData.metrics.unemploymentRate < comparisonData.metrics.unemploymentRate ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.unemploymentRate - comparisonData.metrics.unemploymentRate)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.unemploymentRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Unemployment rate</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">Poverty Rate</div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.povertyRate, comparisonData.metrics.povertyRate, true)}`}>
                  {cityData.metrics.povertyRate < comparisonData.metrics.povertyRate ? <TrendingDown size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1" />}
                  {Math.abs(cityData.metrics.povertyRate - comparisonData.metrics.povertyRate)}
                  %
                </div>}
            </div>
            <div className="text-xl font-bold">
              {cityData.metrics.povertyRate}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Below poverty line</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 mb-1">
                Population Density
              </div>
              {comparisonData && <div className={`text-xs flex items-center ${getComparisonColor(cityData.metrics.populationDensity, comparisonData.metrics.populationDensity)}`}>
                  {cityData.metrics.populationDensity > comparisonData.metrics.populationDensity ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {formatNumber(Math.abs(cityData.metrics.populationDensity - comparisonData.metrics.populationDensity))}
                </div>}
            </div>
            <div className="text-xl font-bold">
              {formatNumber(cityData.metrics.populationDensity)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              People per sq. mile
            </div>
          </div>
        </div>
        {comparisonData && <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-medium flex items-center">
              <Activity size={16} className="mr-1.5 text-emerald-500" />
              Comparison: {city} vs. {comparisonCity}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {city} has a{' '}
              {cityData.metrics.medianAge > comparisonData.metrics.medianAge ? 'higher' : 'lower'}{' '}
              median age,
              {cityData.metrics.medianIncome > comparisonData.metrics.medianIncome ? ' higher' : ' lower'}{' '}
              median income, and
              {cityData.metrics.homeownershipRate > comparisonData.metrics.homeownershipRate ? ' higher' : ' lower'}{' '}
              homeownership rate compared to {comparisonCity}.
              {cityData.metrics.collegeDegreeRate > comparisonData.metrics.collegeDegreeRate ? ' Education levels are higher' : ' Education levels are lower'}
              , with
              {cityData.metrics.unemploymentRate < comparisonData.metrics.unemploymentRate ? ' lower unemployment' : ' higher unemployment'}{' '}
              and
              {cityData.metrics.povertyRate < comparisonData.metrics.povertyRate ? ' lower poverty rates.' : ' higher poverty rates.'}
            </p>
          </div>}
      </div>
      {/* Demographic Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <PieChart size={18} className="mr-2 text-emerald-500" />
            Demographic Distribution
          </h3>
          <div className="flex flex-wrap gap-2">
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedView === 'age' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedView('age')}>
              Age
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedView === 'income' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedView('income')}>
              Income
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedView === 'education' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedView('education')}>
              Education
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedView === 'household' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedView('household')}>
              Household
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedView === 'occupation' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedView('occupation')}>
              Occupation
            </button>
            <button className={`px-3 py-1.5 text-xs rounded-lg ${selectedView === 'housing' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setSelectedView('housing')}>
              Housing
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getActiveData(cityData)} layout="vertical" margin={{
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
                <Bar dataKey="value" name={city} fill="#3AB795" radius={[0, 4, 4, 0]}>
                  {getActiveData(cityData).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
                {comparisonData && <Bar dataKey="value" name={comparisonCity} fill="#FF6B6B" radius={[0, 4, 4, 0]} data={getActiveData(comparisonData)} />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={getActiveData(cityData)} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {getActiveData(cityData).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Distribution Insights */}
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium flex items-center mb-2">
            <Info size={16} className="mr-1.5 text-emerald-500" />
            Distribution Insights
          </h4>
          <p className="text-sm text-gray-600">
            {selectedView === 'age' && <>
                {city} has a{' '}
                {cityData.metrics.medianAge > 38 ? 'slightly older' : 'younger'}{' '}
                population compared to the national average.
                {cityData.ageData[0].value > 20 ? ' The city has a significant youth population under 18.' : ''}
                {cityData.ageData[6].value > 20 ? ' There is a substantial senior population (65+).' : ''}
                {cityData.ageData[2].value + cityData.ageData[3].value > 30 ? ' Working-age adults (25-44) make up a large portion of residents.' : ''}
              </>}
            {selectedView === 'income' && <>
                The median household income in {city} is{' '}
                {formatCurrency(cityData.metrics.medianIncome)}, which is
                {cityData.metrics.medianIncome > 62000 ? ' above' : ' below'}{' '}
                the national average.
                {cityData.incomeData[5].value > 12 ? ' The city has a higher percentage of high-income households ($150K+) than the national average.' : ''}
                {cityData.incomeData[0].value + cityData.incomeData[1].value > 40 ? ' A significant portion of households earn less than $50K annually.' : ''}
              </>}
            {selectedView === 'education' && <>
                {cityData.metrics.collegeDegreeRate}% of {city} residents have a
                bachelor's degree or higher,
                {cityData.metrics.collegeDegreeRate > 32 ? ' exceeding' : ' below'}{' '}
                the national average.
                {cityData.educationData[4].value + cityData.educationData[5].value > 35 ? ' The city has a well-educated workforce.' : ''}
                {cityData.educationData[0].value < 12 ? ' The percentage of residents without a high school diploma is lower than the national average.' : ' The city has opportunities to improve high school completion rates.'}
              </>}
            {selectedView === 'household' && <>
                The average household size in {city} is{' '}
                {cityData.metrics.householdSize} persons,
                {parseFloat(cityData.metrics.householdSize) > 2.6 ? ' above' : ' below'}{' '}
                the national average.
                {cityData.householdData[0].value > 33 ? ' The city has a high percentage of single-person households.' : ''}
                {cityData.householdData[2].value > 33 ? ' Families with children represent a significant portion of households.' : ''}
              </>}
            {selectedView === 'occupation' && <>
                {city}'s workforce is primarily employed in
                {cityData.occupationData.sort((a, b) => b.value - a.value)[0].name.toLowerCase()}{' '}
                and
                {cityData.occupationData.sort((a, b) => b.value - a.value)[1].name.toLowerCase()}{' '}
                sectors.
                {cityData.occupationData.find(o => o.name === 'Technology')?.value > 12 ? ' The technology sector is particularly strong.' : ''}
                {cityData.occupationData.find(o => o.name === 'Healthcare')?.value > 15 ? ' Healthcare provides significant employment opportunities.' : ''}
                {cityData.occupationData.find(o => o.name === 'Hospitality')?.value > 15 ? " The hospitality industry is a major employer, reflecting the area's tourism economy." : ''}
              </>}
            {selectedView === 'housing' && <>
                The homeownership rate in {city} is{' '}
                {cityData.metrics.homeownershipRate}%, which is
                {cityData.metrics.homeownershipRate > 65 ? ' above' : ' below'}{' '}
                the national average.
                {cityData.housingTenureData[0].value > 60 ? ' The high rate of owner-occupied housing suggests a stable residential base.' : ''}
                {cityData.housingTenureData[1].value > 45 ? ' The significant rental population indicates strong rental market opportunities.' : ''}
              </>}
          </p>
        </div>
      </div>
      {/* Population Trends */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium flex items-center">
            <TrendingUp size={18} className="mr-2 text-emerald-500" />
            Population Growth Trends
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200">
              <Download size={14} />
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" type="category" allowDuplicatedCategory={false} />
              <YAxis tickFormatter={value => formatNumber(value)} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line data={cityData.populationTrends} type="monotone" dataKey="population" name={city} stroke="#3AB795" strokeWidth={2} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />
              {comparisonData && <Line data={comparisonData.populationTrends} type="monotone" dataKey="population" name={comparisonCity} stroke="#FF6B6B" strokeWidth={2} dot={{
              r: 4
            }} activeDot={{
              r: 6
            }} />}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Annual Growth Rate</h4>
            <div className="text-lg font-bold text-emerald-600 mt-1">
              {cityData.metrics.populationGrowth}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {cityData.metrics.populationGrowth > 2 ? 'Strong growth exceeding national average' : cityData.metrics.populationGrowth > 1 ? 'Moderate growth near national average' : 'Growth below national average'}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">Growth Drivers</h4>
            <div className="text-sm mt-2">
              <div className="flex justify-between mb-1">
                <span>Natural Increase</span>
                <span className="font-medium">
                  {Math.round(cityData.metrics.populationGrowth * 0.4 * 10) / 10}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Migration</span>
                <span className="font-medium">
                  {Math.round(cityData.metrics.populationGrowth * 0.6 * 10) / 10}
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium">5-Year Projection</h4>
            <div className="text-lg font-bold mt-1">
              {formatNumber(Math.round(cityData.populationTrends[cityData.populationTrends.length - 1].population * Math.pow(1 + cityData.metrics.populationGrowth / 100, 5)))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Estimated population by 2028
            </p>
          </div>
        </div>
      </div>
      {/* Investment Implications */}
      <div className="bg-emerald-500 text-white rounded-xl p-5">
        <h3 className="font-medium flex items-center mb-4">
          <Zap size={18} className="mr-2" />
          Investment Implications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Rental Market</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.housingTenureData[1].value > 40 ? 'Strong rental demand with large renter population' : 'Moderate rental demand with potential for growth'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.incomeData[3].value + cityData.incomeData[4].value + cityData.incomeData[5].value > 40 ? 'Higher income levels support premium rental properties' : 'Focus on affordable and mid-market rental properties'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.ageData[2].value + cityData.ageData[3].value > 30 ? 'Strong millennial and Gen X demographic supports modern rental amenities' : cityData.ageData[6].value > 20 ? 'Consider senior-friendly rental properties' : 'Diverse age demographics require varied rental offerings'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Development Opportunities</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.populationGrowth > 2 ? 'Strong population growth creates demand for new housing' : 'Moderate growth suggests focused development in high-demand areas'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.householdData[2].value > 30 ? 'Family-oriented developments with 3+ bedrooms show strong potential' : cityData.householdData[0].value > 30 ? 'High demand for smaller units and efficient living spaces' : 'Mixed-use developments to accommodate diverse household types'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.educationData[4].value + cityData.educationData[5].value > 35 ? 'Higher education levels support premium and technology-enabled developments' : 'Focus on practical, value-oriented development features'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Long-term Outlook</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.populationGrowth > 0 ? 'Positive population trends support long-term property value appreciation' : 'Selective investment in prime locations recommended'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.occupationData.find(o => o.name === 'Technology')?.value > 12 || cityData.occupationData.find(o => o.name === 'Healthcare')?.value > 15 ? 'Strong professional sectors provide economic stability' : 'Economic diversification will be key to long-term resilience'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-white bg-opacity-20 rounded-full p-0.5 mr-2 mt-0.5">
                  <Check size={12} />
                </span>
                <span>
                  {cityData.metrics.medianAge < 38 ? 'Younger demographic profile provides sustained demand for decades' : 'Aging population may shift housing preferences toward accessibility and convenience'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
};