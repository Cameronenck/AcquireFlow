import React, { useState } from 'react';
import { KanbanBoard } from './KanbanBoard';
import { PipelineHeader } from './PipelineHeader';
import { FilterBar } from './FilterBar';
import { DealDetailModal } from './DealDetailModal';
import { PipelineAnalytics } from './PipelineAnalytics';
import { Deal, DealStage, Filter, DealPriority } from './types';
import { AddDealModal } from './AddDealModal';
import { BulkActionsBar } from './BulkActionsBar';
import { useDeals } from '../Context/DealsContext';
export const PipelinePage = () => {
  const {
    deals,
    updateDeal,
    addDeal,
    deleteDeal,
    moveDealToStage,
    duplicateDeal,
    setDealPriority,
    toggleDealFlag,
    getDealById
  } = useDeals();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    search: '',
    propertyType: [],
    minValue: 0,
    maxValue: 10000000,
    priority: [],
    agents: []
  });
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  // Calculate pipeline metrics
  const totalDealValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const totalPotentialProfit = deals.reduce((sum, deal) => sum + deal.potentialProfit, 0);
  const totalDealsCount = deals.length;
  // Handle deal selection for viewing details
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDetailModalOpen(true);
    setIsEditMode(false);
  };
  // Handle editing a deal
  const handleEditDeal = (dealId: string) => {
    const dealToEdit = getDealById(dealId);
    if (dealToEdit) {
      setSelectedDeal(dealToEdit);
      setIsDetailModalOpen(true);
      setIsEditMode(true);
    }
  };
  // Handle drag and drop between stages
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const {
      source,
      destination,
      draggableId
    } = result;
    // If dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    // Update the deal's stage
    const newStage = destination.droppableId as DealStage;
    moveDealToStage(draggableId, newStage);
  };
  // Handle adding a new deal
  const handleAddDeal = (newDeal: Deal) => {
    addDeal(newDeal);
    setIsAddModalOpen(false);
  };
  // Handle updating a deal
  const handleUpdateDeal = (updatedDeal: Deal) => {
    updateDeal(updatedDeal);
    setIsDetailModalOpen(false);
    setSelectedDeal(null);
  };
  // Handle duplicating a deal
  const handleDuplicateDeal = (dealId: string) => {
    duplicateDeal(dealId);
  };
  // Handle setting deal priority
  const handleSetDealPriority = (dealId: string, priority: DealPriority) => {
    setDealPriority(dealId, priority);
  };
  // Handle flagging a deal
  const handleFlagDeal = (dealId: string, flagged: boolean) => {
    toggleDealFlag(dealId, flagged);
  };
  // Handle deleting a deal
  const handleDeleteDeal = (dealId: string) => {
    deleteDeal(dealId);
    setIsDetailModalOpen(false);
    setSelectedDeal(null);
  };
  // Handle selecting deals for bulk actions
  const handleDealSelect = (dealId: string, isSelected: boolean) => {
    setSelectedDeals(prevSelected => {
      if (isSelected) {
        return [...prevSelected, dealId];
      } else {
        return prevSelected.filter(id => id !== dealId);
      }
    });
  };
  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedDeals.length} deals?`)) {
          selectedDeals.forEach(dealId => deleteDeal(dealId));
          setSelectedDeals([]);
        }
        break;
      case 'move':
        // This would be implemented with a stage selection UI
        console.log('Move selected deals to a new stage');
        break;
      case 'tag':
        // This would be implemented with a tag selection UI
        console.log('Add tags to selected deals');
        break;
      default:
        break;
    }
  };
  // Filter deals based on current filters
  const filteredDeals = deals.filter(deal => {
    // Search filter
    if (filters.search && !deal.property.address.toLowerCase().includes(filters.search.toLowerCase()) && !deal.property.city.toLowerCase().includes(filters.search.toLowerCase()) && !deal.agent.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    // Property type filter
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(deal.property.type)) {
      return false;
    }
    // Value range filter
    if (deal.value < filters.minValue || deal.value > filters.maxValue) {
      return false;
    }
    // Priority filter
    if (filters.priority.length > 0 && !filters.priority.includes(deal.priority)) {
      return false;
    }
    // Agent filter
    if (filters.agents.length > 0 && !filters.agents.includes(deal.agent.id)) {
      return false;
    }
    return true;
  });
  return <div className="flex flex-col h-full bg-gray-50">
      <PipelineHeader totalDeals={totalDealsCount} totalValue={totalDealValue} totalProfit={totalPotentialProfit} onAddDeal={() => setIsAddModalOpen(true)} onToggleAnalytics={() => setShowAnalytics(!showAnalytics)} />
      <FilterBar filters={filters} setFilters={setFilters} deals={deals} />
      {showAnalytics && <PipelineAnalytics deals={deals} onClose={() => setShowAnalytics(false)} />}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard deals={filteredDeals} onDragEnd={handleDragEnd} onDealClick={handleDealClick} onDealSelect={handleDealSelect} selectedDeals={selectedDeals} onEdit={handleEditDeal} onDelete={handleDeleteDeal} onDuplicate={handleDuplicateDeal} onSetPriority={handleSetDealPriority} onFlag={handleFlagDeal} />
      </div>
      {selectedDeals.length > 0 && <BulkActionsBar selectedCount={selectedDeals.length} onAction={handleBulkAction} onClearSelection={() => setSelectedDeals([])} />}
      {isDetailModalOpen && selectedDeal && <DealDetailModal deal={selectedDeal} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} onUpdate={handleUpdateDeal} onDelete={handleDeleteDeal} isEditing={isEditMode} />}
      {isAddModalOpen && <AddDealModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddDeal} />}
    </div>;
};