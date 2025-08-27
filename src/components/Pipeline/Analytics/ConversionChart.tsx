import React, { Fragment } from 'react';
type ConversionChartProps = {
  metrics: any;
};
export const ConversionChart = ({
  metrics
}: ConversionChartProps) => {
  // This is a placeholder component
  // In a real implementation, this would use a charting library like Recharts
  const stages = ['Prospecting', 'UnderContract', 'DueDiligence', 'Negotiations', 'Closing'];
  const stageDisplayNames = ['Prospecting', 'Under Contract', 'Due Diligence', 'Negotiations', 'Closing'];
  // Calculate conversion rates between stages
  const conversionRates = [];
  for (let i = 0; i < stages.length - 1; i++) {
    const currentStage = stages[i] as any;
    const nextStage = stages[i + 1] as any;
    const currentCount = metrics.stageMetrics[currentStage].count;
    const nextCount = metrics.stageMetrics[nextStage].count;
    const rate = currentCount > 0 ? Math.round(nextCount / currentCount * 100) : 0;
    conversionRates.push(rate);
  }
  return <div className="h-full flex flex-col justify-center">
      <div className="flex items-center w-full justify-between mb-6">
        {stages.map((stage, index) => <Fragment key={stage}>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {metrics.stageMetrics[stage as any].count}
                </span>
              </div>
              <span className="text-xs mt-2 text-center max-w-[60px]">
                {stageDisplayNames[index]}
              </span>
            </div>
            {index < stages.length - 1 && <div className="flex-1 mx-2 relative h-1">
                <div className="h-1 bg-gray-200 w-full rounded-full">
                  <div className="h-1 bg-primary rounded-full" style={{
              width: `${conversionRates[index]}%`
            }}></div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs font-medium">
                  {conversionRates[index]}%
                </div>
              </div>}
          </Fragment>)}
      </div>
      <div className="mt-8 text-center">
        <div className="text-sm font-medium">Overall Pipeline Conversion</div>
        <div className="text-2xl font-bold text-primary">
          {metrics.conversionRate}%
        </div>
        <div className="text-xs text-gray-500 mt-1">
          From Prospecting to Closing
        </div>
      </div>
    </div>;
};