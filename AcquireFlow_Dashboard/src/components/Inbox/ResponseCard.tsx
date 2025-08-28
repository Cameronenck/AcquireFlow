import React from 'react';
import { MessageSquare, AlertCircle, Clock, CheckCircle, Calendar, Home } from 'lucide-react';
export const ResponseCard = ({
  response,
  isSelected,
  isChecked,
  onSelect,
  onCheckboxToggle
}) => {
  const getStatusIcon = () => {
    switch (response.status) {
      case 'hot':
        return <AlertCircle size={16} className="text-secondary" />;
      case 'warm':
        return <Clock size={16} className="text-tertiary" />;
      case 'cold':
        return <CheckCircle size={16} className="text-primary" />;
      default:
        return null;
    }
  };
  const getStatusText = () => {
    switch (response.status) {
      case 'hot':
        return 'Hot Lead';
      case 'warm':
        return 'Warm Lead';
      case 'cold':
        return 'Cold Lead';
      default:
        return '';
    }
  };
  const getStatusColor = () => {
    switch (response.status) {
      case 'hot':
        return 'bg-secondary bg-opacity-10 text-secondary';
      case 'warm':
        return 'bg-tertiary bg-opacity-10 text-tertiary-dark';
      case 'cold':
        return 'bg-primary bg-opacity-10 text-primary';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  const getSentimentIcon = () => {
    switch (response.sentiment) {
      case 'positive':
        return <span className="text-primary">😊</span>;
      case 'neutral':
        return <span className="text-gray-500">😐</span>;
      case 'negative':
        return <span className="text-secondary">😞</span>;
      default:
        return null;
    }
  };
  const formatDate = date => {
    const now = new Date();
    const responseDate = new Date(date);
    const diffTime = Math.abs(now - responseDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      const hours = responseDate.getHours();
      const minutes = responseDate.getMinutes();
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][responseDate.getDay()];
    } else {
      return `${responseDate.getMonth() + 1}/${responseDate.getDate()}/${responseDate.getFullYear()}`;
    }
  };
  const handleCardClick = e => {
    // Prevent triggering card selection when clicking the checkbox
    if (e.target.type !== 'checkbox' && !e.target.closest('.checkbox-container')) {
      onSelect();
    }
  };
  return <div className={`border-b border-gray-100 p-3 cursor-pointer transition-all duration-200 ${isSelected ? 'bg-primary bg-opacity-5 border-l-4 border-l-primary' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`} onClick={handleCardClick}>
      <div className="flex items-start space-x-2">
        {/* Checkbox for bulk selection */}
        <div className="checkbox-container pt-1" onClick={e => e.stopPropagation()}>
          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary transition-colors" checked={isChecked} onChange={onCheckboxToggle} />
        </div>
        {/* Content - more compact for narrower column */}
        <div className="flex-1 min-w-0 max-w-[calc(100%-20px)]">
          {/* Header with agent name, property, and date */}
          <div className="flex justify-between items-start mb-1">
            <div className="flex-1 min-w-0 mr-2">
              <h3 className="font-medium text-dark text-sm truncate">
                {response.agent.name}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <Home size={10} className="mr-1 flex-shrink-0" />
                <span className="truncate">{response.property.address}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap flex items-center flex-shrink-0">
              <Calendar size={10} className="mr-1" />
              {formatDate(response.date)}
            </div>
          </div>
          {/* Message preview - with reduced width */}
          <p className={`text-xs mb-2 line-clamp-2 ${response.unread ? 'font-medium text-dark' : 'text-gray-600'}`}>
            {response.preview}
          </p>
          {/* Footer with status, category, and tags */}
          <div className="flex flex-wrap items-center justify-between gap-y-1.5">
            <div className="flex items-center flex-shrink-0">
              <span className={`flex items-center text-xs px-1.5 py-0.5 rounded-full ${getStatusColor()}`}>
                {getStatusIcon()}
                <span className="ml-1 text-xs">{getStatusText()}</span>
              </span>
              {response.followUpNeeded && <span className="ml-1.5 text-xs bg-tertiary bg-opacity-10 text-tertiary-dark px-1.5 py-0.5 rounded-full">
                  Follow-up
                </span>}
            </div>
            <div className="flex items-center flex-shrink-0">
              <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full flex items-center">
                <MessageSquare size={10} className="mr-1" />
                {response.category}
              </span>
              <span className="ml-1.5 text-base" title={`${response.sentiment} sentiment`}>
                {getSentimentIcon()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};