import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Check, Shield, Star, Users, Home, Building, DollarSign, Briefcase, Umbrella, Zap, Activity } from 'lucide-react';
interface CityScoreProps {
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
}
export const CityScorecard: React.FC<CityScoreProps> = ({
  city,
  metrics
}) => {
  // Calculate overall city score based on metrics
  const calculateOverallScore = () => {
    // Weighted calculation of various factors
    const affordabilityScore = metrics.affordabilityIndex * 0.2;
    const economicScore = metrics.jobGrowth * 10 * 0.15;
    const growthScore = metrics.populationGrowth * 5 * 0.15;
    const housingScore = (100 - Math.min(metrics.vacancyRate * 10, 30)) * 0.15;
    const safetyScore = (100 - metrics.crimeIndex) * 0.15;
    const livabilityScore = metrics.walkabilityScore * 0.2;
    return Math.round(affordabilityScore + economicScore + growthScore + housingScore + safetyScore + livabilityScore);
  };
  const overallScore = calculateOverallScore();
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
  // Helper to determine score color
  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      return score < 40 ? 'text-emerald-600' : score < 70 ? 'text-amber-600' : 'text-red-600';
    }
    return score >= 70 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600';
  };
  // Helper to get trend icon
  const getTrendIcon = (value: number, inverse = false) => {
    if (inverse) {
      return value > 0 ? <TrendingDown size={16} className="text-emerald-600" /> : <TrendingUp size={16} className="text-red-600" />;
    }
    return value > 0 ? <TrendingUp size={16} className="text-emerald-600" /> : <TrendingDown size={16} className="text-red-600" />;
  };
  return <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">City Scorecard: {city}</h3>
          <p className="text-gray-500 text-sm">
            Comprehensive performance metrics
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center">
          <div className="text-3xl font-bold mr-2">{overallScore}</div>
          <div className="text-sm text-gray-500">
            <div className={getScoreColor(overallScore)}>Overall Score</div>
            <div className="text-xs">out of 100</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Affordability */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <DollarSign size={18} className="text-emerald-500 mr-2" />
              <h4 className="font-medium">Affordability</h4>
            </div>
            <div className={`font-bold ${getScoreColor(metrics.affordabilityIndex)}`}>
              {metrics.affordabilityIndex}/100
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>Median Home Price</div>
            <div className="font-medium">
              {formatCurrency(metrics.medianHomePrice)}
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>Median Income</div>
            <div className="font-medium">
              {formatCurrency(metrics.medianIncome)}
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>Price-to-Income Ratio</div>
            <div className="font-medium">
              {(metrics.medianHomePrice / metrics.medianIncome).toFixed(1)}x
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
            <div className="h-2 bg-emerald-500 rounded-full" style={{
            width: `${metrics.affordabilityIndex}%`
          }}></div>
          </div>
        </div>
        {/* Economic Health */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <Briefcase size={18} className="text-emerald-500 mr-2" />
              <h4 className="font-medium">Economic Health</h4>
            </div>
            <div className={`font-bold ${getScoreColor(metrics.jobGrowth * 10)}`}>
              {Math.round(metrics.jobGrowth * 10)}/100
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>Job Growth</div>
            <div className="font-medium flex items-center">
              {metrics.jobGrowth}% {getTrendIcon(metrics.jobGrowth)}
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>Employment Rate</div>
            <div className="font-medium">
              {Math.min(98, Math.max(90, 95 + (metrics.jobGrowth - 2)))}%
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>Industry Diversity</div>
            <div className="font-medium">
              {metrics.jobGrowth > 3 ? 'High' : metrics.jobGrowth > 1 ? 'Medium' : 'Low'}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
            <div className="h-2 bg-emerald-500 rounded-full" style={{
            width: `${Math.min(100, metrics.jobGrowth * 10)}%`
          }}></div>
          </div>
        </div>
        {/* Growth Potential */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <TrendingUp size={18} className="text-emerald-500 mr-2" />
              <h4 className="font-medium">Growth Potential</h4>
            </div>
            <div className={`font-bold ${getScoreColor(metrics.populationGrowth * 10)}`}>
              {Math.round(metrics.populationGrowth * 10)}/100
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <div>Population Growth</div>
            <div className="font-medium flex items-center">
              {metrics.populationGrowth}%{' '}
              {getTrendIcon(metrics.populationGrowth)}
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>Home Price Growth</div>
            <div className="font-medium flex items-center">
              {metrics.rentGrowth}% {getTrendIcon(metrics.rentGrowth)}
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <div>Development Index</div>
            <div className="font-medium">
              {metrics.populationGrowth > 2 ? 'High' : metrics.populationGrowth > 1 ? 'Medium' : 'Low'}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
            <div className="h-2 bg-emerald-500 rounded-full" style={{
            width: `${Math.min(100, metrics.populationGrowth * 12)}%`
          }}></div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-emerald-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Star size={18} className="text-emerald-500 mr-2" />
          <h4 className="font-medium">Investment Rating</h4>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
              {overallScore > 75 ? 'A' : overallScore > 65 ? 'B' : overallScore > 55 ? 'C' : overallScore > 45 ? 'D' : 'F'}
              {overallScore % 10 > 7 ? '+' : overallScore % 10 < 3 && overallScore > 45 ? '-' : ''}
            </div>
            <div className="ml-4">
              <div className="text-lg font-bold">
                {overallScore > 75 ? 'Strong Buy' : overallScore > 65 ? 'Buy' : overallScore > 55 ? 'Hold' : overallScore > 45 ? 'Underperform' : 'Sell'}
              </div>
              <div className="text-sm text-gray-600">
                {overallScore > 75 ? 'Excellent investment potential with strong fundamentals' : overallScore > 65 ? 'Good investment opportunity with solid metrics' : overallScore > 55 ? 'Average market with some positive indicators' : overallScore > 45 ? 'Caution advised, some concerning metrics' : 'Poor investment climate, significant challenges'}
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center text-sm">
              <Check size={16} className="text-emerald-600 mr-2" />
              {metrics.jobGrowth > 2 ? 'Strong job market' : 'Stable employment'}
            </div>
            <div className="flex items-center text-sm">
              <Check size={16} className="text-emerald-600 mr-2" />
              {metrics.populationGrowth > 1 ? 'Growing population' : 'Stable population'}
            </div>
            <div className="flex items-center text-sm">
              {metrics.affordabilityIndex > 60 ? <Check size={16} className="text-emerald-600 mr-2" /> : <AlertCircle size={16} className="text-red-600 mr-2" />}
              {metrics.affordabilityIndex > 60 ? 'Good affordability' : 'Affordability concerns'}
            </div>
            <div className="flex items-center text-sm">
              {metrics.crimeIndex < 50 ? <Check size={16} className="text-emerald-600 mr-2" /> : <AlertCircle size={16} className="text-red-600 mr-2" />}
              {metrics.crimeIndex < 50 ? 'Lower crime rates' : 'Safety concerns'}
            </div>
          </div>
        </div>
      </div>
    </div>;
};