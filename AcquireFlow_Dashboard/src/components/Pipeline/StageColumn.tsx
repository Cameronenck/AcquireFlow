import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DealCard } from './DealCard';
import { Deal, DealStage } from './types';
import { ChevronRight, Plus, Clock, DollarSign } from 'lucide-react';
type StageColumnProps = {
  stage: {
    id: DealStage;
    name: string;
  };
  deals: Deal[];
  metrics: {
    count: number;
    value: number;
    avgDaysInStage: number;
  };
  provided: any;
  onDealClick: (deal: Deal) => void;
  onDealSelect: (dealId: string, isSelected: boolean) => void;
  selectedDeals: string[];
};
export const StageColumn = ({
  stage,
  deals,
  metrics,
  provided,
  onDealClick,
  onDealSelect,
  selectedDeals
}: StageColumnProps) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get color based on stage
  const getStageColor = (stageId: DealStage) => {
    switch (stageId) {
      case 'Prospecting':
        return 'bg-blue-600';
      case 'UnderContract':
        return 'bg-tertiary';
      case 'DueDiligence':
        return 'bg-primary';
      case 'Negotiations':
        return 'bg-purple-600';
      case 'Closing':
        return 'bg-secondary';
      default:
        return 'bg-gray-400';
    }
  };
  return <div className="flex-shrink-0 w-80 flex flex-col h-full mr-6 overflow-hidden" ref={provided.innerRef} {...provided.droppableProps}>
      {/* Stage header */}
      <div className="mb-4 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getStageColor(stage.id)} mr-2`}></div>
            <h3 className="font-bold text-dark text-base">{stage.name}</h3>
          </div>
          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-0.5 rounded-lg font-medium">
            {metrics.count}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-gray-500 text-xs mb-1">Total Value</div>
            <div className="font-medium text-dark">
              {formatCurrency(metrics.value)}
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-gray-500 text-xs mb-1">Avg Time</div>
            <div className="font-medium text-dark flex items-center">
              <Clock size={14} className="text-gray-500 mr-1.5" />
              {metrics.avgDaysInStage} days
            </div>
          </div>
        </div>
      </div>
      {/* Deal cards */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-4 min-h-[200px]">
        {deals.map((deal, index) => <Draggable key={deal.id} draggableId={deal.id} index={index}>
            {(provided, snapshot) => <DealCard deal={deal} provided={provided} isDragging={snapshot.isDragging} onClick={() => onDealClick(deal)} onSelect={onDealSelect} isSelected={selectedDeals.includes(deal.id)} />}
          </Draggable>)}
        {provided.placeholder}
        {/* Add deal button */}
        <div className="mt-3">
          <button className="w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-lg p-3 flex items-center justify-center transition-colors">
            <Plus size={16} className="mr-2" />
            <span>Add Deal</span>
          </button>
        </div>
      </div>
    </div>;
};