import React from 'react';
import { Phone, Mail, MessageSquare, Star, Clock } from 'lucide-react';
import { Contact } from './ContactsPage';
type ContactCardProps = {
  contact: Contact;
  onClick: () => void;
};
export const ContactCard = ({
  contact,
  onClick
}: ContactCardProps) => {
  // Get relationship strength color
  const getRelationshipColor = (strength: number) => {
    if (strength >= 80) return 'bg-primary';
    if (strength >= 60) return 'bg-tertiary';
    if (strength >= 40) return 'bg-orange-500';
    return 'bg-gray-400';
  };
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
  return <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium text-dark">{contact.name}</h3>
            <p className="text-sm text-gray-500">
              {contact.position && contact.company ? `${contact.position}, ${contact.company}` : contact.company || contact.position || ''}
            </p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeBadgeColor(contact.type)}`}>
            {contact.type}
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Relationship</div>
            <div className="flex items-center">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${getRelationshipColor(contact.relationshipStrength)}`} style={{
                width: `${contact.relationshipStrength}%`
              }}></div>
              </div>
              <span className="ml-2 text-xs font-medium">
                {contact.relationshipStrength}%
              </span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock size={14} className="mr-1" />
            <span>{formatLastInteraction(contact.lastInteraction)}</span>
          </div>
          {contact.communicationPreference && <div className="flex items-center text-sm text-gray-500">
              <Star size={14} className="mr-1" />
              <span>Prefers {contact.communicationPreference}</span>
            </div>}
        </div>
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Phone size={16} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Mail size={16} />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <MessageSquare size={16} />
          </button>
        </div>
      </div>
    </div>;
};