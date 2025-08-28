import React, { useEffect, useState } from 'react';
import { Map, ChevronDown, ZoomIn, ZoomOut, LocateFixed } from 'lucide-react';
export const PriceHeatMap = ({
  selectedMarket
}) => {
  const [mapView, setMapView] = useState('price'); // price, growth, opportunity
  const [loading, setLoading] = useState(true);
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedMarket]);
  // Get the appropriate map image based on selected market and view
  const getMapImage = () => {
    if (selectedMarket.includes('Orlando')) {
      return mapView === 'price' ? 'https://source.unsplash.com/random/600x400/?map,orlando' : mapView === 'growth' ? 'https://source.unsplash.com/random/600x400/?heatmap,orlando' : 'https://source.unsplash.com/random/600x400/?map,florida';
    } else if (selectedMarket.includes('Miami')) {
      return mapView === 'price' ? 'https://source.unsplash.com/random/600x400/?map,miami' : mapView === 'growth' ? 'https://source.unsplash.com/random/600x400/?heatmap,miami' : 'https://source.unsplash.com/random/600x400/?map,florida';
    } else {
      return mapView === 'price' ? 'https://source.unsplash.com/random/600x400/?map,florida' : mapView === 'growth' ? 'https://source.unsplash.com/random/600x400/?heatmap,florida' : 'https://source.unsplash.com/random/600x400/?map,florida';
    }
  };
  // Neighborhood data for tooltips
  const neighborhoods = [{
    name: 'Downtown',
    price: '$425,000',
    growth: '+4.2%',
    x: 50,
    y: 50
  }, {
    name: 'Westside',
    price: '$350,000',
    growth: '+2.8%',
    x: 30,
    y: 40
  }, {
    name: 'Northside',
    price: '$380,000',
    growth: '+3.5%',
    x: 50,
    y: 30
  }, {
    name: 'Eastside',
    price: '$410,000',
    growth: '+3.9%',
    x: 70,
    y: 40
  }, {
    name: 'Southside',
    price: '$395,000',
    growth: '+3.2%',
    x: 50,
    y: 70
  }];
  return <div className="h-full flex flex-col">
      <div className="mb-3 flex justify-between">
        <div className="flex">
          <button className={`px-2 py-1 text-xs rounded-l-lg ${mapView === 'price' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setMapView('price')}>
            Price
          </button>
          <button className={`px-2 py-1 text-xs ${mapView === 'growth' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setMapView('growth')}>
            Growth
          </button>
          <button className={`px-2 py-1 text-xs rounded-r-lg ${mapView === 'opportunity' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`} onClick={() => setMapView('opportunity')}>
            Opportunity
          </button>
        </div>
        <div className="relative">
          <button className="flex items-center px-2 py-1 text-xs bg-gray-100 rounded-lg text-gray-600">
            <Map size={12} className="mr-1" />
            Neighborhoods
            <ChevronDown size={12} className="ml-1" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
        {loading ? <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div> : <>
            <img src={getMapImage()} alt={`${selectedMarket} ${mapView} map`} className="w-full h-full object-cover" />
            {/* Map controls */}
            <div className="absolute top-2 right-2 flex flex-col space-y-1">
              <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <ZoomIn size={16} />
              </button>
              <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <ZoomOut size={16} />
              </button>
              <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <LocateFixed size={16} />
              </button>
            </div>
            {/* Neighborhood markers */}
            {neighborhoods.map((hood, index) => <div key={index} className="absolute w-3 h-3 bg-primary rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform" style={{
          left: `${hood.x}%`,
          top: `${hood.y}%`
        }}>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-32 bg-white p-1.5 rounded-lg shadow-lg text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none">
                  <div className="font-medium">{hood.name}</div>
                  <div className="flex justify-between mt-1">
                    <span>Median:</span>
                    <span>{hood.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth:</span>
                    <span className="text-primary">{hood.growth}</span>
                  </div>
                </div>
              </div>)}
            {/* Legend */}
            <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md text-xs">
              <div className="font-medium mb-1">
                {mapView === 'price' ? 'Price Range' : mapView === 'growth' ? 'Price Growth' : 'Opportunity Score'}
              </div>
              <div className="flex items-center">
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"></div>
              </div>
              <div className="flex justify-between mt-1">
                <span>
                  {mapView === 'price' ? '$200K' : mapView === 'growth' ? '0%' : 'Low'}
                </span>
                <span>
                  {mapView === 'price' ? '$800K' : mapView === 'growth' ? '10%' : 'High'}
                </span>
              </div>
            </div>
          </>}
      </div>
    </div>;
};