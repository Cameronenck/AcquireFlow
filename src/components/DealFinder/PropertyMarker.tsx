import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Star, Heart } from 'lucide-react';
interface PropertyMarkerProps {
  property: any;
  isSelected: boolean;
  isSaved: boolean;
  onSelect: (property: any) => void;
  onSave: (propertyId: number) => void;
}
export const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  isSelected,
  isSaved,
  onSelect,
  onSave
}) => {
  // Create custom marker icon based on deal score
  const getMarkerIcon = () => {
    const scoreColor = property.dealScore >= 85 ? '#10b981' : property.dealScore >= 70 ? '#f59e0b' : '#6366f1';
    return L.divIcon({
      html: `
        <div class="property-marker ${isSelected ? 'selected' : ''}" style="background-color: ${scoreColor};">
          <span>${property.dealScore}</span>
        </div>
      `,
      className: 'custom-marker-container',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });
  };
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  return <Marker position={[property.lat, property.lng]} icon={getMarkerIcon()}>
      <Popup className="property-popup" minWidth={250} maxWidth={250}>
        <div className="p-1">
          <div className="mb-2 relative">
            <img src={property.image} alt={property.address} className="w-full h-32 object-cover rounded-md" />
            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
              <Star size={12} className="mr-1" />
              {property.dealScore}/100
            </div>
            <button className={`absolute top-2 left-2 p-2 rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-white text-gray-500'}`} onClick={e => {
            e.stopPropagation();
            onSave(property.id);
          }}>
              <Heart size={16} className={isSaved ? 'fill-current' : ''} />
            </button>
          </div>
          <h3 className="font-medium text-sm mb-1">{property.address}</h3>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">
              {property.city}, {property.state}
            </span>
            <span className="text-xs font-bold text-primary">
              {formatCurrency(property.price)}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span>{property.beds} bd</span>
            <span className="mx-1">•</span>
            <span>{property.baths} ba</span>
            <span className="mx-1">•</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center text-primary">
              <span>${property.cashFlow}/mo</span>
            </div>
            <div className="flex items-center text-primary">
              <span>{property.capRate}% cap</span>
            </div>
          </div>
          <button className="w-full bg-primary text-white text-xs py-1.5 rounded-md mt-2 font-medium" onClick={() => onSelect(property)}>
            View Details
          </button>
        </div>
      </Popup>
    </Marker>;
};