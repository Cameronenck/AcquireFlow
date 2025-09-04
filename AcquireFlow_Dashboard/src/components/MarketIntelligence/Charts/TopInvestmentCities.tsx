import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Star, TrendingUp, MapPin, BarChart2, Eye, PlusCircle } from 'lucide-react';
import { propertyService, type LeaderboardItem } from '../../../services/propertyService';

interface TopInvestmentCitiesProps {
  selectedMarket: string;
}

export const TopInvestmentCities: React.FC<TopInvestmentCitiesProps> = ({ selectedMarket }) => {
  const [items, setItems] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await propertyService.getInvestmentLeaderboard();
        if (mounted) setItems(data);
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to load leaderboard');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-amber-500';
    return 'text-gray-600';
  };

  const getRankBackground = (rank: number) => {
    if (rank === 1) return 'bg-emerald-500 text-white';
    if (rank === 2) return 'bg-emerald-400 text-white';
    if (rank === 3) return 'bg-emerald-300 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  const list = useMemo(() => {
    const formatted = items.map((it) => ({
      name: `${it.city}, ${it.state}`,
      county: it.county,
      score: it.investmentScore,
      priceGrowth: it.priceGrowth,
      capRate: it.capRate,
      jobGrowth: it.jobGrowth,
      affordability: it.affordability,
      rank: it.rank,
    }));
    return formatted.map((city) => ({
      ...city,
      isCurrentMarket: city.name === selectedMarket,
      inWatchlist: false,
    }));
  }, [items, selectedMarket]);

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
        {loading && <div className="text-sm text-gray-500 p-3">Loading leaderboard...</div>}
        {error && !loading && <div className="text-sm text-red-600 p-3">{error}</div>}
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
            {!loading && !error && list.map((city, index) => <tr key={index} className={`text-sm ${city.isCurrentMarket ? 'bg-emerald-50' : ''}`}>
                <td className="py-2.5">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${getRankBackground(city.rank || index + 1)}`}>
                    {city.rank || index + 1}
                  </span>
                </td>
                <td className="py-2.5">
                  <div className="flex items-center">
                    <span className="font-medium">{city.name}</span>
                    {city.county && <span className="ml-2 text-xs text-gray-500">— {city.county}</span>}
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
        <div className="text-xs text-gray-500">Data updated: {new Date().toLocaleDateString()}</div>
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