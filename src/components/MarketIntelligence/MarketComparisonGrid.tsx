import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart2, PlusCircle, MinusCircle, ArrowUpRight, Download, RefreshCcw, Info } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, Tooltip } from 'recharts';
interface MarketMetrics {
  name: string;
  medianPrice: string;
  priceChange: string;
  cashOnCash: string;
  capRate: string;
  appreciation: string;
  inventory: string;
  daysOnMarket: string;
  jobGrowth: string;
  populationGrowth: string;
  affordability: string;
  investorActivity: string;
  opportunity: number;
  risk: number;
  overallScore: number;
}
interface MarketComparisonGridProps {
  selectedMarkets: string[];
  onAddMarket: (market: string) => void;
  onRemoveMarket: (market: string) => void;
  availableMarkets: string[];
}
export const MarketComparisonGrid: React.FC<MarketComparisonGridProps> = ({
  selectedMarkets,
  onAddMarket,
  onRemoveMarket,
  availableMarkets
}) => {
  const [showAddMarket, setShowAddMarket] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [comparisonView, setComparisonView] = useState<'table' | 'radar'>('table');
  // Generate sample data for selected markets
  const getMarketData = (): MarketMetrics[] => {
    const baseData: {
      [key: string]: MarketMetrics;
    } = {
      'Orlando, FL': {
        name: 'Orlando, FL',
        medianPrice: '$375,000',
        priceChange: '+2.7%',
        cashOnCash: '7.2%',
        capRate: '5.8%',
        appreciation: '4.3%',
        inventory: '3,245',
        daysOnMarket: '18',
        jobGrowth: '+2.1%',
        populationGrowth: '+1.8%',
        affordability: '68/100',
        investorActivity: 'Medium',
        opportunity: 72,
        risk: 35,
        overallScore: 76
      },
      'Miami, FL': {
        name: 'Miami, FL',
        medianPrice: '$520,000',
        priceChange: '+4.3%',
        cashOnCash: '6.1%',
        capRate: '4.9%',
        appreciation: '5.2%',
        inventory: '5,872',
        daysOnMarket: '22',
        jobGrowth: '+1.9%',
        populationGrowth: '+1.2%',
        affordability: '52/100',
        investorActivity: 'High',
        opportunity: 65,
        risk: 48,
        overallScore: 68
      },
      'Tampa, FL': {
        name: 'Tampa, FL',
        medianPrice: '$398,000',
        priceChange: '+1.8%',
        cashOnCash: '6.8%',
        capRate: '5.3%',
        appreciation: '3.5%',
        inventory: '2,934',
        daysOnMarket: '20',
        jobGrowth: '+2.3%',
        populationGrowth: '+2.1%',
        affordability: '65/100',
        investorActivity: 'Medium',
        opportunity: 78,
        risk: 38,
        overallScore: 74
      },
      'Jacksonville, FL': {
        name: 'Jacksonville, FL',
        medianPrice: '$325,000',
        priceChange: '+3.2%',
        cashOnCash: '7.5%',
        capRate: '6.1%',
        appreciation: '3.8%',
        inventory: '2,156',
        daysOnMarket: '15',
        jobGrowth: '+2.5%',
        populationGrowth: '+1.9%',
        affordability: '72/100',
        investorActivity: 'Low',
        opportunity: 82,
        risk: 30,
        overallScore: 80
      },
      'Fort Lauderdale, FL': {
        name: 'Fort Lauderdale, FL',
        medianPrice: '$485,000',
        priceChange: '+3.5%',
        cashOnCash: '6.3%',
        capRate: '5.1%',
        appreciation: '4.7%',
        inventory: '3,789',
        daysOnMarket: '25',
        jobGrowth: '+1.8%',
        populationGrowth: '+1.4%',
        affordability: '58/100',
        investorActivity: 'Medium-High',
        opportunity: 68,
        risk: 42,
        overallScore: 70
      }
    };
    // Return data for selected markets or default to Orlando if not found
    return selectedMarkets.map(market => baseData[market] || baseData['Orlando, FL']);
  };
  const marketData = getMarketData();
  // Filter available markets based on search term
  const filteredMarkets = availableMarkets.filter(market => market.toLowerCase().includes(searchTerm.toLowerCase()));
  // Transform data for radar chart
  const getRadarData = () => {
    const metrics = [{
      name: 'Cash Flow',
      key: 'cashOnCash',
      divider: 8
    }, {
      name: 'Appreciation',
      key: 'appreciation',
      divider: 6
    }, {
      name: 'Affordability',
      key: 'opportunity',
      divider: 100
    }, {
      name: 'Job Growth',
      key: 'jobGrowth',
      divider: 3
    }, {
      name: 'Low Risk',
      key: 'risk',
      divider: -100,
      inverse: true
    }];
    return metrics.map(metric => {
      const result: {
        [key: string]: any;
      } = {
        metric: metric.name
      };
      marketData.forEach(market => {
        const value = metric.key === 'cashOnCash' || metric.key === 'appreciation' || metric.key === 'jobGrowth' ? parseFloat(market[metric.key].replace('%', '')) : market[metric.key];
        result[market.name] = metric.inverse ? 100 - value / metric.divider * 100 : value / Math.abs(metric.divider) * 100;
      });
      return result;
    });
  };
  const radarData = getRadarData();
  const COLORS = ['#3AB795', '#FECA57', '#FF6B6B', '#4B5563', '#9CA3AF'];
  return <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold flex items-center">
          <BarChart2 size={20} className="mr-2 text-primary" />
          Market Comparison
        </h2>
        <div className="flex space-x-2">
          <button className={`px-3 py-1.5 text-xs rounded-lg ${comparisonView === 'table' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setComparisonView('table')}>
            Table View
          </button>
          <button className={`px-3 py-1.5 text-xs rounded-lg ${comparisonView === 'radar' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setComparisonView('radar')}>
            Radar View
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Selected Markets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedMarkets.map(market => <div key={market} className="bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-lg text-xs flex items-center">
            {market}
            <button className="ml-2 hover:text-primary-dark" onClick={() => onRemoveMarket(market)}>
              <MinusCircle size={14} />
            </button>
          </div>)}
        <button className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs flex items-center hover:bg-gray-200" onClick={() => setShowAddMarket(!showAddMarket)}>
          <PlusCircle size={14} className="mr-1" />
          Add Market
        </button>
      </div>

      {/* Add Market Dropdown */}
      {showAddMarket && <div className="mb-4 p-3 border border-gray-200 rounded-lg">
          <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2" placeholder="Search markets..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <div className="max-h-40 overflow-y-auto">
            {filteredMarkets.length > 0 ? filteredMarkets.map(market => <button key={market} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg flex justify-between items-center" onClick={() => {
          onAddMarket(market);
          setShowAddMarket(false);
          setSearchTerm('');
        }} disabled={selectedMarkets.includes(market)}>
                  <span>{market}</span>
                  {selectedMarkets.includes(market) ? <span className="text-xs text-gray-400">Already added</span> : <PlusCircle size={14} className="text-primary" />}
                </button>) : <div className="text-center py-2 text-gray-500 text-sm">
                No markets found
              </div>}
          </div>
        </div>}

      {/* Table View */}
      {comparisonView === 'table' && <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500">
                <th className="px-4 py-2 text-left font-medium">Metric</th>
                {marketData.map(market => <th key={market.name} className="px-4 py-2 text-left font-medium">
                    {market.name}
                  </th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-sm font-medium">Median Price</td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.medianPrice}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  Price Change (YoY)
                </td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm flex items-center">
                    {market.priceChange.startsWith('+') ? <TrendingUp size={14} className="text-primary mr-1" /> : <TrendingDown size={14} className="text-secondary mr-1" />}
                    {market.priceChange}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  Cash-on-Cash Return
                </td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.cashOnCash}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">Cap Rate</td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.capRate}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  Appreciation Rate
                </td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.appreciation}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">Job Growth</td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.jobGrowth}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  Population Growth
                </td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.populationGrowth}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  Days on Market
                </td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.daysOnMarket} days
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">Affordability</td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.affordability}
                  </td>)}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">
                  Investor Activity
                </td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm">
                    {market.investorActivity}
                  </td>)}
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold">Overall Score</td>
                {marketData.map(market => <td key={market.name} className="px-4 py-3 text-sm font-bold">
                    {market.overallScore}/100
                  </td>)}
              </tr>
            </tbody>
          </table>
        </div>}

      {/* Radar Chart View */}
      {comparisonView === 'radar' && <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{
            fill: '#6B7280',
            fontSize: 12
          }} />
              {marketData.map((market, index) => <Radar key={market.name} name={market.name} dataKey={market.name} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} fillOpacity={0.2} />)}
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>}

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg flex items-center">
          View Detailed Analysis
          <ArrowUpRight size={16} className="ml-1.5" />
        </button>
      </div>
    </div>;
};