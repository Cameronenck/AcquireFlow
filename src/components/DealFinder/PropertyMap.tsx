import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Heart, CheckSquare, Star } from 'lucide-react';
// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});
interface Property {
  id: number;
  address: string;
  city: string;
  state: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  lat: number;
  lng: number;
  dealScore: number;
}
interface PropertyMapProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  selectedProperty: Property | null;
  savedProperties: number[];
  onSaveProperty: (id: number) => void;
  selectedProperties: number[];
  onSelectProperty: (id: number) => void;
}
export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  onPropertySelect,
  selectedProperty,
  savedProperties,
  onSaveProperty,
  selectedProperties,
  onSelectProperty
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  // Center map on properties
  useEffect(() => {
    if (map && properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(property => [property.lat, property.lng]));
      map.fitBounds(bounds, {
        padding: [50, 50]
      });
    }
  }, [map, properties]);
  // Create custom marker icons
  const createMarkerIcon = (property: Property) => {
    const isSelected = selectedProperties.includes(property.id);
    const isSaved = savedProperties.includes(property.id);
    const markerHtml = `
      <div class="custom-marker ${isSelected ? 'selected' : ''} ${isSaved ? 'saved' : ''}">
        <div class="marker-price">${formatCurrency(property.price)}</div>
        <div class="marker-score">${property.dealScore}</div>
      </div>
    `;
    return L.divIcon({
      html: markerHtml,
      className: 'custom-marker-container',
      iconSize: [80, 40],
      iconAnchor: [40, 40]
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
  return <>
      <style jsx global>{`
        .custom-marker-container {
          background: none;
          border: none;
        }
        .custom-marker {
          background: white;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          padding: 4px 8px;
          font-weight: bold;
          color: #1e3a8a;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          min-width: 80px;
          position: relative;
        }
        .custom-marker.selected {
          background: #3b82f6;
          color: white;
          border-color: #1e3a8a;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
          z-index: 1000 !important;
        }
        .custom-marker.saved {
          border-color: #ef4444;
        }
        .marker-price {
          font-size: 12px;
        }
        .marker-score {
          font-size: 10px;
          background: #f3f4f6;
          border-radius: 4px;
          padding: 0 4px;
          color: #3b82f6;
        }
        .custom-marker.selected .marker-score {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .leaflet-popup-content {
          margin: 0;
          width: 280px !important;
        }
        .property-popup {
          padding: 0;
        }
        .property-popup-image {
          height: 140px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .property-popup-content {
          padding: 12px;
        }
        .property-popup-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #3b82f6;
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
        }
        .property-popup-actions {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          gap: 6px;
        }
        .property-popup-action-btn {
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: none;
          color: #6b7280;
        }
        .property-popup-action-btn.active {
          background: #3b82f6;
          color: white;
        }
        .property-popup-action-btn.saved {
          background: #ef4444;
          color: white;
        }
      `}</style>
      <MapContainer style={{
      height: '100%',
      width: '100%'
    }} zoom={10} scrollWheelZoom={true} whenCreated={setMap}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map(property => <Marker key={property.id} position={[property.lat, property.lng]} icon={createMarkerIcon(property)}>
            <Popup className="property-popup">
              <div className="property-popup-image" style={{
            backgroundImage: `url(${property.image})`
          }}>
                <div className="property-popup-badge">
                  <Star size={10} className="mr-1" /> {property.dealScore}/100
                </div>
                <div className="property-popup-actions">
                  <button className={`property-popup-action-btn ${savedProperties.includes(property.id) ? 'saved' : ''}`} onClick={e => {
                e.stopPropagation();
                onSaveProperty(property.id);
              }}>
                    <Heart size={14} className={savedProperties.includes(property.id) ? 'fill-current' : ''} />
                  </button>
                  <button className={`property-popup-action-btn ${selectedProperties.includes(property.id) ? 'active' : ''}`} onClick={e => {
                e.stopPropagation();
                onSelectProperty(property.id);
              }}>
                    <CheckSquare size={14} className={selectedProperties.includes(property.id) ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>
              <div className="property-popup-content">
                <h3 className="font-medium text-dark text-sm mb-1">
                  {property.address}
                </h3>
                <p className="text-gray-500 text-xs mb-2">
                  {property.city}, {property.state}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary font-bold text-sm">
                    {formatCurrency(property.price)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {property.beds} bd • {property.baths} ba •{' '}
                    {property.sqft.toLocaleString()} sqft
                  </span>
                </div>
                <button className="w-full bg-primary text-white py-1.5 rounded text-xs font-medium hover:bg-primary-dark transition-colors" onClick={() => onPropertySelect(property)}>
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>)}
      </MapContainer>
    </>;
};