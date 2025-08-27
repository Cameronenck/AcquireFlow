import React, { useState } from 'react';
import { Clock, DollarSign, AlertCircle, CheckCircle, ChevronRight, MoreVertical, ChevronDown, FileText, User, Phone, Edit, Trash, Star, Copy, Flag } from 'lucide-react';
import { Deal, DealPriority } from './types';
type DealCardProps = {
  deal: Deal;
  provided: any;
  isDragging: boolean;
  onClick: () => void;
  onSelect: (dealId: string, isSelected: boolean) => void;
  isSelected: boolean;
  onEdit: (dealId: string) => void;
  onDelete: (dealId: string) => void;
  onDuplicate: (dealId: string) => void;
  onSetPriority: (dealId: string, priority: DealPriority) => void;
  onFlag: (dealId: string, flagged: boolean) => void;
};
export const DealCard = ({
  deal,
  provided,
  isDragging,
  onClick,
  onSelect,
  isSelected,
  onEdit,
  onDelete,
  onDuplicate,
  onSetPriority,
  onFlag
}: DealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-[#ff6b6b] text-white';
      case 'Medium':
        return 'bg-[#feca57] text-dark';
      case 'Low':
        return 'bg-[#9ca3af] text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };
  // Get profit margin color
  const getProfitMarginColor = () => {
    const profitMargin = deal.potentialProfit / deal.value * 100;
    if (profitMargin >= 20) return 'text-green-600';
    if (profitMargin >= 10) return 'text-yellow-600';
    return 'text-gray-700';
  };
  // Get task completion status
  const completedTasks = deal.tasks.filter(task => task.completed).length;
  const totalTasks = deal.tasks.length;
  const taskCompletionPercentage = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 100;
  // Handle checkbox click
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(deal.id, !isSelected);
  };
  // Toggle agent details
  const handleToggleAgentDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAgentDetails(!showAgentDetails);
    // Close other menus if open
    if (showMoreOptions) setShowMoreOptions(false);
    if (showPriorityOptions) setShowPriorityOptions(false);
  };
  // Toggle more options
  const handleToggleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMoreOptions(!showMoreOptions);
    // Close other menus if open
    if (showAgentDetails) setShowAgentDetails(false);
    if (showPriorityOptions) setShowPriorityOptions(false);
  };
  // Handle action item click
  const handleActionClick = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMoreOptions(false);
    switch (action) {
      case 'edit':
        onEdit(deal.id);
        break;
      case 'priority':
        setShowPriorityOptions(true);
        break;
      case 'duplicate':
        onDuplicate(deal.id);
        break;
      case 'flag':
        onFlag(deal.id, !deal.flagged);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${deal.property.address}"?`)) {
          onDelete(deal.id);
        }
        break;
      default:
        break;
    }
  };
  // Handle priority selection
  const handlePrioritySelect = (priority: DealPriority, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPriorityOptions(false);
    onSetPriority(deal.id, priority);
  };
  // Get agent initials
  const getAgentInitials = () => {
    return deal.agent.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };
  return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-white rounded-xl border ${isSelected ? 'border-primary' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all cursor-pointer ${isDragging ? 'shadow-lg' : ''} ${deal.flagged ? 'border-l-4 border-l-secondary' : ''}`} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => {
    setIsHovered(false);
    // Close menus when mouse leaves the card
    if (!isDragging) {
      setShowMoreOptions(false);
      setShowPriorityOptions(false);
    }
  }} style={{
    ...provided.draggableProps.style
  }}>
      {/* Card content */}
      <div className="p-4 h-full flex flex-col">
        {/* Header with address and priority */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 mr-3">
            <h3 className="font-semibold text-dark text-base truncate">
              {deal.property.address}
            </h3>
            <p className="text-gray-500 text-sm truncate">
              {deal.property.city}, {deal.property.state}
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            {/* Selection checkbox */}
            <div className={`w-5 h-5 rounded-md border mr-2 ${isSelected ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300'} flex items-center justify-center cursor-pointer`} onClick={handleCheckboxClick}>
              {isSelected && <CheckCircle size={14} />}
            </div>
            {/* Priority badge */}
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(deal.priority)}`}>
              {deal.priority}
            </span>
          </div>
        </div>

        {/* Deal metrics */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Deal Value</div>
            <div className="text-lg font-bold text-dark">
              {formatCurrency(deal.value)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Potential Profit</div>
            <div className={`text-lg font-bold ${getProfitMarginColor()}`}>
              {formatCurrency(deal.potentialProfit)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs text-gray-500">Progress</div>
            <div className="text-xs font-medium">
              {taskCompletionPercentage}%
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-2 rounded-full bg-primary" style={{
            width: `${taskCompletionPercentage}%`
          }}></div>
          </div>
        </div>

        {/* Timeline info - improved layout to prevent overlapping */}
        <div className="mb-3 flex flex-col space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <Clock size={12} className="mr-1.5 flex-shrink-0" />
            <span className="truncate">
              {deal.daysInCurrentStage} days in stage
            </span>
          </div>
          {deal.nextAction && <div className="flex-shrink-0 self-start">
              <div className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-0.5 rounded-full">
                Next:{' '}
                <span className="truncate inline-block max-w-[120px] align-bottom">
                  {deal.nextAction}
                </span>
              </div>
            </div>}
        </div>

        {/* Agent info and actions - fixed spacing */}
        <div className="mt-auto border-t border-gray-100 pt-2 flex justify-between items-center">
          <div className="flex items-center mr-2 max-w-[65%]">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700 cursor-pointer flex-shrink-0" onClick={handleToggleAgentDetails}>
              {getAgentInitials()}
            </div>
            <span className="ml-1.5 text-xs text-gray-600 truncate max-w-[80px]">
              {deal.agent.name}
            </span>
            <ChevronDown size={12} className="ml-1 text-gray-400 cursor-pointer flex-shrink-0" onClick={handleToggleAgentDetails} />
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500" onClick={e => {
            e.stopPropagation();
            // Handle notes action
          }}>
              <FileText size={14} />
            </button>
            <div className="relative">
              <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500" onClick={handleToggleMoreOptions}>
                <MoreVertical size={14} />
              </button>
              {/* More options dropdown */}
              {showMoreOptions && <div className="absolute bottom-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-40" onClick={e => e.stopPropagation()}>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handleActionClick('edit', e)}>
                    <Edit size={14} className="mr-2 text-gray-500" />
                    Edit Deal
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handleActionClick('priority', e)}>
                    <Star size={14} className="mr-2 text-gray-500" />
                    Set Priority
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handleActionClick('duplicate', e)}>
                    <Copy size={14} className="mr-2 text-gray-500" />
                    Duplicate
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handleActionClick('flag', e)}>
                    <Flag size={14} className={`mr-2 ${deal.flagged ? 'text-secondary' : 'text-gray-500'}`} />
                    {deal.flagged ? 'Remove Flag' : 'Flag Deal'}
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center text-secondary" onClick={e => handleActionClick('delete', e)}>
                    <Trash size={14} className="mr-2" />
                    Delete Deal
                  </button>
                </div>}
              {/* Priority selection dropdown */}
              {showPriorityOptions && <div className="absolute bottom-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-40" onClick={e => e.stopPropagation()}>
                  <div className="px-3 py-1 text-xs text-gray-500">
                    Select Priority
                  </div>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handlePrioritySelect('High', e)}>
                    <div className="w-3 h-3 rounded-full bg-[#ff6b6b] mr-2"></div>
                    High Priority
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handlePrioritySelect('Medium', e)}>
                    <div className="w-3 h-3 rounded-full bg-[#feca57] mr-2"></div>
                    Medium Priority
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center" onClick={e => handlePrioritySelect('Low', e)}>
                    <div className="w-3 h-3 rounded-full bg-[#9ca3af] mr-2"></div>
                    Low Priority
                  </button>
                </div>}
            </div>
          </div>
        </div>

        {/* Agent details popup - improved positioning */}
        {showAgentDetails && <div className="absolute left-4 right-4 bottom-16 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                <User size={16} className="text-gray-600" />
              </div>
              <div className="overflow-hidden">
                <div className="font-medium text-sm truncate">
                  {deal.agent.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {deal.agent.company}
                </div>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-600 mb-1">
              <Phone size={12} className="mr-1.5 flex-shrink-0" />
              <span className="truncate">{deal.agent.phone}</span>
            </div>
            <div className="text-xs text-gray-500 truncate mb-2">
              {deal.agent.email}
            </div>
            <button className="w-full py-1.5 text-xs bg-primary text-white rounded-lg" onClick={e => {
          e.stopPropagation();
          // Handle contact agent
        }}>
              Contact Agent
            </button>
          </div>}
      </div>
    </div>;
};