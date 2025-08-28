import React from 'react';
import { MapPin } from 'lucide-react';
export const MapView = ({
  properties
}) => {
  return <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Placeholder map background */}
      <img src="https://source.unsplash.com/random/1200x800/?map,city" alt="Map" className="w-full h-full object-cover" />
      {/* Property markers */}
      {properties.map(property => {
      // Generate random positions for demo purposes
      // In a real implementation, these would be actual lat/lng coordinates
      const left = `${Math.random() * 80 + 10}%`;
      const top = `${Math.random() * 80 + 10}%`;
      return <div key={property.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" style={{
        left,
        top
      }}>
            <div className="relative group">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                <MapPin size={16} className="text-white" />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <img src={property.image} alt={property.address} className="w-full h-24 object-cover rounded-lg mb-2" />
                <div className="text-sm font-medium truncate">
                  {property.address}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {property.city}, {property.state}
                </div>
                <div className="text-sm font-bold text-primary">
                  ${property.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>;
    })}
    </div>;
};