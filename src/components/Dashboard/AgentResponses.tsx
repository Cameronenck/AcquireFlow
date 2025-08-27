import React from 'react';
import { PhoneCall, MessageSquare, AlertCircle, Clock, CheckCircle } from 'lucide-react';
export const AgentResponses = () => {
  const responses = [{
    id: 1,
    agent: 'Sarah Johnson',
    property: '123 Main St, Orlando',
    response: 'Interested in offer',
    status: 'Hot',
    time: '10 minutes ago',
    needsFollowUp: true
  }, {
    id: 2,
    agent: 'Michael Brown',
    property: '456 Oak Ave, Miami',
    response: 'Counter offer proposed',
    status: 'Hot',
    time: '45 minutes ago',
    needsFollowUp: true
  }, {
    id: 3,
    agent: 'Jessica Lee',
    property: '789 Pine Rd, Tampa',
    response: 'Requested more info',
    status: 'Warm',
    time: '2 hours ago',
    needsFollowUp: true
  }, {
    id: 4,
    agent: 'David Wilson',
    property: '321 Maple Dr, Jacksonville',
    response: 'Not interested',
    status: 'Cold',
    time: '3 hours ago',
    needsFollowUp: false
  }, {
    id: 5,
    agent: 'Amanda Garcia',
    property: '654 Elm St, Fort Lauderdale',
    response: 'Seller considering',
    status: 'Warm',
    time: '5 hours ago',
    needsFollowUp: true
  }];
  const getStatusBadge = status => {
    switch (status) {
      case 'Hot':
        return <span className="px-2 py-1 text-xs rounded-full bg-secondary bg-opacity-10 text-secondary flex items-center">
            <AlertCircle size={12} className="mr-1" />
            {status}
          </span>;
      case 'Warm':
        return <span className="px-2 py-1 text-xs rounded-full bg-tertiary bg-opacity-10 text-tertiary flex items-center">
            <Clock size={12} className="mr-1" />
            {status}
          </span>;
      case 'Cold':
        return <span className="px-2 py-1 text-xs rounded-full bg-primary bg-opacity-10 text-primary flex items-center">
            <CheckCircle size={12} className="mr-1" />
            {status}
          </span>;
      default:
        return null;
    }
  };
  return <div className="bg-cardBg rounded-lg shadow-md p-5 text-dark border border-gray-100 h-full transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Agent Responses</h2>
        <div className="flex space-x-2">
          <span className="bg-primary bg-opacity-10 px-2 py-1 text-xs rounded-full text-primary flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            Live Updates
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {responses.map(response => <div key={response.id} className={`p-3 rounded-md border ${response.status === 'Hot' ? 'border-secondary bg-secondary bg-opacity-5' : response.status === 'Warm' ? 'border-tertiary bg-tertiary bg-opacity-5' : 'border-primary bg-primary bg-opacity-5'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{response.agent}</h3>
                <p className="text-sm text-gray-600">{response.property}</p>
              </div>
              {getStatusBadge(response.status)}
            </div>
            <p className="text-sm mt-2">{response.response}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">{response.time}</span>
              <div className="flex space-x-2">
                <button className="p-1.5 bg-secondary text-white rounded-md hover:bg-opacity-90 transition-colors">
                  <PhoneCall size={14} />
                </button>
                <button className="p-1.5 bg-tertiary text-dark rounded-md hover:bg-opacity-90 transition-colors">
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
            {response.needsFollowUp && <div className="mt-2 text-xs bg-tertiary bg-opacity-10 text-tertiary px-2 py-1 rounded inline-block">
                Needs follow-up
              </div>}
          </div>)}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          4 properties need follow-up
        </span>
        <button className="px-3 py-1.5 bg-tertiary text-dark rounded-md text-sm hover:bg-opacity-90 transition-colors">
          View All Responses
        </button>
      </div>
    </div>;
};