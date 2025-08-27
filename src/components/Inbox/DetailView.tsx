import React, { useState } from 'react';
import { ConversationThread } from './ConversationThread';
import { PropertyDetails } from './PropertyDetails';
import { QuickReplyTemplates } from './QuickReplyTemplates';
import { ArrowLeft, Send, Clock, Star, Archive, Flag, Phone, Mail, MessageSquare, FileText, ChevronDown, ChevronUp } from 'lucide-react';
export const DetailView = ({
  response,
  onBack
}) => {
  const [showPropertyDetails, setShowPropertyDetails] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    // In a real app, this would send the reply to the API
    console.log('Sending reply:', replyText);
    // Clear the reply text
    setReplyText('');
  };
  const handleUseTemplate = template => {
    setReplyText(template.content);
    setShowTemplates(false);
  };
  return <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100 mr-3 lg:hidden" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center">
              <h2 className="font-bold text-lg">{response.agent.name}</h2>
              <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${response.status === 'hot' ? 'bg-secondary bg-opacity-10 text-secondary' : response.status === 'warm' ? 'bg-tertiary bg-opacity-10 text-tertiary-dark' : 'bg-primary bg-opacity-10 text-primary'}`}>
                {response.status === 'hot' ? 'Hot Lead' : response.status === 'warm' ? 'Warm Lead' : 'Cold Lead'}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {response.property.address}, {response.property.city},{' '}
              {response.property.state}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mr-3 border-r border-gray-200 pr-3">
            <button className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors">
              <Phone size={18} />
            </button>
            <button className="p-2 rounded-full bg-tertiary text-dark hover:bg-tertiary-dark transition-colors">
              <Mail size={18} />
            </button>
            <button className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
              <MessageSquare size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Clock size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Star size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Archive size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Flag size={18} />
            </button>
          </div>
        </div>
      </div>
      {/* Main content - conversation and property details */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation thread - expanded to take more space */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ConversationThread conversation={response.conversation} />
          {/* Reply box */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="relative">
              <textarea className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] resize-none" placeholder="Type your reply..." value={replyText} onChange={e => setReplyText(e.target.value)}></textarea>
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <button className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={() => setShowTemplates(!showTemplates)}>
                  <FileText size={16} />
                </button>
                <button className={`p-1.5 rounded-full ${replyText.trim() ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-100 text-gray-400'}`} onClick={handleSendReply} disabled={!replyText.trim()}>
                  <Send size={16} />
                </button>
              </div>
            </div>
            {/* Quick reply templates */}
            {showTemplates && <div className="mt-3">
                <QuickReplyTemplates onSelectTemplate={handleUseTemplate} />
              </div>}
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-primary hover:underline">
                  Schedule follow-up
                </button>
                <button className="text-xs text-primary hover:underline">
                  Save as draft
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Property details panel - collapsible with header removed */}
        <div className={`border-l border-gray-200 bg-white transition-all duration-300 ${showPropertyDetails ? 'w-80' : 'w-10'}`}>
          {showPropertyDetails ? <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <PropertyDetails property={response.property} />
              </div>
            </div> : <div className="h-full flex flex-col items-center cursor-pointer hover:bg-gray-50" onClick={() => setShowPropertyDetails(true)}>
              <div className="p-3 flex flex-col items-center justify-center h-full">
                <ChevronLeft size={18} />
                <div className="vertical-text text-gray-500 text-xs font-medium mt-2">
                  Property Details
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
// Custom components for the chevron directions
const ChevronRight = ({
  size,
  className
}) => <ChevronDown size={size} className={className} />;
const ChevronLeft = ({
  size,
  className
}) => <ChevronUp size={size} className={className} />;