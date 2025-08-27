import React from 'react';
type VelocityChartProps = {
  metrics: any;
};
export const VelocityChart = ({
  metrics
}: VelocityChartProps) => {
  // This is a placeholder component
  // In a real implementation, this would use a charting library like Recharts
  const stages = ['Prospecting', 'UnderContract', 'DueDiligence', 'Negotiations', 'Closing'];
  const stageNames = ['Prospecting', 'Under Contract', 'Due Diligence', 'Negotiations', 'Closing'];
  // Get max days for scaling
  const maxDays = Math.max(...stages.map(stage => metrics.stageMetrics[stage as any].avgDaysInStage));
  // Define colors for different stages based on their duration
  const getBarColor = (percentage: number) => {
    if (percentage > 80) return 'bg-secondary';
    if (percentage > 50) return 'bg-tertiary';
    return 'bg-primary';
  };
  return <div className="h-full flex flex-col justify-center">
      {stages.map((stage, index) => {
      const avgDays = metrics.stageMetrics[stage as any].avgDaysInStage;
      const percentage = maxDays > 0 ? avgDays / maxDays * 100 : 0;
      const barColor = getBarColor(percentage);
      return <div key={stage} className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{stageNames[index]}</span>
              <span className="text-sm font-medium">{avgDays} days</span>
            </div>
            <div className="w-full h-6 bg-gray-100 rounded-lg overflow-hidden">
              <div className={`h-full ${barColor} transition-all duration-500`} style={{
            width: `${percentage}%`
          }}></div>
            </div>
          </div>;
    })}
      <div className="mt-8 text-center">
        <div className="text-sm font-medium text-gray-500">
          Average Deal Cycle
        </div>
        <div className="text-2xl font-bold text-primary">
          {metrics.avgDealCycle} days
        </div>
        <div className="text-xs text-gray-500 mt-1">
          From first contact to closing
        </div>
      </div>
    </div>;
};