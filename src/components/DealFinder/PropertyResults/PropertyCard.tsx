import React from 'react';
import { CheckSquare, Home, Building, DollarSign, TrendingUp, Calendar, Clock, Star, FileText } from 'lucide-react';
import { InvestmentStrategy } from '../Filters/InvestmentStrategyPresets';
interface PropertyCardProps {
  property: any;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: (property: any) => void;
  investmentStrategy?: InvestmentStrategy;
}
export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSelected,
  onSelect,
  onViewDetails,
  investmentStrategy = 'custom'
}) => {
  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  // Calculate strategy-specific metrics
  const getStrategyMetrics = () => {
    switch (investmentStrategy) {
      case 'wholesaling':
        const arv = property.price * 1.2; // Estimated ARV (120% of current price)
        const maxOffer = arv * 0.65; // 65% rule
        const equitySpread = arv - property.price;
        const assignmentFee = 5000;
        return <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Est. ARV</p>
              <p className="font-medium text-primary">{formatCurrency(arv)}</p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Equity Spread</p>
              <p className="font-medium text-primary">
                {formatCurrency(equitySpread)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Max Offer</p>
              <p className="font-medium text-primary">
                {formatCurrency(maxOffer)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Assignment Fee</p>
              <p className="font-medium text-primary">
                {formatCurrency(assignmentFee)}
              </p>
            </div>
          </div>;
      case 'fixAndFlip':
        const afterRepairValue = property.price * 1.3; // 130% of purchase price
        const rehabCost = property.sqft * 25; // $25 per sqft
        const closingCosts = property.price * 0.03; // 3% closing costs
        const holdingCosts = 1000 * 3; // $1000/month for 3 months
        const totalCosts = property.price + rehabCost + closingCosts + holdingCosts;
        const profit = afterRepairValue - totalCosts;
        const roi = profit / totalCosts * 100;
        return <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">After Repair Value</p>
              <p className="font-medium text-primary">
                {formatCurrency(afterRepairValue)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Rehab Costs</p>
              <p className="font-medium text-primary">
                {formatCurrency(rehabCost)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Profit</p>
              <p className="font-medium text-primary">
                {formatCurrency(profit)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">ROI</p>
              <p className="font-medium text-primary">{roi.toFixed(1)}%</p>
            </div>
          </div>;
      case 'buyAndHold':
        const monthlyRent = property.price * 0.008; // 0.8% rent-to-price ratio
        const annualRent = monthlyRent * 12;
        const expenses = annualRent * 0.4; // 40% for expenses
        const netOperatingIncome = annualRent - expenses;
        const capRate = netOperatingIncome / property.price * 100;
        const cashOnCash = parseFloat(property.cashOnCash);
        return <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Monthly Rent</p>
              <p className="font-medium text-primary">
                {formatCurrency(monthlyRent)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Cap Rate</p>
              <p className="font-medium text-primary">{capRate.toFixed(1)}%</p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Cash on Cash</p>
              <p className="font-medium text-primary">{cashOnCash}%</p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Annual NOI</p>
              <p className="font-medium text-primary">
                {formatCurrency(netOperatingIncome)}
              </p>
            </div>
          </div>;
      case 'shortTermRental':
        const avgNightlyRate = 200 + property.price / 1000000 * 100; // Higher for more expensive properties
        const occupancyRate = 60; // 60% occupancy
        const annualRevenue = avgNightlyRate * 365 * (occupancyRate / 100);
        const operatingExpenses = annualRevenue * 0.35; // 35% for expenses
        const netIncome = annualRevenue - operatingExpenses;
        const strRoi = netIncome / property.price * 100;
        return <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Nightly Rate</p>
              <p className="font-medium text-primary">
                ${avgNightlyRate.toFixed(0)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Occupancy</p>
              <p className="font-medium text-primary">{occupancyRate}%</p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Annual Revenue</p>
              <p className="font-medium text-primary">
                {formatCurrency(annualRevenue)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">ROI</p>
              <p className="font-medium text-primary">{strRoi.toFixed(1)}%</p>
            </div>
          </div>;
      default:
        return <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Cap Rate</p>
              <p className="font-medium text-primary">{property.capRate}%</p>
            </div>
            <div className="bg-primary bg-opacity-5 p-2 rounded">
              <p className="text-xs text-gray-500">Cash on Cash</p>
              <p className="font-medium text-primary">{property.cashOnCash}%</p>
            </div>
          </div>;
    }
  };
  return <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border ${isSelected ? 'border-primary ring-2 ring-primary ring-opacity-30' : 'border-gray-100'} group`}>
      <div className="relative">
        <img src={property.image} alt={property.address} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <button className={`absolute top-3 right-3 p-1.5 rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:text-gray-600'} shadow-sm hover:scale-110 transition-all`} onClick={e => {
        e.stopPropagation();
        onSelect();
      }}>
          <CheckSquare size={18} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <div className="flex items-center">
            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${property.daysOnMarket < 7 ? 'bg-primary' : property.daysOnMarket < 30 ? 'bg-tertiary-dark' : 'bg-gray-700'}`}>
              {property.daysOnMarket} days on market
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-dark mb-1">{property.address}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {property.city}, {property.state} {property.zip}
        </p>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm">
            <Home size={16} className="mr-1 text-gray-400" />
            <span>{property.beds} bd</span>
            <span className="mx-1">•</span>
            <span>{property.baths} ba</span>
            <span className="mx-1">•</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="text-primary font-bold">
            {formatCurrency(property.price)}
          </div>
        </div>
        {getStrategyMetrics()}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
          <button className="text-primary text-sm font-medium hover:underline" onClick={e => {
          e.stopPropagation();
          onViewDetails(property);
        }}>
            View Details
          </button>
          <div className="text-xs text-gray-500">
            Built {property.yearBuilt}
          </div>
        </div>
      </div>
    </div>;
};