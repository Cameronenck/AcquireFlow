import React, { useState } from 'react';
import { Clock, Calendar, Mail, Users, Edit, Trash2, PlusCircle, BarChart, LineChart, PieChart, FileText, Play, Pause } from 'lucide-react';
type ScheduledReportsProps = {
  preview?: boolean;
};
export const ScheduledReports = ({
  preview = false
}: ScheduledReportsProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const scheduledReports = [{
    title: 'Weekly Performance Summary',
    recipients: ['Marketing Team', 'Executive Team'],
    frequency: 'Weekly',
    nextRun: 'Monday, 9:00 AM',
    format: 'PDF',
    active: true,
    type: 'bar'
  }, {
    title: 'Monthly Financial Report',
    recipients: ['Finance Team', 'Executive Team'],
    frequency: 'Monthly',
    nextRun: 'Aug 1, 9:00 AM',
    format: 'Excel',
    active: true,
    type: 'line'
  }, {
    title: 'Quarterly Market Analysis',
    recipients: ['Investment Team', 'Executive Team'],
    frequency: 'Quarterly',
    nextRun: 'Oct 1, 9:00 AM',
    format: 'PDF',
    active: true,
    type: 'pie'
  }, {
    title: 'Daily Lead Generation Report',
    recipients: ['Sales Team'],
    frequency: 'Daily',
    nextRun: 'Tomorrow, 8:00 AM',
    format: 'Email',
    active: false,
    type: 'bar'
  }];
  const renderIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart size={16} className="text-primary" />;
      case 'line':
        return <LineChart size={16} className="text-tertiary-dark" />;
      case 'pie':
        return <PieChart size={16} className="text-secondary" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };
  return <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-dark">Scheduled Reports</h2>
          {!preview && <p className="text-gray-500 text-sm">
              Automated reports delivered to your team
            </p>}
        </div>
        {!preview && <button className="flex items-center text-primary text-sm font-medium hover:underline" onClick={() => setShowAddForm(!showAddForm)}>
            <PlusCircle size={16} className="mr-1" />
            Schedule New Report
          </button>}
      </div>
      {showAddForm && !preview && <div className="mb-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
          <h3 className="font-medium mb-4">Schedule a Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Campaign Performance Overview</option>
                <option>Revenue Forecast</option>
                <option>Market Opportunity Map</option>
                <option>Lead Source Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
                <option>Email</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipients
              </label>
              <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Marketing Team</option>
                <option>Sales Team</option>
                <option>Executive Team</option>
                <option>Investment Team</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
              Schedule
            </button>
          </div>
        </div>}
      <div className="space-y-4">
        {scheduledReports.slice(0, preview ? 2 : undefined).map((report, index) => <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-gray-100 mr-3">
                    {renderIcon(report.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-dark">{report.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar size={12} className="mr-1" />
                      <span>{report.frequency}</span>
                      <span className="mx-1">•</span>
                      <Clock size={12} className="mr-1" />
                      <span>Next: {report.nextRun}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${report.active ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                    {report.active ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Mail size={14} className="text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">
                    {report.format} • {report.recipients.join(', ')}
                  </span>
                </div>
                {!preview && <div className="flex space-x-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                      {report.active ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                      <Trash2 size={14} />
                    </button>
                  </div>}
              </div>
            </div>)}
      </div>
      {preview && <div className="mt-4 text-center">
          <button className="text-primary text-sm font-medium hover:underline">
            View All Scheduled Reports
          </button>
        </div>}
    </div>;
};