import React from 'react';
import { X, Home, MapPin, DollarSign, Bed, Bath, Square, Calendar, BarChart3, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
export const PropertyDetailsModal = ({
  property,
  isOpen,
  onClose,
  investmentStrategy
}) => {
  if (!isOpen || !property) return null;
  const formatPrice = price => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-scale-in">
        {/* Close button */}
        <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Property image */}
          <div className="md:w-1/2 h-64 md:h-auto relative">
            <img src={property.image} alt={`${property.address}, ${property.city}`} className="w-full h-full object-cover" />
            {/* Image navigation controls */}
            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full text-gray-700 hover:bg-opacity-100 transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-75 rounded-full text-gray-700 hover:bg-opacity-100 transition-all">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-70"></div>
            <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
              {formatPrice(property.price)}
            </div>
          </div>
          {/* Right side - Property details */}
          <div className="md:w-1/2 p-6 overflow-y-auto" style={{
          maxHeight: '90vh'
        }}>
            <h2 className="text-xl font-bold text-dark mb-2">
              {property.address}
            </h2>
            <p className="text-gray-500 mb-4 flex items-center">
              <MapPin size={16} className="mr-1" />
              {property.city}, {property.state} {property.zip}
            </p>
            {/* Property specs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Bed size={18} className="text-gray-500 mb-1" />
                <span className="font-medium">{property.beds}</span>
                <span className="text-xs text-gray-500">Beds</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Bath size={18} className="text-gray-500 mb-1" />
                <span className="font-medium">{property.baths}</span>
                <span className="text-xs text-gray-500">Baths</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Square size={18} className="text-gray-500 mb-1" />
                <span className="font-medium">
                  {property.sqft.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">Sq Ft</span>
              </div>
            </div>
            {/* Financial metrics */}
            <h3 className="font-medium text-dark mb-3">Investment Metrics</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Cap Rate</span>
                  <span className="font-medium text-primary">
                    {property.capRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{
                  width: `${Math.min(property.capRate * 10, 100)}%`
                }}></div>
                </div>
              </div>
              <div className="p-3 bg-tertiary bg-opacity-10 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Cash on Cash</span>
                  <span className="font-medium text-tertiary-dark">
                    {property.cashOnCash}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary-dark h-full rounded-full transition-all duration-500" style={{
                  width: `${Math.min(property.cashOnCash * 8, 100)}%`
                }}></div>
                </div>
              </div>
            </div>
            {/* Property details */}
            <h3 className="font-medium text-dark mb-3">Property Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Home size={16} className="text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Property Type</div>
                  <div className="font-medium">{property.type}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Year Built</div>
                  <div className="font-medium">{property.yearBuilt}</div>
                </div>
              </div>
              <div className="flex items-center">
                <BarChart3 size={16} className="text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Price per Sq Ft</div>
                  <div className="font-medium">
                    ${Math.round(property.price / property.sqft)}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Days on Market</div>
                  <div className="font-medium">{property.daysOnMarket}</div>
                </div>
              </div>
            </div>
            {/* Agent information */}
            <h3 className="font-medium text-dark mb-3">Listing Agent</h3>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                <img src={property.agent.avatar || 'https://source.unsplash.com/random/100x100/?portrait'} alt={property.agent.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-medium">{property.agent.name}</div>
                <div className="text-sm text-gray-500">
                  {property.agent.company}
                </div>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center">
                <DollarSign size={18} className="mr-2" />
                Send LOI
              </button>
              <button className="flex-1 py-3 bg-gray-100 text-dark font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center">
                Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};