import React, { useEffect, useState } from 'react';
import { Map, PieChart, Sliders, Filter, Download, ChevronDown, Layers, Info, ArrowUpRight, ZoomIn, ZoomOut, Home, DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
interface InvestmentHeatmapProps {
  city: string;
  timeframe: string;
  dataSource: string;
}
export const InvestmentHeatmap: React.FC<InvestmentHeatmapProps> = ({
  city,
  timeframe,
  dataSource
}) => {
  const [mapType, setMapType] = useState<'opportunity' | 'price' | 'growth' | 'cashflow'>('opportunity');
  const [propertyType, setPropertyType] = useState<'all' | 'single-family' | 'multi-family' | 'condo'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showNeighborhoodLabels, setShowNeighborhoodLabels] = useState<boolean>(true);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Simulate loading the map
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [city, mapType, propertyType]);
  // Generate neighborhood data based on city
  const generateNeighborhoodData = () => {
    let neighborhoods: {
      name: string;
      x: number;
      y: number;
    }[] = [];
    if (city.includes('Orlando')) {
      neighborhoods = [{
        name: 'Downtown',
        x: 50,
        y: 50
      }, {
        name: 'Lake Nona',
        x: 65,
        y: 65
      }, {
        name: 'Winter Park',
        x: 45,
        y: 35
      }, {
        name: 'College Park',
        x: 40,
        y: 45
      }, {
        name: 'Baldwin Park',
        x: 55,
        y: 40
      }, {
        name: 'Thornton Park',
        x: 52,
        y: 52
      }, {
        name: 'Metrowest',
        x: 30,
        y: 50
      }, {
        name: 'Doctor Phillips',
        x: 25,
        y: 60
      }, {
        name: 'Avalon Park',
        x: 70,
        y: 45
      }, {
        name: 'Waterford Lakes',
        x: 65,
        y: 40
      }];
    } else if (city.includes('Miami')) {
      neighborhoods = [{
        name: 'Downtown',
        x: 50,
        y: 50
      }, {
        name: 'Brickell',
        x: 52,
        y: 55
      }, {
        name: 'Wynwood',
        x: 45,
        y: 45
      }, {
        name: 'Coral Gables',
        x: 40,
        y: 60
      }, {
        name: 'Little Havana',
        x: 45,
        y: 52
      }, {
        name: 'Coconut Grove',
        x: 45,
        y: 65
      }, {
        name: 'Edgewater',
        x: 55,
        y: 45
      }, {
        name: 'Miami Beach',
        x: 65,
        y: 45
      }, {
        name: 'Design District',
        x: 48,
        y: 40
      }, {
        name: 'Doral',
        x: 30,
        y: 45
      }];
    } else if (city.includes('Tampa')) {
      neighborhoods = [{
        name: 'Downtown',
        x: 50,
        y: 50
      }, {
        name: 'Hyde Park',
        x: 45,
        y: 55
      }, {
        name: 'Channelside',
        x: 55,
        y: 50
      }, {
        name: 'Westshore',
        x: 35,
        y: 45
      }, {
        name: 'Seminole Heights',
        x: 45,
        y: 35
      }, {
        name: 'SoHo',
        x: 42,
        y: 52
      }, {
        name: 'Tampa Heights',
        x: 50,
        y: 40
      }, {
        name: 'Davis Island',
        x: 55,
        y: 55
      }, {
        name: 'Carrollwood',
        x: 40,
        y: 25
      }, {
        name: 'Brandon',
        x: 70,
        y: 45
      }];
    } else {
      neighborhoods = [{
        name: 'Downtown',
        x: 50,
        y: 50
      }, {
        name: 'Riverside',
        x: 45,
        y: 45
      }, {
        name: 'Southside',
        x: 55,
        y: 55
      }, {
        name: 'Northside',
        x: 50,
        y: 30
      }, {
        name: 'Westside',
        x: 30,
        y: 50
      }, {
        name: 'Arlington',
        x: 65,
        y: 45
      }, {
        name: 'Springfield',
        x: 48,
        y: 42
      }, {
        name: 'San Marco',
        x: 52,
        y: 55
      }, {
        name: 'Mandarin',
        x: 50,
        y: 70
      }, {
        name: 'Baymeadows',
        x: 60,
        y: 60
      }];
    }
    // Add random metrics to each neighborhood
    return neighborhoods.map(hood => {
      // Generate random but reasonable values for each neighborhood
      const priceBase = city.includes('Miami') ? 550000 : city.includes('Orlando') ? 380000 : city.includes('Tampa') ? 420000 : 350000;
      const priceVariation = Math.random() * 0.5 + 0.75; // 0.75 to 1.25
      const price = Math.round(priceBase * priceVariation);
      // Opportunity score - higher for neighborhoods closer to downtown with good price/growth ratio
      const distanceFromCenter = Math.sqrt(Math.pow(hood.x - 50, 2) + Math.pow(hood.y - 50, 2));
      const opportunityBase = 100 - distanceFromCenter * 1.5;
      const opportunity = Math.min(95, Math.max(60, Math.round(opportunityBase + (Math.random() * 20 - 10))));
      // Growth - higher for emerging neighborhoods
      const growthBase = (100 - distanceFromCenter) / 5;
      const growth = Math.max(2, Math.min(8, growthBase + (Math.random() * 2 - 1)));
      // Cash flow - typically inverse to growth potential
      const cashFlowBase = 5 - growth / 10;
      const cashFlow = Math.max(3, Math.min(7, cashFlowBase + (Math.random() * 1 - 0.5)));
      // Risk - higher for areas further from center or with extreme metrics
      const riskBase = distanceFromCenter / 3;
      const risk = Math.min(80, Math.max(20, Math.round(riskBase + (Math.random() * 20 - 10))));
      // Days on market - correlated with desirability
      const dom = Math.round(15 + distanceFromCenter / 2 + (Math.random() * 10 - 5));
      // Inventory - more in developing areas
      const inventory = Math.round(20 + distanceFromCenter + (Math.random() * 20 - 10));
      return {
        ...hood,
        price,
        opportunity,
        growth,
        cashFlow,
        risk,
        dom,
        inventory
      };
    });
  };
  const neighborhoodData = generateNeighborhoodData();
  // Get neighborhood metrics
  const getNeighborhoodMetrics = (name: string) => {
    return neighborhoodData.find(n => n.name === name);
  };
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get map image based on selected type
  const getMapImage = () => {
    if (loading) return '';
    // In a real implementation, these would be actual map images
    const citySlug = city.split(',')[0].toLowerCase().replace(' ', '-');
    if (mapType === 'opportunity') {
      return `https://source.unsplash.com/random/1200x800/?map,heatmap,${citySlug}`;
    } else if (mapType === 'price') {
      return `https://source.unsplash.com/random/1200x800/?map,price,${citySlug}`;
    } else if (mapType === 'growth') {
      return `https://source.unsplash.com/random/1200x800/?map,growth,${citySlug}`;
    } else {
      return `https://source.unsplash.com/random/1200x800/?map,cashflow,${citySlug}`;
    }
  };
  // Get color for neighborhood marker based on map type
  const getMarkerColor = (neighborhood: any) => {
    if (mapType === 'opportunity') {
      return neighborhood.opportunity > 80 ? '#3AB795' : neighborhood.opportunity > 70 ? '#FECA57' : neighborhood.opportunity > 60 ? '#FF6B6B' : '#9CA3AF';
    } else if (mapType === 'price') {
      // Inverse color scale for price (lower is better)
      return neighborhood.price < 350000 ? '#3AB795' : neighborhood.price < 500000 ? '#FECA57' : neighborhood.price < 650000 ? '#FF6B6B' : '#9CA3AF';
    } else if (mapType === 'growth') {
      return neighborhood.growth > 5 ? '#3AB795' : neighborhood.growth > 3 ? '#FECA57' : neighborhood.growth > 2 ? '#FF6B6B' : '#9CA3AF';
    } else {
      return neighborhood.cashFlow > 6 ? '#3AB795' : neighborhood.cashFlow > 5 ? '#FECA57' : neighborhood.cashFlow > 4 ? '#FF6B6B' : '#9CA3AF';
    }
  };
  // Get size for neighborhood marker based on map type and metrics
  const getMarkerSize = (neighborhood: any) => {
    if (mapType === 'opportunity') {
      return Math.max(6, Math.min(14, neighborhood.opportunity / 10));
    } else if (mapType === 'price') {
      // Inverse size for price (smaller is better)
      return Math.max(6, Math.min(14, (1000000 - neighborhood.price) / 100000));
    } else if (mapType === 'growth') {
      return Math.max(6, Math.min(14, neighborhood.growth * 1.5));
    } else {
      return Math.max(6, Math.min(14, neighborhood.cashFlow * 1.5));
    }
  };
  return <div className="space-y-6">
      {/* Map Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Filter size={18} className="text-primary mr-2" />
            <h3 className="font-medium">Investment Map Filters</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Map Type Selector */}
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              <button className={`px-3 py-2 text-xs font-medium ${mapType === 'opportunity' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`} onClick={() => setMapType('opportunity')}>
                Opportunity
              </button>
              <button className={`px-3 py-2 text-xs font-medium ${mapType === 'price' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`} onClick={() => setMapType('price')}>
                Price
              </button>
              <button className={`px-3 py-2 text-xs font-medium ${mapType === 'growth' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`} onClick={() => setMapType('growth')}>
                Growth
              </button>
              <button className={`px-3 py-2 text-xs font-medium ${mapType === 'cashflow' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`} onClick={() => setMapType('cashflow')}>
                Cash Flow
              </button>
            </div>
            {/* Property Type Filter */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={propertyType} onChange={e => setPropertyType(e.target.value as any)}>
                <option value="all">All Property Types</option>
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi-Family</option>
                <option value="condo">Condo</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Labels Toggle */}
            <button className={`flex items-center px-3 py-2 rounded-lg text-xs ${showNeighborhoodLabels ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setShowNeighborhoodLabels(!showNeighborhoodLabels)}>
              <Layers size={14} className="mr-1.5" />
              {showNeighborhoodLabels ? 'Hide Labels' : 'Show Labels'}
            </button>
            {/* Export Button */}
            <button className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs">
              <Download size={14} className="mr-1.5" />
              Export Map
            </button>
          </div>
        </div>
      </div>
      {/* Map and Neighborhood Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Heatmap */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <Map size={18} className="text-primary mr-2" />
            {mapType.charAt(0).toUpperCase() + mapType.slice(1)} Heatmap
          </h3>
          <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            {loading ? <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div> : <>
                <img src={getMapImage()} alt={`${city} ${mapType} heatmap`} className="w-full h-full object-cover" />
                {/* Neighborhood Markers */}
                {neighborhoodData.map((neighborhood, index) => <div key={index} className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${selectedNeighborhood === neighborhood.name ? 'z-30 scale-125' : 'z-20 hover:scale-110'}`} style={{
              left: `${neighborhood.x}%`,
              top: `${neighborhood.y}%`
            }} onClick={() => setSelectedNeighborhood(neighborhood.name === selectedNeighborhood ? null : neighborhood.name)}>
                    <div className={`rounded-full border-2 border-white shadow-md ${selectedNeighborhood === neighborhood.name ? 'animate-pulse' : ''}`} style={{
                width: `${getMarkerSize(neighborhood)}px`,
                height: `${getMarkerSize(neighborhood)}px`,
                backgroundColor: getMarkerColor(neighborhood)
              }}></div>
                    {/* Neighborhood Label */}
                    {(showNeighborhoodLabels || selectedNeighborhood === neighborhood.name) && <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                        <span className="bg-white bg-opacity-75 text-xs px-1.5 py-0.5 rounded shadow-sm">
                          {neighborhood.name}
                        </span>
                      </div>}
                    {/* Tooltip for selected neighborhood */}
                    {selectedNeighborhood === neighborhood.name && <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-lg shadow-lg text-xs z-40">
                        <h4 className="font-medium text-center mb-1">
                          {neighborhood.name}
                        </h4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                          <div className="flex items-center">
                            <DollarSign size={10} className="mr-1 text-gray-500" />
                            <span>
                              Median: {formatCurrency(neighborhood.price)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp size={10} className="mr-1 text-gray-500" />
                            <span>
                              Growth: {neighborhood.growth.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center">
                            <PieChart size={10} className="mr-1 text-gray-500" />
                            <span>
                              Cap Rate: {neighborhood.cashFlow.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={10} className="mr-1 text-gray-500" />
                            <span>DOM: {neighborhood.dom} days</span>
                          </div>
                        </div>
                      </div>}
                  </div>)}
                {/* Map controls */}
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    <ZoomIn size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    <ZoomOut size={16} />
                  </button>
                </div>
                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md text-xs">
                  <div className="font-medium mb-1">
                    {mapType === 'opportunity' ? 'Investment Opportunity' : mapType === 'price' ? 'Price Range' : mapType === 'growth' ? 'Appreciation Rate' : 'Cash Flow Potential'}
                  </div>
                  <div className="flex items-center">
                    <div className="w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500"></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>
                      {mapType === 'opportunity' ? 'Low' : mapType === 'price' ? 'High' : mapType === 'growth' ? 'Low' : 'Low'}
                    </span>
                    <span>
                      {mapType === 'opportunity' ? 'High' : mapType === 'price' ? 'Low' : mapType === 'growth' ? 'High' : 'High'}
                    </span>
                  </div>
                </div>
              </>}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            {mapType === 'opportunity' ? 'Opportunity score combines price, growth potential, and cash flow metrics to identify the best investment areas.' : mapType === 'price' ? 'Price heatmap shows median property values across neighborhoods. Lower prices may indicate better entry points.' : mapType === 'growth' ? 'Growth heatmap shows projected appreciation rates. Higher growth areas may offer better long-term returns.' : 'Cash flow heatmap shows potential rental yields. Higher cash flow areas typically offer better immediate returns.'}
          </div>
        </div>
        {/* Neighborhood Analysis */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h3 className="font-medium flex items-center mb-4">
            <PieChart size={18} className="text-primary mr-2" />
            Neighborhood Analysis
          </h3>
          {selectedNeighborhood ? <div>
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold">{selectedNeighborhood}</h4>
                <p className="text-sm text-gray-500">Investment Profile</p>
              </div>
              {/* Neighborhood Metrics */}
              <div className="space-y-4">
                {/* Price */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <Home size={14} className="mr-1.5 text-gray-400" />
                      Median Price
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(getNeighborhoodMetrics(selectedNeighborhood)?.price || 0)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, (getNeighborhoodMetrics(selectedNeighborhood)?.price || 0) / 10000)}%`,
                  backgroundColor: getNeighborhoodMetrics(selectedNeighborhood)?.price || 0 < 400000 ? '#3AB795' : getNeighborhoodMetrics(selectedNeighborhood)?.price || 0 < 600000 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>
                      vs. City Avg:{' '}
                      {getNeighborhoodMetrics(selectedNeighborhood)?.price || 0 < 400000 ? 'Below' : getNeighborhoodMetrics(selectedNeighborhood)?.price || 0 < 500000 ? 'Average' : 'Above'}
                    </span>
                  </div>
                </div>
                {/* Appreciation Rate */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <TrendingUp size={14} className="mr-1.5 text-gray-400" />
                      Appreciation Rate
                    </span>
                    <span className="text-sm font-medium">
                      {(getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, (getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0) * 12.5)}%`,
                  backgroundColor: (getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0) > 5 ? '#3AB795' : (getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0) > 3 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Annual projected growth</span>
                  </div>
                </div>
                {/* Cash Flow / Cap Rate */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <DollarSign size={14} className="mr-1.5 text-gray-400" />
                      Cap Rate
                    </span>
                    <span className="text-sm font-medium">
                      {(getNeighborhoodMetrics(selectedNeighborhood)?.cashFlow || 0).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, (getNeighborhoodMetrics(selectedNeighborhood)?.cashFlow || 0) * 14)}%`,
                  backgroundColor: (getNeighborhoodMetrics(selectedNeighborhood)?.cashFlow || 0) > 6 ? '#3AB795' : (getNeighborhoodMetrics(selectedNeighborhood)?.cashFlow || 0) > 5 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Typical rental return</span>
                  </div>
                </div>
                {/* Days on Market */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <Clock size={14} className="mr-1.5 text-gray-400" />
                      Days on Market
                    </span>
                    <span className="text-sm font-medium">
                      {getNeighborhoodMetrics(selectedNeighborhood)?.dom || 0}{' '}
                      days
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, (getNeighborhoodMetrics(selectedNeighborhood)?.dom || 0) * 2)}%`,
                  backgroundColor: (getNeighborhoodMetrics(selectedNeighborhood)?.dom || 0) < 20 ? '#3AB795' : (getNeighborhoodMetrics(selectedNeighborhood)?.dom || 0) < 30 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Market liquidity indicator</span>
                  </div>
                </div>
                {/* Inventory */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <Home size={14} className="mr-1.5 text-gray-400" />
                      Active Listings
                    </span>
                    <span className="text-sm font-medium">
                      {getNeighborhoodMetrics(selectedNeighborhood)?.inventory || 0}{' '}
                      properties
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, (getNeighborhoodMetrics(selectedNeighborhood)?.inventory || 0) * 1.5)}%`,
                  backgroundColor: (getNeighborhoodMetrics(selectedNeighborhood)?.inventory || 0) > 30 ? '#3AB795' : (getNeighborhoodMetrics(selectedNeighborhood)?.inventory || 0) > 15 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Current available inventory</span>
                  </div>
                </div>
                {/* Risk */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <AlertTriangle size={14} className="mr-1.5 text-gray-400" />
                      Investment Risk
                    </span>
                    <span className="text-sm font-medium">
                      {getNeighborhoodMetrics(selectedNeighborhood)?.risk || 0}
                      /100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, getNeighborhoodMetrics(selectedNeighborhood)?.risk || 0)}%`,
                  backgroundColor: (getNeighborhoodMetrics(selectedNeighborhood)?.risk || 0) < 30 ? '#3AB795' : (getNeighborhoodMetrics(selectedNeighborhood)?.risk || 0) < 50 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Lower is better</span>
                  </div>
                </div>
                {/* Overall Score */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm flex items-center">
                      <PieChart size={14} className="mr-1.5 text-gray-400" />
                      Opportunity Score
                    </span>
                    <span className="text-sm font-medium">
                      {getNeighborhoodMetrics(selectedNeighborhood)?.opportunity || 0}
                      /100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{
                  width: `${Math.min(100, getNeighborhoodMetrics(selectedNeighborhood)?.opportunity || 0)}%`,
                  backgroundColor: (getNeighborhoodMetrics(selectedNeighborhood)?.opportunity || 0) > 80 ? '#3AB795' : (getNeighborhoodMetrics(selectedNeighborhood)?.opportunity || 0) > 70 ? '#FECA57' : '#FF6B6B'
                }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Overall investment potential</span>
                  </div>
                </div>
              </div>
              {/* Investment Strategy Recommendation */}
              <div className="mt-6 bg-primary bg-opacity-5 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-primary mb-2">
                  Investment Strategy
                </h4>
                <p className="text-sm">
                  {(getNeighborhoodMetrics(selectedNeighborhood)?.opportunity || 0) > 80 ? `${selectedNeighborhood} offers excellent investment potential with strong ${(getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0) > 5 ? 'appreciation' : 'cash flow'} characteristics. Consider ${(getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0) > 5 ? 'buy-and-hold' : 'value-add'} strategies for optimal returns.` : (getNeighborhoodMetrics(selectedNeighborhood)?.opportunity || 0) > 70 ? `${selectedNeighborhood} presents good investment opportunities with balanced ${(getNeighborhoodMetrics(selectedNeighborhood)?.growth || 0) > 4 ? 'growth' : 'cash flow'} potential. ${(getNeighborhoodMetrics(selectedNeighborhood)?.risk || 0) < 40 ? 'Lower risk profile makes this suitable for most investors.' : 'Consider the moderate risk factors before investing.'}` : `${selectedNeighborhood} has moderate investment potential. ${(getNeighborhoodMetrics(selectedNeighborhood)?.cashFlow || 0) > 5 ? 'Focus on cash flow properties' : 'Look for specific value-add opportunities'} rather than market-wide investments.`}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-primary text-white text-sm rounded-lg flex items-center">
                  View Properties
                  <ArrowUpRight size={16} className="ml-1.5" />
                </button>
              </div>
            </div> : <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center p-6">
                <Map size={48} className="mx-auto text-gray-300 mb-2" />
                <h4 className="text-lg font-medium text-gray-700">
                  Select a Neighborhood
                </h4>
                <p className="text-gray-500 mt-2">
                  Click on any neighborhood marker on the map to view detailed
                  investment metrics and recommendations.
                </p>
              </div>
            </div>}
        </div>
      </div>
      {/* Investment Insights */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
        <h3 className="font-medium flex items-center mb-4">
          <Info size={18} className="text-primary mr-2" />
          Investment Insights for {city}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary bg-opacity-5 p-4 rounded-lg">
            <h4 className="font-medium text-primary mb-2">
              Top Opportunity Areas
            </h4>
            <ul className="space-y-2 text-sm">
              {neighborhoodData.sort((a, b) => b.opportunity - a.opportunity).slice(0, 3).map((neighborhood, index) => <li key={index} className="flex items-center justify-between">
                    <span>{neighborhood.name}</span>
                    <span className="font-medium">
                      {neighborhood.opportunity}/100
                    </span>
                  </li>)}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              These neighborhoods offer the best balance of appreciation
              potential, cash flow, and risk profile.
            </p>
          </div>
          <div className="bg-tertiary bg-opacity-5 p-4 rounded-lg">
            <h4 className="font-medium text-tertiary-dark mb-2">
              Best Cash Flow Areas
            </h4>
            <ul className="space-y-2 text-sm">
              {neighborhoodData.sort((a, b) => b.cashFlow - a.cashFlow).slice(0, 3).map((neighborhood, index) => <li key={index} className="flex items-center justify-between">
                    <span>{neighborhood.name}</span>
                    <span className="font-medium">
                      {neighborhood.cashFlow.toFixed(1)}%
                    </span>
                  </li>)}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              These neighborhoods typically offer the strongest rental returns
              relative to purchase price.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Highest Appreciation Areas</h4>
            <ul className="space-y-2 text-sm">
              {neighborhoodData.sort((a, b) => b.growth - a.growth).slice(0, 3).map((neighborhood, index) => <li key={index} className="flex items-center justify-between">
                    <span>{neighborhood.name}</span>
                    <span className="font-medium">
                      {neighborhood.growth.toFixed(1)}%
                    </span>
                  </li>)}
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              These neighborhoods are projected to see the strongest price
              appreciation over the next 5 years.
            </p>
          </div>
        </div>
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-3">Overall Market Assessment</h4>
          <p className="text-sm">
            {city} currently presents a
            {neighborhoodData.reduce((sum, n) => sum + n.opportunity, 0) / neighborhoodData.length > 75 ? ' strong' : neighborhoodData.reduce((sum, n) => sum + n.opportunity, 0) / neighborhoodData.length > 65 ? ' favorable' : ' moderate'}
            investment climate with
            {neighborhoodData.reduce((sum, n) => sum + n.growth, 0) / neighborhoodData.length > 4.5 ? ' above-average appreciation potential' : ' moderate appreciation potential'}
            and
            {neighborhoodData.reduce((sum, n) => sum + n.cashFlow, 0) / neighborhoodData.length > 5.5 ? ' strong cash flow characteristics.' : neighborhoodData.reduce((sum, n) => sum + n.cashFlow, 0) / neighborhoodData.length > 4.5 ? ' reasonable cash flow potential.' : ' cash flow challenges in some areas.'}
            {neighborhoodData.reduce((sum, n) => sum + n.risk, 0) / neighborhoodData.length < 40 ? ' Risk factors are generally low across most neighborhoods.' : neighborhoodData.reduce((sum, n) => sum + n.risk, 0) / neighborhoodData.length < 50 ? ' Risk factors are moderate and vary significantly by neighborhood.' : ' Investors should carefully consider the elevated risk factors in many neighborhoods.'}
          </p>
          <p className="text-sm mt-2">
            {city.includes('Orlando') ? 'The market is heavily influenced by tourism and population growth, with strong rental demand near major attractions and employment centers.' : city.includes('Miami') ? 'The market features significant international investment and luxury segments, with varying dynamics between coastal and inland areas.' : city.includes('Tampa') ? 'The market benefits from diversified economic drivers and relatively affordable housing compared to other Florida coastal cities.' : 'The market offers a balanced mix of urban and suburban opportunities with varying price points and investment profiles.'}
          </p>
        </div>
      </div>
    </div>;
};