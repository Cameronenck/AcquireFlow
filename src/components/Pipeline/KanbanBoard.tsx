import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DealCard } from './DealCard';
import { Deal, DealStage, DealPriority } from './types';
type KanbanBoardProps = {
  deals: Deal[];
  onDragEnd: (result: any) => void;
  onDealClick: (deal: Deal) => void;
  onDealSelect: (dealId: string, isSelected: boolean) => void;
  selectedDeals: string[];
  onEdit: (dealId: string) => void;
  onDelete: (dealId: string) => void;
  onDuplicate: (dealId: string) => void;
  onSetPriority: (dealId: string, priority: DealPriority) => void;
  onFlag: (dealId: string, flagged: boolean) => void;
};
export const KanbanBoard = ({
  deals,
  onDragEnd,
  onDealClick,
  onDealSelect,
  selectedDeals,
  onEdit,
  onDelete,
  onDuplicate,
  onSetPriority,
  onFlag
}: KanbanBoardProps) => {
  // Define stages
  const stages: DealStage[] = ['Prospecting', 'UnderContract', 'DueDiligence', 'Negotiations', 'Closing'];
  // Group deals by stage
  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage] = deals.filter(deal => deal.stage === stage);
    return acc;
  }, {} as Record<DealStage, Deal[]>);
  // Get stage display name
  const getStageDisplayName = (stage: DealStage) => {
    switch (stage) {
      case 'Prospecting':
        return 'Prospecting';
      case 'UnderContract':
        return 'Under Contract';
      case 'DueDiligence':
        return 'Due Diligence';
      case 'Negotiations':
        return 'Negotiations';
      case 'Closing':
        return 'Closing';
      default:
        return stage;
    }
  };
  // Get stage color
  const getStageColor = (stage: DealStage) => {
    switch (stage) {
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
  // Calculate stage metrics
  const calculateStageMetrics = (stage: DealStage) => {
    const dealsInStage = dealsByStage[stage] || [];
    const totalValue = dealsInStage.reduce((sum, deal) => sum + deal.value, 0);
    return {
      count: dealsInStage.length,
      value: totalValue
    };
  };
  return <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full overflow-x-auto px-4 pb-4">
        {stages.map(stage => {
        const metrics = calculateStageMetrics(stage);
        return <div key={stage} className="flex-shrink-0 w-80 mx-2 flex flex-col h-full">
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <div className={`w-3 h-3 rounded-full ${getStageColor(stage)} mr-2`}></div>
                  <h3 className="font-semibold text-dark">
                    {getStageDisplayName(stage)}
                  </h3>
                  <div className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    {metrics.count}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {metrics.value > 0 ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(metrics.value) : '$0'}
                </div>
              </div>
              <Droppable droppableId={stage}>
                {(provided, snapshot) => <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-1 bg-gray-100 rounded-xl p-2 overflow-y-auto ${snapshot.isDraggingOver ? 'bg-gray-200' : ''}`}>
                    {dealsByStage[stage]?.map((deal, index) => <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided, snapshot) => <div className="mb-3">
                            <DealCard deal={deal} provided={provided} isDragging={snapshot.isDragging} onClick={() => onDealClick(deal)} onSelect={onDealSelect} isSelected={selectedDeals.includes(deal.id)} onEdit={onEdit} onDelete={onDelete} onDuplicate={onDuplicate} onSetPriority={onSetPriority} onFlag={onFlag} />
                          </div>}
                      </Draggable>)}
                    {provided.placeholder}
                    {(!dealsByStage[stage] || dealsByStage[stage].length === 0) && <div className="text-center py-6 text-gray-400 text-sm">
                        Drag deals here
                      </div>}
                  </div>}
              </Droppable>
            </div>;
      })}
      </div>
    </DragDropContext>;
};