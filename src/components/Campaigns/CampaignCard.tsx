import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, Edit, Copy, Trash2, Calendar, MapPin, Home, Users, ChevronRight, AlertTriangle, X } from 'lucide-react';
export const CampaignCard = ({
  campaign,
  onView,
  onPause,
  onPlay,
  onEdit,
  onCopy,
  onDelete
}) => {
  const cardRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Subtle 3D effect
      const multiplier = 25;
      const rotateY = x / multiplier;
      const rotateX = -y / multiplier;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  const getStatusColor = status => {
    switch (status) {
      case 'running':
        return 'bg-primary';
      case 'scheduled':
        return 'bg-tertiary';
      case 'completed':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };
  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  // Handle button clicks with propagation stopped
  const handlePausePlay = e => {
    e.stopPropagation();
    if (campaign.status === 'running') {
      onPause && onPause(campaign.id);
    } else {
      onPlay && onPlay(campaign.id);
    }
  };
  const handleEdit = e => {
    e.stopPropagation();
    onEdit && onEdit(campaign.id);
  };
  const handleCopy = e => {
    e.stopPropagation();
    onCopy && onCopy(campaign.id);
  };
  const handleDelete = e => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };
  const confirmDelete = e => {
    if (e) e.stopPropagation();
    setShowDeleteConfirm(false);
    onDelete && onDelete(campaign.id);
  };
  const cancelDelete = e => {
    if (e) e.stopPropagation();
    setShowDeleteConfirm(false);
  };
  return <div ref={cardRef} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden card-3d transition-all hover:shadow-md relative" style={{
    transformStyle: 'preserve-3d'
  }} onClick={() => onView && onView(campaign)}>
      {/* Card header with status */}
      <div className="relative">
        {campaign.isHighPriority && <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
            PRIORITY
          </div>}
        <div className="p-5 pb-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-dark text-lg truncate pr-2" style={{
            maxWidth: 'calc(100% - 30px)'
          }}>
              {campaign.name}
            </h3>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)} status-orb flex-shrink-0`}></div>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{campaign.targetArea}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(campaign.startDate)}</span>
            {campaign.status !== 'completed' && <span className="mx-1">-</span>}
            {campaign.status !== 'completed' ? <span>{formatDate(campaign.endDate)}</span> : <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                Ended
              </span>}
          </div>
        </div>
      </div>

      {/* Card body with metrics */}
      <div className="px-5 py-3">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Home size={14} className="mr-1 text-gray-500" />
            <span className="text-sm font-medium">
              {campaign.propertyCount.toLocaleString()} Properties
            </span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-gray-500" />
            <span className="text-sm font-medium">
              {campaign.loisSent} LOIs Sent
            </span>
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex items-center justify-between">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="2" />
              <circle cx="18" cy="18" r="16" fill="none" stroke={campaign.status === 'running' ? '#3ab795' : campaign.status === 'scheduled' ? '#feca57' : '#9ca3af'} strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - campaign.progress} strokeLinecap="round" transform="rotate(-90 18 18)" className="transition-all duration-1000" />
              <text x="18" y="18" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2c2c2c">
                {campaign.progress}%
              </text>
            </svg>
          </div>
          <div className="flex-1 ml-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Response Rate</span>
              <span className={`text-sm font-bold ${parseFloat(campaign.responseRate) > 20 ? 'text-primary' : parseFloat(campaign.responseRate) > 10 ? 'text-tertiary-dark' : 'text-gray-500'}`}>
                {campaign.responseRate}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className={`h-full rounded-full liquid-progress ${parseFloat(campaign.responseRate) > 20 ? 'bg-primary' : parseFloat(campaign.responseRate) > 10 ? 'bg-tertiary' : 'bg-gray-300'}`} style={{
              width: `${Math.min(parseFloat(campaign.responseRate) * 3, 100)}%`
            }}></div>
            </div>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-0.5 rounded-full mr-1">
                {getStatusText(campaign.status)}
              </span>
              {campaign.propertyTypes.map((type, index) => <span key={index} className="bg-gray-100 px-2 py-0.5 rounded-full mr-1">
                  {type}
                </span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Card footer with actions */}
      <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        <div className="flex space-x-1">
          {campaign.status === 'running' ? <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-all" onClick={handlePausePlay} title="Pause Campaign">
              <Pause size={16} />
            </button> : campaign.status === 'scheduled' || campaign.status === 'completed' ? <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-all" onClick={handlePausePlay} title="Start Campaign">
              <Play size={16} />
            </button> : null}
          <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-all" onClick={handleEdit} title="Edit Campaign">
            <Edit size={16} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-all" onClick={handleCopy} title="Duplicate Campaign">
            <Copy size={16} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 transition-all hover:text-secondary" onClick={handleDelete} title="Delete Campaign">
            <Trash2 size={16} />
          </button>
        </div>
        <button className="flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-all" onClick={e => {
        e.stopPropagation();
        onView && onView(campaign);
      }}>
          View Details
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)'
    }}></div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={cancelDelete}>
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-4 animate-float" onClick={e => e.stopPropagation()}>
            <div className="flex items-start mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-4">
                <AlertTriangle size={24} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark mb-2">
                  Delete Campaign
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete the campaign{' '}
                  <span className="font-medium">"{campaign.name}"</span>? This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all flex items-center" onClick={cancelDelete}>
                <X size={16} className="mr-2" />
                Cancel
              </button>
              <button className="px-4 py-2 bg-secondary text-white font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center" onClick={confirmDelete}>
                <Trash2 size={16} className="mr-2" />
                Delete Campaign
              </button>
            </div>
          </div>
        </div>}
    </div>;
};