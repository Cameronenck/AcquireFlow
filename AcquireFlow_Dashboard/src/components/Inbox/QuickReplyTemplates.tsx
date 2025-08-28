import React from 'react';
import { FileText, Check, Star, Search } from 'lucide-react';
export const QuickReplyTemplates = ({
  onSelectTemplate
}) => {
  const templates = [{
    id: 1,
    name: 'Interested in property',
    content: "Thank you for your response. I'm very interested in this property and would like to discuss further. Are you available for a call tomorrow to go over some details?",
    category: 'Follow-up',
    starred: true
  }, {
    id: 2,
    name: 'Request more information',
    content: "Thanks for getting back to me. Before we proceed, could you provide some additional information about the property? Specifically, I'm interested in knowing about any recent renovations, current tenant situation, and any known issues with the property.",
    category: 'Information',
    starred: false
  }, {
    id: 3,
    name: 'Schedule property viewing',
    content: "I appreciate your response and would like to schedule a viewing of the property. Would you be available this week? I'm flexible on Tuesday afternoon or Thursday morning.",
    category: 'Scheduling',
    starred: true
  }, {
    id: 4,
    name: 'LOI follow-up',
    content: "I wanted to follow up regarding the Letter of Intent I sent on [date]. Have you had a chance to review it with your client? I'm eager to hear their thoughts and am open to discussing any aspects of the offer.",
    category: 'Follow-up',
    starred: false
  }, {
    id: 5,
    name: 'Counter-offer response',
    content: "Thank you for the counter-offer. I've reviewed it and would like to discuss a few points. The price point is close to what I can work with, but I'd like to adjust some of the terms. Can we schedule a call to discuss this further?",
    category: 'Negotiation',
    starred: false
  }];
  return <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-dark">Quick Reply Templates</h3>
          <button className="text-xs text-primary hover:underline">
            Manage Templates
          </button>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search templates..." className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <Search size={14} className="absolute left-3 top-2 text-gray-400" />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {templates.map(template => <div key={template.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => onSelectTemplate(template)}>
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                <FileText size={14} className="text-gray-500 mr-2" />
                <h4 className="font-medium text-sm">{template.name}</h4>
              </div>
              {template.starred && <Star size={14} className="text-tertiary" />}
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 mb-1">
              {template.content}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {template.category}
              </span>
              <button className="text-xs text-primary flex items-center hover:underline" onClick={e => {
            e.stopPropagation();
            onSelectTemplate(template);
          }}>
                <Check size={12} className="mr-1" />
                Use
              </button>
            </div>
          </div>)}
      </div>
    </div>;
};