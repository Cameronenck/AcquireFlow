import React from 'react';
import { ArrowUpRight, Star, TrendingUp, MapPin, DollarSign, BarChart2, Eye, PlusCircle } from 'lucide-react';
interface TopInvestmentCitiesProps {
  selectedMarket: string;
}
export const TopInvestmentCities: React.FC<TopInvestmentCitiesProps> = ({
  selectedMarket
}) => {
  // Generate top investment cities (in a real app, this would come from an API)
  const generateTopCities = () => {
    // Base cities data
    const cities = [{
      name: 'Austin, TX',
      score: 94,
      priceGrowth: 8.7,
      capRate: 5.2,
      jobGrowth: 4.8,
      affordability: 65,
      inWatchlist: true
    }, {
      name: 'Raleigh, NC',
      score: 92,
      priceGrowth: 7.9,
      capRate: 5.4,
      jobGrowth: 4.3,
      affordability: 72,
      inWatchlist: false
    }, {
      name: 'Nashville, TN',
      score: 90,
      priceGrowth: 8.2,
      capRate: 5.0,
      jobGrowth: 3.9,
      affordability: 68,
      inWatchlist: true
    }, {
      name: 'Charlotte, NC',
      score: 89,
      priceGrowth: 7.6,
      capRate: 5.3,
      jobGrowth: 3.7,
      affordability: 70,
      inWatchlist: false
    }, {
      name: 'Tampa, FL',
      score: 88,
      priceGrowth: 9.1,
      capRate: 4.9,
      jobGrowth: 3.5,
      affordability: 67,
      inWatchlist: false
    }, {
      name: 'Phoenix, AZ',
      score: 87,
      priceGrowth: 7.8,
      capRate: 5.1,
      jobGrowth: 3.4,
      affordability: 69,
      inWatchlist: true
    }, {
      name: 'Boise, ID',
      score: 86,
      priceGrowth: 9.3,
      capRate: 4.7,
      jobGrowth: 3.2,
      affordability: 64,
      inWatchlist: false
    }, {
      name: 'Jacksonville, FL',
      score: 85,
      priceGrowth: 7.5,
      capRate: 5.5,
      jobGrowth: 3.1,
      affordability: 75,
      inWatchlist: false
    }, {
      name: 'Dallas, TX',
      score: 84,
      priceGrowth: 6.9,
      capRate: 5.2,
      jobGrowth: 3.6,
      affordability: 71,
      inWatchlist: true
    }, {
      name: 'Columbus, OH',
      score: 83,
      priceGrowth: 6.4,
      capRate: 5.7,
      jobGrowth: 2.9,
      affordability: 78,
      inWatchlist: false
    }];
    // If the selected market is in the list, highlight it
    return cities.map(city => ({
      ...city,
      isCurrentMarket: city.name === selectedMarket
    }));
  };
  const topCities = generateTopCities();
  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-amber-500';
    return 'text-gray-600';
  };
  // Function to get background color for rank
  const getRankBackground = (rank: number) => {
    if (rank === 1) return 'bg-emerald-500 text-white';
    if (rank === 2) return 'bg-emerald-400 text-white';
    if (rank === 3) return 'bg-emerald-300 text-white';
    return 'bg-gray-100 text-gray-700';
  };
  return <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-dark flex items-center">
            <MapPin size={16} className="text-primary mr-2" />
            Top 10 Cities to Invest In
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Ranked by investment potential score based on price growth, cap
            rates, job growth, and affordability
          </p>
        </div>
        <button className="text-xs flex items-center text-primary hover:text-primary-dark transition-colors">
          <ArrowUpRight size={14} className="mr-1" />
          View Full Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="pb-2 text-left">Rank</th>
              <th className="pb-2 text-left">City</th>
              <th className="pb-2 text-center">Investment Score</th>
              <th className="pb-2 text-right">Price Growth</th>
              <th className="pb-2 text-right">Cap Rate</th>
              <th className="pb-2 text-right">Job Growth</th>
              <th className="pb-2 text-right">Affordability</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {topCities.map((city, index) => <tr key={index} className={`text-sm ${city.isCurrentMarket ? 'bg-emerald-50' : ''}`}>
                <td className="py-2.5">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${getRankBackground(index + 1)}`}>
                    {index + 1}
                  </span>
                </td>
                <td className="py-2.5">
                  <div className="flex items-center">
                    <span className="font-medium">{city.name}</span>
                    {city.isCurrentMarket && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                        Current
                      </span>}
                  </div>
                </td>
                <td className="py-2.5 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-primary rounded-full" style={{
                    width: `${city.score}%`
                  }}></div>
                    </div>
                    <span className={`font-medium ${getScoreColor(city.score)}`}>
                      {city.score}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 text-right">
                  <span className="text-emerald-600 flex items-center justify-end">
                    <TrendingUp size={14} className="mr-1" />
                    {city.priceGrowth}%
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <span className="text-primary">{city.capRate}%</span>
                </td>
                <td className="py-2.5 text-right">
                  <span className="text-emerald-600">{city.jobGrowth}%</span>
                </td>
                <td className="py-2.5 text-right">
                  <div className="flex items-center justify-end">
                    <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-amber-500 rounded-full" style={{
                    width: `${city.affordability}%`
                  }}></div>
                    </div>
                    <span>{city.affordability}</span>
                  </div>
                </td>
                <td className="py-2.5 text-right">
                  <div className="flex justify-end space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={14} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                      {city.inWatchlist ? <Star size={14} className="fill-amber-400 text-amber-400" /> : <PlusCircle size={14} />}
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-500">Data updated: June 2023</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Export Data
          </button>
          <button className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center">
            <BarChart2 size={12} className="mr-1" />
            Compare Cities
          </button>
        </div>
      </div>
    </div>;
};