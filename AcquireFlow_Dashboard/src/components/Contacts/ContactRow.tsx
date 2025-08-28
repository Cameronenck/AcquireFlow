import React from 'react';
import { Phone, Mail, MessageSquare, Star, Clock, MoreHorizontal, User } from 'lucide-react';
import { Contact } from './ContactsPage';
type ContactRowProps = {
  contact: Contact;
  onClick: () => void;
};
export const ContactRow = ({
  contact,
  onClick
}: ContactRowProps) => {
  // Format last interaction time
  const formatLastInteraction = (dateString?: string) => {
    if (!dateString) return 'No recent interaction';
    const interactionDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - interactionDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`;
    } else {
      return `${Math.floor(diffDays / 365)} years ago`;
    }
  };
  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Agent':
        return 'bg-blue-600 text-white';
      case 'Investor':
        return 'bg-primary text-white';
      case 'Vendor':
        return 'bg-tertiary text-dark';
      case 'Owner':
        return 'bg-purple-600 text-white';
      case 'Buyer':
        return 'bg-secondary text-white';
      case 'Tenant':
        return 'bg-teal-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };
  return <tr className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={onClick}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <User size={20} className="text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-dark">{contact.name}</div>
            <div className="text-sm text-gray-500">
              {contact.position && contact.company ? `${contact.position}, ${contact.company}` : contact.company || contact.position || ''}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${getTypeBadgeColor(contact.type)}`}>
          {contact.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1.5" />
          <span>{formatLastInteraction(contact.lastInteraction)}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {contact.communicationPreference && <div className="flex items-center text-sm text-gray-500">
            <Star size={14} className="mr-1.5" />
            <span>{contact.communicationPreference}</span>
          </div>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end space-x-2">
          <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" onClick={e => {
          e.stopPropagation();
          // Handle phone call
        }} title="Call">
            <Phone size={16} />
          </button>
          <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" onClick={e => {
          e.stopPropagation();
          // Handle email
        }} title="Email">
            <Mail size={16} />
          </button>
          <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" onClick={e => {
          e.stopPropagation();
          // Handle text message
        }} title="Message">
            <MessageSquare size={16} />
          </button>
          <button className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" onClick={e => {
          e.stopPropagation();
          // Handle more options
        }} title="More options">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </td>
    </tr>;
};