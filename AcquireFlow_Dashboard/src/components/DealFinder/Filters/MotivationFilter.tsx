import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { InvestmentStrategy } from './InvestmentStrategyPresets';
interface MotivationFilterProps {
  investmentStrategy?: InvestmentStrategy;
}
export const MotivationFilter: React.FC<MotivationFilterProps> = ({
  investmentStrategy = 'custom'
}) => {
  const [motivationFilters, setMotivationFilters] = useState({
    priceReduction: true,
    daysOnMarket: false,
    vacant: true,
    outOfState: false,
    preForeclosure: false,
    absentee: true,
    taxDelinquent: false,
    highEquity: false,
    divorceFiling: false,
    probate: false,
    rentalRestrictions: false,
    zonedMultiFamily: false,
    touristZone: false
  });
  // Update motivation filters based on investment strategy
  useEffect(() => {
    if (investmentStrategy === 'wholesaling') {
      setMotivationFilters({
        ...motivationFilters,
        priceReduction: true,
        daysOnMarket: true,
        vacant: true,
        outOfState: true,
        preForeclosure: true,
        absentee: true,
        taxDelinquent: true,
        highEquity: true,
        divorceFiling: true,
        probate: true,
        rentalRestrictions: false,
        zonedMultiFamily: false,
        touristZone: false
      });
    } else if (investmentStrategy === 'fixAndFlip') {
      setMotivationFilters({
        ...motivationFilters,
        priceReduction: true,
        daysOnMarket: true,
        vacant: true,
        outOfState: false,
        preForeclosure: true,
        absentee: false,
        taxDelinquent: false,
        highEquity: true,
        divorceFiling: false,
        probate: false,
        rentalRestrictions: false,
        zonedMultiFamily: false,
        touristZone: false
      });
    } else if (investmentStrategy === 'buyAndHold') {
      setMotivationFilters({
        ...motivationFilters,
        priceReduction: true,
        daysOnMarket: true,
        vacant: false,
        outOfState: false,
        preForeclosure: false,
        absentee: false,
        taxDelinquent: false,
        highEquity: false,
        divorceFiling: false,
        probate: false,
        rentalRestrictions: false,
        zonedMultiFamily: true,
        touristZone: false
      });
    } else if (investmentStrategy === 'shortTermRental') {
      setMotivationFilters({
        ...motivationFilters,
        priceReduction: true,
        daysOnMarket: true,
        vacant: false,
        outOfState: false,
        preForeclosure: false,
        absentee: false,
        taxDelinquent: false,
        highEquity: false,
        divorceFiling: false,
        probate: false,
        rentalRestrictions: false,
        zonedMultiFamily: false,
        touristZone: true
      });
    }
  }, [investmentStrategy]);
  const handleToggleChange = filter => {
    setMotivationFilters({
      ...motivationFilters,
      [filter]: !motivationFilters[filter]
    });
  };
  const renderToggle = (label, filter, description) => <div className="flex items-start mb-4">
      <div className="flex items-center h-5">
        <input id={filter} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary" checked={motivationFilters[filter]} onChange={() => handleToggleChange(filter)} />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={filter} className="font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>;
  return <div className="space-y-2">
      {/* Common filters for all strategies */}
      {renderToggle('Recent Price Reduction', 'priceReduction', 'Properties with price drops in the last 30 days')}
      {renderToggle('Extended Days on Market', 'daysOnMarket', 'Listed for more than 90 days without selling')}
      {/* Wholesaling and Fix & Flip focused filters */}
      {(investmentStrategy === 'wholesaling' || investmentStrategy === 'fixAndFlip' || investmentStrategy === 'custom') && <>
          {renderToggle('Vacant Property', 'vacant', 'Currently unoccupied properties')}
          {renderToggle('Pre-Foreclosure', 'preForeclosure', 'Properties in early stages of foreclosure')}
        </>}
      {/* Primarily Wholesaling focused filters */}
      {(investmentStrategy === 'wholesaling' || investmentStrategy === 'custom') && <>
          {renderToggle('Out-of-State Owner', 'outOfState', "Owner's mailing address is in a different state")}
          {renderToggle('Absentee Owner', 'absentee', "Owner doesn't live at the property")}
          {renderToggle('Tax Delinquent', 'taxDelinquent', 'Property taxes are past due')}
          {renderToggle('High Equity', 'highEquity', 'Owner has 50%+ equity in the property')}
          {renderToggle('Divorce Filing', 'divorceFiling', 'Owners going through divorce proceedings')}
          {renderToggle('Probate', 'probate', 'Property in probate or estate situation')}
        </>}
      {/* Buy & Hold specific filters */}
      {(investmentStrategy === 'buyAndHold' || investmentStrategy === 'custom') && <>
          {renderToggle('Zoned for Multi-Family', 'zonedMultiFamily', 'Property zoned for multi-unit development')}
          {renderToggle('No Rental Restrictions', 'rentalRestrictions', 'No HOA or municipal rental restrictions')}
        </>}
      {/* STR specific filters */}
      {(investmentStrategy === 'shortTermRental' || investmentStrategy === 'custom') && <>
          {renderToggle('Tourist/Vacation Zone', 'touristZone', 'Located in popular tourist or vacation area')}
          {renderToggle('No Rental Restrictions', 'rentalRestrictions', 'No STR restrictions or bans')}
        </>}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
        <div className="flex items-start">
          <Info size={16} className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-xs text-blue-700">
            <p className="font-medium">Pro Tip:</p>
            <p>
              Combining multiple motivation filters can help identify sellers
              who are more likely to consider offers below asking price.
            </p>
          </div>
        </div>
      </div>
    </div>;
};