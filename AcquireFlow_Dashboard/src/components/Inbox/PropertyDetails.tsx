import React, { useState } from 'react';
import { Home, DollarSign, Calendar, Clock, Map, Bed, Bath, Square, Tag, ArrowRight, BarChart2 } from 'lucide-react';
// Add interface for property details props
interface PropertyDetailsProps {
  property: any;
  onSendLOI?: (property: any) => void;
  onScheduleFollowUp?: (property: any, date: Date) => void;
}
export const PropertyDetails = ({
  property,
  onSendLOI,
  onScheduleFollowUp
}: PropertyDetailsProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpDate, setFollowUpDate] = useState<Date>(new Date());
  const formatPrice = price => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };
  // Mock LOI history
  const loiHistory = [{
    id: 1,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    amount: property.price * 0.85,
    status: 'Rejected'
  }, {
    id: 2,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    amount: property.price * 0.9,
    status: 'Countered'
  }, {
    id: 3,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    amount: property.price * 0.93,
    status: 'Pending'
  }];
  // Mock timeline events
  const timelineEvents = [{
    id: 1,
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    event: 'Property added to campaign',
    icon: <Home size={14} className="text-primary" />
  }, {
    id: 2,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    event: 'Initial LOI sent',
    icon: <DollarSign size={14} className="text-tertiary-dark" />
  }, {
    id: 3,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    event: 'Agent responded',
    icon: <Calendar size={14} className="text-secondary" />
  }, {
    id: 4,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    event: 'Second LOI sent',
    icon: <DollarSign size={14} className="text-tertiary-dark" />
  }, {
    id: 5,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    event: 'Third LOI sent',
    icon: <DollarSign size={14} className="text-tertiary-dark" />
  }];
  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  // Handle sending LOI
  const handleSendLOI = () => {
    if (onSendLOI) {
      onSendLOI(property);
    } else {
      // Fallback if no handler is provided
      window.location.href = '/loi-generator';
    }
  };
  // Handle scheduling follow-up
  const handleScheduleFollowUp = () => {
    setShowFollowUpModal(true);
  };
  // Handle confirming follow-up
  const handleConfirmFollowUp = () => {
    if (onScheduleFollowUp) {
      onScheduleFollowUp(property, followUpDate);
    }
    setShowFollowUpModal(false);
  };
  return <div className="p-4">
      {/* Property info */}
      <div className="mb-4">
        <h3 className="font-medium text-dark">{property.address}</h3>
        <p className="text-sm text-gray-500">
          {property.city}, {property.state}
        </p>
        <div className="mt-2 text-lg font-bold text-primary">
          {formatPrice(property.price)}
        </div>
      </div>

      {/* Property details */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 p-2 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <Bed size={16} className="text-gray-500" />
          </div>
          <div className="text-sm font-medium">{property.beds}</div>
          <div className="text-xs text-gray-500">Beds</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <Bath size={16} className="text-gray-500" />
          </div>
          <div className="text-sm font-medium">{property.baths}</div>
          <div className="text-xs text-gray-500">Baths</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg text-center">
          <div className="flex justify-center mb-1">
            <Square size={16} className="text-gray-500" />
          </div>
          <div className="text-sm font-medium">
            {property.sqft.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Sq Ft</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex">
          <button className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('details')}>
            Details
          </button>
          <button className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === 'loi' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('loi')}>
            LOI History
          </button>
          <button className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === 'timeline' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('timeline')}>
            Timeline
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'details' && <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Property Type
            </h4>
            <div className="flex items-center">
              <Tag size={16} className="text-gray-500 mr-2" />
              <span className="text-sm">{property.type}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Key Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Price per sq ft</span>
                <span className="font-medium">
                  {formatPrice(property.price / property.sqft)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Year built</span>
                <span className="font-medium">1985</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Lot size</span>
                <span className="font-medium">0.25 acres</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Property taxes</span>
                <span className="font-medium">
                  {formatPrice(property.price * 0.01)}/yr
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Investment Analysis
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Cap Rate</span>
                <span className="font-medium text-primary">7.2%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Cash on Cash Return</span>
                <span className="font-medium text-primary">9.5%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Monthly Rent Estimate</span>
                <span className="font-medium">
                  {formatPrice(property.price * 0.007)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                <Map size={24} className="text-gray-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>Walk Score: 78/100</span>
              <a href="#" className="text-primary hover:underline flex items-center">
                View on map <ArrowRight size={12} className="ml-1" />
              </a>
            </div>
          </div>
        </div>}

      {activeTab === 'loi' && <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">LOI History</h4>
            <button className="text-xs text-primary hover:underline flex items-center" onClick={handleSendLOI}>
              New LOI <ArrowRight size={12} className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {loiHistory.map(loi => <div key={loi.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium">
                      {formatPrice(loi.amount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(loi.date)}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${loi.status === 'Rejected' ? 'bg-secondary bg-opacity-10 text-secondary' : loi.status === 'Countered' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-primary bg-opacity-10 text-primary'}`}>
                    {loi.status}
                  </span>
                </div>
                <div className="mt-2 text-xs flex justify-between items-center">
                  <span className="text-gray-500">
                    {Math.round(loi.amount / property.price * 100)}% of asking
                    price
                  </span>
                  <button className="text-primary hover:underline">View</button>
                </div>
              </div>)}
          </div>
          <div className="mt-4 bg-tertiary bg-opacity-10 rounded-lg p-3">
            <div className="flex items-start">
              <BarChart2 size={16} className="text-tertiary-dark mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-dark">LOI Insights</h4>
                <p className="text-xs text-gray-700 mt-1">
                  Based on recent acceptances in this area, we recommend an
                  offer at 93-95% of asking price for highest success rate.
                </p>
              </div>
            </div>
          </div>
        </div>}

      {activeTab === 'timeline' && <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Property Timeline
          </h4>
          <div className="relative pl-6">
            <div className="absolute top-0 bottom-0 left-2 w-px bg-gray-200"></div>
            {timelineEvents.map((event, index) => <div key={event.id} className="mb-4 relative">
                <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  {event.icon}
                </div>
                <div>
                  <div className="text-sm font-medium">{event.event}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {formatDate(event.date)}
                  </div>
                </div>
              </div>)}
            <div className="mb-4 relative">
              <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                <Clock size={14} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">
                  Awaiting response
                </div>
                <div className="text-xs text-gray-500">Current status</div>
              </div>
            </div>
          </div>
        </div>}

      {/* Quick actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full bg-primary text-white py-2 rounded-lg mb-2 hover:bg-primary-dark transition-colors" onClick={handleSendLOI}>
          Send New LOI
        </button>
        <button className="w-full bg-tertiary text-dark py-2 rounded-lg hover:bg-tertiary-dark transition-colors" onClick={handleScheduleFollowUp}>
          Schedule Follow-up
        </button>
      </div>

      {/* Follow-up Modal */}
      {showFollowUpModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Schedule Follow-up</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up Date and Time
              </label>
              <input type="datetime-local" className="w-full p-2 border border-gray-300 rounded-lg" value={followUpDate.toISOString().slice(0, 16)} onChange={e => setFollowUpDate(new Date(e.target.value))} />
            </div>
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg" onClick={() => setShowFollowUpModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={handleConfirmFollowUp}>
                Schedule
              </button>
            </div>
          </div>
        </div>}
    </div>;
};