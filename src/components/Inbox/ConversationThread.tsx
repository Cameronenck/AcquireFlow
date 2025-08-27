import React, { useEffect, useRef } from 'react';
import { Clock, CheckCircle, AlertCircle, FileText, Download } from 'lucide-react';
export const ConversationThread = ({
  conversation
}) => {
  const containerRef = useRef(null);
  // Scroll to bottom on initial load
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation]);
  const formatMessageDate = date => {
    const messageDate = new Date(date);
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    return `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  };
  const formatDateHeader = date => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }
  };
  // Group messages by date
  const groupedMessages = conversation.reduce((groups, message) => {
    const date = new Date(message.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});
  // Convert to array and sort by date
  const sortedGroups = Object.keys(groupedMessages).sort((a, b) => new Date(a) - new Date(b)).map(date => ({
    date,
    messages: groupedMessages[date]
  }));
  return <div ref={containerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 momentum-scroll">
      {sortedGroups.map((group, groupIndex) => <div key={group.date} className="mb-6">
          {/* Date header */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {formatDateHeader(group.date)}
            </div>
          </div>
          {/* Messages */}
          {group.messages.map((message, index) => <div key={message.id} className={`mb-4 flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-lg p-3 ${message.sender === 'you' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-dark'}`}>
                {/* Message content */}
                <div className="text-sm whitespace-pre-wrap">
                  {message.message}
                </div>
                {/* Message attachments - only shown for some messages as an example */}
                {index % 3 === 0 && <div className={`mt-2 p-2 rounded ${message.sender === 'you' ? 'bg-primary-dark' : 'bg-gray-100'}`}>
                    <div className="flex items-center">
                      <FileText size={14} className={message.sender === 'you' ? 'text-white' : 'text-gray-600'} />
                      <span className={`text-xs ml-1 ${message.sender === 'you' ? 'text-white' : 'text-gray-600'}`}>
                        Letter_of_Intent.pdf
                      </span>
                      <button className={`ml-auto p-1 rounded-full ${message.sender === 'you' ? 'hover:bg-primary-dark' : 'hover:bg-gray-200'}`}>
                        <Download size={12} className={message.sender === 'you' ? 'text-white' : 'text-gray-600'} />
                      </button>
                    </div>
                  </div>}
                {/* Message metadata */}
                <div className={`mt-1 flex justify-end items-center text-xs ${message.sender === 'you' ? 'text-primary-dark' : 'text-gray-500'}`}>
                  {formatMessageDate(message.date)}
                  {message.sender === 'you' && <span className="ml-1">
                      {message.read ? <CheckCircle size={12} className="text-primary-dark" /> : <Clock size={12} className="text-primary-dark" />}
                    </span>}
                </div>
              </div>
            </div>)}
        </div>)}
      {/* AI Insights - shown after the conversation */}
      <div className="bg-tertiary bg-opacity-10 border border-tertiary border-opacity-20 rounded-lg p-3 mt-6">
        <div className="flex items-start">
          <div className="p-1.5 bg-tertiary rounded-full mr-2 flex-shrink-0">
            <AlertCircle size={14} className="text-dark" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-dark">
              AI Sentiment Analysis
            </h4>
            <p className="text-xs text-gray-700 mt-1">
              This conversation shows a{' '}
              <span className="font-medium">positive sentiment</span> with a{' '}
              <span className="font-medium">high likelihood of interest</span>{' '}
              in your property.
            </p>
            <div className="mt-2 flex items-center">
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-1">Interest Level</div>
                <div className="h-1.5 bg-gray-200 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{
                  width: '75%'
                }}></div>
                </div>
              </div>
              <div className="ml-4 text-sm font-medium">75%</div>
            </div>
            <p className="text-xs text-gray-700 mt-2">
              <span className="font-medium">Recommended action:</span> Send a
              follow-up with more property details and schedule a call.
            </p>
          </div>
        </div>
      </div>
    </div>;
};