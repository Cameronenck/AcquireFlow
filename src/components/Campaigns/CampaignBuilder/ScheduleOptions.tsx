import React, { useState } from 'react';
import { Calendar, Clock, Repeat, BellRing, AlertCircle } from 'lucide-react';
export const ScheduleOptions = ({
  campaignData,
  updateCampaignData
}) => {
  const [scheduleType, setScheduleType] = useState('immediate');
  const [startDate, setStartDate] = useState(campaignData.schedule?.startDate || new Date());
  const [endDate, setEndDate] = useState(campaignData.schedule?.endDate || null);
  const [frequency, setFrequency] = useState(campaignData.schedule?.frequency || 'daily');
  const [timeOfDay, setTimeOfDay] = useState(campaignData.schedule?.timeOfDay || '9:00 AM');
  const handleContinue = () => {
    updateCampaignData({
      schedule: {
        startDate,
        endDate,
        frequency,
        timeOfDay,
        type: scheduleType
      }
    });
  };
  const formatDate = date => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };
  return <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark mb-2">Schedule Campaign</h3>
        <p className="text-gray-500">
          Set when your campaign should start and how it should run
        </p>
      </div>
      {/* Schedule type selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h4 className="font-medium mb-4">When should this campaign start?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`border rounded-lg p-4 cursor-pointer transition-all ${scheduleType === 'immediate' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setScheduleType('immediate')}>
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${scheduleType === 'immediate' ? 'border-primary' : 'border-gray-300'}`}>
                {scheduleType === 'immediate' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <h5 className="font-medium ml-2">Start Immediately</h5>
            </div>
            <p className="text-sm text-gray-500">
              Campaign will begin processing as soon as it's created
            </p>
          </div>
          <div className={`border rounded-lg p-4 cursor-pointer transition-all ${scheduleType === 'scheduled' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setScheduleType('scheduled')}>
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${scheduleType === 'scheduled' ? 'border-primary' : 'border-gray-300'}`}>
                {scheduleType === 'scheduled' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <h5 className="font-medium ml-2">Schedule for Later</h5>
            </div>
            <p className="text-sm text-gray-500">
              Set a specific date and time to start the campaign
            </p>
          </div>
          <div className={`border rounded-lg p-4 cursor-pointer transition-all ${scheduleType === 'draft' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setScheduleType('draft')}>
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${scheduleType === 'draft' ? 'border-primary' : 'border-gray-300'}`}>
                {scheduleType === 'draft' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <h5 className="font-medium ml-2">Save as Draft</h5>
            </div>
            <p className="text-sm text-gray-500">
              Save the campaign setup without scheduling it
            </p>
          </div>
        </div>
      </div>
      {/* Date and time settings */}
      {scheduleType !== 'draft' && <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h4 className="font-medium mb-4">Campaign Schedule Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Start Date
                </label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={formatDate(startDate)} onChange={e => setStartDate(new Date(e.target.value))} disabled={scheduleType === 'immediate'} />
                {scheduleType === 'immediate' && <p className="text-xs text-gray-500 mt-1">
                    Campaign will start today
                  </p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Clock size={16} className="mr-1" />
                  Time of Day
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={timeOfDay} onChange={e => setTimeOfDay(e.target.value)}>
                  <option value="9:00 AM">9:00 AM (Recommended)</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Emails will be sent at this time in the recipient's local
                  timezone
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Repeat size={16} className="mr-1" />
                  Send Frequency
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={frequency} onChange={e => setFrequency(e.target.value)}>
                  <option value="once">One-time send</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom schedule</option>
                </select>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  End Date (Optional)
                </label>
                <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" value={formatDate(endDate)} onChange={e => setEndDate(e.target.value ? new Date(e.target.value) : null)} />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to run until manually stopped
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <BellRing size={16} className="mr-1" />
                  Notifications
                </label>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                    <span className="text-sm">
                      Email notifications for responses
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" checked />
                    <span className="text-sm">Daily performance summary</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                    <span className="text-sm">Campaign completion alert</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* Property distribution */}
      {scheduleType !== 'draft' && <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h4 className="font-medium mb-4">Property Distribution</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How should properties be distributed?
            </label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="all">Send to all properties at once</option>
              <option value="batches">Send in batches (recommended)</option>
              <option value="daily">
                Distribute evenly across campaign duration
              </option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Size
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="25">25 properties per batch</option>
                <option value="50">50 properties per batch</option>
                <option value="100">100 properties per batch</option>
                <option value="custom">Custom batch size</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Between Batches
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="7">1 week</option>
              </select>
            </div>
          </div>
        </div>}
      {/* Optimization notice */}
      <div className="bg-tertiary bg-opacity-10 rounded-xl p-5 border border-tertiary border-opacity-20">
        <div className="flex items-start">
          <div className="text-tertiary-dark mr-4">
            <AlertCircle size={20} />
          </div>
          <div>
            <h4 className="font-medium text-dark mb-1">
              Optimization Recommendations
            </h4>
            <p className="text-sm mb-3">
              Based on our analysis of similar campaigns, we recommend:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Sending emails on Tuesday or Wednesday mornings at 9:00 AM for
                  highest open rates
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Distributing properties in batches of 50 to manage responses
                  effectively
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>
                  Allowing 2-3 days between batches to properly follow up with
                  interested agents
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button className="px-4 py-2 bg-tertiary text-dark font-medium rounded-lg hover:bg-tertiary-dark transition-all" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>;
};