import React from 'react';
import { Deal } from '../types';
type ForecastChartProps = {
  deals: Deal[];
};
export const ForecastChart = ({
  deals
}: ForecastChartProps) => {
  // This is a placeholder component
  // In a real implementation, this would use a charting library like Recharts
  // Group deals by stage
  const dealsByStage = {
    Prospecting: deals.filter(deal => deal.stage === 'Prospecting'),
    UnderContract: deals.filter(deal => deal.stage === 'UnderContract'),
    DueDiligence: deals.filter(deal => deal.stage === 'DueDiligence'),
    Negotiations: deals.filter(deal => deal.stage === 'Negotiations'),
    Closing: deals.filter(deal => deal.stage === 'Closing')
  };
  // Calculate value by stage
  const valueByStage = {
    Prospecting: dealsByStage.Prospecting.reduce((sum, deal) => sum + deal.value, 0),
    UnderContract: dealsByStage.UnderContract.reduce((sum, deal) => sum + deal.value, 0),
    DueDiligence: dealsByStage.DueDiligence.reduce((sum, deal) => sum + deal.value, 0),
    Negotiations: dealsByStage.Negotiations.reduce((sum, deal) => sum + deal.value, 0),
    Closing: dealsByStage.Closing.reduce((sum, deal) => sum + deal.value, 0)
  };
  // Calculate profit by stage
  const profitByStage = {
    Prospecting: dealsByStage.Prospecting.reduce((sum, deal) => sum + deal.potentialProfit, 0),
    UnderContract: dealsByStage.UnderContract.reduce((sum, deal) => sum + deal.potentialProfit, 0),
    DueDiligence: dealsByStage.DueDiligence.reduce((sum, deal) => sum + deal.potentialProfit, 0),
    Negotiations: dealsByStage.Negotiations.reduce((sum, deal) => sum + deal.potentialProfit, 0),
    Closing: dealsByStage.Closing.reduce((sum, deal) => sum + deal.potentialProfit, 0)
  };
  // Probability of closing by stage
  const probabilityByStage = {
    Prospecting: 0.2,
    UnderContract: 0.4,
    DueDiligence: 0.6,
    Negotiations: 0.8,
    Closing: 0.95
  };
  // Calculate weighted forecast
  const weightedForecast = Object.keys(valueByStage).reduce((sum, stage) => {
    return sum + valueByStage[stage as keyof typeof valueByStage] * probabilityByStage[stage as keyof typeof probabilityByStage];
  }, 0);
  // Calculate weighted profit forecast
  const weightedProfitForecast = Object.keys(profitByStage).reduce((sum, stage) => {
    return sum + profitByStage[stage as keyof typeof profitByStage] * probabilityByStage[stage as keyof typeof probabilityByStage];
  }, 0);
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get max value for scaling
  const maxValue = Math.max(...Object.values(valueByStage));
  return <div className="h-full flex flex-col">
      <div className="flex-1 flex items-end justify-around">
        {Object.keys(valueByStage).map(stage => {
        const stageKey = stage as keyof typeof valueByStage;
        const value = valueByStage[stageKey];
        const probability = probabilityByStage[stageKey];
        const weightedValue = value * probability;
        // Calculate height percentage (max 85%)
        const heightPercentage = maxValue > 0 ? value / maxValue * 85 : 0;
        const weightedHeightPercentage = maxValue > 0 ? weightedValue / maxValue * 85 : 0;
        // Display names for stages
        const displayName = stage === 'UnderContract' ? 'Under' : stage === 'DueDiligence' ? 'Due Dil.' : stage.substring(0, 4);
        return <div key={stage} className="flex flex-col items-center px-1 w-1/5">
              <div className="text-xs mb-2 text-center font-medium">
                {formatCurrency(weightedValue)}
              </div>
              <div className="w-full relative" style={{
            height: '140px'
          }}>
                <div className="w-full bg-gray-200 rounded-t-lg absolute bottom-0" style={{
              height: `${heightPercentage}%`
            }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg" style={{
                height: `${weightedHeightPercentage}%`
              }}></div>
                </div>
              </div>
              <div className="text-xs mt-2 text-center">{displayName}</div>
              <div className="text-xs text-gray-500 text-center">
                {Math.round(probability * 100)}%
              </div>
            </div>;
      })}
      </div>
      <div className="mt-6 text-center">
        <div className="text-sm font-medium">Forecasted Revenue</div>
        <div className="text-2xl font-bold text-primary">
          {formatCurrency(weightedForecast)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Projected profit: {formatCurrency(weightedProfitForecast)}
        </div>
      </div>
    </div>;
};