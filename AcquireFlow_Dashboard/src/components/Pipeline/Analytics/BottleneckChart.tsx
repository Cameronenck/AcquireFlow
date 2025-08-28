import React from 'react';
type BottleneckChartProps = {
  metrics: any;
};
export const BottleneckChart = ({
  metrics
}: BottleneckChartProps) => {
  // This is a placeholder component
  // In a real implementation, this would use a charting library like Recharts
  const stages = ['Prospecting', 'UnderContract', 'DueDiligence', 'Negotiations', 'Closing'];
  const stageNames = ['Prospecting', 'Under Contract', 'Due Diligence', 'Negotiations', 'Closing'];
  // Find bottleneck stage
  const bottleneckStage = Object.entries(metrics.stageMetrics).reduce((a, b) => a[1].avgDaysInStage > b[1].avgDaysInStage ? a : b)[0] as string;
  // Get bottleneck stage index
  const bottleneckIndex = stages.indexOf(bottleneckStage as any);
  // Get max days for scaling
  const maxDays = Math.max(...stages.map(stage => metrics.stageMetrics[stage as any].avgDaysInStage));
  return <div className="h-full flex flex-col justify-center">
      <div className="space-y-5">
        {stages.map((stage, index) => {
        const avgDays = metrics.stageMetrics[stage as any].avgDaysInStage;
        const percentage = maxDays > 0 ? avgDays / maxDays * 100 : 0;
        const isBottleneck = stage === bottleneckStage;
        return <div key={stage} className={`${isBottleneck ? 'opacity-100' : 'opacity-70'}`}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium flex items-center">
                  {stageNames[index]}
                  {isBottleneck && <span className="ml-2 text-xs bg-secondary bg-opacity-10 text-secondary px-2 py-0.5 rounded-full">
                      Bottleneck
                    </span>}
                </span>
                <span className="text-sm font-medium">{avgDays} days</span>
              </div>
              <div className="w-full h-6 bg-gray-100 rounded-lg overflow-hidden">
                <div className={`h-full ${isBottleneck ? 'bg-secondary' : 'bg-primary'} transition-all duration-500`} style={{
              width: `${percentage}%`
            }}></div>
              </div>
            </div>;
      })}
      </div>
      {bottleneckIndex >= 0 && <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium mb-2">Bottleneck Analysis</h4>
          <p className="text-xs text-gray-600">
            Deals are spending an average of{' '}
            {metrics.stageMetrics[bottleneckStage as any].avgDaysInStage} days
            in the {stageNames[bottleneckIndex]} stage, which is{' '}
            {Math.round(metrics.stageMetrics[bottleneckStage as any].avgDaysInStage / metrics.avgDealCycle * 100)}
            % of the total deal cycle.
          </p>
        </div>}
    </div>;
};